import { Node } from '../../models/node';
import { Rect } from '../../models/rect';

export function peopleIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function peopleTextRect(node: Node) {
  node.textRect = new Rect(0, 0, 0, 0);
  node.fullTextRect = node.textRect;
}
