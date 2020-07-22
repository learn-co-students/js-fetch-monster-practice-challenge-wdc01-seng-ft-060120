// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

// Above your list of monsters, you should have a form to create a new monster. You should have fields for name,
// age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.

// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'http://localhost:3000/'
    const monstersURL = baseURL + 'monsters/'

    const monsterContainer = document.getElementById('monster-container')
    let pageStart = 0
    let pageEnd = 50

    function fetchMonsters() {
        fetch(monstersURL)
            .then(resp => resp.json())
            .then(data => renderData(data))
            .catch(err => console.log(err))
    }

    function renderData(data) {
        document.addEventListener('click', e => {
            if (e.target.matches('#forward')) {
                nextPage(data)
            }
            if (e.target.matches('#back')) {
                previousPage(data)
            }
        })
        data.slice(pageStart, pageEnd).forEach(element => renderMonster(element))
    }

    function nextPage(monstersArray) {
        if (pageEnd > monstersArray.length) {
            alert('There is no next page')
        } else {
            pageStart += 50
            pageEnd += 50
            monsterContainer.innerHTML = ''
            monstersArray.slice(pageStart, pageEnd).forEach(element => renderMonster(element))
        }
    }
    function previousPage(monstersArray) {
        if (pageStart === 0) {
            alert('There is no previous page')
        } else {
            pageStart -= 50
            pageEnd -= 50
            monsterContainer.innerHTML = ''
            monstersArray.slice(pageStart, pageEnd).forEach(element => renderMonster(element))
        }
    }

    function renderMonster(monster) {
        // create elements h2 for name h4 for age and p for description

        const h2 = document.createElement('h2')
        h2.textContent = monster.name + ' ' + monster.id
        monsterContainer.appendChild(h2)

        const h4 = document.createElement('h4')
        h4.textContent = monster.age
        monsterContainer.appendChild(h4)

        const p = document.createElement('p')
        p.textContent = monster.description
        monsterContainer.appendChild(p)
    }

    function createNewMonster() {
        const form = document.getElementById('monster-form')

        form.addEventListener('submit', e => {
            e.preventDefault()

            const configurationObject = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: form.name.value,
                    age: form.age.value,
                    description: form.description.value,
                }),
            }

            fetch(monstersURL, configurationObject)
                .then(resp => resp.json())
                .then(newMonster => {
                    renderMonster(newMonster)
                    console.log('Post request sucessfull')
                    console.log(newMonster)
                })
                .catch(err => console.log(err))

            form.reset()
        })
    }

    function monsterForm() {
        const createMonster = document.getElementById('create-monster')
        const form = document.createElement('form')
        form.id = 'monster-form'

        const inputName = document.createElement('input')
        inputName.id = 'name'
        inputName.placeholder = 'name...'
        form.appendChild(inputName)

        const inputAge = document.createElement('input')
        inputAge.id = 'age'
        inputAge.placeholder = 'age...'
        form.appendChild(inputAge)

        const inputDescription = document.createElement('input')
        inputDescription.id = 'description'
        inputDescription.placeholder = 'description...'
        form.appendChild(inputDescription)

        const button = document.createElement('button')
        button.textContent = 'Create Monster'
        form.appendChild(button)

        createMonster.appendChild(form)
    }

    fetchMonsters()
    monsterForm()
    createNewMonster()
})
