import {configureStore} from '@reduxjs/toolkit'
import menuReducer from '../slice/menuSlice'
import departmentSlice from '../slice/departmentSlice'


export const store = configureStore({
    reducer:{
        menu: menuReducer,
        departments: departmentSlice,
    },
})