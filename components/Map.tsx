import React, { useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import tw from "twrnc";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapProps {
  origin: Coordinates;
  destination: Coordinates;
}

const Map = ({ origin, destination }: MapProps) => {
  const GOOGLE_MAPS_APIKEY = "AIzaSyB9XjWemCW4CDheEaMYdH7nqbTVkja3MMg";
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    if (!origin || !destination || !mapRef.current) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      // provider={PROVIDER_GOOGLE}
      style={tw`flex-1`}
      region={{
        latitude: (origin.latitude + destination.latitude) / 2,
        longitude: (origin.longitude + destination.longitude) / 2,
        latitudeDelta: Math.abs(origin.latitude - destination.latitude) * 1.5,
        longitudeDelta:
          Math.abs(origin.longitude - destination.longitude) * 1.5,
      }}
      mapType="mutedStandard"
    >
      {/* Marker for Origin */}
      <Marker
        coordinate={origin}
        title="Origin"
        description="Start point"
        identifier="origin"
      />

      {/* Marker for Destination */}
      <Marker
        coordinate={destination}
        title="Destination"
        description="End point"
        identifier="destination"
      />

      {/* Directions from origin to destination */}
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="blue"
      />
    </MapView>
  );
};

export default Map;
