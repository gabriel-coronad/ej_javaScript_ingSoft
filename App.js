// App.js (en la raíz del proyecto)
/*import App from './src/app/App';
export default App;*/


/*import { Platform } from 'react-native';
import ChatScreen from './src/app/ChatScreen'; // o donde lo coloques

export default function App()
{
  // Detectar si es web o dispositivo móvil (ios/android)
  const tipoDispositivo = Platform.OS === 'web' ? 'web' : 'ios'; // puedes usar también 'android' si lo deseas
  console.log('🛠️ Tipo de dispositivo detectado:', tipoDispositivo);
 
  return <ChatScreen tipoDispositivo={tipoDispositivo} />;
}*/

// App.js
import { Platform } from 'react-native';
import ChatScreen from './src/app/ChatScreen'; // Asegúrate de que la ruta sea correcta

export default function App() {
  const tipoDispositivo = Platform.OS === 'web' ? 'web' : 'ios';
  return <ChatScreen tipoDispositivo={tipoDispositivo} />;
}