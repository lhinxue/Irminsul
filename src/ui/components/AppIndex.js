import { ArrowCircleDownRounded, ArrowCircleUpRounded, ExpandMoreRounded, KeyboardDoubleArrowDownRounded, KeyboardDoubleArrowUp, KeyboardDoubleArrowUpRounded, SearchOutlined, TextSnippetOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Paper, Tab, Tabs } from '@mui/material'
import './AppIndex.css'
import { c } from "../ui"
import zIndex from '@mui/material/styles/zIndex'
import { useState } from 'react'

export default function AppIndex(props) {

    const intZIndex = props.z ?? 10
    const strClass = props.className ? `AppIndex AppIndex_${props.className}` : 'AppIndex'
    const strTitle = props.title ?? ''
    const strLabel = props.className ?? 'AppIndex'
    const intWidth = props.width ?? 200
    const intRowHeight = props.rowHeight ?? 40
    const arrKeys = props.source ?? []
    const strCurrentKey = props.current
    const onKeyChange = props.onChange
    const cpnIcon = props.icon ? <TextSnippetOutlined /> : undefined
    const onSort = props.onSort
    const onGetName = props.onGetName ?? (id => id)

    const style = {
        AppIndex: {
            zIndex: intZIndex,
            width: intWidth,
            display: 'flex',
            flexDirection: 'column',

            '& .TabGroup': {
                height: '100%',
                position: 'relative',
                '&>div': {
                    // overflowY: 'scroll !important',
                },

                '& .Tab': {
                    minHeight: intRowHeight,
                    height: intRowHeight,
                    padding: 0,
                    margin: 0,
                    justifyContent: 'flex-start',
                    padding: '2px 5px 2px 20px',
                    borderBottom: '1px solid silver',
                    '& .Label': {
                        textTransform: 'none',
                        fontWeight: 'normal'
                    }
                }
            },

        }
    }

    const [scl1, setscl1] = useState(true)
    const [scl2, setscl2] = useState(true)
    return (
        <Box className={strClass} sx={style.AppIndex}>
            <Tabs
                className='TabGroup'
                value={strCurrentKey}
                onChange={onKeyChange}
                aria-label={strLabel}
                orientation='vertical'
                variant='scrollable'
                // scrollButtons={true}
                // visibleScrollbar
                ScrollButtonComponent={({ className, direction, disabled, onClick }) => {
                    const style = {
                        position: 'absolute',
                        alignSelf: 'center',
                        zIndex: intZIndex + 1,
                        transition: 'all .2s ease-in-out',
                        transform: disabled ? direction === 'left' ? 'translateY(-20px)' : 'translateY(20px)' : 'translateY(0)',
                        backgroundColor: 'white',
                        borderRadius: 0,
                        height: 20,
                        width: '100%',
                        '&:hover': {
                            backgroundColor: 'white',
                        },
                        '& svg': {
                            opacity: 0.6,
                            transform: direction === 'left' ? 'rotate(180deg)' : ''
                        }
                    }
                    return <Button
                        color='primary'
                        className={className}
                        sx={direction === 'left' ? { ...style, top: 0, borderBottom: '1px solid silver' } : { ...style, bottom: 0, borderTop: '1px solid silver' }}
                        onClick={onClick}>

                        {direction === 'left' ? <ExpandMoreRounded fontSize='small' /> : <ExpandMoreRounded fontSize='small' />}
                    </Button>
                }

                }
            >
                {arrKeys.sort(onSort).map(id =>
                    <Tab
                        className='Tab'
                        iconPosition='start'
                        label={<div className='Label'>{onGetName(id)}</div>}
                        key={id}
                        value={id}
                    />
                )}
            </Tabs>
        </Box>
    )
}