import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

export const primeiroLoginAction = createAsyncThunk('admin/primeiroLogin',
    async (adminData, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const url = `${baseUrl}/admin/primeiroLogin`
            const { data } = await axios.post(
                url,
                adminData,
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

export const loginAction = createAsyncThunk('admin/login',    
async (adminData, { rejectWithValue, getState, dispatch }) => {
    try {
        //http call
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const url = `${baseUrl}/admin/login`
        const { data } = await axios.post(
            url,
            adminData,
            config
        );
        localStorage.setItem('infoUsuario', JSON.stringify(data));
        return data;
    } catch (err) {
        if(!err?.response) {
            throw err;
        };
        return rejectWithValue(err?.response?.data);
    }
})

export const registrarUsuarioAction = createAsyncThunk('admin/registrar',
    async (usuario, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            };
            const url = `${baseUrl}/admin/registrar`
            const { data } = await axios.post(
                url,
                usuario,
                config
            );
            //salvar usuário no localStorage
            localStorage.setItem('infoUsuario', JSON.stringify(data));
            return data;
        } catch (err) {
            if(!err?.response) {
                throw err;
            };
            return rejectWithValue(err?.response?.data);
        }
});

export const logoutAction = createAsyncThunk('admin/logout',
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            localStorage.removeItem('infoUsuario');
        } catch (err) {
            if(!err?.response) {
                throw err;
            };
            return rejectWithValue(err?.response?.data);
        }
});

//pegar usuário do localStorage e colocar na store
const usuarioLogadoLocalStorage = 
    localStorage.getItem('infoUsuario') ?
    JSON.parse(localStorage.getItem('infoUsuario')) :
    null;

//slices
const adminSlices = createSlice({
    name: 'admin',
    initialState: {
        autorizado: false,
        usuarioLogado: usuarioLogadoLocalStorage
    },
    extraReducers: (builder) => {
        //primeiroLogin
        builder.addCase(primeiroLoginAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(primeiroLoginAction.fulfilled, (state, action) => {
            state.loading = false;
            state.primeiroLogin = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(primeiroLoginAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //registrar
        builder.addCase(registrarUsuarioAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(registrarUsuarioAction.fulfilled, (state, action) => {
            state.loading = false;
            state.usuarioLogado = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registrarUsuarioAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //login
        builder.addCase(loginAction.pending, (state, action) => {
           state.loading = true;
           state.appErr = undefined;
           state.serverErr = undefined; 
        });
        builder.addCase(loginAction.fulfilled, (state, action) => {
           state.usuarioLogado = action?.payload;
           state.loading = false;
           state.appErr = undefined;
           state.serverErr = undefined; 
        });
        builder.addCase(loginAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });
        //logout
        builder.addCase(logoutAction.pending, (state, action) => {
            state.loading = false;
        });
        builder.addCase(logoutAction.fulfilled, (state, action) => {
            state.usuarioLogado = undefined;
            state.primeiroLogin = undefined;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(logoutAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });
    }
});

export default adminSlices.reducer;