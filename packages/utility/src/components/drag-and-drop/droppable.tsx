import React, {useRef, useEffect} from "react";

interface IProps {
    id: string;
    onDrop?: (data: string) => void;
    children: React.ReactNode;
}

export const Droppable: React.FC<IProps> = ({id, onDrop, children}) => {
    const dropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDrop = (event: DragEvent) => {
            event.preventDefault();
            const data = event.dataTransfer
                ? event.dataTransfer.getData("text/plain")
                : undefined;
            if (data) {
                onDrop && onDrop(data);
            }
        };

        const handleDragOver = (event: DragEvent) => {
            event.preventDefault();
        };

        const dropElement = dropRef.current;

        if (dropElement) {
            dropElement.addEventListener("drop", handleDrop);
            dropElement.addEventListener("dragover", handleDragOver);
        }

        return () => {
            if (dropElement) {
                dropElement.removeEventListener("drop", handleDrop);
                dropElement.removeEventListener("dragover", handleDragOver);
            }
        };
    }, [onDrop]);

    return (
        <div id={id} ref={dropRef}>
            {children}
        </div>
    );
};
