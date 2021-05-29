import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const Selling = () => {

const useStyles = makeStyles(() => ({
        root: {
            flexGrow: 1,
            margin: 20,
        },
    }));

const classes = useStyles();

return(
    <div>
        <Typography variant="h5">Sell a Watch</Typography>
        <br/>
        <Typography>
        Selling on No Wait List is uber easy; we&rsquo;ve designed it that way.
        <br/><br/>
        <b>1. Submit Your Watch</b>
        <br/><br/>
        It&rsquo;s free to submit your watch. Send us a bit of info on your watch including some photos, and a brief description of the watch. You can list with or without a reserve. A reserve price is a minimum amount you&rsquo;ll accept to sell your watch. An interesting finding shows that auctions (no matter the item being sold) offered with no reserve get more bids, more interest, and more attention. The reason being is that the item will sell no matter what and this seems to have a positive effect on perspective buyers.
        <br/><br/>
        If you choose to have a reserve on your auction; we&rsquo;ll ask you to suggest a reserve price based on market conditions. We might ask for a lower price before accepting your watch. All of our auctions start from $0, regardless of whether or not there is a reserve.
        Our knowledgeable team will review your submission and may ask you some follow-up questions. We aim to respond to you within a business day. No Wait List is a focused auction site, so not every watch will be accepted, but we always appreciate you taking the time to submit your watch to us!
        <br/><br/>
        <b>2. Prep Your Listing
        </b>
        <br/><br/>
        After your watch is accepted, we&rsquo;ll ask for a bit more details from you: photos, service, ownership history, etc. We are just a click away if you have any questions or concerns.
        <ul>
            <li>If you decide to sell on No Wait List, your watch must not be for sale elsewhere. That means you&rsquo;ll have to remove any other ads for your watch. Also, you cannot accept offers outside of the auction.</li>
            <br/>
            <li>Excellent pictures will fetch a higher sales price. Either do it yourself (here are some guides) or hire a pro. Make sure to review our guide before submitting your pictures.</li>
            <br/>
            <li>Taking a quick video of your watch is recommended. You can use your phone in landscape mode and upload to YouTube or Vimeo.</li>
            <br/>
            <li>If you have a loan on the watch, review the process and timeline for paying it off with your lender.</li>
            <br/>
            <li>Finally, if you&rsquo;re listing without a reserve, we will put your listing together for FREE. However, if you require a &ldquo;Reserve Price&rdquo;, you&rsquo;ll pay No Wait List a non-refundable listing fee of $49.</li>
        </ul>
        <b>3. Before Going Live</b>
        <br/><br/>
        After all you&rsquo;ve sent us all the required information, plus payment (if required), we&rsquo;ll draft up your listing for your approval. Once you review and sign off on the draft, we&rsquo;ll work together to figure out when to take your auction live.&nbsp;
        <br/><br/>
        <b>4. Participate in the Auction</b>
        <br/>
        <ul>
            <li>Active participation in your auction will lead to more interest, increased bidding and a higher sale price. Make sure to respond to comments and questions in a timely and positive manner. You can also provide additional pictures or videos if requested.</li>
            <li>Bidders can contact you directly using the &ldquo;Contact Seller&rdquo; feature, if they wish to ask questions.</li>
        </ul>
        <b>5. Auction Close</b>
        <br/><br/>
        After your auction has closed, you&rsquo;ll receive the buyer&rsquo;s contact information and vice-versa, to finalize the sale.
        Reserve Price: If your auction had a reserve and it wasn&rsquo;t met, we&rsquo;ll reach out to you and the highest bidder to see if we can help make a deal!
        <br/><br/>
        </Typography>
    </div>
)
}

export default Selling;