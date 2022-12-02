import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

export const getModalidadesAction = createAsyncThunk('modalidades/carregar',
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call
            const admin = getState()?.admin;
            const { usuarioLogado } = admin;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + usuarioLogado?.token
                }
            };
            const url = `${baseUrl}/modalidades`
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

export const deletarModalidadeAction = createAsyncThunk('modalidades/deletar',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call
            const admin = getState()?.admin;
            const { usuarioLogado } = admin;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + usuarioLogado?.token
                }
            };
            const url = `${baseUrl}/modalidades/modalidade/${id}`
            const { data } = await axios.delete(
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
const modalidadeSlices = createSlice({
    name: 'modalidades',
    initialState: {
        modalidades: null
    },
    extraReducers: (builder) => {
        //getModalidades
        builder.addCase(getModalidadesAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(getModalidadesAction.fulfilled, (state, action) => {
            state.loading = false; 
            state.modalidades = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(getModalidadesAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //deletar Modalidade
        builder.addCase(deletarModalidadeAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(deletarModalidadeAction.fulfilled, (state, action) => {
            state.loading = false; 
            state.modalidadeDeletada = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(deletarModalidadeAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        
    }
});

export default modalidadeSlices.reducer;