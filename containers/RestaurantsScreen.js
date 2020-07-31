import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import Filter from "../Components/Filter";
import SearchBar from "react-native-search-bar";
import Search from "../Components/Search";

export default function Restaurants() {
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);
  const [vegan, setVegan] = useState(false);
  const [vege, setVege] = useState(false);
  const [option, setOption] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json"
    );
    setOffers(response.data);
    console.log(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Filter
        vegan={vegan}
        setVegan={setVegan}
        vege={vege}
        setVege={setVege}
        option={option}
        setOption={setOption}
      ></Filter>

      <FlatList
        data={offers}
        renderItem={(obj) => {
          const stars = [];
          for (let i = 0; i < 5; i++) {
            if (i < obj.item.rating) {
              stars.push(
                <FontAwesome key={i} name="star" size={18} color="gold" />
              );
            } else {
              stars.push(
                <FontAwesome key={i} name="star" size={18} color="grey" />
              );
            }
          }

          return (
            <View>
              {vegan === true && obj.item.vegan === 1 ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Restaurant", {
                      placeId: obj.item.placeId,
                      name: obj.item.name,
                      description: obj.item.description,
                      pictures: obj.item.pictures,
                      rating: obj.item.rating,
                      lng: obj.item.location.lng,
                      lat: obj.item.location.lat,
                      vegan: obj.item.vegan,
                      vegOnly: obj.item.vegOnly,
                      type: obj.item.type,
                      thumbnail: obj.item.thumbnail,
                      address: obj.item.address,
                    });
                  }}
                >
                  <View style={styles.container}>
                    <Image
                      style={styles.restaurantImage}
                      source={{
                        uri: `${obj.item.thumbnail}`,
                      }}
                    ></Image>
                    <View style={styles.description}>
                      <Text style={{ fontSize: 17 }} numberOfLines={1}>
                        {obj.item.name}
                      </Text>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                          {stars}
                        </View>

                        <Text>
                          {obj.item.vegan === 1 && (
                            <Entypo name="leaf" size={20} color="#258B42" />
                          )}
                        </Text>

                        <Text>
                          {obj.item.vegOnly === 1 ? (
                            <Ionicons
                              name="ios-leaf"
                              size={20}
                              color="#8A298E"
                            />
                          ) : (
                            ""
                          )}
                        </Text>
                        <Text>
                          {obj.item.vegan === 0 && obj.item.vegOnly === 0 ? (
                            <Ionicons
                              name="md-leaf"
                              size={20}
                              color="#DE5D5D"
                            />
                          ) : (
                            ""
                          )}
                        </Text>
                      </View>
                      <Text style={{ marginTop: 10 }} numberOfLines={2}>
                        {obj.item.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : vege === true && obj.item.vegOnly === 1 ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Restaurant", {
                      placeId: obj.item.placeId,
                      name: obj.item.name,
                      description: obj.item.description,
                      pictures: obj.item.pictures,
                      rating: obj.item.rating,
                      lng: obj.item.location.lng,
                      lat: obj.item.location.lat,
                      vegan: obj.item.vegan,
                      vegOnly: obj.item.vegOnly,
                      type: obj.item.type,
                      thumbnail: obj.item.thumbnail,
                      address: obj.item.address,
                    });
                  }}
                >
                  <View style={styles.container}>
                    <Image
                      style={styles.restaurantImage}
                      source={{
                        uri: `${obj.item.thumbnail}`,
                      }}
                    ></Image>
                    <View style={styles.description}>
                      <Text style={{ fontSize: 17 }} numberOfLines={1}>
                        {obj.item.name}
                      </Text>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                          {stars}
                        </View>

                        <Text>
                          {obj.item.vegan === 1 && (
                            <Entypo name="leaf" size={20} color="#258B42" />
                          )}
                        </Text>

                        <Text>
                          {obj.item.vegOnly === 1 ? (
                            <Ionicons
                              name="ios-leaf"
                              size={20}
                              color="#8A298E"
                            />
                          ) : (
                            ""
                          )}
                        </Text>
                        <Text>
                          {obj.item.vegan === 0 && obj.item.vegOnly === 0 ? (
                            <Ionicons
                              name="md-leaf"
                              size={20}
                              color="#DE5D5D"
                            />
                          ) : (
                            ""
                          )}
                        </Text>
                      </View>
                      <Text style={{ marginTop: 10 }} numberOfLines={2}>
                        {obj.item.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : option === true &&
                obj.item.vegOnly === 0 &&
                obj.item.vegan === 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Restaurant", {
                      placeId: obj.item.placeId,
                      name: obj.item.name,
                      description: obj.item.description,
                      pictures: obj.item.pictures,
                      rating: obj.item.rating,
                      lng: obj.item.location.lng,
                      lat: obj.item.location.lat,
                      vegan: obj.item.vegan,
                      vegOnly: obj.item.vegOnly,
                      type: obj.item.type,
                      thumbnail: obj.item.thumbnail,
                      address: obj.item.address,
                    });
                  }}
                >
                  <View style={styles.container}>
                    <Image
                      style={styles.restaurantImage}
                      source={{
                        uri: `${obj.item.thumbnail}`,
                      }}
                    ></Image>
                    <View style={styles.description}>
                      <Text style={{ fontSize: 17 }} numberOfLines={1}>
                        {obj.item.name}
                      </Text>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                          {stars}
                        </View>

                        <Text>
                          {obj.item.vegan === 1 && (
                            <Entypo name="leaf" size={20} color="#258B42" />
                          )}
                        </Text>

                        <Text>
                          {obj.item.vegOnly === 1 ? (
                            <Ionicons
                              name="ios-leaf"
                              size={20}
                              color="#8A298E"
                            />
                          ) : (
                            ""
                          )}
                        </Text>
                        <Text>
                          {obj.item.vegan === 0 && obj.item.vegOnly === 0 ? (
                            <Ionicons
                              name="md-leaf"
                              size={20}
                              color="#DE5D5D"
                            />
                          ) : (
                            ""
                          )}
                        </Text>
                      </View>
                      <Text style={{ marginTop: 10 }} numberOfLines={2}>
                        {obj.item.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : option === false && vege === false && vegan === false ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Restaurant", {
                      placeId: obj.item.placeId,
                      name: obj.item.name,
                      description: obj.item.description,
                      pictures: obj.item.pictures,
                      rating: obj.item.rating,
                      lng: obj.item.location.lng,
                      lat: obj.item.location.lat,
                      vegan: obj.item.vegan,
                      vegOnly: obj.item.vegOnly,
                      type: obj.item.type,
                      thumbnail: obj.item.thumbnail,
                      address: obj.item.address,
                    });
                  }}
                >
                  <View style={styles.container}>
                    <Image
                      style={styles.restaurantImage}
                      source={{
                        uri: `${obj.item.thumbnail}`,
                      }}
                    ></Image>
                    <View style={styles.description}>
                      <Text style={{ fontSize: 17 }} numberOfLines={1}>
                        {obj.item.name}
                      </Text>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                          {stars}
                        </View>

                        <Text>
                          {obj.item.vegan === 1 && (
                            <Entypo name="leaf" size={20} color="#258B42" />
                          )}
                        </Text>

                        <Text>
                          {obj.item.vegOnly === 1 ? (
                            <Ionicons
                              name="ios-leaf"
                              size={20}
                              color="#8A298E"
                            />
                          ) : (
                            ""
                          )}
                        </Text>
                        <Text>
                          {obj.item.vegan === 0 && obj.item.vegOnly === 0 ? (
                            <Ionicons
                              name="md-leaf"
                              size={20}
                              color="#DE5D5D"
                            />
                          ) : (
                            ""
                          )}
                        </Text>
                      </View>
                      <Text style={{ marginTop: 10 }} numberOfLines={2}>
                        {obj.item.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        }}
        keyExtractor={(item) => {
          return String(item.placeId);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
  },
  restaurantImage: {
    width: 100,
    height: 100,
  },
  description: {
    marginHorizontal: 10,
    flex: 1,
  },
  filterContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "lightgrey",
    flexDirection: "row",
  },
  filter: {
    flex: 1,
    height: 56,
    backgroundColor: "white",
    marginHorizontal: 5,
    marginVertical: 7,
    borderRadius: 10,
  },
  filterIcon: { alignItems: "center", paddingTop: 5 },

  filterText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 5,
  },
});
