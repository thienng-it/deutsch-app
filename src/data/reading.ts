export interface ReadingMaterial {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  title: string;
  category: 'daily-life' | 'work' | 'exam-prep' | 'culture' | 'practical-documents' | 'business';
  text: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  vocabulary: { word: string; translation: string; context: string }[];
  comprehensionQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  grammarFocus: string[];
  examTips?: string[];
  practicalTips?: string[];
  culturalNotes?: string[];
  relatedMaterials?: string[];
  estimatedTime: number; // in minutes
}

export const readingMaterials: ReadingMaterial[] = [
  // ==================== A1 LEVEL ====================
  {
    id: 'a1-1',
    level: 'A1',
    title: 'Meine erste Woche in Deutschland',
    category: 'daily-life',
    difficulty: 'beginner',
    estimatedTime: 15,
    text: `Hallo! Ich heiße Anna und ich komme aus Vietnam. Ich bin seit einer Woche in Deutschland. Ich wohne jetzt in München. Meine Wohnung ist klein aber schön. Sie hat ein Schlafzimmer, eine Küche und ein Badezimmer.

Jeden Morgen stehe ich um 7 Uhr auf. Ich frühstücke um 7:30 Uhr. Ich esse Brot mit Butter und Marmelade. Ich trinke Kaffee. Um 8 Uhr gehe ich zur Sprachschule. Der Deutschkurs beginnt um 8:30 Uhr und endet um 12:30 Uhr.

Am Nachmittag gehe ich oft einkaufen. Der Supermarkt heißt REWE. Dort kaufe ich Brot, Milch, Obst und Gemüse. Die Menschen sind sehr freundlich. Sie helfen mir beim Deutsch lernen.

Am Abend koche ich zu Hause. Manchmal esse ich auch im Restaurant. Das Essen in Deutschland ist sehr lecker. Ich mag besonders Brezeln und Käse.`,
    vocabulary: [
      { word: 'seit', translation: 'since, for', context: 'Ich bin seit einer Woche in Deutschland' },
      { word: 'aufstehen', translation: 'to get up', context: 'Ich stehe um 7 Uhr auf' },
      { word: 'frühstücken', translation: 'to have breakfast', context: 'Ich frühstücke um 7:30 Uhr' },
      { word: 'einkaufen', translation: 'to shop', context: 'Ich gehe einkaufen' },
      { word: 'freundlich', translation: 'friendly', context: 'Die Menschen sind sehr freundlich' },
      { word: 'besonders', translation: 'especially', context: 'Ich mag besonders Brezeln' },
    ],
    comprehensionQuestions: [
      {
        question: 'Woher kommt Anna?',
        options: ['Aus Deutschland', 'Aus Vietnam', 'Aus München', 'Aus China'],
        correctAnswer: 1,
        explanation: 'Anna sagt: "Ich komme aus Vietnam"',
      },
      {
        question: 'Wie lange ist Anna schon in Deutschland?',
        options: ['Ein Tag', 'Eine Woche', 'Ein Monat', 'Ein Jahr'],
        correctAnswer: 1,
        explanation: 'Anna sagt: "Ich bin seit einer Woche in Deutschland"',
      },
      {
        question: 'Wann beginnt der Deutschkurs?',
        options: ['Um 7:00 Uhr', 'Um 7:30 Uhr', 'Um 8:00 Uhr', 'Um 8:30 Uhr'],
        correctAnswer: 3,
        explanation: 'Der Text sagt: "Der Deutschkurs beginnt um 8:30 Uhr"',
      },
      {
        question: 'Was macht Anna am Nachmittag?',
        options: ['Sie schläft', 'Sie geht einkaufen', 'Sie arbeitet', 'Sie lernt Deutsch'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Am Nachmittag gehe ich oft einkaufen"',
      },
    ],
    grammarFocus: [
      'Trennbare Verben (aufstehen, einkaufen)',
      'Zeitangaben mit "um"',
      'Präsens (Gegenwart)',
      'Possessivpronomen (meine, mein)',
    ],
    examTips: [
      'Achten Sie auf Zeitangaben (um, am, jeden)',
      'Verstehen Sie die W-Fragen (Wer? Wo? Wann? Was?)',
      'Notieren Sie wichtige Details beim ersten Lesen',
    ],
    practicalTips: [
      'Lernen Sie die Namen deutscher Supermarktketten: REWE, EDEKA, ALDI, LIDL',
      'Deutsche essen normalerweise Brot zum Frühstück',
      'Pünktlichkeit ist in Deutschland sehr wichtig',
    ],
    culturalNotes: [
      'In Deutschland beginnen die Geschäfte normalerweise um 8 oder 9 Uhr',
      'Brezeln sind ein traditionelles deutsches Gebäck',
      'Deutsche grüßen oft mit "Guten Morgen", "Guten Tag" oder "Hallo"',
    ],
    relatedMaterials: [
      'Menschen A1 - Lektion 1-3: Erste Kontakte',
      'Schritte International Neu A1 - Alltag in Deutschland',
      'Begegnungen A1 - Kapitel 1: Begrüßung und Vorstellung',
    ],
  },
  {
    id: 'a1-2',
    level: 'A1',
    title: 'Die Anmeldung beim Bürgeramt',
    category: 'practical-documents',
    difficulty: 'beginner',
    estimatedTime: 20,
    text: `Sie sind neu in Deutschland? Dann müssen Sie sich beim Bürgeramt anmelden. Das ist sehr wichtig! Sie haben 14 Tage Zeit nach Ihrem Umzug.

Was brauchen Sie für die Anmeldung?
- Ihren Reisepass oder Personalausweis
- Das Anmeldeformular (bekommen Sie im Bürgeramt oder online)
- Den Mietvertrag oder eine Wohnungsgeberbestätigung
- Eventuell eine Geburtsurkunde

Wo finden Sie das Bürgeramt?
Das Bürgeramt gibt es in jeder Stadt. In großen Städten gibt es mehrere Bürgerämter. Suchen Sie online nach "Bürgeramt" + Ihre Stadt.

Brauchen Sie einen Termin?
In den meisten Städten brauchen Sie einen Termin. Buchen Sie den Termin online auf der Website der Stadt. Manchmal können Sie auch ohne Termin kommen, aber dann warten Sie oft sehr lange.

Was kostet die Anmeldung?
Die Anmeldung ist kostenlos. Sie bekommen eine Anmeldebestätigung. Diese Bestätigung brauchen Sie für:
- Die Bank (Konto eröffnen)
- Die Arbeit
- Die Krankenkasse
- Vieles mehr

Wichtig: Wenn Sie umziehen, müssen Sie sich auch ummelden!`,
    vocabulary: [
      { word: 'sich anmelden', translation: 'to register', context: 'Sie müssen sich beim Bürgeramt anmelden' },
      { word: 'das Bürgeramt', translation: 'citizen\'s office', context: 'Das Bürgeramt gibt es in jeder Stadt' },
      { word: 'der Umzug', translation: 'move, relocation', context: 'nach Ihrem Umzug' },
      { word: 'der Mietvertrag', translation: 'rental contract', context: 'Den Mietvertrag oder eine Wohnungsgeberbestätigung' },
      { word: 'die Geburtsurkunde', translation: 'birth certificate', context: 'Eventuell eine Geburtsurkunde' },
      { word: 'kostenlos', translation: 'free of charge', context: 'Die Anmeldung ist kostenlos' },
      { word: 'eröffnen', translation: 'to open', context: 'Konto eröffnen' },
      { word: 'sich ummelden', translation: 'to re-register', context: 'müssen Sie sich auch ummelden' },
    ],
    comprehensionQuestions: [
      {
        question: 'Wie viel Zeit haben Sie für die Anmeldung nach dem Umzug?',
        options: ['7 Tage', '14 Tage', '30 Tage', '3 Monate'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Sie haben 14 Tage Zeit nach Ihrem Umzug"',
      },
      {
        question: 'Was brauchen Sie NICHT für die Anmeldung?',
        options: ['Reisepass', 'Mietvertrag', 'Führerschein', 'Anmeldeformular'],
        correctAnswer: 2,
        explanation: 'Der Führerschein steht nicht in der Liste der benötigten Dokumente',
      },
      {
        question: 'Wie viel kostet die Anmeldung?',
        options: ['10 Euro', '25 Euro', 'Sie ist kostenlos', '50 Euro'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Die Anmeldung ist kostenlos"',
      },
      {
        question: 'Wofür brauchen Sie die Anmeldebestätigung?',
        options: ['Nur für die Bank', 'Nur für die Arbeit', 'Für Bank, Arbeit, Krankenkasse und mehr', 'Sie brauchen sie nicht'],
        correctAnswer: 2,
        explanation: 'Der Text listet mehrere Verwendungszwecke auf: Bank, Arbeit, Krankenkasse und mehr',
      },
    ],
    grammarFocus: [
      'Reflexive Verben (sich anmelden, sich ummelden)',
      'Modalverben (müssen, können, brauchen)',
      'Akkusativ bei Dokumenten',
      'Präpositionen mit Dativ (beim, nach)',
    ],
    examTips: [
      'Verstehen Sie praktische Anweisungen und Anforderungen',
      'Achten Sie auf Zeitangaben (14 Tage)',
      'Notieren Sie Listen von benötigten Dokumenten',
      'Prüfungen testen oft Alltagssituationen wie Behördengänge',
    ],
    practicalTips: [
      'Buchen Sie Ihren Termin so früh wie möglich - oft sind die Termine ausgebucht',
      'Machen Sie Kopien aller Dokumente für Ihre eigenen Unterlagen',
      'Die Anmeldebestätigung ist eines der wichtigsten Dokumente in Deutschland',
      'Ohne Anmeldung können Sie kein Bankkonto eröffnen',
      'Bei Umzug innerhalb Deutschlands: Ummeldung innerhalb von 14 Tagen',
    ],
    culturalNotes: [
      'Deutsche Behörden sind sehr genau mit Fristen - halten Sie die 14-Tage-Frist ein!',
      'Die Meldepflicht (registration requirement) ist in Deutschland gesetzlich vorgeschrieben',
      'Viele Behörden in Deutschland arbeiten nur mit Termin',
    ],
    relatedMaterials: [
      'Schritte International Neu A1 - Lektion 7: Behörden und Ämter',
      'Menschen A1 - Modul 4: Orientierung in der Stadt',
      'Studio 21 A1 - Einheit 5: Wohnen',
    ],
  },

  // ==================== A2 LEVEL ====================
  {
    id: 'a2-1',
    level: 'A2',
    title: 'Bewerbung für einen Job schreiben',
    category: 'work',
    difficulty: 'intermediate',
    estimatedTime: 25,
    text: `Eine gute Bewerbung ist der erste Schritt zu einem neuen Job in Deutschland. Eine vollständige Bewerbung besteht normalerweise aus drei Teilen:

1. Das Anschreiben
Das Anschreiben ist sehr wichtig. Hier stellen Sie sich vor und erklären, warum Sie die richtige Person für den Job sind. Das Anschreiben sollte:
- Nicht länger als eine Seite sein
- Ihre Motivation klar zeigen
- Ihre wichtigsten Qualifikationen nennen
- Fehlerfrei sein (Rechtschreibung und Grammatik!)

Struktur des Anschreibens:
- Ihre Adresse und Kontaktdaten (oben links)
- Adresse der Firma (oben rechts)
- Datum
- Betreffzeile: "Bewerbung als..." oder "Bewerbung für die Stelle als..."
- Anrede: "Sehr geehrte Damen und Herren" oder besser "Sehr geehrte/r Frau/Herr [Name]"
- Einleitung: Wie haben Sie von der Stelle erfahren?
- Hauptteil: Ihre Qualifikationen und Erfahrungen
- Schluss: Wann können Sie anfangen? Bitten Sie um ein Vorstellungsgespräch
- Grußformel: "Mit freundlichen Grüßen"
- Ihre Unterschrift

2. Der Lebenslauf
Der Lebenslauf gibt einen Überblick über Ihre Ausbildung und Berufserfahrung. In Deutschland ist ein tabellarischer Lebenslauf üblich. Wichtige Punkte:
- Persönliche Daten (Name, Adresse, Telefon, E-Mail, Geburtsdatum)
- Berufserfahrung (neueste Position zuerst!)
- Ausbildung und Qualifikationen
- Sprachkenntnisse
- Besondere Kenntnisse (Computer, Führerschein, etc.)
- Ein professionelles Foto (optional, aber üblich)

3. Zeugnisse und Zertifikate
Legen Sie Kopien Ihrer wichtigsten Zeugnisse bei:
- Arbeitszeugnisse
- Ausbildungszeugnisse
- Sprachzertifikate (z.B. Goethe-Zertifikat, telc)
- Andere relevante Zertifikate

Wichtige Tipps:
- Schicken Sie Ihre Bewerbung am besten per E-Mail (als PDF)
- Bewerben Sie sich schnell - die besten Jobs sind schnell weg
- Passen Sie jede Bewerbung an die Stelle an
- Lassen Sie Ihre Bewerbung von einem Muttersprachler korrigieren`,
    vocabulary: [
      { word: 'die Bewerbung', translation: 'application', context: 'Eine gute Bewerbung ist der erste Schritt' },
      { word: 'das Anschreiben', translation: 'cover letter', context: 'Das Anschreiben ist sehr wichtig' },
      { word: 'der Lebenslauf', translation: 'CV, resume', context: 'Der Lebenslauf gibt einen Überblick' },
      { word: 'die Qualifikation', translation: 'qualification', context: 'Ihre wichtigsten Qualifikationen' },
      { word: 'fehlerfrei', translation: 'error-free', context: 'sollte fehlerfrei sein' },
      { word: 'die Betreffzeile', translation: 'subject line', context: 'Betreffzeile: Bewerbung als...' },
      { word: 'das Vorstellungsgespräch', translation: 'job interview', context: 'Bitten Sie um ein Vorstellungsgespräch' },
      { word: 'tabellarisch', translation: 'tabular, in table form', context: 'ein tabellarischer Lebenslauf' },
      { word: 'das Zeugnis', translation: 'certificate, reference', context: 'Kopien Ihrer wichtigsten Zeugnisse' },
      { word: 'anpassen', translation: 'to adapt, customize', context: 'Passen Sie jede Bewerbung an' },
    ],
    comprehensionQuestions: [
      {
        question: 'Aus wie vielen Teilen besteht eine vollständige Bewerbung normalerweise?',
        options: ['Zwei Teilen', 'Drei Teilen', 'Vier Teilen', 'Fünf Teilen'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Eine vollständige Bewerbung besteht normalerweise aus drei Teilen"',
      },
      {
        question: 'Wie lang sollte das Anschreiben sein?',
        options: ['Maximal eine halbe Seite', 'Maximal eine Seite', 'Zwei Seiten', 'So lang wie möglich'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Nicht länger als eine Seite sein"',
      },
      {
        question: 'In welcher Reihenfolge stehen die Positionen im Lebenslauf?',
        options: ['Älteste zuerst', 'Neueste zuerst', 'Alphabetisch', 'Nach Wichtigkeit'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Berufserfahrung (neueste Position zuerst!)"',
      },
      {
        question: 'Was ist in Deutschland üblich, aber optional?',
        options: ['Das Anschreiben', 'Der Lebenslauf', 'Ein Foto', 'Zeugnisse'],
        correctAnswer: 2,
        explanation: 'Der Text sagt über das Foto: "optional, aber üblich"',
      },
    ],
    grammarFocus: [
      'Passiv (wird gebraucht, ist üblich)',
      'Modalverben (sollte, können, müssen)',
      'Imperativ für Ratschläge (Schicken Sie, Bewerben Sie sich)',
      'Adjektivendungen (vollständige, wichtigsten, professionelles)',
    ],
    examTips: [
      'B1/B2 Prüfungen testen oft formelle Schreibkompetenz',
      'Lernen Sie die Struktur formeller Briefe und E-Mails',
      'Achten Sie auf korrekte Anrede und Grußformeln',
      'Verstehen Sie den Unterschied zwischen "Sie" (formal) und "du" (informal)',
    ],
    practicalTips: [
      'In Deutschland ist ein Foto üblich, aber nicht verpflichtend (seit 2006)',
      'Verwenden Sie niemals "Sehr geehrte Damen und Herren" wenn Sie den Namen kennen',
      'Ein Arbeitszeugnis in Deutschland muss wohlwollend sein, aber kodiert oft Kritik',
      'Online-Bewerbungen über Portale wie Indeed, StepStone, LinkedIn sind üblich',
      'Viele Firmen verwenden ATS (Applicant Tracking Systems) - verwenden Sie relevante Keywords',
      'Die DIN 5008 Norm regelt das Format von Geschäftsbriefen in Deutschland',
    ],
    culturalNotes: [
      'Deutsche Arbeitgeber erwarten eine sehr sorgfältige, fehlerfreie Bewerbung',
      'Pünktlichkeit und Genauigkeit bei der Bewerbung zeigen Professionalität',
      'Anders als in manchen Ländern sind in Deutschland Bewerbungsfotos noch üblich',
      'Deutsche schätzen Direktheit - seien Sie klar über Ihre Fähigkeiten',
    ],
    relatedMaterials: [
      'Menschen A2 - Modul 12: Arbeit und Beruf',
      'Schritte International Neu A2 - Lektion 10: Bewerbung',
      'Begegnungen A2 - Kapitel 4: Arbeitswelt',
      'Studio 21 A2 - Einheit 8: Beruf und Karriere',
    ],
  },
  {
    id: 'a2-2',
    level: 'A2',
    title: 'Das deutsche Gesundheitssystem verstehen',
    category: 'daily-life',
    difficulty: 'intermediate',
    estimatedTime: 30,
    text: `Das Gesundheitssystem in Deutschland ist eines der besten der Welt. Aber es ist auch kompliziert. Hier sind die wichtigsten Informationen für Ihr Leben in Deutschland:

Die Krankenversicherung ist Pflicht!
In Deutschland muss jeder eine Krankenversicherung haben. Es gibt zwei Arten:

1. Die gesetzliche Krankenversicherung (GKV)
Die meisten Menschen in Deutschland sind gesetzlich versichert. Die bekanntesten Krankenkassen sind:
- AOK (Allgemeine Ortskrankenkasse)
- TK (Techniker Krankenkasse)
- Barmer
- DAK

Vorteile der GKV:
- Familienangehörige sind oft kostenlos mitversichert
- Die Beiträge hängen vom Einkommen ab (ca. 14-16% vom Bruttolohn)
- Alle bekommen die gleiche Grundversorgung
- Sie zahlen nur 10 Euro Praxisgebühr beim Arzt

2. Die private Krankenversicherung (PKV)
Nur bestimmte Personen können sich privat versichern:
- Selbständige
- Beamte
- Angestellte mit hohem Einkommen (über ca. 66.600 Euro pro Jahr)

Wie benutzen Sie Ihre Krankenversicherung?

Beim Hausarzt:
- Wählen Sie einen Hausarzt in Ihrer Nähe
- Bringen Sie Ihre Versichertenkarte zum ersten Termin mit
- Der Hausarzt überweist Sie bei Bedarf zum Facharzt
- Sie brauchen normalerweise einen Termin

Im Notfall:
- Rufen Sie den Notarzt: 112 (europäische Notrufnummer)
- Gehen Sie zur Notaufnahme im Krankenhaus
- Am Wochenende: Ärztlicher Bereitschaftsdienst 116 117

In der Apotheke:
- Sie brauchen ein Rezept vom Arzt für die meisten Medikamente
- Viele Apotheken haben auch Notdienst nachts und am Wochenende
- Das Apotheken-Logo ist ein rotes "A"

Krankmeldung bei der Arbeit:
Wenn Sie krank sind:
1. Rufen Sie sofort Ihren Arbeitgeber an
2. Gehen Sie zum Arzt und holen Sie eine Arbeitsunfähigkeitsbescheinigung (AU)
3. Ab dem 4. Krankheitstag brauchen viele Arbeitgeber die AU
4. Schicken Sie die AU an Ihren Arbeitgeber und an Ihre Krankenkasse

Wichtige Unterschiede zu anderen Ländern:
- Sie zahlen keine hohen Kosten direkt beim Arzt
- Die Krankenkasse zahlt direkt an den Arzt
- Sie bekommen auch weiterhin Gehalt, wenn Sie krank sind (bis zu 6 Wochen)
- Vorsorgeuntersuchungen sind kostenlos
- Zahnbehandlungen sind teilweise kostenlos, Zahnersatz nur teilweise`,
    vocabulary: [
      { word: 'die Krankenversicherung', translation: 'health insurance', context: 'Die Krankenversicherung ist Pflicht' },
      { word: 'gesetzlich', translation: 'statutory, legal', context: 'die gesetzliche Krankenversicherung' },
      { word: 'die Krankenkasse', translation: 'health insurance company', context: 'Die bekanntesten Krankenkassen' },
      { word: 'der Beitrag', translation: 'contribution, premium', context: 'Die Beiträge hängen vom Einkommen ab' },
      { word: 'mitversichert', translation: 'co-insured', context: 'Familienangehörige sind kostenlos mitversichert' },
      { word: 'der Hausarzt', translation: 'general practitioner', context: 'Wählen Sie einen Hausarzt' },
      { word: 'überweisen', translation: 'to refer', context: 'Der Hausarzt überweist Sie zum Facharzt' },
      { word: 'die Notaufnahme', translation: 'emergency room', context: 'Gehen Sie zur Notaufnahme' },
      { word: 'das Rezept', translation: 'prescription', context: 'Sie brauchen ein Rezept vom Arzt' },
      { word: 'die Arbeitsunfähigkeitsbescheinigung', translation: 'sick note', context: 'holen Sie eine AU' },
      { word: 'die Vorsorgeuntersuchung', translation: 'preventive medical checkup', context: 'Vorsorgeuntersuchungen sind kostenlos' },
    ],
    comprehensionQuestions: [
      {
        question: 'Welche Notrufnummer rufen Sie in einem medizinischen Notfall?',
        options: ['110', '112', '116 117', '115'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Rufen Sie den Notarzt: 112"',
      },
      {
        question: 'Wie viel Prozent vom Bruttolohn zahlen Sie für die GKV?',
        options: ['5-7%', '10-12%', '14-16%', '20-25%'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "ca. 14-16% vom Bruttolohn"',
      },
      {
        question: 'Ab welchem Krankheitstag brauchen viele Arbeitgeber die Arbeitsunfähigkeitsbescheinigung?',
        options: ['Ab dem 1. Tag', 'Ab dem 2. Tag', 'Ab dem 3. Tag', 'Ab dem 4. Tag'],
        correctAnswer: 3,
        explanation: 'Der Text sagt: "Ab dem 4. Krankheitstag brauchen viele Arbeitgeber die AU"',
      },
      {
        question: 'Was ist bei Vorsorgeuntersuchungen in Deutschland besonders?',
        options: ['Sie sind sehr teuer', 'Sie sind kostenlos', 'Sie sind verboten', 'Sie sind nur für Kinder'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Vorsorgeuntersuchungen sind kostenlos"',
      },
    ],
    grammarFocus: [
      'Modalverben (müssen, können, dürfen)',
      'Passiv (sind versichert, wird gezahlt)',
      'Konditionale Sätze (Wenn Sie krank sind...)',
      'Präpositionen (bei, vom, zum, zur)',
    ],
    examTips: [
      'Verstehen Sie Texte über praktische Themen des Alltags',
      'Achten Sie auf Zahlen und konkrete Informationen',
      'Lernen Sie Fachvokabular für wichtige Lebensbereiche',
      'Prüfungen testen oft das Verständnis von Systemen und Verfahren',
    ],
    practicalTips: [
      'Wählen Sie Ihre Krankenkasse sorgfältig - Leistungen können variieren',
      'Holen Sie sich die elektronische Gesundheitskarte (eGK) von Ihrer Krankenkasse',
      'Registrieren Sie sich bei Doctolib oder Jameda für Online-Terminbuchung',
      'Speichern Sie wichtige Nummern: Hausarzt, Notarzt 112, Bereitschaftsdienst 116 117',
      'Bewahren Sie alle Arztrechnungen und Belege für die Steuererklärung auf',
      'Die AU muss seit 2023 digital an die Krankenkasse übermittelt werden',
    ],
    culturalNotes: [
      'Deutsche gehen eher zum Arzt als in vielen anderen Ländern',
      'Das Solidaritätsprinzip bedeutet: Jeder zahlt nach seinen Möglichkeiten',
      'Datenschutz ist sehr wichtig - Ärzte unterliegen strenger Schweigepflicht',
      'Apotheken sind streng reguliert und nur für pharmazeutische Produkte',
      'Die Trennung zwischen Arzt und Apotheke ist gesetzlich vorgeschrieben',
    ],
    relatedMaterials: [
      'Schritte International Neu A2 - Lektion 9: Gesundheit',
      'Menschen A2 - Modul 9: Gesund leben',
      'Begegnungen A2 - Kapitel 3: Körper und Gesundheit',
      'Studio 21 A2 - Einheit 6: Gesundheit und Krankheit',
    ],
  },

  // ==================== B1 LEVEL ====================
  {
    id: 'b1-1',
    level: 'B1',
    title: 'Arbeitsvertrag und Arbeitsrecht in Deutschland',
    category: 'work',
    difficulty: 'intermediate',
    estimatedTime: 35,
    text: `Wenn Sie in Deutschland arbeiten, haben Sie viele Rechte. Das deutsche Arbeitsrecht schützt Arbeitnehmer sehr gut. Hier sind die wichtigsten Informationen:

Der Arbeitsvertrag
Jeder Arbeitnehmer hat ein Recht auf einen schriftlichen Arbeitsvertrag. Der Vertrag sollte folgende Punkte enthalten:
- Name und Anschrift von Arbeitgeber und Arbeitnehmer
- Beginn des Arbeitsverhältnisses
- Bei befristeten Verträgen: das Ende
- Arbeitsort
- Tätigkeitsbeschreibung
- Arbeitszeitregelung (z.B. 40 Stunden pro Woche)
- Gehalt (Brutto- und Nettobetrag)
- Urlaubsanspruch
- Kündigungsfristen
- Hinweis auf Tarifverträge oder Betriebsvereinbarungen

Arten von Arbeitsverträgen:
1. Unbefristeter Vertrag: Der normale Fall. Das Arbeitsverhältnis läuft bis zur Kündigung.
2. Befristeter Vertrag: Das Arbeitsverhältnis endet automatisch zu einem bestimmten Datum. Eine Befristung ohne sachlichen Grund ist nur für maximal 2 Jahre möglich.
3. Probezeit: Normalerweise die ersten 6 Monate. In dieser Zeit kann leichter gekündigt werden.

Arbeitszeit und Pausen:
- Die gesetzliche maximale Arbeitszeit beträgt 8 Stunden pro Tag (maximal 10 Stunden bei Ausgleich)
- Bei mehr als 6 Stunden Arbeit: mindestens 30 Minuten Pause
- Bei mehr als 9 Stunden Arbeit: mindestens 45 Minuten Pause
- Zwischen zwei Arbeitstagen müssen mindestens 11 Stunden Ruhezeit liegen
- Sonntags- und Feiertagsarbeit ist nur in bestimmten Branchen erlaubt

Urlaub:
- Gesetzlicher Mindesturlaub: 20 Tage bei einer 5-Tage-Woche
- Viele Arbeitgeber gewähren 25-30 Tage
- Der Urlaub muss mit dem Arbeitgeber abgestimmt werden
- Nicht genommener Urlaub verfällt normalerweise am 31. März des Folgejahres

Gehalt und Lohnabrechnung:
Ihr Arbeitgeber muss Ihnen jeden Monat eine Lohnabrechnung geben. Darauf stehen:
- Bruttogehalt: Ihr Gehalt vor Abzügen
- Abzüge: Sozialversicherung (Renten-, Kranken-, Pflege-, Arbeitslosenversicherung) und Steuern (Lohnsteuer, Solidaritätszuschlag, ggf. Kirchensteuer)
- Nettogehalt: Was Sie tatsächlich auf Ihr Konto bekommen

Die Abzüge betragen insgesamt etwa 40% des Bruttogehalts!

Kündigung:
- Sie oder Ihr Arbeitgeber können das Arbeitsverhältnis kündigen
- Es gibt gesetzliche Kündigungsfristen (mindestens 4 Wochen zum 15. oder Monatsende)
- Je länger Sie im Unternehmen sind, desto länger die Kündigungsfrist für den Arbeitgeber
- In der Probezeit: 2 Wochen Kündigungsfrist
- Eine Kündigung muss schriftlich erfolgen
- Der Arbeitgeber braucht einen Grund für die Kündigung (außer in der Probezeit)
- Es gibt besonderen Kündigungsschutz für: Schwangere, Schwerbehinderte, Betriebsräte

Besondere Rechte:
- Elternzeit: Bis zu 3 Jahre pro Kind mit Kündigungsschutz
- Elterngeld: Finanzielle Unterstützung in der Elternzeit (67% des Nettogehalts)
- Krankengeld: Bei längerer Krankheit zahlt die Krankenkasse
- Arbeitslosengeld: Bei Arbeitslosigkeit Unterstützung von der Agentur für Arbeit
- Betriebsrat: In größeren Firmen vertritt er die Interessen der Arbeitnehmer

Wichtig zu wissen:
- Das Arbeitsrecht ist sehr komplex
- Bei Problemen: Wenden Sie sich an den Betriebsrat oder einen Anwalt für Arbeitsrecht
- Viele Gewerkschaften bieten kostenlose Rechtsberatung für Mitglieder
- Die Erstberatung bei einem Anwalt kostet ca. 190 Euro`,
    vocabulary: [
      { word: 'der Arbeitnehmer', translation: 'employee', context: 'schützt Arbeitnehmer sehr gut' },
      { word: 'der Arbeitgeber', translation: 'employer', context: 'Name und Anschrift von Arbeitgeber' },
      { word: 'das Arbeitsverhältnis', translation: 'employment relationship', context: 'Beginn des Arbeitsverhältnisses' },
      { word: 'befristet', translation: 'temporary, limited', context: 'Bei befristeten Verträgen' },
      { word: 'unbefristet', translation: 'permanent, unlimited', context: 'Unbefristeter Vertrag' },
      { word: 'die Kündigung', translation: 'termination, notice', context: 'gesetzliche Kündigungsfristen' },
      { word: 'die Kündigungsfrist', translation: 'notice period', context: 'mindestens 4 Wochen' },
      { word: 'der Urlaubsanspruch', translation: 'vacation entitlement', context: 'Urlaubsanspruch im Vertrag' },
      { word: 'der Abzug', translation: 'deduction', context: 'Abzüge vom Bruttogehalt' },
      { word: 'die Lohnabrechnung', translation: 'payslip', context: 'eine Lohnabrechnung geben' },
      { word: 'der Betriebsrat', translation: 'works council', context: 'Wenden Sie sich an den Betriebsrat' },
      { word: 'die Gewerkschaft', translation: 'trade union', context: 'Viele Gewerkschaften bieten Beratung' },
    ],
    comprehensionQuestions: [
      {
        question: 'Wie lange ist die maximale Befristung ohne sachlichen Grund?',
        options: ['6 Monate', '1 Jahr', '2 Jahre', '5 Jahre'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Eine Befristung ohne sachlichen Grund ist nur für maximal 2 Jahre möglich"',
      },
      {
        question: 'Wie viel Pause brauchen Sie bei 7 Stunden Arbeit?',
        options: ['Keine Pause', '15 Minuten', '30 Minuten', '45 Minuten'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Bei mehr als 6 Stunden Arbeit: mindestens 30 Minuten Pause"',
      },
      {
        question: 'Wann verfällt normalerweise der nicht genommene Urlaub?',
        options: ['Am 31. Dezember', 'Am 31. März des Folgejahres', 'Am 30. Juni', 'Er verfällt nie'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "verfällt normalerweise am 31. März des Folgejahres"',
      },
      {
        question: 'Wie viel Prozent des Bruttogehalts gehen etwa für Abzüge weg?',
        options: ['20%', '30%', '40%', '50%'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Die Abzüge betragen insgesamt etwa 40% des Bruttogehalts"',
      },
    ],
    grammarFocus: [
      'Passiv (wird geschützt, muss gegeben werden)',
      'Modalverben (sollte, muss, kann, darf)',
      'Nominalisierung (die Kündigung, die Befristung)',
      'Konjunktiv II für Ratschläge (sollte enthalten)',
    ],
    examTips: [
      'B1 Prüfung testet Verständnis von längeren, komplexeren Texten',
      'Verstehen Sie Fachtexte zu Beruf und Arbeit',
      'Achten Sie auf Details wie Zahlen, Fristen, Prozentsätze',
      'Lernen Sie Arbeitsrechtsvokabular - sehr wichtig für B1/B2',
    ],
    practicalTips: [
      'Lesen Sie Ihren Arbeitsvertrag sorgfältig durch, bevor Sie unterschreiben',
      'Fragen Sie bei unklaren Punkten nach - das ist Ihr Recht!',
      'Bewahren Sie alle wichtigen Dokumente auf (Vertrag, Lohnabrechnungen, Kündigungen)',
      'Treten Sie einer Gewerkschaft bei für Rechtsschutz und Beratung (z.B. ver.di, IG Metall)',
      'Dokumentieren Sie alle wichtigen Gespräche und Vereinbarungen schriftlich',
      'Holen Sie sich bei Problemen frühzeitig professionelle Hilfe',
    ],
    culturalNotes: [
      'Deutschland hat eines der stärksten Arbeitnehmerschutzgesetze weltweit',
      'Betriebsräte haben in Deutschland große Mitbestimmungsrechte',
      'Die Work-Life-Balance wird in Deutschland zunehmend wichtiger',
      'Überstunden werden oft mit Freizeit ausgeglichen (nicht immer bezahlt)',
      'Das Konzept der "Kurzarbeit" ermöglicht Joberhalt in Krisenzeiten',
    ],
    relatedMaterials: [
      'Begegnungen B1 - Kapitel 5: Arbeitswelt und Arbeitsrecht',
      'Schritte International Neu B1 - Lektion 8: Beruf und Arbeit',
      'Menschen B1 - Modul 7: Rechte und Pflichten',
      'Studio 21 B1 - Einheit 10: Arbeitsrecht',
      'Geschäftliche Begegnungen B1+ - Arbeitsverträge',
    ],
  },
  {
    id: 'b1-2',
    level: 'B1',
    title: 'Wohnung mieten in Deutschland: Der komplette Guide',
    category: 'daily-life',
    difficulty: 'intermediate',
    estimatedTime: 40,
    text: `Eine Wohnung in Deutschland zu finden, besonders in großen Städten, kann eine große Herausforderung sein. Hier ist ein detaillierter Guide, der Ihnen hilft:

Die Wohnungssuche:

Wo suchen Sie?
- Online-Portale: ImmobilienScout24, Immowelt, WG-gesucht (für WGs)
- Zeitungen: Lokale Anzeigen am Wochenende
- Aushänge: An schwarzen Brettern in Supermärkten, Unis
- Makler: Können helfen, kosten aber Provision (bis zu 2 Monatskaltmieten + MwSt.)
- Wohnungsbaugesellschaften: Direkt bei großen Vermietern bewerben
- Vitamin B: Freunde und Bekannte fragen!

Die Bewerbung für eine Wohnung:
In beliebten Städten müssen Sie sich auf Wohnungen bewerben! Bereiten Sie vor:

Bewerbungsmappe für Wohnungen:
1. Anschreiben: Stellen Sie sich vor, erzählen Sie über sich
2. Mieterselbstauskunft: Formular mit persönlichen Daten
3. Einkommensnachweis: Letzten 3 Gehaltsabrechnungen
4. SCHUFA-Auskunft: Zeigt Ihre Kreditwürdigkeit (kostenlos einmal pro Jahr)
5. Arbeitgeberbestätigung: Ihr Arbeitgeber bestätigt Ihr Arbeitsverhältnis
6. Mietschuldenfreiheitsbescheinigung: Vom letzten Vermieter
7. Kopie Ihres Personalausweises

Tipp: Seien Sie schnell! In München oder Berlin gibt es oft 50-100 Bewerber pro Wohnung.

Der Mietvertrag:

Wichtige Begriffe:
- Kaltmiete: Die Grundmiete ohne Nebenkosten
- Warmmiete: Kaltmiete + Nebenkosten
- Nebenkosten/Betriebskosten: Heizung, Wasser, Müllabfuhr, Hausmeister, etc.
- Kaution: Sicherheit für den Vermieter (max. 3 Monatskaltmieten)

Was muss im Mietvertrag stehen?
- Namen von Vermieter und Mieter
- Genaue Wohnungsbezeichnung (Adresse, Stockwerk, Zimmerzahl)
- Mietbeginn
- Höhe der Miete (Kalt und Nebenkostenpauschale)
- Höhe der Kaution
- Kündigungsfristen
- Schönheitsreparaturen (Renovierung)
- Hausordnung

Arten von Mietverträgen:
- Unbefristeter Mietvertrag: Der Normalfall. Läuft bis zur Kündigung.
- Befristeter Mietvertrag (Zeitmietvertrag): Nur unter bestimmten Voraussetzungen erlaubt!
- Staffelmietvertrag: Die Miete steigt in festgelegten Zeitabständen
- Indexmietvertrag: Die Miete ist an den Verbraucherpreisindex gekoppelt

Die Wohnungsübergabe:

Beim Einzug:
- Machen Sie ein detailliertes Übergabeprotokoll
- Fotografieren Sie alle Mängel
- Notieren Sie alle Zählerstände (Strom, Wasser, Gas)
- Prüfen Sie, ob alle Schlüssel vorhanden sind
- Testen Sie alle Geräte und Installationen

Beim Auszug:
- Kündigen Sie rechtzeitig (normalerweise 3 Monate vorher)
- Organisieren Sie einen Nachmieter (hilft oft)
- Renovieren Sie, wenn im Vertrag vereinbart
- Übergeben Sie die Wohnung besenrein
- Nehmen Sie wieder ein Übergabeprotokoll auf

Ihre Rechte als Mieter:

Mieterhöhung:
- Innerhalb von 3 Jahren maximal 20% (in manchen Städten 15%)
- Die Miete darf nicht über die ortsübliche Vergleichsmiete steigen
- Mietpreisbremse: In vielen Städten darf die Miete bei Neuvermietung max. 10% über der Vergleichsmiete liegen

Mängel und Reparaturen:
- Melden Sie Mängel sofort schriftlich
- Bei schweren Mängeln können Sie die Miete mindern
- Kleinreparaturen (bis ca. 100 Euro) müssen oft Sie selbst zahlen
- Große Reparaturen zahlt der Vermieter

Modernisierung:
- Der Vermieter darf die Wohnung modernisieren
- Sie müssen es normalerweise dulden
- Die Miete kann danach um 8% der Modernisierungskosten steigen

Kündigung:
- Ihre Kündigungsfrist: normalerweise 3 Monate zum Monatsende
- Kündigungsfrist des Vermieters: hängt von der Mietdauer ab (3-9 Monate)
- Der Vermieter braucht einen wichtigen Grund für die Kündigung
- Eigenbedarfskündigung: Der Vermieter oder nahe Angehörige wollen einziehen

Nebenkosten verstehen:

Umlagefähige Nebenkosten:
- Heizung und Warmwasser (größter Posten!)
- Kaltwasser und Abwasser
- Müllabfuhr
- Treppenhaus-Reinigung
- Hausmeister
- Gartenpflege
- Gebäudeversicherung
- Grundsteuer

Nicht umlagefähig:
- Verwaltungskosten
- Reparaturen
- Instandhaltung

Die Nebenkostenabrechnung:
- Einmal pro Jahr vom Vermieter
- Muss spätestens 12 Monate nach Ende des Abrechnungszeitraums kommen
- Prüfen Sie die Abrechnung genau!
- Widerspruch innerhalb von 12 Monaten möglich

Praktische Tipps:

1. Budgetplanung:
Ihre Warmmiete sollte maximal 30-40% Ihres Nettoeinkommens betragen.

2. Strom- und Gasanbieter:
- Diese müssen Sie selbst wählen und anmelden
- Vergleichen Sie Anbieter (Check24, Verivox)
- Kündigen Sie rechtzeitig beim Umzug

3. GEZ (Rundfunkbeitrag):
- Pflicht für jeden Haushalt: 18,36 Euro pro Monat
- Melden Sie sich nach dem Einzug an

4. Internet und Telefon:
- Vergleichen Sie Anbieter (Telekom, Vodafone, O2, 1&1)
- Beachten Sie Mindestvertragslaufzeiten (oft 24 Monate)
- Informieren Sie sich über Verfügbarkeit (Glasfaser, Kabel, DSL)

5. Hausratversicherung:
- Schützt Ihr Eigentum bei Diebstahl, Feuer, Wasser
- Kostet ca. 5-15 Euro pro Monat
- Sehr empfehlenswert!

Konflikte vermeiden:

Gute Nachbarschaft:
- Halten Sie sich an die Hausordnung
- Beachten Sie die Ruhezeiten (normalerweise 22-6 Uhr und Mittagsruhe)
- Informieren Sie Nachbarn bei Feiern
- Seien Sie höflich und hilfsbereit

Häufige Streitpunkte:
- Lärm (besonders in Mehrfamilienhäusern)
- Haustiere (oft eingeschränkt erlaubt)
- Rauchen (auf dem Balkon meist erlaubt)
- Grillen (oft eingeschränkt)

Bei Problemen:
- Sprechen Sie zuerst mit dem Vermieter
- Dokumentieren Sie alles schriftlich
- Holen Sie sich Hilfe beim Mieterschutzbund
- Als letzter Schritt: Anwalt oder Gericht`,
    vocabulary: [
      { word: 'die Herausforderung', translation: 'challenge', context: 'kann eine große Herausforderung sein' },
      { word: 'der Makler', translation: 'real estate agent', context: 'Makler können helfen' },
      { word: 'die Provision', translation: 'commission', context: 'kosten aber Provision' },
      { word: 'die Kreditwürdigkeit', translation: 'creditworthiness', context: 'Zeigt Ihre Kreditwürdigkeit' },
      { word: 'die Kaution', translation: 'deposit', context: 'max. 3 Monatskaltmieten' },
      { word: 'die Schönheitsreparatur', translation: 'cosmetic repairs', context: 'Schönheitsreparaturen im Vertrag' },
      { word: 'besenrein', translation: 'broom-clean', context: 'Übergeben Sie die Wohnung besenrein' },
      { word: 'der Mangel', translation: 'defect, fault', context: 'Melden Sie Mängel sofort' },
      { word: 'die Miete mindern', translation: 'to reduce rent', context: 'können Sie die Miete mindern' },
      { word: 'dulden', translation: 'to tolerate', context: 'Sie müssen es normalerweise dulden' },
      { word: 'umlagefähig', translation: 'apportionable', context: 'Umlagefähige Nebenkosten' },
      { word: 'die Instandhaltung', translation: 'maintenance', context: 'Instandhaltung nicht umlagefähig' },
    ],
    comprehensionQuestions: [
      {
        question: 'Wie hoch kann die Maklerprovision maximal sein?',
        options: ['1 Monatskaltmiete', '2 Monatskaltmieten + MwSt.', '3 Monatskaltmieten', '1,5 Monatskaltmieten'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "kosten aber Provision (bis zu 2 Monatskaltmieten + MwSt.)"',
      },
      {
        question: 'Wie hoch kann die Kaution maximal sein?',
        options: ['1 Monatskaltmiete', '2 Monatskaltmieten', '3 Monatskaltmieten', '4 Monatskaltmieten'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Kaution: Sicherheit für den Vermieter (max. 3 Monatskaltmieten)"',
      },
      {
        question: 'Um wie viel Prozent darf die Miete innerhalb von 3 Jahren maximal steigen?',
        options: ['10%', '15%', '20%', '25%'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Innerhalb von 3 Jahren maximal 20% (in manchen Städten 15%)"',
      },
      {
        question: 'Wie viel kostet der GEZ-Rundfunkbeitrag pro Monat?',
        options: ['9,18 Euro', '12,50 Euro', '18,36 Euro', '20,00 Euro'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Pflicht für jeden Haushalt: 18,36 Euro pro Monat"',
      },
    ],
    grammarFocus: [
      'Modalverben (müssen, können, dürfen, sollen)',
      'Passiv (wird gezahlt, ist gekoppelt)',
      'Konjunktiv II für Ratschläge (sollte betragen)',
      'Relativsätze (der Vermieter, der kündigt)',
    ],
    examTips: [
      'B1 Prüfung testet Verständnis komplexer Alltagstexte',
      'Achten Sie auf Details in praktischen Texten',
      'Verstehen Sie rechtliche und administrative Informationen',
      'Lernen Sie Wohnungs- und Mietvokabular intensiv',
    ],
    practicalTips: [
      'Starten Sie die Wohnungssuche früh - besonders in Großstädten!',
      'Erstellen Sie eine professionelle Bewerbungsmappe digital (PDF)',
      'Seien Sie bei Besichtigungen pünktlich und machen Sie einen guten Eindruck',
      'Mitgliedschaft beim Mieterschutzbund kostet ca. 70-90 Euro/Jahr - lohnt sich!',
      'Fotografieren Sie die Wohnung bei Ein- und Auszug als Beweis',
      'Behalten Sie immer Kopien aller wichtigen Dokumente',
      'Nutzen Sie Apps wie "Wohnungsbot" für automatisierte Bewerbungen',
    ],
    culturalNotes: [
      'Der Wohnungsmarkt in Deutschland ist sehr angespannt, besonders in München, Hamburg, Berlin, Frankfurt',
      'Deutsche wohnen oft zur Miete - Wohneigentum ist weniger verbreitet als in anderen Ländern',
      'Ruhezeiten werden sehr ernst genommen - Sonntagsruhe ist heilig!',
      'Das deutsche Mietrecht ist sehr mieterfreundlich im internationalen Vergleich',
      'WG (Wohngemeinschaft) ist bei jungen Menschen sehr beliebt',
    ],
    relatedMaterials: [
      'Schritte International Neu B1 - Lektion 5: Wohnen',
      'Menschen B1 - Modul 8: Wohnungssuche',
      'Begegnungen B1 - Kapitel 2: Wohnen in Deutschland',
      'Studio 21 B1 - Einheit 4: Wohnung und Mietvertrag',
    ],
  },

  // ==================== B2 LEVEL ====================
  {
    id: 'b2-1',
    level: 'B2',
    title: 'Das deutsche Steuersystem: Ein umfassender Überblick',
    category: 'work',
    difficulty: 'advanced',
    estimatedTime: 45,
    text: `Das deutsche Steuersystem gilt als eines der kompliziertesten der Welt. Doch als Arbeitnehmer oder Selbständiger in Deutschland müssen Sie die Grundlagen verstehen. Dieser Artikel gibt Ihnen einen umfassenden Überblick.

Die wichtigsten Steuerarten:

1. Einkommensteuer (Lohnsteuer für Arbeitnehmer)
Die Einkommensteuer wird auf Ihr Einkommen erhoben. Für Arbeitnehmer wird sie automatisch vom Gehalt abgezogen (Lohnsteuer). Der Steuersatz ist progressiv und steigt mit dem Einkommen:
- Grundfreibetrag 2026: 11.784 Euro (steuerfrei)
- Ab 11.785 Euro: 14% Eingangssteuersatz
- Ab 65.000 Euro: ca. 42% (Spitzensteuersatz)
- Ab 277.826 Euro: 45% (Reichensteuer)

Wichtig: Dies sind nur die Grenzsteuersätze! Ihr durchschnittlicher Steuersatz ist niedriger.

Steuerklassen:
Die Steuerklasse bestimmt die Höhe der monatlichen Lohnsteuer:
- Klasse I: Ledige, Geschiedene, Verwitwete (nach 1 Jahr)
- Klasse II: Alleinerziehende mit Kinderfreibetrag
- Klasse III: Verheiratete (wenn Partner Klasse V hat oder nicht arbeitet)
- Klasse IV: Verheiratete (beide verdienen ähnlich viel)
- Klasse V: Verheiratete (Partner hat Klasse III)
- Klasse VI: Bei mehreren Jobs

Verheiratete können zwischen III/V und IV/IV wählen. Mit dem Faktorverfahren (IV mit Faktor) wird die Steuer noch genauer berechnet.

2. Solidaritätszuschlag
5,5% der Einkommensteuer - aber: Seit 2021 zahlen ihn nur noch Gutverdiener (Singles ab ca. 73.000 Euro, Verheiratete ab ca. 151.000 Euro Jahreseinkommen).

3. Kirchensteuer
8-9% der Einkommensteuer (je nach Bundesland), wenn Sie Mitglied einer Kirche sind. Sie können aus der Kirche austreten und sparen diese Steuer.

4. Umsatzsteuer (Mehrwertsteuer)
Nicht direkt für Arbeitnehmer relevant, aber wichtig zu wissen:
- Normalsatz: 19%
- Ermäßigter Satz: 7% (Lebensmittel, Bücher, ÖPNV)

5. Gewerbesteuer
Für Selbständige und Unternehmen. Als Arbeitnehmer nicht relevant.

Sozialversicherungsbeiträge:
Zusätzlich zur Steuer zahlen Sie Sozialversicherungsbeiträge (etwa 20% vom Bruttogehalt):
- Rentenversicherung: 9,3%
- Krankenversicherung: ca. 7,3% + Zusatzbeitrag
- Pflegeversicherung: 1,7% (Kinderlose ab 23: 2,0%)
- Arbeitslosenversicherung: 1,3%

Ihr Arbeitgeber zahlt etwa den gleichen Betrag zusätzlich.

Die Steuererklärung (Einkommensteuererklärung):

Wer muss eine Steuererklärung machen?
Verpflichtet sind:
- Selbständige und Freiberufler
- Personen mit mehreren Jobs
- Ehepaare mit Steuerklassen III und V
- Arbeitnehmer mit hohem Nebeneinkommen (über 410 Euro jährlich)
- Empfänger von Lohnersatzleistungen über 410 Euro (Arbeitslosengeld, Elterngeld, Kurzarbeitergeld)

Freiwillig können alle eine Steuererklärung machen - und das lohnt sich oft! Im Durchschnitt bekommen Arbeitnehmer über 1.000 Euro zurück.

Was können Sie absetzen? (Werbungskosten und Sonderausgaben)

Werbungskosten (berufliche Ausgaben):
- Arbeitszimmer: Unter bestimmten Voraussetzungen voll absetzbar
- Fahrtkosten: 0,38 Euro pro Kilometer (einfache Strecke) zur Arbeit (ab 21. km: 0,38 Euro)
- Arbeitsmittel: Computer, Fachliteratur, Werkzeug
- Fortbildungskosten: Kurse, Seminare, Fachmessen
- Bewerbungskosten: Fotos, Porto, Fahrtkosten
- Berufskleidung: Nur echte Berufskleidung (Arztkittel, Uniform)
- Doppelte Haushaltsführung: Bei Arbeit in anderer Stadt

Pauschbetrag: Ohne Nachweis bekommen Sie 1.230 Euro Werbungskostenpauschale. Nur wenn Ihre Kosten höher sind, lohnt sich die detaillierte Angabe.

Sonderausgaben:
- Kranken- und Pflegeversicherungsbeiträge (voll absetzbar)
- Altersvorsorge: Beiträge zur gesetzlichen Rentenversicherung, Riester-Rente, Rürup-Rente
- Spenden: An gemeinnützige Organisationen
- Kinderbetreuungskosten: 2/3 der Kosten, max. 4.000 Euro pro Kind
- Schulgeld: Bei Privatschulen 30% der Kosten, max. 5.000 Euro
- Kirchensteuer

Außergewöhnliche Belastungen:
- Krankheitskosten: Über der zumutbaren Eigenbelastung
- Pflegekosten für Angehörige
- Beerdigungskosten
- Scheidungskosten (teilweise)
- Behinderungsbedingter Mehraufwand: Behinderten-Pauschbetrag

Haushaltsnahe Dienstleistungen:
- Handwerkerleistungen: 20% der Kosten, max. 1.200 Euro Steuerermäßigung
- Haushaltshilfe, Gartenpflege: 20% der Kosten, max. 4.000 Euro Steuerermäßigung
- Mini-Job im Haushalt: Pauschale Steuerermäßigung

Steuerliche Förderung von Familien:

Kindergeld oder Kinderfreibetrag:
- Kindergeld 2026: 250 Euro pro Kind pro Monat
- Alternativ: Kinderfreibetrag von 6.612 Euro pro Jahr (3.306 Euro pro Elternteil)
Das Finanzamt prüft automatisch, was günstiger ist (Günstigerprüfung).

Elterngeld:
- 67% des Nettoeinkommens, mindestens 300, maximal 1.800 Euro
- 12-14 Monate (mit Partnermonaten)
- Steuerfrei, aber unterliegt dem Progressionsvorbehalt

Baukindergeld:
- Wurde 2023 eingestellt - aber prüfen Sie aktuelle Programme!

Wie machen Sie die Steuererklärung?

Drei Möglichkeiten:
1. ELSTER (Elektronische Steuererklärung): Kostenlos, aber komplex
2. Steuersoftware: WISO Steuer, SteuerSparErklärung, Taxfix (ca. 30-40 Euro)
3. Steuerberater: Für komplexe Fälle (kostet mehrere hundert Euro)

Fristen:
- Ohne Steuerberater: 31. Juli des Folgejahres
- Mit Steuerberater: 28. Februar des übernächsten Jahres
- Bei freiwilliger Abgabe: 4 Jahre rückwirkend möglich

Der Steuerbescheid:

Nach 1-3 Monaten bekommen Sie den Steuerbescheid. Prüfen Sie ihn genau!
- Einspruch: Innerhalb von 1 Monat möglich
- Korrektur: Fehler können korrigiert werden
- Nachzahlung: Innerhalb von 1 Monat fällig
- Erstattung: Kommt normalerweise innerhalb weniger Wochen

Besondere Situationen:

Internationale Arbeitnehmer:
- Beschränkte Steuerpflicht: Nur in Deutschland erzielte Einkünfte
- Unbeschränkte Steuerpflicht: Weltweites Einkommen (wenn Wohnsitz in Deutschland)
- Doppelbesteuerungsabkommen: Verhindern doppelte Besteuerung
- Für ausländische Einkünfte: Anlage AUS in der Steuererklärung

Selbständige und Freiberufler:
- Einnahmen-Überschuss-Rechnung (EÜR): Für kleine Selbständige
- Bilanzierung: Bei größeren Unternehmen
- Vorauszahlungen: Vierteljährlich ans Finanzamt
- Umsatzsteuervoranmeldung: Monatlich oder vierteljährlich
- Gewerbesteuer: Bei Gewerbetreibenden (nicht bei Freiberuflern)

Investitionen und Kapitalerträge:
- Abgeltungsteuer: 25% + Soli auf Kapitalerträge
- Sparerpauschbetrag: 1.000 Euro steuerfrei (2.000 Euro bei Verheirateten)
- Freistellungsauftrag: Bei der Bank einreichen!
- Kryptowährungen: Gewinne nach 1 Jahr Haltedauer steuerfrei

Tipps zur Steueroptimierung (legal!):

1. Riester-Rente: Staatlich geförderte Altersvorsorge
2. Betriebliche Altersvorsorge: Steuer- und sozialabgabenfrei (bis zu Grenzen)
3. Vermögenswirksame Leistungen: Arbeitgeberzuschuss, staatliche Förderung
4. Arbeitszimmer: Wenn Sie hauptsächlich von zu Hause arbeiten
5. Dienstwagen: 1%-Regelung vs. Fahrtenbuch
6. Fahrtkostenpauschale: Bilden Sie Fahrgemeinschaften oder nutzen Sie ÖPNV
7. Haushaltsnahe Dienstleistungen: Lassen Sie Rechnungen mit Überweisung bezahlen
8. Spenden: Ende des Jahres noch Spenden tätigen

Häufige Fehler vermeiden:

1. Fristen verpassen: Verspätungszuschlag bis zu 25.000 Euro möglich
2. Belege nicht aufbewahren: 6 Jahre aufheben!
3. Pauschbeträge nicht nutzen: Auch ohne Belege gibt's Geld zurück
4. Pendlerpauschale vergessen: Auch bei ÖPNV-Nutzung!
5. Kontoauszüge wegwerfen: Finanzamt kann Nachweis verlangen
6. Schwarzarbeit: Hohe Strafen und Nachzahlungen drohen!

Hilfe und Ressourcen:

Kostenlose Beratung:
- Lohnsteuerhilfevereine: Für Arbeitnehmer (Mitgliedsbeitrag ca. 100-400 Euro/Jahr)
- Finanzamt: Telefonische Auskunft
- Online-Rechner: Brutto-Netto-Rechner, Steuerrechner

Kostenpflichtige Beratung:
- Steuerberater: Für komplexe Fälle und Selbständige
- Rechtsanwalt für Steuerrecht: Bei Streitigkeiten

Online-Ressourcen:
- ELSTER: www.elster.de
- Bundeszentralamt für Steuern: www.bzst.de
- Bundesfinanzministerium: www.bundesfinanzministerium.de

Fazit:
Das deutsche Steuersystem ist komplex, aber mit Grundwissen können Sie viel Geld sparen. Eine Steuererklärung lohnt sich fast immer für Arbeitnehmer. Nutzen Sie alle legalen Möglichkeiten zur Steueroptimierung, und scheuen Sie sich nicht, professionelle Hilfe in Anspruch zu nehmen, wenn es kompliziert wird.`,
    vocabulary: [
      { word: 'progressiv', translation: 'progressive', context: 'Der Steuersatz ist progressiv' },
      { word: 'der Grundfreibetrag', translation: 'basic tax-free allowance', context: 'Grundfreibetrag 2026: 11.784 Euro' },
      { word: 'der Grenzsteuersatz', translation: 'marginal tax rate', context: 'Dies sind nur die Grenzsteuersätze' },
      { word: 'absetzen', translation: 'to deduct (tax)', context: 'Was können Sie absetzen?' },
      { word: 'die Werbungskosten', translation: 'tax-deductible expenses', context: 'Werbungskosten und Sonderausgaben' },
      { word: 'die Sonderausgaben', translation: 'special expenses', context: 'Sonderausgaben absetzen' },
      { word: 'die Pauschale', translation: 'flat rate, lump sum', context: 'Werbungskostenpauschale' },
      { word: 'die Erstattung', translation: 'refund', context: 'Erstattung kommt normalerweise' },
      { word: 'die Nachzahlung', translation: 'additional payment', context: 'Nachzahlung innerhalb von 1 Monat' },
      { word: 'der Steuerbescheid', translation: 'tax assessment', context: 'Sie bekommen den Steuerbescheid' },
      { word: 'der Einspruch', translation: 'objection, appeal', context: 'Einspruch innerhalb von 1 Monat' },
      { word: 'die Doppelbesteuerung', translation: 'double taxation', context: 'Doppelbesteuerungsabkommen' },
    ],
    comprehensionQuestions: [
      {
        question: 'Wie hoch ist der Grundfreibetrag 2026?',
        options: ['9.984 Euro', '10.908 Euro', '11.784 Euro', '12.500 Euro'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Grundfreibetrag 2026: 11.784 Euro (steuerfrei)"',
      },
      {
        question: 'Wie viel beträgt die durchschnittliche Steuererstattung für Arbeitnehmer?',
        options: ['500 Euro', 'über 1.000 Euro', '2.000 Euro', '3.000 Euro'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Im Durchschnitt bekommen Arbeitnehmer über 1.000 Euro zurück"',
      },
      {
        question: 'Wie hoch ist die Pendlerpauschale ab dem 21. Kilometer?',
        options: ['0,30 Euro', '0,35 Euro', '0,38 Euro', '0,42 Euro'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "0,38 Euro pro Kilometer (einfache Strecke) zur Arbeit (ab 21. km: 0,38 Euro)"',
      },
      {
        question: 'Wie lange kann man rückwirkend eine freiwillige Steuererklärung abgeben?',
        options: ['1 Jahr', '2 Jahre', '3 Jahre', '4 Jahre'],
        correctAnswer: 3,
        explanation: 'Der Text sagt: "Bei freiwilliger Abgabe: 4 Jahre rückwirkend möglich"',
      },
    ],
    grammarFocus: [
      'Passiv (wird erhoben, wird abgezogen)',
      'Nominalisierung (die Besteuerung, die Erstattung)',
      'Konjunktiv II für Möglichkeiten (könnte sparen)',
      'Komplexe Satzstrukturen mit Nebensätzen',
    ],
    examTips: [
      'B2 Prüfung testet Verständnis komplexer Fachtexte',
      'Verstehen Sie Texte mit spezifischem Fachvokabular',
      'Achten Sie auf Details und Zahlenangaben',
      'Prüfungen testen oft gesellschaftsrelevante Themen wie Steuern',
    ],
    practicalTips: [
      'Nutzen Sie Steuersoftware wie WISO oder Taxfix - spart Zeit und Geld',
      'Treten Sie einem Lohnsteuerhilfeverein bei - günstiger als Steuerberater',
      'Sammeln Sie alle Belege in einem Ordner das ganze Jahr über',
      'Nutzen Sie die 1.230 Euro Werbungskostenpauschale - auch ohne Belege!',
      'Reichen Sie Freistellungsaufträge bei allen Banken ein',
      'Planen Sie Ausgaben strategisch (z.B. Handwerker am Jahresende)',
    ],
    culturalNotes: [
      'Das deutsche Steuersystem gilt als eines der komplexesten weltweit',
      'Steuerhinterziehung wird in Deutschland sehr ernst genommen und hart bestraft',
      'Die Steuerehrlichkeit ist in Deutschland hoch im internationalen Vergleich',
      'Viele Deutsche nutzen Steuerberater oder Lohnsteuerhilfevereine',
    ],
    relatedMaterials: [
      'Begegnungen B2 - Kapitel 6: Wirtschaft und Finanzen',
      'Geschäftliche Begegnungen B2 - Steuern und Abgaben',
      'DaF Kompakt Neu B2 - Arbeitswelt',
    ],
  },
  {
    id: 'b2-2',
    level: 'B2',
    title: 'Interkulturelle Kompetenz im deutschen Arbeitsalltag',
    category: 'business',
    difficulty: 'advanced',
    estimatedTime: 40,
    text: `Die erfolgreiche Integration in den deutschen Arbeitsalltag erfordert nicht nur Sprachkenntnisse, sondern auch ein tiefes Verständnis der deutschen Unternehmenskultur und Arbeitsweise. Dieser Artikel beleuchtet die wichtigsten Aspekte interkultureller Kompetenz im beruflichen Kontext.

Deutsche Unternehmenskultur: Kernmerkmale

1. Pünktlichkeit als oberste Maxime
In der deutschen Geschäftswelt gilt Pünktlichkeit als Ausdruck von Professionalität und Respekt. „Fünf Minuten vor der Zeit ist des Deutschen Pünktlichkeit" – dieses Sprichwort verdeutlicht die Ernsthaftigkeit, mit der Zeitmanagement betrachtet wird.

Praktische Implikationen:
- Erscheinen Sie mindestens 5 Minuten vor Meetings
- Bei Verspätung: Informieren Sie sofort und geben Sie eine realistische Ankunftszeit an
- Halten Sie Deadlines ein oder kommunizieren Sie Verzögerungen frühzeitig
- Planen Sie Pufferzeiten ein, besonders beim Pendeln

2. Direkte Kommunikation und Sachlichkeit
Deutsche Kommunikation im Beruf ist überwiegend direkt, sachlich und faktenorientiert. Dies kann für Menschen aus Kulturen mit indirekter Kommunikation zunächst unhöflich wirken, ist aber Standard und wird nicht als unhöflich empfunden.

Charakteristika:
- Kritik wird oft direkt, aber konstruktiv geäußert
- „Nein" bedeutet tatsächlich „Nein" (kein diplomatisches „Vielleicht")
- Sachargumente zählen mehr als hierarchische Position
- Emotionale Zurückhaltung in professionellen Kontexten
- Trennung zwischen beruflichen und privaten Beziehungen

Tipps für erfolgreiche Kommunikation:
- Seien Sie präzise und kommen Sie schnell zum Punkt
- Bereiten Sie Fakten und Daten vor
- Nehmen Sie direkte Kritik nicht persönlich
- Fragen Sie nach, wenn etwas unklar ist – das wird geschätzt
- Vermeiden Sie übertriebene Höflichkeitsfloskeln in E-Mails

3. Hierarchie vs. Konsenskultur
Deutsche Unternehmen weisen eine interessante Mischung auf: Einerseits gibt es klare Hierarchien, andererseits wird Wert auf Konsens gelegt.

Hierarchiemerkmale:
- Klare Organisationsstrukturen und Verantwortungsbereiche
- Formelle Anrede mit „Sie" und Nachnamen (bis zum „Du"-Angebot)
- Respekt vor Expertise und Fachkompetenz
- Entscheidungsbefugnis liegt oft bei höheren Ebenen

Konsenskultur:
- Wichtige Entscheidungen werden oft in Teams diskutiert
- Mitarbeiter werden um Input gebeten
- Entscheidungsprozesse können länger dauern
- Einmal getroffene Entscheidungen werden konsequent umgesetzt

4. Gründlichkeit und Qualitätsanspruch
„Deutsche Gründlichkeit" ist weltweit bekannt und im Arbeitsalltag deutlich spürbar:
- Detaillierte Planung und Vorbereitung
- Hohe Qualitätsstandards
- Dokumentation und Prozesse
- Risikovermeidung und Absicherung
- Präferenz für bewährte Lösungen gegenüber schnellen Experimenten

Meeting-Kultur in Deutschland

Vor dem Meeting:
- Agenda wird im Voraus versendet
- Teilnehmer bereiten sich gründlich vor
- Relevante Dokumente werden vorher verschickt
- Pünktlicher Beginn wird erwartet

Während des Meetings:
- Strukturierte Durchführung gemäß Agenda
- Diskussionen sind faktenbasiert
- Entscheidungen werden dokumentiert
- Protokolle werden erstellt (oft sehr detailliert)
- Meetings enden pünktlich

Nach dem Meeting:
- Protokoll wird zeitnah versendet
- Verantwortlichkeiten sind klar definiert
- Follow-up zu vereinbarten Aktionspunkten
- Deadlines werden eingehalten

Typische Meeting-Phrasen:
- „Ich möchte einen Punkt zur Diskussion stellen"
- „Können wir das vertagen und in der nächsten Sitzung besprechen?"
- „Wer übernimmt diese Aufgabe?"
- „Bis wann können Sie das erledigen?"
- „Gibt es noch offene Fragen?"

E-Mail-Etikette in deutschen Unternehmen

Aufbau einer professionellen E-Mail:
1. Betreffzeile: Präzise und aussagekräftig
2. Anrede: „Sehr geehrte/r Frau/Herr [Nachname]" (formell) oder „Guten Tag, Frau/Herr [Nachname]" (etwas weniger formell)
3. Einleitung: Kurze Kontextualisierung
4. Hauptteil: Strukturiert, mit Absätzen, ggf. Aufzählungen
5. Schluss: Klare Handlungsaufforderung oder Zusammenfassung
6. Grußformel: „Mit freundlichen Grüßen" (Standard) oder „Beste Grüße" (lockerer)
7. Signatur: Vollständiger Name, Position, Kontaktdaten

Best Practices:
- Antworten Sie innerhalb von 24 Stunden (zumindest kurze Empfangsbestätigung)
- Nutzen Sie „CC" sparsam und bewusst
- Verwenden Sie aussagekräftige Betreffzeilen
- Vermeiden Sie „Reply All", wenn nicht notwendig
- Prüfen Sie Rechtschreibung und Grammatik sorgfältig
- Halten Sie E-Mails kurz und prägnant

Work-Life-Balance und Arbeitszeitgestaltung

Deutsche Arbeitskultur hat sich in den letzten Jahren stark gewandelt:

Traditionelle Aspekte:
- Klare Trennung zwischen Arbeitszeit und Freizeit
- Überstunden werden zunehmend kritisch gesehen
- Urlaub wird tatsächlich genommen (alle Tage!)
- Krankheit bedeutet Krankheit (nicht „trotzdem arbeiten")

Moderne Entwicklungen:
- Flexible Arbeitszeiten (Gleitzeit) in vielen Unternehmen
- Homeoffice/Remote Work wird normaler
- Work-Life-Balance wird wichtiger
- Elternzeit wird auch von Vätern genommen

Wichtige Regeln:
- Nach Feierabend keine beruflichen E-Mails erwarten
- Urlaub wird respektiert (keine Anrufe!)
- Wochenende ist heilig
- Krankschreibung wird akzeptiert (keine Beweise nötig)

Networking und Beziehungsaufbau

Berufliche vs. private Beziehungen:
Deutsche trennen oft stark zwischen beruflich und privat:
- Kollegen werden selten zu privaten Anlässen eingeladen
- Distanz wird gewahrt (weniger Small Talk)
- Professionelle Beziehungen entwickeln sich langsamer
- Dafür sind Beziehungen, wenn etabliert, oft verlässlich

Networking-Tipps:
- Nutzen Sie Xing (deutsches LinkedIn) aktiv
- Besuchen Sie Branchentreffen und Fachmessen
- Engagieren Sie sich in Fachverbänden
- Mittagspausen bieten Gelegenheit für informellen Austausch
- Betriebliche Events (Weihnachtsfeier, Sommerfest) sind wichtig

Konfliktsituationen professionell meistern

Konstruktive Kritik äußern:
- Sachlich bleiben, keine emotionale Aufladung
- Konkrete Beispiele nennen
- Lösungen vorschlagen, nicht nur Probleme benennen
- Vier-Augen-Gespräch suchen, nicht vor anderen kritisieren
- Ich-Botschaften verwenden: „Ich habe beobachtet..." statt „Sie machen immer..."

Mit Kritik umgehen:
- Nicht persönlich nehmen
- Nachfragen für Verständnis
- Konstruktiv reagieren
- Verbesserungen umsetzen
- Rückmeldung zu Änderungen geben

Eskalation bei Problemen:
1. Direktes Gespräch mit beteiligter Person
2. Einbeziehung des direkten Vorgesetzten
3. HR-Abteilung kontaktieren
4. Betriebsrat einschalten (falls vorhanden)
5. Rechtliche Beratung (als letztes Mittel)

Dresscode und Erscheinungsbild

Branchenabhängig, aber generelle Trends:

Konservative Branchen (Banken, Versicherungen, Anwaltskanzleien):
- Anzug und Krawatte für Männer
- Hosenanzug oder Kostüm für Frauen
- Dezente Farben
- Gepflegtes, konservatives Erscheinungsbild

Moderne Branchen (IT, Start-ups, Kreativwirtschaft):
- Business Casual oder sogar Casual
- Mehr Individualität erlaubt
- Jeans oft akzeptabel
- Sneakers statt Business-Schuhe

Grundregeln:
- Sauber und gepflegt
- Keine aufreizende Kleidung
- Parfüm/Aftershave sparsam verwenden
- Im Zweifel: Lieber overdressed als underdressed

Interkulturelle Fettnäpfchen vermeiden

Häufige Missverständnisse:

1. Smalltalk-Themen:
Vermeiden Sie:
- Fragen nach Gehalt
- Zu persönliche Fragen (Familienplanung, Alter)
- Politik und Religion (zumindest am Anfang)
- Übertriebene Komplimente

Sichere Themen:
- Wetter (Klassiker!)
- Sport (besonders Fußball)
- Reisen und Urlaub
- Hobbys
- Aktuelle (neutrale) Ereignisse

2. Geschenke im Businesskontext:
- Kleine Aufmerksamkeiten sind okay (Schokolade, regionale Spezialitäten)
- Keine teuren Geschenke (könnte als Bestechung wirken)
- Bei Geschäftsessen: Wer einlädt, bezahlt
- Trinkgeld: 5-10% üblich

3. Körpersprache und persönlicher Raum:
- Händedruck: Fest, aber nicht zu fest
- Blickkontakt: Wichtig, zeigt Interesse und Aufrichtigkeit
- Persönlicher Raum: Ca. 1 Meter Abstand
- Umarmungen: Nur bei sehr guten Beziehungen
- Rückenklopfen: Unüblich im Businesskontext

Erfolgsstrategien für internationale Fachkräfte

1. Sprachliche Feinheiten meistern:
- Unterscheiden Sie zwischen „Sie" und „du"
- Lernen Sie Konjunktiv für höfliche Bitten: „Könnten Sie...?"
- Verstehen Sie deutsche Ironie und Sarkasmus
- Achten Sie auf Modalpartikeln (doch, mal, halt)

2. Kulturelles Lernen:
- Beobachten Sie deutsche Kollegen
- Fragen Sie bei Unsicherheiten nach
- Seien Sie offen für Feedback
- Reflektieren Sie eigene kulturelle Prägung
- Nutzen Sie interkulturelle Trainings

3. Integration in das Team:
- Nehmen Sie an sozialen Events teil
- Zeigen Sie Interesse an deutschen Traditionen
- Teilen Sie auch Ihre eigene Kultur
- Seien Sie geduldig – Vertrauen aufbauen braucht Zeit
- Demonstrieren Sie Zuverlässigkeit und Kompetenz

4. Kontinuierliche Weiterentwicklung:
- Bleiben Sie sprachlich aktiv (C1-Niveau anstreben)
- Verstehen Sie deutsche Geschäftspraktiken
- Erweitern Sie Ihr professionelles Netzwerk
- Bilden Sie sich fachlich weiter
- Holen Sie sich Mentoren

Fazit:
Interkulturelle Kompetenz im deutschen Arbeitskontext entwickelt sich über Zeit. Geduld, Beobachtungsgabe, Offenheit für Feedback und die Bereitschaft, sich anzupassen, sind Schlüssel zum Erfolg. Gleichzeitig sollten Sie Ihre eigene kulturelle Identität nicht aufgeben – Diversität wird in modernen deutschen Unternehmen zunehmend geschätzt.`,
    vocabulary: [
      { word: 'die Maxime', translation: 'maxim, principle', context: 'Pünktlichkeit als oberste Maxime' },
      { word: 'die Implikation', translation: 'implication', context: 'Praktische Implikationen' },
      { word: 'sachlich', translation: 'factual, objective', context: 'direkt, sachlich und faktenorientiert' },
      { word: 'die Zurückhaltung', translation: 'restraint, reserve', context: 'Emotionale Zurückhaltung' },
      { word: 'die Gründlichkeit', translation: 'thoroughness', context: 'Deutsche Gründlichkeit' },
      { word: 'vertagen', translation: 'to postpone, adjourn', context: 'Können wir das vertagen' },
      { word: 'die Handlungsaufforderung', translation: 'call to action', context: 'Klare Handlungsaufforderung' },
      { word: 'die Eskalation', translation: 'escalation', context: 'Eskalation bei Problemen' },
      { word: 'das Fettnäpfchen', translation: 'faux pas', context: 'Interkulturelle Fettnäpfchen vermeiden' },
      { word: 'die Prägung', translation: 'imprint, shaping', context: 'eigene kulturelle Prägung' },
    ],
    comprehensionQuestions: [
      {
        question: 'Wie sollten Sie auf direkte Kritik im deutschen Arbeitskontext reagieren?',
        options: [
          'Sie persönlich nehmen und emotional reagieren',
          'Sachlich bleiben und nicht persönlich nehmen',
          'Die Kritik ignorieren',
          'Sofort zurückkritisieren'
        ],
        correctAnswer: 1,
        explanation: 'Der Text erklärt: Deutsche Kritik ist sachlich gemeint und sollte nicht persönlich genommen werden',
      },
      {
        question: 'Was ist charakteristisch für die deutsche Meeting-Kultur?',
        options: [
          'Spontane, unstrukturierte Diskussionen',
          'Strukturierte Durchführung mit Agenda und Protokoll',
          'Meetings dauern so lange wie nötig',
          'Vorbereitung ist unwichtig'
        ],
        correctAnswer: 1,
        explanation: 'Der Text beschreibt: "Strukturierte Durchführung gemäß Agenda" und "Protokolle werden erstellt"',
      },
      {
        question: 'Wie wird Work-Life-Balance in Deutschland betrachtet?',
        options: [
          'Überstunden sind die Norm',
          'Urlaub wird oft nicht genommen',
          'Klare Trennung zwischen Arbeit und Freizeit wird geschätzt',
          'Nach Feierabend wird erwartet, dass man erreichbar ist'
        ],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Klare Trennung zwischen Arbeitszeit und Freizeit" und "Nach Feierabend keine beruflichen E-Mails erwarten"',
      },
      {
        question: 'Was sollten Sie beim Networking in Deutschland beachten?',
        options: [
          'Sofort über private Dinge sprechen',
          'Deutsche trennen oft stark zwischen beruflich und privat',
          'Alle Kollegen zu privaten Anlässen einladen',
          'Beziehungen entwickeln sich sehr schnell'
        ],
        correctAnswer: 1,
        explanation: 'Der Text erklärt: "Deutsche trennen oft stark zwischen beruflich und privat"',
      },
    ],
    grammarFocus: [
      'Nominalisierung (die Pünktlichkeit, die Gründlichkeit)',
      'Konjunktiv II für Höflichkeit (Könnten Sie...?)',
      'Komplexe Attribute (faktenbasiert, sachlich, strukturiert)',
      'Passivkonstruktionen (wird geschätzt, wird erwartet)',
    ],
    examTips: [
      'B2/C1 Prüfungen testen interkulturelle Kompetenz',
      'Verstehen Sie gesellschaftliche und berufliche Konventionen',
      'Achten Sie auf Nuancen in der Kommunikation',
      'Prüfungen testen oft Texte über Arbeits- und Geschäftskultur',
    ],
    practicalTips: [
      'Beobachten Sie deutsche Kollegen genau in den ersten Monaten',
      'Fragen Sie bei kulturellen Unsicherheiten nach - das wird geschätzt',
      'Nutzen Sie interkulturelle Trainings (oft vom Arbeitgeber angeboten)',
      'Lesen Sie deutsche Wirtschaftszeitungen (Handelsblatt, FAZ)',
      'Suchen Sie sich einen Mentor im Unternehmen',
      'Dokumentieren Sie wichtige Kommunikation schriftlich',
    ],
    culturalNotes: [
      'Pünktlichkeit ist in Deutschland mehr als Höflichkeit - es ist ein Wert',
      'Deutsche schätzen Direktheit und Klarheit über diplomatische Umschreibungen',
      'Work-Life-Balance wird zunehmend wichtiger, besonders bei jüngeren Generationen',
      'Das "Du" wird erst angeboten, wenn eine gewisse Vertrauensbasis besteht',
      'Deutsche Unternehmen werden zunehmend internationaler und diverser',
    ],
    relatedMaterials: [
      'Geschäftliche Begegnungen B2 - Kapitel: Interkulturelle Kommunikation',
      'DaF Kompakt Neu B2 - Unternehmenskultur in Deutschland',
      'Begegnungen B2 - Kapitel 8: Arbeitswelt und Karriere',
    ],
  },

  // ==================== C1 LEVEL ====================
  {
    id: 'c1-1',
    level: 'C1',
    title: 'Das deutsche Sozialversicherungssystem: Geschichte, Struktur und Zukunftsherausforderungen',
    category: 'culture',
    difficulty: 'advanced',
    estimatedTime: 50,
    text: `Das deutsche Sozialversicherungssystem gilt als eines der ältesten und umfassendsten der Welt. Seine Wurzeln reichen bis ins 19. Jahrhundert zurück und haben die Sozialstaatsmodelle vieler Länder geprägt. Dieser Artikel analysiert die historische Entwicklung, die aktuelle Struktur und die Herausforderungen, vor denen das System im 21. Jahrhundert steht.

Historische Entwicklung: Von Bismarck zur modernen Sozialversicherung

Die Geburtsstunde des modernen Sozialstaats:
Reichskanzler Otto von Bismarck führte in den 1880er Jahren revolutionäre Sozialgesetze ein, die als Meilenstein in der Geschichte der Sozialpolitik gelten. Die Motive waren allerdings nicht rein altruistisch: Bismarck wollte die wachsende Arbeiterbewegung und die erstarkende Sozialdemokratie schwächen, indem er den Arbeitern staatliche Absicherung bot.

Die Bismarckschen Sozialgesetze:
- 1883: Krankenversicherungsgesetz
- 1884: Unfallversicherungsgesetz
- 1889: Invaliditäts- und Altersversicherungsgesetz

Diese Gesetze schufen erstmals ein verpflichtendes System der sozialen Absicherung für Arbeiter und markierten den Übergang von rein privater Fürsorge zu staatlich organisierter Sozialversicherung.

Entwicklung im 20. Jahrhundert:
- 1927: Einführung der Arbeitslosenversicherung
- 1995: Einführung der Pflegeversicherung als fünfte Säule
- 2003-2005: Agenda 2010 (Hartz-Reformen) unter Kanzler Schröder
- 2007: Gesundheitsreform mit Einführung des Gesundheitsfonds

Die fünf Säulen des deutschen Sozialversicherungssystems

1. Krankenversicherung (GKV und PKV)
Die gesetzliche Krankenversicherung (GKV) basiert auf dem Solidaritätsprinzip: Jeder zahlt nach seiner wirtschaftlichen Leistungsfähigkeit, aber alle erhalten die gleiche medizinische Grundversorgung.

Strukturprinzipien:
- Versicherungspflicht: Fast alle Arbeitnehmer sind pflichtversichert
- Selbstverwaltung: Krankenkassen sind eigenständige Körperschaften
- Sachleistungsprinzip: Patienten erhalten direkte Leistungen, keine Erstattungen
- Beitragsbemessungsgrenze 2026: 66.600 Euro jährlich

Die private Krankenversicherung (PKV) steht Selbständigen, Beamten und Gutverdiener offen und folgt dem Äquivalenzprinzip: Die Beiträge richten sich nach dem individuellen Risiko.

Aktuelle Herausforderungen:
- Demografischer Wandel: Immer mehr ältere Menschen, weniger Beitragszahler
- Medizinischer Fortschritt: Teure Behandlungsmethoden und Medikamente
- Fachkräftemangel: Mangel an Ärzten und Pflegepersonal, besonders auf dem Land
- Zwei-Klassen-Medizin: Debatte über Unterschiede zwischen GKV und PKV

2. Rentenversicherung
Die gesetzliche Rentenversicherung sichert das Einkommen im Alter, bei Erwerbsminderung und für Hinterbliebene.

Funktionsprinzip - Das Umlageverfahren:
Die heutigen Beitragszahler finanzieren die heutigen Rentner (Generationenvertrag). Dies unterscheidet sich vom Kapitaldeckungsverfahren, bei dem jeder für sich selbst anspart.

Rentenformel:
Monatsrente = Entgeltpunkte × Zugangsfaktor × Rentenartfaktor × Rentenwert

Entgeltpunkte sammeln Sie durch Ihre Beiträge: Bei durchschnittlichem Einkommen gibt es 1 Punkt pro Jahr.

Problematik:
- Rentenniveau sinkt: 1990 lag es bei 55%, heute bei ca. 48%
- Alterung der Gesellschaft: 2030 wird jeder 4. über 65 sein
- Renteneintrittsalter: Schrittweise Erhöhung auf 67 Jahre
- Altersarmut: Zunehmend ein Problem, besonders bei Frauen

Reformdiskussionen:
- Aktienrente: Teilweise Kapitaldeckung durch Aktienfonds?
- Grundrente: Mindestabsicherung für Geringverdiener (2021 eingeführt)
- Flexi-Rente: Flexibler Übergang zwischen Arbeit und Rente
- Rente mit 70? Kontroverse Debatte

3. Arbeitslosenversicherung
Sichert Arbeitnehmer bei Arbeitslosigkeit ab.

Leistungen:
- Arbeitslosengeld I (ALG I): 60% (67% mit Kindern) des letzten Nettolohns
- Dauer: 6-24 Monate, abhängig von Alter und Beitragsjahren
- Arbeitslosengeld II (ALG II / Bürgergeld): Grundsicherung nach ALG I oder ohne Anspruch

Rechte und Pflichten:
- Aktive Arbeitsuche wird erwartet
- Zumutbare Arbeit muss angenommen werden
- Bewerbungsnachweise müssen erbracht werden
- Sanktionen bei Pflichtverletzung (allerdings 2023 deutlich reduziert)

Hartz-IV-Reform (jetzt Bürgergeld):
Die umstrittenen Hartz-Reformen (2003-2005) sollten den Arbeitsmarkt flexibilisieren:
- Zusammenlegung von Arbeitslosenhilfe und Sozialhilfe
- „Fördern und Fordern"-Prinzip
- Zumutbarkeitsregeln verschärft
- 2023 Umbenennung in „Bürgergeld" mit Entschärfung der Sanktionen

4. Unfallversicherung
Schützt bei Arbeitsunfällen und Berufskrankheiten.

Besonderheiten:
- Vollständig arbeitgeberfinanziert
- Berufsgenossenschaften als Träger (nach Branchen organisiert)
- Umfassender Schutz: Medizinische Behandlung, Rehabilitation, Renten
- Wegeunfälle sind mitversichert (Weg zur/von der Arbeit)

Prävention:
- Arbeitsschutzvorschriften
- Betriebliche Sicherheitsbeauftragte
- Schulungen und Kontrollen

5. Pflegeversicherung
Die jüngste Säule (seit 1995) reagiert auf die steigende Lebenserwartung.

Leistungen:
- Häusliche Pflege: Pflegegeld oder Pflegesachleistung
- Stationäre Pflege: Zuschuss zu Heimkosten
- Kurzzeitpflege und Verhinderungspflege
- Pflegehilfsmittel

Pflegegrade:
Seit 2017 gibt es 5 Pflegegrade (statt früher 3 Pflegestufen), die den Unterstützungsbedarf messen.

Problematik:
- Unterfinanzierung: Leistungen decken nicht alle Kosten
- Pflegekräftemangel: Dramatischer Personalmangel
- Pflegende Angehörige: Oft hohe Belastung
- Osteuropäische Pflegekräfte: Rechtliche Grauzonen

Finanzierung: Das Beitragsverfahren

Beiträge 2026 (ca.-Werte):
- Krankenversicherung: 14,6% + Zusatzbeitrag (durchschnittlich 1,7%)
- Pflegeversicherung: 3,4% (Kinderlose ab 23: 4,0%)
- Rentenversicherung: 18,6%
- Arbeitslosenversicherung: 2,6%

Insgesamt: Ca. 40% des Bruttogehalts!

Aufteilung:
Die meisten Beiträge werden hälftig von Arbeitgeber und Arbeitnehmer getragen (Ausnahme: Unfallversicherung = 100% Arbeitgeber).

Beitragsbemessungsgrenze:
Es gibt Einkommensobergrenzen, bis zu denen Beiträge gezahlt werden:
- Kranken- und Pflegeversicherung: 66.600 Euro (2026)
- Renten- und Arbeitslosenversicherung: 90.600 Euro West, 89.400 Euro Ost (2026)

Prinzipien des deutschen Sozialversicherungssystems

1. Solidaritätsprinzip:
Stärkere (höhere Einkommen, Gesunde) tragen Schwächere (niedrige Einkommen, Kranke) mit.

2. Versicherungsprinzip:
Leistungen gibt es nur bei vorheriger Beitragszahlung (Ausnahme: Sozialhilfe).

3. Subsidiaritätsprinzip:
Eigenverantwortung geht vor staatlicher Hilfe. Erst wenn eigene Kräfte nicht reichen, greift der Staat ein.

4. Selbstverwaltungsprinzip:
Versicherungsträger sind eigenständig, keine direkten Staatsbehörden.

Herausforderungen im 21. Jahrhundert

1. Demografischer Wandel
Die größte Herausforderung:
- 1950: 6 Erwerbstätige pro Rentner
- 2020: 2 Erwerbstätige pro Rentner
- 2050: Prognose ca. 1,5 Erwerbstätige pro Rentner

Folgen:
- Steigende Beiträge oder sinkende Leistungen
- Erhöhung des Renteneintrittsalters
- Bedarf an alternativer Altersvorsorge (Riester, Rürup, betriebliche AV)

2. Digitalisierung und Arbeitswelt 4.0
- Atypische Beschäftigung: Freelancer, Gig-Economy
- Plattformökonomie: Wie werden Uber-Fahrer, Deliveroo-Boten versichert?
- Homeoffice: Neue Fragen bei Wegeunfällen und Arbeitsschutz
- Künstliche Intelligenz: Wegfall von Arbeitsplätzen?

3. Globalisierung und Migration
- EU-Freizügigkeit: Sozialversicherungskoordination notwendig
- Fachkräftemangel: Zuwanderung kann helfen, bringt aber Integration challenges
- Entsendungen: Komplexe rechtliche Fragen

4. Kosten im Gesundheitswesen
- Neue Medikamente: Immuntherapien können 100.000+ Euro kosten
- Apparatemedizin: Teure Geräte und Diagnoseverfahren
- Patientenerwartungen: Anspruch auf beste Behandlung
- Pflegenotstand: Gehälter müssen steigen, Kosten auch

Internationale Perspektive: Bismarck vs. Beveridge

Bismarck-Modell (Deutschland, Österreich, Frankreich):
- Beitragsfinanzierung
- Versicherungsprinzip
- Selbstverwaltung
- Status-erhaltend

Beveridge-Modell (UK, skandinavische Länder):
- Steuerfinanzierung
- Universeller Zugang für alle Bürger
- Staatliche Verwaltung
- Gleichversorgung

Deutschland kombiniert zunehmend beide Elemente (z.B. steuerfinanzierte Zuschüsse).

Reform proposals und politische Debatten

Bürgerversicherung (SPD, Grüne):
- Alle (auch Beamte, Selbständige, Gutverdiener) in GKV
- Keine Beitragsbemessungsgrenze
- Gleiche Leistungen für alle

Kopfpauschale / Gesundheitsprämie (CDU/CSU, FDP - historisch):
- Einheitlicher Beitrag für alle
- Einkommensunabhängig
- Sozialausgleich über Steuern

Grundrente ohne Bedürftigkeitsprüfung:
- Anerkennung von Lebensleistung
- Vermeidung von Altersarmut
- Finanzierung umstritten

Fazit:
Das deutsche Sozialversicherungssystem steht vor großen Herausforderungen, hat aber über 140 Jahre bewiesen, dass es anpassungsfähig ist. Die Balance zwischen Solidarität und Eigenverantwortung, zwischen Beitragsstabilität und ausreichenden Leistungen bleibt die zentrale politische Aufgabe. Für in Deutschland lebende und arbeitende Menschen ist ein grundlegendes Verständnis dieses Systems essentiell - nicht nur für die eigene Absicherung, sondern auch für die Teilnahme an gesellschaftlichen und politischen Debatten.`,
    vocabulary: [
      { word: 'altruistisch', translation: 'altruistic', context: 'nicht rein altruistisch' },
      { word: 'die Fürsorge', translation: 'care, welfare', context: 'von rein privater Fürsorge' },
      { word: 'das Solidaritätsprinzip', translation: 'solidarity principle', context: 'basiert auf dem Solidaritätsprinzip' },
      { word: 'das Äquivalenzprinzip', translation: 'equivalence principle', context: 'folgt dem Äquivalenzprinzip' },
      { word: 'das Umlageverfahren', translation: 'pay-as-you-go system', context: 'Funktionsprinzip - Das Umlageverfahren' },
      { word: 'der Generationenvertrag', translation: 'intergenerational contract', context: 'Generationenvertrag' },
      { word: 'das Kapitaldeckungsverfahren', translation: 'funded pension system', context: 'unterscheidet sich vom Kapitaldeckungsverfahren' },
      { word: 'zumutbar', translation: 'reasonable, acceptable', context: 'Zumutbare Arbeit muss angenommen werden' },
      { word: 'die Subsidiarität', translation: 'subsidiarity', context: 'Subsidiaritätsprinzip' },
      { word: 'die Bedürftigkeitsprüfung', translation: 'means test', context: 'Grundrente ohne Bedürftigkeitsprüfung' },
    ],
    comprehensionQuestions: [
      {
        question: 'Wann wurde die Pflegeversicherung als fünfte Säule eingeführt?',
        options: ['1883', '1927', '1995', '2007'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "1995: Einführung der Pflegeversicherung als fünfte Säule"',
      },
      {
        question: 'Wie funktioniert das Umlageverfahren in der Rentenversicherung?',
        options: [
          'Jeder spart für sich selbst',
          'Die heutigen Beitragszahler finanzieren die heutigen Rentner',
          'Der Staat zahlt alle Renten',
          'Renten werden aus Steuergeldern bezahlt'
        ],
        correctAnswer: 1,
        explanation: 'Der Text erklärt: "Die heutigen Beitragszahler finanzieren die heutigen Rentner (Generationenvertrag)"',
      },
      {
        question: 'Wer finanziert die Unfallversicherung?',
        options: [
          'Arbeitnehmer und Arbeitgeber hälftig',
          'Vollständig Arbeitnehmer',
          'Vollständig Arbeitgeber',
          'Der Staat'
        ],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Vollständig arbeitgeberfinanziert"',
      },
      {
        question: 'Was war NICHT ein Motiv Bismarcks für die Sozialgesetze?',
        options: [
          'Die Arbeiterbewegung schwächen',
          'Die Sozialdemokratie schwächen',
          'Arbeiter staatlich absichern',
          'Aus rein altruistischen Gründen helfen'
        ],
        correctAnswer: 3,
        explanation: 'Der Text sagt explizit: "Die Motive waren allerdings nicht rein altruistisch"',
      },
    ],
    grammarFocus: [
      'Komplexe Nominalisierungen (Unterfinanzierung, Bedürftigkeitsprüfung)',
      'Passivkonstruktionen in Fachtexten',
      'Konjunktiv I für indirekte Rede',
      'Erweiterte Partizipialattribute',
    ],
    examTips: [
      'C1 Prüfungen testen Verständnis komplexer gesellschaftlicher Themen',
      'Achten Sie auf historische Zusammenhänge und Entwicklungen',
      'Verstehen Sie Fachterminologie im sozialwissenschaftlichen Kontext',
      'Prüfungen testen oft kritisches Verständnis von Systemen und Strukturen',
    ],
    practicalTips: [
      'Verstehen Sie Ihre Lohnabrechnung im Detail',
      'Prüfen Sie jährlich Ihre Renteninformation',
      'Informieren Sie sich über zusätzliche Altersvorsorge (Riester, betriebliche AV)',
      'Kennen Sie Ihre Rechte in der Kranken- und Arbeitslosenversicherung',
      'Nutzen Sie kostenlose Beratungsangebote der Versicherungsträger',
    ],
    culturalNotes: [
      'Das Sozialversicherungssystem ist ein Grundpfeiler der deutschen Gesellschaft',
      'Der Sozialstaat genießt breite politische und gesellschaftliche Unterstützung',
      'Debatten über Sozialreformen sind hochpolitisch und emotional',
      'Das Bismarck-Modell wurde weltweit kopiert',
    ],
    relatedMaterials: [
      'Begegnungen C1 - Kapitel: Sozialstaat und Gesellschaft',
      'Geschäftliche Begegnungen B2/C1 - Sozialversicherung',
      'DaF Kompakt Neu C1 - Deutschland verstehen',
    ],
  },

  // ==================== MORE A1 LEVEL ====================
  {
    id: 'a1-3',
    level: 'A1',
    title: 'Einkaufen im Supermarkt',
    category: 'daily-life',
    difficulty: 'beginner',
    estimatedTime: 12,
    text: `Heute gehe ich einkaufen. Ich brauche Lebensmittel für die Woche. In Deutschland gibt es viele Supermärkte: REWE, EDEKA, ALDI und LIDL.

Ich habe eine Einkaufsliste:
- Brot
- Milch
- Eier
- Käse
- Äpfel
- Tomaten
- Kartoffeln

Zuerst nehme ich einen Einkaufswagen. Dann gehe ich durch den Supermarkt. Das Obst und Gemüse ist frisch. Die Äpfel kosten 2,99 Euro pro Kilo. Die Tomaten kosten 1,49 Euro.

In der Bäckerei-Abteilung kaufe ich ein Vollkornbrot. Es kostet 2,50 Euro. Bei den Milchprodukten finde ich Milch (0,99 Euro) und Käse (3,99 Euro).

An der Kasse bezahle ich. Die Kassiererin sagt: "Das macht 15,80 Euro, bitte." Ich bezahle mit Karte. In Deutschland kann man fast überall mit EC-Karte oder Kreditkarte bezahlen.

Die Kassiererin fragt: "Brauchen Sie eine Tüte?" Eine Plastiktüte kostet 10 Cent. Ich sage: "Nein, danke. Ich habe eine Tasche dabei."

Wichtig: In Deutschland müssen Sie Ihre eigene Tasche mitbringen oder eine kaufen!`,
    vocabulary: [
      { word: 'der Einkaufswagen', translation: 'shopping cart', context: 'Ich nehme einen Einkaufswagen' },
      { word: 'die Kasse', translation: 'checkout, cash register', context: 'An der Kasse bezahle ich' },
      { word: 'die Kassiererin', translation: 'cashier (female)', context: 'Die Kassiererin sagt' },
      { word: 'die Tüte', translation: 'bag', context: 'Brauchen Sie eine Tüte?' },
      { word: 'dabei haben', translation: 'to have with you', context: 'Ich habe eine Tasche dabei' },
      { word: 'pro Kilo', translation: 'per kilogram', context: '2,99 Euro pro Kilo' },
    ],
    comprehensionQuestions: [
      {
        question: 'Was kauft die Person NICHT?',
        options: ['Brot', 'Milch', 'Fleisch', 'Äpfel'],
        correctAnswer: 2,
        explanation: 'Fleisch steht nicht auf der Einkaufsliste',
      },
      {
        question: 'Wie viel kosten die Äpfel?',
        options: ['1,49 Euro', '2,50 Euro', '2,99 Euro pro Kilo', '3,99 Euro'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Die Äpfel kosten 2,99 Euro pro Kilo"',
      },
      {
        question: 'Wie bezahlt die Person?',
        options: ['Mit Bargeld', 'Mit Karte', 'Mit Scheck', 'Gar nicht'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Ich bezahle mit Karte"',
      },
      {
        question: 'Warum braucht die Person keine Plastiktüte?',
        options: ['Sie ist zu teuer', 'Sie hat eine eigene Tasche', 'Sie kauft nichts', 'Die Kassiererin hat keine'],
        correctAnswer: 1,
        explanation: 'Die Person sagt: "Ich habe eine Tasche dabei"',
      },
    ],
    grammarFocus: [
      'Akkusativ bei Einkäufen (ich nehme einen...)',
      'Zahlen und Preise',
      'Modalverben (müssen, können)',
      'Trennbare Verben (dabei haben, mitbringen)',
    ],
    examTips: [
      'Lernen Sie Vokabular für Einkaufen - sehr häufig in A1 Prüfungen',
      'Verstehen Sie Preisangaben und Zahlen',
      'Achten Sie auf Details in Alltagssituationen',
    ],
    practicalTips: [
      'Bringen Sie immer eigene Taschen zum Einkaufen mit',
      'ALDI und LIDL sind Discounter - günstiger aber weniger Auswahl',
      'Sonntags sind fast alle Geschäfte geschlossen!',
      'Pfand: 0,25€ auf Plastikflaschen, 0,08€ auf Glasflaschen',
      'Die meisten Supermärkte akzeptieren nur EC-Karte, nicht immer Kreditkarte',
    ],
    culturalNotes: [
      'Deutsche trennen Müll sehr genau - auch beim Einkaufen',
      'Bioläden und Wochenmärkte sind sehr beliebt',
      'Kassierer sitzen in Deutschland (in vielen Ländern stehen sie)',
    ],
    relatedMaterials: [
      'Menschen A1 - Lektion 5: Einkaufen und Essen',
      'Schritte International Neu A1 - Lektion 4: Im Supermarkt',
      'Studio 21 A1 - Einheit 3: Essen und Trinken',
    ],
  },

  {
    id: 'a1-4',
    level: 'A1',
    title: 'Meine Familie',
    category: 'daily-life',
    difficulty: 'beginner',
    estimatedTime: 10,
    text: `Ich heiße Tom und ich möchte meine Familie vorstellen.

Meine Eltern heißen Peter und Maria. Mein Vater ist 55 Jahre alt. Er ist Ingenieur und arbeitet bei BMW in München. Meine Mutter ist 52 Jahre alt. Sie ist Lehrerin an einer Grundschule.

Ich habe eine Schwester. Sie heißt Lisa und ist 18 Jahre alt. Lisa studiert Medizin in Berlin. Sie möchte Ärztin werden. Ich habe auch einen Bruder. Er heißt Max und ist 12 Jahre alt. Max geht noch zur Schule. Er spielt gern Fußball.

Ich bin 25 Jahre alt und arbeite als Programmierer. Ich wohne in einer eigenen Wohnung in Hamburg. Am Wochenende besuche ich oft meine Familie in München.

Wir haben auch einen Hund. Er heißt Bello und ist 5 Jahre alt. Bello ist sehr freundlich und spielt gern im Garten.

Meine Großeltern leben auch in München. Mein Opa ist 80 und meine Oma ist 78 Jahre alt. Sie sind schon in Rente. Jeden Sonntag essen wir zusammen Mittagessen bei meinen Großeltern.`,
    vocabulary: [
      { word: 'vorstellen', translation: 'to introduce', context: 'Ich möchte meine Familie vorstellen' },
      { word: 'die Eltern', translation: 'parents', context: 'Meine Eltern heißen Peter und Maria' },
      { word: 'der Ingenieur', translation: 'engineer', context: 'Er ist Ingenieur' },
      { word: 'die Grundschule', translation: 'elementary school', context: 'an einer Grundschule' },
      { word: 'studieren', translation: 'to study (at university)', context: 'Lisa studiert Medizin' },
      { word: 'die Rente', translation: 'retirement, pension', context: 'Sie sind schon in Rente' },
    ],
    comprehensionQuestions: [
      {
        question: 'Wie alt ist Toms Vater?',
        options: ['52 Jahre', '55 Jahre', '80 Jahre', '25 Jahre'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Mein Vater ist 55 Jahre alt"',
      },
      {
        question: 'Was macht Lisa?',
        options: ['Sie arbeitet', 'Sie geht zur Schule', 'Sie studiert Medizin', 'Sie ist Ärztin'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Lisa studiert Medizin in Berlin"',
      },
      {
        question: 'Wo wohnt Tom?',
        options: ['In München', 'In Berlin', 'In Hamburg', 'Bei seinen Eltern'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Ich wohne in einer eigenen Wohnung in Hamburg"',
      },
      {
        question: 'Wann isst die Familie zusammen?',
        options: ['Jeden Tag', 'Jeden Sonntag', 'Jeden Samstag', 'Am Wochenende'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Jeden Sonntag essen wir zusammen Mittagessen"',
      },
    ],
    grammarFocus: [
      'Possessivpronomen (mein, meine)',
      'Altersangaben mit "sein"',
      'Präsens der Verben (arbeiten, studieren, wohnen)',
      'Zeitangaben (jeden Sonntag, am Wochenende)',
    ],
    examTips: [
      'Familie ist ein sehr häufiges Thema in A1 Prüfungen',
      'Lernen Sie Familienvokabular gut',
      'Können Sie über Ihre Familie sprechen',
      'Verstehen Sie Altersangaben und Berufe',
    ],
    practicalTips: [
      'In Deutschland gibt man oft die Hand zur Begrüßung - auch in der Familie',
      'Sonntags-Mittagessen ist eine wichtige Familientradition',
      'Viele junge Deutsche ziehen mit 18-25 aus dem Elternhaus aus',
    ],
    culturalNotes: [
      'Die Familie ist in Deutschland wichtig, aber es gibt viele verschiedene Familienformen',
      'Großeltern helfen oft bei der Kinderbetreuung',
      'Haustiere (besonders Hunde) sind sehr beliebt in Deutschland',
    ],
    relatedMaterials: [
      'Menschen A1 - Lektion 2: Familie und Freunde',
      'Schritte International Neu A1 - Lektion 3: Meine Familie',
      'Begegnungen A1 - Kapitel 2: Familie und Beziehungen',
    ],
  },

  // ==================== MORE A2 LEVEL ====================
  {
    id: 'a2-3',
    level: 'A2',
    title: 'Mit dem Bus und der Bahn fahren',
    category: 'daily-life',
    difficulty: 'intermediate',
    estimatedTime: 20,
    text: `Der öffentliche Nahverkehr (ÖPNV) in Deutschland ist gut ausgebaut. In den Städten gibt es Busse, Straßenbahnen (Tram), U-Bahnen und S-Bahnen.

Tickets kaufen:
Sie können Tickets an Automaten, in Apps oder beim Busfahrer kaufen. Die Preise hängen von der Entfernung ab. Es gibt verschiedene Tarifzonen.

Ticket-Arten:
- Einzelfahrschein: Für eine Fahrt (ca. 2-3 Euro)
- Tageskarte: Unbegrenzt fahren an einem Tag (ca. 7-9 Euro)
- Wochenkarte: Für eine Woche
- Monatskarte: Für einen Monat (ca. 50-100 Euro, je nach Stadt)
- Deutschlandticket: 49 Euro pro Monat für ganz Deutschland (seit 2023)

Das Deutschlandticket ist sehr praktisch! Sie können damit in allen Bussen, Straßenbahnen, U-Bahnen, S-Bahnen und Regionalzügen in ganz Deutschland fahren.

Wichtige Regeln:
1. Entwerten Sie Ihr Ticket! Beim Bus: beim Einsteigen. An Automaten: vor der Fahrt.
2. Kontrolleure prüfen regelmäßig die Tickets
3. Schwarzfahren (ohne Ticket) kostet 60 Euro Strafe!
4. Bei Verspätungen: Keine Erstattung bei Einzeltickets
5. In der Hauptverkehrszeit (7-9 Uhr, 16-19 Uhr) sind die Bahnen voll

Die Bahn (Deutsche Bahn - DB):
Für längere Strecken zwischen Städten nutzen Sie die Deutsche Bahn.

Zugtypen:
- ICE (InterCity Express): Sehr schnell, teuer (z.B. München-Berlin: ca. 130 Euro)
- IC (InterCity): Schnell, mittleres Preisniveau
- RE (Regional Express): Langsamer, günstiger
- RB (Regionalbahn): Hält an allen Stationen

Spartipps:
- Buchen Sie früh! Sparpreise ab 19,90 Euro
- BahnCard 25: 25% Rabatt auf alle Tickets (kostet 55 Euro/Jahr)
- BahnCard 50: 50% Rabatt (kostet 229 Euro/Jahr)
- Flexpreis: Teurer, aber Sie können jeden Zug nehmen

Apps und Online:
- DB Navigator App: Verbindungen suchen, Tickets kaufen
- Bahn.de: Website für Buchungen
- Lokale Apps: MVG (München), BVG (Berlin), etc.

Bei Verspätungen:
- Ab 60 Minuten: 25% Erstattung
- Ab 120 Minuten: 50% Erstattung
- Sie können einen anderen Zug nehmen (bei Flexpreis)

Praktische Tipps:
- Reservierung: Bei ICE/IC möglich (4,90 Euro), empfohlen an Wochenenden
- Fahrrad mitnehmen: Möglich, kostet extra (ca. 6 Euro)
- Gepäck: Kein Gewichtslimit, aber Sie müssen es selbst tragen
- Ruhebereich: In ICE-Zügen gibt es ruhige Bereiche

Bahnhöfe in Deutschland:
Große Bahnhöfe haben viele Geschäfte und Restaurants. Sie sind oft 24 Stunden geöffnet. Es gibt auch Schließfächer für Gepäck (ca. 4-7 Euro pro Tag).

Wichtig zu wissen:
- Deutsche Züge sind nicht immer pünktlich! (trotz des Klischees)
- Im Winter gibt es oft Verspätungen wegen Schnee
- Streiks kommen vor - informieren Sie sich vorher
- In Zügen ist es oft kalt (Klimaanlage) - nehmen Sie eine Jacke mit`,
    vocabulary: [
      { word: 'der Nahverkehr', translation: 'local public transport', context: 'Der öffentliche Nahverkehr' },
      { word: 'ausgebaut', translation: 'developed, expanded', context: 'ist gut ausgebaut' },
      { word: 'entwerten', translation: 'to validate (ticket)', context: 'Entwerten Sie Ihr Ticket' },
      { word: 'schwarzfahren', translation: 'to ride without a ticket', context: 'Schwarzfahren kostet 60 Euro' },
      { word: 'die Verspätung', translation: 'delay', context: 'Bei Verspätungen' },
      { word: 'die Erstattung', translation: 'refund, reimbursement', context: 'Keine Erstattung' },
      { word: 'der Rabatt', translation: 'discount', context: '25% Rabatt auf alle Tickets' },
      { word: 'das Schließfach', translation: 'locker', context: 'Schließfächer für Gepäck' },
    ],
    comprehensionQuestions: [
      {
        question: 'Wie viel kostet das Deutschlandticket pro Monat?',
        options: ['29 Euro', '39 Euro', '49 Euro', '59 Euro'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Deutschlandticket: 49 Euro pro Monat"',
      },
      {
        question: 'Was passiert, wenn Sie ohne Ticket fahren?',
        options: ['Nichts', '30 Euro Strafe', '60 Euro Strafe', '100 Euro Strafe'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Schwarzfahren kostet 60 Euro Strafe"',
      },
      {
        question: 'Ab wie viel Minuten Verspätung bekommen Sie 25% Erstattung?',
        options: ['30 Minuten', '60 Minuten', '90 Minuten', '120 Minuten'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Ab 60 Minuten: 25% Erstattung"',
      },
      {
        question: 'Welcher Zug ist am schnellsten?',
        options: ['RE', 'RB', 'IC', 'ICE'],
        correctAnswer: 3,
        explanation: 'Der Text erklärt: "ICE (InterCity Express): Sehr schnell"',
      },
    ],
    grammarFocus: [
      'Modalverben (können, müssen, dürfen)',
      'Imperativ (Entwerten Sie, Buchen Sie)',
      'Komparativ und Superlativ (schneller, am schnellsten)',
      'Präpositionen (mit, in, an, von)',
    ],
    examTips: [
      'Öffentlicher Verkehr ist ein häufiges Thema in A2/B1 Prüfungen',
      'Verstehen Sie Durchsagen und Fahrpläne',
      'Lernen Sie Vokabular für Reisen und Verkehr',
      'Achten Sie auf Zahlen (Preise, Zeiten)',
    ],
    practicalTips: [
      'Laden Sie die DB Navigator App herunter - sehr praktisch!',
      'Das Deutschlandticket lohnt sich, wenn Sie regelmäßig fahren',
      'Kaufen Sie BahnCard, wenn Sie oft Fernzüge nutzen',
      'In München: MVG App, in Berlin: BVG App',
      'Studenten und Azubis bekommen oft Semestertickets',
      'Bei Streiks: Informieren Sie sich auf Bahn.de oder in der App',
    ],
    culturalNotes: [
      'Deutsche beschweren sich oft über die Bahn, nutzen sie aber viel',
      'Pünktlichkeit ist wichtig - aber Züge sind oft verspätet (Ironie!)',
      'Fahrradfahren und ÖPNV sind sehr beliebt',
      'Umweltbewusstsein: Viele Deutsche nutzen ÖPNV statt Auto',
    ],
    relatedMaterials: [
      'Menschen A2 - Lektion 10: Unterwegs',
      'Schritte International Neu A2 - Lektion 8: Verkehrsmittel',
      'Begegnungen A2 - Kapitel 5: Reisen und Mobilität',
      'Studio 21 A2 - Einheit 7: Verkehr',
    ],
  },

  // ==================== MORE B1 LEVEL ====================
  {
    id: 'b1-3',
    level: 'B1',
    title: 'Das deutsche Bildungssystem verstehen',
    category: 'culture',
    difficulty: 'intermediate',
    estimatedTime: 30,
    text: `Das deutsche Bildungssystem ist komplex und unterscheidet sich stark von vielen anderen Ländern. Hier ist ein umfassender Überblick:

Kindergarten und Vorschule (0-6 Jahre):
Der Kindergarten ist nicht verpflichtend, aber die meisten Kinder besuchen ihn. Für Kinder unter 3 Jahren gibt es die Krippe. Die Kosten hängen vom Einkommen ab. In vielen Bundesländern ist der Kindergarten inzwischen kostenlos.

Grundschule (6-10 Jahre):
Alle Kinder gehen vier Jahre (in Berlin und Brandenburg sechs Jahre) zur Grundschule. Der Unterricht beginnt meist zwischen 8:00 und 8:30 Uhr. Am Ende der Grundschule bekommen die Kinder eine Empfehlung für die weiterführende Schule.

Das dreigliedrige Schulsystem:
Nach der Grundschule gibt es drei Hauptwege:

1. Hauptschule (bis Klasse 9/10):
- Grundlegende Allgemeinbildung
- Vorbereitung auf praktische Berufe
- Nach dem Hauptschulabschluss: Ausbildung möglich

2. Realschule (bis Klasse 10):
- Erweiterte Allgemeinbildung
- Mittlerer Schulabschluss (Realschulabschluss)
- Danach: Ausbildung oder Wechsel zum Gymnasium möglich

3. Gymnasium (bis Klasse 12/13):
- Höchster Schulabschluss: Abitur
- Berechtigt zum Studium an Universitäten
- Schwerpunkte: Sprachen, Naturwissenschaften, Gesellschaftswissenschaften

Gesamtschule:
Kombiniert alle drei Schulformen unter einem Dach. Kinder können hier alle Abschlüsse machen.

Das duale Ausbildungssystem:
Deutschland ist weltweit bekannt für sein duales System:
- 2-3 Jahre Ausbildung
- Theorie: Berufsschule (1-2 Tage pro Woche)
- Praxis: Im Betrieb (3-4 Tage pro Woche)
- Vergütung: 500-1.200 Euro pro Monat
- Über 300 verschiedene Ausbildungsberufe

Beliebte Ausbildungsberufe:
- Kaufmann/-frau für Büromanagement
- Industriemechaniker/in
- Fachinformatiker/in
- Medizinische/r Fachangestellte/r
- Koch/Köchin

Hochschulbildung:
Es gibt drei Haupttypen:

1. Universitäten:
- Forschungsorientiert
- Bachelor (3 Jahre), Master (2 Jahre), Doktor
- Alle wissenschaftlichen Fächer

2. Fachhochschulen (FH):
- Praxisorientiert
- Bachelor, Master
- Ingenieurwesen, Wirtschaft, Soziales

3. Duale Hochschulen:
- Kombination Studium + Arbeit im Unternehmen
- Besonders in Baden-Württemberg

Kosten und Finanzierung:
- Die meisten Universitäten sind (fast) kostenlos!
- Semesterbeitrag: 150-350 Euro (inkl. Semesterticket)
- BAföG: Staatliche Studienfinanzierung (bis 934 Euro/Monat)
- Nur 50% müssen zurückgezahlt werden
- Stipendien: Viele verschiedene Programme

Wichtige Unterschiede zu anderen Ländern:
- Frühe Aufteilung (nach Klasse 4)
- Starker Fokus auf berufliche Bildung
- Kostenlose Universitäten
- Kein Bachelor-Numerus Clausus bei vielen Fächern
- Starke Rolle der Bundesländer (16 verschiedene Schulsysteme!)

Anerkennung ausländischer Abschlüsse:
Wenn Sie einen ausländischen Abschluss haben:
- Kontaktieren Sie die Zentralstelle für ausländisches Bildungswesen (ZAB)
- Für reglementierte Berufe (Arzt, Lehrer): Offizielle Anerkennung nötig
- Für nicht-reglementierte Berufe: Anerkennung hilft, ist aber nicht Pflicht
- Website: anabin.kmk.org

Herausforderungen und Kritik:
- Frühe Aufteilung verstärkt soziale Ungleichheit
- Bildungserfolg hängt stark von Elternhaus ab
- Unterschiede zwischen Bundesländern
- Lehrermangel, besonders in MINT-Fächern
- Digitalisierung hinkt hinterher

Weiterbildung und lebenslanges Lernen:
- Volkshochschulen (VHS): Günstige Kurse für Erwachsene
- Meister: Höchste berufliche Qualifikation (z.B. Handwerksmeister)
- Umschulung: Berufswechsel mit staatlicher Förderung
- Fernuniversität: Studium neben dem Beruf

Praktische Tipps für Eltern:
- Informieren Sie sich früh über das System
- Die Grundschulempfehlung ist wichtig, aber nicht bindend (in den meisten Bundesländern)
- Kinder können später wechseln - das System ist durchlässiger als früher
- Ausbildung ist gleichwertig zum Studium - nicht "schlechter"!
- Gute Deutschkenntnisse sind essentiell`,
    vocabulary: [
      { word: 'verpflichtend', translation: 'mandatory, compulsory', context: 'nicht verpflichtend' },
      { word: 'die Empfehlung', translation: 'recommendation', context: 'bekommen eine Empfehlung' },
      { word: 'weiterführend', translation: 'secondary, continuing', context: 'weiterführende Schule' },
      { word: 'dreigliedrig', translation: 'three-tier', context: 'Das dreigliedrige Schulsystem' },
      { word: 'die Vergütung', translation: 'remuneration, payment', context: 'Vergütung: 500-1.200 Euro' },
      { word: 'die Durchlässigkeit', translation: 'permeability, mobility', context: 'durchlässiger als früher' },
      { word: 'gleichwertig', translation: 'equivalent, equal in value', context: 'gleichwertig zum Studium' },
    ],
    comprehensionQuestions: [
      {
        question: 'Wie lange dauert die Grundschule in den meisten Bundesländern?',
        options: ['3 Jahre', '4 Jahre', '6 Jahre', '8 Jahre'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "vier Jahre (in Berlin und Brandenburg sechs Jahre)"',
      },
      {
        question: 'Welcher Schulabschluss berechtigt zum Studium?',
        options: ['Hauptschulabschluss', 'Realschulabschluss', 'Abitur', 'Alle'],
        correctAnswer: 2,
        explanation: 'Der Text erklärt: "Abitur ... Berechtigt zum Studium an Universitäten"',
      },
      {
        question: 'Wie viel Prozent des BAföG muss zurückgezahlt werden?',
        options: ['25%', '50%', '75%', '100%'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Nur 50% müssen zurückgezahlt werden"',
      },
      {
        question: 'Was ist das duale System?',
        options: [
          'Zwei Schulen gleichzeitig',
          'Theorie in der Berufsschule + Praxis im Betrieb',
          'Gymnasium und Realschule',
          'Zwei Abschlüsse'
        ],
        correctAnswer: 1,
        explanation: 'Der Text erklärt: "Theorie: Berufsschule ... Praxis: Im Betrieb"',
      },
    ],
    grammarFocus: [
      'Passiv (werden unterschieden, wird kritisiert)',
      'Komparativ (durchlässiger, günstiger)',
      'Nominalisierung (die Aufteilung, die Anerkennung)',
      'Konditionalsätze (Wenn Sie einen Abschluss haben...)',
    ],
    examTips: [
      'B1 Prüfung testet Verständnis des deutschen Systems',
      'Verstehen Sie Bildungsabläufe und -strukturen',
      'Achten Sie auf spezifische Details (Zahlen, Zeiträume)',
      'Kulturelles Wissen wird oft getestet',
    ],
    practicalTips: [
      'Informieren Sie sich über das Schulsystem Ihres Bundeslandes',
      'Kontaktieren Sie die Schulberatung bei Fragen',
      'Die IHK (Industrie- und Handelskammer) hilft bei Ausbildungsfragen',
      'Nutzen Sie die Agentur für Arbeit für Berufsberatung',
      'Website anabin.kmk.org für Anerkennung ausländischer Abschlüsse',
    ],
    culturalNotes: [
      'Ausbildung hat in Deutschland ein hohes Ansehen',
      'Nicht jeder muss studieren - Fachkräfte sind sehr gefragt',
      'Das System wird kontrovers diskutiert',
      'Bildung ist Ländersache - daher 16 verschiedene Systeme',
    ],
    relatedMaterials: [
      'Begegnungen B1 - Kapitel 4: Bildung und Ausbildung',
      'Menschen B1 - Modul 10: Schule und Bildung',
      'Schritte International Neu B1 - Lektion 9: Bildungswege',
      'DaF Kompakt Neu B1 - Gesellschaft verstehen',
    ],
  },

  // ==================== MORE B2 LEVEL ====================
  {
    id: 'b2-3',
    level: 'B2',
    title: 'Nachhaltigkeit und Umweltschutz in Deutschland',
    category: 'culture',
    difficulty: 'advanced',
    estimatedTime: 35,
    text: `Deutschland gilt weltweit als Vorreiter beim Umweltschutz und der Nachhaltigkeit. Dieses Engagement hat historische Wurzeln und prägt den Alltag der Menschen fundamental.

Historische Entwicklung des Umweltbewusstseins:

Die grüne Bewegung:
In den 1970er und 1980er Jahren entstand eine starke Umweltbewegung. Der Widerstand gegen Atomkraft und die Sorge um den "sauren Regen" mobilisierten Millionen. 1980 wurde die Partei "Die Grünen" gegründet, die erstmals Umweltthemen in den politischen Mainstream brachte.

Schlüsselereignisse:
- 1986: Tschernobyl-Katastrophe verstärkte Anti-Atom-Bewegung
- 1990er: Einführung des Dualen Systems (Grüner Punkt) für Recycling
- 2000: Erneuerbare-Energien-Gesetz (EEG)
- 2011: Atomausstieg nach Fukushima
- 2023: Abschaltung der letzten Atomkraftwerke

Die Energiewende:

Ambitionierte Ziele:
- Klimaneutralität bis 2045
- 80% Erneuerbare Energien bis 2030
- Kohleausstieg bis spätestens 2038
- Reduktion der CO2-Emissionen um 65% bis 2030 (gegenüber 1990)

Erneuerbare Energien:
Deutschland investiert massiv in:
- Windkraft (Onshore und Offshore)
- Solarenergie (trotz wenig Sonnenschein!)
- Biomasse und Biogas
- Wasserkraft (begrenzt durch Geografie)

Herausforderungen:
- Netzausbau hinkt hinterher
- Speicherprobleme (Batterien, Wasserstoff)
- "Dunkelflaute": Wenn weder Wind noch Sonne verfügbar
- Abhängigkeit von Energieimporten (besonders seit Ukraine-Krieg)
- Hohe Energiepreise für Verbraucher und Industrie

Mülltrennung: Eine deutsche Obsession:

Das System:
Deutsche trennen Müll akribisch in verschiedene Kategorien:

1. Gelber Sack/Gelbe Tonne (Verpackungen):
- Plastik, Metall, Verbundstoffe
- Tetra Paks, Konservendosen
- Nicht: Glas!

2. Blaue Tonne (Altpapier):
- Zeitungen, Zeitschriften
- Kartons
- Nicht: Beschichtetes Papier, Pizza-Kartons mit Essensresten

3. Braune Tonne (Biomüll):
- Essensreste (roh und gekocht)
- Gartenabfälle
- Kaffeesatz, Teebeutel

4. Schwarze Tonne (Restmüll):
- Was nicht in die anderen Tonnen passt
- Hygieneartikel, Windeln
- Verschmutzte Verpackungen

5. Glascontainer:
- Nach Farben getrennt: Weiß, Grün, Braun
- Blau zu Grün, andere Farben zu Grün
- Flaschen ohne Pfand

6. Wertstoffhof:
- Elektrogeräte
- Sperrmüll (Möbel)
- Sondermüll (Batterien, Farben, Chemikalien)

Pfandsystem:
- Einwegflaschen (Plastik): 0,25 € Pfand
- Mehrwegflaschen (Glas): 0,08-0,15 € Pfand
- Rückgabe: Im Supermarkt am Automaten
- Gilt auch für Dosen!

Recycling-Zahlen:
- Deutschland recycelt ca. 67% des Mülls (EU-Spitze!)
- Aber: Viel wird exportiert oder verbrannt
- "Downcycling": Qualität nimmt ab

Mobilität und Verkehr:

Der Konflikt um das Auto:
Deutschland ist das Land der Autobauer (VW, BMW, Mercedes, Porsche), aber auch der Verkehrswende:

Maßnahmen:
- Ausbau des ÖPNV (49-Euro-Ticket)
- Förderung von E-Autos (bis zu 6.750 € Kaufprämie)
- Ausbau Fahrradinfrastruktur
- Tempolimit-Debatte (sehr kontrovers!)
- Car-Sharing in Städten

E-Mobilität:
- Bis 2030: 15 Millionen E-Autos geplant
- Herausforderung: Ladeinfrastruktur
- Batterieproduktion problematisch (Rohstoffe, Energie)

Fahrradkultur:
- Besonders in Städten wie Münster, Freiburg, Berlin
- Viele Fahrradwege (nicht immer gut ausgebaut)
- E-Bikes boomen
- Lastenräder werden gefördert

Nachhaltiger Konsum:

Bio-Boom:
- Deutschland ist Europas größter Bio-Markt
- Viele Bio-Supermärkte (Alnatura, denn's, Bio Company)
- Bio-Siegel: EU-Bio, Demeter, Bioland, Naturland
- Auch Discounter haben Bio-Produkte

Unverpackt-Läden:
- Trend zu verpackungsfreiem Einkaufen
- Eigene Behälter mitbringen
- Reduzierung von Plastik

Vegetarisch/Vegan:
- Ca. 10% Vegetarier, 2% Veganer
- Großes Angebot an Fleischersatzprodukten
- "Meat Sceptic": Flexitarier werden mehr

Klimabewegung und Aktivismus:

Fridays for Future:
- Seit 2019 große Schulstreiks für Klimaschutz
- Greta Thunberg inspirierte deutsche Jugend
- Große Demonstrationen (bis zu 1,4 Millionen Teilnehmer)

Letzte Generation:
- Radikalere Klimaproteste
- Straßenblockaden, Kunstaktionen
- Sehr kontrovers diskutiert
- Frage: Wie weit darf Aktivismus gehen?

Politik und Gesellschaft:
- Klimaschutz ist Wahlkampfthema
- Generationenkonflikt sichtbar
- Spannungsfeld: Umwelt vs. Wirtschaft

Gebäude und Wohnen:

Energetische Sanierung:
- Verpflichtung zu besserer Dämmung
- Heizungstausch: Weg von Öl und Gas
- Wärmepumpen werden gefördert
- Solaranlagen auf Dächern

Kontroverse:
- Hohe Kosten für Eigentümer und Mieter
- Heizungsgesetz 2024 sehr umstritten
- Fachkräftemangel bei Handwerkern

Kritik und Widersprüche:

Trotz hohem Umweltbewusstsein gibt es Kritik:
- Braunkohle wird noch abgebaut (Kohle-Lobby stark)
- CO2-Ausstoß pro Kopf höher als EU-Durchschnitt
- Autobahn-Ausbau vs. Klimaziele
- Zerstörung von Dörfern für Kohlegruben
- "Greenwashing" bei Unternehmen

Praktische Tipps für Nachhaltiges Leben in Deutschland:

1. Mülltrennung richtig machen (sonst Ärger mit Nachbarn!)
2. Pfandflaschen zurückgeben (Geld zurück!)
3. Regional und saisonal einkaufen (Wochenmärkte)
4. ÖPNV nutzen (49-Euro-Ticket lohnt sich)
5. Fahrrad fahren (gesund + umweltfreundlich)
6. Strom von Öko-Anbietern (oft günstiger als gedacht)
7. Repair-Cafés nutzen (kostenlos Dinge reparieren)
8. Kleidung Second-Hand kaufen (viele gute Läden)

Ressourcen und Hilfe:
- Umweltbundesamt (umweltbundesamt.de)
- NABU (Naturschutzbund)
- BUND (Bund für Umwelt und Naturschutz)
- Apps: CodeCheck, Too Good To Go, ReplacePlastic

Fazit:
Umweltschutz ist in Deutschland mehr als ein politisches Thema - es ist Teil der Alltagskultur. Die Deutschen nehmen ihre Rolle als "Klimaschützer" ernst, auch wenn nicht alles perfekt ist. Für in Deutschland lebende Menschen ist es wichtig, dieses System zu verstehen und sich anzupassen - nicht zuletzt, um Konflikte mit Nachbarn zu vermeiden!`,
    vocabulary: [
      { word: 'der Vorreiter', translation: 'pioneer, leader', context: 'gilt als Vorreiter beim Umweltschutz' },
      { word: 'akribisch', translation: 'meticulously', context: 'trennen Müll akribisch' },
      { word: 'die Dämmung', translation: 'insulation', context: 'besserer Dämmung' },
      { word: 'kontrovers', translation: 'controversial', context: 'sehr kontrovers diskutiert' },
      { word: 'das Spannungsfeld', translation: 'area of tension', context: 'Spannungsfeld: Umwelt vs. Wirtschaft' },
      { word: 'der Widerspruch', translation: 'contradiction', context: 'Kritik und Widersprüche' },
    ],
    comprehensionQuestions: [
      {
        question: 'Bis wann will Deutschland klimaneutral sein?',
        options: ['2030', '2038', '2045', '2050'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Klimaneutralität bis 2045"',
      },
      {
        question: 'Wie viel Pfand gibt es auf Einweg-Plastikflaschen?',
        options: ['0,08 €', '0,15 €', '0,25 €', '0,50 €'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Einwegflaschen (Plastik): 0,25 € Pfand"',
      },
      {
        question: 'Wann wurden die letzten Atomkraftwerke in Deutschland abgeschaltet?',
        options: ['2011', '2020', '2023', '2025'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "2023: Abschaltung der letzten Atomkraftwerke"',
      },
      {
        question: 'Wie viel Prozent des Mülls recycelt Deutschland circa?',
        options: ['45%', '55%', '67%', '80%'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Deutschland recycelt ca. 67% des Mülls"',
      },
    ],
    grammarFocus: [
      'Nominalisierung komplexer Konzepte',
      'Passivkonstruktionen',
      'Konzessivsätze (trotz, obwohl)',
      'Erweiterte Partizipialattribute',
    ],
    examTips: [
      'B2 testet Verständnis gesellschaftlicher Debatten',
      'Verstehen Sie Pro- und Contra-Argumente',
      'Achten Sie auf Fachtermini im Umweltbereich',
      'Prüfungen testen oft aktuelle Themen',
    ],
    practicalTips: [
      'Lernen Sie das Mülltrennungssystem - sehr wichtig in Deutschland!',
      'Nutzen Sie Pfandautomaten im Supermarkt',
      'Apps wie CodeCheck helfen bei nachhaltigem Einkauf',
      'Repair-Cafés sind kostenlos und helfen der Umwelt',
      'Informieren Sie sich über lokale Recycling-Regeln (variieren leicht)',
    ],
    culturalNotes: [
      'Mülltrennung wird sehr ernst genommen - Nachbarn kontrollieren!',
      'Umweltschutz ist Konsens, aber Maßnahmen sind umstritten',
      'Generationenkonflikt beim Klimaschutz sichtbar',
      'Deutsche sind stolz auf ihre Recycling-Quote',
    ],
    relatedMaterials: [
      'Begegnungen B2 - Kapitel 7: Umwelt und Gesellschaft',
      'DaF Kompakt Neu B2 - Nachhaltigkeit',
      'Geschäftliche Begegnungen B2 - Corporate Social Responsibility',
    ],
  },
  // ==================== NEW PASSAGES ====================
  // A1: Meine Familie und meine Hobbys
  {
    id: 'a1-5',
    level: 'A1',
    title: 'Meine Haustiere und meine Hobbys',
    category: 'daily-life',
    difficulty: 'beginner',
    estimatedTime: 10,
    text: `Hallo, ich bin Julia. Ich bin 20 Jahre alt und komme aus Österreich. Ich wohne in Wien mit meiner Familie. 

Wir haben zwei Haustiere: einen Hund und eine Katze. Der Hund heißt Max und ist sehr groß. Er ist drei Jahre alt. Er spielt gern im Park. Die Katze heißt Mimi. Sie ist klein und schläft viel. Sie ist schon zehn Jahre alt.

In meiner Freizeit habe ich viele Hobbys. Ich lese gern Bücher, besonders Romane. Am Wochenende fahre ich oft Fahrrad. Wenn das Wetter schön ist, fahre ich mit dem Fahrrad in den Park. Dort treffe ich meine Freunde. Wir spielen Fußball oder trinken einen Kaffee.

Manchmal koche ich auch für meine Familie. Mein Lieblingsessen ist Pizza. Ich backe die Pizza selbst. Das macht Spaß! Was sind deine Hobbys?`,
    vocabulary: [
      { word: 'das Haustier', translation: 'pet', context: 'Wir haben zwei Haustiere' },
      { word: 'schlafen', translation: 'to sleep', context: 'Sie schläft viel' },
      { word: 'die Freizeit', translation: 'free time', context: 'In meiner Freizeit' },
      { word: 'das Fahrrad', translation: 'bicycle', context: 'Am Wochenende fahre ich oft Fahrrad' },
      { word: 'treffen', translation: 'to meet', context: 'Dort treffe ich meine Freunde' },
      { word: 'das Lieblingsessen', translation: 'favorite food', context: 'Mein Lieblingsessen ist Pizza' },
    ],
    comprehensionQuestions: [
      {
        question: 'Woher kommt Julia?',
        options: ['Aus Deutschland', 'Aus Österreich', 'Aus der Schweiz', 'Aus Italien'],
        correctAnswer: 1,
        explanation: 'Julia sagt: "Ich komme aus Österreich."',
      },
      {
        question: 'Wie alt ist die Katze Mimi?',
        options: ['Drei Jahre', 'Fünf Jahre', 'Zehn Jahre', 'Zwanzig Jahre'],
        correctAnswer: 2,
        explanation: 'Der Text sagt über Mimi: "Sie ist schon zehn Jahre alt."',
      },
      {
        question: 'Was macht Julia am Wochenende oft?',
        options: ['Sie schläft viel', 'Sie liest ein Buch', 'Sie kocht Pizza', 'Sie fährt Fahrrad'],
        correctAnswer: 3,
        explanation: 'Julia sagt: "Am Wochenende fahre ich oft Fahrrad."',
      },
      {
        question: 'Was ist Julias Lieblingsessen?',
        options: ['Schokolade', 'Pizza', 'Kaffee', 'Gemüse'],
        correctAnswer: 1,
        explanation: 'Julia sagt: "Mein Lieblingsessen ist Pizza."',
      },
    ],
    grammarFocus: [
      'Gern / gerne benutzen (Ich spiele gern...)',
      'Plural der Nomen (Bücher, Freunde)',
      'Possessivpronomen (meine, mein)',
      'Verben mit Vokalwechsel (schlafen -> schläft, treffen -> treffe)',
    ],
    examTips: [
      'Stellen Sie sich vor: Name, Alter, Herkunft',
      'Berichten Sie von Ihren Hobbys',
      'Benutzen Sie einfache Konnektoren wie "und", "oder", "aber".',
    ],
    practicalTips: [
      'Deutsche mögen Hunde sehr. Es gibt viele Parks für Hunde.',
      'Radfahren ist in Städten sehr populär und gut ausgebaut.',
      'Am Sonntag bleiben die meisten Geschäfte geschlossen.',
    ],
    culturalNotes: [
      'Viele Deutsche, Österreicher und Schweizer lieben Haustiere.',
      'In Deutschland und Österreich gibt es viele Radwege.',
      'Kaffee und Kuchen am Nachmittag ist eine beliebte Tradition am Wochenende.',
    ],
    relatedMaterials: [
      'Menschen A1 - Lektion 4: Freizeit',
      'Studio 21 A1 - Einheit 6: Freunde',
    ],
  },

  // A2: Einkaufen auf dem Markt
  {
    id: 'a2-4',
    level: 'A2',
    title: 'Einkaufen im Supermarkt und auf dem Markt',
    category: 'daily-life',
    difficulty: 'intermediate',
    estimatedTime: 15,
    text: `Am Samstagmorgen gehe ich oft auf den Wochenmarkt. Der Markt ist in der Fußgängerzone im Zentrum. Dort gibt es viele kleine Stände mit frischem Obst, Gemüse, Fleisch und Käse.

Ich mag den Markt sehr. Die Atmosphäre ist schön und die Verkäufer sind oft sehr nett. Man kann die Produkte probieren und Fragen stellen. Letzte Woche habe ich Erdbeeren probiert, sie waren sehr süß. Auf dem Markt kaufe ich meistens regionales und saisonales Gemüse. Das ist gesund und gut für die Umwelt.

Aber der Markt ist meistens teurer als der Supermarkt. Deshalb kaufe ich im Supermarkt die anderen Dinge, die ich für die Woche brauche: Milch, Nudeln, Reis, Toilettenpapier und Getränke. Im Supermarkt ist die Auswahl sehr groß. 

Ein Nachteil vom Markt: Er findet nur zweimal in der Woche statt, meistens am Mittwoch und am Samstag. Der Supermarkt hat jeden Tag von Montag bis Samstag geöffnet, oft bis 20 Uhr oder 22 Uhr. Was mögen Sie lieber? Markt oder Supermarkt?`,
    vocabulary: [
      { word: 'der Wochenmarkt', translation: 'weekly market', context: 'gehe ich oft auf den Wochenmarkt' },
      { word: 'die Fußgängerzone', translation: 'pedestrian zone', context: 'Der Markt ist in der Fußgängerzone' },
      { word: 'der Stand', translation: 'stall, stand', context: 'viele kleine Stände' },
      { word: 'probieren', translation: 'to taste, to try', context: 'Man kann die Produkte probieren' },
      { word: 'saisonal', translation: 'seasonal', context: 'regionales und saisonales Gemüse' },
      { word: 'der Nachteil', translation: 'disadvantage', context: 'Ein Nachteil vom Markt' },
    ],
    comprehensionQuestions: [
      {
        question: 'Wo ist der Wochenmarkt?',
        options: ['Im Supermarkt', 'Am Bahnhof', 'In der Fußgängerzone', 'In der Schule'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Der Markt ist in der Fußgängerzone im Zentrum."',
      },
      {
        question: 'Was findet die Person auf dem Markt gut?',
        options: ['Er ist sehr billig', 'Man kann probieren', 'Er hat jeden Tag geöffnet', 'Er hat viel Toilettenpapier'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Man kann die Produkte probieren und Fragen stellen."',
      },
      {
        question: 'Warum kauft die Person nicht alles auf dem Markt?',
        options: ['Weil er teurer ist', 'Weil die Verkäufer unfreundlich sind', 'Weil es kein Obst gibt', 'Weil er zu weit weg ist'],
        correctAnswer: 0,
        explanation: 'Der Text sagt: "Aber der Markt ist meistens teurer als der Supermarkt."',
      },
      {
        question: 'Wann hat der Supermarkt normalerweise geöffnet?',
        options: ['Nur am Wochenende', 'Nur am Mittwoch und Samstag', 'Jeden Tag von Montag bis Samstag', 'Auch am Sonntag'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Der Supermarkt hat jeden Tag von Montag bis Samstag geöffnet."',
      },
    ],
    grammarFocus: [
      'Komparativ (teurer, lieber)',
      'Wechselpräpositionen mit Dativ (auf dem Markt, in der Fußgängerzone)',
      'Konjunktionen (deshalb, weil)',
      'Perfekt (habe probiert)',
    ],
    examTips: [
      'Lernen Sie die Vor- und Nachteile von Orten zu beschreiben',
      'Üben Sie Vergleiche: billiger, frischer, besser',
      'Benutzen Sie Konnektoren wie "deshalb" oder "darum" für Schlussfolgerungen',
    ],
    practicalTips: [
      'Auf dem Markt bezahlt man meistens bar. Nehmen Sie Bargeld mit!',
      'Bringen Sie Ihren eigenen Korb oder Taschen mit.',
      'Kurz vor Marktende gibt es oft Rabatte auf Obst und Gemüse.',
    ],
    culturalNotes: [
      'In Deutschland schätzt man regionales ("aus der Region") und Bio-Gemüse sehr.',
      'Sonntagsruhe: Alle normalen Geschäfte und Supermärkte haben am Sonntag geschlossen.',
      'Der Wochenmarkt ist oft auch ein sozialer Treffpunkt.',
    ],
    relatedMaterials: [
      'Menschen A2 - Modul 8: Einkaufen',
      'Netzwerk A2 - Kapitel 4: Konsum',
    ],
  },

  // B1: Umweltschutz im Alltag
  {
    id: 'b1-4',
    level: 'B1',
    title: 'Umweltschutz im Alltag',
    category: 'culture',
    difficulty: 'intermediate',
    estimatedTime: 25,
    text: `Der Klimawandel ist eine der größten Herausforderungen unserer Zeit. Viele Menschen in Deutschland fragen sich: Was kann ich persönlich im Alltag tun, um die Umwelt zu schützen? Die Antwort ist komplex, aber auch Kleinigkeiten können einen großen Unterschied machen.

Erstens spielt die Mobilität eine wichtige Rolle. Statt für jede kurze Strecke das Auto zu nehmen, steigen viele Menschen auf das Fahrrad oder den öffentlichen Nahverkehr um. Die Einführung des 49-Euro-Tickets hat viele dazu motiviert, mehr mit Bus und Bahn zu fahren. Wer auf das Auto nicht verzichten kann, versucht oft, Fahrgemeinschaften zu bilden.

Zweitens ist der Konsum entscheidend. Die Produktion von Fleisch verbraucht extrem viele Ressourcen wie Wasser und Land. Wenn man nur einmal pro Woche Fleisch isst oder sich vegetarisch ernährt, sinkt der persönliche CO2-Fußabdruck enorm. Auch beim Einkaufen kann man auf regionale und saisonale Produkte achten. Erdbeeren im Winter aus Spanien müssen nicht sein, wenn man stattdessen heimische Äpfel isst.

Ein drittes großes Thema ist Plastik. Deutschland produziert sehr viel Verpackungsmüll. Es ist sinnvoll, eigene Taschen zum Einkaufen mitzubringen und Gemüsenetze statt Plastiktüten zu verwenden. In vielen Städten gibt es mittlerweile "Unverpackt-Läden", in denen man Reis, Nudeln oder Shampoo in eigene Behälter füllen kann.

Zusätzlich sollte man auf Energie sparen achten. Das bedeutet zum Beispiel: Die Heizung ein paar Grad niedriger stellen, wenn man nicht im Zimmer ist, das Licht ausschalten und elektronische Geräte nicht im Stand-by-Modus lassen.

Wenn wir alle an einem Strang ziehen und kleine Veränderungen in unserem Leben akzeptieren, können wir gemeinsam einen positiven Einfluss auf den Planeten haben.`,
    vocabulary: [
      { word: 'der Klimawandel', translation: 'climate change', context: 'Der Klimawandel ist eine der größten Herausforderungen' },
      { word: 'die Kleinigkeit', translation: 'trifle, minor detail', context: 'auch Kleinigkeiten können einen großen Unterschied machen' },
      { word: 'verzichten auf', translation: 'to do without', context: 'Wer auf das Auto nicht verzichten kann' },
      { word: 'die Fahrgemeinschaft', translation: 'carpool', context: 'Fahrgemeinschaften zu bilden' },
      { word: 'der CO2-Fußabdruck', translation: 'carbon footprint', context: 'sinkt der persönliche CO2-Fußabdruck' },
      { word: 'an einem Strang ziehen', translation: 'to pull together, cooperate', context: 'Wenn wir alle an einem Strang ziehen' },
    ],
    comprehensionQuestions: [
      {
        question: 'Was ist eine Möglichkeit, die Umwelt beim Verkehr zu schonen?',
        options: ['Fahrgemeinschaften bilden', 'Mehr alleine mit dem Auto fahren', 'Mehr fliegen', 'Jeden Tag das Auto waschen'],
        correctAnswer: 0,
        explanation: 'Der Text sagt: "Wer auf das Auto nicht verzichten kann, versucht oft, Fahrgemeinschaften zu bilden."',
      },
      {
        question: 'Wie hilft eine vegetarische Ernährung der Umwelt?',
        options: ['Sie spart Verpackungen', 'Die Produktion von Fleisch verbraucht sehr viele Ressourcen', 'Gemüse wächst schneller im Winter', 'Es gibt keine Unverpackt-Läden für Fleisch'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Die Produktion von Fleisch verbraucht extrem viele Ressourcen"',
      },
      {
        question: 'Was kann man in "Unverpackt-Läden" tun?',
        options: ['Nur Gemüse kaufen', 'Kostenlos einkaufen', 'Lebensmittel in eigene Behälter füllen', 'Nur Dinge ohne Plastik zurückgeben'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "in denen man Reis, Nudeln oder Shampoo in eigene Behälter füllen kann."',
      },
      {
        question: 'Welcher Tipp zum Energiesparen wird im Text genannt?',
        options: ['Öfter warm baden', 'Geräte im Stand-by-Modus lassen', 'Licht immer brennen lassen', 'Heizung niedriger stellen, wenn man nicht da ist'],
        correctAnswer: 3,
        explanation: 'Der Text sagt: "Die Heizung ein paar Grad niedriger stellen, wenn man nicht im Zimmer ist"',
      },
    ],
    grammarFocus: [
      'Nebensätze mit "wenn", "um ... zu" und "dass"',
      'Relativsätze (Läden, in denen man...)',
      'Passiversatzformen (sich ernährt)',
      'Adjektivdeklinationen (kleine Veränderungen, einen großen Unterschied)',
    ],
    examTips: [
      'Umweltschutz ist ein Dauerbrenner in B1- und B2-Mündlich-Prüfungen.',
      'Üben Sie, Ratschläge zu geben: "Man sollte...", "Es wäre besser, wenn..."',
      'Prägen Sie sich feste Redewendungen ein (z.B. "an einem Strang ziehen").',
    ],
    practicalTips: [
      'In Deutschland ist der Gelbe Sack für Plastikverpackungen obligatorisch.',
      'Sammeln Sie Ihre Pfandflaschen extra und geben Sie diese im Supermarkt ab.',
      'Vermeiden Sie Coffee-to-go Becher, nutzen Sie Thermobecher.',
    ],
    culturalNotes: [
      'Das deutsche Pfandsystem ist weltweit eines der erfolgreichsten.',
      'Die grüne Politik (z.B. die Partei "Die Grünen") hat in Deutschland eine lange Tradition.',
      'Second-Hand-Kleidung (wie Vinted) ist sehr populär geworden.',
    ],
    relatedMaterials: [
      'Menschen B1 - Lektion 14: Umwelt',
      'Aspekte Neu B1+ - Kapitel 3',
    ],
  },

  // B2: Zukunft der Arbeit
  {
    id: 'b2-4',
    level: 'B2',
    title: 'Die Zukunft der Arbeit: Digitalisierung und Homeoffice',
    category: 'business',
    difficulty: 'advanced',
    estimatedTime: 35,
    text: `Die Arbeitswelt befindet sich in einem radikalen Umbruch. Seit der Pandemie hat das Homeoffice einen beispiellosen Siegeszug angetreten. Das traditionelle Konzept "Präsenzarbeit von 9 bis 17 Uhr" wird zunehmend hinterfragt, während die Digitalisierung neue Formen der Zusammenarbeit ermöglicht.

Ein zentraler Aspekt dieser Entwicklung ist die Flexibilisierung. Viele Unternehmen bieten mittlerweile hybride Modelle an, bei denen Mitarbeiter nur noch zwei bis drei Tage pro Woche ins Büro kommen. Die Vorteile liegen auf der Hand: Beschäftigte sparen sich die Pendelzeit, haben oft eine bessere Work-Life-Balance und können familiäre Pflichten leichter mit dem Beruf vereinbaren. Auf der Unternehmensseite können teure Büroflächen reduziert werden.

Doch es gibt auch Kehrseiten. Der Übergang zur virtuellen Arbeit führt bei manchen Menschen zur Entgrenzung von Arbeit und Freizeit. Wenn der Esstisch permanent zum Schreibtisch wird, fällt es schwerer, abends "abzuschalten". Zudem berichten viele Arbeitnehmer von einem Mangel an informellem Austausch. Die zufälligen Begegnungen an der Kaffeemaschine – oft eine Quelle für kreative Ideen und Teambindung – entfallen in der digitalen Welt fast vollständig.

Parallel zum Homeoffice verändert die Künstliche Intelligenz (KI) die Tätigkeitsfelder rasant. Routineaufgaben, sei es bei der Datenverarbeitung oder im Kundenservice, werden zunehmend automatisiert. Das weckt einerseits Ängste vor Arbeitsplatzverlusten, andererseits entstehen völlig neue Berufsbilder, wie beispielsweise "Prompt Engineers" oder KI-Ethikbeauftragte. 

Arbeitnehmer stehen folglich unter dem Druck des "lebenslangen Lernens". Um auf dem dynamischen Arbeitsmarkt wettbewerbsfähig zu bleiben, ist es unumgänglich, sich stetig fortzubilden. Soft Skills, wie emotionale Intelligenz, interkulturelle Kommunikation und Anpassungsfähigkeit, gewinnen im Vergleich zu reinem Faktenwissen enorm an Bedeutung. 

Die Zukunft der Arbeit wird demzufolge nicht mehr davon bestimmt sein, *wo* wir arbeiten, sondern *wie* wir mit neuen Technologien umgehen und ob wir fähig sind, in sich ständig wandelnden, dezentralen Teams effektiv zu kollaborieren.`,
    vocabulary: [
      { word: 'der Umbruch', translation: 'upheaval, radical change', context: 'befindet sich in einem radikalen Umbruch' },
      { word: 'beispiellos', translation: 'unprecedented', context: 'einen beispiellosen Siegeszug angetreten' },
      { word: 'die Entgrenzung', translation: 'dissolving of boundaries', context: 'zur Entgrenzung von Arbeit und Freizeit' },
      { word: 'der Mangel', translation: 'lack, shortage', context: 'von einem Mangel an informellem Austausch' },
      { word: 'unumgänglich', translation: 'inevitable, essential', context: 'ist es unumgänglich, sich stetig fortzubilden' },
      { word: 'die Anpassungsfähigkeit', translation: 'adaptability', context: 'Anpassungsfähigkeit gewinnen enorm an Bedeutung' },
    ],
    comprehensionQuestions: [
      {
        question: 'Was ist ein Hauptvorteil von hybriden Arbeitsmodellen für Arbeitnehmer?',
        options: ['Sie müssen mehr arbeiten', 'Sie sparen Pendelzeit und haben eine bessere Work-Life-Balance', 'Sie bekommen mehr Gehalt', 'Sie sehen ihre Kollegen häufiger'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Beschäftigte sparen sich die Pendelzeit, haben oft eine bessere Work-Life-Balance"',
      },
      {
        question: 'Was kritisieren manche Arbeitnehmer am Homeoffice?',
        options: ['Es ist zu teuer', 'Man kann die Arbeit schlechter von der Freizeit trennen (Entgrenzung)', 'Die Technik funktioniert nie', 'Man trinkt zu viel Kaffee'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Der Übergang zur virtuellen Arbeit führt bei manchen Menschen zur Entgrenzung von Arbeit und Freizeit."',
      },
      {
        question: 'Was wird im Text über Routineaufgaben gesagt?',
        options: ['Sie werden seltener automatisiert', 'Sie werden zunehmend durch Künstliche Intelligenz automatisiert', 'Sie werden an Praktikanten abgegeben', 'Sie sind nicht mehr wichtig'],
        correctAnswer: 1,
        explanation: 'Der Text sagt: "Routineaufgaben... werden zunehmend automatisiert."',
      },
      {
        question: 'Welche Fähigkeiten werden in der Zukunft immer wichtiger?',
        options: ['Routineaufgaben', 'Reines Faktenwissen', 'Handwerkliche Fähigkeiten', 'Soft Skills wie emotionale Intelligenz'],
        correctAnswer: 3,
        explanation: 'Der Text sagt: "Soft Skills, wie emotionale Intelligenz... gewinnen im Vergleich zu reinem Faktenwissen enorm an Bedeutung."',
      },
    ],
    grammarFocus: [
      'Verweiswörter / Pronomen (bei denen, dies, das weckt)',
      'Passiv mit Modalverben (können reduziert werden, werden automatisiert)',
      'Nomen-Verb-Verbindungen (einen Siegeszug antreten, Bedeutung gewinnen)',
      'Infinitivkonstruktionen (um... zu bleiben, sich fortzubilden)',
    ],
    examTips: [
      'Die Arbeitswelt ist ein Kernthema auf dem C1 und B2 Level.',
      'Verwenden Sie stilvolle Nomen-Verb-Verbindungen (z.B. "Druck ausüben", "Rücksicht nehmen").',
      'Strukturieren Sie Ihre Argumentation klar: Einleitung, Pro, Contra, Synthese.',
    ],
    practicalTips: [
      'Recht auf Homeoffice: Dieses Gesetz wird in Deutschland oft diskutiert.',
      'Informieren Sie sich über Arbeitszeitgesetze (Ruhezeit mindestens 11 Stunden in Deutschland!).',
      'Netzwerke (wie LinkedIn oder XING) sind extrem wichtig für die Berufswelt.',
    ],
    culturalNotes: [
      'In Deutschland gibt es starre Gesetze im Home-Office bezüglich Datenschutz und Arbeitsschutz (Ergonomie des Schreibtischs!).',
      'Das Trennen von Beruf und Privatleben galt früher in DE als heilig.',
    ],
    relatedMaterials: [
      'Aspekte Neu B2 - Kapitel 4: Arbeitswelt',
      'Erkundungen B2 - Arbeit und Beruf',
    ],
  },

  // C1: Demografischer Wandel
  {
    id: 'c1-2',
    level: 'C1',
    title: 'Der demografische Wandel in Deutschland und seine ökonomischen Auswirkungen',
    category: 'culture',
    difficulty: 'advanced',
    estimatedTime: 50,
    text: `Die Bundesrepublik Deutschland sieht sich mit einer tiefgreifenden demografischen Transformation konfrontiert, deren sozioökonomische Tragweite in der öffentlichen Debatte oft unterschätzt wird. Der viel zitierte „demografische Wandel“ stützt sich im Kern auf zwei wesentliche Säulen: eine anhaltend niedrige Geburtenrate (Fertilität) von durchschnittlich 1,5 Kindern pro Frau und eine kontinuierlich steigende Lebenserwartung (Mortalitätsrückgang). Die Verschmelzung dieser beiden Faktoren führt unweigerlich zu einer Überalterung der Gesellschaft.
    
Aus ökonomischer Perspektive birgt diese Entwicklung weitreichende Konsequenzen. An vorderster Front steht der drohende und in zahlreichen Branchen bereits akute Fachkräftemangel. Wenn ab etwa 2025 die geburtenstarken Jahrgänge, die sogenannten „Babyboomer“, massenhaft in den vorzeitigen oder regulären Ruhestand eintreten, schrumpft das Erwerbspersonenpotenzial drastisch. Dies drosselt nicht nur das Wirtschaftswachstum, da das Arbeitsvolumen abnimmt, sondern verschiebt auch das Kräfteverhältnis auf dem Arbeitsmarkt zugunsten der Arbeitnehmer. Unternehmen müssen zunehmend attraktive Rahmenbedingungen schaffen, um Talente anzwerben ("War for Talents").

Eng verknüpft mit dem Fachkräftemangel ist die Belastungsprobe für das umlagefinanzierte Sozialversicherungssystem. Der Generationenvertrag, bei dem die aktiv arbeitende Bevölkerung durch ihre Beiträge die Renten der aktuellen Pensionäre finanziert, stößt an seine mathematischen Grenzen. Wurden früher die Rentenbeiträge auf viele Schultern verteilt, stehen künftig immer weniger Beitragszahler einer stetig wachsenden Zahl von Leistungsempfängern gegenüber. Um einen Kollaps der Alterssicherungsobjektive abzuwenden, bleiben prinzipiell nur drei unpopuläre politische Stellschrauben: die Erhöhung des Renteneintrittsalters, die Kürzung des Rentenniveaus oder die Steigerung der Beitragssätze. Alternativ drängen Experten auf eine stärkere Kapitaldeckung, etwa durch die Implementierung eines verpflichtenden, aktiengestützten Staatsfonds.

Darüber hinaus verändert die Überalterung die Struktur der gesamtwirtschaftlichen Nachfrage ("Silver Economy"). Sektoren wie das Gesundheitswesen, die Pflege, barrierefreies Wohnen oder der Senioren-Tourismus verzeichnen enorme Zuwachsraten. Doch gerade im Pflegesektor offenbart sich eine fatale Wechselwirkung: Das wachsende Bedürfnis nach Pflegekräften trifft auf den bereits erwähnten generellen Nachwuchsmangel.

Um die gravierendsten wirtschaftlichen Spätfolgen abzufedern, bedarf es eines Bündels an Makro-Strategien. Als zentrales Element gilt die gezielte Migration von qualifizierten Fachkräften aus dem Ausland. Dies erfordert jedoch nicht nur eine Beschleunigung bürokratischer Visaprozesse, sondern auch den Aufbau einer authentischen Willkommenskultur und die reibungslose Integration der Zuwanderer in den Arbeitsmarkt. Des Weiteren muss die Erwerbsquote von Frauen – etwa durch flächendeckende Ganztagsbetreuung – sowie von Älteren weiter gesteigert werden. Letztlich ruht die Hoffnung auch auf Digitalisierung und Automatisierung (KI), die durch signifikante Produktivitätssteigerungen den Rückgang des Arbeitsvolumens partiell kompensieren könnten.`,
    vocabulary: [
      { word: 'tiefgreifend', translation: 'profound, radical', context: 'mit einer tiefgreifenden demografischen Transformation' },
      { word: 'unweigerlich', translation: 'inevitably', context: 'führt unweigerlich zu einer Überalterung' },
      { word: 'die Tragweite', translation: 'implication, far-reaching importance', context: 'deren sozioökonomische Tragweite' },
      { word: 'drosseln', translation: 'to curtail, to throttle, to slow down', context: 'Dies drosselt nicht nur das Wirtschaftswachstum' },
      { word: 'abwenden', translation: 'to avert', context: 'Um einen Kollaps ... abzuwenden' },
      { word: 'abfedern', translation: 'to cushion, mitigate', context: 'Um die gravierendsten wirtschaftlichen Spätfolgen abzufedern' },
      { word: 'die Stellschraube', translation: 'adjusting screw (fig. policy lever)', context: 'drei unpopuläre politische Stellschrauben' },
    ],
    comprehensionQuestions: [
      {
        question: 'Was sind die zwei Hauptfaktoren, die den demografischen Wandel verursachen?',
        options: ['Niedrige Geburtenrate und steigende Lebenserwartung', 'Hohe Arbeitslosigkeit und Inflation', 'Viel Migration und KI', 'Viele Geburten und weniger Krankheiten'],
        correctAnswer: 0,
        explanation: 'Der Text erwähnt "zwei wesentliche Säulen: eine anhaltend niedrige Geburtenrate [...] und eine kontinuierlich steigende Lebenserwartung".',
      },
      {
        question: 'Warum steht das Rentensystem unter Druck?',
        options: ['Weil die Aktienkurse fallen', 'Weil das Rentenalter zu niedrig ist', 'Weil immer weniger Beitragszahler eine wachsende Zahl von Rentnern finanzieren müssen', 'Weil der Staat das Geld für Subventionen ausgibt'],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "stehen künftig immer weniger Beitragszahler einer stetig wachsenden Zahl von Leistungsempfängern gegenüber."',
      },
      {
        question: 'Was ist eine mögliche kurz- bis mittelfristige Lösung für den Fachkräftemangel?',
        options: ['Alle Universitäten schließen', 'Die gezielte Migration von qualifizierten Fachkräften aus dem Ausland', 'Das Rentensystem abschaffen', 'Die Arbeitszeit drastisch reduzieren'],
        correctAnswer: 1,
        explanation: 'Der Text nennt als eine Lösung: "Als zentrales Element gilt die gezielte Migration von qualifizierten Fachkräften aus dem Ausland."',
      },
      {
        question: 'Was versteht man im Text unter der "Silver Economy"?',
        options: ['Eine Wirtschaft ohne Inflation', 'Der Handel mit Silber', 'Branchen, die durch Senioren wachsen (z.B. Gesundheitswesen)', 'Eine Form der Kapitaldeckung'],
        correctAnswer: 2,
        explanation: 'Der Text benennt die wachsende Nachfrage bei Senioren als Silver Economy: Sektoren wie das Gesundheitswesen, die Pflege, barrierefreies Wohnen...',
      },
    ],
    grammarFocus: [
      'Erweiterte Partizipialattribute (die in zahlreichen Branchen bereits akute Situation)',
      'Konjunktiv II als hypothetische Bedingung oder Vorschlag',
      'Funktionsverbgefüge (unter Druck stehen, an seine Grenzen stoßen)',
      'Präpositionen mit Genitiv (zugunsten, hinsichtlich, bedarf es eines Bündels)',
    ],
    examTips: [
      'C1-Prüfungen verlangen akademisches Vokabular und den Umgang mit komplexem Satzbau.',
      'Lernen Sie Synonyme für alltägliche Wörter ("Drosselung" statt "Verkürzung", "abfedern" statt "schützen").',
      'Können Sie die demografischen Probleme und deren Gegenmaßnahmen (Migration, KI, längeres Arbeiten) stichhaltig diskutieren?',
    ],
    practicalTips: [
      'In Deutschland wird viel über Zuwanderung diskutiert, gerade wegen des massiven Personalmangels (z.B. in der IT oder in Krankenhäusern).',
      'Das sogenannte "Fachkräfteeinwanderungsgesetz" wurde kürzlich gelockert.',
      'Unternehmen investieren aktiv in "Employer Branding", um Fachkräfte anzuziehen.',
    ],
    culturalNotes: [
      'Die Generation der Babyboomer (geboren zwischen ca. 1955 und 1969) prägt die deutsche Arbeits- und Rentenpolitik extrem.',
      'Senioren in DE sind heutzutage oft sehr aktiv ("Silver Surfer") und finanzstark.',
    ],
    relatedMaterials: [
      'Aspekte Neu C1 - Kapitel Wirtschaft',
      'Erkundungen C1 - Demografie und Gesellschaft',
    ],
  },
];

// Transform the data to match the Reading component's expected structure
export const READING_PASSAGES = readingMaterials.map(material => ({
  id: material.id,
  level: material.level,
  title: material.title,
  category: material.category === 'daily-life' ? 'Working & Living' :
    material.category === 'work' ? 'Working & Living' :
      material.category === 'business' ? 'Working & Living' :
        material.category === 'practical-documents' ? 'Working & Living' :
          'Exam Practice',
  content: material.text,
  readingTimeMin: material.estimatedTime,
  questions: material.comprehensionQuestions.map((q, index) => ({
    id: `${material.id}-q${index + 1}`,
    type: 'multipleChoice' as const,
    prompt: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  })),
  vocabulary: material.vocabulary,
  grammarFocus: material.grammarFocus,
  examTips: material.examTips,
  practicalTips: material.practicalTips,
  culturalNotes: material.culturalNotes,
  relatedMaterials: material.relatedMaterials,
}));

export default readingMaterials;
