import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PageHero from "../../components/PageHero";
import Button from "../../ui/Button";
import { insightMedia, pageMedia } from "../../config/media";
import NotFoundPage from "../../app/NotFoundPage";

import { Block } from "../services/ServiceBlocks";
import { articleBySlug, isPublished, loadBody } from "./articlesData";

import "./articles.css";

function renderBlock(block, index) {
  switch (block.type) {
    case "h3":
      return <h3 key={index}>{block.text}</h3>;
    case "p":
      return <p key={index}>{block.text}</p>;
    case "ul":
      return (
        <ul key={index}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="article__table" key={index}>
          <table>
            <thead>
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cta":
      return (
        <div className="article__cta" key={index}>
          <p>{block.text}</p>
          <Button to="/contact">Book a Consultation</Button>
        </div>
      );
    default:
      return null;
  }
}

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articleBySlug[slug];
  const live = isPublished(slug);

  const [loaded, setLoaded] = useState({ slug: "", body: null });

  useEffect(() => {
    if (!live) return undefined;
    let cancelled = false;
    loadBody(slug).then((module) => {
      if (!cancelled) setLoaded({ slug, body: module.body });
    });
    return () => {
      cancelled = true;
    };
  }, [slug, live]);

  if (!article || !live) return <NotFoundPage />;

  const body = loaded.slug === slug ? loaded.body : null;

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        breadcrumbs={[{ label: "Insights", path: "/insights" }, { label: article.title }]}
        image={insightMedia[article.category] || pageMedia.insights}
        position="70% 50%"
        compact
      />

      <Block tone="light" lift>
        <article className="article" data-lead={article.title}>
          <div className="article__meta">
            <strong>{article.category}</strong>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            {article.date && (
              <>
                <span aria-hidden="true">·</span>
                <span>{article.date}</span>
              </>
            )}
          </div>

          {body ? body.map(renderBlock) : <div className="article__loading" />}

          <Link to="/insights" className="article__back">
            ← All insights
          </Link>
        </article>
      </Block>
    </>
  );
}