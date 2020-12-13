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
            var music_player = document.getElementById("music_player");
            music_player.src = "https://open.spotify.com/embed/track/"+track_id;
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

var track_ids = [];

function open_playlist() {
    spotifyApi.setAccessToken(access_token);
    var form = document.getElementById("form2");
    var text = form.elements[0].value;
    console.log(text);
    text = text.split("playlist/")[1];
    text = text.split("?")[0];

    var playlist = document.getElementById("playlist");
    playlist.src = "https://open.spotify.com/embed/playlist/" + text
    spotifyApi.getPlaylist(text).then(
        function (data) {
            console.log(data);
            return data;
        },
        function (err) {
            console.error(err);
        }
    ).then(function (data) {
        var track_items = data.tracks.items;
        var output_string = "";
        var output_paragraph = document.getElementById("playlist_output");
        for (let i = 0; i < 100; i++)
        {
            spotifyApi.getAudioFeaturesForTrack(track_items[i].track.id).then(
                function (d) {
                    output_string += JSON.stringify(d, null, 2) + "<br>";
                    output_paragraph.innerHTML = output_string;
                },
                function (err) {
                    console.error(err);
                }
            );
        }
    });

}