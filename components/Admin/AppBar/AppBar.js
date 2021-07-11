import SubMenu from './SubMenu'

const AdminAppBar = () => {
  return (
    <>
      <SubMenu title='Visitors' links={[{ name: 'Welcome', route: '/' }]} />
      <SubMenu title='Guest' links={[{ name: 'Demo', route: '/demo' }, { name: 'Subscribe', route: '/subscribe' }]} />
      <SubMenu title='Member' links={[
        { name: 'Profile', route: '/profile' },
        { name: 'Commercial', route: '/evolution/commercial' },
        { name: 'Industrial', route: '/evolution/industrial' },
        { name: 'Single Family', route: '/evolution/single-family' },
        { name: 'Multi Fmaily', route: '/evolution/multi-family' }
      ]} />
      <SubMenu title='Admin' links={[
        { name: 'Reviews', route: '/admin/reviews' },
        { name: 'Evolutions', route: '/admin/evolutions' },
        { name: 'Incidents', route: '/admin/incidents' },
        { name: 'Debug', route: '/admin/debug' }
      ]} />
    </>
  )
}

export default AdminAppBar