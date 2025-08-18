import logo from "../assets/img/instagram.png";
import {
  Heart,
  MessageCircle,
  Search,
  Film,
  Compass,
  SquarePlus,
  Instagram,
  House,
  Menu,
  User,
} from "lucide-react";
import NewPost from "./NewPost";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Authentication";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser, loading } = useAuth();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="p-3 md:hidden px-6 w-full fixed bg-white border-b-gray-50 shadow-md flex justify-between">
        <img src={logo} className="h-8" />
        <div className="flex flex-row gap-5">
          <Heart />
          <MessageCircle />
        </div>
      </div>
      <div className="py-5 px-4 fixed flex bg-white justify-around w-full bottom-0 md:hidden border-t-gray-50 shadow-[0_-2px_10px_rgba(0,0,0,0.12)]">
        <Link to="/">
          <House />
        </Link>
        <Search />
        <SquarePlus onClick={openModal} />
        <Film />
        <Link to={`/userprofile/${currentUser.uid}`}>
          <User />
        </Link>
      </div>
      <div className="px-8 py-8 pb-14 xl:pr-30 fixed h-full max-md:hidden border-b-gray-50 shadow-md flex flex-col justify-between">
        <div className="flex flex-col gap-12">
          <Instagram className="hover:bg-gray-100 xl:hidden hover:rounded-lg cursor-pointer" />
          <img src={logo} className="h-8 cursor-pointer max-xl:hidden" />
          <div className="flex flex-col gap-7">
            <Link to='/'>
              <div className="flex items-center flex-row gap-3">
                <House className="hover:bg-gray-100 hover:rounded-lg cursor-pointer" />
                <p className="max-xl:hidden">Página inicial</p>
              </div>
            </Link>
            <div className="flex items-center flex-row gap-3">
              <Search className="hover:bg-gray-100 hover:rounded-lg cursor-pointer" />
              <p className="max-xl:hidden">Pesquisa</p>
            </div>
            <div className="flex items-center flex-row gap-3">
              <Compass className="hover:bg-gray-100 hover:rounded-lg cursor-pointer" />
              <p className="max-xl:hidden">Explorar</p>
            </div>
            <div className="flex items-center flex-row gap-3">
              <Film className="hover:bg-gray-100 hover:rounded-lg cursor-pointer" />
              <p className="max-xl:hidden">Reels</p>
            </div>
            <div className="flex items-center flex-row gap-3">
              <MessageCircle className="hover:bg-gray-100 hover:rounded-lg cursor-pointer" />
              <p className="max-xl:hidden">Mensagens</p>
            </div>
            <div className="flex items-center flex-row gap-3">
              <Heart className="hover:bg-gray-100 hover:rounded-lg cursor-pointer" />
              <p className="max-xl:hidden">Notificações</p>
            </div>
            <div className="flex items-center flex-row gap-3">
              <SquarePlus
                onClick={openModal}
                className="hover:bg-gray-100 hover:rounded-lg cursor-pointer"
              />
              <p className="max-xl:hidden">Criar</p>
            </div>
            <Link to={`/userprofile/${currentUser.uid}`}>
              <div className="flex items-center flex-row gap-3">
                <User className="hover:bg-gray-100 hover:rounded-lg cursor-pointer" />
                <p className="max-xl:hidden">Usuário</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center flex-row gap-3">
          <Menu className="hover:bg-gray-100 hover:rounded-lg cursor-pointer" />
          <p className="max-xl:hidden">Mais</p>
        </div>
      </div>
      {isModalOpen && <NewPost onClose={closeModal} />}
    </div>
  );
}

export default Navbar;
