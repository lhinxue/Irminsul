import { Box } from '@mui/system'
import { useState } from 'react'
import Search from './Search'
import Setting from './Setting'
import IconControl from '../Control/IconControl'
import Explorer from '../Explorer/Explorer'
import Remix from '../Icon/Remix'
import Header from '../Header/Header'

export default function Sidebar() {

    // State
    const [staSearch, setStaSearch] = useState(false)
    const [staSetting, setStaSetting] = useState(false)
    const [staSidebar, setStaSidebar] = useState(true)

    // Dynamic Variables
    const [intSearchZ, setIntSearchZ] = useState(15)
    const [intSettingZ, setIntSettingZ] = useState(15)

    // Helpers
    const then = func => setTimeout(func, 300)

    // Event Handlers
    const onStaSearchChange = () => {
        if (!staSearch) setIntSearchZ(17)
        setStaSearch(on => !on)
        then(() => {
            setStaSetting(false)
            setIntSettingZ(15)
            then(() => setIntSearchZ(16))
        })
    }
    const onStaSettingChange = () => {
        if (!staSetting) setIntSettingZ(17)
        setStaSetting(on => !on)
        then(() => {
            setStaSearch(false)
            setIntSearchZ(15)
            then(() => setIntSettingZ(16))
        })
    }
    const onStaSidebarChange = () => setStaSidebar(pre => !pre)

    // Styles
    const sx = {
        borderRight: '1px solid silver',
        boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: `all .3s ease`,
        width: staSidebar ? 500 : 40,
        '& .SidebarOff': {
            alignItems: 'flex-start',
            backgroundColor: 'white',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'absolute',
            right: 0,
            transition: `all .3s ease`,
            width: staSidebar ? 0 : 40,
            zIndex: 20,
            '& button': {
                marginTop: '20px'
            }
        }
    }

    return (
        <Box className='Sidebar' sx={sx}>
            <Header z={20} title='IRMINSUL' icons={[
                { icon: <Remix.search fontSize='small' />, onClick: onStaSearchChange, on: staSearch, tooltip: 'Search' },
                { icon: <Remix.setting fontSize='small' />, onClick: onStaSettingChange, on: staSetting, tooltip: 'Setting' },
                { icon: <Remix.menuFold fontSize='small' />, onClick: onStaSidebarChange, tooltip: 'Hide Sidebar' }
            ]} />
            <Explorer />
            <Search on={staSearch} onClose={onStaSearchChange} z={intSearchZ} />
            <Setting on={staSetting} onClose={onStaSettingChange} z={intSettingZ} />
            <Box className='SidebarOff'>
                <IconControl icon={<Remix.menuUnfold />} onClick={onStaSidebarChange} tooltip={'Show Sidebar'} />
            </Box>
        </Box >
    )
}