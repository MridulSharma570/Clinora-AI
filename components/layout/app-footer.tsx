import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="footer-top">
        <div>
          <p className="footer-brand">CLINORA AI</p>
          <p>Prepare for care. Not a diagnosis.</p>
        </div>
        <nav aria-label="Footer navigation" className="footer-links">
          <Link href="/learn">Learn</Link>
          <Link href="/settings">Privacy settings</Link>
          <Link href="/legal">Legal & safety</Link>
        </nav>
      </div>
      <p className="footer-disclaimer">
        Educational student project for adults. Not medical advice, a medical device, or an emergency service. No clinical validation or regulatory certification is claimed.
      </p>
    </footer>
  );
}
