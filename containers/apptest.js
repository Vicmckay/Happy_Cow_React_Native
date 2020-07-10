import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import MapView from "react-native-maps";
import Carousel from "react-native-snap-carousel";
import { ScrollView } from "react-native-gesture-handler";

const Restaurant = () => {
  const route = useRoute();

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < route.params.rating) {
      stars.push(<FontAwesome key={i} name="star" size={18} color="gold" />);
    } else {
      stars.push(<FontAwesome key={i} name="star" size={18} color="grey" />);
    }
  }

  return (
    <ScrollView>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.restleadImage}
            source={{
              uri: `${route.params.pictures[0]}`,
            }}
          ></Image>
          <View>
            <Image
              style={[styles.restsmallImage, { marginBottom: 2 }]}
              source={{
                uri: `${route.params.pictures[1]}`,
              }}
            ></Image>
            <ImageBackground
              style={[
                styles.restsmallImage,
                {
                  justifyContent: "center",
                },
              ]}
              source={{
                uri: `${route.params.pictures[2]}`,
              }}
            >
              <View style={styles.child}></View>
              <Text style={styles.photoNumber}>
                +{route.params.pictures.length - 3}
              </Text>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.underHeader}>
          <Text style={styles.name}>{route.params.name}</Text>
          <Text style={{ paddingTop: 10 }}>{stars}</Text>
        </View>
        <Text style={styles.description}>{route.params.description}</Text>
        <MapView
          style={{ width: "100%", height: 180, marginTop: 20 }}
          initialRegion={{
            latitude: route.params.lat,
            longitude: route.params.lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: route.params.lat,
              longitude: route.params.lng,
            }}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  restleadImage: {
    width: 250,
    height: 160,
  },
  restsmallImage: {
    width: 130,
    height: 79,
    marginLeft: 2,
  },
  underHeader: {
    height: 100,
    width: "100%",
    backgroundColor: "#1FAE9F",
    paddingLeft: 20,
    paddingTop: 10,
  },
  name: {
    fontSize: 18,
  },
  description: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  photoNumber: {
    position: "absolute",
    color: "white",
    fontSize: 20,
    paddingLeft: 40,
    fontWeight: "bold",
  },
  child: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
