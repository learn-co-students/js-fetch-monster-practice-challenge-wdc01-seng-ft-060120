const URL_PREFIX='http://localhost:3000/';



document.addEventListener("DOMContentLoaded", function(){
    const backButton = document.getElementById("back");
    const forwardButton = document.getElementById("forward");
    const monsterContainer = document.getElementById("monster-container");
    const formContainer = document.getElementById("create-monster")
    let currentPage = 1
    let lastPage = 20

    fetch(`${URL_PREFIX}monsters/`)
    .then(response => response.json())
    .then(data => {
        lastPage = Math.ceil(data.length / 50)
    })

    const renderForm = () => {
        let form = document.createElement("form")
        form.id = "monster-form"
        form.innerHTML = `<input type="text" id="name" placeholder="name..."><br>
        <input type="text" id="age" placeholder="age..."><br>
        <input type="text" id="description" placeholder="description..."><br>
        <input type="submit" id="submit" value="Create Monster">`
        formContainer.appendChild(form)
    }
    renderForm()

    document.getElementById("monster-form").addEventListener("submit", (e) => {
        e.preventDefault()
        let monsterObj = {
            "name": e.target.name.value,
            "age": e.target.age.value,
            "description": e.target.description.value
        }

        let monsterConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(monsterObj)
        }
        
        fetch(`${URL_PREFIX}monsters/`, monsterConfig)
        .then(response => response.json())
        .then(data => {
            renderMonster(data)
            currentPage = lastPage
            monsterContainer.innerHTML = ""
            fetchMonsters()
        })
    })

    backButton.addEventListener("click", function(){
        if(currentPage === 1){
            alert("Yo! There ain't no more monsters that way!")
        }
        else{
            currentPage--
            monsterContainer.innerHTML = ""
            fetchMonsters()
        }
    })

    forwardButton.addEventListener("click", function(){
        if(currentPage === lastPage){
            alert("Yo! There ain't no more monsters that way!")
        }
        else {
            currentPage++
            monsterContainer.innerHTML = ""
            fetchMonsters()
        }
    })

    const fetchMonsters = () => {
        fetch(`${URL_PREFIX}monsters/?_limit=50&_page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            console.log ("is it getting here?")
            console.log (currentPage)
            for(const monster of data){
                renderMonster(monster)
            }
        })
    }

    const renderMonster = (monster) => {
        let div = document.createElement("div");
        let h2 = document.createElement("h2");
        let h4 = document.createElement("h4");
        let p = document.createElement("p");
        h2.innerText = `${monster.id}.  ${monster.name}`;
        h4.innerText = monster.age;
        p.innerText = monster.description;
        div.appendChild(h2)
        div.appendChild(h4)
        div.appendChild(p)
        monsterContainer.appendChild(div)
    }


    fetchMonsters()
    
})

