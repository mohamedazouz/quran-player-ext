var backgrounPage=chrome.extension.getBackgroundPage();
PlayerOptoin={
    showOptions:function(){
        var out="<select id='soraName' data-placeholder='اختار السورة' class='chzn-select' multiple style='width:235px;' tabindex='1' >"
        size=backgrounPage.quranChapter.length;
        out+="<option value=''></option>";
        for(i=0;i<size;i++){
            out+="<option value='"+backgrounPage.quranChapter[i].id+"' >"
            out+=backgrounPage.quranChapter[i].name;
            out+="</option>"
        }
        out+="</select>"
        $("#sora").html(out);
        out="<select  id='moqra2Name' data-placeholder='اختار القارىء' class='chzn-select'  style='width:235px;' tabindex='2' >"
        size=backgrounPage.quranQare2.length;
        for(i=0;i<size;i++){
            out+="<option value='"+backgrounPage.quranQare2[i].id+"' >"
            out+=backgrounPage.quranQare2[i].name;
            out+="</option>"
        }
        out+="</select>"
        $("#moqra2").html(out);
    },
    showplaylist:function(){
        backgrounPage.PlayerDB.selectALLPlayList(function(response){
            var out="";
            size=response.length
            for(i=0;i<size;i++){
                out+="<tr>";
                out+="<td>"+response.item(i).id+"</td>";
                out+="<td width='250'>"+response.item(i).name+"</td>";
                list=JSON.parse(response.item(i).list);
                html="";
                for(j=0;j<list.length;j++){
                    html+=backgrounPage.quranChapter[list[j]-1].name;
                    if(i!=list.length-1){
                        html+=",";
                    }
                }
                out+="<td  width='250'>"+html+"</td>";
                moqra2=response.item(i).moqra2;
                out+="<td  width='250'>"+backgrounPage.quranQare2[moqra2-1].name+"</td>";
                out+="<td><button onclick='PlayerOptoin.deletePlayList("+response.item(i).id+")'>حذف</button></td>";
                out+="<td>اختار <input type='checkbox' sid='"+response.item(i).id+"'  /><button onclick='PlayerOptoin.playPlayList("+response.item(i).id+")'>تشغيل</button></td>";
                out+="</tr>"
            }
            $("#preplayList").html(out);
        });   
    },
    deletePlayList:function(id){
        if(confirm("ها تريد مسح القائمة رقم "+ id + "؟")){
            backgrounPage.PlayerDB.deletePlayListByID(id,function(){
                PlayerOptoin.showplaylist();
            })
        }
    },
    deleteSelectedPlayList:function(){
        if(confirm("هل تريد مسح "+ $("input:checked").length + "القوائم المختارة؟")){
            $("input:checked").each(function(){
                backgrounPage.PlayerDB.deletePlayListByID($(this).attr("sid"),function(){
                    PlayerOptoin.showplaylist();
                })
            })
        }
    },
    playPlayList:function(id){
        backgrounPage.PlayerDB.selectPlayListByID(id,function(response){
            console.log("hererer")
            playlist=response.item(0);
            playlist.seek=0;
            if($("#repeat-"+id).attr('checked')){
                playlist.repeat=1;
            }
            localStorage.playlist=JSON.stringify(playlist);
            var sora=JSON.parse(playlist.list)[0];
            var qare2=playlist.moqra2;
            backgrounPage.PlayerBG.playlistflg=1;
            backgrounPage.PlayerBG.play(sora,backgrounPage.quranQare2[qare2-1]);
        })
    },
    setclass:function(name){
        document.getElementById("pauseButton").className=name
        console.log(name);
    }
}
$(function(){
    PlayerOptoin.showplaylist();
    PlayerOptoin.showOptions();
    $("#error").hide();
    $("#save").click(function(){
        name=$("#playlistName").val();
        if(name && name !='' && $("#soraName").val()){
            moqra2= $("#moqra2Name").val();
            list=JSON.stringify($("#soraName").val());
            backgrounPage.PlayerDB.savePlayList(name,list,moqra2);
        }else{
            $("#error").show();
            setTimeout("$('#error').hide();",2*1000);
        }
        PlayerOptoin.showplaylist();
		
    })
    $("#deleteAllPlaylist").click(function(){
        if(confirm("هل تريد مسح جميع القوائم ؟")){
            backgrounPage.PlayerDB.deleteALLPlayList(function(){
                PlayerOptoin.showplaylist();
            })
        }
    })
    $("#deleteSelectedPlaylist").click(function(){
        
        PlayerOptoin.deleteSelectedPlayList();
        
    })
    switch (backgrounPage.PlayerBG.played) {
        case 0:
            PlayerOptoin.setclass("play");
            break;
        case 1:
            PlayerOptoin.setclass("pause");
            break;
        default:
            $("#pauseButton").hide()
            break;
    }
    $("#pauseButton").click(function(){
        if( backgrounPage.PlayerBG.played==0){
            backgrounPage.PlayerBG.playpause();
            PlayerOptoin.setclass("pause");
        }else{
            backgrounPage.PlayerBG.pause();
            PlayerOptoin.setclass("play");
        }
    })
    $(".chzn-select").chosen();
})
