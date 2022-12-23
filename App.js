import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Button,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";

/*
  Icons to use later in drawer:
  - Main/Home/Feed: <Octicons name="home" size={28} color="black" />
  - Groups: Figure it out
  - Profile: <FontAwesome5 name="user" size={28} color="black" />
  - Invites: <Octicons name="mail" size={28} color="black" />
*/

const Drawer = createDrawerNavigator();
const Stack1 = createNativeStackNavigator();
const Stack2 = createNativeStackNavigator();
const NewGroupStackNav = createNativeStackNavigator();

const Logo = () => {
  const [loaded] = useFonts({
    PatuaOne: require("./assets/fonts/PatuaOne-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  } else {
    return (
      <Text
        style={{
          fontFamily: "PatuaOne",
          fontSize: 38,
          marginTop: -6,
          color: "#333",
        }}
      >
        beeb
      </Text>
    );
  }
};

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { fontSize: 20, color: "#333" },
        drawerActiveTintColor: "#cd2653",
      }}
    >
      <Drawer.Screen
        name="FeedStack"
        component={FeedStack}
        options={{ title: "Feed" }}
      />
      <Drawer.Screen
        name="GroupsStack"
        component={GroupsStack}
        options={{ title: "Groups" }}
      />
    </Drawer.Navigator>
  );
};

const FeedStack = ({ navigation }) => {
  return (
    <Stack1.Navigator>
      <Stack1.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          headerTitle: () => <Logo />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={30} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack1.Navigator>
  );
};

const GroupsStack = ({ navigation }) => {
  return (
    <Stack2.Navigator
      screenOptions={{ headerTitleStyle: { fontSize: 18, color: "#333" } }}
    >
      <Stack2.Screen
        name="GroupsScreen"
        component={GroupsScreen}
        options={{
          headerTitle: "Groups",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={30} color="#333" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("NewGroupScreen")}
            >
              <Feather name="plus" size={30} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack2.Group screenOptions={{ presentation: "fullScreenModal" }}>
        <Stack2.Screen
          name="NewGroupScreen"
          component={NewGroupStack}
          options={{
            headerShown: false,
            headerTitle: "New Group",
          }}
        />
      </Stack2.Group>
    </Stack2.Navigator>
  );
};

const NewGroupStack = ({ navigation }) => {
  return (
    <NewGroupStackNav.Navigator
      screenOptions={{ headerTitleStyle: { fontSize: 18, color: "#333" } }}
    >
      <NewGroupStackNav.Screen
        name="NewGroupName"
        component={NewGroupNameScreen}
        options={{
          headerTitle: "New Group",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("GroupsScreen")}
            >
              <Feather name="x" size={30} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
      <NewGroupStackNav.Screen
        name="NewGroupCreate"
        component={NewGroupCreateScreen}
      />
    </NewGroupStackNav.Navigator>
  );
};

const FeedScreen = () => {
  return <View style={{ flex: 1, backgroundColor: "#fff" }}></View>;
};

const GroupsScreen = () => {
  return <View style={{ flex: 1, backgroundColor: "#fff" }}></View>;
};

const NewGroupNameScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Next"
          disabled={name !== "" ? false : true}
          color="#cd2653"
          onPress={() => (
            navigation.navigate("NewGroupCreate"), Keyboard.dismiss()
          )}
        />
      ),
    });
  }, [name]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 15,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Name</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          blurOnSubmit={false}
          autoFocus
          placeholder={'"Study group"'}
          placeholderTextColor={"#c3c3c3"}
          selectionColor="#cd2653"
          style={{
            height: 48,
            borderColor: "#c3c3c3",
            borderWidth: 1,
            borderRadius: 6,
            paddingLeft: 10,
            fontSize: 17,
          }}
        />
      </View>
    </View>
  );
};

const NewGroupCreateScreen = () => {
  return <View></View>;
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="inverted" />
      <MainDrawer />
    </NavigationContainer>
  );
}
