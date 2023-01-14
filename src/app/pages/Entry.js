import { FileUploadOutlined, SourceOutlined, VisibilityOffOutlined, VisibilityOutlined, VpnKeyOutlined } from '@mui/icons-material'
import { Alert, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Snackbar, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LeyLine } from '../../core/irminsul'
import os from '../../core/os'
import IconControl from '../components/Control/IconControl'
import PageBase from './__base'

export default function Entry() {

    // LeyLine
    const { api, service } = useContext(LeyLine)

    // State
    const [staAlertOn, setStaAlertOn] = useState(false)
    const [staAnimation, setStaAnimation] = useState(false)
    const [staPageLock, setStaPageLock] = useState(false)
    const [staShowPassword, setStaShowPassword] = useState(false)

    // Dynamic Variables
    const [strAlertMessage, setStrAlertMessage] = useState('')
    const [strAlertType, setStrAlertType] = useState('error')
    const [strFileContent, setStrFileContent] = useState('')
    const [strFilename, setStrFilename] = useState('')
    const [strPassword, setStrPassword] = useState('')

    // Core Functions
    const navigate = useNavigate()
    const unlockIrminsul = () => {
        setStaPageLock(true)
        if (strFilename === '') {
            setStrAlertType('error')
            setStrAlertMessage('Data source cannot be empty.')
            setStaAlertOn(true)
            setTimeout(() => {
                setStaAlertOn(false)
                setStaPageLock(false)
            }, 2000)
        } else if (strPassword === '') {
            setStrAlertType('error')
            setStrAlertMessage('Password cannot be empty.')
            setStaAlertOn(true)
            setTimeout(() => {
                setStaAlertOn(false)
                setStaPageLock(false)
            }, 2000)
        } else {
            setStrAlertType('info')
            setStrAlertMessage('Processing...')
            setStaAlertOn(true)
            os.cipher(strFileContent, strPassword, resp => {
                service.setIrminsul(resp.data)
                api.set.file(strFilename)
                api.set.key(strPassword)
                setTimeout(() => {
                    setStrAlertType('success')
                    setStrAlertMessage('Successfully unlocked IRMINSUL.')
                    setTimeout(() => {
                        setStaAlertOn(false)
                        setStaPageLock(false)
                        navigate('/h')
                    }, 2000)
                }, 1000)
            }, resp => {
                setTimeout(() => {
                    setStrAlertType('error')
                    setStrAlertMessage('Failed to unlock IRMINSUL.')
                    console.log(resp)
                    setTimeout(() => {
                        setStaAlertOn(false)
                        setStaPageLock(false)
                    }, 2000)
                }, 1000)
            })
        }
    }
    const createIrminsul = () => {
        setStaPageLock(true)
        setStrAlertType('success')
        setStrAlertMessage('Creating example IRMINSUL...')
        setStaAlertOn(true)
        setTimeout(() => {
            setStaAlertOn(false)
            setStaPageLock(false)
            navigate('/h')
        }, 2000)
    }

    // Event Handlers
    const onPasswordChange = e => setStrPassword(e.target.value)
    const onFileSelect = e => {
        os.upload(e.target.files[0], (e) => setStrFileContent(e))
        setStrFilename(e.target.files[0].name.replace('.irminsul', ''))
    }

    // Styles
    const sx = {
        alignItems: 'center',
        background: '#00000011',
        justifyContent: 'center',
        '& h1': {
            bottom: staAnimation ? 'calc(50% + 125px)' : '50%',
            fontFamily: 'monospace',
            fontSize: '28px',
            letterSpacing: '0.16em',
            margin: '0',
            marginRight: '-0.16em',
            opacity: '.7',
            position: 'absolute',
            transform: staAnimation ? 'scale(1)' : 'scale(2)',
            transition: 'all 2s ease 1s'
        },
        '& .EntryWindow': {
            backgroundColor: 'white',
            height: '362px',
            marginBottom: '30px',
            opacity: staAnimation ? 1 : 0,
            transition: 'opacity 2s ease 3s',
            width: '330px',
            '&>div': {
                display: 'flex',
                flexDirection: 'column',
                padding: '0 30px',
                '&>div:first-child': {
                    borderBottom: '1px solid silver',
                    marginBottom: '20px',
                    marginTop: '115px'
                },
                '&>div:nth-child(2)': {
                    borderBottom: '1px solid silver',
                    marginBottom: '40px'
                },
                '& input': {
                    color: 'gray',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    paddingBottom: '2px',
                    paddingLeft: '10px'
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
                },
                '&>button': {
                    borderRadius: 0, border: '1px solid silver',
                    margin: 'auto',
                    padding: 0,
                    textTransform: 'none'
                },
                '& h6': {
                    fontSize: '16px',
                    fontVariant: 'small-caps',
                    margin: '3px auto 5px',
                    opacity: '.7',
                    padding: 0
                }
            }
        },
        '& .EntryAlert': {
            boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
            width: '100%'
        }
    }

    // Initialization
    useEffect(() => {
        const objTimer = setTimeout(() => {
            setStaAnimation(true)
        }, 300)
        return () => clearTimeout(objTimer)
    }, [])

    return (
        <PageBase gray sx={sx}>
            <div className='EntryWindow' >
                <div>
                    <FormControl variant='standard' disabled={staPageLock}>
                        <InputLabel>
                            Data Source
                        </InputLabel>
                        <Input
                            disabled
                            disableUnderline
                            id='input-with-icon-adornment'
                            value={strFilename}
                            startAdornment={
                                <InputAdornment position='end'>
                                    <SourceOutlined fontSize='small' />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position='end' >
                                    <IconButton component='label'>
                                        <input hidden type='file' accept='.irminsul' onChange={onFileSelect} />
                                        <FileUploadOutlined fontSize='small' />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl variant='standard' disabled={staPageLock}>
                        <InputLabel>API Key</InputLabel>
                        <Input
                            disableUnderline
                            type={staShowPassword ? 'text' : 'password'}
                            value={strPassword}
                            onChange={onPasswordChange}
                            startAdornment={
                                <InputAdornment position='end'>
                                    <VpnKeyOutlined fontSize='small' />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconControl
                                        icon={staShowPassword ? <VisibilityOutlined fontSize='small' /> : <VisibilityOffOutlined fontSize='small' />}
                                        gray
                                        onClick={() => setStaShowPassword(pre => !pre)}
                                    />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button disabled={staPageLock} fullWidth onClick={unlockIrminsul} >Unlock</Button>
                    <Typography component={'h6'}>or</Typography>
                    <Button disabled={staPageLock} fullWidth onClick={createIrminsul} >Create</Button>
                </div>
            </div>
            <Typography component={'h1'}>IRMINSUL</Typography>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={staAlertOn} >
                <Alert className='EntryAlert' severity={strAlertType}>{strAlertMessage}</Alert>
            </Snackbar>
        </PageBase>
    )
}