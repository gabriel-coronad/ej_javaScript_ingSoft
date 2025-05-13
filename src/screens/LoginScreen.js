import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { auth } from '../config/firebase'; // ✅ Ajustado a tu ruta
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '247925821988-df70a0tjl5av6q39ghf5mt6jr0ehn6o0.apps.googleusercontent.com',
    iosClientId: '247925821988-cjqndmre1e9ptg9p8iprp4dr49etrcbh.apps.googleusercontent.com',
    webClientId: '247925821988-ct29k8hjegmm4l1fop3d02hs84dq4e7k.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(userCredential => {
          console.log('✅ Usuario autenticado:', userCredential.user.email);
        })
        .catch(error => {
          console.error('❌ Error al autenticar:', error);
        });
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Iniciar sesión con Google</Text>
      <Button
        disabled={!request}
        title="Iniciar sesión"
        onPress={() => promptAsync()}
      />
    </View>
  );
}
