export default function Footer() {
  return (
    <footer className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-background dark:bg-darkBackground text-center text-sm text-neutral-600 dark:text-neutral-400">
      <p>© {new Date().getFullYear()} BillTracker. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="/privacy" className="hover:text-accent">
          Privacy
        </a>
        <a href="/terms" className="hover:text-accent">
          Terms
        </a>
        <a href="/contact" className="hover:text-accent">
          Contact
        </a>
      </div>
    </footer>
  );
}
