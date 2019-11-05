/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CUSTOM_MIME_TYPE, DROP_EFFECTS, filterEffects, getWellKnownMimeType, JSON_MIME_TYPE, MSIE_MIME_TYPE } from "./dnd-utils";
/**
 * @record
 */
export function DndState() { }
if (false) {
    /** @type {?} */
    DndState.prototype.isDragging;
    /** @type {?|undefined} */
    DndState.prototype.dropEffect;
    /** @type {?|undefined} */
    DndState.prototype.effectAllowed;
    /** @type {?|undefined} */
    DndState.prototype.type;
}
/** @type {?} */
const _dndState = {
    isDragging: false,
    dropEffect: "none",
    effectAllowed: "all",
    type: undefined
};
/**
 * @param {?} event
 * @param {?} effectAllowed
 * @param {?} type
 * @return {?}
 */
export function startDrag(event, effectAllowed, type) {
    _dndState.isDragging = true;
    _dndState.dropEffect = "none";
    _dndState.effectAllowed = effectAllowed;
    _dndState.type = type;
    event.dataTransfer.effectAllowed = effectAllowed;
}
/**
 * @return {?}
 */
export function endDrag() {
    _dndState.isDragging = false;
    _dndState.dropEffect = undefined;
    _dndState.effectAllowed = undefined;
    _dndState.type = undefined;
}
/**
 * @param {?} event
 * @param {?} dropEffect
 * @return {?}
 */
export function setDropEffect(event, dropEffect) {
    if (_dndState.isDragging === true) {
        _dndState.dropEffect = dropEffect;
    }
    event.dataTransfer.dropEffect = dropEffect;
}
/**
 * @param {?} event
 * @param {?=} effectAllowed
 * @return {?}
 */
export function getDropEffect(event, effectAllowed) {
    /** @type {?} */
    const dataTransferEffectAllowed = (event.dataTransfer) ? (/** @type {?} */ (event.dataTransfer.effectAllowed)) : "uninitialized";
    /** @type {?} */
    let effects = filterEffects(DROP_EFFECTS, dataTransferEffectAllowed);
    if (_dndState.isDragging === true) {
        effects = filterEffects(effects, _dndState.effectAllowed);
    }
    if (effectAllowed) {
        effects = filterEffects(effects, effectAllowed);
    }
    // MacOS automatically filters dataTransfer.effectAllowed depending on the modifier keys,
    // therefore the following modifier keys will only affect other operating systems.
    if (effects.length === 0) {
        return "none";
    }
    if (event.ctrlKey && effects.indexOf("copy") !== -1) {
        return "copy";
    }
    if (event.altKey && effects.indexOf("link") !== -1) {
        return "link";
    }
    return (/** @type {?} */ (effects[0]));
}
/**
 * @param {?} event
 * @return {?}
 */
export function getDndType(event) {
    if (_dndState.isDragging === true) {
        return _dndState.type;
    }
    /** @type {?} */
    const mimeType = getWellKnownMimeType(event);
    if (mimeType === null) {
        return undefined;
    }
    if (mimeType === MSIE_MIME_TYPE
        || mimeType === JSON_MIME_TYPE) {
        return undefined;
    }
    return mimeType.substr(CUSTOM_MIME_TYPE.length + 1) || undefined;
}
/**
 * @return {?}
 */
export function isExternalDrag() {
    return _dndState.isDragging === false;
}
/** @type {?} */
export const dndState = (/** @type {?} */ (_dndState));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLXN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRyYWctZHJvcC8iLCJzb3VyY2VzIjpbImRuZC1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osYUFBYSxFQUNiLG9CQUFvQixFQUNwQixjQUFjLEVBQ2QsY0FBYyxFQUNmLE1BQU0sYUFBYSxDQUFDOzs7O0FBR3JCLDhCQUtDOzs7SUFKQyw4QkFBbUI7O0lBQ25CLDhCQUF1Qjs7SUFDdkIsaUNBQTZCOztJQUM3Qix3QkFBYTs7O01BR1QsU0FBUyxHQUFZO0lBQ3pCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLElBQUksRUFBRSxTQUFTO0NBQ2hCOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBRSxLQUFlLEVBQUUsYUFBMkIsRUFBRSxJQUF1QjtJQUU5RixTQUFTLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUM1QixTQUFTLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztJQUM5QixTQUFTLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUN4QyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUV0QixLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDbkQsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSxPQUFPO0lBRXJCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzdCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ2pDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO0lBQ3BDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQzdCLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUUsS0FBZSxFQUFFLFVBQXFCO0lBRW5FLElBQUksU0FBUyxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUc7UUFFbEMsU0FBUyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDbkM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDN0MsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBRSxLQUFlLEVBQUUsYUFBeUM7O1VBRWpGLHlCQUF5QixHQUFpQixDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQWlCLENBQUMsQ0FBQyxDQUFDLGVBQWU7O1FBRXRJLE9BQU8sR0FBRyxhQUFhLENBQUUsWUFBWSxFQUFFLHlCQUF5QixDQUFFO0lBRXRFLElBQUksU0FBUyxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUc7UUFFbEMsT0FBTyxHQUFHLGFBQWEsQ0FBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLGFBQWEsQ0FBRSxDQUFDO0tBQzdEO0lBRUQsSUFBSSxhQUFhLEVBQUc7UUFFbEIsT0FBTyxHQUFHLGFBQWEsQ0FBRSxPQUFPLEVBQUUsYUFBYSxDQUFFLENBQUM7S0FDbkQ7SUFFRCx5RkFBeUY7SUFDekYsa0ZBQWtGO0lBQ2xGLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUc7UUFFekIsT0FBTyxNQUFNLENBQUM7S0FDZjtJQUVELElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFFLE1BQU0sQ0FBRSxLQUFLLENBQUMsQ0FBQyxFQUFHO1FBRXRELE9BQU8sTUFBTSxDQUFDO0tBQ2Y7SUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBRSxNQUFNLENBQUUsS0FBSyxDQUFDLENBQUMsRUFBRztRQUVyRCxPQUFPLE1BQU0sQ0FBQztLQUNmO0lBRUQsT0FBTyxtQkFBQSxPQUFPLENBQUUsQ0FBQyxDQUFFLEVBQWMsQ0FBQztBQUNwQyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUUsS0FBZTtJQUV6QyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFHO1FBRWxDLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztLQUN2Qjs7VUFFSyxRQUFRLEdBQUcsb0JBQW9CLENBQUUsS0FBSyxDQUFFO0lBRTlDLElBQUksUUFBUSxLQUFLLElBQUksRUFBRztRQUV0QixPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUVELElBQUksUUFBUSxLQUFLLGNBQWM7V0FDMUIsUUFBUSxLQUFLLGNBQWMsRUFBRztRQUVqQyxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUVELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBRSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFFLElBQUksU0FBUyxDQUFDO0FBQ3JFLENBQUM7Ozs7QUFFRCxNQUFNLFVBQVUsY0FBYztJQUU1QixPQUFPLFNBQVMsQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDO0FBQ3hDLENBQUM7O0FBRUQsTUFBTSxPQUFPLFFBQVEsR0FBc0IsbUJBQUEsU0FBUyxFQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ1VTVE9NX01JTUVfVFlQRSxcclxuICBEUk9QX0VGRkVDVFMsXHJcbiAgZmlsdGVyRWZmZWN0cyxcclxuICBnZXRXZWxsS25vd25NaW1lVHlwZSxcclxuICBKU09OX01JTUVfVFlQRSxcclxuICBNU0lFX01JTUVfVFlQRVxyXG59IGZyb20gXCIuL2RuZC11dGlsc1wiO1xyXG5pbXBvcnQgeyBEcm9wRWZmZWN0LCBFZmZlY3RBbGxvd2VkIH0gZnJvbSBcIi4vZG5kLXR5cGVzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERuZFN0YXRlIHtcclxuICBpc0RyYWdnaW5nOmJvb2xlYW47XHJcbiAgZHJvcEVmZmVjdD86RHJvcEVmZmVjdDtcclxuICBlZmZlY3RBbGxvd2VkPzpFZmZlY3RBbGxvd2VkO1xyXG4gIHR5cGU/OnN0cmluZztcclxufVxyXG5cclxuY29uc3QgX2RuZFN0YXRlOkRuZFN0YXRlID0ge1xyXG4gIGlzRHJhZ2dpbmc6IGZhbHNlLFxyXG4gIGRyb3BFZmZlY3Q6IFwibm9uZVwiLFxyXG4gIGVmZmVjdEFsbG93ZWQ6IFwiYWxsXCIsXHJcbiAgdHlwZTogdW5kZWZpbmVkXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RhcnREcmFnKCBldmVudDpEcmFnRXZlbnQsIGVmZmVjdEFsbG93ZWQ6RWZmZWN0QWxsb3dlZCwgdHlwZTpzdHJpbmcgfCB1bmRlZmluZWQgKSB7XHJcblxyXG4gIF9kbmRTdGF0ZS5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuICBfZG5kU3RhdGUuZHJvcEVmZmVjdCA9IFwibm9uZVwiO1xyXG4gIF9kbmRTdGF0ZS5lZmZlY3RBbGxvd2VkID0gZWZmZWN0QWxsb3dlZDtcclxuICBfZG5kU3RhdGUudHlwZSA9IHR5cGU7XHJcblxyXG4gIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gZWZmZWN0QWxsb3dlZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVuZERyYWcoKSB7XHJcblxyXG4gIF9kbmRTdGF0ZS5pc0RyYWdnaW5nID0gZmFsc2U7XHJcbiAgX2RuZFN0YXRlLmRyb3BFZmZlY3QgPSB1bmRlZmluZWQ7XHJcbiAgX2RuZFN0YXRlLmVmZmVjdEFsbG93ZWQgPSB1bmRlZmluZWQ7XHJcbiAgX2RuZFN0YXRlLnR5cGUgPSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREcm9wRWZmZWN0KCBldmVudDpEcmFnRXZlbnQsIGRyb3BFZmZlY3Q6RHJvcEVmZmVjdCApIHtcclxuXHJcbiAgaWYoIF9kbmRTdGF0ZS5pc0RyYWdnaW5nID09PSB0cnVlICkge1xyXG5cclxuICAgIF9kbmRTdGF0ZS5kcm9wRWZmZWN0ID0gZHJvcEVmZmVjdDtcclxuICB9XHJcblxyXG4gIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gZHJvcEVmZmVjdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERyb3BFZmZlY3QoIGV2ZW50OkRyYWdFdmVudCwgZWZmZWN0QWxsb3dlZD86RWZmZWN0QWxsb3dlZCB8IERyb3BFZmZlY3QgKTpEcm9wRWZmZWN0IHtcclxuXHJcbiAgY29uc3QgZGF0YVRyYW5zZmVyRWZmZWN0QWxsb3dlZDpFZmZlY3RBbGxvd2VkID0gKGV2ZW50LmRhdGFUcmFuc2ZlcikgPyBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCBhcyBFZmZlY3RBbGxvd2VkIDogXCJ1bmluaXRpYWxpemVkXCI7XHJcblxyXG4gIGxldCBlZmZlY3RzID0gZmlsdGVyRWZmZWN0cyggRFJPUF9FRkZFQ1RTLCBkYXRhVHJhbnNmZXJFZmZlY3RBbGxvd2VkICk7XHJcblxyXG4gIGlmKCBfZG5kU3RhdGUuaXNEcmFnZ2luZyA9PT0gdHJ1ZSApIHtcclxuXHJcbiAgICBlZmZlY3RzID0gZmlsdGVyRWZmZWN0cyggZWZmZWN0cywgX2RuZFN0YXRlLmVmZmVjdEFsbG93ZWQgKTtcclxuICB9XHJcblxyXG4gIGlmKCBlZmZlY3RBbGxvd2VkICkge1xyXG5cclxuICAgIGVmZmVjdHMgPSBmaWx0ZXJFZmZlY3RzKCBlZmZlY3RzLCBlZmZlY3RBbGxvd2VkICk7XHJcbiAgfVxyXG5cclxuICAvLyBNYWNPUyBhdXRvbWF0aWNhbGx5IGZpbHRlcnMgZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgZGVwZW5kaW5nIG9uIHRoZSBtb2RpZmllciBrZXlzLFxyXG4gIC8vIHRoZXJlZm9yZSB0aGUgZm9sbG93aW5nIG1vZGlmaWVyIGtleXMgd2lsbCBvbmx5IGFmZmVjdCBvdGhlciBvcGVyYXRpbmcgc3lzdGVtcy5cclxuICBpZiggZWZmZWN0cy5sZW5ndGggPT09IDAgKSB7XHJcblxyXG4gICAgcmV0dXJuIFwibm9uZVwiO1xyXG4gIH1cclxuXHJcbiAgaWYoIGV2ZW50LmN0cmxLZXkgJiYgZWZmZWN0cy5pbmRleE9mKCBcImNvcHlcIiApICE9PSAtMSApIHtcclxuXHJcbiAgICByZXR1cm4gXCJjb3B5XCI7XHJcbiAgfVxyXG5cclxuICBpZiggZXZlbnQuYWx0S2V5ICYmIGVmZmVjdHMuaW5kZXhPZiggXCJsaW5rXCIgKSAhPT0gLTEgKSB7XHJcblxyXG4gICAgcmV0dXJuIFwibGlua1wiO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVmZmVjdHNbIDAgXSBhcyBEcm9wRWZmZWN0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RG5kVHlwZSggZXZlbnQ6RHJhZ0V2ZW50ICk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuXHJcbiAgaWYoIF9kbmRTdGF0ZS5pc0RyYWdnaW5nID09PSB0cnVlICkge1xyXG5cclxuICAgIHJldHVybiBfZG5kU3RhdGUudHlwZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1pbWVUeXBlID0gZ2V0V2VsbEtub3duTWltZVR5cGUoIGV2ZW50ICk7XHJcblxyXG4gIGlmKCBtaW1lVHlwZSA9PT0gbnVsbCApIHtcclxuXHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgaWYoIG1pbWVUeXBlID09PSBNU0lFX01JTUVfVFlQRVxyXG4gICAgfHwgbWltZVR5cGUgPT09IEpTT05fTUlNRV9UWVBFICkge1xyXG5cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWltZVR5cGUuc3Vic3RyKCBDVVNUT01fTUlNRV9UWVBFLmxlbmd0aCArIDEgKSB8fCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0V4dGVybmFsRHJhZygpOmJvb2xlYW4ge1xyXG5cclxuICByZXR1cm4gX2RuZFN0YXRlLmlzRHJhZ2dpbmcgPT09IGZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZG5kU3RhdGU6UmVhZG9ubHk8RG5kU3RhdGU+ID0gX2RuZFN0YXRlIGFzIFJlYWRvbmx5PERuZFN0YXRlPjtcclxuIl19