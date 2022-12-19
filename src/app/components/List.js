import { DeleteOutlined, DriveFileRenameOutline, ExpandMoreRounded } from '@mui/icons-material'
import { Box, Button, ListItemIcon, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import ContextMenu from './ContextMenu'

export default function List(props) {

    const backgroundColor = props.backgroundColor ?? 'white'
    const className = props.className ? `List List_${props.className}` : 'List'
    const current = props.current
    const height = props.height ?? '100%'
    const label = props.className ?? 'List'
    const maxHeight = props.maxHeight ?? '100%'
    const menus = props.menus ?? []
    const onGetName = props.onGetName ?? (id => id)
    const onKeyChange = props.onKeyChange
    const onSort = props.onSort
    const rowHeight = props.rowHeight ?? 40
    const source = props.source ?? []
    const width = props.width ?? 200
    const z = props.z ?? 10

    const [menuOn, setMenuOn] = useState(false)
    const [menuProps, setMenuProps] = useState({})

    const onContextMenu = (e) => {
        e.preventDefault()
        setMenuProps({ top: e.clientY, left: e.clientX, id: e.target.id })
        setMenuOn(true)
    }
    const preventContextMenu = (e) => {
        e.preventDefault()
    }

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
        position: 'relative',
        '& .List_Background': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: backgroundColor,
            zIndex: 15,
        },
        '& .TabGroup': {
            height: '100%',
            width: '100%',
            position: 'relative',
            zIndex: 16,
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

    return (
        <Box className={className} sx={style}>
            <Tabs
                onContextMenu={preventContextMenu}
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
                        onContextMenu={onContextMenu}
                        className='Tab'
                        iconPosition='start'
                        id={id}
                        key={id}
                        label={<div className='Label'>{onGetName(id)}</div>}
                        value={id}
                    />
                )}
            </Tabs>
            <ContextMenu
                on={menuOn}
                onClose={() => setMenuOn(false)}
                current={menuProps}
                menus={menus}
            />
        </Box>
    )
}