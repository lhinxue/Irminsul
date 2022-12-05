import { AccountCircleOutlined, SearchOutlined, SettingsOutlined } from '@mui/icons-material'
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material'
export default function AppHeader({ title, buttons }) {
    return (
        <AppBar position="static" sx={{ zIndex: 11 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{
                    flexGrow: 1, fontFamily: 'monospace',
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none'
                }}>
                    {title}
                </Typography>
                {buttons.map(e => <IconButton color="inherit" onClick={e.onClick}>{e.icon}</IconButton>)}
                {/* 

                <IconButton
                    color="inherit"
                >
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
                </IconButton> */}
            </Toolbar>
        </AppBar>
    )
}