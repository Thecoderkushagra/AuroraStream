import React, { useState } from 'react';

const Settings = () => {
  // Profile Settings
  const [username, setUsername] = useState('aurora_user');

  // Playback Preferences
  const [autoplay, setAutoplay] = useState(true);
  const [quality, setQuality] = useState('Auto');
  const [dataSaver, setDataSaver] = useState(false);

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [renewalReminders, setRenewalReminders] = useState(true);

  // Preferences
  const [language, setLanguage] = useState('English');
  const [subtitleLanguage, setSubtitleLanguage] = useState('English');

  // Privacy
  const [personalizedRecs, setPersonalizedRecs] = useState(true);

  const Toggle = ({ enabled, onChange }) => (
    <button 
      onClick={onChange}
      className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center ${enabled ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-bg-hover)]'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </button>
  );

  const Select = ({ value, onChange, options, disabled = false }) => (
    <div className="relative">
      <select 
        value={value} 
        onChange={onChange}
        disabled={disabled}
        className="bg-base border border-[var(--color-border)] rounded-lg pl-4 pr-10 py-2 text-primary outline-none focus:border-[var(--color-border-strong)] disabled:opacity-50 disabled:cursor-not-allowed appearance-none w-40"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-muted">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto pb-12">
      <h1 className="text-3xl font-bold text-primary">Settings</h1>
      
      {/* Account Settings */}
      <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-primary mb-6">Account Settings</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-primary font-medium">Username</p>
              <p className="text-sm text-muted mt-1">This is how you appear on AuroraStream.</p>
              <p className="text-xs text-[color:var(--color-warning)] mt-2 italic">* You can only change your username once every 3 months.</p>
            </div>
            <div className="flex items-center gap-3">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-base border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-primary outline-none focus:border-[var(--color-primary)] transition-colors w-full md:w-56"
              />
              <button className="btn-primary px-6 py-2.5 font-semibold">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Playback Preferences */}
      <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-primary mb-6">Playback Preferences</h2>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Autoplay Next Episode</p>
              <p className="text-sm text-muted mt-1">Automatically play the next episode in a series.</p>
            </div>
            <Toggle enabled={autoplay} onChange={() => setAutoplay(!autoplay)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Default Video Quality</p>
              <p className="text-sm text-muted mt-1">Select the default streaming quality.</p>
            </div>
            <Select 
              value={quality} 
              onChange={(e) => setQuality(e.target.value)} 
              options={['Auto', '4K', '1080p', '720p', '480p']} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Data Saver Mode</p>
              <p className="text-sm text-muted mt-1">Reduce data usage by streaming at lower quality.</p>
            </div>
            <Toggle enabled={dataSaver} onChange={() => setDataSaver(!dataSaver)} />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-primary mb-6">Notifications</h2>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Email Notifications</p>
              <p className="text-sm text-muted mt-1">Receive updates about new releases and recommendations.</p>
            </div>
            <Toggle enabled={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Subscription Renewal Reminders</p>
              <p className="text-sm text-muted mt-1">Get notified before your subscription is renewed.</p>
            </div>
            <Toggle enabled={renewalReminders} onChange={() => setRenewalReminders(!renewalReminders)} />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-primary mb-6">Preferences</h2>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Theme</p>
              <p className="text-sm text-muted mt-1">Select your preferred app appearance.</p>
            </div>
            <Select 
              value="Dark" 
              onChange={() => {}} 
              options={['Dark']} 
              disabled={true} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Language</p>
              <p className="text-sm text-muted mt-1">Set your preferred display language.</p>
            </div>
            <Select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)} 
              options={['English', 'Spanish', 'French', 'German', 'Japanese']} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Subtitle Language</p>
              <p className="text-sm text-muted mt-1">Set the default language for subtitles.</p>
            </div>
            <Select 
              value={subtitleLanguage} 
              onChange={(e) => setSubtitleLanguage(e.target.value)} 
              options={['English', 'Spanish', 'French', 'German', 'Japanese', 'None']} 
            />
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-primary mb-6">Privacy</h2>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Personalized Recommendations</p>
              <p className="text-sm text-muted mt-1">Allow us to use your viewing history to suggest content.</p>
            </div>
            <Toggle enabled={personalizedRecs} onChange={() => setPersonalizedRecs(!personalizedRecs)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Clear Watch History</p>
              <p className="text-sm text-muted mt-1">Remove all previously watched content from your account.</p>
            </div>
            <button className="px-4 py-2 bg-[var(--color-error-bg)] text-[color:var(--color-error)] font-medium rounded-lg hover:bg-[var(--color-error-bg)] transition-colors border border-[var(--color-error)]">
              Clear History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
