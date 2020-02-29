
/*
 * encapsulate latex rendering
 */
function render(id,latex)
{
	var el = document.getElementById(id);
	katex.render(latex, el);
}

/*
 * returns a the given values as a fraction between each other.
 */
function frac(num,den)
{
	return "\\frac{"+num+"}{"+den+"}";
}

/*
 * returns the floor of the given input
 */
function floor(input)
{
	return "\\left \\lfloor " + input + " \\right \\rfloor";
}

/*
 * returns a 3 element column vector
 */
function vector_3(x,y,z)
{
	return "\\begin{pmatrix}"+x+"\\\\ "+y+"\\\\ "+z+" \\end{pmatrix}";
}

/*
 * returns a column matrix with length of 2
 */
function matrix_1_2(a0,a1)
{
	return "\\begin{bmatrix}"+a0+"\\\\ "+a1+" \\end{bmatrix}";
}

/*
 * returns a 2x2 matrix
 */
function matrix_2_2(a00,a01,a10,a11)
{
	return "\\begin{bmatrix}"+a00+"&"+a01+"\\\\ "+a10+"&"+a11+"\\\\ "+" \\end{bmatrix}";
}