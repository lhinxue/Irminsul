import { CloseRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import Collapse from "./Collapse";
import List from "./List";
import SubTitle from "./SubTitle";

export default function Setting(props) {

    const z = props.z ?? 10
    const on = props.on ?? false
    const onClose = props.onClose ?? (() => undefined)

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
                    icons={[{ icon: <CloseRounded fontSize="small" color={'primary'} />, onClick: onClose }]}
                />

                <List />

            </Box>
        </Collapse>

    )
}