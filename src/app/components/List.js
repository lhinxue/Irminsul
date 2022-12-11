import { ExpandMoreRounded } from '@mui/icons-material'
import { Box, Button, Tab, Tabs } from '@mui/material'

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
    const z = props.z ?? 10

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
        height: '100%',
        width: width,
        zIndex: z,
        '& .TabGroup': {
            height: '100%',
            position: 'relative',
            '& .Tab': {
                borderBottom: '1px solid silver',
                height: rowHeight,
                justifyContent: 'flex-start',
                margin: 0,
                minHeight: rowHeight,
                padding: '2px 5px 2px 20px',
                padding: 0,
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
                        className='Tab'
                        iconPosition='start'
                        key={id}
                        label={<div className='Label'>{onGetName(id)}</div>}
                        value={id}
                    />
                )}
            </Tabs>
        </Box>
    )
}