import { Mermaid } from "mdx-mermaid/lib/Mermaid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Toc from "./Toc";

export default function Markdown({ content }) {

    // mermaid.initialize({startOnLoad: false})

    return (
        <ReactMarkdown
            children={content}
            remarkPlugins={[remarkGfm]}
            components={{
                code(props) {
                    if (props.className === 'language-mermaid')
                        return <Mermaid chart={props.children }/>
                    return <code>{props.children}</code>
                },
                p(props) {
                    console.log(props)
                    if (props.children[0] === '[toc]')
                        return <Toc md={content} level={1}></Toc>
                    return <p {...props}>{props.children}</p>
                }
            }}
        />
    )
}