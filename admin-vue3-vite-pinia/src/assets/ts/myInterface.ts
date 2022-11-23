export interface sideNavBarItem {
    index: number;
    icon: string;
    title: string;
    path: string;
    children?: Array<sideNavBarItem>;
}

export interface article {
    id?: number;
    category_id: number;
    article_cover: string;
    article_title: string;
    article_content: string;
    article_content_md: string;
    type: number;
    is_top: number;
    tag_list: Array<string>;
}
export interface draft {
    article_title: string;
    article_content: string;
}

export interface category {
    id: number;
    category_name: string;
    create_time?: string;
}

export interface tag {
    id: number;
    tag_name: string;
    create_time?: string;
}

