Template.training_to_real.rendered=function(){
	$('html,body').scrollTop(0);
};

Template.training_to_real.events={
  'click #welcome-btn': function(event, template) {
    event.preventDefault();
    Router.go('real_image_game');
  }
};
