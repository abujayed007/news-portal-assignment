const loadAllCategory = async () =>{
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await response.json();
    return data.data.news_category;
}
const displayCategory = async () =>{

    const data = await loadAllCategory();
    const menuContainer = document.getElementById('menu-items')

    const uniqueArray = [];
    data.forEach(news => {
        const {category_id, category_name} = news;
    if(uniqueArray.indexOf(news.category_name)  === -1){
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML =`
        <button onclick="loadNewsItem('${category_id}')" class="btn bg-gray-200 mt-4  font-extrabold hover:bg-purple-300 border-none text-purple-900 ">${category_name}</button>
    
        `
        menuContainer.appendChild(div)
    }
    });
    
   
}
loadNewsItem = (news) =>{
  toggleSpinner (true);

    fetch(`https://openapi.programming-hero.com/api/news/category/${news}`)
    .then(res => res.json())
    .then(data => displayNewsItems(data.data))
    .catch(error => console.log(error))
}
displayNewsItems = allNews => {

  const newsContainer = document.getElementById('news-container');
  newsContainer.textContent = '';

    // console.log(allNews)
    
    allNews.filter(news =>{
      const {details , image_url, title , author, total_view, rating, _id} = news;
      const {name, img } = author;
      const {number , badge} = rating;
      // console.log(news)
      const div = document.createElement('div')
    div.innerHTML= `
    <div class="card  lg:card-side bg-base-100 mt-5 shadow-xl">
    <figure><img class="w-96 h-100 " src="${image_url}" alt="Album"></figure>
    <div class="card-body  w-75">
    <h2 class="card-title p-2">${title}</h2>
     
      <div class="card-actions justify-end">
      <p class="p-2">${details.length > 400 ? details.slice(0, 400) + '...' :details}</p>
      <img class="w-22 h-12 rounded-full p-2" src="${img}" alt="Album">
      <p class="pt-2 font-bold">${name ? name : 'No Name'}</p>
      <p class="pt-2 font-bold"><i class="fa-solid fa-eye"></i> ${total_view ? total_view : 'No View' }</p>
      <label for="my-modal-3"  onclick="modalOpen('${_id}')" class="btn btn-primary modal-button">See More</label>
      </div>
    </div>
  </div>
    `
newsContainer.appendChild(div)
// ${news.author.img}
})
toggleSpinner (false);

}

const modalOpen =modalDetails =>{
  fetch(`https://openapi.programming-hero.com/api/news/${modalDetails}`)
  .then(res => res.json())
  .then(data => displayModal(data.data))

}

const displayModal = (data) =>{
// console.log(data)
const modalBody = document.getElementById('modal-body')
modalBody.textContent = '';
data.forEach(modalData =>{
const modalDiv = document.createElement('div')
modalDiv.innerHTML = `
<img src="${modalData.author.img}">
<h3 class="text-2xl font-extrabold">Name: ${modalData.author.name ? modalData.author.name : 'No Name'}</h3>
<h3 class="text-2xl font-bold">Title: ${modalData.title}</h3>
<h3 class="text-xl font-semibold">Published Date: ${modalData.author.published_date}</h3>
<h3>${modalData.details.slice(0, 150)}...</h3>
`
modalBody.appendChild(modalDiv)
})
}
const toggleSpinner = loading =>{
  const loadSpiner = document.getElementById('loader')

  if(loading){
    loadSpiner.classList.remove('hidden')
  }
  else{
    loadSpiner.classList.add('hidden')
  }
}

displayCategory()



