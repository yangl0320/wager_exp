Template.transit.rendered=function(){
	if (gameId <= 10)
	{
		//var str = "/game/"+gameId;
		//Router.go(str);
		Router.go('game',{_id: gameId});
	}
	else
	{
		Router.go("/end");
	}
	/*if ((urls == 'moreinfo1') || (urls == 'moreinfo1N') || (urls == 'moreinfo1R'))
	{
		Meteor.setTimeout(function(){Meteor.Router.to('taskMoreInfo1')},1000);
	}
	else if ((urls == 'moreinfo2') || (urls == 'moreinfo2N') || (urls == 'moreinfo2R'))
	{
		Meteor.setTimeout(function(){Meteor.Router.to('taskMoreInfo2')},1000);
	}
	else if ((urls == 'countinfo') || (urls == 'countinfoN') || (urls == 'countinfoR'))
	{
		Meteor.setTimeout(function(){Meteor.Router.to('taskCountInfo')},1000);
	}
	else if ((urls == 'distinfo') || (urls == 'distinfoN') || (urls == 'distinfoR'))
	{
		Meteor.setTimeout(function(){Meteor.Router.to('taskDistInfo')},1000);
	}
	else if ((urls == 'lessinfo') || (urls == 'lessinfoN') || (urls == 'lessinfoR'))
	{
		Meteor.setTimeout(function(){Meteor.Router.to('taskLessInfo')},1000);
	}
	else if ((urls == 'avginfo') || (urls == 'avginfoN') || (urls == 'avginfoR'))
	{
		Meteor.setTimeout(function(){Meteor.Router.to('taskAvgInfo')},1000);
	}
	else
	{
		Meteor.setTimeout(function(){Meteor.Router.to('task')},1000);
	}*/	
}