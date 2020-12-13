var callback_url = window.location.href;
const api_url = "https://accounts.spotify.com/authorize?client_id=603a3368045e46f7ac6e93eae3b95595&response_type=token&redirect_uri="+callback_url;
var access_token;
var hash;
if(!window.location.hash){
    window.location.replace(api_url);
}else{
    var url = window.location.href;
    hash = url.split('#')[1];
    hash = hash.split('&')[0];
    hash = hash.split('=')[1];
}

// ...
// ...

var spotifyApi = new SpotifyWebApi();
access_token = hash;
spotifyApi.setAccessToken(access_token);


function search() {
    spotifyApi.setAccessToken(access_token);
    var form = document.getElementById("form");
    var text = form.elements[0].value;
    console.log(text);
    var p_songid = document.getElementById("song_id");

    spotifyApi.searchTracks(text).then(
        function (data) {
            console.log(text+" track data", data);
            var track_id = data.tracks.items[0].id;
            console.log(track_id);
            p_songid.innerHTML = track_id;
            return track_id;
        },
        function (err) {
            console.error(err);
        }
    ).then(function (track_id) {
        spotifyApi.getAudioFeaturesForTrack(track_id).then(
            function (data) {
                console.log(text+" track  features", data);
                p_songid.innerHTML = JSON.stringify(data, null, 2);
            },
            function (err) {
                console.error(err);
            }
        );
    });
}
