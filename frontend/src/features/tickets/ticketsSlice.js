import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ticketsService from './ticketsService';

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create a new ticket
export const createTicket = createAsyncThunk('ticket/create', async (ticketData, thunkAPI) =>{
    try {
        //Accessing a protected route, so need to get the user token
        const token = thunkAPI.getState().auth.user.token;
        return await ticketsService.createTicket(ticketData, token);
    } catch (error) {
        const message = error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) =>{
        builder
            .addCase(createTicket.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state) =>{
                state.isLoading = false;
                state.isSuccess = true
            })
            .addCase(createTicket.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = ticketSlice.actions;
export default ticketSlice.reducer;