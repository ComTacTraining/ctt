import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  // updateScrollingText,
  addToSpeechQueue
} from 'store/actions/ai'
import { options } from 'utils/ai'
import { educationTitles, getEducationPhrases } from 'utils/education'

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
        const isLastPhrase = phrases.length - 1 === i
        const matchesTitle = educationTitles.includes(phrase)
        const meta = isLastPhrase ? 'EDUCATION_COMPLETED' : matchesTitle ? 'SPEAK_WITH_OVERLAY' : null
        dispatch(
          addToSpeechQueue({
            label: '[Education]',
            text: phrase,
            voice: educationVoice,
            meta
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
