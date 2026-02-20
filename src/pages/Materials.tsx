import { useEffect, useState } from 'react';
import { materialsApi } from '../api/content';
import type { MaterialNode } from '../types';

function FileTree({ nodes, depth = 0 }: { nodes: MaterialNode[]; depth?: number }) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const toggle = (path: string) => setOpenFolders(p => ({ ...p, [path]: !p[path] }));

  return (
    <ul className={`space-y-0.5 ${depth > 0 ? 'ml-4 border-l border-gray-200 dark:border-gray-800 pl-2 mt-0.5' : ''}`}>
      {nodes.map(node => (
        <li key={node.path}>
          {node.type === 'folder' ? (
            <>
              <button
                onClick={() => toggle(node.path)}
                className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded text-sm
                  hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400
                  hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <span className="text-[10px] w-2">{openFolders[node.path] ? '▼' : '▶'}</span>
                <span>📁</span>
                <span className="truncate flex-1">{node.name}</span>
                {node.children && (
                  <span className="text-xs text-gray-400 shrink-0">
                    {node.children.filter(c => c.type !== 'folder').length || ''}
                  </span>
                )}
              </button>
              {openFolders[node.path] && node.children && (
                <FileTree nodes={node.children} depth={depth + 1} />
              )}
            </>
          ) : node.type === 'audio' ? (
            <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 group transition-colors">
              <span className="text-xs shrink-0">🎵</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 truncate flex-1">
                {node.name}
              </span>
              <a href={node.url} target="_blank" rel="noreferrer"
                className="opacity-0 group-hover:opacity-100 btn-ghost py-0.5 px-2 text-xs rounded shrink-0">
                Open ↗
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 group transition-colors">
              <span className="text-xs shrink-0">📄</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 truncate flex-1">
                {node.name}
              </span>
              <a href={node.url} target="_blank" rel="noreferrer"
                className="opacity-0 group-hover:opacity-100 btn-ghost py-0.5 px-2 text-xs rounded shrink-0">
                Open ↗
              </a>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function MaterialsPage() {
  const [tree, setTree] = useState<MaterialNode[]>([]);
  const [stats, setStats] = useState<{ audioFiles: number; pdfFiles: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([materialsApi.getTree(), materialsApi.getStats()])
      .then(([treeData, statsData]) => {
        setTree(treeData.tree ?? []);
        setStats(statsData);
      })
      .catch(() => setError('Could not load materials. Make sure the backend server is running.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">📁 Materials Library</h1>
          <p className="text-gray-500 text-sm mt-1">Browse all your textbook audio and PDF files</p>
        </div>
        {stats && (
          <div className="flex gap-2 flex-wrap">
            <span className="badge bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700/50">
              🎵 {stats.audioFiles.toLocaleString()} audio
            </span>
            <span className="badge bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700/50">
              📄 {stats.pdfFiles} PDFs
            </span>
          </div>
        )}
      </div>

      <div className="card bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-transparent border-blue-200 dark:border-blue-700/30">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Tip:</strong> Use the <strong>🎧 Listening</strong> page for a full audio player experience.
        </p>
      </div>

      {error && (
        <div className="card border-red-500/40 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="card overflow-auto">
        {loading ? (
          <div className="text-center py-10">
            <div className="text-3xl animate-spin mb-2">⏳</div>
            <p className="text-gray-500 text-sm">Loading materials…</p>
          </div>
        ) : tree.length === 0 && !error ? (
          <div className="text-center py-10 text-gray-500 text-sm">No materials found.</div>
        ) : (
          <FileTree nodes={tree} />
        )}
      </div>
    </div>
  );
}
