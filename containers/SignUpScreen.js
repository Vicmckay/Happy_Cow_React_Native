import React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function SignUpScreen({ setToken }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1, backgroundColor: "#F35960" }}
      >
        <View style={styles.container}>
          <View>
            <Text
              style={{
                fontSize: 25,
                color: "white",
                textAlign: "center",
                paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              Rejoignez-nous !
            </Text>
            <View>
              <Text style={styles.text}>Email: </Text>
              <TextInput placeholder="Email" />
              <View
                style={{
                  borderBottomColor: "white",
                  borderBottomWidth: 1,
                }}
              />
              <Text style={styles.text}>User Name: </Text>
              <TextInput placeholder="Username" />
              <View
                style={{
                  borderBottomColor: "white",
                  borderBottomWidth: 1,
                }}
              />
              <Text style={styles.text}>Name: </Text>
              <TextInput placeholder="Name" />

              <View
                style={{
                  height: 100,
                  width: 335,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              >
                <Text style={styles.text}>Presentation </Text>
                <TextInput placeholder="Présentez-vous en quelques lignes" />
              </View>
            </View>
            <Text style={styles.text}>Password: </Text>
            <TextInput placeholder="Mot de passe" secureTextEntry={true} />
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 1,
              }}
            />
            <Text style={styles.text}>Confirmed Password: </Text>
            <TextInput
              placeholder="Confirmez le mot de passe"
              secureTextEntry={true}
            />
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                alignItems: "center",
                paddingTop: 30,
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  const userToken = "secret-token";
                  setToken(userToken);
                }}
                style={styles.signupButton}
              >
                <View>
                  <Text>S'inscrire</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  signupButton: {
    width: 150,
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  text: {
    color: "white",
    fontSize: 17,
    paddingTop: 10,
  },
});
