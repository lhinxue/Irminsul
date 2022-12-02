import { ContentCut, FavoriteBorderOutlined, Person2Outlined, PhonelinkLockOutlined, SearchOutlined, SettingsOutlined, TextSnippetOutlined } from "@mui/icons-material";
import { Box, AppBar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Tab, Tabs, Typography, Divider } from "@mui/material";
import { useState } from "react";

export default function Tools() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Paper sx={{ width: 50, height: '100%', zIndex: 10 }} square elevation={5} >
            <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" orientation="vertical" variant="scrollable">
                <Tab icon={<TextSnippetOutlined />} aria-label="phone" sx={{ minWidth: 50, minHeight: 50, padding: 0, margin: 0 }} />
                <Tab icon={<SearchOutlined />} aria-label="favorite" sx={{ minWidth: 50, minHeight: 50, padding: 0, margin: 0 }} />
            </Tabs>
        </Paper>


    )
}