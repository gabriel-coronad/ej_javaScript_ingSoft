/*import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export function useChat(dispositivo) {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const nuevosMensajes = [];
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const data = change.doc.data();
          // Solo mostrar mensajes del otro dispositivo
          if (data.emisor !== dispositivo) {
            nuevosMensajes.push({ id: change.doc.id, ...data });
          }
        }
      });

      if (nuevosMensajes.length > 0) {
        setMensajes(prev => [...prev, ...nuevosMensajes]);
      }
    });

    return () => unsubscribe();
  }, []);

  const enviarMensaje = async (texto) => {
    await addDoc(collection(db, 'messages'), {
      mensaje: texto,
      timestamp: new Date().toISOString(),
      emisor: dispositivo,
    });
  };

  return { mensajes, enviarMensaje };
}
*/





// useChat.js
import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export function useChat(dispositivo) {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const nuevosMensajes = [];
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const data = change.doc.data();
          nuevosMensajes.push({ id: change.doc.id, ...data });
        }
      });

      if (nuevosMensajes.length > 0) {
        setMensajes(prev => [...prev, ...nuevosMensajes]);
      }
    });

    return () => unsubscribe();
  }, []);

  const enviarMensaje = async (texto) => {
    await addDoc(collection(db, 'messages'), {
      mensaje: texto,
      timestamp: new Date().toISOString(),
      emisor: dispositivo,
    });
  };

  return { mensajes, enviarMensaje };
}
