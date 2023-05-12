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
    async ({ primeiroNome, sobrenome, senha, email, image }, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call


            // initialValues: {
            //     primeiroNome: '',
            //     sobrenome: '',
            //     senha: '',
            //     email: '',
            //     image: ''
            // },
            let formData= new FormData();
            formData.append("image", image);
            formData.append("primeiroNome", primeiroNome);
            formData.append("sobrenome", sobrenome);
            formData.append("senha", senha);
            formData.append("email", email);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            };
            const url = `${baseUrl}/admin/registrar`
            const { data } = await axios.post(
                url,
                formData,
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

export const painelPresencaAction = createAsyncThunk('admin/painelPresenca',
        async (presenca, { rejectWithValue, getState, dispatch }) => {
            const { modalidadeId, dia, mes, ano } = presenca;
            try {
                //http call
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                const url = `${baseUrl}/admin/listaDePresenca?modalidadeId=${modalidadeId}&mes=${mes}&dia=${dia}&ano=${ano}`;
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

export const validarComprovanteAction = createAsyncThunk('admin/validarComprovante',
        async (comprovante, { rejectWithValue, getState, dispatch }) => {
            try {
                //http call
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                const url = `${baseUrl}/admin/validarComprovantes`;
                const { data } = await axios.post(
                    url,
                    comprovante,
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

export const getComprovantesAction = createAsyncThunk('admin/getComprovantes',
        async (_, { rejectWithValue, getState, dispatch }) => {
            try {
                //http call
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                const url = `${baseUrl}/admin/painelDeComprovantes`;
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
        //lista de presença
        builder.addCase(painelPresencaAction.pending, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined; 
        });
        builder.addCase(painelPresencaAction.fulfilled, (state, action) => {
            state.listaDePresenca = action.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(painelPresencaAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });
        //painel de comprovantes
        builder.addCase(getComprovantesAction.pending, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined; 
        });
        builder.addCase(getComprovantesAction.fulfilled, (state, action) => {
            state.painelDeComprovantes = action.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(getComprovantesAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });
        //validar Comprovante
        builder.addCase(validarComprovanteAction.pending, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined; 
        });
        builder.addCase(validarComprovanteAction.fulfilled, (state, action) => {
            state.comprovanteValido = action.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(validarComprovanteAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });
    }
});

export default adminSlices.reducer;