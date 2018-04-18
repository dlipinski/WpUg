//jshint browser: true, esversion:6, jquery:true

function wrapDivs() {
    var bds = document.querySelectorAll('.bd'); 
    for (let i = 0; i < bds.length; i++) {
        bds[i].style.display = 'none';
        bds[i].setAttribute("isvisible", "false"); 
    } 
}

function changeNextDivShowOnClick () {
    let bd = this.nextElementSibling;
    if (bd.getAttribute("isvisible") === "false" ) {
        bd.style.display = "block";
        bd.setAttribute("isvisible", "true"); 
    } else {
        bd.style.display = "none";
        bd.setAttribute("isvisible", "false"); 
    }
}

function changeNextDivShowOnMouseOver () {
    let bd = this.nextElementSibling;
    if(bd.getAttribute("isvisible") === "true" ){
        return;
    }
    if (bd.style.display === "none") {
        bd.style.display = "block";
    }
}

function changeNextDivShowOnMouseOut () {
    let bd = this.nextElementSibling;
    if(bd.getAttribute("isvisible") === "true" ){
        return;
    }
    if (bd.style.display === "block") {
        bd.style.display = "none";
    }
}

function addListeners () {
    let hds = document.querySelectorAll('.hd');
    for (let i = 0; i < hds.length; i++) {
        hds[i].addEventListener('click', changeNextDivShowOnClick, false);
        hds[i].addEventListener('mouseover', changeNextDivShowOnMouseOver, false);
        hds[i].addEventListener('mouseout', changeNextDivShowOnMouseOut, false);
    } 
}

function initApp() {
    wrapDivs();
    addListeners () ;
}

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    initApp();
  }
});