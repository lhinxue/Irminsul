import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function InquirerBase({
    children,
    allowSubmit,
    on = false,
    onClose = () => void 0,
    onSubmit = () => void 0,
    title = 'Title'
}) {

    const sx = {
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
        <Dialog PaperProps={{ sx: sx.Paper }} fullWidth maxWidth={'sm'} onClose={onClose} open={on} slotProps={{ backdrop: { style: sx.Backdrop } }} >
            <DialogTitle color={'primary'}>
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button disabled={!allowSubmit} onClick={onSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}