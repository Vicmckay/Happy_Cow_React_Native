import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";

export default function HeaderColor() {
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json"
    );
    setOffers(response.data);
    // console.log(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      style=
      {[
        obj.item.vegan === 1
          ? styles.underHeaderVegan
          : obj.item.vegOnly === 1
          ? styles.underHeaderVegOnly
          : styles.underHeaderOther,
      ]}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
