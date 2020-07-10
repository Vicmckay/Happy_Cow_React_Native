import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Search = (props) => {
  const [data, setData] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      "https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json"
    );
    setData(response.data);
  };

  return (
    <View>
      <View style={styles.search} onSubmit={handleSubmit}>
        <TextInput
          value={props.search}
          onChangeText={(value) => props.setSearch(value)}
          placeholder="Votre recherche"
          type="text"
        />
        <TouchableOpacity
          style={styles.searchButton}
          type="submit"
          value="Rechercher"
          name="search"
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  search: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
  },
  searchButton: {
    height: 20,
    width: 70,
    backgroundColor: "blue",
    color: "black",
    marginLeft: 10,
  },
});
