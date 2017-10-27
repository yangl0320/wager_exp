Meteor.subscribe('workers');
//Meteor.subscribe('realTasks');
Meteor.subscribe('answers');

function pressedSubmit(event, instance, val) {
	var form = document.getElementById('taskForm');
    var val = form.checkValidity();
	if (!val) {
		return false;
	}

	var setNum = instance.setNum.get(); var setSize = 5; 
	var task_ID = -1; var f = -1; var c = -1; var s = -1;

	var i = 0;
	for (i = 1; i <=setSize; i++) { 
		s = i.toString();
		f = parseFloat(document.getElementById('pred'+s).value).toFixed(5);
		c = parseFloat(document.getElementById('conf'+s).value).toFixed(5);
		task_ID = (setNum - 1) * setSize + i;
		//instance.pred5neg.set(task_ID);
		Answers.insert({"workerID": worker_Id, "taskID": task_ID, "forecast": f, "confidence": c});
    }	

    //Fetch next five forecast questions
    if (setNum <= 2) {
    	instance.setNum.set(instance.setNum.get()+1);
    	var index = -1;
    	for (i = 1; i <=setSize; i++) { 
    		index = (setNum * setSize + i).toString();
    		document.getElementById('q'+i.toString()+'head').innerHTML = 'Question ' + index + '.';
    		document.getElementById('q'+i.toString()+'image').src = '/image/' + index +'.png';
    		//instance.pred5neg.set(document.getElementById('q'+i.toString()+'image').src);
    		form.reset();
    		instance.pred1pos.set(0.5); instance.pred1neg.set(0.5);
    		instance.pred2pos.set(0.5); instance.pred2neg.set(0.5);
    		instance.pred3pos.set(0.5); instance.pred3neg.set(0.5);
    		instance.pred4pos.set(0.5); instance.pred4neg.set(0.5);
    		instance.pred5pos.set(0.5); instance.pred5neg.set(0.5);
    		document.body.scrollTop = document.documentElement.scrollTop = 0;
    	}
    } else {
    	Router.go('end');
    }
}

function pressedAnswer() {
	var btns = document.getElementById('answerArea');
  while(btns.lastChild) {
    btns.removeChild(btns.lastChild);
  }

  if(Template.instance().roundNum.get() <= 1) {
    document.getElementById('welcome-btn').style.visibility = "visible";
  } else {
    document.getElementById('next-btn').style.visibility = "visible";
  }
}

function pressedNext() {
	var btns = document.getElementById('answerArea');
	while(btns.lastChild) {
    btns.removeChild(btns.lastChild);
  }

	var answerAreaLeft = document.createElement('div');
	answerAreaLeft.setAttribute('id', 'answerAreaLeft');
	var yesBtn = document.createElement('button');
	yesBtn.setAttribute('type', 'button');
	yesBtn.setAttribute('class', 'btn');
	yesBtn.setAttribute('id', 'submit-yes');
	yesBtn.innerHTML = 'Yes';
	answerAreaLeft.appendChild(yesBtn);

	var answerAreaRight = document.createElement('div');
	answerAreaRight.setAttribute('id', 'answerAreaRight');
	var noBtn = document.createElement('button');
	noBtn.setAttribute('type', 'button');
	noBtn.setAttribute('class', 'btn');
	noBtn.setAttribute('id', 'submit-no');
	noBtn.innerHTML = 'No';
	answerAreaRight.appendChild(noBtn);

	btns.appendChild(answerAreaLeft);
	btns.appendChild(answerAreaRight);

	document.getElementById('welcome-btn').style.visibility = "hidden";
}

function addAnswer(answer){
	var payment, altChoice, altPayment, errorRate;
	if(answer) {
		//yes
		payment = 0.5;
		altChoice = 'No';
		altPayment = 0.25;
		errorRate = 0.2;
	} else {
		payment = 0.25;
		altChoice = 'Yes';
		altPayment = 0.5;
		errorRate = 0.2;
	}

	var worker = Workers.findOne({"workerId": worker_Id});

	var tasks = RealTasks.find();
	var task = tasks.fetch()[Template.instance().taskNum.get()];

	var newTr = worker.dataImageRound.slice();
	var newRound = {"imageType": task.image, "imageClaim": answer, "bonus": payment,
									"altBonus": altPayment, "errorRate": errorRate};

	newTr.push(newRound);
	Workers.update({_id: worker._id}, {$set: {"dataImageRound": newTr}});
}

Template.real_image_game.created=function(){
	var tasks = RealTasks.find();
	this.taskNum = new ReactiveVar(Math.floor(Math.random()*tasks.count()));
	this.roundNum = new ReactiveVar(1);
	this.setNum = new ReactiveVar(1);
	this.pred1pos = new ReactiveVar(0.5);
	this.pred1neg = new ReactiveVar(0.5);
	this.pred2pos = new ReactiveVar(0.5);
	this.pred2neg = new ReactiveVar(0.5);
	this.pred3pos = new ReactiveVar(0.5);
	this.pred3neg = new ReactiveVar(0.5);
	this.pred4pos = new ReactiveVar(0.5);
	this.pred4neg = new ReactiveVar(0.5);
	this.pred5pos = new ReactiveVar(0.5);
	this.pred5neg = new ReactiveVar(0.5);
};

Template.real_image_game.helpers({
	setNum: function(){
		return Template.instance().setNum.get();
	},
	pred1pos: function(){
		return Template.instance().pred1pos.get();
	},
	pred1neg: function(){
		return Template.instance().pred1neg.get();
	},
	pred2pos: function(){
		return Template.instance().pred2pos.get();
	},
	pred2neg: function(){
		return Template.instance().pred2neg.get();
	},
	pred3pos: function(){
		return Template.instance().pred3pos.get();
	},
	pred3neg: function(){
		return Template.instance().pred3neg.get();
	},
	pred4pos: function(){
		return Template.instance().pred4pos.get();
	},
	pred4neg: function(){
		return Template.instance().pred4neg.get();
	},
	pred5pos: function(){
		return Template.instance().pred5pos.get();
	},
	pred5neg: function(){
		return Template.instance().pred5neg.get();
	},
	roundNum: function(){
		return Template.instance().roundNum.get();
	},

	taskImage: function(){
		var tasks = RealTasks.find();
		var task = tasks.fetch()[Template.instance().taskNum.get()];

		return '/images/training_images/'+task.image;
	},

	taskQuestion: function(){
		var tasks = RealTasks.find();
		var task = tasks.fetch()[Template.instance().taskNum.get()];

		return task.question;
	}
});

Template.real_image_game.rendered=function(){
	$('html,body').scrollTop(0);
	startTime = new Date();
};

Template.real_image_game.events={
	'click #submit': function(event, instance){
		pressedSubmit(event, instance);
	},
	'input #bar1pos': function(event, instance){
		var bar1pos = document.getElementById('bar1pos');
		var bar1neg = document.getElementById('bar1neg');
		var pred1 = document.getElementById('pred1');
		bar1neg.value = 1 - bar1pos.value;
		pred1.value = bar1pos.value
		instance.pred1pos.set(bar1pos.value);
		instance.pred1neg.set(bar1neg.value);
	},
	'input #bar1neg': function(event, instance){
		var bar1pos = document.getElementById('bar1pos');
		var bar1neg = document.getElementById('bar1neg');
		var pred1 = document.getElementById('pred1');
		bar1pos.value = 1 - bar1neg.value;
		pred1.value = bar1pos.value
		instance.pred1pos.set(bar1pos.value);
		instance.pred1neg.set(bar1neg.value);
	},
	'input #pred1': function(event, instance){
		var bar1pos = document.getElementById('bar1pos');
		var bar1neg = document.getElementById('bar1neg');
		var pred1 = document.getElementById('pred1');
		bar1pos.value = pred1.value;
		bar1neg.value = 1 - pred1.value;
		instance.pred1pos.set(bar1pos.value);
		instance.pred1neg.set(bar1neg.value);
	},
	'input #bar2pos': function(event, instance){
		var bar2pos = document.getElementById('bar2pos');
		var bar2neg = document.getElementById('bar2neg');
		var pred2 = document.getElementById('pred2');
		bar2neg.value = 1 - bar2pos.value;
		pred2.value = bar2pos.value
		instance.pred2pos.set(bar2pos.value);
		instance.pred2neg.set(bar2neg.value);
	},
	'input #bar2neg': function(event, instance){
		var bar2pos = document.getElementById('bar2pos');
		var bar2neg = document.getElementById('bar2neg');
		var pred2 = document.getElementById('pred2');
		bar2pos.value = 1 - bar2neg.value;
		pred2.value = bar2pos.value
		instance.pred2pos.set(bar2pos.value);
		instance.pred2neg.set(bar2neg.value);
	},
	'input #pred2': function(event, instance){
		var bar2pos = document.getElementById('bar2pos');
		var bar2neg = document.getElementById('bar2neg');
		var pred2 = document.getElementById('pred2');
		bar2pos.value = pred2.value;
		bar2neg.value = 1 - pred2.value;
		instance.pred2pos.set(bar2pos.value);
		instance.pred2neg.set(bar2neg.value);
	},
	'input #bar3pos': function(event, instance){
		var bar3pos = document.getElementById('bar3pos');
		var bar3neg = document.getElementById('bar3neg');
		var pred3 = document.getElementById('pred3');
		bar3neg.value = 1 - bar3pos.value;
		pred3.value = bar3pos.value
		instance.pred3pos.set(bar3pos.value);
		instance.pred3neg.set(bar3neg.value);
	},
	'input #bar3neg': function(event, instance){
		var bar3pos = document.getElementById('bar3pos');
		var bar3neg = document.getElementById('bar3neg');
		var pred3 = document.getElementById('pred3');
		bar3pos.value = 1 - bar3neg.value;
		pred3.value = bar3pos.value
		instance.pred3pos.set(bar3pos.value);
		instance.pred3neg.set(bar3neg.value);
	},
	'input #pred3': function(event, instance){
		var bar3pos = document.getElementById('bar3pos');
		var bar3neg = document.getElementById('bar3neg');
		var pred3 = document.getElementById('pred3');
		bar3pos.value = pred3.value;
		bar3neg.value = 1 - pred3.value;
		instance.pred3pos.set(bar3pos.value);
		instance.pred3neg.set(bar3neg.value);
	},
	'input #bar4pos': function(event, instance){
		var bar4pos = document.getElementById('bar4pos');
		var bar4neg = document.getElementById('bar4neg');
		var pred4 = document.getElementById('pred4');
		bar4neg.value = 1 - bar4pos.value;
		pred4.value = bar4pos.value
		instance.pred4pos.set(bar4pos.value);
		instance.pred4neg.set(bar4neg.value);
	},
	'input #bar4neg': function(event, instance){
		var bar4pos = document.getElementById('bar4pos');
		var bar4neg = document.getElementById('bar4neg');
		var pred4 = document.getElementById('pred4');
		bar4pos.value = 1 - bar4neg.value;
		pred4.value = bar4pos.value
		instance.pred4pos.set(bar4pos.value);
		instance.pred4neg.set(bar4neg.value);
	},
	'input #pred4': function(event, instance){
		var bar4pos = document.getElementById('bar4pos');
		var bar4neg = document.getElementById('bar4neg');
		var pred4 = document.getElementById('pred4');
		bar4pos.value = pred4.value;
		bar4neg.value = 1 - pred4.value;
		instance.pred4pos.set(bar4pos.value);
		instance.pred4neg.set(bar4neg.value);
	},
	'input #bar5pos': function(event, instance){
		var bar5pos = document.getElementById('bar5pos');
		var bar5neg = document.getElementById('bar5neg');
		var pred5 = document.getElementById('pred5');
		bar5neg.value = 1 - bar5pos.value;
		pred5.value = bar5pos.value
		instance.pred5pos.set(bar5pos.value);
		instance.pred5neg.set(bar5neg.value);
	},
	'input #bar5neg': function(event, instance){
		var bar5pos = document.getElementById('bar5pos');
		var bar5neg = document.getElementById('bar5neg');
		var pred5 = document.getElementById('pred5');
		bar5pos.value = 1 - bar5neg.value;
		pred5.value = bar5pos.value
		instance.pred5pos.set(bar5pos.value);
		instance.pred5neg.set(bar5neg.value);
	},
	'input #pred5': function(event, instance){
		var bar5pos = document.getElementById('bar5pos');
		var bar5neg = document.getElementById('bar5neg');
		var pred5 = document.getElementById('pred5');
		bar5pos.value = pred5.value;
		bar5neg.value = 1 - pred5.value;
		instance.pred5pos.set(bar5pos.value);
		instance.pred5neg.set(bar5neg.value);
	},
	'click #submit-yes': function(event, template){
		pressedAnswer();
		addAnswer(1);
	},
	'click #submit-no': function(event, template){
		pressedAnswer();
		addAnswer(0);
	},
	'click #welcome-btn': function(event, template){
		event.preventDefault();

		template.roundNum.set(template.roundNum.get()+1);
		$('html,body').scrollTop(0);
		var tasks = RealTasks.find();
		template.taskNum.set(Math.floor(Math.random()*tasks.count()));
		pressedNext();
	},
	'click #next-btn': function(event, template){
    event.preventDefault();
    Router.go('end');
  }
};
