import smoothscroll from 'smoothscroll-polyfill';
import LeyLines from '../core/irminsul';
import Header from '../ui/component/Header';
import Tools from '../ui/component/Tools';
import Trunks from '../ui/component/Trunks';
import Test from '../ui/test/Test';
import './App.css'

export default function App() {

    smoothscroll.polyfill()

    return (
        <LeyLines>
            <Header />
            <div id="content">
                <Tools />
                <Trunks />
            </div>

        </LeyLines>
    )
}