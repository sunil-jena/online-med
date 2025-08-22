export default function Spinner() {
    return (
        <svg className="size-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" fill="none" />
            <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeLinecap="round" strokeWidth="4" fill="none" />
        </svg>
    );
}
