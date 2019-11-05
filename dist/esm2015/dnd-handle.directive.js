/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostBinding, HostListener } from "@angular/core";
import { DndDraggableDirective } from "./dnd-draggable.directive";
export class DndHandleDirective {
    /**
     * @param {?} parent
     */
    constructor(parent) {
        this.draggable = true;
        parent.registerDragHandle(this);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragEvent(event) {
        event._dndUsingHandle = true;
    }
}
DndHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: "[dndHandle]"
            },] }
];
/** @nocollapse */
DndHandleDirective.ctorParameters = () => [
    { type: DndDraggableDirective }
];
DndHandleDirective.propDecorators = {
    draggable: [{ type: HostBinding, args: ["attr.draggable",] }],
    onDragEvent: [{ type: HostListener, args: ["dragstart", ["$event"],] }, { type: HostListener, args: ["dragend", ["$event"],] }]
};
if (false) {
    /** @type {?} */
    DndHandleDirective.prototype.draggable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLWhhbmRsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJhZy1kcm9wLyIsInNvdXJjZXMiOlsiZG5kLWhhbmRsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUtsRSxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBSzdCLFlBQWEsTUFBNEI7UUFGekMsY0FBUyxHQUFHLElBQUksQ0FBQztRQUlmLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUlELFdBQVcsQ0FBRSxLQUFjO1FBRXpCLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7OztZQWxCRixTQUFTLFNBQUU7Z0JBQ1YsUUFBUSxFQUFFLGFBQWE7YUFDeEI7Ozs7WUFKUSxxQkFBcUI7Ozt3QkFPM0IsV0FBVyxTQUFFLGdCQUFnQjswQkFRN0IsWUFBWSxTQUFFLFdBQVcsRUFBRSxDQUFFLFFBQVEsQ0FBRSxjQUN2QyxZQUFZLFNBQUUsU0FBUyxFQUFFLENBQUUsUUFBUSxDQUFFOzs7O0lBVHRDLHVDQUNpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERuZEV2ZW50IH0gZnJvbSBcIi4vZG5kLXV0aWxzXCI7XHJcbmltcG9ydCB7IERuZERyYWdnYWJsZURpcmVjdGl2ZSB9IGZyb20gXCIuL2RuZC1kcmFnZ2FibGUuZGlyZWN0aXZlXCI7XHJcblxyXG5ARGlyZWN0aXZlKCB7XHJcbiAgc2VsZWN0b3I6IFwiW2RuZEhhbmRsZV1cIlxyXG59IClcclxuZXhwb3J0IGNsYXNzIERuZEhhbmRsZURpcmVjdGl2ZSB7XHJcblxyXG4gIEBIb3N0QmluZGluZyggXCJhdHRyLmRyYWdnYWJsZVwiIClcclxuICBkcmFnZ2FibGUgPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvciggcGFyZW50OkRuZERyYWdnYWJsZURpcmVjdGl2ZSApIHtcclxuXHJcbiAgICBwYXJlbnQucmVnaXN0ZXJEcmFnSGFuZGxlKCB0aGlzICk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCBcImRyYWdzdGFydFwiLCBbIFwiJGV2ZW50XCIgXSApXHJcbiAgQEhvc3RMaXN0ZW5lciggXCJkcmFnZW5kXCIsIFsgXCIkZXZlbnRcIiBdIClcclxuICBvbkRyYWdFdmVudCggZXZlbnQ6RG5kRXZlbnQgKSB7XHJcblxyXG4gICAgZXZlbnQuX2RuZFVzaW5nSGFuZGxlID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuIl19