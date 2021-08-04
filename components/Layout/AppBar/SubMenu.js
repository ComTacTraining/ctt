import DesktopItem from '@/components/Layout/AppBar/DesktopItem'
import Link from '@/components/UI/Link'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import * as React from 'react'

const SubMenu = ({ title, links }) => {
  const [anchor, setAnchor] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  const close = () => {
    setOpen(false)
    setAnchor(null)
  }

  const key = JSON.stringify(title)

  return (
    <>
      <DesktopItem
        key={key}
        href='#'
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
          setAnchor(e.currentTarget)
        }}
        title={title}
      />
      <Menu
        id={`${key}-appbar`}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={close}>
        {links.map(({ name, route }) => (
          <MenuItem key={`${key}-${JSON.stringify(name)}`}>
            <Link href={route} onClick={close}>
              {name}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default SubMenu
