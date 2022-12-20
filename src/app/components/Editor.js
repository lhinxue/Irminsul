import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { Box, Breadcrumbs, Button, Divider, IconButton, Input, TextField, Typography } from "@mui/material";
import { borderBottom } from '@mui/system';
import CodeMirror, { getStatistics } from '@uiw/react-codemirror';
import { ContentBlock, ContentState, Editor as DraftJs, EditorState, genKey, Modifier, SelectionState } from 'draft-js';
import Immutable from 'immutable'
import { useContext, useRef, useState } from "react";
import { Irminsul } from '../../core/irminsul';
import IconControl from './IconControl';
import Markdown from "./Markdown";
import Remix from "./Remix";
export default function Editor() {

    const { api } = useContext(Irminsul)


    const [md, setMd] = useState('')

    const [previewOn, setPreviewOn] = useState(true)

    const onSwitchPreview = () => {
        if (!previewOn) {
            // setEditorState(EditorState.createWithContent(ContentState.createFromText(md)))
            setMd(editorState.getCurrentContent().getPlainText())
        }
        setPreviewOn(on => !on)
    }



    // const md = useRef(0)

    /*
    inline: bold,italic,highlight,underline,strikethrough, code
    line:h1-h6, callout
    block: code,memaid
    */




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
        if (previewOn) return
        let startKey = editorState.getSelection().getStartKey()
        let startOffset = editorState.getSelection().getStartOffset()
        let editor = EditorState.push(editorState, Modifier.insertText(editorState.getCurrentContent(), createSelection(startKey, startOffset), prefix), 'insert-characters')
        editor = EditorState.forceSelection(editor, createSelection(startKey, startOffset + prefix.length))
        setEditorState(editor)
    }

    const endWith = (suffix) => {
        if (previewOn) return
        let endKey = editorState.getSelection().getEndKey()
        let endOffset = editorState.getSelection().getEndOffset()
        let emptySelection = createSelection(endKey, endOffset)
        let editor = EditorState.push(editorState, Modifier.insertText(editorState.getCurrentContent(), emptySelection, suffix), 'insert-characters')
        editor = EditorState.forceSelection(editor, emptySelection)
        setEditorState(editor)
    }

    const surroundWith = (prefix, suffix) => {
        if (previewOn) return
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
        if (previewOn) return
        let startKey = editorState.getSelection().getStartKey()
        let startOffset = editorState.getSelection().getStartOffset()
        let editor = EditorState.push(editorState, Modifier.insertText(editorState.getCurrentContent(), SelectionState.createEmpty(startKey), prefix), 'insert-characters')
        editor = EditorState.forceSelection(editor, createSelection(startKey, startOffset + prefix.length))
        setEditorState(editor)
    }

    const blockSurroundWidth = (prefix, suffix) => {

    }

    const lineEndWith = (suffix) => {
        if (previewOn) return
        let endKey = editorState.getSelection().getEndKey()
        let endOffset = editorState.getSelection().getEndOffset()
        let content = editorState.getCurrentContent()
        let emptySelection = createSelection(endKey, endOffset)
        let editor = EditorState.push(editorState, Modifier.insertText(content, createSelection(endKey, content.getBlockForKey(endKey).getLength()), suffix), 'insert-characters')
        editor = EditorState.forceSelection(editor, emptySelection)
        setEditorState(editor)
    }

    const lineSurroundWith = (prefix, suffix) => {
        if (previewOn) return
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
        if (previewOn) return

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

    const addColumnLeft = () => {
        if (previewOn) return

        let endKey = editorState.getSelection().getEndKey()
        let content = editorState.getCurrentContent()
        let selection = editorState.getSelection()


        let blockKey = editorState.getSelection().getEndKey()
        let currentBlock = content.getBlockForKey(blockKey)
        while (true) {
            let currentBlockText = currentBlock.getText().trim()
            if (currentBlockText.startsWith('|')) {
                console.log(currentBlockText)

                currentBlock = content.getBlockBefore(currentBlock.getKey())
            } else {
                break
            }

        }
        currentBlock = content.getBlockAfter(blockKey)
        while (true) {
            let currentBlockText = currentBlock.getText().trim()
            if (currentBlockText.startsWith('|')) {
                console.log(currentBlockText)

                currentBlock = content.getBlockAfter(currentBlock.getKey())
            } else {
                break
            }

        }


        // let block1 = new ContentBlock({
        //     key: genKey(),
        //     type: 'unstyled',
        //     text: '| Column0 | Column1 | ',
        // })
        // let block2 = new ContentBlock({
        //     key: genKey(),
        //     type: 'unstyled',
        //     text: '| --- | --- | ',
        // })
        // let block3 = new ContentBlock({
        //     key: genKey(),
        //     type: 'unstyled',
        //     text: '| Cell 1-0 | Cell 1-1 |',
        // })

        // let oldBlockMap = content.getBlockMap()
        // let newBlockMap = Immutable.OrderedMap().withMutations(map => {
        //     for (let [k, v] of oldBlockMap.entries()) {
        //         map.set(k, v);
        //         if (endKey === k) {
        //             map.set(block1.key, block1);
        //             map.set(block2.key, block2);
        //             map.set(block3.key, block3);
        //         }


        //     }
        // })



        // content.merge({
        //     blockMap: content.getBlockMap().toSeq().concat([
        //         [block1.getKey(), block1], [block2.getKey(), block2], [block3.getKey(), block3]
        //     ]).toOrderedMap()
        // })


        // // content = Modifier.insertText(content, SelectionState.createEmpty(startKey), prefix)
        // // content = Modifier.insertText(content, createSelection(endKey, content.getBlockForKey(endKey).getLength()), suffix)
        // let editor = EditorState.push(
        //     editorState,
        //     ContentState.createFromBlockArray(Array.from(newBlockMap.values()))
        // )
        // editor = EditorState.forceSelection(editor, selection)
        // setEditorState(editor)
    }
    const addColumnRight = () => {

    }
    const addRowTop = () => {

    }
    const addRowBottom = () => {

    }

    const undo = () => {
        setEditorState(EditorState.undo(editorState))
    }
    const redo = () => {
        setEditorState(EditorState.redo(editorState))
    }

    const onButtonClick = {
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

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );




    const style = {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        // width: 'calc(100% - 501px)',
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
                // width: '22px',
                // height: '22px',
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
        }

    }

    return (
        <Box className='Editor' sx={style}>
            <Box className='Editor_Header'>
                <Box>
                    <IconControl icon={<Remix.arrowLeft />} />
                    <IconControl icon={<Remix.arrowRight />} />
                </Box>
                <Breadcrumbs className='Editor_Breadcrumbs' separator='·'>
                    <Typography color='inherit'>
                        root
                    </Typography>
                    <Typography color='inherit'>
                        branch
                    </Typography>
                    <Typography color='text.primary'>
                        leaf
                    </Typography>
                </Breadcrumbs>
                <Box>
                    <IconControl icon={previewOn ? <Remix.article /> : <Remix.code />} onClick={onSwitchPreview} on />
                    <IconControl icon={<Remix.attachment />} />
                </Box>
            </Box>
            <Box className='Editor_Toolbar'>
                <IconControl icon={<Remix.bold />} size={20} onClick={onButtonClick.bold} />
                <IconControl icon={<Remix.italic />} size={20} onClick={onButtonClick.italic} />
                <IconControl icon={<Remix.highlight />} size={20} onClick={onButtonClick.highlight} />
                <IconControl icon={<Remix.underline />} size={20} onClick={onButtonClick.underline} />
                <IconControl icon={<Remix.strikethrough />} size={20} onClick={onButtonClick.strikethrough} />
                <IconControl icon={<Remix.code />} size={20} onClick={onButtonClick.code} />
                <IconControl icon={<Remix.link />} size={20} onClick={onButtonClick.link} />

                <Divider orientation='vertical' />

                <IconControl icon={<Remix.h1 />} size={20} onClick={onButtonClick.h1} />
                <IconControl icon={<Remix.h2 />} size={20} onClick={onButtonClick.h2} />
                <IconControl icon={<Remix.h3 />} size={20} onClick={onButtonClick.h3} />
                <IconControl icon={<Remix.h4 />} size={20} onClick={onButtonClick.h4} />
                <IconControl icon={<Remix.h5 />} size={20} onClick={onButtonClick.h5} />
                <IconControl icon={<Remix.h6 />} size={20} onClick={onButtonClick.h6} />
                <IconControl icon={<Remix.callout />} size={20} onClick={onButtonClick.callout} />

                <Divider orientation='vertical' />

                <IconControl icon={<Remix.codeBlock />} size={20} onClick={onButtonClick.codeBlock} />
                <IconControl icon={<Remix.mermaid />} size={20} onClick={onButtonClick.mermaid} />

                <Divider orientation='vertical' />

                <IconControl icon={<Remix.table />} size={20} onClick={onButtonClick.table} />
                {/* <IconButton size='small' color='primary'>
                    <Remix.tableAddColumnLeft fontSize='small' onClick={addColumnLeft} />
                </IconButton>
                <IconButton size='small' color='primary'>
                    <Remix.tableAddColumnRight fontSize='small' />
                </IconButton>
                <IconButton size='small' color='primary'>
                    <Remix.tableAddRowTop fontSize='small' />
                </IconButton>
                <IconButton size='small' color='primary'>
                    <Remix.tableAddRowBottom fontSize='small' />
                </IconButton>

                <IconButton size='small' color='primary'>
                    <Remix.tableDeleteColumn fontSize='small' />
                </IconButton>
                <IconButton size='small' color='primary'>
                    <Remix.tableDeleteRow fontSize='small' />
                </IconButton> */}






                {/* 

                <Button onClick={() => {
                    lineSurroundWith('#####\n', '\nccccc')
                }}>
                    <Remix.bold />
                </Button>
                <Button onClick={() => {
                    undo()
                }}>
                    <Remix.italic />
                </Button>
                <Button onClick={() => surroundWith('<mark>', '</mark>')}>
                    <Remix.highlight />
                </Button>
                <Button onClick={() => surroundWith('<u>', '</u>')}>
                    <Remix.underline />
                </Button>
                <Button onClick={() => {
                    console.log({
                        startKey: editorState.getSelection().getStartKey(),
                        endKey: editorState.getSelection().getEndKey(),
                        startOffset: editorState.getSelection().getStartOffset(),
                        endOffset: editorState.getSelection().getEndOffset(),
                    })
                    let currentContent = editorState.getCurrentContent()
                    let startBlock = currentContent.getBlockForKey(editorState.getSelection().getStartKey())


                    let startBlockText = startBlock.getText()
                    startBlockText = startBlockText.substring(0, editorState.getSelection().getStartOffset()) + '~' + startBlockText.substring(editorState.getSelection().getStartOffset())
                    startBlock = startBlock.update('text', () => startBlockText)
                    // console.log(startBlock.getText())
                    // let newContentState = Modifier.setBlockData(currentContent, SelectionState.createEmpty(editorState.getSelection().getStartKey()), startBlock)
                    // console.log(newContentState.getPlainText())
                    // EditorState.push(editorState, Modifier.setBlockData(currentContent, editorState.getSelection(), startBlock), 'change-block-data')

                    var content = editorState.getCurrentContent();
                    let slc = SelectionState.createEmpty(editorState.getSelection().getStartKey())

                    slc = slc.update('anchorOffset', () => editorState.getSelection().getStartOffset())
                    slc = slc.update('focusOffset', () => editorState.getSelection().getStartOffset())

                    // var newContent = Modifier.removeRange(content, editorState.getSelection(), "backward")
                    // newContent = Modifier.setBlockData(newContent, newContent.getSelectionAfter(), new Map({ 'data': startBlockText }))
                    var newContent = Modifier.insertText(content, slc, '666')
                    // newContent = Modifier.setBlockType(newContent, newContent.getSelectionAfter(), "unstyled") //Can skip if not needed

                    var newEditor = EditorState.push(editorState, newContent, "remove-range");
                    setEditorState(newEditor)
                    // console.log(EditorState.push(editorState, Modifier.setBlockData(currentContent, editorState.getSelection(), startBlock), 'change-block-data').getPlainText())

                }}>
                    <Remix.strikethrough />
                </Button>
                <Button onClick={() => {
                    setEditorState(EditorState.createWithContent(ContentState.createFromText(ct)))
                }}>
                    <Remix.code />
                </Button>
                <Button onClick={() => {
                    // startWith('~~~\n')
                    // endWith('\n~~~')
                    console.log(editorState.getCurrentContent().getPlainText())
                }}>
                    <Remix.codeBlock />
                </Button> */}


            </Box>
            <Box className='Editor_Editor' sx={{ height: 'calc(100% - 102px)', overflowY: 'scroll', }}>

                {
                    previewOn ? <Markdown content={md} />
                        :
                        <DraftJs
                            editorState={editorState} onChange={setEditorState}
                            stripPastedStyles
                        />
                }
            </Box>
        </Box >
    )
}