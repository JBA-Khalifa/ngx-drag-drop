import { DndEvent } from "./dnd-utils";
import { DndDraggableDirective } from "./dnd-draggable.directive";
export declare class DndHandleDirective {
    private parent;
    draggable: boolean;
    constructor(parent: DndDraggableDirective);
    onDragEvent(event: DndEvent): void;
}
