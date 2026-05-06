import { yupResolver } from "@hookform/resolvers/yup";
import { auto } from "@popperjs/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Signin() {
  const { user, login } = useContext(AuthContext);

  // Validation des données côté client avec yup
  const userSchema = yup.object({
    email: yup.string().email("Format invalide").required("Email obligatoire"),
    password: yup
      .string()
      .min(6, "Min 6 caractères")
      .max(15, "Max 15 caractères"),
  });

  // Valeurs par défaut
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    handleSubmit,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(userSchema), // lier la validation de données avec le formulaire
    criteriaMode: "all",
    mode: "onSubmit",
  });

  // Gestion de la soumission du formulaire
  const submit = async (credentials) => {
    console.log(credentials);

    try {
      clearErrors(); // Nettoyer les erreurs serveur si présentes
      console.log(credentials);

      // récupérer le token si identifiants valides
      await login(credentials);
      console.log("Authentification réussie");
    } catch (error) {
      setError("generic", {
        type: "server",
        message:
          error.message ||
          error.detail ||
          error.description ||
          "Erreur serveur",
      });
    }
  };

  return (
    <>
      {user ? (
        <Navigate to="/profile" />
      ) : (
        <section className="mt-4 mb-5">
          <h2 className="text-center">Page de connexion</h2>
          <form
            action="#"
            onSubmit={handleSubmit(submit)}
            style={{ maxWidth: 500, margin: auto }}
            className="bg-secondary-subtle p-3 rounded-3"
          >
            <div className="mt-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="form-control"
              />
              {errors?.email && (
                <ul style={{ color: "red" }}>
                  {Object.keys(errors.email.types).map((k) => (
                    <li key={k}>{errors.email.types[k]}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className="form-control"
              />
              {errors?.password && (
                <ul style={{ color: "red" }}>
                  {Object.keys(errors.password.types).map((k) => (
                    <li key={k}>{errors.password.types[k]}</li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary text-white mt-4"
              disabled={isSubmitting}
            >
              Se connecter
            </button>
            {errors.generic && (
              <p className="text-danger mt-2">{errors.generic.message}</p>
            )}
          </form>
        </section>
      )}
    </>
  );
}

export default Signin;
