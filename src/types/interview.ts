export type Interview = {
  id: string
  occupation: string
  employmentType: 'newGraduate' | 'midCareer'
  questionsAndAnswers: string
  score?: number
  feedBack?: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export type InterviewResult = {
  score: number
  advice: string
}
