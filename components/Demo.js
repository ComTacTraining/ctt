import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import Typography from "@material-ui/core/Typography";
import { getEvolution, getIncident } from "graphql/queries";
import Evolution from "components/Evolution/Evolution";
import * as evolutionActions from "store/actions/evolution";
import Layout from 'components/Layout/Auth';

const Demo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { faceToFaceCompleted } = useSelector(state => state.ai);

  useEffect(() => {
    if (faceToFaceCompleted) {
      history.push("/subscribe");
    }
  }, [faceToFaceCompleted, history]);

  useEffect(() => {
    const getEvolutionQuery = async () => {
      try {
        const request = await API.graphql(
          graphqlOperation(getEvolution, { id: "sfm23" })
        );
        dispatch(evolutionActions.updateEvolution(request.data.getEvolution));
      } catch (e) {
        console.error(e);
      }
    };
    const getIncidentQuery = async () => {
      try {
        const incidentId = Math.floor(Math.random() * 46) + 1;
        const request = await API.graphql(
          graphqlOperation(getIncident, { id: `${incidentId}` })
        );
        dispatch(evolutionActions.updateIncident(request.data.getIncident));
      } catch (e) {
        console.error(e);
      }
    };

    getEvolutionQuery();
    getIncidentQuery();
  }, [dispatch]);

  return (
    <Layout>
      <Typography variant="h3">Demo</Typography>
      <Evolution />
    </Layout>
  );
};

export default Demo;
