import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function IMS100({
    form = [{ name: 'Name', id: 'Name', type: 'string' }],
    on = false,
    onClose = () => void 0,
    onSubmit = () => void 0,
    title = 'Title'
}) {

    const [formData, setFormData] = useState({})
    const updateFormData = (strKey, objValue) => {
        setFormData(fd => ({
            ...fd,
            [strKey]: objValue
        }))
    }

    const IMSClose = () => {
        onClose()
        setFormData({})
    }

    const IMSSubmit = () => {
        onSubmit(formData)
        setFormData({})
    }

    const style = {
        Paper: {
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
        },
        Backdrop: {
            backgroundColor: '#0000001f'
        }
    }

    return (
        <Dialog
            PaperProps={{ sx: style.Paper }}
            fullWidth
            maxWidth={'sm'}
            onClose={onClose}
            open={on}
            slotProps={{ backdrop: { style: style.Backdrop } }}
        >
            <DialogTitle color={'primary'}>
                {title}
            </DialogTitle>
            <DialogContent>
                {
                    form.map(fld =>
                        <TextField
                            InputProps={{ type: fld.type }}
                            autoFocus
                            fullWidth
                            id={fld.id}
                            key={fld.id}
                            label={fld.name}
                            margin="dense"
                            onChange={(e) => updateFormData(fld.id, e.target.value)}
                            value={formData[fld.id]}
                            variant="standard"
                        />
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={IMSClose}>Cancel</Button>
                <Button onClick={IMSSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}