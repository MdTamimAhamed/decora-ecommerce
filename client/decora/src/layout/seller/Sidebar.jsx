import {
  Box,
  Collapse,
  Divider,
  ListItemButton,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import SearchBar from '../../components/reuseables/SearchBar';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import FlagIcon from '@mui/icons-material/Flag';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { alpha } from '@mui/system';
import { useSelector } from 'react-redux';

function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(null);
  const [activeSubNav, setActiveSubNav] = useState(null);
  const [open, setOpen] = useState(false);

  const { isSellerVerified } = useSelector((state) => state.sellerVerify);

  const navOptions = [
    { id: 0, name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    {
      id: 1,
      name: 'Products',
      path: '/products',
      icon: <WarehouseIcon />,
      subNavCategory: [
        { id: 0, name: 'Add Products', path: '/products/add-products' },
      ],
    },
    {
      id: 2,
      name: 'Manage Products',
      path: '/manage-products',
      icon: <InventoryIcon />,
    },
    { id: 3, name: 'My Store', path: '/store', icon: <StoreIcon /> },
    {
      id: 4,
      name: 'Orders',
      path: '/orders',
      icon: <ViewListIcon />,
      subNavCategory: [
        { id: 0, name: 'Manage Orders', path: '/orders/manage-orders' },
        { id: 1, name: 'Customer Returns', path: '/products/manage-products' },
        {
          id: 2,
          name: 'Schedule Drop-offs',
          path: '/products/manage-products',
        },
      ],
    },
    { id: 5, name: 'Customers', icon: <PeopleIcon />, path: '/*' },
    { id: 6, name: 'Analytics', icon: <BarChartIcon />, path: '/*' },
    { id: 7, name: 'Reports', icon: <FlagIcon />, path: '/*' },
    {
      id: 8,
      name: 'Content Management',
      icon: <ManageAccountsIcon />,
      path: '/*',
    },
    { id: 9, name: 'Supports', icon: <SupportAgentIcon />, path: '/*' },
    { id: 10, name: 'Settings', icon: <SettingsIcon />, path: '/*' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentNavItem = navOptions.find((item) => item.path === currentPath);
    if (currentNavItem) {
      setActiveNav(currentNavItem.id);
      setActiveSubNav(null);
    } else {
      const parentNav = navOptions.find((item) =>
        currentPath.startsWith(item.path)
      );
      if (parentNav) {
        setActiveNav(parentNav.id);
        setActiveSubNav(null);
      } else {
        navOptions.forEach((item) => {
          const subNav = item.subNavCategory?.find(
            (subItem) => subItem.path === currentPath
          );
          if (subNav) {
            setActiveSubNav(subNav.id);
          }
        });
      }
    }
  }, [location.pathname]);

  function handleClick(id, path) {
    setActiveNav(id);
    navigate(path);
    setOpen(!open);
  }

  function subCategoryHandleClick(id, path) {
    if (isSellerVerified) {
      navigate(path);
    } else {
      navigate('/products');
    }
    setActiveSubNav(id);
  }
  return (
    <Box
      sx={{
        minWidth: '260px',
        height: '100vh',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
        bgcolor: theme.palette.primary.main,
        padding: '12px',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography mb={8} variant="h4" color="white" fontWeight="800">
          Decora
          <Typography
            component="p"
            letterSpacing={2}
            lineHeight="5px"
            variant="subtitle1"
          >
            E-commerce
          </Typography>
        </Typography>
      </Box>
      <Box my={2}>
        <SearchBar placeholder="Search..." iconColor="primary" />
      </Box>
      <Divider />
      <Box>
        <MenuList>
          {/* ---------showing nav items------------ */}
          {navOptions.map((item) => (
            <div key={item.id}>
              <MenuItem
                disableRipple
                onClick={() => handleClick(item.id, item.path)}
                sx={{
                  bgcolor: activeNav === item.id && 'white',
                  '&:hover': {
                    bgcolor: activeNav === item.id ? 'white' : '',
                  },
                  transition: 'all',
                  transitionDuration: '100ms',
                  transitionTimingFunction: 'ease-in',
                }}
              >
                <Typography
                  sx={{
                    color:
                      activeNav === item.id
                        ? `${theme.palette.primary.main}`
                        : 'white',
                  }}
                >
                  {item.icon}
                </Typography>
                <ListItemText
                  sx={{
                    ml: '10px',
                    color:
                      activeNav === item.id
                        ? `${theme.palette.primary.main}`
                        : 'white',
                  }}
                >
                  {item.name}
                </ListItemText>
                {/* ---------------------------------------- */}

                {/* ---------showing dropdown arrow------------ */}
                {item.subNavCategory ? (
                  <Box
                    sx={{
                      color:
                        activeNav === item.id
                          ? `${theme.palette.primary.main}`
                          : 'white',
                    }}
                  >
                    {activeNav === item.id && open ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </Box>
                ) : (
                  ''
                )}
                {/* ---------------------------------------- */}
              </MenuItem>

              {/* ---------showing subcategories------------ */}
              {item.subNavCategory && (
                <Collapse sx={{ mt: '5px' }} in={activeNav === item.id && open}>
                  {item.subNavCategory.map((sub) => (
                    <ListItemButton
                      onClick={() => subCategoryHandleClick(sub.id, sub.path)}
                      sx={{
                        py: 0,
                        ml: 5,
                        borderBottom:
                          activeSubNav === sub.id ? '1px solid white' : '',
                      }}
                      key={sub.id}
                    >
                      <ListItemText sx={{ color: 'white' }}>
                        <Typography
                          color={alpha(theme.palette.common.white, 0.8)}
                          fontWeight={300}
                          variant="subtitle2"
                        >
                          {sub.name}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  ))}
                </Collapse>
              )}
              {/* ---------------------------------------- */}
            </div>
          ))}
        </MenuList>
      </Box>
    </Box>
  );
}

export default Sidebar;
