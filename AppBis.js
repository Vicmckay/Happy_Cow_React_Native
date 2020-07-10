import React, { useState, useEffect } from "react";
import { AsyncStorage, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  Fontisto,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import RestaurantsScreen from "./containers/RestaurantsScreen";
import RestaurantScreen from "./containers/RestaurantScreen";
import MapScreen from "./containers/MapScreen";
import RestaurantDiapo from "./containers/RestaurantDiapo";
import FavoriteScreen from "./containers/FavoriteScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 200, height: 30 }}
      source={require("./assets/HappyCow_Text.png")}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
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
                  tabBarLabel: "Explorer",
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
                        headerStyle: { backgroundColor: "#A99BC9" },
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
                      {() => <FavoriteScreen />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
