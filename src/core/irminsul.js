import { createContext, useState } from "react";

export const Irminsul = createContext()

export default function LeyLines({ children }) {

    // IRMINSUL
    const [irminsul, setIrminsul] = useState({}) // {id:{}}
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
    const [config, setConfig] = useState({})
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
            }
        }}>
            {children}
        </Irminsul.Provider>
    )
}