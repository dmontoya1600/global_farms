import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Route } from 'react-router-dom';
import env from "react-dotenv";


function News({newsKey}) {

    let [articles, setArticles] = useState(null)
    let [newsContent, setNewsContent] = useState(false)
    let [newsUrl, setNewsUrl] = useState(null)

    useEffect(() => {
        if(!newsKey){
            newsKey = env?.REACT_APP_SUB_KEY
            if(!newsKey) newsKey = process.env.REACT_APP_SUB_KEY
        }
        (async () => {
            let res = await fetch('https://api.bing.microsoft.com/v7.0/news/search?mkt=en-us&q=farms', {
                method: 'GET',
                headers: {
                    "Ocp-Apim-Subscription-Key" : newsKey
                }
            })
            let data = await res.json()

            setArticles(data.value)

        })();
    }, [])


  return (
    <div className='news__component'>
        {newsUrl ? <Route hidden exact path="/" render={() => (window.location = newsUrl)} />: null}
        {articles ? articles.map(article => (
            <div className='news__article' key={article.name} onClick={() => setNewsUrl(article.url)} onMouseEnter={() => setNewsContent(article.name)} onMouseLeave={() => setNewsContent(false)}>
                <div className='news__source'>{article.provider[0].name}</div>
                <img className='news__image' src={article.image?.thumbnail?.contentUrl}/>
                <div className='news__title' >{article.name}</div>
                {newsContent === article.name ?
                <div className='news__desc'>{article.description}</div>: null}
            </div>
        )) : <div>No recent farming news</div>}

    </div>

  );
}
export default News;
