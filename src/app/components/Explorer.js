import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Irminsul } from "../../core/irminsul";
import os from "../../core/os";
import Collapse from "./Collapse";
import ContextMenu from "./ContextMenu";
import { DialogSystem } from "./Dialogs/DialogProvider";
import BranchExplorer from "./Explorer/BranchExplorer";
import RootExplorer from "./Explorer/RootExplorer";
import IMS100 from "./IMS100";
import ContentLeader from "./Leader/ContentLeader";
import List from "./List";
import Remix from "./Remix";
import SubTitle from "./SubTitle";

export default function Explorer() {

    const { api, service, irminsul } = useContext(Irminsul)

    const [browserOn, setBrowserOn] = useState(false)

    const browserStateChange = () => setBrowserOn(on => !on)

    const [renameTitle, setRenameTitle] = useState('')
    const [renameType, setRenameType] = useState('')
    const [renameKey, setRenameKey] = useState('')
    const [renameOn, setRenameOn] = useState(false)
    const renameOnChange = () => setRenameOn(on => !on)

    const [createTitle, setCreateTitle] = useState('')
    const [createType, setCreateType] = useState('')
    const [createKey, setCreateKey] = useState('')
    const [createOn, setCreateOn] = useState(false)
    const createOnChange = () => setCreateOn(on => !on)




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

    const [menuOn, setMenuOn] = useState(false)
    const [menuProps, setMenuProps] = useState({})

    const onContextMenu = (e) => {
        console.log(e.target.id)
        e.preventDefault()
        setMenuProps({ top: e.clientY, left: e.clientX, id: e.target.id })
        setMenuOn(true)
    }
    return (
        <Box className='Explorer' sx={style}>
            <ContentLeader
                onContextMenu={onContextMenu}
                z={15}
                id={api.root}
                title={os.try(() => service.getApiRootName(api.root), '')}
                icons={[{ icon: <Remix.exchange />, onClick: browserStateChange, on: browserOn, rotate: true, tooltip: 'Change Root Directory' }]}
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
                <RootExplorer
                    postChange={browserStateChange}
                />
            </Collapse>
            <Box className='Explorer_Container'>
                <BranchExplorer
                    current={api.branch ?? false}
                    menus={[
                        { name: 'New Leaf' },
                        {
                            name: 'Rename', onClick: (key) => {
                                setRenameTitle('Rename Branch')
                                setRenameType('Branch')
                                setRenameKey(key)
                                setRenameOn(true)

                            }
                        },
                        { name: 'Move to...' },
                        { name: 'Delete' }
                    ]}
                    onGetName={service.getApiBranchName}
                    onKeyChange={service.updateApiBranch}
                    source={os.try(() => Object.keys(irminsul[api.root]._), [])}
                    width={200}
                />
                <List
                    current={api.leaf ?? false}
                    menus={[
                        {
                            name: 'Rename', onClick: (key) => {
                                setRenameTitle('Rename Leaf')
                                setRenameType('Leaf')
                                setRenameKey(key)
                                setRenameOn(true)

                            }
                        },
                        { name: 'Move to...' },
                        { name: 'Delete' },
                    ]}
                    onGetName={service.getApiLeafName}
                    onKeyChange={service.updateApiLeaf}
                    source={os.try(() => Object.keys(irminsul[api.root]._[api.branch]._), [])}
                    width={300}
                />
            </Box>
            <ContextMenu
                on={menuOn}
                onClose={() => setMenuOn(false)}
                current={menuProps}
                menus={api.root ? [
                    {
                        name: 'New Root', onClick: () => {
                            setCreateTitle('Create New Root')

                            setCreateType('Root')
                            setCreateOn(true)
                        }
                    },
                    { name: 'New Branch' },
                    {
                        name: 'Rename',
                        onClick: () => {
                            setRenameTitle('Rename Root')

                            setRenameType('Root')
                            setRenameKey(api.root)
                            setRenameOn(true)
                        }
                    },
                    {
                        name: 'Delete',
                        onClick: () => {
                            service.delete('Root', api.root)
                            service.updateApiRoot('', undefined)
                        }
                    }
                ] : [{ name: 'New Root' }]
                }
            />
            <IMS100
                title={renameTitle}
                on={renameOn}
                onClose={renameOnChange}
                onSubmit={(formData) => {
                    service.rename(renameType, renameKey, formData.Name)
                    renameOnChange()
                }}
            />
            <IMS100
                title={createTitle}
                on={createOn}
                onClose={createOnChange}
                onSubmit={(formData) => {
                    service.create(createType, formData.Name, createKey)
                    createOnChange()
                }}
            />
        </Box>
    )
}