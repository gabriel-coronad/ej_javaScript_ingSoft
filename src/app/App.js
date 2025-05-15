// src/app/App.js
/*import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from '../config/firebase';
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
}*/

// src/app/App.js
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { registrarDispositivo, verificarConexiones } from '../utils/deviceUtils'; // Ajusta según ubicación real

export default function App() {
  useEffect(() => {
    const init = async () => {
      await registrarDispositivo();
      await verificarConexiones();
    };
    init();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fce4ec' }}>
      <Text>📱 App conectada</Text>
    </View>
  );
}
