Template.surrogate.events={
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
                Router.go('/calculator');
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
                //Router.go('/training_candy_game');
                Router.go('/beforeRealTask');
            }
        }
    }
};

Template.surrogate.rendered=function(){
    $('html,body').scrollTop(0);
};

Template.surrogate.created = function() {
    timeSeries.push(Date.now().toString()+' surrogate');
    console.log(timeSeries);
};