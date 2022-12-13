import { SearchRounded, SettingsOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useState } from "react";
import Editor from "../components/Editor";
import Explorer from "../components/Explorer";
import Remix from "../components/Remix";
import Search from "../components/Search";
import Setting from "../components/Setting";
import Title from "../components/Title";

export default function Home() {

    const [searchOn, setSearchOn] = useState(false)
    const onSwitchSearch = () => setSearchOn(pre => !pre)

    const [settingOn, setSettingOn] = useState(false)
    const onSwitchSetting = () => setSettingOn(pre => !pre)

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
            <Box sx={{
                width: 500, height: '100%', position: 'relative', display: 'flex',
                flexDirection: 'column', borderRight: '1px solid silver', overflow: 'hidden', boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
            }}>
                <Title z={20} icons={[
                    { icon: <Remix.search fontSize="small" />, onClick: onSwitchSearch, on: searchOn },
                    { icon: <Remix.setting fontSize="small" />, onClick: onSwitchSetting, on: settingOn }
                ]} />
                <Explorer />
                <Search on={searchOn} onClose={onSwitchSearch} />
                <Setting on={settingOn} onClose={onSwitchSetting} />

            </Box>
            <Editor />
        </Box>
    )
}