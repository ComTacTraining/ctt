import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getIncident } from '../../graphql/queries';

const Incident = () => {
  const [incident, setIncident] = useState(null);
  // const [nextToken, setNextToken] = useState(null);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      // const _incidents = await API.graphql(graphqlOperation(listIncidents));
      const randomIncident = Math.floor(Math.random() * 46) + 1;
      const _incident = await API.graphql(graphqlOperation(getIncident, { id: `${randomIncident}`}));
      
      console.log(_incident.data.getIncident);
      setIncident(_incident.data.getIncident);
    } catch(e) { console.error(e) }
  };

  return (
    <div>
      <h1>Random Incident</h1>
      {incident && (
        <table>
          <thead>
            <tr>
              <th>Actions</th>
              <th>ID</th>
              <th>Title</th>
              <th>ICS NIMS</th>
              <th>Command</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td></td>
            <td>{incident.id}</td>
            <td>{incident.title}</td>
            <td>{incident.icsNims}</td>
            <td>{incident.command}</td>
          </tr>
          </tbody>
        </table>
        )}
    </div>
  );
};

export default Incident;