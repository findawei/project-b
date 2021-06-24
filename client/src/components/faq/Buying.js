import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const Buying = () => {

const useStyles = makeStyles(() => ({
        root: {
            flexGrow: 1,
            margin: 20,
        },
    }));

const classes = useStyles();

return(
    <div>
        <Typography variant="h5">Buy a Watch</Typography>
        <br/>
        <Typography>
        <b>1. Register</b>
        <br/><br/>
        In order to place bids and contact sellers directly, you must first Register to Bid using a valid credit card and phone number. Auction winners pay No Wait List a 5% buyer&rsquo;s fee on top of the winning bid amount (minimum of $250, maximum of $5,000).
        <br/><br/>
        <b>2. Know what you're buying</b>
        <br/><br/>
        Perform your own due diligence and make sure that the watch you&rsquo;re considering is right for you before placing a bid.&nbsp;
        <ul>
            <li>Review the listing thoroughly, including known flaws, service history, photos, etc.&nbsp;</li>
            <br/>
            <li>Ask the seller &ndash; via comments, Seller Q&amp;A, or the &ldquo;Contact&rdquo; feature &ndash; any questions that you may have about the watch.</li>
        </ul>
        <br/>
        <b>3. Figure out Logistics & Shipping</b>
        <br/><br/>
        To make sure there are no surprises, organize the following prior to placing a bid.&nbsp;
        <ul>
            <li>If you&rsquo;re financing this purchase, get your financing approved ahead of time.&nbsp;</li>
            <br/>
            <li>Discuss shipping with the seller</li>
        </ul>
        <br/>
        <b>4. Place a Bid</b>
        <ul>
            <li>A hold is placed on your credit card for the buyer&apos;s fee (5%) when you make a bid. Your card will be charged only if you win the auction and you will pay the seller directly for the watch. If you don&rsquo;t win the auction, the hold will be released at the auction&rsquo;s end.</li>
            <br/>
            <li>Only bid if you fully intend to purchase the watch and have performed your due diligence. There are no refunds.&nbsp;</li>
            <br/>
            <li>The auction goes on if bids keep coming in. Bids placed within the final minute of the auction will extend the end of the auction time by 1 minute &ndash; giving others the opportunity to bid.</li>
        </ul>
        <br/>
        <b>5. Winning</b>
        <br/><br/>
        In the case of a &ldquo;No Reserve&rdquo; auction, you&rsquo;ll win if your bid is the highest. In the case of an auction having a reserve, you must meet or exceed the seller&rsquo;s hidden &ldquo;Reserve&rdquo; price. Once the auction ends, you&rsquo;ll be electronically introduced to the seller in order to finalize the details and logistics of the transaction. You must pay the seller in-full for the watch within a week of the auction closing.
        </Typography>
    </div>
)
}

export default Buying;