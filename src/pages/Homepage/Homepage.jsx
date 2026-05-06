import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Homepage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Je suis la page d'accueil</h1>
      {user && <p>Bonjour {user.firstname} !</p>}
    </>
  );
}

export default Homepage;
