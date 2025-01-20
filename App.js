import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];

const App = () => {
  const [mydata, setMyData] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=autosafetyawards&format=json&case=default")
        .then((response) => response.json())
        .then((myJson) => {
          if (originalData.length < 1) {
            setMyData(myJson);
            originalData = myJson;
          }
        })
        .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filterData = (text) => {
    if (text !== '') {
      let filteredData = originalData.filter((item) =>
          item.Manufacturer &&
          item.Manufacturer.toLowerCase().includes(text.toLowerCase())
      );
      setMyData(filteredData);
    } else {
      setMyData(originalData);
    }
  };

  const renderItem = ({ item }) => {
    return (
        <View style={styles.card}>
          <Text style={styles.title}>{item.Manufacturer}</Text>
          <Text style={styles.subtitle}>{item.AutoName}</Text>
          <Text style={styles.details}>{item.Award}</Text>
          <Text style={styles.details}>Year: {item.Year}</Text>
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <StatusBar />
        <Text style={styles.header}>Auto Safety Awards</Text>
        <TextInput
            style={styles.searchBox}
            placeholder="Search by Manufacturer..."
            onChangeText={(text) => filterData(text)}
        />
        <FlatList
            data={mydata}
            keyExtractor={(item) => item.ID.toString()}
            renderItem={renderItem}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf0',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#b8860b',
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#ffebcd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8b4513',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#a0522d',
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    color: '#696969',
  },
});

export default App;
