/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostBinding, HostListener } from "@angular/core";
import { DndDraggableDirective } from "./dnd-draggable.directive";
var DndHandleDirective = /** @class */ (function () {
    function DndHandleDirective(parent) {
        this.draggable = true;
        parent.registerDragHandle(this);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    DndHandleDirective.prototype.onDragEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event._dndUsingHandle = true;
    };
    DndHandleDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[dndHandle]"
                },] }
    ];
    /** @nocollapse */
    DndHandleDirective.ctorParameters = function () { return [
        { type: DndDraggableDirective }
    ]; };
    DndHandleDirective.propDecorators = {
        draggable: [{ type: HostBinding, args: ["attr.draggable",] }],
        onDragEvent: [{ type: HostListener, args: ["dragstart", ["$event"],] }, { type: HostListener, args: ["dragend", ["$event"],] }]
    };
    return DndHandleDirective;
}());
export { DndHandleDirective };
if (false) {
    /** @type {?} */
    DndHandleDirective.prototype.draggable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLWhhbmRsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJhZy1kcm9wLyIsInNvdXJjZXMiOlsiZG5kLWhhbmRsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRTtJQVFFLDRCQUFhLE1BQTRCO1FBRnpDLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFJZixNQUFNLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFJRCx3Q0FBVzs7OztJQUZYLFVBRWEsS0FBYztRQUV6QixLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDOztnQkFsQkYsU0FBUyxTQUFFO29CQUNWLFFBQVEsRUFBRSxhQUFhO2lCQUN4Qjs7OztnQkFKUSxxQkFBcUI7Ozs0QkFPM0IsV0FBVyxTQUFFLGdCQUFnQjs4QkFRN0IsWUFBWSxTQUFFLFdBQVcsRUFBRSxDQUFFLFFBQVEsQ0FBRSxjQUN2QyxZQUFZLFNBQUUsU0FBUyxFQUFFLENBQUUsUUFBUSxDQUFFOztJQUt4Qyx5QkFBQztDQUFBLEFBbkJELElBbUJDO1NBaEJZLGtCQUFrQjs7O0lBRTdCLHVDQUNpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERuZEV2ZW50IH0gZnJvbSBcIi4vZG5kLXV0aWxzXCI7XHJcbmltcG9ydCB7IERuZERyYWdnYWJsZURpcmVjdGl2ZSB9IGZyb20gXCIuL2RuZC1kcmFnZ2FibGUuZGlyZWN0aXZlXCI7XHJcblxyXG5ARGlyZWN0aXZlKCB7XHJcbiAgc2VsZWN0b3I6IFwiW2RuZEhhbmRsZV1cIlxyXG59IClcclxuZXhwb3J0IGNsYXNzIERuZEhhbmRsZURpcmVjdGl2ZSB7XHJcblxyXG4gIEBIb3N0QmluZGluZyggXCJhdHRyLmRyYWdnYWJsZVwiIClcclxuICBkcmFnZ2FibGUgPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvciggcGFyZW50OkRuZERyYWdnYWJsZURpcmVjdGl2ZSApIHtcclxuXHJcbiAgICBwYXJlbnQucmVnaXN0ZXJEcmFnSGFuZGxlKCB0aGlzICk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCBcImRyYWdzdGFydFwiLCBbIFwiJGV2ZW50XCIgXSApXHJcbiAgQEhvc3RMaXN0ZW5lciggXCJkcmFnZW5kXCIsIFsgXCIkZXZlbnRcIiBdIClcclxuICBvbkRyYWdFdmVudCggZXZlbnQ6RG5kRXZlbnQgKSB7XHJcblxyXG4gICAgZXZlbnQuX2RuZFVzaW5nSGFuZGxlID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuIl19