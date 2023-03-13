import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";

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
        drawerActiveTintColor: "#ff878a",
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
              <Feather name="menu" size={28} color="#333" />
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
              <Feather name="menu" size={28} color="#333" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("NewGroupScreen")}
            >
              <Feather name="plus" size={28} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack2.Group screenOptions={{ presentation: "modal" }}>
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
          headerTitle: "New group",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("GroupsScreen")}
            >
              <Feather name="x" size={28} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
      <NewGroupStackNav.Screen
        name="NewGroupInvite"
        component={NewGroupInviteScreen}
        options={{
          headerTitle: "Invite people",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("NewGroupName")}
            >
              <Feather name="arrow-left" size={28} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </NewGroupStackNav.Navigator>
  );
};

const FeedScreen = () => {
  return <View style={{ flex: 1, backgroundColor: "#fff" }}></View>;
};

const GroupsScreen = () => {
  const [groups, setGroups] = useState([
    { name: "StanfordSummer", members: 1, posts: 1, id: 1 },
    { name: "TheBoys", members: 3, posts: 8, id: 2 },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
};

const NewGroupNameScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  const setRandomPlaceholder = () => {
    const placeholders = [
      '"Study Group"',
      '"Hiking Gear"',
      '"Paris Vacation"',
      '"Restaurants to visit"',
    ];
    const index = Math.floor(Math.random() * placeholders.length);
    return placeholders[index];
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={name.trim().length !== 0 ? false : true}
          onPress={() => navigation.navigate("NewGroupInvite")}
        >
          {name.trim().length !== 0 ? (
            <Text style={{ fontSize: 17, color: "#ff878a", fontWeight: "600" }}>
              Next
            </Text>
          ) : (
            <Text style={{ fontSize: 17, color: "#c3c3c3", fontWeight: "600" }}>
              Next
            </Text>
          )}
        </TouchableOpacity>
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
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Group name</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          blurOnSubmit={false}
          autoFocus
          placeholder={setRandomPlaceholder()}
          placeholderTextColor={"#c3c3c3"}
          selectionColor="#ff878a"
          spellCheck={false}
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

const NewGroupInviteScreen = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [groups, setGroups] = useState([
    { name: "StanfordSummer", members: 1, posts: 1, id: 1 },
    { name: "TheBoys", members: 3, posts: 8, id: 2 },
  ]);

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"Find friends"}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        // onChange={(item) => {

        // }}
      />
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "#c3c3c3",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <MainDrawer />
    </NavigationContainer>
  );
}
