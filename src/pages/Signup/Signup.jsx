import { yupResolver } from "@hookform/resolvers/yup";
import { auto } from "@popperjs/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createUser } from "../../apis/users";
import { useNavigate } from "react-router";

function Signup() {
  // mettre en place la navigation
  const navigate = useNavigate();

  // Validation des données côté client avec yup
  const userSchema = yup.object({
    firstname: yup
      .string()
      .typeError("Format texte requis")
      .required("Le prénom est obligatoire")
      .min(3, "Min 3 caractères")
      .max(15, "Max 15 caractères"),
    lastname: yup
      .string()
      .typeError("Format texte requis")
      .required("Le nom est obligatoire")
      .min(3, "Min 3 caractères")
      .max(15, "Max 15 caractères"),
    email: yup.string().email("Format invalide").required("Email obligatoire"),
    password: yup
      .string()
      .min(6, "Min 6 caractères")
      .max(15, "Max 15 caractères"),
    confirmPassword: yup
      .string()
      .min(6, "Min 6 caractères")
      .max(15, "Max 15 caractères")
      .oneOf(
        [yup.ref("password", "")],
        "Les mots de passe ne correspondent pas",
      ),
  });

  // Valeurs par défaut
  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  const submit = async (user) => {
    clearErrors(); // Nettoyer les erreurs serveur si présentes
    console.log(user);
    // Extraire le nouvel objet utilisateur sans le doublon de mot de passe de confirmation
    const { confirmPassword, ...newUser } = user;

    try {
      const user = await createUser(newUser);

      if (user) {
        navigate("/connexion");
      }
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
      <section className="mt-4 mb-5">
        <h2 className="text-center">Page d'inscription</h2>
        <form
          action="#"
          onSubmit={handleSubmit(submit)}
          style={{ maxWidth: 500, margin: auto }}
          className="bg-secondary-subtle p-3 rounded-3"
        >
          <div className="mt-3">
            <label htmlFor="firstname" className="form-label">
              Prénom
            </label>
            <input
              {...register("firstname")}
              type="text"
              id="firstname"
              className="form-control"
            />
            {errors?.firstname && (
              <ul style={{ color: "red" }}>
                {Object.keys(errors.firstname.types).map((k) => (
                  <li key={k}>{errors.firstname.types[k]}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="lastname" className="form-label">
              Nom
            </label>
            <input
              {...register("lastname")}
              type="text"
              id="lastname"
              className="form-control"
            />
            {errors?.lastname && (
              <ul style={{ color: "red" }}>
                {Object.keys(errors.lastname.types).map((k) => (
                  <li key={k}>{errors.lastname.types[k]}</li>
                ))}
              </ul>
            )}
          </div>
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
          <div className="mt-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmation du mot de passe
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              className="form-control"
            />
            {errors?.confirmPassword && (
              <ul style={{ color: "red" }}>
                {Object.keys(errors.confirmPassword.types).map((k) => (
                  <li key={k}>{errors.confirmPassword.types[k]}</li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary text-white mt-4"
            disabled={isSubmitting}
          >
            Soumettre
          </button>
          {errors.generic && (
            <p className="text-danger mt-2">{errors.generic.message}</p>
          )}
        </form>
      </section>
    </>
  );
}

export default Signup;
