import { SearchRounded, SettingsOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Collapse from "../components/Collapse";
import Editor from "../components/Editor";
import Explorer from "../components/Explorer";
import Remix from "../components/Remix";
import Search from "../components/Search";
import Setting from "../components/Setting";
import Title from "../components/Title";

export default function Sidebar() {

    const [searchOn, setSearchOn] = useState(false)
    const onSwitchSearch = () => {
        setSettingOn(false)
        setSearchOn(pre => !pre)
    }

    const [settingOn, setSettingOn] = useState(false)
    const onSwitchSetting = () => {
        setSearchOn(false)
        setSettingOn(pre => !pre)
    }

    const [selfOn, setSelfOn] = useState(true)
    const onSwitchSelf = () => setSelfOn(pre => !pre)

    return (
        <Box sx={{
            transition: `all .3s ease`,
            width: selfOn ? 500 : 40, height: '100%', position: 'relative', display: 'flex',
            flexDirection: 'column', borderRight: '1px solid silver', overflow: 'hidden', boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
        }}>
            <Title z={20} icons={[
                { icon: <Remix.search fontSize="small" />, onClick: onSwitchSearch, on: searchOn },
                { icon: <Remix.setting fontSize="small" />, onClick: onSwitchSetting, on: settingOn },
                { icon: <Remix.menuFold fontSize="small" />, onClick: onSwitchSelf }
            ]} />
            <Explorer />
            <Search on={searchOn} onClose={onSwitchSearch} z={16} />
            <Setting on={settingOn} onClose={onSwitchSetting} z={16} />
            <Box sx={{
                width: selfOn ? 0 : 40,
                height: '100%',
                backgroundColor: 'white',
                position: 'absolute',
                right: 0,
                zIndex: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                transition: `all .3s ease`,
                overflow: "hidden",
                '& button': {
                    marginTop: '20px'
                }
            }}>
                <IconButton size="small" color="primary" onClick={onSwitchSelf}>
                    <Remix.menuUnfold fontSize='small' />
                </IconButton>
            </Box>
        </Box>
    )
}