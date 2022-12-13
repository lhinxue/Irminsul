import { CloseRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useState } from "react";
import Collapse from "./Collapse";
import List from "./List";
import Remix from "./Remix";
import SubTitle from "./SubTitle";

export default function Setting(props) {

    const z = props.z ?? 10
    const on = props.on ?? false
    const onClose = props.onClose ?? (() => undefined)

    const menus = {
        'General': {},
        'Theme': {},
        'Account': {}
    }

    const [current, setCurrent] = useState('General')

    return (
        <Collapse
            toLeft
            z={16}
            width={500}
            top={70}
            on={on}
        >
            <Box sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', }}>
                <SubTitle
                    z={15}
                    title={'Setting'}
                    icons={[{ icon: <Remix.arrowBack fontSize="small" color={'primary'} />, onClick: onClose }]}
                />
                <Box sx={{ flexGrow: 1, backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'row' }}>
                    <List source={Object.keys(menus)}
                        onSort={() => 0} width={160}
                        current={current}
                        onKeyChange={(e, v) => setCurrent(v)}
                    />
                    <Box sx={{ borderLeft: '1px solid silver', flexGrow: 1, backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>

                        {current}
                        { }
                        { }


                    </Box>
                </Box>


            </Box>
        </Collapse>

    )
}