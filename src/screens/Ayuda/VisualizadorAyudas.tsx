import { Dialog, DialogTitle, Modal } from "@mui/material";

export const VisualizadorAyudas =({open,handleClose}:{open:boolean;handleClose:Function})=>{

    return(
        <Modal open={true} onClose={handleClose()}>
            <DialogTitle>hola</DialogTitle>
        </Modal>
    )
}