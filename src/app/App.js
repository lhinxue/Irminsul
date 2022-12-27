import './App.css';
import Entry from './pages/Entry';
import Home from './pages/Home';
import LeyLines from '../core/irminsul';
import Redirect from './pages/Redirect';
import smoothscroll from 'smoothscroll-polyfill';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {

    smoothscroll.polyfill()

    return (
        <LeyLines>
            <BrowserRouter>
                <Routes>
                    <Route path="/e" element={<Entry />} />
                    <Route path="/h" element={<Home />} />
                    <Route path="*" element={<Redirect />} />
                </Routes>
            </BrowserRouter>
        </LeyLines>
    )
}