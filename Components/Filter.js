import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

export default function Filter(props) {
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);
  const [data, setData] = useState();

  const fetchData = async () => {
    const response = await axios.get(
      "https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json"
    );
    setOffers(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={props.vegan === false ? styles.filterOff : styles.filterOn}
          onPress={() => {
            props.vegan === false
              ? props.setVegan(true)
              : props.setVegan(false);
          }}
        >
          <View>
            <View>
              <View style={styles.filterIcon}>
                <Entypo name="leaf" size={20} color="#258B42" />
              </View>
              <Text style={styles.filterText}>Vegan</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={props.vege === false ? styles.filterOff : styles.filterOn}
          onPress={() => {
            props.vege === false ? props.setVege(true) : props.setVege(false);
          }}
        >
          <View>
            <View>
              <View style={styles.filterIcon}>
                <Ionicons name="ios-leaf" size={20} color="#8A298E" />
              </View>
              <Text style={styles.filterText}>Végétarien</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={props.option === false ? styles.filterOff : styles.filterOn}
          onPress={() => {
            props.option === false
              ? props.setOption(true)
              : props.setOption(false);
          }}
        >
          <View>
            <View>
              <View style={styles.filterIcon}>
                <Ionicons name="md-leaf" size={20} color="#DE5D5D" />
              </View>
              <Text style={styles.filterText} numberOfLines={1}>
                Options Végétariennes
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
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
  filterOff: {
    flex: 1,
    height: 56,
    backgroundColor: "white",
    marginHorizontal: 5,
    marginVertical: 7,
    borderRadius: 10,
  },
  filterOn: {
    flex: 1,
    height: 56,
    backgroundColor: "grey",
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
