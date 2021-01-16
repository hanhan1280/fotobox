import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography, Button, Slide, Menu, makeStyles, useScrollTrigger, MenuItem } from "@material-ui/core";
import CameraIcon from '@material-ui/icons/Camera';
import MenuIcon from '@material-ui/icons/Menu';
import { UserContext } from "../../contexts/UserContext";
import { logoutUser } from "../../actions/authUtils";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    right: {
        fontFamily: "monospace",
        marginRight: theme.spacing(3)
    },
    title: {
        flexGrow: 1,
    },
    buttonBar: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        },
    },
    buttonCollapse: {
        [theme.breakpoints.up("sm")]: {
            display: "none"
        },
        margin: "10px",
        boxShadow: "none"
    }
}));

const HideOnScroll = (props) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Header = props => {
    const { auth, dispatch } = useContext(UserContext);
    const [anchor, setAnchor] = useState(null);
    const history = useHistory();
    const classes = useStyles();
    const open = Boolean(anchor);


    const handleMenu = event => {
        setAnchor(event.currentTarget);
    };
    const handleClose = () => {
        setAnchor(null);
    };

    const onLogout = e => {
        e.preventDefault();
        if (auth.isAuthenticated) {
            logoutUser(dispatch);
            history.push('/');
        }
        else {
            history.push('/login');
        }
    };

    return (
        <HideOnScroll {...props}>
            <AppBar elevation={0} className="nav-wrapper white lighten-5">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        <Link
                            to="/"
                            className="grey-text text-darken-3"
                            style={{ fontFamily: "monospace" }}
                        ><CameraIcon />{" "}photobox
                        </Link>
                    </Typography>
                    <div className={classes.buttonCollapse}>
                        <IconButton onClick={handleMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchor}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={open}
                            onClose={handleClose}
                        > {auth.isAuthenticated ?
                            <>
                                <MenuItem>
                                    <Link
                                        to="/dashboard"
                                        className="grey-text text-darken-3"
                                    >dashboard
                                </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link
                                        to="/friends"
                                        className="grey-text text-darken-3"
                                    >friends
                                    </Link>
                                </MenuItem>
                            </>
                            : null
                            }
                            <MenuItem className="grey-text text-darken-3" onClick={onLogout} >
                                {auth.isAuthenticated ? 'logout' : 'login'}
                            </MenuItem>
                        </Menu>
                    </div>
                    {auth.isAuthenticated ?
                        <>
                            <Typography variant="h6" color="inherit" className={classes.right + " " + classes.buttonBar}>
                                <Link
                                    to="/dashboard"
                                    className="grey-text text-darken-3"
                                >dashboard
                                        </Link>
                            </Typography>
                            <Typography variant="h6" color="inherit" className={classes.right + " " + classes.buttonBar}>
                                <Link
                                    to="/friends"
                                    className="grey-text text-darken-3"
                                >friends
                                </Link>
                            </Typography>
                        </>
                        : null
                    }
                    <Button variant="outlined" className={"grey-text text-darken-3 " + classes.buttonBar} style={{ border: "#424242 solid 2px", }} size="large" onClick={onLogout} >
                        {auth.isAuthenticated ? 'logout' : 'login'}
                    </Button>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )
}

export default Header;