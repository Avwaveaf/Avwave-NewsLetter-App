class newsList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set news(news) {
    this._news = news;
    this.render();
  }

  render() {
    this._news.forEach((e) => {
      const newsElement = document.createElement("news-card");
      newsElement.news = e;
      this.shadowDOM.appendChild(newsElement);
    });
  }
  renderError(message) {
    this.shadowDOM.innerHTML = `
    <style>
         .placeholder {
               font-weight: lighter;
               color: rgba(0,0,0,0.5);
               -webkit-user-select: none;
               -moz-user-select: none;
               -ms-user-select: none;
               user-select: none;
           }
    </style>`;
    this.shadowDOM.innerHTML += `<h2 class="placeholder">${message}</h2>`;
  }
}
customElements.define("news-list", newsList);
