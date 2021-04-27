import React , { useEffect } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box } from '@material-ui/core';


const Faq = () => {


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
            <h1>What's No Wait List?</h1>
            <Divider />
            <Box fontWeight="fontWeightBold" py={1}>Cool Watch Auctions</Box>
        </Typography>
    </div>
    )
}

export default connect(null, {})(Faq);