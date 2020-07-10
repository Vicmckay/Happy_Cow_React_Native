import React, { useState, useEffect } from "react";
import { AsyncStorage, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import RestaurantsScreen from "./containers/RestaurantsScreen";
import RestaurantScreen from "./containers/RestaurantScreen";
import MapScreen from "./containers/MapScreen";
import RestaurantDiapo from "./containers/RestaurantDiapo";
import RestaurantPhotos from "./containers/RestaurantPhotos";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import FavoriteScreen from "./containers/FavoriteScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{
        width: 100,
        height: 40,
        paddingTop: 10,
        marginHorizontal: 100,
      }}
      source={require("./assets/HappyCow_Text.png")}
    />
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  const setToken = async (token, id) => {
    if (token && id) {
      AsyncStorage.setItem("userToken", token);
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUser({ token: token, id: id });
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUser(userToken);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : user && user.token === null ? (
        // Pas de token, l'utilisateur n'est pas connecté
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {(props) => <SignInScreen {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            options={{ header: () => null, animationEnabled: false }}
            name="SignUp"
          >
            {(props) => <SignUpScreen {...props} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // L'utilisateur est connecté

        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="Restaurants"
                  options={{
                    tabBarLabel: "Restaurants",
                    tabBarIcon: ({ color, size }) => (
                      <Fontisto name="zoom" size={24} color="#6E3EAD" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Restaurants"
                        options={{
                          title: LogoTitle(),
                          headerStyle: {
                            backgroundColor: "#A99BC9",
                            height: 65,
                          },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <RestaurantsScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Restaurant"
                        options={{
                          title: LogoTitle(),
                          headerStyle: {
                            backgroundColor: "#A99BC9",
                            height: 65,
                          },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {(props) => <RestaurantScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="RestaurantDiapo"
                        options={{
                          title: LogoTitle(),
                          headerStyle: {
                            backgroundColor: "#A99BC9",
                            height: 65,
                          },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {(props) => <RestaurantDiapo {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="RestaurantPhotos"
                        options={{
                          title: LogoTitle(),
                          headerStyle: {
                            backgroundColor: "#A99BC9",
                            height: 65,
                          },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {(props) => <RestaurantPhotos {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Map"
                  options={{
                    tabBarLabel: "Map",
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome name="map-o" size={24} color="black" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Map"
                        options={{
                          title: LogoTitle(),
                          headerStyle: { backgroundColor: "#A99BC9" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <MapScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Favorite"
                  options={{
                    tabBarLabel: "Favoris",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons name="favorite" size={24} color="black" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Favorite"
                        options={{ title: "Favorite", tabBarLabel: "Favorite" }}
                      >
                        {(props) => <FavoriteScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
