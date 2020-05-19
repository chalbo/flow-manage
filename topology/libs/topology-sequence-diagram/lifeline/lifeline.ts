import { Node } from 'topology-core/models/node';

export function lifeline(ctx: CanvasRenderingContext2D, node: Node) {
  const height = 50;
  const wr = node.rect.width * node.borderRadius;
  const hr = height * node.borderRadius;
  let r = wr < hr ? wr : hr;
  if (node.rect.width < 2 * r) {
    r = node.rect.width / 2;
  }
  if (height < 2 * r) {
    r = height / 2;
  }
  ctx.beginPath();
  ctx.moveTo(node.rect.x + r, node.rect.y);
  ctx.arcTo(node.rect.x + node.rect.width, node.rect.y, node.rect.x + node.rect.width, node.rect.y + height, r);
  ctx.arcTo(node.rect.x + node.rect.width, node.rect.y + height, node.rect.x, node.rect.y + height, r);
  ctx.arcTo(node.rect.x, node.rect.y + height, node.rect.x, node.rect.y, r);
  ctx.arcTo(node.rect.x, node.rect.y, node.rect.x + node.rect.width, node.rect.y, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.setLineDash([7, 7]);
  const middle = node.rect.x + node.rect.width / 2;
  ctx.moveTo(middle, node.rect.y + height + 1);
  ctx.lineTo(middle, node.rect.ey);
  ctx.stroke();
  ctx.restore();
}
