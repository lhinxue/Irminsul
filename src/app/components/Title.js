import Header from "./Header"


export default function Title(props) {

    const icons = props.icons ?? []
    const title = props.title ?? 'Title'
    const z = props.z ?? 10
    const onContextMenu = props.onContextMenu

    const id = props.id
    return (
        <Header
            id={id}
            fontStyle={{
                fontFamily: 'monospace',
                fontSize: '1.4rem',
                letterSpacing: '.2rem',
                lineHeight: 1.6,
                textDecoration: 'none'
            }}
            height={'70px'}
            icons={icons}
            title={title.toUpperCase()}
            onContextMenu={onContextMenu}
            z={z}
        />
    )
}