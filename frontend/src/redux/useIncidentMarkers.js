import React, { useMemo, useCallback } from 'react';
import useFilteredIncidents from './useFilteredIncidents'

const useIncidentMarkers = () => {
  const filteredIncidents = useFilteredIncidents();

  const incidentMarkers = useMemo(() => {

    const incidentsWithCoordinates = filteredIncidents.filter(({coordinates}) => coordinates.length > 0);

    const filterA = (incident) => {
      const { coordinates } = incident;
      return coordinates.map(c => ({...incident, coordinates: [c]}))
    };
    const markers = incidentsWithCoordinates.map(filterA).flat();

    const filterB = (incident) => (
      {
        type: 'Feature',
        properties: {
          data: incident,
          icon: 'theatre-15'
        },
        geometry: {
          type: 'Point',
          coordinates: incident['coordinates'][0]
        }
      }
    );

    const features = markers.map(filterB);
    return {
      type: 'FeatureCollection',
      features: features
    }
  }, [filteredIncidents]);

  return incidentMarkers;
}

export default useIncidentMarkers;
