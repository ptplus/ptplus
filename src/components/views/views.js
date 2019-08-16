


document.addEventListener("DOMContentLoaded", function() {
    
  const body 	     = document.querySelector("body");
  const view       = document.querySelector('#viewSwitcher');

  // On load
  if (view) {
    if(view.checked) {
      body.classList.remove('view-horizontal');
      body.classList.add('view-vertical');
    } 
    else {
      body.classList.remove('view-vertical');
      body.classList.add('view-horizontal');
    }
  }

  // Listen for change
  if (view) {
    view.addEventListener("change", function() {
      if(this.checked) {
        body.classList.remove('view-horizontal');
        body.classList.add('view-vertical');
      } 
      else {
        body.classList.remove('view-vertical');
        body.classList.add('view-horizontal');
      }
    }, true);
  }

});