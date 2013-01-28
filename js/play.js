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

var mySound;// = new buzz.sound( mp3_url );
var mySoundStatus = false;
var mySoundNowID;
var mySoundPastID;
/*
  mySound.sound.play();
  mySound.sound.pause();
*/

var mySoundController = function (obj){
  var playButton = obj.id;
  var playurl = obj.getAttribute('data-src');

  $("#status").html( playurl );
  mySoundNowID = playButton;
  $(".buzz-button").css("color","black");//播放按钮样式

  if( mySoundNowID == undefined || mySoundPastID != mySoundNowID ){
    if( mySound != null ){
      mySound.stop();
    }
    mySound = new buzz.sound( playurl );
    mySound.sound.play();
    mySoundStatus = true;
    mySoundPastID = playButton;
    /* 改变播放按钮状态 */
    mySound.bind("ended pause", function(e) {
      var percent = buzz.toPercent( this.getTime(), this.getDuration() ),
          message = "Stopped or paused at " + percent + "%";
      console.log( message );
      /* 改变播放按钮状态 */
    });
    $("#" + playButton ).css("color","green");
  }
  else{
    if( mySoundStatus == true ){
      mySound.sound.pause();
      mySoundStatus = false;
      /* 改变播放按钮状态 */
      $("#" + playButton ).css("color","red");
    }
    else{
      mySound.sound.play();
      mySoundStatus = true;
      /* 改变播放按钮状态 */
      $("#" + playButton ).css("color","green");
    }
  }
  
}


/*
 * jPlayer 部分
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


var playStatus = false;

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

$(document).ready(function(){
  $(".buzz-button").live("click",function(){
    mySoundController(this);
  });
});
