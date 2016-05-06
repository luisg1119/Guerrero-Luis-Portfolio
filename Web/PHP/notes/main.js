var noteId=0;
var prevColor = "";
var currentEdit = 0;
var deleteModal = 0;

$(document).ready(function(){
	getAllAjax();

	//Set Date
	date = getDate();
	$('.date').text(date);

	//Event Listener for create modal
	$('#noteTitle').keypress(function(){
		getCharacterCount();
	});

	//Event Listener for edit Modal
	$('#editNoteTitle').keypress(function(){
		getEditCharacterCount();
	});

	//Event Lister for edit modal when shown 
	$('#editModal').on("shown.bs.modal", function (evt) {
    	element = evt.relatedTarget.id;
    	console.log(element);
    	currentEdit = element;
    	head = $('.'+element).find('.note-header').text();
    	summary = $('.'+element).find('.note-summary').text();
    	color = getColor(element);
    	prevColor = color;
    	$('#editNoteTitle').val(head);
    	$('#editNoteSummary').val(summary);
    	$('input:radio[name="colorEdit"][value="' +color + '"]').prop('checked', true);
    	getEditCharacterCount();
	});

	//Event Listener for edit modal when save button pressed
	$('#saveEdit').click(function(){
		title = $('#editNoteTitle').val();
		description = $('#editNoteSummary').val();
		color = $('input:radio[name="colorEdit"]:checked').val();
		$('.'+currentEdit).find('.note-header').text(title);
		$('.'+currentEdit).find('.note-summary').text(description);
		changeColor(prevColor,color, currentEdit);
		$('#editModal').modal('hide');

		array = [];
		array.push({"id":currentEdit, "title":title, "description":description, "color":color});
		console.log(array);

		editAjax(array);
	});

	//Event Listener for delete modal when shown
	$('#deleteModal').on("shown.bs.modal", function (evt) {
    	element = evt.relatedTarget.id;
    	deleteModal = element;
	});

	//Delete event listener 
	$('#delete').click(function(){
		$('.'+ deleteModal).remove();
		$('#deleteModal').modal('hide');
		deleteAjax(deleteModal);
	});

	//Event Listener for create Modal when shown
	$('#newNote').on('shown.bs.modal', function(){
		$('.danger-red').text("");
		$('#noteSummary').val("");
		$('#noteTitle').val("");
		getCharacterCount();
	});


	//Event Listener for create modal when create button pressed
	$('#create').click(function(){
		title = $('#noteTitle').val();
		description = $('#noteSummary').val();
		color = $("input[type='radio']:checked").val();
		if(!isEmpty(title, description).input){
			check = isEmpty(title, description);
			$('.danger-red').text("Please input a "+ check.element);
		}
		else{
			date = getDate();
			note = '<li class="'+ "M"+ ++noteId + ' note-li '+ color +' col-sm-3">'+
                                '<div>'+                                  
                                    '<p class="note-header">'+title+'</p>'+
                                    '<p class="note-container">Created on: <span class="date-created">'+date+'</span></p>'+
                                    '<p class="note-summary">'+description+'</p>'+
                                    '<div class="dropup">'+
                                        '<div class="note-btn dropdown-toggle" type="button" data-toggle="dropdown">'+
                                            '<span class="glyphicon glyphicon-menu-hamburger"></span>'+
                                        '</div>'+
                                        '<ul class="dropdown-menu">'+
                                          '<li><a id="' + "M" + noteId + '" data-toggle="modal" data-target="#editModal">Edit</a></li>'+
                                          '<li><a id="' + "M" + noteId + '"data-toggle="modal" data-target="#deleteModal">Delete</a></li>'+
                                        '</ul>'+
                                      '</div>'+
                                    '</div>'+
                            '</li>';
            $('.notes').append(note);
			$('#newNote').modal('hide');
			$('.danger-red').text("");
			$('#noteSummary').val("");
			$('#noteTitle').val("");
			getCharacterCount();
			
			//put info in array to send
			array = [];
			array.push({"date": date, "title":title, "description":description, "color":color});
			createAjax(array);
		}
	});
});

//Error checking for empty input boxes
function isEmpty(title, description){
	if(title.length === 0 || title === null){
		answer = {
			input : false,
			element : "Title"
		};
		return answer;
	}
	else if(description.length === 0 || description === null){
		answer = {
			input : false,
			element : "Description"
		};
		return answer;
	}
	else{
		answer = {
			input : true,
			element : "None"
		};
		return answer;
	}	
}

function changeColor(oldColor,color,id){
	$('.'+id).removeClass(oldColor);
	$('.'+id).addClass(color);
}

//Returns the elements color in class
function getColor(id){
	classes = $('.'+id).attr('class');
    if(classes.contains('red')){
		return 'red';
    }
    else if(classes.contains('blue')){
    	return 'blue';
    }
    else if(classes.contains('green')){
    	return 'green';
    }
    else if(classes.contains('yellow')){
    	return 'yellow';
    }
    else if(classes.contains('orange')){
    	return 'orange'
    }
    else{
    	return 'purple'
    }
}

function createNote(data){
    $('#loading').css("display","none");
	for(i = 0; i<data.length;i++){
		note = '<li class="'+ data[i].id + ' note-li '+ data[i].color +' col-sm-3">'+
	                        '<div>'+                                  
	                            '<p class="note-header">'+data[i].title+'</p>'+
	                            '<p class="note-container">Created on: <span class="date-created">'+data[i].date+'</span></p>'+
	                            '<p class="note-summary">'+data[i].desc+'</p>'+
	                            '<div class="dropup">'+
	                                '<div class="note-btn dropdown-toggle" type="button" data-toggle="dropdown">'+
	                                    '<span class="glyphicon glyphicon-menu-hamburger"></span>'+
	                                '</div>'+
	                                '<ul class="dropdown-menu">'+
	                                  '<li><a id="' + data[i].id  + '" data-toggle="modal" data-target="#editModal">Edit</a></li>'+
	                                  '<li><a id="' + data[i].id  + '"data-toggle="modal" data-target="#deleteModal">Delete</a></li>'+
	                                '</ul>'+
	                              '</div>'+
	                            '</div>'+
	                    '</li>';
	    $('.notes').append(note);
	}
}

//Gets character count in create modal
function getCharacterCount(){
	count = $('#noteTitle').val().length;
	total = 60-count;
	$('#characterCount').text(total);
}

//Gets character count in edit modal
function getEditCharacterCount(){
	count = $('#editNoteTitle').val().length;
	total = 60-count;
	$('#editCharacterCount').text(total);
}

//Returns today's date
function getDate(){
	date = new Date();
	month = date.getMonth()+1;
	day = date.getDate();
	year = date.getFullYear();
	if(month < 10){
		month = '0'+month; 
	}
	if(day < 10){
		day = '0'+day;
	}
	date = month+'-'+ day+'-'+year;
	return date;
}

function getAllAjax(){
	  $.ajax({
       url: 'php-scripts/scripts.php',
       type: 'post',
       data: {'action':'getAll'},
       success: function(data, status) {
       		data = JSON.parse(data);
       		if(data.length > 0){
       			createNote(data);
       		}
       		else{
       			$('#loading').css("display","none");
       		}
       },
       error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
       }
   });
}

function createAjax(element){
	$.ajax({
       url: 'php-scripts/scripts.php',
       type: 'post',
       data: {'action':'add', 'element': element},
       success: function(data, status) {
       		console.log(data);
       },
       error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
       }
   });	  
}

function deleteAjax(element){
	$.ajax({
       url: 'php-scripts/scripts.php',
       type: 'post',
       data: {'action':'remove', 'element': element},
       success: function(data, status) {
       		console.log(data);
       },
       error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
       }
   });	  
}

function editAjax(element){
	$.ajax({
       url: 'php-scripts/scripts.php',
       type: 'post',
       data: {'action':'update', 'element': element},
       success: function(data, status) {
       		console.log(data);
       },
       error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
       }
   });	  
}