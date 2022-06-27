// Scolls the page down 64px to hide the search box
// Delayed by 50ms to ensure the DOM is in place by the time the event fires
setTimeout(function() {
	window.scroll(0, 64);
}, 50);

let search_box = document.getElementById('search-box');

// Checks each category to determine whether all recipes in that category have
// been hidden. If they have, this hides the containing div.
function cleanUpHeaders() {
	let divs = document.querySelectorAll('.category');

	for (var i = 0; i < divs.length; i++) {
		let numberOfRecipes =
		    divs[i].querySelector('.recipe-list').getElementsByTagName('li').length;
		let numberOfHiddenRecipes = divs[i].querySelectorAll('.hidden').length;

		if (numberOfRecipes == numberOfHiddenRecipes){
			divs[i].classList.add('hidden');
		} else if (numberOfHiddenRecipes < numberOfRecipes) {
			divs[i].classList.remove('hidden');
		} else {
			console.log('you got serious issues');
		}
	}
}

// Checks the value of the search field and compares each recipe title against
// it. If the recipe title does not contain the search query, the recipe is
// hidden
function search() {
	let recipes = document.querySelectorAll('.recipe-name');
	let search_query = search_box.value.toLowerCase();
	let search_box_label = document.getElementById('search-box-label');

	if (search_query.length <= 0) {
		search_box_label.classList.remove('no-show');
	} else {
		search_box_label.classList.add('no-show');
	}

	for (var i = 0; i < recipes.length; i++) {
		let recipe_name = recipes[i].textContent.toLowerCase();

		if (recipe_name.includes(search_query)) {
			recipes[i].classList.remove('hidden');
		} else {
			recipes[i].classList.add('hidden');
		}
	}

	cleanUpHeaders();
}

search_box.addEventListener('change',search)
search_box.addEventListener('keyup',search)
