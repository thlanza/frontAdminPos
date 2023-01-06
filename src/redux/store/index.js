import { configureStore } from "@reduxjs/toolkit";
import adminReducer from '../slices/admin/adminSlices';
import modalidadeReducer from '../slices/modalidades/modalidadeSlices';
import alunosReducer from '../slices/alunos/alunosSlices';

const store = configureStore({
    reducer: {
        admin: adminReducer,
        modalidades: modalidadeReducer,
        alunos: alunosReducer
    }
});

export default store;