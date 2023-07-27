import React from 'react';
import "./style.scss"
import download_csv from "../../assets/Images/download_csv.png"
import history from "../../assets/Images/history.png"
import classes from '../../styles/dashboard.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import EnhancedTableHead from '../EnhancedTableHead';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { createGmtTableListData } from '../../constants/createTableListsData';
import { toast } from 'react-toastify';
import { getComparator, stableSort } from '../../constants/MuiTableHelper';
import { downloadFile } from '../../util/fetch';
import { actions } from '../../redux/store/store';
import { handleStatusBadge } from '../../constants/extras/statusBadge';
import { styled } from '@mui/material/styles';
var FileSaver = require('file-saver');

export interface DisplayTableProps {
    data?: any;
    isFetching: boolean;
}

let rows = [] as any;

const headCells = [
    {
        id: 'createdAt',
        numeric: true,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'customer',
        numeric: false,
        disablePadding: false,
        label: 'Customer',
    },
    {
        id: 'srcFileName',
        numeric: false,
        disablePadding: false,
        label: 'Source File',
    },
    {
        id: 'ftpDestinationPath',
        numeric: false,
        disablePadding: false,
        label: 'Destination File',
    },
    {
        id: 'remark',
        numeric: false,
        disablePadding: false,
        label: 'Remark',
    },
    {
        id: 'user',
        numeric: false,
        disablePadding: false,
        label: 'Upload By',
    },
    {
        id: 'history',
        numeric: false,
        disablePadding: false,
        label: "History"
    },
];

const DisplayTable = ({ data, isFetching }: DisplayTableProps) => {

    const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.common.black,
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.black,
        },
    }));

    const [dense] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    rows = [];
    data?.map((item: any) => {
        let user = `${item?.user?.firstName}${" "}${item?.user?.lastName}`;
        let createdAt = `${moment(item.createdAt).format("DD/MM/YYYY")},${" "}${moment(item.createdAt).format("hh:mm A")}`;
        rows.push(
            createGmtTableListData(
                item._id,
                user,
                item.bucketStatus,
                item.bucketUrl,
                item.ftpUrl,
                createdAt,
                item.customer.name,
                item.remark,
                item.bucketFailedReson,
                item.ftpDestinationPath,
                item.srcFileName,
                item.storage
            )
        );
    });

    const fileSaver = (data: any) => {
        var file = new File([data], "Destination_file.csv", { type: "data:text/csv;charset=utf-8" });
        FileSaver.saveAs(file);
    }

    const downloadGmtFileHandler = async (id: string) => {

        const data = await downloadFile(id);
        if (data?.status === 200) {
            if (data?.data.status) {
                toast.error(`${data?.data.message}`);
            } else {
                toast.success(`${'Download successfully!'}`);
                fileSaver(data.data);
            }
        }
        else {
            toast.error(`${data?.data.message}`);
        }
    }

    return (
        <>
            <TableContainer className={classes.tableContainer}>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        headCells={headCells}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .map((row: any, index: any) => {
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row._id}
                                        className={classes.maintd}
                                    >
                                        <TableCell
                                            width={'13%'}
                                        >{row?.createdAt}
                                        </TableCell>
                                        <TableCell align="left" width={'5%'}>
                                            {" "}
                                            {row?.customer}
                                        </TableCell>
                                        <TableCell align="left" width={'15%'}>
                                            {""}
                                            {row?.srcFileName}
                                        </TableCell>
                                        <TableCell align="left" width={'15%'}>
                                            {""}
                                            {row?.ftpDestinationPath}
                                        </TableCell>
                                        <TableCell align="left" width={'15%'}>
                                            {""}
                                            {row?.remark}
                                        </TableCell>
                                        <TableCell align="left" width={'5%'}>
                                            {""}
                                            {row.user}
                                        </TableCell>
                                        <TableCell align="left" width={'10%'}>
                                            {""}
                                            <div className='d-flex ' style={{ justifyContent: "space-between", gap: "20px" }}>
                                                <span style={handleStatusBadge(row?.bucketStatus)} >
                                                    {row?.bucketStatus === "success" ? "Uploaded" : row?.bucketStatus}
                                                </span>
                                                <BootstrapTooltip title="Download" placement="top">
                                                    <span onClick={() => downloadGmtFileHandler(row._id)}
                                                        className={`${row?.bucketStatus !== "success" && 'ml-4'}`}>
                                                        <img src={download_csv} style={{ cursor: 'pointer' }} width="25px" />
                                                    </span>
                                                </BootstrapTooltip>
                                                <BootstrapTooltip title="History" placement="top">
                                                    <span style={{ cursor: "pointer" }} onClick={() => actions.modal.openDashboard(row)}>
                                                        <img src={history} width="25px" />
                                                    </span>
                                                </BootstrapTooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DisplayTable