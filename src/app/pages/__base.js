import { createTheme, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { LeyLine } from "../../core/irminsul";

export default function PageBase({
    children,
    gray = false,
    sx = {}
}) {

    // LeyLine
    const { theme } = useContext(LeyLine)

    // Theme
    const muiTheme = createTheme({
        palette: {
            type: 'light',
            primary: {
                main: gray ? '#555555' : theme.primaryColor,
            },
            secondary: {
                main: gray ? '#aaaaaa' : theme.secondaryColor,
            },
        },
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
        },
    })

    return (
        <ThemeProvider theme={muiTheme}>
            <Box className='Page' sx={{ width: '100%', height: '100%', display: 'flex', ...sx }}> {children} </Box>
        </ThemeProvider>
    )
}
