RealTasks = new Meteor.Collection('realTasks');

RealTasks.allow({
  insert: function(){ return false; },
  update: function(){ return false; },
  remove: function(){ return false; }
});

RealTasks.deny({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; }
});
