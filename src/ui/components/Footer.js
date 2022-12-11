import { Box } from "@mui/system"

export default function Footer(props) {

    const intZIndex = props.z ?? 10
    const strTitle = props.title ?? ''

    const style = {
        Footer: {
            zIndex: intZIndex,
            display: 'flex',
            alignItems: 'center',
            padding: '0 0 0 15px',
            borderTop: '1px solid silver',
            height: 40,
            '& .Title': {
                letterSpacing: '.1rem',
                fontVariant: 'small-caps',
                fontSize: 16
            }
        }
    }

    return (
        <Box className="Footer" sx={style.Footer}>
            <div className="Title">
                {strTitle}
            </div>
        </Box>
    )
}