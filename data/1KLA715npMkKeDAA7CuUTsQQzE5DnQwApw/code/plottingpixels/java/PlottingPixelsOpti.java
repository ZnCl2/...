package graphics_rendering.plottingpixels.pixel_02;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferInt;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class PlottingPixelsOpti
{
	public static void main(String[] args) 
	{
		new PlottingPixelsOpti();
	}
	
	// ============================================
	
	int width = 640;
    int height = 480;
	
	public PlottingPixelsOpti()
	{
		Window wnd = new Window("Optimized Pixel Plotting");
		Surface srf = new Surface(width, height);
		
		wnd.addSurface(srf);
		wnd.setVisible(true);
		
		// plot a pixel at (100,100) of the color magenta
		srf.plot(100, 100, toRGB(255, 0, 255) );
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