const API_USERS = 'https://127.0.0.1:8000/api/captains';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3Nzc3NjU3MTIsImV4cCI6MTc3Nzc2OTMxMiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImplYW5mZXpAZ21haWwuY29tIn0.atWfO3OtFWqmJ5pKh5KG85Irg9v_C8UJ6vGD_LeIZiWoOmBpeMSB8nkz2RcVb2oG3mRKt6ajchrem3DdZIGyXCbrsl0Pp8gYGg4KQxZZG-ylOc3x-2Oun2nag1tED1yUOGIKbwemvljMXJxxPjqzBb6s5Oi5L0leTQCLkdiRodSuO0XTrZDayGlMVdfzuBagRrn_xZS_XKC3rbx8iTS8UjdmsjhPbQczRohxnasiP0sy3xinLFP25wyOWy5IKIXMoC87dhKAul-i48m-U74UxtPenVsDYQdCqqsnAAZMUD3_AOiVhuV4Mfty4iU8IJzf8ia483MyEywCAs3jOzDUTQ';
export async function createUser(newUser){
    const response = await fetch(API_USERS, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
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
            'Authorization': `Bearer ${token}`        
        }
    })

    const body = await response.json();

    if(response.ok){
       return body; // réponse avec succès
    }else {
        throw body; // retourner une erreur
    }
}