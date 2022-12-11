import { AccountCircleOutlined, CachedRounded, CreateNewFolderOutlined, FaceRetouchingNaturalRounded, FaceRounded, SearchOffRounded, SearchOutlined, SearchRounded, SettingsOutlined } from "@mui/icons-material";
import { Box, Breadcrumbs, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import theme from "../../config/theme";
import { Irminsul } from "../../core/irminsul";
import { c } from "../ui";

export default function Home() {

    const { api, irminsul } = useContext(Irminsul)

    const [staSearch, setStaSearch] = useState(false)

    const [value, setValue] = useState()




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

    // const irminsul = {
    //     _: {
    //         '1101332': {
    //             name: 'Company',
    //             _: {
    //                 'oopwoas': {
    //                     name: 'mihoyo',
    //                     _: {}
    //                 },
    //                 'stddf': {
    //                     name: 'stayinfront',
    //                     _: {}
    //                 },
    //                 'speye': {
    //                     name: 'sharpeye',
    //                     _: {}
    //                 }
    //             }
    //         },
    //         '1101333': {
    //             name: 'family',
    //             _: {
    //                 'oopwoas': {
    //                     name: 'mother',
    //                     _: {}
    //                 }
    //             }
    //         },
    //         '1101323': {
    //             name: 'peronsal',
    //             _: {
    //                 'oopwoas': {
    //                     name: 'study',
    //                     _: {}
    //                 },
    //                 'stddf': {
    //                     name: 'love',
    //                     _: {}
    //                 },
    //             }
    //         }
    //     }
    // }

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

    const onGetRootName = id => irminsul._[id].name

    const onGetLeafName = id => irminsul._[api.root]._[id].name

    const onSetFirstRoot = () => {
        var strFirst = Object.keys(irminsul._).sort(onSortRoot).at(0)
        api.update('root', strFirst)
        return strFirst
    }

    useEffect(() => {
        onSetFirstRoot()
        // Object.keys(irminsul._).
    }, [])

    const ZIndex = {
        AppNavigator: 11,
        AppHeader: 13,
        AppRoot: 10,
        AppIndexes: 10,
        AppEditor: 11,
        AppSearch: 12,
        AppSetting: 11,
        AppSwitch: 11,
    }
    const BoxShadow = 'rgba(149, 157, 165, 0.2) 0px 3px 6px'

    const style = {
        AppHome: {
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            "& .AppNavigator": {
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden",

                '& .AppHeader': {
                    height: 70,
                    borderBottom: '1px solid silver',
                    borderRight: '1px solid silver',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '20px',
                    paddingRight: '5px',
                    zIndex: ZIndex.AppHeader,
                    boxShadow: BoxShadow,
                    '& .Title': {
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: '1',
                        margin: 0,
                        lineHeight: 1.6,
                        fontSize: '1.4rem',
                        fontFamily: 'monospace',
                        letterSpacing: '.2rem',
                        textDecoration: 'none',
                        fontVariant: 'small-caps',
                    }
                },
                '& .AppRoot': {
                    height: 40,
                    borderBottom: '1px solid silver',
                    borderRight: '1px solid silver',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 5px 0 20px',
                    zIndex: ZIndex.AppRoot,
                    '& .Title': {
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: '1',
                        margin: 0,
                        fontSize: '1.1rem',
                        letterSpacing: '.1rem',
                        textDecoration: 'none',
                        fontVariant: 'small-caps',
                    }
                },
                "& .AppIndexes": {
                    height: 'calc(100% - 130px)',
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "row",
                    overflow: "hidden",

                    '& .AppIndex': {

                        borderRight: '1px solid silver',
                    }

                }
            },
            "& .AppEditor": {
                flexGrow: 1,
                '& .Toolbar': {
                    height: 50,
                    borderBottom: '1px solid silver',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '15px'
                }
            }

        }
    }


    return (
        <Box className="AppHome" sx={theme.AppHome}>
            <c.iAppSearch
                z={ZIndex.AppSearch}
                open={staSearch}
                onCloseSearch={onTriggerSearch}
            />

            <div className="AppNavigator">
                <div className="AppHeader">
                    <Typography className="Title" color='primary'>
                        IRMINSUL
                    </Typography>

                    <IconButton color={staSearch ? 'secondary' : 'primary'} size="small" onClick={onTriggerSearch}>
                        <SearchRounded fontSize="small" />
                    </IconButton>
                    <IconButton color="primary" size="small">
                        <SettingsOutlined fontSize="small" />
                    </IconButton>
                </div>
                <div className="AppRoot">
                    <Typography className="Title" color='primary' >
                        Mobius III: 龙
                    </Typography>
                    <IconButton color="primary" size="small">
                        <CachedRounded fontSize="small" />
                    </IconButton>
                </div>
                <div className="AppIndexes">
                    <c.AppIndex
                        z={ZIndex.AppIndexes}
                        className='Branch'
                        title='Branches'
                        width={200}
                        rowHeight={40}
                        source={Object.keys(irminsul._)}
                        current={api.root}
                        onChange={onSelectRoot}
                        icon
                        onSort={onSortRoot}
                        onGetName={(id) => irminsul._[id].name}
                    />
                    {
                        api.root ?
                            <c.AppIndex
                                z={ZIndex.AppIndexes}
                                className='Leaf'
                                title='Leaves'
                                width={300}
                                height={40}
                                source={Object.keys(irminsul._[api.root]._)}
                                current={api.leaf}
                                onChange={onSelectLeaf}
                                onSort={onSortLeaf}
                                onGetName={(id) => irminsul._[api.root]._[id].name}
                            />
                            :
                            <c.AppIndex
                                z={ZIndex.AppIndexes}
                                className='Leaf'
                                title='Leaves'
                                width={300}
                                height={40}
                            />
                    }
                </div>
            </div>
            <div className="AppEditor">
                {
                    api.leaf ?
                        <>
                            <div className="Toolbar">
                                <Breadcrumbs className="Breadcrumb" separator='·'>
                                    <Typography>
                                        {onGetRootName(api.root)}
                                    </Typography>
                                    <Typography>
                                        {onGetLeafName(api.leaf)}
                                    </Typography>
                                </Breadcrumbs>
                            </div>
                            {/* <div className="AppContent-Tag"></div> */}



                            <div className="AppContent-Content"></div>

                            <div className="AppContent-Statusbar"></div>

                        </>
                        : ''
                }
            </div>




            {/* 
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
                {
                    api.leaf ? <div className="AppContent">
                        <div className="AppContent-Toolbar">
                            <Breadcrumbs className="AppContent-Toolbar-Breadcrumb" separator='·'>
                                <Typography>
                                    {onGetRootName(api.root)}
                                </Typography>
                                <Typography>
                                    {onGetLeafName(api.leaf)}
                                </Typography>
                            </Breadcrumbs>
                        </div>
                        <div className="AppContent-Tag"></div>



                        <div className="AppContent-Content"></div>

                        <div className="AppContent-Statusbar"></div>

                    </div>
                        : ''
                }







            </div> */}




            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                color='info'
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
        </Box>

    )
}