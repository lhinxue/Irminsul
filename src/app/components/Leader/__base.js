import { InfoRounded } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import IconControl from "../IconControl"
// import IconControl from "./IconControl"


export default function LeaderBase({
    fontStyle = {},
    height = 40,
    icons = [],
    z = 10,
    onContextMenu = e => e.preventDefault(),
    children
}) {

    // const fontStyle = props.fontStyle ?? {}
    // const height = props.height ?? 40
    // const icons = props.icons ?? [{ icon: <InfoRounded fontSize="small" />, onClick: () => console.warn('') }]
    // const title = props.title ?? ''
    // const z = props.z ?? 10
    // const onContextMenu = props.onContextMenu ?? (e => e.preventDefault())
    // const id = props.id ?? ''


    const sx = {
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottom: '1px solid silver', boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
        display: 'flex',
        height: height,
        padding: '0 5px 0 20px',
        zIndex: z,
        position: 'relative',
        '& h1': {
            alignItems: 'center',
            display: 'flex',
            flexGrow: '1',
            margin: 0,
            ...fontStyle
        }
    }

    return (
        <Box sx={sx} onContextMenu={onContextMenu}>
            <Typography component='h1' color='primary'>
                {children}
            </Typography>
            {icons.map(btn =>
                <IconControl
                    on={btn.on}
                    onClick={btn.onClick}
                    icon={btn.icon}
                    rotate={btn.rotate}
                    tooltip={btn.tooltip}
                    tooltipPosition={'bottom'}
                />
            )}
        </Box>
    )
}