import { Box } from "@mui/system"

export default function Collapse(props) {

    const className = props.className ?? 'Collapse'
    const backgroundColor = props.backgroundColor ?? 'white'
    const bottom = props.bottom ?? 0
    const children = props.children
    const duration = props.duration ?? .3
    const height = props.height
    const left = props.left
    const on = props.on
    const right = props.right
    const toLeft = props.toLeft
    const toRight = props.toRight
    const toTop = props.toTop
    const top = props.top ?? 0
    const width = props.width ?? 300
    const z = props.z ?? 10
    const sx = props.sx ?? {}

    const style = {
        // backgroundColor: backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        height: height ?? `calc(100% - ${top}px - ${bottom}px)`,
        opacity: on ? 1 : 0,
        overflow: 'hidden',
        position: 'absolute',
        top: top,
        transform: on ? '' : toLeft ? 'translateX(-100%)' : toTop ? 'translateY(-100%)' : toRight ? 'translateX(100%)': '',
        transition: `all .3s ease`,
        width: width,
        zIndex: z,
        ...sx
    }

    return (
        <Box className={className} sx={style}>
            {children}
        </Box>
    )
}