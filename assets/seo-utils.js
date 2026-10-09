/* ============================================================
   seo-utils.js — Schema.org JSON-LD 可复用工具（原生 HTML 站点）
   用法：在 <head> 中 <script src="./assets/seo-utils.js"></script>
         然后在 </body> 前调用 SeoUtils.injectXxx(...) 即可。
   ============================================================ */

(function (global) {
  "use strict";

  const SITE_BASE = "https://timeandjoy.com/";
  const BRAND = {
    name: "时悦空间设计 Time & Joy Space Design",
    altName: "Time & Joy",
    url: SITE_BASE,
    logo: SITE_BASE + "og-cover.jpg",
    email: "joanna@timeandjoy.com",
    telephone: "+86-133-5006-1712",
    addressCountry: "CN",
    addressRegion: "Sichuan",
    addressLocality: "Chengdu",
    latitude: 30.5728,
    longitude: 104.0668,
    sameAs: [
      "https://instagram.com/Joanna17qq",
    ],
    description:
      "时悦空间（Time & Joy）是一间以商业空间为主叙事、住宅项目为审美背书的室内设计工作室，通过秩序、光线、比例与材料克制，建立长期可读的空间气质。",
    descriptionEn:
      "Time & Joy Space Design is a Chengdu-based interior design practice specializing in commercial hospitality, workplace, and private residential interiors, with a commitment to spatial clarity, measured light, and material restraint.",
  };

  function injectJsonLd(obj, id) {
    if (!obj || typeof obj !== "object") return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    if (id) script.id = id;
    try {
      script.textContent = JSON.stringify(obj);
    } catch (e) {
      script.textContent = JSON.stringify({ error: "JSON serialize failed" });
    }
    const head = document.head || document.getElementsByTagName("head")[0];
    if (head) head.appendChild(script);
  }

  function imageObject(path, w, h) {
    if (!path) return undefined;
    return {
      "@type": "ImageObject",
      url: absUrl(path),
      width: w || 1200,
      height: h || 630,
    };
  }

  function absUrl(path) {
    if (!path) return SITE_BASE;
    if (/^https?:\/\//i.test(path)) return path;
    const p = String(path).replace(/^\.\//, "").replace(/^\//, "");
    return SITE_BASE + p;
  }

  /* ---------- 1. Organization + WebSite（全局，每页都可调用） ---------- */
  function injectSitewide() {
    const organization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": absUrl("#organization"),
      name: BRAND.name,
      alternateName: BRAND.altName,
      url: BRAND.url,
      logo: {
        "@type": "ImageObject",
        url: BRAND.logo,
        width: 1200,
        height: 630,
      },
      description: BRAND.description,
      email: BRAND.email,
      telephone: BRAND.telephone,
      address: {
        "@type": "PostalAddress",
        addressCountry: BRAND.addressCountry,
        addressRegion: BRAND.addressRegion,
        addressLocality: BRAND.addressLocality,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BRAND.latitude,
        longitude: BRAND.longitude,
      },
      sameAs: BRAND.sameAs,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: BRAND.telephone,
          contactType: "customer support",
          email: BRAND.email,
          areaServed: ["CN"],
          availableLanguage: ["Chinese", "English"],
        },
      ],
    };

    const website = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": absUrl("#website"),
      url: BRAND.url,
      name: BRAND.name,
      inLanguage: ["zh-CN", "en"],
      publisher: { "@id": absUrl("#organization") },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: absUrl("projects.html?q={search_term_string}"),
        },
        "query-input": "required name=search_term_string",
      },
    };

    injectJsonLd(organization, "jsonld-organization");
    injectJsonLd(website, "jsonld-website");
  }

  /* ---------- 2. ProfessionalService（首页 & 联系页） ---------- */
  function injectProfessionalService() {
    const svc = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": absUrl("#professionalservice"),
      name: BRAND.name,
      image: imageObject(BRAND.logo),
      url: BRAND.url,
      telephone: BRAND.telephone,
      email: BRAND.email,
      priceRange: "$$$",
      description: BRAND.descriptionEn,
      areaServed: [
        { "@type": "City", name: "Chengdu" },
        { "@type": "City", name: "Chongqing" },
        { "@type": "City", name: "Shenzhen" },
        { "@type": "City", name: "Beijing" },
        { "@type": "City", name: "Hangzhou" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: BRAND.addressLocality,
        addressRegion: BRAND.addressRegion,
        addressCountry: BRAND.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BRAND.latitude,
        longitude: BRAND.longitude,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
      sameAs: BRAND.sameAs,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Interior Design Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Interior Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hospitality Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Office & Workplace Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private Residential Design" } },
        ],
      },
    };
    injectJsonLd(svc, "jsonld-professionalservice");
  }

  /* ---------- 3. BreadcrumbList（每页） ---------- */
  function injectBreadcrumb(items) {
    if (!Array.isArray(items) || items.length === 0) return;
    const list = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: it.url ? absUrl(it.url) : undefined,
      })),
    };
    injectJsonLd(list, "jsonld-breadcrumb");
  }

  /* ---------- 4. FAQPage ---------- */
  function injectFAQ(qaPairs) {
    if (!Array.isArray(qaPairs) || qaPairs.length === 0) return;
    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: qaPairs.map((qa) => ({
        "@type": "Question",
        name: qa.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: qa.answer,
        },
      })),
    };
    injectJsonLd(faq, "jsonld-faq");
  }

  /* ---------- 5. Service（项目详情页） ---------- */
  function injectProjectService(project) {
    if (!project) return;
    const service = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": absUrl("project-detail.html?project=" + encodeURIComponent(project.id || "")),
      name: project.name,
      alternateName: project.nameZh,
      provider: { "@id": absUrl("#organization") },
      serviceType: project.category === "residential" ? "Residential Interior Design" : "Commercial Interior Design",
      areaServed: project.city || BRAND.addressLocality,
      description: project.description || project.descriptionEn || BRAND.descriptionEn,
      image: project.image ? imageObject(project.image, 1600, 900) : imageObject(BRAND.logo),
      url: absUrl("project-detail.html?project=" + encodeURIComponent(project.id || "")),
      offers: {
        "@type": "Offer",
        priceCurrency: "CNY",
        price: project.price || "0",
        availability: "https://schema.org/InStock",
        description: project.meta || "Custom commission · 定制设计委托",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "12",
        bestRating: "5",
        worstRating: "1",
      },
    };
    injectJsonLd(service, "jsonld-service");
  }

  /* ---------- 6. ItemList（项目列表页） ---------- */
  function injectItemList(items) {
    if (!Array.isArray(items) || items.length === 0) return;
    const list = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absUrl(it.url),
        name: it.name,
        image: it.image ? imageObject(it.image, 1200, 800) : undefined,
      })),
    };
    injectJsonLd(list, "jsonld-itemlist");
  }

  /* ---------- 7. ContactPage ---------- */
  function injectContactPage() {
    const cp = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": absUrl("contact.html#contactpage"),
      url: absUrl("contact.html"),
      name: "Contact · Time & Joy Space Design",
      mainEntity: {
        "@type": "ProfessionalService",
        "@id": absUrl("#professionalservice"),
      },
    };
    injectJsonLd(cp, "jsonld-contactpage");
  }

  function setMeta(name, content, attr) {
    if (!name || !content) return;
    const attrName = attr || "name";
    let m = document.querySelector(`meta[${attrName}="${name}"]`);
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute(attrName, name);
      (document.head || document.getElementsByTagName("head")[0]).appendChild(m);
    }
    m.setAttribute("content", content);
  }

  function injectGeoMeta() {
    if (!BRAND || !BRAND.latitude) return;
    setMeta("geo.position", `${BRAND.latitude};${BRAND.longitude}`);
    setMeta("geo.region", `${BRAND.addressCountry}-${BRAND.addressRegion}`);
    setMeta("geo.placename", `${BRAND.addressLocality}, ${BRAND.addressRegion}, ${BRAND.addressCountry}`);
    setMeta("ICBM", `${BRAND.latitude}, ${BRAND.longitude}`);
  }

  global.SeoUtils = {
    BRAND,
    absUrl,
    injectSitewide,
    injectProfessionalService,
    injectBreadcrumb,
    injectFAQ,
    injectProjectService,
    injectItemList,
    injectContactPage,
    injectGeoMeta,
  };
})(window);
