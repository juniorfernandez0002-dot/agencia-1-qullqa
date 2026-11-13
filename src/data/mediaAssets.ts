/**
 * Resuelve la ruta de fotografías reales locales del Perú garantizando
 * compatibilidad tanto en servidores HTTP / bundle `dist/` como al abrir
 * directamente `index.html` mediante protocolo `file://`.
 */
export function peruImg(filename: string): string {
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'file:' &&
    typeof document !== 'undefined' &&
    Boolean(document.querySelector('script[src*="./dist/assets/app.bundle.js"]'))
  ) {
    return `./public/images/peru/${filename}`;
  }

  return `./images/peru/${filename}`;
}

export const PERU_PHOTOS = {
  machuPicchuClassic: peruImg('machu-picchu-classic.jpg'),
  machuPicchuMist: peruImg('machu-picchu-mist.jpg'),
  machuPicchuTrain: peruImg('machu-picchu-train.jpg'),
  aguasCalientes: peruImg('aguas-calientes.jpg'),
  sacsayhuaman: peruImg('sacsayhuaman.jpg'),
  cuscoPlaza: peruImg('cusco-plaza.jpg'),
  qorikancha: peruImg('qorikancha.jpg'),
  sanPedroCusco: peruImg('san-pedro-cusco.jpg'),
  pisac: peruImg('pisac.jpg'),
  marasSalineras: peruImg('maras-salineras.jpg'),
  morayAndenes: peruImg('moray-andenes.jpg'),
  ollantaytambo: peruImg('ollantaytambo.jpg'),
  vinicunca: peruImg('vinicunca.jpg'),
  humantay: peruImg('humantay.jpg'),
  ausangate: peruImg('ausangate.jpg'),
  raqchi: peruImg('raqchi.jpg'),
  arequipaCatalina: peruImg('arequipa-catalina.jpg'),
  colcaCondor: peruImg('colca-condor.jpg'),
  colcaCanon: peruImg('colca-canon.jpg'),
  titicacaUros: peruImg('titicaca-uros.jpg'),
  taquile: peruImg('taquile.jpg'),
  limaPlaza: peruImg('lima-plaza.jpg'),
  mirafloresCosta: peruImg('miraflores-costa.jpg'),
  barrancoLima: peruImg('barranco-lima.jpg'),
  pachacamac: peruImg('pachacamac.jpg'),
  circuitoAguaLima: peruImg('circuito-agua-lima.jpg'),
  islasBallestas: peruImg('islas-ballestas.jpg'),
  paracasReserva: peruImg('paracas-reserva.jpg'),
  playaRojaParacas: peruImg('playa-roja-paracas.jpg'),
  huacachina: peruImg('huacachina.jpg'),
  nazcaLines: peruImg('nazca-lines.jpg'),
  nazcaColibri: peruImg('nazca-colibri.jpg'),
  cantalloc: peruImg('cantalloc.jpg'),
  tambopataMacaws: peruImg('tambopata-macaws.jpg'),
  lagoSandoval: peruImg('lago-sandoval.jpg'),
  cevichePeru: peruImg('ceviche-peru.jpg'),
} as const;
