import React from 'react';


function Navigation() {
    return (

          <nav className="navigation">
            <ul className="list">

              <li className="list__item list__item--logo">
                
                <button className="button button--logo">
                  <img className="logo" src={`./icons/logo.png`} />
                </button>

              </li>

              <li className="list__item">
                <a className="button button--nav" href={`/`}>HOME</a>
              </li>
              <li className="list__item">
                <a className="button button--nav" href={`/products`}>SHOP</a>
              </li>
              <li className="list__item">
                <a className="button button--nav" href={`/about`}>ABOUT</a>
              </li>
              <li className="list__item list__item--right">
                <a className="button button--right" href={`/contact`}>Contact Us</a>
              </li>

              <li className="list__item list__item--icon">
                
                <button className="button button--icon">
                  <img className="image" src={`./icons/user.png`} />
                </button>

              </li>

            </ul>
          </nav>

    )
}

export default Navigation;