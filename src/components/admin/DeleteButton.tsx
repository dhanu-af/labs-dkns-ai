"use client";

export function DeleteButton({
  action,
  confirmLabel = "Delete this item? This cannot be undone.",
}: {
  action: () => Promise<void>;
  confirmLabel?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmLabel)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-400/20 dark:text-red-400 dark:hover:bg-red-500/10"
      >
        Delete
      </button>
    </form>
  );
}
