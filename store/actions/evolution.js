export const UPDATE_EVOLUTION = "UPDATE_EVOLUTION";
export const UPDATE_INCIDENT = "UPDATE_INCIDENT";

export const updateEvolution = data => {
  return {
    type: UPDATE_EVOLUTION,
    payload: {
      id: data.id,
      category: data.category,
      construction: data.construction,
      street: data.street,
      size: data.size,
      stories: data.stories,
      occupancy: data.occupancy,
      conditions: data.conditions,
      entryEgress: data.entryEgress,
      survivability: data.survivability,
      placement: data.exposure,
      side: data.side,
      flow: data.flow,
      fire: data.fire,
      exhaust: data.exhaust,
      smoke: data.smoke,
      withstanding: data.withstanding,
      attack: data.attack,
      ventilation: data.ventilation,
      exposure: data.exposure,
      ric: data.ric,
      medical: data.medical
    }
  };
};

export const updateIncident = data => {
  return {
    type: UPDATE_INCIDENT,
    payload: {
      incidentTitle: data.title,
      incidentGroup: data.icsNims,
      incidentCommand: data.command
    }
  };
};
