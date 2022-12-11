import { SettingsOutlined } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'

export default function AppHeader(props) {

    const intZIndex = props.z ?? 10
    const strTitle = props.title ?? ''
    const arrIcons = props.icons ?? [{ icon: <SettingsOutlined />, onClick: () => undefined }]

    const style = {
        AppHeader: {
            zIndex: intZIndex,
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
                fontSize: '1.25rem',
                fontFamily: 'monospace',
                letterSpacing: '.2rem',
                textDecoration: 'none',
                color: 'inherit'
            }
        }
    }

    return (
        <AppBar className='AppHeader' position='relative' sx={style.AppHeader}>
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

