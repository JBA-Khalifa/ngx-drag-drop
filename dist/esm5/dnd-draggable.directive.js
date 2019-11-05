/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, NgZone, Output, Renderer2 } from "@angular/core";
import { calculateDragImageOffset, setDragData, setDragImage } from "./dnd-utils";
import { dndState, endDrag, startDrag } from "./dnd-state";
var DndDragImageRefDirective = /** @class */ (function () {
    function DndDragImageRefDirective(parent, elementRef) {
        parent.registerDragImage(elementRef);
    }
    DndDragImageRefDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[dndDragImageRef]"
                },] }
    ];
    /** @nocollapse */
    DndDragImageRefDirective.ctorParameters = function () { return [
        { type: DndDraggableDirective },
        { type: ElementRef }
    ]; };
    return DndDragImageRefDirective;
}());
export { DndDragImageRefDirective };
var DndDraggableDirective = /** @class */ (function () {
    function DndDraggableDirective(elementRef, renderer, ngZone) {
        var _this = this;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.dndEffectAllowed = "copy";
        this.dndDraggingClass = "dndDragging";
        this.dndDraggingSourceClass = "dndDraggingSource";
        this.dndDraggableDisabledClass = "dndDraggableDisabled";
        this.dndDragImageOffsetFunction = calculateDragImageOffset;
        this.dndStart = new EventEmitter();
        this.dndDrag = new EventEmitter();
        this.dndEnd = new EventEmitter();
        this.dndMoved = new EventEmitter();
        this.dndCopied = new EventEmitter();
        this.dndLinked = new EventEmitter();
        this.dndCanceled = new EventEmitter();
        this.draggable = true;
        this.isDragStarted = false;
        this.dragEventHandler = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onDrag(event); });
    }
    Object.defineProperty(DndDraggableDirective.prototype, "dndDisableIf", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.draggable = !value;
            if (this.draggable) {
                this.renderer.removeClass(this.elementRef.nativeElement, this.dndDraggableDisabledClass);
            }
            else {
                this.renderer.addClass(this.elementRef.nativeElement, this.dndDraggableDisabledClass);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DndDraggableDirective.prototype, "dndDisableDragIf", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.dndDisableIf = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DndDraggableDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.elementRef.nativeElement.addEventListener("drag", _this.dragEventHandler);
        }));
    };
    /**
     * @return {?}
     */
    DndDraggableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.removeEventListener("drag", this.dragEventHandler);
        if (this.isDragStarted === true) {
            endDrag();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DndDraggableDirective.prototype.onDragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.draggable === false) {
            return false;
        }
        // check if there is dnd handle and if the dnd handle was used to start the drag
        if (typeof this.dndHandle !== "undefined"
            && typeof event._dndUsingHandle === "undefined") {
            return false;
        }
        // initialize global state
        startDrag(event, this.dndEffectAllowed, this.dndType);
        this.isDragStarted = true;
        setDragData(event, { data: this.dndDraggable, type: this.dndType }, dndState.effectAllowed);
        this.dragImage = this.determineDragImage();
        // set dragging css class prior to setDragImage so styles are applied before
        // TODO breaking change: add class to elementRef rather than drag image which could be another element
        this.renderer.addClass(this.dragImage, this.dndDraggingClass);
        // set custom dragimage if present
        // set dragimage if drag is started from dndHandle
        if (typeof this.dndDragImageElementRef !== "undefined"
            || typeof event._dndUsingHandle !== "undefined") {
            setDragImage(event, this.dragImage, this.dndDragImageOffsetFunction);
        }
        // add dragging source css class on first drag event
        /** @type {?} */
        var unregister = this.renderer.listen(this.elementRef.nativeElement, "drag", (/**
         * @return {?}
         */
        function () {
            _this.renderer.addClass(_this.elementRef.nativeElement, _this.dndDraggingSourceClass);
            unregister();
        }));
        this.dndStart.emit(event);
        // event.stopPropagation();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DndDraggableDirective.prototype.onDrag = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dndDrag.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DndDraggableDirective.prototype.onDragEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // get drop effect from custom stored state as its not reliable across browsers
        /** @type {?} */
        var dropEffect = dndState.dropEffect;
        /** @type {?} */
        var dropEffectEmitter;
        switch (dropEffect) {
            case "copy":
                dropEffectEmitter = this.dndCopied;
                break;
            case "link":
                dropEffectEmitter = this.dndLinked;
                break;
            case "move":
                dropEffectEmitter = this.dndMoved;
                break;
            default:
                dropEffectEmitter = this.dndCanceled;
                break;
        }
        dropEffectEmitter.emit(event);
        this.dndEnd.emit(event);
        // reset global state
        endDrag();
        this.isDragStarted = false;
        this.renderer.removeClass(this.dragImage, this.dndDraggingClass);
        // IE9 special hammering
        window.setTimeout((/**
         * @return {?}
         */
        function () {
            _this.renderer.removeClass(_this.elementRef.nativeElement, _this.dndDraggingSourceClass);
        }), 0);
        event.stopPropagation();
    };
    /**
     * @param {?} handle
     * @return {?}
     */
    DndDraggableDirective.prototype.registerDragHandle = /**
     * @param {?} handle
     * @return {?}
     */
    function (handle) {
        this.dndHandle = handle;
    };
    /**
     * @param {?} elementRef
     * @return {?}
     */
    DndDraggableDirective.prototype.registerDragImage = /**
     * @param {?} elementRef
     * @return {?}
     */
    function (elementRef) {
        this.dndDragImageElementRef = elementRef;
    };
    /**
     * @private
     * @return {?}
     */
    DndDraggableDirective.prototype.determineDragImage = /**
     * @private
     * @return {?}
     */
    function () {
        // evaluate custom drag image existence
        if (typeof this.dndDragImageElementRef !== "undefined") {
            return (/** @type {?} */ (this.dndDragImageElementRef.nativeElement));
        }
        else {
            return this.elementRef.nativeElement;
        }
    };
    DndDraggableDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[dndDraggable]"
                },] }
    ];
    /** @nocollapse */
    DndDraggableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    DndDraggableDirective.propDecorators = {
        dndDraggable: [{ type: Input }],
        dndEffectAllowed: [{ type: Input }],
        dndType: [{ type: Input }],
        dndDraggingClass: [{ type: Input }],
        dndDraggingSourceClass: [{ type: Input }],
        dndDraggableDisabledClass: [{ type: Input }],
        dndDragImageOffsetFunction: [{ type: Input }],
        dndStart: [{ type: Output }],
        dndDrag: [{ type: Output }],
        dndEnd: [{ type: Output }],
        dndMoved: [{ type: Output }],
        dndCopied: [{ type: Output }],
        dndLinked: [{ type: Output }],
        dndCanceled: [{ type: Output }],
        draggable: [{ type: HostBinding, args: ["attr.draggable",] }],
        dndDisableIf: [{ type: Input }],
        dndDisableDragIf: [{ type: Input }],
        onDragStart: [{ type: HostListener, args: ["dragstart", ["$event"],] }],
        onDragEnd: [{ type: HostListener, args: ["dragend", ["$event"],] }]
    };
    return DndDraggableDirective;
}());
export { DndDraggableDirective };
if (false) {
    /** @type {?} */
    DndDraggableDirective.prototype.dndDraggable;
    /** @type {?} */
    DndDraggableDirective.prototype.dndEffectAllowed;
    /** @type {?} */
    DndDraggableDirective.prototype.dndType;
    /** @type {?} */
    DndDraggableDirective.prototype.dndDraggingClass;
    /** @type {?} */
    DndDraggableDirective.prototype.dndDraggingSourceClass;
    /** @type {?} */
    DndDraggableDirective.prototype.dndDraggableDisabledClass;
    /** @type {?} */
    DndDraggableDirective.prototype.dndDragImageOffsetFunction;
    /** @type {?} */
    DndDraggableDirective.prototype.dndStart;
    /** @type {?} */
    DndDraggableDirective.prototype.dndDrag;
    /** @type {?} */
    DndDraggableDirective.prototype.dndEnd;
    /** @type {?} */
    DndDraggableDirective.prototype.dndMoved;
    /** @type {?} */
    DndDraggableDirective.prototype.dndCopied;
    /** @type {?} */
    DndDraggableDirective.prototype.dndLinked;
    /** @type {?} */
    DndDraggableDirective.prototype.dndCanceled;
    /** @type {?} */
    DndDraggableDirective.prototype.draggable;
    /**
     * @type {?}
     * @private
     */
    DndDraggableDirective.prototype.dndHandle;
    /**
     * @type {?}
     * @private
     */
    DndDraggableDirective.prototype.dndDragImageElementRef;
    /**
     * @type {?}
     * @private
     */
    DndDraggableDirective.prototype.dragImage;
    /**
     * @type {?}
     * @private
     */
    DndDraggableDirective.prototype.isDragStarted;
    /**
     * @type {?}
     * @private
     */
    DndDraggableDirective.prototype.dragEventHandler;
    /**
     * @type {?}
     * @private
     */
    DndDraggableDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DndDraggableDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    DndDraggableDirective.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLWRyYWdnYWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJhZy1kcm9wLyIsInNvdXJjZXMiOlsiZG5kLWRyYWdnYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsd0JBQXdCLEVBQXdDLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFeEgsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRzNEO0lBS0Usa0NBQWEsTUFBNEIsRUFDNUIsVUFBcUI7UUFFaEMsTUFBTSxDQUFDLGlCQUFpQixDQUFFLFVBQVUsQ0FBRSxDQUFDO0lBQ3pDLENBQUM7O2dCQVRGLFNBQVMsU0FBRTtvQkFDVixRQUFRLEVBQUUsbUJBQW1CO2lCQUM5Qjs7OztnQkFHcUIscUJBQXFCO2dCQXBCekMsVUFBVTs7SUF5QlosK0JBQUM7Q0FBQSxBQVZELElBVUM7U0FQWSx3QkFBd0I7QUFTckM7SUFnRkUsK0JBQXFCLFVBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLE1BQWE7UUFGbEMsaUJBR0M7UUFIb0IsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQU87UUF6RWxDLHFCQUFnQixHQUFpQixNQUFNLENBQUM7UUFNeEMscUJBQWdCLEdBQUcsYUFBYSxDQUFDO1FBR2pDLDJCQUFzQixHQUFHLG1CQUFtQixDQUFDO1FBRzdDLDhCQUF5QixHQUFHLHNCQUFzQixDQUFDO1FBR25ELCtCQUEwQixHQUE4Qix3QkFBd0IsQ0FBQztRQUd4RSxhQUFR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Q0gsQ0FBQzs7Z0JBek5GLFNBQVMsU0FBRTtvQkFDVixRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjs7OztnQkE3QkMsVUFBVTtnQkFRVixTQUFTO2dCQUhULE1BQU07OzsrQkEyQkwsS0FBSzttQ0FHTCxLQUFLOzBCQUdMLEtBQUs7bUNBR0wsS0FBSzt5Q0FHTCxLQUFLOzRDQUdMLEtBQUs7NkNBR0wsS0FBSzsyQkFHTCxNQUFNOzBCQUdOLE1BQU07eUJBR04sTUFBTTsyQkFHTixNQUFNOzRCQUdOLE1BQU07NEJBR04sTUFBTTs4QkFHTixNQUFNOzRCQUdOLFdBQVcsU0FBRSxnQkFBZ0I7K0JBYTdCLEtBQUs7bUNBZUwsS0FBSzs4QkF1QkwsWUFBWSxTQUFFLFdBQVcsRUFBRSxDQUFFLFFBQVEsQ0FBRTs0QkFxRHZDLFlBQVksU0FBRSxTQUFTLEVBQUUsQ0FBRSxRQUFRLENBQUU7O0lBbUV4Qyw0QkFBQztDQUFBLEFBMU5ELElBME5DO1NBdk5ZLHFCQUFxQjs7O0lBRWhDLDZDQUNpQjs7SUFFakIsaURBQ3dDOztJQUV4Qyx3Q0FDZ0I7O0lBRWhCLGlEQUNpQzs7SUFFakMsdURBQzZDOztJQUU3QywwREFDbUQ7O0lBRW5ELDJEQUNpRjs7SUFFakYseUNBQzBFOztJQUUxRSx3Q0FDeUU7O0lBRXpFLHVDQUN3RTs7SUFFeEUseUNBQzBFOztJQUUxRSwwQ0FDMkU7O0lBRTNFLDBDQUMyRTs7SUFFM0UsNENBQzZFOztJQUU3RSwwQ0FDaUI7Ozs7O0lBRWpCLDBDQUFzQzs7Ozs7SUFFdEMsdURBQTJDOzs7OztJQUUzQywwQ0FBMEI7Ozs7O0lBRTFCLDhDQUFzQzs7Ozs7SUFFdEMsaURBQTRHOzs7OztJQXNCL0YsMkNBQTZCOzs7OztJQUM3Qix5Q0FBMEI7Ozs7O0lBQzFCLHVDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMlxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZURyYWdJbWFnZU9mZnNldCwgRG5kRHJhZ0ltYWdlT2Zmc2V0RnVuY3Rpb24sIERuZEV2ZW50LCBzZXREcmFnRGF0YSwgc2V0RHJhZ0ltYWdlIH0gZnJvbSBcIi4vZG5kLXV0aWxzXCI7XHJcbmltcG9ydCB7IERuZEhhbmRsZURpcmVjdGl2ZSB9IGZyb20gXCIuL2RuZC1oYW5kbGUuZGlyZWN0aXZlXCI7XHJcbmltcG9ydCB7IGRuZFN0YXRlLCBlbmREcmFnLCBzdGFydERyYWcgfSBmcm9tIFwiLi9kbmQtc3RhdGVcIjtcclxuaW1wb3J0IHsgRWZmZWN0QWxsb3dlZCB9IGZyb20gXCIuL2RuZC10eXBlc1wiO1xyXG5cclxuQERpcmVjdGl2ZSgge1xyXG4gIHNlbGVjdG9yOiBcIltkbmREcmFnSW1hZ2VSZWZdXCJcclxufSApXHJcbmV4cG9ydCBjbGFzcyBEbmREcmFnSW1hZ2VSZWZEaXJlY3RpdmUge1xyXG5cclxuICBjb25zdHJ1Y3RvciggcGFyZW50OkRuZERyYWdnYWJsZURpcmVjdGl2ZSxcclxuICAgICAgICAgICAgICAgZWxlbWVudFJlZjpFbGVtZW50UmVmICkge1xyXG5cclxuICAgIHBhcmVudC5yZWdpc3RlckRyYWdJbWFnZSggZWxlbWVudFJlZiApO1xyXG4gIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSgge1xyXG4gIHNlbGVjdG9yOiBcIltkbmREcmFnZ2FibGVdXCJcclxufSApXHJcbmV4cG9ydCBjbGFzcyBEbmREcmFnZ2FibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRuZERyYWdnYWJsZTphbnk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZG5kRWZmZWN0QWxsb3dlZDpFZmZlY3RBbGxvd2VkID0gXCJjb3B5XCI7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZG5kVHlwZT86c3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRuZERyYWdnaW5nQ2xhc3MgPSBcImRuZERyYWdnaW5nXCI7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZG5kRHJhZ2dpbmdTb3VyY2VDbGFzcyA9IFwiZG5kRHJhZ2dpbmdTb3VyY2VcIjtcclxuXHJcbiAgQElucHV0KClcclxuICBkbmREcmFnZ2FibGVEaXNhYmxlZENsYXNzID0gXCJkbmREcmFnZ2FibGVEaXNhYmxlZFwiO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRuZERyYWdJbWFnZU9mZnNldEZ1bmN0aW9uOkRuZERyYWdJbWFnZU9mZnNldEZ1bmN0aW9uID0gY2FsY3VsYXRlRHJhZ0ltYWdlT2Zmc2V0O1xyXG5cclxuICBAT3V0cHV0KClcclxuICByZWFkb25seSBkbmRTdGFydDpFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICByZWFkb25seSBkbmREcmFnOkV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIHJlYWRvbmx5IGRuZEVuZDpFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICByZWFkb25seSBkbmRNb3ZlZDpFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICByZWFkb25seSBkbmRDb3BpZWQ6RXZlbnRFbWl0dGVyPERyYWdFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgcmVhZG9ubHkgZG5kTGlua2VkOkV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIHJlYWRvbmx5IGRuZENhbmNlbGVkOkV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XHJcblxyXG4gIEBIb3N0QmluZGluZyggXCJhdHRyLmRyYWdnYWJsZVwiIClcclxuICBkcmFnZ2FibGUgPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIGRuZEhhbmRsZT86RG5kSGFuZGxlRGlyZWN0aXZlO1xyXG5cclxuICBwcml2YXRlIGRuZERyYWdJbWFnZUVsZW1lbnRSZWY/OkVsZW1lbnRSZWY7XHJcblxyXG4gIHByaXZhdGUgZHJhZ0ltYWdlOkVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgaXNEcmFnU3RhcnRlZDpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0V2ZW50SGFuZGxlcjooIGV2ZW50OkRyYWdFdmVudCApID0+IHZvaWQgPSAoIGV2ZW50OkRyYWdFdmVudCApID0+IHRoaXMub25EcmFnKCBldmVudCApO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBkbmREaXNhYmxlSWYoIHZhbHVlOmJvb2xlYW4gKSB7XHJcblxyXG4gICAgdGhpcy5kcmFnZ2FibGUgPSAhdmFsdWU7XHJcblxyXG4gICAgaWYoIHRoaXMuZHJhZ2dhYmxlICkge1xyXG5cclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyggdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZG5kRHJhZ2dhYmxlRGlzYWJsZWRDbGFzcyApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcblxyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5kbmREcmFnZ2FibGVEaXNhYmxlZENsYXNzICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBkbmREaXNhYmxlRHJhZ0lmKCB2YWx1ZTpib29sZWFuICkge1xyXG4gICAgdGhpcy5kbmREaXNhYmxlSWYgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCBwcml2YXRlIGVsZW1lbnRSZWY6RWxlbWVudFJlZixcclxuICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjpSZW5kZXJlcjIsXHJcbiAgICAgICAgICAgICAgIHByaXZhdGUgbmdab25lOk5nWm9uZSApIHtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOnZvaWQge1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoICgpID0+IHtcclxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJkcmFnXCIsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciApO1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTp2b2lkIHtcclxuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwiZHJhZ1wiLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIgKTtcclxuICAgIGlmKHRoaXMuaXNEcmFnU3RhcnRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICBlbmREcmFnKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoIFwiZHJhZ3N0YXJ0XCIsIFsgXCIkZXZlbnRcIiBdIClcclxuICBvbkRyYWdTdGFydCggZXZlbnQ6RG5kRXZlbnQgKSB7XHJcblxyXG4gICAgaWYoIHRoaXMuZHJhZ2dhYmxlID09PSBmYWxzZSApIHtcclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBkbmQgaGFuZGxlIGFuZCBpZiB0aGUgZG5kIGhhbmRsZSB3YXMgdXNlZCB0byBzdGFydCB0aGUgZHJhZ1xyXG4gICAgaWYoIHR5cGVvZiB0aGlzLmRuZEhhbmRsZSAhPT0gXCJ1bmRlZmluZWRcIlxyXG4gICAgICAmJiB0eXBlb2YgZXZlbnQuX2RuZFVzaW5nSGFuZGxlID09PSBcInVuZGVmaW5lZFwiICkge1xyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGluaXRpYWxpemUgZ2xvYmFsIHN0YXRlXHJcbiAgICBzdGFydERyYWcoIGV2ZW50LCB0aGlzLmRuZEVmZmVjdEFsbG93ZWQsIHRoaXMuZG5kVHlwZSApO1xyXG5cclxuICAgIHRoaXMuaXNEcmFnU3RhcnRlZCA9IHRydWU7XHJcblxyXG4gICAgc2V0RHJhZ0RhdGEoIGV2ZW50LCB7ZGF0YTogdGhpcy5kbmREcmFnZ2FibGUsIHR5cGU6IHRoaXMuZG5kVHlwZX0sIGRuZFN0YXRlLmVmZmVjdEFsbG93ZWQgKTtcclxuXHJcbiAgICB0aGlzLmRyYWdJbWFnZSA9IHRoaXMuZGV0ZXJtaW5lRHJhZ0ltYWdlKCk7XHJcblxyXG4gICAgLy8gc2V0IGRyYWdnaW5nIGNzcyBjbGFzcyBwcmlvciB0byBzZXREcmFnSW1hZ2Ugc28gc3R5bGVzIGFyZSBhcHBsaWVkIGJlZm9yZVxyXG4gICAgLy8gVE9ETyBicmVha2luZyBjaGFuZ2U6IGFkZCBjbGFzcyB0byBlbGVtZW50UmVmIHJhdGhlciB0aGFuIGRyYWcgaW1hZ2Ugd2hpY2ggY291bGQgYmUgYW5vdGhlciBlbGVtZW50XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKCB0aGlzLmRyYWdJbWFnZSwgdGhpcy5kbmREcmFnZ2luZ0NsYXNzICk7XHJcblxyXG4gICAgLy8gc2V0IGN1c3RvbSBkcmFnaW1hZ2UgaWYgcHJlc2VudFxyXG4gICAgLy8gc2V0IGRyYWdpbWFnZSBpZiBkcmFnIGlzIHN0YXJ0ZWQgZnJvbSBkbmRIYW5kbGVcclxuICAgIGlmKCB0eXBlb2YgdGhpcy5kbmREcmFnSW1hZ2VFbGVtZW50UmVmICE9PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgIHx8IHR5cGVvZiBldmVudC5fZG5kVXNpbmdIYW5kbGUgIT09IFwidW5kZWZpbmVkXCIgKSB7XHJcblxyXG4gICAgICBzZXREcmFnSW1hZ2UoIGV2ZW50LCB0aGlzLmRyYWdJbWFnZSwgdGhpcy5kbmREcmFnSW1hZ2VPZmZzZXRGdW5jdGlvbiApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBkcmFnZ2luZyBzb3VyY2UgY3NzIGNsYXNzIG9uIGZpcnN0IGRyYWcgZXZlbnRcclxuICAgIGNvbnN0IHVucmVnaXN0ZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbiggdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIFwiZHJhZ1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5kbmREcmFnZ2luZ1NvdXJjZUNsYXNzICk7XHJcbiAgICAgIHVucmVnaXN0ZXIoKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmRuZFN0YXJ0LmVtaXQoIGV2ZW50ICk7XHJcblxyXG4gICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBvbkRyYWcoIGV2ZW50OkRyYWdFdmVudCApIHtcclxuXHJcbiAgICB0aGlzLmRuZERyYWcuZW1pdCggZXZlbnQgKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoIFwiZHJhZ2VuZFwiLCBbIFwiJGV2ZW50XCIgXSApXHJcbiAgb25EcmFnRW5kKCBldmVudDpEcmFnRXZlbnQgKSB7XHJcblxyXG4gICAgLy8gZ2V0IGRyb3AgZWZmZWN0IGZyb20gY3VzdG9tIHN0b3JlZCBzdGF0ZSBhcyBpdHMgbm90IHJlbGlhYmxlIGFjcm9zcyBicm93c2Vyc1xyXG4gICAgY29uc3QgZHJvcEVmZmVjdCA9IGRuZFN0YXRlLmRyb3BFZmZlY3Q7XHJcblxyXG4gICAgbGV0IGRyb3BFZmZlY3RFbWl0dGVyOkV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+O1xyXG5cclxuICAgIHN3aXRjaCggZHJvcEVmZmVjdCApIHtcclxuXHJcbiAgICAgIGNhc2UgXCJjb3B5XCI6XHJcbiAgICAgICAgZHJvcEVmZmVjdEVtaXR0ZXIgPSB0aGlzLmRuZENvcGllZDtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgXCJsaW5rXCI6XHJcbiAgICAgICAgZHJvcEVmZmVjdEVtaXR0ZXIgPSB0aGlzLmRuZExpbmtlZDtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgXCJtb3ZlXCI6XHJcbiAgICAgICAgZHJvcEVmZmVjdEVtaXR0ZXIgPSB0aGlzLmRuZE1vdmVkO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBkcm9wRWZmZWN0RW1pdHRlciA9IHRoaXMuZG5kQ2FuY2VsZWQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgZHJvcEVmZmVjdEVtaXR0ZXIuZW1pdCggZXZlbnQgKTtcclxuICAgIHRoaXMuZG5kRW5kLmVtaXQoIGV2ZW50ICk7XHJcblxyXG4gICAgLy8gcmVzZXQgZ2xvYmFsIHN0YXRlXHJcbiAgICBlbmREcmFnKCk7XHJcblxyXG4gICAgdGhpcy5pc0RyYWdTdGFydGVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyggdGhpcy5kcmFnSW1hZ2UsIHRoaXMuZG5kRHJhZ2dpbmdDbGFzcyApO1xyXG5cclxuICAgIC8vIElFOSBzcGVjaWFsIGhhbW1lcmluZ1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoICgpID0+IHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyggdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZG5kRHJhZ2dpbmdTb3VyY2VDbGFzcyApO1xyXG4gICAgfSwgMCApO1xyXG5cclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJEcmFnSGFuZGxlKCBoYW5kbGU6RG5kSGFuZGxlRGlyZWN0aXZlIHwgdW5kZWZpbmVkICkge1xyXG5cclxuICAgIHRoaXMuZG5kSGFuZGxlID0gaGFuZGxlO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJEcmFnSW1hZ2UoIGVsZW1lbnRSZWY6RWxlbWVudFJlZiB8IHVuZGVmaW5lZCApIHtcclxuXHJcbiAgICB0aGlzLmRuZERyYWdJbWFnZUVsZW1lbnRSZWYgPSBlbGVtZW50UmVmO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZXRlcm1pbmVEcmFnSW1hZ2UoKTpFbGVtZW50IHtcclxuXHJcbiAgICAvLyBldmFsdWF0ZSBjdXN0b20gZHJhZyBpbWFnZSBleGlzdGVuY2VcclxuICAgIGlmKCB0eXBlb2YgdGhpcy5kbmREcmFnSW1hZ2VFbGVtZW50UmVmICE9PSBcInVuZGVmaW5lZFwiICkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZG5kRHJhZ0ltYWdlRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19