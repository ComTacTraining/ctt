import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvolution, getIncident } from '../graphql/queries';
import Typography from '@material-ui/core/Typography';
import * as evolutionActions from '../store/actions/evolution';
import Simulation from '../components/Evolution';


const Evolution = () => {
  const dispatch = useDispatch();
  const { category, construction, id } = useParams();
  const [evolutionId, setEvolutionId] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const setupEvolution = () => {
      let evoId = '';
      if (category) {
        switch (category) {
          case 'commercial': evoId = 'c'; break;
          case 'industrial': evoId = 'i'; break;
          case 'multi-family': evoId = 'mf'; break;
          case 'single-family': evoId = 'sf'; break;
          default: break;
        }
      } else {
        const categoryInitials = ['c', 'i', 'mf', 'sf'];
        const randomCategory = Math.floor(Math.random() * 4);
        evoId = categoryInitials[randomCategory];
      }

      if (!construction) {
        const constructionInitials = ['m', 'l'];
        const randomConstruction = Math.floor(Math.random());
        evoId = `${evoId}${constructionInitials[randomConstruction]}`;
      } else if (construction === 'modern') {
        evoId = `${evoId}m`;
      } else {
        evoId = `${evoId}l`;
      }
      
      let maxNum = 0;
      let evoTitle = '';
      switch (evoId) {
        case 'cl': maxNum = 65; evoTitle = 'Commercial Legacy '; break;
        case 'cm': maxNum = 100; evoTitle = 'Commercial Modern '; break;
        case 'il': maxNum = 40; evoTitle = 'Industrial Legacy '; break;
        case 'im': maxNum = 40; evoTitle = 'Industrial Modern '; break;
        case 'mfl': maxNum = 60; evoTitle = 'Multi-Family Legacy '; break;
        case 'mfm': maxNum = 60; evoTitle = 'Multi-Family Modern '; break;
        case 'sfl': maxNum = 65; evoTitle = 'Single-Family Legacy '; break;
        case 'sfm': maxNum = 95; evoTitle = 'Single-Family Modern '; break;
        default: break;
      }

      if (!id) {
        const randomId = Math.floor(Math.random() * maxNum) + 1;
        evoTitle = `${evoTitle}${randomId}`;
        evoId = `${evoId}${randomId}`;
      } else {
        evoTitle = `${evoTitle}${id}`;
        evoId = `${evoId}${id}`;
      }
      setTitle(evoTitle);
      setEvolutionId(evoId);

    }
    if (category) {
      setupEvolution();
    } else {
      setEvolutionId(null);
    }
  }, [category, construction, id]);

  useEffect(() => {
    const getEvolutionQuery = async () => {
      try {
        const request = await API.graphql(graphqlOperation(getEvolution, { id: `${evolutionId}`}));
        // setEvolution(request.data.getEvolution);
        dispatch(evolutionActions.updateEvolution(request.data.getEvolution));
      } catch (e) {
        console.error(e);
      }
    }
    const getIncidentQuery = async () => {
      try {
        const incidentId = Math.floor(Math.random() * 46) + 1;
        const request = await API.graphql(graphqlOperation(getIncident, { id: `${incidentId}`}));
        dispatch(evolutionActions.updateIncident(request.data.getIncident));
      } catch (e) {
        console.error(e);
      }
    }
    if (evolutionId) {
      getEvolutionQuery();
      getIncidentQuery()
    }
  }, [evolutionId, dispatch]);

  return (
    <div>
      <Typography variant='h3'>{title}</Typography>
      {evolutionId && (
        // <VideoLayout>
          <Simulation />
        // </VideoLayout>
      )}
    </div>
  );
};

export default Evolution;