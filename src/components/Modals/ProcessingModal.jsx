export default function ProcessingModal({ open, message = "Processing..." }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center z-50">
      <div className="bg-card border border-white/10 rounded-lg p-6 w-full max-w-sm text-center">
        <div className="animate-pulse text-white/80">{message}</div>
      </div>
    </div>
  );
}
