import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { 
  Smartphone, Download, ExternalLink, Copy, Check, QrCode, 
  X, Sparkles, ShieldCheck, ArrowRight, Share2, Terminal, Code2, ChevronDown, ChevronUp
} from 'lucide-react';

interface AndroidInstallModalProps {
  onClose: () => void;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({ onClose }) => {
  const { isInstallable, isInstalled, isAndroid, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showCodeCommands, setShowCodeCommands] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-cnupfwxr5gtca62dtgasrw-943323727285.asia-southeast1.run.app';
  
  // Direct PWABuilder link with pre-filled target site
  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(currentUrl)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Home Workout - No Equipment',
          text: 'Install this zero-equipment Home Workout app directly on your Android phone!',
          url: currentUrl,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-2xl max-h-[92vh] flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4">
          {/* Modal Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-white">
                  Android APK & Testing
                </h2>
                <p className="text-[11px] text-neutral-400">
                  Run natively on your Android device
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Option 1: Instant Native Android WebAPK (Recommended) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-neutral-950 to-neutral-900 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" /> Fastest (Instant)
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">WebAPK</span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">
                Method 1: Direct Android Installation
              </h3>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                Android Chrome automatically builds and packages an <strong>official native WebAPK</strong> with home screen icon, splash screen, and offline caching.
              </p>
            </div>

            {isInstallable ? (
              <button
                onClick={install}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition"
              >
                <Download className="w-4 h-4" /> Install App to Device Now
              </button>
            ) : isInstalled ? (
              <div className="py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-emerald-400 font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Already Running as Installed App
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800/80 text-[11px] text-neutral-300 space-y-1.5">
                <p className="font-semibold text-white">How to install in Chrome on Android:</p>
                <ol className="list-decimal list-inside space-y-1 text-neutral-400">
                  <li>Open this link on your Android phone in <strong>Google Chrome</strong>.</li>
                  <li>Tap the <strong>three dots (⋮)</strong> menu in the top-right.</li>
                  <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                  <li>Android will generate and install the native APK immediately!</li>
                </ol>
              </div>
            )}
          </div>

          {/* Option 2: Generate Standalone .APK via PWABuilder */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Standalone .APK File
              </span>
              <span className="text-[10px] text-neutral-400">PWABuilder</span>
            </div>

            <h3 className="text-sm font-bold text-white">
              Method 2: Download Compiled .APK via PWABuilder
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Generate a signed Android package (<code className="text-neutral-200 bg-neutral-900 px-1 py-0.5 rounded">.apk</code>) ready to sideload or submit to Google Play Store using Microsoft & Google's free builder.
            </p>

            <a
              href={pwaBuilderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>Build .APK with PWABuilder</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>

          {/* Option 3: Build directly from Code (Capacitor / GitHub Actions) */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 flex items-center gap-1">
                <Code2 className="w-3 h-3" /> Developer / Source Code
              </span>
              <button 
                onClick={() => setShowCodeCommands(!showCodeCommands)}
                className="text-[11px] text-sky-400 hover:text-sky-300 font-bold flex items-center gap-0.5"
              >
                <span>{showCodeCommands ? 'Hide Steps' : 'Show Commands'}</span>
                {showCodeCommands ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <h3 className="text-sm font-bold text-white">
              Method 3: Build APK from Source Code
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Export this codebase as a ZIP or GitHub repo and compile the APK locally or via GitHub Actions.
            </p>

            {showCodeCommands && (
              <div className="space-y-3 pt-1 text-xs animate-fadeIn">
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-white text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>A. Zero-Setup: Automatic GitHub Cloud Build</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Click <strong>Export to GitHub</strong> in AI Studio. A pre-configured GitHub Actions workflow (<code className="text-emerald-300">.github/workflows/build-apk.yml</code>) will automatically compile <code className="text-emerald-300">app-debug.apk</code> in the cloud for free! Download it under GitHub's <strong>Actions &gt; Artifacts</strong> tab.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center gap-1.5 font-bold text-white font-sans text-[11px]">
                    <Terminal className="w-3.5 h-3.5 text-sky-400" />
                    <span>B. Local Machine (Android Studio / CLI)</span>
                  </div>
                  <pre className="bg-black/80 p-2.5 rounded-lg text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
{`# 1. Install & Build
npm install
npm run build

# 2. Add Android Platform
npx cap add android

# 3. Build APK with Gradle
cd android
./gradlew assembleDebug

# Output APK location:
# android/app/build/outputs/apk/debug/app-debug.apk`}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Option 3: Phone Share / Link Bar */}
          <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-300">Live App URL on Phone</span>
              <button
                onClick={() => setShowQR(!showQR)}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold text-[11px]"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>{showQR ? 'Hide QR' : 'Show QR Code'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-neutral-300 font-mono select-all truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition flex items-center gap-1 shrink-0"
                title="Copy link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleShare}
                className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition shrink-0"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {showQR && (
              <div className="pt-3 pb-1 flex flex-col items-center justify-center text-center animate-fadeIn">
                <div className="p-2.5 bg-white rounded-2xl shadow-md inline-block">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(currentUrl)}`}
                    alt="Scan with Android Camera"
                    className="w-36 h-36 rounded-lg"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 mt-2">
                  Scan with your Android camera or QR reader to test on your phone
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
