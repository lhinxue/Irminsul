import { Box, Breadcrumbs, Button, ButtonGroup, Divider, Typography } from "@mui/material";
import { ContentBlock, ContentState, Editor as DraftJs, EditorState, genKey, Modifier, SelectionState } from 'draft-js';
import Immutable from 'immutable';
import { useContext, useEffect, useState } from "react";
import { LeyLine } from '../../../core/irminsul';
import IconControl from '../Control/IconControl';
import Remix from "../Icon/Remix";
import Markdown from "./Markdown";
import Collapse from '../Template/Collapse';

export default function Editor() {

    // LeyLine
    const { api, service } = useContext(LeyLine)

    // State
    const [staPreviewOn, setStaPreviewOn] = useState(true)
    const [staMenuOn, setStaMenuOn] = useState(false)

    // Dynamic Variables
    const [strMd, setStrMd] = useState('')
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    // Core Functions
    const createSelection = (key, offset) => {
        let selection = SelectionState.createEmpty(key)
        selection = selection.update('anchorOffset', () => offset)
        selection = selection.update('focusOffset', () => offset)
        return selection
    }
    const createRangeSelection = (startKey, startOffset, endKey, endOffset) => {
        let selection = SelectionState.createEmpty(startKey)
        selection = selection.update('anchorOffset', () => startOffset)
        selection = selection.update('focusKey', () => endKey)
        selection = selection.update('focusOffset', () => endOffset)
        return selection
    }
    const startWith = (prefix) => {
        if (staPreviewOn) return
        let startKey = editorState.getSelection().getStartKey()
        let startOffset = editorState.getSelection().getStartOffset()
        let editor = EditorState.push(editorState, Modifier.insertText(editorState.getCurrentContent(), createSelection(startKey, startOffset), prefix), 'insert-characters')
        editor = EditorState.forceSelection(editor, createSelection(startKey, startOffset + prefix.length))
        setEditorState(editor)
    }
    const surroundWith = (prefix, suffix) => {
        if (staPreviewOn) return
        suffix = suffix ?? prefix
        let startKey = editorState.getSelection().getStartKey()
        let startOffset = editorState.getSelection().getStartOffset()
        let endKey = editorState.getSelection().getEndKey()
        let endOffset = editorState.getSelection().getEndOffset()
        let content = editorState.getCurrentContent()
        content = Modifier.insertText(content, createSelection(endKey, endOffset), suffix)
        content = Modifier.insertText(content, createSelection(startKey, startOffset), prefix)
        let editor = EditorState.push(editorState, content, 'insert-characters')
        editor = EditorState.forceSelection(editor, createRangeSelection(startKey, startOffset + prefix.length, endKey, startKey === endKey ? endOffset + prefix.length : endOffset))
        setEditorState(editor)
    }
    const lineStartWith = (prefix) => {
        if (staPreviewOn) return
        let startKey = editorState.getSelection().getStartKey()
        let startOffset = editorState.getSelection().getStartOffset()
        let editor = EditorState.push(editorState, Modifier.insertText(editorState.getCurrentContent(), SelectionState.createEmpty(startKey), prefix), 'insert-characters')
        editor = EditorState.forceSelection(editor, createSelection(startKey, startOffset + prefix.length))
        setEditorState(editor)
    }
    const lineSurroundWith = (prefix, suffix) => {
        if (staPreviewOn) return
        suffix = suffix ?? prefix
        let startKey = editorState.getSelection().getStartKey()
        let endKey = editorState.getSelection().getEndKey()
        let content = editorState.getCurrentContent()
        let selection = editorState.getSelection()

        let prefixBlock = new ContentBlock({
            key: genKey(),
            type: 'unstyled',
            text: prefix,
        })
        let suffixBlock = new ContentBlock({
            key: genKey(),
            type: 'unstyled',
            text: suffix,
        })

        let oldBlockMap = content.getBlockMap()
        let newBlockMap = Immutable.OrderedMap().withMutations(map => {
            for (let [k, v] of oldBlockMap.entries()) {
                if (startKey === k) {
                    map.set(prefixBlock.key, prefixBlock);
                    map.set(k, v);
                }

                if (endKey === k) {
                    map.set(k, v);
                    map.set(suffixBlock.key, suffixBlock);
                }

                if (startKey !== k && endKey !== k) {
                    map.set(k, v);
                }

            }
        })



        content.merge({ blockMap: content.getBlockMap().toSeq().concat([[prefixBlock.getKey(), prefixBlock]]).toOrderedMap() })


        // content = Modifier.insertText(content, SelectionState.createEmpty(startKey), prefix)
        // content = Modifier.insertText(content, createSelection(endKey, content.getBlockForKey(endKey).getLength()), suffix)
        let editor = EditorState.push(
            editorState,
            ContentState.createFromBlockArray(Array.from(newBlockMap.values()))
        )
        editor = EditorState.forceSelection(editor, selection)
        setEditorState(editor)
    }
    const insertTable = () => {
        if (staPreviewOn) return

        let endKey = editorState.getSelection().getEndKey()
        let content = editorState.getCurrentContent()
        let selection = editorState.getSelection()

        let block1 = new ContentBlock({
            key: genKey(),
            type: 'unstyled',
            text: '| Column0 | Column1 | ',
        })
        let block2 = new ContentBlock({
            key: genKey(),
            type: 'unstyled',
            text: '| --- | --- | ',
        })
        let block3 = new ContentBlock({
            key: genKey(),
            type: 'unstyled',
            text: '| Cell 1-0 | Cell 1-1 |',
        })

        let oldBlockMap = content.getBlockMap()
        let newBlockMap = Immutable.OrderedMap().withMutations(map => {
            for (let [k, v] of oldBlockMap.entries()) {
                map.set(k, v);
                if (endKey === k) {
                    map.set(block1.key, block1);
                    map.set(block2.key, block2);
                    map.set(block3.key, block3);
                }


            }
        })



        content.merge({
            blockMap: content.getBlockMap().toSeq().concat([
                [block1.getKey(), block1], [block2.getKey(), block2], [block3.getKey(), block3]
            ]).toOrderedMap()
        })


        // content = Modifier.insertText(content, SelectionState.createEmpty(startKey), prefix)
        // content = Modifier.insertText(content, createSelection(endKey, content.getBlockForKey(endKey).getLength()), suffix)
        let editor = EditorState.push(
            editorState,
            ContentState.createFromBlockArray(Array.from(newBlockMap.values()))
        )
        editor = EditorState.forceSelection(editor, selection)
        setEditorState(editor)
    }
    const undo = () => setEditorState(EditorState.undo(editorState))

    const redo = () => setEditorState(EditorState.redo(editorState))

    // Event Handlers
    const onStaMenuOnChange = () => setStaMenuOn(on => !on)
    const onStaPreviewOnChange = () => {
        if (!staPreviewOn) setStrMd(editorState.getCurrentContent().getPlainText())
        setStaPreviewOn(on => !on)
    }
    const onToolBarClick = {
        bold: () => surroundWith('**'),
        italic: () => surroundWith('*'),
        highlight: () => surroundWith('<mark>', '</mark>'),
        underline: () => surroundWith('<u>', '</u>'),
        strikethrough: () => surroundWith('~~'),
        code: () => surroundWith('`'),
        link: () => startWith('[DisplayName](Link)'),
        h1: () => lineStartWith('# '),
        h2: () => lineStartWith('## '),
        h3: () => lineStartWith('### '),
        h4: () => lineStartWith('#### '),
        h5: () => lineStartWith('##### '),
        callout: () => lineStartWith('> '),
        codeBlock: () => lineSurroundWith('~~~'),
        mermaid: () => lineSurroundWith('~~~mermaid', '~~~'),
        table: () => insertTable()
    }
    const onEditorStateChange = (es) => {
        setEditorState(es)
        service.setLeafContent(api.leaf, es.getCurrentContent().getPlainText())
    }

    // Initialization
    useEffect(() => {
        const newState = EditorState.createWithContent(ContentState.createFromText(service.getLeafContent(api.leaf)))
        setEditorState(newState)
        setStrMd(newState.getCurrentContent().getPlainText())
    }, [api.leaf])

    // Styles
    const sx = {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        position: 'relative',
        overflowX: 'hidden',
        '& .Editor_Header': {
            display: 'flex',
            width: '100%',
            height: '70px',
            borderBottom: '1px solid silver',
            alignItems: 'center',
            '&>div': {
                margin: '0 5px'
            },
            '& .Editor_Breadcrumbs': {
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                fontStyle: 'italic'
            }
        },
        '& .Editor_Toolbar': {
            display: 'flex',
            width: '100%',
            height: '30px',
            borderBottom: '1px solid silver',
            alignItems: 'center',
            justifyContent: 'center',
            '& div': {
                margin: '5px'
            },
            '& button': {
                margin: '0 3px'
            },
            '& svg': {
                width: '15px',
                height: '15px'
            }
        },
        '& .Editor_Editor': {
            backgroundColor: '#f3f3f3',
            height: 'calc(100% - 102px)',
            '& .DraftEditor-root': {
                minHeight: '100%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column'
                // backgroundColor: 'white',
            },
            '& .DraftEditor-root>div>div': {
                flexGrow: 1,
                paddingBottom: '30px'
            },
            '& .DraftEditor-root>div': {
                backgroundColor: 'white',
                maxWidth: '800px',
                margin: '30px auto',
                width: '90%',
                flexGrow: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
            },
            '& .DraftEditor-editorContainer>div>div': {
                counterReset: 'draftJsLine',
                '& >div': {
                    paddingLeft: '50px',
                    borderBottom: '1px solid #f1f1f1',
                    fontFamily: 'monospace',
                    position: 'relative',
                    // lineHeight:'16px'
                },
                '& >div:before': {
                    content: 'counter(draftJsLine)',
                    counterIncrement: 'draftJsLine',
                    position: 'absolute',
                    marginLeft: '-50px',
                    width: '40px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    color: '#ccc',
                    backgroundColor: '#fcfcfc',
                    borderRight: '1px solid #f1f1f1',
                    borderBottom: '1px solid #f1f1f1'
                }
            }
        },
        '& .EditorMenuContainer': {
            left: 'calc(100% - 300px)',
            borderLeft: '1px solid silver',
            boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
            '& .Editor_Menu': {
                borderRadius: '0',
                'Button': {
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    fontWeight: 'normal',
                    borderRadius: '0',
                    borderBottom: '1px solid silver'
                }
            }
        }
    }

    return (
        <Box className='Editor' sx={sx}>
            <Box className='Editor_Header'>
                <Box>
                    <IconControl icon={<Remix.arrowLeft />} onClick={undo} />
                    <IconControl icon={<Remix.arrowRight />} onClick={redo} />
                </Box>
                <Breadcrumbs className='Editor_Breadcrumbs' separator='·'>
                    {
                        api.root ?
                            <Typography color='inherit'>
                                {service.getApiRootName(api.root)}
                            </Typography> : ''
                    }
                    {
                        api.branch ?
                            <Typography color='inherit'>
                                {service.getApiBranchName(api.branch)}
                            </Typography> : ''
                    }
                    {
                        api.leaf ?
                            <Typography color='text.primary'>
                                {service.getApiLeafName(api.leaf)}
                            </Typography> : ''
                    }
                </Breadcrumbs>
                <Box>
                    <IconControl icon={staPreviewOn ? <Remix.article /> : <Remix.code />} onClick={onStaPreviewOnChange} />
                    <IconControl icon={<Remix.attachment />} onClick={onStaMenuOnChange} on={staMenuOn} />
                </Box>
            </Box>
            <Box className='Editor_Toolbar'>
                <IconControl icon={<Remix.bold />} size={20} onClick={onToolBarClick.bold} tooltip='Bold' />
                <IconControl icon={<Remix.italic />} size={20} onClick={onToolBarClick.italic} tooltip='Italic' />
                <IconControl icon={<Remix.highlight />} size={20} onClick={onToolBarClick.highlight} tooltip='Highlight' />
                <IconControl icon={<Remix.underline />} size={20} onClick={onToolBarClick.underline} tooltip='Underline' />
                <IconControl icon={<Remix.strikethrough />} size={20} onClick={onToolBarClick.strikethrough} tooltip='Strike through' />
                <IconControl icon={<Remix.code />} size={20} onClick={onToolBarClick.code} tooltip='Inline Code' />
                <IconControl icon={<Remix.link />} size={20} onClick={onToolBarClick.link} tooltip='Link' />
                <Divider orientation='vertical' />
                <IconControl icon={<Remix.h1 />} size={20} onClick={onToolBarClick.h1} tooltip='Header 1' />
                <IconControl icon={<Remix.h2 />} size={20} onClick={onToolBarClick.h2} tooltip='Header 2' />
                <IconControl icon={<Remix.h3 />} size={20} onClick={onToolBarClick.h3} tooltip='Header 3' />
                <IconControl icon={<Remix.h4 />} size={20} onClick={onToolBarClick.h4} tooltip='Header 4' />
                <IconControl icon={<Remix.h5 />} size={20} onClick={onToolBarClick.h5} tooltip='Header 5' />
                <IconControl icon={<Remix.h6 />} size={20} onClick={onToolBarClick.h6} tooltip='Header 6' />
                <IconControl icon={<Remix.callout />} size={20} onClick={onToolBarClick.callout} tooltip='Call out' />
                <Divider orientation='vertical' />
                <IconControl icon={<Remix.codeBlock />} size={20} onClick={onToolBarClick.codeBlock} tooltip='Code Block' />
                <IconControl icon={<Remix.mermaid />} size={20} onClick={onToolBarClick.mermaid} tooltip='Mermaid Diagram' />
                <Divider orientation='vertical' />
                <IconControl icon={<Remix.table />} size={20} onClick={onToolBarClick.table} tooltip='Table' />
            </Box>
            <Box className='Editor_Editor' sx={{ height: 'calc(100% - 102px)', overflowY: 'scroll', }}>
                {
                    staPreviewOn ?
                        <Markdown content={strMd} />
                        :
                        <DraftJs editorState={editorState} onChange={onEditorStateChange} stripPastedStyles />
                }
            </Box>
            <Collapse
                className='EditorMenuContainer'
                height='calc(100% - 102px)'
                on={staMenuOn}
                toRight
                top='102px'
                width='300px'
                z={30}
                right={0}
            >
                <Box bgcolor={'white'} width='100%' height={'100%'}>
                    <ButtonGroup className='Editor_Menu' orientation='vertical' fullWidth variant='text'>
                        <Button>Export Current Leaf as PDF</Button>
                    </ButtonGroup>
                </Box>
            </Collapse>
        </Box >
    )
}