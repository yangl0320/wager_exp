/*
A url example:
https://raven.eecs.harvard.edu/?assignmentId=35K3O9HUACQ7YKYSY9HY632UBKTFE8&hitId=3W9XHF7WGK8IH5A9ZDSPXIZKBDYTKG&workerId=AX8LP3MI6LWSJ&turkSubmitTo=https%3A%2F%2Fworkersandbox.mturk.com

http://localhost:3000/?assignmentId=35K3O9HUACQ7YKYSY9HY632UBKTFE8&hitId=3W9XHF7WGK8IH5A9ZDSPXIZKBDYTKG&workerId=AX8LP3MI6LWSJ&turkSubmitTo=https%3A%2F%2Fworkersandbox.mturk.com
*/


worker_Id = '';
assignment_Id = '';
hit_Id = '';
urls = '';
treatment = '';

timeSeries = [];

totalPoints = 25;

Meteor.subscribe('workers');
Meteor.subscribe('finishedWorkers');
Meteor.subscribe('answers');
//wagerHandle = Meteor.subscribe("wageringPM");

threePlayersNAWM = function(p1, w1, p2, w2, p3, w3) {
    var p_bar = (1 + ((2 * p2 - 1) * w2 + (2 * p3 - 1) * w3) / (w2 + w3)) / 2;
    var BScore = function(x, y) { return 1 - (y - x) * (y - x); };
    var coef = w1 * (w2 + w3) / (w1 + w2 + w3);
    var pay = [coef * (BScore(p1, 1) - BScore(p_bar, 1)), coef * (BScore(p1, 0) - BScore(p_bar, 0))]

    if (w2 == 0 && w3 == 0) {
        pay = [0, 0];
    }
    return pay;
}

fillMechanismResult = function(element, pay, wager) {
    if (pay[0] < 0) {
        //instance.netpay1.set('<span color="blue"> lose ' + (-pay[0]).toFixed(2) + '</span>');
        element.getElementsByClassName('netGain1')[0].innerHTML = '';
        element.getElementsByClassName('netLose1')[0].innerHTML = 'lose ' + (-pay[0]).toFixed(2);
    } else {
        element.getElementsByClassName('netGain1')[0].innerHTML = 'gain ' + pay[0].toFixed(2);
        element.getElementsByClassName('netLose1')[0].innerHTML = '';
    }
    if (pay[1] < 0) {
        element.getElementsByClassName('netGain2')[0].innerHTML = '';
        element.getElementsByClassName('netLose2')[0].innerHTML = 'lose ' + (-pay[1]).toFixed(2);
    } else {
        element.getElementsByClassName('netGain2')[0].innerHTML = 'gain ' + pay[1].toFixed(2);
        element.getElementsByClassName('netLose2')[0].innerHTML = '';
    }
    element.getElementsByClassName('total1')[0].innerHTML = (pay[0] + wager).toFixed(2);
    element.getElementsByClassName('total2')[0].innerHTML = (pay[1] + wager).toFixed(2);
}

displayRemainPoints = function(color) {
    var points = document.getElementsByClassName('betBox');
    var sum = 0;
    for (var i = 0; i < points.length; i++) {
        sum += parseInt(points[i].value) || 0;
    }
    var remainPoints = totalPoints - sum;
    var remainBoxes = document.getElementsByClassName('remain');
    var remainStr = '&nbsp;&nbsp;&nbsp;' + remainPoints + ' points left';
    if (remainPoints < 0) {
        remainStr = 'exceeding by ' + (-remainPoints) + ' points!';
    }
    /*else if (remainPoints == 0) {
           remainStr = 'All points allocated!'
       }*/
    if (color != null) {
        remainStr = '<span style="color: ' + color + ';">' + remainStr + '</span>';
    }
    console.log(remainStr);
    for (var i = 0; i < remainBoxes.length; i++) {
        remainBoxes[i].innerHTML = remainStr;
    }
    return remainPoints;
};

// Parse worker information from Amazon Turk url
gup = function(path, name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(path);
    if (results == null)
        return "";
    else
        return results[1];
};


Router.route('/', function() {
    path = window.location.href;
    console.log(path);
    worker_Id = gup(path, 'workerId');
    //worker_Id = Math.random().toString(36).substring(7);
    //worker_Id = "sss";
    assignment_Id = gup(path, 'assignmentId');
    //assignment_Id = "ASSIGNMENT_ID_NOT_AVAILABLE";
    hit_Id = gup(path, 'hitId');
    //bonusLevel = gup(path, 'urls');
    console.log(['workerId:', worker_Id, 'assignmentId:', assignment_Id, 'hitId:', hit_Id]);



    if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE") {
        Router.go("/preview");
        return true;
    }

    this.layout('MainLayout');
    this.render('preview');
});

Router.route('/beforeRealTask', function() {
    this.layout('MainLayout');
    this.render('beforeRealTask');
});

Router.route('/BrierConsent', function() {
    this.layout('MainLayout');
    this.render('BrierConsent');
});

Router.route('/BrierRealTask', function() {
    this.layout('MainLayout');
    this.render('BrierRealTask');
});

Router.route('/BrierTutorial', function() {
    this.layout('MainLayout');
    this.render('BrierTutorial');
});

Router.route('/BrierWelcome', function() {
    this.layout('MainLayout');
    this.render('BrierWelcome');
});

Router.route('/bonus', function() {
    this.layout('MainLayout');
    this.render('bonus');
});

Router.route('/calculator', function() {
    this.layout('MainLayout');
    this.render('calculator');
});

Router.route('/consent', function() {
    this.layout('MainLayout');
    this.render('consent');
});

Router.route('/end', function() {
    this.layout('MainLayout');
    this.render('end');
});

Router.route('/endTutorial', function() {
    this.layout('MainLayout');
    this.render('endTutorial');
});

Router.route('/error', function() {
    this.layout('MainLayout');
    this.render('error');
});

Router.route('/example', function() {
    this.layout('MainLayout');
    this.render('example');
});

Router.route('/NAWMTutorial', function() {
    this.layout('MainLayout');
    this.render('NAWMTutorial');
});

Router.route('/payment', function() {
    this.layout('MainLayout');
    this.render('payment');
});

Router.route('/preview', function() {
    this.layout('MainLayout');
    this.render('preview');
});

Router.route('/surrogate', function() {
    this.layout('MainLayout');
    this.render('surrogate');
});

Router.route('/training_image_game', function() {
    this.layout('MainLayout');
    this.render('training_image_game');
});

Router.route('/training_to_real', function() {
    this.layout('MainLayout');
    this.render('training_to_real');
});

Router.route('/transit', function() {
    this.layout('MainLayout');
    this.render('transit');
});

Router.route('/real_task', function() {
    this.layout('MainLayout');
    this.render('real_task');
});

Router.route('/welcome', function() {
    this.layout('MainLayout');
    this.render('welcome');
});