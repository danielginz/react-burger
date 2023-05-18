import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
//import {storeType} from "./types";

export const useAppDispatch = () => useDispatch<AppDispatch>()
//export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppSelector: TypedUseSelectorHook<any> = useSelector
//export const useAppSelector: TypedUseSelectorHook<storeType> = useSelector