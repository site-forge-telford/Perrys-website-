interface JobProgressBarProps {
  percentage: number;
}

export default function JobProgressBar({ percentage }: JobProgressBarProps) {
  return (
    <div className="relative w-full h-16 bg-gray-200 rounded-lg overflow-hidden shadow-inner">
      {/* Progress fill with animated width */}
      <div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-copper to-copper/80 transition-all duration-1000 ease-out"
        style={{ width: `${percentage}%` }}
      >
        {/* Repeating logo watermark pattern */}
        <div className="absolute inset-0 flex items-center overflow-hidden opacity-20">
          <div className="flex animate-slide-logos whitespace-nowrap">
            {/* Create multiple logo instances for seamless scrolling */}
            {[...Array(10)].map((_, i) => (
              <img
                key={i}
                src="/perrys logo.jpg"
                alt=""
                className="h-10 w-auto mx-8 object-contain"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Percentage text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-charcoal drop-shadow-sm">
          {percentage}%
        </span>
      </div>
    </div>
  );
}
