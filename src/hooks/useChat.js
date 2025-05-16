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
/*import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

//export function useChat(dispositivo)
export function useChat(dispositivo, idioma)
{
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => 
  {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) =>
    {
      const nuevosMensajes = [];
      snapshot.docChanges().forEach(change =>
      {
        if (change.type === 'added')
        {
          const data = change.doc.data();
          nuevosMensajes.push({ id: change.doc.id, ...data });
        }
      });

      if (nuevosMensajes.length > 0)
      {
        setMensajes(prev =>
        {
          const idsExistentes = new Set(prev.map(m => m.id));
          const nuevosSinDuplicados = nuevosMensajes.filter(m => !idsExistentes.has(m.id));
          return [...prev, ...nuevosSinDuplicados];
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const enviarMensaje = async (texto, idioma) =>
  {
    await addDoc(collection(db, 'messages'),
    {
      mensaje: texto,
      timestamp: new Date().toISOString(),
      emisor: dispositivo,
      idioma: idioma, // aquí se guarda el idioma del mensaje
    });
  };


  return { mensajes, enviarMensaje };
}
*/


// useChat.js
import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { translateText } from '../utils/translate';

export function useChat(dispositivo, idiomaApp) {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));

    // useChat.js (ajuste dentro del snapshot listener)
const unsubscribe = onSnapshot(q, (snapshot) => {
  const nuevosMensajes = [];

  snapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      const data = change.doc.data();
      const id = change.doc.id;

      const mensajeBase = {
        id,
        mensaje: data.mensaje,
        emisor: data.emisor,
        idiomaOriginal: data.idioma
      };

      nuevosMensajes.push(mensajeBase);

      // Si requiere traducción, procesarla aparte
      if (data.idioma && data.idioma !== idiomaApp) {
        translateText(data.mensaje, data.idioma, idiomaApp)
          .then((mensajeTraducido) => {
            setMensajes((prev) =>
              prev.map((m) =>
                m.id === id ? { ...m, mensaje: mensajeTraducido } : m
              )
            );
          })
          .catch((e) => {
            console.error('Error al traducir:', e);
          });
      }
    }
  });

  if (nuevosMensajes.length > 0) {
    setMensajes((prev) => {
      const idsExistentes = new Set(prev.map((m) => m.id));
      const nuevosSinDuplicados = nuevosMensajes.filter((m) => !idsExistentes.has(m.id));
      return [...prev, ...nuevosSinDuplicados];
    });
  }
});


    return () => unsubscribe();
  }, [idiomaApp]);

  const enviarMensaje = async (texto, idioma) => {
    await addDoc(collection(db, 'messages'), {
      mensaje: texto,
      timestamp: new Date().toISOString(),
      emisor: dispositivo,
      idioma: idioma, // se guarda el idioma del mensaje
    });
  };

  return { mensajes, enviarMensaje };
}
