Template.end.events={
	'click #end-btn': function(event, template){
		event.preventDefault();
		var submitDate = new Date();
		var comments = document.getElementById("comment").value;
		FinishedWorkers.insert({workerId: worker_Id, assignmentId: assignment_Id, hitId: hit_Id, comment: comments, submitTime: submitDate.toString()});
		var str= "https://www.mturk.com/mturk/externalSubmit?assignmentId="+assignment_Id.toString()+"&Finished=Submit";
		Meteor.setTimeout(function(){window.location.href = str;},1000);
	}
};
