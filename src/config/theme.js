import { createContext } from "react"

const fill_container = { width: "100%", height: "100%" }
const max_height = { height: "100%" }
const max_width = { width: "100%" }
const overflow_hidden = { overflow: "hidden" }
const flex = { display: "flex" }
const flex_row = { display: "flex", flexDirection: "row" }
const flex_item_center = { display: "flex", alignItems: 'center' }
const flex_column = { display: "flex", flexDirection: "column" }
const flex_grow = { flexGrow: '1' }
const border_right = { borderRight: '1px solid silver' }
const border_top = { borderTop: '1px solid silver' }
const border_left = { borderLeft: '1px solid silver' }
const border_bottom = { borderBottom: '1px solid silver' }
const font_small_caps = { fontVariant: 'small-caps' }
const bt = () => { return { fontVariant: 'small-caps' } }
const border = '1px solid silver'
const shadow = 'rgba(149, 157, 165, 0.2) 0px 3px 6px'
const border_bottom_right = {
    borderBottom: border,
    borderRight: border
}

const z = {
    AppNavigator: 11,
    AppHeader: 13,
    AppRoot: 10,
    AppIndexes: 10,
    AppEditor: 11,
    AppSearch: 12,
    AppSetting: 11,
    AppSwitch: 11,
}


const theme = {
    Header: {
        height: 70,
        ...border_bottom_right,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '5px',
        zIndex: z.AppHeader,
        boxShadow: shadow,
        '& .Title': {
            display: 'flex',
            alignItems: 'center',
            flexGrow: '1',
            margin: 0,
            lineHeight: 1.6,
            fontSize: '1.4rem',
            fontFamily: 'monospace',
            letterSpacing: '.2rem',
            textDecoration: 'none',
            fontVariant: 'small-caps',
        }
    },
}
export default theme