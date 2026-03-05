import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaGear, FaPhone } from "react-icons/fa6";


function NavBar() {
    return ( 
        <header className="flex justify-around items-center bg-white p-4 shadow-xl h-[13vh]">
            <img src="https://storage.googleapis.com/ecdt-logo-saida/dd4a6c12ed34d5a71b03c3e90fc33f4ed8567f53f886f5b3c38213d0f619561b/CERAMICA-FAULIN-LIMITADA.webp" alt="" 
            className="h-full aspect-square object-contain hover:scale-[1.2]"/>
            <ul className="flex justify-around items-center text-[30px] font-bold w-[50%]">
                <li className="flex items-center gap-[10px]">
                    <AiFillHome />
                    <span>Home</span>
                </li>
                <li className="flex items-center gap-[10px]">
                    <CgProfile />
                    <span>Perfil</span>
                </li>
                <li className="flex items-center gap-[10px]">
                    <FaPhone />
                    <span>Contato</span>
                </li>
            </ul>
            <FaGear className="text-[30px]" />
        </header>
    );
}

export default NavBar;