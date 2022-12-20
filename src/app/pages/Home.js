import { SearchRounded, SettingsOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useState } from "react";
import Collapse from "../components/Collapse";
import Editor from "../components/Editor";
import Explorer from "../components/Explorer";
import Remix from "../components/Remix";
import Search from "../components/Search";
import Setting from "../components/Setting";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import Toolbox from "../components/Toolbox";

export default function Home() {

    const [searchOn, setSearchOn] = useState(false)
    const onSwitchSearch = () => setSearchOn(pre => !pre)

    const [settingOn, setSettingOn] = useState(false)
    const onSwitchSetting = () => setSettingOn(pre => !pre)

    const [selfOn, setSelfOn] = useState(true)
    const onSwitchSelf = () => setSelfOn(pre => !pre)

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
            <Sidebar />
            <Editor />
            <Toolbox />
        </Box>
    )
}