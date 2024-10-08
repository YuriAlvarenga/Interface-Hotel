import React, { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import HomeIcon from '@mui/icons-material/Home'
import { Typography } from '@mui/material'
import { setItemName, setSelectedTabLabel } from '../../redux/slice/menuSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDepartments } from '../../redux/slice/departmentSlice'



export default function MenuLateral() { //handleclick e togglemenuauxiliar  estão vindo de home

  const dispatch = useDispatch()
  const [activeItem, setActiveItem] = useState(0)
  const { departments } = useSelector((state) => state.departments)

  useEffect(() => {
    dispatch(fetchDepartments())
  }, [dispatch])

  const handleDashboardClick = () => {
    dispatch(setItemName('Home'))
    dispatch(setSelectedTabLabel(''))
    setActiveItem(0)
  }

  const handleCategoryItemClick = (childName, id) => {
    dispatch(setItemName(childName))
    dispatch(setSelectedTabLabel(''))
    setActiveItem(id)
  }


  // ícones e nomes que estão no menu lateral
  const categories = [
    {
      name: 'Gerenciamento',
      children: [
        { id: 101, name: 'Departamentos' },
        { id: 102, name: 'Escala' }
      ]
    },
    ...(departments.length > 0
      ? [{
          name: 'Setores',
          children: departments.map(department => ({
            id: department.id,
            name: department.name,
          }))
        }]
      : []),
    {
      name: 'Manutenção de Contas',
      children: [
        { id: 201, name: 'Contas' },
        { id: 202, name: 'Relatórios' },
      ],
    },
  ]

  return (
    <Drawer variant="permanent" sx={{ background: '#101F33', }}>
      <List disablePadding sx={{ background: '#101F33', height: '100vh' }}>
        <ListItem sx={{ py: 1, px: 3, color: 'rgba(255, 255, 255, 0.7)', boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset', fontSize: 16, color: '#fff' }}>
          <ViewInArIcon />
          <Typography variant="body3" sx={{ ml: 4 }}>
            Tech-in
          </Typography>
        </ListItem>

        <ListItem disablePadding sx={{ background: '#101F33' }} onClick={handleDashboardClick}>
          <ListItemButton selected={activeItem === 0} sx={{ py: 1, px: 2, fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }} >
            <ListItemIcon><HomeIcon style={{ fontSize: 16 }} /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: 14 }}>
                Início
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />

        {categories.map(({ name, children }) => (
          <Box key={name} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ p: 2, pb:0 }}>
              <ListItemText
                sx={{ color: '#fff' }}
                primary={<Typography sx={{ fontSize: '1rem' }}>{name}</Typography>}
              />
            </ListItem>
            {children.map(({ id, name: childName, icon }) => (
              <ListItem disablePadding key={childName}>
                <ListItemButton selected={activeItem === id} sx={{ color: 'rgba(255, 255, 255, 0.7)' }} onClick={() => handleCategoryItemClick(childName, id)}>
                  <ListItemIcon >{icon}</ListItemIcon>
                  <ListItemText>
                    <Typography sx={{ fontSize: 12 }}>
                      {childName}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}

      </List>
    </Drawer>
  )
}