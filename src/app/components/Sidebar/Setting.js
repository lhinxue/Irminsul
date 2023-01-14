import { Box } from "@mui/system";
import { useState } from "react";
import SubHeader from "../Header/SubHeader";
import Remix from "../Icon/Remix";
import List from "../Template/List";
import Collapse from "../Template/Collapse";

export default function Setting(props) {

    const z = props.z ?? 10
    const on = props.on ?? false
    const onClose = props.onClose ?? (() => undefined)

    const [current, setCurrent] = useState('General')

    const menus = ['General', 'Theme', 'Account']
    const style = {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        '& .Setting_Container': {
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            height: '100%',
        },
        '& .Setting_Content': {
            backgroundColor: 'white',
            borderLeft: '1px solid silver',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: '100%',
        }
    }

    return (
        <Collapse on={on} toLeft top={70} width={500} z={z} >
            <Box sx={style}>
                <SubHeader
                    title={'Setting'}
                    icons={[{ icon: <Remix.arrowBack fontSize="small" color={'primary'} />, onClick: onClose }]}
                />
                <Box className='Setting_Container'>
                    <List
                        current={current}
                        onKeyChange={(e, v) => setCurrent(v)}
                        onSort={() => 0} width={160}
                        source={menus}
                    />
                    <Box className='Setting_Content'>
                        {current}
                        { }
                        { }
                    </Box>
                </Box>
            </Box>
        </Collapse>

    )
}