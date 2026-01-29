// src/components/SearchBar.jsx
function SearchBar({ query, onQueryChange, onSubmit }) {
    return (
        <form
            onSubmit={onSubmit}
            className="mb-3 flex flex-col sm:flex-row gap-3 items-stretch"
        >
            <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search city (e.g. Baghdad, London, Paris France)"
                className="flex-1 rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            />
            <button
                type="submit"
                className="sm:w-32 rounded-xl bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-sm font-medium px-4 py-2 flex items-center justify-center gap-2 transition"
            >
                <span>Search</span>
            </button>
        </form>
    );
}

export default SearchBar;
