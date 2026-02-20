import { useEffect, useState } from 'react';
import { materialsApi } from '../api/content';
import type { MaterialNode } from '../types';

function FileTree({ nodes, depth = 0 }: { nodes: MaterialNode[]; depth?: number }) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  const toggle = (path: string) => setOpenFolders(p => ({ ...p, [path]: !p[path] }));

  return (
    <ul className={`space-y-0.5 ${depth > 0 ? 'ml-4 border-l border-gray-800 pl-2 mt-0.5' : ''}`}>
      {nodes.map(node => (
        <li key={node.path}>
          {node.type === 'folder' ? (
            <>
              <button
                onClick={() => toggle(node.path)}
                className="w-full text-left flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <span className="text-xs">{openFolders[node.path] ? '▼' : '▶'}</span>
                <span>📁</span>
                <span className="truncate flex-1">{node.name}</span>
                {node.children && (
                  <span className="text-xs text-gray-600 shrink-0">
                    {node.children.filter(c => c.type !== 'folder').length || ''}
                  </span>
                )}
              </button>
              {openFolders[node.path] && node.children && (
                <FileTree nodes={node.children} depth={depth + 1} />
              )}
            </>
          ) : node.type === 'audio' ? (
            <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-800 group">
              <span className="text-xs text-gray-600">🎵</span>
              <span className="text-sm text-gray-400 group-hover:text-gray-200 truncate flex-1">{node.name}</span>
              <a href={node.url} target="_blank" rel="noreferrer"
                className="opacity-0 group-hover:opacity-100 btn-ghost py-0.5 px-2 text-xs rounded">
                Open
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-800 group">
              <span className="text-xs text-gray-600">📄</span>
              <span className="text-sm text-gray-400 group-hover:text-gray-200 truncate flex-1">{node.name}</span>
              <a href={node.url} target="_blank" rel="noreferrer"
                className="opacity-0 group-hover:opacity-100 btn-ghost py-0.5 px-2 text-xs rounded">
                Open
              </a>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function MaterialsPage() {
  const [tree, setTree]   = useState<MaterialNode[]>([]);
  const [stats, setStats] = useState<{ audioFiles: number; pdfFiles: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([materialsApi.getTree(), materialsApi.getStats()])
      .then(([treeData, statsData]) => { setTree(treeData.tree ?? []); setStats(statsData); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">📁 Materials Library</h1>
          <p className="text-gray-400 text-sm mt-1">Browse all your textbook audio and PDF files</p>
        </div>
        {stats && (
          <div className="flex gap-3">
            <span className="badge bg-blue-900/40 text-blue-400 border-blue-700/50">🎵 {stats.audioFiles.toLocaleString()} audio</span>
            <span className="badge bg-red-900/40 text-red-400 border-red-700/50">📄 {stats.pdfFiles} PDFs</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="card bg-gradient-to-br from-blue-900/20 to-gray-900 border-blue-700/30">
        <p className="text-sm text-gray-300">
          💡 <strong>Tip:</strong> Use the <strong>🎧 Listening</strong> page for a full audio player experience.
          Here you can browse and open individual files.
        </p>
      </div>

      {/* Tree */}
      <div className="card overflow-auto">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading materials tree…</div>
        ) : tree.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No materials found.</div>
        ) : (
          <FileTree nodes={tree} />
        )}
      </div>
    </div>
  );
}
