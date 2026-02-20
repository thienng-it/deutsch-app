/**
 * Google Drive API v3 — read-only integration for public shared folders.
 *
 * Required: VITE_GOOGLE_API_KEY env variable (restricted to Drive API).
 * The Drive folder must be publicly shared ("Anyone with the link can view").
 */

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string;
const BASE = 'https://www.googleapis.com/drive/v3';

/** Root folder ID from the shared link */
export const DRIVE_ROOT_FOLDER_ID = '1dI_to_W2-usEGNYG7FmZ9pR_pxj0aGa6';

export interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
}

/** List direct children of a Drive folder */
async function listChildren(folderId: string): Promise<DriveFile[]> {
    const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
    const fields = encodeURIComponent('files(id,name,mimeType)');
    const url = `${BASE}/files?q=${q}&fields=${fields}&pageSize=1000&key=${API_KEY}&orderBy=name`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Drive API error ${res.status}`);
    const data = await res.json() as { files: DriveFile[] };
    return data.files ?? [];
}

const AUDIO_MIMES = new Set([
    'audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav', 'audio/aac', 'audio/flac',
]);
const PDF_MIMES = new Set(['application/pdf']);
const FOLDER_MIME = 'application/vnd.google-apps.folder';

/** Get a direct-stream URL for an audio file */
export function getAudioStreamUrl(fileId: string): string {
    // Using resource key approach for public files
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

/** MaterialNode compatible with existing FileTree components */
export interface DriveNode {
    id: string;
    name: string;
    type: 'folder' | 'audio' | 'pdf' | 'file';
    url: string;
    mimeType: string;
    children?: DriveNode[];
    path: string; // folder ID used as path for compatibility
}

/** Recursively build folder tree (max 2 levels deep to stay fast) */
export async function buildDriveTree(
    folderId: string,
    depth = 0,
    maxDepth = 3,
): Promise<DriveNode[]> {
    const children = await listChildren(folderId);
    return Promise.all(
        children.map(async (f): Promise<DriveNode> => {
            if (f.mimeType === FOLDER_MIME) {
                const subChildren = depth < maxDepth
                    ? await buildDriveTree(f.id, depth + 1, maxDepth)
                    : [];
                return {
                    id: f.id,
                    name: f.name,
                    type: 'folder',
                    url: `https://drive.google.com/drive/folders/${f.id}`,
                    mimeType: f.mimeType,
                    children: subChildren,
                    path: f.id,
                };
            }
            const isAudio = AUDIO_MIMES.has(f.mimeType);
            const isPdf = PDF_MIMES.has(f.mimeType);
            return {
                id: f.id,
                name: f.name,
                type: isAudio ? 'audio' : isPdf ? 'pdf' : 'file',
                url: isAudio
                    ? getAudioStreamUrl(f.id)
                    : `https://drive.google.com/file/d/${f.id}/view`,
                mimeType: f.mimeType,
                path: f.id,
            };
        }),
    );
}

/** Flatten audio files from a folder node's children */
export function collectAudioFiles(nodes: DriveNode[]): { name: string; url: string; id: string }[] {
    const out: { name: string; url: string; id: string }[] = [];
    for (const n of nodes) {
        if (n.type === 'audio') out.push({ name: n.name, url: n.url, id: n.id });
        if (n.children) out.push(...collectAudioFiles(n.children));
    }
    return out;
}

/** Find audio files directly inside a specific folder by ID */
export async function getAudioFilesInFolder(folderId: string): Promise<{ name: string; url: string; id: string }[]> {
    const children = await listChildren(folderId);
    return children
        .filter(f => AUDIO_MIMES.has(f.mimeType))
        .map(f => ({ name: f.name, url: getAudioStreamUrl(f.id), id: f.id }));
}
