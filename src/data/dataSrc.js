const API_KEY = "d5c7ec277cmshaab8078ec86ed58p1722bajsnbf2f14c09a13";

class DataSource {
  static searchNews(keyword) {
    if (keyword) {
      return fetch(
        `https://bing-news-search1.p.rapidapi.com/news/search?q=${keyword}&freshness=Day&textFormat=Raw&safeSearch=Off`,
        {
          method: "GET",
          headers: {
            "x-bingapis-sdk": "true",
            "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
          }
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((responseJSON) => {
          if (responseJSON.value) {
            if (responseJSON.value.length === 0) {
              return Promise.reject(`${keyword} doesn't exist`);
            } else {
              return Promise.resolve(responseJSON.value);
            }
          } else {
            return Promise.reject(`${keyword} something went wrong`);
          }
        });
    } else {
      return fetch(
        "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw",
        {
          method: "GET",
          headers: {
            "x-bingapis-sdk": "true",
            "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
          }
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((responseJSON) => {
          if (responseJSON.value) {
            return Promise.resolve(responseJSON.value);
          } else {
            return Promise.reject(`${keyword} doesn't exist`);
          }
        });
    }
  }
}

export default DataSource;
