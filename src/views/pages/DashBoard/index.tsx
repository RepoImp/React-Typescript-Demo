import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import classes from '../../../styles/dashboard.module.css';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { useGetGmtCsvFilesQuery } from '../../../api/gmtCsv';
import CommonModal from '../../../components/common/modal';
import { uploadFile } from '../../../util/fetch';
import { toast } from 'react-toastify';
import UploadFileModal from '../../../components/DashBoard/UploadFileModal';
import DisplayTable from '../../../components/DashBoard/table';
import { useGetCustomersQuery } from '../../../api/customer';
import { useSelector } from 'react-redux';
import DashboardModel from '../../../components/DashBoard/dashBoardModel';

export default function Dashboard() {
    const { data: gmtCvs, isFetching, refetch } = useGetGmtCsvFilesQuery(null, { refetchOnMountOrArgChange: true });
    const { data: customers } = useGetCustomersQuery(null, { refetchOnMountOrArgChange: true });
    const token = localStorage.getItem("token")
    const dashboard = useSelector((state: any) => state.modal.dashboard);


    const [gmtCvsfileLists, setGmtCvsfileLists] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [file, setFile] = React.useState<any>({});
    const [fileName, setFileName] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (setCustomer: Function, setRemark: Function, setFtpDestinationPath: Function, setIsGmtUpload: any) => {
        setOpen(false);
        setIsCheckValid(false);
        setCustomer(null);
        setFtpDestinationPath(null);
        setFile({});
        setFileName('');
        setRemark('');
        setIsGmtUpload(false)
    };
    const [isLoading, setLoading] = React.useState(false);
    const [isCheckValid, setIsCheckValid] = React.useState(false);
    const inputpdfFile = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (!gmtCvs) return;
        setGmtCvsfileLists(gmtCvs?.result);

        if (search) {
            setGmtCvsfileLists((gmtCvsfileLists: any) =>
                gmtCvsfileLists.filter((gmtCvs: any) => {
                    let name = `${gmtCvs?.user?.firstName} ${gmtCvs?.user?.lastName}`
                    return (
                        gmtCvs &&
                        gmtCvs?.user &&
                        name?.toLowerCase().includes(search?.toLowerCase()) ||
                        gmtCvs?.customer &&
                        gmtCvs?.customer?.name.toLowerCase().includes(search?.toLowerCase())
                    );
                })
            );
        }

    }, [gmtCvs, isFetching, search]);

    const onFileChange = (event: any) => {
        event.preventDefault();
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    const onUploadHandler = async (customer: any, setCustomer: Function, remark: string, setRemark: Function, ftpDestinationPath: any, setFtpDestinationPath: Function, isGmtUpload: boolean, setIsGmtUpload: Function) => {
        setIsCheckValid(true);
        if (customer !== null && fileName !== '' && (isGmtUpload && ftpDestinationPath !== null) || customer !== null && fileName !== '') {
            setLoading(true);
            let params = isGmtUpload ? {
                file: file,
                customer: customer.value,
                remark: remark,
                ftpDestinationPath: ftpDestinationPath.value,
                isGMTUpload: isGmtUpload
            } : {
                file: file,
                customer: customer.value,
                remark: remark,
                isGMTUpload: isGmtUpload
            }
            const data = await uploadFile(
                `ftp/upload`,
                'file',
                params,
                token
            );
            if (data.status === 200 && data?.data?.status === 200) {
                setLoading(false);
                setIsCheckValid(false);
                handleClose(setCustomer, setRemark, setFtpDestinationPath, setIsGmtUpload);
                refetch();
                toast.success(`${data.data.message}`);
            } else {
                setLoading(false);
                toast.error(`${data.data.message}`);
            }
            return data;
        }
    }

    const handleSearch = (e: any) => {
        let searchText = e.target.value;
        setSearch(searchText);
    }

    const isValidFile = isCheckValid && fileName === '';

    return (
        <Box className={classes.mainTable}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar>
                    <div className={classes.mainGMTHead}>
                        <Typography
                            variant="h6"
                            id="tableTitle"
                            component="div"
                            className={classes.gmtTxt}
                            style={{ marginRight: 'auto' }}>
                            GMT CSV Data
                        </Typography>

                        <div style={{ display: 'flex' }}>
                            <div className={classes.dashSearch}>
                                <IconButton sx={{ p: '10px 5px 10px 10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    style={{ width: '85%' }}
                                    sx={{ p: '3.5px 0 0 5px', font: '18px' }}
                                    placeholder="Search..."
                                    onChange={handleSearch}
                                />
                            </div>
                            <CommonModal
                                children={
                                    <UploadFileModal
                                        handleClose={handleClose}
                                        isLoading={isLoading}
                                        onUploadHandler={onUploadHandler}
                                        file={file}
                                        onFileChange={onFileChange}
                                        isValidFile={isValidFile}
                                        inputpdfFile={inputpdfFile}
                                        isCheckValid={isCheckValid}
                                        customers={customers?.result}
                                    />
                                }
                                btnTitle={'New Upload'}
                                handleOpen={handleOpen}
                                // handleClose={handleClose}
                                open={open}
                            />
                        </div>
                    </div>
                    {dashboard.open && <DashboardModel data={dashboard.id} />}
                </Toolbar>
                <DisplayTable
                    data={gmtCvsfileLists}
                    isFetching={isFetching}
                />
            </Paper>
        </Box>
    );
}