// src/components/HourlyForecastGrid.jsx
function HourlyForecastGrid({ forecast, formatTime }) {
    return (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-700 px-4 py-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-slate-100">
                    Next 12 hours
                </h2>
                <span className="text-[11px] text-slate-400">
                    Hourly temperature
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {forecast.map((item) => (
                    <div
                        key={item.time}
                        className="rounded-xl bg-slate-800/80 border border-slate-700 px-3 py-2.5 flex flex-col items-center gap-1 text-center text-xs transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/70 hover:bg-slate-800"
                    >
                        <span className="font-mono text-[11px] text-slate-300">
                            {formatTime(item.time)}
                        </span>
                        <span className="text-sm font-semibold text-sky-400">
                            {item.temperature.toFixed(1)}°C
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HourlyForecastGrid;
