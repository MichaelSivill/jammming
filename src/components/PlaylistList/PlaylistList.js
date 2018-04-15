import React from 'react';
import './PlaylistList.css';
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem.js'

class PlaylistList extends React.Component {
  render() {
    return (
      <div className="PlaylistList">
        {
          this.props.playlistItems.map(playlistItem => <PlaylistItem
            selectPlaylist={this.props.selectPlaylist}
            deletePlaylist={this.props.deletePlaylist}
            key={playlistItem.id}
            playlistItem={playlistItem}/>)
        }
      </div>
    );
  }
}

export default PlaylistList;
