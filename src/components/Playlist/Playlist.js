import React from 'react';
import './Playlist.css';
import TrackList from '../../components/TrackList/TrackList.js'

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  handleSave(){
    this.props.onSave();
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playlistname} onChange={this.handleNameChange}/>
          <TrackList tracks={this.props.playlist} onRemove={this.props.onRemove} isRemoval={true}/>
        <a className="Playlist-save" onClick={this.handleSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
