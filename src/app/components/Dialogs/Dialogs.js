import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useContext } from "react"
import { DialogSystem } from "./DialogProvider"

export default function Dialogs() {

    const { rename } = useContext(DialogSystem)







    return (
        <>
            <Dialog
            maxWidth={'xs'}
                open={rename.on}
                onClose={rename.off}
                fullWidth
                PaperProps={{
                    sx: {
                        boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
                        borderRadius: '0',
                        '&>h2': {
                            padding: '10px 20px 5px',
                            fontWeight: 'normal',
                            fontVariant: 'small-caps',
                            letterSpacing: '.1rem',
                            textDecoration: 'none'
                        },
                        '&>div': {
                            padding: '5px 20px'
                        },
                        '& button': {
                            textTransform: 'none'
                        }

                    }
                }}

                slotProps={{ backdrop: { style: { backgroundColor: '#0000001f' } } }}
            >
                <DialogTitle color={'primary'}>
                    {`Rename ${rename.formData.type}`}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="standard"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        value={rename.formData.name}
                        onChange={(e) => rename.update('name', e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={rename.off}>Cancel</Button>
                    <Button onClick={rename.onSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}