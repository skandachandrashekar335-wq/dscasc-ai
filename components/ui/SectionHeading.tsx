import React from "react";

interface SectionHeadingProps {
  kicker: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

/**
 * Shared editorial section heading used across landing, placements and about pages.
 * Keeps the kicker / title / description hierarchy consistent in the neo-brutalist system.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  description,
  align = "left",
  tone = "light",
}) => {
  const isDark = tone === "dark";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className={isDark ? "brutal-tag" : "brutal-tag-light"}>
        <span
          className={`h-1.5 w-1.5 ${isDark ? "bg-black" : "bg-brand-yellow"} border border-black`}
          aria-hidden="true"
        />
        {kicker}
      </span>

      <h2
        className={`mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl ${
          isDark ? "text-white" : "text-brand-charcoal"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-3 text-sm leading-relaxed sm:text-base ${
            isDark ? "text-brand-sage" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
