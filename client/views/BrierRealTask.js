//Meteor.subscribe('workers');
//Meteor.subscribe('realTasks');
//Meteor.subscribe('answers');

const setSize = 5;

var tasklist = [
    { num: '1', question: "1. Will the price of Bitcoin in USD on Nov. 26th be above 9000?", description: '<p>Amazon <a href="https://www.amazon.com/b?ie=UTF8&amp;node=17044620011">recently announced plans</a> to build "HQ2", a second headquarters in North America. As detailed in a number of <a href="https://www.nytimes.com/2017/09/25/technology/wooing-amazon-second-headquarters.html">news articles</a>, cities across the continent are scrambling to promote themselves as the ideal location; the selected region will absorb a $5 billion investment and see the creation of up to 50,000 new jobs over the next two decades. It is <a href="https://www.nytimes.com/2017/09/07/technology/amazon-headquarters-north-america.html">widely expected</a> that the winning locale will offer significant tax incentives, but a range of tangible and intangible factors will likely play into the final selection.</p><p>A <a href="http://money.cnn.com/2017/10/04/technology/amazon-second-headquarters-city-proposals/index.html">recent article</a> profiles the, ahem, ingratiation efforts that a number of small cities have been putting forth to become the hosts.  Will extra efforts by relatively small cities win out over the resources available to larger cities? We will ask:</p><p><strong><em> Will the new Amazon HQ be hosted by a city with a population of &lt; 3,000,000 people in its metropolitan area? </em></strong></p><p>Resolution is positive if the official Amazon announcement places the HQ in a city of population of &lt; 3M in its metropolitan area, per the <a href="https://en.m.wikipedia.org/wiki/List_of_Metropolitan_Statistical_Areas">wikipedia list</a> of 2016 census estimates. (This excluded the largest 18 cities).</p><p><em>(Edit 10/15 to change to metro areas and 3M population, 18 cities above the line.)</em></p>' },
    { num: '2', question: "2. Will Boston Celtics’ winning streak cease by Nov. 26th?", description: "a" },
    { num: '3', question: "3. Will Donald J. Trump tweet more than 5 times during Thanksgiving?", description: "b" },
    { num: '4', question: "4. Will Ohio win the Michigan v.s. Ohio college football game on 25th?", description: "c" },
    { num: '5', question: "5. Will the US take a military action in N. Korea by Nov. 26th?", description: "c" },
    { num: '6', question: "6. Will the average temperature in USA during the Thanksgiving week (Nov. 20st to Nov. 26th) be greater than the last year’s average temperature for the same period?", description: "c" },
    { num: '7', question: "7. Will Tom Brady throw more than 2 touchdown passes in the Nov. 26 game against Dolphins", description: "c" },
    { num: '8', question: "8. Will the official youtube video of Taylor Swift song ‘Look what you made me do’ reach 800,000 views before Nov. 26th?", description: "c" },
    { num: '9', question: "9. Will there be a mass protest in Barcelona between Nov. 21st and Nov. 26th?", description: "c" },
    { num: '10', question: "10. Will the end-of-day closing value for the British pound against the US dollar drop below $1.3 on Nov. 25th 2017?", description: "c" },
    { num: '11', question: "11. Will the daily closing spot price of Brent crude oil (USD per barrel) be more than $63 on 25 November 2017 according to US EIA?", description: "c" },
    { num: '12', question: "12. Will battle deaths, according to ACLED record, in the Democratic Republic of the Congo reach 60, in November 2017?", description: "c" },
    { num: '13', question: "13. Will ‘Justice League (2017)’ have ‘Rotten Tomatoes’ score dropped below 30% by Nov. 26th?", description: "c" },
    { num: '14', question: "14. Will there be more than 10 Blockchain patents on Nov. 26th in online search repository of US patent system (http://appft.uspto.gov)?", description: "c" },
    { num: '15', question: "15. Will Auburn win the Auburn v.s. Alabama college football game on 25th?", description: "c" }
];

function pressedSubmit(event, instance, val) {
    var setNum = instance.setNum.get();
    var form = document.getElementById('taskForm');
    var val = form.checkValidity();
    if (!val) {
        return false;
    }

    var task_ID = -1;
    var fcast = -1;
    var s = -1;

    var i = 0;
    for (i = 1; i <= setSize; i++) {
        s = (i + (setNum-1)*setSize).toString();
        fcast = parseFloat(document.getElementById('pred' + s + 'Box').value).toFixed(3);
        task_ID = (setNum - 1) * setSize + i;
        Answers.insert({ "workerID": worker_Id, "assignmentId": assignment_Id, "taskID": task_ID, "forecast": fcast, "treatment": treatment, "timestamp": Date.now()});
    }

    //Fetch next five forecast questions
    if (setNum <= 2) {
    	instance.setNum.set(setNum+1);
        document.getElementById('taskForm').reset();
        event.preventDefault();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        if (setNum ==2 ) {document.getElementById('submit').innerHTML = "Finish"};
    } else {
        Router.go('end');
    }
}

Template.BrierRealTask.created = function() {
    this.setNum = new ReactiveVar(1);
    timeSeries.push(Date.now().toString()+' BrierRealTask');
    console.log(timeSeries);
};

Template.BrierRealTask.helpers({
    tasks: function() {
        var setNum = Template.instance().setNum.get();
        var start = (setNum - 1) * setSize;
        return tasklist.slice(start, start + setSize);
    },
    setNum: function() {
        return Template.instance().setNum.get();
    },
});

Template.BrierRealTask.rendered = function() {
    $('html,body').scrollTop(0);
    startTime = new Date();
};

Template.BrierRealTask.events = {
    'click #submit': function(event, instance) {
        pressedSubmit(event, instance);
    }
};