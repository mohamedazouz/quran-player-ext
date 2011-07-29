// JavaScript Document
 function getlink(){
                document.getElementById("pause").disabled=false
                document.getElementById("play").disabled=true;
                chrome.extension.getBackgroundPage().play($("#link").val())
            }
            function pause(){
                document.getElementById("pause").disabled=true
                document.getElementById("play").disabled=false;
                chrome.extension.getBackgroundPage().pause();
            }
            function playpause(){
                document.getElementById("pause").disabled=false
                document.getElementById("play").disabled=true;
                chrome.extension.getBackgroundPage().playpause();
            }
			
			$(document).ready(function(){
                if( chrome.extension.getBackgroundPage().startlink==0){
                    document.getElementById("pause").disabled=true
                    document.getElementById("play").disabled=true;
                }
                if( chrome.extension.getBackgroundPage().played==0){
                    document.getElementById("pause").disabled=true
                    document.getElementById("play").disabled=false;
                }
                if( chrome.extension.getBackgroundPage().played==1){
                    document.getElementById("pause").disabled=false
                    document.getElementById("play").disabled=true;
                }

                chrome.extension.getBackgroundPage().notify();
                function onRequest(request, sender, callback) {
                    send();
                }
                chrome.extension.onRequest.addListener(onRequest);
                
                function send(){
                    chrome.extension.sendRequest({"back":"fola"});
                }
                var id="";
                chrome.windows.getCurrent(function(id){
                    
                })
                chrome.windows.onRemoved.addListener(function(s){
                    //alert("hji")
                })
                window.onclose=function(){
                  //  alert("jo")
                }
				
            })
            function show(){
             //   alert("hey");
            }