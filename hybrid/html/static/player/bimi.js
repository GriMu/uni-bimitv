var uid = MacPlayer.PlayUrl;
if(uid.indexOf('rfg693') > -1){
	//url
	MacPlayer.Html = '<iframe width="100%" height="100%" src="https://play.2xuexi.top/static/danmu/dm.php?'+uid+'&download=1" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="true" allowtransparency="true"></iframe>';
	MacPlayer.Show();
}
else if(uid.indexOf('.m3u8') > -1){
	//url
	MacPlayer.Html = '<iframe width="100%" height="100%" src="https://play.2xuexi.top/static/danmu/m3u8.php?'+uid+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="true"></iframe>';
	MacPlayer.Show();
}
else{
	//id
	MacPlayer.Html = '<iframe width="100%" height="100%" src="https://play.2xuexi.top/static/danmu/dm.php?'+uid+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="true" allowtransparency="true"></iframe>';
	MacPlayer.Show();
}
