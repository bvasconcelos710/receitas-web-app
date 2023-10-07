import { useState } from 'react';
import MealCard from '../components/MealCard';

import Meal from '../interfaces/Meal';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const MealsByIngredient = () => {
    const [ingredient, setIngredient] = useState<string>('');
    const [meals, setMeals] = useState<Meal[]>([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `${apiBaseUrl}${apiKey}/filter.php?i=${ingredient}`
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
            } else {
                console.error('Erro na requisição da API');
            }
        } catch (error) {
            console.error('Erro ao buscar receitas por ingrediente', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="text-center">
                <h1 className="text-4xl font-semibold mb-6 text-red-600">Encontre receitas por ingrediente</h1>
            </div>

            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Digite o ingrediente"
                    className="w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-900"
                >
                    Pesquisar
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {meals.map((meal) => (
                    <MealCard key={meal.id} meal={meal} />
                ))}
            </div>
        </div>
    );
};

export default MealsByIngredient;