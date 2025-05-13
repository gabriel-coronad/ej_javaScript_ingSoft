import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from './src/config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function App() {
  useEffect(() => {
    const enviarMensaje = async () => {
      console.log('✅ Ejecutando desde App.js');

      try {
        const docRef = await addDoc(collection(db, 'test'), {
          texto: 'Hola desde App.js',
          creado: new Date(),
        });
        console.log('✅ Mensaje enviado. ID del documento:', docRef.id);
      } catch (error) {
        console.error('❌ Error al enviar mensaje:', error);
      }
    };

    enviarMensaje();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fce4ec', justifyContent: 'center', alignItems: 'center' }}>
      <Text>✅ App.js activo y funcionando</Text>
    </View>
  );
}