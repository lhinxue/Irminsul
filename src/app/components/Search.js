import { ClearOutlined, CloseRounded, SearchOutlined, SwapHorizRounded } from "@mui/icons-material";
import { Button, IconButton, Input, InputAdornment, MenuItem, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Collapse from "./Collapse";
import List from "./List";
import SubTitle from "./SubTitle";

export default function Search(props) {

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
                    title={'Search'}
                    icons={[{ icon: <CloseRounded fontSize="small" color={'primary'} />, onClick: onClose }]}
                />
                <Box sx={{ height: 40, borderBottom: '1px solid silver', backgroundColor: 'white', width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Input sx={{ flexGrow: 1, paddingLeft: '20px' }} className="Input" disableUnderline endAdornment={
                        <InputAdornment>
                            <IconButton size="small">
                                <ClearOutlined fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    } />
                    <Button>
                        <SearchOutlined fontSize="small" />
                    </Button>
                </Box>
                <Box sx={{
                    backgroundColor: 'white',
                    
                    width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end',
                    '&>div:first-child': {
                        fontSize: '12px',
                        marginRight: '5px'
                    },
                    '&>div:nth-child(2)': {
                        fontSize: '13px',
                        fontVariant: 'small-caps',
                    },
                    '&>button': {
                        width: '13px',
                        height: '13px',
                        marginLeft: '3px',
                        marginRight: '10px',
                        alignSelf:'center'
                    },
                    '& svg': {
                        fontSize: '12px'
                    },
                }}>
                    <Typography component={'div'} color='secondary'>
                        Search in
                    </Typography>
                    <Typography component={'div'} color='primary'>
                        Entire Irminsul
                    </Typography>
                    <IconButton color="primary">
                        <SwapHorizRounded fontSize="small" />
                    </IconButton>

                </Box>

                <List width={'100%'} />

            </Box>
        </Collapse>

    )
}