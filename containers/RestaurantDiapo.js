import React from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const RestaurantDiapo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const pictures = route.params.pictures;

  return (
    <ScrollView>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {pictures.map((picture, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("RestaurantPhotos", {
                    pictures: route.params.pictures,
                  });
                }}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: `${picture}`,
                  }}
                ></Image>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 116,
    height: 116,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  container: {
    flexDirection: "row",
  },
});

export default RestaurantDiapo;
