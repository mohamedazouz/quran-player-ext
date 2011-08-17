var backgrounPage=chrome.extension.getBackgroundPage();
PlayerOptoin={
    showOptions:function(){
        var out="<select id='soraName' data-placeholder='اختار السورة' class='chzn-select' multiple style='width:350px;' tabindex='1' >"
        size=backgrounPage.quranChapter.length;
		out+="<option value=''></option>";
        for(i=0;i<size;i++){
            out+="<option value='"+backgrounPage.quranChapter[i].id+"' >"
            out+=backgrounPage.quranChapter[i].name;
            out+="</option>"
        }
        out+="</select>"
        $("#sora").html(out);
        out="<select  id='moqra2Name' data-placeholder='اختار القارىء' class='chzn-select'  style='width:350px;' tabindex='2' >"
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
                out+="<td>"+response.item(i).name+"</td>";
                list=JSON.parse(response.item(i).list);
                html="";
                for(j=0;j<list.length;j++){
                    html+=backgrounPage.quranChapter[list[j]-1].name;
                    if(i!=list.length-1){
                        html+=",";
                    }
                }
                out+="<td>"+html+"</td>";
                moqra2=response.item(i).moqra2;
                out+="<td>"+backgrounPage.quranQare2[moqra2-1].name+"</td>";
                out+="<td><button onclick='PlayerOptoin.deletePlayList("+response.item(i).id+")'>delete</button></td>";
                out+="<td><button onclick='PlayerOptoin.playPlayList("+response.item(i).id+")'>play</button></td>";
                out+="</tr>"
            }
            $("#preplayList").html(out);
        });   
    },
    deletePlayList:function(id){
        backgrounPage.PlayerDB.deletePlayListByID(id,function(){
            PlayerOptoin.showplaylist();
        })
    },
    playPlayList:function(id){
        backgrounPage.PlayerDB.selectPlayListByID(id,function(response){
            console.log("hererer")
            playlist=response.item(0);
            playlist.seek=0;
            localStorage.playlist=JSON.stringify(playlist);
            var sora=JSON.parse(playlist.list)[0];
            var qare2=playlist.moqra2;
            backgrounPage.PlayerBG.playlistflg=1;
            backgrounPage.PlayerBG.play(sora,backgrounPage.quranQare2[qare2-1]);
        })
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
        backgrounPage.PlayerDB.deleteALLPlayList(function(){
            PlayerOptoin.showplaylist();
        })
    })
$(".chzn-select").chosen();
})
