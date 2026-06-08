import { useEffect, useState } from 'react'

const stageOptions = ['Nomination', 'Voting', 'Results', 'Closed']
const typeOptions = ['Leadership Council', 'Mentorship Committee', 'Operations Panel']

const ElectionForm = ({ election, onSubmit, onCancel }) => {
  const [formState, setFormState] = useState({
    title: '',
    type: 'Leadership Council',
    stage: 'Nomination',
    deadline: '',
    description: '',
    candidateNames: '',
  })

  useEffect(() => {
    if (!election) {
      setFormState({
        title: '',
        type: 'Leadership Council',
        stage: 'Nomination',
        deadline: '',
        description: '',
        candidateNames: '',
      })
      return
    }

    setFormState({
      title: election.title,
      type: election.type,
      stage: election.stage,
      deadline: election.deadline,
      description: election.description,
      candidateNames: election.candidates.map((item) => item.name).join(', '),
    })
  }, [election])

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const parseCandidates = () => {
    const candidateNames = formState.candidateNames
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)

    return candidateNames.map((name, index) => ({
      id: election?.candidates?.[index]?.id || `candidate-${Date.now()}-${index}`,
      name,
      role: election?.candidates?.[index]?.role || `Committee candidate ${index + 1}`,
      initials: name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      experience: election?.candidates?.[index]?.experience || 'Experienced CIC leader',
      statement: election?.candidates?.[index]?.statement || 'Committed to advancing CIC goals and member engagement.',
      votes: election?.candidates?.[index]?.votes ?? 0,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formState.title.trim() || !formState.deadline.trim()) return

    onSubmit({
      id: election?.id || `election-${Date.now()}`,
      title: formState.title,
      type: formState.type,
      stage: formState.stage,
      deadline: formState.deadline,
      description: formState.description,
      candidates: parseCandidates(),
      totalVotes: election?.totalVotes ?? 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Election title</span>
          <input
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            value={formState.title}
            onChange={(event) => handleChange('title', event.target.value)}
            placeholder="Leadership Council Election"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Election type</span>
          <select
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            value={formState.type}
            onChange={(event) => handleChange('type', event.target.value)}
          >
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Election stage</span>
          <select
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            value={formState.stage}
            onChange={(event) => handleChange('stage', event.target.value)}
          >
            {stageOptions.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Deadline</span>
          <input
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            type="text"
            value={formState.deadline}
            onChange={(event) => handleChange('deadline', event.target.value)}
            placeholder="Aug 26, 2026"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Description</span>
        <textarea
          className="mt-2 min-h-[120px] w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          value={formState.description}
          onChange={(event) => handleChange('description', event.target.value)}
          placeholder="Describe the election, voting rules, and timeline."
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Candidate names</span>
        <textarea
          className="mt-2 min-h-[100px] w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          value={formState.candidateNames}
          onChange={(event) => handleChange('candidateNames', event.target.value)}
          placeholder="Enter candidate names separated by commas"
        />
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Example: Amina Conteh, Kofi Adu, Lula Kamara</p>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Save election
        </button>
      </div>
    </form>
  )
}

export default ElectionForm
