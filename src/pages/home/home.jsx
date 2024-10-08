import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import MenuLateral from '../../components/menus-home/menu-lateral'
import MenuSuperior from '../../components/menus-home/menu-superior'
import { useSelector } from 'react-redux'
import ChamadosAbertos from '../../components/chamados/chamados-abertos'
import OpenManualTicket from '../../components/open-manual-ticket/open-manual-ticket'
import DashboardCard from '../../components/briefing/briefing'
import Management from '../../components/management/management'


let theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: 44,
    },
  },
})

theme = {
  ...theme,
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2)
        },
      },
    },
  },
}


export default function MenuHome() {



  //criarChamadoManutal (newTicket)
  const [newTicket, setValueNewTicket] = useState(false)
  const handleClick = () => {
    setValueNewTicket(!newTicket)
    //dispatch(setItemName('Novo Chamado'))
    //dispatch(setSelectedTabLabel(''))
  }

  const renderBasedOnNewTicket = () => {
    if (newTicket) {
      return <OpenManualTicket open={newTicket} onClose={handleClick} />
    }
    return null
  }

  //função que 'recolhe' o nome clicado e mostra no menu superior, passado como props para menu lateral e superior
  const itemName = useSelector((state) => state.menu.itemName)
  const renderBasedOnItemName = () => {
    switch (itemName) {
      case 'Departamentos':
        return <Management/>
      case 'Recepção':
      case 'Governança':
      case 'Restaurante':
      case 'Room Service':
      case 'Manutenção':
        return <ChamadosAbertos />
      case 'Relatórios':
        return <DashboardCard/>
      default:
        return ''
    }
  }

  const getComponentToRender = () => {
    return renderBasedOnNewTicket() || renderBasedOnItemName()
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box component="nav" sx={{ width: { sm: 200 }, flexShrink: { sm: 0 } }}>
          <MenuLateral sx={{ display: { sm: 'block', xs: 'none' } }} />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <MenuSuperior newTicket={newTicket} handleClick={handleClick} />
          <Box sx={{ mt: 2, p: 2, flexGrow: 1, overflow: 'auto' }}>
            {getComponentToRender()}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}