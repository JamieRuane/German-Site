export type WritingKind = 'essay' | 'formal-email' | 'forum'

export type RedemittelGroup = {
  label: string
  phrases: string[]
}

export type WritingPrompt = {
  id: string
  kind: WritingKind
  kindLabel: string
  title: string
  situation: string
  points: string[]
  minWords: number
  maxWords: number
  minutes: number
  redemittel: RedemittelGroup[]
  modelAnswer: string
}

const argumentRedemittel: RedemittelGroup[] = [
  {
    label: 'Einleitung',
    phrases: [
      'In den letzten Jahren wird zunehmend darüber diskutiert, ob …',
      'Die Frage, ob …, ist umstritten.',
      'Im Folgenden möchte ich die Vor- und Nachteile abwägen.',
    ],
  },
  {
    label: 'Argumentieren',
    phrases: [
      'Für … spricht vor allem, dass …',
      'Ein weiteres Argument ist, dass …',
      'Es lässt sich nicht leugnen, dass …',
      'Darüber hinaus …',
    ],
  },
  {
    label: 'Gegenargument',
    phrases: [
      'Dem ist entgegenzuhalten, dass …',
      'Kritiker wenden jedoch ein, dass …',
      'Andererseits darf man nicht außer Acht lassen, dass …',
      'Zwar …, aber …',
    ],
  },
  {
    label: 'Beispiel',
    phrases: [
      'Dies zeigt sich beispielsweise an …',
      'Ein gutes Beispiel dafür ist …',
    ],
  },
  {
    label: 'Schluss',
    phrases: [
      'Zusammenfassend lässt sich sagen, dass …',
      'Meines Erachtens überwiegen die Vorteile, weil …',
      'Abschließend möchte ich betonen, dass …',
    ],
  },
]

export const writingPrompts: WritingPrompt[] = [
  {
    id: 'autofreie-innenstadt',
    kind: 'essay',
    kindLabel: 'Erörterung',
    title: 'Autofreie Innenstädte?',
    situation:
      'Ihre Stadt diskutiert, den privaten Autoverkehr aus der Innenstadt zu verbannen. Schreiben Sie einen Text für die Lokalzeitung, in dem Sie Stellung nehmen.',
    points: [
      'Nennen Sie Gründe, die für autofreie Innenstädte sprechen.',
      'Gehen Sie auf mögliche Nachteile ein, z. B. für den Handel oder Menschen mit eingeschränkter Mobilität.',
      'Beschreiben Sie die Situation in Ihrem Heimatland.',
      'Formulieren Sie Ihre eigene Meinung und begründen Sie sie.',
    ],
    minWords: 200,
    maxWords: 260,
    minutes: 30,
    redemittel: argumentRedemittel,
    modelAnswer: `In den letzten Jahren wird in vielen Städten zunehmend darüber diskutiert, ob private Autos aus den Innenstädten verbannt werden sollten. Im Folgenden möchte ich die wichtigsten Argumente abwägen.

Für autofreie Innenstädte spricht vor allem die Verbesserung der Lebensqualität. Weniger Lärm und saubere Luft kommen nicht nur den Anwohnern, sondern auch Besuchern zugute. Darüber hinaus entsteht Platz für Grünflächen, Radwege und Cafés, wodurch öffentliche Räume wieder zu Orten der Begegnung werden.

Dem ist jedoch entgegenzuhalten, dass der Einzelhandel Umsatzeinbußen befürchtet, falls Kundinnen und Kunden nicht mehr mit dem Auto anreisen können. Zudem darf man nicht außer Acht lassen, dass ältere Menschen oder Menschen mit eingeschränkter Mobilität auf das Auto angewiesen sein können. Ohne gut ausgebaute Alternativen würde man sie vom städtischen Leben ausschließen.

In meinem Heimatland ist die Situation gemischt: Während einige Städte bereits Fußgängerzonen erfolgreich erweitert haben, gilt das Auto andernorts nach wie vor als unverzichtbar. Vor allem auf dem Land fehlt es häufig an verlässlichen Bus- und Bahnverbindungen.

Meines Erachtens überwiegen die Vorteile, sofern die Umstellung schrittweise erfolgt. Entscheidend ist, dass der öffentliche Nahverkehr zuvor ausgebaut wird und Ausnahmen für Lieferverkehr sowie für Menschen mit Behinderung gelten. Zusammenfassend lässt sich sagen, dass autofreie Innenstädte eine große Chance darstellen – vorausgesetzt, niemand wird dabei zurückgelassen.`,
  },
  {
    id: 'beschwerde-sprachkurs',
    kind: 'formal-email',
    kindLabel: 'Formelle E-Mail',
    title: 'Beschwerde an eine Sprachschule',
    situation:
      'Sie haben einen Intensivkurs (C1) an einer Sprachschule gebucht. Leider entsprach der Kurs nicht der Beschreibung. Schreiben Sie eine E-Mail an die Kursleitung.',
    points: [
      'Beziehen Sie sich auf Ihre Buchung.',
      'Beschreiben Sie, was nicht der Kursbeschreibung entsprach.',
      'Erklären Sie, welche Folgen das für Sie hatte.',
      'Formulieren Sie eine konkrete Forderung.',
    ],
    minWords: 120,
    maxWords: 170,
    minutes: 20,
    redemittel: [
      {
        label: 'Anrede & Bezug',
        phrases: [
          'Sehr geehrte Damen und Herren,',
          'Sehr geehrte Frau …,',
          'ich nehme Bezug auf meine Buchung vom …',
          'ich wende mich an Sie, weil …',
        ],
      },
      {
        label: 'Problem schildern',
        phrases: [
          'Laut Kursbeschreibung sollte …, tatsächlich jedoch …',
          'Zu meinem Bedauern musste ich feststellen, dass …',
          'Dies hatte zur Folge, dass …',
        ],
      },
      {
        label: 'Forderung',
        phrases: [
          'Ich bitte Sie daher, mir … zu erstatten.',
          'Ich erwarte, dass …',
          'Ich wäre Ihnen dankbar, wenn Sie …',
        ],
      },
      {
        label: 'Schluss',
        phrases: [
          'Ich sehe Ihrer Antwort mit Interesse entgegen.',
          'Für Rückfragen stehe ich Ihnen gern zur Verfügung.',
          'Mit freundlichen Grüßen',
        ],
      },
    ],
    modelAnswer: `Sehr geehrte Damen und Herren,

ich nehme Bezug auf meine Buchung des C1-Intensivkurses vom 4. bis 29. August. Zu meinem Bedauern muss ich Ihnen mitteilen, dass der Kurs in mehreren Punkten nicht der Beschreibung entsprach.

Laut Ihrer Website sollten höchstens zwölf Personen teilnehmen, tatsächlich waren wir jedoch zwanzig. Außerdem wurde die angekündigte Prüfungsvorbereitung ersatzlos gestrichen. Dies hatte zur Folge, dass ich kaum Gelegenheit zum Sprechen hatte und mich nun zusätzlich privat auf die Prüfung vorbereiten muss.

Ich bitte Sie daher, mir mindestens 30 Prozent der Kursgebühr zu erstatten. Alternativ wäre ich auch mit einem kostenlosen Prüfungstraining einverstanden.

Ich sehe Ihrer Antwort mit Interesse entgegen.

Mit freundlichen Grüßen
Alex Beispiel`,
  },
  {
    id: 'forum-homeoffice',
    kind: 'forum',
    kindLabel: 'Forumsbeitrag',
    title: 'Homeoffice: Recht oder Privileg?',
    situation:
      'In einem Online-Forum wird gefragt: „Sollte es ein gesetzliches Recht auf Homeoffice geben?“ Schreiben Sie einen Beitrag.',
    points: [
      'Äußern Sie Ihre Meinung zu einem Recht auf Homeoffice.',
      'Gehen Sie auf mindestens ein Gegenargument ein.',
      'Berichten Sie kurz von eigenen Erfahrungen oder Beobachtungen.',
    ],
    minWords: 150,
    maxWords: 200,
    minutes: 25,
    redemittel: argumentRedemittel,
    modelAnswer: `Die Frage, ob es ein gesetzliches Recht auf Homeoffice geben sollte, beschäftigt mich schon länger. Meines Erachtens wäre ein solches Recht sinnvoll – allerdings nur mit klaren Grenzen.

Für ein Recht auf Homeoffice spricht vor allem die bessere Vereinbarkeit von Beruf und Familie. Wer nicht täglich pendeln muss, gewinnt Zeit und ist oft sogar konzentrierter. Darüber hinaus profitieren auch Umwelt und Verkehr, wenn weniger Menschen zur Rushhour unterwegs sind.

Kritiker wenden jedoch ein, dass nicht jede Tätigkeit von zu Hause aus erledigt werden kann und ein Gesetz Betriebe überfordern könnte. Dieses Argument ist durchaus berechtigt. Deshalb sollte das Recht nur dort gelten, wo die Arbeit es zulässt.

In meinem Team arbeiten wir seit zwei Jahren hybrid. Zwar fehlt manchmal der spontane Austausch, aber feste Bürotage gleichen das gut aus.

Zusammenfassend lässt sich sagen, dass ein flexibles Recht auf Homeoffice beiden Seiten nutzen würde.`,
  },
]
