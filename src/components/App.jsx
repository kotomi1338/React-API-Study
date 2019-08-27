import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.getQiitaPosts = this.getQiitaPosts.bind(this);
    this.state = {
      query: 'React'
    }
  }

  getQiitaPosts() {
    axios.get('https://qiita.com/api/v2/items', {
        params: {
          "page": "1",
          "per_page": "20",
          "query": this.state.query,
        }
      })
      .then((response) => {
        const data = response.data[0];
        this.setState({
          title: data.title,
          url: data.url,
        });
        console.debug(response, "ressponse");
        console.debug(this.state.title, "title")
        console.debug(this.state.url, "url")
      })
      .catch((error) => {
        console.debug(error);
      });
  }

  render() {
    return (
      <div className="App">
        <h1 className="app-title">Hello Qiita API</h1>
        <p>タイトル: {this.state.title}</p>
        <p>URL <a target="__brank" href={this.state.url}>{this.state.url}</a></p>
        <input
          type="button"
          value="検索"
          onClick={() => this.getQiitaPosts()}
        />
      </div>
    )
  }
}

export default App;