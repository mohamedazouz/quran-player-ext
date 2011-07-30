var backgrounPage=chrome.extension.getBackgroundPage();
popupPlayer={
    setupView:function(){
        if( backgrounPage.startlink==0){
            $("#player").hide();
        }
        if( backgrounPage.played==0){
            popupPlayer.setclass("play");
        }
        if( backgrounPage.played==1){
            popupPlayer.setclass("pause");
        }
    },
    getlink:function(){
        var sora=$("#link").val();
        var qare2=$("#qare2").val();
        if(sora!=0 && qare2!=0){
            $("#player").show();
            popupPlayer.setclass("pause");
            backgrounPage.play(sora,quranQare2[qare2-1]);
        }
    },
    control:function(){
        if( backgrounPage.played==0){
            backgrounPage.playpause();
            popupPlayer.setclass("pause");
        }else{
            backgrounPage.pause();
            popupPlayer.setclass("play");
        }
    },
    setclass:function(name){
        document.getElementById("player").className=name
        console.log(name);
    },
    showSora:function(){
        var out="<select id='link' title='اختار السورة' class='chzn-select' style='width:290px;' tabindex='1'>"
        size=quranChapter.length;
        out+="<option value='0'>اختار السورة</option>";
        for(i=0;i<size;i++){
            if(backgrounPage.startlink==quranChapter[i].id)
            {
                out+="<option value='"+quranChapter[i].id+"' selected>";
            }else
            {
                out+="<option value='"+quranChapter[i].id+"' >";
            }
            soraName=quranChapter[i].name
            out+=i + ' - '+soraName;
            out+="</option>"
        }
        out+="</select>"
        $("#choose_sora").html(out);
    },
    showQare2:function(){
        var out="<select title='أختار القارئ ' class='chzn-select' style='width:290px;' tabindex='2' id='qare2'>"
        out+="<option value='0'>أختار القارئ</option>";
        for(i=0;i<quranQare2.length;i++){
            if(backgrounPage.qare2==quranQare2[i].id)
            {
                out+="<option value='"+quranQare2[i].id+"' selected>";
            }else
            {
                out+="<option value='"+quranQare2[i].id+"' >";
            }
            soraName=quranQare2[i].name
            out+=i + ' - '+soraName;
            out+="</option>"
        }
        out+="</select>"
        $("#choose_kare2").html(out);
    }
}
$(function(){
    popupPlayer.setupView();
    popupPlayer.showSora();
    popupPlayer.showQare2();	
	$(".chzn-select").chosen();
})