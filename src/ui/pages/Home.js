import { AccountCircleOutlined, CreateNewFolderOutlined, SearchOutlined, SettingsOutlined } from "@mui/icons-material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useContext, useEffect, useState } from "react";
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





    return (
        <>
            <c.AppHeader
                title='IRMINSUL'
                icons={[
                    { icon: <SearchOutlined />, onClick: onTriggerSearch },
                    { icon: <AccountCircleOutlined />, onClick: () => undefined },
                    { icon: <SettingsOutlined />, onClick: () => undefined }
                ]}
            />

            <c.AppSearch
                open={staSearch}
                onCloseSearch={onTriggerSearch}
            />



            <div className="AppContent">
                <div className="AppIndex">
                    <div className="AppIndexHeader">

                    </div>
                    <div className="AppIndexContainer">

                    </div>
                </div>
                <div className="AppEditor">

                </div>
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