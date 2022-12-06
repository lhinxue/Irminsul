import { TextSnippetOutlined } from '@mui/icons-material'
import { Tab, Tabs } from '@mui/material'

export default function AppIndex({ className, width = 200, height = 40, source, id, icon = false, onChange, onSort, onGetName }) {
    return (
        <div
            className={`AppIndex ${className ? className : ''}`}
            style={{ width: width }}
        >
            <Tabs
                value={id}
                onChange={onChange}
                aria-label={className ? className : 'AppIndex'}
                orientation='vertical'
                variant='scrollable'
            >
                {
                    source.sort(onSort).map(v =>
                        <Tab
                            icon={icon ? <TextSnippetOutlined /> : undefined}
                            iconPosition='start'
                            label={<div style={{ textTransform: 'none' }}>{onGetName(v)}</div>}
                            key={v}
                            value={v}
                            aria-label={v}
                            sx={{
                                minHeight: height,
                                height: height,
                                padding: 0,
                                margin: 0,
                                justifyContent: 'flex-start',
                                padding: '2px 0 2px 10px',
                                borderBottom: '1px solid silver'
                            }}
                        />)
                }
            </Tabs>
        </div>
    )



}