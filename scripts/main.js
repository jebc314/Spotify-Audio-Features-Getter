var spotifyApi = new SpotifyWebApi();

window.onload = function() {
    var input = document.getElementById("button1");
    var input2 = document.getElementById("button2");
    input.addEventListener("keyup", function(event) {
        var code;
        if (event.key !== undefined) {
            code = event.key;
        } else if (event.keyIdentifier !== undefined) {
            code = event.keyIdentifier;
        } else if (event.keyCode !== undefined) {
            code = event.keyCode;
        }

        // Number 13 is the "Enter" key on the keyboard
        if (code === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          input.click();
        }
      });
    input2.addEventListener("keyup", function(event) {
        var code;
        if (event.key !== undefined) {
            code = event.key;
        } else if (event.keyIdentifier !== undefined) {
            code = event.keyIdentifier;
        } else if (event.keyCode !== undefined) {
            code = event.keyCode;
        }

        // Number 13 is the "Enter" key on the keyboard
        if (code === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          input2.click();
        }
      });
}

function search() {
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
    access_token = hash;
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
    access_token = hash;
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
                    setTimeout(() => {  console.log("World!"); }, 10);
                },
                function (err) {
                    console.error(err);
                }
            );
        }
    });

}