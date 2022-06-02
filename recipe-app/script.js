const meals = document.querySelector('#meals');
const favouriteContainer = document.querySelector('#fav-meals')

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
    const meals = await fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
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
        <button class="fav-btn" id="fav-btn"><i class="fas fa-heart"></i></button>
    </div>`;
    meals.appendChild(meal);

const favBtn = document.querySelector('#fav-btn');
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
    console.log(meals);
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
    favouriteContainer.appendChild(FavMeal);
}

getRandomMeal();
fetchFavMeals();