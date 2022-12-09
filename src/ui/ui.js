import AppHeader from "./components/AppHeader"
import AppIndex from "./components/AppIndex"
import AppSearch from "./components/AppSearch"
import Footer from "./components/Footer"
import Entry from "./pages/Entry"
import Home from "./pages/Home"
import Redirect from "./pages/Redirect"

const p = {
    Entry: Entry,
    Home: Home,
    Redirect: Redirect
}
const c = {
    AppHeader: AppHeader,
    AppSearch: AppSearch,
    AppIndex: AppIndex,
    Footer: Footer
}

export { p, c }