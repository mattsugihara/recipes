// Scolls the page down 64px to hide the search box
// Delayed by 50ms to ensure the DOM is in place by the time the event fires
setTimeout(function() {
	window.scroll(0, 64);
}, 50);

const recipes = document.querySelectorAll('.recipe-list li');
const search_box = document.getElementById('search-box');
const search_box_label = document.getElementById('search-box-label');
const clear_button = document.getElementById('clear-button');

// Checks each category to determine whether all recipes in that category have
// been hidden. If they have, this hides the containing div.
function cleanUpHeaders() {
	const divs = document.querySelectorAll('.category');

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
	let search_query = search_box.value.toLowerCase();

  // Makes search box label invisible if the user has entered text
	if (search_query.length <= 0) {
		search_box_label.classList.remove('invisible');
	} else {
		search_box_label.classList.add('invisible');
	}

	// Compares recipe names against search querery and hides recipes that don't
	// contain the query
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

// Clears the value of the search box, sets focus on the search box, and calls
// search on the null string in order to show all recipes again
function clear() {
	search_box.value = '';
	search_box.focus();
	search();
}

search_box.addEventListener('change',search)
search_box.addEventListener('keyup',search)
clear_button.addEventListener('click',clear)
