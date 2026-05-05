import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLoaderData } from "react-router";

function AuthProvider({ children }) {
  const initialUser = useLoaderData(); // récupérer l'utilisateur depuis le loader de la route racine
  const [currentUser, setCurrentUser] = useState(initialUser.user ?? null); // état réel pou

  useEffect(() => {
    setCurrentUser(initialUser.user ?? null);
  }, [initialUser]);

  // Fonction de connexion
  const login = (userToConnect) => {
    setCurrentUser(userToConnect);
  };

  // Fonction de déconnexion
  const logout = () => {
    if (currentUser) {
      setCurrentUser(null);
    }
  };

  return (
    <>
      <AuthContext value={{ user: currentUser, login, logout }}>
        {children} {/** retourner l'ensemble de l'application */}
      </AuthContext>
      ;
    </>
  );
}

export default AuthProvider;
