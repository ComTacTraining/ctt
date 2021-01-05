import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Icon from '@material-ui/core/Icon'
import ListItemText from '@material-ui/core/ListItemText'
import Link from 'components/Link'

const MenuItem = ({ href, title, fa, ...others }) => {

  return (
    <ListItem button component={Link} href={href} {...others}>
      <>
        {fa && (
          <ListItemIcon>
            <Icon className={`fas ${fa}`} color="primary" />
          </ListItemIcon>
        )}
        <ListItemText primary={title} />
      </>
    </ListItem>
  )
}

MenuItem.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  fa: PropTypes.string
}

export default MenuItem