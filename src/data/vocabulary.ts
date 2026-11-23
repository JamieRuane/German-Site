export type VocabCategory =
  | 'Nomen-Verb-Verbindung'
  | 'Präposition & Konnektor'
  | 'Redemittel'
  | 'Redewendung'
  | 'Lesewortschatz'

/**
 * A single review card. `sentence` contains exactly one `___` gap that the
 * learner fills in; `answers[0]` is the canonical answer and any further
 * entries are accepted alternatives.
 */
export type VocabItem = {
  id: string
  phrase: string
  meaning: string
  sentence: string
  answers: string[]
  category: VocabCategory
  note?: string
}

export const GAP = '___'

export const coreVocabulary: VocabItem[] = [
  // Nomen-Verb-Verbindungen: the backbone of formal C1 German.
  {
    id: 'in-betracht-ziehen',
    phrase: 'etwas in Betracht ziehen',
    meaning: 'to consider something',
    sentence: 'Wir sollten auch andere Lösungen in Betracht ___.',
    answers: ['ziehen'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'kritik-ueben',
    phrase: 'Kritik üben (an + Dat.)',
    meaning: 'to criticise (formal)',
    sentence: 'Die Opposition hat scharfe Kritik an dem Gesetzentwurf ___.',
    answers: ['geübt', 'geuebt'],
    category: 'Nomen-Verb-Verbindung',
    note: 'More formal than „kritisieren“ — typical of news and essays.',
  },
  {
    id: 'zur-verfuegung-stehen',
    phrase: 'zur Verfügung stehen',
    meaning: 'to be available',
    sentence: 'Für Rückfragen ___ ich Ihnen gern zur Verfügung.',
    answers: ['stehe'],
    category: 'Nomen-Verb-Verbindung',
    note: 'A standard closing line in formal emails.',
  },
  {
    id: 'infrage-kommen',
    phrase: 'infrage kommen',
    meaning: 'to be an option, to be possible',
    sentence: 'Eine Verschiebung des Projekts kommt für uns nicht ___.',
    answers: ['infrage', 'in frage'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'massnahmen-ergreifen',
    phrase: 'Maßnahmen ergreifen',
    meaning: 'to take measures',
    sentence: 'Die Regierung muss dringend wirksame Maßnahmen ___.',
    answers: ['ergreifen'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'beitrag-leisten',
    phrase: 'einen Beitrag leisten (zu + Dat.)',
    meaning: 'to make a contribution',
    sentence: 'Jede und jeder kann einen Beitrag zum Klimaschutz ___.',
    answers: ['leisten'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'bezug-nehmen',
    phrase: 'Bezug nehmen auf (+ Akk.)',
    meaning: 'to refer to',
    sentence: 'Ich ___ Bezug auf Ihr Schreiben vom 3. März.',
    answers: ['nehme'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'in-kauf-nehmen',
    phrase: 'etwas in Kauf nehmen',
    meaning: 'to accept (a drawback), to put up with',
    sentence: 'Für die zentrale Lage nehmen viele Mieter hohe Preise in ___.',
    answers: ['Kauf'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'zum-ausdruck-bringen',
    phrase: 'etwas zum Ausdruck bringen',
    meaning: 'to express something',
    sentence: 'In ihrer Rede brachte sie ihre Enttäuschung deutlich zum ___.',
    answers: ['Ausdruck'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'auf-widerstand-stossen',
    phrase: 'auf Widerstand stoßen',
    meaning: 'to meet with resistance',
    sentence: 'Der Vorschlag stieß bei den Anwohnern auf heftigen ___.',
    answers: ['Widerstand'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'in-anspruch-nehmen',
    phrase: 'etwas in Anspruch nehmen',
    meaning: 'to take up (time); to make use of',
    sentence: 'Die Renovierung wird mehrere Monate in ___ nehmen.',
    answers: ['Anspruch'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'stellung-nehmen',
    phrase: 'Stellung nehmen zu (+ Dat.)',
    meaning: 'to comment on, to take a position on',
    sentence: 'Der Minister wollte zu den Vorwürfen nicht ___ nehmen.',
    answers: ['Stellung'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'zur-sprache-bringen',
    phrase: 'etwas zur Sprache bringen',
    meaning: 'to raise (an issue)',
    sentence: 'Sie hat das Problem in der Sitzung zur ___ gebracht.',
    answers: ['Sprache'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'ausser-acht-lassen',
    phrase: 'etwas außer Acht lassen',
    meaning: 'to disregard, to leave out of account',
    sentence: 'Dabei sollte man die sozialen Folgen nicht außer ___ lassen.',
    answers: ['Acht'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'abhilfe-schaffen',
    phrase: 'Abhilfe schaffen',
    meaning: 'to remedy a situation',
    sentence: 'Mit mehr Personal ließe sich hier schnell ___ schaffen.',
    answers: ['Abhilfe'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'anklang-finden',
    phrase: 'Anklang finden',
    meaning: 'to be well received',
    sentence: 'Die Idee fand bei den Jugendlichen großen ___.',
    answers: ['Anklang'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'bedenken-aeussern',
    phrase: 'Bedenken äußern',
    meaning: 'to voice concerns',
    sentence: 'Mehrere Fachleute haben bereits Bedenken ___.',
    answers: ['geäußert', 'geaeussert'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'wert-legen',
    phrase: 'Wert legen auf (+ Akk.)',
    meaning: 'to attach importance to',
    sentence: 'Unser Unternehmen legt großen ___ auf Nachhaltigkeit.',
    answers: ['Wert'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'zur-folge-haben',
    phrase: 'etwas zur Folge haben',
    meaning: 'to result in',
    sentence: 'Die Reform hatte deutlich steigende Mieten zur ___.',
    answers: ['Folge'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'debatte-anstossen',
    phrase: 'eine Debatte anstoßen',
    meaning: 'to spark a debate',
    sentence: 'Der Artikel hat eine heftige Debatte ___.',
    answers: ['angestoßen', 'angestossen'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'tragweite-erfassen',
    phrase: 'die Tragweite erfassen',
    meaning: 'to grasp the implications',
    sentence: 'Viele haben die Tragweite dieser Entscheidung noch nicht ___.',
    answers: ['erfasst'],
    category: 'Nomen-Verb-Verbindung',
  },
  {
    id: 'kehrtwende-vollziehen',
    phrase: 'eine Kehrtwende vollziehen',
    meaning: 'to make a U-turn (figuratively)',
    sentence: 'Die Partei hat in der Energiepolitik eine Kehrtwende ___.',
    answers: ['vollzogen'],
    category: 'Nomen-Verb-Verbindung',
  },

  // Genitive prepositions and C1 connectors.
  {
    id: 'angesichts',
    phrase: 'angesichts (+ Gen.)',
    meaning: 'in view of, given',
    sentence: '___ der steigenden Kosten müssen wir sparen.',
    answers: ['Angesichts'],
    category: 'Präposition & Konnektor',
  },
  {
    id: 'hinsichtlich',
    phrase: 'hinsichtlich (+ Gen.)',
    meaning: 'regarding, with respect to',
    sentence: '___ der Finanzierung gibt es noch offene Fragen.',
    answers: ['Hinsichtlich'],
    category: 'Präposition & Konnektor',
  },
  {
    id: 'ungeachtet',
    phrase: 'ungeachtet (+ Gen.)',
    meaning: 'regardless of, notwithstanding',
    sentence: '___ aller Warnungen setzte er das Projekt fort.',
    answers: ['Ungeachtet'],
    category: 'Präposition & Konnektor',
  },
  {
    id: 'infolgedessen',
    phrase: 'infolgedessen',
    meaning: 'as a result, consequently',
    sentence: 'Die Nachfrage sank; ___ wurden Stellen abgebaut.',
    answers: ['infolgedessen'],
    category: 'Präposition & Konnektor',
    note: 'An adverb: the verb comes straight after it (Position 2).',
  },
  {
    id: 'nichtsdestotrotz',
    phrase: 'nichtsdestotrotz',
    meaning: 'nevertheless',
    sentence: 'Die Lage ist schwierig, ___ bleiben wir optimistisch.',
    answers: ['nichtsdestotrotz', 'nichtsdestoweniger'],
    category: 'Präposition & Konnektor',
  },
  {
    id: 'sofern',
    phrase: 'sofern',
    meaning: 'provided that, as long as',
    sentence: '___ keine Einwände bestehen, beginnen wir morgen.',
    answers: ['Sofern'],
    category: 'Präposition & Konnektor',
    note: 'A subordinating conjunction: verb goes to the end.',
  },
  {
    id: 'wohingegen',
    phrase: 'wohingegen',
    meaning: 'whereas',
    sentence: 'Die Stadt wächst, ___ das Umland schrumpft.',
    answers: ['wohingegen'],
    category: 'Präposition & Konnektor',
  },

  // Redemittel for essays and discussions.
  {
    id: 'nicht-leugnen',
    phrase: 'Es lässt sich nicht leugnen, dass …',
    meaning: 'It cannot be denied that …',
    sentence: 'Es lässt sich nicht ___, dass die Digitalisierung Vorteile bringt.',
    answers: ['leugnen', 'bestreiten'],
    category: 'Redemittel',
  },
  {
    id: 'entgegenzuhalten',
    phrase: 'Dem ist entgegenzuhalten, dass …',
    meaning: 'Against this, it must be said that …',
    sentence:
      'Dem ist ___, dass viele Menschen keinen Zugang zum Internet haben.',
    answers: ['entgegenzuhalten'],
    category: 'Redemittel',
    note: 'An elegant way to introduce a counter-argument.',
  },
  {
    id: 'ausschlaggebend',
    phrase: 'ausschlaggebend sein (für + Akk.)',
    meaning: 'to be decisive',
    sentence: '___ für meine Entscheidung war letztlich der Preis.',
    answers: ['Ausschlaggebend'],
    category: 'Redemittel',
  },
  {
    id: 'meines-erachtens',
    phrase: 'meines Erachtens',
    meaning: 'in my view (formal)',
    sentence: 'Meines ___ wird dieses Problem unterschätzt.',
    answers: ['Erachtens'],
    category: 'Redemittel',
    note: 'Often abbreviated to „m. E.“ in written texts.',
  },
  {
    id: 'entscheidende-bedeutung',
    phrase: 'von entscheidender Bedeutung sein',
    meaning: 'to be of crucial importance',
    sentence: 'Bildung ist für gelungene Integration von entscheidender ___.',
    answers: ['Bedeutung'],
    category: 'Redemittel',
  },
  {
    id: 'dahingestellt',
    phrase: 'Es sei dahingestellt, ob …',
    meaning: 'It remains an open question whether …',
    sentence: 'Es sei ___, ob diese Maßnahme tatsächlich wirkt.',
    answers: ['dahingestellt'],
    category: 'Redemittel',
  },

  // Idiomatic expressions that make speech sound natural.
  {
    id: 'auf-der-hand-liegen',
    phrase: 'auf der Hand liegen',
    meaning: 'to be obvious',
    sentence: 'Die Vorteile dieses Modells liegen auf der ___.',
    answers: ['Hand'],
    category: 'Redewendung',
  },
  {
    id: 'auf-den-punkt-bringen',
    phrase: 'etwas auf den Punkt bringen',
    meaning: 'to sum something up precisely',
    sentence: 'Sie hat das Problem treffend auf den ___ gebracht.',
    answers: ['Punkt'],
    category: 'Redewendung',
  },
  {
    id: 'ins-gewicht-fallen',
    phrase: 'ins Gewicht fallen',
    meaning: 'to matter, to carry weight',
    sentence: 'Die zusätzlichen Kosten fallen kaum ins ___.',
    answers: ['Gewicht'],
    category: 'Redewendung',
  },
  {
    id: 'den-ausschlag-geben',
    phrase: 'den Ausschlag geben',
    meaning: 'to tip the balance',
    sentence: 'Am Ende gab die Erfahrung der Bewerberin den ___.',
    answers: ['Ausschlag'],
    category: 'Redewendung',
  },
  {
    id: 'unter-den-naegeln-brennen',
    phrase: 'jemandem unter den Nägeln brennen',
    meaning: 'to be a pressing issue for someone',
    sentence: 'Das Thema Wohnen brennt vielen jungen Menschen unter den ___.',
    answers: ['Nägeln', 'Naegeln'],
    category: 'Redewendung',
  },
]
