import LeaderBase from "./__base"

export default function Header({
    icons = [],
    title,
    z = 10
}) {

    return (
        <LeaderBase fontStyle={{ fontFamily: 'monospace', fontSize: '1.4rem', letterSpacing: '.2rem', lineHeight: 1.6, textDecoration: 'none' }} height={'70px'} icons={icons} z={z} >
            {title}
        </LeaderBase>
    )
}