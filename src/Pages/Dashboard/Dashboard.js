import  React, {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Logo from '../../images/Logofull.png'
import SpeedIcon from '@mui/icons-material/Speed';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MoneySharpIcon from '@mui/icons-material/MoneySharp';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Arrow from '../../images/arrd.png';
import User from '../../images/userIcon.png';
import DashboardMain from '../DashboardMain/DashboardMain';
import UserPage from '../User/User';
import PlateProduction from '../PlateProduction/PlateProduction';
import EmbossingProcess from '../EmbossingProcess/EmbossingProcess';
import ManagePlate from '../ManagePlate/ManagePlate';
import Storage from '../Storage/Storage';
import Bills from '../Bills/Bills';
import Delivery from '../Delivery/Delivery';
import CompanyManagement from '../Management/CompanyManagement';
import UserManagement from '../Management/UserManagement';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: '#F3F3F399',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#F3F3F399',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
 
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  
  backgroundColor:'white',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    backgroundColor:'white',
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: 'red',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [sidebar, setSidebar] = useState([
    {
        name: 'Dashboard',
        icon: (
            <SpeedIcon />
        ),
        link: '/dashboard',
        id: 'dashbord',
    },
    {
        name: 'Number Plates',
        icon:(
            <MoneySharpIcon />
        ),
        link: '#',
        id: 'numberPlate',
        isOpen: false,
        isMenu: true,
        subMenu: [
            {
              name: "Plate production",
              link: "/plateProduction",
              id: "plate-production",
            },
            {
              name: "Embossing progress",
              link: "/embossing",
              id: "embossing",
            },
            {
                name: "Manage plates",
                link: "/manageplate",
                id: "manage",
              },
          ],
    },
    {
        name: 'Storage',
        icon: (
            <StorefrontIcon />
        ),
        link: '/storage',
        id: 'storage',
    },
    {
        name: 'Delivery',
        icon: (
            <LocalShippingOutlinedIcon />
        ),
        link: '/delivery',
        id: 'delivery',
    },
    {
        name: 'Bills',
        icon: (
            <DescriptionOutlinedIcon />
        ),
        link: '/bills',
        id: 'bills',
    },
    {
        name: 'Management',
        icon: (
            <CardTravelOutlinedIcon/>
        ),
        link: '#',
        id: 'management',
        isOpen: false,
        isMenu: true,
        subMenu: [
            {
              name: "Company mgment",
              link: "/companymanagement",
              id: "company-mgment",
            },
            {
              name: "User management",
              link: "/usermanagement",
              id: "user-mang",
            },
           
          ],
    },
    {
        name: 'Settings',
        icon: (
            <SettingsOutlinedIcon />
        ),
        link: '#',
        id: 'setting',
        isOpen: false,
        isMenu: true,
        subMenu: [
            {
              name: "Plates settings",
              link: "/",
              id: "plate-setting",
            },
            {
              name: "App settings",
              link: "/",
              id: "app-setting",
            },
            {
                name: "About BPMS",
                link: "/",
                id: "about-bpms",
              },
              {
                name: "Help and support",
                link: "/",
                id: "help",
              },
          ],
    },
    {
        name: 'Reports',
        icon: (
            <DonutLargeIcon />
        ),
        link: '/',
        id: 'report',
    },
    {
        name: 'Sign out',
        icon: (
            <LogoutIcon style={{ color: 'red' }}  />
        ),
        color: ' text-red-700',
        link: '/',
        id: 'signout',
    },
  ])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className=' bg-gray-400' position="fixed" open={open}>
      <div className=' flex justify-between'>
      <Toolbar>
          <IconButton
            
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
         
                
       
        </Toolbar>
            <div className=' flex flex-col justify-center p-2'>
                <Link to='/user'>
                    <img src={User} alt='User' width='40' height='40'/>
                    </Link>
                    </div>
                 </div>
        
        
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        <Typography variant="h6" noWrap component="div">
        <img src={Logo} alt='logo' className=' mx-auto'/>
          </Typography>
        
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          
        </DrawerHeader>
       
        <List>
          {sidebar.map((text, index) => (

            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={(e) => {
                        let sideBar = [...sidebar];
                        let obj = sideBar[index];
                        obj.isOpen = !obj.isOpen;
                        setSidebar(sideBar);
                      }}>
                      <NavLink to={text.link}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                
                <ListItemText className={`${text.color}`} primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
                {text.isMenu && open ? <img src={Arrow} alt='arrow' /> : null }

              </ListItemButton>
              </NavLink>
              {text.isMenu && open && text.isOpen ? text.subMenu.map((i) =>(
                <p key={i} className=' text-center py-1 text-gray-400'><NavLink to={i.link}>{i.name}</NavLink></p>
                  )) : null}
            </ListItem>
            
          ))}
        </List>
        
       {open && <p className=' flex  justify-center text-xs mt-20'>©️ 2022 - BPMS Powered by <span className=' text-the-color'>Ten-io</span> </p>}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
            <Routes>
                <Route path='/dashboard' element={<DashboardMain />}/>
                <Route path='/user' element={<UserPage />} />
                <Route path='/plateProduction' element={<PlateProduction />} />
                <Route path='/embossing' element={<EmbossingProcess />} />
                <Route  path='/manageplate' element={<ManagePlate/>}/>
                <Route path='/storage' element={<Storage />} />
                <Route path='/bills' element={<Bills />}/>
                <Route path='/delivery' element={<Delivery/>} />
                <Route path='/companymanagement' element={<CompanyManagement />} />
                <Route path='/usermanagement' element={<UserManagement />} />
            </Routes>
      </Box>
    </Box>
  );
}
