Template.taskV3.events={
	'click .readBtn': function(event, instance) {
		var index = String(this.num);
		var readBtn = event.currentTarget;
		if (readBtn.innerHTML === "More details") {
			readBtn.innerHTML = "Collapse";
			var taskDiv = document.getElementById("taskDiv"+index);
			var newRow = document.createElement('tr');
			var newCell = newRow.insertCell(0);
			newCell.setAttribute('colspan', '3');
			newCell.setAttribute('width', '800')
			var description = document.createElement('h5');
			description.innerHTML = this.description;
			newCell.appendChild(description);
			var newBtn = readBtn.cloneNode(true);
			newBtn.removeAttribute("style");
			newCell.appendChild(newBtn);
			taskDiv.appendChild(newRow)
		} else {
			var taskDiv = document.getElementById("taskDiv"+index);
			taskDiv.removeChild(taskDiv.lastChild);
			var readBtn = taskDiv.getElementsByClassName("readBtn")[0];
			readBtn.innerHTML = "More details"
		}
	},
	'input .predBar': function(event, instance){
		var bar = event.currentTarget;
		var box = bar.parentNode.getElementsByClassName('predBox')[0];
		box.value = bar.value;
	},
	'input .predBox': function(event, instance){
		var box = event.currentTarget;
		var bar = box.parentNode.getElementsByClassName('predBar')[0];
		bar.value = box.value;
	},
	'input .betBox': function(event, instance){
		var box = event.currentTarget;
		var bar = box.parentNode.getElementsByClassName('betBar')[0];
	}
};


Template.taskBrier.events={
	'click .readBtn': function(event, instance) {
		var index = String(this.num);
		var readBtn = event.currentTarget;
		if (readBtn.innerHTML === "More details") {
			readBtn.innerHTML = "Collapse";
			var taskDiv = document.getElementById("taskDiv"+index);
			var newRow = document.createElement('tr');
			var newCell = newRow.insertCell(0);
			newCell.setAttribute('colspan', '3');
			newCell.setAttribute('width', '850')
			var description = document.createElement('h5');
			description.innerHTML = this.description;
			newCell.appendChild(description);
			var newBtn = readBtn.cloneNode(true);
			newBtn.removeAttribute("style");
			newCell.appendChild(newBtn);
			taskDiv.appendChild(newRow)
		} else {
			var taskDiv = document.getElementById("taskDiv"+index);
			taskDiv.removeChild(taskDiv.lastChild);
			var readBtn = taskDiv.getElementsByClassName("readBtn")[0];
			readBtn.innerHTML = "More details"
		}
	},
	'input .predBar': function(event, instance){
		var bar = event.currentTarget;
		var box = bar.parentNode.getElementsByClassName('predBox')[0];
		box.value = bar.value;
	},
	'input .predBox': function(event, instance){
		var box = event.currentTarget;
		var bar = box.parentNode.getElementsByClassName('predBar')[0];
		bar.value = box.value;
	}
};




Template.taskV1.events={
	'click .readBtn': function(event, instance) {
		var index = String(this.num);
		var readBtn = event.currentTarget;
		if (readBtn.innerHTML === "More details") {
			readBtn.innerHTML = "Collapse";
			var taskTable = document.getElementById("taskTable"+index);
			var newRow = taskTable.insertRow(-1);
			var newCell = newRow.insertCell(0);
			newCell.setAttribute('colspan', '3');
			newCell.setAttribute('width', '850')
			var description = document.createElement('h5');
			description.innerHTML = this.description;
			newCell.appendChild(description);
			var newBtn = readBtn.cloneNode(true);
			newBtn.removeAttribute("style");
			newCell.appendChild(newBtn);
		} else {
			var taskTable = document.getElementById("taskTable"+index);
			taskTable.deleteRow(-1)
			var readBtn = taskTable.getElementsByClassName("readBtn")[0];
			readBtn.innerHTML = "More details"
		}
	},
	'input .predBar': function(event, instance){
		var bar = event.currentTarget;
		var box = bar.parentNode.getElementsByClassName('predBox')[0];
		box.value = bar.value;
	},
	'input .predBox': function(event, instance){
		var box = event.currentTarget;
		var bar = box.parentNode.getElementsByClassName('predBar')[0];
		bar.value = box.value;
	},
	'input .betBar': function(event, instance){
		var bar = event.currentTarget;
		var box = bar.parentNode.getElementsByClassName('betBox')[0];
		box.value = bar.value;
	},
	'input .betBox': function(event, instance){
		var box = event.currentTarget;
		var bar = box.parentNode.getElementsByClassName('betBar')[0];
		bar.value = box.value;
	}
};

/*
Template.real_image_game.rendered=function(){
	$('html,body').scrollTop(0);
	startTime = new Date();
};*/