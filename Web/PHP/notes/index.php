<?php
    session_start();
    require_once 'php-scripts/db.php';
    require_once 'php-scripts/db.php';


    $db = new DBOperations();
    $db -> connect();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Note App</title>
     <meta charset="UTF-8">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="style.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
    <!-- Jquery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script type="text/javascript" src="main.js"></script>
</head>
<body>
    <div class="container-fluid">
        <div class="row-fluid">
              <div class=" col-sm-12 text-center">
                <div id = "loading" class="text-center">
                  <img height="100px" src="images/loading.gif">
                </div>
                  <div class="header dark-gray">
                      <p>Notes Application</p>
                  </div>
                  <hr/>
                  <div class="buttons text-center"> 
                      <a href="#" class="btn btn-success" data-toggle="modal" data-target="#newNote">
                          Create a New Note
                      </a>
                  </div>
                  <hr/>
                  <div class="date-container">
                      <span>Today's Date</span> <br>
                      <span class="date rust"></span>
                  </div>
                  <div class="notes-container col-sm-12">
                      <div class="row-fluid">
                          <ul class="notes text-center">
                              <li class="0 blue note-li col-sm-3">
                                  <div>                                  
                                      <p class="note-header">This is an Example Header</p>
                                      <p class="note-container">Created on: <span class="date-created">01-20-2016</span></p>
                                      <p class="note-summary">This is example Text:   Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli</p>
                                      <div class="dropup">
                                          <div class="note-btn dropdown-toggle" type="button" data-toggle="dropdown">
                                              <span class="glyphicon glyphicon-menu-hamburger"></span>
                                          </div>
                                          <ul class="dropdown-menu">
                                            <li><a id="0" data-toggle="modal" data-target="#editModal">Edit</a></li>
                                            <li><a id="0" data-toggle="modal" data-target="#deleteModal">Delete</a></li>
                                          </ul>
                                        </div>
                                      </div>
                              </li>           
                          </ul>
                      </div>
                  </div>
                   <footer class="panel-footer col-sm-12"></footer>
               </div>
        </div>
    </div>
</body>
</html>


<!-- Add Modal -->
<div class="modal fade" id="newNote" tabindex="-1" role="dialog" aria-labelledby="newNote" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close glyphicon glyphicon-remove" data-dismiss="modal" aria-hidden="true"></button>
            <h3 class="modal-title" id="myModalLabel">Create a New Note</h3>
            </div>
            <div class="modal-body">
                <p class="text-center danger-red"></p>
                <form>
                  <fieldset class="form-group">
                    <label for="noteTitle">Note Title</label>
                    <input type="text" class="form-control" id="noteTitle" maxlength="60" placeholder="Title" required="true">
                    <small class="text-muted">You can enter up to <b><span id="characterCount">60</span></b> more characters</small>
                  </fieldset>
                  <fieldset class="form-group">
                    <label for="noteSummary">Note Summary</label>
                    <textarea class="form-control" id="noteSummary" row="5" placeholder="Description" required="true"></textarea>
                  </fieldset>
                  <div class="color-radio text-center">
                      <label>Pick a color for the note:</label> <br> 
                      <label class="radio-inline"><input type="radio" value = "red" name="color" checked>Red 
                        <div class="pick-color red"></div>    
                      </label>
                      <label class="radio-inline"><input type="radio" value ="blue" name="color">Blue
                        <div class="pick-color blue"></div>    
                      </label>
                      <label class="radio-inline"><input type="radio" value="green" name="color">Green
                        <div class="pick-color green"></div>    
                      </label>
                      <label class="radio-inline"><input type="radio" value="yellow" name="color">Yellow
                        <div class="pick-color yellow"></div>    
                      </label>
                      <label class="radio-inline"><input type="radio" value="orange" name="color">Orange
                        <div class="pick-color orange"></div>    
                      </label>
                      <label class="radio-inline"><input type="radio" value="purple" name="color">Purple
                        <div class="pick-color purple"></div>    
                      </label>
                  </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" id="create" class="btn btn-success">Create</button>
        </div>
    </div>
  </div>
</div>

<!-- Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close glyphicon glyphicon-remove" data-dismiss="modal" aria-hidden="true"></button>
            <h3 class="modal-title" id="myModalLabel">Edit Note</h3>
            </div>
            <div class="modal-body">
                <p class="text-center danger-red"></p>
                <form>
                  <fieldset class="form-group">
                    <label for="editNoteTitle">Note Title</label>
                    <input type="text" class="form-control" id="editNoteTitle" maxlength="60" placeholder="Title" required="true">
                    <small class="text-muted">You can enter up to <b><span id="editCharacterCount">60</span></b> more characters</small>
                  </fieldset>
                  <fieldset class="form-group">
                    <label for="editNoteSummary">Note Summary</label>
                    <textarea class="form-control" id="editNoteSummary" row="5" placeholder="Description" required="true"></textarea>
                  </fieldset>
                  <div class="color-radio text-center">
                      <label>Pick a color for the note:</label> <br> 
                      <label class="radio-inline"><input type="radio" value = "red" name="colorEdit">Red 
                        <div class="pick-color red"></div>    
                      </label>
                      <label class="radio-inline"><input type="radio" value ="blue" name="colorEdit">Blue
                        <div class="pick-color blue"></div>    
                      </label>
                      <label class="radio-inline"><input type="radio" value="green" name="colorEdit">Green
                        <div class="pick-color green"></div>    
                      </label>
                      <label class="radio-inline"><input type="radio" value="yellow" name="colorEdit">Yellow
                        <div class="pick-color yellow"></div>    
                      </label>
                      <label class="radio-inline"><input type="radio" value="orange" name="colorEdit">Orange
                        <div class="pick-color orange"></div>    
                      </label>
                      <label class="radio-inline"><input type="radio" value="purple" name="colorEdit">Purple
                        <div class="pick-color purple"></div>    
                      </label>
                  </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" id="saveEdit" class="btn btn-warning">Save Changes</button>
        </div>
    </div>
  </div>
</div>
   
<!-- Delete Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close glyphicon glyphicon-remove" data-dismiss="modal" aria-hidden="true"></button>
            <h3 class="modal-title" id="myModalLabel">Delete Note</h3>
            </div>
            <div class="modal-body text-center">
                <h4 class="red-text">Are you sure you want to delete note?</h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" id="delete" class="btn btn-danger">Delete</button>
        </div>
    </div>
  </div>
</div>