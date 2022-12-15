import { Box } from "@mui/material"

export default function Toc(props) {

    const md = props.md
    const level = props.level ?? 6
    const sx = props.sx ?? {}

    return (
        <Box className='Toc' sx={sx}>
            {
                md.split('\n')
                    .filter((v) => ['#', '##', '###', '####', '#####', '######'].includes(v.split(' ')[0]))
                    .filter((hd) => hd.indexOf(' ') <= level)
                    .map(hd =>
                        <div className={`TocHd Toc_H${hd.indexOf(' ')}`}>
                            {hd.substring(hd.indexOf(' ') + 1)}
                        </div>
                    )
            }
        </Box>
    )
}