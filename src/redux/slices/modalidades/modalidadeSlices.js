import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

export const getModalidadesAction = createAsyncThunk('modalidades/carregar',
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call
            const config = {
                headers: {
                    "Content-Type": "application/json",
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

export const atualizarModalidadeAction = createAsyncThunk('modalidades/atualizar',
    async (modalidade, { rejectWithValue, getState, dispatch }) => {
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
            const url = `${baseUrl}/modalidades/modalidade/${modalidade.id}`
            const { data } = await axios.put(
                url,
                modalidade,
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

export const criarModalidadeAction = createAsyncThunk('modalidades/criar',
    async (modalidade, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.post(
                url,
                modalidade,
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

export const umaModalidadeAction = createAsyncThunk('modalidades/umaModadalidade',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            };
            const url = `${baseUrl}/modalidades/modalidade/${id}`
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
const modalidadeSlices = createSlice({
    name: 'modalidades',
    initialState: {
        modalidades: null
    },
    reducers: {
        resetAtualizada(state) {
            state.modalidadeAtualizada = undefined;
        },
        resetCriada(state) {
            state.modalidadeCriada = undefined;
        }
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
        //atualizar Modalidade
        builder.addCase(atualizarModalidadeAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(atualizarModalidadeAction.fulfilled, (state, action) => {
            state.loading = false; 
            state.modalidadeAtualizada = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(atualizarModalidadeAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //uma Modalidade
        builder.addCase(umaModalidadeAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(umaModalidadeAction.fulfilled, (state, action) => {
            state.loading = false; 
            state.modalidadeEspecifica = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(umaModalidadeAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //criar Modalidade
        builder.addCase(criarModalidadeAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(criarModalidadeAction.fulfilled, (state, action) => {
            state.loading = false; 
            state.modalidadeCriada = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(criarModalidadeAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
});

export default modalidadeSlices.reducer;
export const { resetAtualizada, resetCriada } = modalidadeSlices.actions;