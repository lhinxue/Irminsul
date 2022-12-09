import { FileUploadOutlined, SourceOutlined, VisibilityOffOutlined, VisibilityOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper } from "@mui/material"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { useNavigate, useNavigation } from "react-router-dom"
import { Irminsul } from "../../core/irminsul"
import './Entry.css'
export default function Entry() {

    const { irminsul, api } = useContext(Irminsul)

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

    return (
        <Paper square sx={{ background: '#00000011', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={`page-entry-window ${staAnimation ? '' : 'before'}`}  >
                <Paper sx={{ height: '100%', width: '100%' }}>
                    <div>

                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment1" sx={{ fontFamily: 'inherit' }}>
                                API Key
                            </InputLabel>
                            <Input
                                id="input-with-icon-adornment1"
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
                            <InputLabel htmlFor="input-with-icon-adornment" sx={{ fontFamily: 'inherit' }}>
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
                                        <IconButton component="label"
                                        ><input hidden type='file' accept=".irminsul" onChange={onFileSelect} />
                                            <FileUploadOutlined fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div className="page-entry-window-help" onClick={() => navigate('/h')}>Create New IRMINSUL</div>
                    </div>
                </Paper>
            </div>
            <div className={`page-entry-title ${staAnimation ? '' : 'before'}`}>
                <p>
                    IRMINSUL
                </p>
            </div>
        </Paper >
    )
}