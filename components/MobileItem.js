import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Icon from '@material-ui/core/Icon'
import ListItemText from '@material-ui/core/ListItemText'
import Link from './Link'

const MobileItem = ({ href, title, fa, ...others }) => {

  return (
    <>
      {href ? (
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
      ) : (
        <ListItem button {...others}>
          <>
            {fa && (
              <ListItemIcon>
                <Icon className={`fas ${fa}`} color="primary" />
              </ListItemIcon>
            )}
            <ListItemText primary={title} />
          </>
        </ListItem>
      )}
    </>
  )
}

MobileItem.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  fa: PropTypes.string
}

export default MobileItem