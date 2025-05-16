// translate.js
const subscriptionKey = '4mVhGb0DQcc3RUue7aRtr8iQXavJlVT3Jud4m2i44egk57js7mkXJQQJ99BEACLArgHXJ3w3AAAbACOG2szM'; // Reemplaza con tu clave
const endpoint = 'https://api.cognitive.microsofttranslator.com';
const region = 'southcentralus'; // Ejemplo: 'global' o 'eastus'

export async function translateText(text, from, to) {
  try {
    if (!text || !from || !to || from === to) return text;

    const response = await fetch(`${endpoint}/translate?api-version=3.0&from=${from.toLowerCase()}&to=${to.toLowerCase()}`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': region,
        'Content-type': 'application/json',
      },
      body: JSON.stringify([{ Text: text }]),
    });

    const data = await response.json();

    if (data && data[0] && data[0].translations && data[0].translations[0]) {
      return data[0].translations[0].text;
    }

    console.warn('Respuesta inesperada de la API de traducción:', data);
    return text;
  } catch (error) {
    console.error('Error al traducir:', error);
    return text;
  }
}
