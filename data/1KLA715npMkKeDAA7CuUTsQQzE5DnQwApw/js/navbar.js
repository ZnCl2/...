var content = document.getElementById("content");
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function checkStickyNavBar() 
{
	if (window.pageYOffset >= sticky) 
  	{
		navbar.classList.add("sticky");
		content.classList.add("sticky");
  	} 
  	else 
  	{
  		navbar.classList.remove("sticky");
		content.classList.remove("sticky");
  	}
}