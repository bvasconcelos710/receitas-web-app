import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.tsx';

import './index.css';

import Home from './pages/Home.tsx';
import MealDetails from './pages/MealDetails.tsx';
import MealsByLetter from './pages/MealsByLetter.tsx';
import MealsByIngredient from './pages/MealsByIngredients.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<MealDetails />} />
          <Route path="/recipebyletter" element={<MealsByLetter />} />
          <Route path="/recipebyingredient" element={<MealsByIngredient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
