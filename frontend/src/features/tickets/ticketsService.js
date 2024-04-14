import { getDefaultMiddleware } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = '/api/tickets';

const createTicket = async (ticketData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(ticketData);
    const response = await axios.post(`${API_URL}/create`, ticketData, config);
    return response.data;
}

const ticketService = {
    createTicket
}

export default ticketService;