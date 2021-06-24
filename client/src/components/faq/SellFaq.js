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

export default function SellFaq() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Typography variant="h5">Selling Questions</Typography>  
    <br/>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Does it cost anything to sell on No Wait List?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No, it's <b>FREE</b> to sell on No Wait List if your listing has "No Reserve". If you wish to have a "Reserve" price, there's a fee of $49.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>How does No Wait List pick watches?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We are focused on watches from 1980s and beyond. If you think your watch is special and cool even if it doesn't fit this criteria, try submitting your watch and we'll see if an exception can be made.
            <br/><br/>
            No Wait List is a focused auction site, so not every watch will be accepted, but we always appreciate you taking the time to submit your watch to us!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Can I sell from anywhere?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes! We do not have any restrictions on where you are located.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>How do I submit my watch?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Click the "Sell A Watch" link in the header.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>What info do you need about my watch?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To start off, we ask for the basics: 
            <ul>
            <li>Make</li>
            <li>Model</li>
            <li>Reference number</li>
            <li>Serial number</li>
            <li>Year</li>
            <li>Service history</li>
            <li>Pictures</li>
            </ul>
            We aim to ensure transparency. The more details you provide, the better we will be able to craft your listing. This includes any flaws or faults. We will contact you should we need more information.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>How do I increase the sale price of my watch?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Great pictures heavily influence the sale price of your watch.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Do I get to sign off on the listing?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Of course! Before the listing is live, we will send you a draft for approval. Only once you are happy with the listing does it go live.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Can I pick when my auction goes live?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We have an internal rolling schedule for auctions. If you have a preference for a certain week or start date we will try to accommodate you.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>How long will my auction be up?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            All our auctions are for 7 days.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Can I edit my auction after it's live?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can't directly edit your auction after it's live. Let us know what needs to be changed and we will take care of it. You can also add supplemental information in the comments.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Should I bother answering the comments?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, you should. Actively participating in the comments section has a positive effect on the sales price of the auction. The buyers are watch enthusiasts like yourself and are probably interested in purchasing your watch.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Can I have a reserve price on my auction?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, you can. This option has a fee of $49. It is possible that when you submit your <b>reserve</b> price we ask that you lower it. If we can't agree on a reserve price, we won't be able to list your watch.
            <br/><br/>
            If you decide to go <b>no reserve</b>, then you can list your watch <b>for FREE</b>.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Do I reveal my reserve price?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            It is recommended not to reveal your reserve price. Revealing a reserve price usually slows down bidding as it reaches the known reserve.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Can I make a deal outside No Wait List?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No. Watches listed on No Wait List are for sale only through the auction. If a buyer or seller tries to deal outside the auction, they will be <b>permanently banned</b> from No Wait List.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>What happens if my reserve isn't reached?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We will reach out to you with the highest bidder to see if we can work out a deal. If we can facilitate a deal between you and buyer, we will then introduce both parties to complete the deal.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>How do I get paid for my watch?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Once the auction has ended, we will introduce you and the buyer to complete the transaction. Payment can be made via wire transfer, paypal, escrow etc.
            <br/><br/>
            Whatever payment method you decide on, be sure to perform your due diligence. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>What if the buyer backs out?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            In the unlikely event that the buyer fails to complete the transaction, please notify us. The user will be permanently banned from No Wait List. They will also forfeit the buyer's fee.
            <br/><br/>
            In this event, we will work with you to sell your watch. We will reach out to the next highest bidder to work out a deal. If that fails, we can offer to relist your watch.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br/>
    </div>
  );
}
