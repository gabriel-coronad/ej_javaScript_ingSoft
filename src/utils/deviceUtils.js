// src/utils/deviceUtils.js
import { Platform } from 'react-native';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase'; // Ajusta la ruta si es necesario

export const registrarDispositivo = async () => {
  const tipo = Platform.OS === 'ios' ? 'ios' : Platform.OS === 'web' ? 'web' : 'otro';

  try {
    await setDoc(doc(db, 'dispositivos', tipo), {
      conectado: true,
      timestamp: serverTimestamp(),
    });
    console.log(`✅ Dispositivo ${tipo} registrado`);
  } catch (error) {
    console.error(`❌ Error registrando el dispositivo ${tipo}:`, error);
  }
};

export const verificarConexiones = async () => {
  try {
    const iosDoc = await getDoc(doc(db, 'dispositivos', 'ios'));
    const webDoc = await getDoc(doc(db, 'dispositivos', 'web'));

    const iosConectado = iosDoc.exists() && iosDoc.data().conectado;
    const webConectado = webDoc.exists() && webDoc.data().conectado;

    if (iosConectado && webConectado) {
      console.log('✅ Ambos dispositivos están conectados');
    } 
    else {
      console.log('ℹ️ Conexión parcial:');
      if (iosConectado) console.log('- iOS conectado');
      if (webConectado) console.log('- Web conectado');
    }
  } catch (error) {
    console.error('❌ Error verificando conexiones:', error);
  }
};





/*// src/utils/deviceUtils.js
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const registrarDispositivo = async (tipo) => {
  try {
    await setDoc(doc(db, 'dispositivos', tipo), {
      conectado: true,
      timestamp: serverTimestamp(),
    });
    console.log(`✅ Dispositivo ${tipo} registrado`);
  } catch (error) {
    console.error(`❌ Error registrando el dispositivo ${tipo}:`, error);
  }
};

export const verificarConexiones = async () => {
  try {
    const iosDoc = await getDoc(doc(db, 'dispositivos', 'ios'));
    const webDoc = await getDoc(doc(db, 'dispositivos', 'web'));

    const iosConectado = iosDoc.exists() && iosDoc.data().conectado;
    const webConectado = webDoc.exists() && webDoc.data().conectado;

    if (iosConectado && webConectado) {
      console.log('✅ Ambos dispositivos están conectados');
    } else {
      console.log('ℹ️ Conexión parcial:');
      if (iosConectado) console.log('- iOS conectado');
      if (webConectado) console.log('- Web conectado');
    }
  } catch (error) {
    console.error('❌ Error verificando conexiones:', error);
  }
};
*/