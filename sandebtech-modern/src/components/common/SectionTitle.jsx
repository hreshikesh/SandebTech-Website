import PropTypes from "prop-types";

function SectionTitle({
  badge,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  theme = "light", // "light" = dark text for light backgrounds, "dark" = light text for dark backgrounds
}) {
  const isCentered = align === "center";
  const isDark = theme === "dark";

  return (
    <div className={isCentered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {badge && (
        <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          {badge}
        </span>
      )}

      <Heading
        className={`mt-5 text-4xl font-bold leading-tight md:text-5xl ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </Heading>

      {description && (
        <p
          className={`mt-6 text-lg leading-8 ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

SectionTitle.propTypes = {
  badge: PropTypes.node,
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  align: PropTypes.oneOf(["left", "center"]),
  as: PropTypes.elementType,
  theme: PropTypes.oneOf(["light", "dark"]),
};

export default SectionTitle;