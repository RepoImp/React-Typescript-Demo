import { createSlice } from '@reduxjs/toolkit'

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        value: undefined,
    },
    reducers: {
        customerData: (state, action) => { state.value = action.payload },
    }
})

export const { customerData } = customerSlice.actions
export default customerSlice.reducer
