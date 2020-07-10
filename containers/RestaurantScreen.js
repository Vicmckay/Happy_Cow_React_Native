import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/core";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import RestaurantDiapo from "./RestaurantDiapo";

const Restaurant = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [heart, setHeart] = useState(false);

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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("RestaurantDiapo", {
                  pictures: route.params.pictures,
                  placeId: route.params.placeId,
                });
              }}
            >
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
                  {route.params.pictures.length > 3 &&
                    `+ ${route.params.pictures.length - 3}`}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            route.params.vegan === 1
              ? styles.underHeaderVegan
              : route.params.vegOnly === 1
              ? styles.underHeaderVegOnly
              : styles.underHeaderOther,
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{route.params.name}</Text>
              <Text style={{ paddingTop: 10 }}>{stars}</Text>
            </View>
            <View>
              <Text style={styles.type}>{route.params.type}</Text>
              <TouchableOpacity
                onPress={async () => {
                  setHeart(true);
                  //    console.log("route ===>", route.params);
                  const newValue = {
                    name: route.params.name,
                    description: route.params.description,
                    thumbnail: route.params.thumbnail,
                    pictures: route.params.pictures,
                    address: route.params.address,
                    rating: route.params.rating,
                    lng: route.params.lng,
                    lat: route.params.lat,
                  };

                  let favoriteString = await AsyncStorage.getItem("favorites");

                  // console.log(favoriteString);
                  if (favoriteString) {
                    let favoriteTab = JSON.parse(favoriteString);
                    let alreadyFavorite = false;

                    for (let i = 0; i < favoriteTab.length; i++) {
                      if (favoriteTab[i].name === route.params.name) {
                        alreadyFavorite = true;
                      }
                    }
                    if (alreadyFavorite === false) {
                      favoriteTab.push(newValue);

                      let stringifiedNewTab = JSON.stringify(favoriteTab);
                      await AsyncStorage.setItem(
                        "favorites",
                        stringifiedNewTab
                      );
                      alert("Restaurant ajouté aux favoris");
                    } else {
                      console.log(newValue);
                      favoriteTab.splice(favoriteTab.indexOf(newValue, 1));
                      let stringifiedNewTab = JSON.stringify(favoriteTab);
                      await AsyncStorage.setItem(
                        "favorites",
                        stringifiedNewTab
                      );

                      alert("Restaurant supprimé des favoris");
                    }
                  } else {
                    let dataToStore = [];
                    dataToStore.push(newValue);

                    let stringifiedDataToStore = JSON.stringify(dataToStore);
                    await AsyncStorage.setItem(
                      "favorites",
                      stringifiedDataToStore
                    );
                  }
                }}
              >
                <FontAwesome
                  style={styles.heart}
                  name="heart"
                  size={24}
                  color={heart === false ? "black" : "red"}
                />
              </TouchableOpacity>
            </View>
          </View>
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
  underHeaderVegan: {
    height: 100,
    width: "100%",
    backgroundColor: "#258B42",
    paddingLeft: 20,
    paddingTop: 10,
  },
  underHeaderVegOnly: {
    height: 100,
    width: "100%",
    backgroundColor: "#8A298F",
    paddingLeft: 20,
    paddingTop: 10,
  },
  underHeaderOther: {
    height: 100,
    width: "100%",
    backgroundColor: "#DE5D5D",
    paddingLeft: 20,
    paddingTop: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
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
  type: {
    paddingRight: 20,
    fontSize: 18,
    color: "white",
  },
  heart: {
    paddingTop: 10,
    paddingRight: 20,
  },
});
