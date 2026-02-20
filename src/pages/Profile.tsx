import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userApi } from '../api/auth';
import { LEVELS } from '../types';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [currentLevel, setCurrentLevel] = useState(user?.currentLevel ?? 'A1');
  const [saving, setSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  const [curPass, setCurPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passSaving, setPassSaving] = useState(false);

  const saveProfile = async () => {
    setSaving(true);
    setProfileMsg('');
    try {
      const updated = await userApi.updateProfile({ displayName, currentLevel });
      updateUser({ displayName: updated.displayName, currentLevel: updated.currentLevel });
      setProfileMsg('✅ Profile updated!');
    } catch {
      setProfileMsg('❌ Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    setPassSaving(true);
    setPassMsg('');
    try {
      await userApi.changePassword(curPass, newPass);
      setPassMsg('✅ Password updated!');
      setCurPass(''); setNewPass('');
    } catch {
      setPassMsg('❌ Failed to change password');
    } finally {
      setPassSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="animate-fade-in max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">👤 Profile</h1>

      {/* Profile card */}
      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-2xl font-bold">
            {user?.displayName[0].toUpperCase()}
          </div>
          <div>
            <p className="text-xl font-bold text-white">{user?.displayName}</p>
            <p className="text-gray-400 text-sm">@{user?.username}</p>
            <span className={`badge badge-${currentLevel.toLowerCase()} mt-1`}>{currentLevel}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Display Name</label>
            <input className="input" value={displayName} onChange={e => setDisplayName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Level</label>
            <div className="flex gap-2 flex-wrap">
              {LEVELS.map(l => (
                <button
                  key={l}
                  onClick={() => setCurrentLevel(l)}
                  className={`badge cursor-pointer badge-${l.toLowerCase()} ${currentLevel !== l && 'opacity-40 hover:opacity-100'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {profileMsg && <p className={`text-sm ${profileMsg.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>{profileMsg}</p>}

          <button onClick={saveProfile} disabled={saving} className="btn-primary w-full">
            {saving ? '⏳ Saving…' : 'Save Profile'}
          </button>
        </div>
      </div>

      {/* Change password */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">🔒 Change Password</h2>
        <div className="space-y-3">
          <input type="password" className="input" placeholder="Current password" value={curPass} onChange={e => setCurPass(e.target.value)} autoComplete="current-password" />
          <input type="password" className="input" placeholder="New password (min. 6 chars)" value={newPass} onChange={e => setNewPass(e.target.value)} minLength={6} autoComplete="new-password" />
          {passMsg && <p className={`text-sm ${passMsg.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>{passMsg}</p>}
          <button onClick={changePassword} disabled={passSaving || !curPass || newPass.length < 6} className="btn-secondary w-full">
            {passSaving ? '⏳ Updating…' : 'Change Password'}
          </button>
        </div>
      </div>

      {/* Account info */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-3">ℹ️ Account Info</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Username</span>
            <span className="text-gray-300">@{user?.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">User ID</span>
            <span className="text-gray-300">#{user?.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">App Mode</span>
            <span className="text-green-400">🔒 Local · Private</span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button onClick={handleLogout} className="btn bg-gray-800 hover:bg-gray-700 text-gray-300 w-full border border-gray-700">
        Sign Out →
      </button>
    </div>
  );
}
