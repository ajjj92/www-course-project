//Event listeners for matrerialize visual candy
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);

  var textNeedCount = document.querySelectorAll('#postcontent');
  M.CharacterCounter.init(textNeedCount);


  elems = document.querySelectorAll('.parallax');
  instances = M.Parallax.init(elems);

  elems = document.querySelectorAll('.modal');
  instances = M.Modal.init(elems);
  
  elems = document.querySelectorAll('.fixed-action-btn');
  instances = M.FloatingActionButton.init(elems);


});
