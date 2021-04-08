import React , { useEffect } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box } from '@material-ui/core';
import StripeBox from "./stripe/StripeBox"
import GetCard from './stripe/GetCard';

const Settings = () => {


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
}));

const classes = useStyles();

return (
    <div className={classes.root}>
        <Typography component="div">
            <h1>Settings</h1>
            <Divider />
            <Box fontWeight="fontWeightBold" py={1}>Payment info for bidding</Box>
            <Box py={1}>Your card on file</Box>

        </Typography>
        <Divider />
        <GetCard />
        <Divider />
        <StripeBox/>
        <Divider />

    </div>
)
}

// const mapStateToProps = (state) => ({
//     // item: state.item
//     auth: state.auth
//   });

export default connect(null)(Settings);