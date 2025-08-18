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
          "data:image/jpeg;base64,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",
        username: username,
        postsN: 0,
        followersN: 0,
        followingN: 0
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
