package graphics_rendering.image_01;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferInt;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class ImageRendering
{
	public static void main(String[] args) 
	{
		new ImageRendering();
	}
	
	// ============================================
	
	public int width,height;
	
	public ImageRendering()
	{
		/*
		 * load image and make a window of the same size
		 */
		IntBuffer image = file( "absolute/path/to/your/image.png" );
		width = image.getWidth();
		height = image.getHeight();
		
		Window wnd = new Window(width, height);
		Surface srf = new Surface(width, height);
		wnd.addSurface(srf);
		
		/*
		 * draw and tell the window to repaint the view
		 */
		draw(0,0, image, srf);
		wnd.repaint();
		wnd.setVisible(true);
	}
	
	/*
	 * read a file into a texture
	 * returns an ImageTexture
	 * it loads: wbmp, bmp, jpg, png, gif
	 */
	public IntBuffer file(String path)
	{
		BufferedImage image = null;
		
		// try to load an image
		try 
		{
			image = ImageIO.read(new File(path));
		}
		catch (IOException e) 
		{
			System.err.println("Could not load image '"+path+"'.");
			return new IntBuffer(0,0); // return empty image as if it's NULL
		}
		
		return convert(image);
	}
	
	/*
	 * load a resource from the project folder
	 */
	public IntBuffer resource(String directory)
	{
		// check first char for a '/'
		char c = directory.charAt(0);
		if (c != '/') directory = "/"+directory;
		
		// begin loading image
		BufferedImage image = null;
		InputStream stream = InputStream.class.getResourceAsStream(directory);
		
		if (stream!=null)
		try 
		{
			image = ImageIO.read( stream );
		} 
		catch (IOException e) 
		{
			System.err.println("Could not load resource '"+directory+"'.");
			return new IntBuffer(0,0);
		}
		
		if (image==null)
		{
			System.err.println("InputStream error from reading '"+directory+"'.");
			return new IntBuffer(0,0);
		}
		
		return convert(image);
	}
	
	/*
	 * convert BufferedImage to buffer
	 */
	private IntBuffer convert(BufferedImage image)
	{
		int width, height;
		width 	= image.getWidth();
		height 	= image.getHeight();
		
		int[] pixels = new int[width*height];
		
		int i,j,k=0;
		for(j=0; j<height; j++)
		for(i=0; i<width; i++, k++)
			pixels[k] = image.getRGB(i,j);
		
		IntBuffer tex = new IntBuffer(width,height);
		tex.plot(pixels);
		return tex;
	}
	
	/*
	 * draw a source image onto a destination image
	 */
	public void draw(int x, int y, IntBuffer source, Surface screen)
	{
		int w = source.getWidth();
		int h = source.getHeight();
		int wmax = screen.getWidth();
		int hmax = screen.getHeight();
		
		// clip negatives
		int xoff = (x<0)?-x:0;
		int yoff = (y<0)?-y:0;
		w = ((w+x) >= wmax)? -x+wmax :w;
		h = ((h+y) >= hmax)? -y+hmax :h;
		
		// draw
		for (int j=yoff,k=h; j<k; j++)
		for (int i=xoff,l=w; i<l; i++)
		{
			int c = source.grab(i, j);
			screen.plot(i+x, j+y, c);
		}
	}
}

/*
 * a container for 32bit data, like an image or basic depth buffer
 */
class IntBuffer
{
	private int[] data;
	private int width,height;
	
	public IntBuffer(int w, int h) 
	{
		width = w;
		height = h;
		data = new int[width*height];
	}
	
	public int getHeight() 
	{
		return height;
	}
	
	public int getWidth() 
	{
		return width;
	}
	
	/*
	 * exposes the entire data buffer
	 */
	public int[] getContent()
	{
		return data;
	}

	/*
	 * take a value from the buffer
	 */
	public int grab(int x, int y)
	{
		int i = x + y*width;
		return data[i];
	}
	
	/*
	 * place a value into the buffer
	 */
	public void plot(int x, int y, int d)
	{
		int i = x + y*width;
		data[i] = d;
	}
	
	/*
	 * copy over the values of one array into another.
	 * make sure they are the same length
	 */
	public void plot(int[] c)
    {
    	for (int i=0, l=c.length; i<l; i++)
    	{
    		data[i] = c[i];
    	}
    }
}

/*
 * Simple window class.
 */
class Window extends JFrame
{
	private static final long serialVersionUID = 430959593579646079L;
	
	public Window(int width, int height)
	{
		setSize(width, height);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setResizable(false);
	}
	
	public void addSurface(Surface srf)
	{
		this.add(srf);
	}
}

/*
 * A class that contains pixel data for our window.
 */
class Surface extends JPanel
{
	private static final long serialVersionUID = 8224004759629210049L;
	
	private BufferedImage img;
	private int[] pixels;
	private int width,height;
	
	public Surface(int width, int height)
	{
		img = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		pixels 	= ((DataBufferInt) img.getRaster().getDataBuffer()).getData();
		this.width = width;
		this.height = height;
	}
	
	public int getHeight() 
	{
		return height;
	}
	
	public int getWidth() 
	{
		return width;
	}
	
	@Override
	public void paintComponent(Graphics g) 
	{
        g.drawImage(img, 0, 0, null);
        g.dispose();
	}
	
	public void plot(int x, int y, int rgb)
	{
		int i = x + y*width;
		pixels[i] = rgb;
	}
}