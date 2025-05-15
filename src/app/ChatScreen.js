/*import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { useChat } from '../hooks/useChat'; // cambia ruta según sea necesario

export default function ChatScreen({ tipoDispositivo }) {
  const { mensajes, enviarMensaje } = useChat(tipoDispositivo);
  const [texto, setTexto] = useState('');

  const handleEnviar = () => {
    if (texto.trim()) {
      enviarMensaje(texto);
      setTexto('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'white'}}>
      <FlatList
        data={mensajes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ padding: 8, backgroundColor: '#eee', marginVertical: 4, color: 'black' }}>
            {item.mensaje}
          </Text>
        )}
        
      />
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Escribe tu mensaje"
        placeholderTextColor= "black"
        style={{ 
          borderWidth: 1, 
          padding: 8, 
          marginBottom: 8, 
          color: 'black' }}
      />
      <Button title="Enviar" onPress={handleEnviar} />
    </View>
  );
}
*/



// ChatScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { useChat } from '../hooks/useChat';

export default function ChatScreen({ tipoDispositivo }) {
  const { mensajes, enviarMensaje } = useChat(tipoDispositivo);
  const [texto, setTexto] = useState('');

  const handleEnviar = () => {
    if (texto.trim()) {
      enviarMensaje(texto);
      setTexto('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
      <FlatList
        data={mensajes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const esRemitente = item.emisor === tipoDispositivo;
          return (
            <View style={{
              alignSelf: esRemitente ? 'flex-end' : 'flex-start',
              backgroundColor: esRemitente ? '#dcf8c6' : '#eee',
              marginVertical: 4,
              padding: 10,
              borderRadius: 8,
              maxWidth: '80%',
            }}>
              <Text style={{ color: 'black' }}>{item.mensaje}</Text>
            </View>
          );
        }}
      />
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Escribe tu mensaje"
        placeholderTextColor="black"
        style={{
          borderWidth: 1,
          padding: 8,
          marginBottom: 8,
          color: 'black'
        }}
      />
      <Button title="Enviar" onPress={handleEnviar} />
    </View>
  );
}
