import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  // updateScrollingText,
  addToSpeechQueue
} from 'store/actions/ai'
import { getEducationPhrases } from 'utils/education'
import { options } from 'utils/ai'

const Education = () => {
  const { educationVoice } = options
  const dispatch = useDispatch()
  const { faceToFaceCompleted, educationCompleted } = useSelector(
    (state) => state.ai
  )
  const {
    size,
    stories,
    occupancy,
    conditions,
    construction,
    entryEgress,
    survivability,
    fire,
    exhaust,
    flow,
    smoke,
    category
  } = useSelector((state) => state.evolution)
  const { firstOnScene } = useSelector((state) => state.user)

  useEffect(() => {
    if (faceToFaceCompleted && !educationCompleted) {
      const phrases = getEducationPhrases({
        firstOnScene,
        size,
        stories,
        occupancy,
        conditions,
        construction,
        entryEgress,
        survivability,
        fire,
        flow,
        exhaust,
        smoke,
        category
      })
      // dispatch(updateScrollingText(phrases))
      phrases.map((phrase, i) => {
        dispatch(
          addToSpeechQueue({
            label: '[Education]',
            text: phrase,
            voice: educationVoice,
            meta: phrases.length - 1 === i ? 'EDUCATION_COMPLETED' : null
          })
        )
      })
    }
  }, [
    faceToFaceCompleted,
    educationCompleted,
    firstOnScene,
    size,
    stories,
    occupancy,
    conditions,
    construction,
    entryEgress,
    survivability,
    fire,
    flow,
    exhaust,
    smoke,
    category,
    dispatch
  ])

  return <div></div>
}

export default Education
