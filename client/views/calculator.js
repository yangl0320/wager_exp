//Meteor.subscribe('workers');
//Meteor.subscribe('realTasks');
//Meteor.subscribe('wageringPM');

function pressedSubmit(event, instance, val) {
    var form = document.getElementById('simulateForm');
    var val = form.checkValidity();
    if (!val) {
        return false;
    }


    var p1 = parseFloat(document.getElementById('pred1Bar').value);
    var w1 = parseInt(document.getElementById('bet1').value);
    var p2 = parseFloat(document.getElementById('pred2Bar').value);
    var w2 = parseInt(document.getElementById('bet2').value);
    var p3 = parseFloat(document.getElementById('pred3Bar').value);
    var w3 = parseInt(document.getElementById('bet3').value);

    instance.worker_forecast.set(p1);
    instance.worker_bet.set(w1);
    var echoPred = document.getElementById('echoPred');
    echoPred.innerHTML = "\
        &nbsp;&bull;&nbsp;&nbsp;Your prediction: " + p1.toFixed(1) + "; your point allocation: " + w1 + " points.<br>\
        &nbsp;&bull;&nbsp;&nbsp;Alice's prediction: " + p2.toFixed(1) + "; her point allocation: " + w2 + " points.<br>\
        &nbsp;&bull;&nbsp;&nbsp;Bob's prediction: " + p3.toFixed(1) + "; his point allocation: " + w3 + " points.<br>"


    var p_bar = (1 + ((2 * p2 - 1) * w2 + (2 * p3 - 1) * w3) / (w2 + w3)) / 2;
    var BScore = function(x, y) { return 1 - (y - x) * (y - x); };
    var coef = w1 * (w2 + w3) / (w1 + w2 + w3);
    var pay = [coef * (BScore(p1, 1) - BScore(p_bar, 1)), coef * (BScore(p1, 0) - BScore(p_bar, 0))]

    if (w2 == 0 && w3 == 0) {
        pay = [0, 0];
    }

    if (pay[0] < 0) {
        //instance.netpay1.set('<span color="blue"> lose ' + (-pay[0]).toFixed(2) + '</span>');
        document.getElementById('netGain1').innerHTML = '';
        document.getElementById('netLose1').innerHTML = 'lose ' + (-pay[0]).toFixed(2);
    } else {
        document.getElementById('netGain1').innerHTML = 'gain ' + pay[0].toFixed(2);
        document.getElementById('netLose1').innerHTML = '';
    }
    if (pay[1] < 0) {
        document.getElementById('netGain2').innerHTML = '';
        document.getElementById('netLose2').innerHTML = 'lose ' + (-pay[1]).toFixed(2);
    } else {
        document.getElementById('netGain2').innerHTML = 'gain ' + pay[1].toFixed(2);
        document.getElementById('netLose2').innerHTML = '';
    }


    instance.pay1.set((pay[0] + parseInt(w1)).toFixed(2));
    instance.pay2.set((pay[1] + parseInt(w1)).toFixed(2));

    document.getElementById('betStrategy').style.visibility = "visible";
}


Template.calculator.events = {
    'click #submit': function(event, instance) {
        pressedSubmit(event, instance);
        //addAnswer(1);
    },
    'click #welcome-btn': function(event, instance) {
        event.preventDefault();

        instance.roundNum.set(instance.roundNum.get() + 1);
        $('html,body').scrollTop(0);
        var tasks = RealTasks.find();
        instance.taskNum.set(Math.floor(Math.random() * tasks.count()));
        pressedNext();
        updateTable();
    },
    'click #enter-forecast-btn-util': function(event, instance) {
        event.preventDefault();
        Router.go('training_to_real');
    },
    'click #prevBtn': function(event, instance) {
        event.preventDefault();
        if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE") {
            Router.go('/game');
        } else {
            var existedWorker = FinishedWorkers.find({ "workerId": worker_Id });
            if (existedWorker.count() > 0) {
                Router.go('/error');
            } else {
                //Router.go('/training_candy_game');
                Router.go('/NAWMTutorial');
            }
        }
    },
    'click #nextBtn': function(event, instance) {
        event.preventDefault();
        if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE") {
            Router.go('/game');
        } else {
            var existedWorker = FinishedWorkers.find({ "workerId": worker_Id });
            if (existedWorker.count() > 0) {
                Router.go('/error');
            } else {
                switch (treatment) {
                    case '2': 
                        Router.go('/endTutorial');
                        break;
                    case '3':
                        Router.go('/surrogate');
                        break;
                    default:
                        Router.go('/surrogate');
                        break;
                }
            }
        }
    }
};



Template.calculator.helpers({
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
    netpay1: function() {
        return Template.instance().netpay1.get()
    },
    netpay2: function() {
        return Template.instance().netpay2.get()
    },
    roundNum: function() {
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
    }
});


Template.calculator.created = function() {
    this.loadingTimer = new ReactiveVar(0);
    this.worker_forecast = new ReactiveVar("UNKNOW");
    this.worker_bet = new ReactiveVar("UNKNOW");
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
    this.netpay1 = new ReactiveVar(0);
    this.netpay2 = new ReactiveVar(0);
    this.tryTime = new ReactiveVar(0);
    this.loadingStatus = new ReactiveVar(0);
    timeSeries.push(Date.now().toString()+' calculator');
    console.log(timeSeries);
};

Template.calculator.rendered = function() {
    $('html,body').scrollTop(0);
    startTime = new Date();
};