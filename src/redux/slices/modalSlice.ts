import { createSlice } from '@reduxjs/toolkit'
const emptyObj = { open: false, id: null };
export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        customer : emptyObj,
        dashboard : emptyObj
    },
    reducers: {
        openCustomer: (state, { payload }) => {
            state.customer = { open: true, id: payload };
        },
        openDashboard: (state, { payload }) => {
            state.dashboard = { open: true, id: payload };
        },
        closeCustomer: (state) => {
            state.customer = emptyObj;
        },
        closeDashboard: (state) => {
            state.dashboard = emptyObj;
        },
    },
});

export const {
    openCustomer,
    openDashboard,
    closeCustomer,
    closeDashboard,

} = modalSlice.actions;
export default modalSlice.reducer;
