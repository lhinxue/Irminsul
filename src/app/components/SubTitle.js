import { InfoRounded, PropaneSharp } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import Header from "./Header"


export default function SubTitle(props) {

    const icons = props.icons ?? [{ icon: <InfoRounded fontSize="small" />, onClick: () => console.warn('SubTitle') }]
    const title = props.title ?? 'SubTitle'
    const z = props.z ?? 10

    return (
        <Header
            fontStyle={{
                fontSize: '1.1rem',
                fontVariant: 'small-caps',
                letterSpacing: '.1rem',
                textDecoration: 'none'
            }}
            height={40}
            icons={icons}
            title={title}
            z={z}
        />
    )

}