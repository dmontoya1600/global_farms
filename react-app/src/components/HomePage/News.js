import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Route } from 'react-router-dom';

function News() {
    let [articles, setArticles] = useState(null)
    let [newsContent, setNewsContent] = useState(false)
    let [newsUrl, setNewsUrl] = useState(null)
    useEffect(() => {
        (async () => {
            let res = await fetch('https://newsapi.org/v2/top-headlines?q=farms&apiKey=da70b2caa6fa47ce88c6ea7632d2f8a4')

            let newsObj = await res.json()
            if(newsObj.status === 'ok'){
                setArticles(newsObj.articles)
            }
        })();
    }, [])
  return (
    <div className='news__component'>
        {newsUrl ? <Route exact path="/" render={() => (window.location = newsUrl)} />: null}
        {articles ? articles.map(article => (
            <div className='news__article' key={article.title} onClick={() => setNewsUrl(article.url)} onMouseEnter={() => setNewsContent(article.title)} onMouseLeave={() => setNewsContent(false)}>
                <div className='news__source'>{article.source.name}</div>
                <img className='news__image' src={article.urlToImage}/>
                <div className='news__title' >{article.title}</div>
                {newsContent === article.title ?
                <div className='news__desc'>{article.description}</div>: null}
            </div>
        )) : <div>No recent farming news</div>}

    </div>

  );
}
export default News;
