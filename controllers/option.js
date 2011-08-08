var backgrounPage=chrome.extension.getBackgroundPage();
PlayerOptoin={
    showOptions:function(){
        var out="<select multiple='multiple' id='soraName' >"
        size=backgrounPage.quranChapter.length;
        for(i=0;i<size;i++){
            out+="<option value='"+backgrounPage.quranChapter[i].id+"' >"
            out+=backgrounPage.quranChapter[i].name;
            out+="</option>"
        }
        out+="</select>"
        $("#sora").html(out);
        out="<select  id='moqra2Name' >"
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
                out+="<td><button onclick=''>play</button></td>";
                out+="</tr>"
            }
            $("#preplayList").html(out);
        });   
    },
    deletePlayList:function(id){
        backgrounPage.PlayerDB.deletePlayListByID(id,function(response){
            console.log(response);
            PlayerOptoin.showplaylist();
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

})