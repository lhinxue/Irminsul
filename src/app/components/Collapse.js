import { Box } from "@mui/system"
import { useState } from "react"

export default function Collapse(props) {

    const backgroundColor = props.backgroundColor ?? 'white'
    const bottom = props.bottom ?? 0
    const children = props.children
    const duration = props.duration ?? .3
    const height = props.height
    const left = props.left ?? 0
    const on = props.on
    const right = props.right ?? 0
    const toLeft = props.toLeft
    const toTop = props.toTop
    const top = props.top ?? 0
    const width = props.width ?? 300
    const z = props.z ?? 10

    const style = {
        backgroundColor: backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        height: height ?? `calc(100% - ${top}px - ${bottom}px)`,
        opacity: on ? 1 : 0,
        overflow: 'hidden',
        position: 'absolute',
        top: top,
        transform: on ? '' : toLeft ? 'translateX(-100%)' : toTop ? 'translateY(-100%)' : '',
        transition: `opacity ${duration}s ease, transform ${duration}s ease`,
        width: width,
        zIndex: z,
    }

    return (
        <Box sx={style}>
            {children}
        </Box>
    )
}