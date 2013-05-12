PlayerBG={
    startlink:0,
    soranumber:0,
    played:-1,
    qare2:"",
    playlistflg:0,
    play:function(soraNumber,qar2obj){
        PlayerBG.soranumber=soraNumber;
        if(soraNumber==115){
            soraNumber=1;
        }
        var site=qar2obj.link;
        PlayerBG.qare2=qar2obj.id
        link=''
        if(soraNumber < 10){
            link+="00"
        }
        else{
            if(soraNumber<100){
                link+="0"
            }
        }
        link+=soraNumber
        if(PlayerBG.playlistflg==0){
            PlayerBG.startlink=link;
        }
        site+=link+".mp3"
        document.getElementById("audio").src = site;
        document.getElementById("audio").load()
        document.getElementById("audio").play()
        PlayerBG.played=1;
    },
    pause:function(){
        PlayerBG.played=0;
        document.getElementById("audio").pause()
    },
    playpause:function(){
        document.getElementById("audio").play();
        PlayerBG.played=1;
    },
    ononplaying:function(){
        var popup=chrome.extension.getViews({
            type:"popup"
        });
        if(popup.length!=0){
            popup[0].popupPlayer.showwait();
        }
    }
}
$(function(){
    PlayerDB.setup();
    document.getElementById("audio").addEventListener('ended',function(){
        var soraNumber=0;
        var moqra2Obj=0;
        if(PlayerBG.playlistflg==1){
            playlist=JSON.parse(localStorage.playlist);
            list=JSON.parse(playlist.list);
            playlist.seek++;
            if(playlist.seek==list.length){
                if(playlist.repeat){
                    playlist.seek=0;
                }else
                {
                    return;
                }
            }
            soraNumber=list[playlist.seek];
            console.log(list[playlist.seek])
            moqra2Obj=quranQare2[playlist.moqra2-1];
            localStorage.playlist=JSON.stringify(playlist);
        }else{
            soraNumber=++PlayerBG.startlink;
            moqra2Obj=quranQare2[PlayerBG.qare2-1];
        }
        PlayerBG.play(soraNumber,moqra2Obj);
    },false);
    
})