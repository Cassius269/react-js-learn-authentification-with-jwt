import { Suspense, useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Loading from "./components/loading";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useLoaderData(); // récupérer l'utilisateur depuis le loader de la route racine
  const [currentUser, setCurrentUser] = useState(user ?? null);

  useEffect(() => {
    if (user) {
      console.log("Utilisateur connecté:", user);
    } else {
      console.log("Utilisateur non connecté");
    }
  }, [user]);

  return (
    <>
      <AuthContext value={currentUser}>
        <Header />
        <main className="container">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>

        <Footer />
      </AuthContext>
    </>
  );
}

export default App;
