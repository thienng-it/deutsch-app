import { useState } from 'react';
import {
  CURRICULUM, getProgress, markSkillDone,
  SKILL_KEYS, SKILL_META,
  type ChapterDef, type SkillKey, type DayProgress,
} from '../data/curriculum';
import InteractiveExercise from '../components/InteractiveExercise';

// ─── Day Lesson View ────────────────────────────────────
function DayLesson({ chapter, dayNum, onBack }: {
  chapter: ChapterDef; dayNum: number; onBack: () => void;
}) {
  const day = chapter.days.find(d => d.num === dayNum)!;
  const [tab, setTab] = useState<SkillKey>('listening');
  const [progress, setProgress] = useState<DayProgress>(() => {
    const all = getProgress();
    return all[`${chapter.id}_day${dayNum}`] ?? {};
  });
  const [showAnswer, setShowAnswer] = useState(false);

  const skill = day.skills[tab];
  const allDone = SKILL_KEYS.every(k => progress[k]);
  const doneCount = SKILL_KEYS.filter(k => progress[k]).length;

  const handleMarkDone = () => {
    markSkillDone(chapter.id, dayNum, tab);
    setProgress(p => ({ ...p, [tab]: true }));
    setShowAnswer(false);
    // auto-advance to next incomplete skill
    const nextSkill = SKILL_KEYS.find(k => k !== tab && !progress[k]);
    if (nextSkill) setTab(nextSkill);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="btn-ghost px-3 py-1.5 rounded-lg text-sm">← Back</button>
        <div className="flex-1">
          <p className="text-xs text-gray-500">{chapter.title}</p>
          <h2 className="text-lg font-bold text-white">Day {dayNum}: {day.title}</h2>
        </div>
        <span className={`text-sm font-bold ${allDone ? 'text-green-400' : 'text-gray-500'}`}>
          {doneCount}/4 ✓
        </span>
      </div>

      {/* Skill tabs */}
      <div className="flex gap-1.5 bg-gray-800/50 rounded-xl p-1">
        {SKILL_KEYS.map(k => (
          <button key={k} onClick={() => { setTab(k); setShowAnswer(false); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${tab === k
              ? 'bg-red-600 text-white shadow-lg'
              : progress[k]
                ? 'text-green-400 hover:bg-gray-700'
                : 'text-gray-400 hover:bg-gray-700'
              }`}>
            <span>{SKILL_META[k].icon}</span>
            <span className="hidden sm:inline">{SKILL_META[k].label}</span>
            {progress[k] && <span className="text-xs">✓</span>}
          </button>
        ))}
      </div>

      {/* Textbook Gallery */}
      {chapter.imagePaths && chapter.imagePaths.length > 0 && (
        <div className="card bg-gray-900 border border-gray-700/50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-300 text-sm flex items-center gap-2">
              <span className="text-xl">📚</span> Textbook Reference
            </h3>
            <span className="text-xs px-2 py-1 bg-gray-800 rounded font-mono text-gray-400">
              {chapter.imagePaths.length} Pages
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
            {chapter.imagePaths.map((src, i) => (
              <img
                key={i}
                src={`/materials/${src.replace(/'/g, '')}`}
                className="h-64 sm:h-96 object-contain rounded border border-gray-700/50 bg-white snap-center shrink-0 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.open(`/materials/${src.replace(/'/g, '')}`, '_blank')}
                alt={`Page ${i + 1}`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 italic text-center pt-1">Click a page to view full size</p>
        </div>
      )}

      {/* Activity card */}
      <div className="card bg-gradient-to-br from-gray-900 to-gray-800 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{SKILL_META[tab].icon}</span>
          <h3 className="text-base font-bold text-white">{SKILL_META[tab].label}</h3>
          {progress[tab] && <span className="badge bg-green-900/50 text-green-300 border-green-700/50 text-xs ml-auto">Done ✓</span>}
        </div>

        <p className="text-sm text-yellow-300 font-medium">{skill.instruction}</p>

        <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700/50">
          <pre className="text-gray-200 text-sm whitespace-pre-wrap font-sans leading-relaxed">{skill.content}</pre>
        </div>

        {/* Audio player for Listening exercises */}
        {skill.audioPath && (
          <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-700/30">
            <p className="text-xs text-blue-300 mb-2 font-medium">🎧 Textbook Audio</p>
            <audio
              controls
              className="w-full h-10"
              src={`/materials/${skill.audioPath.split('/').map(s => encodeURIComponent(s)).join('/')}`}
            />
          </div>
        )}

        {/* Interactive exercises — new system */}
        {skill.exercises && skill.exercises.length > 0 && (
          <InteractiveExercise
            key={`${tab}-${dayNum}`}
            exercises={skill.exercises}
            onAllComplete={(score, total) => {
              console.log(`Score: ${score}/${total}`);
            }}
          />
        )}

        {/* Legacy Q&A fallback */}
        {!skill.exercises && skill.question && (
          <div className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/30">
            <p className="text-sm text-gray-300 font-medium">❓ {skill.question}</p>
            {skill.answer && (
              <div className="mt-2">
                {showAnswer ? (
                  <p className="text-sm text-green-300 bg-green-900/20 rounded p-2">✅ {skill.answer}</p>
                ) : (
                  <button onClick={() => setShowAnswer(true)}
                    className="text-xs text-blue-400 hover:text-blue-300 underline">
                    Show Answer
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {!progress[tab] ? (
          <button onClick={handleMarkDone} className="btn-primary w-full text-sm py-2.5">
            ✅ Mark {SKILL_META[tab].label} as Done
          </button>
        ) : (
          <p className="text-center text-sm text-green-400">✅ Completed!</p>
        )}
      </div>

      {/* All done celebration */}
      {allDone && (
        <div className="card bg-gradient-to-r from-yellow-900/30 to-green-900/30 border-yellow-600/30 text-center py-6">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-lg font-bold text-white">Day {dayNum} Complete!</h3>
          <p className="text-sm text-gray-400 mt-1">Great job! All 4 skills done.</p>
          {dayNum < chapter.days.length && (
            <button onClick={() => {
              onBack();
            }} className="btn-primary mt-4 text-sm px-6">
              ← Back to Chapter
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Chapter Card ───────────────────────────────────────
function ChapterCard({ chapter, onSelectDay }: {
  chapter: ChapterDef;
  onSelectDay: (ch: ChapterDef, day: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const progress = getProgress();

  const dayStats = chapter.days.map(d => {
    const p = progress[`${chapter.id}_day${d.num}`] ?? {};
    return { num: d.num, title: d.title, done: SKILL_KEYS.filter(k => p[k]).length };
  });
  const totalDone = dayStats.filter(d => d.done === 4).length;
  const pct = Math.round((totalDone / chapter.days.length) * 100);

  return (
    <div className="card border border-gray-700/50 transition-all">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-sm">{chapter.title}</h3>
          <p className="text-xs text-gray-500">{chapter.subtitle}</p>
        </div>
        <span className="text-xs text-gray-400 shrink-0">{totalDone}/{chapter.days.length}</span>
        <span className="text-gray-500 text-xs">{open ? '▲' : '▼'}</span>
      </button>

      <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-red-500 to-yellow-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>

      {open && (
        <div className="mt-3 space-y-1.5">
          {dayStats.map(d => {
            const isDone = d.done === 4;
            const dp = progress[`${chapter.id}_day${d.num}`] ?? {};
            return (
              <button key={d.num} onClick={() => onSelectDay(chapter, d.num)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${isDone ? 'bg-green-900/20 border border-green-700/30 text-green-300'
                  : 'bg-gray-800/50 border border-gray-700/30 text-gray-300 hover:border-gray-600'
                  }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isDone ? 'bg-green-700/50 text-green-300' : 'bg-gray-700 text-gray-400'
                  }`}>{isDone ? '✓' : d.num}</span>
                <span className="flex-1 text-left text-sm">{d.title}</span>
                <div className="flex gap-0.5">
                  {SKILL_KEYS.map(k => (
                    <span key={k} className={`text-xs ${dp[k] ? '' : 'opacity-20'}`}>{SKILL_META[k].icon}</span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────
export default function LearningPlanPage() {
  const [activeDay, setActiveDay] = useState<{ chapter: ChapterDef; day: number } | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');

  if (activeDay) {
    return (
      <div className="animate-fade-in">
        <DayLesson
          chapter={activeDay.chapter}
          dayNum={activeDay.day}
          onBack={() => setActiveDay(null)}
        />
      </div>
    );
  }

  const filteredCurriculum = CURRICULUM.filter(ch => ch.level === selectedLevel);

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">📅 Learning Plan</h1>
        <p className="text-gray-400 text-sm mt-1">Follow chapter by chapter, day by day — like an online tutor</p>
      </div>

      {/* Level Tabs */}
      <div className="flex gap-2">
        {['A1', 'A2', 'B1'].map(l => (
          <button
            key={l}
            onClick={() => setSelectedLevel(l)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedLevel === l
              ? l === 'A1' ? 'bg-green-600 text-white' : l === 'A2' ? 'bg-orange-600 text-white' : 'bg-blue-600 text-white'
              : 'bg-gray-800/50 text-gray-500 hover:bg-gray-700/50 hover:text-gray-300'
              }`}
          >
            {l} Curriculum
          </button>
        ))}
      </div>

      {/* Chapters */}
      <div className="space-y-3 mt-4">
        {filteredCurriculum.map(ch => (
          <ChapterCard key={ch.id} chapter={ch} onSelectDay={(c, d) => setActiveDay({ chapter: c, day: d })} />
        ))}
        {filteredCurriculum.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No chapters available for {selectedLevel} yet.
          </div>
        )}
      </div>
    </div>
  );
}

