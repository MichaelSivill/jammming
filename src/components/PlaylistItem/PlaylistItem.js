import React from 'react';
import './PlaylistItem.css';

class PlaylistItem extends React.Component {
  constructor(props){
    super(props);
    this.selectList = this.selectList.bind(this);
    this.delete = this.delete.bind(this);
  }

  selectList(){
    this.props.selectPlaylist(this.props.playlistItem);
  }

  delete(){
    this.props.deletePlaylist(this.props.playlistItem);
  }

  render() {
    return (
      <div className="PlaylistItem">
        <div onClick={this.selectList} className="PlaylistItem-information">
          <h3>{this.props.playlistItem.name}</h3>
        </div>
        <a className="PlaylistItem-action" onClick={this.delete}>delete</a>
      </div>
    );
  }
}

export default PlaylistItem;
