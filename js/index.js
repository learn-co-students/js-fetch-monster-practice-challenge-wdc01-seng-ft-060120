document.addEventListener('DOMContentLoaded', event => {  
    const URL = "http://localhost:3000/monsters"
    const forwardButton = document.getElementById('forward')
    const backButton = document.getElementById('back')
    let fullMonsterList = {}
    let displayMin = 0
    let displayMax = 49

    creatForm()
    getMonsters()

    forwardButton.addEventListener('click',function(event){
        displayMin += 50
        displayMax += 50
        renderMonsters(fullMonsterList,displayMin,displayMax)
    })
    
    backButton.addEventListener('click',function(event){
        displayMin -= 50
        displayMax -= 50
        renderMonsters(fullMonsterList,displayMin,displayMax)
    })
    
    function creatForm(){
        let h1 = document.querySelector('#header')
        let monsterContainer = document.createElement('div')
        monsterContainer.id = 'create-monster'
        let monsterForm = document.createElement('form')
        monsterForm.id = 'monster-form'
        monsterForm.innerHTML = '<input id="name" placeholder="name..."><input id="age" placeholder="age..."><input id="description" placeholder="description..."><button id="create-button">Create</button>'
        monsterContainer.append(monsterForm)
        h1.append(monsterContainer)

        document.getElementById('create-button').addEventListener('click', event => {
            event.preventDefault()
            let name = document.getElementById('name').value
            let age = document.getElementById('age').value
            let description = document.getElementById('description').value
            let monsterObj = {"name": name,"age":age,"description":description}

            fetch(URL,{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(monsterObj),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                renderMonster(data)
            })
            
        })


    }

    function getMonsters(){
        fetch(URL).then(response => response.json()).then(monsters => {
            fullMonsterList = monsters
            renderMonsters(monsters,displayMin,displayMax)
        })
    }

    function renderMonsters(monsters,displayMin,displayMax){
        document.getElementById('monster-container').innerHTML=""
        while (displayMin <= displayMax){
            renderMonster(monsters[displayMin])
            displayMin += 1;
        }
    }

    function renderMonster(monster){
        if (monster !== undefined){
            let div = document.createElement('div')
            let h2 = document.createElement('h2')
            let h4 = document.createElement('h4')
            let p = document.createElement('p')
            
            h2.innerText = monster.name
            h4.innerText = `Age: ${monster.age}`
            p.innerText = `Bio: ${monster.description}`
            
            document.getElementById("monster-container").append(div)
            div.append(h2, h4, p)
            console.log(monster)
        }
    }
})