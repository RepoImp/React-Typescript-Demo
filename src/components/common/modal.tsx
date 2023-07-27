import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import classes from '../../styles/dashboard.module.css';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    height:'auto'
};

interface ModalProps {
    children: any;
    btnTitle: string;
    handleOpen: any;
    // handleClose: any;
    open: any;
}
export default function CommonModal({ children, btnTitle, handleOpen, open }: ModalProps) {

    return (
        <div>
            <Typography>
                <button className={classes.btnUpload} onClick={handleOpen}>
                    <ControlPointIcon /> {btnTitle}
                </button>
            </Typography>
            <Modal
                keepMounted
                open={open}
                // onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
