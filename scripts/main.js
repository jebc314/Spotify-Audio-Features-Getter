var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQA-ZImBrGLXGfUQuG_zQisNKPcCtCBy2Aj-LtLaiH7kK6jDEd8sNHclKBAn-YRwtnzjf_0qwkZFIgL2S0nLKYb7anfQaeO2yyKBGF5u9eiqtn4qtR-hfkaZTzR0GNK7I3aSP6s');

function search() {
    var form = document.getElementById("form");
    var text = form.elements[0].value;
    console.log(text);
    var p_songid = document.getElementById("song_id");

    spotifyApi.searchTracks(text).then(
        function (data) {
            console.log(text+" track data", data);
            track_id = data.tracks.items[0].id;
            console.log(track_id);
            p_songid.innerHTML = track_id;
        },
        function (err) {
            console.error(err);
        }
    )
}