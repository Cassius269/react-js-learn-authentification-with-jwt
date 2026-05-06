import { useContext, useState } from "react";
import styles from "../../assets/styles/layouts/Header.module.scss";
import Popover from "./Popover";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const { user, logout } = useContext(AuthContext);
  console.log("header user =", user);
  const handleClick = () => {
    setIsActive(!isActive); // Changer la valeur de l'état et re-render le composant <Header />
  };

  return (
    <header className="container-fluid border border-2 p-2 d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <NavLink to="/">
          <img
            className="ms-3"
            src="https://svgsilh.com/svg/763193.svg"
            alt="logo"
            width={25}
          />
        </NavLink>
      </div>

      <ul
        id={styles.divButtons}
        className="d-flex flex-direction-row gap-4 gap-md-5 align-items-center"
      >
        {user && (
          <li>
            <NavLink to="/profile">
              <button type="button" className="btn btn-outline-success">
                Profile
              </button>
            </NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink to="/inscription">
              <button
                onClick={() =>
                  console.log(
                    "Aller vers la page ajout de recette depuis le header desktop",
                  )
                }
                type="button"
                className="btn btn-secondary d-flex align-items-center gap-2 rounded-3 p-3 text-white"
              >
                <i className="bi bi-plus"></i>
                S'insrire
              </button>
            </NavLink>
          </li>
        )}
        {user ? (
          <li>
            <button
              onClick={() => logout()}
              type="button"
              className="btn btn-dark"
            >
              Déconnecter
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/connexion">
              <button type="button" className="btn btn-dark">
                Connexion
              </button>
            </NavLink>
          </li>
        )}
      </ul>

      {/* Header mobile */}
      {isActive && <Popover setIsActive={setIsActive} user={user} />}
      <i
        popoverTarget="my-popover"
        role="button"
        onClick={handleClick}
        id={styles.burgerIcon}
        className={`d-sm-block text-secondary d-md-none bi bi-${isActive ? "circle text-danger" : "list"} text-primary fs-1`}
        style={{ zIndex: 40 }}
      ></i>
    </header>
  );
}

export default Header;
