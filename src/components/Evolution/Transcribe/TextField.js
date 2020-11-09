import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MUITextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  updatePartialTranscript,
  updateCompletedTranscript,
  addToLog
} from "store/actions/ai";

const TextField = () => {
  const dispatch = useDispatch();
  const { firstOnScene } = useSelector(state => state.user);
  const [currentCommand, setCurrentCommand] = useState("");

  const handlePartialCommand = evt => {
    // console.log('TextField updated: ', evt.target.value);
    // const partialCommand = evt.target.value.replace(currentCommand, '');
    // dispatch(updatePartialTranscript(partialCommand));
    if (evt.target.value.charAt(evt.target.value.length - 1) === " ") {
      dispatch(updatePartialTranscript(evt.target.value));
    }
    setCurrentCommand(evt.target.value);
  };

  const handleCompletedCommand = evt => {
    evt.preventDefault();
    dispatch(updateCompletedTranscript(currentCommand));
    dispatch(
      addToLog({
        timestamp: Date.now(),
        label: firstOnScene,
        text: currentCommand
      })
    );
    setCurrentCommand("");
  };

  return (
    <form onSubmit={handleCompletedCommand}>
      <MUITextField
        fullWidth={true}
        multiline
        rowsMax={4}
        id="command"
        label="Command"
        value={currentCommand}
        onChange={handlePartialCommand}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default TextField;
