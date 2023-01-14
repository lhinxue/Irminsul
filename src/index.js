
import mermaid from 'mermaid'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'

mermaid.initialize({ theme: 'neutral' })
const root = createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
