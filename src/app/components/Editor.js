import { ArrowBack, ArrowBackIosNewRounded, ArrowForward, EditAttributesRounded, EditSharp, MenuOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Remix from "./Remix";

export default function Editor() {
    return (
        <Box flexGrow={1}>
            <Box display={'flex'} width={'100%'} sx={{
                height: '70px', borderBottom: '1px solid silver', alignItems: 'center',
                '& div': {
                    margin: '5px'
                }
            }}>
                <Box>
                    <IconButton size="small" color="primary">
                        <Remix.arrowLeft fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="primary">
                        <Remix.arrowRight fontSize="small" />
                    </IconButton>


                </Box>
                
                <Typography flexGrow={1}>
                    title
                </Typography>
                <Box>
                    <IconButton size="small" color="primary">
                        <Remix.edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="primary">
                        <Remix.more fontSize="small" />
                    </IconButton>


                </Box>
            </Box>

        </Box>
    )
}