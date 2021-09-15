import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Container } from "@material-ui/core/";
import Listing from "../Listing";
import { getItemsForReview } from "../../flux/actions/itemActions";

const ForReview = ({ getItemsForReview, item }) => {
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

  const { items_review } = item;

  return (
    <div className={classes.root}>
      {items_review.length === 0 ? (
        ""
      ) : (
        <div>
          <h1>For Review (not live)</h1>
        </div>
      )}

      <Grid container spacing={2}>
        {items_review.map((items_review) => (
          <Listing item={items_review} key={items_review._id} />
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  // auth: state.auth
});

export default connect(mapStateToProps, { getItemsForReview })(ForReview);
