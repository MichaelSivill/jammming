let userAccessToken = '';
const userId = 'ec99ac9a6657428d8c5e64e136e87e45';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken(){
    if(userAccessToken !== ''){
      return userAccessToken;
    }
    else{
      return fetch(
        `https://accounts.spotify.com/authorize?client_id=${userId}&response_type=token&redirect_uri=${redirectUri}`
      ).then(
        response => {
          return response.json();
        }
      ).then(
        function(jsonResponse){
          console.log(jsonResponse);
        }
      )
    }
  }
}

export default Spotify;
