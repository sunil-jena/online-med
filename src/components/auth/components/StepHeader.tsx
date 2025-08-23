const StepHeader = ({ step }: { step: "email" | "otp" }) => {
    return (
        <div>
            <p className="text-sm font-medium text-(--color-brand)">{step === "email" ? "Step 3/9" : "Step 4/9"}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">What is your email?</h1>
            <p className="mt-1 text-(--color-ink-muted)">This is where we send the note</p>
        </div>
    );
}

export default StepHeader