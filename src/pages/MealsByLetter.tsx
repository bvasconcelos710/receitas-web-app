import { useState } from 'react';
import MealCard from '../components/MealCard';

import Meal from '../interfaces/Meal';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const MealsByLetter = () => {
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [meals, setMeals] = useState<Meal[]>([]);

    const handleLetterClick = async (letter: string) => {
        try {
            const response = await fetch(
                `${apiBaseUrl}${apiKey}/search.php?f=${letter}`
            );

            if (response.ok) {
                const { meals } = await response.json();
                if (meals && meals.length > 0) {
                    const mealsResults = Array.from(meals).map<Meal>((meal: any) => ({
                        id: meal.idMeal,
                        mealName: meal.strMeal,
                        thumb: meal.strMealThumb,
                        instructions: meal.strInstructions,
                        youtubeLink: meal.strYoutube
                    }));
                    setMeals(mealsResults);
                } else {
                    setMeals([]);
                }
                setSelectedLetter(letter);
            } else {
                console.error('Erro na requisição da API');
            }
        } catch (error) {
            console.error('Erro ao buscar receitas por letra', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="text-center">
                <h1 className="text-4xl font-semibold mb-6 text-red-600">Encontre receitas por letra</h1>
            </div>

            <div className="flex justify-center flex-wrap mb-4 space-x-2">
                {alphabet.split('').map((letter) => (
                    <button
                        key={letter}
                        onClick={() => handleLetterClick(letter)}
                        className={`px-4 py-2 rounded-full focus:outline-none ${selectedLetter === letter
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-300 text-gray-700 hover:bg-red-600 hover:text-white'
                            }`}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {meals.map((meal) => (
                    <MealCard key={meal.id} meal={meal} />
                ))}
            </div>
        </div>
    );
};

export default MealsByLetter;
