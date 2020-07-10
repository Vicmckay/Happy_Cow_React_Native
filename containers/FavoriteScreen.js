import React, { useEffect, useState } from "react";
import RestaurantScreen from "./RestaurantScreen";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const FavoriteScreen = ({ navigation }) => {
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(null);
  const [valueString] = useState();
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const stored = await AsyncStorage.getItem("favorites");
      const valueString = JSON.parse(stored);
      setFavorite(valueString);
      setIsLoading(false);
    };
    const isFocus = navigation.addListener("focus", () => {
      bootstrapAsync();
    });
    return isFocus;
  }, [navigation]);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {favorite === null ? (
            <Text>Vous n'avez encore de favoris</Text>
          ) : (
            favorite.map((favori, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.restaurantPreview}
                  onPress={() => {
                    navigation.navigate("Restaurant", {
                      name: favori.name,
                      pictures: favori.pictures,
                      address: favori.address,
                      description: favori.description,
                      rating: favori.rating,
                      lng: favori.lng,
                      lat: favori.lat,
                    });
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                      <View>
                        <Image
                          style={styles.restaurantImage}
                          source={{
                            uri: `${favori.thumbnail}`,
                          }}
                        ></Image>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.name} numberOfLines={2}>
                          {favori.name}{" "}
                        </Text>
                        <TouchableOpacity
                          onPress={async () => {
                            setHeart(true);
                            //    console.log("route ===>", route.params);
                            const newValue = {
                              name: favori.name,
                              description: favori.description,
                              thumbnail: favori.thumbnail,
                              pictures: favori.pictures,
                              address: favori.address,
                              rating: favori.rating,
                              lng: favori.lng,
                              lat: favori.lat,
                            };

                            let favoriteString = await AsyncStorage.getItem(
                              "favorites"
                            );

                            // console.log(favoriteString);
                            if (favoriteString) {
                              let favoriteTab = JSON.parse(favoriteString);
                              // console.log(newValue);
                              favoriteTab.splice(favoriteTab.indexOf(index), 1);
                              let stringifiedNewTab = JSON.stringify(
                                favoriteTab
                              );
                              await AsyncStorage.setItem(
                                "favorites",
                                stringifiedNewTab
                              );

                              alert("Restaurant supprimé des favoris");
                            } else {
                              let dataToStore = [];
                              dataToStore.push(newValue);

                              let stringifiedDataToStore = JSON.stringify(
                                dataToStore
                              );
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
                        <Text style={styles.address}>{favori.address}</Text>
                        <Text style={styles.description} numberOfLines={3}>
                          {favori.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    // marginTop: 20,
    flex: 1,
    backgroundColor: "white",
  },
  restaurantPreview: { marginBottom: 20 },

  name: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },

  restaurantImage: { width: 150, height: 150 },

  address: { fontStyle: "italic", marginTop: 10, paddingLeft: 10 },

  description: { marginTop: 10, paddingLeft: 10 },
});

export default FavoriteScreen;
