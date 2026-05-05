import { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Loading from "./components/loading";
import AuthProvider from "./components/AuthProvider/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <main className="container">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
