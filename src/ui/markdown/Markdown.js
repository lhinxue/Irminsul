import ReactMarkdown from "react-markdown";

export default function Markdown({ content }) {
    return (
        <ReactMarkdown
            children={content}
        />
    )
}