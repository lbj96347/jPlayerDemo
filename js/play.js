/*
 *
 * jplayer 模块
 *
 * author: CashLee
 *
 * Date : 2013/01/23
 *
 * version: 1.0
 *
 * Feature : 单曲播放
 *
 */


/*
 *
 * 文件引用方法
 *
 * 引用swf文件，如果不执行这句代码，直接放到目录js/Jplayer.swf $("#jplayer-swf").jPlayer( { swfPath: "js/Jplayer.swf" });
 *
 * 在html文件的head中引用库文件
 *
 * jquery.js , jquery.jplayer.min.js , [yourself js].js（本文件为例子）
 *
 */ 


/*
 *
 * Config Modules
 * 
 * player controller config , player-button config
 *
 * 填入播放按钮的 id ，填入swf文件引入元素的 id
 *
 *  example : 
 *
 *  <button id='play-button'>播放</button> <div id='jplayer-swf'></div>
 *
 *  jplayerSwf = 'jplayer-swf' , playButton = 'play-button' 
 *
 */


var mp3_url = "http://diange-fm-sound.qiniudn.com/6_1358786292.000063.mp3";
var mySound = new buzz.sound( mp3_url );
function playMySound(){
  mySound.sound.play();
}
function pauseMySound(){
  mySound.sound.pause();
}


var playStatus = false;

/*
 * Executive Module 
 */

var nowID;
var pastID;

var player = function ( obj ){

  var playerButton = obj.id;
  var jplayerSwf = "jplayer-swf";
  var playurl = obj.getAttribute('data-src');


  $("#status").html( playurl );

  nowID = playerButton;

  $(".play-button").css("color","black");


  /* 如果是不同的就要destroy ，如果是相同的就暂停 */
  if( nowID == undefined || pastID != nowID ){

    $("#"+ jplayerSwf).jPlayer("destroy");
    $("#"+ jplayerSwf ).jPlayer({
      nativeSupport: true, oggSupport: true, customCssIds: false , 
      cssSelector: {
        play: '.play-status',
        pause: '.pause-status'
      }, 
      ready: function() { 
        //console.log("是否有执行");
        $(this).jPlayer("setMedia", { 
          mp3 : playurl 
        }).jPlayer("play"); 
        pastID = playerButton;
        playStatus = true;
        /*
         * 添加改变指定元素的样式代码
         */
        $("#" + playerButton ).css("color","green");
      },
      ended: function() { $(this).jPlayer("play"); },
      solution: "flash,html",
      supplied: "mp3",
      swfPath : "flash/Jplayer.swf"
    });


  }else{
    if( playStatus == true ){
      $("#"+ jplayerSwf).jPlayer("pause");
      playStatus = false;
      /*
       * 添加改变指定元素的样式代码
       */
      $("#" + playerButton ).css("color","red");
    }
    else{
      $("#"+ jplayerSwf).jPlayer("play");
      playStatus = true;
      /*
       * 添加改变指定元素的样式代码
       */
      $("#" + playerButton ).css("color","green");
    }
  }

}
