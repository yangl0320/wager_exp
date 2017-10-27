Meteor.subscribe('workers');
//Meteor.subscribe('realTasks');
//Meteor.subscribe('wageringPM');

function pressedSubmit(event, instance, val) {
	var form = document.getElementById('simulateForm');
    var val = form.checkValidity();
	if (!val) {
		instance.worker_forecast.set("NOT submitted");
		document.getElementById('resultArea').style.visibility = "hidden";
		return false;
	}

	var f1 = parseFloat(document.getElementById('sim-pred').value).toFixed(2);
	var w1 = parseFloat(document.getElementById('sim-wager').value).toFixed(2);
	var f2 = parseFloat(document.getElementById('bot1-pred').value).toFixed(2);
	var w2 = parseFloat(document.getElementById('bot1-wager').value).toFixed(2);
	var f3 = parseFloat(document.getElementById('bot2-pred').value).toFixed(2);
	var w3 = parseFloat(document.getElementById('bot2-wager').value).toFixed(2);

	instance.worker_forecast.set(f1);
	instance.worker_bet.set(w1);

	var res = WageringPM.findOne({"worker_forecast": f1, "worker_wager": w1,
		"bot1_forecast": f2, "bot1_wager": w2,
		"bot2_forecast": f3, "bot2_wager": w3});

	var loadingWarning = document.getElementById("loadingDB");
	if (!res) {
		var waitSec = 0
		loadingWarning.style.visibility = "visible"
		if (instance.loadingStatus.get()==0) {
			instance.loadingStatus.set(1)
			var timer = Meteor.setInterval(function() {
				waitSec = waitSec + 1;
				instance.loadingTimer.set(waitSec);
				res = WageringPM.findOne({"worker_forecast": "1.00", "worker_wager": "3.00",
					"bot1_forecast": "1.00", "bot1_wager": "3.00",
					"bot2_forecast": "1.00", "bot2_wager": "3.00"});
				instance.loadingTimer.set(String(wagerHandle.ready())+waitSec.toString());
				//if (wagerHandle.ready()) {
				//instance.loadingTimer.set(wagerHandle.ready());
				if (res!=null) {
					var loadingWarning = document.getElementById("loadingDB");
					instance.loadingTimer.set(wagerHandle.ready());
					//loadingWarning.innerHTML = 'Loading data finished! Reclick "Try".';
					instance.loadingStatus.set(2)
					clearInterval(timer);
				}
			}, 1000)
		}
		if (instance.loadingStatus.get()==2) {
			loadingWarning.innerHTML = "Loading data again!!!!!";
		}
	} else {


		var b1 = [parseFloat(res.worker_bets[0]), parseFloat(res.worker_bets[1])];
		var b2 = [parseFloat(res.bot1_bets[0]), parseFloat(res.bot1_bets[1])];
		var b3 = [parseFloat(res.bot2_bets[0]), parseFloat(res.bot2_bets[1])];
		var p1 = parseFloat(res.worker_netpay0);
		var p2 = parseFloat(res.worker_netpay1);
		instance.posBet.set(Math.abs(b1[0]).toFixed(2));
		instance.negBet.set(Math.abs(b1[1]).toFixed(2));
		instance.bot1posBet.set(Math.abs(b2[0]).toFixed(2));
		instance.bot1negBet.set(Math.abs(b2[1]).toFixed(2));
		instance.bot2posBet.set(Math.abs(b3[0]).toFixed(2));
		instance.bot2negBet.set(Math.abs(b3[1]).toFixed(2));
		instance.pay1.set(p1.toFixed(2));
		instance.pay2.set(p2.toFixed(2));

		document.getElementById('resultArea').style.visibility = "visible";

		instance.tryTime.set(instance.tryTime.get()+1);

		if (instance.tryTime.get()>=2) {
			//var realTaskBtn = document.getElementById("enter-forecast-btn-util");
			//realTaskBtn.setAttribute('id', 'enter-real-task-btn');
			//var submitArea = document.getElementById("submitArea");
			//submitArea.appendChild(realTaskBtn);
			document.getElementById("enterRealTask").style.visibility = "visible";
		}
	}
}

function pressedAnswer() {
	var btns = document.getElementById('answerArea');
  while(btns.lastChild) {
    btns.removeChild(btns.lastChild);
  }

	var worker = Workers.findOne({"workerId": worker_Id});

	var rn = worker.trainingImageRounds.length + 1;
  if(rn <= 2) {
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

function updateTable() {
	var table = document.getElementById("history-table");
	while(table.rows.length > 1) {
		table.deleteRow(-1);
	}

	var tr = Workers.findOne({"workerId": worker_Id}).trainingImageRounds;
  var roundNum = 1;
  tr.forEach(function(round) {
    var otherClaims = [1, 0];
    var row = table.insertRow(-1);

    var cellRound = row.insertCell(0);
    var cellYourClaim = row.insertCell(1);
    var cellOtherClaims = row.insertCell(2);
    var cellBonus = row.insertCell(3);
    var cellAltBonus = row.insertCell(4);
    var cellErrorRate = row.insertCell(5);

    cellRound.innerHTML = roundNum;

    if(round.claim) {
      cellYourClaim.innerHTML = 'Yes';
    } else {
      cellYourClaim.innerHTML = 'No';
    }

    cellOtherClaims.innerHTML = 'Yes' + ', ' + 'No';
    cellBonus.innerHTML = "$" + round.bonus;
    cellAltBonus.innerHTML = "$" + round.altBonus;
    cellErrorRate.innerHTML = round.errorRate;

    roundNum += 1;
	});
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

	var btns = document.getElementById('answerArea');
	var wrapper = document.createElement('H4');
  var paymentText = document.createTextNode('Your bonus payment would have been: $' + payment);
  var altPaymentText = document.createTextNode('Had you chosen to report ' + '\"' + altChoice + '\"' +
                                                ' instead, your bonus payment would have been: $' + altPayment);
  wrapper.appendChild(paymentText);
  wrapper.appendChild(document.createElement('br'));
  wrapper.appendChild(document.createElement('br'));
  wrapper.appendChild(altPaymentText);
  btns.appendChild(wrapper);

	var worker = Workers.findOne({"workerId": worker_Id});

	var tasks = RealTasks.find();
	var task = tasks.fetch()[Template.instance().taskNum.get()];

	var newTr = worker.trainingImageRounds.slice();
	var newRound = {"pairNum": task.pairNum, "claim": answer, "bonus": payment,
									"altBonus": altPayment, "errorRate": errorRate};

	newTr.push(newRound);
	Workers.update({_id: worker._id}, {$set: {"trainingImageRounds": newTr}});
}

Template.training_image_game.created=function(){
	this.loadingTimer = new ReactiveVar(0);
	var tasks = RealTasks.find();
	this.taskNum = new ReactiveVar(Math.floor(Math.random()*tasks.count()));
	this.roundNum = new ReactiveVar(1);
	this.worker_forecast = new ReactiveVar("UNKOWN");
	this.worker_bet = new ReactiveVar("UNKOWN");
	this.posPred = new ReactiveVar(0.5);
	this.negPred = new ReactiveVar(0.5);
	this.posBet = new ReactiveVar(0);
	this.negBet = new ReactiveVar(0);
	this.bot1posBet = new ReactiveVar(0);
	this.bot1negBet = new ReactiveVar(0);
	this.bot2posBet = new ReactiveVar(0);
	this.bot2negBet = new ReactiveVar(0);
	this.pay1 = new ReactiveVar(0);
	this.pay2 = new ReactiveVar(0);
	this.tryTime = new ReactiveVar(0);
	this.loadingStatus = new ReactiveVar(0);
};

Template.training_image_game.helpers({
	posPred: function() {
		return Template.instance().posPred.get()
	},
	negPred: function() {
		return Template.instance().negPred.get()
	},
	posBet: function() {
		return Template.instance().posBet.get()
	},
	negBet: function() {
		return Template.instance().negBet.get()
	},
	bot1posBet: function() {
		return Template.instance().bot1posBet.get()
	},
	bot1negBet: function() {
		return Template.instance().bot1negBet.get()
	},
	bot2posBet: function() {
		return Template.instance().bot2posBet.get()
	},
	bot2negBet: function() {
		return Template.instance().bot2negBet.get()
	},
	pay1: function() {
		return Template.instance().pay1.get()
	},
	pay2: function() {
		return Template.instance().pay2.get()
	},
	roundNum: function(){
		return Template.instance().roundNum.get();
	},
	worker_forecast: function() {
		return Template.instance().worker_forecast.get();
	},
	worker_bet: function() {
		return Template.instance().worker_bet.get();
	},
	loadingTimer: function() {
		return Template.instance().loadingTimer.get();
	},
	taskImageLeft: function(){
		var tasks = RealTasks.find();
		var task = tasks.fetch()[Template.instance().taskNum.get()];

		return '/images/pairs/'+task.pairNum+'/a.jpg';
	},
	taskImageRight: function(){
		var tasks = RealTasks.find();
		var task = tasks.fetch()[Template.instance().taskNum.get()];

		return '/images/pairs/'+task.pairNum+'/b.jpg';
	}
});

Template.training_image_game.rendered=function(){
	$('html,body').scrollTop(0);
	startTime = new Date();
};

Template.training_image_game.events={
	'input #ansBar1': function(event, instance){
		var ansBar1 = document.getElementById('ansBar1');
		var ansBar2 = document.getElementById('ansBar2');
		var simPred = document.getElementById('sim-pred');
		ansBar2.value = 1 - ansBar1.value;
		simPred.value = ansBar1.value
		instance.posPred.set(ansBar1.value);
		instance.negPred.set(ansBar2.value);
	},
	'input #ansBar2': function(event, instance){
		var ansBar1 = document.getElementById('ansBar1');
		var ansBar2 = document.getElementById('ansBar2');
		var simPred = document.getElementById('sim-pred');
		ansBar1.value = 1 - ansBar2.value;
		simPred.value = ansBar1.value
		instance.posPred.set(ansBar1.value);
		instance.negPred.set(ansBar2.value);
	},
	'input #sim-pred': function(event, instance){
		var ansBar1 = document.getElementById('ansBar1');
		var ansBar2 = document.getElementById('ansBar2');
		var simPred = document.getElementById('sim-pred');
		ansBar1.value = simPred.value;
		ansBar2.value = 1 - simPred.value
		instance.posPred.set(ansBar1.value);
		instance.negPred.set(ansBar2.value);
	},
	'click #submit': function(event, instance){
		pressedSubmit(event, instance);
		//addAnswer(1);
	},
	'click #welcome-btn': function(event, instance){
		event.preventDefault();

		instance.roundNum.set(instance.roundNum.get()+1);
		$('html,body').scrollTop(0);
		var tasks = RealTasks.find();
		instance.taskNum.set(Math.floor(Math.random()*tasks.count()));
		pressedNext();
		updateTable();
	},
	'click #enter-forecast-btn-util': function(event, instance){
    	event.preventDefault();
    	Router.go('training_to_real');
    },
	'click #next-btn': function(event, instance){
    	event.preventDefault();
    	Router.go('training_to_real');
  	}
};

//instance.posBet.set(b1pos)


	/*
	var table = document.getElementById("wager1-table");
	while(table.rows.length > 1) {
		table.deleteRow(-1);
	}

    res1.forEach(function(res) {
    var row = table.insertRow(-1);

    var bot1_forecast = row.insertCell(0);
    var bot1_wager = row.insertCell(1);
    var bot2_forecast = row.insertCell(2);
    var bot2_wager= row.insertCell(3);
    var netpayoff0 = row.insertCell(4);
    var netpayoff1 = row.insertCell(5);

    bot1_forecast.innerHTML = res.bot1_forecast
    bot1_wager.innerHTML = res.bot1_wager
    bot2_forecast.innerHTML = res.bot2_forecast
    bot2_wager.innerHTML = res.bot2_wager
    netpayoff0.innerHTML = res.worker_netpay0.toFixed(2)
    netpayoff1.innerHTML = res.worker_netpay1.toFixed(2)

	});


	res2 = WageringPM.find({"worker_forecast": forecast, "worker_wager": 2});
	var table = document.getElementById("wager2-table");
	while(table.rows.length > 1) {
		table.deleteRow(-1);
	}

    res2.forEach(function(res) {
    var row = table.insertRow(-1);

    var bot1_forecast = row.insertCell(0);
    var bot1_wager = row.insertCell(1);
    var bot2_forecast = row.insertCell(2);
    var bot2_wager= row.insertCell(3);
    var netpayoff0 = row.insertCell(4);
    var netpayoff1 = row.insertCell(5);

    bot1_forecast.innerHTML = res.bot1_forecast
    bot1_wager.innerHTML = res.bot1_wager
    bot2_forecast.innerHTML = res.bot2_forecast
    bot2_wager.innerHTML = res.bot2_wager
    netpayoff0.innerHTML = res.worker_netpay0.toFixed(2)
    netpayoff1.innerHTML = res.worker_netpay1.toFixed(2)

	});
	*/
