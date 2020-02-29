let container = document.getElementById('container');

function processHeroes(heroData) {
  let arr = heroData;
  for (let i = 0; i < arr.length; i++) {
    let hero = arr[i];

    let content = document.createElement('div');
	  content.className = 'content';

    let itemList = document.createElement('div');
	  itemList.className = 'itemList';

    let unorderedList = document.createElement('ul');
	  unorderedList.className = 'data';

    let data = document.createElement('li');
    data.innerHTML = "<h2>"+hero.Name+"</h2>";
    unorderedList.appendChild(data);

	  data = document.createElement('li');
    data.textContent = "Alignment: "+hero.Alignment;
    unorderedList.appendChild(data);

	  data = document.createElement('li');
    data.textContent = "Gender: "+hero.Gender;
    unorderedList.appendChild(data);

	  data = document.createElement('li');
    data.textContent = "Height: "+hero.Height_m + "m";
    unorderedList.appendChild(data);

	  data = document.createElement('li');
    data.textContent = "Weight: "+hero.Weight_kg + "kg";
    unorderedList.appendChild(data);

	  data = document.createElement('li');
    data.textContent = "Hometown: "+hero.Hometown;
    unorderedList.appendChild(data);

	  data = document.createElement('li');
    data.textContent = "Intelligence: "+hero.Intelligence;
    unorderedList.appendChild(data);

	  data = document.createElement('li');
    data.textContent = "Strength: "+hero.Strength;
    unorderedList.appendChild(data);

	  data = document.createElement('li');
    data.textContent = "Speed: "+hero.Speed;
    unorderedList.appendChild(data);

    data = document.createElement('li');
    data.textContent = "Durability: "+hero.Durability;
    unorderedList.appendChild(data);

	  data = document.createElement('li');
    data.textContent = "Energy projection: "+hero.Energy_Projection;
    unorderedList.appendChild(data);

    data = document.createElement('li');
    data.textContent = "Fighting skills: "+hero.Fighting_Skills;
    unorderedList.appendChild(data);

    image = document.createElement('img');
    image.src = hero.Image;
    
    itemList.appendChild(unorderedList)
	  content.appendChild(itemList);
	  content.appendChild(image);
    container.appendChild(content);
  }
}

let xhttp = new XMLHttpRequest();
xhttp.addEventListener('readystatechange', checkState);

function checkState() {
  if (this.readyState == 4 && this.status == 200) {
    processHeroes(JSON.parse(xhttp.responseText));
  }
}
xhttp.open("GET", "../../query.php?q=Marvel", true);
xhttp.send();