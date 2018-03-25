window.onscroll = () => {
  const nav = document.querySelector('#navbar');
  if(this.scrollY <= window.innerHeight/20) {
    nav.classList.remove('nav-scroll');
  } else {
    if (!nav.classList.contains('nav-scroll')) {
        nav.classList.add('nav-scroll');
    }
  }
};

// looks like this wont be super scalable with other js snippets.

function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

ready(function() {
	const hero = document.querySelector('#hero-container');
	hero.setAttribute('style', 'width:'+window.innerWidth+'px');
	hero.setAttribute('style', 'height:'+window.innerHeight+'px');

});


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function toggleMobileNav() {
    var nav = document.getElementById('navbar');
    if (nav.classList.contains('responsive')) {
        nav.classList.remove('responsive');
    } else {
        nav.classList.add('responsive');
    }
}

