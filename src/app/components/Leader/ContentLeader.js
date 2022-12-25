import { useContext, useState } from "react"
import { Irminsul } from "../../../core/irminsul"
import NameInquirer from "../Inquirer/NameInquirer"
import Secretary from "../Secretary/__base"
import LeaderBase from "./__base"


export default function ContentLeader(props) {
    const { api, service } = useContext(Irminsul)
    const icons = props.icons ?? []
    const title = props.title ?? 'SubTitle'
    const z = props.z ?? 10
    const id = props.id

    const [menuOn, setMenuOn] = useState(false)
    const [menuProps, setMenuProps] = useState({})
    const onContextMenu = (e) => {
        e.preventDefault()
        setMenuProps({ top: e.clientY, left: e.clientX, key: e.target.id })
        setMenuOn(true)
    }


    const [renameKey, setRenameKey] = useState('')
    const [renameOn, setRenameOn] = useState(false)
    const renameChange = () => setRenameOn(on => !on)
    const renameSubmit = (name) => {
        service.rename('Root', renameKey, name)
        renameChange()
    }

    const [createTitle, setCreateTitle] = useState('')
    const [createType, setCreateType] = useState('')
    const [createKey, setCreateKey] = useState('')
    const [createOn, setCreateOn] = useState(false)
    const createChange = () => setCreateOn(on => !on)
    const createSubmit = name => {
        service.create(createType, name)
        createChange()
    }

    const onMenuClick = {
        newRoot: () => {
            setCreateTitle('Create New Root')
            setCreateType('Root')
            setCreateOn(true)
        },
        newBranch: () => {
            setCreateTitle('Create New Branch')
            setCreateType('Branch')
            setCreateOn(true)
        },
        rename: () => {
            setRenameKey(api.root)
            setRenameOn(true)
        },
        delete: () => {
            service.delete('Root', api.root)
            service.updateApiRoot(undefined)
        }
    }
    return (
        <>
            <LeaderBase
                id={id}
                fontStyle={{
                    fontSize: '1.1rem',
                    fontVariant: 'small-caps',
                    letterSpacing: '.1rem',
                    textDecoration: 'none'
                }}
                onContextMenu={onContextMenu}
                height={'50px'}
                icons={icons}
                title={title}
                z={z}
            >
                {api.root ? service.getApiRootName(api.root) : ''}
            </LeaderBase>
            <Secretary
                on={menuOn}
                onClose={() => setMenuOn(false)}
                current={menuProps}
                menus={[
                    { name: 'New Root', onClick: onMenuClick.newRoot },
                    { name: 'New Branch', onClick: onMenuClick.newBranch },
                    { name: 'Rename', onClick: onMenuClick.rename },
                    { name: 'Delete', onClick: onMenuClick.delete },
                ]}
            />
            <NameInquirer
                title={'Rename Root'}
                on={renameOn}
                onClose={renameChange}
                onSubmit={renameSubmit}
            />
            <NameInquirer
                title={createTitle}
                on={createOn}
                onClose={createChange}
                onSubmit={createSubmit}
            />
        </>

    )

}