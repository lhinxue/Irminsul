import { Box } from "@mui/system";
import { LeyLine } from "../../core/irminsul";
import { createTheme, ThemeProvider } from "@mui/material";
import { useContext } from "react";

export default function PageBase({
    children,
    sx,
    grey = false
}) {

    const { theme } = useContext(LeyLine)
    const muiTheme = createTheme({
        palette: {
            type: 'light',
            primary: {
                main: grey ? '#000000' : theme.primaryColor,
            },
            secondary: {
                main: grey ? '#555555' : theme.secondaryColor,
            },
        },
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
        },
    })

    return (
        <ThemeProvider theme={muiTheme}>
            <Box className='Page' sx={{ width: '100%', height: '100%', display: 'flex', ...sx }}>
                {children}
            </Box>
        </ThemeProvider>
    )
}
