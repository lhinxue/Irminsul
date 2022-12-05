import { AccountCircleOutlined, CalendarMonthOutlined, CalendarMonthRounded, ClearOutlined, CreateNewFolderOutlined, ExitToAppOutlined, FilterAltOutlined, FilterOutlined, KeyboardBackspaceOutlined, LocalOfferOutlined, SearchOutlined, SettingsOutlined } from "@mui/icons-material";
import { AppBar, Button, ButtonGroup, Collapse, FormControl, IconButton, Input, InputAdornment, OutlinedInput, SpeedDial, SpeedDialAction, SpeedDialIcon, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import Header from "../component/Header";
import Tools from "../component/Tools";
import Trunks from "../component/Trunks";
import './Home.css'

export default function Home() {

    const [staSearch, setStaSearch] = useState(false)

    const onTriggerSearch = () => {
        if (staSearch) {

        } else {

        }
        setStaSearch(p => !p)
    }







    return (
        <>

            <AppBar className="AppHeader" position="static">
                <Toolbar>
                    <div id="page-home-header-title">IRMINSUL</div>
                    <IconButton color="inherit" onClick={onTriggerSearch}>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton
                        color="inherit"
                    >
                        <AccountCircleOutlined />
                    </IconButton>
                    <IconButton
                        color="inherit"
                    >
                        <SettingsOutlined />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={`AppSearch ${staSearch ? '' : 'hidden'}`} style={{ width: 550, transform: staSearch ? 'translateX(0)' : 'translateX(-550px)' }}>
                <FormControl className="AppSearch-SearchBox" variant="standard" sx={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid silver' }} >

                    <IconButton className="AppSearch-SearchBox-Close">
                        <KeyboardBackspaceOutlined fontSize="small" />
                    </IconButton>
                    <Input
                        disableUnderline
                        className="AppSearch-SearchBox-Input"
                        sx={{ flexGrow: 1 }}
                        endAdornment={
                            <InputAdornment position="end">
                                <ClearOutlined fontSize="small" />
                            </InputAdornment>
                        }
                    />
                    <IconButton className="AppSearch-SearchBox-Search">
                        <SearchOutlined fontSize="small" />
                    </IconButton>
                </FormControl>
                <div className="AppSearch-SearchResult">
                    <div className="AppSearch-SearchResult-Toolbar">
                        <ButtonGroup orientation="vertical" className="AppSearch-Toolbar-ButtonGroup">
                            <IconButton className="AppSearch-Toolbar-ButtonGroup-Button">
                                <FilterAltOutlined fontSize="small" />
                            </IconButton>
                            <IconButton className="AppSearch-Toolbar-ButtonGroup-Button">
                                <CalendarMonthOutlined fontSize="small" />
                            </IconButton>
                            <IconButton className="AppSearch-Toolbar-ButtonGroup-Button">
                                <LocalOfferOutlined fontSize="small" />
                            </IconButton>
                        </ButtonGroup>
                    </div>
                    <div className="AppSearch-SearchResult-Content">
                    </div>
                </div>

            </div>

            <div id="content">
                <Tools />
                <Trunks />
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    <SpeedDialAction
                        key={'Create'}
                        icon={<CreateNewFolderOutlined />}
                        tooltipTitle={'create'}
                    />
                    <SpeedDialAction
                        key={'Create'}
                        icon={<CreateNewFolderOutlined />}
                        tooltipTitle={'create'}
                    />
                </SpeedDial>
            </div>
        </>

    )
}