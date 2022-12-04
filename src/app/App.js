import { BrowserRouter, Route, Routes } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import LeyLines from '../core/irminsul';
import Header from '../ui/component/Header';
import Tools from '../ui/component/Tools';
import Trunks from '../ui/component/Trunks';
import Page from '../ui/page/Page';
import Test from '../ui/test/Test';
import './App.css'

export default function App() {

    smoothscroll.polyfill()

    return (
        <LeyLines>
            <BrowserRouter>
                <Routes>
                    <Route path="/e" element={<Page.Entry />} />
                    <Route path="/h" />
                    <Route path="*" element={<Page.Redirect />} />
                </Routes>

            </BrowserRouter>
            {/* <Header />
            <div id="content">
                <Tools />
                <Trunks />
            </div> */}

        </LeyLines>
    )
}