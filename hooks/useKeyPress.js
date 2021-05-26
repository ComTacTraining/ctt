import * as React from 'react'

const useKeyPress = (targetCode, preventDefault = false) => {
  const [keyPressed, setKeyPressed] = React.useState(false)

  React.useEffect(() => {
    const downHandler = (event) => {
      if (event.code === targetCode) {
        setKeyPressed(true)
      }
      // if (event.code === 'Space') {
      //   event.preventDefault()
      // }
    }

    const upHandler = (event) => {
      if (preventDefault) {
        event.preventDefault()
      }
      if (event.code === targetCode) {
        setKeyPressed(false)
      }
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetCode, preventDefault])

  return keyPressed
}

export default useKeyPress
