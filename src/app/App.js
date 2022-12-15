
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import LeyLines from '../core/irminsul';
import './App.css';
import Entry from './pages/Entry';
import Home from './pages/Home';
import Redirect from './pages/Redirect';
export default function App() {

    smoothscroll.polyfill()

    const theme = createTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#7b1fa2',
            },
            secondary: {
                main: '#ba68c8',
            },
        },
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
        },
    })
    return (
        <LeyLines>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/e" element={<Entry />} />
                        <Route path="/h" element={<Home />} />
                        <Route path="*" element={<Redirect />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </LeyLines>
    )
}