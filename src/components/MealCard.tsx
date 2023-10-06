import { useNavigate } from 'react-router-dom';
import Meal from '../interfaces/Meal';

interface MealCardProps {
    meal: Meal;
}

const MealCard = ({ meal }: MealCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-2 hover:bg-gray-300 transition-transform hover:-translate-y-1 hover:scale-100" key={meal.id} onClick={() => { navigate(`/${meal.id}`) }}>

            <img src={meal.thumb} alt={meal.mealName} className="w-full" />

            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-red-600">{meal.mealName}</div>
            </div>
            <div className="px-6 py-4">
                <a
                    href={meal.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-600 text-white rounded-full"
                >
                    Assistir no YouTube
                </a>
            </div>
        </div>
    );
};

export default MealCard;