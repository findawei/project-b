import React, { useEffect } from "react";
import Hero from "./Hero";
import Auctions from "./Auctions";
import { makeStyles } from "@material-ui/core/styles";
import SellerSection from "./SellerSection";

const Home = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: 10,
      paddingTop: 10,
    },
    alert: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Hero />
      <SellerSection />
      <Auctions />
    </div>
  );
};

export default Home;
