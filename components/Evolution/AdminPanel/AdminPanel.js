import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
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
