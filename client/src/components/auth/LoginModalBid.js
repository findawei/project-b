import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login, register, resetPassword } from '../../flux/actions/authActions';
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Box, Typography, Paper, Chip, Grid, TextField} from '@material-ui/core'

const LoginModal = ({
  isAuthenticated,
  authMsg,
  login,
  register,
  resetPassword
}) => {

  let initialValues = {
    email: "",
    password: "",
    displayName: ""
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: 20,
  },
    papermodal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 0,
    },
  }))

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

  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange"
  });

  const [user, setUser] = useState();
  const [newUser, setNewUser] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [pwreset, SetReset] = useState(false);

  /**
   *
   * @param _fieldName
   */
  const showError = (_fieldName) => {
    let error = (errors)[_fieldName];
    return error ? (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {error.message || "Field Is Required"}
      </div>
    ) : null;
  };

  const handleOnSubmit = (user) => {
    // Attempt to login
    if (newUser) {
          // signup
          register(user);
        } else {
          if (pwreset) {
            // reset password
            resetPassword(user.email);
          } else {
            // signin
                login(user);

            ;
          }
        }
      }

const body = (   
  <div style={modalStyle} className={classes.papermodal}>   
    <form onSubmit={handleSubmit(handleOnSubmit)}>
          {/* <Button
          onClick={() => {
            setNewUser(!newUser);
            if (pwreset) SetReset(false);
          }}
        >
          {newUser ? "Sign in" : "Create an account"}
        </Button> */}
    <Box mb={1}>
          {!pwreset && (
          <div 
          value={newUser ? "signup" : "signin"}
          >
          <Button 
            value="signin"
            onClick={() => {
            setNewUser(!newUser);
            if (pwreset) SetReset(false);
          }}        
          >
            Sign in
          </Button>
          <Button 
            value="signup"
            onClick={() => {
            setNewUser(!newUser);
            if (pwreset) SetReset(false);
          }}
          > 
            Sign up
          </Button>
        </div>
        )}
        </Box>
        <Box  mb={1}>
        {pwreset && (
            <Button onClick={() => SetReset(false)} className="btn-link" fill="outline">
              Back
            </Button>
          )}
          </Box>
          <Box  mb={1}>
          <div>
              <Controller
                as={TextField}
                size="small"
                fullWidth
                variant="outlined" 
                type="email"
                placeholder="Email"
                control={control}
                onChange={([selected]) => {
                  return selected.detail.value;
                }}
                name="email"
                rules={{
                  required: true
                }}
              />
            </div>
            {showError("email")}
            </Box>
            {/* {authMsg && <p className="auth-message">{authMsg}</p>}
          {console.log(authMsg)} */}
          <Box  mb={1}>

          {!pwreset && (
            <div>
            <div>
              <Controller
                as={TextField}
                size="small"
                fullWidth
                variant="outlined" 
                type="password"
                placeholder="Password"
                control={control}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  return selected.detail.value;
                }}
                name="password"
                rules={{
                  required: true
                }}
              />
            </div>
            {showError("password")}
            </div>
            )}
            </Box>

            <Box  mb={1}>
            {!pwreset && newUser &&(
              <div>
              <div>
                <Controller
                  as={TextField}
                  size="small"
                  fullWidth
                  variant="outlined" 
                  type="displayName"
                  placeholder="Username"
                  control={control}
                  onChangeName="onIonChange"
                  onChange={([selected]) => {
                    return selected.detail.value;
                  }}
                  name="displayName"
                  rules={{
                    required: true
                  }}
                />
              </div>
              {showError("displayName")}
              </div>
              )}
              </Box>

            <Box mb={1}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
                {
            //     loading ? (
            //   <IonSpinner />
            // ) : 
            pwreset ? (
              "Reset password"
            ) : newUser ? (
              "Create account"
            ) : (
              "Sign in"
            )}
              </Button>
              {!newUser && !pwreset && (
            <div onClick={() => SetReset(true)}>
              Forgot password?
            </div>
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
    <Button 
      type="button" 
      onClick={handleOpen}
      variant="contained" 
      color="primary" 
      fullWidth
      size="large"
      >
        Place Bid
    </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
  </div>
)
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authMsg: state.authMsg
});

export default connect(mapStateToProps, { login, resetPassword, register })(LoginModal);