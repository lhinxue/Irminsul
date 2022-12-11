const fill_container = { width: "100%", height: "100%" }
const max_height = { height: "100%" }
const max_width = { width: "100%" }
const overflow_hidden = { overflow: "hidden" }
const flex = { display: "flex" }
const flex_row = { display: "flex", flexDirection: "row" }
const flex_item_center = { display: "flex", alignItems: 'center' }
const flex_column = { display: "flex", flexDirection: "column" }
const flex_grow = { flexGrow: '1' }
const shadow = { boxShadow: 'rgba(149, 157, 165, 0.2) 0px 3px 6px' }
const border_right = { borderRight: '1px solid silver' }
const border_top = { borderTop: '1px solid silver' }
const border_left = { borderLeft: '1px solid silver' }
const border_bottom = { borderBottom: '1px solid silver' }
const font_small_caps = { fontVariant: 'small-caps' }
const bt = ()=>{return ...{ fontVariant: 'small-caps' }}

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
    AppHome: {
        ...fill_container,
        ...overflow_hidden,
        ...flex_row,
        "& .AppNavigator": {
            ...flex_column,
            ...max_height,
            ...overflow_hidden,

            '& .AppHeader': {
                height: 70,
                ...border_bottom,
                ...border_right,
                ...flex_item_center,
                ...shadow,
                paddingLeft: '20px',
                paddingRight: '5px',
                '& .Title': {
                    ...flex_item_center,
                    ...flex_grow,
                    margin: 0,
                    lineHeight: 1.6,
                    fontSize: '1.4rem',
                    fontFamily: 'monospace',
                    letterSpacing: '.2rem',
                    textDecoration: 'none',
                }
            },
            '& .AppRoot': {
                height: 40,
                ...border_bottom,
                ...border_right,
                ...flex_item_center,
                padding: '0 5px 0 20px',
                zIndex: z.AppRoot,
                '& .Title': {
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: '1',
                    margin: 0,
                    fontSize: '1.1rem',
                    letterSpacing: '.1rem',
                    textDecoration: 'none',
                    fontVariant: 'small-caps',
                }
            },
            "& .AppIndexes": {
                height: 'calc(100% - 130px)',
                flexGrow: 1,
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",

                '& .AppIndex': {

                    borderRight: '1px solid silver',
                }

            }
        },
        "& .AppEditor": {
            flexGrow: 1,
            '& .Toolbar': {
                height: 50,
                borderBottom: '1px solid silver',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '15px'
            }
        }

    }
}

export default theme