import React from 'react'
import Datastore from './Datastore'
import ReactMarkdown from 'react-markdown'
import {
  BrowserRouter as Router,
  Route, Redirect,
  Link, Switch
} from 'react-router-dom'

function GetRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const MainRouter = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Redirect from="/random" to={"/p/"+Datastore[GetRandom(0, Datastore.length)]}/>
        <Route path="/p/:author/:project/" component={Project}/>
      </Switch>
    </div>
  </Router>
)

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
        <Link className="navbar-item" to="/">Home</Link>
        <a className="navbar-item" href="https://www.github.com">Fork it</a>
        <a className="navbar-item" href="https://www.github.com">Suggest a project</a>
      </div>
    </div>
  </nav>
)

const Home = () => (
  <div className="container">
    <Navbar />
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="column is-6 is-offset-3">
          <h1 className="title">Coming Soon</h1>
          <h2 className="subtitle">
             $this is the best software platform for running an internet business. We handle billions of dollars every year for forward-thinking businesses around the world.
          </h2>
        </div>
      </div>
    </div>
  </div>
)

class Project extends React.Component {
  constructor(props){
     super(props);
     this.state = {
       repoData: NaN,
       textReadme: "",
       limitReach: false,
       apiError: false,
       projectPath: props.match.params.author+"/"+props.match.params.project
     }
  }
  componentDidMount() {
    if (Datastore.includes(this.state.projectPath)) {
      fetch("https://api.github.com/repos/"+this.state.projectPath)
        .then((response) => {
          if (response.status !== 200) {
            throw Error(response.statusText);
          } else {
            return response.json();
          }
        })
        .then((responseJson) => {
          this.setState({
            repoData: responseJson,
          });
        })
        .catch(() => {
          this.setState({
            apiError: true,
          });
        }
      );
      fetch("https://api.github.com/repos/"+this.state.projectPath+"/readme")
        .then((response) => {
          if (response.status !== 200) {
            throw Error(response.statusText);
          } else {
            return response.json();
          }
        })
        .then((responseJson) => {
          this.setState({
            textReadme: atob(responseJson["content"]),
          });
        })
        .catch(() => {
          this.setState({
            apiError: true,
          });
        }
      );
      fetch("https://api.github.com/rate_limit")
        .then((response) => {
          if (response.status !== 200) {
            throw Error(response.statusText);
          } else {
            return response.json();
          }
        })
        .then((responseJson) => {
          this.setState({
            githubReset: new Date(responseJson["rate"]["reset"] * 1000),
          });
        })
        .catch((error) => {
          console.log(error);
        }
      );
    }
    return
  }
  render() {
    if (Datastore.includes(this.state.projectPath)) {
      if (!this.state.apiError){
        return (
          <div className="container">
            <Navbar />
            <section className="articles">
              <div className="column is-8 is-offset-2">
                <section className="hero is-info is-bold is-small promo-block">
                  <div className="hero-body">
                    <h1 className="title">{this.props.match.params.project} <a target="_blank" href={"https://www.github.com/"+this.state.projectPath}><i className="fa fa-external-link"></i></a></h1>
                    <h2 className="subtitle">
                      <div>
                        <p><i className="fa fa-star"></i> {this.state.repoData.stargazers_count} <i className="fa fa-code-fork"></i> {this.state.repoData.forks_count} <i className="fa fa-heart"></i> {this.state.repoData.watchers_count}</p>
                        <p>{this.state.repoData.description}</p>
                      </div>
                    </h2>
                  </div>
                </section>
                <div className="card article">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-center">
                        <div className="author-image">
                          <i className="fa fa-github fa-5x"></i>
                        </div>
                      </div>
                      <div className="media-content has-text-centered">
                        <p className="title article-title">Readme.md</p>
                        <a href="/random" className="button is-info">
                          Next Project <i className="fa fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                    <div className="content article-body">
                      <div><ReactMarkdown source={this.state.textReadme}/></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      } else {
        return (
          <div className="container">
            <Navbar />
            <section className="articles">
              <div className="column is-8 is-offset-2">
                <section className="hero is-info is-bold is-small promo-block">
                  <div className="hero-body">
                    <h1 className="title">Github Api request limits reached.</h1>
                  </div>
                </section>
                <div className="card article">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-center">
                        <div className="author-image">
                          <i className="fa fa-github fa-5x"></i>
                        </div>
                      </div>
                      <div className="media-content has-text-centered">
                        <p className="title article-title">Your ip has reached the github api public limit (60 request / hours)</p>
                        <a href="/random" className="button is-info is-static">
                          Next Project <i className="fa fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                    <div className="content article-body">
                      <div className="has-text-centered">
                        <p>Reset date: {String(this.state.githubReset)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
      }
    } else {
      return (
        <div className="container">
          <Navbar />
          <section className="articles">
            <div className="column is-8 is-offset-2">
              <section className="hero is-info is-bold is-small promo-block">
                <div className="hero-body">
                  <h1 className="title">This project is not in the main DB</h1>
                </div>
              </section>
              <div className="card article">
                <div className="card-content">
                  <div className="media">
                    <div className="media-center">
                      <div className="author-image">
                        <i className="fa fa-github fa-5x"></i>
                      </div>
                    </div>
                    <div className="media-content has-text-centered">
                      <p className="title article-title">Submit your project using the link on the navbar</p>
                      <a href="/random" className="button is-info">
                        Next Project <i className="fa fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }
  }
}

export default MainRouter
