import { useEffect, useRef, useState } from 'react';
import { materialsApi } from '../api/content';
import type { MaterialNode } from '../types';

function FolderTree({
  nodes,
  onSelectFolder,
  selected,
}: {
  nodes: MaterialNode[];
  onSelectFolder: (path: string) => void;
  selected: string;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <ul className="space-y-0.5">
      {nodes.map(node => {
        if (node.type !== 'folder') return null;
        const hasAudio = (node.children ?? []).some(c => c.type === 'audio' || c.type === 'folder');
        if (!hasAudio) return null;
        const isOpen = expanded[node.path];
        return (
          <li key={node.path}>
            <button
              onClick={() => {
                setExpanded(p => ({ ...p, [node.path]: !p[node.path] }));
                onSelectFolder(node.path);
              }}
              className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded text-sm
                hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                ${selected === node.path
                  ? 'bg-red-600/10 text-red-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400'}`}
            >
              <span className="text-[10px] w-2">{isOpen ? '▼' : '▶'}</span>
              <span>📁</span>
              <span className="truncate flex-1">{node.name}</span>
            </button>
            {isOpen && node.children && (
              <div className="ml-4 border-l border-gray-200 dark:border-gray-800 pl-2 mt-0.5">
                <FolderTree nodes={node.children} onSelectFolder={onSelectFolder} selected={selected} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function ListeningPage() {
  const [tree, setTree] = useState<MaterialNode[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [audioFiles, setAudioFiles] = useState<{ name: string; url: string }[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [wantPlay, setWantPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    materialsApi.getTree()
      .then(d => setTree(d.tree ?? []))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedFolder) return;
    materialsApi.getAudioFiles(selectedFolder)
      .then(d => {
        setAudioFiles(d.files ?? []);
        setCurrentIdx(0);
        setPlaying(false);
        setWantPlay(false);
        setProgress(0);
        setDuration(0);
      })
      .catch(() => setAudioFiles([]));
  }, [selectedFolder]);

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
        <p className="text-gray-500 text-sm mt-1">Browse textbook audio from your Materials library</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {/* Folder tree */}
        <div className="card overflow-y-auto max-h-[60vh] lg:max-h-none">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">📁 Select a Book / CD</h2>
          {loading ? (
            <p className="text-gray-500 text-sm">Loading materials…</p>
          ) : (
            <FolderTree nodes={tree} onSelectFolder={setSelectedFolder} selected={selectedFolder} />
          )}
        </div>

        {/* Player + track list */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {current && (
            <div className="card bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <p className="text-xs text-gray-500 mb-1">Now Playing</p>
              <p className="font-semibold text-white truncate text-sm sm:text-base">
                {current.name.replace(/\.\w+$/, '')}
              </p>
              <audio
                ref={audioRef}
                src={current.url}
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

          {!selectedFolder ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-center py-16">
              <div><div className="text-5xl mb-3">🎵</div><p className="text-sm">Select a folder to browse audio files</p></div>
            </div>
          ) : audioFiles.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 py-12 text-sm">
              No audio files in this folder
            </div>
          ) : (
            <div className="card flex-1 overflow-y-auto max-h-[50vh] lg:max-h-none">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{audioFiles.length} tracks</p>
              <ul className="space-y-1">
                {audioFiles.map((f, i) => (
                  <li key={f.url}>
                    <button
                      onClick={() => goToTrack(i, true)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                        ${i === currentIdx
                          ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}`}
                    >
                      <span className="text-xs w-5 text-center shrink-0">{i + 1}</span>
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
