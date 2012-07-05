var IndexScript=function(){
    var indexScript={
        currentSora:"",
        currentQaraa:"",
        init:function(){
            indexScript.showSora();
            indexScript.showQare2();
            indexScript.setActionsAndEvents();
        },
        setActionsAndEvents:function(){
            $("#bn-bottom-ads").hide();
            $('table').hide();
            $(".chzn-select").chosen();
            $("#waiting").hide();
            $("#playAction").click(function(){
                indexScript.playSora();
            });
            $("#audio").bind("ended",function(){
                indexScript.nextSora();
            })
        //            $("#SoraName").bind("change", function(){
        //                })
        //            $("#SoraName").bind("change", function(){
        //                })
        },
        nextSora:function(){
            nextOne=parseInt(indexScript.currentSora)+1;
            $("#choose_sora .chzn-single span").html($("#SoraName > option[value="+nextOne+"]").html());
            indexScript.playSora(nextOne,indexScript.currentQaraa);
        },
        showSora:function(){
            var out="<select id='SoraName' title='اختار السورة' class='chzn-select' style='width:290px;' tabindex='1' >"
            size=quranChapter.length;
            out+="<option value=''></option>";
            for(i=0;i<size;i++){
                out+="<option value='"+quranChapter[i].id+"' >";
                soraName=quranChapter[i].name
                out+=i + 1 + ' - '+soraName;
                out+="</option>"
            }
            out+="</select>"
            $("#choose_sora").html(out);
        },
        showQare2:function(){
            var out="<select title='أختار القارئ ' class='chzn-select' style='width:290px;' tabindex='2' id='qaraaName'>"
            out+="<option value='0'>أختار القارئ</option>";
            for(i=0;i<quranQare2.length;i++){
                out+="<option value='"+quranQare2[i].id+"' >";
                
                soraName=quranQare2[i].name
                out+=i + 1 + ' - '+soraName;
                out+="</option>"
            }
            out+="</select>"
            $("#choose_kare2").html(out);
        },
        playSora:function(soraid,qaraaid){
            var soraNumber=soraid?soraid:$("#SoraName").val();
            var qaraaNumber=qaraaid?qaraaid:$("#qaraaName").val();
            if(soraNumber!=0 && qaraaNumber!=0){
                if(soraNumber==115){
                    soraNumber=1;
                }
                var qaraaLink=quranQare2[parseInt(qaraaNumber)-1].link;
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
                qaraaLink+=link+".mp3"
                indexScript.currentSora=soraNumber;
                indexScript.currentQaraa=qaraaNumber;
                $.get("flash.php", {
                    "mp3_url":qaraaLink
                }, function(response){
                    $("#player").html(response);
                });
            //                document.getElementById("audio").src = qaraaLink;
            //                document.getElementById("audio").load()
            //                document.getElementById("audio").play()
            }
        }
    }
    $(function(){
        indexScript.init();
    })
    return indexScript;
}
var indexScript=new IndexScript();