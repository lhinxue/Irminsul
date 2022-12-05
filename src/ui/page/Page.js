import { FileUploadOutlined, SourceOutlined, VisibilityOffOutlined, VisibilityOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const Page = {

    Entry: () => {

        const [staAnimation, setStaAnimation] = useState(false)
        const [staShowPassword, setStaShowPassword] = useState(false)

        const [strPassword, setStrPassword] = useState('')

        const onPasswordChange = (e) => {
            setStrPassword(e.target.value)
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
                                <InputLabel htmlFor="input-with-icon-adornment">
                                    Data Source
                                </InputLabel>
                                <Input
                                    disabled
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="end">
                                            <SourceOutlined fontSize="small" />
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end" >


                                            <IconButton component="label"
                                            ><input hidden type='file' accept=".irminsul" />
                                                <FileUploadOutlined fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="input-with-icon-adornment1">
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
    },

    Redirect: () => {
        const navigate = useNavigate()
        useEffect(() => {

        }, [])

        return (
            <Paper square sx={{ background: '#00000011', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Paper>
        )
    }
}

export default Page