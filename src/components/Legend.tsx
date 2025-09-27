function Legend({ maxBills, isDarkMode }: { maxBills: number; isDarkMode: boolean }) {
  const lightGradient = "linear-gradient(to right, #e0e7ff, #1e3a8a)";
  const darkGradient = "linear-gradient(to right, #5eead4, #0ea5e9)";

  return (
    <div className="mt-4 w-full max-w-md mx-auto">
      <div
        className="h-4 rounded"
        style={{
          background: isDarkMode ? darkGradient : lightGradient,
        }}
      />
      <div className="flex justify-between text-xs text-foreground mt-1">
        <span>0 bills</span>
        <span>{maxBills} bills</span>
      </div>
    </div>
  );
}

export default Legend;