import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { Container, Header, Left, Body, Right, Title, Card, CardItem, Thumbnail, Content, Item ,Button,Icon} from "native-base";
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useWindowDimensions } from "react-native";
import {CountDown} from "react-native-countdown-component";
// import { AnimatedCircularProgress } from "react-native-circular-progress";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";


// home screen component
function HomeScreen({navigation}) {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/codeifitech/fitness-app/master/exercises.json"
      // "https://reactnative.dev/movies.json"
      // `http://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=57516341cc58436a9c5506b5a83a86d0`
      // 'https://images.ctfassets.net'
    )
      .then((response) => response.json())
      .then((json) => setData(json.exercises))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Container>
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MyModal", {
                    itemId: item.id,
                    itemImage: item.thumbnail,
                    itemGif: item.gif,
                    itemSec: item.seconds
                  })
                }
              >
                <Card style={styles.exercises}>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: item.thumbnail }}
                      style={{ height: 200, width: null, flex: 1 }}
                    />
                  </CardItem>
                  <CardItem style={styles.cardFoot}>
                    <Left>
                      <Body>
                        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </>
          )}
        />
      </Container>
    </>
  );
}

// details screen component
function ModalScreen({route,navigation}) {
  const [ini,finals] = useState(20)
  const percentage = 66;
  const { itemImage,itemGif } = route.params;
  const windowWidth = useWindowDimensions().width ;
  const windowHeight = useWindowDimensions().height ;
  return (
    <>
      <Container>
        <ImageBackground
          style={{ flex: 1, justifyContent: "flex-end" }}
          source={{
            uri: itemImage,
          }}
        >
          <Button
            style={{
              width: "100%",
              height: 70,
              // marginBottom:,
              backgroundColor: "lightpink",
            }}
            onPress={() =>
              navigation.navigate("Details", {
                itemGif,
                itemImage
              })
            }
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginLeft: windowWidth / 3,
              }}
            >
              Start Exercise
            </Text>
          </Button>
          <Button
            style={{
              width: "100%",
              height: 70,
              // marginBottom:,
              backgroundColor: "lightyellow",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginLeft: windowWidth / 3,
              }}
              onPress={() =>
                navigation.navigate("Home")
              }
            >
              Go to Home
            </Text>
          </Button>
        </ImageBackground>
      </Container>
    </>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemGif,itemImage } = route.params;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <CountDown
        until={30}
        onFinish={() =>
          navigation.navigate("MyModal", {
            itemImage,
            itemGif,
          })
        }
        size={20}
        timeToShow={["M", "S"]}
        timeLabels={{ m: "MM", s: "SS" }}
      />

      <Image
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: windowWidth,
          height: windowHeight - 250,
        }}
        source={{
          uri: itemGif,
        }}
      />
    </View>
  );
}

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
// exports starts here
function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Exercise Hub",
          headerStyle: {
            backgroundColor: "lightyellow",
          },
        }}
      />
      <MainStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: "WorkOut",
          headerStyle: {
            backgroundColor: "lightyellow",
          },
        }}
      />
    </MainStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="MyModal" component={ModalScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;



const styles = StyleSheet.create({
  header: {
    backgroundColor: "ghostwhite",
  },
  exercises: {
    marginTop: 12,
    marginRight: 12,
    marginLeft: 12,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 10,

    elevation: 7,
  },
  cardFoot: {
    backgroundColor: "bisque",
  },
});

