import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Irminsul } from "../../core/irminsul";
import Collapse from "./Collapse";
import List from "./List";
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

    const onGetRootName = id => irminsul[id].name
    const onGetBranchName = id => irminsul[api.root]._[id].name
    const onGetLeafName = id => irminsul[api.root]._[api.branch]._[id].name


    useEffect(() => {
        onSetFirstRoot()
    }, [])
    return (
        <Box>
            <SubTitle
                title={api.root}
            />
            <Collapse
                toTop
            >

            </Collapse>
            <Box>
                <List
                    current={api.branch}
                    source={Try(() => Object.keys(irminsul[api.root]._))}
                    onGetName={onGetBranchName}
                    onKeyChange={onBranchChange}
                />
                <List
                    current={api.leaf}
                    source={Try(() => Object.keys(irminsul[api.root]._[api.branch]._))}
                    onGetName={onGetLeafName}
                    onKeyChange={onLeafChange}
                />
            </Box>
        </Box>
    )
}