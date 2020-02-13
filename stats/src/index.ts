import { MatchReader } from './MatchReader'
import { CSVFileReader } from './CSVFileReader'
import { MatchResult } from './MatchResult'

const csvFileReader = new CSVFileReader('input.csv')
const matchReader = new MatchReader(csvFileReader)
matchReader.load()

let manUnitedWins = 0
for (let match of matchReader.matches) {
  if (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) {
    manUnitedWins += 1
  } else if (match[2] === 'Man United' && match[5] === MatchResult.AwayWin) {
    manUnitedWins += 1
  }
}

console.log(manUnitedWins)
