import React, {useRef} from "react";

interface IRule {
    x?: {step?: number; restrict?: boolean};
    y?: {step?: number; restrict?: boolean};
}

interface IProps {
    children: React.ReactNode;
    onDrag?: () => void;
    rule?: IRule;
    disable?: boolean;
}

export const Draggable: React.FC<IProps> = ({
    children,
    onDrag,
    rule,
    disable,
}) => {
    const position = useRef({x: 0, y: 0});
    const dragStart = useRef({x: 0, y: 0});
    const dragItem = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const onMouseDown = (e: React.MouseEvent) => {
        if (disable === true) return;
        dragStart.current = {
            x: e.clientX - position.current.x,
            y: e.clientY - position.current.y,
        };
        isDragging.current = true;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (isDragging.current && dragItem.current) {
            let newX = e.clientX - dragStart.current.x;
            let newY = e.clientY - dragStart.current.y;

            if (rule) {
                if (rule.x) {
                    if (rule.x.step) {
                        newX = Math.round(newX / rule.x.step) * rule.x.step;
                    }
                    if (rule.x.restrict) {
                        newX = position.current.x;
                    }
                }
                if (rule.y) {
                    if (rule.y.restrict) {
                        newY = position.current.y;
                    }

                    if (rule.y.step) {
                        newY = Math.round(newY / rule.y.step) * rule.y.step;
                    }
                }
            }

            position.current = {
                x: newX,
                y: newY,
            };
            dragItem.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;

            if (onDrag) {
                onDrag();
            }
        }
    };

    const onMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };

    return (
        <div
            onMouseDown={onMouseDown}
            style={
                disable !== true
                    ? {
                          display: "inline-block",
                          cursor: "grab",
                      }
                    : undefined
            }
            ref={dragItem}
        >
            {children}
        </div>
    );
};
