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

const FavoriteScreen = ({ navigation }) => {
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(null);
  const [valueString] = useState();

  useEffect(() => {
    const bootstrapAsync = async () => {
      const stored = await AsyncStorage.getItem("favorite");
      const valueString = JSON.parse(stored);
      console.log(valueString);
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
                        <Text style={styles.name}>{favori.name}</Text>
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
