var exampleTaskList = [{ num: '1', question: "Will Google stock price go up in next week?", description: '<p>The current Alphabet Inc (Google) Stack price can be found by <a ref="https://www.google.com/search?q=Google+stock+price">Google Search.</a>\
    <p>We ask:</p>\
    <p><strong><em> By the end of Nov. 30, will Google stock price be higher than its price at at the end of Nov. 21?  </em></strong></p>\
    <p>Resolution is positive if the Google stock price given by <a ref="https://www.google.com/search?q=Google+stock+price">Google Search</a> at the end of Nov. 30 is higher than that at the end of Nov. 21.' }];

Template.example.events = {
    'input .betBox': function(event, instance) {
        displayRemainPoints();
    },
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
                Router.go('/consent');
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
                //Router.go('/training_candy_game');
                Router.go('/NAWMTutorial');
            }
        }
    }
};

Template.example.helpers({
    tasks: function() {
        return exampleTaskList;
    }
});

Template.example.rendered = function() {
    $('html,body').scrollTop(0);
};

Template.example.created = function() {
    timeSeries.push(Date.now().toString()+' example');
    console.log(timeSeries);
};