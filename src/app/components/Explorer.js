import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Irminsul } from "../../core/irminsul";
import os from "../../core/os";
import Collapse from "./Collapse";
import List from "./List";
import Remix from "./Remix";
import SubTitle from "./SubTitle";

export default function Explorer(props) {

    const { api, service, irminsul } = useContext(Irminsul)

    const [rootOn, setRootOn] = useState(false)

    const onSwitchRoot = () => setRootOn(pre => !pre)

    useEffect(() => {
        service.initApiRoot()
    }, [])

    return (
        <Box sx={{ position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column', }}>
            <SubTitle
                z={15}
                title={os.try(() => service.getApiRootName(api.root), '')}
                icons={[{ icon: <Remix.exchange fontSize="small" color={rootOn ? 'secondary' : 'primary'} />, onClick: onSwitchRoot }]}
            />
            <Collapse
                z={13}
                toTop
                width={'100%'}
                on={rootOn}
                top={47}
                height={'fit-content'}
                sx={{ borderBottom: '1px solid silver', boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)', '& .List Button:last-child': { borderBottom: 0 } }}
            >
                <List
                    width={'100%'}
                    height={'fit-content'}
                    maxHeight={'360px'}
                    current={api.root}
                    source={os.try(() => Object.keys(irminsul), [])}
                    onGetName={service.getApiRootName}
                    onKeyChange={service.updateApiRoot}

                />
            </Collapse>
            <Box sx={{
                position: 'relative', display: 'flex', height: '100%',
                '& .List:last-child': {
                    borderLeft: '1px solid silver'
                }


            }}>
                <List
                    width={200}
                    current={api.branch}
                    source={os.try(() => Object.keys(irminsul[api.root]._), [])}
                    onGetName={service.getApiBranchName}
                    onKeyChange={service.updateApiBranch}
                    itemMenus={[
                        { name: 'Create Branch' },
                        { name: 'Rename' },
                        { name: 'Delete' }
                    ]}
                />
                <List
                    width={300}
                    current={api.leaf}
                    source={os.try(() => Object.keys(irminsul[api.root]._[api.branch]._), [])}
                    onGetName={service.getApiLeafName}
                    onKeyChange={service.updateApiLeaf}
                    itemMenus={[
                        { name: 'Create Branch' }
                    ]}
                />
            </Box>
        </Box>
    )
}