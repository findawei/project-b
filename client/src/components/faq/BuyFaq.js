import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    flexGrow: 1,
    // margin: 20,
  },
  heading: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function BuyFaq() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Typography variant="h5">Buying Questions</Typography>  
    <br/>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>How do I bid?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You must be registered and provide a valid credit card to be able to place a bid. <b>Please note you cannot withdraw your bid once placed.</b>
            {/* We place a hold on each bidder’s credit card until the conclusion of the auction. */}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>What are the buying fees?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Once you have won the auction, you will be charged a 5% buyer's fee. You will then have to pay the purchase price to the seller. The minimum buyer's fee charge is $250 to a maximum of $5,000.
            <br/><br/>
            The fees don't include shipping or any other charges.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Bid increments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The bid increments are as follows:
            <br/><br/>
            <b>Minimum</b> bid of $100 to start the auction
            <br/>
            <b>$100</b> increments up to $14,999
            <br/>
            <b>$250</b> increments from $15,000 to $49,999
            <br/>
            <b>$500</b> increments after $50,000
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>What currency does No Wait List use?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No Wait List uses United States Dollars (USD) for all auctions.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Can I bid on a watch outside my country?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes! Bidding is open internationally. However, please remember to factor in import fees, taxes and any other duties when importing the watch to your country. Familiarize yourself with any charges or restriction relevant to your country before placing a bid.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Can I contact the seller directly?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes! Click on the "Contact Seller" on the auction page.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Do you allow proxy bidding (max bid)?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No. You do not have the option to set a maximum price. Whatever amount you bid will be applied to the auction immediately. Ie. if the current high-bid is $15,000 and you input a $17,000 bid, the current high bid will immediately go to $17,000.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Can other bidders 'snipe' at the end of an auction to outbid me?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No. We have setup a system to counter this problem. If a bid is placed within the final minute of the auction, an extra minute is added to the auction – giving others the opportunity to bid. As long as bids are coming in, the auction will stay open.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Why is there a hold on my card?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          We place a hold on your credit card when you bid in order to account for the possibility that you may have to pay the buyer’s fee, should you end up as the winning bidder. The hold is for 5% of your initial bid amount, with a minimum of $250 and a maximum of $5,000. If you aren’t the winning bidder, the hold is released from your credit card at the conclusion of the auction.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>What's the reserve price of the watch?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Unless being sold at ‘No Reserve’, all auction lots have a reserve. Reserve prices are not public. Please don't ask sellers about reserve pricing during the auction. You’ll know if the reserve is met if the watch sells at auction close.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>What if the reserve isn't met?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you’re the high bidder on a watch where the reserve isn’t met, we’ll work with you & the seller in an attempt to find a sale price that’s suitable for both parties. If we can reach an agreement, we’ll put you and seller in contact.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>How do I complete the transaction after the auction?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We will introduce you and the seller to complete the transaction. Read more about Finalizing the Transaction.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Does the buying fee inlude Shipping?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No, the buyer's fee is for using No Wait List only and does not include shipping, duties, insurance or any other costs associated.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br/>
    </div>
  );
}
