import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Logout() {
  const nav = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      nav("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Não foi possível sair.");
    }
  };

  return (
    <div>

    </div>
  );
}

export default Logout;
