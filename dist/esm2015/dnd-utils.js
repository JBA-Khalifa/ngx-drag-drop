/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function DragDropData() { }
if (false) {
    /** @type {?|undefined} */
    DragDropData.prototype.data;
    /** @type {?|undefined} */
    DragDropData.prototype.type;
}
/**
 * @record
 */
export function DndEvent() { }
if (false) {
    /** @type {?|undefined} */
    DndEvent.prototype._dndUsingHandle;
    /** @type {?|undefined} */
    DndEvent.prototype._dndDropzoneActive;
}
/** @type {?} */
export const DROP_EFFECTS = (/** @type {?} */ (["move", "copy", "link"]));
/** @type {?} */
export const CUSTOM_MIME_TYPE = "application/x-dnd";
/** @type {?} */
export const JSON_MIME_TYPE = "application/json";
/** @type {?} */
export const MSIE_MIME_TYPE = "Text";
/**
 * @param {?} mimeType
 * @return {?}
 */
function mimeTypeIsCustom(mimeType) {
    return mimeType.substr(0, CUSTOM_MIME_TYPE.length) === CUSTOM_MIME_TYPE;
}
/**
 * @param {?} event
 * @return {?}
 */
export function getWellKnownMimeType(event) {
    if (event.dataTransfer) {
        /** @type {?} */
        const types = event.dataTransfer.types;
        // IE 9 workaround.
        if (!types) {
            return MSIE_MIME_TYPE;
        }
        for (let i = 0; i < types.length; i++) {
            if (types[i] === MSIE_MIME_TYPE
                || types[i] === JSON_MIME_TYPE
                || mimeTypeIsCustom(types[i])) {
                return types[i];
            }
        }
    }
    return null;
}
/**
 * @param {?} event
 * @param {?} data
 * @param {?} effectAllowed
 * @return {?}
 */
export function setDragData(event, data, effectAllowed) {
    // Internet Explorer and Microsoft Edge don't support custom mime types, see design doc:
    // https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
    /** @type {?} */
    const mimeType = CUSTOM_MIME_TYPE + (data.type ? ("-" + data.type) : "");
    /** @type {?} */
    const dataString = JSON.stringify(data);
    try {
        event.dataTransfer.setData(mimeType, dataString);
    }
    catch (e) {
        //   Setting a custom MIME type did not work, we are probably in IE or Edge.
        try {
            event.dataTransfer.setData(JSON_MIME_TYPE, dataString);
        }
        catch (e) {
            //   We are in Internet Explorer and can only use the Text MIME type. Also note that IE
            //   does not allow changing the cursor in the dragover event, therefore we have to choose
            //   the one we want to display now by setting effectAllowed.
            /** @type {?} */
            const effectsAllowed = filterEffects(DROP_EFFECTS, effectAllowed);
            event.dataTransfer.effectAllowed = effectsAllowed[0];
            event.dataTransfer.setData(MSIE_MIME_TYPE, dataString);
        }
    }
}
/**
 * @param {?} event
 * @param {?} dragIsExternal
 * @return {?}
 */
export function getDropData(event, dragIsExternal) {
    // check if the mime type is well known
    /** @type {?} */
    const mimeType = getWellKnownMimeType(event);
    // drag did not originate from [dndDraggable]
    if (dragIsExternal === true) {
        if (mimeType !== null
            && mimeTypeIsCustom(mimeType)) {
            // the type of content is well known and safe to handle
            return JSON.parse(event.dataTransfer.getData(mimeType));
        }
        // the contained data is unknown, let user handle it
        return {};
    }
    // the type of content is well known and safe to handle
    return JSON.parse(event.dataTransfer.getData(mimeType));
}
/**
 * @param {?} effects
 * @param {?} allowed
 * @return {?}
 */
export function filterEffects(effects, allowed) {
    if (allowed === "all"
        || allowed === "uninitialized") {
        return effects;
    }
    return effects.filter((/**
     * @param {?} effect
     * @return {?}
     */
    function (effect) {
        return allowed.toLowerCase().indexOf(effect) !== -1;
    }));
}
/**
 * @param {?} parentElement
 * @param {?} childElement
 * @return {?}
 */
export function getDirectChildElement(parentElement, childElement) {
    /** @type {?} */
    let directChild = childElement;
    while (directChild.parentNode !== parentElement) {
        // reached root node without finding given parent
        if (!directChild.parentNode) {
            return null;
        }
        directChild = directChild.parentNode;
    }
    return (/** @type {?} */ (directChild));
}
/**
 * @param {?} event
 * @param {?} element
 * @param {?} horizontal
 * @return {?}
 */
export function shouldPositionPlaceholderBeforeElement(event, element, horizontal) {
    /** @type {?} */
    const bounds = element.getBoundingClientRect();
    // If the pointer is in the upper half of the list item element,
    // we position the placeholder before the list item, otherwise after it.
    if (horizontal) {
        return (event.clientX < bounds.left + bounds.width / 2);
    }
    return (event.clientY < bounds.top + bounds.height / 2);
}
/**
 * @param {?} event
 * @param {?} dragImage
 * @return {?}
 */
export function calculateDragImageOffset(event, dragImage) {
    /** @type {?} */
    const dragImageComputedStyle = window.getComputedStyle(dragImage);
    /** @type {?} */
    const paddingTop = parseFloat(dragImageComputedStyle.paddingTop) || 0;
    /** @type {?} */
    const paddingLeft = parseFloat(dragImageComputedStyle.paddingLeft) || 0;
    /** @type {?} */
    const borderTop = parseFloat(dragImageComputedStyle.borderTopWidth) || 0;
    /** @type {?} */
    const borderLeft = parseFloat(dragImageComputedStyle.borderLeftWidth) || 0;
    return {
        x: event.offsetX + paddingLeft + borderLeft,
        y: event.offsetY + paddingTop + borderTop
    };
}
/**
 * @param {?} event
 * @param {?} dragImage
 * @param {?} offsetFunction
 * @return {?}
 */
export function setDragImage(event, dragImage, offsetFunction) {
    /** @type {?} */
    const offset = offsetFunction(event, dragImage) || { x: 0, y: 0 };
    ((/** @type {?} */ (event.dataTransfer))).setDragImage(dragImage, offset.x, offset.y);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLXV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRyYWctZHJvcC8iLCJzb3VyY2VzIjpbImRuZC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUEsa0NBR0M7OztJQUZDLDRCQUFVOztJQUNWLDRCQUFhOzs7OztBQUdmLDhCQUdDOzs7SUFGQyxtQ0FBeUI7O0lBQ3pCLHNDQUF5Qjs7O0FBSzNCLE1BQU0sT0FBTyxZQUFZLEdBQUcsbUJBQUEsQ0FBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxFQUFnQjs7QUFFdEUsTUFBTSxPQUFPLGdCQUFnQixHQUFHLG1CQUFtQjs7QUFDbkQsTUFBTSxPQUFPLGNBQWMsR0FBRyxrQkFBa0I7O0FBQ2hELE1BQU0sT0FBTyxjQUFjLEdBQUcsTUFBTTs7Ozs7QUFFcEMsU0FBUyxnQkFBZ0IsQ0FBRSxRQUFlO0lBRXhDLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBRSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxDQUFFLEtBQUssZ0JBQWdCLENBQUM7QUFDNUUsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUUsS0FBZTtJQUVuRCxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUc7O2NBRWpCLEtBQUssR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUs7UUFFdEMsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUc7WUFFWCxPQUFPLGNBQWMsQ0FBQztTQUN2QjtRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFHO1lBRXRDLElBQUksS0FBSyxDQUFFLENBQUMsQ0FBRSxLQUFLLGNBQWM7bUJBQzVCLEtBQUssQ0FBRSxDQUFDLENBQUUsS0FBSyxjQUFjO21CQUM3QixnQkFBZ0IsQ0FBRSxLQUFLLENBQUUsQ0FBQyxDQUFFLENBQUUsRUFBRztnQkFFcEMsT0FBTyxL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QUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFFLENBQUM7QUFDNUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERyb3BFZmZlY3QsIEVmZmVjdEFsbG93ZWQgfSBmcm9tIFwiLi9kbmQtdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRHJhZ0Ryb3BEYXRhIHtcclxuICBkYXRhPzphbnk7XHJcbiAgdHlwZT86c3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERuZEV2ZW50IGV4dGVuZHMgRHJhZ0V2ZW50IHtcclxuICBfZG5kVXNpbmdIYW5kbGU/OmJvb2xlYW47XHJcbiAgX2RuZERyb3B6b25lQWN0aXZlPzp0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBEbmREcmFnSW1hZ2VPZmZzZXRGdW5jdGlvbiA9ICggZXZlbnQ6RHJhZ0V2ZW50LCBkcmFnSW1hZ2U6RWxlbWVudCApID0+IHsgeDpudW1iZXIsIHk6bnVtYmVyIH07XHJcblxyXG5leHBvcnQgY29uc3QgRFJPUF9FRkZFQ1RTID0gWyBcIm1vdmVcIiwgXCJjb3B5XCIsIFwibGlua1wiIF0gYXMgRHJvcEVmZmVjdFtdO1xyXG5cclxuZXhwb3J0IGNvbnN0IENVU1RPTV9NSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3gtZG5kXCI7XHJcbmV4cG9ydCBjb25zdCBKU09OX01JTUVfVFlQRSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xyXG5leHBvcnQgY29uc3QgTVNJRV9NSU1FX1RZUEUgPSBcIlRleHRcIjtcclxuXHJcbmZ1bmN0aW9uIG1pbWVUeXBlSXNDdXN0b20oIG1pbWVUeXBlOnN0cmluZyApIHtcclxuXHJcbiAgcmV0dXJuIG1pbWVUeXBlLnN1YnN0ciggMCwgQ1VTVE9NX01JTUVfVFlQRS5sZW5ndGggKSA9PT0gQ1VTVE9NX01JTUVfVFlQRTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlbGxLbm93bk1pbWVUeXBlKCBldmVudDpEcmFnRXZlbnQgKTpzdHJpbmcgfCBudWxsIHtcclxuXHJcbiAgaWYoIGV2ZW50LmRhdGFUcmFuc2ZlciApIHtcclxuXHJcbiAgICBjb25zdCB0eXBlcyA9IGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlcztcclxuXHJcbiAgICAvLyBJRSA5IHdvcmthcm91bmQuXHJcbiAgICBpZiggIXR5cGVzICkge1xyXG5cclxuICAgICAgcmV0dXJuIE1TSUVfTUlNRV9UWVBFO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG4gICAgICBpZiggdHlwZXNbIGkgXSA9PT0gTVNJRV9NSU1FX1RZUEVcclxuICAgICAgICB8fCB0eXBlc1sgaSBdID09PSBKU09OX01JTUVfVFlQRVxyXG4gICAgICAgIHx8IG1pbWVUeXBlSXNDdXN0b20oIHR5cGVzWyBpIF0gKSApIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGVzWyBpIF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RHJhZ0RhdGEoIGV2ZW50OkRyYWdFdmVudCwgZGF0YTpEcmFnRHJvcERhdGEsIGVmZmVjdEFsbG93ZWQ6RWZmZWN0QWxsb3dlZCApOnZvaWQge1xyXG5cclxuICAvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgTWljcm9zb2Z0IEVkZ2UgZG9uJ3Qgc3VwcG9ydCBjdXN0b20gbWltZSB0eXBlcywgc2VlIGRlc2lnbiBkb2M6XHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hcmNlbGp1ZW5lbWFubi9hbmd1bGFyLWRyYWctYW5kLWRyb3AtbGlzdHMvd2lraS9EYXRhLVRyYW5zZmVyLURlc2lnblxyXG4gIGNvbnN0IG1pbWVUeXBlID0gQ1VTVE9NX01JTUVfVFlQRSArIChkYXRhLnR5cGUgPyAoXCItXCIgKyBkYXRhLnR5cGUpIDogXCJcIik7XHJcblxyXG4gIGNvbnN0IGRhdGFTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSggZGF0YSApO1xyXG5cclxuICB0cnkge1xyXG5cclxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCBtaW1lVHlwZSwgZGF0YVN0cmluZyApO1xyXG5cclxuICB9XHJcbiAgY2F0Y2goIGUgKSB7XHJcblxyXG4gICAgLy8gICBTZXR0aW5nIGEgY3VzdG9tIE1JTUUgdHlwZSBkaWQgbm90IHdvcmssIHdlIGFyZSBwcm9iYWJseSBpbiBJRSBvciBFZGdlLlxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCBKU09OX01JTUVfVFlQRSwgZGF0YVN0cmluZyApO1xyXG5cclxuICAgIH1cclxuICAgIGNhdGNoKCBlICkge1xyXG5cclxuICAgICAgLy8gICBXZSBhcmUgaW4gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIGNhbiBvbmx5IHVzZSB0aGUgVGV4dCBNSU1FIHR5cGUuIEFsc28gbm90ZSB0aGF0IElFXHJcbiAgICAgIC8vICAgZG9lcyBub3QgYWxsb3cgY2hhbmdpbmcgdGhlIGN1cnNvciBpbiB0aGUgZHJhZ292ZXIgZXZlbnQsIHRoZXJlZm9yZSB3ZSBoYXZlIHRvIGNob29zZVxyXG4gICAgICAvLyAgIHRoZSBvbmUgd2Ugd2FudCB0byBkaXNwbGF5IG5vdyBieSBzZXR0aW5nIGVmZmVjdEFsbG93ZWQuXHJcbiAgICAgIGNvbnN0IGVmZmVjdHNBbGxvd2VkID0gZmlsdGVyRWZmZWN0cyggRFJPUF9FRkZFQ1RTLCBlZmZlY3RBbGxvd2VkICk7XHJcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gZWZmZWN0c0FsbG93ZWRbIDAgXTtcclxuXHJcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCBNU0lFX01JTUVfVFlQRSwgZGF0YVN0cmluZyApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERyb3BEYXRhKCBldmVudDpEcmFnRXZlbnQsIGRyYWdJc0V4dGVybmFsOmJvb2xlYW4gKTpEcmFnRHJvcERhdGEge1xyXG5cclxuICAvLyBjaGVjayBpZiB0aGUgbWltZSB0eXBlIGlzIHdlbGwga25vd25cclxuICBjb25zdCBtaW1lVHlwZSA9IGdldFdlbGxLbm93bk1pbWVUeXBlKCBldmVudCApO1xyXG5cclxuICAvLyBkcmFnIGRpZCBub3Qgb3JpZ2luYXRlIGZyb20gW2RuZERyYWdnYWJsZV1cclxuICBpZiggZHJhZ0lzRXh0ZXJuYWwgPT09IHRydWUgKSB7XHJcblxyXG4gICAgaWYoIG1pbWVUeXBlICE9PSBudWxsXHJcbiAgICAgICYmIG1pbWVUeXBlSXNDdXN0b20oIG1pbWVUeXBlICkgKSB7XHJcblxyXG4gICAgICAvLyB0aGUgdHlwZSBvZiBjb250ZW50IGlzIHdlbGwga25vd24gYW5kIHNhZmUgdG8gaGFuZGxlXHJcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKCBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSggbWltZVR5cGUgKSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoZSBjb250YWluZWQgZGF0YSBpcyB1bmtub3duLCBsZXQgdXNlciBoYW5kbGUgaXRcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIC8vIHRoZSB0eXBlIG9mIGNvbnRlbnQgaXMgd2VsbCBrbm93biBhbmQgc2FmZSB0byBoYW5kbGVcclxuICByZXR1cm4gSlNPTi5wYXJzZSggZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoIG1pbWVUeXBlICkgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckVmZmVjdHMoIGVmZmVjdHM6RHJvcEVmZmVjdFtdLCBhbGxvd2VkOkVmZmVjdEFsbG93ZWQgfCBEcm9wRWZmZWN0ICk6RHJvcEVmZmVjdFtdIHtcclxuXHJcbiAgaWYoIGFsbG93ZWQgPT09IFwiYWxsXCJcclxuICAgIHx8IGFsbG93ZWQgPT09IFwidW5pbml0aWFsaXplZFwiICkge1xyXG5cclxuICAgIHJldHVybiBlZmZlY3RzO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVmZmVjdHMuZmlsdGVyKCBmdW5jdGlvbiggZWZmZWN0ICkge1xyXG5cclxuICAgIHJldHVybiBhbGxvd2VkLnRvTG93ZXJDYXNlKCkuaW5kZXhPZiggZWZmZWN0ICkgIT09IC0xO1xyXG4gIH0gKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERpcmVjdENoaWxkRWxlbWVudCggcGFyZW50RWxlbWVudDpFbGVtZW50LCBjaGlsZEVsZW1lbnQ6RWxlbWVudCApOkVsZW1lbnQgfCBudWxsIHtcclxuXHJcbiAgbGV0IGRpcmVjdENoaWxkOk5vZGUgPSBjaGlsZEVsZW1lbnQ7XHJcblxyXG4gIHdoaWxlKCBkaXJlY3RDaGlsZC5wYXJlbnROb2RlICE9PSBwYXJlbnRFbGVtZW50ICkge1xyXG5cclxuICAgIC8vIHJlYWNoZWQgcm9vdCBub2RlIHdpdGhvdXQgZmluZGluZyBnaXZlbiBwYXJlbnRcclxuICAgIGlmKCAhZGlyZWN0Q2hpbGQucGFyZW50Tm9kZSApIHtcclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGRpcmVjdENoaWxkID0gZGlyZWN0Q2hpbGQucGFyZW50Tm9kZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBkaXJlY3RDaGlsZCBhcyBFbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkUG9zaXRpb25QbGFjZWhvbGRlckJlZm9yZUVsZW1lbnQoIGV2ZW50OkRyYWdFdmVudCwgZWxlbWVudDpFbGVtZW50LCBob3Jpem9udGFsOmJvb2xlYW4gKSB7XHJcblxyXG4gIGNvbnN0IGJvdW5kcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gIC8vIElmIHRoZSBwb2ludGVyIGlzIGluIHRoZSB1cHBlciBoYWxmIG9mIHRoZSBsaXN0IGl0ZW0gZWxlbWVudCxcclxuICAvLyB3ZSBwb3NpdGlvbiB0aGUgcGxhY2Vob2xkZXIgYmVmb3JlIHRoZSBsaXN0IGl0ZW0sIG90aGVyd2lzZSBhZnRlciBpdC5cclxuICBpZiggaG9yaXpvbnRhbCApIHtcclxuXHJcbiAgICByZXR1cm4gKGV2ZW50LmNsaWVudFggPCBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCAvIDIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChldmVudC5jbGllbnRZIDwgYm91bmRzLnRvcCArIGJvdW5kcy5oZWlnaHQgLyAyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZURyYWdJbWFnZU9mZnNldCggZXZlbnQ6RHJhZ0V2ZW50LCBkcmFnSW1hZ2U6RWxlbWVudCApOnsgeDpudW1iZXIsIHk6bnVtYmVyIH0ge1xyXG5cclxuICBjb25zdCBkcmFnSW1hZ2VDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRyYWdJbWFnZSApO1xyXG4gIGNvbnN0IHBhZGRpbmdUb3AgPSBwYXJzZUZsb2F0KCBkcmFnSW1hZ2VDb21wdXRlZFN0eWxlLnBhZGRpbmdUb3AgKSB8fCAwO1xyXG4gIGNvbnN0IHBhZGRpbmdMZWZ0ID0gcGFyc2VGbG9hdCggZHJhZ0ltYWdlQ29tcHV0ZWRTdHlsZS5wYWRkaW5nTGVmdCApIHx8IDA7XHJcbiAgY29uc3QgYm9yZGVyVG9wID0gcGFyc2VGbG9hdCggZHJhZ0ltYWdlQ29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BXaWR0aCApIHx8IDA7XHJcbiAgY29uc3QgYm9yZGVyTGVmdCA9IHBhcnNlRmxvYXQoIGRyYWdJbWFnZUNvbXB1dGVkU3R5bGUuYm9yZGVyTGVmdFdpZHRoICkgfHwgMDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHg6IGV2ZW50Lm9mZnNldFggKyBwYWRkaW5nTGVmdCArIGJvcmRlckxlZnQsXHJcbiAgICB5OiBldmVudC5vZmZzZXRZICsgcGFkZGluZ1RvcCArIGJvcmRlclRvcFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREcmFnSW1hZ2UoIGV2ZW50OkRyYWdFdmVudCwgZHJhZ0ltYWdlOkVsZW1lbnQsIG9mZnNldEZ1bmN0aW9uOkRuZERyYWdJbWFnZU9mZnNldEZ1bmN0aW9uICk6dm9pZCB7XHJcblxyXG4gIGNvbnN0IG9mZnNldCA9IG9mZnNldEZ1bmN0aW9uKCBldmVudCwgZHJhZ0ltYWdlICkgfHwge3g6IDAsIHk6IDB9O1xyXG5cclxuICAoZXZlbnQuZGF0YVRyYW5zZmVyIGFzIGFueSkuc2V0RHJhZ0ltYWdlKCBkcmFnSW1hZ2UsIG9mZnNldC54LCBvZmZzZXQueSApO1xyXG59XHJcbiJdfQ==