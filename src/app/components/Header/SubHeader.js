import LeaderBase from "./__base"

export default function SubHeader({
    icons = [],
    title,
    z = 10
}) {

    return (
        <LeaderBase fontStyle={{ fontSize: '1.1rem', fontVariant: 'small-caps', letterSpacing: '.1rem', textDecoration: 'none' }} height={'50px'} icons={icons} z={z} >
            {title}
        </LeaderBase>
    )
}