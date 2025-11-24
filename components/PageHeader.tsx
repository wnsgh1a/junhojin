// components/PageHeader.tsx
interface PageHeaderProps {
  title: string;          // Our Work, Newsroom
  subtitle?: string;      // Digital Campaign... 또는 Disruptive...
  right1?: string;        // New ideas (or insightinsight)
  right2?: string;        // & Creativity (or insight)
}

export default function PageHeader({ title, subtitle, right1, right2 }: PageHeaderProps) {
  return (
    <header className="bg-black text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-16 flex items-center justify-between">
        
        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>

          {subtitle && (
            <p className="mt-3 text-sm md:text-base text-gray-300">{subtitle}</p>
          )}
        </div>

        {/* RIGHT */}
        {(right1 || right2) && (
          <div className="text-right leading-tight">
            {right1 && (
              <p className="text-lg md:text-xl font-semibold">{right1}</p>
            )}
            {right2 && (
              <p className="text-lg md:text-xl font-semibold">{right2}</p>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
