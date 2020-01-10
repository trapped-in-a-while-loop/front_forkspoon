import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => ({
    header: {
        boxSizing: 'border-box'
    },
    customAppBarRoot: {
        width: 'auto',
        position: 'inherit'
    },
    link: {
        fontFamily: "McLaren, cursive",
        fontWeight: "150",
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    }, 
    flexer: {
        flexGrow: 2,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    space: {
        marginRight: theme.spacing(10),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    input: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

function Header() {
    const classes = useStyles();

    const [auth] = React.useState(true);
    //const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    /*
    const handleChange = event => {
        setAuth(event.target.checked);
    };
    */

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.header}>
            <CssBaseline />
            <AppBar style={{ background: '#f5ba13' }} classes={{ root: classes.customAppBarRoot }}>
                <Toolbar>
                    <Link to="/" className={classes.logoLink}>
                        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" width="55px" />
                    </Link>
                    <div className={classes.root}>
                        <Button color="primary" className={classes.link}>
                            <Link to="/myrecipes">My Recipes</Link>
                        </Button>
                        <Button color="primary" className={classes.link}>
                            <Link to="/myfavorites">My Favorites</Link>
                        </Button>
                        <Button color="primary" className={classes.link} >
                            <Link to="/fridge">Fridge</Link>
                        </Button>
                    </div>

                    <div className={classes.flexer} />

                    <div className={classes.space}>
                        {/* Search Field */}
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Quick Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.input,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                style={{ fontFamily: "McLaren , cursive"}}
                            />
                        </div>
                    </div>

                    {/* Profile logo  */}
                    <div className={classes.space}>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;