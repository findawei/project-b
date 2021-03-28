import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper
    flexGrow: 1
    },
    thumbnail: {
      height: 50,
    },
    hero: {
      height: 300
    }
}));

const Gallery = ({img}) => {
  const classes = useStyles();

const [clickedImg, setClickedImg] = useState()

useEffect(()=>{
  if(img){
    setClickedImg(img[0].url)
  }
},[img])

  return (
    <div className={classes.root}>
      <img src={clickedImg} className={classes.hero}/>
      <Grid 
       container
       direction="row"
       justify="space-around"
       alignItems="center"
      >
           {img && img.map(tile => (
          <Grid item  key={tile.id} >
            <img 
              src={tile.url} 
              alt={tile.title} 
              className={classes.thumbnail}
              onClick={()=>setClickedImg(tile.url)}
              />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Gallery;