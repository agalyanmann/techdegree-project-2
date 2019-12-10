/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
const studentList = document.querySelectorAll('.student-item')
const itemsPerPage = 10;

const showPage = (list, page) => {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;
   for (let i = 0; i < list.length; i++) {
      if ([i] >= startIndex && [i] < endIndex) {
         list[i].style.display = " ";
      } else {
         list[i].style.display = "none";
      }
   }      
}

const paginationLinks = list => {
   const createElement = elementType => {
      const element = document.createElement(elementType);
      return element;
   }
   const numberOfPages = Math.ceil((list.length / itemsPerPage));
   const anchorDiv = document.querySelector('.page');
   const div = createElement('div');
      div.className = "pagination";
   const ul = createElement('ul');
   anchorDiv.appendChild(div);
   div.appendChild(ul);

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
         for(let i = 0; i < pageLinks.length; i++) {
            pageLinks[i].classList.remove('active');
         }
         e.target.className = 'active';
         showPage(studentList, pageToShow);
      });
   }
}

showPage(studentList, 1);
paginationLinks(studentList);