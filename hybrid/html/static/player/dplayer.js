var uid = MacPlayer.PlayUrl;
if(uid.indexOf('.html') > -1){
	//url
	MacPlayer.Html = '<iframe width="100%" height="100%" src="https://v.nmbaojie.com/mingri/mingri.php?url='+uid+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="true"></iframe>';
	MacPlayer.Show();
}
else if(uid.indexOf('.mp4') > -1){
	//id
	MacPlayer.Html = '<iframe width="100%" height="100%" src="https://play.2xuexi.top/static/danmu/dm.php?'+uid+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="true"></iframe>';
	MacPlayer.Show();
}
else if(uid.indexOf('.m3u8') > -1){
	//id
	MacPlayer.Html = '<iframe width="100%" height="100%" src="https://www.629055.com/m3u8.php?url='+uid+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="true"></iframe>';
	MacPlayer.Show();
}
else{
	//id
	MacPlayer.Html = '<iframe width="100%" height="100%" src="https://play.2xuexi.top/static/danmu/dm.php?'+uid+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="true"></iframe>';
	MacPlayer.Show();
}
