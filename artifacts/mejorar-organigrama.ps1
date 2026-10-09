param([Parameter(Mandatory=$true)][string]$Source, [Parameter(Mandatory=$true)][string]$Destination)
$ErrorActionPreference = 'Stop'
if (Test-Path -LiteralPath $Destination) { throw 'El destino ya existe.' }
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class EjcImageEnhancement {
  public static void Process(string source, string destination) {
    using(var input = new Bitmap(source))
    using(var native = new Bitmap(input.Width, input.Height, PixelFormat.Format32bppArgb)) {
      using(var graphics = Graphics.FromImage(native)) graphics.DrawImageUnscaled(input, 0, 0);
      var rect = new Rectangle(0,0,native.Width,native.Height);
      var data = native.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
      int stride = data.Stride, w=native.Width, h=native.Height;
      byte[] pixels = new byte[stride*h];
      Marshal.Copy(data.Scan0,pixels,0,pixels.Length);
      byte[] filtered = (byte[])pixels.Clone();
      int[] kernel = {1,2,1};
      // Mild unsharp mask on the native pixels. No OCR or text regeneration.
      for(int y=1;y<h-1;y++) for(int x=1;x<w-1;x++) for(int c=0;c<3;c++) {
        int sum=0;
        for(int dy=-1;dy<=1;dy++) for(int dx=-1;dx<=1;dx++)
          sum += pixels[(y+dy)*stride+(x+dx)*4+c]*kernel[dy+1]*kernel[dx+1];
        int index=y*stride+x*4+c;
        double difference=pixels[index]-sum/16.0;
        double value=pixels[index]+(Math.Abs(difference)>=4 ? 0.70*difference : 0);
        filtered[index]=(byte)Math.Max(0,Math.Min(255,Math.Round(value)));
      }
      Marshal.Copy(filtered,0,data.Scan0,filtered.Length);
      native.UnlockBits(data);
      using(var enlarged = new Bitmap(w*4,h*4,PixelFormat.Format24bppRgb)) {
        enlarged.SetResolution(300,300);
        using(var graphics = Graphics.FromImage(enlarged))
        using(var attributes = new ImageAttributes()) {
          graphics.Clear(Color.White);
          graphics.CompositingQuality=CompositingQuality.HighQuality;
          graphics.InterpolationMode=InterpolationMode.HighQualityBicubic;
          graphics.PixelOffsetMode=PixelOffsetMode.HighQuality;
          attributes.SetWrapMode(WrapMode.TileFlipXY);
          graphics.DrawImage(native,new Rectangle(0,0,enlarged.Width,enlarged.Height),0,0,w,h,GraphicsUnit.Pixel,attributes);
        }
        enlarged.Save(destination,ImageFormat.Png);
        Console.WriteLine("PNG ampliado: {0} x {1}; 300 ppp; enfoque convencional; sin regenerar textos",enlarged.Width,enlarged.Height);
      }
    }
  }
}
'@
[EjcImageEnhancement]::Process($Source, $Destination)
