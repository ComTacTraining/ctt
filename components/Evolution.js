import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { API } from 'aws-amplify'
import { H3, P } from 'mui/Typography'
import Simulation from './Evolution/Evolution'

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useParams, useHistory } from "react-router-dom";
// import { Auth, API, graphqlOperation } from "aws-amplify";
// import Typography from "@material-ui/core/Typography";
// import {
//   getEvolution,
//   getIncident
//   // getProfile
// } from "graphql/queries";
// import Simulation from "components/Evolution/Evolution";
// import * as evolutionActions from "store/actions/evolution";
// // import * as userActions from "store/actions/user";

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

const randomCategory = () => {
  const categories = [
    { id: 1, building: 'commercial' }, 
    { id: 2, building: 'industrial' }, 
    { id: 3, building: 'multi-family' }, 
    { id: 4, building: 'single-family' }
  ]
  const randId = randomInteger(1, 4)
  const cat = categories.find(c => c.id === randId)
  return cat.building
}

const Evolution = ({ category = '', construction = '', id = 0 }) => {
  const [evolutionId, setEvolutionId] = useState()
  const [title, setTitle] = useState('Evolution')
  useEffect(() => {
    const setupEvolution = (category, construction, id) => {
      let evoId = ''
      let evoTitle = ''
      if (category === 'commercial') {
        evoId = "c"
        evoTitle = 'Commercial'
      } else if (category === 'industrial') {
        evoId = 'i'
        evoTitle = 'Industrial'
      } else if (category === 'multi-family') {
        evoId = 'mf'
        evoTitle = 'Multi-Family'
      } else if (category === 'single-family') {
        evoId = 'sf'
        evoTitle = 'Single-Famly'
      }
      if (construction === "modern") {
        evoId = `${evoId}m${id}`;
        evoTitle = `${evoTitle} Modern ${id}`
      } else {
        evoId = `${evoId}l${id}`;
        evoTitle = `${evoTitle} Legacy ${id}`
      }
      setEvolutionId(evoId)
      setTitle(evoTitle)
    }

    if (category !== '' && construction !== '' && id !== 0) {
      setupEvolution(category, construction, id);
    } else if (category !== '' && construction !== '') {
      const randId = randomId(category, construction)
      setupEvolution(category, construction, randId);
    } else if (category !== '') {
      const randConstruction = randomConstruction()
      const randId = randomId(category, randConstruction)
      setupEvolution(category, randConstruction, randId)
    } else {
      const randCategory = randomCategory()
      const randConstruction = randomConstruction()
      const randId = randomId(randCategory, randConstruction)
      setupEvolution(randCategory, randConstruction, randId)
    }
  }, [category, construction, id]);
  return (
    <>
      <H3>{title}</H3>
      {evolutionId && <Simulation id={evolutionId} />}
    </>
  )
}

Evolution.propTypes = {
  category: PropTypes.string,
  construction: PropTypes.string,
  id: PropTypes.number
}

export default Evolution