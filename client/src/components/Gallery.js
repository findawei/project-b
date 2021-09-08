import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper
    flexGrow: 1,
  },
  // thumbnail: {
  //   height: 50,
  // },
  hero: {
    borderRadius: 3,
    minHeight: 300,
    maxHeight: 650,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const Gallery = ({ img }) => {
  const classes = useStyles();

  // const [clickedImg, setClickedImg] = useState()

  // useEffect(()=>{
  //   if(img && img[0]){
  //     setClickedImg(img[0].url)
  //   }
  // },[img])

  return (
    <div className={classes.root}>
      <Carousel infiniteLoop emulateTouch useKeyboardArrows>
        {img &&
          img.map((tile) => (
            <div key={tile.id}>
              <img
                src={tile.url}
                alt={tile.title}
                // className={classes.thumbnail}
                // onClick={()=>setClickedImg(tile.url)}
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
