import { createContext, useState } from "react";
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
                            _: {}
                        },
                        'id112': {
                            name: 'Outlook',
                            _: {}
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
        console.log(objValue)
        setApi(pre => ({
            ...pre,
            [strKey]: objValue
        }))
    }
    const updateApiRoot = (e, v) => {
        updateApi('root', v)
        updateApi('branch', undefined)
        updateApi('leaf', undefined)
    }
    const updateApiBranch = (e, v) => {
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
        a = irminsul._[a].name
        b = irminsul._[b].name
        return ((a < b) ? -1 : ((a > b) ? 1 : 0))
    }
    const sortApiBranch = (a, b) => {
        a = irminsul._[api.root]._[a].name
        b = irminsul._[api.root]._[b].name
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
            }
        }}>
            {children}
        </Irminsul.Provider>
    )
}