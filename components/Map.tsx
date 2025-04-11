import React, { useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import tw from "twrnc";
import { GOOGLE_MAPS_APIKEY } from "../utils/constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View } from "react-native";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapProps {
  origin: Coordinates;
  destination: Coordinates;
}

const Map = ({ origin, destination }: MapProps) => {
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
        latitude: (9.075232 + 9.0641062) / 2,
        longitude: (7.4767315 + 7.422939500000001) / 2,
        latitudeDelta: Math.abs(9.075232 - 9.0641062) * 1.5,
        longitudeDelta: Math.abs(7.4767315 - 7.422939500000001) * 1.5,
      }}
      mapType="mutedStandard"
    >
      {/* Marker for Origin */}
      <Marker
        coordinate={origin}
        title="Origin"
        description="Start point"
        identifier="origin"
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 1,
            elevation: 5,
          }}
        >
          <Ionicons name="radio-button-on" size={25} color="red" />
        </View>
      </Marker>

      {/* Marker for Destination */}
      <Marker
        coordinate={destination}
        title="Destination"
        description="End point"
        identifier="destination"
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 1,
            elevation: 5,
          }}
        >
          <Ionicons name="radio-button-on" size={25} color="green" />
        </View>
      </Marker>

      {/* Directions from origin to destination */}
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="#FF6633"
        lineDashPattern={[0]}
      />
    </MapView>
  );
};

export default Map;
