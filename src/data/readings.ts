import type { VocabItem } from './vocabulary'

export type Question = {
  id: string
  /** Statement or question shown to the learner. */
  prompt: string
  options: string[]
  /** Index into `options` of the correct answer. */
  answer: number
  explanation: string
}

export type Reading = {
  id: string
  title: string
  topic: string
  minutes: number
  teaser: string
  /**
   * Paragraphs of the text. Glossed words use the markup
   * `[[surface form|glossId]]`, where glossId refers to an entry in `glossary`.
   */
  paragraphs: string[]
  glossary: VocabItem[]
  questions: Question[]
  /** Writing prompt that continues the topic, if any. */
  writingPromptId?: string
}

/** Options shared by the Goethe/telc-style "richtig / falsch / nicht im Text" items. */
export const TRUE_FALSE_NOT_GIVEN = ['Richtig', 'Falsch', 'Steht nicht im Text']

export const readings: Reading[] = [
  {
    id: 'wem-gehoert-die-stadt',
    title: 'Wem gehört die Stadt?',
    topic: 'Stadtleben · Gesellschaft',
    minutes: 12,
    teaser:
      'How rising rents, local initiatives and gentrification are reshaping who gets to live in the city.',
    paragraphs: [
      'In vielen deutschen Großstädten ist der Wohnungsmarkt längst zum [[Politikum|politikum]] geworden. [[Angesichts|angesichts-r]] rasant steigender Mieten [[sehen sich|sich-gezwungen-sehen]] Familien mit mittlerem Einkommen zunehmend [[gezwungen|sich-gezwungen-sehen]], an den Stadtrand zu ziehen. Was früher als Ausnahme galt, ist heute vielerorts die Regel: Wer in der Innenstadt eine bezahlbare Wohnung sucht, braucht nicht nur Geduld, sondern auch Glück.',
      'Kritiker sprechen in diesem Zusammenhang von Gentrifizierung. Gemeint ist ein Prozess, bei dem einkommensschwache Bewohnerinnen und Bewohner durch zahlungskräftigere Zuzügler [[verdrängt|verdraengen]] werden. Sanierte Altbauten, schicke Cafés und neue Galerien [[werten|aufwerten]] ein Viertel zwar [[auf|aufwerten]], verändern aber zugleich dessen Charakter. [[Alteingesessene|alteingesessen]] Geschäfte müssen schließen, weil sie die gestiegenen Gewerbemieten nicht mehr [[aufbringen|aufbringen]] können.',
      'Befürworter der Entwicklung [[halten|entgegenhalten]] dem [[entgegen|entgegenhalten]], dass Investitionen auch Vorteile mit sich bringen: [[Leerstand|leerstand]] wird beseitigt, die Infrastruktur verbessert, und die Kriminalitätsrate sinkt häufig. [[Ausschlaggebend|ausschlaggebend-r]] sei letztlich, ob es gelinge, den Wandel [[sozialverträglich|sozialvertraeglich]] zu gestalten.',
      'Genau hier [[setzen|ansetzen]] zahlreiche Initiativen [[an|ansetzen]]. In Berlin etwa stimmte 2021 eine Mehrheit per Volksentscheid dafür, große Wohnungskonzerne zu [[vergesellschaften|vergesellschaften]] – ein Votum, das bundesweit eine heftige Debatte [[angestoßen|debatte-anstossen-r]] hat. Andere Städte setzen auf weniger drastische Instrumente: Milieuschutzgebiete sollen Luxussanierungen erschweren, und Genossenschaften bieten Wohnraum an, der dauerhaft dem spekulativen Markt [[entzogen|entziehen]] ist.',
      'Ob diese Maßnahmen ausreichen, ist [[umstritten|umstritten]]. Unbestritten ist hingegen, dass die Frage, wem die Stadt gehört, weit über den Wohnungsmarkt hinausreicht. Es geht um öffentliche Räume, um [[Teilhabe|teilhabe]] und letztlich darum, wie wir zusammenleben wollen.',
    ],
    glossary: [
      {
        id: 'politikum',
        phrase: 'das Politikum',
        meaning: 'a political issue, a hot political topic',
        sentence: 'Der Wohnungsmarkt ist längst zum ___ geworden.',
        answers: ['Politikum'],
        category: 'Lesewortschatz',
      },
      {
        id: 'angesichts-r',
        phrase: 'angesichts (+ Gen.)',
        meaning: 'in view of, given',
        sentence: '___ rasant steigender Mieten ziehen viele an den Stadtrand.',
        answers: ['Angesichts'],
        category: 'Lesewortschatz',
      },
      {
        id: 'sich-gezwungen-sehen',
        phrase: 'sich gezwungen sehen, etwas zu tun',
        meaning: 'to feel compelled to do something',
        sentence: 'Viele Familien sehen sich ___, an den Stadtrand zu ziehen.',
        answers: ['gezwungen'],
        category: 'Lesewortschatz',
      },
      {
        id: 'verdraengen',
        phrase: 'verdrängen',
        meaning: 'to displace, to push out',
        sentence: 'Einkommensschwache Bewohner werden aus dem Viertel ___.',
        answers: ['verdrängt', 'verdraengt'],
        category: 'Lesewortschatz',
      },
      {
        id: 'aufwerten',
        phrase: 'aufwerten',
        meaning: 'to upgrade, to increase the value of',
        sentence: 'Neue Cafés und Galerien werten ein Viertel ___.',
        answers: ['auf'],
        category: 'Lesewortschatz',
      },
      {
        id: 'alteingesessen',
        phrase: 'alteingesessen',
        meaning: 'long-established',
        sentence: '___ Geschäfte müssen schließen.',
        answers: ['Alteingesessene'],
        category: 'Lesewortschatz',
      },
      {
        id: 'aufbringen',
        phrase: 'Geld aufbringen',
        meaning: 'to raise / come up with (money)',
        sentence: 'Sie können die höheren Mieten nicht mehr ___.',
        answers: ['aufbringen'],
        category: 'Lesewortschatz',
      },
      {
        id: 'entgegenhalten',
        phrase: 'jemandem etwas entgegenhalten',
        meaning: 'to counter (an argument) with something',
        sentence: 'Befürworter halten dem ___, dass Investitionen Vorteile bringen.',
        answers: ['entgegen'],
        category: 'Lesewortschatz',
      },
      {
        id: 'leerstand',
        phrase: 'der Leerstand',
        meaning: 'vacancy (empty buildings or flats)',
        sentence: 'Durch Investitionen wird ___ beseitigt.',
        answers: ['Leerstand'],
        category: 'Lesewortschatz',
      },
      {
        id: 'ausschlaggebend-r',
        phrase: 'ausschlaggebend',
        meaning: 'decisive',
        sentence: '___ ist, ob der Wandel sozialverträglich gelingt.',
        answers: ['Ausschlaggebend'],
        category: 'Lesewortschatz',
      },
      {
        id: 'sozialvertraeglich',
        phrase: 'sozialverträglich',
        meaning: 'socially acceptable, without hurting vulnerable groups',
        sentence: 'Der Wandel muss ___ gestaltet werden.',
        answers: ['sozialverträglich', 'sozialvertraeglich'],
        category: 'Lesewortschatz',
      },
      {
        id: 'ansetzen',
        phrase: 'ansetzen (bei / hier)',
        meaning: 'to start, to tackle a problem at a certain point',
        sentence: 'Genau hier setzen zahlreiche Initiativen ___.',
        answers: ['an'],
        category: 'Lesewortschatz',
      },
      {
        id: 'vergesellschaften',
        phrase: 'vergesellschaften',
        meaning: 'to socialise, to transfer into public ownership',
        sentence: 'Die Initiative will große Wohnungskonzerne ___.',
        answers: ['vergesellschaften'],
        category: 'Lesewortschatz',
      },
      {
        id: 'debatte-anstossen-r',
        phrase: 'eine Debatte anstoßen',
        meaning: 'to spark a debate',
        sentence: 'Das Votum hat eine heftige Debatte ___.',
        answers: ['angestoßen', 'angestossen'],
        category: 'Lesewortschatz',
      },
      {
        id: 'entziehen',
        phrase: 'etwas einer Sache entziehen',
        meaning: 'to withdraw / remove something from something',
        sentence: 'Der Wohnraum ist dauerhaft dem spekulativen Markt ___.',
        answers: ['entzogen'],
        category: 'Lesewortschatz',
      },
      {
        id: 'umstritten',
        phrase: 'umstritten',
        meaning: 'controversial, disputed',
        sentence: 'Ob diese Maßnahmen ausreichen, ist ___.',
        answers: ['umstritten'],
        category: 'Lesewortschatz',
      },
      {
        id: 'teilhabe',
        phrase: 'die Teilhabe (an + Dat.)',
        meaning: 'participation, having a share in',
        sentence: 'Es geht um öffentliche Räume und um ___.',
        answers: ['Teilhabe'],
        category: 'Lesewortschatz',
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt:
          'Familien mit mittlerem Einkommen ziehen heute häufig an den Stadtrand.',
        options: TRUE_FALSE_NOT_GIVEN,
        answer: 0,
        explanation:
          '„… sehen sich Familien mit mittlerem Einkommen zunehmend gezwungen, an den Stadtrand zu ziehen.“',
      },
      {
        id: 'q2',
        prompt: 'Was ist mit „Gentrifizierung“ gemeint?',
        options: [
          'Ärmere Bewohner werden durch wohlhabendere Zuzügler verdrängt.',
          'Leer stehende Gebäude werden abgerissen.',
          'Die Stadt kauft Wohnungen von privaten Konzernen.',
        ],
        answer: 0,
        explanation:
          'Der Text definiert es als Prozess, bei dem „einkommensschwache Bewohner … durch zahlungskräftigere Zuzügler verdrängt werden“.',
      },
      {
        id: 'q3',
        prompt: 'Laut den Befürwortern steigen durch Investitionen die Kriminalitätsraten.',
        options: TRUE_FALSE_NOT_GIVEN,
        answer: 1,
        explanation:
          'Das Gegenteil steht im Text: „die Kriminalitätsrate sinkt häufig“.',
      },
      {
        id: 'q4',
        prompt: 'Die Berliner Wohnungskonzerne wurden nach dem Volksentscheid sofort enteignet.',
        options: TRUE_FALSE_NOT_GIVEN,
        answer: 2,
        explanation:
          'Der Text nennt nur das Ergebnis der Abstimmung und die Debatte — nicht, was danach umgesetzt wurde. Achtung: Weltwissen zählt hier nicht.',
      },
      {
        id: 'q5',
        prompt: 'Welche Aussage fasst den Schluss des Textes am besten zusammen?',
        options: [
          'Genossenschaften sind die einzige wirksame Lösung.',
          'Die Frage betrifft nicht nur Wohnungen, sondern das Zusammenleben insgesamt.',
          'Der Wohnungsmarkt wird sich in Zukunft von selbst regulieren.',
        ],
        answer: 1,
        explanation:
          '„… dass die Frage, wem die Stadt gehört, weit über den Wohnungsmarkt hinausreicht … wie wir zusammenleben wollen.“',
      },
    ],
    writingPromptId: 'autofreie-innenstadt',
  },
  {
    id: 'arbeiten-wo-man-will',
    title: 'Arbeiten, wo man will?',
    topic: 'Arbeitswelt · Digitalisierung',
    minutes: 10,
    teaser:
      'Remote work after the pandemic: why employers want people back and what employees stand to lose.',
    paragraphs: [
      'Seit der Pandemie ist das Homeoffice aus dem Arbeitsalltag vieler Beschäftigter [[nicht mehr wegzudenken|nicht-wegzudenken]]. Was zunächst als [[Notlösung|notloesung]] gedacht war, hat sich in zahlreichen Branchen als dauerhaftes Modell etabliert. Inzwischen [[ringen|ringen-um]] jedoch immer mehr Unternehmen darum, ihre [[Belegschaft|belegschaft]] zurück ins Büro zu holen.',
      'Die Argumente der Arbeitgeber liegen auf der Hand: Spontaner Austausch, so heißt es, lasse sich am Bildschirm kaum ersetzen. Zudem leide die Bindung neuer Mitarbeitender an das Unternehmen, wenn sie ihre Kolleginnen und Kollegen nur als [[Kacheln|kachel]] in Videokonferenzen kennen.',
      'Beschäftigte hingegen schätzen vor allem die gewonnene Zeit. Wer nicht täglich [[pendeln|pendeln]] muss, spart nicht selten zehn Stunden pro Woche – Zeit, die für Familie, Erholung oder Weiterbildung zur Verfügung steht. Studien deuten zudem darauf hin, dass die Produktivität im Homeoffice keineswegs sinkt, sofern klare [[Absprachen|absprache]] bestehen.',
      'Allerdings [[birgt|bergen]] die neue Freiheit auch Risiken. Die Grenze zwischen Beruf und Privatleben [[verschwimmt|verschwimmen]], und manche fühlen sich verpflichtet, ständig erreichbar zu sein. Arbeitspsychologen [[plädieren|plaedieren]] daher für hybride Modelle, die die [[Vorzüge|vorzug]] beider Welten miteinander verbinden. Ausschlaggebend sei, dass Teams gemeinsam Regeln [[aushandeln|aushandeln]], statt sie von oben [[verordnet|verordnen]] zu bekommen.',
    ],
    glossary: [
      {
        id: 'nicht-wegzudenken',
        phrase: 'nicht (mehr) wegzudenken sein',
        meaning: 'to be indispensable, impossible to imagine without',
        sentence: 'Das Homeoffice ist aus dem Alltag nicht mehr ___.',
        answers: ['wegzudenken'],
        category: 'Lesewortschatz',
      },
      {
        id: 'notloesung',
        phrase: 'die Notlösung',
        meaning: 'a stopgap, emergency solution',
        sentence: 'Was als ___ gedacht war, wurde zum Dauermodell.',
        answers: ['Notlösung', 'Notloesung'],
        category: 'Lesewortschatz',
      },
      {
        id: 'ringen-um',
        phrase: 'ringen um (+ Akk.) / darum ringen, etwas zu tun',
        meaning: 'to struggle for, to wrestle with',
        sentence: 'Unternehmen ___ darum, ihre Leute zurückzuholen.',
        answers: ['ringen'],
        category: 'Lesewortschatz',
      },
      {
        id: 'belegschaft',
        phrase: 'die Belegschaft',
        meaning: 'the workforce, staff',
        sentence: 'Die ___ soll zurück ins Büro.',
        answers: ['Belegschaft'],
        category: 'Lesewortschatz',
      },
      {
        id: 'kachel',
        phrase: 'die Kachel',
        meaning: 'a tile (here: a video tile in a call)',
        sentence: 'Man kennt die Kollegen nur als ___ in Videokonferenzen.',
        answers: ['Kacheln'],
        category: 'Lesewortschatz',
      },
      {
        id: 'pendeln',
        phrase: 'pendeln',
        meaning: 'to commute',
        sentence: 'Wer nicht täglich ___ muss, spart viel Zeit.',
        answers: ['pendeln'],
        category: 'Lesewortschatz',
      },
      {
        id: 'absprache',
        phrase: 'die Absprache',
        meaning: 'an agreement, arrangement',
        sentence: 'Die Produktivität sinkt nicht, sofern klare ___ bestehen.',
        answers: ['Absprachen'],
        category: 'Lesewortschatz',
      },
      {
        id: 'bergen',
        phrase: 'Risiken bergen',
        meaning: 'to entail / harbour risks',
        sentence: 'Die neue Freiheit ___ auch Risiken.',
        answers: ['birgt'],
        category: 'Lesewortschatz',
        note: 'Irregular: bergen – birgt – barg – hat geborgen.',
      },
      {
        id: 'verschwimmen',
        phrase: 'verschwimmen',
        meaning: 'to blur',
        sentence: 'Die Grenze zwischen Beruf und Privatleben ___.',
        answers: ['verschwimmt'],
        category: 'Lesewortschatz',
      },
      {
        id: 'plaedieren',
        phrase: 'plädieren für (+ Akk.)',
        meaning: 'to argue / make a case for',
        sentence: 'Fachleute ___ für hybride Modelle.',
        answers: ['plädieren', 'plaedieren'],
        category: 'Lesewortschatz',
      },
      {
        id: 'vorzug',
        phrase: 'der Vorzug',
        meaning: 'an advantage, merit',
        sentence: 'Hybride Modelle verbinden die ___ beider Welten.',
        answers: ['Vorzüge', 'Vorzuege'],
        category: 'Lesewortschatz',
      },
      {
        id: 'aushandeln',
        phrase: 'aushandeln',
        meaning: 'to negotiate (an agreement)',
        sentence: 'Teams sollten Regeln gemeinsam ___.',
        answers: ['aushandeln'],
        category: 'Lesewortschatz',
      },
      {
        id: 'verordnen',
        phrase: 'verordnen',
        meaning: 'to impose, to decree (also: to prescribe)',
        sentence: 'Regeln sollten nicht von oben ___ werden.',
        answers: ['verordnet'],
        category: 'Lesewortschatz',
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Das Homeoffice war von Anfang an als langfristiges Modell geplant.',
        options: TRUE_FALSE_NOT_GIVEN,
        answer: 1,
        explanation: 'Es war „zunächst als Notlösung gedacht“.',
      },
      {
        id: 'q2',
        prompt:
          'Arbeitgeber befürchten, dass sich neue Mitarbeitende weniger an das Unternehmen gebunden fühlen.',
        options: TRUE_FALSE_NOT_GIVEN,
        answer: 0,
        explanation:
          '„Zudem leide die Bindung neuer Mitarbeitender an das Unternehmen …“ — Konjunktiv I zeigt, dass es die Position der Arbeitgeber ist.',
      },
      {
        id: 'q3',
        prompt: 'Beschäftigte im Homeoffice verdienen im Durchschnitt mehr.',
        options: TRUE_FALSE_NOT_GIVEN,
        answer: 2,
        explanation: 'Über das Gehalt sagt der Text nichts.',
      },
      {
        id: 'q4',
        prompt: 'Unter welcher Bedingung sinkt die Produktivität laut Studien nicht?',
        options: [
          'Wenn die Beschäftigten ständig erreichbar sind.',
          'Wenn es klare Absprachen gibt.',
          'Wenn die Teams mindestens drei Tage im Büro sind.',
        ],
        answer: 1,
        explanation: '„… sofern klare Absprachen bestehen.“',
      },
      {
        id: 'q5',
        prompt: 'Was empfehlen Arbeitspsychologen?',
        options: [
          'Die Rückkehr ins Büro für alle Beschäftigten.',
          'Hybride Modelle mit gemeinsam vereinbarten Regeln.',
          'Vollständiges Homeoffice ohne feste Regeln.',
        ],
        answer: 1,
        explanation:
          'Sie „plädieren … für hybride Modelle“; Teams sollen Regeln „gemeinsam aushandeln“.',
      },
    ],
    writingPromptId: 'forum-homeoffice',
  },
]

export type TextSegment =
  | { kind: 'text'; text: string }
  | { kind: 'gloss'; text: string; glossId: string }

const GLOSS_PATTERN = /\[\[([^|\]]+)\|([^\]]+)\]\]/g

/** Splits a paragraph with `[[surface|id]]` markup into plain and glossed segments. */
export function parseParagraph(paragraph: string): TextSegment[] {
  const segments: TextSegment[] = []
  let lastIndex = 0
  for (const match of paragraph.matchAll(GLOSS_PATTERN)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      segments.push({ kind: 'text', text: paragraph.slice(lastIndex, index) })
    }
    segments.push({ kind: 'gloss', text: match[1], glossId: match[2] })
    lastIndex = index + match[0].length
  }
  if (lastIndex < paragraph.length) {
    segments.push({ kind: 'text', text: paragraph.slice(lastIndex) })
  }
  return segments
}
