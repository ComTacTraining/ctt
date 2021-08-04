const wordsFromPhrase = (phrase) => {
  return phrase.match(/\b(\w+)\b/g)
}

const replaceSpelledOutNumbers = (command) => {
  const words = wordsFromPhrase(command.toLowerCase())
  const result = words.map((word) => {
    switch (word) {
      case 'zero':
        return '0'
      case 'one':
        return '1'
      case 'two':
      case 'to':
      case 'too':
        return '2'
      case 'three':
        return '3'
      case 'four':
        return '4'
      case 'five':
        return '5'
      case 'six':
        return '6'
      case 'seven':
        return '7'
      case 'eight':
        return '8'
      case 'nine':
        return '9'
      default:
        return word
    }
  })
  return result.join(' ')
}

export { replaceSpelledOutNumbers }
