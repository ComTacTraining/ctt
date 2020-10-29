import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const Question = ({ label, name, value, extended, onChange }) => {

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup row aria-label={name} name={name} value={value} onChange={onChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" labelPlacement="bottom" />
          <FormControlLabel value="no" control={<Radio />} label="No" labelPlacement="bottom" />
          {extended && (
            <>
            <FormControlLabel value="more" control={<Radio />} label="Some but not all, four or more" labelPlacement="bottom" />
            <FormControlLabel value="less" control={<Radio />} label="Some but not all, three or less" labelPlacement="bottom" />
            </>
          )}
          
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Question;