import React , { useEffect } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Container } from '@material-ui/core/'
import {getItems} from '../flux/actions/itemActions'
import Listing from './Listing'
import {isFuture, isPast} from "date-fns";
import FileUpload from './FileUpload';

const Auctions = ({getItems, item}) => {


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 10,
        paddingTop: 10
    },
}));

const classes = useStyles();

  useEffect(() => { 
    getItems(); 
  }, [getItems]);
 
  const { items } = item;



  return (
    <div 
    className={classes.root}
    >
    <Container> 
    <Grid container spacing={2}>
      {items.filter(opt => isFuture(new Date(opt.endDate))).map(item => <Listing 
          item={item} 
          key={item._id}/>
          )}
    </Grid>
    <h1>Ended</h1>
    <Grid container spacing={2}>
      {items.filter(opt => isPast(new Date(opt.endDate))).map(item => <Listing 
          item={item} 
          key={item._id}/>
          )}
    </Grid>
    </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  item: state.item
  // auth: state.auth
});

export default connect(mapStateToProps, { getItems })(Auctions);