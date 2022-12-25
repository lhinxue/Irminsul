import { DeleteOutlined, DriveFileRenameOutline, ExpandMoreRounded } from '@mui/icons-material'
import { Box, Button, ListItemIcon, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Irminsul } from '../../../core/irminsul'
import ContextMenu from '../ContextMenu'
import NameInquirer from '../Inquirer/NameInquirer'
import Secretary from '../Secretary/__base'
import ExplorerBase, { ExplorerItem } from './__base'

export default function BranchExplorer({
    postChange = () => void 0
}) {

    const { api,
        irminsul,
        service } = useContext(Irminsul)

    const [renameKey, setRenameKey] = useState('')
    const [renameOn, setRenameOn] = useState(false)
    const renameChange = () => setRenameOn(on => !on)
    const renameSubmit = (name) => {
        service.rename('Root', renameKey, name)
        renameChange()
    }

    const [menuOn, setMenuOn] = useState(false)
    const [menuProps, setMenuProps] = useState({})
    const onContextMenu = (e) => {
        e.preventDefault()
        setMenuProps({ top: e.clientY, left: e.clientX, key: e.target.id })
        setMenuOn(true)
    }

    const onClick = (e) => {
        service.updateApiBranch(e.target.id)
        postChange(e.target.id)
    }

    const onMenuClick = {
        rename: key => {
            setRenameKey(key)
            setRenameOn(true)
        },
        delete: key => {
            service.delete('Root', key)
            if (key === api.root) service.updateApiRoot(undefined)
        }
    }
    let source = api.root ? Object.keys(irminsul[api.root]._) : []
    useEffect(() => {
        source = api.root ? Object.keys(irminsul[api.root]._) : []
    }, [irminsul[api.root]._])

    return (
        <>
            <ExplorerBase
                current={api.branch ?? false}
                onClick={onClick}
            >
                {
                    api.root ? source.sort(service.sortApiBranch).map(key =>
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
                    { name: 'Rename', onClick: onMenuClick.rename },
                    { name: 'Delete', onClick: onMenuClick.delete },
                ]}
            />
            <NameInquirer
                title={'Rename Root'}
                on={renameOn}
                onClose={renameChange}
                onSubmit={renameSubmit}
            />
        </>
    )
}