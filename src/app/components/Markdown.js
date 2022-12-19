import { Box } from "@mui/system";
import { Mermaid } from "mdx-mermaid/lib/Mermaid";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Toc from "./Toc";

export default function Markdown({ content }) {

    return (
        <Box sx={{
            width: 'auto',
            maxWidth: '700px',
            margin: 'auto',
            padding: '20px 50px',
            // border: '1px solid silver',
            minHeight: '100%',
            backgroundColor: 'white'
        }}>
            <ReactMarkdown
                children={content}
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                    code(props) {
                        if (props.className === 'language-mermaid')
                            return <Mermaid chart={props.children} />
                        return <code>{props.children}</code>
                    },
                    p(props) {
                        console.log(props)
                        if (props.children[0] === '[toc]')
                            return <Toc md={content} level={1}></Toc>
                        return <p>{props.children}</p>
                    }
                }}
            />
        </Box>

    )
}