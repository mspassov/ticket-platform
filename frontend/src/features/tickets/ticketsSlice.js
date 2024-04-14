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

//Get a list of the user's tickets
export const getTickets = createAsyncThunk('ticket/get', async (_, thunkAPI) =>{
    try {
        //Accessing a protected route, so need to get the user token
        const token = thunkAPI.getState().auth.user.token;
        return await ticketsService.getTickets(token);
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
            .addCase(getTickets.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(getTickets.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload
            })
            .addCase(getTickets.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = ticketSlice.actions;
export default ticketSlice.reducer;