import { AddOutlined, ContentCut, FavoriteBorderOutlined, Person2Outlined, PhonelinkLockOutlined, SettingsOutlined, TextSnippetOutlined } from "@mui/icons-material";
import { Box, AppBar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Tab, Tabs, Typography, Divider, Toolbar } from "@mui/material";
import { useState } from "react";

export default function Trunks() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Paper sx={{ width: 200, height: '100%', zIndex: 9 }} square elevation={5}>
                <Paper sx={{ width: 200, height: 50 }} square elevation={0}>
                    <Typography variant="h6" component="div" sx={{
                        flexGrow: 1, fontFamily: 'monospace',
                        color: 'inherit',
                        textDecoration: 'none'
                    }}>

                    </Typography>
                </Paper>
                <Divider />

            </Paper>
            <Paper sx={{ width: 300, height: '100%', zIndex: 8 }} square elevation={5}>
                <Paper sx={{ width: 200, height: 50 }} square elevation={0}>
                    <Typography variant="h6" component="div" sx={{
                        flexGrow: 1, fontFamily: 'monospace',
                        color: 'inherit',
                        textDecoration: 'none'
                    }}>

                    </Typography>
                </Paper>
                <Divider />

            </Paper>
           
        </>



    )
}