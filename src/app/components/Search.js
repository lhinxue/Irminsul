import { SwapHorizRounded } from "@mui/icons-material";
import { IconButton, Input, InputAdornment, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Collapse from "./Collapse";
import List from "./List";
import Remix from "./Remix";
import SubTitle from "./SubTitle";

export default function Search(props) {

    const z = props.z ?? 10
    const on = props.on ?? false
    const onClose = props.onClose ?? (() => undefined)

    const style = {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        '& .Search_Container': {
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: '100%',
            '& .Search_InputContainer': {
                height: 40,
                borderBottom: '1px solid silver',
                backgroundColor: 'white',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                '& .Search_Input': {
                    flexGrow: 1,
                    paddingLeft: '20px',
                    paddingRight: '5px',
                    fontFamily: 'monospace',
                    fontSize: '13px'
                }
            }
        },
        '& .Search_Option': {
            backgroundColor: 'white',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
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
            },
            '& svg': {
                fontSize: '12px'
            },
        },
        '& .Search_Result': {
            width: '100%'
        }
    }

    return (
        <Collapse on={on} toLeft top={70} width={500} z={z} >
            <Box sx={style}>
                <SubTitle
                    title={'Search'}
                    icons={[{ icon: <Remix.arrowBack fontSize="small" color={'primary'} />, onClick: onClose }]}
                />
                <Box className='Search_Container'>
                    <Box className='Search_InputContainer'>
                        <Input className="Search_Input" disableUnderline endAdornment={
                            <InputAdornment>
                                <IconButton size="small">
                                    <Remix.deleteBack fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        } />
                    </Box>
                    <Box className='Search_Option'>
                        <Typography component={'div'} color='secondary'>Search in</Typography>
                        <Typography component={'div'} color='primary'>
                            Entire Irminsul
                        </Typography>
                        <IconButton color="primary" >
                            <SwapHorizRounded fontSize="small" />
                        </IconButton>
                    </Box>
                    <List className='Search_Result' />
                </Box>
            </Box>
        </Collapse>

    )
}