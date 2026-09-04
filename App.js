import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { FlatList } from 'react-native';

export default function App() {

  const [dados, setDados] = useState([])

  async function carregaProdutos() {
    try {
      let resposta = await fetch("https://fakestoreapi.com/products/");
      if (resposta.status == 200) {
        let novosDados = await resposta.json();
        setDados(novosDados);
      }
      else {
        throw Exception("Falha no carregamento de dados")
      }
    }
    catch (e) {
      console.log(e)
      throw Exception("Falha no carregamento de dados")
    }
  }

  useEffect(() => {
    carregaProdutos()
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={styles.container}>
        <FlatList
          data={dados}
          renderItem={({ item }) => <View style={styles.card}>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
            <Image
              style={{ width: 200, height: 200 }}
              source={item.image} />
          </View>}
          keyExtractor={item => item.id}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
