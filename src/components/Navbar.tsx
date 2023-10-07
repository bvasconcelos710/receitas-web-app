import { MdOutlineFoodBank } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    return (
        <nav className="bg-red-600 p-4 flex justify-between items-center flex-wrap">
            <div className="flex items-center">

                <span className=" flex items-center text-white text-5xl font-bold hover:text-yellow-400">
                    <Link to="/receitas-web-app"><MdOutlineFoodBank /></Link>
                </span>
                <span className=" flex items-center text-white text-2xl font-sans font-bold hover:text-yellow-400">
                    <Link to="/receitas-web-app">HappyMeal</Link>
                </span>

            </div>
            <div className="md:flex md:space-x-4 space-y-2 md:space-y-0 items-center ">
                <a href="#" className="text-white text-lg font-semibold mr-2 hover:text-yellow-400" onClick={() => { navigate('/recipebyletter') }}>
                    Receitas por Letra
                </a>
                <a href="#" className="text-white text-lg font-semibold mr-2 hover:text-yellow-400" onClick={() => { navigate('/recipebyingredient') }}>
                    Receitas por Ingrediente
                </a>

            </div>
        </nav>
    );
};

export default Navbar;
