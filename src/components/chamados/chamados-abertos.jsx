import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'

// Exemplo de dados para os chamados
const chamados = [
  { apartamento: 'U.H. 101', solicitacao: 'Toalha extra', quantidade: 2, inicio: '10:00', tempo: '15 min' },
  { apartamento: 'U.H. 102', solicitacao: 'Travesseiro extra', quantidade: 1, inicio: '10:05', tempo: '10 min' },
  { apartamento: 'U.H. 103', solicitacao: 'Limpeza', quantidade: 1, inicio: '10:10', tempo: '30 min' },
]

export default function ChamadosAbertos() {
  const selectedTabLabel = useSelector((state) => state.menu.selectedTabLabel)
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ background: '#dedede' }}>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Apartamento</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Solicitação</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Quantidade</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Início</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Tempo</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        {selectedTabLabel && (
          <TableBody>
            {chamados.map((chamado, index) => (
              <TableRow key={index} sx={{ bgcolor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <TableCell sx={{ fontSize: 12, border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  {chamado.apartamento}
                </TableCell>
                <TableCell sx={{ fontSize: 12, border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  {chamado.solicitacao}
                </TableCell>
                <TableCell sx={{ fontSize: 12, border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  {chamado.quantidade}
                </TableCell>
                <TableCell sx={{ fontSize: 12, border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  {chamado.inicio}
                </TableCell>
                <TableCell sx={{ fontSize: 12, border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  {chamado.tempo}
                </TableCell>
                <TableCell sx={{ fontSize: 12, border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  <Button variant='contained' sx={{ fontSize: 10, padding: '4px 8px', minWidth: '80px' }}>atender</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </React.Fragment>
  )
}
