import { useState } from "react";
import { FaIndustry } from "react-icons/fa";
import { FaMagnifyingGlass, FaCirclePlus } from "react-icons/fa6";
import Logo from "../assets/LogoFaulin.png";

function NavBar() {
    const [cadastroOpen, setCadastroOpen] = useState(false);

    return ( 
        <header className="fixed top-0 w-screen shadow h-[13vh] box-border">
            <nav className="flex items-center justify-center relative bg-white w-full h-full">
            <span className="flex items-center justify-center h-[90%] w-[12%]">
                <img src={Logo} alt="" 
                className="h-full aspect-square object-contain duration-[.3s] hover:scale-[1.2]"/>
            </span>
            <ul className="flex items-center justify-evenly text-[16px] font-bold w-[76%] h-full">
                <li className="link">
                    <FaMagnifyingGlass />
                    <span>Consultar</span>
                </li>
                <li className="link cadastro cursor-pointer" onClick={() => setCadastroOpen(open => !open)}>
                    <FaCirclePlus />
                    <span>Cadastro</span>
                </li>
                <li className="link">
                    <FaIndustry />
                    <span>Produção</span>
                </li>
            </ul>
            <span className="flex items-center justify-center h-[60%] w-[12%]">
                <img src="https://thumbs.dreamstime.com/b/%C3%ADcone-de-perfil-do-avatar-padr%C3%A3o-vetor-m%C3%ADdia-social-usu%C3%A1rio-retrato-176256935.jpg" alt="" 
                className="h-full aspect-square object-contain bg-[gray] duration-[.3s] rounded-[50rem] border-[2px] border-[gray] hover:scale-[1.2]"/>
            </span>
            <div className={`boxCadastro flex justify-center absolute bg-neutral-800 transition-[.4s] bottom-0 z-[-100] overflow-hidden h-[270px] text-white p-4
            ${cadastroOpen ? "visivel" : ""}`}>
                <ul className="flex flex-col justify-between items-center text-nowrap">
                    <li className="link">User</li>
                    <li className="link">Categoria</li>
                    <li className="link">Produto</li>
                    <li className="link">Fornecedor</li>
                    <li className="link">Operador</li>
                    <li className="link">Engenheiro</li>
                    <li className="link">Responsavel</li>
                    <li className="link">Destino</li>
                    <li className="link">Local Estoque</li>
                </ul>
            </div>
            </nav>
        </header>
    );
}


export default NavBar;