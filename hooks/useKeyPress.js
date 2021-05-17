import * as React from 'react'
import { useSelector } from 'react-redux'

const useKeyPress = (targetCode, preventDefault = false) => {
  const { usingMic } = useSelector((state) => state.user)
  const [keyPressed, setKeyPressed] = React.useState(false)
  const [isListening, setIsListening] = React.useState(false)

  React.useEffect(() => {
    const downHandler = (event) => {
      if (event.code === targetCode) {
        setKeyPressed(true)
      }
      if (event.code === 'Space') {
        event.preventDefault()
      }
    }

    const upHandler = (event) => {
      if (preventDefault) {
        event.preventDefault()
      }
      if (event.code === targetCode) {
        setKeyPressed(false)
      }
    }

    if (usingMic) {
      window.addEventListener('keydown', downHandler)
      window.addEventListener('keyup', upHandler)
      setIsListening(true)
    } else if (isListening) {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
      setIsListening(false)
    }

    return () => {
      if (isListening) {
        window.removeEventListener('keydown', downHandler)
        window.removeEventListener('keyup', upHandler)
      }
    }
  }, [targetCode, preventDefault, usingMic, isListening])

  return keyPressed
}

export default useKeyPress
