document.addEventListener("DOMContentLoaded", () => {
  const monCon = document.getElementById('monster-container')
  const formCon = document.getElementById('create-monster')
  const nextBtn = document.getElementById("forward")
  const prevBtn = document.getElementById("back")
  
  let page = 1
  let limit = 5
  let pageStr = `&_page=${page}`
  let limitStr = `?_limit=${limit}` 
  let monURL = `http://localhost:3000/monsters/`;
  
  function fetchMonsters(url) {
    monCon.innerHTML = ""
    fetch(url).then(response => response.json())
    .then(monsters => buildProfiles(monsters))
    .catch(console.log)
  }

  function buildProfiles(monsters) {
    monsters.forEach(monster => buildProfile(monster));
  }

  function buildProfile(monster) {
    const monDiv = document.createElement("div");
    const monName = document.createElement('h2');
    const monAge = document.createElement('h4');
    const monBio = document.createElement('p');
    monDiv.dataset.id = monster.id;
    monName.textContent = `Name: ${monster.name}`;
    monAge.textContent = `Age: ${monster.age}`;
    monBio.textContent = `Bio: ${monster.description}`;
    monDiv.appendChild(monName);
    monDiv.appendChild(monAge);
    monDiv.appendChild(monBio);
    monCon.appendChild(monDiv);
  }

  function buildForm() {
    const monForm = document.createElement('form');
    const nameField = document.createElement('input')
    const ageField = document.createElement('input')
    const bioField = document.createElement('input')
    const submitBtn = document.createElement('button')
    nameField.id = 'name'
    nameField.placeholder = "Enter a name..."
    ageField.id= 'age'
    ageField.placeholder = "Enter an age..."
    bioField.id= 'description'
    bioField.placeholder = "Enter a description.."
    submitBtn.innerHTML = 'Submit'
    monForm.appendChild(nameField)
    monForm.appendChild(ageField)
    monForm.appendChild(bioField)
    monForm.appendChild(submitBtn)
    formCon.appendChild(monForm)
    monForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const configObj = {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: `${nameField.value}`,
          age: `${ageField.value}`,
          description: `${bioField.value}`
        })  
      }
      fetch(monURL, configObj)
      .then(response => response.json())
      .then(data => buildProfile(data))
      .catch(console.log)
    });
  }

  nextBtn.addEventListener("click", (e) => {
    console.log("hit")
    page++
    console.log(page)
    fetchMonsters(monURL+`?_limit=${limit}&_page=${page}`)
  });
  prevBtn.addEventListener("click", (e) => {
    console.log("hit")
    page--
    console.log(page)
    fetchMonsters(monURL+`?_limit=${limit}&_page=${page}`)
  });
  
  buildForm();
  fetchMonsters(monURL+`?_limit=${limit}&_page=${page}`)

});
