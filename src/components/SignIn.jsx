import { Link } from "react-router-dom";
import instagram from "../assets/img/instagram.png";
import galera from "../assets/img/galera.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/FirebaseConfig";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado");
      nav("/");
    } catch (erro) {
      alert("Erro no login, tente novamente");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pb-10">
      <div className="flex flex-row gap-4 items-center">
        <div className="w-[730px] max-lg:hidden">
          <img src={galera} className="p-40" />
        </div>
        <div className="w-[265px] flex flex-col justify-center gap-10 items-center lg:mr-30">
          <img src={instagram} className="w-[180px]" />
          <form onSubmit={handleSignIn} className="flex flex-col w-full gap-3">
            <div className="flex flex-col w-full gap-2">
              <input
                className="bg-neutral-50 p-2 w-full rounded-sm border-1 border-gray-300"
                type="email"
                placeholder="E-mail:"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <input
                className="bg-neutral-50 p-2 w-full rounded-sm border-1 border-gray-300"
                type="password"
                placeholder="Senha:"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer font-semibold p-1 bg-indigo-400 text-white rounded-lg"
            >
              Entrar
            </button>
            <p>
              Não tem uma conta?{" "}
              <Link to="/register" className="text-indigo-600 cursor-pointer">
                Cadastre-se
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
      <p className="text-gray-500 text-[14px]">© 2025 Instagram from Meta</p>
    </div>
  );
}

export default SignIn;
