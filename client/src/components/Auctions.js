import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Container } from "@material-ui/core/";
import { getItems } from "../flux/actions/itemActions";
import Listing from "./Listing";
import { isFuture, isPast } from "date-fns";
import FileUpload from "./FileUpload";

const Auctions = ({ getItems, item, searchTerm }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: 10,
      paddingTop: 10,
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    if (items.length === 0) getItems();
  }, [getItems]);

  const { items } = item;

  // console.log(searchTerm);

  const filterWatches = ({ brand }) => {
    return brand.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  };

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          {items
            .filter(filterWatches)
            .filter((opt) => isFuture(new Date(opt.endDate)))
            .map((item) => (
              <Listing item={item} key={item._id} />
            ))}
        </Grid>
        {items.filter((opt) => isPast(new Date(opt.endDate))).length === 0 ? (
          ""
        ) : (
          <div>
            <h1>Ended</h1>
            <Grid container spacing={2}>
              {items
                .filter((opt) => isPast(new Date(opt.endDate)))
                .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
                .map((item) => (
                  <Listing item={item} key={item._id} />
                ))}
            </Grid>
          </div>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  searchTerm: state.item.searchTerm,
  // auth: state.auth
});

export default connect(mapStateToProps, { getItems })(Auctions);
