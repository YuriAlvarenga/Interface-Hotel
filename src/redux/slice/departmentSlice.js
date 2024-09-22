// slices/departmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk para buscar departamentos
export const fetchDepartments = createAsyncThunk(
  'departments/fetchDepartments',
  async () => {
    const response = await axios.get('http://localhost:8000/departments')
    return response.data
  }
)

export const createDepartment = createAsyncThunk(
    'departments/createDepartment',
    async(newDepartment) => {
        const response = await axios.post('http://localhost:8000/departments', newDepartment)
        return response.data
    }
)

const departmentSlice = createSlice({
  name: 'departments',
  initialState: {
    loading: false,
    departments: [],
    error: '',
    message: '',
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
    //get
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true
        state.message = ''
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false
        state.departments = action.payload
        state.error = ''
        state.message = action.payload.length === 0 ? 'Você ainda não tem nenhum departamento criado.' : ''
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false
        state.departments = []
        state.error = action.error.message
        state.message = ''
      })

      //post
      .addCase(createDepartment.pending, (state) => {
        state.loading = true
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false
        state.departments.push(action.payload)
      })
  },
})

export default departmentSlice.reducer
