import React from 'react';
import './PlaylistContainer.css';
import PlaylistList from '../../components/PlaylistList/PlaylistList.js'


class PlaylistContainer extends React.Component {
  render() {
    return (
      <div className="PlaylistContainer">
        <h2>Your Playlists</h2>
        <PlaylistList
          selectPlaylist={this.props.selectPlaylist}
          playlistItems={this.props.playlistList}
          deletePlaylist={this.props.deletePlaylist}/>
      </div>
    );
  }
}

export default PlaylistContainer;
