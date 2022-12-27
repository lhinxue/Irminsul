import { DeleteOutlined, DriveFileRenameOutline, ExpandMoreRounded } from '@mui/icons-material'
import { Box, Button, ListItemIcon, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { LeyLine } from '../../../core/irminsul'
import ContextMenu from '../ContextMenu'
import NameInquirer from '../Inquirer/NameInquirer'
import Secretary from '../Secretary/__base'
import ExplorerBase, { ExplorerItem } from './__base'

export default function RootExplorer({
    postChange = () => void 0
}) {

    const { api,
        irminsul,
        service } = useContext(LeyLine)

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
        service.updateApiRoot(e.target.id)
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

    return (
        <>
            <ExplorerBase
                width={'100%'}
                height={'fit-content'}
                maxHeight={'360px'}
                current={api.root ?? false}
                onClick={onClick}
            >
                {Object.keys(irminsul).sort(service.sortApiRoot).map(key =>
                    <Tab
                        onContextMenu={onContextMenu}
                        className='Tab'
                        iconPosition='start'
                        id={key}
                        key={key}
                        label={<div className='Label'>{service.getApiRootName(key)}</div>}
                        value={key}
                    />
                )}
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