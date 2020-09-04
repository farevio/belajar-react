export default function handleFilterChange(e) {
    const filterName = e.target.name;
    const value = e.target.value;
    const searchParams = new URLSearchParams(location.search.slice(1));
    if (value) {
        searchParams.set(filterName, value);
    } else searchParams.delete(filterName);
    window.location.search = '?' + searchParams.toString();
}
