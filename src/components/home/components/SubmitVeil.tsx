const SubmitVeil = ({ triggerKey }: { triggerKey: number }) => {
    return (
        <div key={triggerKey} className="submit-veil pointer-events-none absolute inset-0" aria-hidden>
            <div className="submit-veil__beam animate-veilSweep" />
        </div>
    );
}

export default SubmitVeil
