import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";

const RestaurantPhotos = () => {
  const route = useRoute();
  _renderItem = ({ item }) => {
    return <Image style={styles.image} source={{ uri: item }} />;
  };
  return (
    <View>
      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        data={route.params.pictures}
        renderItem={_renderItem}
        sliderWidth={380}
        itemWidth={380}
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
});

export default RestaurantPhotos;
