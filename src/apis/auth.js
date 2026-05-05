const API = '/api'; // utiliser le proxy Vite en développement pour le routage

// Requête pour la connexion
async function signin(credentials) {
  try {
    const response = await fetch(`${API}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    const text = await response.text();
    const body = text ? JSON.parse(text) : null;

    if (response.ok) {
      return body;
    }

    throw new Error(body?.message || "Erreur de connexion");
  } catch (error) {
    throw new Error(error.message || "Réponse serveur invalide", { cause: error });
  }
}

async function getCurrentUser(){
    try {
        const response = await fetch(`${API}/me`,{
            credentials: 'include'
        });

        const body = await response.json();

        if(response.ok){
            return { user :body  }
        }else {
            throw  body;
        }
    } catch (error) {
       return {error: error.message}
    }
}

export {signin, getCurrentUser};