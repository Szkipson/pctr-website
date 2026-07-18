# GOL-STORE — sklep piłkarski (demo)

Statyczny klon funkcjonalny sklepu piłkarskiego inspirowany układem serwisu r-gol.com.
**Projekt edukacyjny/demonstracyjny** — wszystkie produkty, ceny, opinie i grafiki są
fikcyjne (obrazy produktów generowane jako SVG), a zamówienia i płatności są symulowane.
Nie użyto żadnych materiałów (logo, zdjęć, tekstów) należących do R-GOL.

## Uruchomienie na localhoście

Wystarczy dowolny serwer statyczny, np.:

```bash
# Python (wbudowany w większość systemów)
python3 -m http.server 8000

# albo Node.js
npx serve .
```

Następnie otwórz w przeglądarce: **http://localhost:8000**

> Strona działa też po otwarciu `index.html` bezpośrednio z dysku,
> ale serwer lokalny jest zalecany.

## Funkcje

- **Strona główna** — slider hero (autoplay, strzałki, kropki), kafle kategorii,
  karuzele: Nowości / Bestsellery / Wyprzedaż, banery promocyjne, kafle marek,
  sekcja „Ostatnio oglądane" i zajawki Strefy wiedzy
- **Szybki zakup** — najechanie na kafelek produktu pokazuje rozmiary,
  kliknięcie rozmiaru dodaje produkt do koszyka prosto z listingu
- **Mega-menu** kategorii z podkategoriami i markami (desktop) + menu szufladowe (mobile)
- **Wyszukiwarka** z podpowiedziami na żywo i stroną wyników
- **Listing kategorii** — filtry (podkategoria, marka, rozmiar, cena, przecenione),
  chipy aktywnych filtrów, 5 trybów sortowania, paginacja, licznik produktów
- **Karta produktu** — galeria z miniaturami, wybór rozmiaru (z walidacją;
  jedyny dostępny rozmiar zaznacza się sam), modal tabeli rozmiarów,
  personalizacja koszulek (nadruk nazwiska i numeru, +24,99 zł),
  zakładki Opis / Specyfikacja / Opinie, produkty powiązane, ostatnio oglądane
- **Koszyk** — drawer boczny + pełna strona, zmiana ilości, usuwanie,
  pasek postępu darmowej dostawy (od 300 zł), kody rabatowe (`GOL10`, `START15`)
- **Zamówienie** — formularz z walidacją, wybór dostawy i płatności,
  dynamiczne podsumowanie, ekran potwierdzenia
- **Ulubione** — serduszka na kartach produktów, osobna strona listy
- **Strefa wiedzy** — blog z poradnikami (dobór korków, pielęgnacja rękawic, rozgrzewka)
- **Konto** — modal logowania (demo)
- **Newsletter** — formularz zapisu (demo)
- Koszyk, ulubione i kod rabatowy zapisywane w `localStorage`
  (z awaryjnym magazynem w pamięci, gdy localStorage jest zablokowany)
- Pełna responsywność (desktop / tablet / mobile)

## Struktura

```
index.html        strona główna
kategoria.html    listing + wyszukiwarka (?cat=…&sub=…&brand=…&q=…)
produkt.html      karta produktu (?id=…)
koszyk.html       koszyk
zamowienie.html   składanie zamówienia
ulubione.html     lista ulubionych
blog.html         strefa wiedzy (poradniki)
css/style.css     style
js/data.js        dane: produkty, kategorie, marki, promocje
js/images.js      generator grafik produktowych (SVG)
js/common.js      nagłówek, stopka, koszyk, ulubione, wyszukiwarka
js/*.js           skrypty poszczególnych stron
```

Brak zależności zewnętrznych — czysty HTML + CSS + JavaScript.
