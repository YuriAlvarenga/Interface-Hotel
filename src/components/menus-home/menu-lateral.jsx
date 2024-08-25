import React, { useState } from 'react'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant'
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import HomeIcon from '@mui/icons-material/Home'
import FolderSharedIcon from '@mui/icons-material/FolderShared'
import AssessmentIcon from '@mui/icons-material/Assessment'
import { Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setItemName, setSelectedTabLabel } from '../../redux/slice/menuSlice'




// ícones e nomes que estão no menu lateral
const categories = [
  {
    name: 'Setores',
    children: [
      { id: 1, name: 'Recepção', icon: <NotificationsActiveIcon style={{ fontSize: 16 }} /> },
      { id: 2, name: 'Governança', icon: <NotificationImportantIcon style={{ fontSize: 16 }} /> },
      { id: 3, name: 'Restaurante', icon: <NotificationsPausedIcon style={{ fontSize: 16 }} /> },
      { id: 4, name: 'Room Service', icon: <NotificationsPausedIcon style={{ fontSize: 16 }} /> },
      { id: 5, name: 'Manutenção', icon: <NotificationsPausedIcon style={{ fontSize: 16 }} /> },
    ],
  },
  {
    name: 'Manutenção de Contas',
    children: [
      { id: 6, name: 'Contas', icon: <FolderSharedIcon style={{ fontSize: 16 }} /> },
      { id: 7, name: 'Relatórios', icon: <AssessmentIcon style={{ fontSize: 16 }} /> },
    ],
  },
]



export default function MenuLateral() { //handleclick e togglemenuauxiliar  estão vindo de home

  const dispatch = useDispatch()
  const [activeItem, setActiveItem] = useState(0)

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
            <ListItem sx={{ p: 2 }}>
              <ListItemText sx={{ color: '#fff' }}>{name}</ListItemText>
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