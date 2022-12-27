import { FileUploadOutlined, SourceOutlined, VisibilityOffOutlined, VisibilityOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper, Typography } from "@mui/material"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { useNavigate, useNavigation } from "react-router-dom"
import { LeyLine } from "../../core/irminsul"
// import './Entry.css'
import PageBase from "./__base"
export default function Entry() {

    const { irminsul, api } = useContext(LeyLine)

    const [staAnimation, setStaAnimation] = useState(false)
    const [staShowPassword, setStaShowPassword] = useState(false)

    const [strPassword, setStrPassword] = useState('')
    const [strFilename, setStrFilename] = useState('')

    const navigate = useNavigate()

    const onPasswordChange = (e) => {
        setStrPassword(e.target.value)
    }
    const onFileSelect = (e) => {
        setStrFilename(e.target.files[0].name.replace('.irminsul', ''))
    }

    useEffect(() => {
        const objTimer = setTimeout(() => {
            setStaAnimation(true)
        }, 300)
        return () => clearTimeout(objTimer)
    }, [])

    const sx = {
        alignItems: 'center',
        background: '#00000011',
        justifyContent: 'center',
        '& h1': {
            bottom: staAnimation ? 'calc(50% + 60px)' : '50%',
            fontFamily: 'monospace',
            fontSize: '30px',
            letterSpacing: '0.16em',
            margin: '0',
            marginRight: '-0.16em',
            opacity: '.7',
            position: 'absolute',
            transform: staAnimation ? 'scale(1)' : 'scale(2)',
            transition: 'all 2s ease 1s',
        },
        '& .EntryWindow': {
            backgroundColor: 'white',
            height: '250px',
            marginBottom: '30px',
            opacity: staAnimation ? 1 : 0,
            transition: 'opacity 2s ease 3s',
            width: '360px',
            '&>div': {
                display: 'flex',
                flexDirection: 'column',
                padding: '0 30px',
                '&>div:first-child': {
                    marginBottom: '20px',
                    marginTop: '110px',
                },
                '&>div:nth-child(2)': {
                    borderBottom: '2px solid silver',
                    marginBottom: '10px',
                },
                '& input': {
                    color: 'gray',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    paddingBottom: '2px',
                    paddingLeft: '10px',
                },
                '& .Help': {
                    alignSelf: 'flex-end',
                    cursor: 'pointer',
                    fontSize: '12px',
                    marginTop: '-9px',
                    opacity: .8,
                    textDecoration: 'underline',
                    textDecorationColor: 'white',
                    transition: 'all .3s ease-in-out',
                    '&:hover': {
                        textDecorationColor: 'gray',
                    }
                }
            }
        }
    }

    return (
        <PageBase grey sx={sx}>
            <div className='EntryWindow' >
                <div>
                    <FormControl variant="standard">
                        <InputLabel>API Key</InputLabel>
                        <Input
                            type={staShowPassword ? 'text' : 'password'}
                            value={strPassword}
                            onChange={onPasswordChange}
                            startAdornment={
                                <InputAdornment position="end">
                                    <VpnKeyOutlined fontSize="small" />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setStaShowPassword(pre => !pre)}
                                    >
                                        {staShowPassword ? <VisibilityOutlined fontSize="small" /> : <VisibilityOffOutlined fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel>
                            Data Source
                        </InputLabel>
                        <Input
                            disabled
                            disableUnderline
                            id="input-with-icon-adornment"
                            value={strFilename}
                            startAdornment={
                                <InputAdornment position="end">
                                    <SourceOutlined fontSize="small" />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end" >
                                    <IconButton component="label">
                                        <input hidden type='file' accept=".irminsul" onChange={onFileSelect} />
                                        <FileUploadOutlined fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Typography className="Help" onClick={() => navigate('/h')}>Create New IRMINSUL</Typography>
                </div>
            </div>
            <Typography component={'h1'}>IRMINSUL</Typography>
        </PageBase>
    )
}