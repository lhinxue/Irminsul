import Header from "./Header"


export default function SubTitle(props) {

    const icons = props.icons ?? []
    const title = props.title ?? 'SubTitle'
    const z = props.z ?? 10

    return (
        <Header
            fontStyle={{
                fontSize: '1.1rem',
                fontVariant: 'small-caps',
                letterSpacing: '.1rem',
                textDecoration: 'none'
            }}
            height={'50px'}
            icons={icons}
            title={title}
            z={z}
        />
    )

}