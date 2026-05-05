import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);
  console.log("hello", user?.firstname);

  return (
    <>
      <article>
        <h1>Je suis la page de profile</h1>
        <ul>
          <li>
            <strong>Nom</strong>: {user?.firstname}
          </li>
          <li>
            <strong>Prénom</strong>: {user?.lastname}
          </li>
          <li>
            <strong>Email</strong>: {user?.email}
          </li>
        </ul>
      </article>
    </>
  );
}

export default Profile;
