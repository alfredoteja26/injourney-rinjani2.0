export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#00A199] border-t-transparent"></div>
        <p className="text-[#00A199] font-['Inter:Medium',sans-serif] font-medium text-[16px]">Loading...</p>
      </div>
    </div>
  );
}
