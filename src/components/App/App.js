import React from 'react';
import './App.css';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import SearchResults from '../../components/SearchResults/SearchResults.js';
import Playlist from '../../components/Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';
import PlaylistContainer from '../../components/PlaylistContainer/PlaylistContainer';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {results: [],
                  playListName: 'Your Playlist',
                  playListTracks: [],
                  playlistList: [],
                  playlistId: '',
                  connectod: '',
                  profileImage: ''
                }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.loadPlaylists = this.loadPlaylists.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);

    Spotify.getAccessToken();
    this.loadPlaylists();
  }

  componentDidMount() {
    // Spotify.getAccessToken();
    // this.loadPlaylists();
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
    let trackURIs = this.state.playListTracks.map(track=>{return 'spotify:track:'+track.id});
    Spotify.savePlaylist(this.state.playListName,trackURIs);
    this.setState({playListName: 'Your Playlist', playListTracks: []});
    this.loadPlaylists();
  }

  search(searchTerm){
    Spotify.getPlaylists().then(lists => {
      this.setState({playlistList: lists});
    });
    Spotify.search(searchTerm).then(searchResults => {this.setState({results: searchResults})});
  }

  loadPlaylists(){
    Spotify.getAccessToken();
    Spotify.getPlaylists().then(lists => {this.setState({
      playlistList: lists});
    });
  }

  selectPlaylist(playlist){
    Spotify.getPlaylistById(playlist.id).then(list => {
      this.setState(
        {
          playListTracks: list
        }
      )
    });
    this.setState({playListName: playlist.name})
  }

  deletePlaylist(playlist){
    Spotify.deletePlaylistById(playlist.id);
    setTimeout(() => {
      Spotify.getAccessToken();
      Spotify.getPlaylists().then(lists => {this.setState({
        playlistList: lists});
      });}, 500);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}/>
          <div className="App-playlist" >
            <SearchResults
              searchResults={this.state.results}
              onAdd={this.addTrack}/>
            <PlaylistContainer
              selectPlaylist={this.selectPlaylist}
              playlistList={this.state.playlistList}
              deletePlaylist={this.deletePlaylist} />
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
