/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ContentChild, Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, Output, Renderer2 } from "@angular/core";
import { getDirectChildElement, getDropData, shouldPositionPlaceholderBeforeElement } from "./dnd-utils";
import { getDndType, getDropEffect, isExternalDrag, setDropEffect } from "./dnd-state";
/**
 * @record
 */
export function DndDropEvent() { }
if (false) {
    /** @type {?} */
    DndDropEvent.prototype.event;
    /** @type {?} */
    DndDropEvent.prototype.dropEffect;
    /** @type {?} */
    DndDropEvent.prototype.isExternal;
    /** @type {?|undefined} */
    DndDropEvent.prototype.data;
    /** @type {?|undefined} */
    DndDropEvent.prototype.index;
    /** @type {?|undefined} */
    DndDropEvent.prototype.type;
}
var DndPlaceholderRefDirective = /** @class */ (function () {
    function DndPlaceholderRefDirective(elementRef) {
        this.elementRef = elementRef;
    }
    DndPlaceholderRefDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[dndPlaceholderRef]"
                },] }
    ];
    /** @nocollapse */
    DndPlaceholderRefDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return DndPlaceholderRefDirective;
}());
export { DndPlaceholderRefDirective };
if (false) {
    /** @type {?} */
    DndPlaceholderRefDirective.prototype.elementRef;
}
var DndDropzoneDirective = /** @class */ (function () {
    function DndDropzoneDirective(ngZone, elementRef, renderer) {
        var _this = this;
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.dndAllowExternal = false;
        this.dndHorizontal = false;
        this.dndDragoverClass = "dndDragover";
        this.dndDropzoneDisabledClass = "dndDropzoneDisabled";
        this.dndDragover = new EventEmitter();
        this.dndDrop = new EventEmitter();
        this.placeholder = null;
        this.disabled = false;
        this.dragEnterEventHandler = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onDragEnter(event); });
        this.dragOverEventHandler = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onDragOver(event); });
        this.dragLeaveEventHandler = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onDragLeave(event); });
    }
    Object.defineProperty(DndDropzoneDirective.prototype, "dndDisableIf", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.disabled = !!value;
            if (this.disabled) {
                this.renderer.addClass(this.elementRef.nativeElement, this.dndDropzoneDisabledClass);
            }
            else {
                this.renderer.removeClass(this.elementRef.nativeElement, this.dndDropzoneDisabledClass);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DndDropzoneDirective.prototype, "dndDisableDropIf", {
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
    DndDropzoneDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.placeholder = this.tryGetPlaceholder();
        this.removePlaceholderFromDOM();
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.elementRef.nativeElement.addEventListener("dragenter", _this.dragEnterEventHandler);
            _this.elementRef.nativeElement.addEventListener("dragover", _this.dragOverEventHandler);
            _this.elementRef.nativeElement.addEventListener("dragleave", _this.dragLeaveEventHandler);
        }));
    };
    /**
     * @return {?}
     */
    DndDropzoneDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.removeEventListener("dragenter", this.dragEnterEventHandler);
        this.elementRef.nativeElement.removeEventListener("dragover", this.dragOverEventHandler);
        this.elementRef.nativeElement.removeEventListener("dragleave", this.dragLeaveEventHandler);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DndDropzoneDirective.prototype.onDragEnter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // check if another dropzone is activated
        if (event._dndDropzoneActive === true) {
            this.cleanupDragoverState();
            return;
        }
        // set as active if the target element is inside this dropzone
        if (typeof event._dndDropzoneActive === "undefined") {
            /** @type {?} */
            var newTarget = document.elementFromPoint(event.clientX, event.clientY);
            if (this.elementRef.nativeElement.contains(newTarget)) {
                event._dndDropzoneActive = true;
            }
        }
        // check if this drag event is allowed to drop on this dropzone
        /** @type {?} */
        var type = getDndType(event);
        if (this.isDropAllowed(type) === false) {
            return;
        }
        // allow the dragenter
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DndDropzoneDirective.prototype.onDragOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // With nested dropzones, we want to ignore this event if a child dropzone
        // has already handled a dragover.  Historically, event.stopPropagation() was
        // used to prevent this bubbling, but that prevents any dragovers outside the
        // ngx-drag-drop component, and stops other use cases such as scrolling on drag.
        // Instead, we can check if the event was already prevented by a child and bail early.
        if (event.defaultPrevented) {
            return;
        }
        // check if this drag event is allowed to drop on this dropzone
        /** @type {?} */
        var type = getDndType(event);
        if (this.isDropAllowed(type) === false) {
            return;
        }
        this.checkAndUpdatePlaceholderPosition(event);
        /** @type {?} */
        var dropEffect = getDropEffect(event, this.dndEffectAllowed);
        if (dropEffect === "none") {
            this.cleanupDragoverState();
            return;
        }
        // allow the dragover
        event.preventDefault();
        // set the drop effect
        setDropEffect(event, dropEffect);
        this.dndDragover.emit(event);
        this.renderer.addClass(this.elementRef.nativeElement, this.dndDragoverClass);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DndDropzoneDirective.prototype.onDrop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        try {
            // check if this drag event is allowed to drop on this dropzone
            /** @type {?} */
            var type = getDndType(event);
            if (this.isDropAllowed(type) === false) {
                return;
            }
            /** @type {?} */
            var data = getDropData(event, isExternalDrag());
            if (this.isDropAllowed(data.type) === false) {
                return;
            }
            // signal custom drop handling
            event.preventDefault();
            /** @type {?} */
            var dropEffect = getDropEffect(event);
            setDropEffect(event, dropEffect);
            if (dropEffect === "none") {
                return;
            }
            /** @type {?} */
            var dropIndex = this.getPlaceholderIndex();
            // if for whatever reason the placeholder is not present in the DOM but it should be there
            // we don't allow/emit the drop event since it breaks the contract
            // seems to only happen if drag and drop is executed faster than the DOM updates
            if (dropIndex === -1) {
                return;
            }
            this.dndDrop.emit({
                event: event,
                dropEffect: dropEffect,
                isExternal: isExternalDrag(),
                data: data.data,
                index: dropIndex,
                type: type,
            });
            event.stopPropagation();
        }
        finally {
            this.cleanupDragoverState();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DndDropzoneDirective.prototype.onDragLeave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // check if still inside this dropzone and not yet handled by another dropzone
        if (typeof event._dndDropzoneActive === "undefined") {
            /** @type {?} */
            var newTarget = document.elementFromPoint(event.clientX, event.clientY);
            if (this.elementRef.nativeElement.contains(newTarget)) {
                event._dndDropzoneActive = true;
                return;
            }
        }
        this.cleanupDragoverState();
        // cleanup drop effect when leaving dropzone
        setDropEffect(event, "none");
    };
    /**
     * @private
     * @param {?=} type
     * @return {?}
     */
    DndDropzoneDirective.prototype.isDropAllowed = /**
     * @private
     * @param {?=} type
     * @return {?}
     */
    function (type) {
        // dropzone is disabled -> deny it
        if (this.disabled === true) {
            return false;
        }
        // if drag did not start from our directive
        // and external drag sources are not allowed -> deny it
        if (isExternalDrag() === true
            && this.dndAllowExternal === false) {
            return false;
        }
        // no filtering by types -> allow it
        if (!this.dndDropzone) {
            return true;
        }
        // no type set -> allow it
        if (!type) {
            return true;
        }
        if (Array.isArray(this.dndDropzone) === false) {
            throw new Error("dndDropzone: bound value to [dndDropzone] must be an array!");
        }
        // if dropzone contains type -> allow it
        return this.dndDropzone.indexOf(type) !== -1;
    };
    /**
     * @private
     * @return {?}
     */
    DndDropzoneDirective.prototype.tryGetPlaceholder = /**
     * @private
     * @return {?}
     */
    function () {
        if (typeof this.dndPlaceholderRef !== "undefined") {
            return (/** @type {?} */ (this.dndPlaceholderRef.elementRef.nativeElement));
        }
        // TODO nasty workaround needed because if ng-container / template is used @ContentChild() or DI will fail because
        // of wrong context see angular bug https://github.com/angular/angular/issues/13517
        return this.elementRef.nativeElement.querySelector("[dndPlaceholderRef]");
    };
    /**
     * @private
     * @return {?}
     */
    DndDropzoneDirective.prototype.removePlaceholderFromDOM = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.placeholder !== null
            && this.placeholder.parentNode !== null) {
            this.placeholder.parentNode.removeChild(this.placeholder);
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    DndDropzoneDirective.prototype.checkAndUpdatePlaceholderPosition = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.placeholder === null) {
            return;
        }
        // make sure the placeholder is in the DOM
        if (this.placeholder.parentNode !== this.elementRef.nativeElement) {
            this.renderer.appendChild(this.elementRef.nativeElement, this.placeholder);
        }
        // update the position if the event originates from a child element of the dropzone
        /** @type {?} */
        var directChild = getDirectChildElement(this.elementRef.nativeElement, (/** @type {?} */ (event.target)));
        // early exit if no direct child or direct child is placeholder
        if (directChild === null
            || directChild === this.placeholder) {
            return;
        }
        /** @type {?} */
        var positionPlaceholderBeforeDirectChild = shouldPositionPlaceholderBeforeElement(event, directChild, this.dndHorizontal);
        if (positionPlaceholderBeforeDirectChild) {
            // do insert before only if necessary
            if (directChild.previousSibling !== this.placeholder) {
                this.renderer.insertBefore(this.elementRef.nativeElement, this.placeholder, directChild);
            }
        }
        else {
            // do insert after only if necessary
            if (directChild.nextSibling !== this.placeholder) {
                this.renderer.insertBefore(this.elementRef.nativeElement, this.placeholder, directChild.nextSibling);
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    DndDropzoneDirective.prototype.getPlaceholderIndex = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.placeholder === null) {
            return undefined;
        }
        /** @type {?} */
        var element = (/** @type {?} */ (this.elementRef.nativeElement));
        return Array.prototype.indexOf.call(element.children, this.placeholder);
    };
    /**
     * @private
     * @return {?}
     */
    DndDropzoneDirective.prototype.cleanupDragoverState = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderer.removeClass(this.elementRef.nativeElement, this.dndDragoverClass);
        this.removePlaceholderFromDOM();
    };
    DndDropzoneDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[dndDropzone]"
                },] }
    ];
    /** @nocollapse */
    DndDropzoneDirective.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    DndDropzoneDirective.propDecorators = {
        dndDropzone: [{ type: Input }],
        dndEffectAllowed: [{ type: Input }],
        dndAllowExternal: [{ type: Input }],
        dndHorizontal: [{ type: Input }],
        dndDragoverClass: [{ type: Input }],
        dndDropzoneDisabledClass: [{ type: Input }],
        dndDragover: [{ type: Output }],
        dndDrop: [{ type: Output }],
        dndPlaceholderRef: [{ type: ContentChild, args: [DndPlaceholderRefDirective,] }],
        dndDisableIf: [{ type: Input }],
        dndDisableDropIf: [{ type: Input }],
        onDrop: [{ type: HostListener, args: ["drop", ["$event"],] }]
    };
    return DndDropzoneDirective;
}());
export { DndDropzoneDirective };
if (false) {
    /** @type {?} */
    DndDropzoneDirective.prototype.dndDropzone;
    /** @type {?} */
    DndDropzoneDirective.prototype.dndEffectAllowed;
    /** @type {?} */
    DndDropzoneDirective.prototype.dndAllowExternal;
    /** @type {?} */
    DndDropzoneDirective.prototype.dndHorizontal;
    /** @type {?} */
    DndDropzoneDirective.prototype.dndDragoverClass;
    /** @type {?} */
    DndDropzoneDirective.prototype.dndDropzoneDisabledClass;
    /** @type {?} */
    DndDropzoneDirective.prototype.dndDragover;
    /** @type {?} */
    DndDropzoneDirective.prototype.dndDrop;
    /**
     * @type {?}
     * @private
     */
    DndDropzoneDirective.prototype.dndPlaceholderRef;
    /**
     * @type {?}
     * @private
     */
    DndDropzoneDirective.prototype.placeholder;
    /**
     * @type {?}
     * @private
     */
    DndDropzoneDirective.prototype.disabled;
    /**
     * @type {?}
     * @private
     */
    DndDropzoneDirective.prototype.dragEnterEventHandler;
    /**
     * @type {?}
     * @private
     */
    DndDropzoneDirective.prototype.dragOverEventHandler;
    /**
     * @type {?}
     * @private
     */
    DndDropzoneDirective.prototype.dragLeaveEventHandler;
    /**
     * @type {?}
     * @private
     */
    DndDropzoneDirective.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    DndDropzoneDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DndDropzoneDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLWRyb3B6b25lLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kcmFnLWRyb3AvIiwic291cmNlcyI6WyJkbmQtZHJvcHpvbmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLHFCQUFxQixFQUNyQixXQUFXLEVBQ1gsc0NBQXNDLEVBQ3ZDLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7QUFHdkYsa0NBT0M7OztJQU5DLDZCQUFnQjs7SUFDaEIsa0NBQXNCOztJQUN0QixrQ0FBbUI7O0lBQ25CLDRCQUFVOztJQUNWLDZCQUFjOztJQUNkLDRCQUFVOztBQUdaO0lBS0Usb0NBQTZCLFVBQXFCO1FBQXJCLGVBQVUsR0FBVixVQUFVLENBQVc7SUFDbEQsQ0FBQzs7Z0JBTkYsU0FBUyxTQUFFO29CQUNWLFFBQVEsRUFBRSxxQkFBcUI7aUJBQ2hDOzs7O2dCQTlCQyxVQUFVOztJQW1DWixpQ0FBQztDQUFBLEFBUEQsSUFPQztTQUpZLDBCQUEwQjs7O0lBRXhCLGdEQUFxQzs7QUFJcEQ7SUE0REUsOEJBQXFCLE1BQWEsRUFDYixVQUFxQixFQUNyQixRQUFrQjtRQUZ2QyxpQkFHQztRQUhvQixXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQ2IsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBbER2QyxxQkFBZ0IsR0FBVyxLQUFLLENBQUM7UUFHakMsa0JBQWEsR0FBVyxLQUFLLENBQUM7UUFHOUIscUJBQWdCLEdBQVUsYUFBYSxDQUFD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QUFFLENBQUM7SUFDNUUsQ0FBQzs7Ozs7SUFFTyxtREFBb0I7Ozs7SUFBNUI7UUFFRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUUsQ0FBQztRQUVsRixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNsQyxDQUFDOztnQkE5VkYsU0FBUyxTQUFFO29CQUNWLFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs7OztnQkFuQ0MsTUFBTTtnQkFKTixVQUFVO2dCQU9WLFNBQVM7Ozs4QkFtQ1IsS0FBSzttQ0FHTCxLQUFLO21DQUdMLEtBQUs7Z0NBR0wsS0FBSzttQ0FHTCxLQUFLOzJDQUdMLEtBQUs7OEJBR0wsTUFBTTswQkFHTixNQUFNO29DQUdOLFlBQVksU0FBRSwwQkFBMEI7K0JBV3hDLEtBQUs7bUNBZUwsS0FBSzt5QkFtR0wsWUFBWSxTQUFFLE1BQU0sRUFBRSxDQUFFLFFBQVEsQ0FBRTs7SUFxTXJDLDJCQUFDO0NBQUEsQUEvVkQsSUErVkM7U0E1Vlksb0JBQW9COzs7SUFFL0IsMkNBQ3NCOztJQUV0QixnREFDK0I7O0lBRS9CLGdEQUNpQzs7SUFFakMsNkNBQzhCOztJQUU5QixnREFDd0M7O0lBRXhDLHdEQUNpRDs7SUFFakQsMkNBQzZFOztJQUU3RSx1Q0FDK0U7Ozs7O0lBRS9FLGlEQUMrRDs7Ozs7SUFFL0QsMkNBQTBDOzs7OztJQUUxQyx3Q0FBaUM7Ozs7O0lBRWpDLHFEQUFzSDs7Ozs7SUFDdEgsb0RBQW9IOzs7OztJQUNwSCxxREFBc0g7Ozs7O0lBc0J6RyxzQ0FBcUI7Ozs7O0lBQ3JCLDBDQUE2Qjs7Ozs7SUFDN0Isd0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMlxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgRG5kRXZlbnQsXHJcbiAgRHJhZ0Ryb3BEYXRhLFxyXG4gIGdldERpcmVjdENoaWxkRWxlbWVudCxcclxuICBnZXREcm9wRGF0YSxcclxuICBzaG91bGRQb3NpdGlvblBsYWNlaG9sZGVyQmVmb3JlRWxlbWVudFxyXG59IGZyb20gXCIuL2RuZC11dGlsc1wiO1xyXG5pbXBvcnQgeyBnZXREbmRUeXBlLCBnZXREcm9wRWZmZWN0LCBpc0V4dGVybmFsRHJhZywgc2V0RHJvcEVmZmVjdCB9IGZyb20gXCIuL2RuZC1zdGF0ZVwiO1xyXG5pbXBvcnQgeyBEcm9wRWZmZWN0LCBFZmZlY3RBbGxvd2VkIH0gZnJvbSBcIi4vZG5kLXR5cGVzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERuZERyb3BFdmVudCB7XHJcbiAgZXZlbnQ6RHJhZ0V2ZW50O1xyXG4gIGRyb3BFZmZlY3Q6RHJvcEVmZmVjdDtcclxuICBpc0V4dGVybmFsOmJvb2xlYW47XHJcbiAgZGF0YT86YW55O1xyXG4gIGluZGV4PzpudW1iZXI7XHJcbiAgdHlwZT86YW55O1xyXG59XHJcblxyXG5ARGlyZWN0aXZlKCB7XHJcbiAgc2VsZWN0b3I6IFwiW2RuZFBsYWNlaG9sZGVyUmVmXVwiXHJcbn0gKVxyXG5leHBvcnQgY2xhc3MgRG5kUGxhY2Vob2xkZXJSZWZEaXJlY3RpdmUge1xyXG5cclxuICBjb25zdHJ1Y3RvciggcHVibGljIHJlYWRvbmx5IGVsZW1lbnRSZWY6RWxlbWVudFJlZiApIHtcclxuICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoIHtcclxuICBzZWxlY3RvcjogXCJbZG5kRHJvcHpvbmVdXCJcclxufSApXHJcbmV4cG9ydCBjbGFzcyBEbmREcm9wem9uZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZG5kRHJvcHpvbmU/OnN0cmluZ1tdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRuZEVmZmVjdEFsbG93ZWQ6RWZmZWN0QWxsb3dlZDtcclxuXHJcbiAgQElucHV0KClcclxuICBkbmRBbGxvd0V4dGVybmFsOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBkbmRIb3Jpem9udGFsOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBkbmREcmFnb3ZlckNsYXNzOnN0cmluZyA9IFwiZG5kRHJhZ292ZXJcIjtcclxuXHJcbiAgQElucHV0KClcclxuICBkbmREcm9wem9uZURpc2FibGVkQ2xhc3MgPSBcImRuZERyb3B6b25lRGlzYWJsZWRcIjtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgcmVhZG9ubHkgZG5kRHJhZ292ZXI6RXZlbnRFbWl0dGVyPERyYWdFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgcmVhZG9ubHkgZG5kRHJvcDpFdmVudEVtaXR0ZXI8RG5kRHJvcEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RG5kRHJvcEV2ZW50PigpO1xyXG5cclxuICBAQ29udGVudENoaWxkKCBEbmRQbGFjZWhvbGRlclJlZkRpcmVjdGl2ZSApXHJcbiAgcHJpdmF0ZSByZWFkb25seSBkbmRQbGFjZWhvbGRlclJlZj86RG5kUGxhY2Vob2xkZXJSZWZEaXJlY3RpdmU7XHJcblxyXG4gIHByaXZhdGUgcGxhY2Vob2xkZXI6RWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGRpc2FibGVkOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnRW50ZXJFdmVudEhhbmRsZXI6KCBldmVudDpEcmFnRXZlbnQgKSA9PiB2b2lkID0gKCBldmVudDpEcmFnRXZlbnQgKSA9PiB0aGlzLm9uRHJhZ0VudGVyKCBldmVudCApO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ092ZXJFdmVudEhhbmRsZXI6KCBldmVudDpEcmFnRXZlbnQgKSA9PiB2b2lkID0gKCBldmVudDpEcmFnRXZlbnQgKSA9PiB0aGlzLm9uRHJhZ092ZXIoIGV2ZW50ICk7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnTGVhdmVFdmVudEhhbmRsZXI6KCBldmVudDpEcmFnRXZlbnQgKSA9PiB2b2lkID0gKCBldmVudDpEcmFnRXZlbnQgKSA9PiB0aGlzLm9uRHJhZ0xlYXZlKCBldmVudCApO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBkbmREaXNhYmxlSWYoIHZhbHVlOmJvb2xlYW4gKSB7XHJcblxyXG4gICAgdGhpcy5kaXNhYmxlZCA9ICEhdmFsdWU7XHJcblxyXG4gICAgaWYoIHRoaXMuZGlzYWJsZWQgKSB7XHJcblxyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5kbmREcm9wem9uZURpc2FibGVkQ2xhc3MgKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG5cclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyggdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZG5kRHJvcHpvbmVEaXNhYmxlZENsYXNzICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBkbmREaXNhYmxlRHJvcElmKCB2YWx1ZTpib29sZWFuICkge1xyXG4gICAgdGhpcy5kbmREaXNhYmxlSWYgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCBwcml2YXRlIG5nWm9uZTpOZ1pvbmUsXHJcbiAgICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjpFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOlJlbmRlcmVyMiApIHtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOnZvaWQge1xyXG5cclxuICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLnRyeUdldFBsYWNlaG9sZGVyKCk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVQbGFjZWhvbGRlckZyb21ET00oKTtcclxuXHJcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhciggKCkgPT4ge1xyXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCBcImRyYWdlbnRlclwiLCB0aGlzLmRyYWdFbnRlckV2ZW50SGFuZGxlciApO1xyXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCBcImRyYWdvdmVyXCIsIHRoaXMuZHJhZ092ZXJFdmVudEhhbmRsZXIgKTtcclxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJkcmFnbGVhdmVcIiwgdGhpcy5kcmFnTGVhdmVFdmVudEhhbmRsZXIgKTtcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6dm9pZCB7XHJcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCBcImRyYWdlbnRlclwiLCB0aGlzLmRyYWdFbnRlckV2ZW50SGFuZGxlciApO1xyXG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJkcmFnb3ZlclwiLCB0aGlzLmRyYWdPdmVyRXZlbnRIYW5kbGVyICk7XHJcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCBcImRyYWdsZWF2ZVwiLCB0aGlzLmRyYWdMZWF2ZUV2ZW50SGFuZGxlciApO1xyXG4gIH1cclxuXHJcbiAgb25EcmFnRW50ZXIoIGV2ZW50OkRuZEV2ZW50ICkge1xyXG5cclxuICAgIC8vIGNoZWNrIGlmIGFub3RoZXIgZHJvcHpvbmUgaXMgYWN0aXZhdGVkXHJcbiAgICBpZiggZXZlbnQuX2RuZERyb3B6b25lQWN0aXZlID09PSB0cnVlICkge1xyXG5cclxuICAgICAgdGhpcy5jbGVhbnVwRHJhZ292ZXJTdGF0ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0IGFzIGFjdGl2ZSBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgaW5zaWRlIHRoaXMgZHJvcHpvbmVcclxuICAgIGlmKCB0eXBlb2YgZXZlbnQuX2RuZERyb3B6b25lQWN0aXZlID09PSBcInVuZGVmaW5lZFwiICkge1xyXG5cclxuICAgICAgY29uc3QgbmV3VGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xyXG5cclxuICAgICAgaWYoIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKCBuZXdUYXJnZXQgKSApIHtcclxuXHJcbiAgICAgICAgZXZlbnQuX2RuZERyb3B6b25lQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIGlmIHRoaXMgZHJhZyBldmVudCBpcyBhbGxvd2VkIHRvIGRyb3Agb24gdGhpcyBkcm9wem9uZVxyXG4gICAgY29uc3QgdHlwZSA9IGdldERuZFR5cGUoIGV2ZW50ICk7XHJcbiAgICBpZiggdGhpcy5pc0Ryb3BBbGxvd2VkKCB0eXBlICkgPT09IGZhbHNlICkge1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsbG93IHRoZSBkcmFnZW50ZXJcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG5cclxuICBvbkRyYWdPdmVyKCBldmVudDpEcmFnRXZlbnQgKSB7XHJcbiAgICAvLyBXaXRoIG5lc3RlZCBkcm9wem9uZXMsIHdlIHdhbnQgdG8gaWdub3JlIHRoaXMgZXZlbnQgaWYgYSBjaGlsZCBkcm9wem9uZVxyXG4gICAgLy8gaGFzIGFscmVhZHkgaGFuZGxlZCBhIGRyYWdvdmVyLiAgSGlzdG9yaWNhbGx5LCBldmVudC5zdG9wUHJvcGFnYXRpb24oKSB3YXNcclxuICAgIC8vIHVzZWQgdG8gcHJldmVudCB0aGlzIGJ1YmJsaW5nLCBidXQgdGhhdCBwcmV2ZW50cyBhbnkgZHJhZ292ZXJzIG91dHNpZGUgdGhlXHJcbiAgICAvLyBuZ3gtZHJhZy1kcm9wIGNvbXBvbmVudCwgYW5kIHN0b3BzIG90aGVyIHVzZSBjYXNlcyBzdWNoIGFzIHNjcm9sbGluZyBvbiBkcmFnLlxyXG4gICAgLy8gSW5zdGVhZCwgd2UgY2FuIGNoZWNrIGlmIHRoZSBldmVudCB3YXMgYWxyZWFkeSBwcmV2ZW50ZWQgYnkgYSBjaGlsZCBhbmQgYmFpbCBlYXJseS5cclxuICAgIGlmKCBldmVudC5kZWZhdWx0UHJldmVudGVkICkge1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIGlmIHRoaXMgZHJhZyBldmVudCBpcyBhbGxvd2VkIHRvIGRyb3Agb24gdGhpcyBkcm9wem9uZVxyXG4gICAgY29uc3QgdHlwZSA9IGdldERuZFR5cGUoIGV2ZW50ICk7XHJcbiAgICBpZiggdGhpcy5pc0Ryb3BBbGxvd2VkKCB0eXBlICkgPT09IGZhbHNlICkge1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hlY2tBbmRVcGRhdGVQbGFjZWhvbGRlclBvc2l0aW9uKCBldmVudCApO1xyXG5cclxuICAgIGNvbnN0IGRyb3BFZmZlY3QgPSBnZXREcm9wRWZmZWN0KCBldmVudCwgdGhpcy5kbmRFZmZlY3RBbGxvd2VkICk7XHJcblxyXG4gICAgaWYoIGRyb3BFZmZlY3QgPT09IFwibm9uZVwiICkge1xyXG5cclxuICAgICAgdGhpcy5jbGVhbnVwRHJhZ292ZXJTdGF0ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxsb3cgdGhlIGRyYWdvdmVyXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8vIHNldCB0aGUgZHJvcCBlZmZlY3RcclxuICAgIHNldERyb3BFZmZlY3QoIGV2ZW50LCBkcm9wRWZmZWN0ICk7XHJcblxyXG4gICAgdGhpcy5kbmREcmFnb3Zlci5lbWl0KCBldmVudCApO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRuZERyYWdvdmVyQ2xhc3MgKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoIFwiZHJvcFwiLCBbIFwiJGV2ZW50XCIgXSApXHJcbiAgb25Ecm9wKCBldmVudDpEcmFnRXZlbnQgKSB7XHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIHRoaXMgZHJhZyBldmVudCBpcyBhbGxvd2VkIHRvIGRyb3Agb24gdGhpcyBkcm9wem9uZVxyXG4gICAgICBjb25zdCB0eXBlID0gZ2V0RG5kVHlwZSggZXZlbnQgKTtcclxuICAgICAgaWYoIHRoaXMuaXNEcm9wQWxsb3dlZCggdHlwZSApID09PSBmYWxzZSApIHtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkYXRhOkRyYWdEcm9wRGF0YSA9IGdldERyb3BEYXRhKCBldmVudCwgaXNFeHRlcm5hbERyYWcoKSApO1xyXG5cclxuICAgICAgaWYoIHRoaXMuaXNEcm9wQWxsb3dlZCggZGF0YS50eXBlICkgPT09IGZhbHNlICkge1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNpZ25hbCBjdXN0b20gZHJvcCBoYW5kbGluZ1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgY29uc3QgZHJvcEVmZmVjdCA9IGdldERyb3BFZmZlY3QoIGV2ZW50ICk7XHJcblxyXG4gICAgICBzZXREcm9wRWZmZWN0KCBldmVudCwgZHJvcEVmZmVjdCApO1xyXG5cclxuICAgICAgaWYoIGRyb3BFZmZlY3QgPT09IFwibm9uZVwiICkge1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGRyb3BJbmRleCA9IHRoaXMuZ2V0UGxhY2Vob2xkZXJJbmRleCgpO1xyXG5cclxuICAgICAgLy8gaWYgZm9yIHdoYXRldmVyIHJlYXNvbiB0aGUgcGxhY2Vob2xkZXIgaXMgbm90IHByZXNlbnQgaW4gdGhlIERPTSBidXQgaXQgc2hvdWxkIGJlIHRoZXJlXHJcbiAgICAgIC8vIHdlIGRvbid0IGFsbG93L2VtaXQgdGhlIGRyb3AgZXZlbnQgc2luY2UgaXQgYnJlYWtzIHRoZSBjb250cmFjdFxyXG4gICAgICAvLyBzZWVtcyB0byBvbmx5IGhhcHBlbiBpZiBkcmFnIGFuZCBkcm9wIGlzIGV4ZWN1dGVkIGZhc3RlciB0aGFuIHRoZSBET00gdXBkYXRlc1xyXG4gICAgICBpZiggZHJvcEluZGV4ID09PSAtMSApIHtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmRuZERyb3AuZW1pdCgge1xyXG4gICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICBkcm9wRWZmZWN0OiBkcm9wRWZmZWN0LFxyXG4gICAgICAgIGlzRXh0ZXJuYWw6IGlzRXh0ZXJuYWxEcmFnKCksXHJcbiAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxyXG4gICAgICAgIGluZGV4OiBkcm9wSW5kZXgsXHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgfSApO1xyXG5cclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgfVxyXG4gICAgZmluYWxseSB7XHJcblxyXG4gICAgICB0aGlzLmNsZWFudXBEcmFnb3ZlclN0YXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkRyYWdMZWF2ZSggZXZlbnQ6RG5kRXZlbnQgKSB7XHJcblxyXG4gICAgLy8gY2hlY2sgaWYgc3RpbGwgaW5zaWRlIHRoaXMgZHJvcHpvbmUgYW5kIG5vdCB5ZXQgaGFuZGxlZCBieSBhbm90aGVyIGRyb3B6b25lXHJcbiAgICBpZiggdHlwZW9mIGV2ZW50Ll9kbmREcm9wem9uZUFjdGl2ZSA9PT0gXCJ1bmRlZmluZWRcIiApIHtcclxuXHJcbiAgICAgIGNvbnN0IG5ld1RhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgKTtcclxuXHJcbiAgICAgIGlmKCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyggbmV3VGFyZ2V0ICkgKSB7XHJcblxyXG4gICAgICAgIGV2ZW50Ll9kbmREcm9wem9uZUFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jbGVhbnVwRHJhZ292ZXJTdGF0ZSgpO1xyXG5cclxuICAgIC8vIGNsZWFudXAgZHJvcCBlZmZlY3Qgd2hlbiBsZWF2aW5nIGRyb3B6b25lXHJcbiAgICBzZXREcm9wRWZmZWN0KCBldmVudCwgXCJub25lXCIgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNEcm9wQWxsb3dlZCggdHlwZT86c3RyaW5nICk6Ym9vbGVhbiB7XHJcblxyXG4gICAgLy8gZHJvcHpvbmUgaXMgZGlzYWJsZWQgLT4gZGVueSBpdFxyXG4gICAgaWYoIHRoaXMuZGlzYWJsZWQgPT09IHRydWUgKSB7XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgZHJhZyBkaWQgbm90IHN0YXJ0IGZyb20gb3VyIGRpcmVjdGl2ZVxyXG4gICAgLy8gYW5kIGV4dGVybmFsIGRyYWcgc291cmNlcyBhcmUgbm90IGFsbG93ZWQgLT4gZGVueSBpdFxyXG4gICAgaWYoIGlzRXh0ZXJuYWxEcmFnKCkgPT09IHRydWVcclxuICAgICAgJiYgdGhpcy5kbmRBbGxvd0V4dGVybmFsID09PSBmYWxzZSApIHtcclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBubyBmaWx0ZXJpbmcgYnkgdHlwZXMgLT4gYWxsb3cgaXRcclxuICAgIGlmKCAhdGhpcy5kbmREcm9wem9uZSApIHtcclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG5vIHR5cGUgc2V0IC0+IGFsbG93IGl0XHJcbiAgICBpZiggIXR5cGUgKSB7XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiggQXJyYXkuaXNBcnJheSggdGhpcy5kbmREcm9wem9uZSApID09PSBmYWxzZSApIHtcclxuXHJcbiAgICAgIHRocm93IG5ldyBFcnJvciggXCJkbmREcm9wem9uZTogYm91bmQgdmFsdWUgdG8gW2RuZERyb3B6b25lXSBtdXN0IGJlIGFuIGFycmF5IVwiICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgZHJvcHpvbmUgY29udGFpbnMgdHlwZSAtPiBhbGxvdyBpdFxyXG4gICAgcmV0dXJuIHRoaXMuZG5kRHJvcHpvbmUuaW5kZXhPZiggdHlwZSApICE9PSAtMTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJ5R2V0UGxhY2Vob2xkZXIoKTpFbGVtZW50IHwgbnVsbCB7XHJcblxyXG4gICAgaWYoIHR5cGVvZiB0aGlzLmRuZFBsYWNlaG9sZGVyUmVmICE9PSBcInVuZGVmaW5lZFwiICkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZG5kUGxhY2Vob2xkZXJSZWYuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETyBuYXN0eSB3b3JrYXJvdW5kIG5lZWRlZCBiZWNhdXNlIGlmIG5nLWNvbnRhaW5lciAvIHRlbXBsYXRlIGlzIHVzZWQgQENvbnRlbnRDaGlsZCgpIG9yIERJIHdpbGwgZmFpbCBiZWNhdXNlXHJcbiAgICAvLyBvZiB3cm9uZyBjb250ZXh0IHNlZSBhbmd1bGFyIGJ1ZyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMzUxN1xyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoIFwiW2RuZFBsYWNlaG9sZGVyUmVmXVwiICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZVBsYWNlaG9sZGVyRnJvbURPTSgpIHtcclxuXHJcbiAgICBpZiggdGhpcy5wbGFjZWhvbGRlciAhPT0gbnVsbFxyXG4gICAgICAmJiB0aGlzLnBsYWNlaG9sZGVyLnBhcmVudE5vZGUgIT09IG51bGwgKSB7XHJcbiAgICAgIHRoaXMucGxhY2Vob2xkZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggdGhpcy5wbGFjZWhvbGRlciApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGVja0FuZFVwZGF0ZVBsYWNlaG9sZGVyUG9zaXRpb24oIGV2ZW50OkRyYWdFdmVudCApOnZvaWQge1xyXG5cclxuICAgIGlmKCB0aGlzLnBsYWNlaG9sZGVyID09PSBudWxsICkge1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgcGxhY2Vob2xkZXIgaXMgaW4gdGhlIERPTVxyXG4gICAgaWYoIHRoaXMucGxhY2Vob2xkZXIucGFyZW50Tm9kZSAhPT0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgKSB7XHJcblxyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZWhvbGRlciApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gaWYgdGhlIGV2ZW50IG9yaWdpbmF0ZXMgZnJvbSBhIGNoaWxkIGVsZW1lbnQgb2YgdGhlIGRyb3B6b25lXHJcbiAgICBjb25zdCBkaXJlY3RDaGlsZCA9IGdldERpcmVjdENoaWxkRWxlbWVudCggdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGV2ZW50LnRhcmdldCBhcyBFbGVtZW50ICk7XHJcblxyXG4gICAgLy8gZWFybHkgZXhpdCBpZiBubyBkaXJlY3QgY2hpbGQgb3IgZGlyZWN0IGNoaWxkIGlzIHBsYWNlaG9sZGVyXHJcbiAgICBpZiggZGlyZWN0Q2hpbGQgPT09IG51bGxcclxuICAgICAgfHwgZGlyZWN0Q2hpbGQgPT09IHRoaXMucGxhY2Vob2xkZXIgKSB7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcG9zaXRpb25QbGFjZWhvbGRlckJlZm9yZURpcmVjdENoaWxkID0gc2hvdWxkUG9zaXRpb25QbGFjZWhvbGRlckJlZm9yZUVsZW1lbnQoIGV2ZW50LCBkaXJlY3RDaGlsZCwgdGhpcy5kbmRIb3Jpem9udGFsICk7XHJcblxyXG4gICAgaWYoIHBvc2l0aW9uUGxhY2Vob2xkZXJCZWZvcmVEaXJlY3RDaGlsZCApIHtcclxuXHJcbiAgICAgIC8vIGRvIGluc2VydCBiZWZvcmUgb25seSBpZiBuZWNlc3NhcnlcclxuICAgICAgaWYoIGRpcmVjdENoaWxkLnByZXZpb3VzU2libGluZyAhPT0gdGhpcy5wbGFjZWhvbGRlciApIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUoIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlaG9sZGVyLCBkaXJlY3RDaGlsZCApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICAgIC8vIGRvIGluc2VydCBhZnRlciBvbmx5IGlmIG5lY2Vzc2FyeVxyXG4gICAgICBpZiggZGlyZWN0Q2hpbGQubmV4dFNpYmxpbmcgIT09IHRoaXMucGxhY2Vob2xkZXIgKSB7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuaW5zZXJ0QmVmb3JlKCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZWhvbGRlciwgZGlyZWN0Q2hpbGQubmV4dFNpYmxpbmcgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQbGFjZWhvbGRlckluZGV4KCk6bnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuXHJcbiAgICBpZiggdGhpcy5wbGFjZWhvbGRlciA9PT0gbnVsbCApIHtcclxuXHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKCBlbGVtZW50LmNoaWxkcmVuLCB0aGlzLnBsYWNlaG9sZGVyICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFudXBEcmFnb3ZlclN0YXRlKCkge1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRuZERyYWdvdmVyQ2xhc3MgKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZVBsYWNlaG9sZGVyRnJvbURPTSgpO1xyXG4gIH1cclxufVxyXG4iXX0=