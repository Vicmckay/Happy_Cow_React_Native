import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";

const Filter = () => {
  return (
    <View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filter}>
          <View>
            <View>
              <View style={styles.filterIcon}>
                <Entypo name="leaf" size={20} color="#258B42" />
              </View>
              <Text style={styles.filterText}>Vegan</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filter}>
          <View>
            <View>
              <View style={styles.filterIcon}>
                <Ionicons name="ios-leaf" size={20} color="#8A298E" />
              </View>
              <Text style={styles.filterText}>Végétarien</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filter}>
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
        <TouchableOpacity style={styles.filter}>
          <View>
            <View>
              <View style={styles.filterIcon}>
                <Ionicons name="ios-options" size={24} color="grey" />
              </View>
              <Text style={styles.filterText}>Filtres</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

export default Filter;
