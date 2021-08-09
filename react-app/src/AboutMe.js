import React, { useState } from 'react';
import { Route, NavLink, useHistory } from 'react-router-dom';


const AboutMe = () => {
  const history = useHistory()
  let [aboutUrl, setUrl] = useState(null)
  function clickIcon(){
    history.push('/')
  }



  return (
    <nav className='lowbar'>
      {aboutUrl ? <Route exact path="/" render={() => (window.location = aboutUrl)} /> : null}
        <i className='fab fa-linkedin' onClick={() => setUrl('https://linkedin.com/in/damian-m-31aa6118b')}/>
        <i className='fab fa-github' onClick={() => setUrl('https://github.com/dmontoya1600')} />
    </nav>
  );
}

export default AboutMe;
