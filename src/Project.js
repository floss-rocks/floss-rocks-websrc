import ReactMarkdown from 'react-markdown'
import React from 'react'
import Navbar from './Navbar'
import Datastore from './Datastore'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";



class Project extends React.Component {
  constructor(props){
     super(props);
     this.state = {
       repoData: NaN,
       textReadme: "",
       limitReach: false,
       apiError: false,
       renderReady: false,
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
            renderReady: true
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
                    <a target="_blank" href={"https://www.github.com/"+this.state.projectPath}><h1 className="title">{this.props.match.params.project} <i className="fa fa-external-link"></i></h1></a>
                    <h2 className="subtitle">
                      <div>
                        <ReactPlaceholder type='text' rows={1} ready={this.state.renderReady}>
                          <span className="icon is-small"><i className="fa fa-star"></i></span><span>{this.state.repoData.stargazers_count}</span>
                          <span className="icon is-small"><i className="fa fa-code-fork"></i></span> <span>{this.state.repoData.forks_count}</span>
                          <span className="icon is-small"><i className="fa fa-heart"></i></span><span>{this.state.repoData.watchers_count}</span>
                        </ReactPlaceholder>
                      </div>
                      <div>
                        <ReactPlaceholder type='text' rows={1} ready={this.state.renderReady}>
                          <p>{this.state.repoData.description}</p>
                        </ReactPlaceholder>
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
                        <a href="/random" className="button is-success">
                          <span>Next Project</span>
                          <span className="icon is-small is-right"><i className="fa fa-arrow-right"></i></span>
                        </a>
                      </div>
                    </div>
                    <div className="content article-body">
                      <ReactPlaceholder type='text' rows={10} ready={this.state.renderReady}>
                        <div><ReactMarkdown source={this.state.textReadme}/></div>
                      </ReactPlaceholder>
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

export default Project
