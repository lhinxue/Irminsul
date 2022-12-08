import { AccountCircleOutlined, CalendarMonthOutlined, CalendarMonthRounded, ClearOutlined, CreateNewFolderOutlined, ExitToAppOutlined, FilterAltOutlined, FilterOutlined, KeyboardBackspaceOutlined, LocalOfferOutlined, SearchOutlined, SettingsOutlined, TextSnippetOutlined } from "@mui/icons-material";
import { AppBar, Button, ButtonGroup, Collapse, FormControl, IconButton, Input, InputAdornment, OutlinedInput, SpeedDial, SpeedDialAction, SpeedDialIcon, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Irminsul } from "../../core/irminsul";
import Header from "../component/Header";
import Tools from "../component/Tools";
import Trunks from "../component/Trunks";
import AppInd from "../components/AppInd";
import { C } from "../ui";
import './Home.css'

export default function Home() {

    const [staSearch, setStaSearch] = useState(false)

    const [value, setValue] = useState()

    const { api } = useContext(Irminsul)


    const onSelectRoot = (e, v) => {
        api.update('root', v)
        api.update('leaf', undefined)
    }
    const onSelectLeaf = (e, v) => {
        api.update('leaf', v)
    }

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    const [value1, setValue1] = useState()

    const handleChange1 = (event, newValue) => {
        setValue1(newValue);
    };

    const onTriggerSearch = () => {
        if (staSearch) {

        } else {

        }
        setStaSearch(p => !p)
    }

    const irminsul = {
        _: {
            '1101332': {
                name: 'Company',
                _: {
                    'oopwoas': {
                        name: 'mihoyo',
                        _: {}
                    },
                    'stddf': {
                        name: 'stayinfront',
                        _: {}
                    },
                    'speye': {
                        name: 'sharpeye',
                        _: {}
                    }
                }
            },
            '1101333': {
                name: 'family',
                _: {
                    'oopwoas': {
                        name: 'mother',
                        _: {}
                    }
                }
            },
            '1101323': {
                name: 'peronsal',
                _: {
                    'oopwoas': {
                        name: 'study',
                        _: {}
                    },
                    'stddf': {
                        name: 'love',
                        _: {}
                    },
                }
            }
        }
    }

    const onSortRoot = (a, b) => {
        a = irminsul._[a].name
        b = irminsul._[b].name
        return ((a < b) ? -1 : ((a > b) ? 1 : 0))
    }
    const onSortLeaf = (a, b) => {
        a = irminsul._[api.root]._[a].name
        b = irminsul._[api.root]._[b].name
        return ((a < b) ? -1 : ((a > b) ? 1 : 0))
    }

    const onSetFirstRoot = () => {
        var strFirst = Object.keys(irminsul._).sort(onSortRoot).at(0)
        api.update('root', strFirst)
        return strFirst
    }

    useEffect(() => {
        onSetFirstRoot()
        // Object.keys(irminsul._).
    }, [])





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
            <div className={`AppSearch ${staSearch ? '' : 'hidden'}`} style={{ width: 500, transform: staSearch ? 'translateX(0)' : 'translateX(-550px)' }}>
                <FormControl className="AppSearch-SearchBox" variant="standard" sx={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid silver' }} >

                    <Button className="AppSearch-SearchBox-Close" color="primary" sx={{
                        borderRadius: '0',
                        width: 40, minWidth: 40, height: 40, minHeight: 40,
                    }} onClick={onTriggerSearch}>
                        <KeyboardBackspaceOutlined fontSize="small" />
                    </Button>
                    <Input
                        disableUnderline
                        className="AppSearch-SearchBox-Input"
                        sx={{ flexGrow: 1 }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton>
                                    <ClearOutlined fontSize="small" />
                                </IconButton>

                            </InputAdornment>
                        }
                    />
                    <Button className="AppSearch-SearchBox-Search" color="primary" sx={{
                        borderRadius: '0',
                        width: 40, minWidth: 40, height: 40, minHeight: 40,
                    }}>
                        <SearchOutlined fontSize="small" />
                    </Button>
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
                                <LocalOfferOutlined fontSize="small" color="" />
                            </IconButton>
                        </ButtonGroup>
                    </div>
                    <div className="AppSearch-SearchResult-Content">
                    </div>
                </div>
                <div className="AppSearch-SearchTitle">
                    Search
                </div>
            </div>

            <div id="content">
                <C.AppIndex
                    className='AppIndexRoot'
                    title='Branches'
                    width={200}
                    height={40}
                    icon
                    source={Object.keys(irminsul._)}
                    id={api.root}
                    onChange={onSelectRoot}
                    onSort={onSortRoot}
                    onGetName={(id) => irminsul._[id].name}
                />
                {
                    api.root ?
                        <C.AppIndex
                            className='AppIndexLeaf'
                            title='Leaves'
                            width={300}
                            height={40}
                            source={Object.keys(irminsul._[api.root]._)}
                            id={api.leaf}
                            onChange={onSelectLeaf}
                            onSort={onSortLeaf}
                            onGetName={(id) => irminsul._[api.root]._[id].name}
                        />
                        :
                        <C.AppIndex
                            className='AppIndexLeaf'
                            title='Leaves'
                            width={300}
                            height={40}
                        />
                }






            </div>




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
                    key={'Create1'}
                    icon={<CreateNewFolderOutlined />}
                    tooltipTitle={'create'}
                />
            </SpeedDial>
        </>

    )
}