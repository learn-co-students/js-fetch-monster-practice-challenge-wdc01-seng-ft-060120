const BASE_URL = 'http://localhost:3000'
let pageNumber = 1;
const MONSTER_GET_URL = BASE_URL + '/monsters/?_limit=50&_page=';
const MONSTER_POST_URL = BASE_URL + '/monsters'


document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.querySelector('#monster-container');
    const createMonster = document.querySelector('#create-monster');
    const forwardButton = document.querySelector('#forward');
    const backwardButton = document.querySelector('#back');

    const createNewMonsterForm = () => {
        form = document.createElement('form');
        form.id = 'monster-form'
        createMonster.appendChild(form);

        nameInput = document.createElement('input');
        nameInput.id = 'name';
        nameInput.placeholder = 'name...';
        nameInput.required = true;
        form.appendChild(nameInput);

        ageInput = document.createElement('input');
        ageInput.id = 'age';
        ageInput.placeholder = 'age...';
        ageInput.required = true;
        form.appendChild(ageInput);

        descriptionInput = document.createElement('input');
        descriptionInput.id = 'description';
        descriptionInput.placeholder = 'description';
        descriptionInput.required = true;
        form.appendChild(descriptionInput);

        newMonsterButton = document.createElement('button');
        newMonsterButton.innerText = 'Create';
        form.appendChild(newMonsterButton);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            getNewMonsterInfo(e);
            form.reset();
        })
    }

    const getNewMonsterInfo = (monsterForm) => {
        let name = monsterForm.currentTarget.name.value;
        let age = monsterForm.currentTarget.age.value;
        let description = monsterForm.currentTarget.description.value;

        postNewMonster(name, age, description);
    }

    const postNewMonster = (name, age, description) => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'age': age,
                'description': description
            })
        }

        fetch(MONSTER_POST_URL, options)
        .then(response => response.json())
        .then(console.log);
    }

    const fetchMonsters = (pageNumber) => {
        fetch(MONSTER_GET_URL + pageNumber)
        .then(response => response.json())
        .then(monsters => createMonsters(monsters))
    }

    const createMonsters = (monsters) => {
        clearCurrentMonsters();
        monsters.forEach(monster => renderMonster(monster));
    }

    const renderMonster = (monster) => {
        let div = document.createElement('div');
        div.classList += 'monster';
        monsterContainer.appendChild(div);

        let h2 = document.createElement('h2');
        h2.innerText = monster.name;
        div.appendChild(h2);

        let h4 = document.createElement('h4');
        h4.innerText = `Age: ${monster.age}`;
        div.appendChild(h4);

        let p = document.createElement('p');
        p.innerText = monster.description;
        div.appendChild(p);
    }

    const clearCurrentMonsters = () => {
        monsterContainer.innerHTML = null;
    }

    document.addEventListener('click', (event) => {
        if (event.target === forwardButton) {
            event.preventDefault();
            pageNumber += 1;
            fetchMonsters(pageNumber);
        } 
        if (event.target === backwardButton) {
            event.preventDefault();
            pageNumber = Math.max(pageNumber - 1, 1);
            fetchMonsters(pageNumber);
        }
    })

    createNewMonsterForm();
    fetchMonsters();
})