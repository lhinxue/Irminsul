import { DeleteOutlined, DriveFileRenameOutline, ExpandMoreRounded } from '@mui/icons-material'
import { Box, Button, ListItemIcon, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { LeyLine } from '../../../core/irminsul'
import ContextMenu from '../ContextMenu'
import NameInquirer from '../Inquirer/NameInquirer'
import Secretary from '../Secretary/__base'
import ExplorerBase, { ExplorerItem } from './__base'

export default function BranchExplorer({
    postChange = () => void 0
}) {

    const { api,
        irminsul,
        service } = useContext(LeyLine)

    const [inquirerTitle, setInquirerTitle] = useState('')
    const [inquirerType, setInquirerType] = useState('')
    const [renameKey, setRenameKey] = useState('')
    const [renameOn, setRenameOn] = useState(false)
    const renameChange = () => setRenameOn(on => !on)
    const renameSubmit = (name) => {
        switch (inquirerType) {
            case 'newBranch':
                service.create('Branch', name)
                break
            case 'newLeaf':
                service.create('Leaf', name, renameKey)
                break
            case 'rename':
                service.rename('Branch', renameKey, name)
                break
            case 'delete':

                break

        }

        renameChange()
    }

    const [menuOn, setMenuOn] = useState(false)
    const [menuProps, setMenuProps] = useState({})
    const onContextMenu = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setMenuProps({ top: e.clientY, left: e.clientX, key: e.target.id })
        setMenuOn(true)
    }
    const [topMenuOn, setTopMenuOn] = useState(false)
    const [topMenuProps, setTopMenuProps] = useState({})
    const onTopContextMenu = (e) => {
        e.preventDefault()
        setTopMenuProps({ top: e.clientY, left: e.clientX, key: e.target.id })
        setTopMenuOn(true)
    }

    const onClick = (e) => {
        service.updateApiBranch(e.target.id)
        postChange(e.target.id)
    }

    const onMenuClick = {
        newBranch: key => {
            setInquirerTitle('Create New Branch')
            setInquirerType('newBranch')
            setRenameKey(key)
            setRenameOn(true)
        },
        newLeaf: key => {
            setInquirerTitle('Create New Leaf')
            setInquirerType('newLeaf')
            setRenameKey(key)
            setRenameOn(true)
        },
        rename: key => {
            setInquirerTitle('Rename Branch')
            setInquirerType('rename')
            setRenameKey(key)
            setRenameOn(true)
        },
        delete: key => {
            service.delete('Branch', key)
            if (key === api.branch) service.updateApiBranch(undefined)
        }
    }
    // let source = api.root ? Object.keys(irminsul[api.root]._) : []
    // useEffect(() => {
    //     source = api.root ? Object.keys(irminsul[api.root]._) : []
    // }, [irminsul[api.root]._])

    return (
        <>
            <ExplorerBase
                current={api.branch ?? false}
                onClick={onClick}
                onContextMenu={onTopContextMenu}
            >
                {
                    api.root ? Object.keys(irminsul[api.root]._).sort(service.sortApiBranch).map(key =>
                        <Tab
                            onContextMenu={onContextMenu}
                            className='Tab'
                            iconPosition='start'
                            id={key}
                            key={key}
                            label={<div className='Label'>{service.getApiBranchName(key)}</div>}
                            value={key}
                        />
                    ) : ''
                }
            </ExplorerBase>
            <Secretary
                on={menuOn}
                onClose={() => setMenuOn(false)}
                current={menuProps}
                menus={[
                    { name: 'New Branch', onClick: onMenuClick.newBranch },
                    { name: 'New Leaf', onClick: onMenuClick.newLeaf },
                    { name: 'Rename', onClick: onMenuClick.rename },
                    { name: 'Move To...', onClick: onMenuClick.rename },
                    { name: 'Delete', onClick: onMenuClick.delete },
                ]}
            />
            <Secretary
                on={topMenuOn}
                onClose={() => setTopMenuOn(false)}
                current={topMenuProps}
                menus={[
                    { name: 'New Branch', onClick: onMenuClick.newBranch }
                ]}
            />
            <NameInquirer
                title={inquirerTitle}
                on={renameOn}
                onClose={renameChange}
                onSubmit={renameSubmit}
            />
        </>
    )
}