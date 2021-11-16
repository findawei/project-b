import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Container, Typography, Button } from "@material-ui/core/";
import { getItems, clearSearch } from "../flux/actions/itemActions";
import Listing from "./Listing";
import { isFuture, isPast } from "date-fns";
import FileUpload from "./FileUpload";
import Alert from "@material-ui/lab/Alert";

const Auctions = ({ getItems, item, searchTerm, clearSearch }) => {
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

  useEffect(() => {
    if (items.length === 0) getItems();
  }, [getItems]);

  const { items } = item;

  const handleClick = () => {
    clearSearch();
  };

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          {items
            .filter((watch) => {
              return (
                watch.brand.toLowerCase().indexOf(searchTerm.toLowerCase()) >=
                  0 ||
                watch.model.toLowerCase().indexOf(searchTerm.toLowerCase()) >=
                  0 ||
                watch.reference_number
                  .toLowerCase()
                  .indexOf(searchTerm.toLowerCase()) >= 0
              );
            })
            .filter((opt) => isFuture(new Date(opt.endDate)))
            .map((item) => (
              <Listing item={item} key={item._id} />
            ))}
          {searchTerm &&
          items
            .filter((watch) => {
              return (
                watch.brand.toLowerCase().indexOf(searchTerm.toLowerCase()) >=
                  0 ||
                watch.model.toLowerCase().indexOf(searchTerm.toLowerCase()) >=
                  0 ||
                watch.reference_number
                  .toLowerCase()
                  .indexOf(searchTerm.toLowerCase()) >= 0
              );
            })
            .filter((opt) => isFuture(new Date(opt.endDate))).length === 0 ? (
            <div className={classes.alert}>
              <Alert
                severity="info"
                color="info"
                action={
                  <Button color="inherit" size="small" onClick={handleClick}>
                    <a
                      style={{ textDecoration: "none", color: "inherit" }}
                      href={`mailto:support@nowaitlist.co?subject=Search%20Request&body=I%20am%20looking%20for%3A%0D%0A${searchTerm}%0D%0A%0D%0AThanks!`}
                    >
                      Yes
                    </a>
                  </Button>
                }
              >
                We didn't find it, want me to ask around?
              </Alert>
            </div>
          ) : (
            ""
          )}
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

export default connect(mapStateToProps, { getItems, clearSearch })(Auctions);
