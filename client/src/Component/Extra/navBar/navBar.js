import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HistoryIcon from "@mui/icons-material/History";
import CartIcon from "@mui/icons-material/ShoppingCartCheckout";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { singleUser } from "../../redux/actions/Auth";
import decode from "jwt-decode";
import { LOGOUT } from "../../redux/constants/actionTypes";
import { Divider } from "@mui/material";

const pages = ["home", "food", "room", "contact"];
const ResponsiveAppBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [aUser, setaUser] = React.useState();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const { AsingleUser } = useSelector(state => state.Auth);
  const [navbarColor, setNavbarColor] = React.useState(false);
  const logout = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
    navigate("/auth");
  };
  React.useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      dispatch(singleUser(user?.result?._id));
      if (decodedToken.exp * 1000 < new Date().getTime()) setUser(null);
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  React.useEffect(() => {
    setaUser(AsingleUser);
  }, [AsingleUser, dispatch]);
  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const changeBackground = () => {
    window.scrollY >= 50 ? setNavbarColor(true) : setNavbarColor(false);
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <AppBar
      position="fixed"
      style={
        !navbarColor
          ? {
            backgroundColor: "rgb(0, 67, 77)",
            backgroundBlendMode: "darken",
            zIndex: "100",
          }
          : {
            backgroundColor: "rgb(0, 67, 77)",
            backdropFilter: "blur(100px)",
            backgroundBlendMode: "darken",
            borderRadius: "0% 0% 50% 50% / 0% 0% 7% 7%",
            zIndex: "100",
          }
      }
    >
      <Container
        maxWidth="xl"
        sx={{
          margin: "0",
          padding: "0",
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              textTransform: "uppercase",
              fontWeight: 600,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
              "@media (max-width: 600px)": {
                fontSize: "1rem",
              },
              "@media (max-width: 350px)": {
                fontSize: "0.8rem",
              },
              "&:hover": {
                color: "white",
              },
            }}
          >
            {user?.result?.role === 1 ? " Admin Dashboard" : "Rhinospot"}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                  backgroundColor: "rgba(0,0,0, 0.2)",
                },
              }}
            >
              {pages.map(page => (
                <NavLink
                  to={`${page}`}
                  key={page}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    style={{
                      color: "black",
                      fontWeight: 300,
                      fontSize: "1.1rem",
                      marginTop: "0.5rem",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                    }}
                  >
                    {page}
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            style={{
              paddingLeft: "12rem",
            }}
          >
            {pages.map(page => (
              <NavLink
                id={page === "contact" ? "contactUs" : ""}
                to={`${page}`}
                key={page}
                textalign="center"
                style={
                  user?.result?.role === 1
                    ? { display: "none" }
                    : {
                      marginRight: "4rem",
                      textDecoration: "none",
                    }
                }
              >
                <MenuItem
                  onClick={handleCloseNavMenu}
                  style={{
                    color: "white",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                  }}
                >
                  {page}
                </MenuItem>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Tooltip title="Open Profile">
                <IconButton id="openProfile" onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: "1rem" }}>
                  <Avatar
                    alt={`${user?.result?.name}`}
                    src={`${user?.result?.selectedFile}`}
                    style={{
                      backgroundColor: "#00434d",
                    }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Login">
                <NavLink
                  to="/auth"
                  style={{
                    textDecoration: "none",
                    color: "White",
                  }}
                >
                  <MenuItem
                    key={"auth"}
                    onClick={handleCloseUserMenu}
                    sx={{
                      fontWeight: 600,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      backgroundColor: "transparent",
                      borderRadius: "5%",
                      border: "1px solid white",
                      marginRight: "3rem",
                      padding: "0.4rem 1.4rem",
                      "@media (max-width: 600px)": {
                        fontSize: "0.9rem",
                        marginRight: "2rem",
                        minHeight: "auto",
                        padding: "0.4rem 1.2rem",
                      },
                      "@media (max-width: 400px)": {
                        fontSize: "0.8rem",
                        marginRight: "1rem",
                        padding: "0.4rem 1rem",
                      },
                      "@media (max-width: 350px)": {
                        fontSize: "0.8rem",
                        marginRight: "0.2rem",
                        padding: "0.3rem 0.8rem",
                      },
                    }}
                  >
                    Sign In
                  </MenuItem>
                </NavLink>
              </Tooltip>
            )}

            {user && (
              <Menu
                sx={{
                  mt: "46px",
                  '& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper': {
                    backgroundColor: '#00434d',
                    color: '#fff',
                    borderRadius: '15px',
                    padding: '0px 1px',
                    textTransform: 'capitalize',
                  },
                  position: 'absolute',
                  top: 2,
                  left: 15,
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <NavLink
                  to="profile"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    margin: "auto",
                  }}
                >
                  <Tooltip title="Profile">
                    <MenuItem
                      key={"profile"}
                      onClick={handleCloseUserMenu}
                      style={{
                        fontWeight: 300,
                        letterSpacing: "2px",
                        fontSize: "1.1rem",
                        marginLeft: "0.4rem",
                        textTransform: "capitalize",
                        margin: "auto",
                      }}
                    >
                      <PermIdentityIcon
                        style={{
                          textAlign: "center",
                          margin: "auto",
                          color: "white",
                        }}
                      />
                    </MenuItem>
                  </Tooltip>
                </NavLink>
                <Divider style={{
                  backgroundColor: '#fff',
                  padding: '0px',
                  margin: '0px auto',
                  width: '90%',
                }} />
                <NavLink
                  to="cart"
                  id='cartPage'
                  style={{
                    textDecoration: "none",
                    color: "black",
                    margin: "auto",
                  }}
                >
                  <Tooltip title="cart">
                    <MenuItem
                      key={"cart"}
                      onClick={handleCloseUserMenu}
                      style={{
                        fontWeight: 300,
                        letterSpacing: "2px",
                        fontSize: "1.1rem",
                        marginLeft: "0.4rem",
                        textTransform: "capitalize",
                        margin: "auto",
                      }}
                    >
                      <CartIcon
                        style={{
                          textAlign: "center",
                          margin: "auto",
                          color: "white",
                        }}
                      />
                    </MenuItem>
                  </Tooltip>
                </NavLink>
                <Divider style={{
                  backgroundColor: '#fff',
                  padding: '0px',
                  margin: '0px auto',
                  width: '90%',
                }} />

                <NavLink
                  to="history"
                  id="orderHistory"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    margin: "auto",
                  }}
                >
                  <Tooltip title="history">
                    <MenuItem
                      key={"history"}
                      onClick={handleCloseUserMenu}
                      style={{
                        fontWeight: 300,
                        letterSpacing: "2px",
                        fontSize: "1.1rem",
                        marginLeft: "0.4rem",
                        textTransform: "capitalize",
                        margin: "auto",
                      }}
                    >
                      <HistoryIcon
                        style={{
                          textAlign: "center",
                          margin: "auto",
                          color: "white",
                        }}
                      />
                    </MenuItem>
                  </Tooltip>
                </NavLink>
                <Divider style={{
                  backgroundColor: '#fff',
                  padding: '0px',
                  margin: '0px auto',
                  width: '90%',
                }} />
                <Button
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={logout}
                >
                  <Tooltip title="Logout">
                    <MenuItem
                      id="logout"
                      key={"Logout"}
                      onClick={handleCloseUserMenu}
                      style={{
                        fontWeight: 300,
                        letterSpacing: "2px",
                        textTransform: "capitalize",
                      }}
                    >
                      <LogoutIcon
                        style={{
                          textAlign: "center",
                          margin: "auto",
                          color: "white",
                        }}
                      />
                    </MenuItem>
                  </Tooltip>
                </Button>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
