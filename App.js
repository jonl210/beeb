import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Logo from "./src/Logo";
import { Entypo } from "@expo/vector-icons";

/*
  Icons to use later in drawer:
  - Main/Home/Feed: <Octicons name="home" size={28} color="black" />
  - Groups: Figure it out
  - Profile: <FontAwesome5 name="user" size={28} color="black" />
  - Invites: <Octicons name="mail" size={28} color="black" />  
*/

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const TestStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="test"
        component={MainScreen}
        options={{
          headerTitle: () => <Logo />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Entypo name="menu" size={32} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  return <View></View>;
};

const GroupsScreen = () => {
  return (
    <View>
      <Text>Groups</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

const InvitesScreen = () => {
  return (
    <View>
      <Text>Invites</Text>
    </View>
  );
};

const TestDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "front",
        drawerLabelStyle: { fontSize: 20, color: "#333" },
        drawerActiveTintColor: "#cd2653",
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={TestStack} />
      <Drawer.Screen name="Groups" component={GroupsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Invites" component={InvitesScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="inverted" />
      <TestDrawer />
    </NavigationContainer>
  );
}
