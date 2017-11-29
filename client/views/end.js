getRadioValue = function(name) {
    var radios = document.getElementsByName(name);
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked)
            return radios[i].value;
    }

}

Template.end.events = {
    'click #submit': function(event, instance) {
        //event.preventDefault();
        var form = document.getElementById('feedbackForm');
        var val = form.checkValidity();
        if (!val) {
            return true;
        }
        var enjoyGame = getRadioValue('enjoyGame') || 0;
        var trainClear = getRadioValue('trainClear') || 0;
        //var trainTime = getRadioValue('trainTime') || 0;
        var bestTrainPart = getRadioValue('bestTrainPart') || 0;
        var predMethod = getRadioValue('predMethod') || 0;
        var otherPredMethod = document.getElementById("otherPredMethod");
        if (otherPredMethod != null) {
            otherPredMethod = otherPredMethod.value;
        } else {
            otherPredMethod = "";
        }
        var allocateMethod = document.getElementById("allocateMethod");
        if (allocateMethod != null) {
            allocateMethod = allocateMethod.value;
        } else {
            allocateMethod = "";
        }
        var comments = document.getElementById("comment").value;
        var submitDate = new Date();
        FinishedWorkers.insert({ workerId: worker_Id, assignmentId: assignment_Id, hitId: hit_Id, treatment: treatment, enjoyGame: enjoyGame, tutClear: trainClear, bestTutPart: bestTrainPart, predMeth: predMethod, othPredMeth: otherPredMethod, allocMeth: allocateMethod, comment: comments, timeSeries: timeSeries, submitTime: submitDate.toString() });
        var str = "https://www.mturk.com/mturk/externalSubmit?assignmentId=" + assignment_Id.toString() + "&Finished=Submit";
        Meteor.setTimeout(function() { window.location.href = str; }, 1000);
    }
};

Template.end.created = function() {
    timeSeries.push(Date.now().toString()+' end');
    console.log(timeSeries);
};

Template.end.rendered = function() {
    $('html,body').scrollTop(0);
    if (treatment=="1") {
        var element = document.getElementById("trainPartLi");
        element.parentNode.removeChild(element);
        element = document.getElementById("allocateLi");
        element.parentNode.removeChild(element);
    }
};