import { createContext, useState } from "react";
import { v4 } from "uuid";
import os from "./os";

export const Irminsul = createContext()

export default function LeyLines({ children }) {

    // IRMINSUL
    const [irminsul, setIrminsul] = useState({
        'a4522850-ac16-4ccc-a0bf-bb48a471f622': {
            name: 'Example',
            _: {
                'id11': {
                    name: 'Emaisl',
                    _: {
                        'id111': {
                            name: 'Gmail',
                            _: 'gmail'
                        },
                        'id112': {
                            name: 'Outlook',
                            _: 'outlook'
                        }
                    }
                },
                'id12': {
                    name: 'Books',
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
        key: undefined,
        root: undefined,
        branch: undefined,
        leaf: undefined
    })
    const updateApi = (strKey, objValue) => {
        setApi(pre => ({
            ...pre,
            [strKey]: objValue
        }))
    }
    const updateApiRoot = (v) => {
        updateApi('root', v)
        updateApi('branch', undefined)
        updateApi('leaf', undefined)
    }
    const updateApiBranch = (v) => {
        updateApi('branch', v)
        updateApi('leaf', undefined)
    }
    const updateApiLeaf = (e, v) => {
        updateApi('leaf', v)
    }
    const initApiRoot = () => {
        updateApi('root', Object.keys(irminsul)[0])
    }
    const sortApiRoot = (a, b) => {
        a = irminsul[a].name.toLowerCase()
        b = irminsul[b].name.toLowerCase()
        return ((a < b) ? -1 : ((a > b) ? 1 : 0))
    }
    const sortApiBranch = (a, b) => {
        a = irminsul[api.root]._[a].name.toLowerCase()
        b = irminsul[api.root]._[b].name.toLowerCase()
        return ((a < b) ? -1 : ((a > b) ? 1 : 0))
    }
    const sortApiLeaf = (a, b) => {
        a = irminsul._[api.root]._[api.branch]._[a].name
        b = irminsul._[api.root]._[api.branch]._[b].name
        return ((a < b) ? -1 : ((a > b) ? 1 : 0))
    }
    const getApiRootName = i => os.try(() => irminsul[i].name, '')
    const getApiBranchName = i => os.try(() => irminsul[api.root]._[i].name, '')
    const getApiLeafName = i => os.try(() => irminsul[api.root]._[api.branch]._[i].name, '')

    const getLeafContent = i => os.try(() => irminsul[api.root]._[api.branch]._[i]._, '')

    const setLeafContent = (i, c) => {
        setIrminsul(ims => {
            try {
                ims[api.root]._[api.branch]._[i]._ = c

            } catch (error) {

            }
            return ims

        })
    }

    const renameRoot = (id, name) => {
        setIrminsul(ims => {
            ims[id].name = name
            return ims
        })
    }

    const ISMRename = (type, id, name) => {
        switch (type) {
            case 'Root':
                setIrminsul(ims => {
                    ims[id].name = name
                    return ims
                })
                break
            case 'Branch':
                setIrminsul(ims => {
                    ims[api.root]._[id].name = name
                    return ims
                })
                break
            case 'Leaf':
                setIrminsul(ims => {
                    ims[api.root]._[api.branch]._[id].name = name
                    return ims
                })
                break
        }
    }

    const IMSDelete = (type, id) => {
        switch (type) {
            case 'Root':
                setIrminsul(ims => {
                    delete ims[id]
                    return ims
                })
                break
            case 'Branch':
                setIrminsul(ims => {
                    delete ims[api.root]._[id]
                    return ims
                })
                break
            case 'Leaf':
                setIrminsul(ims => {
                    delete ims[api.root]._[api.branch]._[id]
                    return ims
                })
                break
        }
    }

    const IMSCreate = (type, name, id) => {
        switch (type) {
            case 'Root':
                setIrminsul(ims => {
                    ims[v4()] = { name: name, _: {} }
                    return ims
                })
                break
            case 'Branch':
                setIrminsul(ims => {
                    ims[api.root]._[v4()] = { name: name, _: {} }
                    return ims
                })
                break
            case 'Leaf':
                setIrminsul(ims => {
                    ims[api.root]._[id]._[v4()] = { name: name, _: '' }
                    return ims
                })
                break
        }
    }

    return (
        <Irminsul.Provider value={{
            irminsul: irminsul,
            api: {
                branch: api.branch,
                leaf: api.leaf,
                root: api.root,
            },
            service: {
                getApiBranchName: getApiBranchName,
                getApiLeafName: getApiLeafName,
                getApiRootName: getApiRootName,
                initApiRoot: initApiRoot,
                sortApiBranch: sortApiBranch,
                sortApiLeaf: sortApiLeaf,
                sortApiRoot: sortApiRoot,
                updateApiBranch: updateApiBranch,
                updateApiLeaf: updateApiLeaf,
                updateApiRoot: updateApiRoot,
                getLeafContent: getLeafContent,
                setLeafContent: setLeafContent,
                renameRoot: renameRoot,
                rename: ISMRename,
                delete: IMSDelete,
                create: IMSCreate,
            }
        }}>
            {children}
        </Irminsul.Provider>
    )
}