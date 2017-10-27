function getBonus(candyType) {
  var btns = document.getElementById('answerArea');
  while(btns.lastChild) {
    btns.removeChild(btns.lastChild);
  }

  var wrapper = document.createElement('H3');
  var payment;
  if(candyType) {
    //mm
    payment = 1;
  } else {
    //gm
    payment = 0.35;
  }

  var paymentText = document.createTextNode('Your bonus payment is: $' + payment);
  wrapper.appendChild(paymentText);
  btns.appendChild(wrapper);
  document.getElementById('welcome-btn').style.visibility = "visible";
}

Template.payment.events={
  'click #submit-mm': function(event, template){
    getBonus(1);
  },
  'click #submit-gm': function(event, template){
    getBonus(0);
  },
  'click #welcome-btn': function(event, template){
    event.preventDefault();
    var rn = Session.get("roundNum");
    if(rn < 5) {
      Session.set("roundNum", rn+1);
      Router.go('game');
    } else {
      Router.go('end');
    }
  }
};
