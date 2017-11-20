import React from 'react'

const Navbar = () => (
  <nav className="navbar is-white">
    <div className="navbar-brand">
      <a className="navbar-item brand-text" href="../">
        Floss.Rocks
      </a>
      <div className="navbar-burger burger" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="navMenu" className="navbar-menu">
      <div className="navbar-start">
        <a className="navbar-item" href="/">Home</a>
        <a className="navbar-item" href="https://github.com/floss-rocks/floss-rocks-websrc">Fork it</a>
        <a className="navbar-item" href="https://github.com/floss-rocks/floss-rocks-websrc/wiki/Suggest-a-new-project">Suggest a project</a>
      </div>
    </div>
  </nav>
)

export default Navbar
