import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import axios from "axios";
import {
  Fontisto,
  Entypo,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function MapScreen() {
  const [offers, setOffers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const askPermission = async () => {
      // Demander la permission
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      // Demander la position
      let location = await Location.getCurrentPositionAsync({});

      // Mettre à jour l'état coords
      const response = await axios.get(
        "https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json"
      );
      setOffers(response.data);

      setIsLoading(false);
    };
    askPermission();
  }, []);

  return isLoading ? (
    <Text>En cours de chargement...</Text>
  ) : (
    <View style={styles.container}>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation={true}
        >
          {offers.map((offer, index) => {
            return (
              <MapView.Marker
                key={offer.placeId}
                coordinate={{
                  latitude: offer.location.lat,
                  longitude: offer.location.lng,
                }}
                title={offer.name}
                description={(offer.address, offer.type)}
              >
                {offer.type === "Veg Store" && (
                  <FontAwesome5 name="store" size={16} color="#D7B805" />
                )}
                {offer.type === "Health Store" && (
                  <FontAwesome5
                    name="store"
                    size={16}
                    color="rgb(125, 188, 224)"
                  />
                )}
                {offer.type === "Bakery" && (
                  <MaterialCommunityIcons
                    name="cupcake"
                    size={18}
                    color="#9C722A"
                  />
                )}
                {offer.type === "Juice Bar" && (
                  <Fontisto name="cocktail" size={18} color="#FAAF40" />
                )}
                {offer.type === "Ice Cream" && (
                  <FontAwesome5 name="ice-cream" size={18} color="magenta" />
                )}
                {offer.type === "Other" && (
                  <MaterialCommunityIcons
                    name="leaf"
                    size={18}
                    color="#DC5D5B"
                  />
                )}
                {offer.type === "Organization" && (
                  <MaterialCommunityIcons
                    name="leaf"
                    size={18}
                    color="#DC5D5B"
                  />
                )}
                {offer.type === "B&B" && (
                  <MaterialCommunityIcons
                    name="leaf"
                    size={18}
                    color="#DC5D5B"
                  />
                )}
                {offer.type === "Professional" && (
                  <MaterialCommunityIcons
                    name="leaf"
                    size={18}
                    color="#DC5D5B"
                  />
                )}
                {offer.type === "vegan" && (
                  <Entypo name="leaf" size={18} color="#258B42" />
                )}
                {offer.type === "vegetarian" && (
                  <Ionicons name="ios-leaf" size={18} color="#8A298E" />
                )}
                {offer.type === "veg-options" && (
                  <MaterialCommunityIcons
                    name="leaf"
                    size={18}
                    color="#DC5D5B"
                  />
                )}
              </MapView.Marker>
            );
          })}
        </MapView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
