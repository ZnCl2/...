package graphics_rendering.plotgeometry.geom_01;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferInt;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class PlottingGeometry
{
	public static void main(String[] args) 
	{
		new PlottingGeometry();
	}
	
	// ============================================
	
	final int width 	= 640;
    final int height 	= 480;

    final int RED 	= toRGB(255, 0, 0);
    final int GREEN	= toRGB(0, 255, 0);
    final int BLUE 	= toRGB(0, 0, 255);
	
	public PlottingGeometry()
	{
		Window wnd = new Window("Unfilled Geometry");
		Surface srf = new Surface(width, height);
		
		wnd.addSurface(srf);
		wnd.setVisible(true);

		ellipse(320,240,  120,80, RED, srf);
		//circle(320,240,  60, RED, srf);
		//line(300,200,  400,10, RED, srf);
		//rect(200,100,  200,100, GREEN, srf);
		//triangle(100,100, 200,190, 120,300, GREEN, srf);
		
		
	}
	
	/*
	 * convert three values ranging from 0-255 into a color representation.
	 * r = red
	 * g = green
	 * b = blue
	 */
	public int toRGB(int r, int g, int b)
	{
		return ( r<<16 | g<<8 | b );
	}
	
	
	/*
	 * draw ellipse around the center (xc,yc)
	 */
	public void ellipse(int xc, int yc, int width, int height, int color, Surface srf)
	{
	    int a2 = width * width;
	    int b2 = height * height;
	    int fa2 = a2<<2, fb2 = b2<<2;
	    int incX, incY, x, y, sigma;
	    
	    /* 
	     * top poles 
	     */
	    incX = 0;
	    incY = a2*height;
	    sigma = a2-((a2*height-b2)<<1);
	    for (x = 0, y = height; incX <= incY; x++)
	    {
	    	srf.plot(xc + x, yc + y, color);
	    	srf.plot(xc - x, yc + y, color);
	    	srf.plot(xc + x, yc - y, color);
	    	srf.plot(xc - x, yc - y, color);
	        if (sigma >= 0)
	        {
	            sigma += fa2 * (1 - y);
	            y--;
	            incY -= a2;
	        }
	        sigma += b2 * ((x<<2) + 6);
	        incX += b2;
	    }
	    
	    /*
	     * sides
	     */
	    incX = b2*width;
	    incY = 0;
	    sigma = b2-((b2*width-a2)<<1);
	    for (x = width, y = 0; incY <= incX; y++)
	    {
	    	srf.plot(xc + x, yc + y, color);
	        srf.plot(xc - x, yc + y, color);
	        srf.plot(xc + x, yc - y, color);
	        srf.plot(xc - x, yc - y, color);
	        if (sigma >= 0)
	        {
	            sigma += fb2 * (1 - x);
	            x--;
	            incX -= b2;
	        }
	        sigma += a2 * ((y<<2) + 6);
	        incY += a2;
	    }
	}
	
	/*
	 * Bresenham circle algorithm
	 */
	public void circle(int cx, int cy, int r, int c, Surface screen)
	{
		int x,y,xC,yC,radErr;
		
		x = r;
		y = 0;
		xC = 1-(r+r);
		yC = 1;
		radErr = 0;
		
		while( x>= y)
		{
			screen.plot(cx+x, cy+y, c);
			screen.plot(cx-x, cy+y, c);
			screen.plot(cx-x, cy-y, c);
			screen.plot(cx+x, cy-y, c);
			screen.plot(cx+y, cy+x, c);
			screen.plot(cx-y, cy+x, c);
			screen.plot(cx-y, cy-x, c);
			screen.plot(cx+y, cy-x, c);
			
			y++;
			radErr += yC;
			yC += 2;
			
			if ( (radErr+radErr+xC) > 0 )
			{
				x--;
				radErr += xC;
				xC += 2;
			}
		}
	}
	
	/*
	 * Bresenham line primitive
	 */
	public void line(int x1,int y1,int x2,int y2, int c, Surface screen)
	{
		int dx = x2 - x1;
		int dy = y2 - y1;
		dx = (dx < 0)? -dx : dx;
		dy = (dy < 0)? -dy : dy;
		int sx = (x1 < x2)? 1 : -1;
		int sy = (y1 < y2)? 1 : -1;
		int err = dx - dy;
		int x = x1, y = y1;
		
		while (true) 
		{
			screen.plot(x, y, c);
			
		    if (x == x2)
		    if (y == y2)
		        break;
		    
		    int e2 = err << 1;
		    
		    if (e2 > -dy) 
		    {
		        err = err - dy;
		        x += sx;
		    }
		    
		    if (e2 < dx) 
		    {
		        err = err + dx;
		        y += sy;
		    }
		}
	}
	
	/*
	 * draw a rectangle to a screen of the given color c
	 */
	public void rect(int x, int y, int w, int h, 
					 int c, Surface screen)
	{
		line(  x,   y, x+w,   y, c, screen);
		line(x+w,   y, x+w, y+h, c, screen);
		line(x+w, y+h, x,   y+h, c, screen);
		line(x,   y+h, x,     y, c, screen);
	}
	
	/*
	 * a triangle
	 */
	public void triangle(int x1, int y1,
						 int x2, int y2,
						 int x3, int y3, 
						 int c, Surface screen)
	{
		line(x1,y1, x2,y2, c, screen);
		line(x2,y2, x3,y3, c, screen);
		line(x3,y3, x1,y1, c, screen);
	}
	
}

/*
 * A class to contain pixel data for our window to draw.
 */
class Surface extends JPanel
{
	private static final long serialVersionUID = 8224004759629210049L;
	
	/*
	 * internal image to draw on, and for the surface to render to the JPanel
	 */
	private BufferedImage img;
	private int[] pixels;
	private int width = 0;
	
	public Surface(int width, int height)
	{
		this.setPreferredSize(new Dimension(width, height) );
		img = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		pixels 	= ((DataBufferInt) img.getRaster().getDataBuffer()).getData();
		this.width = width;
	}
	
	@Override
	public void paintComponent(Graphics g) 
	{
        g.drawImage(img, 0, 0, null);
        g.dispose();
	}
	
	/*
	 * draw a single pixel on the surface
	 */
	public void plot(int x, int y, int rgb)
	{
		int i = x + y*width;
		pixels[i] = rgb;
	}
}

/*
 * Window class.
 */
class Window extends JFrame
{
	private static final long serialVersionUID = 430959593579646079L;
	
	/*
	 * create a window of the given dimensions, 
	 * no resize and hitting the X-button 
	 * will close the window.
	 */
	public Window(String title)
	{
		setTitle(title);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setResizable(false);
	}
	
	/*
	 * pass a Surface object for our window to display
	 */
	public void addSurface(Surface srf)
	{
		this.add(srf);
		this.pack();
		this.validate();
	}
}