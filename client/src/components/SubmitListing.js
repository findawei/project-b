import React, { useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Typography,InputLabel, Box, NativeSelect, Select, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent } from '@material-ui/core/'
import { Link } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns"
import { DatePicker,   MuiPickersUtilsProvider } from "@material-ui/pickers";
import Dropzone from './Dropzone'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import "./styles.css";
import {submitItem} from './../flux/actions/itemActions'
import UppyComp from './UppyComp';
import FileUpload from './FileUpload';

const SubmitListing = ({ item, auth, submitItem}) => {

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        // textAlign: 'center',
        // color: theme.palette.warning.light,
        background: 'rgba(0, 0, 0, 0.04)',
        // height: 42
      },
    input: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        // color: theme.palette.warning.light,
        // background: 'rgba(0, 0, 0, 0.04)',
        // height: 42
      },
    radio: {
        paddingBottom: theme.spacing(2)
    },
    
}));

const classes = useStyles();

const [open, setOpen] = useState(false);
const [info, setInfo] = useState('');
const [forsale, setForSale] = useState('no');
const [reserve, setReserve] = useState('no');
const [year, setYear] = useState(null);
const [phone, setPhone] = useState(null);
const [service, setService] = useState(null)
const [newItem, setNewItem] = useState('')

const handleChange = (event) => {
    setInfo(event.target.value);
  };

const handleChange2 = (event) => {
    setForSale(event.target.value);
  };

const handleChange3 = (event) => {
    setReserve(event.target.value);
  };

const handleClose = () => {
    setOpen(false);
  };

const { register, control, handleSubmit, errors } = useForm();

const listingSubmit = (newItem) => {
    setNewItem(newItem)
    submitItem(newItem)
    setOpen(true)
}

return (
    <Grid container
    direction="column"
    justify="center"
    alignItems="center"> 
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <Typography align="center" className={classes.input}>
          <CheckCircleIcon style={{ color: green[500], fontSize: 50 }}/>      
        </Typography>
      <DialogTitle id="alert-dialog-title" align="center">{"Your submission has been sent!"}</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We've sent you an email with a summary of your submission. We should get back to you within 1 business day.
          </DialogContentText>
        </DialogContent>
      <DialogActions> 
        <Grid container justify="flex-end">
          <Grid item xs={4} sm={4}>
            <Link 
              // className={classes.link}
              style={{ textDecoration: 'none' }}
              to={'/'}
              >
              <Button fullWidth color="primary">
              Ok
              </Button>
            </Link>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
    <Grid item xs={12} md={10} lg={8}>
    <div className={classes.root}>
    <form onSubmit={handleSubmit(listingSubmit)}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Typography variant="h4" className={classes.radio}>Tell us about your watch</Typography>
    <Typography className={classes.radio}>Give us the following info and we’ll quickly review your watch to decide if it’s a fit for No Wait List. If your watch is accepted, we’ll ask for more details and photos, and work with you to get the auction live.</Typography>
    <Paper className={classes.paper} elevation={0} color="primary">
        <h1>Your Info</h1>
        <Typography>Dealer or private party?</Typography>
        <FormControl component="fieldset" className={classes.radio}>
            <FormLabel component="legend"></FormLabel>
            <RadioGroup row aria-label="gender" name="gender1" value={info} onChange={handleChange}>
                <FormControlLabel value="dealer" control={<Radio color="primary"/>} label="Dealer" />
                <FormControlLabel value="private" control={<Radio color="primary"/>} label="Private party" />
            </RadioGroup>
        </FormControl>
        <Grid container spacing={3}>
            {info === 'dealer'?
            <>
            <Grid item xs={12} sm={8}>
            <Typography>Are there any additional fees the buyer will have to pay?</Typography>
            <Paper elevation={0}>
                    <TextField
                    name="fees" 
                    id="fees" 
                    variant="outlined" 
                    size="small"
                    fullWidth
                    inputRef={register({
                        min: {
                        value: 7,
                        message: 'Cannot enter an empty field'
                        },
                        required: 'Field cannot be empty 🤷🏻‍♂️'
                    })}
                    InputProps={
                    {className: classes.textinput}
                    }
                    error={!!errors.fees}
                    />
            </Paper>
                {errors.fees && (
                    <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.fees.message}</span>
                    )}
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography>Dealership name</Typography>
            <Paper elevation={0}>
                <TextField
                  name="dealership" 
                  id="dealership" 
                  variant="outlined" 
                  size="small"

                //   placeholder="Add a Comment..."
                  fullWidth
                  inputRef={register({
                    min: {
                      value: 1,
                      message: 'Cannot enter an empty name'
                    },
                    required: 'Name cannot be empty 🤷🏻‍♂️'
                  })}
                  InputProps={
                  {className: classes.textinput}
                  }
                error={!!errors.dealership}
                />
          </Paper>
          {errors.dealership && (
            <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.dealership.message}</span>
            )}
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography>Dealership website</Typography>
            <Paper elevation={0}>
                <TextField
                  name="dealerwebsite" 
                  id="dealerwebsite" 
                  variant="outlined" 
                  size="small"

                //   placeholder="Add a Comment..."
                  fullWidth
                  inputRef={register({
                    min: {
                      value: 1,
                      message: 'Cannot enter an empty website'
                    },
                    required: 'Website cannot be empty 🤷🏻‍♂️'
                  })}
                  InputProps={
                  {className: classes.textinput}
                  }
                error={!!errors.dealerwebsite}
                />
          </Paper>
          {errors.dealerwebsite && (
            <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.dealerwebsite.message}</span>
            )}
        </Grid>
        </>
        :
        <></>
        }   
            <Grid item xs={12} sm={6}>
            <Typography>Your name</Typography>
            <Paper elevation={0}>
                <TextField
                  name="name" 
                  id="name" 
                  variant="outlined" 
                  size="small"

                //   placeholder="Add a Comment..."
                  fullWidth
                  inputRef={register({
                    min: {
                      value: 1,
                      message: 'Cannot enter an empty name'
                    },
                    required: 'Name cannot be empty 🤷🏻‍♂️'
                  })}
                  InputProps={
                  {className: classes.textinput}
                  }
                error={!!errors.name}
                />
          </Paper>
          {errors.name && (
            <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.name.message}</span>
            )}
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography>Contact phone number</Typography>
            <Controller 
              control={control}
              as={PhoneInput}
              name="phone"
              id="phone"
              country={'us'}
              defaultValue={''}
              rules={{
                minLength: {
                  value: 11,
                  message: "You're missing some digits"
                },
                required: 'Phone number cannot be empty 🤷🏻‍♂️'
              }}
            /> 
            {errors.phone && (
                <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.phone.message}</span>
                )}
        </Grid> 
        </Grid>
        </Paper>
        <Paper className={classes.paper} elevation={0} color="primary">

        <h1>Watch Details</h1>
        <Typography>Is this watch for sale elsewhere?</Typography>
        <FormControl component="fieldset" className={classes.radio}>
            {/* <FormLabel component="legend"></FormLabel> */}
            <RadioGroup row aria-label="forsale" name="forsale" value={forsale} onChange={handleChange2}>
                <FormControlLabel value="yes" control={<Radio color="primary"/>} label="Yes" />
                <FormControlLabel value="no" control={<Radio color="primary"/>} label="No" />
            </RadioGroup>
        </FormControl>
        <Grid container spacing={3}>
        {forsale === 'yes'?
            <>
            <Typography color="secondary" className={classes.input}>If we accept your watch, all other listings will need to be taken down before it can be listed on our site.</Typography>
            <Grid item xs={12}>
            <Typography>Please link to all existing listings</Typography>
            <Paper elevation={0}>
                <TextField
                    name="link" 
                    id="link" 
                    variant="outlined"
                    size="small"
 
                    //   placeholder="Add a Comment..."
                    fullWidth
                    inputRef={register({
                        // min: {
                        // value: 7,
                        // message: 'Cannot enter an empty link'
                        // },
                        required: 'Link cannot be empty 🤷🏻‍♂️'
                    })}
                    InputProps={
                    {className: classes.textinput}
                    }
                    error={!!errors.link}
                    />
            </Paper>
                {errors.link && (
                    <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.link.message}</span>
                    )}
            </Grid>
        </>
        :
        <></>
        }
        <Grid item xs={12} sm={6}>
            {/* <FormControl variant="outlined" className={classes.formControl}> */}
            <Typography>Production Year</Typography> 
                  <DatePicker
                    name="year"
                    id="year"
                    inputVariant="outlined"
                    size="small"
                    views={["year"]}
                    // label="Service"
                    value={year}
                    fullWidth
                    onChange={setYear}
                    minDate={new Date("1940")}
                    disableFuture
                    inputRef={register({
                      // min: {
                      //   value: 7,
                      //   message: 'Cannot enter an empty phone number'
                      // },
                      required: 'Year cannot be empty 🤷🏻‍♂️'
                    })}
                    InputProps={
                    {className: classes.textinput}
                    }
                  error={!!errors.year}
                  />
                  <br/>
                  {errors.year && (
                <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.year.message}</span>
                )}
            {/* </FormControl> */}
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography>Last Service Date</Typography>
                <DatePicker
                    name="service"
                    id="service"
                    inputVariant="outlined"
                    size="small"
                    views={["year","month"]}
                    fullWidth
                    // label="Service"
                    value={service}
                    onChange={setService}
                    minDate={year}
                    disableFuture
                    inputRef={register({
                      // max: {
                      //   value: "year",
                      //   message: 'Service date cannot be before production year.'
                      // },
                      // required: 'Service number cannot be empty 🤷🏻‍♂️'
                    })}
                    InputProps={
                    {className: classes.textinput}
                    }
                  error={!!errors.service}
                  />
                  <br/>
                  {errors.service && (
                <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.service.message}</span>
                )}
        </Grid>   
        <Grid item xs={12} sm={6}>
        <Typography>Brand</Typography> 
          <Paper elevation={0}>
                <TextField
                  name="brand" 
                  id="brand" 
                  variant="outlined"
                  size="small"
 
                //   placeholder="Add a Comment..."
                  fullWidth
                  inputRef={register({
                    // min: {
                    //   value: 7,
                    //   message: 'Cannot enter an empty phone number'
                    // },
                    required: 'Brand cannot be empty 🤷🏻‍♂️'
                  })}
                  InputProps={
                  {className: classes.textinput}
                  }
                error={!!errors.brand}
                />
          </Paper>
            {errors.brand && (
                <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.brand.message}</span>
                )}
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography>Model</Typography>
          <Paper elevation={0}>
                <TextField
                  name="model" 
                  id="model" 
                  variant="outlined" 
                  size="small"

                //   placeholder="Add a Comment..."
                  fullWidth
                  inputRef={register({
                    // min: {
                    //   value: 7,
                    //   message: 'Cannot enter an empty phone number'
                    // },
                    required: 'Model cannot be empty 🤷🏻‍♂️'
                  })}
                  InputProps={
                  {className: classes.textinput}
                  }
                error={!!errors.model}
                />
          </Paper>
            {errors.model && (
                <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.model.message}</span>
                )}
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography>Reference Number</Typography>
          <Paper elevation={0}>
                <TextField
                  name="reference_number" 
                  id="reference_number" 
                  variant="outlined"
                  size="small"
 
                //   placeholder="Add a Comment..."
                  fullWidth
                  inputRef={register({
                    // min: {
                    //   value: 7,
                    //   message: 'Cannot enter an empty phone number'
                    // },
                    required: 'Reference number cannot be empty 🤷🏻‍♂️'
                  })}
                  InputProps={
                  {className: classes.textinput}
                  }
                error={!!errors.reference_number}
                />
          </Paper>
            {errors.reference_number && (
                <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.reference_number.message}</span>
                )}
        </Grid>
        
        <Grid item xs={12} sm={6}>
        <Typography>Where is the watch located?</Typography> 
          <Paper elevation={0}>
                <TextField
                  name="location" 
                  id="location"
                  placeholder="City & Country" 
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputRef={register({
                    required: 'Location cannot be empty 🤷🏻‍♂️'
                  })}
                  InputProps={
                  {className: classes.textinput}
                  }
                error={!!errors.location}
                />
          </Paper>
            {errors.location && (
                <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.location.message}</span>
                )}
        </Grid>
        <Grid item xs={12} sm={12}>
        <Typography>Any special details?</Typography> 
          <Paper elevation={0}>
                <TextField
                  name="details" 
                  id="details"
                  placeholder="The more you can tell us, the better!" 
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputRef={register({
                    // required: 'Details cannot be empty 🤷🏻‍♂️'
                  })}
                  InputProps={
                  {className: classes.textinput}
                  }
                error={!!errors.details}
                />
          </Paper>
            {errors.details && (
                <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.details.message}</span>
                )}
        </Grid>         
        </Grid>
        </Paper>    
        <Paper className={classes.paper} elevation={0} color="primary">
        <h1>Reserve Price</h1>
        <Typography>Do you want to set a minimum price required for your watch to sell?</Typography>
        <FormControl component="fieldset" className={classes.radio}>
            {/* <FormLabel component="legend"></FormLabel> */}
            <RadioGroup row aria-label="reserve" name="reserve" value={reserve} onChange={handleChange3}>
                <FormControlLabel value="yes" control={<Radio color="primary"/>} label="Yes" />
                <FormControlLabel value="no" control={<Radio color="primary"/>} label="No" />
            </RadioGroup>
        </FormControl>
        <Grid container spacing={3}>
        {reserve === 'yes'?
            <>
            <Typography color="secondary" className={classes.input}>Please note there is a $49 fee for having a reserve price.</Typography>
            <Grid item xs={12} sm={8}>
            <Typography>What reserve price would you like (USD)?</Typography>
            <Paper elevation={0}>
                <TextField
                    name="price" 
                    id="price" 
                    variant="outlined" 
                    size="small"
                    fullWidth
                    inputRef={register({
                        // min: {
                        // value: 7,
                        // message: 'Cannot enter an empty link'
                        // },
                        required: 'Price cannot be empty 🤷🏻‍♂️'
                    })}
                    InputProps={
                    {className: classes.textinput}
                    }
                    error={!!errors.price}
                    />
            </Paper>
                {errors.price && (
                    <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.price.message}</span>
                    )}
            </Grid>
        </>
        :
        <></>
        }
        </Grid>
        </Paper>
        {/* <Paper className={classes.paper} elevation={0} color="primary">
        <h1>Photos</h1>
        <Typography>Please upload at least 6 photos of the watch showing all sides of the case.</Typography>
        <br/>
        <Dropzone />
        <UppyComp />
        <FileUpload />
        </Paper> */}
        <Paper className={classes.paper} elevation={0} color="primary">
        <h1>Referral</h1>
        <Typography>How did you hear about us? If a user referred you please leave their username/email.</Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
            <Paper elevation={0}>
                <TextField
                    name="referral" 
                    id="referral" 
                    variant="outlined"          
                    size="small"
                    //   placeholder="Add a Comment..."
                    fullWidth
                    inputRef={register({
                        // min: {
                        // value: 7,
                        // message: 'Cannot enter an empty link'
                        // },
                    })}
                    InputProps={
                    {className: classes.textinput}
                    }
                    error={!!errors.referral}
                    />
            </Paper>
                {errors.referral && (
                    <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.referral.message}</span>
                    )}
        </Grid>
        </Grid>
        <br/>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" color="primary" type="submit" fullWidth 
        >
            Submit
          </Button>
        </Grid>      
    </Paper>
    </MuiPickersUtilsProvider>
    </form>
    </div>
    </Grid>
    </Grid>
)
}

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps, {submitItem})(SubmitListing);