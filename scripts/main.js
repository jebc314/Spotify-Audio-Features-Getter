var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQBHYe_cDT0TqrPrRt0ULGkgnk9BOkjM7tw6aswS4hPCn0TiTNxusRakhq_rcp44pfUf8RpI58GdMmO6xv2QbHlonzyk3z30dUpup2LbW3SmJQfaZWR6uerzMJ-eMzdWwtExz9A');

function search() {
    spotifyApi.setAccessToken('BQBHYe_cDT0TqrPrRt0ULGkgnk9BOkjM7tw6aswS4hPCn0TiTNxusRakhq_rcp44pfUf8RpI58GdMmO6xv2QbHlonzyk3z30dUpup2LbW3SmJQfaZWR6uerzMJ-eMzdWwtExz9A');
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