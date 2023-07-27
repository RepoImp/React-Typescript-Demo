import * as React from 'react';
import Modal from '@mui/material/Modal';
import { actions } from '../../redux/store/store';
import { Box, Typography, InputBase, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import "./style.scss"
import EnhancedTableHead from '../EnhancedTableHead';
import { createDashboardModelTableList } from '../../constants/createTableListsData';
import { getComparator, stableSort } from '../../constants/MuiTableHelper';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "65%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    height: 'auto',
    // padding: "80px 50px"
};

export default function DashboardModel(props: any) {
    const data = props.data.storage

    const [dense] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [isError, setIsError] = React.useState(false)

    let rows = [] as any;
    const headCells = [
        {
            id: 'storage_type',
            numeric: true,
            disablePadding: false,
            label: 'Storage Type',
        },
        {
            id: 'location',
            numeric: false,
            disablePadding: false,
            label: 'Location',
        },
        {
            id: 'path',
            numeric: false,
            disablePadding: false,
            label: 'path',
        },
        {
            id: 'fileName',
            numeric: false,
            disablePadding: false,
            label: 'File Name',
        },
        isError ? {
            id: 'error',
            numeric: false,
            disablePadding: false,
            label: 'Error',
            hide: true
        } : { label: 'HIDE', },
    ];

    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    rows = [];
    data?.map((item: any) => {
        rows.push(
            createDashboardModelTableList(
                item._id,
                item.storage_type,
                item.location,
                item.path,
                item.fileName,
                item?.error
            )
        );
    });

    React.useEffect(() => {
        data?.map((item: any) => {
            if (item?.error) {
                setIsError(true)
            }
        })
    }, [data])

    const handleClose = () => actions.modal.closeDashboard(null);

    return (
        <div>
            <Modal
                open
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style} >
                        <div className="modal_header" >
                            <Typography style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '600', textAlign: 'center' }}>
                                {'Upload History'}
                            </Typography>
                            <div className="d-flex" onClick={handleClose} style={{ cursor: 'pointer', alignItems: "center" }}>
                                <CloseRoundedIcon fontSize='medium' style={{ color: '#fff' }} />
                            </div>
                        </div>
                        <div>
                            <TableContainer >
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
                                                        style={{ width: "100%" }}
                                                    >
                                                        <TableCell align="left" >
                                                            {""}
                                                            {row.storage_type}
                                                        </TableCell>
                                                        <TableCell align="left" >
                                                            {""}
                                                            {row?.location}
                                                        </TableCell>
                                                        <TableCell align="left" >
                                                            {""}
                                                            {row?.path}
                                                        </TableCell>
                                                        <TableCell align="left" >
                                                            {""}
                                                            {row?.fileName}
                                                        </TableCell>
                                                        {isError && <TableCell align="left" >
                                                            {""}
                                                            {row?.error}
                                                        </TableCell>}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Box>
                </>
            </Modal>
        </div>
    );
}