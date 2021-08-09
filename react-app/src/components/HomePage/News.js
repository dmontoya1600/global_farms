import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function News() {
    useEffect(() => {
        (async () => {
            let res = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=da70b2caa6fa47ce88c6ea7632d2f8a4')
            console.log('NEWS RES: ', res)
        })();
    })

  return (
    <div className='home__page'>

    </div>

  );
}
export default News;
