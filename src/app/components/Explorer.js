import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Irminsul } from "../../core/irminsul";
import os from "../../core/os";
import Collapse from "./Collapse";
import List from "./List";
import Remix from "./Remix";
import SubTitle from "./SubTitle";

export default function Explorer() {

    const { api, service, irminsul } = useContext(Irminsul)

    const [browserOn, setBrowserOn] = useState(false)

    const browserStateChange = () => setBrowserOn(on => !on)

    const style = {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        position: 'relative',
        '& .Explorer_RootBrowser': {
            borderBottom: '1px solid silver',
            boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
            '& .List Button:last-child': {
                borderBottom: 0
            }
        },
        '& .Explorer_Container': {
            display: 'flex',
            height: '100%',
            position: 'relative',
            '& .List:last-child': {
                borderLeft: '1px solid silver'
            }
        }
    }

    useEffect(() => {
        service.initApiRoot()
    }, [])

    return (
        <Box className='Explorer' sx={style}>
            <SubTitle
                z={15}
                title={os.try(() => service.getApiRootName(api.root), '')}
                icons={[{ icon: <Remix.exchange fontSize="small" color={browserOn ? 'secondary' : 'primary'} />, onClick: browserStateChange }]}
            />
            <Collapse
                className='Explorer_RootBrowser'
                height={'fit-content'}
                on={browserOn}
                toTop
                top={47}
                width={'100%'}
                z={13}
            >
                <List
                    current={api.root}
                    height={'fit-content'}
                    maxHeight={'360px'}
                    onGetName={service.getApiRootName}
                    onKeyChange={(e, v) => { service.updateApiRoot(e, v); browserStateChange() }}
                    source={os.try(() => Object.keys(irminsul), [])}
                    width={'100%'}
                />
            </Collapse>
            <Box className='Explorer_Container'>
                <List
                    current={api.branch}
                    menus={[
                        { name: 'Create Branch' },
                        { name: 'Rename' },
                        { name: 'Delete' }
                    ]}
                    onGetName={service.getApiBranchName}
                    onKeyChange={service.updateApiBranch}
                    source={os.try(() => Object.keys(irminsul[api.root]._), [])}
                    width={200}
                />
                <List
                    current={api.leaf}
                    menus={[
                        { name: 'Create Branch' }
                    ]}
                    onGetName={service.getApiLeafName}
                    onKeyChange={service.updateApiLeaf}
                    source={os.try(() => Object.keys(irminsul[api.root]._[api.branch]._), [])}
                    width={300}
                />
            </Box>
        </Box>
    )
}