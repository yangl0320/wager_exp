Template.consent.events = {
    'click #prevBtn': function(event, template) {
        event.preventDefault();
        if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE") {
            Router.go('/game');
        } else {
            var existedWorker = FinishedWorkers.find({ "workerId": worker_Id });
            if (existedWorker.count() > 0) {
                Router.go('/error');
            } else {
                //Router.go('/training_candy_game');
                Router.go('/welcome');
            }
        }
    },
    'click #nextBtn': function(event, template) {
        event.preventDefault();
        if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE") {
            Router.go('/game');
        } else {
            var existedWorker = FinishedWorkers.find({ "workerId": worker_Id });
            if (existedWorker.count() > 0) {
                Router.go('/error');
            } else {
                //console.log(document.getElementById('consentBox').checked);
                if (!document.getElementById('consentBox').checked) {
                    alert("If you agree to take part in this experiment, please check the box above!");
                    return false;
                }
                Router.go('/example');
            }
        }
    }
};

Template.consent.rendered = function() {
    $('html,body').scrollTop(0);
};

Template.consent.created = function() {
    timeSeries.push(Date.now().toString()+' consent');
    console.log(timeSeries);
};