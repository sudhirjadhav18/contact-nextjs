"use client";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({ isOpen, onClose, children }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
          {children}
        </div>
      </div>
    </div>
  );
} 