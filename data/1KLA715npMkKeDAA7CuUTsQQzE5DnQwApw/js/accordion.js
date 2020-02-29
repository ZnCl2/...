var acc = document.getElementsByClassName("accordion");
var i,l;

for (i=0,l=acc.length; i < l; i++) 
{
	acc[i].addEventListener("click", function() 
	{
	    this.classList.toggle("active");
	    var panel = this.nextElementSibling;
	    if (panel.style.maxHeight)
	    {
	    	panel.style.maxHeight = null;
	    } 
	    else 
	    {
	    	panel.style.maxHeight = panel.scrollHeight + "px";
	    } 
	});
}
