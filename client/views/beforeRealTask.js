Template.beforeRealTask.events={
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
                Router.go('/real_task');
            }
        }
    }
};

Template.beforeRealTask.helpers({
    initialPoints: function() {
        return totalPoints;
    }
});

Template.beforeRealTask.created = function() {
    timeSeries.push(Date.now().toString()+' beforeRealTask');
    console.log(timeSeries);
};

Template.beforeRealTask.rendered=function(){
    $('html,body').scrollTop(0);
};
