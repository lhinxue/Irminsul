import { createContext, useState } from "react";
export const DialogSystem = createContext()

export default function DialogProvider({ children }) {


    const [renameOn, setRenameOn] = useState(false)
    const [renameFormData, setRenameFormData] = useState({})
    const [renameSubmit, setRenameSubmit] = useState(undefined)
    const updateRenameFormData = (strKey, objValue) => {
        setRenameFormData(fd => ({
            ...fd,
            [strKey]: objValue
        }))
    }
    const openRename = (type, name, onSubmit) => {
        setRenameOn(true)
        console.log(name)
        setRenameFormData({ type: type, name: name })
        setRenameSubmit(onSubmit)
    }












    return (
        <DialogSystem.Provider value={{
            rename: {
                on: renameOn,
                off: () => setRenameOn(false),
                formData: renameFormData,
                onSubmit: renameSubmit,
                update: updateRenameFormData,
                open: openRename
            }
        }}>
            {children}
        </DialogSystem.Provider>
    )

}