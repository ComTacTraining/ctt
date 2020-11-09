import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const RefundPolicy = () => {
  return (
    <>
      <Typography variant="h3">Refund Policy</Typography>
      <Typography paragraph>
        Our policy lasts 30 days. If 30 days have gone by since your purchase,
        unfortunately we can’t offer you a refund or exchange.
      </Typography>
      <Typography paragraph>
        To be eligible for a return, your item must be unused.
      </Typography>
      <Typography paragraph>
        Several types of goods are exempt from being returned. Perishable goods
        such as, newspapers or magazines cannot be returned. Additional
        non-returnable items:
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon>
            <ArrowRightIcon />
          </ListItemIcon>
          <ListItemText>Gift cards</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ArrowRightIcon />
          </ListItemIcon>
          <ListItemText>Downloadable software products</ListItemText>
        </ListItem>
      </List>

      <Typography paragraph>
        To complete your return, we require a receipt or proof of purchase.
      </Typography>
      <Typography paragraph>
        Please do not send your purchase back to the manufacturer.
      </Typography>
      <Typography paragraph>
        There are certain situations where only partial refunds are granted:
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon>
            <ArrowRightIcon />
          </ListItemIcon>
          <ListItemText>Book with obvious signs of use</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ArrowRightIcon />
          </ListItemIcon>
          <ListItemText>
            CD, DVD, VHS tape, software, video game, cassette tape, or vinyl
            record that has been opened.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ArrowRightIcon />
          </ListItemIcon>
          <ListItemText>
            Any item not in its original condition, is damaged or missing parts
            for reasons not due to our error.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ArrowRightIcon />
          </ListItemIcon>
          <ListItemText>
            Any item that is returned more than 30 days after delivery.
          </ListItemText>
        </ListItem>
      </List>

      <Typography variant="h5">Refunds</Typography>
      <Typography paragraph>
        Once your refund request is received, we will send you an email to
        notify you that we have received your request. We will also notify you
        of the approval or rejection of your refund.
      </Typography>
      <Typography paragraph>
        If you are approved, then your refund will be processed, and a credit
        will automatically be applied to your credit card or original method of
        payment, within 30 days.
      </Typography>

      <Typography variant="h5">Late or missing refunds</Typography>
      <Typography paragraph>
        If you haven’t received a refund yet, first check your bank account
        again. Then contact your credit card company, it may take some time
        before your refund is officially posted. Next contact your bank. There
        is often some processing time before a refund is posted. If you’ve done
        all of this and you still have not received your refund yet, please
        contact us at{" "}
        <Link href="mailto:janet@comtactraining.com">
          janet@comtactraining.com
        </Link>
        .
      </Typography>

      <Typography variant="h5">Sale items</Typography>
      <Typography paragraph>
        Only regular priced items may be refunded, unfortunately sale items
        cannot be refunded.
      </Typography>

      <Typography variant="h5">Exchanges</Typography>
      <Typography paragraph>
        If you need to exchange it for the same item, send us an email
        janet@comtactraining.com and we will ensure your membership is working
        properly.
      </Typography>
    </>
  );
};

export default RefundPolicy;
