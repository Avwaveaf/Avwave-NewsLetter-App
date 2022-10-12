class newsCard extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set news(news) {
    this._news = news;
    this.render();
  }
  render() {
    const {
      description,
      image: {
        thumbnail: { contentUrl: imgUrl }
      } = "assets/images/not_found_image.jpg",
      name,
      url
    } = this._news;
    this.shadowDOM.innerHTML = `
    <style>
        .card__container{
          text-decoration: none;
          color: black;
        }
        .card{
            justify-content: center;
            align-items: center;
            text-align: center;
            flex-direction: flex-row;
            max-width:400px;
            max-height: 550px;
            border-radius: 30px;
            margin: 10px 10px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            padding: 5px;

        }
        .card:hover{
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5);
        }
        .btn__redirect{
          border-top: 1px solid black;
          padding: 10px;
          border-bottom-left-radius : 30px;
          border-bottom-right-radius : 30px;
        }
        .btn__redirect:hover{
          background: black;
          color:white;
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
        .image__container {
          border-top-left-radius : 30px;
          border-top-right-radius : 30px;

          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          width:100%;
          height:300px;
      }
      .image__container img {
        object-fit: cover;
          flex-shrink: 0;
          min-width: 100%;
          min-height: 100%
      }
        @media only screen and (max-width: 600px) {
            .card{
                max-width:100%;
            }
          }
    </style>
    
    <a class="card__container" href=${url}>
      <div class="card">
          <div class="image__container">
              <img src=${imgUrl}></img>
          </div>
          <h3 id="title">${name.substr(0, 70)}...</h3>
          <p>${description.substr(0, 150)}..</p>
          <div class="btn__redirect">
            <strong>Read More</strong>
          </div>
      </div>
    </a>
      `;
  }
}

customElements.define("news-card", newsCard);
