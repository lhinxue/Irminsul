import { FileUploadOutlined, SourceOutlined, VisibilityOffOutlined, VisibilityOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Irminsul } from "../../core/irminsul"

export default function Redirect() {
    const { irminsul, api } = useContext(Irminsul)
    const navigate = useNavigate()
    useEffect(() => {
        api.key === '' ? navigate('/e') : navigate('/h')
    }, [])

    return (
        <Paper square sx={{ background: '#00000011', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
        </Paper>
    )
}