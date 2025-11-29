// src/components/SuggestionsList.jsx
function SuggestionsList({ suggestions, loading, onSelect }) {
    if (loading) return null;
    if (!suggestions || suggestions.length === 0) return null;

    return (
        <div className="mb-4 rounded-xl bg-slate-900/80 border border-slate-700 max-h-56 overflow-y-auto">
            {suggestions.map((place) => (
                <button
                    key={
                        place.id ??
                        `${place.name}-${place.latitude}-${place.longitude}`
                    }
                    onClick={() => onSelect(place)}
                    className="w-full text-left px-3 py-2 border-b border-slate-800 last:border-b-0 hover:bg-slate-800/80 transition flex flex-col gap-0.5"
                >
                    <span className="text-sm text-slate-100">
                        {place.name}
                        {place.country ? `, ${place.country}` : ""}
                    </span>
                    <span className="text-[11px] text-slate-500">
                        {place.admin1 ? `${place.admin1} • ` : ""}
                        {place.timezone}
                    </span>
                </button>
            ))}
        </div>
    );
}

export default SuggestionsList;
