const meals = document.querySelector('#meals');
const favouriteContainer = document.querySelector('#fav-meals')
const searchBtn = document.querySelector('#search');
const searchTerm = document.querySelector('#search-term')
const mealPopup = document.querySelector('#meal-popup')
const popupCloseBtn = document.querySelector('#close-popup')
const mealInfoEl = document.querySelector('#meal-info')

const  getRandomMeal = async () => {
    const respData = await (await fetch('https://www.themealdb.com/api/json/v1/1/random.php')).json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal,true);
}

const getMealById = async (id) => {
    const respData = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
    const meal = respData.meals[0];
    return meal;
}

const getMealBySearch = async (term) => {
    const respData = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)).json();
    const meals = respData.meals;
    return meals;
}

const addMeal = (mealData, random = false) =>  {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `<div class="meal-header">
        ${random ? '<span class="random">Random Racipe</span>' : ''}
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn"><i class="fas fa-heart"></i></button>
    </div>`;
    meals.appendChild(meal);

const favBtn = meal.querySelector(".meal-body .fav-btn");
favBtn.addEventListener('click', event => {
    if(favBtn.classList.contains('active')){
        removeMealFromLS(mealData.idMeal);
        favBtn.classList.remove('active');
    }else{
        addMealToLS(mealData.idMeal);
        favBtn.classList.add('active');
    }
    fetchFavMeals();
})

meal.addEventListener('click',() => {
    showMeanInfo(mealData);
})

}

const addMealToLS = (mealId) => {
    const mealIds = getMealToLS();

    localStorage.setItem('meanIds', JSON.stringify([...mealIds, mealId]));


}

const removeMealFromLS = (mealId) => {
    const mealIds = getMealToLS();

    localStorage.setItem('meanIds', JSON.stringify(mealIds.filter(id => id !== mealId)));
}

const getMealToLS = () => {
    const mealIds = JSON.parse(localStorage.getItem('meanIds'));
    return mealIds === null ? [] : mealIds;
}

const fetchFavMeals = async () => {
    favouriteContainer.innerHTML = '';
    const mealIds = getMealToLS();

    for(let i=0; i<mealIds.length; i++) {
        const mealId = mealIds[i];

        meal = await getMealById(mealId);
        addMealFav(meal);
    }
}

const addMealFav = (mealData) =>  {
    const FavMeal = document.createElement('li');
    
    FavMeal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    <span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = FavMeal.querySelector('.clear');
    btn.addEventListener('click',(event) => {
        removeMealFromLS(mealData.idMeal);

        fetchFavMeals();
    })

    FavMeal.addEventListener('click', () => {
        showMeanInfo(mealData);
    })

    favouriteContainer.appendChild(FavMeal);
}

const showMeanInfo = (mealData) => {

    mealInfoEl.innerHTML = '';

    const mealEl = document.createElement('div');


    const ingredients = [];
    for(let i=1; i<=20; i++){
        if(mealData['strIngredient'+i]){
            ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]} `)
        }else{
            break;
        }
    }

    mealEl.innerHTML = `<h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />

    <p>
    ${mealData.strInstructions}
    </p>
    <ul>
        <h3>Ingredients : </h3>
        ${ingredients.map(ing => `
            <li>${ing}</li>
        `).join("")}
    </ul>`;

    mealInfoEl.appendChild(mealEl);

    mealPopup.classList.remove('hidden');

}

searchBtn.addEventListener('click',async () => {
    meals.innerHTML = '';
    const search = searchTerm.value;
    
    const mealsData = await getMealBySearch(search);
    if(mealsData){
        mealsData.forEach((meal) => {
            addMeal(meal);  
        });
    }
})

popupCloseBtn.addEventListener('click',() =>{
    mealPopup.classList.add('hidden');
})

getRandomMeal();
fetchFavMeals();