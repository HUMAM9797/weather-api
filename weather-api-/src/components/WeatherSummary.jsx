// src/components/WeatherSummary.jsx
function WeatherSummary({ current, minTemp, maxTemp, formatTime }) {
    return (
        <div className="mt-3 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-900/60 border border-slate-700 px-4 py-3 flex flex-col gap-1 transition-transform duration-300 hover:-translate-y-1 hover:border-sky-500/70">
                <span className="text-xs uppercase tracking-wide text-slate-400">
                    Current
                </span>
                <span className="text-lg font-semibold text-sky-400">
                    {current.temperature.toFixed(1)}°C
                </span>
                <span className="text-xs text-slate-400">
                    At {formatTime(current.time)}
                </span>
            </div>

            <div className="rounded-xl bg-slate-900/60 border border-slate-700 px-4 py-3 flex flex-col gap-1 transition-transform duration-300 hover:-translate-y-1 hover:border-emerald-500/70">
                <span className="text-xs uppercase tracking-wide text-slate-400">
                    Min (next 12h)
                </span>
                <span className="text-lg font-semibold text-emerald-400">
                    {minTemp.toFixed(1)}°C
                </span>
            </div>

            <div className="rounded-xl bg-slate-900/60 border border-slate-700 px-4 py-3 flex flex-col gap-1 transition-transform duration-300 hover:-translate-y-1 hover:border-rose-500/70">
                <span className="text-xs uppercase tracking-wide text-slate-400">
                    Max (next 12h)
                </span>
                <span className="text-lg font-semibold text-rose-400">
                    {maxTemp.toFixed(1)}°C
                </span>
            </div>
        </div>
    );
}

export default WeatherSummary;
