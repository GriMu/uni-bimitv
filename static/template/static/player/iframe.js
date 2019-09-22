MacPlayer.Html = '<iframe src="http://47.94.243.190:8081'+MacPlayer.PlayUrl+'" name="video" width="100%" height="'+(MacPlayer.Height-5)+'" frameborder="0" allowfullscreen="true"></iframe>';
MacPlayer.Show();
function playerstop(){
window.parent.frames.MacPlayer.GoNextUrl();
return false;
};
