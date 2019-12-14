/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
//This function works to creat DOM elements more quickly while maintaining DRY and modular coding. 
const createElement = elementType => {
	const element = document.createElement(elementType);
	return element;
}
//global variables to set framework for needed functions  
const studentList = document.querySelectorAll('.student-item')
const itemsPerPage = 10; //allows the developer to determine number of LI they want listed per page
//Global variables and creation of a search field to place in the DOM
const studentName = document.querySelectorAll('h3');
const searchDiv = createElement('div');
searchDiv.className = 'student-search';
const input = createElement('input');
const button = createElement('button');
input.placeholder = 'Search for students...';
button.textContent = 'Search';
//Global variable and DOM placement of the created search field and eventListeners
const searchAnchor = document.querySelector('h2').parentNode;
searchAnchor.appendChild(searchDiv);
searchDiv.appendChild(input);
searchDiv.appendChild(button);
//Global creation of error message to display if search is empty. 
const h1 = createElement('h1');
h1.textContent = 'Sorry, your search has returned no results.';
const anchorDiv = document.querySelector('.page');
anchorDiv.appendChild(h1);
h1.style.display = 'none';
//search function that will display results based on provided user input
const searchField = (userInput, searchList) => {
	let searchResults = [];
	const parentOfPaginationDiv = document.querySelector('.page');
	const paginationDiv = document.querySelector('.pagination');
	for (let i = 0; i < searchList.length; i++) {
		studentList[i].style.display = 'none';
		let filteredName = studentList[i].textContent;
		if (filteredName.toLowerCase().includes(userInput.value.toLowerCase())) {
			studentList[i].style.display = '';
			searchResults.push(studentList[i]);
		}
		//test condition to dispaly no results message
		if (searchResults.length === 0) {
			h1.style.display = '';
		} else {
			h1.style.display = 'none';
		}
	}
	parentOfPaginationDiv.removeChild(paginationDiv); //removes initial div with a class of pagination so that it would not create diplicates when calling paginationLinks function. 
	showPage(searchResults, 1);
	paginationLinks(searchResults);
}
//searchField eventListeners
searchDiv.addEventListener('keyup', (e) => {
	searchField(input, studentName);
});
button.addEventListener('click', (e) => {
	searchField(input, studentName);
});
//This function will limit the amount of LIs on a page based on global variable as well as recieve information to determine which page or set of LIs to display using index numbers. 
const showPage = (list, page) => {
	let startIndex = (page * itemsPerPage) - itemsPerPage;
	let endIndex = page * itemsPerPage;
	for (let i = 0; i < list.length; i++) {
		if (i >= startIndex && i < endIndex) {
			list[i].style.display = "";
		} else {
			list[i].style.display = "none";
		}
	}
}
//This function will create dynamicly DOM elements to alter the look of the page based on the amount of students that are stored in the 'student-item' class. 
const paginationLinks = list => {
	//This section of code sets the number of pages needed and navigates and appends to a specific area in the DOM. (noted in the index.html file)
	const numberOfPages = Math.ceil((list.length / itemsPerPage));
	const anchorDiv = document.querySelector('.page');
	const div = createElement('div');
	div.className = "pagination";
	const ul = createElement('ul');
	anchorDiv.appendChild(div);
	div.appendChild(ul);
	//This section of code loops over the set array of pages to dynamicly create the pagination links based on the number of students in the list. It also sets a listener to
	//modify the active range of index numbers being displayed as well as recall the showPage function with the updated arguments.
	for (let i = 0; i < numberOfPages; i++) {
		const li = createElement('li');
		const a = createElement('a');
		if (i === 0) {
			a.className = 'active';
		}
		a.href = '#';
		const pageNum = i + 1;
		a.textContent = pageNum;
		ul.appendChild(li);
		li.appendChild(a);
		a.addEventListener('click', (e) => {
			let pageToShow = parseInt(e.target.textContent);
			const pageLinks = document.querySelectorAll('a');
			for (let i = 0; i < pageLinks.length; i++) {
				pageLinks[i].classList.remove('active');
			}
			e.target.className = 'active';
			showPage(list, pageToShow);
		});
	}
}
//calls the original funtions to create a starting point for the end user to navigate. 
showPage(studentList, 1);
paginationLinks(studentList);