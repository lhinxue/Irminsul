import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { Box, Button, IconButton, Typography } from "@mui/material";
import CodeMirror, { getStatistics } from '@uiw/react-codemirror';
import { useRef, useState } from "react";
import Markdown from "./Markdown";
import Remix from "./Remix";
export default function Editor() {


    const [ct, setct] = useState(`
    
    ddddddd# Index

[toc]

# Architecture

| Layer       | Technology | Responsability                                               |
| ----------- | ---------- | ------------------------------------------------------------ |
| Application | React      | Accept and process data from Server; Analyze and display data to user; Send modified data to server. |
| Server      | NodeJs     | Accept data and write it to Database; Read data from database and send it to Application; Maintain user session. |
| Database    | MongoDB    | Store all data.                                              |
# Implementation

## Class

### Practice

~~~mermaid
classDiagram
class PracticeDTO{
	String id
	String name
	String note
	String userId
	String tag
	String startDate
	String repeat
	String record
}
class Practice {
	String id
	String name
	String note
	String userId
	String tag
	DateTime startDate
	Object repeat
	Object record
}
class Tag {
	String id
	String name
	String note
	String userId
}
class UserDTO {
	String id
	String password
	String settings
}
class User {
	String id
	String password
	Object settings
}
class DatabaseDTO
DatabaseDTO <--> PracticeDTO
DatabaseDTO <--> UserDTO
DatabaseDTO <--> Tag
Practice --> PracticeDTO : dtoFromPractice()
PracticeDTO --> Practice : dtoToPractice()
User --> UserDTO : dtoFromUser()
UserDTO --> User : dtoToUser()
Tag --* Practice : Practice.tag = Tag.id
User --* Practice : Practice.userId = User.id
~~~

# Logic

# Functions

## DTO

- dtoFromPractice
- dtoToPractice
- dtoFromUser
- dtoToUser

# Narrative Device

## Background

英雄拯救了世界，却被遗忘在了月球。你，是唯一一个记得她的人。
为了拯救她，你决定前往月球。作为普通人，你并不拥有制造飞船的能力。但是作为她的「铭记者」，你可以使用「修行」之力，横渡宇宙。

三十八万四千四百公里，是你和她的距离，也是你和「你」的距离。

## The Thirteen Flame-Chasers Archives 逐火十三英桀档案

| 位次 | 「刻印」 | 名字       | Signet      | Name       | 爱莉祝福               |
| ---- | -------- | ---------- | ----------- | ---------- | ---------------------- |
| I    | 「救世」 | 凯文       | Deliverance | Kevin      | 殉身「救世」，唯余笑靥 |
| II   | 「真我」 | 爱莉希雅   | Ego         | Elysia     |                        |
| III  | 「戒律」 | 阿波尼亚   | Discipline  | Aponia     | 命定「戒律」，自此无束 |
| IV   | 「黄金」 | 伊甸       | Gold        | Eden       | 昨日「黄金」，璀耀如歌 |
| V    | 「螺旋」 | 维尔薇     | Helix       | Vill-V     | 愚世「螺旋」，遍寻真我 |
| VI   | 「鏖灭」 | 千劫       | Decimation  | Kalpas     | 千般「鏖灭」，心未成灰 |
| VII  | 「天慧」 | 苏         | Bodhi       | Su         | 纵承「天慧」，真意难解 |
| VIII | 「刹那」 | 樱         | Setsuna     | Sakura     | 飞花「刹那」，亦是恒久 |
| IX   | 「旭光」 | 科斯魔     | Daybreak    | Kosma      | 吐绽「旭光」，别后长续 |
| X    | 「无限」 | 梅比乌斯   | Infinity    | Mobius     | 行经「无限」，因你而在 |
| XI   | 「繁星」 | 格蕾修     | Stars       | Griseo     | 列布「繁星」，入眸永铭 |
| XII  | 「浮生」 | 华         | Vicissitude | Hua        | 爱佑「浮生」，从一而终 |
| XIII | 「空梦」 | 帕朵菲莉丝 | Reverie     | Pardofelis | 只此「空梦」，虽醒仍驻 |

## Achievement

| Name                         | Requirement                                                  |
| ---------------------------- | ------------------------------------------------------------ |
|                              |                                                              |
|                              |                                                              |
| FlyMe2theMoon                | Reach the Moon                                               |
| The Fourteenth Flame-Chasers | Consecutively Hold Thirteen Flame-Chaser Signets for One Year |
| TruE                         | Consecutively Hold Thirteen Flame-Chaser Signets for Three Years |
| Marry to the World           | Consecutively Hold Thirteen Flame-Chaser Signets for Ten Years |





### Class Function

~~~js
function toPracticeDTO(p_practice) {
    const { startDate, repeat, record } = p_practice
    var v_repeat = {
        Monday: repeat[0],
        Tuesday: repeat[1],
        Wednesday: repeat[2],
        Thursday: repeat[3],
        Friday: repeat[4],
        Saturday: repeat[5],
        Sunday: repeat[6]
    }
}

function toPractice(p_practiceDTO) {
}
~~~

# Process

## Application Init

~~~mermaid
flowchart TD
	1([User Login])
	2([Fetch Practice & Tag from Database])
	3([Create Non-Exist Practices until Today])
	4([Send Updated Practices to Database])
	5([Display Practices])
	1 --> 2 --> 3 --> 4 --> 5
~~~

## Create/Modify Practice

~~~mermaid
flowchart TD
	1([Open & Modify Practice])
	2([Create Practice])
	3([Open Practice Pop-up])
	4([Enter/Modify Practice Data])
	4.1([Create/Modify Tag])
	4.2([Open Tag Pop-up])
	4.3([Validate Tag Data])
	5([Validate Practice Data])
	6([Add/Update Practice])
	6.1([Add/Update Tag])
	7([Insert/Update Practice to Database])
	7.1([Insert/Update Tag to Database])
	8([Dispaly Practices])
	2 --> 3
	1 --> 3 --> 4 --> 5 --> 6 --> 7 --> 8
	4 --> 4.1 --> 4.2 --> 4.3 --> 5 --> 6.1 --> 7.1 --> 8
~~~

## Delete Practice

~~~mermaid
flowchart TD
	1([Delete Practice])
	2([Delete Practice to Database])
	3([Display Practices])
	1 --> 2 --> 3
~~~

## Delete Tag

~~~mermaid
flowchart TD
	1([Delete Tag])
	2([Check If Tag is in Use])
	2.1([Reset Practices That Use The Tag])
	2.2([Update Practices to Database])
	3([Delete Tag to Database])
	4([Display Practices])
	1 --> 2 --> 3 --> 4
	2 --> 2.1 --> 2.2 --> 3
~~~

## Achieve Practice
    
    `)


    const [previewOn, setPreviewOn] = useState(false)
    const onSwitchPreviewOn = () => setPreviewOn(on => !on)

    const [mdStats, setMdStats] = useState({
        from: 0,
        to: 0
    })
    const md = useRef(0)

    const surroundWith = (prefix, suffix) => {
        if (previewOn) return
        suffix = suffix ?? prefix
        setct(ctContent => {
            return ctContent.substring(0, mdStats.from) +
                prefix +
                ct.substring(mdStats.from, mdStats.to) +
                suffix +
                ctContent.substring(mdStats.to)
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 'calc(100% - 501px)' }}>
            <Box

                display={'flex'} width={'100%'} sx={{
                    height: '70px', borderBottom: '1px solid silver', alignItems: 'center',
                    '& div': {
                        margin: '5px'
                    }
                }}>
                <Box>
                    <IconButton size="small" color="primary">
                        <Remix.arrowLeft fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="primary">
                        <Remix.arrowRight fontSize="small" />
                    </IconButton>


                </Box>

                <Typography flexGrow={1}>
                    title
                </Typography>
                <Box>
                    <IconButton size="small" color="secondary" onClick={onSwitchPreviewOn}>
                        {previewOn ? <Remix.markdown fontSize="small" /> : <Remix.code fontSize="small" />}
                    </IconButton>
                    <IconButton size="small" color="primary">
                        <Remix.more fontSize="small" />
                    </IconButton>


                </Box>
            </Box>
            <Box

                display={'flex'} width={'100%'} sx={{
                    height: '30px', borderBottom: '1px solid silver', alignItems: 'center',
                    '& div': {
                        margin: '5px'
                    }
                }}>
                <Button onClick={() => surroundWith('**')}>
                    <Remix.bold />
                </Button>
                <Button onClick={() => surroundWith('*')}>
                    <Remix.italic />
                </Button>
                <Button onClick={() => surroundWith('<mark>', '</mark>')}>
                    <Remix.highlight />
                </Button>
                <Button onClick={() => surroundWith('<u>', '</u>')}>
                    <Remix.underline />
                </Button>
                <Button onClick={() => surroundWith('~~')}>
                    <Remix.strikethrough />
                </Button>


            </Box>
            <Box sx={{ height: 'calc(100% - 102px)', overflow: 'scroll', }}>
                {
                    previewOn ? <Markdown content={ct} />
                        : <CodeMirror
                            ref={md}
                            extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
                            value={ct}
                            onChange={(value, viewUpdate) => {
                                setct(value)
                                console.log(getStatistics(viewUpdate))
                            }}
                            onUpdate={viewUpdate => {
                                const stats = getStatistics(viewUpdate)
                                setMdStats({
                                    from: stats.selectionAsSingle.from,
                                    to: stats.selectionAsSingle.to
                                })
                            }}
                        />
                }
            </Box>
        </Box>
    )
}