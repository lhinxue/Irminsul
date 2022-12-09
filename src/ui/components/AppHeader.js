import { SettingsOutlined } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'

export default function AppHeader(props) {
    const strTitle = props.title ?? ''
    const arrIcons = props.icons ?? [{ icon: <SettingsOutlined />, onClick: () => undefined }]

    const style = {
        AppHeader: {
            zIndex: 12,
            height: 60,
            '& div': {
                height: 60,
                minHeight: 60
            },
            '& .AppHeader_Title': {
                display: 'flex',
                alignItems: 'center',
                flexGrow: '1',
                margin: 0,
                lineHeight: 1.6,
                fontWeight: 500,
                fontSize: '1.25rem',
                fontFamily: 'monospace',
                letterSpacing: '.2rem',
                textDecoration: 'none',
                color: 'inherit'
            }
        }
    }

    return (
        <AppBar className='AppHeader' position='static' sx={style.AppHeader}>
            <Toolbar>
                <div className='AppHeader_Title'>{strTitle}</div>
                {arrIcons.map(btn =>
                    <IconButton color='inherit' onClick={btn.onClick}>
                        {btn.icon}
                    </IconButton>
                )}
            </Toolbar>
        </AppBar >
    )
}

