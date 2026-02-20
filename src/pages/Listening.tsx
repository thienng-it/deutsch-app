import { useEffect, useState, useRef } from 'react';
import {
  loadMaterialsTree,
  getDirectAudioFiles,
  type DriveNode,
} from '../api/googleDrive';

// ── Folder tree (left panel) ──────────────────────────────────────────
function FolderTree({
  nodes,
  onSelectFolder,
  selected,
  depth = 0,
}: {
  nodes: DriveNode[];
  onSelectFolder: (id: string) => void;
  selected: string;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const folders = nodes.filter(n => n.type === 'folder');
  if (folders.length === 0) return null;

  return (
    <ul className="space-y-0.5">
      {folders.map(node => {
        const isOpen = expanded[node.id];
        return (
          <li key={node.id}>
            <button
              onClick={() => {
                setExpanded(p => ({ ...p, [node.id]: !p[node.id] }));
                onSelectFolder(node.id);
              }}
              className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded text-sm
                hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                ${selected === node.id
                  ? 'bg-red-600/10 text-red-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400'}`}
            >
              <span className="text-[10px] w-2">{isOpen ? '▼' : '▶'}</span>
              <span>📁</span>
              <span className="truncate flex-1">{node.name}</span>
            </button>
            {isOpen && node.children && (
              <div className={`ml-4 border-l border-gray-200 dark:border-gray-800 pl-2 mt-0.5`}>
                <FolderTree
                  nodes={node.children}
                  onSelectFolder={onSelectFolder}
                  selected={selected}
                  depth={depth + 1}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// ── Listening page ────────────────────────────────────────────────────
export default function ListeningPage() {
  const [tree, setTree] = useState<DriveNode[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [audioFiles, setAudioFiles] = useState<{ name: string; url: string; id: string }[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [wantPlay, setWantPlay] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load folder tree once (from pre-built static JSON)
  useEffect(() => {
    loadMaterialsTree()
      .then(setTree)
      .catch(() => setError('Could not load materials. Make sure the site was deployed with valid Drive secrets.'))
      .finally(() => setLoading(false));
  }, []);

  // Get audio files from the in-memory tree (no extra network call)
  useEffect(() => {
    if (!selectedId || tree.length === 0) return;
    setLoadingFiles(true);
    setAudioFiles([]);
    setCurrentIdx(0);
    setPlaying(false);
    setWantPlay(false);
    setProgress(0);
    setDuration(0);
    const files = getDirectAudioFiles(tree, selectedId);
    setAudioFiles(files);
    setLoadingFiles(false);
  }, [selectedId, tree]);

  // Reload audio element when track changes
  useEffect(() => {
    const el = audioRef.current;
    if (!el || audioFiles.length === 0) return;
    el.load();
    setProgress(0);
    setDuration(0);
    if (wantPlay) {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [currentIdx, audioFiles, wantPlay]);

  const current = audioFiles[currentIdx] ?? null;

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); setWantPlay(false); }
    else { el.play(); setPlaying(true); setWantPlay(true); }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = (parseFloat(e.target.value) / 100) * el.duration;
  };

  const goToTrack = (idx: number, autoPlay = true) => {
    setCurrentIdx(idx);
    setWantPlay(autoPlay);
    if (!autoPlay) setPlaying(false);
  };

  const fmt = (s: number) =>
    isNaN(s) ? '0:00' : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">🎧 Listening Practice</h1>
        <p className="text-gray-500 text-sm mt-1">Browse audio from your Google Drive materials</p>
      </div>

      {error && (
        <div className="card border-red-600/40 bg-red-900/10 text-red-400 text-sm">{error}</div>
      )}

      <div className="grid lg:grid-cols-3 gap-4" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {/* Folder tree */}
        <div className="card overflow-y-auto max-h-[60vh] lg:max-h-none">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">📁 Browse Folders</h2>
          {loading ? (
            <div className="text-center py-6">
              <div className="text-2xl animate-spin">⏳</div>
              <p className="text-gray-500 text-xs mt-2">Loading from Google Drive…</p>
            </div>
          ) : (
            <FolderTree nodes={tree} onSelectFolder={setSelectedId} selected={selectedId} />
          )}
        </div>

        {/* Player + track list */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* Player card */}
          {current && (
            <div className="card bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <p className="text-xs text-gray-500 mb-1">Now Playing</p>
              <p className="font-semibold text-white truncate text-sm sm:text-base">
                {current.name.replace(/\.\w+$/, '')}
              </p>

              <audio
                ref={audioRef}
                src={current.url}
                crossOrigin="anonymous"
                onTimeUpdate={() => {
                  const el = audioRef.current;
                  if (el) setProgress((el.currentTime / el.duration) * 100 || 0);
                }}
                onLoadedMetadata={() => { if (audioRef.current) setDuration(audioRef.current.duration); }}
                onEnded={() => {
                  if (currentIdx < audioFiles.length - 1) goToTrack(currentIdx + 1, true);
                  else { setPlaying(false); setWantPlay(false); }
                }}
              />

              <div className="mt-4 space-y-1">
                <input type="range" min="0" max="100" value={progress} onChange={seek}
                  className="w-full accent-red-500 cursor-pointer h-1" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{fmt((progress / 100) * duration)}</span>
                  <span>{fmt(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4">
                <button onClick={() => goToTrack(Math.max(0, currentIdx - 1), playing)}
                  className="btn-ghost p-2 rounded-full text-lg" disabled={currentIdx === 0}>⏮</button>
                <button onClick={togglePlay} className="btn-primary rounded-full w-12 h-12 text-xl">
                  {playing ? '⏸' : '▶'}
                </button>
                <button onClick={() => goToTrack(Math.min(audioFiles.length - 1, currentIdx + 1), playing)}
                  className="btn-ghost p-2 rounded-full text-lg" disabled={currentIdx === audioFiles.length - 1}>⏭</button>
              </div>
            </div>
          )}

          {/* Track list */}
          {!selectedId ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-center py-16">
              <div>
                <div className="text-5xl mb-3">🎵</div>
                <p className="text-sm">Select a folder to browse audio files</p>
              </div>
            </div>
          ) : loadingFiles ? (
            <div className="flex-1 flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-3xl animate-spin">⏳</div>
                <p className="text-gray-500 text-xs mt-2">Loading tracks…</p>
              </div>
            </div>
          ) : audioFiles.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 py-12 text-sm">
              No audio files in this folder
            </div>
          ) : (
            <div className="card flex-1 overflow-y-auto max-h-[50vh] lg:max-h-none">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {audioFiles.length} tracks
              </p>
              <ul className="space-y-1">
                {audioFiles.map((f, i) => (
                  <li key={f.id}>
                    <button
                      onClick={() => goToTrack(i, true)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                        ${i === currentIdx
                          ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}`}
                    >
                      <span className="text-xs w-5 text-center text-gray-500 shrink-0">{i + 1}</span>
                      <span className="flex-1 truncate">{f.name.replace(/\.\w+$/, '')}</span>
                      {i === currentIdx && playing && <span className="text-xs shrink-0">▶</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
