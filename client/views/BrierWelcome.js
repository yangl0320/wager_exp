Template.BrierWelcome.events={
	'click #nextBtn': function(event, template){
		event.preventDefault();
		if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE")
		{
			alert("To continue this HIT, please accept this HIT first!");
		}
		else
		{
			var existedWorker = FinishedWorkers.findOne({"workerId": worker_Id});
			if (existedWorker!=null)
			{
				Router.go('/error');
			}
			else
			{
				Router.go('/BrierConsent');
			}
		}
	}
};

Template.BrierWelcome.rendered = function(){
	if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE")
	{
		document.getElementById("nextBtn").innerHTML = "This is preview";
	}
	//document.getElementById("content").style.fontFamily = "Optima, Segoe, Candara, Calibri, Arial, sans-serif";
	$("p").css({
       fontSize: "110%"
    });
};

Template.BrierWelcome.created = function() {
    timeSeries.push(Date.now().toString()+' BrierWelcome');
    console.log(timeSeries);
};
