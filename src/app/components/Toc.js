import { Box } from "@mui/system"

export default function Toc(props) {
    const md = props.md
    const level = props.level ?? 6

    return (
        <Box>
            {
                md.split('\n').filter((v) => ['#', '##', '###', '####', '#####', '######'].includes(v.split(' ')[0])).filter((hd) => hd.indexOf(' ') <= level).map(hd =>
                    <div className={`Toc_H${hd.indexOf(' ')}`}>
                        {
                            hd.substring(hd.indexOf(' ') + 1)
                        }
                    </div>
                )
            }
        </Box>
    )
}