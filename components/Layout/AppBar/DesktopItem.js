import Link from '@/components/UI/Link'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
    color: theme.palette.primary.contrastText
  }
}))

const DesktopItem = ({ href, title, ...others }) => {
  const classes = useStyles()
  return (
    <Link
      variant='button'
      color='textPrimary'
      href={href ? href : null}
      className={classes.link}
      {...others}>
      {title}
    </Link>
  )
}

DesktopItem.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string
}

export default DesktopItem
