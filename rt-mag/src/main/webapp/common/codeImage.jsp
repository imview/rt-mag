<%@ page contentType="image/jpeg"
	import="java.util.HashMap,java.text.SimpleDateFormat,java.util.Date,java.awt.Color,java.awt.Font,java.awt.Graphics2D,java.awt.image.BufferedImage,java.io.IOException,java.io.OutputStream,java.util.Random,javax.imageio.ImageIO"%>
<%!public class RandomGraphic {
		private int wordHeight = 10;
		private int wordWidth = 15;
		private int fontSize = 25;
		private static final int MAX_CHARCOUNT = 16;
		public Color[] CHAR_COLOR = { Color.RED, Color.BLUE, Color.GREEN,
				Color.MAGENTA, Color.BLACK };
		public static final String GRAPHIC_JPEG = "JPEG";
		private final int initypos = 5;
		private int charCount = 0;

		private Random r = new Random();

		protected RandomGraphic(int charCount) {
			this.charCount = charCount;
		}

		public String drawAlpha(String graphicFormat, OutputStream out)
				throws IOException {
			String charValue = "";
			charValue = randAlpha();
			return draw(charValue, graphicFormat, out);
		}

		private String draw(String charValue, String graphicFormat,
				OutputStream out) throws IOException {

			int w = (charCount + 1) * wordWidth;
			int h = wordHeight * 3;

			BufferedImage bi = new BufferedImage(w, h,
					BufferedImage.TYPE_3BYTE_BGR);
			Graphics2D g = bi.createGraphics();

			Color backColor = Color.WHITE;
			g.setBackground(backColor);
			g.fillRect(0, 0, w, h);
			g.setFont(new Font(null, Font.BOLD, fontSize));

			g.setColor(getRandColor(200, 255));
			for (int i = 0; i < 200; i++) {
				int x = r.nextInt(w);
				int y = r.nextInt(h);
				int xl = r.nextInt(12);
				int yl = r.nextInt(12);
				g.drawLine(x, y, x + xl, y + yl);
			}

			int size = CHAR_COLOR.length;
			for (int i = 0; i < charCount; i++) {
				String c = charValue.substring(i, i + 1);
				Color color = CHAR_COLOR[randomInt(0, size)];
				g.setColor(color);
				int xpos = (i + 1) * wordWidth;

				int ypos = randomInt(initypos + wordHeight, initypos
						+ wordHeight * 2);
				g.drawString(c, xpos, ypos);
			}
			g.dispose();
			bi.flush();

			ImageIO.write(bi, graphicFormat, out);
			return charValue;
		}

		private String randAlpha() {
			String charValue = "";

			for (int i = 0; i < charCount; i++) {
				char c = (char) (randomInt(0, 26) + 'a');
				charValue += String.valueOf(c);
			}
			return charValue;
		}

		protected int randomInt(int from, int to) {
			return from + r.nextInt(to - from);
		}

		private Color getRandColor(int fc, int bc) {
			Random random = new Random();
			if (fc > 255)
				fc = 255;
			if (bc > 255)
				bc = 255;
			int r = fc + random.nextInt(bc - fc);
			int g = fc + random.nextInt(bc - fc);
			int b = fc + random.nextInt(bc - fc);
			return new Color(r, g, b);
		}
	}%>
<%
	//out.clear();
	//out = pageContext.pushBody();
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
	response.setContentType("image/jpg");
	RandomGraphic rg = new RandomGraphic(4);
	ServletOutputStream output = response.getOutputStream();
	String v ="";
    
      try{ 
      v = rg.drawAlpha(RandomGraphic.GRAPHIC_JPEG, output);
      }catch(Exception e)  
   
    {  
     
      System.out.println(e.getMessage());
   // e.printStackTrace();  
    }
      out.clear(); 
    // out.clearBuffer();
	out = pageContext.pushBody();
    //System.out.println(v);
   
	//out = pageContext.pushBody();
    HashMap map = new HashMap();
    map.put("code",v);
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
    String curTime = sdf.format(new Date());
    map.put("time",curTime);
    System.out.println("code="+map.get("code"));
    session.setAttribute("SVER_CD", map);
    map=(HashMap)session.getAttribute("SVER_CD");
    //System.out.println("code1="+map.get("code"));

%>
