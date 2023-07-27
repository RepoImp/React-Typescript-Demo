import * as React from 'react';
import Modal from '@mui/material/Modal';
import { actions } from '../../redux/store/store';
import { Box, Typography, InputBase, InputAdornment, TextField } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import classes from './customer.module.css'
import { styled } from '@mui/material/styles';
import { Formik } from 'formik';
import { useCreateCustomerMutation, useUpdateCustomerMutation } from '../../api/customer';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: '10px',
        position: 'relative',
        backgroundColor: '#F1F6FD',
        color: 'black',
        fontSize: 16,
        padding: '12px 14px',
        '&:focus': {
            border: '1px solid #007bff',
        },
    },
}));

const Textfeild = styled(TextField)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    borderRadius: '10px',
    position: 'relative',
    backgroundColor: '#F1F6FD',
    color: 'black',
    fontSize: 16,
    '&:focus': {
        border: '1px solid #007bff',
    },
    '.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
        padding: "12px"
    },
    [`& fieldset`]: {
        border: "none",
        padding: "0px"
    },
}));

export default function NewCustomerModel(props: any) {
    const id = props?.id?.id?._id
    const customer = props?.id?.id

    const [open, setOpen] = React.useState(false)


    const [createCustomer] = useCreateCustomerMutation();
    const [updateCustomer] = useUpdateCustomerMutation()

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '10px',
    };

    const handleSubmitData = async (values: any, action: any) => {
        const params = { id, body: values }
        const data: any = id ? await updateCustomer(params) : await createCustomer(values)
        if (data.data.status === 200) {
            actions.auth.setLoading(data.isLoading);
            toast.success(`${data?.data?.message}`);
            actions.modal.closeCustomer(null);
        } else {
            if (data?.status === 401 || data?.data?.status === 401) {
                toast.error(`${data?.data?.message}`);
            } else {
                toast.error(`Something went wrong`);
            }
        }
        action.resetForm()
    }

    const handleClose = () => actions.modal.closeCustomer(null);

    return (
        <div>
            <Modal
                open
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style} className={classes.modal_container}>
                        <div className={classes.modal_header} >
                            <Typography style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '600', textAlign: 'center' }}>
                                {'Create Customer'}
                            </Typography>
                            <div className="d-flex" onClick={handleClose} style={{ cursor: 'pointer', alignItems: "center" }}>
                                <CloseRoundedIcon fontSize='medium' style={{ color: '#fff' }} />
                            </div>
                        </div>
                      
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: customer?.name || "",
                                    primaryContactName: customer?.primaryContactName || "",
                                    phone: customer?.phone || "",
                                    primaryContactPhone: customer?.primaryContactPhone || "",
                                    email: customer?.email || "",
                                    gmt_code: customer?.gmt_code || "",
                                    ftp_path: customer?.ftp_path || "",
                                    ftp_server: customer?.ftp_server || "",
                                    ftp_user: customer?.ftp_user || "",
                                    ftp_password: customer?.ftp_password || "",
                                    file_type: customer?.file_type || "",
                                    btCompanyId: customer?.companyId || ""
                                }}
                                onSubmit={(values, action) => {
                                    handleSubmitData(values, action);

                                }}>
                                {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isValid, dirty }) => {
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <div style={{ margin: "30px 40px" }}>
                                                <div className={classes.input_div} >
                                                    <div style={{ width: '100%' }}>
                                                        <Typography className={classes.modal_input} >
                                                            {'Company Id'}
                                                        </Typography>
                                                        <BootstrapInput
                                                            name="btCompanyId"
                                                            style={{ width: '100%' }}
                                                            placeholder='Enter Company ID'
                                                            onChange={handleChange}
                                                            value={values.btCompanyId}
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <Typography className={classes.modal_input} >
                                                            {'Email'}
                                                        </Typography>
                                                        <BootstrapInput
                                                            name="email"
                                                            style={{ width: '100%' }}
                                                            placeholder='Enter Email'
                                                            onChange={handleChange}
                                                            value={values.email}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={classes.input_div} >
                                                    <div style={{ width: '100%' }}>
                                                        <Typography className={classes.modal_input} >
                                                            {'Company Name'}
                                                        </Typography>
                                                        <BootstrapInput
                                                            name="name"
                                                            style={{ width: '100%' }}
                                                            placeholder='Enter Company Name'
                                                            onChange={handleChange}
                                                            value={values.name}
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <Typography className={classes.modal_input} >
                                                            {'Primary Contact Name'}
                                                        </Typography>
                                                        <BootstrapInput
                                                            style={{ width: '100%' }}
                                                            name="primaryContactName"
                                                            placeholder='Enter Primary Contact Name'
                                                            onChange={handleChange}
                                                            value={values.primaryContactName}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={classes.input_div} >
                                                    <div style={{ width: '100%' }}>
                                                        <Typography className={classes.modal_input} >
                                                            {'GMT Code'}
                                                        </Typography>
                                                        <BootstrapInput
                                                            name="gmt_code"
                                                            style={{ width: '100%' }}
                                                            placeholder='Enter GMT Code'
                                                            onChange={handleChange}
                                                            value={values.gmt_code}
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <Typography className={classes.modal_input} >
                                                            {'Primary Phone'}
                                                        </Typography>
                                                        <BootstrapInput
                                                            style={{ width: '100%' }}
                                                            name="primaryContactPhone"
                                                            placeholder='Enter Primary Phone'
                                                            onChange={handleChange}
                                                            value={values.primaryContactPhone}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={classes.input_div} >
                                                    <div style={{ width: '100%' }}>
                                                        <Typography className={classes.modal_input} >
                                                            {'FTP Server'}
                                                        </Typography>
                                                        <BootstrapInput
                                                            name="ftp_server"
                                                            id="bootstrap-input"
                                                            style={{ width: '100%' }}
                                                            placeholder='Enter FTP Server'
                                                            onChange={handleChange}
                                                            value={values.ftp_server}
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <Typography className={classes.modal_input} >
                                                            {'FTP Path'}
                                                        </Typography>
                                                        <BootstrapInput
                                                            style={{ width: '100%' }}
                                                            name="ftp_path"
                                                            placeholder='Enter File Path'
                                                            onChange={handleChange}
                                                            value={values.ftp_path}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={classes.input_div} >
                                                    <div style={{ width: '100%' }}>
                                                        <Typography className={classes.modal_input} >
                                                            {'FTP User Name'}
                                                        </Typography>
                                                        <BootstrapInput
                                                            style={{ width: '100%' }}
                                                            name="ftp_user"
                                                            placeholder='Enter FTP User Name'
                                                            onChange={handleChange}
                                                            value={values.ftp_user}
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <Typography className={classes.modal_input} >
                                                            {'File Type'}
                                                        </Typography>
                                                        <BootstrapInput
                                                            name="file_type"
                                                            style={{ width: '100%' }}
                                                            placeholder='Enter File Type'
                                                            onChange={handleChange}
                                                            value={values.file_type}
                                                        />
                                                    </div>
                                                </div>
                                                <div  >
                                                    <div style={{ width: '47%' }}>
                                                        <Typography className={classes.modal_input} >
                                                            {'FTP Password'}
                                                        </Typography>
                                                        <Textfeild fullWidth placeholder='Enter FTP Password'
                                                            name="ftp_password"
                                                            type={open ? "text" : "password"}
                                                            value={values.ftp_password}
                                                            onChange={handleChange}
                                                            autoComplete="off"
                                                            InputProps={{
                                                                endAdornment: <InputAdornment position='end'>
                                                                    {
                                                                        !open ? <span onClick={() => setOpen(!open)} style={{ cursor: "pointer", width: "25px" }}>
                                                                            <VisibilityOffIcon /> </span>
                                                                            : <span onClick={() => setOpen(!open)} style={{ cursor: "pointer", width: "25px" }}>
                                                                                <VisibilityIcon /> </span>
                                                                    }
                                                                </InputAdornment>,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'center', margin: "30px 0", gap: "10px" }}>
                                                    <input type="button" value="Cancel" className={`${classes.btn} ${classes.cancel_btn}`} onClick={handleClose} />
                                                    <input type="submit" value="Save" className={`${classes.btn} ${classes.apply_btn}`} />
                                                </div>
                                            </div>
                                        </form>
                                    )
                                }}
                            </Formik>
                    </Box>
                </>
            </Modal>
        </div>
    );
}