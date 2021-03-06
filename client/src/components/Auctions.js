import React , { useEffect } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Grid'
import {getItems} from '../flux/actions/itemActions'
import Listing from './Listing'
// import tileData from './tileData';

const Auctions = ({getItems, item}) => {


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
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

  useEffect(() => { 
    getItems(); 
  }, [getItems]);
 
  const { items } = item;

  return (
    <div 
    className={classes.root}
    >
    <Grid container spacing={1}>
      {items.map(item => <Listing 
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

export default connect(mapStateToProps, { getItems })(Auctions);