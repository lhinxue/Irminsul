import { InfoRounded, PropaneSharp } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import Header from "./Header"


export default function Title(props) {

    const icons = props.icons ?? [{ icon: <InfoRounded fontSize="small" />, onClick: () => console.warn('Title') }]
    const title = props.title ?? 'Title'
    const z = props.z ?? 10

    return (
        <Header
            fontStyle={{
                fontFamily: 'monospace',
                fontSize: '1.4rem',
                letterSpacing: '.2rem',
                lineHeight: 1.6,
                textDecoration: 'none'
            }}
            height={'70px'}
            icons={icons}
            title={title.toUpperCase()}
            z={z}
        />
    )
}