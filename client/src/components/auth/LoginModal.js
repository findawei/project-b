import React, { useState } from "react";
import { connect } from "react-redux";
import {
  login,
  registerUser,
  resetPassword,
  captchaSubmit,
} from "../../flux/actions/authActions";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  IconButton,
  Button,
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  TextField,
  Link,
} from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";
import Alert from "@material-ui/lab/Alert";
import logo from "../../images/logo.png";

const LoginModal = ({
  isAuthenticated,
  authMsg,
  auth,
  login,
  registerUser,
  resetPassword,
  captchaSubmit,
  passInButton,
}) => {
  let initialValues = {
    email: "",
    password: "",
    displayName: "",
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: 20,
    },
    papermodal: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 0,
    },
    logo: {
      maxWidth: 100,
    },
  }));

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, control, handleSubmit, formState, reset, errors } = useForm(
    {
      defaultValues: { ...initialValues },
      mode: "onChange",
    }
  );

  const [user, setUser] = useState();
  const [newUser, setNewUser] = useState(true);
  const [showToast1, setShowToast1] = useState(false);
  const [pwreset, SetReset] = useState(false);
  const [resetButton, setButton] = useState("Reset Password");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleOnSubmit = (user) => {
    // Attempt to login
    if (newUser) {
      // signup
      registerUser(user);
    } else {
      if (pwreset) {
        // reset password
        resetPassword(user.email);
        setButton("An email was sent");
        setButtonDisabled(true);
      } else {
        // signin
        login(user);
        if (auth.isAuthenticated) {
          setOpen(false);
        }
      }
    }
  };

  function onChange(value) {
    const key = { captcha: value };
    captchaSubmit(key);
  }

  const body = (
    <div style={modalStyle} className={classes.papermodal}>
      <Grid container direction="row" justify="center" alignItems="center">
        <img src={logo} alt="logo" className={classes.logo} />
      </Grid>
      <form id="login" onSubmit={handleSubmit(handleOnSubmit)}>
        {/* <Button
          onClick={() => {
            setNewUser(!newUser);
            if (pwreset) SetReset(false);
          }}
        >
          {newUser ? "Sign in" : "Create an account"}
        </Button> */}
        <Grid container direction="row" justify="center" alignItems="center">
          <Box mb={1}>
            {!pwreset && (
              <div value={newUser ? "signup" : "signin"}>
                <div hidden={newUser}>
                  New here?&nbsp;
                  <Link
                    value="signup"
                    onClick={() => {
                      setNewUser(!newUser);
                      if (pwreset) SetReset(false);
                    }}
                  >
                    Create an account
                  </Link>
                </div>
                <div hidden={!newUser}>
                  Already have an account?&nbsp;
                  <Link
                    value="signin"
                    onClick={() => {
                      setNewUser(!newUser);
                      if (pwreset) SetReset(false);
                    }}
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            )}
          </Box>
        </Grid>
        <Box mb={1}>
          {pwreset && (
            <Button
              onClick={() => SetReset(false)}
              className="btn-link"
              fill="outline"
            >
              Back
            </Button>
          )}
        </Box>
        <Box mb={1}>
          <TextField
            name="email"
            id="email"
            variant="outlined"
            size="small"
            placeholder="Email"
            fullWidth
            inputRef={register({
              required: "Email cannot be empty",
            })}
            InputProps={{ className: classes.textinput }}
            error={!!errors.email}
          />
          {errors.email && (
            <span
              style={{ color: "red", fontWeight: "bold" }}
              className={classes.error}
            >
              {errors.email.message}
            </span>
          )}
        </Box>
        {/* {authMsg && <p className="auth-message">{authMsg}</p>}
          {console.log(authMsg)} */}
        <Box mb={1}>
          {!pwreset && (
            <div>
              <TextField
                name="password"
                id="password"
                variant="outlined"
                size="small"
                placeholder="Password"
                fullWidth
                inputRef={register({
                  required: "Password cannot be empty",
                })}
                InputProps={{ className: classes.textinput }}
                error={!!errors.password}
              />
              {errors.password && (
                <span
                  style={{ color: "red", fontWeight: "bold" }}
                  className={classes.error}
                >
                  {errors.password.message}
                </span>
              )}
            </div>
          )}
        </Box>

        <Box mb={1}>
          {!pwreset && newUser && (
            <div>
              <TextField
                name="displayName"
                id="displayName"
                variant="outlined"
                size="small"
                placeholder="Username"
                fullWidth
                inputRef={register({
                  required: "Username cannot be empty",
                })}
                InputProps={{ className: classes.textinput }}
                error={!!errors.displayName}
              />
              {errors.displayName && (
                <span
                  style={{ color: "red", fontWeight: "bold" }}
                  className={classes.error}
                >
                  {errors.displayName.message}
                </span>
              )}
            </div>
          )}
        </Box>
        <Box mb={1}>
          {pwreset ? (
            ""
          ) : newUser ? (
            <ReCAPTCHA
              sitekey="6LfSlQ0bAAAAADhIQ3yfMYRZAmh2EDBJzywO1B48"
              onChange={onChange}
            />
          ) : (
            ""
          )}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={(newUser && auth.captcha !== "success") || buttonDisabled}
          >
            {
              //     loading ? (
              //   <IonSpinner />
              // ) :
              pwreset ? resetButton : newUser ? "Create account" : "Sign in"
            }
          </Button>
          {!newUser && !pwreset && (
            <div onClick={() => SetReset(true)}>Forgot password?</div>
          )}
          {auth.authMsg === "Invalid login credentials" ? (
            <Alert severity={"error"}>Invalid login credentials</Alert>
          ) : (
            ""
          )}
        </Box>
        {/* <p>
          {newUser ? "Already have an account?" : "Don't have an account yet?"}
        </p> */}
      </form>
    </div>
  );

  return (
    <div>
      <div onClick={handleOpen}>{passInButton}</div>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authMsg: state.authMsg,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
  resetPassword,
  registerUser,
  captchaSubmit,
})(LoginModal);
