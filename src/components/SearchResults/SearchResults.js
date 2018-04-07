import React from 'react';
import './SearchResults.css';
import TrackList from '../../components/TrackList/TrackList.js'


class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} onRemoval={false}/>
      </div>
    );
  }
}

export default SearchResults;
