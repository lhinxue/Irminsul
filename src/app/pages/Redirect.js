import { CircularProgress, Paper } from "@mui/material"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LeyLine } from "../../core/irminsul"

export default function Redirect() {
    const { irminsul, api } = useContext(LeyLine)
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