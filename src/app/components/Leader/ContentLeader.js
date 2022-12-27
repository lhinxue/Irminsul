import { useContext, useState } from "react"
import { LeyLine } from "../../../core/irminsul"
import NameInquirer from "../Inquirer/NameInquirer"
import Secretary from "../Secretary/__base"
import LeaderBase from "./__base"


export default function ContentLeader(props) {
    const { api, service } = useContext(LeyLine)
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


    // const [renameKey, setRenameKey] = useState('')
    // const [renameOn, setRenameOn] = useState(false)
    // const renameChange = () => setRenameOn(on => !on)
    // const renameSubmit = (name) => {
    //     service.rename('Root', renameKey, name)
    //     renameChange()
    // }

    const [createTitle, setCreateTitle] = useState('')
    const [createType, setCreateType] = useState('')
    const [createKey, setCreateKey] = useState('')
    const [createOn, setCreateOn] = useState(false)
    const createChange = () => setCreateOn(on => !on)
    const createSubmit = name => {
        service.create(createType, name)
        createChange()
    }

    const [inquirerTitle, setInquirerTitle] = useState('')
    const [inquirerType, setInquirerType] = useState('')
    const [renameKey, setRenameKey] = useState('')
    const [renameOn, setRenameOn] = useState(false)
    const renameChange = () => setRenameOn(on => !on)
    const renameSubmit = (name) => {
        switch (inquirerType) {
            case 'newRoot':
                service.create('Root', name)
                break
            case 'newBranch':
                service.create('Branch', name)
                break
            case 'rename':
                service.rename('Root', renameKey, name)
                break
            case 'delete':

                break

        }

        renameChange()
    }
    const onMenuClick = {
        newRoot: key => {
            setInquirerTitle('Create New Root')
            setInquirerType('newRoot')
            setRenameKey(key)
            setRenameOn(true)
        },
        newBranch: key => {
            setInquirerTitle('Create New Branch')
            setInquirerType('newBranch')
            setRenameKey(key)
            setRenameOn(true)
        },
        rename: key => {
            setInquirerTitle('Rename Root')
            setInquirerType('rename')
            setRenameKey(key)
            setRenameOn(true)
        },
        delete: key => {
            service.delete('Root', key)
            if (key === api.root) service.updateApiRoot(undefined)
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
                menus={api.root ? [
                    { name: 'New Root', onClick: onMenuClick.newRoot },
                    { name: 'New Branch', onClick: onMenuClick.newBranch },
                    { name: 'Rename', onClick: onMenuClick.rename },
                    { name: 'Delete', onClick: onMenuClick.delete },
                ] : [{ name: 'New Root', onClick: onMenuClick.newBranch }]
                }
            />
            <NameInquirer
                title={inquirerTitle}
                on={renameOn}
                onClose={renameChange}
                onSubmit={renameSubmit}
            />
        </>

    )

}