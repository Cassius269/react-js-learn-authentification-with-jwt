import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLoaderData } from "react-router";
import { signin, signout } from "../../apis/auth";

function AuthProvider({ children }) {
  const initialUser = useLoaderData(); // récupérer l'utilisateur depuis le loader de la route racine
  const [currentUser, setCurrentUser] = useState(initialUser.user ?? null); // état réel pour l'utilisateur courant connecté

  useEffect(() => {
    setCurrentUser(initialUser.user ?? null);
  }, [initialUser]);

  // Fonction de connexion
  const login = async (userToConnect) => {
    const newUser = await signin(userToConnect);
    setCurrentUser(newUser);
  };

  // // Fonction de déconnexion
  const logout = async () => {
    await signout();
    setCurrentUser(null);
  };

  return (
    <>
      <AuthContext
        value={{
          user: currentUser,
          login,
          logout,
        }}
      >
        {children} {/** retourner l'ensemble de l'application */}
      </AuthContext>
      ;
    </>
  );
}

export default AuthProvider;
