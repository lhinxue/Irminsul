import { Box } from "@mui/material"


export default function Header(props) {

    const strTitle = props.title
    const arrIcons = props.icons ?? []
    const intZ = props.z ?? 10

    return (
        <Box className="Header">
            <Typography className="Title" color={'primary'}>
                {strTitle}
            </Typography>
            {arrIcons.map(btn =>
                <IconButton color='inherit' onClick={btn.onClick}>
                    {btn.icon}
                </IconButton>
            )}
        </Box>
    )
}