var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQDa6PMUE6Rr7Id-lJFXcIwADUvhNy6vnlyjqfVUmSxZn31CpE0Ec8S2f5p5kfX2R7C6gFP06oeTiApr2YAFZkRj2i0ZYEGDS3R0zYxoJQB_kv3oWlNQC2UTYmZS2gXGgxyRpe8');

function search() {
    spotifyApi.setAccessToken('BQDa6PMUE6Rr7Id-lJFXcIwADUvhNy6vnlyjqfVUmSxZn31CpE0Ec8S2f5p5kfX2R7C6gFP06oeTiApr2YAFZkRj2i0ZYEGDS3R0zYxoJQB_kv3oWlNQC2UTYmZS2gXGgxyRpe8');
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

function myFunction() {
    console.log();
    (async () => {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('../models');
        
        var c = document.getElementById("canvas");
        c.drawImage(video, 0, 0, 640, 480);

        const image = document.querySelector('img');
        image.src = canvas.toDataURL();
        const canvas = faceapi.createCanvasFromMedia(image);
        const detection = await faceapi.detectAllFaces(image);
    })();
}