Meteor.publish('wageringPM', function(){
  return WageringPM.find({});
});

Meteor.publish('allFinishedWorkers',function(){
	return FinishedWorkers.find({},{fields:{assignmentId:false, hitId:false, submitTime:false, group: false, leftMoney: false, totalBonus: false}});
});

Meteor.publish('workers',function(){
	return Workers.find({}, {fields:{
									assignmentId: false,
									hitId: false,
									group: false,
									time: false,
								}});
});

Meteor.publish('realTasks', function(){
	return RealTasks.find({});
});

Meteor.publish('answers', function(){
  return Answers.find({});
});
