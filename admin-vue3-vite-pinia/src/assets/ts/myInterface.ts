export interface sideNavBarItem {
    index: number;
    icon: string;
    title: string;
    path: string;
    children?: Array<sideNavBarItem>;
}
export interface category {
    id: number;
    name: string;
}

export interface tag {
    id: number;
    name: string;
}