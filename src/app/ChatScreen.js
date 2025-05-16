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
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity
} from 'react-native';
import { useChat } from '../hooks/useChat';

export default function ChatScreen({ tipoDispositivo }) {
  const [idioma, setIdioma] = useState('es');
  const { mensajes, enviarMensaje } = useChat(tipoDispositivo, idioma);
  const [texto, setTexto] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const flatListRef = useRef(null);

  // Scroll automático al recibir o enviar mensajes
  useEffect(() => {
    if (flatListRef.current && mensajes.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [mensajes]);

  const handleEnviar = () => {
    if (texto.trim()) {
      enviarMensaje(texto, idioma);
      setTexto('');
    }
  };

  const idiomas = [
    { codigo: 'es', nombre: 'Español' },
    { codigo: 'en', nombre: 'Inglés' },
    { codigo: 'fr', nombre: 'Francés' },
    { codigo: 'pt', nombre: 'Portugués' },
    { codigo: 'de', nombre: 'Alemán' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
        <FlatList
          ref={flatListRef}
          data={mensajes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const esRemitente = item.emisor === tipoDispositivo;
            return (
              <View
                style={{
                  alignSelf: esRemitente ? 'flex-end' : 'flex-start',
                  backgroundColor: esRemitente ? '#dcf8c6' : '#eee',
                  marginVertical: 4,
                  padding: 10,
                  borderRadius: 8,
                  maxWidth: '80%',
                }}
              >
                <Text style={{ color: 'black', fontSize: 16 }}>{item.mensaje}</Text>
              </View>
            );
          }}
          contentContainerStyle={{ paddingBottom: 10 }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginTop: 8,
          }}
        >
          <TextInput
            value={texto}
            onChangeText={setTexto}
            placeholder="Escribe tu mensaje"
            placeholderTextColor="gray"
            style={{
              flex: 1,
              borderWidth: 1,
              padding: 8,
              borderRadius: 6,
              color: 'black',
              fontSize: 16,
            }}
          />
          <Button title="Enviar" onPress={handleEnviar} />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              marginLeft: 6,
              paddingVertical: 8,
              paddingHorizontal: 10,
              backgroundColor: '#ddd',
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, color: 'black' }}>{idioma}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: 220,
              alignItems: 'center',
            }}
          >
            {idiomas.map(({ codigo, nombre }) => (
              <TouchableOpacity
                key={codigo}
                onPress={() => {
                  setIdioma(codigo);
                  setModalVisible(false);
                }}
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 16, color: 'black' }}>{nombre}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 12,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: '#f44336',
                borderRadius: 6,
              }}
            >
              <Text style={{ fontSize: 16, color: 'white' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
