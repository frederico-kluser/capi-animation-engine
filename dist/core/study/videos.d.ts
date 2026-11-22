import type { StudyVideo, StudyVideosJson } from '../../contracts/study.js';
export declare const YOUTUBE_ID: RegExp;
export declare function youtubeSeconds(text: string | null | undefined): number | undefined;
export declare function parseYouTubeLink(input: string): {
    id: string;
    start?: number;
} | null;
export declare function youtubeWatchUrl(id: string, start?: number): string;
export declare const emptyStudyVideos: () => StudyVideosJson;
export declare function readStudyVideo(value: unknown): StudyVideo | null;
export declare function readStudyVideos(value: unknown): StudyVideosJson;
export declare function withStudyVideo(file: StudyVideosJson, path: string, video: StudyVideo): StudyVideosJson;
export declare function withoutStudyVideo(file: StudyVideosJson, path: string): StudyVideosJson;
export declare function videoDurationLabel(seconds: number | undefined): string;
