import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";

export default function Share() {
  const shareUrl = "http://github.com";
  const title = "GitHub";

  return (
    <div>
      <FacebookShareButton
        url={shareUrl}
        quote={title}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        url={shareUrl}
        appId="521270401588372"
        className="Demo__some-network__share-button"
      >
        <FacebookMessengerIcon size={32} round />
      </FacebookMessengerShareButton>

      <TelegramShareButton
        url={shareUrl}
        title={title}
        className="Demo__some-network__share-button"
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <WhatsappShareButton
        url={shareUrl}
        title={title}
        separator=":: "
        className="Demo__some-network__share-button"
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <RedditShareButton
        url={shareUrl}
        title={title}
        windowWidth={660}
        windowHeight={460}
        className="Demo__some-network__share-button"
      >
        <RedditIcon size={32} round />
      </RedditShareButton>
      <EmailShareButton
        url={shareUrl}
        subject={title}
        body="body"
        className="Demo__some-network__share-button"
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
}
