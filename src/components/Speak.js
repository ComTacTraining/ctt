import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import TextToSpeech from './TextToSpeech';

const Speak = props => {
  const ai = useSelector(state => state.ai);
  const { waitingToBeSpoken } = ai;

  const [speech, setSpeech] = useState({text: '', voice: ''});

  useEffect(() => {

    if (waitingToBeSpoken.length > 0) {
      setSpeech({ text: waitingToBeSpoken[0].text, voice: waitingToBeSpoken[0].voice });
    }
  }, [waitingToBeSpoken]);

  return (
    <div className='Speak'>
      {speech.text !== '' && <TextToSpeech text={speech.text} voice={speech.voice} />}
    </div>
  );
};

export default Speak;
