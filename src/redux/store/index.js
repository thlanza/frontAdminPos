import { configureStore } from "@reduxjs/toolkit";
import adminReducer from '../slices/admin/adminSlices';
import modalidadeReducer from '../slices/modalidades/modalidadeSlices';

const store = configureStore({
    reducer: {
        admin: adminReducer,
        modalidades: modalidadeReducer
    }
});

export default store;