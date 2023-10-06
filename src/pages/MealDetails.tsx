import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import MealInfo from "../interfaces/MealInfo";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const MealDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [meal, setMeal] = useState<MealInfo | undefined>();

    const getRecipe = async (url: string) => {
        const res = await fetch(url);

        if (res.ok) {
            const data = await res.json();
            if (data.meals && data.meals.length > 0) {
                const meal = data.meals[0];

                const ingredients = Object.keys(meal)
                    .filter((key) => key.includes('strIngredient'))
                    .map((prop) => meal[prop])
                    .filter((ingredient) => ingredient);

                const measures = Object.keys(meal)
                    .filter((key) => key.includes('strMeasure'))
                    .map((prop) => meal[prop])
                    .filter((measure) => measure);

                setMeal({
                    id: meal.idMeal,
                    mealName: meal.strMeal,
                    thumb: meal.strMealThumb,
                    instructions: meal.strInstructions,
                    youtubeLink: meal.strYoutube,
                    ingredients,
                    measures,
                });
            } else {
                console.error('Erro na requisição da API');
            }
        }
    };



    useEffect(() => {
        const url = `${apiBaseUrl}${apiKey}/lookup.php?i=${id}`;
        getRecipe(url);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="text-center">
                <h1 className="text-4xl font-semibold mb-6 text-red-600">{meal?.mealName}</h1>
            </div>

            <div className="text-center">
                <img
                    src={meal?.thumb}
                    alt={meal?.mealName}
                    className="w-full max-w-2xl mx-auto rounded-lg"
                />
            </div>

            <div className="px-6 py-4 mt-6">
                <h2 className="text-xl font-semibold mb-2">Instruções</h2>
                <p className="text-gray-700 text-base">{meal?.instructions}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-6">
                <div className="px-6 py-4">
                    <h2 className="text-xl font-semibold mb-2">Ingredientes</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        {meal?.ingredients.map((ingredient: string, index: number) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className="px-6 py-4">
                    <h2 className="text-xl font-semibold mb-2">Medidas</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        {meal?.measures.map((measure: string, index: number) => (
                            <li key={index}>{measure}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="px-6 py-4 mt-6">
                <a
                    href={meal?.youtubeLink}
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

export default MealDetails;
