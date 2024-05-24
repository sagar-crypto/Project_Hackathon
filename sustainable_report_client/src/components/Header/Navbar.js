import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fade, makeStyles } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';



import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';

import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';
//images 
import logo from 'assets/img/LOGO.png';
import Signin from './Navlinks';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: "10vw",
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'relative',
    color: "white",
    display: 'inline',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '23vw',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Token = localStorage.getItem('TokenKey');
let count = 0;
let cnt =0;
let account = "none";
export default function PrimarySearchAppBar(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { value } = props;
  const [search, setSearch] = useState(value);
  const [display, setDisplay] = useState("");
  const [name, setName] = useState("")
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    axios({
      method: 'get',
      url: "http://localhost:5000/cart/",
      headers: {
        'Authorization': 'Bearer ' + Token,
      }

    })
      .then(res => {
        console.log(res);
        if (res.data.status === 401) {
          count = 0;

          console.log(display);
        }
        else if (res.status === 404)
          count = 0; 
        else {
          count = res.data.count;
          account = "";
          setDisplay("none");
          axios({
            method: 'get',
            url: "http://localhost:5000/users/" + res.data.userId,
            headers: {
              'Authorization': 'Bearer ' + Token,
            }

          }).then(res => {
            console.log(res);

            setName(res.data.users.name);

          })
        }

      })

      axios({
        method: 'get',
        url: "http://localhost:5000/wishlist/",
        headers: {
          'Authorization': 'Bearer ' + Token,
        }
      }).then(res => {
        console.log(res);
        if (res.data.status === 401) {
          cnt = 0;
        }
        else if (res.status === 404)
          cnt = 0;
        else {
          cnt = res.data.count;
        }
      })
  }, [])


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

  const handleSignOut = () => {
    localStorage.removeItem('TokenKey');
    window.location.href = "/";

  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleSearch = (e) => {
    if(search){
    window.location.href = "/search/" + search;
    }
  }
  const HandleEnter = (e) => {

    if (e.keyCode === 13) {
      window.location.href = "/search/" + search;
    }
  }
  const handleLoginclick = (e) => {
    return(<Signin stat={true} />);
  }
  const handleSignupclick = (e) => {
    window.location.href = "/sign-up";
  }
  const HandleCart = (e) => {
    window.location.href = "/cart-page";
  }
  const HandleOrder = (e) => {
    window.location.href = "/order-page";
  }
  const HandleWishlist = (e) => {
    window.location.href = "/wishlist-page";
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ display: account }}
    >
      <MenuItem onClick={HandleOrder}>My Orders</MenuItem>
      <MenuItem onClick={HandleWishlist}>My Wishlist</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      style={{width:"600px"}}
    >
      <MenuItem>
        <div className={classes.search}>
          <InputBase
            value={search}
            placeholder="Search for products"
            onChange={e => { setSearch(e.target.value) }}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onKeyDown={(e) => HandleEnter(e)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </MenuItem>
      <MenuItem style={{ display: display }} onClick={handleSignupclick} >
        <IconButton aria-label="Sign-Up" color="inherit">
          <PersonAddIcon />
        </IconButton>
        <p>Sign-Up</p>
      </MenuItem>
      <MenuItem style={{ display: display }}>
        <IconButton aria-label="login" color="inherit">
          <LockOpenIcon />
        </IconButton>
        <Signin stat={props.stat}/>
      </MenuItem>
      { name ?
      (<MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle style={{ display: account }} />
          <p >{name}</p>
        </IconButton>
        <p style={{ display: display }} >Profile</p>
      </MenuItem>):null
      }
      <MenuItem onClick={HandleWishlist}>
        <IconButton aria-label="show wishlist" color="inherit">
          <Badge badgeContent={cnt} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Wishlist</p>
      </MenuItem>
      <MenuItem onClick={HandleCart}>
        <IconButton aria-label="show cart" color="inherit">
          <Badge badgeContent={count} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Shopping Cart</p>
      </MenuItem>

    </Menu>
  );
  //className={classes.grow}
  return (
    <div className={classes.grow} >
      <AppBar style={{ backgroundColor: "#2E3D7C" }} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            href="/"
          >
            {/* <MenuIcon/> */}
            <img style={{ height: "7vh", width: "auto" }} src={logo} />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap style={{fontFamily:'Arial, Helvetica, sans-serif', fontSize:"1.5em"}}>
            E-Commerce
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <div className={classes.search}>
              <InputBase
                value={search}
                placeholder="Search for products"
                onChange={e => { setSearch(e.target.value) }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <div className={classes.searchIcon}>
                <IconButton onClick={handleSearch}>
                  <SearchIcon style={{ color: "white" }} />
                </IconButton>
              </div>
            </div>
            { name ?
              (<Tooltip title={"Hi " + name}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{marginRight:"1px"}}
              >
                <AccountCircle style={{ display: account }} />
              </IconButton>
            </Tooltip>):(
            <Signin stat={props.stat}/>)}
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <Tooltip title="wishlist">
              <IconButton aria-label="show user's wishlist" color="inherit" onClick={HandleWishlist}>
                <Badge badgeContent={cnt} color="secondary">
                <FavoriteIcon/>
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="cart">
              <IconButton aria-label="show user's cart" color="inherit" onClick={HandleCart}>
                <Badge badgeContent={count} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>

  );
}
