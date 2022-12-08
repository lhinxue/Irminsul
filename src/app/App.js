
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import LeyLines from '../core/irminsul';
import Header from '../ui/component/Header';
import Tools from '../ui/component/Tools';
import Trunks from '../ui/component/Trunks';
import Page from '../ui/page/Page';
import Test from '../ui/test/Test';
import { P } from '../ui/ui';
import './App.css'

export default function App() {

    smoothscroll.polyfill()

    const theme = createTheme({
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
        },
    })
    return (
        <LeyLines>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/e" element={<P.Entry />} />
                        <Route path="/h" element={<P.Home />} />
                        <Route path="*" element={<P.Redirect />} />
                    </Routes>

                </BrowserRouter>
            </ThemeProvider>

            {/* <Header />
            <div id="content">
                <Tools />
                <Trunks />
            </div> */}

        </LeyLines>
    )
}