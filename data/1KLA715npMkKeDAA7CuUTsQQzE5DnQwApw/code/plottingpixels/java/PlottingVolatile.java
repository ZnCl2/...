package graphics_rendering.plottingpixels.pixel_03;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.GraphicsConfiguration;
import java.awt.GraphicsEnvironment;
import java.awt.Transparency;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferInt;
import java.awt.image.VolatileImage;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class PlottingVolatile
{
	public static void main(String[] args) 
	{
		new PlottingVolatile();
	}
	
	// ============================================
	
	int width = 640;
    int height = 480;
	
	public PlottingVolatile()
	{
		Window wnd = new Window("Plotting With The GPU");
		Surface srf = new Surface(width, height);
		srf.setHardwareAcceleration(true);
		wnd.addSurface(srf);
		wnd.setVisible(true);
		
		srf.plot(100, 100, toRGB(255, 0, 255) );
	}
	
	/*
	 * convert three values ranging from 0-255 into RGB.
	 */
	public int toRGB(int r, int g, int b)
	{
		return ( (255<<24) | r<<16 | g<<8 | b );
	}
}

/*
 * A class to contain pixel data for our window to draw.
 */
class Surface extends JPanel
{
	private static final long serialVersionUID = 8224004759629210049L;
	
	/*
	 * use graphic environment for hardware acceleration
	 */
	private boolean useHW = false;
	private GraphicsEnvironment ge;
	private GraphicsConfiguration gc;
	
	/*
	 * internal image to draw on, and for the surface to render to the JPanel
	 */
	private VolatileImage vbuffer;
	private BufferedImage buffer;
	private int[] pixels;
	private int height = 0;
	private int width = 0;
	
	public Surface(int width, int height)
	{
		/*
		 * get our graphics environment. this holds information about your GPU.
		 * luckily, we don't need to know specifics.
		 */
		ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
		gc = ge.getDefaultScreenDevice().getDefaultConfiguration();

		this.setPreferredSize(new Dimension(width, height) );
		buffer = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		buffer.setAccelerationPriority(1);
		pixels 	= ((DataBufferInt) buffer.getRaster().getDataBuffer()).getData();
		
		this.height = height;
		this.width = width;
	}
	
	/*
	 * Enable the hardware. This also creates a volatile buffer for us.
	 */
	public void setHardwareAcceleration(Boolean hw) 
	{
		useHW = hw;
		if (hw)
		{
			vbuffer = gc.createCompatibleVolatileImage(width, height, Transparency.OPAQUE);
			System.setProperty("sun.java2d.opengl", hw.toString()); // may not be needed.
		}
	}
	
	/*
	 * draw a single pixel on the surface
	 */
	public void plot(int x, int y, int rgb)
	{
		int i = x + y*width;
		pixels[i] = rgb;
	}
	
	/*
	 * paint the window using Hardware or Software
	 */
	@Override
	public void paintComponent(Graphics g) 
	{
        if(useHW) 
        {
        	Graphics gr = vbuffer.getGraphics();
        	gr.drawImage(buffer, 0, 0, null);
        	vbuffer.flush();
    	} 
        else 
        {
        	g.drawImage(buffer, 0, 0, null);
        	buffer.flush();
    	}
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