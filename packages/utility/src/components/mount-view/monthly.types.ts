export enum BearCalendarMonthViewSize {
    Small,
    Medium,
    Large,
}

export interface BearCalendarMonthlyViewProps {
    current: string;
    size?: BearCalendarMonthViewSize;
}
