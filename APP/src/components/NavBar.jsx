import { FaIndustry } from "react-icons/fa";
import { FaMagnifyingGlass, FaCirclePlus } from "react-icons/fa6";
import Logo from "../assets/LogoFaulin.png";

function NavBar() {
    return ( 
        <header className="flex items-center justify-between bg-white p-4 h-[13vh] shadow">
            <span className="flex items-center justify-center h-[145%] w-[12%]">
                <img src={Logo} alt="" 
                className="h-full aspect-square object-contain duration-[.3s] hover:scale-[1.2]"/>
            </span>
            <ul className="flex items-center justify-between text-[16px] font-bold w-[35%] h-full">
                <li className="link">
                    <FaMagnifyingGlass />
                    <span>Consultar</span>
                </li>
                <li className="link">
                    <FaCirclePlus />
                    <span>Cadastro</span>
                </li>
                <li className="link">
                    <FaIndustry />
                    <span>Produção</span>
                </li>
            </ul>
            <span className="flex items-center justify-center h-full w-[12%]">
                <img src="https://thumbs.dreamstime.com/b/%C3%ADcone-de-perfil-do-avatar-padr%C3%A3o-vetor-m%C3%ADdia-social-usu%C3%A1rio-retrato-176256935.jpg" alt="" 
                className="h-full aspect-square object-contain bg-[gray] duration-[.3s] rounded-[50rem] border-[2px] border-[gray] hover:scale-[1.2]"/>
            </span>
        </header>
    );
}

export default NavBar;