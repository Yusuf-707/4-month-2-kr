const API_RECIPES = 'https://dummyjson.com/products'

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

const createData = (products) => {
    return products.forEach(product => {
        const box = document.createElement("div")
        box.innerHTML = (`
        <h2>название товара: ${product.title}</h2>    
            <h2>цена: ${product.price}</h2>    
            <img src="${product.thumbnail}"></img>
            <button class="delete-box">Удалить</button>
        `)
        const deleteBox = box.querySelector(".delete-box")
        deleteBox.addEventListener("click", ()=> deleteFunc(product.id, box))
        container.append(box)
    })
}

const getProducts = async () => {
    try {
        const response = await fetch(API_RECIPES)
        const data = await response.json()
        createData(data.products)
    } catch (err) {
        console.error("Ошибка", err.message);
    }
}

const postProduct = async (e) => {
    e.preventDefault()
    const title = document.getElementById("name-product").value.trim()
    if(title.length > 0) {
        try {
            const response = await fetch(`${API_RECIPES}/add`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    title,
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
form.addEventListener("submit", postProduct)

getProducts()
