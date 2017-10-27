Template.welcome.helpers({
	bonus: function(){
		switch (bonusLevel)
		{
			case "1":
				str = "$0.02";
				break;
			case "2":
				str = "$0.05";
				break;
			case "3":
				str = "$0.10";
				break;
			case "4":
				str = "$0.15";
				break;
			case "5":
				str = "$0.20";
				break;
			case "6":
				str = "$0.30";
				break;
			case "7":
				str = "$0.50";
				break;
		}
		return str;
	},
});

Template.welcome.rendered = function(){
	if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE")
	{
		document.getElementById("welcome-btn").innerHTML = "Accept HIT first!";
	}
	document.getElementById("content").style.fontFamily = "Optima, Segoe, Candara, Calibri, Arial, sans-serif";
	$("p").css({
       fontSize: "110%"
    });
};


Template.welcome.events={
	'click #welcome-btn': function(event, template){
		event.preventDefault();
		if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE")
		{
			Router.go('/');
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
				var today = new Date();
				Workers.insert({workerId: worker_Id,
												assignmentId: assignment_Id,
												hitId: hit_Id,
												group: urls,
												time: today.toString(),
												trainingCandyRounds: [],
												trainingImageRounds: [],
												dataCandyRound: [],
												dataImageRound: []});
				if (bonusLevel == '0')
				{
					Router.go('/game');
				}
				else
				{
					Router.go('/bonus');
				}
			}
		}
	}
};
