import React from "react";
import { useNavigation, useState } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

import axios from "axios";

export default function SignInScreen({ setToken, Navigation }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1, backgroundColor: "#F35960" }}
      >
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 50,
              paddingBottom: 40,
            }}
          >
            <Image
              source={require("../assets/HappyCow_Logo.png")}
              style={{
                height: 115,
                width: 120,
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>Email: </Text>
            <TextInput
              placeholder="Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
            />
            <Text style={styles.text}>Password: </Text>
            <TextInput
              placeholder="Password"
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            />

            <TouchableOpacity
              style={{
                height: 40,
                width: 200,
                backgroundColor: "white",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 30,
              }}
              onPress={async () => {
                // requête vers le serveur pour se connecter...
                const response = await axios.post(
                  "https://express-airbnb-api.herokuapp.com/user/log_in",
                  { email: email, password: password }
                );
                // console.log(response.data.token);

                setToken(response.data.token);
              }}
            >
              <Text style={{ color: "#F35960", fontSize: 20 }}>
                Se connecter
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={{ color: "white", textDecorationLine: "underline" }}>
                Pas de compte ? S'inscrire
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  signinButton: {
    width: 150,
    height: 30,
    backgroundColor: "white",
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 17,
    paddingTop: 10,
  },
});
