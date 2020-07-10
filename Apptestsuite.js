import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FavoriteScreen from "./containers/FavoriteScreen";
import MapScreen from "./containers/MapScreen";
import RestaurantScreen from "./containers/RestaurantScreen";
import RestaurantsScreen from "./containers/RestaurantsScreen";
import SettingsScreen from "./containers/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

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
                  tabBarLabel: "Restaurants",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name={"ios-home"} size={size} color={color} />
                  ),
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Restaurants"
                      options={{
                        title: "Restaurants",
                        headerStyle: { backgroundColor: "red" },
                        headerTitleStyle: { color: "white" },
                      }}
                    >
                      {() => <RestaurantsScreen />}
                    </Stack.Screen>

                    <Stack.Screen
                      name="Restaurant"
                      options={{
                        title: "Restaurant",
                      }}
                    >
                      {() => <RestaurantScreen />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen
                name="Favorite"
                options={{
                  tabBarLabel: "Favorite",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name={"ios-options"} size={size} color={color} />
                  ),
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Favorite"
                      options={{ title: "Favorite", tabBarLabel: "Favorite" }}
                    >
                      {() => <FavoriteScreen setToken={setToken} />}
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
