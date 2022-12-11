import AppHeader from "./components/AppHeader"
import AppIndex from "./components/AppIndex"
import iAppSearch from "./components/AppSearch"
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
    iAppSearch: iAppSearch,
    AppIndex: AppIndex,
    Footer: Footer
}

// const i={
//     ImsNavigator,
//     ImsHeader,
//     ImsExplore,
//     ImsEditor
// }

/*

ImsNavigator
    ImsHeader 
    ImsExplore
        ImsTitle
        ImsIndex
    ImsSearch
        ImsSearchInput
        ImsIndex
    ImsSetting
        ImsIndex
ImsEditor




*/

export { p, c }