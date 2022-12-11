import { CalendarMonthOutlined, ClearOutlined, ExitToAppRounded, FilterAltOutlined, KeyboardBackspaceOutlined, LocalOfferOutlined, SearchOutlined } from "@mui/icons-material";
import { Box, Button, ButtonGroup, FormControl, IconButton, Input, Typography } from "@mui/material";
import { c } from "../ui"

export default function iAppSearch(props) {

    const intZIndex = props.z ?? 10
    const staSearch = props.open ?? false
    const onCloseSearch = props.onCloseSearch ?? (() => undefined)

    const style = {
        AppSearch: {
            zIndex: intZIndex,
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'all .3s ease-in-out',
            backgroundColor: 'white',
            top: 71,
            height: 'calc(100% - 71px)',
            width: 501,
            opacity: staSearch ? 1 : 0,
            transform: staSearch ? 'translateX(0)' : 'translateX(-550px)',
            '& .Header': {
                height: 40,
                borderBottom: '1px solid silver',
                display: 'flex',
                alignItems: 'center',
                padding: '0 5px 0 20px',
                '& .Title': {
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: '1',
                    margin: 0,
                    fontSize: '1.1rem',
                    letterSpacing: '.1rem',
                    textDecoration: 'none',
                    fontVariant: 'small-caps',
                }
            },
            '& .AppSearch_Input': {
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px solid silver',
                width: '100%',
                '& .CubeButton.Search': {
                    borderLeft: '1px solid silver',
                },
                '& .Input': {
                    flexGrow: 1,
                    padding: '5px 5px 2px',
                    height: 40,
                    borderLeft: '1px solid silver'
                }
            },
            '& .AppSearch_Output': {
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                '& .Toolbar': {
                    width: 40,
                    borderRight: '1px solid silver',
                    '&>div': {
                        width: 40
                    }
                },
                '& .Result': {
                    flexGrow: 1
                }
            },
            '& .CubeButton, & .IconButton': {
                width: 40,
                minWidth: 40,
                height: 40,
                minHeight: 40
            },
            '& .CubeButton': {
                borderRadius: 0
            }
        }
    }

    return (
        <Box className='AppSearch' sx={style.AppSearch}>
            <div className="Header">
                <Typography className="Title" color={'primary'}>
                    Search
                </Typography>
                <IconButton color="primary" size="small" onClick={onCloseSearch}>
                    <ExitToAppRounded fontSize="small" sx={{ transform: 'rotate(180deg)' }} />
                </IconButton>
            </div>


            <div className='AppSearch_Input'>
                <Button className="CubeButton" onClick={onCloseSearch}>
                    <KeyboardBackspaceOutlined fontSize="small" />
                </Button>
                <Input className="Input" disableUnderline />
                <IconButton className="IconButton">
                    <ClearOutlined fontSize="small" />
                </IconButton>
                <Button className="CubeButton Search">
                    <SearchOutlined fontSize="small" />
                </Button>
            </div>
            <div className='AppSearch_Output'>
                <div className="Toolbar">
                    <ButtonGroup orientation="vertical">
                        <IconButton className="IconButton">
                            <FilterAltOutlined fontSize="small" />
                        </IconButton>
                        <IconButton className="IconButton">
                            <CalendarMonthOutlined fontSize="small" />
                        </IconButton>
                        <IconButton className="IconButton">
                            <LocalOfferOutlined fontSize="small" />
                        </IconButton>
                    </ButtonGroup>
                </div>
                <div className="Result">
                    Search Result
                </div>
            </div>
            <c.Footer title='Search' />
        </Box>
    )
}