
var useFront = true;

window.onload = init;

  function init(){
    var postcard = document.getElementById('postcard');
    postcard.onclick = function() {
        useFront = !useFront;
        if(useFront) {
            postcard.src = "postcard_front.png";
        }
        else {
            postcard.src = "postcard_back.png";
        }
    };
  }