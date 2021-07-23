import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Icon from '@material-ui/core/Icon'
import Link from '@material-ui/core/Link'
import { H3, H5, P } from 'mui/Typography'

const Refund = () => {
  return (
    <>
      <H3>Refund Policy</H3>
      <P>
        Our policy lasts 30 days. If 30 days have gone by since your purchase,
        unfortunately we can’t offer you a refund or exchange.
      </P>
      <P>
        To be eligible for a return, your item must be unused.
      </P>
      <P>
        Several types of goods are exempt from being returned. Perishable goods
        such as, newspapers or magazines cannot be returned. Additional
        non-returnable items:
      </P>

      <List>
        <ListItem>
          <ListItemIcon>
            <Icon className="fas fa-arrow-right" />
          </ListItemIcon>
          <ListItemText>Gift cards</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon className="fas fa-arrow-right" />
          </ListItemIcon>
          <ListItemText>Downloadable software products</ListItemText>
        </ListItem>
      </List>

      <P>
        To complete your return, we require a receipt or proof of purchase.
      </P>
      <P>
        Please do not send your purchase back to the manufacturer.
      </P>
      <P>
        There are certain situations where only partial refunds are granted:
      </P>

      <List>
        <ListItem>
          <ListItemIcon>
            <Icon className="fas fa-arrow-right" />
          </ListItemIcon>
          <ListItemText>Book with obvious signs of use</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon className="fas fa-arrow-right" />
          </ListItemIcon>
          <ListItemText>
            CD, DVD, VHS tape, software, video game, cassette tape, or vinyl
            record that has been opened.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon className="fas fa-arrow-right" />
          </ListItemIcon>
          <ListItemText>
            Any item not in its original condition, is damaged or missing parts
            for reasons not due to our error.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon className="fas fa-arrow-right" />
          </ListItemIcon>
          <ListItemText>
            Any item that is returned more than 30 days after delivery.
          </ListItemText>
        </ListItem>
      </List>

      <H5>Refunds</H5>
      <P>
        Once your refund request is received, we will send you an email to
        notify you that we have received your request. We will also notify you
        of the approval or rejection of your refund.
      </P>
      <P>
        If you are approved, then your refund will be processed, and a credit
        will automatically be applied to your credit card or original method of
        payment, within 30 days.
      </P>

      <H5>Late or missing refunds</H5>
      <P>
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
      </P>

      <H5>Sale items</H5>
      <P>
        Only regular priced items may be refunded, unfortunately sale items
        cannot be refunded.
      </P>

      <H5>Exchanges</H5>
      <P>
        If you need to exchange it for the same item, send us an email
        janet@comtactraining.com and we will ensure your membership is working
        properly.
      </P> 
    </>
  )
}

export default Refund