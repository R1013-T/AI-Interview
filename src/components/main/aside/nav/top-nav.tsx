import Link from 'next/link'

export default function TopNav() {
  const navItems = [
    {
      id: '1',
      occupation: 'Software Engineer',
      score: 70,
    },
    {
      id: '2',
      occupation: 'Designer',
      score: 80,
    },
    {
      id: '3',
      occupation: 'HTML CSS Developer',
      score: 75,
    },
    {
      id: '4',
      occupation: 'UX Designer',
      score: 90,
    },
    {
      id: '5',
      occupation: 'Security Engineer',
      score: 85,
    },
    {
      id: '6',
      occupation: 'Product Manager',
      score: 95,
    },
    {
      id: '7',
      occupation: 'Data Scientist',
      score: 100,
    },
    {
      id: '8',
      occupation: 'Data Analyst',
      score: 65,
    },
    {
      id: '9',
      occupation: 'Frontend Developer',
      score: 60,
    },
    {
      id: '10',
      occupation: 'Backend Developer',
      score: 55,
    },
    {
      id: '11',
      occupation: 'Fullstack Developer',
      score: 50,
    },
    {
      id: '12',
      occupation: 'DevOps Engineer',
      score: 45,
    },
    {
      id: '13',
      occupation: 'Cloud Engineer',
      score: 40,
    },
    {
      id: '14',
      occupation: 'Machine Learning Engineer',
      score: 35,
    },
    {
      id: '15',
      occupation: 'AI Engineer',
      score: 30,
    },
    {
      id: '16',
      occupation: 'Data Engineer',
      score: 25,
    },
    {
      id: '17',
      occupation: 'Database Administrator',
      score: 20,
    },
    {
      id: '18',
      occupation: 'Network Engineer',
      score: 15,
    },
    {
      id: '19',
      occupation: 'System Administrator',
      score: 10,
    },
    {
      id: '20',
      occupation: 'IT Support',
      score: 5,
    },
  ]

  const NavItem = ({
    id,
    occupation,
    score,
  }: {
    id: string
    occupation: string
    score: number
  }) => {
    return (
      <Link
        href={`/interview?id=${id}`}
        className="flex justify-between items-center gap-2 hover:bg-white/25 py-2 px-2.5 mr-3 rounded-md"
      >
        <p className="text-sm">{occupation}</p>
        <p className="text-base">{score}</p>
      </Link>
    )
  }

  return (
    <div className="text-foreground pt-10 pb-56 flex gap-1 flex-col">
      {navItems.map((navItem) => (
        <NavItem
          key={navItem.id}
          id={navItem.id}
          occupation={navItem.occupation}
          score={navItem.score}
        />
      ))}
    </div>
  )
}
