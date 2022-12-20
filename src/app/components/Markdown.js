import { Box } from "@mui/system";
import { Mermaid } from "mdx-mermaid/lib/Mermaid";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Toc from "./Toc";

export default function Markdown({ content }) {

    const preProcess = (text) => {
        let reArranged = []
        let paragraph = ''
        for (const line of text.split('\n')) {
            if (line.trim() === '') {
                reArranged.push(paragraph.substring(0, paragraph.length - 4))
                paragraph = ''
            } else {
                paragraph = paragraph + line + '<br>'
            }
        }
        reArranged.push(paragraph.substring(0, paragraph.length - 4))
        return reArranged.join('\n\n')
    }

    return (
        <Box sx={{
            width: 'calc(90% - 100px)',
            maxWidth: '700px',
            margin: '30px auto',
            padding: '20px 50px',
            // border: '1px solid silver',
            minHeight: '100%',
            backgroundColor: 'white',
            boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
        }}>
            <ReactMarkdown
                children={preProcess(content)}
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                    code(props) {
                        if (props.className === 'language-mermaid')
                            return <Mermaid chart={props.children} />
                        return <code>{props.children}</code>
                    },
                    p(props) {
                        if (props.children[0] === '[toc]')
                            return <Toc md={content} level={1}></Toc>
                        return <p>{props.children}</p>
                    },
                }}
            />
        </Box>

    )
}