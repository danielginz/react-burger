import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppThunk } from '../index';
import { storeType } from './types';
import {AnyAction, Dispatch} from "redux";
//export const useAppDispatch = () => useDispatch<AppThunk<AppDispatch>>()
export const useAppDispatch = () => useDispatch<any>();

//export const useAppDispatch = () => useDispatch<Dispatch<AnyAction>>();
export const useAppSelector: TypedUseSelectorHook<storeType> = useSelector