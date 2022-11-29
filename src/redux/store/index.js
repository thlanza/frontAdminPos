import { configureStore } from "@reduxjs/toolkit";
import adminReducer from '../slices/admin/adminSlices';

const store = configureStore({
    reducer: {
        admin: adminReducer
    }
});

export default store;