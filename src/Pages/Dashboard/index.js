import  React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
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
import PlatesSettings from '../Settings/PlatesSettings';
import AppSettings from '../Settings/AppSettings';
import Aboutbpms from '../Settings/Aboutbpms';
import HelpSupport from '../Settings/HelpSupport';
import Logout from '../Logout';
import {useSelector}  from "react-redux";
const drawerWidth = 240;



function Dashboard(props) {
    const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {  user } = useSelector((state) => state.auth);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
              link: "/platesettings",
              id: "plate-setting",
            },
            {
              name: "App settings",
              link: "/appsettings",
              id: "app-setting",
            },
            {
                name: "About BPMS",
                link: "/aboutus",
                id: "about-bpms",
              },
              {
                name: "Help and support",
                link: "/helpandsupport",
                id: "help",
              },
          ],
    },
    {
        name: 'Reports',
        icon: (
            <DonutLargeIcon />
        ),
        link: '#',
        id: 'report',
        isOpen: false,
        isMenu: true,
        subMenu: [
            {
              name: "System logs",
              link: "#",
              id: "systemlog",
            },
            {
              name: "Audit trail",
              link: "#",
              id: "audt",
            },
            {
                name: "Statistical reports",
                link: "#",
                id: "streport",
              },
             
          ],},
    {
        name: 'Sign out',
        icon: (
            <LogoutIcon style={{ color: 'red' }}  />
        ),
        color: ' text-red-700',
        link: '/logout',
        id: 'signout',
    },
  ])
  const drawer = (
    <div>
     <div className=' pt-5 md:ml-6 pb-2'>
        <img src={Logo} alt='logo' className=' mx-auto'/>
          </div>
     
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
                  justifyContent:  'initial' ,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:  3 ,
                    justifyContent: 'center',
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                
                <ListItemText className={`${text.color}`} primary={text.name} sx={{ opacity:  1  }} />
                {text.isMenu  ? <img src={Arrow} alt='arrow' /> : null }

              </ListItemButton>
              </NavLink>
              {text.isMenu  && text.isOpen ? text.subMenu.map((i) =>(
                
                <p key={i}  className=' pl-16 text-start py-1 text-gray-400'><NavLink to={i.link}>{i.name}</NavLink></p>
                
                  )) : null}
            </ListItem>
            
          ))}
          
        </List>
        <p className=' flex  justify-center text-xs mt-20'>©️ 2022 - BPMS Powered by <span className=' text-the-color'>Ten-io</span></p>
     
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <div>
   
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
         backgroundColor: 'white',
          
        
        }}
      >
      <div className=' flex justify-between'>
      <Toolbar>
      <IconButton
            
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
         
                
       
        </Toolbar>
            <div className=' flex flex-col justify-center p-2'>
            <div>
                <p className=' text-black inline-block mr-4'> Welcome {user.user.fname} {user.user.lname}</p>
                <Link to='/user'>
                    <img src={User} alt='User' className=' inline-block' width='40' height='40'/>
                    </Link>
                    </div>
                    </div>
                 </div>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'rgba(243, 243, 243, 0.9)' },
          }}
        >
          {drawer}
          

        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      <div className=' w-full' >
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
                <Route path='/platesettings' element={<PlatesSettings />} />
                <Route path='/appsettings' element={<AppSettings />}  />
                <Route path='/aboutus' element={<Aboutbpms />} />
                <Route path='/helpandsupport' element= {<HelpSupport />} />
                <Route path='/logout' element={<Logout />} />
            </Routes>
      </div>
        
      </Box>
    </Box>
    </div>
  )
}
Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

export default Dashboard