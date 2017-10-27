Template.mechanism.rendered = function(){
	$('html,body').scrollTop(0);
	if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE")
	{
		document.getElementById("welcome-btn").innerHTML = "Accept HIT first!";
	}
	if (bonusLevel == '0')
	{
		document.getElementById("bonusPara").style.display = "none";
	}
	else
	{
		document.getElementById("bonusPara").style.display = "block";
	}
};


Template.mechanism.events={
	'input #predBar': function(event, instance){
		var predBar = document.getElementById('predBar');
		var predBox = document.getElementById('predBox');
		predBox = predBar.value;
	},
	'input #predBox': function(event, instance){
		var predBar = document.getElementById('predBar');
		var predBox = document.getElementById('predBox');
		predBar = predBox.value;
	},
	'click #welcome-btn': function(event, template){
		event.preventDefault();
		if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE")
		{
			Router.go('/game');
		}
		else
		{
			var existedWorker = FinishedWorkers.find({"workerId": worker_Id});
			if (existedWorker.count()>0)
			{
				Router.go('/error');
			}
			else
			{
				//Router.go('/training_candy_game');
				Router.go('/mechanism'); 
			}
		}
	}
};
