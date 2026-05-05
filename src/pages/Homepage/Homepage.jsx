import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Homepage() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <h1>Je suis la page d'accueil</h1>
      <p>Utilisateur connecté : {user?.firstname}</p>
    </>
  );
}

export default Homepage;
