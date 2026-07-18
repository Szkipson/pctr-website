/* ============================================================
   GOL-STORE — dane sklepu (produkty, kategorie, marki)
   Demo edukacyjne inspirowane układem sklepów piłkarskich.
   Wszystkie produkty, ceny i opisy są fikcyjne.
   ============================================================ */

const BRANDS = ["Nike", "adidas", "Puma", "New Balance", "Mizuno", "Joma", "Select", "Uhlsport"];

const CATEGORIES = [
  {
    id: "buty-pilkarskie",
    name: "Buty piłkarskie",
    icon: "boot",
    subs: [
      { id: "korki", name: "Korki (FG/AG)" },
      { id: "halowki", name: "Halówki (IC)" },
      { id: "turfy", name: "Turfy (TF)" },
      { id: "buty-dzieciece", name: "Buty dziecięce" }
    ]
  },
  {
    id: "odziez",
    name: "Odzież",
    icon: "shirt",
    subs: [
      { id: "koszulki", name: "Koszulki" },
      { id: "spodenki", name: "Spodenki" },
      { id: "dresy", name: "Dresy i bluzy" },
      { id: "getry", name: "Getry" }
    ]
  },
  {
    id: "bramkarskie",
    name: "Bramkarskie",
    icon: "glove",
    subs: [
      { id: "rekawice", name: "Rękawice bramkarskie" },
      { id: "stroje-bramkarskie", name: "Stroje bramkarskie" }
    ]
  },
  {
    id: "pilki",
    name: "Piłki",
    icon: "ball",
    subs: [
      { id: "meczowe", name: "Meczowe" },
      { id: "treningowe", name: "Treningowe" },
      { id: "halowe", name: "Halowe / Futsal" }
    ]
  },
  {
    id: "akcesoria",
    name: "Akcesoria",
    icon: "bag",
    subs: [
      { id: "ochraniacze", name: "Ochraniacze" },
      { id: "torby", name: "Torby i plecaki" },
      { id: "sprzet", name: "Sprzęt treningowy" }
    ]
  },
  {
    id: "wyprzedaz",
    name: "Wyprzedaż",
    icon: "sale",
    subs: []
  }
];

/* type: boot | shirt | glove | ball | shorts | socks | bag | shin | cone | tracksuit
   img: { c1 – kolor główny, c2 – akcent, c3 – dodatkowy } */
const PRODUCTS = [
  /* ---------------- KORKI ---------------- */
  { id: 1,  type: "boot", brand: "Nike", name: "Nike Velocity Elite FG", cat: "buty-pilkarskie", sub: "korki",
    price: 899.99, oldPrice: 1099.99, badge: "HIT", rating: 4.8, reviews: 124,
    sizes: ["39","40","41","42","42.5","43","44","45","46"],
    img: { c1: "#ff4d2e", c2: "#111111", c3: "#ffffff" },
    desc: "Profesjonalne korki na naturalną murawę. Lekka cholewka z siatki technicznej zapewnia doskonałe czucie piłki, a asymetryczne sznurowanie powiększa pole uderzenia." },
  { id: 2,  type: "boot", brand: "adidas", name: "adidas Precyzja Pro FG", cat: "buty-pilkarskie", sub: "korki",
    price: 749.99, oldPrice: 999.99, badge: "-25%", rating: 4.7, reviews: 98,
    sizes: ["40","41","42","43","44","45"],
    img: { c1: "#0b0b0b", c2: "#d4ff3f", c3: "#ffffff" },
    desc: "Korki stworzone z myślą o precyzyjnych podaniach. Tłoczona powłoka na cholewce stabilizuje lot piłki przy uderzeniach z dużą rotacją." },
  { id: 3,  type: "boot", brand: "Puma", name: "Puma Szybkość Ultra FG/AG", cat: "buty-pilkarskie", sub: "korki",
    price: 649.99, oldPrice: null, badge: "NOWOŚĆ", rating: 4.6, reviews: 41,
    sizes: ["39","40","41","42","43","44","45","46"],
    img: { c1: "#1f6fff", c2: "#ff9d00", c3: "#ffffff" },
    desc: "Najlżejszy model w ofercie — waży zaledwie 160 g. Podeszwa hybrydowa FG/AG sprawdzi się na murawie naturalnej i sztucznej." },
  { id: 4,  type: "boot", brand: "New Balance", name: "New Balance Kontrola v4 FG", cat: "buty-pilkarskie", sub: "korki",
    price: 579.99, oldPrice: 699.99, badge: null, rating: 4.5, reviews: 56,
    sizes: ["40","41","42","43","44","45"],
    img: { c1: "#ffffff", c2: "#e01a3c", c3: "#111111" },
    desc: "Skórzana cholewka kangurza dopasowuje się do stopy już po pierwszym treningu. Klasyka dla rozgrywających." },
  { id: 5,  type: "boot", brand: "Mizuno", name: "Mizuno Morelia Klasyk FG", cat: "buty-pilkarskie", sub: "korki",
    price: 829.99, oldPrice: null, badge: "PREMIUM", rating: 4.9, reviews: 210,
    sizes: ["40","41","42","43","44"],
    img: { c1: "#101820", c2: "#ffffff", c3: "#c9a227" },
    desc: "Ręcznie szyta japońska jakość. Miękka skóra premium i niska waga — model ceniony przez zawodników od trzech dekad." },
  { id: 6,  type: "boot", brand: "Joma", name: "Joma Liga Cup FG", cat: "buty-pilkarskie", sub: "korki",
    price: 299.99, oldPrice: 399.99, badge: "-25%", rating: 4.3, reviews: 77,
    sizes: ["39","40","41","42","43","44","45"],
    img: { c1: "#0a8f3c", c2: "#ffffff", c3: "#111111" },
    desc: "Solidne korki w rozsądnej cenie. Wzmocniona pięta i antypoślizgowa wkładka — idealne na ligę okręgową." },

  /* ---------------- HALÓWKI ---------------- */
  { id: 7,  type: "boot", brand: "Nike", name: "Nike Sala Pro IC", cat: "buty-pilkarskie", sub: "halowki",
    price: 429.99, oldPrice: 529.99, badge: null, rating: 4.6, reviews: 88,
    sizes: ["39","40","41","42","43","44","45"],
    img: { c1: "#f5f5f5", c2: "#1f6fff", c3: "#111111" },
    desc: "Halówki z niebrudzącą podeszwą gumową. Zamszowy przód zwiększa kontrolę przy szybkiej grze jeden na jeden." },
  { id: 8,  type: "boot", brand: "adidas", name: "adidas Futsal Top IN", cat: "buty-pilkarskie", sub: "halowki",
    price: 379.99, oldPrice: null, badge: "NOWOŚĆ", rating: 4.5, reviews: 35,
    sizes: ["40","41","42","43","44"],
    img: { c1: "#111111", c2: "#ff2e63", c3: "#ffffff" },
    desc: "Profil stworzony do futsalu: płaska podeszwa o wysokiej przyczepności i wzmocnienie w strefie dryblingu." },
  { id: 9,  type: "boot", brand: "Joma", name: "Joma Hala Max IC", cat: "buty-pilkarskie", sub: "halowki",
    price: 249.99, oldPrice: 319.99, badge: "-22%", rating: 4.4, reviews: 61,
    sizes: ["39","40","41","42","43","44","45","46"],
    img: { c1: "#ffd400", c2: "#111111", c3: "#ffffff" },
    desc: "Bestseller na halę — przewiewna siatka, elastyczna podeszwa i charakterystyczny żółty kolor." },

  /* ---------------- TURFY ---------------- */
  { id: 10, type: "boot", brand: "Puma", name: "Puma Orlik Turf TF", cat: "buty-pilkarskie", sub: "turfy",
    price: 289.99, oldPrice: 359.99, badge: null, rating: 4.4, reviews: 52,
    sizes: ["39","40","41","42","43","44","45"],
    img: { c1: "#2b2b2b", c2: "#00d68f", c3: "#ffffff" },
    desc: "Setki drobnych korków gumowych zapewnia pewne prowadzenie piłki na orliku i starszej sztucznej trawie." },
  { id: 11, type: "boot", brand: "New Balance", name: "New Balance Trening TF", cat: "buty-pilkarskie", sub: "turfy",
    price: 329.99, oldPrice: null, badge: null, rating: 4.2, reviews: 29,
    sizes: ["40","41","42","43","44"],
    img: { c1: "#4b4bff", c2: "#ffffff", c3: "#111111" },
    desc: "Uniwersalne turfy treningowe z amortyzującą piętą — komfort nawet podczas długich jednostek treningowych." },

  /* ---------------- BUTY DZIECIĘCE ---------------- */
  { id: 12, type: "boot", brand: "Nike", name: "Nike Velocity Junior FG", cat: "buty-pilkarskie", sub: "buty-dzieciece",
    price: 249.99, oldPrice: 299.99, badge: "JUNIOR", rating: 4.7, reviews: 143,
    sizes: ["33","34","35","36","37","38"],
    img: { c1: "#ff4d2e", c2: "#ffffff", c3: "#111111" },
    desc: "Dziecięca wersja hitowego modelu. Łatwe wsuwanie bez sznurówek i miękka cholewka przyjazna rosnącej stopie." },
  { id: 13, type: "boot", brand: "adidas", name: "adidas Młody Talent FG", cat: "buty-pilkarskie", sub: "buty-dzieciece",
    price: 199.99, oldPrice: null, badge: null, rating: 4.5, reviews: 67,
    sizes: ["32","33","34","35","36","37","38"],
    img: { c1: "#1f6fff", c2: "#ffffff", c3: "#ffd400" },
    desc: "Lekkie korki dla młodych zawodników z systemem szybkiego sznurowania i wzmocnionym noskiem." },

  /* ---------------- KOSZULKI ---------------- */
  { id: 14, type: "shirt", brand: "Nike", name: "Koszulka Nike Dynamik Czerwona", cat: "odziez", sub: "koszulki",
    price: 149.99, oldPrice: 189.99, badge: null, rating: 4.6, reviews: 84,
    sizes: ["S","M","L","XL","XXL"],
    img: { c1: "#e01a3c", c2: "#ffffff", c3: "#111111" },
    desc: "Techniczna koszulka meczowa odprowadzająca wilgoć. Płaskie szwy nie obcierają nawet przy pełnym sprincie." },
  { id: 15, type: "shirt", brand: "adidas", name: "Koszulka adidas Liga Granatowa", cat: "odziez", sub: "koszulki",
    price: 129.99, oldPrice: null, badge: null, rating: 4.5, reviews: 66,
    sizes: ["S","M","L","XL"],
    img: { c1: "#0d1b4c", c2: "#ffffff", c3: "#ffd400" },
    desc: "Klasyczny krój meczowy z kontrastowymi lamówkami. Materiał z recyklingu o wysokiej przewiewności." },
  { id: 16, type: "shirt", brand: "Puma", name: "Koszulka Puma Trening Zielona", cat: "odziez", sub: "koszulki",
    price: 99.99, oldPrice: 139.99, badge: "-28%", rating: 4.4, reviews: 51,
    sizes: ["S","M","L","XL","XXL"],
    img: { c1: "#0a8f3c", c2: "#111111", c3: "#ffffff" },
    desc: "Lekka koszulka treningowa z panelami z siatki pod pachami. Szybko schnie i zachowuje kolor po wielu praniach." },
  { id: 17, type: "shirt", brand: "Joma", name: "Koszulka Joma Drużynowa Biała", cat: "odziez", sub: "koszulki",
    price: 59.99, oldPrice: null, badge: "TEAM", rating: 4.3, reviews: 112,
    sizes: ["XS","S","M","L","XL","XXL"],
    img: { c1: "#ffffff", c2: "#1f6fff", c3: "#111111" },
    desc: "Najpopularniejsza koszulka drużynowa — dostępna w 12 kolorach, idealna pod nadruki numerów i logotypów klubu." },

  /* ---------------- SPODENKI ---------------- */
  { id: 18, type: "shorts", brand: "Nike", name: "Spodenki Nike Meczowe Czarne", cat: "odziez", sub: "spodenki",
    price: 89.99, oldPrice: null, badge: null, rating: 4.5, reviews: 73,
    sizes: ["S","M","L","XL","XXL"],
    img: { c1: "#111111", c2: "#ffffff", c3: "#ff4d2e" },
    desc: "Meczowe spodenki z elastycznym pasem i wszytą siateczką. Krój nie krępuje ruchów przy strzałach z woleja." },
  { id: 19, type: "shorts", brand: "adidas", name: "Spodenki adidas Klub Białe", cat: "odziez", sub: "spodenki",
    price: 79.99, oldPrice: 99.99, badge: null, rating: 4.4, reviews: 44,
    sizes: ["S","M","L","XL"],
    img: { c1: "#ffffff", c2: "#111111", c3: "#1f6fff" },
    desc: "Uniwersalne spodenki klubowe z lekkiej dzianiny. Kieszenie boczne przydają się na treningu." },

  /* ---------------- DRESY ---------------- */
  { id: 20, type: "tracksuit", brand: "Nike", name: "Dres Nike Reprezentacyjny", cat: "odziez", sub: "dresy",
    price: 349.99, oldPrice: 449.99, badge: "-22%", rating: 4.7, reviews: 91,
    sizes: ["S","M","L","XL","XXL"],
    img: { c1: "#0d1b4c", c2: "#ffffff", c3: "#e01a3c" },
    desc: "Komplet dresowy: bluza z zamkiem i zwężane spodnie. Miękka dzianina funkcyjna na rozgrzewkę i co dzień." },
  { id: 21, type: "tracksuit", brand: "Puma", name: "Bluza Puma Kaptur Szara", cat: "odziez", sub: "dresy",
    price: 199.99, oldPrice: null, badge: null, rating: 4.5, reviews: 38,
    sizes: ["S","M","L","XL"],
    img: { c1: "#8a8f98", c2: "#111111", c3: "#ffffff" },
    desc: "Ciepła bluza z kapturem i kieszenią kangurką. Bawełna z domieszką elastanu trzyma fason." },

  /* ---------------- GETRY ---------------- */
  { id: 22, type: "socks", brand: "adidas", name: "Getry adidas Meczowe Czerwone", cat: "odziez", sub: "getry",
    price: 39.99, oldPrice: null, badge: null, rating: 4.6, reviews: 156,
    sizes: ["34-36","37-39","40-42","43-45"],
    img: { c1: "#e01a3c", c2: "#ffffff", c3: "#111111" },
    desc: "Getry meczowe ze strefową kompresją łydki i wzmocnioną piętą. Nie zsuwają się nawet bez tejpów." },
  { id: 23, type: "socks", brand: "Nike", name: "Getry Nike Grip Białe", cat: "odziez", sub: "getry",
    price: 59.99, oldPrice: 69.99, badge: "GRIP", rating: 4.8, reviews: 203,
    sizes: ["36-38","39-42","43-46"],
    img: { c1: "#ffffff", c2: "#111111", c3: "#1f6fff" },
    desc: "Antypoślizgowe pola silikonowe wewnątrz i na podeszwie stopy eliminują ślizganie stopy w bucie." },

  /* ---------------- RĘKAWICE ---------------- */
  { id: 24, type: "glove", brand: "Uhlsport", name: "Rękawice Uhlsport Absolut Grip", cat: "bramkarskie", sub: "rekawice",
    price: 399.99, oldPrice: 499.99, badge: "HIT", rating: 4.8, reviews: 132,
    sizes: ["8","8.5","9","9.5","10","10.5","11"],
    img: { c1: "#111111", c2: "#00d68f", c3: "#ffffff" },
    desc: "Profesjonalna pianka lateksowa 4 mm o ekstremalnej chwytności w każdych warunkach pogodowych. Krój negative cut." },
  { id: 25, type: "glove", brand: "adidas", name: "Rękawice adidas Predator Mecz", cat: "bramkarskie", sub: "rekawice",
    price: 349.99, oldPrice: null, badge: null, rating: 4.6, reviews: 87,
    sizes: ["7","8","9","10","11"],
    img: { c1: "#ff2e63", c2: "#111111", c3: "#ffffff" },
    desc: "Meczowe rękawice z usztywnieniem nadgarstka i wydłużonym lateksem na palcach dla większej powierzchni chwytu." },
  { id: 26, type: "glove", brand: "Nike", name: "Rękawice Nike Trening Junior", cat: "bramkarskie", sub: "rekawice",
    price: 119.99, oldPrice: 149.99, badge: "JUNIOR", rating: 4.4, reviews: 59,
    sizes: ["4","5","6","7"],
    img: { c1: "#1f6fff", c2: "#ffd400", c3: "#ffffff" },
    desc: "Trwałe rękawice treningowe dla młodych bramkarzy. Pianka odporna na sztuczne nawierzchnie." },
  { id: 27, type: "glove", brand: "Select", name: "Rękawice Select Liga 88", cat: "bramkarskie", sub: "rekawice",
    price: 229.99, oldPrice: 279.99, badge: null, rating: 4.5, reviews: 71,
    sizes: ["8","9","10","11"],
    img: { c1: "#ffffff", c2: "#1f6fff", c3: "#111111" },
    desc: "Skandynawska konstrukcja z podwójnym paskiem stabilizującym. Świetny stosunek jakości do ceny." },

  /* ---------------- STROJE BRAMKARSKIE ---------------- */
  { id: 28, type: "shirt", brand: "Uhlsport", name: "Bluza bramkarska Uhlsport Neon", cat: "bramkarskie", sub: "stroje-bramkarskie",
    price: 179.99, oldPrice: null, badge: null, rating: 4.5, reviews: 33,
    sizes: ["S","M","L","XL","XXL"],
    img: { c1: "#d4ff3f", c2: "#111111", c3: "#8a8f98" },
    desc: "Bluza bramkarska z wypełnieniem na łokciach. Jaskrawy kolor zapewnia widoczność w polu karnym." },

  /* ---------------- PIŁKI ---------------- */
  { id: 29, type: "ball", brand: "Select", name: "Piłka Select Mecz Pro FIFA", cat: "pilki", sub: "meczowe",
    price: 299.99, oldPrice: 379.99, badge: "FIFA", rating: 4.9, reviews: 178,
    sizes: ["5"],
    img: { c1: "#ffffff", c2: "#e01a3c", c3: "#111111" },
    desc: "Piłka meczowa z certyfikatem jakości. Ręcznie szyte panele i idealnie wyważona konstrukcja 32-panelowa." },
  { id: 30, type: "ball", brand: "Nike", name: "Piłka Nike Liga Premier", cat: "pilki", sub: "meczowe",
    price: 249.99, oldPrice: null, badge: null, rating: 4.7, reviews: 95,
    sizes: ["4","5"],
    img: { c1: "#ffffff", c2: "#1f6fff", c3: "#ffd400" },
    desc: "Replika piłki ligowej z grafiką o wysokim kontraście — doskonale widoczna przy szybkiej grze." },
  { id: 31, type: "ball", brand: "adidas", name: "Piłka adidas Trening Klub", cat: "pilki", sub: "treningowe",
    price: 119.99, oldPrice: 149.99, badge: "-20%", rating: 4.5, reviews: 204,
    sizes: ["3","4","5"],
    img: { c1: "#ffffff", c2: "#0a8f3c", c3: "#111111" },
    desc: "Wytrzymała piłka treningowa zszywana maszynowo. Butylowa dętka długo trzyma powietrze." },
  { id: 32, type: "ball", brand: "Select", name: "Piłka Select Futsal Pro", cat: "pilki", sub: "halowe",
    price: 179.99, oldPrice: null, badge: null, rating: 4.6, reviews: 62,
    sizes: ["4"],
    img: { c1: "#ffd400", c2: "#111111", c3: "#ffffff" },
    desc: "Piłka futsalowa o obniżonym koźle. Idealna kontrola przy grze po parkiecie." },
  { id: 33, type: "ball", brand: "Puma", name: "Piłka Puma Ulica Mini", cat: "pilki", sub: "treningowe",
    price: 59.99, oldPrice: 79.99, badge: "MINI", rating: 4.4, reviews: 89,
    sizes: ["1"],
    img: { c1: "#111111", c2: "#ff9d00", c3: "#ffffff" },
    desc: "Miniaturowa piłka rozmiar 1 — do żonglerki, techniki i zabawy w ogrodzie." },

  /* ---------------- OCHRANIACZE ---------------- */
  { id: 34, type: "shin", brand: "Nike", name: "Ochraniacze Nike Tarcza", cat: "akcesoria", sub: "ochraniacze",
    price: 79.99, oldPrice: 99.99, badge: null, rating: 4.5, reviews: 118,
    sizes: ["S","M","L","XL"],
    img: { c1: "#111111", c2: "#ff4d2e", c3: "#ffffff" },
    desc: "Anatomiczne ochraniacze z twardą skorupą i pianką EVA. W zestawie ściągacze mocujące." },
  { id: 35, type: "shin", brand: "adidas", name: "Ochraniacze adidas Liga Junior", cat: "akcesoria", sub: "ochraniacze",
    price: 49.99, oldPrice: null, badge: "JUNIOR", rating: 4.3, reviews: 76,
    sizes: ["XS","S","M"],
    img: { c1: "#1f6fff", c2: "#ffffff", c3: "#ffd400" },
    desc: "Lekkie ochraniacze dla najmłodszych z regulowanym paskiem. Wentylowane kanały odprowadzają ciepło." },

  /* ---------------- TORBY ---------------- */
  { id: 36, type: "bag", brand: "Puma", name: "Torba Puma Klubowa M", cat: "akcesoria", sub: "torby",
    price: 129.99, oldPrice: 169.99, badge: "-23%", rating: 4.6, reviews: 64,
    sizes: ["M"],
    img: { c1: "#111111", c2: "#ff9d00", c3: "#ffffff" },
    desc: "Torba treningowa 42 l z wydzieloną kieszenią na buty i mokry ekwipunek. Wzmocnione dno." },
  { id: 37, type: "bag", brand: "Nike", name: "Plecak Nike Boisko", cat: "akcesoria", sub: "torby",
    price: 149.99, oldPrice: null, badge: null, rating: 4.7, reviews: 102,
    sizes: ["Uni"],
    img: { c1: "#0d1b4c", c2: "#ffffff", c3: "#ff4d2e" },
    desc: "Plecak piłkarski z komorą na piłkę, przegrodą na laptopa i siatką na buty. Pojemność 30 l." },

  /* ---------------- SPRZĘT ---------------- */
  { id: 38, type: "cone", brand: "Select", name: "Zestaw pachołków Select 40 szt.", cat: "akcesoria", sub: "sprzet",
    price: 89.99, oldPrice: 119.99, badge: null, rating: 4.8, reviews: 143,
    sizes: ["Uni"],
    img: { c1: "#ff9d00", c2: "#ffd400", c3: "#00d68f" },
    desc: "40 elastycznych pachołków w czterech kolorach ze stojakiem. Nie pękają nawet po nadepnięciu korkami." },
  { id: 39, type: "cone", brand: "Joma", name: "Drabinka koordynacyjna Joma 6 m", cat: "akcesoria", sub: "sprzet",
    price: 69.99, oldPrice: null, badge: null, rating: 4.5, reviews: 57,
    sizes: ["6 m"],
    img: { c1: "#ffd400", c2: "#111111", c3: "#ffffff" },
    desc: "Drabinka treningowa z regulowanym rozstawem szczebli i torbą transportową. Poprawia szybkość nóg." },

  /* ---------------- WYPRZEDAŻ (dodatkowe) ---------------- */
  { id: 40, type: "boot", brand: "Mizuno", name: "Mizuno Fala Prędkości FG", cat: "buty-pilkarskie", sub: "korki",
    price: 449.99, oldPrice: 749.99, badge: "-40%", rating: 4.6, reviews: 83,
    sizes: ["41","42","43","44"],
    img: { c1: "#ffffff", c2: "#1f6fff", c3: "#e01a3c" },
    desc: "Zeszłoroczna kolekcja w super cenie. Lekka cholewka syntetyczna i sprawdzona podeszwa FG." },
  { id: 41, type: "shirt", brand: "New Balance", name: "Koszulka New Balance Retro 90", cat: "odziez", sub: "koszulki",
    price: 89.99, oldPrice: 159.99, badge: "-44%", rating: 4.5, reviews: 47,
    sizes: ["M","L","XL"],
    img: { c1: "#00a3a3", c2: "#ffffff", c3: "#111111" },
    desc: "Koszulka w stylu retro lat 90. z haftowanym logo. Gramatura premium 180 g/m²." },
  { id: 42, type: "glove", brand: "Uhlsport", name: "Rękawice Uhlsport Miękki Grip", cat: "bramkarskie", sub: "rekawice",
    price: 159.99, oldPrice: 289.99, badge: "-45%", rating: 4.4, reviews: 92,
    sizes: ["8","9","10"],
    img: { c1: "#8a8f98", c2: "#d4ff3f", c3: "#111111" },
    desc: "Rękawice meczowe z poprzedniego sezonu — pełnowartościowa pianka soft grip w wyprzedażowej cenie." },
  { id: 43, type: "ball", brand: "Joma", name: "Piłka Joma Klub Trening", cat: "pilki", sub: "treningowe",
    price: 69.99, oldPrice: 109.99, badge: "-36%", rating: 4.3, reviews: 138,
    sizes: ["4","5"],
    img: { c1: "#ffffff", c2: "#ff9d00", c3: "#111111" },
    desc: "Ekonomiczna piłka treningowa do codziennej pracy z drużyną. Odporna na ścieranie powłoka TPU." },
  { id: 44, type: "bag", brand: "adidas", name: "Worek adidas Gymsack", cat: "akcesoria", sub: "torby",
    price: 39.99, oldPrice: 59.99, badge: "-33%", rating: 4.2, reviews: 66,
    sizes: ["Uni"],
    img: { c1: "#e01a3c", c2: "#ffffff", c3: "#111111" },
    desc: "Lekki worek na buty i strój. Regulowane sznurki pełnią rolę szelek." },
  { id: 45, type: "shorts", brand: "Joma", name: "Spodenki Joma Drużynowe Granat", cat: "odziez", sub: "spodenki",
    price: 44.99, oldPrice: null, badge: "TEAM", rating: 4.4, reviews: 174,
    sizes: ["XS","S","M","L","XL","XXL"],
    img: { c1: "#0d1b4c", c2: "#ffffff", c3: "#ffd400" },
    desc: "Drużynowe spodenki dostępne w rozmiarówce od dziecięcej do XXL. Idealne pod nadruki." },
  { id: 46, type: "socks", brand: "Select", name: "Getry Select Klub Zielone", cat: "odziez", sub: "getry",
    price: 29.99, oldPrice: null, badge: null, rating: 4.3, reviews: 98,
    sizes: ["31-35","36-40","41-45"],
    img: { c1: "#0a8f3c", c2: "#ffffff", c3: "#111111" },
    desc: "Klasyczne getry klubowe z przewiewnej dzianiny. Wzmocniona pięta i palce." },
  { id: 47, type: "tracksuit", brand: "adidas", name: "Spodnie adidas Trening Zwężane", cat: "odziez", sub: "dresy",
    price: 169.99, oldPrice: 219.99, badge: null, rating: 4.6, reviews: 121,
    sizes: ["S","M","L","XL","XXL"],
    img: { c1: "#111111", c2: "#ffffff", c3: "#d4ff3f" },
    desc: "Zwężane spodnie treningowe z zamkami przy kostkach — założysz je bez zdejmowania korków." },
  { id: 48, type: "glove", brand: "Puma", name: "Rękawice Puma Ultra Chwyt", cat: "bramkarskie", sub: "rekawice",
    price: 289.99, oldPrice: null, badge: "NOWOŚĆ", rating: 4.7, reviews: 24,
    sizes: ["8","8.5","9","9.5","10","11"],
    img: { c1: "#ff9d00", c2: "#111111", c3: "#ffffff" },
    desc: "Nowość sezonu: hybrydowy krój łączący roll finger i negative cut. Lateks kontaktowy 4+3 mm." }
];

const HERO_SLIDES = [
  { title: "Nowa kolekcja korków już dostępna", subtitle: "Prędkość, kontrola, precyzja — wybierz swój styl gry",
    cta: "Sprawdź nowości", link: "kategoria.html?cat=buty-pilkarskie", theme: "orange" },
  { title: "Wyprzedaż do -45%", subtitle: "Buty, rękawice i odzież z poprzednich kolekcji w super cenach",
    cta: "Zobacz okazje", link: "kategoria.html?cat=wyprzedaz", theme: "dark" },
  { title: "Strefa bramkarza", subtitle: "Profesjonalne rękawice meczowe i treningowe od 119,99 zł",
    cta: "Do strefy bramkarza", link: "kategoria.html?cat=bramkarskie", theme: "green" }
];

const FREE_SHIPPING_FROM = 300;
const PERS_PRICE = 24.99; /* nadruk nazwiska i numeru */
const SHIPPING_COST = 12.99;
const PROMO_CODES = { "GOL10": 0.10, "START15": 0.15 };
