import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Irminsul } from "../../core/irminsul";
import os from "../../core/os";
import Collapse from "./Collapse";
import List from "./List";
import Remix from "./Remix";
import SubTitle from "./SubTitle";

export default function Explorer(props) {

    function Try(func, v) {
        try {
            return func()
        } catch (error) {
            return v
        }
    }

    const irminsul = {
        'id1': {
            name: 'Example',
            _: {
                'id11': {
                    name: 'Company',
                    _: {
                        'id111': {
                            name: 'Shapie',
                            _: {}
                        },
                        'id112': {
                            name: 'ShapieNorth',
                            _: {}
                        }
                    }
                },
                'id12': {
                    name: 'Girl Friends',
                    _: {}
                }
            }
        },
        'id2': {
            name: 'Empty',
            _: {}
        },
        'id3': {
            name: 'Mobius I Dragon Slayer',
            _: {}
        },
        'id4': {
            name: 'Mobius II Slay Dragon',
            _: {}
        },
        'id5': {
            name: 'Mobius III Dragon',
            _: {}
        }
    }
    const { api } = useContext(Irminsul)

    const onRootChange = (e, v) => {
        api.update('root', v)
        api.update('branch', undefined)
        api.update('leaf', undefined)
    }
    const onBranchChange = (e, v) => {
        api.update('branch', v)
        api.update('leaf', undefined)
    }
    const onLeafChange = (e, v) => {
        api.update('leaf', v)
    }
    const onSetFirstRoot = () => {
        // var strFirst = Object.keys(irminsul).at(0)
        console.log(Object.keys(irminsul))
        api.update('root', Object.keys(irminsul)[0])
        // return strFirst
    }
    const onSortRoot = (a, b) => {
        a = irminsul._[a].name
        b = irminsul._[b].name
        return ((a < b) ? -1 : ((a > b) ? 1 : 0))
    }
    const onSortBranch = (a, b) => {
        a = irminsul._[api.root]._[a].name
        b = irminsul._[api.root]._[b].name
        return ((a < b) ? -1 : ((a > b) ? 1 : 0))
    }
    const onSortLeaf = (a, b) => {
        a = irminsul._[api.root]._[api.branch]._[a].name
        b = irminsul._[api.root]._[api.branch]._[b].name
        return ((a < b) ? -1 : ((a > b) ? 1 : 0))
    }

    const onGetRootName = id => os.try(() => irminsul[id].name, '')
    const onGetBranchName = id => os.try(() => irminsul[api.root]._[id].name, '')
    const onGetLeafName = id => os.try(() => irminsul[api.root]._[api.branch]._[id].name, '')

    const [rootOn, setRootOn] = useState(false)

    const onSwitchRoot = () => setRootOn(pre => !pre)

    useEffect(() => {
        onSetFirstRoot()
    }, [])
    return (
        <Box sx={{ position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column', }}>
            <SubTitle
                z={15}
                title={os.try(() => onGetRootName(api.root), '')}
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
                    onGetName={onGetRootName}
                    onKeyChange={onRootChange}
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
                    onGetName={onGetBranchName}
                    onKeyChange={onBranchChange}
                />
                <List
                    width={300}
                    current={api.leaf}
                    source={os.try(() => Object.keys(irminsul[api.root]._[api.branch]._), [])}
                    onGetName={onGetLeafName}
                    onKeyChange={onLeafChange}
                />
            </Box>
        </Box>
    )
}