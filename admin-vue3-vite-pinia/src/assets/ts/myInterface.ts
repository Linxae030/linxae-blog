export interface sideNavBarItem {
    index: number;
    icon: string;
    title: string;
    path: string;
    children?: Array<sideNavBarItem>;
}