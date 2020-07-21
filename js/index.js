const MONSTERS_URL = "http://localhost:3000/monsters"
let page = 1
document.addEventListener("DOMContentLoaded",() =>
{
  fetchMonsters(page);
  
  document.addEventListener("click",buttonClicked);
  
  const form = createForm();
  form.addEventListener("submit",addMonster)
})

const addMonster = (e) =>
{
  e.preventDefault();
  const inputs = e.target.getElementsByTagName('input');
  const monsterData = getMonsterInput(inputs);
  addToDb(monsterData);
}

const addToDb = (data) =>
{
  const jsonObj =
  {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      "Accept":       "application/json"
    },
    body: data
  };
  fetch(MONSTERS_URL,jsonObj)
  .then(resp => resp.json())
  .then(() => fetchMonsters(page))
  .catch(error => console.log(error))
}

const getMonsterInput = (inputs) =>
{
  monsterData = {};
  for(const inpEle of inputs )
  {
    monsterData[inpEle.id] = inpEle.value;
    inpEle.value = "";
  }
  return JSON.stringify(monsterData);
}
const createForm = () =>
{
  const newMonsterDiv = document.getElementById('create-monster');
  const form = document.createElement('form');
  newMonsterDiv.append(form);
  
  ["name","age","description"].forEach(id => 
  {
    const inp = document.createElement("input");
    inp.id = id;
    inp.placeholder = id;
    form.append(inp);
  });

  const button = document.createElement('button');
  button.innerText = "Create";
  form.append(button);
  
  return form;
}

const fetchMonsters = (page) =>
{
  console.log("fetching from page " + page)
  const monstersDiv = document.getElementById("monster-container");
  monstersDiv.innerHTML = "";
  fetch(MONSTERS_URL+`/?_limit=40&_page=${page}&_sort=name&_order=asc`)
  .then(resp => resp.json())
  .then((json) => displayMonsters(json,monstersDiv))
  .catch((error) => console.log(error.message))
}

const displayMonsters = (monsters,div) =>
{
  monsters.forEach(monster => displayMonster(monster,div));
}

//puts a monster onto a div
const displayMonster = (monster,div) =>
{
  const monsterDiv = document.createElement("div");
  const h2 = document.createElement('h2');
  const h4 = document.createElement('h4');
  const p = document.createElement('p');

  div.append(monsterDiv);
  [h2,h4,p].forEach(el => div.append(el));

  h2.textContent = monster.name;
  h4.textContent = "Age: " + monster.age
  p.textContent = "Bio: " + monster.description
}

const buttonClicked = (e) =>
{
  const tgt = e.target
  if(tgt.id === "back" && page > 1)
  {
    fetchMonsters(page--);
  }else if (tgt.id === "forward")
  {
    fetchMonsters(page++);
  }
}