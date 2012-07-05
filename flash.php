<?php
$mp3_url=$_GET['mp3_url'];
?>
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"  id="Andomy" align="middle">
    <param name="movie" value="player.swf?file=<?=$mp3_url?>" />
    <param name="quality" value="high" />
    <param name="bgcolor" value="#ffffff" />
    <param name="play" value="true" />
    <param name="loop" value="true" />
    <param name="wmode" value="transparent" />
    <param name="scale" value="showall" />
    <param name="menu" value="true" />
    <param name="devicefont" value="false" />
    <param name="salign" value="" />
    <param name="allowScriptAccess" value="sameDomain" />
    <!--[if !IE]>-->
    <object type="application/x-shockwave-flash" data="player.swf?file=<?=$mp3_url?>">
        <param name="movie" value="player.swf?file=<?=$mp3_url?>" />
        <param name="quality" value="high" />
        <param name="bgcolor" value="#ffffff" />
        <param name="play" value="true" />
        <param name="loop" value="true" />
        <param name="wmode" value="transparent" />
        <param name="scale" value="showall" />
        <param name="menu" value="true" />
        <param name="devicefont" value="false" />
        <param name="salign" value="" />
        <param name="allowScriptAccess" value="sameDomain" />
        <!--<![endif]-->
        <a href="http://www.adobe.com/go/getflash">
            <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />
        </a>
        <!--[if !IE]>-->
    </object>
    <!--<![endif]-->
</object>