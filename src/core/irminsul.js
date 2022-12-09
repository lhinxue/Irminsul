import { createContext, useState } from "react";

export const Irminsul = createContext()

export default function LeyLines({ children }) {

    // IRMINSUL
    const [irminsul, setIrminsul] = useState({
        'a9754b2a-3918-4a5a-bd2d-a79ded6fcf0d': {
            name: 'Example',
            _: {
                '16664bf0-bf02-4c4a-902c-4ab44485b601': {
                    name: 'Email Addresses',
                    type: 'tb',
                    _: {}
                },
                '48f24b55-5542-4005-894f-5935842d408c': {
                    name: 'Resume',
                    type: 'md',
                    _: {}
                }
            }
        },
        '6b185e41-d724-4844-a35b-e7e53d82339b': {
            name: 'Empty',
            _: {}
        }
    })
    const createTrunk = (strTrunkId) => {
        setIrminsul(pre => ({
            ...pre,
            [strTrunkId]: {}
        }))
    }
    const createBranch = (strTrunkId, strBranchId) => {
        setIrminsul(pre => ({
            ...pre,
            [strTrunkId]: {
                ...pre[strBranchId],
                [strBranchId]: {}
            }
        }))
    }
    const createLeaf = (strTrunkId, strBranchId, strLeafId) => {
        updateLeaf(strTrunkId, strBranchId, strLeafId, '')
    }
    const deleteTrunk = (strTrunkId) => {
        setIrminsul(pre => {
            delete pre[strTrunkId]
            return pre
        })
    }
    const deleteBranch = (strTrunkId, strBranchId) => {
        setIrminsul(pre => {
            delete pre[strTrunkId][strBranchId]
            return pre
        })
    }
    const deleteLeaf = (strTrunkId, strBranchId, strLeafId) => {
        setIrminsul(pre => {
            delete pre[strTrunkId][strBranchId][strLeafId]
            return pre
        })
    }
    const updateLeaf = (strTrunkId, strBranchId, strLeafId, strLeafContent) => {
        setIrminsul(pre => ({
            ...pre,
            [strTrunkId]: {
                ...pre[strBranchId],
                [strBranchId]: {
                    ...pre[strBranchId][strLeafId],
                    [strLeafId]: strLeafContent
                }
            }
        }))
    }

    // User Configuration
    const [config, setConfig] = useState({
        title: ''
    })
    const updateConfig = (strKey, objValue) => {
        setConfig(pre => ({
            ...pre,
            [strKey]: objValue
        }))
    }

    // Import & Export
    const import_data = (objData) => {
        setIrminsul(objData.Irminsul)
        setConfig(objData.Config)
    }
    const export_data = () => {
        return {
            Irminsul: irminsul,
            Config: config
        }
    }

    // 
    // User Configuration
    const [api, setApi] = useState({
        file: undefined,
        key: '',
        root: undefined,
        leaf: undefined
    })
    const updateApi = (strKey, objValue) => {
        console.log(objValue)
        setApi(pre => ({
            ...pre,
            [strKey]: objValue
        }))
    }

    return (
        <Irminsul.Provider value={{
            irminsul: {
                _: irminsul,
                set: setIrminsul,
                create: {
                    trunk: createTrunk,
                    branch: createBranch,
                    leaf: createLeaf
                },
                delete: {
                    trunk: deleteTrunk,
                    branch: deleteBranch,
                    leaf: deleteLeaf
                },
                update: {
                    leaf: updateLeaf
                },
                config: {
                    _: config,
                    set: setConfig,
                    update: updateConfig
                },
                import: import_data,
                export: export_data
            },
            api: {
                _: api,
                update: updateApi,
                file: api.file,
                key: api.key,
                root: api.root,
                leaf: api.leaf

            }
        }}>
            {children}
        </Irminsul.Provider>
    )
}