import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const About = () => {

const useStyles = makeStyles(() => ({
        root: {
            flexGrow: 1,
            margin: 20,
        },
    }));

const classes = useStyles();

return(
    <div>
        <Typography variant="h4">About us</Typography>
        <br/>
        <Typography>
        Over the last few years, many watch enthusiasts have started turning their attention to recent watches from the 1980s, 1990s, and beyond. Alex Benjamignan, a watch enthusiast realized that there isn’t a specific place focused solely on the buying and selling of these vintage & modern watches, but there should be – so he created No Wait List.
        <br/><br/>
        No Wait List is the best online auction marketplace to buy and sell vintage & modern watches; pretty much anything cool spanning from 1980’s to today. To us, “cool” ranges from the obvious (a Rolex Submariner 5513 or an Audemars Piguet Royal Oak) to the esoteric (a pristine Chrono Tokyo Chronograph or a Konstantin Chaykin “Joker Watch”) to the traditional fun watches that enthusiasts love (an Omega Speedmaster Professional or a Tudor Black Bay). Basically everything that’s exciting, fun, interesting, or quirky is welcome here – as long as it comes from the modern era.

        Although there are many places to buy and sell a watch, No Wait List offers significant advantages over other websites.
        <br/><br/>
        <b>Here are just a few of our benefits:</b>
        <ul>
            <li><b>We’re focused on enthusiast watches</b> from the 1980s to the 2020s. That means anyone interested in the next era of exciting watches will come here first to buy and sell.</li>
            <li><b>Our fees are low.</b> The buyer’s fee is 5%, with a minimum of $250 and a maximum of $5,000 – far below other auction houses and enthusiast watch auction websites. Our seller’s fee range from $0 for a no-reserve auction to $49 for a seller with a reserve auction.</li>
            <li>While other watch auctions take weeks or even months to get your watch listed and available to buyers, <b>we’ll get your watch listed quickly</b> – and we’ll even take your input on scheduling your watch’s auction.</li>
            <li><b>No Wait List makes it easy to submit your watch for sale.</b> We value your time by asking for only a few crucial details before letting you know whether or not we’re accepting your watch. That means you don’t have to waste your time providing initial information only to have your watch rejected.</li>
            <li><b>No Wait List is the most user-friendly online wristwatch marketplace</b>, with easy sorting and searching – and simplified auctions that tell you exactly what you need to know about each watch.</li>
        </ul>
        </Typography>
    </div>
)
}

export default About;