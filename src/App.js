import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Avatar from "@material-ui/core/Avatar";
import { connect, Provider } from "react-redux";
// Icon
import { ReactComponent as ProcurementIcon } from "./assets/icon/procurementIcon.svg";
import { ReactComponent as ProcurementIconBLue } from "./assets/icon/procurementIconBlue.svg";
import { ReactComponent as HRISIcon } from "./assets/icon/hrisIcon.svg";
import { ReactComponent as CostBudgetIcon } from "./assets/icon/costBudgetIcon.svg";
import { ReactComponent as FinanceIcon } from "./assets/icon/financeIcon.svg";
import { ReactComponent as ProgrammingIcon } from "./assets/icon/programmingIcon.svg";
import Close from "@material-ui/icons/Close";
import Backdrop from "@material-ui/core/Backdrop";
import Settings from "@material-ui/icons/Settings";
import UserAvatar from "./assets/images/avatar.jpg";

import { Collapse } from "@material-ui/core";

import {
  Switch,
  Route,
  BrowserRouter as Router,
  Link,
  Redirect,
} from "react-router-dom";

import CircularProgress from '@material-ui/core/CircularProgress';

//Page
import StoreRequisition from "./pages/Procurement/Purchasing/Transaksi/Store Requisition/";
import PurchaseRequisition from "./pages/Procurement/Purchasing/Transaksi/Purchase Requisition/";
import CanvasSheet from "./pages/Procurement/Purchasing/Transaksi/Canvas Sheet/";
import PurchaseOrder from "./pages/Procurement/Purchasing/Transaksi/Purchase Order/";
import PerubahanLokasiPembelian from "./pages/Procurement/Purchasing/Transaksi/Perubahan Lokasi Pembelian/";

import LoginPage from "./pages/Login/index";

//services
import {
  CompanyList,
  GetClientKey,
  Login,
  GetMenu,
} from "./services/auth-services";
import ActionType from "./redux/actions";
import Navbar from "./Navbar";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  menuIconStyle: {
    width: 24,
    height: 24,
  },
  activeIcon: {
    width: 24,
    height: 24,
  },
}));

function App(props) {
  const classes = useStyles();
  const [settingsAnchorEl, setSettingsAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [subMenu1, setSubMenu1] = React.useState(false);
  const [subMenu2, setSubMenu2] = React.useState(false);
  const [subMenu3, setSubMenu3] = React.useState("");

  const [activeTab, setActiveTab] = React.useState(0);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [deleteTab, setDeleteTab] = React.useState(0);

  const [auth, setAuth] = React.useState(null);

  const settingMenuOpen = Boolean(settingsAnchorEl);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [message, setMessage] = React.useState(null);

  const [companyList, setCompanyList] = React.useState([]);

  const handleSettingsMenuOpen = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setSettingsAnchorEl(null);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const settingsMenu = (
    <Menu
      anchorEl={settingsAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={settingMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      {companyList.map((row) => {
        return (
          <MenuItem
            style={{ fontSize: 10 }}
            onClick={() => getMenu(row.Company_ID)}
          >{`${row.CompanyName} (${row.Company_ID})`}</MenuItem>
        );
      })}
    </Menu>
  );
  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={() => logOut()}>Sign Out</MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={() => logOut()}>Sign Out</MenuItem>
    </Menu>
  );

  const [listMenu, setListMenu] = React.useState([]);
  // const listMenu = [
  //   {
  //     name: "Procurement",
  //     icon: <ProcurementIconBLue className={classes.menuIconStyle} />,
  //     activeIcon: (
  //       <ProcurementIconBLue className={classes.activeIcon} id="activeIcon" />
  //     ),
  //     listSubmenu1: ["Purchasing", "Transaksi"],
  //     listSubmenu2: [
  //       {
  //         name: "Store Requisition (SR)",
  //         link: "StoreRequisition",
  //         id: 1,
  //       },
  //       {
  //         name: "Purchase Requistion (PR)",
  //         link: "PurchaseRequisition",
  //         id: 2,
  //       },
  //       {
  //         name: "Canvas Sheet",
  //         link: "CanvasSheet",
  //         id: 3,
  //       },
  //       {
  //         name: "Purchase Order (PO)",
  //         link: "PurchaseOrder",
  //         id: 4,
  //       },
  //       {
  //         name: "Perubahan Lokasi Pembelian",
  //         link: "PerubahanLokasiPembelian",
  //         id: 5,
  //       },
  //     ],
  //   },
  //   {
  //     name: "HRIS",
  //     icon: <HRISIcon className={classes.menuIconStyle} />,
  //     activeIcon: <HRISIcon className={classes.activeIcon} id="activeIcon" />,
  //     listSubmenu1: ["Purchasing", "Transaksi"],
  //     listSubmenu2: [
  //       {
  //         name: "Store Requisition (SR)",
  //         link: "StoreRequisition",
  //         id: 1,
  //       },
  //       {
  //         name: "Purchase Requistion (PR)",
  //         link: "PurchaseRequisition",
  //         id: 2,
  //       },
  //       {
  //         name: "Canvas Sheet",
  //         link: "CanvasSheet",
  //         id: 3,
  //       },
  //       {
  //         name: "Purchase Order (PO)",
  //         link: "PurchaseOrder",
  //         id: 4,
  //       },
  //       {
  //         name: "Perubahan Lokasi Pembelian",
  //         link: "PerubahanLokasiPembelian",
  //         id: 5,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Cost Budget",
  //     icon: <CostBudgetIcon className={classes.menuIconStyle} />,
  //     activeIcon: (
  //       <CostBudgetIcon className={classes.activeIcon} id="activeIcon" />
  //     ),
  //     listSubmenu1: ["Purchasing", "Transaksi"],
  //     listSubmenu2: [
  //       {
  //         name: "Store Requisition (SR)",
  //         link: "StoreRequisition",
  //         id: 1,
  //       },
  //       {
  //         name: "Purchase Requistion (PR)",
  //         link: "PurchaseRequisition",
  //         id: 2,
  //       },
  //       {
  //         name: "Canvas Sheet",
  //         link: "CanvasSheet",
  //         id: 3,
  //       },
  //       {
  //         name: "Purchase Order (PO)",
  //         link: "PurchaseOrder",
  //         id: 4,
  //       },
  //       {
  //         name: "Perubahan Lokasi Pembelian",
  //         link: "PerubahanLokasiPembelian",
  //         id: 5,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Finance",
  //     icon: <FinanceIcon className={classes.menuIconStyle} />,
  //     activeIcon: (
  //       <FinanceIcon className={classes.activeIcon} id="activeIcon" />
  //     ),
  //     listSubmenu1: ["Purchasing", "Transaksi"],
  //     listSubmenu2: [
  //       {
  //         name: "Store Requisition (SR)",
  //         link: "StoreRequisition",
  //         id: 1,
  //       },
  //       {
  //         name: "Purchase Requistion (PR)",
  //         link: "PurchaseRequisition",
  //         id: 2,
  //       },
  //       {
  //         name: "Canvas Sheet",
  //         link: "CanvasSheet",
  //         id: 3,
  //       },
  //       {
  //         name: "Purchase Order (PO)",
  //         link: "PurchaseOrder",
  //         id: 4,
  //       },
  //       {
  //         name: "Perubahan Lokasi Pembelian",
  //         link: "PerubahanLokasiPembelian",
  //         id: 5,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Programming",
  //     icon: <ProgrammingIcon className={classes.menuIconStyle} />,
  //     activeIcon: (
  //       <ProgrammingIcon className={classes.activeIcon} id="activeIcon" />
  //     ),
  //     listSubmenu1: ["Purchasing", "Transaksi"],
  //     listSubmenu2: [
  //       {
  //         name: "Store Requisition (SR)",
  //         link: "StoreRequisition",
  //         id: 1,
  //       },
  //       {
  //         name: "Purchase Requistion (PR)",
  //         link: "PurchaseRequisition",
  //         id: 2,
  //       },
  //       {
  //         name: "Canvas Sheet",
  //         link: "CanvasSheet",
  //         id: 3,
  //       },
  //       {
  //         name: "Purchase Order (PO)",
  //         link: "PurchaseOrder",
  //         id: 4,
  //       },
  //       {
  //         name: "Perubahan Lokasi Pembelian",
  //         link: "PerubahanLokasiPembelian",
  //         id: 5,
  //       },
  //     ],
  //   },
  // ];

  const [menusTab, setMenusTab] = React.useState([]);
  const openSubmenu1 = (name) => {
    if (subMenu1 != name) {
      setSubMenu1(name);
    } else {
      setSubMenu1(false);
    }
  };
  const openSubmenu2 = (name) => {
    if (subMenu2 != name) {
      setSubMenu2(name);
    } else {
      setSubMenu2(false);
    }
  };

  const openSubmenu3 = (name, id) => {
    if (subMenu3 !== name) {
      setSubMenu3(name);
      setSelectedTab(name);
      let a = cek(name);
      if (a != true) {
        setMenusTab([...menusTab, { name, id }]);
        if (menusTab.length == 0) {
          setActiveTab(0);
        } else {
          setActiveTab(menusTab.length);
        }
      } else {
        let newActv = getIdxOf(name);
        setActiveTab(newActv);
      }
    } else {
      setSubMenu3(name);
    }
  };

  const cek = (name) => {
    var found = false;
    for (var i = 0; i < menusTab.length; i++) {
      if (menusTab[i].name == name) {
        found = true;
        break;
      }
    }
    return found;
  };

  const getIdxOf = (name) => {
    var found = null;
    for (var i = 0; i < menusTab.length; i++) {
      if (menusTab[i].name == name) {
        found = i;
        break;
      }
    }
    return found;
  };
  const closeTab = (name) => {
    for (var i = menusTab.length - 1; i >= 0; --i) {
      if (menusTab[i].name == name) {
        menusTab.splice(i, 1);
      }
    }
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleClose = React.useCallback(
    (event, tabToDelete) => {
      event.stopPropagation();
      const idxOfDeleted = getIdxOf(tabToDelete.name);
      const currentTab = getIdxOf(activeTab);
      setDeleteTab(deleteTab + 1);
      if (activeTab > idxOfDeleted) {
        // const previousTab = getIdxOf(tabToDelete.name)
        closeTab(tabToDelete.name);
        setSelectedTab(menusTab[activeTab - 1].name);
        setActiveTab(activeTab - 1);
      } else if (idxOfDeleted == activeTab) {
        if (idxOfDeleted == 0) {
          closeTab(tabToDelete.name);
          if (menusTab.length > 0) {
            setActiveTab(idxOfDeleted);
            setSelectedTab(menusTab[idxOfDeleted].name);
          } else if (menusTab.length <= 0) {
            // closeTab(tabToDelete.name);
            setActiveTab(null);
            setSelectedTab(null);
          }
        }
        if (idxOfDeleted > 0) {
          closeTab(tabToDelete.name);
          setActiveTab(idxOfDeleted - 1);
          setSelectedTab(menusTab[idxOfDeleted - 1].name);
        }
      } else if (idxOfDeleted > activeTab) {
        // const previousTab = getPrev(tabToDelete.name, '-')
        closeTab(tabToDelete.name);
        setActiveTab(activeTab);
        setSelectedTab(menusTab[idxOfDeleted - 1].name);
      } else {
        // const previousTab = getPrev(tabToDelete.name, '-')
        closeTab(tabToDelete.name);
        setSelectedTab(menusTab[activeTab + 1].name);
        setActiveTab(activeTab + 1);
      }
    },
    [deleteTab, activeTab]
  );

  const renderSwitch = (key) => {
    switch (key) {
      case "Store Requisition (SR)":
        return <StoreRequisition menu={selectedTab} />;
      case "Purchase Requistion (PR)":
        return <PurchaseRequisition />;
      case "Canvas Sheet":
        return <CanvasSheet />;
      case "Purchase Order (PO)":
        return <PurchaseOrder />;
      case "Perubahan Lokasi Pembelian":
        return <PerubahanLokasiPembelian />;
      default:
        break;
    }
  };
  const getMenu = async (companyId) => {
    let body = {
      rqMenuList: {
        USER_ID: props.Auth.USER_ID,
        SESSION_LOGIN_ID: props.Auth.SESSION_LOGIN_ID,
        COMPANY_ID: companyId,
        APP_ID: "",
      },
    };
    handleMenuClose();
    props.setLoading(true);
    const fetchListMenu = await GetMenu(body);
    setListMenu(fetchListMenu.data.rsMenuList.DATA_APPLICATION);
    // console.log('result', fetchListMenu)
    props.setLoading(false);
  };
  const getCompanyList = async (username, session) => {
    const body = {
      rqCompanyList: {
        USER_ID: username,
        SESSION_LOGIN_ID: session,
      },
    };
    const fetch = await CompanyList(body);
    console.log(fetch);
    let { RESULT_CODE } = fetch.data.rsCompanyList;
    if (RESULT_CODE == "01") {
      setCompanyList(fetch.data.rsCompanyList.DATA);
    }
  };
  const setLogin = async (username, password) => {
    const body = {
      rqlogin: {
        USER_ID: username,
        PASSWORD: password,
        IP: "121.131.1313",
      },
    };

    const userLogin = await Login(body);
    let { RESULT_CODE, MESSAGE } = userLogin.data.rsLogin;
    let SessionLogin =
      userLogin.data.rsLogin.SESSION_LOGIN_INFO[0].SESSION_LOGIN_ID;

    if (RESULT_CODE == "01") {
      setMessage(MESSAGE);
      getCompanyList(username, SessionLogin);
      localStorage.setItem("auth", SessionLogin);
      setAuth(SessionLogin);
      props.setUserId(username);
      props.setSessionLoginId(SessionLogin);
    } else {
      setAuth(null);
      setMessage(MESSAGE);
    }
    props.setLoading(false);
  };

  const logOut = () => {
    setAnchorEl(null);
    localStorage.removeItem("auth");
    setAuth(null);
    setMessage(null);
  };

  React.useLayoutEffect(() => {
    let login = localStorage.getItem("auth");
    let menu = localStorage.getItem("menu");
    setAuth(login);
    if (menu != null) {
      setMenusTab(JSON.parse(menu));
      setActiveTab(localStorage.getItem("activetab"));
      setSelectedTab(localStorage.getItem("selecttab"));
    }
  }, []);

  React.useEffect(() => {
    if (menusTab.length > 0) {
      localStorage.setItem("menu", JSON.stringify(menusTab));
      localStorage.setItem("activetab", activeTab);
      localStorage.setItem("selecttab", selectedTab);
    }
    const fetchData = async () => {
      const body = {
        rqClientGetKey: {
          CLIENT_ID: "ERP_001",
        },
      };
      const clientKey = await GetClientKey(body);
      // console.log(JSON.stringify(clientKey.data.CLIENT_KEY,null,4))
      props.setClientKey(clientKey.data.CLIENT_KEY);
    };
    fetchData();
  }, [menusTab, activeTab, selectedTab]);

  {
    {
      console.log(props.Auth);
    }
    return auth != null ? (
      <Router>
        <Backdrop
          style={{ color: "#fff", zIndex: 9999 }}
          open={props.Loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className={classes.grow}>
          <AppBar
            // position="static"
            position="fixed"
            color="white"
            style={{ boxShadow: "0px 2px 5px rgba(0,0,0,.2)" }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <span
                  style={{
                    backgroundColor: "#3F63F5",
                    height: 33,
                    width: 33,
                    borderRadius: 5,
                  }}
                />
              </IconButton>
              {/* <Typography
                className={classes.title}
                variant="h7"
                noWrap
                style={{ fontWeight: "bold" }}
              >
                PT. Jala Informatika
              </Typography> */}
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  style={{ borderRadius: 0 }}
                  onClick={handleSettingsMenuOpen}
                >
                  <Settings style={{ color: "#3F63F5" }} />
                </IconButton>

                <IconButton
                  edge="end"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  style={{ borderRadius: 5 }}
                >
                  <Avatar alt="user" src={UserAvatar} />
                  <span
                    style={{
                      fontSize: ".58em",
                      fontWeight: "bold",
                      padding: 5,
                    }}
                  >
                    Username
                  </span>
                  <ArrowDropDown />
                </IconButton>
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
          {profileMenu}
          {settingsMenu}
        </div>

        <AppBar
          position="static"
          style={{ display: "hidden", boxShadow: "0px 2px 5px rgba(0,0,0,.0)" }}
        >
          <Toolbar style={{ display: "hidden" }}></Toolbar>
        </AppBar>
        <div style={{ display: "flex", flexDirection: "row", height: "89vh" }}>
          {/* Navbar */}
          <div
            style={{
              padding: 20,
              width: "15%",
              minWidth: 250,
            }}
          >
            
            <div
              style={{
                backgroundColor: "white",
                padding: 5,
                borderRadius: 5,
                boxShadow: "0px 0px 5px rgba(0,0,0,.2)",
                maxHeight: "calc(100% + 10px)",
                minHeight: "calc(100% + 10px)",
                overflow: "auto",
              }}
            >
              <Navbar menu={listMenu} />
              {/* <List component="nav" wrap>
                {listMenu.map((menu) => {
                  return (
                    <>
                      <ListItem button onClick={() => openSubmenu1(menu.name)}>
                        <ListItemIcon>
                          {subMenu1 === menu.name ? menu.activeIcon : menu.icon}
                        </ListItemIcon>

                        {subMenu1 === menu.name ? (
                          <>
                            <span
                              style={{
                                fontSize: ".9em",
                                fontWeight: "bold",
                                color: "#3F63F5",
                              }}
                            >
                              {menu.name}
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                backgroundColor: "#3F63F5",
                                width: 5,
                                borderRadius: 5,
                                top: 5,
                                bottom: 5,
                                right: 5,
                                transition: "all 1s slide",
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <span
                              style={{
                                fontSize: ".9em",
                              }}
                            >
                              {menu.name}
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                right: 5,
                              }}
                            />
                          </>
                        )}
                      </ListItem>
                      <Collapse in={true} timeout="auto" unmountOnExit>
                        <List>
                          {menu.listSubmenu1.map((listsubmenu1) => {
                            if (subMenu1 === menu.name) {
                              return (
                                <>
                                  <ListItem
                                    button
                                    className={classes.nested}
                                    style={{ paddingLeft: 50 }}
                                    onClick={() => openSubmenu2(listsubmenu1)}
                                  >
                                    <ListItemIcon style={{ minWidth: 10 }}>
                                      {subMenu2 === listsubmenu1 ? (
                                        <ArrowDropDown />
                                      ) : (
                                        <ArrowRight />
                                      )}
                                    </ListItemIcon>
                                    <span
                                      style={{
                                        fontSize: ".85em",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {listsubmenu1}
                                    </span>
                                  </ListItem>
                                  <Collapse
                                    in={true}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <List>
                                      {menu.listSubmenu2.map(
                                        (listSubmenu2, index) => {
                                          if (subMenu2 === listsubmenu1) {
                                            return (
                                              <Link
                                                to={`/${subMenu1}/${subMenu2}/${listSubmenu2.link}`}
                                                style={{
                                                  textDecoration: "none",
                                                  color: "#636363",
                                                }}
                                              >
                                                <ListItem
                                                  button
                                                  className={classes.nested}
                                                  style={{ paddingLeft: 65 }}
                                                  onClick={() =>
                                                    openSubmenu3(
                                                      listSubmenu2.name,
                                                      index
                                                    )
                                                  }
                                                >
                                                  <ListItemIcon
                                                    style={{ minWidth: 10 }}
                                                  ></ListItemIcon>
                                                  {subMenu3 ===
                                                  listSubmenu2.name ? (
                                                    <span
                                                      style={{
                                                        fontSize: ".8em",
                                                        fontWeight: "bold",
                                                        borderBottomWidth:
                                                          "2px",
                                                        borderBlockColor:
                                                          "#3F63F5",
                                                        borderBottomStyle:
                                                          "solid",
                                                        width: "100%",
                                                        color: "#3F63F5",
                                                      }}
                                                    >
                                                      {listSubmenu2.name}
                                                    </span>
                                                  ) : (
                                                    <span
                                                      style={{
                                                        fontSize: ".8em",
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      {listSubmenu2.name}
                                                    </span>
                                                  )}
                                                </ListItem>
                                              </Link>
                                            );
                                          }
                                        }
                                      )}
                                    </List>
                                  </Collapse>
                                </>
                              );
                            }
                          })}
                        </List>
                      </Collapse>
                    </>
                  );
                })}
              </List> */}
            </div>
          </div>

          {/* Content */}
          {menusTab.length > 0 ? (
            <div
              style={{
                marginTop: 20,
                marginRight: 20,
                width: "85%",
                maxWidth: "calc(100% - 310px)",
                height: "calc(100% - 20px)",
                boxShadow: "0px 0px 5px rgba(0,0,0,.2)",
                backgroundColor: "#bfc7e0",
                borderRadius: 5,
              }}
            >
              <div>
                {menusTab.length > 0 ? (
                  <Tabs
                    value={activeTab} //Default Value
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: {
                        height: 4,
                        backgroundColor: "white",
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                      },
                    }}
                    style={{
                      height: 30,
                      minHeight: 30,
                    }}
                  >
                    {menusTab.map((menus) => {
                      return (
                        <Tab
                          onClick={() => {
                            setSelectedTab(menus.name);
                            setSubMenu3(menus.name);
                          }}
                          style={{
                            backgroundColor: "#0032ff",
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            color: "white",
                            height: 30,
                            minHeight: 30,
                            border: ".1px solid rgba(0,0,0,.5)",
                            // boxShadow: menus.name == subMenu3 ? '0px 0px 5px black' : '0px 0px 0px black'
                          }}
                          label={
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <span
                                style={{
                                  width: "150%",
                                  paddingRight: 20,
                                  fontSize: ".8em",
                                }}
                              >
                                {menus.name}
                              </span>
                              <Close
                                onClick={(event) => handleClose(event, menus)}
                                style={{
                                  // position: "absolute",
                                  borderRadius: 5,
                                  // top: 0,
                                  // right: 0,
                                  height: 15,
                                  width: 15,
                                  backgroundColor: "#0032ff",
                                }}
                              />
                            </div>
                          }
                        />
                      );
                    })}
                  </Tabs>
                ) : null}
              </div>
              {renderSwitch(selectedTab)}
            </div>
          ) : null}
        </div>
      </Router>
    ) : (
      <>
        {console.log("render")}
        <LoginPage
          setLogin={setLogin}
          message={message}
          setMessage={setMessage}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    Loading: state.Loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (loading) => dispatch({ type: ActionType.LOADING, loading }),
    setClientKey: (clientKey) =>
      dispatch({ type: ActionType.SET_CLIENT_KEY, clientKey }),
    setUserId: (userId) => dispatch({ type: ActionType.SET_USER_ID, userId }),
    setSessionLoginId: (sessionLoginId) =>
      dispatch({ type: ActionType.SET_SESSION_LOGIN_ID, sessionLoginId }),
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps);

export default connected(App);
