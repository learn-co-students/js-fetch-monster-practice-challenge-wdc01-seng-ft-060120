document.addEventListener("DOMContentLoaded", () => {
    let page=1;

    const monsterContainer = document.querySelector('#monster-container');
    const monsterUrl = "http://localhost:3000/monsters";
    const newMonster = document.querySelector("#create-monster");

    const fetchMonsters = (page) => {
        fetch(`${monsterUrl}/?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(monster => displayMonster(monster)));
    }

    const displayMonster = (monster) => {
        const monsterElement = document.createElement('div');
        monsterElement.innerHTML = `
        <p>Name: ${monster.name}</p>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
        `
        monsterContainer.appendChild(monsterElement);
    }

    const displayNewForm = () => {
        const newMonsterForm = document.createElement('form');
        const b = document.createElement('input');
        const c = document.createElement('input');
        const d = document.createElement('input');
        const e = document.createElement('button');

        newMonsterForm.id = 'monster-form';
        b.id = 'name';
        c.id = 'age';
        d.id = 'description';
        b.placeholder = 'name';
        c.placeholder = 'age';
        d.placeholder = 'description';
        e.innerHTML = 'Create New Monster';

        newMonsterForm.appendChild(b);
        newMonsterForm.appendChild(c);
        newMonsterForm.appendChild(d);
        newMonsterForm.appendChild(e);
        newMonster.appendChild(newMonsterForm);
    }

    const postMonster = (newMonsterForm) => {
        fetch(monsterUrl, {
          method : 'POST',
          headers: {'content-type' : 'application/json', 'accept' : 'application/json'},
          body : JSON.stringify(newMonsterForm)
        })
        .then(response => response.json())
        .then(newMonster => displayMonster(newMonster));
    }

    const newMonsterData = () => {
        let a = document.querySelector('#name');
        let b = document.querySelector('#age');
        let c = document.querySelector('#description');

        return {
            name:a.value,
            age:parseFloat(b.value),
            description:c.value
        }
    }
    
    const clearForm = () => {
        document.querySelector('#monster-form').reset();
    }

    nextPage = () => {page++, fetchMonsters(page)};
    previousPage = () => {page--, fetchMonsters(page)};

    const navButtons = () => {
        let a = document.querySelector('#back');
        let b = document.querySelector('#forward');
    
        a.addEventListener('click',()=>{ nextPage()});
        b.addEventListener('click',()=>{ previousPage()})
    };

    const formSubmit = () => {
        submitButton = document.querySelector("#monster-form");
        submitButton.addEventListener('submit', event => {
        //console.log('HELLO');
        event.preventDefault();
        postMonster(newMonsterData());
        clearForm();
    })}

    fetchMonsters();
    displayNewForm();
    navButtons();
    formSubmit();
});

// init=()=>{getMonsters(),createMonsterForm(),addNavListeners()};
// document.addEventListener('DOMContentLoaded',init);
