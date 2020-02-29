package graphics_rendering.filledgeom.geom_01;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferInt;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class FilledGeometryRect
{
	public static void main(String[] args) 
	{
		new FilledGeometryRect();
	}
	
	// ============================================
	
	final int width 	= 640;
    final int height 	= 480;

    final int WHITE = toRGB(255, 255, 255);
    final int RED 	= toRGB(255, 0, 0);
    final int GREEN	= toRGB(0, 255, 0);
    final int BLUE 	= toRGB(0, 0, 255);
	
	public FilledGeometryRect()
	{
		Window wnd = new Window("A Rectangle");
		Surface srf = new Surface(width, height);
		
		wnd.addSurface(srf);
		wnd.setVisible(true);
		
		rect(100,100, 50,80, RED, srf);
		
	}
	
	public void rect(int px, int py, int w, int h, int c, Surface screen) 
	{
		int wmax = screen.getWidth();
		int hmax = screen.getHeight();
		
		int x = px - (w>>1);
		int y = py - (h>>1);
		
		int xoff = (x<0)?-x:0;
		int yoff = (y<0)?-y:0;
		w = ((w+x) >= wmax)? -x+wmax :w;
		h = ((h+y) >= hmax)? -y+hmax :h;
		
		for (int j=yoff,k=h; j<k; j++)
		for (int i=xoff,l=w; i<l; i++)
			screen.plot(i+x, j+y, c);
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