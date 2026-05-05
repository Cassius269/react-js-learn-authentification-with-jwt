const API_USERS = '/api/captains'; // passer par le proxy Vite en phase de développement

export async function createUser(newUser){
    const response = await fetch(API_USERS, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
        credentials: 'include'
    })

    const body = await response.json();

    if(response.ok){
        return body;
    }else {
        throw body;
    }
}

export async function deleteUser(idUser){
     const response = await fetch(`${API_USERS}/${idUser}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include' // utiliser le token pour s'authentier dans la requête
    })

    const body = await response.json();

    if(response.ok){
       return body; // réponse avec succès
    }else {
        throw body; // retourner une erreur
    }
}