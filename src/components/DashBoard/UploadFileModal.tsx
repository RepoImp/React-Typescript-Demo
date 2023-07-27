import { LoadingButton } from '@mui/lab';
import { Button, Checkbox, CircularProgress, InputBase, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Select from 'react-select';
import classes from '../../styles/dashboard.module.css';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

export interface UploadFileModalProps {
    handleClose?: Function;
    isLoading?: boolean;
    onUploadHandler?: Function;
    file?: any;
    onFileChange?: Function;
    isValidFile?: boolean;
    isCheckValid?: boolean;
    customers?: any;
}

const platforms = [
    {
        label: "TEST/Inbound",
        value: "TEST/Inbound",
    },
    {
        label: "PROD/Inbound",
        value: "PROD/Inbound",
    }
]

const colourStyles = {
    control: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
        return {
            ...styles,
            backgroundColor: "#F1F6FD",
            color: "#333333",
            width: '100%',
            height: '46px',
            border: 'none',
            borderRadius: '10px',
            paddingLeft: '4px'
        };
    },
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#F1F6FD" : "#FFFFFF",
            color: "#333333",
            width: '100%',
            height: '46px',
            marginBottom: '3px'
        };
    },
};

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

const UploadFileModal = ({ handleClose, isLoading, onUploadHandler, file, onFileChange, isValidFile, isCheckValid, customers }: UploadFileModalProps) => {
    const [customer, setCustomer] = useState<object | null>(null);
    const [remark, setRemark] = useState<string>('');
    const [customerList, setCustomerList] = useState([]);
    const [ftpDestinationPath, setFtpDestinationPath] = useState<object | null>(null);
    const [isGmtUpload, setIsGmtUpload] = useState<boolean>(false);

    React.useEffect(() => {
        let data = customers?.slice().sort((a: any, b: any) => {
            var nameA = a?.name?.toLowerCase(), nameB = b?.name?.toLowerCase();
            if (nameA < nameB)
                return -1;
        });
        setCustomerList(data);
    }, [customers]);

    const isValidCustomer = isCheckValid && customer === null;
    const isValidPath = isCheckValid && ftpDestinationPath === null;
    let options = customerList?.map(function (item: any) {
        return {
            label: item.name,
            value: item._id,
        };
    });

    return (
        <>
            <div style={{ background: '#283042', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '10px 10px 0 0' }}>
                <Typography style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '600', textAlign: 'center' }}>
                    {'Upload File'}
                </Typography>
                <div className="d-flex" style={{ cursor: 'pointer', alignItems:"center" }}
                onClick={() => handleClose && handleClose(setCustomer, setRemark, setFtpDestinationPath, setIsGmtUpload)} >
                    <CloseRoundedIcon fontSize='medium' style={{ color: '#fff' }} />
                </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
                <Typography style={{ fontSize: '14px', color: '#000000', fontWeight: '500', marginTop: '10px', marginBottom: '5px' }} >
                    {'Customers'}
                </Typography>
                <Select
                    placeholder='Select Customer'
                    components={{
                        IndicatorSeparator: () => null,
                    }}
                    onChange={(val: any) => setCustomer(val)}
                    value={customer}
                    options={options}
                    styles={colourStyles}
                />
                {isValidCustomer && (
                    <div style={{ fontSize: '12px', color: 'red', justifyContent: 'flex-end', alignItems: 'flex-end', display: 'flex' }}>
                        {'Please Select Customer.'}
                    </div>
                )}
                <Typography style={{ fontSize: '14px', color: '#000000', fontWeight: '500', marginTop: '10px', marginBottom: '5px' }} >
                    {'File'}
                </Typography>
                <div className={classes.dashboardFormInput} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '75%' }}>
                        {file?.name ?
                            <Typography style={{ paddingLeft: '15px', flexWrap: 'wrap', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#2d2d2d' }} >
                                {file?.name}
                            </Typography>
                            :
                            <Typography style={{ paddingLeft: '15px', flexWrap: 'wrap', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#757575' }} >
                                {'Select File'}
                            </Typography>
                        }
                        <input type="file" accept={".csv"} name="upload" id="upload-photo" onChange={(e) => onFileChange && onFileChange(e)} style={{ display: 'none' }} onClick={(event: any) => {
                            event.target.value = null
                        }} />
                    </div>
                    <label htmlFor="upload-photo" style={{
                        backgroundColor: '#4195F5',
                        fontSize: '15px',
                        borderRadius: '0px 5px 5px 0px',
                        width: '22%',
                        display: 'flex',
                        color: '#fff',
                        padding: '10px',
                        height: '100%',
                        textTransform: 'capitalize',
                        alignItems: 'center',
                        marginTop: '8px',
                        cursor: 'pointer'
                    }}>Browse</label>
                </div>
                {isValidFile && (
                    <div style={{ fontSize: '12px', color: 'red', justifyContent: 'flex-end', alignItems: 'flex-end', display: 'flex' }}>
                        {'Please Choose file.'}
                    </div>
                )}
                <Typography style={{ fontSize: '14px', color: '#000000', fontWeight: '500', marginTop: '10px', marginBottom: '5px' }} >
                    {'Remark'}
                </Typography>
                <BootstrapInput
                    id="bootstrap-input"
                    style={{ width: '100%', color: remark ? '#2d2d2d' : '#757575' }}
                    placeholder='Enter Remark'
                    onChange={(e: any) => setRemark(e.target.value)}
                    value={remark}
                />

                <div style={{ marginTop: '10px', marginBottom: '5px' }}>
                    <Checkbox id="isGmt" checked={isGmtUpload} onChange={(e: any) => setIsGmtUpload(e.target.checked)} />
                    <label htmlFor="isGmt">GMT Upload</label>
                </div>
                {isGmtUpload && <>
                    <Typography style={{ fontSize: '14px', color: '#000000', fontWeight: '500', marginTop: '10px', marginBottom: '5px' }} >
                        {'GMT Path'}
                    </Typography>
                    <Select
                        placeholder='Select GMT Path'
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                        onChange={(val: any) => setFtpDestinationPath(val)}
                        value={ftpDestinationPath}
                        options={platforms}
                        styles={colourStyles}
                    />
                    {isGmtUpload && isValidPath && (
                        <div style={{ fontSize: '12px', color: 'red', justifyContent: 'flex-end', alignItems: 'flex-end', display: 'flex' }}>
                            {'Please Select GMT Path.'}
                        </div>
                    )}</>}
                <LoadingButton
                    onClick={() => onUploadHandler && onUploadHandler(customer, setCustomer, remark, setRemark, ftpDestinationPath, setFtpDestinationPath, isGmtUpload, setIsGmtUpload)}
                    loading={isLoading}
                    loadingPosition="end"
                    loadingIndicator={<CircularProgress color='inherit' size={20} />}
                    variant="contained"
                    disabled={isLoading ? true : false}
                    style={{
                        backgroundColor: '#4195F5',
                        fontSize: '20px',
                        textTransform: 'capitalize',
                        borderRadius: '10px',
                        width: '100%',
                        color: '#fff',
                        marginTop: '3rem',
                        padding: '10px',
                        fontWeight: '600',
                    }}
                >
                    Upload
                </LoadingButton>
            </div>
        </>
    )
}

export default UploadFileModal;