import React from "react";
import MapView from "react-native-maps";
import tw from "twrnc";

const Map = () => {
  return (
    <MapView
      style={tw`flex-1`}
      mapType="mutedStandard"
      region={{
        latitude: 9.0579,
        longitude: 7.4951,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
  );
};

export default Map;