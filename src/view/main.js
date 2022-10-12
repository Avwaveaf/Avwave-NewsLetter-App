import DataSource from "../data/dataSrc.js";
import "../components/newsList";
import "../components/searchBar.js";
import "../components/newsCard.js";

const main = () => {
  const searchElement = document.querySelector("search-bar");
  const newsContent = document.querySelector("#newsContent");
  const liElement = document.querySelectorAll(".category-item");
  const newsTitle = document.querySelector("#newsTitle");

  const searchButtonClicked = async () => {
    const newsListElement = document.querySelector("news-list");
    if (newsContent.hasChildNodes) {
      newsListElement.remove();
      renderNewsList();
      try {
        const result = await DataSource.searchNews(searchElement.value);
        renderResult(result);
      } catch (message) {
        fallbackResult(message);
      }
    }
  };
  const categoryClicked = async (e) => {
    const newsListElement = document.querySelector("news-list");
    if (newsContent.hasChildNodes) {
      newsListElement.remove();
      renderNewsList();
      try {
        const result = await DataSource.searchNews(e.target.innerText);
        renderResult(result);
        newsTitle.innerHTML = `${e.target.innerText} News <span class="badge bg-danger">New</span>`;
      } catch (message) {
        fallbackResult(message);
      }
    }
  };
  const renderResult = (result) => {
    const newsListElement = document.querySelector("news-list");
    newsListElement.news = result;
    if (searchElement.value) {
      newsTitle.innerText = `"${searchElement.value}" News`;
    } else {
      newsTitle.innerText = "Latest News";
    }
  };
  const fallbackResult = (message) => {
    const newsListElement = document.querySelector("news-list");
    newsListElement.renderError(message);
  };
  const renderNews = async () => {
    try {
      const result = await DataSource.searchNews();
      renderResult(result);
    } catch (message) {
      fallbackResult(message);
    }
  };
  const renderNewsList = () => {
    const newsList = document.createElement("news-list");
    newsContent.appendChild(newsList);
  };
  liElement.forEach((e) => {
    e.addEventListener("click", categoryClicked);
  });

  searchElement.clickEvent = searchButtonClicked;
  renderNewsList();
  renderNews();
};

export default main;
