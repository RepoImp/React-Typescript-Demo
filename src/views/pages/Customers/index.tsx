import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import classes from '../../../styles/dashboard.module.css';
import { IconButton, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { useDeleteCustomerMutation, useGetCustomersQuery, useImportCreateCustomerMutation } from '../../../api/customer';
import DisplayCustomerTable from '../../../components/Customer/customerTable';
import { toast } from 'react-toastify';
import { actions } from '../../../redux/store/store';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NewCustomerModel from '../../../components/Customer/NewCustomerModel';
import { useSelector } from 'react-redux';

export default function Customer() {
  const { data: customers, isFetching } = useGetCustomersQuery(null, { refetchOnMountOrArgChange: true });
  const [importCustomer, { isLoading }] = useImportCreateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation()
  const customer = useSelector((state: any) => state.modal.customer);

  const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "30%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    height: 'auto'
  };

  const [customerLists, setCustomerLists] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [isDelete, setIsDelete] = React.useState(false)
  const [customerId, setCustomerId] = React.useState("")

  React.useEffect(() => {
    actions.auth.setLoading(isLoading);
  }, [isLoading])

  React.useEffect(() => {
    if (!customers) return;
    setCustomerLists(customers?.result);

    if (search) {
      setCustomerLists((customerLists: any) =>
        customerLists.filter((customer: any) => {
          return (
            customer &&
            customer?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            customer?.btCompanyId?.toLowerCase().includes(search?.toLowerCase()) ||
            customer?.primaryContactName?.toLowerCase().includes(search?.toLowerCase()) ||
            customer?.email?.toLowerCase().includes(search?.toLowerCase())
          );
        })
      );
    }
    actions.auth.setLoading(isFetching);

  }, [customers, isFetching, search]);

  const handleSearch = (e: any) => {
    let searchText = e.target.value;
    setSearch(searchText);
  }

  const importCreateCustomer = async () => {
    const data: any = {} = await importCustomer(null);
    if (data.data.status === 200) {
      actions.auth.setLoading(isFetching);
    } else {
      if (data?.status === 401 || data?.data?.status === 401) {
        toast.error(`${data?.data?.message}`);
      } else {
        toast.error(`Something went wrong`);
      }
    }
  }

  const DeleteModel = (id: any) => {
    setIsDelete(true)
    setCustomerId(id)
  }

  const deleteCustomerCustomer = async () => {
    const data: any = await deleteCustomer(customerId)
    if (data.data.status === 200) {
      toast.success(`${data?.data?.message}`);
    } else {
      if (data?.status === 401 || data?.data?.status === 401) {
        toast.error(`${data?.data?.message}`);
      } else {
        toast.error(`Something went wrong`);
      }
    }
    setIsDelete(false)
  }

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
              Customers Data
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
              <div>
                <button className={classes.btnImport} style={{ width: "200px" }} onClick={() => { actions.modal.openCustomer(null) }}>
                  <AddIcon /> Create Customer
                </button>
              </div>
              <div>
                <button className={classes.btnImport} style={{ width: "90px" }} onClick={importCreateCustomer}>
                  Import
                </button>
              </div>

              {/* Customer model */}
              {customer.open && <NewCustomerModel id={customer} />}

              {/* Delete model */}
              <Modal
                open={isDelete}
                onClose={() => setIsDelete(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div style={{ background: "#283042", display: "flex", justifyContent: "space-between", padding: "0.7rem", borderRadius: "10px 10px 0 0" }}>
                    <Typography style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '600', textAlign: 'center' }}>
                      {'Delete Customer'}
                    </Typography>
                    <div onClick={() => setIsDelete(false)} style={{ cursor: 'pointer' }}>
                      <CloseRoundedIcon fontSize='medium' style={{ color: '#fff' }} />
                    </div>
                  </div>
                  <div className={classes.modal_header} >
                    <Typography style={{ fontSize: '20px', fontWeight: '600', textAlign: 'center', padding: "20px" }}>
                      Are you sure
                      You want to Delete Customer?
                    </Typography>
                  </div>
                  <div className='d-flex pb-5 justify-content-center' style={{ gap: "20px" }}>
                    <button className={`${classes.btn} ${classes.cancel_btn} p-2`} style={{ width: "20%", fontSize: "1.3rem" }}
                      onClick={() => setIsDelete(false)} >
                      No
                    </button>
                    <button className={`${classes.btn} ${classes.apply_btn} p-2`} style={{ width: "20%", fontSize: "1.3rem" }} onClick={deleteCustomerCustomer}>
                      Yes
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </Toolbar>
        <DisplayCustomerTable
          data={customerLists}
          isFetching={isFetching}
          DeleteModel={DeleteModel}
        />
      </Paper>
    </Box>
  );
}