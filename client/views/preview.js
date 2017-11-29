Template.preview.events = {
    'click #nextBtn': function(event, template) {
        event.preventDefault();
        var existedWorker = FinishedWorkers.findOne({ "workerId": worker_Id });
        if (existedWorker != null) {
            Router.go('/error');
        } else {
            var workerRecord = Workers.findOne({ "workerId": worker_Id });
            if (workerRecord == null) {
                // A new worker comes
                treatment = parseInt((Math.random() * 3 + 1)).toFixed(0);
                console.log("New treatment:", treatment);
                console.log(['workerId:', worker_Id, 'assignmentId:', assignment_Id, 'hitId:', hit_Id]);
                Workers.insert({ 'workerId': worker_Id, 'assignmentId': assignment_Id, 'hitId': hit_Id, 'treatment': treatment, 'timestamp': Date.now() });
                if (treatment == '1') {
                    Router.go('BrierWelcome');
                } else {
                    Router.go('welcome');
                }
            } else {
                if ("treatment" in workerRecord) {
                    treatment = workerRecord.treatment;
                    console.log('Find treatment:' + treatment);
                    if (treatment == '1') {
                        Router.go('BrierWelcome');
                    } else {
                        Router.go('welcome');
                    }
                } else {
                    Router.go("/error");
                }
            }
        }
    }
};

Template.preview.rendered = function() {
	console.log("preview rendered!");
	if (assignment_Id != "ASSIGNMENT_ID_NOT_AVAILABLE") {
        document.getElementById("nextBtn").style.visibility = "visible";
    }
    //document.getElementById("content").style.fontFamily = "Optima, Segoe, Candara, Calibri, Arial, sans-serif";
    $("p").css({
        fontSize: "110%"
    });
};

Template.preview.created = function() {
    timeSeries.push(Date.now().toString() + ' preview');
    console.log(timeSeries);
};