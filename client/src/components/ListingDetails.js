import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import {Button, Box, Typography, Paper, Chip, Grid} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import {format} from "date-fns";
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import { useForm, Controller } from "react-hook-form";
import Input from "@material-ui/core/Input";
import NumberFormat from "react-number-format";
import Countdown, {zeroPad} from 'react-countdown';
import Comments from './Comments'

const ListingDetails = ({ currentItem
}) => {
 
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [img, setImg] = useState('');
  const [reference_number, setReference_number] = useState('');
  const [movement, setMovement] = useState('');
  const [year, setYear] = useState('');
  const [case_diameter, setCase_diameter] = useState('');
  const [lug_width, setLug_width] = useState('');
  const [description, setDescription] = useState('');
  const [bid, setBid] = useState(400)
  const [modalStyle] = useState(getModalStyle);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm();
//   const [points, setPoints] = useState(auth!.user.points);

useEffect(() => {
    if(currentItem) {
        setBrand(currentItem.brand)
        setModel(currentItem.model)
        setImg(currentItem.img)
        setReference_number(currentItem.reference_number)
        setMovement(currentItem.movement)
        setYear(currentItem.year)
        setCase_diameter(currentItem.case_diameter)
        setLug_width(currentItem.lug_width)
        setDescription(currentItem.description)
    }
  }, [currentItem]);  


  const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
    progressbar: {
      width: "70%"
    },
    table: {
      minWidth: 250,
    },
    image: {
        borderRadius: 3,
        minHeight: 300,
        maxHeight:500,
        width:"100%",
        height: "100%",
        objectFit: 'cover'
        },
    paper: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        width: "25%",
        height: "100%",
      }
    },
    bidbar: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.warning.light,
      background: theme.palette.warning.dark,
      height: 42
    },
    bidbartext: {
      color: "#FFFFFF"
    },
    background: {
      background: ""
    },
    papermodal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 0
    },
    bidinput: {
      margin: theme.spacing(1),
      height: 38
    }
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    setBid(data.bid)
  };

    const classes = useStyles();
    const Completionist = () => <span>Ended</span>;
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
          if (days == 0 && hours == 0 && minutes == 0){
            return <span>{zeroPad(seconds)}</span>;
          }
          else if (days ==0 && hours == 0){
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>; 
          }
          else if (days ==0){
            return <span>{hours}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
          }
          else if (days ==1){
            return <span>{days} Day</span>;
          }
          else {
            return <span>{days} Days</span>;
          }
      }
    };

    var auctionEnd = ('March 7, 2021 11:30:00')

    // Modal Body
    const body = (
      <div style={modalStyle} className={classes.papermodal}>
        <img src={currentItem.img} alt={currentItem.brand} 
        className={classes.image}/>
        <h2 id="simple-modal-title">
        {currentItem.brand} {currentItem.model} {currentItem.reference_number} - {currentItem.year}
        </h2>
        <h4><Countdown
          date={auctionEnd}
          renderer={renderer}
        /></h4>
        <h4>Current Bid</h4>
        <NumberFormat value={bid} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
        {/* <Box component="span"> */}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <form onSubmit={handleSubmit(onSubmit)}
          >
          $
          <TextField          
          name="bid"
          id="bid"
          // as={
          //   <NumberFormat
          //   customInput={TextField}
          //   thousandSeparator={true}
          //   onValueChange={(v) => {
          //     //value without dollar signe
          //     console.log(v.value);
          //   }}
          // />
          // }
          inputRef={register({
            min: {
              value: ((bid)+100),
              message: 'You need to increase your bid'
            },
            valueAsNumber: true,

          })}
          variant="outlined" 
          placeholder="Bid"
          InputProps={{
          className: classes.bidinput
          }}
          error={!!errors.bid}
        />
         <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          disabled={!!errors.bid}
          className={classes.bidinput}
          >Bid
          </Button>
          </form>
        </Grid> 
        {errors.bid && (
            <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.bid.message}</span>
          )}
        <div className={classes.center}>
        Minimum bid increment is $100. All bids in USD.
        </div>
      </div>
    );

  return(
      <div className={classes.root}>
          <div>
            <h1>
              {currentItem.brand} {currentItem.model} {currentItem.reference_number} - {currentItem.year}
            </h1>
          </div>
          <div style={{ width: '100%' }}>
            <Box display="flex" component="span" alignItems="center" mb={1}>
              <Chip color="secondary" variant="outlined" size="small" label="No Reserve"/>&nbsp;&nbsp;
              <Typography variant="h6" color="inherit" display="inline">
                Serviced June 2019, second owner, California
              </Typography>
            </Box>
          </div>
          <img src={currentItem.img} alt={currentItem.brand} 
          className={classes.image} 
          />
              <Grid 
                container 
                spacing={2}
                direction="row"
                justify="left"
                alignItems="center"
                alignContent="center"
              >
                <Grid item xs={12} sm={9} md={8}>
                  <Paper className={classes.bidbar}>

                  <Grid container spacing={0}>
                    <Grid item xs>
                      <Typography 
                      // variant="bold" 
                      color="inherit" 
                      display="inline">
                        Time Left &nbsp;
                      </Typography>
                      <Typography 
                      // variant="subtitle1" 
                      className={classes.bidbartext}
                      display="inline">
                      <Countdown
                          date={auctionEnd}
                          renderer={renderer}
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography 
                      // variant="h6" 
                      color="inherit" 
                      display="inline">
                      High Bid &nbsp;
                      </Typography>
                      <Typography 
                      // variant="subtitle1" 
                      className={classes.bidbartext}
                      display="inline">
                      <NumberFormat value={bid} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography 
                      // variant="h6" 
                      color="inherit" 
                      display="inline">
                      Bids &nbsp;
                      </Typography>
                      <Typography 
                      // variant="subtitle1" 
                      className={classes.bidbartext}
                      display="inline"
                      >
                      45
                      </Typography>
                    </Grid>
                  </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      onClick={handleOpen}
                      type="button"
                      size="large"
                    >Place Bid
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {body}
                    </Modal>
                </Grid>
          <Grid item xs={12} md={10}>
            <Typography color="inherit" fontWeight="fontWeightBold">
              Ending {format(Date.parse(auctionEnd),'MMM d, h:m aaa')}
              </Typography>
          </Grid>
           {/* Description Table */}
            <Grid item xs={12} md={10}>
                 <div className={classes.paper}>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline" fontWeight="fontWeightBold">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Brand
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                  {currentItem.brand}
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                <Box fontWeight="fontWeightBold" m={0.5}>
                    Year
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                <Box  m={0.5}>
                  {currentItem.year}
                  </Box>
                </Typography>
              </Paper>
            </div>
            <div className={classes.paper}>
            <Paper variant="outlined" square="true" className={classes.background}>
               <Typography color="inherit" display="inline">
                 <Box fontWeight="fontWeightBold" m={0.5}>
                   Model
                 </Box>
              </Typography>
            </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.model}
                  </Box>                
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Movement
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.movement}
                  </Box> 
                </Typography>
              </Paper>
              </div>
              <div className={classes.paper}>
            <Paper variant="outlined" square="true" className={classes.background}>
               <Typography color="inherit" display="inline">
                 <Box fontWeight="fontWeightBold" m={0.5}>
                   Ref. Number
                 </Box>
              </Typography>
            </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                  {currentItem.reference_number}
                  </Box>                
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Diameter
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.case_diameter}
                  </Box> 
                </Typography>
              </Paper>
              </div>
              <div className={classes.paper}>
            <Paper variant="outlined" square="true" className={classes.background}>
               <Typography color="inherit" display="inline">
                 <Box fontWeight="fontWeightBold" m={0.5}>
                   Lug Width
                 </Box>
              </Typography>
            </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                  {currentItem.lug_width}
                  </Box>                
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Empty
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    Empty
                  </Box> 
                </Typography>
              </Paper>
              </div>
            </Grid>
          </Grid>
          {/* Description */}
          <Grid item xs={12} md={10}>
            <h2>Description</h2>
            <p>
            {currentItem.description}
            </p>
          </Grid>
          {/* Comment Section */}
          <Grid item xs={12} md={10}>
            <Typography color="inherit" fontWeight="fontWeightBold">
              Comments & Bids
              </Typography>
            <TextField 
              id="outlined-basic" 
              variant="outlined" 
              placeholder="Add a Comment..."
              fullWidth
              />
          </Grid>
          <Grid item xs={12} md={10}>
             <Comments />
          </Grid>
          </div>
  );
};

const mapStateToProps = (state) => ({
  currentItem: state.item.currentItem,
//   auth: state.auth
});

export default connect(mapStateToProps, {})(ListingDetails);
  
