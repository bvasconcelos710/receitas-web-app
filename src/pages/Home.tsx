import { useState } from 'react';

import MealCard from '../components/MealCard';

import Meal from '../interfaces/Meal';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [meals, setMeals] = useState<Meal[]>([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}${apiKey}/search.php?s=${searchTerm}`);

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
            console.error('Erro ao buscar receitas', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="text-center">
                <h1 className="text-4xl font-semibold mb-6 text-red-600">
                    Encontre uma receita!
                </h1>
                <p className="text-lg text-gray-600">
                    Encontre e explore diversas receitas deliciosas.
                </p>
                <div className="flex justify-center mt-4">
                    <input
                        type="text"
                        placeholder="Pesquisar receita pelo nome"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="ml-2 px-4 py-2 bg-red-600 text-white rounded-full"
                    >
                        Pesquisar
                    </button>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {meals.map((meal) => (
                    <MealCard key={meal.id} meal={meal} />
                ))}
            </div>
        </div>
    );
};

export default Home;
