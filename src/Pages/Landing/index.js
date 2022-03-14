import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Autocomplete, Button, Container, TextField } from '@mui/material';
import { MdOutlineDocumentScanner } from "react-icons/md";
import Category from '../../components/category';
import MainComponent from '../../components/main';
import CariPage from '../../components/cari'
import StepPage from '../../components/step'
import { HOST_API } from '../../constant/index';
import axios from 'axios';
import {
    Routes,
    Route,
  } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));





export default function LandingPage() {

  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [navHeight, setNavHeight] = React.useState(0);
  const [isMobile, setMobile] = React.useState(false);
  const [search, setSearch] = React.useState([])
  const [selectedCategory, setSelectedCategory] = React.useState('semua')
  const [selectedSort, setSelectedSort] = React.useState('date')
  const [valueCari, setValueCari] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [receipes, setReceipes] = React.useState([])
  const [tempreceipes, setTempReceipes] = React.useState([])
  const [mount, setMount] = React.useState(false);

  const nav = React.useRef();
  const terbaru = React.useRef(null);
  const az = React.useRef(null);
  const za = React.useRef(null);
  const like = React.useRef(null);

  React.useLayoutEffect(() => {
    terbaru.current.classList.add("active")
    getReceipes()
    nav.current && setNavHeight(nav.current.clientHeight);
  }, [isMobile]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const by_category = async (e) => {
    await getReceipes()
    setSelectedCategory(e)
  }

  const handleCari  = (e) => {
      setSearch(e)
  }

  
 
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

async function getReceipes () {
    axios.get(`${HOST_API}/recipes`)
    .then((result) => {
        if(result.data.success){
            let temp = result.data.data.recipes;
            setReceipes(temp)
            setTempReceipes(temp)
            setMount(true)
        }
    })
    .catch(error => {
        console.log(error)
    })
}

  const handleAutoComplete = (e, v) => {
      setValueCari(v.id)
      processCari(v.id)
      
  }

  const sort_by = async(field, data) => {
        setMount(false)
        setSelectedSort(field)
        await getReceipes()
        if(field === 'date'){
            terbaru.current.classList.add("active")
            az.current.classList.remove("active")
            za.current.classList.remove("active")
            like.current.classList.remove("active")
        }
        else if(field === 'a-z'){
            terbaru.current.classList.remove("active")
            az.current.classList.add("active")
            za.current.classList.remove("active")
            like.current.classList.remove("active")
        }
        else if(field === 'z-a'){
            terbaru.current.classList.remove("active")
            az.current.classList.remove("active")
            za.current.classList.add("active")
            like.current.classList.remove("active")
        }
        else if(field === 'like'){
            terbaru.current.classList.remove("active")
            az.current.classList.remove("active")
            za.current.classList.remove("active")
            like.current.classList.add("active")
        }
    }

  const processCari = (value) => {
    navigate(`cari/${value}`)
  }

  const onChangeCari = (e) => {
    let temp = []
    const getData = () => {
        axios.get(`${HOST_API}/search/recipes?limit&q=${e}`)
        .then((result) => {
            if(result.data.success){
                temp = result.data.data.recipes;
                return temp
                // setData(temp)
                // setMount(true)
                console.log(temp)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
  }

  
  return (
    <>
        <Box sx={{ flexGrow: 1 }} className="fixed-appbar" ref={nav}>
            <Container sx={{ backgroundColor:'white' }}>
                <AppBar position="static" sx={{pb:2, pt:4}}>
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => (navigate(`../landing_page`))}
                        sx={{ mr:2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <img src={'./headerLogo.png'} className="App-logo" alt="logo"  data-cy="header-logo"/>
                    </IconButton>
                    <Search sx={{ flexGrow: 1 }}>
                    {/* <FiSearch size={20} color={'#dedede'}/>                         */}
                        <Autocomplete
                            data-cy="search-suggestion-container"
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={receipes.map((option) => option)}
                            style={{fontFamily:'PoppinsRegular', fontSize:16}}
                            getOptionLabel={(option) => option.name}
                            onChange={(e, v) => handleAutoComplete(e, v)}
                            renderOption={(props, option) => <li {...props} data-ids={option.id}>{option.name}</li>}
                            renderInput={(params) => (
                            <TextField
                                data-cy="header-input-search"
                                style={{fontFamily:'PoppinsRegular', fontSize:16}}
                                placeholder='Cari Resep'
                                {...params}
                                InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                }}
                            />
                            )}
                        />
                    </Search>
                    <Button sx={{display: { xs: 'none', md: 'flex' } }} data-cy="header-button-search" style={{textTransform:'capitalize', fontFamily:'PoppinsRegular', fontSize:16, backgroundColor:'#EF5734', color:'white'}}>Cari</Button>
                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                    <Box sx={{ display: { xs: 'flex'} }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MdOutlineDocumentScanner color='#ef5734' size={25} data-cy="header-button-history"/>
                        </IconButton>
                    </Box>
                    </Toolbar>
                </AppBar>
                <Category by_category={by_category}/>
            </Container>
        </Box>
        <Box  style={{ paddingTop: `${navHeight + (navHeight/10)}px`, background:'#f9f9f9'}}>
            <Container sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, pt:2, background:'#f9f9f9'}}>
                <Button sx={{ my: 1, mr:2, textTransform:'capitalize', fontFamily:'PoppinsBold', display: 'block', color:'#5e5e5e' }}>
                    Urutkan :
                </Button>
                <Button ref={terbaru} data-cy="button-sort-latest" onClick={() => sort_by('date', receipes)} className='sortby-btn' variant={'contained'} sx={{ my: 1, mr:2, pt:1, pb:1, textTransform:'capitalize', fontFamily:'PoppinsRegular', display: 'block' }}>
                    Terbaru
                </Button>
                <Button ref={az} data-cy="button-sort-az" onClick={() => sort_by('a-z', receipes)} className='sortby-btn' variant={'contained'} sx={{ my: 1, mr:2, pt:1, pb:1, textTransform:'capitalize', fontFamily:'PoppinsRegular', display: 'block' }}>
                    Urutkan A-Z
                </Button>
                <Button ref={za} data-cy="button-sort-za" onClick={() => sort_by('z-a', receipes)} className='sortby-btn' variant={'contained'} sx={{ my: 1, mr:2, pt:1, pb:1, textTransform:'capitalize', fontFamily:'PoppinsRegular', display: 'block' }}>
                    Urutkan Z-A
                </Button>
                <Button ref={like} data-cy="button-sort-favorite" onClick={() => sort_by('like', receipes)} className='sortby-btn' variant={'contained'} sx={{ my: 1, mr:2, pt:1, pb:1, textTransform:'capitalize', fontFamily:'PoppinsRegular', display: 'block' }}>
                    Urutkan Dari Paling Disukai
                </Button>
            </Container>
        </Box>



        
        <Box sx={{ flexGrow: 1, backgroundColor:'#f9f9f9', pb:2, pt:2 }}>
            <Container>
                {/* <MainComponent category={selectedCategory} cari={handleCari}/> */}
                <Routes>
                    <Route path="/" element={<MainComponent receipes={tempreceipes} mount={mount} category={selectedCategory} field={selectedSort}/>} />
                    <Route path="cari/:params" element={<CariPage/>} />
                    <Route path="step/:params" element={<StepPage/>} />
                </Routes>
            </Container>
        </Box>
    </>
  );
}
