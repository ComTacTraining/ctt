import Simulation from '@/components/Simulation/Simulation'
import { evolutionByCategoryNumber } from '@/graphql/queries'
import * as evolutionActions from '@/store/actions/evolution'
import { API } from 'aws-amplify'
import PropTypes from 'prop-types'
import * as React from 'react'
import { useDispatch } from 'react-redux'

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomConstruction = () => {
  const construction = randomInteger(0, 1)
  return construction ? 'legacy' : 'modern'
}

const randomId = (category, construction) => {
  if (category === 'commercial') {
    return randomInteger(1, construction === 'legacy' ? 65 : 100)
  } else if (category === 'industrial') {
    return randomInteger(1, construction === 'legacy' ? 40 : 40)
  } else if (category === 'multi-family') {
    return randomInteger(1, construction === 'legacy' ? 60 : 60)
  } else if (category === 'single-family') {
    return randomInteger(1, construction === 'legacy' ? 65 : 95)
  } else {
    return 0
  }
}

const Evolution = ({ category }) => {
  const dispatch = useDispatch()
  const [evolutionId, setEvolutionId] = React.useState(null)
  const [queryCategory, setQueryCategory] = React.useState(null)
  const [queryNumber, setQueryNumber] = React.useState(0)

  React.useEffect(() => {
    const construction = randomConstruction()
    const id = randomId(category, construction)
    let evoId = ''
    let evoCat = ''
    if (category === 'commercial') {
      evoId = 'c'
      evoCat = 'COMMERCIAL'
    } else if (category === 'industrial') {
      evoId = 'i'
      evoCat = 'INDUSTRIAL'
    } else if (category === 'multi-family') {
      evoId = 'mf'
      evoCat = 'MULTIFAMILY'
    } else if (category === 'single-family') {
      evoId = 'sf'
      evoCat = 'SINGLEFAMILY'
    }
    if (construction === 'modern') {
      evoId = `${evoId}m${id}`
      evoCat = `${evoCat}MODERN`
    } else {
      evoId = `${evoId}l${id}`
      evoCat = `${evoCat}LEGACY`
    }
    setEvolutionId(evoId)
    setQueryCategory(evoCat)
    setQueryNumber(id)
  }, [category])

  React.useEffect(() => {
    const getEvolution = async () => {
      try {
        const request = await API.graphql({
          query: evolutionByCategoryNumber,
          variables: {
            category: queryCategory,
            number: { eq: queryNumber }
          }
        })
        const [evo] = request.data.evolutionByCategoryNumber.items
        const evoData = { ...evo, alias: evolutionId }
        dispatch(evolutionActions.updateEvolution(evoData))
      } catch (e) {
        console.error(e)
      }
    }

    if (
      evolutionId &&
      queryNumber !== 0 &&
      queryCategory !== 'LEGACY' &&
      queryCategory !== 'MODERN'
    ) {
      getEvolution()
    }
  }, [evolutionId, queryCategory, queryNumber, dispatch])

  return <>{evolutionId && <Simulation />}</>
}

Evolution.propTypes = {
  category: PropTypes.string
}

export default Evolution
