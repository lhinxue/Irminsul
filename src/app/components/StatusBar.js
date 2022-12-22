import { Box } from "@mui/material";

export default function StatusBar() {
    return (
        <Box sx={{
            position: 'absolute',
            width: '50%',
            height: '30px',
            background: 'white',
            bottom: '10px',
            display: 'flex',
            alignSelf: 'center',
            // borderRadius:'10px',
            border:'1px solid silver',
            boxShadow: '2px 2px 6px 0px rgba(0, 0, 0, 0.1)',
        }}>

        </Box>
    )
}