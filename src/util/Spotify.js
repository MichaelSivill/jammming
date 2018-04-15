let userAccessToken;
const appId = 'ec99ac9a6657428d8c5e64e136e87e45';
//const redirectUri = 'http://msjammming.surge.sh/';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken(){
    if(userAccessToken){
      return userAccessToken;
    }
    let hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
    let hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if(hasAccessToken && hasExpiresIn){
      userAccessToken = hasAccessToken[1];
      const expiresIn = Number(hasExpiresIn[1]);
      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    }
    else{
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${appId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
      return -1;
    }
  },

  search(searchTerm){
    let accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {return response.json()}).then(jsonResponse=>{
      return jsonResponse.tracks.items.map(
        track => {return {
          album: track.album.name,
          name: track.name,
          artist: track.artists[0].name,
          id: track.id,
          uri: track.uri
        }}
      )
    });
  },

  savePlaylist(playListName, tracks) {
    if(playListName === '' || tracks === []){
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const postHeaders = {Authorization: `Bearer ${accessToken}`};
    let userId;
    let playListId;
    return fetch(`https://api.spotify.com/v1/me`,{headers: postHeaders}).then(
      response=>response.json()
    ).then(jsonResponse=>{
      return jsonResponse.id;
    }).then(uId=>{
      userId = uId;
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {headers: postHeaders,
         method: 'POST',
         body: JSON.stringify({name: playListName})}
      ).then(response => response.json()).then(
        jsonResponse=>{return jsonResponse.id}).then(pId=>{
          playListId = pId;
          fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,
            {headers: postHeaders,
             method: 'POST',
             body: JSON.stringify({uris: tracks})}
          ).then(response=>response.json()).then(jsonResponse=>{return jsonResponse})
        })
    })
  },

  getPlaylists() {
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    return fetch(`https://api.spotify.com/v1/me`,{headers: headers}).then(
      response=>response.json()
    ).then(jsonResponse=>{
      return jsonResponse.id;
    }).then( userId => {
      return fetch( `https://api.spotify.com/v1/users/${userId}/playlists`,
        {headers: headers,
         method: 'GET'
       }).then( response => {return response.json()}).then(
         jsonResponse => {
           return jsonResponse.items.map( playlist => {
             return {name: playlist.name,
             id: playlist.id};
           });
         }
       );
    });
  },

  getPlaylistById(playlistId){
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    return fetch(`https://api.spotify.com/v1/me`,{headers: headers}).then(
      response=>response.json()
    ).then(jsonResponse=>{
      return jsonResponse.id;
    }).then(userId => {
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`,
        {headers: headers,
         method: 'GET'}
      ).then(response => {return response.json()}).then(
        jsonResponse => {return jsonResponse.tracks.items.map( track =>
          {
            return {
              album: track.track.album.name,
              name: track.track.name,
              id: track.track.id,
              artist: track.track.artists[0].name,
              uri: track.track.uri}
          }
        );
      })
      });
    },

    deletePlaylistById(playlistId){
      const accessToken = Spotify.getAccessToken();
      const headers = {Authorization: `Bearer ${accessToken}`};
      return fetch(`https://api.spotify.com/v1/me`,{headers: headers}).then(
        response=>response.json()
      ).then(jsonResponse=>{
        return jsonResponse.id;
      }).then(userId => {
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/followers`,
          {headers: headers,
           method: 'DELETE'})
        });
    }
}

export default Spotify;
