import React from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Lock from "@material-ui/icons/Lock";
import Person from "@material-ui/icons/Person";
import Copyright from "@material-ui/icons/Copyright";
import Phone from "@material-ui/icons/Phone";
import { connect } from "react-redux";

//image
import LoginBackground from "../../assets/images/background-login.png";
import Logo from "../../assets/images/logo.svg";
import ActionType from "../../redux/actions";

function Index(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [checked, setCheckbox] = React.useState(null);

  const handleLogin = () => {
    props.setLoading(true);
    if (username && password) {
      props.setMessage(null);
      if (checked) {
        localStorage.setItem(
          "loginForm",
          JSON.stringify({ checked, username, password })
        );
      } else {
        localStorage.removeItem("loginForm");
      }
      props.setLogin(username, password);
    } else {
      props.setLoading(false);
      props.setMessage("Username atau password tidak boleh kosong");
    }
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleLogin();
    }

  };
  React.useEffect(() => {
    const loginForm = localStorage.getItem("loginForm");
    if (loginForm != null) {
      const { checked: c, username: u, password: p } = JSON.parse(loginForm);
      setCheckbox(c);
      setUsername(u);
      setPassword(p);
    }
  }, []);
  return (
    <div
      className="login"
      style={{
        // backgroundColor: "#EEF1FA",
        height: "100vh",
        width: "100%",
        display: "flex",
        backgroundImage: `url(${LoginBackground})`,
        backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "500px",
        minWidth: "800px",
      }}
    >
      
      <div
        style={{
          width: "50%",
          //   backgroundColor: "red",
          height: "calc(100% - 200px)",
          margin: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        className="login-a"
      >
        <div>
          <IconButton
            style={{
              height: 120,
              width: 120,
              borderRadius: 50,
            }}
          >
            <img src={Logo} style={{ height: 150, width: 150 }} />
          </IconButton>
          <Typography
            variant="h3"
            style={{ color: "white", fontWeight: "bold" }}
          >
            We Provide
          </Typography>
          <span
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
              letterSpacing: 1.5,
            }}
          >
            The world leading company System
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            style={{ color: "white" }}
            control={<Copyright fontSize="small" />}
            label={
              <span style={{ fontSize: "13px", paddingLeft: 5 }}>
                PT Jala Informatica
              </span>
            }
          />
          <FormControlLabel
            style={{ color: "white" }}
            control={<Phone fontSize="small" />}
            label={
              <span style={{ fontSize: "13px", paddingLeft: 5 }}>
                081358087198
              </span>
            }
          />
        </div>
      </div>

      <div
        style={{
          width: "50%",
          height: "calc(100% - 200px)",
          margin: "100px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        className="login-b"
      >
        <form
          onSubmit={() => handleLogin()}
          style={{
            width: "350px",
            height: "430px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            padding: "10px 30px",
            alignItems: "center",
            borderRadius: 10,
            boxShadow: "0px 2px 5px rgba(0,0,0,.2)",
          }}
        >
          <div style={{ height: 40 }} />
          <div style={{ alignSelf: "flex-start" }}>
            <Typography
              variant="h5"
              style={{ color: "#2975D9", fontWeight: "bold" }}
            >
              Welcome
            </Typography>
            <Typography
              variant="h7"
              style={{ color: "grey", fontSize: "16px" }}
            >
              Enter your username and password
            </Typography>
          </div>
          <div style={{ height: 30 }} />
          <FormControl style={{ width: "100%" }}>
            <Input
              onKeyPress={(event) => handleEnter(event)}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              startAdornment={
                <InputAdornment position="start">
                  <IconButton disabled style={{ padding: 5, color: "#2975D9" }}>
                    <Person />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div style={{ height: 30 }} />
          <div style={{ width: "100%", flexDirection: "row" }}>
            <FormControl style={{ width: "100%" }}>
              <Input
                onKeyPress={(event) => handleEnter(event)}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      disabled
                      style={{ padding: 5, color: "#2975D9" }}
                    >
                      <Lock />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div style={{ height: 20 }} />
          <div style={{ alignSelf: "flex-start" }}>
            <FormControlLabel
              style={{ color: "grey" }}
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setCheckbox(event.target.checked)}
                  name="checkedB"
                  color="primary"
                  style={{ color: "#2975D9" }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>Remember Me</span>}
            />
          </div>

          <div style={{ height: 30 }} />
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#2975D9",
              borderRadius: 100,
            }}
            onClick={() => handleLogin()}
          >
            {props.Loading == true ? (
              <CircularProgress style={{ color: "white" }} size={25} />
            ) : (
              "Sign In"
            )}
          </Button>
          <div style={{ height: 15 }} />
          {props.message != null && (
            <span style={{ color: "red" }}>{props.message}</span>
          )}
        </form>
      </div>
    </div>
  );
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
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps);

export default connected(Index);
