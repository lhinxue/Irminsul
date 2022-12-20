import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Explorer from "../components/Explorer";
import Remix from "../components/Remix";
import Search from "../components/Search";
import Setting from "../components/Setting";
import Title from "../components/Title";
import IconControl from "./IconControl";

export default function Sidebar() {

    const [searchOn, setSearchOn] = useState(false)
    const [settingOn, setSettingOn] = useState(false)
    const [sidebarOn, setSidebarOn] = useState(true)
    const [searchZ, setSearchZ] = useState(15)
    const [settingZ, setSettingZ] = useState(15)

    const searchStateChange = () => {
        if (!searchOn) setSearchZ(17)
        setSearchOn(on => !on)
        then(() => {
            setSettingOn(false)
            setSettingZ(15)
            then(() => setSearchZ(16))
        })
    }
    const settingStateChange = () => {
        if (!settingOn) setSettingZ(17)
        setSettingOn(on => !on)
        then(() => {
            setSearchOn(false)
            setSearchZ(15)
            then(() => setSettingZ(16))
        })
    }
    const sidebarStateChange = () => setSidebarOn(pre => !pre)
    const then = (func) => setTimeout(func, 300)

    const style = {
        borderRight: '1px solid silver',
        boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: `all .3s ease`,
        width: sidebarOn ? 500 : 40,
        '& .Sidebar_Off': {
            alignItems: 'flex-start',
            backgroundColor: 'white',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            overflow: "hidden",
            position: 'absolute',
            right: 0,
            transition: `all .3s ease`,
            width: sidebarOn ? 0 : 40,
            zIndex: 20,
            '& button': {
                marginTop: '20px'
            }
        }
    }

    return (
        <Box className='Sidebar' sx={style}>
            <Title z={20} title='IRMINSUL' icons={[
                { icon: <Remix.search fontSize="small" />, onClick: searchStateChange, on: searchOn,tooltip:'Search' },
                { icon: <Remix.setting fontSize="small" />, onClick: settingStateChange, on: settingOn,tooltip:'Setting' },
                { icon: <Remix.menuFold fontSize="small" />, onClick: sidebarStateChange,tooltip:'Hide Sidebar' }
            ]} />
            <Explorer />
            <Search on={searchOn} onClose={searchStateChange} z={searchZ} />
            <Setting on={settingOn} onClose={settingStateChange} z={settingZ} />
            <Box className='Sidebar_Off'>
                <IconControl icon={<Remix.menuUnfold />} onClick={sidebarStateChange} tooltip={'Show Sidebar'} />
            </Box>
        </Box >
    )
}