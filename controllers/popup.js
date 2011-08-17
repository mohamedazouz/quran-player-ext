var backgrounPage=chrome.extension.getBackgroundPage();
popupPlayer={
    setupView:function(){
        if( backgrounPage.PlayerBG.soranumber==0){
            $("#player").hide();
        }
        console.log(backgrounPage.PlayerBG.played)
        if( backgrounPage.PlayerBG.played==0){
            popupPlayer.setclass("play");
        }
        if( backgrounPage.PlayerBG.played==1){
            popupPlayer.setclass("pause");
        }
    },
    getlink:function(){
        backgrounPage.PlayerBG.playlistflg=0;
        var sora=$("#link").val();
        var qare2=$("#qare2").val();
        if(sora!=0 && qare2!=0){
            $("#player").hide();
            $('#waiting').show();
            popupPlayer.setclass("pause");
            backgrounPage.PlayerBG.play(sora,backgrounPage.quranQare2[qare2-1]);
        }
    },
    control:function(){
        if( backgrounPage.PlayerBG.played==0){
            backgrounPage.PlayerBG.playpause();
            popupPlayer.setclass("pause");
        }else{
            backgrounPage.PlayerBG.pause();
            popupPlayer.setclass("play");
        }
    },
    setclass:function(name){
        document.getElementById("player").className=name
        console.log(name);
    },
    showSora:function(){		
        var out="<select id='link' data-placeholder='اختار السورة' class='chzn-select' style='width:290px;' tabindex='1'  onchange='popupPlayer.showSoraDetails()'>"
        size=backgrounPage.quranChapter.length;
        out+="<option value=''></option>";
        for(i=0;i<size;i++){
            if(backgrounPage.PlayerBG.soranumber==backgrounPage.quranChapter[i].id)
            {
                out+="<option value='"+backgrounPage.quranChapter[i].id+"' selected>";
            }else
            {
                out+="<option value='"+backgrounPage.quranChapter[i].id+"' >";
            }
            soraName=backgrounPage.quranChapter[i].name
            out+=i + 1 + ' - '+soraName;
            out+="</option>"
        }
        out+="</select>"
        $("#choose_sora").html(out);
    },
    showQare2:function(){
        var out="<select title='أختار القارئ ' class='chzn-select' style='width:290px;' tabindex='2' id='qare2'>"
        out+="<option value='0'>أختار القارئ</option>";
        for(i=0;i<backgrounPage.quranQare2.length;i++){
            if(backgrounPage.PlayerBG.qare2==backgrounPage.quranQare2[i].id)
            {
                out+="<option value='"+backgrounPage.quranQare2[i].id+"' selected>";
            }else
            {
                out+="<option value='"+backgrounPage.quranQare2[i].id+"' >";
            }
            soraName=backgrounPage.quranQare2[i].name
            out+=i + 1 + ' - '+soraName;
            out+="</option>"
        }
        out+="</select>"
        $("#choose_kare2").html(out);
    },
    showSoraDetails:function(){		
        var sora=$("#link").val();
        var out="";
        if(sora!=0){
            out+="<strong>"+backgrounPage.quranChapter[sora-1].name+"</strong><br>";
            out+=backgrounPage.quranChapter[sora-1].summery;
            $("#soraDetails_display").hide();
            $(".quran").show();
            $("#soraDetails").html(out)
        }else
        {
            $("#soraDetails_display").show();
            $(".quran").hide();
        }
    },
    showwait:function(){
        $("#waiting").hide();
        $("#player").show();
    }
}
$(function(){
    popupPlayer.setupView();
    popupPlayer.showSora();
    popupPlayer.showQare2();
    popupPlayer.showSoraDetails();
    $(".chzn-select").chosen();
    $("#waiting").hide();
})