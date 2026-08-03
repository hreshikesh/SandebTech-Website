import { Helmet } from "react-helmet-async";

function SEO({
  title,
  description,
  keywords,
  image = "https://sandebtech.com/og-image.jpg",
  url = "https://sandebtech.com",
}) {
  const fullTitle = title
    ? `${title} | SandebTech`
    : "SandebTech | Simulate • Optimize • Sustain";

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="description" content={description} />

      <meta name="keywords" content={keywords} />

      <meta name="author" content="SandebTech" />

      <meta name="robots" content="index, follow" />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="SandebTech" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="theme-color" content="#0A2746" />
    </Helmet>
  );
}

export default SEO;