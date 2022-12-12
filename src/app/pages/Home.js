import { SearchRounded, SettingsOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import Explorer from "../components/Explorer";
import Title from "../components/Title";

export default function Home() {
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{
                width: 500, height: '100%', position: 'relative', display: 'flex',
                flexDirection: 'column'
            }}>
                <Title z={20} icons={[
                    { icon: <SearchRounded fontSize="small" /> },
                    { icon: <SettingsOutlined fontSize="small" /> }
                ]} />
                <Explorer />
            </Box>
        </Box>
    )
}