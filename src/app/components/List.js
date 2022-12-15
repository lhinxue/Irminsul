import { DeleteOutlined, DriveFileRenameOutline, ExpandMoreRounded } from '@mui/icons-material'
import { Box, Button, ListItemIcon, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'

export default function List(props) {

    const backgroundColor = props.backgroundColor ?? 'white'
    const className = props.className ? `List List_${props.className}` : 'List'
    const current = props.current
    const label = props.className ?? 'List'
    const onGetName = props.onGetName ?? (id => id)
    const onKeyChange = props.onKeyChange
    const onSort = props.onSort
    const rowHeight = props.rowHeight ?? 40
    const source = props.source ?? []
    const width = props.width ?? 200
    const height = props.height ?? '100%'
    const maxHeight = props.maxHeight ?? '100%'
    const z = props.z ?? 10
    const menus = props.menus ?? [{}]

    const ScrollButton = ({ direction, disabled, onClick }) => {

        const style = {
            alignSelf: 'center',
            backgroundColor: backgroundColor,
            borderRadius: 0,
            height: 20,
            position: 'absolute',
            transform: disabled ? direction === 'left' ? 'translateY(-100%)' : 'translateY(100%)' : 'translateY(0)',
            transition: 'all .2s ease-in-out',
            width: '100%',
            zIndex: z + 1,
            '&:hover': {
                backgroundColor: backgroundColor,
            },
            '& svg': {
                opacity: 0.6,
                transform: direction === 'left' ? 'rotate(180deg)' : ''
            }
        }

        return (
            <Button
                color='primary'
                onClick={onClick}
                sx={direction === 'left' ? { ...style, borderBottom: '1px solid silver', top: 0 } : { ...style, borderTop: '1px solid silver', bottom: 0 }}
            >
                {direction === 'left' ? <ExpandMoreRounded fontSize='small' /> : <ExpandMoreRounded fontSize='small' />}
            </Button>
        )
    }

    const style = {
        display: 'flex',
        flexDirection: 'column',
        height: height,
        maxHeight: maxHeight,
        width: width,
        zIndex: z,
        backgroundColor: backgroundColor,
        '& .TabGroup': {
            height: '100%',
            width: '100%',
            position: 'relative',
            '& .Tab': {
                width: '100%',
                maxWidth: '100%',
                borderBottom: '1px solid silver',
                height: rowHeight,
                justifyContent: 'flex-start',
                margin: 0,
                minHeight: rowHeight,
                padding: '2px 5px 2px 20px',
                '& .Label': {
                    fontWeight: 'normal',
                    textTransform: 'none'
                }
            }
        }
    }

    const onRightClick = (e) => {
        onKeyChange(e, e.target.id)
        e.preventDefault()
        setContextMenu(
            contextMenu === null ? {
                mouseX: e.clientX + 2,
                mouseY: e.clientY - 6,
            } : null
        )
    }
    const onRightClickContext = (e) => {
        e.preventDefault()
        setContextMenu(null)
    }
    const [contextMenu, setContextMenu] = useState(null)
    return (
        <Box className={className} sx={style}>
            <Tabs
                ScrollButtonComponent={ScrollButton}
                aria-label={label}
                className='TabGroup'
                onChange={onKeyChange}
                orientation='vertical'
                value={current}
                variant='scrollable'
            >
                {source.sort(onSort).map(id =>
                    <Tab
                        onContextMenu={onRightClick}
                        className='Tab'
                        iconPosition='start'
                        id={id}
                        key={id}
                        label={<div className='Label'>{onGetName(id)}</div>}
                        value={id}
                    />
                )}
            </Tabs>
            <Menu
                onContextMenu={onRightClickContext}
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
                        borderBottom: '1px solid silver'
                    },
                    '& ul>li:last-child': {
                        borderBottom: 0
                    },

                }}
                open={contextMenu !== null}
                onClose={onRightClickContext}
                anchorReference='anchorPosition'
                anchorPosition={
                    contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
                }

            >
                <MenuItem className='MenuItem' color='primary'>
                    <ListItemIcon color='primary'>
                        <DriveFileRenameOutline fontSize='small' color='primary' />
                    </ListItemIcon>
                    <Typography color='primary' sx={{
                        fontSize: 13,
                        fontVariant: 'small-caps',
                        letterSpacing: '.1em',
                    }}>
                        Rename
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <DeleteOutlined fontSize='small' />
                    </ListItemIcon>
                    <div style={{
                        fontSize: 13,
                        fontVariant: 'small-caps',
                        letterSpacing: '.1em',
                    }}>
                        Delete
                    </div>

                </MenuItem>
            </Menu>
        </Box>
    )
}