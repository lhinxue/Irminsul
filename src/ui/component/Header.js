import { AccountCircleOutlined, SettingsOutlined } from '@mui/icons-material'
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material'
export default function Header() {
    return (
        <AppBar  position="static" sx={{zIndex: 11}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{
                    flexGrow: 1, fontFamily: 'monospace',
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none'
                }}>
                    IRMINSUL
                </Typography>
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
    )
}