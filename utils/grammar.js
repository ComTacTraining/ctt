import { split, Syntax } from 'sentence-splitter'

const escapeRegExp = (string) => {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const replaceAll = (str, find, replace) => {
  return typeof str === String
    ? str.replace(new RegExp(escapeRegExp(find), 'g'), replace)
    : str
}

const getSentences = (str) =>
  split(str.toLowerCase())
    .filter((child) => child.type === Syntax.Sentence)
    .map((node) => node.raw.toUpperCase())

const swapWords = (str, find, replace) => {
  let i = 0,
    regex = [],
    map = {}
  for (i; i < find.length; i++) {
    regex.push(find[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, '\\$1'))
    map[find[i]] = replace[i]
  }
  regex = regex.join('|')
  str = str.replace(new RegExp(`\b(${regex})\b`, 'g'), (match) => {
    return map[match]
  })
  return str
}

const swapPhrases = (str, find, replace) => {
  const charsToEscape = /([-[\]{}()*+?.\\^$|#,])/g
  const escaped = '\\$1'
  let i = 0,
    regex = [],
    map = {}
  for (i; i < find.length; i++) {
    regex.push(find[i].replace(charsToEscape, escaped))
    map[find[i]] = replace[i]
  }
  regex = regex.join('|')
  str = str.replace(new RegExp(`${regex}`, 'g'), (match) => {
    return map[match]
  })
  return str
}

const wordsFromPhrase = (phrase) => {
  return phrase.match(/\b(\w+)\b/g)
}

const swapNumbers = (phrase) => {
  const words = wordsFromPhrase(phrase.toUpperCase())
  const result = words.map((word) => {
    switch (word) {
      case 'ZERO':
        return '0'
      case 'ONE':
        return '1'
      case 'TWO':
      case 'TO':
      case 'TOO':
        return '2'
      case 'THREE':
        return '3'
      case 'FOUR':
        return '4'
      case 'FIVE':
        return '5'
      case 'SIX':
        return '6'
      case 'SEVEN':
        return '7'
      case 'EIGHT':
        return '8'
      case 'NINE':
        return '9'
      default:
        return word
    }
  })
  return result.join(' ')
}

const strToWords = (str) => {
  // Split by words and dump whitespace
  const splitWords = str.split(/\s*\b\s*/g)
  let contraction = ''
  let words = []
  // Fix contractions with apostrophe
  splitWords.forEach((currWord, i) => {
    const contractionPart =
      splitWords.length >= i + 2 && splitWords[i + 1] === `'`
        ? `${currWord}'`
        : ''
    if (currWord === `'`) {
      // do nothing
    } else if (contraction !== '') {
      words.push(`${contraction}${currWord}`)
      contraction = ''
    } else {
      if (contractionPart !== '') {
        contraction = contractionPart
      } else {
        words.push(currWord)
      }
    }
  })
  return words
}

export {
  getSentences,
  swapWords,
  swapPhrases,
  swapNumbers,
  replaceAll,
  strToWords
}
