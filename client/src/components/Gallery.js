import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Gallery = ({ img }) => {
  const [clickedImg, setClickedImg] = useState();

  return (
    <Carousel infiniteLoop emulateTouch useKeyboardArrows dynamicHeight>
      {img &&
        img.map((tile) => (
          <img
            key={tile.id}
            src={tile.url}
            alt={tile.title}
            // className={classes.thumbnail}
            // onClick={() => setClickedImg(tile.url)}
          />
        ))}
    </Carousel>
  );
};

export default Gallery;
