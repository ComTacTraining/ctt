import FirstAlarm from '@/components/Evolution/AdminPanel/FirstAlarm'
import Log from '@/components/Evolution/AdminPanel/Log'
import Skip from '@/components/Evolution/AdminPanel/Skip'
import { Subtitle1 } from '@/mui/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Box from '@material-ui/core/Box'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FastForwardIcon from '@material-ui/icons/FastForward'
import ListIcon from '@material-ui/icons/List'
import PeopleIcon from '@material-ui/icons/People'

const AdminPanel = ({ isDemo = false }) => {
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
          <Subtitle1>First Alarm</Subtitle1>
        </AccordionSummary>
        <AccordionDetails>
          <FirstAlarm />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='command-content'
          id='command-header'>
          <Box mr={1}>
            <FastForwardIcon />
          </Box>
          <Subtitle1>Skip To Section</Subtitle1>
        </AccordionSummary>
        <AccordionDetails>
          <Skip isDemo={isDemo} />
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
