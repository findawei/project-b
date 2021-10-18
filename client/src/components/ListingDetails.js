import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import Share from "./Share";
import {
  Button,
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  format,
  isPast,
  addMinutes,
  differenceInSeconds,
  differenceInMinutes,
  formatDistanceToNowStrict,
} from "date-fns";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Modal from "@material-ui/core/Modal";
import { useForm, Controller } from "react-hook-form";
import Input from "@material-ui/core/Input";
import NumberFormat from "react-number-format";
import Countdown, { zeroPad } from "react-countdown";
import { spacing } from "@material-ui/system";
import {
  getItemById,
  setCurrentItem,
  bidOnItem,
  commentItem,
  updateItemEndDate,
} from "../flux/actions/itemActions";
import BidHistoryComponent from "./BidHistoryComponent";
import LoginModalBid from "./auth/LoginModalBid";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CommentsAndBids from "./CommentsAndBids";
import LoginModalComment from "./auth/LoginModalComment";
import Gallery from "./Gallery";
import { paymentIntent } from "../flux/actions/stripeActions";
import EndingSoon from "./EndingSoon";
import TimerIcon from "@material-ui/icons/Timer";
import Chart from "./Chart";
import { socket } from "../flux/actions/itemActions";

const ListingDetails = ({
  auth,
  setCurrentItem,
  currentItem,
  getItemById,
  item,
  match,
  bidOnItem,
  commentItem,
  updateItemEndDate,
  paymentIntent,
}) => {
  const [_id, setId] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [img, setImg] = useState("");
  const [reference_number, setReference_number] = useState("");
  const [movement, setMovement] = useState("");
  const [year, setYear] = useState("");
  const [case_diameter, setCase_diameter] = useState("");
  const [lug_width, setLug_width] = useState("");
  const [description, setDescription] = useState("");
  const [reserve, setReserve] = useState("");
  const [bid, setBid] = useState("");
  const [service, setService] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bidHistory, setBidHistory] = useState("");
  const [comments, setComments] = useState("");
  const [chart, setChart] = useState("");
  const [commentsandbids, setCommentsandbids] = useState("");

  const [modalStyle] = useState(getModalStyle);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2,
    reset,
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentItem) {
      setId(currentItem._id);
      setBid(currentItem.bid);
      setBrand(currentItem.brand);
      setModel(currentItem.model);
      setImg(currentItem.img);
      setReference_number(currentItem.reference_number);
      setMovement(currentItem.movement);
      setYear(currentItem.year);
      setCase_diameter(currentItem.case_diameter);
      setLug_width(currentItem.lug_width);
      setDescription(currentItem.description);
      setReserve(currentItem.reserve);
      setService(currentItem.service);
      setEndDate(currentItem.endDate);
      setBidHistory(currentItem.bidHistory);
      setComments(currentItem.comments);
      setChart(currentItem.chart);
    }
    // window.scrollTo(0, 0)
    setCommentsandbids([].concat(currentItem.bidHistory, currentItem.comments));

    //   console.log(`Time left: ${differenceInMinutes(
    //     new Date(currentItem.endDate),
    //     new Date()
    //     )}`
    // )
    // console.log(`Time between last bid and endDate: ${differenceInMinutes(
    //   new Date(currentItem.endDate),
    //   new Date(currentItem.bidHistory && currentItem.bidHistory.length && currentItem.bidHistory.[0].date)
    //   )}`)

    if (
      currentItem.bidHistory &&
      currentItem.bidHistory.length &&
      differenceInSeconds(
        new Date(currentItem.endDate),
        new Date(currentItem.bidHistory[0].date)
      ) < 60
    ) {
      // console.log(`Before added minute: ${currentItem.endDate}`)
      let addOneMin = addMinutes(new Date(), 1);
      setEndDate(addOneMin);

      const updateEndTime = {
        _id: currentItem._id,
        endDate: addOneMin,
      };
      updateItemEndDate(updateEndTime);
      // console.log(`After added minute: ${addOneMin}`)
      getItemById(match.params.id);
    }
  }, [currentItem, getItemById]);

  useEffect(() => {
    // console.log('Loop started')
    if (currentItem.length === 0) {
      // console.log('Inside loop')
      getItemById(match.params.id);
    }
  }, [getItemById, match.params.id]);

  //STATE NOT ALWAYS UPDATING ON THE PAGE WHERE THE COMMENT OR BID WAS MADE
  useEffect(() => {
    if (socket) {
      socket.on("updateComment", (data) => {
        console.log(data);
        let newComments;
        if (comments && Array.isArray(comments)) {
          newComments = comments;
          newComments.unshift(data);
          setComments(newComments);
          setCommentsandbids([].concat(currentItem.bidHistory, newComments));
        }
      });
      socket.on("updateBid", (data) => {
        console.log(data);
        let newBidHistory;
        if (bidHistory && Array.isArray(bidHistory)) {
          newBidHistory = bidHistory;
          newBidHistory.unshift(data);
          setBidHistory(newBidHistory);
          setCommentsandbids([].concat(newBidHistory, currentItem.comments));
        }
      });
    }
  }, [socket, comments, bidHistory]);

  let bidBarBg;
  let bidBarText;
  let auctionEndText;
  if (isPast(new Date(currentItem.endDate))) {
    var smBar = 12;
    var mdBar = 12;
    var smButton = 0;
    var mdButton = 0;
    if (currentItem.status === "completed") {
      bidBarBg = "black";
      bidBarText = "grey";
      auctionEndText = <b>Sold to</b>;
    } else {
      bidBarBg = "grey";
      bidBarText = "white";
      auctionEndText = <b>Reserve not met, bid to</b>;
    }
  } else {
    var smBar = 9;
    var mdBar = 8;
    var smButton = 3;
    var mdButton = 4;
    bidBarBg = "green";
    bidBarText = "white";
    auctionEndText = <b>Highest bidder</b>;
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: 10,
    },
    progressbar: {
      width: "70%",
    },
    table: {
      minWidth: 250,
    },
    image: {
      borderRadius: 3,
      minHeight: 300,
      maxHeight: 500,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    paper: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
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
      textAlign: "center",
      color: bidBarText,
      background: bidBarBg,
      // height: 40,
    },
    bidbartext: {
      color: "#FFFFFF",
    },
    background: {
      background: "",
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
    bidinput: {
      margin: theme.spacing(1),
      height: 38,
    },
    chip: {
      color: "white",
      backgroundColor: "#f50057",
    },
    chipShip: {
      margin: theme.spacing(0.5),
      // backgroundColor: "#11cb5f",
      backgroundColor: purple[500],
      color: "white",
    },
    chipPay: {
      margin: theme.spacing(0.5),
      backgroundColor: "#11cb5f",
      color: "white",
    },
    info: {
      padding: theme.spacing(1),
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function onSubmit(data) {
    try {
      setBid(data.bid);
      bidOnItem(data);
      setOpen(false);
      // const finalResult = await getItemById(match.params.id);
    } catch (error) {
      console.log(error);
    }
  }

  async function commentSubmit(data, e) {
    try {
      e.preventDefault();
      commentItem(data);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  let bidIncrement;
  if (
    currentItem.bidHistory &&
    currentItem.bidHistory.length &&
    currentItem.bidHistory[0].bid
  ) {
    if (currentItem.bidHistory[0].bid <= 14999) {
      bidIncrement = 100;
    } else if (currentItem.bidHistory[0].bid <= 49999) {
      bidIncrement = 250;
    } else if (currentItem.bidHistory[0].bid >= 50000) {
      bidIncrement = 500;
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
      if (days == 0 && hours == 0 && minutes == 0) {
        return <span>{zeroPad(seconds)}</span>;
      } else if (days == 0 && hours == 0) {
        return (
          <span>
            {zeroPad(minutes)}:{zeroPad(seconds)}
          </span>
        );
      } else if (days == 0) {
        return (
          <span>
            {hours}:{zeroPad(minutes)}:{zeroPad(seconds)}
          </span>
        );
      } else if (days == 1) {
        return <span>{days} Day</span>;
      } else {
        return <span>{days} Days</span>;
      }
    }
  };

  // Modal Body
  const body = (
    <div style={modalStyle} className={classes.papermodal}>
      <img
        src={
          currentItem.img && currentItem.img[0] ? currentItem.img[0].url : ""
        }
        alt={currentItem.brand}
        className={classes.image}
      />
      <Typography variant="h5">
        {currentItem.brand} {currentItem.model} {currentItem.reference_number} -{" "}
        {currentItem.year}
      </Typography>
      <Box display="flex" justifyContent="center" className={classes.info}>
        <Typography>
          <Countdown date={new Date(currentItem.endDate)} renderer={renderer} />
          &nbsp;-&nbsp;<b>Current Bid</b>&nbsp;
          <NumberFormat
            value={
              currentItem.bidHistory && currentItem.bidHistory.length
                ? currentItem.bidHistory[0].bid
                : "0"
            }
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </Typography>
      </Box>

      {/* <Divider /> */}
      {/* <Box component="span"> */}

      {auth.user && auth.user.stripe_cc ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div hidden="true">
            <TextField
              name="_id"
              id="_id"
              defaultValue={currentItem._id}
              inputRef={register}
            />
          </div>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={8}>
              <TextField
                name="bid"
                id="bid"
                type="number"
                inputRef={register({
                  min: {
                    value:
                      currentItem.bidHistory && currentItem.bidHistory.length
                        ? (currentItem.bidHistory &&
                            currentItem.bidHistory[0].bid) + bidIncrement
                        : 0,
                    message: "You need to increase your bid",
                  },
                  required: "Bid cannot be empty 🤷🏻‍♂️",
                  valueAsNumber: true,
                })}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  className: classes.bidinput,
                }}
                placeholder="Bid"
                error={!!errors.bid}
              />
            </Grid>
            <Grid item xs={4}>
              {isPast(new Date(currentItem.endDate)) ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled="true"
                  className={classes.bidinput}
                >
                  Auction has ended
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!!errors.bid}
                  className={classes.bidinput}
                >
                  Bid
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      ) : (
        <Typography align="center" variant="subtitle1" color="secondary">
          Please add a method of payment.
        </Typography>
      )}
      {errors.bid && (
        <span
          style={{ color: "red", fontWeight: "bold" }}
          className={classes.error}
        >
          {errors.bid.message}
        </span>
      )}
      <Typography align="center" variant="subtitle2">
        Minimum bid increment is ${bidIncrement}. All bids in USD.
      </Typography>
    </div>
  );

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4">
          {currentItem.brand} {currentItem.model} {currentItem.reference_number}{" "}
          - {currentItem.year}
        </Typography>
        <div style={{ width: "100%" }}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="left"
            alignItems="center"
            alignContent="center"
          >
            <Grid item>
              {currentItem.reserve ? (
                <Chip size="small" label="Reserve" color="primary" />
              ) : (
                <Chip color="secondary" size="small" label="No Reserve" />
              )}
            </Grid>
            <Grid item>
              <Typography variant="h6" color="inherit" display="inline">
                {currentItem.service ? (
                  <>
                    Serviced&nbsp;
                    {format(new Date(currentItem.service), "MMM Y")},
                  </>
                ) : (
                  ""
                )}{" "}
                {currentItem.location}
              </Typography>
            </Grid>
          </Grid>
        </div>
        {/* <img src={currentItem.img} alt={currentItem.brand} 
          className={classes.image} 
          /> */}
        {img ? <Gallery img={img} /> : "No pics yet"}

        <Grid
          container
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
                <Grid
                  item
                  xs={12}
                  sm={smBar}
                  md={mdBar}
                  className={classes.sticky}
                >
                  <Paper className={classes.bidbar}>
                    <Grid container spacing={0}>
                      <Grid item xs>
                        <Grid
                          container
                          justifyContent="center"
                          // alignItems="center"
                        >
                          <TimerIcon />
                          &nbsp;
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
                          display="inline"
                        >
                          <b>High Bid &nbsp;</b>
                        </Typography>
                        <Typography
                          // variant="subtitle1"
                          className={classes.bidbartext}
                          display="inline"
                        >
                          <NumberFormat
                            value={
                              currentItem.bidHistory &&
                              currentItem.bidHistory.length
                                ? currentItem.bidHistory[0].bid
                                : 0
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography
                          // variant="h6"
                          color="inherit"
                          display="inline"
                        >
                          <b>Bids &nbsp;</b>
                        </Typography>
                        <Typography
                          // variant="subtitle1"
                          className={classes.bidbartext}
                          display="inline"
                        >
                          {currentItem && currentItem.bidHistory ? (
                            currentItem.bidHistory.length
                          ) : (
                            <div></div>
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={smButton}
                  md={mdButton}
                  className={classes.sticky}
                >
                  {isPast(new Date(currentItem.endDate)) ? (
                    ""
                  ) : (
                    <div>
                      {auth &&
                      auth.isAuthenticated &&
                      auth.user &&
                      auth.user.uid ? (
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={handleOpen}
                          type="button"
                          size="large"
                          disabled={
                            auth.user.uid !== null &&
                            auth.user.uid == currentItem.user
                          }
                        >
                          Place Bid
                        </Button>
                      ) : (
                        <LoginModalBid />
                      )}
                    </div>
                  )}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {body}
                  </Modal>
                </Grid>
                <Grid item xs={12}>
                  {/* <Share /> */}
                </Grid>
                {/* Description Table */}
                <Grid item xs={12}>
                  <Typography variant="h5">
                    <b>Watch Details</b>
                  </Typography>
                </Grid>
                <Grid container style={{ padding: 8 }}>
                  <Grid item xs={12} md={6}>
                    <Card square>
                      <Box display={{ xs: "none", sm: "none", md: "block" }}>
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <b>Brand</b>
                              </TableCell>
                              <TableCell>{currentItem.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Model</b>
                              </TableCell>
                              <TableCell>{currentItem.model}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Ref. Number</b>
                              </TableCell>
                              <TableCell>
                                {currentItem.reference_number}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Year</b>
                              </TableCell>
                              <TableCell>{currentItem.year}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Movement</b>
                              </TableCell>
                              <TableCell>{currentItem.movement}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Case Material</b>
                              </TableCell>
                              <TableCell>{currentItem.material}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Crystal</b>
                              </TableCell>
                              <TableCell>{currentItem.crystal}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Crown</b>
                              </TableCell>
                              <TableCell>{currentItem.crown}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                      <Box display={{ xs: "block", sm: "block", md: "none" }}>
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <b>Brand</b>
                              </TableCell>
                              <TableCell>{currentItem.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Model</b>
                              </TableCell>
                              <TableCell>{currentItem.model}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Ref. Number</b>
                              </TableCell>
                              <TableCell>
                                {currentItem.reference_number}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Year</b>
                              </TableCell>
                              <TableCell>{currentItem.year}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Movement</b>
                              </TableCell>
                              <TableCell>{currentItem.movement}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Case Material</b>
                              </TableCell>
                              <TableCell>{currentItem.material}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Crystal</b>
                              </TableCell>
                              <TableCell>{currentItem.crystal}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Crown</b>
                              </TableCell>
                              <TableCell>{currentItem.crown}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Bezel</b>
                              </TableCell>
                              <TableCell>{currentItem.bezel}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Diameter</b>
                              </TableCell>
                              <TableCell>
                                {currentItem.case_diameter} mm
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Thickness</b>
                              </TableCell>
                              <TableCell>{currentItem.thickness} mm</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Lug Width</b>
                              </TableCell>
                              <TableCell>{currentItem.lug_width} mm</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Water Resistance</b>
                              </TableCell>
                              <TableCell>{currentItem.wr} m</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Pressure Tested</b>
                              </TableCell>
                              <TableCell>{currentItem.tested}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Serviced</b>
                              </TableCell>
                              <TableCell>
                                {currentItem.service
                                  ? format(
                                      new Date(currentItem.service),
                                      "MMM Y"
                                    )
                                  : "N/A"}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Box & Papers</b>
                              </TableCell>
                              <TableCell>{currentItem.boxpapers}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Card>
                  </Grid>

                  <Grid item md={6}>
                    <Box display={{ xs: "none", sm: "none", md: "block" }}>
                      <Card square>
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <b>Bezel</b>
                              </TableCell>
                              <TableCell>{currentItem.bezel}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Diameter</b>
                              </TableCell>
                              <TableCell>
                                {currentItem.case_diameter} mm
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Thickness</b>
                              </TableCell>
                              <TableCell>{currentItem.thickness} mm</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Lug Width</b>
                              </TableCell>
                              <TableCell>{currentItem.lug_width} mm</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Water Resistance</b>
                              </TableCell>
                              <TableCell>{currentItem.wr} m</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Pressure Tested</b>
                              </TableCell>
                              <TableCell>{currentItem.tested}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Serviced</b>
                              </TableCell>
                              <TableCell>
                                {currentItem.service
                                  ? format(
                                      new Date(currentItem.service),
                                      "MMM Y"
                                    )
                                  : "N/A"}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <b>Box & Papers</b>
                              </TableCell>
                              <TableCell>{currentItem.boxpapers}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Card>
                    </Box>
                  </Grid>
                </Grid>
                {/* Description */}
                <Grid item xs={12}>
                  <Typography variant="h5">
                    <b>Condition</b>
                  </Typography>
                  <br />
                  {currentItem.description ? (
                    <div>
                      <Typography>
                        {currentItem.description.condition}
                      </Typography>
                      <br />
                      <Typography variant="h5">
                        <b>Why I bought it</b>
                      </Typography>
                      <br />
                      {/* <Typography variant="h6">Why I bought it</Typography> */}
                      <Typography>{currentItem.description.why}</Typography>
                      <br />
                      <Typography variant="h5">
                        <b>What's included</b>
                      </Typography>
                      <br />
                      <Typography>
                        {currentItem.description.included}
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>{" "}
                <Grid item xs={12}>
                  {currentItem.chart && currentItem.chart.data ? (
                    <div>
                      <Typography variant="h5">
                        <b>Sales Data</b>
                      </Typography>

                      <Chart />
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    <b>Seller Details</b>
                  </Typography>
                </Grid>
                <br />
                <Grid item xs={12}>
                  <Card>
                    <Box>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <b>Seller</b>
                            </TableCell>
                            <TableCell>{currentItem.name}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <b>Location</b>
                            </TableCell>
                            <TableCell>{currentItem.location}</TableCell>
                          </TableRow>
                          {currentItem.ship && currentItem.ship.length ? (
                            <TableRow>
                              <TableCell>
                                <b>Ships to</b>
                              </TableCell>
                              <TableCell>
                                {currentItem.ship.map((location, index) => {
                                  return (
                                    <span key={index}>
                                      {/* //   {(index ? ", " : "") + location.location} */}
                                      <Chip
                                        size="small"
                                        label={location.location}
                                        className={classes.chipShip}
                                      />
                                    </span>
                                  );
                                })}
                              </TableCell>
                            </TableRow>
                          ) : (
                            ""
                          )}
                          {currentItem.shipping ? (
                            <TableRow>
                              <TableCell>
                                <b>Shipping</b>
                              </TableCell>
                              <TableCell>{currentItem.shipping}</TableCell>
                            </TableRow>
                          ) : (
                            ""
                          )}
                          {currentItem.payment && currentItem.payment.length ? (
                            <TableRow>
                              <TableCell>
                                <b>Payment</b>
                              </TableCell>
                              <TableCell>
                                {currentItem.payment.map((location, index) => {
                                  return (
                                    <span key={index}>
                                      <Chip
                                        size="small"
                                        label={location.option}
                                        className={classes.chipPay}
                                      />
                                    </span>
                                  );
                                })}
                              </TableCell>
                            </TableRow>
                          ) : (
                            ""
                          )}
                        </TableBody>
                      </Table>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
              <br />
              {/* <Grid item xs={12}> */}
              <Paper className={classes.info}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid item xs={6}>
                    <Typography fontWeight="fontWeightBold">
                      {auctionEndText}
                      {currentItem.status === "completed" ? (
                        <div>
                          {currentItem.bidHistory &&
                          currentItem.bidHistory.length
                            ? currentItem.bidHistory[0].name
                            : 0}
                        </div>
                      ) : (
                        ""
                      )}
                    </Typography>
                    <br />
                    <Typography variant="h4">
                      <NumberFormat
                        value={
                          currentItem.bidHistory &&
                          currentItem.bidHistory.length
                            ? currentItem.bidHistory[0].bid
                            : 0
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <div className={classes.paper}>
                      <Typography color="inherit" display="inline">
                        <Box fontWeight="fontWeightBold" m={0.5}>
                          Ending
                        </Box>
                      </Typography>
                      {/* </Paper> */}
                      {/* <Paper elevation="0"> */}
                      <Typography color="inherit" display="inline">
                        <Box m={0.5}>
                          {currentItem && currentItem.endDate ? (
                            <>
                              {format(
                                new Date(currentItem.endDate),
                                "MMM d, hh:mmaaa"
                              )}{" "}
                              EST
                            </>
                          ) : (
                            <div></div>
                          )}
                        </Box>
                      </Typography>
                      {/* </Paper> */}
                      {/* <Paper elevation="0" className={classes.background}> */}
                      <Typography color="inherit" display="inline">
                        <Box fontWeight="fontWeightBold" m={0.5}>
                          Bids
                        </Box>
                      </Typography>
                      {/* </Paper> */}
                      {/* <Paper elevation="0"> */}
                      <Typography color="inherit" display="inline">
                        <Box m={0.5}>
                          {currentItem && currentItem.bidHistory ? (
                            currentItem.bidHistory.length
                          ) : (
                            <div></div>
                          )}
                        </Box>
                      </Typography>
                      {/* </Paper> */}
                    </div>
                  </Grid>
                </Grid>
              </Paper>
              {/* </Grid> */}
              <br />
              {/* Comment Section */}
              <Grid item xs={12}>
                <Typography variant="h5">
                  <b>Comments & Bids</b>
                </Typography>
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
                          message: "Cannot enter an empty comment",
                        },
                        required: "Comment cannot be empty 🤷🏻‍♂️",
                      })}
                      InputProps={
                        ({ className: classes.textinput },
                        {
                          endAdornment: (
                            <div>
                              {auth && auth.isAuthenticated ? (
                                <IconButton
                                  color="primary"
                                  className={classes.iconButton}
                                  type="submit"
                                  disabled={!!errors2.text}
                                >
                                  <ArrowDownwardIcon />
                                </IconButton>
                              ) : (
                                <LoginModalComment />
                              )}
                            </div>
                          ),
                        })
                      }
                      error={!!errors2.text}
                    />
                  </div>
                </form>
                {errors2.text && (
                  <span
                    style={{ color: "red", fontWeight: "bold" }}
                    className={classes.error}
                  >
                    {errors2.text.message}
                  </span>
                )}
              </Grid>
              {/* <Grid item xs={12}>
            </Grid> */}
            </Grid>
            <Grid>
              <CommentsAndBids commentsandbids={commentsandbids} />
            </Grid>
          </Grid>
          <Grid item md={3}>
            <EndingSoon />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentItem: state.item.currentItem,
  item: state.item,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getItemById,
  setCurrentItem,
  bidOnItem,
  commentItem,
  updateItemEndDate,
  paymentIntent,
})(ListingDetails);
