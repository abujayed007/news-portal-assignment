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
    if(uniqueArray.indexOf(news.category_name)  === -1){
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML =`
        <button  class="btn bg-gray-200 mt-4 font-extrabold hover:bg-purple-300 border-none text-purple-900 ">${news.category_name}</button>
    
        `
        menuContainer.appendChild(div)
    }
    });
    
   
}

const displayNewsItem = async ()=>{
    const response = await fetch('https://openapi.programming-hero.com/api/news/category/01')
    const data = await response.json();
   return data ;

 
}

const loadNews = async () =>{
    const newsdata = await displayNewsItem();
    const newsContainer = document.getElementById('news-container');
    // console.log(data)
    // const allNews = data.data[0].author.name;
    // console.log(allNews)
    newsdata.forEach( deep =>{
    

    const {name, img} = deep;
    const div = document.createElement('div')
    div.innerHTML =`
   <h1>OK</h1>
    `
    })
    newsContainer.appendChild(div)

}
loadNews()
displayCategory()