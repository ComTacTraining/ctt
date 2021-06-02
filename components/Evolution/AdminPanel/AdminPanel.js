import Box from '@material-ui/core/Box'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ListIcon from '@material-ui/icons/List'
import PeopleIcon from '@material-ui/icons/People'
import { Subtitle1 } from 'mui/Typography'

import Log from './Log'
import Units from './Units'

const AdminPanel = () => {
  return (
    <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='command-content'
          id='command-header'>
          <Box mr={1}>
            <PeopleIcon />
          </Box>
          <Subtitle1>Units</Subtitle1>
        </AccordionSummary>
        <AccordionDetails>
          <Units />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='log-content'
          id='log-header'>
          <Box mr={1}>
            <ListIcon />
          </Box>
          <Subtitle1>Log</Subtitle1>
        </AccordionSummary>
        <AccordionDetails>
          <Log />
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default AdminPanel
