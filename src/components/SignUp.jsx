import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import instagram from "../assets/img/instagram.png";
import galera from "../assets/img/galera.png";
import { auth } from "../services/FirebaseConfig";
import { db } from "../services/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        bio: "",
        email: user.email,
        name: name,
        profilePicUrl:
          "",
        username: username,
        postsN: 0,
        followedBy: [],
        following: []
      });

      alert("Usuário registrado", user.user);
      nav("/");
    } catch (erro) {
      console.error("Erro de registro", erro);
      alert("Erro no registro, tente novamente");
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center pb-10">
        <div className="flex flex-row gap-4 items-center">
          <div className="w-[730px] max-lg:hidden">
            <img src={galera} className="p-40" />
          </div>
          <div className="w-[265px] flex flex-col justify-center gap-10 items-center">
            <div className=" flex flex-col gap-4 items-center">
              <img src={instagram} className="w-[180px] font-semibold" />
              <p className="text-justify">
                Cadastre-se para ver fotos e vídeos dos seus amigos.
              </p>
            </div>
            <form
              onSubmit={handleSignUp}
              className="flex flex-col w-full gap-3 items-center"
            >
              <div className="flex flex-col w-full gap-2">
                <input
                  className="bg-neutral-50 p-2 w-full rounded-sm border-1 border-gray-300"
                  type="email"
                  placeholder="E-mail:"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="bg-neutral-50 p-2 w-full rounded-sm border-1 border-gray-300"
                  type="password"
                  placeholder="Senha:"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="bg-neutral-50 p-2 w-full rounded-sm border-1 border-gray-300"
                  type="text"
                  placeholder="Nome completo:"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="bg-neutral-50 p-2 w-full rounded-sm border-1 border-gray-300"
                  type="text"
                  placeholder="Nome de usuário:"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer font-semibold p-1 bg-indigo-400 text-white rounded-lg"
              >
                Cadastrar
              </button>
              <p>
                Tem uma conta?{" "}
                <Link to="/login" className="text-indigo-600 cursor-pointer">
                  Conecte-se
                </Link>
              </p>
            </form>
          </div>
        </div>
        <p className="text-gray-500 text-[14px]">© 2025 Instagram from Meta</p>
      </div>
    </div>
  );
}

export default SignUp;
