import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import {Button, Box, Typography, Paper, Chip, Grid, IconButton,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar, Container
} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import {format, isPast, addMinutes, differenceInSeconds, differenceInMinutes, formatDistanceToNowStrict} from "date-fns";
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Modal from '@material-ui/core/Modal';
import { useForm, Controller } from "react-hook-form";
import Input from "@material-ui/core/Input";
import NumberFormat from "react-number-format";
import Countdown, {zeroPad} from 'react-countdown';
import { spacing } from '@material-ui/system';
import {getItemById, setCurrentItem, bidOnItem, commentItem, updateItemEndDate} from '../flux/actions/itemActions'
import BidHistoryComponent from './BidHistoryComponent'
import LoginModalBid from './auth/LoginModalBid'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CommentsAndBids from './CommentsAndBids';
import LoginModalComment from './auth/LoginModalComment';
import Gallery from './Gallery'
import { paymentIntent } from '../flux/actions/stripeActions';
import EndingSoon from './EndingSoon';
import TimerIcon from '@material-ui/icons/Timer';


const ListingDetails = ({ auth, setCurrentItem, currentItem, getItemById, item, match, bidOnItem, commentItem, updateItemEndDate, paymentIntent}) => {
  
  const [_id, setId] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [img, setImg] = useState('');
  const [reference_number, setReference_number] = useState('');
  const [movement, setMovement] = useState('');
  const [year, setYear] = useState('');
  const [case_diameter, setCase_diameter] = useState('');
  const [lug_width, setLug_width] = useState('');
  const [description, setDescription] = useState('');
  const [reserve, setReserve] = useState('')
  const [bid, setBid] = useState('')
  const [service, setService] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bidHistory, setBidHistory] = useState('')
  const [comments, setComments] = useState('')
  const [commentsandbids, setCommentsandbids] = useState('')

  const [modalStyle] = useState(getModalStyle);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2
  } = useForm()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

useEffect(() => {
    if(currentItem) {
        setId(currentItem._id)
        setBid(currentItem.bid)
        setBrand(currentItem.brand)
        setModel(currentItem.model)
        setImg(currentItem.img)
        setReference_number(currentItem.reference_number)
        setMovement(currentItem.movement)
        setYear(currentItem.year)
        setCase_diameter(currentItem.case_diameter)
        setLug_width(currentItem.lug_width)
        setDescription(currentItem.description)
        setReserve(currentItem.reserve)
        setService(currentItem.service)
        setEndDate(currentItem.endDate)
        setBidHistory(currentItem.bidHistory)
        setComments(currentItem.comments)
    } 
      // window.scrollTo(0, 0)
      setCommentsandbids([].concat(currentItem.bidHistory, currentItem.comments))

    //   console.log(`Time left: ${differenceInMinutes(
    //     new Date(currentItem.endDate),
    //     new Date()
    //     )}`
    // )
    // console.log(`Time between last bid and endDate: ${differenceInMinutes(
    //   new Date(currentItem.endDate),
    //   new Date(currentItem.bidHistory && currentItem.bidHistory.length && currentItem.bidHistory.[0].date)
    //   )}`)

    if(currentItem.bidHistory && currentItem.bidHistory.length &&
      differenceInSeconds(
        new Date(currentItem.endDate),
        new Date(currentItem.bidHistory[0].date)
        ) < 60
    ){
      // console.log(`Before added minute: ${currentItem.endDate}`)
      let addOneMin = addMinutes(new Date(), 1)
      setEndDate(addOneMin)

      const updateEndTime = {
        _id: currentItem._id,
        endDate: addOneMin
      }
      updateItemEndDate(updateEndTime)
      // console.log(`After added minute: ${addOneMin}`)
      getItemById(match.params.id)
    }

  }, [currentItem, getItemById]);  

  useEffect(() => { 
    // console.log('Loop started')
    if(currentItem.length === 0) {
      // console.log('Inside loop')
      getItemById(match.params.id);
    } 
  }, [getItemById, match.params.id]);
  
  let bidBarBg
  let bidBarText
  let auctionEndText
  if(isPast(new Date(currentItem.endDate))){
    var smBar = 12;
    var mdBar = 12;
    var smButton = 0;
    var mdButton = 0;
    if(currentItem.status === "completed"){
      bidBarBg = 'black';
      bidBarText = "grey"
      auctionEndText = <b>Sold to</b>
    }
    else {
      bidBarBg = 'grey';
      bidBarText = "white"
      auctionEndText = <b>Highest bidder</b>
    }

  } else {
    var smBar = 9;
    var mdBar = 8;
    var smButton = 3;
    var mdButton = 4;
    bidBarBg = 'green';
    bidBarText = 'white'
    auctionEndText = <b>Highest bidder</b>
  }

  const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 10,
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
        width: "50%",
        height: "100%",
      },
      // marginLeft: 8,
      // marginRight: 8
    },
    sticky: {
      position: "sticky",
      top: "calc(1rem + 60px)",
    },
    bidbar: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: bidBarText,
      background: bidBarBg,
      // height: 40,
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
    },
    chip: {
      color: "white",
      backgroundColor: "#f50057"
    },
    info: {
      padding: theme.spacing(1),
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
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
  };

async function onSubmit(data) {
  try {
    const result = await setBid(data.bid);
    const newResult = await (bidOnItem(data), setOpen(false))
    setTimeout(() => {getItemById(match.params.id)}, 500);
    // const finalResult = await getItemById(match.params.id);
  } catch(error) {
    console.log(error);
  }
}

async function commentSubmit (data, e) {
  try {
    const result = await commentItem(data)
    const newresult = await getItemById(match.params.id) 
    const finalresult = await e.target.reset();
  } catch(error){
    console.log(error);
  }  
}

let bidIncrement;
if(currentItem.bidHistory && currentItem.bidHistory.length && currentItem.bidHistory[0].bid){
  if (currentItem.bidHistory[0].bid <= 14999) {
    bidIncrement = 100
  } else if (currentItem.bidHistory[0].bid <= 49999){
    bidIncrement = 250
  } else if(currentItem.bidHistory[0].bid >= 50000){
    bidIncrement = 500
  }
}

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

    // Modal Body
    const body = (
      <div style={modalStyle} className={classes.papermodal}>
        <img src={currentItem.img && currentItem.img[0].url} alt={currentItem.brand} 
        className={classes.image}/>
        <Typography variant="h5">
        {currentItem.brand} {currentItem.model} {currentItem.reference_number} - {currentItem.year}
        </Typography>
        <Box display="flex" justifyContent="center" className={classes.info}>
          <Typography>
          <Countdown
          date={new Date(currentItem.endDate)}
          renderer={renderer}
        />&nbsp;-&nbsp;<b>Current Bid</b>&nbsp;
          <NumberFormat 
          value={currentItem.bidHistory && currentItem.bidHistory.length?
          currentItem.bidHistory[0].bid
          :
          '0'
          }
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$'}/>
        </Typography>         
        </Box>
        
      {/* <Divider /> */}
        {/* <Box component="span"> */}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {auth.user && auth.user.stripe_cc ?
          <form onSubmit={handleSubmit(onSubmit)}>
          <div hidden="true">
          <TextField          
          name="_id"
          id="_id"
          defaultValue={currentItem._id}
          inputRef={register}
          />
          </div>
        <div>
         $ <TextField          
        name="bid"
        id="bid"
        type="number"
        inputRef={register({
          min: {
            value: (currentItem.bidHistory && currentItem.bidHistory.length?
              (currentItem.bidHistory && currentItem.bidHistory[0].bid)+bidIncrement
              :
              0
              ),
          message: 'You need to increase your bid'
          },
          required: 'Bid cannot be empty 🤷🏻‍♂️',
          valueAsNumber: true,

        })}
        variant="outlined" 
        placeholder="Bid"
        InputProps={{
        className: classes.bidinput
        }}
        error={!!errors.bid}
      />  
          {isPast(new Date(currentItem.endDate))?
          <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          disabled='true'
          className={classes.bidinput}
          >Auction has ended
          </Button>
        :  
          <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          disabled={!!errors.bid}
          className={classes.bidinput}
          >Bid
          </Button>
        }
          </div>
          </form>

        :
          "Please add a method of payment."
        }

        </Grid> 
        {errors.bid && (
            <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors.bid.message}</span>
          )}
        <Typography align="center" variant="subtitle2">
        Minimum bid increment is ${bidIncrement}. All bids in USD.
        </Typography>
      </div>
    );

  return(
      <div className={classes.root}>
        <Container>
            <Typography variant="h4">
              {currentItem.brand} {currentItem.model} {currentItem.reference_number} - {currentItem.year}
            </Typography>
          <div style={{ width: '100%' }}>
            <Grid 
            container 
            spacing={1}
            direction="row"
            justify="left"
            alignItems="center"
            alignContent="center"
            >
              <Grid item>
                {currentItem.reserve? 
              ""
              :
               <Chip 
               className={classes.chip}
               size="small" label="No Reserve"/>
              }
              </Grid>
              <Grid item>
              <Typography variant="h6" color="inherit" display="inline">
              {currentItem.service?
                <> 
                Serviced&nbsp;
                {format(new Date(currentItem.service), 'MMM Y')},
                </>
                :
                ''
              } {currentItem.location}
              </Typography>
              </Grid>
            </Grid>
          </div>
          {/* <img src={currentItem.img} alt={currentItem.brand} 
          className={classes.image} 
          /> */}
          <Gallery img={img}/>
          
          <Grid container 
            direction="row"
            justify="flex-start"
            alignItems="space-evenly"
            spacing={2}
          >
            <Grid item md={9}>
              <Grid item xs={12}>
            <Grid 
                container 
                spacing={2}
                direction="row"
                justify="left"
                alignItems="center"
                alignContent="center"
              >
                <Grid item xs={12} sm={smBar} md={mdBar} className={classes.sticky}>
                  <Paper className={classes.bidbar}>
                  <Grid container spacing={0}>
                    <Grid item xs>
                      <Grid 
                      container
                      justifyContent="center"
                      // alignItems="center"
                      >
                      <TimerIcon/>&nbsp;
                      <Typography 
                      // variant="subtitle1" 
                      className={classes.bidbartext}
                      >
                      <Countdown
                          date={new Date(currentItem.endDate)}
                          renderer={renderer}
                        />
                      </Typography>    
                      </Grid>
                    </Grid>
                    <Grid item xs>
                      <Typography 
                      // variant="h6" 
                      color="inherit" 
                      display="inline">
                      <b>High Bid &nbsp;</b>
                      </Typography>
                      <Typography 
                      // variant="subtitle1" 
                      className={classes.bidbartext}
                      display="inline">
                      <NumberFormat value={
                        currentItem.bidHistory && currentItem.bidHistory.length? 
                         currentItem.bidHistory[0].bid : 0
                        } displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography 
                      // variant="h6" 
                      color="inherit" 
                      display="inline">
                      <b>Bids &nbsp;</b>
                      </Typography>
                      <Typography 
                      // variant="subtitle1" 
                      className={classes.bidbartext}
                      display="inline"
                      >
                      {currentItem && currentItem.bidHistory? currentItem.bidHistory.length : <div></div>}
                      </Typography>
                    </Grid>
                  </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={smButton} md={mdButton}className={classes.sticky}>
                    {isPast(new Date(currentItem.endDate)) ?
                    ''
                    :
                    <div>
                    {(auth && auth.isAuthenticated && auth.user && auth.user.uid) ?
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      onClick={handleOpen}
                      type="button"
                      size="large"
                      disabled={auth.user.uid !== null && (auth.user.uid == currentItem.user)}
                    >
                      Place Bid
                    </Button>
                    :
                    <LoginModalBid />
                    }
                    </div>

                    } 
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {body}
                    </Modal>
                </Grid>
          
          

           {/* Description Table */}
          <Grid
            container 
            direction="row"
            justify="left"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={12} md={6} >  
            <div className={classes.paper}>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline" fontWeight="fontWeightBold">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Seller
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                  {currentItem.name}
                  </Box>
                </Typography>
              </Paper>
              </div>
              <div className={classes.paper}>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                <Box fontWeight="fontWeightBold" m={0.5}>
                    Location
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                <Box  m={0.5}>
                  {currentItem.location}
                  </Box>
                </Typography>
              </Paper>
            </div>
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
              </div>
              <div className={classes.paper}>
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
                    Case Material
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.material}
                  </Box> 
                </Typography>
              </Paper>
              </div>
              <div className={classes.paper}>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Crystal
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.crystal}
                  </Box> 
                </Typography>
              </Paper>
              </div>
              </Grid>

{/* Grid Break */}

              <Grid item xs={12} md={6}>
              <div className={classes.paper}>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Crown
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.crown}
                  </Box> 
                </Typography>
              </Paper>
              </div>
              <div className={classes.paper}>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Bezel
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.bezel}
                  </Box> 
                </Typography>
              </Paper>
              </div>
              <div className={classes.paper}>
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
                    {currentItem.case_diameter} mm
                  </Box> 
                </Typography>
              </Paper>
              </div>
              <div className={classes.paper}>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Thickness
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.thickness} mm
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
                  {currentItem.lug_width} mm
                  </Box>                
                </Typography>
              </Paper>
              </div>
              <div className={classes.paper}>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                  Water Resistance
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.wr} m
                  </Box> 
                </Typography>
              </Paper>
              </div>
              <div className={classes.paper}>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                  Pressure Tested
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.tested}
                  </Box> 
                </Typography>
              </Paper>
              </div>
              <div className={classes.paper}>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Serviced
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.service?
                      format(new Date(currentItem.service), 'MMM Y')
                      :
                      "N/A"
                    }
                  </Box> 
                </Typography>
              </Paper>
              </div>
              <div className={classes.paper}>
              <Paper variant="outlined" square="true" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                  Box & papers
                  </Box>
                </Typography>
              </Paper>
              <Paper variant="outlined" square="true">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                    {currentItem.boxpapers}
                  </Box> 
                </Typography>
              </Paper>
              </div>
            </Grid>
          </Grid>
          {/* Description */}
          <Grid item xs={12}>
            <h2>Description</h2>
            <p>
            {currentItem.description}
            </p>
          </Grid>
        </Grid> 
          <Grid item xs={12}>
            <Paper variant="outlined" className={classes.info}>
            <Grid container>
            <Grid item xs={6}>
              <Typography fontWeight="fontWeightBold" variant="h5" display="inline">
              {auctionEndText}
              &nbsp;
              {currentItem.bidHistory && currentItem.bidHistory.length? currentItem.bidHistory[0].name : 0}
              </Typography>
              <br/>
              <Typography variant="h2" display="inline">
                <NumberFormat value={
                  currentItem.bidHistory && currentItem.bidHistory.length? 
                  currentItem.bidHistory[0].bid : 0
                } displayType={'text'} thousandSeparator={true} prefix={'$'}/>
              </Typography>
            </Grid>
            
            <Grid xs={6}>
              <div className={classes.paper}>
              <Paper elevation="0" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Seller
                  </Box>
                </Typography>
              </Paper>
              <Paper elevation="0">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                  {currentItem.name}
                  </Box> 
                </Typography>
              </Paper>
              <Paper elevation="0" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Ending
                  </Box>
                </Typography>
              </Paper>
              <Paper elevation="0">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                  {currentItem && currentItem.endDate? 
              <>{format(new Date(currentItem.endDate),'E, MMM d hh:mm aaa')}</>
              : <div></div>}
                  </Box> 
                </Typography>
              </Paper>
              <Paper elevation="0" className={classes.background}>
                <Typography color="inherit" display="inline">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Bids
                  </Box>
                </Typography>
              </Paper>
              <Paper elevation="0">
                <Typography color="inherit" display="inline">
                  <Box  m={0.5}>
                  {currentItem && currentItem.bidHistory? currentItem.bidHistory.length : <div></div>}
                  </Box> 
                </Typography>
              </Paper>
              </div>
            </Grid>
            </Grid>
            </Paper>
          </Grid>
          <br/>
          {/* Comment Section */}
          <Grid item xs={12}>
            <h2>Comments & Bids</h2>
              <form onSubmit={handleSubmit2(commentSubmit)}>
                <div hidden="true">
                <TextField          
                name="_id"
                id="_id"
                value={currentItem._id}
                inputRef={register2}
                />
                </div>
                <div>
                <TextField
                  name="text" 
                  id="text" 
                  variant="outlined" 
                  placeholder="Add a Comment..."
                  fullWidth
                  inputRef={register2({
                    min: {
                      value: 1,
                      message: 'Cannot enter an empty comment'
                    },
                    required: 'Comment cannot be empty 🤷🏻‍♂️'
                  })}
                  InputProps={
                  {className: classes.textinput},
                  {endAdornment: 
                 <div>
                 {(auth && auth.isAuthenticated) ?
                 <IconButton 
                 color="primary" 
                 className={classes.iconButton}
                 type="submit"
                 disabled={!!errors2.text}
                 >
                 <ArrowDownwardIcon />
                </IconButton>
                 :
                 <LoginModalComment />
                 }
                 </div>  
                
                }}
                error={!!errors2.text}
                />
                </div>
                </form>
            {errors2.text && (
            <span style={{ color: "red", fontWeight: "bold" }} className={classes.error}>{errors2.text.message}</span>
            )}
          </Grid>
          {/* <Grid item xs={12}>
            </Grid> */}
          </Grid> 
          <Grid>
            <CommentsAndBids commentsandbids = {commentsandbids} />
          </Grid>   
          </Grid>
          <Grid item md={3}>
              <EndingSoon/>
          </Grid>
        </Grid>

        </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentItem: state.item.currentItem,
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { getItemById, setCurrentItem, bidOnItem, commentItem, updateItemEndDate, paymentIntent })(ListingDetails);
  
