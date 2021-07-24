import React , { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Container } from '@material-ui/core/'
import Listing from '../Listing'
import { getItemsForReview } from '../../flux/actions/itemActions';

const ForReview = ({getItemsForReview, item_review}) => {

const [haveListings, setHaveListings] = useState(false);

const useStyles = makeStyles((theme) => ({
    // root: {
    //     flexGrow: 1,
    //     margin: 10,
    //     paddingTop: 10
    // },
}));

const classes = useStyles();

  useEffect(() => { 
    getItemsForReview(); 
  }, [getItemsForReview]);
 
  const { items_review } = item_review;

console.log(items_review)

  return (
    <div className={classes.root}>
     {items_review.length === 0? 
     ''
       : 
       <div>
       <h1>For Review (not live)</h1>
       </div> 
       }
        
    <Grid container spacing={2}>
      {items_review.map(item_review => <Listing 
          item={item_review} 
          key={item_review._id}/>
          )}
    </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  item_review: state.item_review
  // auth: state.auth
});

export default connect(mapStateToProps, { getItemsForReview })(ForReview);