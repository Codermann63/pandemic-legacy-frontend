import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlize";
import {citiesReducer} from "../domain/CitySlice";

export const store =  configureStore({
    reducer: {
        counter: counterReducer,
        cities: citiesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch