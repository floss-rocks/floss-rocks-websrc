import Navbar from './Navbar'
import React from 'react'


const Homepage = () => (
  <div className="container">
    <Navbar />
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="column is-6 is-offset-3">
          <h2 className="title">
            <div>
              <p><i className="fa fa-code-fork fa-4x"></i></p>
              <p>Floss.rocks</p>
            </div>
          </h2>
          <h1 className="subtitle">
             The best way to find a new floss project to follow and contribuite.
          </h1>
          <p>Use the button below to start the search</p>
          <a href="/random" className="button is-success">
            <span>Next Project </span>
            <span class="icon is-small is-right"><i className="fa fa-arrow-right"></i></span>
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default Homepage
