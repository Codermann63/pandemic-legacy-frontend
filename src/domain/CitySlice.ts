import {createSlice, createEntityAdapter} from "@reduxjs/toolkit";
import type { CubeColor } from "../data/data";
import type { RootState } from "../app/store";

type City = {
    id: string;
    name: string;
    color: CubeColor;
    cubes: Record<CubeColor, number>;
    x: number;
    y: number;
}

const citiesAdapter = createEntityAdapter<City>();

export const citiesSlice = createSlice({
    name: "engine/city",
    initialState: citiesAdapter.getInitialState(),
    reducers: {
        addCity: citiesAdapter.addOne,
        removeCity: citiesAdapter.removeOne,
        addCities: citiesAdapter.addMany,
        updateCity: citiesAdapter.updateOne,
        removeCubes: (state, action: {payload: {id: string, color: CubeColor, amount: number}}) => {
            const {id, color, amount} = action.payload;
            const city = state.entities[id];
            if (city) {
                city.cubes[color] = Math.max(0, city.cubes[color] - amount);
            }
        }
    },
},);
export const {addCity, removeCity, addCities, updateCity, removeCubes} = citiesSlice.actions;
export const citiesReducer = citiesSlice.reducer;

export const {
    selectById: selectCityById,
    selectIds: selectCityIds,
    selectEntities: selectCityEntities,
} = citiesAdapter.getSelectors((state: RootState) => state.cities);