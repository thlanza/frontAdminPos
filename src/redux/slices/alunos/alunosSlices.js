import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

export const getAlunosAction = createAsyncThunk('alunos/getAlunos',
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const url = `${baseUrl}/alunos`
            const { data } = await axios.get(
                url,
                config
            )
            return data;
        } catch (err) {
            if(!err?.response) {
                throw err;
            };
            return rejectWithValue(err?.response?.data);
        }
});



//slices
const alunosSlices = createSlice({
    name: 'alunos',
    initialState: {
        alunos: []
    },
    extraReducers: (builder) => {
        //primeiroLogin
        builder.addCase(getAlunosAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(getAlunosAction.fulfilled, (state, action) => {
            state.loading = false;
            state.alunos = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(getAlunosAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
});

export default alunosSlices.reducer;