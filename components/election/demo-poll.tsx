"use client"

import { useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Vote, CheckCircle, Users } from "lucide-react"

const pollOptions = [
  {
    id: 1,
    candidate: {
      en: "Rajesh Kumar",
      hi: "राजेश कुमार",
      mr: "राजेश कुमार",
    },
    party: "Independent",
    votes: 245,
  },
  {
    id: 2,
    candidate: {
      en: "Sunita Devi",
      hi: "सुनीता देवी",
      mr: "सुनीता देवी",
    },
    party: "Independent",
    votes: 198,
  },
]

const DemoPoll = () => {
  const { t, language } = useLanguage()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const totalVotes = pollOptions.reduce((sum, option) => sum + option.votes, 0)

  const handleVote = () => {
    if (selectedOption !== null) {
      setHasVoted(true)
      setShowResults(true)
      // In a real application, this would send the vote to the server
    }
  }

  const getVotePercentage = (votes: number) => {
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Vote className="mr-2 h-5 w-5 text-gov-blue" />
          Demo Poll - Sarpanch Election
        </CardTitle>
        <p className="text-sm text-gray-600">
          This is a demonstration poll. Real elections are conducted through official channels.
        </p>
      </CardHeader>
      <CardContent>
        {!hasVoted ? (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Who would you vote for as Sarpanch?</h3>

            <div className="space-y-3">
              {pollOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedOption === option.id
                      ? "border-gov-blue bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedOption === option.id ? "border-gov-blue bg-gov-blue" : "border-gray-300"
                        }`}
                      >
                        {selectedOption === option.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{option.candidate[language]}</p>
                        <p className="text-sm text-gray-600">{option.party}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={handleVote} disabled={selectedOption === null} className="w-full">
              <Vote className="mr-2 h-4 w-4" />
              Cast Vote
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">Thank you for voting!</span>
            </div>

            {showResults && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Current Results</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="mr-1 h-4 w-4" />
                    {totalVotes} votes
                  </div>
                </div>

                <div className="space-y-3">
                  {pollOptions
                    .sort((a, b) => b.votes - a.votes)
                    .map((option) => {
                      const percentage = getVotePercentage(option.votes)
                      return (
                        <div key={option.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{option.candidate[language]}</span>
                              <Badge variant="outline" className="text-xs">
                                {option.party}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{percentage}%</span>
                              <span className="text-xs text-gray-600">({option.votes})</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gov-blue h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}

            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setHasVoted(false)
                  setSelectedOption(null)
                  setShowResults(false)
                }}
              >
                Vote Again (Demo)
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Disclaimer:</strong> This is a demonstration poll only. Official elections are conducted by the
            Election Commission through proper voting procedures.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default DemoPoll
