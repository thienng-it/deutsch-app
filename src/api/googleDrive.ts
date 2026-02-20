/**
 * googleDrive.ts — CLIENT-SIDE only
 *
 * ✅ SECURE: No API key, no folder ID, no Drive credentials here.
 *
 * The build-time script (fetch_drive_materials.cjs) fetches the folder tree
 * during GitHub Actions and writes it to public/materials.json.
 * This module simply reads that pre-built static file.
 *
 * Audio files are streamed using only their Drive file ID — knowing a file ID
 * does NOT let anyone browse or discover the parent folder.
 */

export interface DriveNode {
    id: string;
    name: string;
    type: 'folder' | 'audio' | 'pdf' | 'file';
    children?: DriveNode[];
}

/** Load the pre-built materials tree generated at deploy time */
export async function loadMaterialsTree(): Promise<DriveNode[]> {
    const res = await fetch('./materials.json');
    if (!res.ok) throw new Error(`Could not load materials.json (${res.status})`);
    const data = await res.json() as { tree: DriveNode[] };
    return data.tree ?? [];
}

/** Get a streamable audio URL by file ID only — no API key needed */
export function getAudioStreamUrl(fileId: string): string {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

/** Get a Drive file view URL by file ID */
export function getDriveFileUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/view`;
}

/** Get all audio files directly inside a given folder node */
export function getDirectAudioFiles(
    nodes: DriveNode[],
    folderId: string,
): { name: string; url: string; id: string }[] {
    for (const n of nodes) {
        if (n.type === 'folder' && n.id === folderId) {
            return (n.children ?? [])
                .filter(c => c.type === 'audio')
                .map(c => ({ name: c.name, url: getAudioStreamUrl(c.id), id: c.id }));
        }
        if (n.type === 'folder' && n.children) {
            const found = getDirectAudioFiles(n.children, folderId);
            if (found.length > 0) return found;
        }
    }
    return [];
}
