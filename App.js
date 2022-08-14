import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

const App = () => {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    getDadJoke();
  }, []);

  const getDadJoke = async () => {
    try {
      const response = await fetch('https://icanhazdadjoke.com/',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
      )
      const data = await response.json();
      setJoke(data.joke);
    } catch (e) {
      console.log("Can't Fetch Dad Joke ", e);
    }
  }

  return (
    <ImageBackground
      source={require('./assets/bg.jpg')}
      resizeMode='cover'
      style={styles.image}
    >
      <View>
        <Text style={styles.heading}>Dad Jokes</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.joke}>
          {joke}
        </Text>
        <StatusBar style="auto" />
        <Button
          onPress={getDadJoke}
          title="Get me another  dad joke"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    textAlign: 'center',
    paddingTop: 50,
    fontSize: 50,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white'
  },
  image: {
    height: "100%",
    width: '100%',
    justifyContent: 'center'
  },
  joke: {
    paddingBottom: 40,
    maxWidth: '90%',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default App;