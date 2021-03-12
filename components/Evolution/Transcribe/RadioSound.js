import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
// import Sound from 'react-sound';
import useSound from 'use-sound';
import chirpSoundSource from "../../../public/mdc1200.mp3";
import { Chip } from '@material-ui/core';


const RadioSound = () => {
    const dispatch = useDispatch();
    const { isListeningMicrophone, isRecordingMicrophone } = useSelector(state => state.ai)
    const [ play ] = useSound(chirpSoundSource);
    useEffect(() => {
        play();
        }, [isRecordingMicrophone]);



    return (
        <div id='Radio'>
            
        </div>
    )
}

export default RadioSound;