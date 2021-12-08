export class RenderCanvas {
  public canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
  public ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");

  constructor() {
    this.canvas.width = window.innerWidth - 30;
    this.canvas.height = window.innerHeight * 2;
  }

  public makeNode(x: number, y: number, data: number): void {
    if (this.ctx !== null) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, 20, 0, 2 * Math.PI);
      this.ctx.fillStyle = "white";
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
  public createText(x: number, y: number, data: number): void {
    if (this.ctx !== null) {
      this.ctx.fillStyle = "black";
      this.ctx.fillText(data.toString(), x - 10, y + 5);
    }
  }
  public joinNode(x: number, y: number, toX: number, toY: number): void {
    if (this.ctx !== null) {
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(toX, toY);
      this.ctx.stroke();
    }
  }
}

