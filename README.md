<h1>Jplayer Demo 1.0</h1>
<p>提供给新手的Demo，但是暂时未封装成面向对象以及存在不合理的Destroy。请高手别吐槽。因为刚使用jPlayer，所以不太熟悉。而且个人感觉jPlayer提供的是跨平台浏览器的解决方法，并依赖于jQuery，因此jPlayer的整体方案会变得非常大。个人建议使用Buzz.js</p>

<h1>Demo编辑日志</h1>
<ul>
  <li>2013/01/25：提交Buzz.js Demo并与jPlayer.js作为对比</li>
  <li>2013/01/24：提交jPlayer Demo</li>
</ul>

<h1>ISSUE 目前遇到的问题<h1>
<ul>
  <li>1，因为创建了Audio元素，因此在加载时产生阻塞可能导致浏览器假死</li>
  <li>2，依赖于jQuery，如果和jqMobi或者zepto.js使用时，会出现兼容问题（例如：无法播放）</li>
  <li>3，因为体积问题，个人不建议在移动端使用</li>
  <li>4，创建了Audio元素，涉及到DOM操作了。（不符合纯Javascript的应用，在处理问题上的逻辑，这里边理应分清楚）</li>
</ul>
