export declare const DIRECTOR_IDS: readonly ['llm', 'jev'];
export type DirectorId = (typeof DIRECTOR_IDS)[number];
export declare const isDirectorId: (v: unknown) => v is DirectorId;
export declare const DIRECTOR_LABELS: Readonly<Record<DirectorId, string>>;
