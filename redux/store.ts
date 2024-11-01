import rootReducer from "@/redux/index";
import {configureStore} from "@reduxjs/toolkit";

const store=configureStore({
    reducer: rootReducer,
});

export default store;