import React from 'react';
import './TrackList.css';
import Track from '../../components/Track/Track.js'

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks && this.props.tracks.map(track=>{
            return track.id && <Track key={track.id} track={track} onAdd={this.props.onAdd}
            onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
          })
        }
      </div>
    );
  }
}

export default TrackList;