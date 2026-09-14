const API_RECIPES = 'https://dummyjson.com/recipes'

const container = document.getElementById("container")
const form = document.getElementById("form")
const errorMessage = document.getElementById("error-message")

const deleteFunc = async (id, box) => {
    try {
        const response = await fetch(`${API_RECIPES}/${id}`, {
            method: "DELETE"
        })
        console.log("Удалено")
        box.remove()
    } catch (err) {
        console.error("Ошибка", err.message);
    }
}

const createData = (recipes) => {
    return recipes.forEach(recipe => {
        const box = document.createElement("div")
        box.innerHTML = (`
        <h2>название рецепта: ${recipe.name}</h2>    
            <h2>кухня: ${recipe.cuisine}</h2>    
            <img src="${recipe.image}"></img>
            <button class="delete-box">Удалить</button>
        `)
        const deleteBox = box.querySelector(".delete-box")
        deleteBox.addEventListener("click", ()=> deleteFunc(recipe.id, box))
        container.append(box)
    })
}

const getRecipes = async () => {
    try {
        const response = await fetch(API_RECIPES)
        const data = await response.json()
        createData(data.recipes)
    } catch (err) {
        console.error("Ошибка", err.message);
    }
}

const postFood = async (e) => {
    e.preventDefault()
    const name = document.getElementById("name-food").value.trim()
    if(name.length > 0){
        try {
            const response = await fetch(`${API_RECIPES}/add`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                })
            })
            const data = await response.json()
            console.log(data);
            createData([data])
            form.reset()
        } catch (err) {
            console.error("Ошибка", err.message);
    
        }
    }else {
         errorMessage.textContent = "Поле не может быть пустым"
        setTimeout(() => {
            errorMessage.textContent = ""
        },2500)
    }

}
form.addEventListener("submit", postFood)

getRecipes()

