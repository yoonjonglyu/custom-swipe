export declare function getURL(): string;
export declare function getSearchParams(): {
    [key: string]: string;
};
export declare function formatQueryString(obj: {
    [key: string]: string;
}): string;
export declare function setHistory(data: {
    [key: string]: string;
}, url?: string): void;
