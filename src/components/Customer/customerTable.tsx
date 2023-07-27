import React from 'react';
import classes from '../../styles/dashboard.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import EnhancedTableHead from '../EnhancedTableHead';
import { createCustomerTableListData } from '../../constants/createTableListsData';
import { getComparator, stableSort } from '../../constants/MuiTableHelper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { actions } from '../../redux/store/store';

let rows = [] as any;

export interface DisplayCustomerTableProps {
    data?: any;
    isFetching: boolean;
    DeleteModel?: Function;
}

const headCells = [
    {
        id: 'companyId',
        numeric: true,
        disablePadding: false,
        label: 'Company ID',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'contactName',
        numeric: false,
        disablePadding: false,
        label: 'Contact Name',
    },
    {
        id: 'contactNumber',
        numeric: false,
        disablePadding: false,
        label: 'Contact Number',
    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: false,
        label: 'Phone',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'edit',
        numeric: false,
        disablePadding: false,
    },
];

const DisplayCustomerTable = ({ data, isFetching, DeleteModel }: DisplayCustomerTableProps) => {

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
        rows.push(
            createCustomerTableListData(
                item._id,
                item.name,
                item.btCompanyId,
                item.primaryContactName,
                item.primaryContactPhone,
                item.phone,
                item.email,
                item.file_type,
                item.ftp_path,
                item.ftp_password,
                item.ftp_server,
                item.ftp_user,
                item.gmt_code,
                item.primaryContactPhone,
                item.primaryContactName
            )
        );
    });

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
                                            width={'5%'}
                                        // style={{ paddingLeft: '3rem' }}
                                        >{row?.companyId}
                                        </TableCell>
                                        <TableCell align="left" width={'10%'}>
                                            {" "}
                                            {row?.name}
                                        </TableCell>
                                        <TableCell
                                            align="left" width={'15%'}
                                        >
                                            {""}
                                            {row?.contactName}
                                        </TableCell>
                                        <TableCell align="left" width={'10%'}>
                                            {""}
                                            {row?.contactNumber}
                                        </TableCell>
                                        <TableCell align="left" width={'10%'}>
                                            {""}
                                            {row?.phone}
                                        </TableCell>
                                        <TableCell align="left" style={{ width: '10%' }}>
                                            {""}
                                            {row?.email}
                                        </TableCell>
                                        <TableCell align="left" style={{ width: '5%' }}>
                                            <div className="d-flex" style={{ gap: "10px" }}>
                                                <span onClick={() => actions.modal.openCustomer(row)} >
                                                    <EditIcon style={{ color: "green", cursor: "pointer" }} />
                                                </span>
                                                <span onClick={() => DeleteModel && DeleteModel(row._id)}>
                                                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                                                </span>
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

export default DisplayCustomerTable;