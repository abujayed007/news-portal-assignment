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
        <button onclick="loadNewsItem('${category_id}')" class="btn bg-gray-200 mt-4 font-extrabold hover:bg-purple-300 border-none text-purple-900 ">${category_name}</button>
    
        `
        menuContainer.appendChild(div)
    }
    });
    
   
}
loadNewsItem = (news) =>{
    // console.log(news)
    fetch(`https://openapi.programming-hero.com/api/news/category/${news}`)
    .then(res => res.json())
    .then(data => displayNewsItems(data.data))
}
displayNewsItems = allNews => {

  const newsContainer = document.getElementById('news-container');
  newsContainer.textContent = '';

    console.log(allNews)
    
    allNews.filter(news =>{
      console.log(allNews)
      const div = document.createElement('div')
    div.innerHTML= `
    <div class="card lg:card-side bg-base-100 mt-5 shadow-xl">
    <figure><img class="w-96 h-100 " src="${news.image_url}" alt="Album"></figure>
    <div class="card-body  w-75">
    <h2 class="card-title p-2">${news.title}</h2>
      <p class="disable p-2">${news.details.slice(0, 200)}...</p>
      <div class="card-actions justify-end">
      <img class="w-22 h-12 rounded-full p-2" src="${news.author.img}" alt="Album">
      <p class="pt-2 font-bold">${news.author.name ? news.author.name : 'No Names'}</p>
      <p class="pt-2 font-bold">${news.total_view}</p>
        <button class="btn btn-primary"><i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  </div>
    `
newsContainer.appendChild(div)
// ${news.author.img}

})
}
displayCategory()

// // const displayNewsItem = news =>{
// //     fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`)
// //     .then(res => res.json())
// //     .then(data => console.log(data))
// // }

// const loadNewsItem = ()=>
// fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`)
//    .then(res => res.json())
//    .then(data =>displayNewsItem(data))


//     const displayNewsItem =  newses =>{
//         console.log(newses)
//         newses.forEach(news =>{
//             console.log(news)
//         })
//     }
//     // displayNewsItem()
//     loadNewsItem()
// // const newsContainer = document.getElementById('news-container')

// // output.data.forEach( news =>{
// // // newsContainer.textContent = ''
// // // const div = document.createElement('div')
// // // div.innerHTML= `
{/* <div class="card card-side bg-base-100 shadow-xl">
   <figure><img src="${image_url}" alt="Movie"></figure>
   <div class="card-body">
     <h2 class="card-title">${news.data[0].title}</h2>
     <p>Click the button to watch on Jetflix app.</p>
     <div class="card-actions justify-end">
       <button class="btn btn-primary">Watch</button>
     </div>
   </div>
 </div>
 

// // console.log(news)
// // })

// // newsContainer.appendChild(div)
  */}
