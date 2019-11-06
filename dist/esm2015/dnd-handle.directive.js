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
        this.parent = parent;
        this.draggable = true;
        parent.registerDragHandle(this);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragEvent(event) {
        this.parent.toggleDragLock(false, null, true);
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
    /**
     * @type {?}
     * @private
     */
    DndHandleDirective.prototype.parent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLWhhbmRsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJhZy1kcm9wLyIsInNvdXJjZXMiOlsiZG5kLWhhbmRsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUtsRSxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBSzdCLFlBQW9CLE1BQTRCO1FBQTVCLFdBQU0sR0FBTixNQUFNLENBQXNCO1FBRmhELGNBQVMsR0FBRyxJQUFJLENBQUM7UUFJZixNQUFNLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFJRCxXQUFXLENBQUUsS0FBYztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7OztZQWxCRixTQUFTLFNBQUU7Z0JBQ1YsUUFBUSxFQUFFLGFBQWE7YUFDeEI7Ozs7WUFKUSxxQkFBcUI7Ozt3QkFPM0IsV0FBVyxTQUFFLGdCQUFnQjswQkFRN0IsWUFBWSxTQUFFLFdBQVcsRUFBRSxDQUFFLFFBQVEsQ0FBRSxjQUN2QyxZQUFZLFNBQUUsU0FBUyxFQUFFLENBQUUsUUFBUSxDQUFFOzs7O0lBVHRDLHVDQUNpQjs7Ozs7SUFFTCxvQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEbmRFdmVudCB9IGZyb20gXCIuL2RuZC11dGlsc1wiO1xyXG5pbXBvcnQgeyBEbmREcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tIFwiLi9kbmQtZHJhZ2dhYmxlLmRpcmVjdGl2ZVwiO1xyXG5cclxuQERpcmVjdGl2ZSgge1xyXG4gIHNlbGVjdG9yOiBcIltkbmRIYW5kbGVdXCJcclxufSApXHJcbmV4cG9ydCBjbGFzcyBEbmRIYW5kbGVEaXJlY3RpdmUge1xyXG5cclxuICBASG9zdEJpbmRpbmcoIFwiYXR0ci5kcmFnZ2FibGVcIiApXHJcbiAgZHJhZ2dhYmxlID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJlbnQ6RG5kRHJhZ2dhYmxlRGlyZWN0aXZlICkge1xyXG5cclxuICAgIHBhcmVudC5yZWdpc3RlckRyYWdIYW5kbGUoIHRoaXMgKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoIFwiZHJhZ3N0YXJ0XCIsIFsgXCIkZXZlbnRcIiBdIClcclxuICBASG9zdExpc3RlbmVyKCBcImRyYWdlbmRcIiwgWyBcIiRldmVudFwiIF0gKVxyXG4gIG9uRHJhZ0V2ZW50KCBldmVudDpEbmRFdmVudCApIHtcclxuICAgIHRoaXMucGFyZW50LnRvZ2dsZURyYWdMb2NrKGZhbHNlLCBudWxsLCB0cnVlKTtcclxuICAgIGV2ZW50Ll9kbmRVc2luZ0hhbmRsZSA9IHRydWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==