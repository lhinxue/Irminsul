import { DeleteOutlined, DriveFileRenameOutline, ExpandMoreRounded } from '@mui/icons-material'
import { Box, Button, ListItemIcon, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
export default function ContextMenu(props) {
    const on = props.on
    const current = props.current
    const menus = props.menus
    const onClose = props.onClose

    return (
        <Menu
            onContextMenu={e => {
                e.preventDefault()
                onClose()
            }}
            onClick={e => {
                e.preventDefault()
                onClose()
            }}
            elevation={0}
            color='primary'
            sx={{

                '& .MuiMenu-paper': {
                    borderRadius: 0,
                    boxShadow: '2px 2px 6px 0px rgba(0, 0, 0, 0.1)',
                    width: 166,
                    border: '1px solid silver'
                },
                '& ul': {
                    paddingTop: 0,
                    paddingBottom: 0
                },
                '& ul>li': {
                    borderBottom: '1px solid silver',
                    fontSize: 13,
                    fontVariant: 'small-caps',
                    letterSpacing: '.1em',
                },
                '& ul>li:last-child': {
                    borderBottom: 0
                },

            }}
            open={on}
            onClose={onClose}
            anchorReference='anchorPosition'
            anchorPosition={
                current
            }

        >
            {
                menus.map(mn =>
                    <MenuItem color='primary' onClick={() => mn.onClick(current.id)}>

                        {mn.name}
                    </MenuItem>
                )
            }

        </Menu>
    )
}