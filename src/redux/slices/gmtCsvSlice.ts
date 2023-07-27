import { createSlice } from '@reduxjs/toolkit'

export const gmtCsvSlice = createSlice({
    name: 'gmtCsv',
    initialState: {
        value: undefined,
    },
    reducers: {
        selectGmtCsv: (state, action) => { state.value = action.payload },
    }
})

export const { selectGmtCsv } = gmtCsvSlice.actions
export default gmtCsvSlice.reducer
