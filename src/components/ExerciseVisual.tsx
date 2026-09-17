import React from 'react';

interface ExerciseVisualProps {
  animationKey: string;
  category?: string;
  className?: string;
  isPaused?: boolean;
}

/**
 * High-performance, crisp SVG vector animations demonstrating proper exercise form
 * with glowing anatomical highlights for the active muscle group.
 */
export const ExerciseVisual: React.FC<ExerciseVisualProps> = ({
  animationKey,
  className = 'w-full h-48',
  isPaused = false,
}) => {
  const pausedStyle = isPaused ? { animationPlayState: 'paused' } : {};

  // Custom visual based on animationKey
  const renderFigure = () => {
    switch (animationKey) {
      case 'jumping_jacks':
        return (
          <g className="animate-[jumping_1.1s_infinite_ease-in-out]" style={pausedStyle}>
            <circle cx="100" cy="40" r="14" fill="#38bdf8" />
            <line x1="100" y1="54" x2="100" y2="105" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
            {/* Arms swinging overhead */}
            <path d="M 100 65 L 60 30 L 40 20" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" fill="none" className="animate-[jj_arms_1.1s_infinite_ease-in-out]" />
            <path d="M 100 65 L 140 30 L 160 20" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" fill="none" className="animate-[jj_arms_r_1.1s_infinite_ease-in-out]" />
            {/* Legs spreading wide */}
            <line x1="100" y1="105" x2="65" y2="170" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" />
            <line x1="100" y1="105" x2="135" y2="170" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" />
            {/* Feet */}
            <circle cx="65" cy="172" r="5" fill="#10b981" />
            <circle cx="135" cy="172" r="5" fill="#10b981" />
          </g>
        );

      case 'push_ups':
      case 'wide_arm_push_ups':
      case 'diamond_push_ups':
      case 'knee_push_ups':
        return (
          <g className="animate-[pushup_1.8s_infinite_ease-in-out]" style={pausedStyle}>
            {/* Head */}
            <circle cx="45" cy="78" r="13" fill="#38bdf8" />
            {/* Torso straight line */}
            <line x1="50" y1="85" x2="135" y2="110" stroke="#f8fafc" strokeWidth="13" strokeLinecap="round" />
            {/* Active chest glow */}
            <circle cx="75" cy="93" r="10" fill="#f43f5e" opacity="0.8" />
            {/* Arms bending */}
            <line x1="68" y1="92" x2="72" y2="128" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
            <line x1="72" y1="128" x2="80" y2="135" stroke="#f8fafc" strokeWidth="8" strokeLinecap="round" />
            {/* Legs */}
            <line x1="135" y1="110" x2="170" y2="128" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" />
            {/* Toes planted on ground */}
            <circle cx="170" cy="132" r="6" fill="#10b981" />
            {/* Floor line */}
            <line x1="20" y1="138" x2="185" y2="138" stroke="#334155" strokeWidth="3" strokeDasharray="4 4" />
          </g>
        );

      case 'mountain_climbers':
        return (
          <g>
            {/* Floor */}
            <line x1="20" y1="140" x2="185" y2="140" stroke="#334155" strokeWidth="3" strokeDasharray="4 4" />
            {/* Head */}
            <circle cx="48" cy="75" r="13" fill="#38bdf8" />
            {/* Arms supporting */}
            <line x1="65" y1="88" x2="65" y2="138" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
            {/* Torso */}
            <line x1="58" y1="85" x2="125" y2="98" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
            {/* Core glow */}
            <circle cx="95" cy="94" r="9" fill="#06b6d4" opacity="0.85" />
            {/* Left Knee driving forward */}
            <path d="M 125 98 L 88 115 L 95 138" stroke="#10b981" strokeWidth="9" strokeLinecap="round" fill="none" className="animate-[climber_leg1_0.9s_infinite_ease-in-out]" style={pausedStyle} />
            {/* Right leg back */}
            <line x1="125" y1="98" x2="168" y2="138" stroke="#f8fafc" strokeWidth="8" strokeLinecap="round" />
          </g>
        );

      case 'high_knees':
        return (
          <g className="animate-[highknees_0.75s_infinite_ease-in-out]" style={pausedStyle}>
            <circle cx="95" cy="40" r="14" fill="#38bdf8" />
            <line x1="95" y1="54" x2="95" y2="105" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
            {/* Arms running */}
            <path d="M 95 65 L 75 75 L 60 60" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M 95 65 L 115 85 L 130 95" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" fill="none" />
            {/* Elevated Knee */}
            <path d="M 95 105 L 125 105 L 125 145" stroke="#10b981" strokeWidth="10" strokeLinecap="round" fill="none" />
            {/* Standing Leg */}
            <line x1="95" y1="105" x2="80" y2="170" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" />
            <circle cx="80" cy="172" r="5" fill="#10b981" />
          </g>
        );

      case 'crunches':
      case 'heel_touches':
      case 'bicycle_crunches':
        return (
          <g>
            <line x1="20" y1="145" x2="185" y2="145" stroke="#334155" strokeWidth="3" />
            {/* Legs bent on floor */}
            <path d="M 125 140 L 150 100 L 165 140" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" fill="none" />
            {/* Torso curling up */}
            <g className="animate-[crunch_1.6s_infinite_ease-in-out]" style={pausedStyle}>
              {/* Head */}
              <circle cx="55" cy="108" r="13" fill="#38bdf8" />
              {/* Torso */}
              <line x1="62" y1="116" x2="125" y2="140" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
              {/* Active Ab Core Pulse */}
              <circle cx="95" cy="128" r="11" fill="#06b6d4" opacity="0.85" />
              {/* Hands behind head */}
              <path d="M 70 120 L 50 115 L 45 108" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" fill="none" />
            </g>
          </g>
        );

      case 'standard_plank':
      case 'side_plank':
        return (
          <g className="animate-[pulse_2.2s_infinite_ease-in-out]" style={pausedStyle}>
            <line x1="20" y1="140" x2="185" y2="140" stroke="#334155" strokeWidth="3" />
            {/* Head */}
            <circle cx="46" cy="85" r="12" fill="#38bdf8" />
            {/* Forearm on ground */}
            <line x1="60" y1="96" x2="60" y2="136" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
            <line x1="60" y1="136" x2="78" y2="136" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" />
            {/* Straight rigid torso */}
            <line x1="58" y1="92" x2="138" y2="108" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
            {/* Deep Core Glow */}
            <circle cx="95" cy="100" r="11" fill="#10b981" opacity="0.85" />
            {/* Rigid legs */}
            <line x1="138" y1="108" x2="170" y2="135" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" />
            {/* Toes */}
            <circle cx="170" cy="136" r="6" fill="#10b981" />
          </g>
        );

      case 'bodyweight_squats':
      case 'sumo_squats':
      case 'jump_squats':
      case 'wall_sit':
        return (
          <g className="animate-[squat_2s_infinite_ease-in-out]" style={pausedStyle}>
            <line x1="30" y1="175" x2="175" y2="175" stroke="#334155" strokeWidth="3" />
            {/* Head */}
            <circle cx="100" cy="45" r="14" fill="#38bdf8" />
            {/* Torso straight, upright */}
            <line x1="100" y1="59" x2="95" y2="108" stroke="#f8fafc" strokeWidth="13" strokeLinecap="round" />
            {/* Hands forward balance */}
            <line x1="98" y1="72" x2="65" y2="78" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" />
            {/* Thighs parallel */}
            <line x1="95" y1="108" x2="68" y2="128" stroke="#f59e0b" strokeWidth="11" strokeLinecap="round" />
            {/* Active quad glow */}
            <circle cx="82" cy="118" r="8" fill="#f59e0b" opacity="0.8" />
            {/* Shins to floor */}
            <line x1="68" y1="128" x2="72" y2="170" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" />
            {/* Feet */}
            <circle cx="72" cy="172" r="5" fill="#10b981" />
          </g>
        );

      case 'forward_lunges':
        return (
          <g className="animate-[lunge_2.2s_infinite_ease-in-out]" style={pausedStyle}>
            <line x1="20" y1="175" x2="185" y2="175" stroke="#334155" strokeWidth="3" />
            {/* Head */}
            <circle cx="100" cy="50" r="13" fill="#38bdf8" />
            {/* Torso */}
            <line x1="100" y1="63" x2="100" y2="112" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
            {/* Front Leg 90 deg */}
            <path d="M 100 112 L 65 118 L 65 170" stroke="#10b981" strokeWidth="10" strokeLinecap="round" fill="none" />
            {/* Back Leg hovering */}
            <path d="M 100 112 L 135 130 L 140 170" stroke="#f8fafc" strokeWidth="9" strokeLinecap="round" fill="none" />
            {/* Active Quad highlight */}
            <circle cx="78" cy="116" r="7" fill="#10b981" opacity="0.8" />
          </g>
        );

      case 'tricep_dips':
        return (
          <g className="animate-[dips_1.8s_infinite_ease-in-out]" style={pausedStyle}>
            {/* Bench / Chair structure */}
            <rect x="135" y="110" width="35" height="40" rx="4" fill="#334155" />
            <line x1="20" y1="165" x2="185" y2="165" stroke="#334155" strokeWidth="3" />
            {/* Head */}
            <circle cx="95" cy="70" r="13" fill="#38bdf8" />
            {/* Torso */}
            <line x1="95" y1="83" x2="95" y2="130" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
            {/* Arms bending backward on bench */}
            <path d="M 95 95 L 128 100 L 138 112" stroke="#ec4899" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Triceps glow */}
            <circle cx="120" cy="98" r="7" fill="#ec4899" opacity="0.9" />
            {/* Legs extended forward */}
            <path d="M 95 130 L 60 145 L 45 162" stroke="#f8fafc" strokeWidth="9" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'leg_raises':
      case 'flutter_kicks':
        return (
          <g>
            <line x1="20" y1="150" x2="185" y2="150" stroke="#334155" strokeWidth="3" />
            {/* Torso flat on back */}
            <circle cx="45" cy="140" r="12" fill="#38bdf8" />
            <line x1="50" y1="144" x2="115" y2="144" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
            {/* Moving Legs upward */}
            <g className="animate-[leglift_2s_infinite_ease-in-out]" style={pausedStyle}>
              <line x1="115" y1="144" x2="155" y2="75" stroke="#06b6d4" strokeWidth="10" strokeLinecap="round" />
              {/* Lower abs glow */}
              <circle cx="108" cy="140" r="9" fill="#06b6d4" opacity="0.9" />
            </g>
          </g>
        );

      case 'glute_bridges':
        return (
          <g className="animate-[bridge_2s_infinite_ease-in-out]" style={pausedStyle}>
            <line x1="20" y1="155" x2="185" y2="155" stroke="#334155" strokeWidth="3" />
            {/* Head on floor */}
            <circle cx="45" cy="146" r="12" fill="#38bdf8" />
            {/* Torso arched up */}
            <line x1="55" y1="145" x2="105" y2="110" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
            {/* Active glute fire */}
            <circle cx="105" cy="110" r="10" fill="#f59e0b" opacity="0.85" />
            {/* Legs bent to ground */}
            <path d="M 105 110 L 145 110 L 155 152" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'russian_twists':
        return (
          <g className="animate-[twist_1.5s_infinite_ease-in-out]" style={pausedStyle}>
            <line x1="20" y1="155" x2="185" y2="155" stroke="#334155" strokeWidth="3" />
            {/* V-sit torso */}
            <circle cx="75" cy="80" r="13" fill="#38bdf8" />
            <line x1="75" y1="93" x2="105" y2="145" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
            {/* Oblique focus */}
            <circle cx="92" cy="122" r="9" fill="#8b5cf6" opacity="0.9" />
            {/* Knees bent off ground */}
            <path d="M 105 145 L 140 120 L 165 140" stroke="#f8fafc" strokeWidth="9" strokeLinecap="round" fill="none" />
            {/* Arms twisting */}
            <path d="M 80 105 L 115 110 L 125 125" stroke="#8b5cf6" strokeWidth="7" strokeLinecap="round" fill="none" />
          </g>
        );

      default:
        // Generic active figure
        return (
          <g className="animate-[pulse_1.8s_infinite_ease-in-out]" style={pausedStyle}>
            <circle cx="100" cy="45" r="14" fill="#38bdf8" />
            <line x1="100" y1="59" x2="100" y2="112" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
            <line x1="100" y1="75" x2="65" y2="90" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
            <line x1="100" y1="75" x2="135" y2="90" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
            <line x1="100" y1="112" x2="80" y2="165" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" />
            <line x1="100" y1="112" x2="120" y2="165" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" />
          </g>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center bg-neutral-900/90 rounded-2xl border border-neutral-800/80 overflow-hidden shadow-inner ${className}`}>
      {/* Background athletic stadium grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* Glow aura */}
      <div className="absolute w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

      {/* SVG Canvas with Keyframes */}
      <svg
        viewBox="0 0 200 190"
        className="w-full h-full max-w-[260px] max-h-[220px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-10"
      >
        <defs>
          <style>{`
            @keyframes jumping {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-16px); }
            }
            @keyframes pushup {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(22px); }
            }
            @keyframes climber_leg1 {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(26px) translateY(-8px); }
            }
            @keyframes highknees {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-12px); }
            }
            @keyframes crunch {
              0%, 100% { transform: rotate(0deg); transform-origin: 125px 140px; }
              50% { transform: rotate(-16deg); transform-origin: 125px 140px; }
            }
            @keyframes squat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(24px); }
            }
            @keyframes lunge {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(18px); }
            }
            @keyframes dips {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(20px); }
            }
            @keyframes leglift {
              0%, 100% { transform: rotate(0deg); transform-origin: 115px 144px; }
              50% { transform: rotate(-45deg); transform-origin: 115px 144px; }
            }
            @keyframes bridge {
              0%, 100% { transform: translateY(12px); }
              50% { transform: translateY(0); }
            }
            @keyframes twist {
              0%, 100% { transform: rotate(0deg); transform-origin: 105px 145px; }
              25% { transform: rotate(-14deg); transform-origin: 105px 145px; }
              75% { transform: rotate(14deg); transform-origin: 105px 145px; }
            }
          `}</style>
        </defs>

        {renderFigure()}
      </svg>

      {/* Looping indicator badge */}
      <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-950/80 border border-neutral-700/60 text-[10px] text-neutral-400 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        Loop Demo
      </div>
    </div>
  );
};
