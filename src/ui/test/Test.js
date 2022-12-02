import { useState } from "react"

export default function Test() {
    const [inputFile, setInputFile] = useState(null)
    return (
        <div>
            <input
                type='file'
                accept=".irminsul"
                value={inputFile}
                onChange={e => setInputFile(e.target.files[0])}
            />

        </div>

    )
}