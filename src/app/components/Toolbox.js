import { Button, SpeedDial, SpeedDialAction } from '@mui/material'
import Remix from './Remix'

export default function Toolbox() {
    return (
        <Button
            // FabProps={{ color: 'default' }}
            variant='outlined'
            ariaLabel="SpeedDial basic example"
            sx={{ backgroundColor: 'white', position: 'absolute', bottom: 16, right: 16, borderRadius: '50%', width: '50px', minWidth: '50px', height: '50px', minHeight: '50px',
            boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
        '&:hover':{
            backgroundColor: 'white',
        }
        
        }}
        // icon={<Remix.markdown fontSize='small' color='primary' />}
        // onClick={() => console.log('ss')}
        // transitionDuration={.3}
        // elevation={0}
        >
            <Remix.markdown fontSize='small' color='primary' />
            {/* <SpeedDialAction
                icon={<Remix.attachment />}
                key='sdsd' tooltipTitle='test' /> */}

        </Button>
    )
}