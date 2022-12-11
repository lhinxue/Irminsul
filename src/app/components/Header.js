import { InfoRounded, PropaneSharp } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"


export default function Header(props) {

    const fontStyle = props.fontStyle ?? {}
    const height = props.height ?? 40
    const icons = props.icons ?? [{ icon: <InfoRounded fontSize="small" />, onClick: () => console.warn('') }]
    const title = props.title ?? ''
    const z = props.z ?? 10

    const theme = {
        alignItems: 'center',
        borderBottom: '1px solid silver',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 3px 6px',
        display: 'flex',
        height: height,
        padding: '0 5px 0 20px',
        zIndex: z,
        '& h1': {
            alignItems: 'center',
            display: 'flex',
            flexGrow: '1',
            margin: 0,
            ...fontStyle
        }
    }

    return (
        <Box className="Header" sx={theme}>
            <Typography component='h1' color='primary'>
                {title}
            </Typography>
            {icons.map(btn =>
                <IconButton color='primary' onClick={btn.onClick} size='small'>
                    {btn.icon}
                </IconButton>
            )}
        </Box>
    )
}