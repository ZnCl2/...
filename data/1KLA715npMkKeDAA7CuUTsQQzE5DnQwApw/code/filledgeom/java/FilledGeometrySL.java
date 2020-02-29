package graphics_rendering.filledgeom.geom_03;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferInt;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class FilledGeometrySL
{
	public static void main(String[] args) 
	{
		new FilledGeometrySL();
	}
	
	// ============================================
	
	final int width 	= 640;
    final int height 	= 480;

    final int WHITE = toRGB(255, 255, 255);
    final int RED 	= toRGB(255, 0, 0);
    final int GREEN	= toRGB(0, 255, 0);
    final int BLUE 	= toRGB(0, 0, 255);
	
	public FilledGeometrySL()
	{
		Window wnd = new Window("Scan-Line Method");
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
		 * convert positions to float[] for reference swapping
		 */
		float[] minv = new float[] {x1,y1}; 
		float[] midv = new float[] {x2,y2}; 
		float[] maxv = new float[] {x3,y3};
		
		/*
		 * sort vertices from top to bottom
		 */
		float[] temp;
		if (maxv[1] < midv[1])
			{temp = maxv; maxv = midv; midv = temp;}
		if (midv[1] < minv[1])
			{temp = midv; midv = minv; minv = temp;}
		if (maxv[1] < midv[1])
			{temp = maxv; maxv = midv; midv = temp;}
		
		/*
		 * make edges for scan-line
		 * t2b = top to bottom
		 * t2m = top to middle
		 * m2b = middle to bottom
		 * get the y range of the triangle
		 */
		Edge t2b = new Edge(minv, maxv);
		Edge t2m = new Edge(minv, midv);
		Edge m2b = new Edge(midv, maxv);
		
		int ymin = t2b.getStart();
		int ymid = t2m.getEnd();
		int ymax = t2b.getEnd();
		
		/*
		 * get triangle handiness from area, left or right
		 */
		float a = cross(minv[0],minv[1], maxv[0],maxv[1], midv[0],midv[1]);
		boolean hand = a >= 0; 
		
		/*
		 * draw top half
		 */
		Edge left = t2b;
		Edge right = t2m;
		if (hand)
		{
			left = t2m;
			right = t2b;
		}
		
		for (int y=ymin; y<ymid; y++)
		{
			// get left and right boundary
			int lbound = ceil(left.getX());
			int rbound = ceil(right.getX());
			
			// draw line
			while(lbound < rbound)
			{
				screen.plot(lbound, y, c);
				lbound++;
			}
			
			// step one down
			left.step();
			right.step();
		}
		
		/*
		 * draw bottom half
		 */
		left = t2b;
		right = m2b;
		if (hand)
		{
			left = m2b;
			right = t2b;
		}
		
		for (int y=ymid; y<ymax; y++)
		{
			// get left and right boundary
			int lbound = ceil(left.getX());
			int rbound = ceil(right.getX());
			
			// draw line
			while(lbound < rbound)
			{
				screen.plot(lbound, y, c);
				lbound++;
			}
			
			// step one down
			left.step();
			right.step();
		}
	}
	
	/*
	 * only works for positive values, does not check overflow
	 */
	int ceil(float x)
	{
		return (int)x + 1;
	}
	
	/*
	 * determine the triangle handiness using a 2d cross product
	 */
	float cross(float x1, float y1, 
				 float x2, float y2, 
				 float x3, float y3) 
	{
		return (x2-x1)*(y3-y1)-(x3-x1)*(y2-y1);
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
 * a class to represent an edge of a triangle
 */
class Edge 
{
	/*
	 * stepping values
	 */
	private float x;
	private float xstep;
	private int ystart;
	private int yend;
	
	/*
	 * step along the edge of a triangle top down down the y axes.
	 * use ceil() to conform to fill convention.
	 * the presteps are used to correct for cast truncations so are math stays correct.
	 */
	public Edge(float[] v1, float[] v2)
	{
		// get float values
		float x1f = v1[0];
		float y1f = v1[1];
		
		float x2f = v2[0];
		float y2f = v2[1];
		
		/*
		 * get vertical stepping
		 */
		ystart 			= (int)StrictMath.ceil(y1f);
		yend 			= (int)StrictMath.ceil(y2f);
		float xdelta 	= x2f - x1f;
		float ydelta 	= y2f - y1f;
		float ypre 		= (float)ystart - y1f;
		xstep 			= xdelta/ydelta;
		x 				= x1f + ypre*xstep;
	}
	
	/*
	 * step the edge tracer over the y axes
	 */
	public void step()
	{
		x += xstep;
		
	}
	
	/*
	 * get value from the edge tracer
	 */
	public float getX()
	{
		return x;
	}
	
	/*
	 * get the starting y of this edge
	 */
	public int getStart()
	{
		return ystart;
	}
	
	/*
	 * get the end y of this edge
	 */
	public int getEnd()
	{
		return yend;
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