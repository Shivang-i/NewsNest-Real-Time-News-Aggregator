const API_Key = "a0d534247dd5466f88a7fe2e3596dd81";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));


function reload(){
    window.location.reload();
}
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_Key}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}
// let curSelectedNav=null;
// function onNavItemClick(id){
//     fetchNews(id);
//     const navItem=document.getElementById(id);
//     curSelectedNav?.classList.remove('active');
//     curSelectedNav.classList.add('active');
// }
let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    
    const navItem = document.getElementById(id);
    if (!navItem) return; // extra safety

    if (curSelectedNav) {
        curSelectedNav.classList.remove('active');
    }

    navItem.classList.add('active');
    curSelectedNav = navItem;
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value.trim();
    if (!query) return;

    fetchNews(query);

    if (curSelectedNav) {
        curSelectedNav.classList.remove('active');
        curSelectedNav = null;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});