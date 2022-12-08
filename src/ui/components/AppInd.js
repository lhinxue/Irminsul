import { FileOpenOutlined, Folder } from "@mui/icons-material"
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { useState } from "react"

export default function AppInd({ className, width = 360, height = 40, source, id, icon = false, onChange, onSort, onGetName }) {
    const irminsul = {
        _: {
            '1101332': {
                name: 'company',
                type: 'folder',
                open: true,
                _: {
                    'oopwoas': {
                        name: 'mihoyo',
                        type: 'folder',
                        open: true,
                        _: {
                            'speye': {
                                name: 'sharpeye',
                                type: 'file',
                                _: {}
                            }
                        }
                    },
                    'stddf': {
                        name: 'stayinfront',
                        type: 'file',
                        _: {}
                    }
                }
            },
            '1101333': {
                name: 'family',
                type: 'folder',
                open: false,
                _: {
                    'oopwosas': {
                        name: 'mother',
                        type: 'file',
                        _: {}
                    }
                }
            },
            '1101323': {
                name: 'peronsal',
                type: 'file',
                _: {
                }
            }
        }
    }

    const onMapIndex = (obj) => {
        if (obj.type === 'folder') {
            return (
                <Collapse in={obj.open} timeout="auto" unmountOnExit>
                    <List component={'div'} disablePadding>
                        <ListItem button>
                            <ListItemIcon>
                                <FileOpenOutlined />
                            </ListItemIcon>
                            <ListItemText primary={obj.name} />
                        </ListItem>
                    </List>
                </Collapse>
            )
        } else {
            return (
                <ListItem button>
                    <ListItemIcon>
                        <FileOpenOutlined />
                    </ListItemIcon>
                    <ListItemText primary={obj.name} />
                </ListItem>
            )
        }
    }


    return (
        <div
            className={`AppIndex ${className ? className : ''}`}
            style={{ width: width }}
        >
            <list>
                {
                    Object.keys(irminsul._).map(keyLv1 => {
                        return onMapIndex(irminsul._[keyLv1])
                        
                    })
                }
            </list>

        </div>
    )
}