/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostBinding, Input, NgZone, Output, Renderer2 } from "@angular/core";
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
        this.addHostListeners();
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
     * @param {?} value
     * @param {?} component
     * @param {?=} force
     * @return {?}
     */
    DndDraggableDirective.prototype.toggleDragLock = /**
     * @param {?} value
     * @param {?} component
     * @param {?=} force
     * @return {?}
     */
    function (value, component, force) {
        if (force === void 0) { force = false; }
        if (value) {
            this.componentThatLocked = component;
            this.removeHostListeners();
        }
        else if (component === this.componentThatLocked) {
            this.componentThatLocked = null;
            this.addHostListeners();
        }
    };
    //@HostListener( "dragstart", [ "$event" ] )
    //@HostListener( "dragstart", [ "$event" ] )
    /**
     * @param {?} event
     * @return {?}
     */
    DndDraggableDirective.prototype.onDragStart = 
    //@HostListener( "dragstart", [ "$event" ] )
    /**
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
    //@HostListener( "dragend", [ "$event" ] )
    //@HostListener( "dragend", [ "$event" ] )
    /**
     * @param {?} event
     * @return {?}
     */
    DndDraggableDirective.prototype.onDragEnd = 
    //@HostListener( "dragend", [ "$event" ] )
    /**
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
    /**
     * @private
     * @return {?}
     */
    DndDraggableDirective.prototype.addHostListeners = /**
     * @private
     * @return {?}
     */
    function () {
        this.draggable = true;
        if (!this.dragStartListener) {
            this.dragStartListener = this.renderer.listen(this.elementRef.nativeElement, 'dragstart', this.onDragStart.bind(this));
        }
        if (!this.dragEndListener) {
            this.dragEndListener = this.renderer.listen(this.elementRef.nativeElement, 'dragend', this.onDragEnd.bind(this));
        }
    };
    /**
     * @private
     * @return {?}
     */
    DndDraggableDirective.prototype.removeHostListeners = /**
     * @private
     * @return {?}
     */
    function () {
        this.draggable = false;
        if (this.dragStartListener) {
            this.dragStartListener();
        }
        if (this.dragEndListener) {
            this.dragEndListener();
        }
    };
    DndDraggableDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[dndDraggable]",
                    exportAs: "ngxDraggable"
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
        dndDisableDragIf: [{ type: Input }]
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
    DndDraggableDirective.prototype.dragStartListener;
    /**
     * @type {?}
     * @private
     */
    DndDraggableDirective.prototype.dragEndListener;
    /**
     * @type {?}
     * @private
     */
    DndDraggableDirective.prototype.componentThatLocked;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLWRyYWdnYWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJhZy1kcm9wLyIsInNvdXJjZXMiOlsiZG5kLWRyYWdnYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBRVgsS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBd0MsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV4SCxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHM0Q7SUFLRSxrQ0FBYSxNQUE0QixFQUM1QixVQUFxQjtRQUVoQyxNQUFNLENBQUMsaUJBQWlCLENBQUUsVUFBVSxDQUFFLENBQUM7SUFDekMsQ0FBQzs7Z0JBVEYsU0FBUyxTQUFFO29CQUNWLFFBQVEsRUFBRSxtQkFBbUI7aUJBQzlCOzs7O2dCQUdxQixxQkFBcUI7Z0JBcEJ6QyxVQUFVOztJQXlCWiwrQkFBQztDQUFBLEFBVkQsSUFVQztTQVBZLHdCQUF3QjtBQVNyQztJQXNGRSwrQkFBcUIsVUFBcUIsRUFDckIsUUFBa0IsRUFDbEIsTUFBYTtRQUZsQyxpQkFHQztRQUhvQixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQTlFbEMscUJBQWdCLEdBQWlCLE1BQU0sQ0FBQztRQU14QyxxQkFBZ0IsR0FBRyxhQUFhLENBQUM7UUFHakMsMkJBQXNCLEdBQUcsbUJBQW1CLENBQUM7UUFHN0MsOEJBQXlCLEdBQUcsc0JBQXNCLENBQUM7UUFHbkQsK0JBQTBCLEdBQThCLHdCQUF3QixDQUFDO1FBR3hFLGFBQVEsR0FBMkIsSUFB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ImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMlxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZURyYWdJbWFnZU9mZnNldCwgRG5kRHJhZ0ltYWdlT2Zmc2V0RnVuY3Rpb24sIERuZEV2ZW50LCBzZXREcmFnRGF0YSwgc2V0RHJhZ0ltYWdlIH0gZnJvbSBcIi4vZG5kLXV0aWxzXCI7XHJcbmltcG9ydCB7IERuZEhhbmRsZURpcmVjdGl2ZSB9IGZyb20gXCIuL2RuZC1oYW5kbGUuZGlyZWN0aXZlXCI7XHJcbmltcG9ydCB7IGRuZFN0YXRlLCBlbmREcmFnLCBzdGFydERyYWcgfSBmcm9tIFwiLi9kbmQtc3RhdGVcIjtcclxuaW1wb3J0IHsgRWZmZWN0QWxsb3dlZCB9IGZyb20gXCIuL2RuZC10eXBlc1wiO1xyXG5cclxuQERpcmVjdGl2ZSgge1xyXG4gIHNlbGVjdG9yOiBcIltkbmREcmFnSW1hZ2VSZWZdXCJcclxufSApXHJcbmV4cG9ydCBjbGFzcyBEbmREcmFnSW1hZ2VSZWZEaXJlY3RpdmUge1xyXG5cclxuICBjb25zdHJ1Y3RvciggcGFyZW50OkRuZERyYWdnYWJsZURpcmVjdGl2ZSxcclxuICAgICAgICAgICAgICAgZWxlbWVudFJlZjpFbGVtZW50UmVmICkge1xyXG5cclxuICAgIHBhcmVudC5yZWdpc3RlckRyYWdJbWFnZSggZWxlbWVudFJlZiApO1xyXG4gIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSgge1xyXG4gIHNlbGVjdG9yOiBcIltkbmREcmFnZ2FibGVdXCIsXHJcbiAgZXhwb3J0QXM6IFwibmd4RHJhZ2dhYmxlXCJcclxufSApXHJcbmV4cG9ydCBjbGFzcyBEbmREcmFnZ2FibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRuZERyYWdnYWJsZTphbnk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZG5kRWZmZWN0QWxsb3dlZDpFZmZlY3RBbGxvd2VkID0gXCJjb3B5XCI7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZG5kVHlwZT86c3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRuZERyYWdnaW5nQ2xhc3MgPSBcImRuZERyYWdnaW5nXCI7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZG5kRHJhZ2dpbmdTb3VyY2VDbGFzcyA9IFwiZG5kRHJhZ2dpbmdTb3VyY2VcIjtcclxuXHJcbiAgQElucHV0KClcclxuICBkbmREcmFnZ2FibGVEaXNhYmxlZENsYXNzID0gXCJkbmREcmFnZ2FibGVEaXNhYmxlZFwiO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRuZERyYWdJbWFnZU9mZnNldEZ1bmN0aW9uOkRuZERyYWdJbWFnZU9mZnNldEZ1bmN0aW9uID0gY2FsY3VsYXRlRHJhZ0ltYWdlT2Zmc2V0O1xyXG5cclxuICBAT3V0cHV0KClcclxuICByZWFkb25seSBkbmRTdGFydDpFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICByZWFkb25seSBkbmREcmFnOkV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIHJlYWRvbmx5IGRuZEVuZDpFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICByZWFkb25seSBkbmRNb3ZlZDpFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICByZWFkb25seSBkbmRDb3BpZWQ6RXZlbnRFbWl0dGVyPERyYWdFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgcmVhZG9ubHkgZG5kTGlua2VkOkV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIHJlYWRvbmx5IGRuZENhbmNlbGVkOkV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XHJcblxyXG4gIEBIb3N0QmluZGluZyggXCJhdHRyLmRyYWdnYWJsZVwiIClcclxuICBkcmFnZ2FibGUgPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIGRuZEhhbmRsZT86RG5kSGFuZGxlRGlyZWN0aXZlO1xyXG5cclxuICBwcml2YXRlIGRuZERyYWdJbWFnZUVsZW1lbnRSZWY/OkVsZW1lbnRSZWY7XHJcblxyXG4gIHByaXZhdGUgZHJhZ0ltYWdlOkVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgaXNEcmFnU3RhcnRlZDpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0V2ZW50SGFuZGxlcjooIGV2ZW50OkRyYWdFdmVudCApID0+IHZvaWQgPSAoIGV2ZW50OkRyYWdFdmVudCApID0+IHRoaXMub25EcmFnKCBldmVudCApO1xyXG5cclxuICBwcml2YXRlIGRyYWdTdGFydExpc3RlbmVyO1xyXG4gIHByaXZhdGUgZHJhZ0VuZExpc3RlbmVyO1xyXG5cclxuICBwcml2YXRlIGNvbXBvbmVudFRoYXRMb2NrZWQ6IGFueTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZG5kRGlzYWJsZUlmKCB2YWx1ZTpib29sZWFuICkge1xyXG5cclxuICAgIHRoaXMuZHJhZ2dhYmxlID0gIXZhbHVlO1xyXG5cclxuICAgIGlmKCB0aGlzLmRyYWdnYWJsZSApIHtcclxuXHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRuZERyYWdnYWJsZURpc2FibGVkQ2xhc3MgKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG5cclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyggdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZG5kRHJhZ2dhYmxlRGlzYWJsZWRDbGFzcyApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZG5kRGlzYWJsZURyYWdJZiggdmFsdWU6Ym9vbGVhbiApIHtcclxuICAgIHRoaXMuZG5kRGlzYWJsZUlmID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBlbGVtZW50UmVmOkVsZW1lbnRSZWYsXHJcbiAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6UmVuZGVyZXIyLFxyXG4gICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTpOZ1pvbmUgKSB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTp2b2lkIHtcclxuICAgIHRoaXMuYWRkSG9zdExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoICgpID0+IHtcclxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJkcmFnXCIsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciApO1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTp2b2lkIHtcclxuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwiZHJhZ1wiLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIgKTtcclxuICAgIGlmKHRoaXMuaXNEcmFnU3RhcnRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICBlbmREcmFnKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG4gIHRvZ2dsZURyYWdMb2NrKHZhbHVlOiBib29sZWFuLCBjb21wb25lbnQ6IGFueSwgZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSk6dm9pZCB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5jb21wb25lbnRUaGF0TG9ja2VkID0gY29tcG9uZW50O1xyXG4gICAgICB0aGlzLnJlbW92ZUhvc3RMaXN0ZW5lcnMoKTtcclxuICAgIH0gZWxzZSBpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50VGhhdExvY2tlZCkge1xyXG4gICAgICB0aGlzLmNvbXBvbmVudFRoYXRMb2NrZWQgPSBudWxsO1xyXG4gICAgICB0aGlzLmFkZEhvc3RMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vQEhvc3RMaXN0ZW5lciggXCJkcmFnc3RhcnRcIiwgWyBcIiRldmVudFwiIF0gKVxyXG4gIG9uRHJhZ1N0YXJ0KCBldmVudDpEbmRFdmVudCApIHtcclxuXHJcbiAgICBpZiggdGhpcy5kcmFnZ2FibGUgPT09IGZhbHNlICkge1xyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGRuZCBoYW5kbGUgYW5kIGlmIHRoZSBkbmQgaGFuZGxlIHdhcyB1c2VkIHRvIHN0YXJ0IHRoZSBkcmFnXHJcbiAgICBpZiggdHlwZW9mIHRoaXMuZG5kSGFuZGxlICE9PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgICYmIHR5cGVvZiBldmVudC5fZG5kVXNpbmdIYW5kbGUgPT09IFwidW5kZWZpbmVkXCIgKSB7XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSBnbG9iYWwgc3RhdGVcclxuICAgIHN0YXJ0RHJhZyggZXZlbnQsIHRoaXMuZG5kRWZmZWN0QWxsb3dlZCwgdGhpcy5kbmRUeXBlICk7XHJcblxyXG4gICAgdGhpcy5pc0RyYWdTdGFydGVkID0gdHJ1ZTtcclxuXHJcbiAgICBzZXREcmFnRGF0YSggZXZlbnQsIHtkYXRhOiB0aGlzLmRuZERyYWdnYWJsZSwgdHlwZTogdGhpcy5kbmRUeXBlfSwgZG5kU3RhdGUuZWZmZWN0QWxsb3dlZCApO1xyXG5cclxuICAgIHRoaXMuZHJhZ0ltYWdlID0gdGhpcy5kZXRlcm1pbmVEcmFnSW1hZ2UoKTtcclxuXHJcbiAgICAvLyBzZXQgZHJhZ2dpbmcgY3NzIGNsYXNzIHByaW9yIHRvIHNldERyYWdJbWFnZSBzbyBzdHlsZXMgYXJlIGFwcGxpZWQgYmVmb3JlXHJcbiAgICAvLyBUT0RPIGJyZWFraW5nIGNoYW5nZTogYWRkIGNsYXNzIHRvIGVsZW1lbnRSZWYgcmF0aGVyIHRoYW4gZHJhZyBpbWFnZSB3aGljaCBjb3VsZCBiZSBhbm90aGVyIGVsZW1lbnRcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoIHRoaXMuZHJhZ0ltYWdlLCB0aGlzLmRuZERyYWdnaW5nQ2xhc3MgKTtcclxuXHJcbiAgICAvLyBzZXQgY3VzdG9tIGRyYWdpbWFnZSBpZiBwcmVzZW50XHJcbiAgICAvLyBzZXQgZHJhZ2ltYWdlIGlmIGRyYWcgaXMgc3RhcnRlZCBmcm9tIGRuZEhhbmRsZVxyXG4gICAgaWYoIHR5cGVvZiB0aGlzLmRuZERyYWdJbWFnZUVsZW1lbnRSZWYgIT09IFwidW5kZWZpbmVkXCJcclxuICAgICAgfHwgdHlwZW9mIGV2ZW50Ll9kbmRVc2luZ0hhbmRsZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcclxuXHJcbiAgICAgIHNldERyYWdJbWFnZSggZXZlbnQsIHRoaXMuZHJhZ0ltYWdlLCB0aGlzLmRuZERyYWdJbWFnZU9mZnNldEZ1bmN0aW9uICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkIGRyYWdnaW5nIHNvdXJjZSBjc3MgY2xhc3Mgb24gZmlyc3QgZHJhZyBldmVudFxyXG4gICAgY29uc3QgdW5yZWdpc3RlciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgXCJkcmFnXCIsICgpID0+IHtcclxuXHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRuZERyYWdnaW5nU291cmNlQ2xhc3MgKTtcclxuICAgICAgdW5yZWdpc3RlcigpO1xyXG4gICAgfSApO1xyXG5cclxuICAgIHRoaXMuZG5kU3RhcnQuZW1pdCggZXZlbnQgKTtcclxuXHJcbiAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9XHJcblxyXG4gIG9uRHJhZyggZXZlbnQ6RHJhZ0V2ZW50ICkge1xyXG5cclxuICAgIHRoaXMuZG5kRHJhZy5lbWl0KCBldmVudCApO1xyXG4gIH1cclxuXHJcbiAgLy9ASG9zdExpc3RlbmVyKCBcImRyYWdlbmRcIiwgWyBcIiRldmVudFwiIF0gKVxyXG4gIG9uRHJhZ0VuZCggZXZlbnQ6RHJhZ0V2ZW50ICkge1xyXG5cclxuICAgIC8vIGdldCBkcm9wIGVmZmVjdCBmcm9tIGN1c3RvbSBzdG9yZWQgc3RhdGUgYXMgaXRzIG5vdCByZWxpYWJsZSBhY3Jvc3MgYnJvd3NlcnNcclxuICAgIGNvbnN0IGRyb3BFZmZlY3QgPSBkbmRTdGF0ZS5kcm9wRWZmZWN0O1xyXG5cclxuICAgIGxldCBkcm9wRWZmZWN0RW1pdHRlcjpFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PjtcclxuXHJcbiAgICBzd2l0Y2goIGRyb3BFZmZlY3QgKSB7XHJcblxyXG4gICAgICBjYXNlIFwiY29weVwiOlxyXG4gICAgICAgIGRyb3BFZmZlY3RFbWl0dGVyID0gdGhpcy5kbmRDb3BpZWQ7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFwibGlua1wiOlxyXG4gICAgICAgIGRyb3BFZmZlY3RFbWl0dGVyID0gdGhpcy5kbmRMaW5rZWQ7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFwibW92ZVwiOlxyXG4gICAgICAgIGRyb3BFZmZlY3RFbWl0dGVyID0gdGhpcy5kbmRNb3ZlZDtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgZHJvcEVmZmVjdEVtaXR0ZXIgPSB0aGlzLmRuZENhbmNlbGVkO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGRyb3BFZmZlY3RFbWl0dGVyLmVtaXQoIGV2ZW50ICk7XHJcbiAgICB0aGlzLmRuZEVuZC5lbWl0KCBldmVudCApO1xyXG5cclxuICAgIC8vIHJlc2V0IGdsb2JhbCBzdGF0ZVxyXG4gICAgZW5kRHJhZygpO1xyXG5cclxuICAgIHRoaXMuaXNEcmFnU3RhcnRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoIHRoaXMuZHJhZ0ltYWdlLCB0aGlzLmRuZERyYWdnaW5nQ2xhc3MgKTtcclxuXHJcbiAgICAvLyBJRTkgc3BlY2lhbCBoYW1tZXJpbmdcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRuZERyYWdnaW5nU291cmNlQ2xhc3MgKTtcclxuICAgIH0sIDAgKTtcclxuXHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyRHJhZ0hhbmRsZSggaGFuZGxlOkRuZEhhbmRsZURpcmVjdGl2ZSB8IHVuZGVmaW5lZCApIHtcclxuXHJcbiAgICB0aGlzLmRuZEhhbmRsZSA9IGhhbmRsZTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyRHJhZ0ltYWdlKCBlbGVtZW50UmVmOkVsZW1lbnRSZWYgfCB1bmRlZmluZWQgKSB7XHJcblxyXG4gICAgdGhpcy5kbmREcmFnSW1hZ2VFbGVtZW50UmVmID0gZWxlbWVudFJlZjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGV0ZXJtaW5lRHJhZ0ltYWdlKCk6RWxlbWVudCB7XHJcblxyXG4gICAgLy8gZXZhbHVhdGUgY3VzdG9tIGRyYWcgaW1hZ2UgZXhpc3RlbmNlXHJcbiAgICBpZiggdHlwZW9mIHRoaXMuZG5kRHJhZ0ltYWdlRWxlbWVudFJlZiAhPT0gXCJ1bmRlZmluZWRcIiApIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmRuZERyYWdJbWFnZUVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZEhvc3RMaXN0ZW5lcnMoKTp2b2lkIHtcclxuICAgIHRoaXMuZHJhZ2dhYmxlID0gdHJ1ZTtcclxuICAgIGlmICghdGhpcy5kcmFnU3RhcnRMaXN0ZW5lcikge1xyXG4gICAgICB0aGlzLmRyYWdTdGFydExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkcmFnc3RhcnQnLCB0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmRyYWdFbmRMaXN0ZW5lcikge1xyXG4gICAgICB0aGlzLmRyYWdFbmRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZHJhZ2VuZCcsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlSG9zdExpc3RlbmVycygpOnZvaWQge1xyXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBmYWxzZTtcclxuICAgIGlmKHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIpIHtcclxuICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5kcmFnRW5kTGlzdGVuZXIpe1xyXG4gICAgICB0aGlzLmRyYWdFbmRMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=