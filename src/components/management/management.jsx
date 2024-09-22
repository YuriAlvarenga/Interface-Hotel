import { Button, Typography, Box, TextField, Tab } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDepartments, createDepartment } from '../../redux/slice/departmentSlice'


export default function Management() {
    const dispatch = useDispatch()
    const { departments, message } = useSelector((state) => state.departments)
    const [newDepartment, setNewDepartment] = useState('')

    useEffect(() => {
        dispatch(fetchDepartments())
    }, [dispatch])

    const handleAddDepartment = () => {
        if (newDepartment.trim()) {
            dispatch(createDepartment({ name: newDepartment.trim() }))
            setNewDepartment('')
        }
    }


    return (
        <React.Fragment>
            <Typography align="center" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: '#101F33' }}>
                Gerenciamento de Departamentos
            </Typography>
            {message && (
                <Typography variant="body1" align="center" sx={{ mb: 2, color: '#FF5722' }}>
                    {message}
                </Typography>
            )}
            <Paper elevation={3} sx={{ padding: 2, mt: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField variant="standard" size="medium" fullWidth value={newDepartment} placeholder="Criar Novo Departamento" onChange={(e) => setNewDepartment(e.target.value)} />
                    <Box sx={{ display: 'flex', ml: 2 }}>
                        <Button variant="contained" color="primary" sx={{ fontSize: 12, padding: '6px 12px', textTransform: 'none', mr: 1 }} onClick={handleAddDepartment}>
                            Adicionar
                        </Button>
                        <Button variant="contained" color="error" sx={{ fontSize: 12, padding: '6px 12px', textTransform: 'none' }}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>

            </Paper>
            {departments.length > 0 && (
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ background: '#101F33' }}>
                                <TableCell sx={{ fontSize: 12, fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                    Departamentos
                                </TableCell>
                                <TableCell sx={{ fontSize: 12, fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                    Ações
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments.map((department) => (
                                <TableRow key={department.id} sx={{ background: '#FFF' }}>
                                    <TableCell sx={{ fontSize: 12, border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                        {department.name}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 12, border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                        <Tooltip title="Adicionar Serviços">
                                            <IconButton>
                                                <AddCircleOutlineIcon style={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Editar Departamento">
                                            <IconButton>
                                                <BorderColorIcon style={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Deletar Departamento">
                                            <IconButton>
                                                <DeleteForeverIcon style={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </React.Fragment>
    )
}
