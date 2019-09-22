var uid = MacPlayer.PlayUrl;
if(uid.indexOf('.mp4') > -1){
	//url
	MacPlayer.Html = '<iframe width="100%" height="100%" src="/static/danmu/dm.php?'+uid+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="true"></iframe>';
	MacPlayer.Show();
}
else{
	//id
	MacPlayer.Html = '<iframe width="100%" height="100%" src="http://v.nmbaojie.com/mingri/mingri.php?url='+uid+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>';
	MacPlayer.Show();
}
