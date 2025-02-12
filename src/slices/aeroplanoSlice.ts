import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncThunkConfigGlobal} from "../types/interfaces";
import {ErrorResponse} from "react-router-dom";


export interface SaveParam<T> {
    body: T
    isAvanti: boolean
    callback: (arg: string) => void
    isCheck?: boolean
}


export interface AeroplanoSlice {
    id : number
    model: string
    seats: number
    holdCapacity: number
    tankCapacity: number
    //flightList : Array<Flight>
}

const initialStateAereo: AeroplanoSlice = {
    id : 0,
    model: "",
    seats: 0,
    holdCapacity: 0,
    tankCapacity: 0
    //flightList : []
}

interface listeAerei {
    aerei : Array<AeroplanoSlice>
}

const initialState: listeAerei = {
    aerei: []
}

export const ListaAerei = createAsyncThunk<void, AeroplanoSlice, AsyncThunkConfigGlobal>(
    "thunk/aerei/listaAerei",
    async(param, {extra, dispatch, getState}) => {
        const {aereo} = getState()
        try {
            const response = await extra.service.doAjax(
                "GET",
                "/findAll"
            )
            dispatch(fecthListaAerei(response.data))
        } catch (error: unknown) {
            console.log("Error", (error as ErrorResponse).data)
            const responseData = (error as ErrorResponse).data.error

        }
    }
)

const listaAereiSlice = createSlice({
    name: "listaAerei",
        initialState,
        reducers: {
            fecthListaAerei(
                state: listeAerei,
                action: PayloadAction<Array<AeroplanoSlice>>
            ){
                state.aerei = action.payload
                return state
            }
        }
})

export const {fecthListaAerei} = listaAereiSlice.actions
export default listaAereiSlice.reducer
