import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, InteractionManager} from 'react-native';
import * as Contacts from 'expo-contacts';
import { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { render } from 'react-dom';

const styles = StyleSheet.caller

const Item = ({nome}) => {
    return(
        <View>
            <Text>{nome}</Text>
        </View>
    )
}

const Contatos = () => {
    const [contatos, setContatos] = useState([]);

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Emails],
            });
    
            if (data.length > 0) {
              setContatos(data);  
            }
          }
        })();
      }, []);

      const renderItem = (item) => {
        return(
            <Item nome={item.name} />
        )
      }

    return(
        <View>
            <Text>Contatos</Text>
            <FlatList 
                data={contatos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Contatos;