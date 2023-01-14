import { DeleteOutlined, DriveFileRenameOutline, ExpandMoreRounded } from '@mui/icons-material'
import { Box, Button, ListItemIcon, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { LeyLine } from '../../../core/irminsul'
import NameDialog from '../Dialog/NameDialog'
import ContextMenu from '../Template/ContextMenu'
import ExplorerBase, { ExplorerItem } from './__base'

export default function LeafExplorer({
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
            case 'newLeaf':
                service.create('Leaf', name, api.branch)
                break
            case 'rename':
                service.rename('Leaf', renameKey, name)
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
        service.updateApiLeaf(e.target.id)
        postChange(e.target.id)
    }

    const onMenuClick = {
        newLeaf: key => {
            setInquirerTitle('Create New Leaf')
            setInquirerType('newLeaf')
            setRenameKey(key)
            setRenameOn(true)
        },
        rename: key => {
            setInquirerTitle('Rename Leaf')
            setInquirerType('rename')
            setRenameKey(key)
            setRenameOn(true)
        },
        delete: key => {
            service.delete('Leaf', key)
            if (key === api.leaf) service.updateApiLeaf(undefined)
        }
    }

    return (
        <>
            <ExplorerBase
                width={299}
                current={api.leaf ?? false}
                onClick={onClick}
                onContextMenu={onTopContextMenu}
            >
                {
                    api.branch ? Object.keys(irminsul[api.root]._[api.branch]._).sort(service.sortApiLeaf).map(key =>
                        <Tab
                            onContextMenu={onContextMenu}
                            className='Tab'
                            iconPosition='start'
                            id={key}
                            key={key}
                            label={<div className='Label'>{service.getApiLeafName(key)}</div>}
                            value={key}
                        />
                    ) : ''
                }
            </ExplorerBase>
            <ContextMenu
                on={menuOn}
                onClose={() => setMenuOn(false)}
                current={menuProps}
                menus={[
                    { name: 'New Leaf', onClick: onMenuClick.newLeaf },
                    { name: 'Rename', onClick: onMenuClick.rename },
                    { name: 'Move To...', onClick: onMenuClick.rename },
                    { name: 'Delete', onClick: onMenuClick.delete },
                ]}
            />
            <ContextMenu
                on={topMenuOn}
                onClose={() => setTopMenuOn(false)}
                current={topMenuProps}
                menus={[
                    { name: 'New Leaf', onClick: onMenuClick.newLeaf }
                ]}
            />
            <NameDialog
                title={inquirerTitle}
                on={renameOn}
                onClose={renameChange}
                onSubmit={renameSubmit}
            />
        </>
    )
}