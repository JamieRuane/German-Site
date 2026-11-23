import { readings } from './readings'
import { coreVocabulary, type VocabItem } from './vocabulary'

/** Every card the learner can study: the core deck plus glossed reading words. */
export const vocabById: Record<string, VocabItem> = Object.fromEntries(
  [
    ...coreVocabulary,
    ...readings.flatMap((reading) => reading.glossary),
  ].map((item) => [item.id, item]),
)

export const coreDeckIds = coreVocabulary.map((item) => item.id)
