import type { Question } from './readings'

export type GrammarTopic = {
  id: string
  title: string
  subtitle: string
  /** Short rule summary, one point per entry. */
  rules: string[]
  /** Worked examples: [before, after]. */
  examples: [string, string][]
  exercises: Question[]
}

export const grammarTopics: GrammarTopic[] = [
  {
    id: 'nominalisierung',
    title: 'Nominalstil',
    subtitle: 'Turning clauses into noun phrases — the hallmark of formal C1 German.',
    rules: [
      'weil / da → wegen, aufgrund (+ Gen.)',
      'obwohl → trotz (+ Gen.)',
      'wenn / als → bei (+ Dat.)',
      'nachdem → nach · bevor → vor (+ Dat.)',
      'indem → durch (+ Akk.)',
      'damit / um … zu → zu(r/m) (+ Dat.), für (+ Akk.)',
      'Subject of the clause → genitive attribute (die Preise steigen → der Anstieg der Preise)',
    ],
    examples: [
      [
        'Weil die Preise stark gestiegen sind, …',
        'Aufgrund des starken Anstiegs der Preise …',
      ],
      [
        'Nachdem er zurückgekehrt war, …',
        'Nach seiner Rückkehr …',
      ],
    ],
    exercises: [
      {
        id: 'n1',
        prompt: 'Obwohl es stark regnete, fand das Konzert statt.',
        options: [
          'Trotz des starken Regens fand das Konzert statt.',
          'Wegen des starken Regens fand das Konzert statt.',
          'Bei dem starken Regnen fand das Konzert statt.',
        ],
        answer: 0,
        explanation:
          'obwohl (concession) → trotz + Genitiv. „Wegen“ would reverse the meaning (cause).',
      },
      {
        id: 'n2',
        prompt: 'Nachdem das Gesetz verabschiedet worden war, begann die Umsetzung.',
        options: [
          'Vor der Verabschiedung des Gesetzes begann die Umsetzung.',
          'Nach der Verabschiedung dem Gesetz begann die Umsetzung.',
          'Nach der Verabschiedung des Gesetzes begann die Umsetzung.',
        ],
        answer: 2,
        explanation:
          'nachdem → nach + Dativ; the former subject (das Gesetz) becomes a genitive attribute: des Gesetzes.',
      },
      {
        id: 'n3',
        prompt: 'Wenn man die Maschine bedient, muss man Handschuhe tragen.',
        options: [
          'Durch die Bedienung der Maschine muss man Handschuhe tragen.',
          'Bei der Bedienung der Maschine muss man Handschuhe tragen.',
          'Bei der Bedienen der Maschine muss man Handschuhe tragen.',
        ],
        answer: 1,
        explanation:
          'wenn (time/condition) → bei + Dativ. The verb bedienen becomes the noun die Bedienung.',
      },
      {
        id: 'n4',
        prompt: 'Man kann Energie sparen, indem man die Heizung richtig einstellt.',
        options: [
          'Durch die richtige Einstellung der Heizung kann man Energie sparen.',
          'Trotz der richtigen Einstellung der Heizung kann man Energie sparen.',
          'Zur richtigen Einstellung der Heizung kann man Energie sparen.',
        ],
        answer: 0,
        explanation:
          'indem (means/method) → durch + Akkusativ. The adverb richtig becomes an adjective: die richtige Einstellung.',
      },
      {
        id: 'n5',
        prompt: 'Damit die Qualität verbessert wird, wurden neue Prüfverfahren eingeführt.',
        options: [
          'Wegen der Verbesserung der Qualität wurden neue Prüfverfahren eingeführt.',
          'Zur Verbesserung die Qualität wurden neue Prüfverfahren eingeführt.',
          'Zur Verbesserung der Qualität wurden neue Prüfverfahren eingeführt.',
        ],
        answer: 2,
        explanation:
          'damit (purpose) → zu + Dativ (zur = zu der). The object takes the genitive: der Qualität.',
      },
      {
        id: 'n6',
        prompt:
          'Reverse it: „Aufgrund der hohen Nachfrage wurden die Preise erhöht.“',
        options: [
          'Obwohl die Nachfrage hoch war, wurden die Preise erhöht.',
          'Weil die Nachfrage hoch war, wurden die Preise erhöht.',
          'Damit die Nachfrage hoch war, wurden die Preise erhöht.',
        ],
        answer: 1,
        explanation:
          'aufgrund expresses a cause → weil / da. Being able to go both ways is tested in C1 exams.',
      },
    ],
  },
  {
    id: 'konjunktiv-i',
    title: 'Konjunktiv I',
    subtitle: 'Reported speech, as used in news, reports and academic texts.',
    rules: [
      'Form: infinitive stem + -e, -est, -e, -en, -et, -en (er habe, sie komme, es gebe).',
      'sein is irregular: ich sei, du sei(e)st, er sei, wir seien, ihr seiet, sie seien.',
      'If Konjunktiv I looks like the indicative (wir haben, sie kommen), use Konjunktiv II instead (sie hätten, sie kämen / würden kommen).',
      'Past: Konjunktiv I of haben / sein + Partizip II (er habe gesagt, sie sei gegangen).',
      'Imperative → sollen / mögen (Er sagte, ich solle warten).',
    ],
    examples: [
      ['Sie sagt: „Ich bin müde.“', 'Sie sagt, sie sei müde.'],
      [
        'Sie sagen: „Wir haben keine Zeit.“',
        'Sie sagen, sie hätten keine Zeit.',
      ],
    ],
    exercises: [
      {
        id: 'k1',
        prompt: 'Der Minister sagte: „Ich bin nicht informiert worden.“ → Der Minister sagte, er ___ nicht informiert worden.',
        options: ['ist', 'sei', 'war'],
        answer: 1,
        explanation: 'Konjunktiv I of sein, 3rd person singular: er sei.',
      },
      {
        id: 'k2',
        prompt: '„Wir haben keine Zeit“, erklärten die Studierenden. → Die Studierenden erklärten, sie ___ keine Zeit.',
        options: ['haben', 'habe', 'hätten'],
        answer: 2,
        explanation:
          'Konjunktiv I „sie haben“ is identical to the indicative, so switch to Konjunktiv II: sie hätten.',
      },
      {
        id: 'k3',
        prompt: 'Ein Sprecher betonte: „Die Firma plant keine Entlassungen.“ → Ein Sprecher betonte, die Firma ___ keine Entlassungen.',
        options: ['plane', 'plant', 'planen'],
        answer: 0,
        explanation: 'Konjunktiv I, 3rd person singular: Stamm plan- + e → plane.',
      },
      {
        id: 'k4',
        prompt: 'Er sagte zu mir: „Kommen Sie morgen wieder!“ → Er sagte, ich ___ morgen wiederkommen.',
        options: ['werde', 'solle', 'könne'],
        answer: 1,
        explanation: 'Imperatives in reported speech are expressed with sollen: ich solle.',
      },
      {
        id: 'k5',
        prompt: 'Sie berichtete: „Wir trafen uns gestern.“ → Sie berichtete, sie ___ sich gestern getroffen.',
        options: ['hätten', 'haben', 'trafen'],
        answer: 0,
        explanation:
          'Past tense → haben/sein + Partizip II. „sie haben“ = indicative, so use Konjunktiv II: sie hätten sich getroffen.',
      },
      {
        id: 'k6',
        prompt: 'In a newspaper report: Sie fragte: „Wann beginnt die Sitzung?“ → Sie fragte, wann die Sitzung ___.',
        options: ['begann', 'beginnen', 'beginne'],
        answer: 2,
        explanation:
          'Indirect questions keep the question word, the verb goes to the end, and formal texts use Konjunktiv I: beginne.',
      },
    ],
  },
  {
    id: 'passiv-ersatz',
    title: 'Passive & alternatives',
    subtitle: 'sich lassen, sein + zu, -bar: varied ways to express possibility and necessity.',
    rules: [
      'kann … werden → lässt sich + Infinitiv (Das lässt sich ändern).',
      'kann / muss … werden → ist + zu + Infinitiv (Das ist zu prüfen).',
      'kann … werden → Adjektiv auf -bar / -lich (lösbar, erhältlich).',
      'Vorgangspassiv (werden) = process; Zustandspassiv (sein + Partizip II) = resulting state.',
    ],
    examples: [
      ['Das Problem kann gelöst werden.', 'Das Problem lässt sich lösen. / Das Problem ist lösbar.'],
      ['Der Antrag muss bis Montag eingereicht werden.', 'Der Antrag ist bis Montag einzureichen.'],
    ],
    exercises: [
      {
        id: 'p1',
        prompt: 'Der Fehler kann leicht behoben werden. → Der Fehler ___ sich leicht beheben.',
        options: ['ist', 'lässt', 'wird'],
        answer: 1,
        explanation: 'kann … werden → sich lassen + Infinitiv: lässt sich beheben.',
      },
      {
        id: 'p2',
        prompt: 'Die Anträge müssen bis Freitag eingereicht werden. → Die Anträge sind bis Freitag ___.',
        options: ['einzureichen', 'eingereicht zu', 'zu einreichen'],
        answer: 0,
        explanation:
          'sein + zu + Infinitiv. With separable verbs, zu goes between prefix and stem: einzureichen.',
      },
      {
        id: 'p3',
        prompt: 'Dieses Material kann recycelt werden. → Dieses Material ist ___.',
        options: ['recycelnd', 'recycelbar', 'recycelt zu'],
        answer: 1,
        explanation: 'Verb stem + -bar expresses possibility: recycelbar = kann recycelt werden.',
      },
      {
        id: 'p4',
        prompt: 'Man hat das Gebäude 1905 errichtet. → Das Gebäude ___ 1905 errichtet.',
        options: ['hat', 'ist', 'wurde'],
        answer: 2,
        explanation: 'A past process → Vorgangspassiv in Präteritum: wurde errichtet.',
      },
      {
        id: 'p5',
        prompt: 'Was bedeutet „Die Tür ist geschlossen“?',
        options: [
          'Jemand schließt die Tür gerade.',
          'Die Tür ist zu – das ist das Ergebnis einer Handlung.',
          'Die Tür muss geschlossen werden.',
        ],
        answer: 1,
        explanation: 'sein + Partizip II is the Zustandspassiv: it describes the resulting state.',
      },
      {
        id: 'p6',
        prompt: 'Was bedeutet „Das lässt sich nicht ändern“?',
        options: [
          'Das darf nicht geändert werden.',
          'Das wird nicht geändert.',
          'Das kann nicht geändert werden.',
        ],
        answer: 2,
        explanation: 'sich lassen + Infinitiv = Möglichkeit (können) im Passiv.',
      },
    ],
  },
  {
    id: 'partizipialattribute',
    title: 'Participial attributes',
    subtitle: 'Packing a relative clause in front of a noun — essential for reading C1 texts.',
    rules: [
      'Partizip I (Infinitiv + d) = active, happening at the same time: die steigenden Preise.',
      'Partizip II = passive or completed: das verabschiedete Gesetz, der angekommene Zug.',
      'zu + Partizip I = something that must / can be done: die zu lösenden Aufgaben.',
      'The participle takes normal adjective endings; extra information goes between article and participle.',
    ],
    examples: [
      [
        'die Preise, die seit Monaten steigen',
        'die seit Monaten steigenden Preise',
      ],
      [
        'die Fragen, die noch geklärt werden müssen',
        'die noch zu klärenden Fragen',
      ],
    ],
    exercises: [
      {
        id: 'a1',
        prompt: 'die Preise, die seit Monaten steigen →',
        options: [
          'die seit Monaten steigende Preise',
          'die seit Monaten steigenden Preise',
          'die seit Monaten gestiegene Preise',
        ],
        answer: 1,
        explanation:
          'Ongoing, active → Partizip I. After the definite article in the plural the ending is -en.',
      },
      {
        id: 'a2',
        prompt: 'das Gesetz, das gestern vom Parlament verabschiedet wurde →',
        options: [
          'das gestern vom Parlament verabschiedete Gesetz',
          'das gestern vom Parlament verabschiedende Gesetz',
          'das gestern vom Parlament verabschiedeten Gesetz',
        ],
        answer: 0,
        explanation: 'Passive → Partizip II; neuter singular after „das“ takes -e.',
      },
      {
        id: 'a3',
        prompt: 'die Probleme, die noch gelöst werden müssen →',
        options: [
          'die noch gelösten Probleme',
          'die noch lösenden Probleme',
          'die noch zu lösenden Probleme',
        ],
        answer: 2,
        explanation: 'Necessity (müssen + Passiv) → zu + Partizip I: die zu lösenden Probleme.',
      },
      {
        id: 'a4',
        prompt: 'Resolve it: „Die in der Studie befragten Lehrkräfte …“',
        options: [
          'Die Lehrkräfte, die in der Studie befragt wurden, …',
          'Die Lehrkräfte, die in der Studie gefragt haben, …',
          'Die Lehrkräfte, die die Studie befragen, …',
        ],
        answer: 0,
        explanation: 'Partizip II of a transitive verb = passive meaning: die befragt wurden.',
      },
      {
        id: 'a5',
        prompt: 'ein Kind, das laut weint →',
        options: [
          'ein laut geweintes Kind',
          'ein laut weinendes Kind',
          'ein laut weinender Kind',
        ],
        answer: 1,
        explanation: 'Active and simultaneous → Partizip I; neuter after „ein“ takes -es.',
      },
      {
        id: 'a6',
        prompt: 'der Zug, der um 8 Uhr angekommen ist →',
        options: [
          'der um 8 Uhr ankommende Zug',
          'der um 8 Uhr angekommener Zug',
          'der um 8 Uhr angekommene Zug',
        ],
        answer: 2,
        explanation:
          'Completed action → Partizip II. „ankommend“ would mean the train is (still) arriving.',
      },
    ],
  },
  {
    id: 'zweiteilige-konnektoren',
    title: 'Two-part connectors',
    subtitle: 'je … desto, weder … noch, zwar … aber: structure your arguments.',
    rules: [
      'je + Komparativ … (Verb am Ende), desto / umso + Komparativ … (Verb an Position 2).',
      'sowohl … als auch = both … and · weder … noch = neither … nor.',
      'entweder … oder = either … or · nicht nur … sondern auch = not only … but also.',
      'zwar … aber = admittedly … but (concession followed by the main point).',
    ],
    examples: [
      ['Man übt viel. Man wird sicherer.', 'Je mehr man übt, desto sicherer wird man.'],
      ['Das Hotel war teuer. Der Service war gut.', 'Das Hotel war zwar teuer, aber der Service war gut.'],
    ],
    exercises: [
      {
        id: 'c1',
        prompt: '___ mehr man übt, desto sicherer wird man.',
        options: ['Umso', 'Je', 'Als'],
        answer: 1,
        explanation: 'je … desto / umso. „Je“ always introduces the first (subordinate) part.',
      },
      {
        id: 'c2',
        prompt: 'Er spricht ___ Englisch ___ Französisch – nur Deutsch.',
        options: ['sowohl … als auch', 'entweder … oder', 'weder … noch'],
        answer: 2,
        explanation: '„nur Deutsch“ tells us both are negated: weder … noch.',
      },
      {
        id: 'c3',
        prompt: 'Das Hotel war ___ teuer, ___ der Service war hervorragend.',
        options: ['zwar … aber', 'weder … noch', 'je … desto'],
        answer: 0,
        explanation: 'A concession (teuer) followed by the counterpoint → zwar … aber.',
      },
      {
        id: 'c4',
        prompt: 'Wir können ___ heute ___ morgen fahren – du entscheidest.',
        options: ['sowohl … als auch', 'entweder … oder', 'nicht nur … sondern'],
        answer: 1,
        explanation: 'A choice between two alternatives → entweder … oder.',
      },
      {
        id: 'c5',
        prompt: 'Die Reform betrifft ___ Arbeitnehmer, ___ auch Rentner.',
        options: ['nicht nur … sondern', 'weder … noch', 'zwar … aber'],
        answer: 0,
        explanation: 'nicht nur … sondern auch — the „auch“ is already in the sentence.',
      },
      {
        id: 'c6',
        prompt: 'Je länger die Verhandlungen dauern, …',
        options: [
          '… desto eine Einigung wird schwieriger.',
          '… desto schwieriger eine Einigung wird.',
          '… desto schwieriger wird eine Einigung.',
        ],
        answer: 2,
        explanation:
          'desto + Komparativ takes Position 1 of the main clause, so the verb follows immediately.',
      },
    ],
  },
  {
    id: 'genitiv-praepositionen',
    title: 'Genitive prepositions',
    subtitle: 'aufgrund, infolge, hinsichtlich, mittels … the vocabulary of formal writing.',
    rules: [
      'Cause: aufgrund, infolge, angesichts',
      'Concession: trotz, ungeachtet',
      'Topic: hinsichtlich, bezüglich',
      'Means: mittels · Purpose: zwecks · Agent: seitens',
      'Alternative: (an)statt, anstelle',
    ],
    examples: [
      ['Weil ein Unfall passiert war, gab es Stau.', 'Infolge eines Unfalls gab es Stau.'],
      ['Was die Kosten betrifft, …', 'Hinsichtlich der Kosten …'],
    ],
    exercises: [
      {
        id: 'g1',
        prompt: '___ der Wetterlage wurde der Flug gestrichen.',
        options: ['Trotz', 'Aufgrund', 'Anstatt'],
        answer: 1,
        explanation: 'The weather is the reason → aufgrund.',
      },
      {
        id: 'g2',
        prompt: '___ aller Bemühungen scheiterten die Verhandlungen.',
        options: ['Ungeachtet', 'Infolge', 'Zwecks'],
        answer: 0,
        explanation: 'Despite the efforts → ungeachtet (a more formal „trotz“).',
      },
      {
        id: 'g3',
        prompt: '___ eines Unfalls kam es zu langen Staus.',
        options: ['Anstelle', 'Ungeachtet', 'Infolge'],
        answer: 2,
        explanation: 'The accident caused the traffic jams → infolge (as a consequence of).',
      },
      {
        id: 'g4',
        prompt: '___ der Kosten gibt es noch Klärungsbedarf.',
        options: ['Hinsichtlich', 'Mittels', 'Zwecks'],
        answer: 0,
        explanation: 'Concerning a topic → hinsichtlich / bezüglich.',
      },
      {
        id: 'g5',
        prompt: 'Die Tür wird ___ einer Chipkarte geöffnet.',
        options: ['angesichts', 'mittels', 'seitens'],
        answer: 1,
        explanation: 'The means or tool → mittels.',
      },
      {
        id: 'g6',
        prompt: '___ der Geschäftsleitung gab es keine Einwände.',
        options: ['Zwecks', 'Mittels', 'Seitens'],
        answer: 2,
        explanation: 'From the side of (who acts) → seitens.',
      },
    ],
  },
]
