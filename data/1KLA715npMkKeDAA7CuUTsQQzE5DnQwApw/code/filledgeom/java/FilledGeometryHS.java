package graphics_rendering.filledgeom.geom_02;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferInt;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class FilledGeometryHS
{
	public static void main(String[] args) 
	{
		new FilledGeometryHS();
	}
	
	// ============================================
	
	final int width 	= 640;
    final int height 	= 480;

    final int WHITE = toRGB(255, 255, 255);
    final int RED 	= toRGB(255, 0, 0);
    final int GREEN	= toRGB(0, 255, 0);
    final int BLUE 	= toRGB(0, 0, 255);
	
	public FilledGeometryHS()
	{
		Window wnd = new Window("Half-Space Method");
		Surface srf = new Surface(width, height);
		
		wnd.addSurface(srf);
		wnd.setVisible(true);
		
		triangle(320,100, 
				 200,230, 
				 400,330, 
				 GREEN, srf);
		
	}
	
	
	/*
	 * draws triangles counter clockwise
	 */
	void triangle(float x1, float y1,
				  float x2, float y2,
				  float x3, float y3,
				  int c, Surface screen)
	{
	    /*
	     * find the bounding rectangle
	     */
	    int minx = (int)min(x1, x2, x3);
	    int maxx = (int)max(x1, x2, x3);
	    int miny = (int)min(y1, y2, y3);
	    int maxy = (int)max(y1, y2, y3);
	    
	    /*
	     * loop through all x and y pixel sin the box
	     */
	    for(int qy = miny; qy < maxy; qy++)
	    {
	        for(int qx = minx; qx < maxx; qx++)
	        {
	            /*
	             * if all cross products result positive, plot pixel
	             */
	            if((x2 - x1) * (qy - y1) - (y2 - y1) * (qx - x1) < 0)
	            if((x3 - x2) * (qy - y2) - (y3 - y2) * (qx - x2) < 0)
	            if((x1 - x3) * (qy - y3) - (y1 - y3) * (qx - x3) < 0)
	            {
	            	screen.plot(qx, qy, c);
	            }
	        }
	    }
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
	 * find the largest number of three numbers
	 */
	public float max(float x1,float x2,float x3)
	{
		float x = (x1<x2)?x2:x1;
		return (x<x3)?x3:x;
	}
	
	/*
	 * find the smallest number of three numbers
	 */
	public float min(float x1,float x2,float x3)
	{
		float x = (x1<x2)?x1:x2;
		return (x<x3)?x:x3;
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