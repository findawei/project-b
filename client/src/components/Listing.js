import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { setCurrentItem} from '../flux/actions/itemActions';
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom';


const Listing = ({ item, setCurrentItem }) => {

    const setCurrent = (item) => {setCurrentItem(item);};
  
    function ItemView(){
      setCurrent(item);
    }

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
//   gridList: {
//     width: 500,
//     height: 450,
//   },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    image: {
        borderRadius: 3,
        height: 300
        }
}));
    const classes = useStyles();
    return (
              <Grid 
            item xs 
            className={classes.paper}
            onClick={ItemView}
            >
            <Link to={`/item/${item._id}`}>
            <img src={item.img} alt={item.brand} className={classes.image} />
            <h1>{item.brand}</h1>
            <p>{item.reference_number}</p>
            </Link>
          </Grid>
    );
  }

  export default connect(null, { setCurrentItem })(Listing);