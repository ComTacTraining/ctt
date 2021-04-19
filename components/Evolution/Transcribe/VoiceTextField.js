import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const VoiceTextField = () => {
    const {
        firstAlarmAnnounced,
        assignmentsCompleted,
        isPartialCommand,
        partialCommand,
        command,
        speechBotState
      } = useSelector(state => state.ai);

    return (
        <div id="speech-text">
            <h3>{speechBotState}</h3>
            <textarea
                rows="5" 
                cols="100" 
                readOnly 
                value={partialCommand}
                >
                {partialCommand}
            </textarea>
        </div>
    );

}

export default VoiceTextField;           