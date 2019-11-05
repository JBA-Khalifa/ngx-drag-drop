/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DndDraggableDirective, DndDragImageRefDirective } from "./dnd-draggable.directive";
import { DndDropzoneDirective, DndPlaceholderRefDirective } from "./dnd-dropzone.directive";
import { DndHandleDirective } from "./dnd-handle.directive";
export class DndModule {
}
DndModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    DndDraggableDirective,
                    DndDropzoneDirective,
                    DndHandleDirective,
                    DndPlaceholderRefDirective,
                    DndDragImageRefDirective
                ],
                exports: [
                    DndDraggableDirective,
                    DndDropzoneDirective,
                    DndHandleDirective,
                    DndPlaceholderRefDirective,
                    DndDragImageRefDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kcmFnLWRyb3AvIiwic291cmNlcyI6WyJkbmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQXFCNUQsTUFBTSxPQUFPLFNBQVM7OztZQW5CckIsUUFBUSxTQUFFO2dCQUNULE9BQU8sRUFBRTtvQkFDUCxZQUFZO2lCQUNiO2dCQUNELFlBQVksRUFBRTtvQkFDWixxQkFBcUI7b0JBQ3JCLG9CQUFvQjtvQkFDcEIsa0JBQWtCO29CQUNsQiwwQkFBMEI7b0JBQzFCLHdCQUF3QjtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixrQkFBa0I7b0JBQ2xCLDBCQUEwQjtvQkFDMUIsd0JBQXdCO2lCQUN6QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IERuZERyYWdnYWJsZURpcmVjdGl2ZSwgRG5kRHJhZ0ltYWdlUmVmRGlyZWN0aXZlIH0gZnJvbSBcIi4vZG5kLWRyYWdnYWJsZS5kaXJlY3RpdmVcIjtcclxuaW1wb3J0IHsgRG5kRHJvcHpvbmVEaXJlY3RpdmUsIERuZFBsYWNlaG9sZGVyUmVmRGlyZWN0aXZlIH0gZnJvbSBcIi4vZG5kLWRyb3B6b25lLmRpcmVjdGl2ZVwiO1xyXG5pbXBvcnQgeyBEbmRIYW5kbGVEaXJlY3RpdmUgfSBmcm9tIFwiLi9kbmQtaGFuZGxlLmRpcmVjdGl2ZVwiO1xyXG5cclxuQE5nTW9kdWxlKCB7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIERuZERyYWdnYWJsZURpcmVjdGl2ZSxcclxuICAgIERuZERyb3B6b25lRGlyZWN0aXZlLFxyXG4gICAgRG5kSGFuZGxlRGlyZWN0aXZlLFxyXG4gICAgRG5kUGxhY2Vob2xkZXJSZWZEaXJlY3RpdmUsXHJcbiAgICBEbmREcmFnSW1hZ2VSZWZEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIERuZERyYWdnYWJsZURpcmVjdGl2ZSxcclxuICAgIERuZERyb3B6b25lRGlyZWN0aXZlLFxyXG4gICAgRG5kSGFuZGxlRGlyZWN0aXZlLFxyXG4gICAgRG5kUGxhY2Vob2xkZXJSZWZEaXJlY3RpdmUsXHJcbiAgICBEbmREcmFnSW1hZ2VSZWZEaXJlY3RpdmVcclxuICBdXHJcbn0gKVxyXG5leHBvcnQgY2xhc3MgRG5kTW9kdWxlIHtcclxufVxyXG4iXX0=