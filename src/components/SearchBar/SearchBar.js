import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state={term: ''};
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.enter = this.enter.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term)
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  enter(event){
    if(event.key !== "Enter"){
      return
    }
    else{
      this.search();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input onKeyDown={this.enter} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
