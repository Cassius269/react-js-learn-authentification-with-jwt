import { NavLink } from "react-router";
import popoverStyles from "../../assets/styles/layouts/PopOver.module.scss";

const Popover = ({ setIsActive, user, logout }) => {
  return (
    <>
      <div className="position-relative">
        <ul popover="" id="my-popover" className={popoverStyles.myPopover}>
          {!user && (
            <li>
              <NavLink
                to="/inscription"
                onClick={() => {
                  setIsActive(false);
                  console.log(
                    "aller vers la page d'inscription depuis popover mobile",
                  );
                }}
              >
                S'inscrire
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink to="/profile" onClick={() => setIsActive(false)}>
                Profile
              </NavLink>
            </li>
          )}
          {user ? (
            <li>
              <NavLink
                onClick={() => {
                  logout();
                  setIsActive(false);
                }}
                to="/connexion"
              >
                Déconnecter
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink onClick={() => setIsActive(false)} to="/connexion">
                Connexion
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Popover;
