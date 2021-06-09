import React , { useEffect } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper } from '@material-ui/core/'
import {getItems, setCurrentItem} from '../flux/actions/itemActions'
import ListingEndingSoon from './ListingEndingSoon'
import {isFuture, isPast} from "date-fns";

const EndingSoon = ({getItems, item}) => {


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: -10,
        margin: 10,
    },
}));

const classes = useStyles();

  useEffect(() => { 
    getItems(); 
  }, [getItems]);
 
  const { items } = item;

// let currentItem = item.currentItem

  return (
    <div className={classes.root}>
        <h1>Ending Soon</h1>
    <Grid container spacing={2}>
        {items.filter(opt => 
        isFuture(new Date(opt.endDate)) &&
        item.currentItem._id !== opt._id
        ).map(item => <ListingEndingSoon 
            item={item} 
            key={item._id}/>
            )}
    </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  item: state.item
  // auth: state.auth
});

export default connect(mapStateToProps, { getItems })(EndingSoon);