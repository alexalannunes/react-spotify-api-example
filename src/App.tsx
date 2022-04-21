import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Callback } from "./pages/callback/Callback";
import { Home } from "./pages/home/Home";
import { AuthProvider, Layout } from "./pages/Layout";
import { Login } from "./pages/login/Loing";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
