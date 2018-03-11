window.onscroll = () => {
  const nav = document.querySelector('#navbar');
  if(this.scrollY <= window.innerHeight/5) nav.className = ''; else nav.className = 'nav-scroll';
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
	// document.getElementById('div_register').setAttribute("style","width:500px");
})