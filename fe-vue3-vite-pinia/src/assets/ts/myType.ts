export interface lyricType {
    index: number;
    lyricStr?: string;
    transLyricStr?: string;
    time: number
}

export interface article {
    id?: number;
    category_id: number;
    article_cover: string;
    article_title: string;
    article_content: string;
    article_content_md: string;
    update_time: string;
    create_time: string;
    type: number;
    is_top: number;
    tag_list: Array<tag>;
}

export interface tag {
    id: number;
    tag_name: string;
    create_time?: string;
}
