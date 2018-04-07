import React from 'react';
import './App.css';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import SearchResults from '../../components/SearchResults/SearchResults.js';
import Playlist from '../../components/Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {results: [{name:"Joanne",artist:"Lady Gaga",album:"Joanne",id:'0'},
                            {name:"Bad Romance",artist:"Lady Gaga",album:"The Fame Monster",id:'1'}],
                  playListName: "Lady Gaga",
                  playListTracks: [{name:"Joanne",artist:"Lady Gaga",album:"Joanne",id:'0'}]
                }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if (this.state.playListTracks.every(pltrack => {return pltrack.id !== track.id}))
      {
        let tempList = this.state.playListTracks.concat(track);
        this.setState({playListTracks: tempList});
      }
  }

  removeTrack(track){
    let tempList = this.state.playListTracks.filter(function(pltrack)
    {
      return pltrack.id !== track.id
    });
    this.setState({playListTracks: tempList});
  }

  updatePlaylistName(name){
    this.setState({playListName: name});
  }

  savePlaylist(){
    let trackURIs = this.state.playListTracks.map(track=>{return track.id});
  }

  search(searchTerm){
    console.log(searchTerm);
    Spotify.getAccessToken();
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.results} onAdd={this.addTrack}/>
            <Playlist
              playlist={this.state.playListTracks}
              playlistname={this.state.playListName}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;