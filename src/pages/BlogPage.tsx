import React, { useEffect, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Clock,
  Compass,
  MapPin,
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { ALL_TOURS } from '../data/catalog';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { TourCard } from '../components/TourCard';

const BLOG_CATEGORIES = [
  'Todas',
  'Rutas y Logística',
  'Preparación de Viaje',
  'Gastronomía',
  'Cultura Viva',
  'Fotografía y Territorio',
] as const;

export const BlogListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory = searchParams.get('categoria');
  const selectedCategory = rawCategory && rawCategory.trim().length > 0 ? rawCategory : 'Todas';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todas: BLOG_POSTS.length };
    for (const post of BLOG_POSTS) {
      counts[post.category] = (counts[post.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filteredPosts = useMemo(
    () =>
      selectedCategory === 'Todas'
        ? BLOG_POSTS
        : BLOG_POSTS.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  const handleSelectCategory = (category: string) => {
    if (category === 'Todas') {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: category });
    }
  };

  return (
    <div className="pb-20 space-y-12">
      {/* Header */}
      <section className="bg-[#18221F] text-[#FAF8F5] py-14 border-b border-white/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-4">
          <span className="eyebrow-editorial text-[#E8B954] inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>
              Cuadernos de Campo &amp; Logística ·{' '}
              <span className="num-tabular">{BLOG_POSTS.length}</span> guías
              publicadas
            </span>
          </span>
          <h1 className="font-serif-editorial text-4xl sm:text-5xl font-bold text-[#FAF8F5]">
            Blog Editorial &amp; Guías Técnicas de Viaje por el Perú
          </h1>
          <p className="text-sm sm:text-base text-[#C7C2B8] prose-measure leading-relaxed">
            Información práctica escrita por nuestros arqueólogos, especialistas
            de ruta y curadores gastronómicos para preparar tu viaje con criterio
            real.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
        {/* Category Filter Tabs synced with ?categoria=... */}
        <div
          className="flex flex-wrap gap-2 pb-4 border-b border-[#18221F]/12"
          role="group"
          aria-label="Filtrar artículos por categoría"
        >
          {BLOG_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] ?? 0;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleSelectCategory(cat)}
                className={`px-4 py-2 rounded text-xs font-semibold transition-colors duration-200 cursor-pointer inline-flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#D9532F] text-white'
                    : 'bg-[#FFFFFF] text-[#18221F] border border-[#18221F]/15 hover:bg-[#F2EFE9]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`num-tabular text-[11px] px-1.5 py-0.5 rounded-xs ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F2EFE9] text-[#525E5A]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Empty State si la categoría en query no tiene resultados */}
        {filteredPosts.length === 0 && (
          <div className="bg-[#FFFFFF] rounded-md border border-[#18221F]/14 p-10 text-center space-y-4">
            <h2 className="font-serif-editorial text-2xl font-bold text-[#18221F]">
              No encontramos guías en la categoría «{selectedCategory}»
            </h2>
            <p className="text-sm text-[#525E5A] max-w-lg mx-auto">
              Explora todas nuestras publicaciones técnicas sobre circuitos en
              Machu Picchu, aclimatación andina, desierto sur y gastronomía.
            </p>
            <button
              type="button"
              onClick={() => handleSelectCategory('Todas')}
              className="px-5 py-2.5 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer"
            >
              Ver todas las guías ({BLOG_POSTS.length})
            </button>
          </div>
        )}

        {/* Featured Lead Article */}
        {filteredPosts.length > 0 && (
          <article className="bg-[#FFFFFF] rounded-md border border-[#18221F]/15 overflow-hidden grid lg:grid-cols-12 shadow-sm">
            <div className="lg:col-span-6 min-h-[280px] lg:min-h-[360px] relative bg-[#18221F] overflow-hidden">
              <img
                src={filteredPosts[0].heroImage}
                alt={filteredPosts[0].title}
                className="w-full h-full object-cover"
              />
              <div className="photo-scrim-top absolute inset-x-0 top-0 h-24 pointer-events-none" />
              <span className="absolute top-4 left-4 text-[11px] font-semibold tracking-wide px-3 py-1 bg-[#18221F]/90 text-[#E8B954] rounded-xs">
                Guía destacada · {filteredPosts[0].category}
              </span>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="text-xs text-[#525E5A] num-tabular">
                  {filteredPosts[0].publishedAt} · {filteredPosts[0].readTime}
                </div>
                <Link to={`/blog/${filteredPosts[0].slug}`}>
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] hover:text-[#B84020] transition-colors duration-200">
                    {filteredPosts[0].title}
                  </h2>
                </Link>
                <p className="text-sm sm:text-base font-medium text-[#B84020]">
                  {filteredPosts[0].subtitle}
                </p>
                <p className="text-sm text-[#525E5A] leading-relaxed prose-measure">
                  {filteredPosts[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#18221F]/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs">
                  <strong className="text-[#18221F] block">
                    {filteredPosts[0].author.name}
                  </strong>
                  <span className="text-[#525E5A]">
                    {filteredPosts[0].author.role}
                  </span>
                </div>
                <Link
                  to={`/blog/${filteredPosts[0].slug}`}
                  className="px-5 py-2.5 rounded bg-[#18221F] hover:bg-[#D9532F] text-white text-xs font-semibold tracking-wide inline-flex items-center gap-1.5 transition-colors duration-200"
                >
                  <span>Leer artículo completo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Remaining Articles Grid */}
        {filteredPosts.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="group bg-[#FFFFFF] rounded-md border border-[#18221F]/14 overflow-hidden flex flex-col justify-between hover:border-[#18221F]/28 hover:shadow-lg transition-shadow duration-200"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-[#18221F]">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    />
                    <div className="photo-scrim-top absolute inset-x-0 top-0 h-20 pointer-events-none" />
                    <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 bg-[#18221F]/90 text-[#E8B954] rounded-xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-xs text-[#525E5A] flex flex-wrap items-center gap-2 num-tabular">
                      <Clock className="w-3.5 h-3.5 text-[#B84020] shrink-0" />
                      <span>{post.readTime}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.publishedAt}</span>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="font-serif-editorial text-xl font-bold text-[#18221F] group-hover:text-[#B84020] transition-colors duration-200 leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#18221F]/10 flex items-center justify-between gap-3">
                  <div className="text-xs text-[#525E5A]">
                    Por{' '}
                    <strong className="text-[#18221F]">
                      {post.author.name}
                    </strong>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-[#B84020] hover:text-[#18221F] inline-flex items-center gap-1 transition-colors duration-200 shrink-0"
                  >
                    <span>Leer guía</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export const BlogPostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-24 text-center space-y-4">
        <h1 className="font-serif-editorial text-4xl font-bold text-[#18221F]">
          Artículo No Encontrado
        </h1>
        <Link
          to="/blog"
          className="inline-block px-6 py-3 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-sm font-semibold transition-colors duration-200"
        >
          Volver al Blog y Guías
        </Link>
      </div>
    );
  }

  const relatedTours = ALL_TOURS.filter((t) =>
    post.relatedTourSlugs.includes(t.slug)
  );
  const relatedDest = DESTINATIONS_DATA.find(
    (d) => d.slug === post.relatedDestinationSlug
  );

  return (
    <div className="pb-20 space-y-14">
      {/* Article Hero */}
      <section className="bg-[#18221F] text-[#FAF8F5] py-14 border-b border-white/12">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-4">
          <nav
            aria-label="Ruta de navegación"
            className="flex flex-wrap items-center gap-1.5 text-xs text-[#C7C2B8]"
          >
            <Link to="/" className="hover:text-[#E8B954] transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/blog" className="hover:text-[#E8B954] transition-colors">
              Blog &amp; Guías
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to={`/blog?categoria=${encodeURIComponent(post.category)}`}
              className="text-[#E8B954] hover:underline"
            >
              {post.category}
            </Link>
          </nav>

          <span className="inline-block text-xs font-semibold px-3 py-1 rounded bg-[#D9532F] text-white num-tabular">
            {post.category} · {post.readTime}
          </span>

          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-xl text-[#FAF8F5] leading-relaxed">
            {post.subtitle}
          </p>

          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-[#C7C2B8]">
            <div>
              Escrito por{' '}
              <strong className="text-white">{post.author.name}</strong> (
              {post.author.role})
            </div>
            <div className="text-[#E8B954] num-tabular">
              Publicado: {post.publishedAt}
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="rounded-md overflow-hidden border border-[#18221F]/15 h-80 sm:h-[420px] bg-[#18221F]">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <article className="bg-[#FFFFFF] p-6 sm:p-10 rounded-md border border-[#18221F]/12 space-y-8">
          <p className="text-base sm:text-lg font-medium text-[#18221F] leading-relaxed border-l-4 border-[#D9532F] pl-4 prose-measure">
            {post.excerpt}
          </p>

          {post.sections.length > 1 && (
            <div className="p-4 sm:p-5 rounded bg-[#FAF8F5] border border-[#18221F]/10 space-y-2.5">
              <span className="eyebrow-editorial text-[#B84020] block">
                Contenido de esta guía
              </span>
              <ol className="space-y-1.5 text-xs sm:text-sm text-[#18221F] list-decimal list-inside">
                {post.sections.map((sec) => (
                  <li key={sec.heading} className="leading-snug">
                    {sec.heading}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {post.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-serif-editorial text-2xl sm:text-[26px] font-bold text-[#18221F] leading-snug">
                {sec.heading}
              </h2>

              <div className="space-y-4 prose-measure">
                {sec.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base text-[#525E5A] leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {sec.proTip && (
                <aside className="p-4 sm:p-5 rounded bg-[#F2EFE9] border border-[#D49B35]/50 border-l-4 border-l-[#D9532F] flex items-start gap-3 prose-measure">
                  <Compass className="w-5 h-5 text-[#B84020] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#18221F] leading-relaxed">
                    <strong className="eyebrow-editorial text-[#B84020] block mb-1">
                      Nota de Campo · Qullqa
                    </strong>
                    {sec.proTip}
                  </div>
                </aside>
              )}
            </section>
          ))}

          {relatedDest && (
            <div className="p-5 sm:p-6 rounded-md bg-[#18221F] text-[#FAF8F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="eyebrow-editorial text-[#E8B954] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Destino vinculado a esta lectura</span>
                </span>
                <h4 className="font-serif-editorial text-xl font-bold mt-1 text-white">
                  Guía completa de {relatedDest.name}
                </h4>
              </div>
              <Link
                to={`/destinos/${relatedDest.slug}`}
                className="px-4 py-2.5 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-xs font-semibold tracking-wide inline-flex items-center gap-1.5 transition-colors duration-200 shrink-0"
              >
                <span>Explorar destino</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </article>
      </section>

      {/* Related Products Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 border-t border-[#18221F]/12 space-y-6">
        <div>
          <span className="eyebrow-editorial text-[#B84020] block">
            Lleva esta guía a la práctica
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
            Circuitos y Experiencias Relacionadas con este Artículo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              variant="catalog-technical"
            />
          ))}
        </div>
      </section>
    </div>
  );
};
