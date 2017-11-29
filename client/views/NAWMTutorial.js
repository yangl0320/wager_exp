Template.NAWMTutorial.events = {
    'input #pred1Bar': function(event, instance) {
        var table = document.getElementById('predictionTable');
        var p1 = parseFloat(table.getElementsByClassName('pred1Bar')[0].value);
        table.getElementsByClassName('pred1Box')[0].value = p1.toFixed(1);
        var pay = threePlayersNAWM(p1, 10, 0.7, 10, 0.0, 0);
        fillMechanismResult(table, pay, 10);
        document.getElementById('resultArea1').style.visibility = "visible";
    },
    'input #point1Bar': function(event, instance) {
        var table = document.getElementById('pointsTable');
        var w1 = parseFloat(table.getElementsByClassName('point1Bar')[0].value);
        table.getElementsByClassName('point1Box')[0].value = w1.toFixed(0);
        var pay = threePlayersNAWM(0.3, w1, 0.7, 10, 0.0, 0);
        fillMechanismResult(table, pay, w1);
        document.getElementById('resultArea2').style.visibility = "visible";
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
                Router.go('/example');
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
                Router.go('/calculator');
            }
        }
    }
};

Template.NAWMTutorial.helpers({
    showExample: function() {
        return Template.instance().showExample.get();
    }
});

Template.NAWMTutorial.rendered = function() {
    $('html,body').scrollTop(0);
    if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE") {
        document.getElementById("welcome-btn").innerHTML = "Accept HIT first!";
    }
};

Template.NAWMTutorial.created = function() {
    this.showExample = new ReactiveVar(false);
    timeSeries.push(Date.now().toString()+' NAWMTutorial');
    console.log(timeSeries);
};