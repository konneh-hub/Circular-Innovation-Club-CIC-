import { useEffect, useState } from 'react'

const DEFAULT_CANDIDATE = {
  id: null,
  name: '',
  role: '',
  initials: '',
  experience: '',
  statement: '',
  votes: 0,
}

const CandidateEditorModal = ({ election, open, onClose, onSave }) => {
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    if (!election) {
      setCandidates([])
      return
    }

    setCandidates(
      election.candidates.map((candidate) => ({
        ...candidate,
      }))
    )
  }, [election])

  const updateCandidate = (index, field, value) => {
    setCandidates((current) =>
      current.map((candidate, idx) =>
        idx !== index
          ? candidate
          : {
              ...candidate,
              [field]: value,
              initials:
                field === 'name'
                  ? value
                      .split(' ')
                      .map((word) => word[0] || '')
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()
                  : candidate.initials,
            }
      )
    )
  }

  const addCandidate = () => {
    const id = `candidate-${Date.now()}`
    setCandidates((current) => [
      ...current,
      { ...DEFAULT_CANDIDATE, id, initials: '', votes: 0 },
    ])
  }

  const removeCandidate = (index) => {
    setCandidates((current) => current.filter((_, idx) => idx !== index))
  }

  const handleSave = () => {
    onSave(candidates)
  }

  if (!open || !election) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20 dark:bg-slate-950 dark:text-white">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Candidate editor</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Manage candidates for {election.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
          {candidates.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <p className="text-sm font-semibold">No candidates defined yet.</p>
              <p className="mt-2 text-sm">Add new candidate cards and enter details here.</p>
            </div>
          ) : (
            candidates.map((candidate, index) => (
              <div key={candidate.id || index} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-slate-900/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Candidate {index + 1}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Edit candidate profile and vote tally.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCandidate(index)}
                    className="rounded-full border border-rose-200 bg-rose-100 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:bg-rose-900/40"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Name</span>
                    <input
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                      value={candidate.name}
                      onChange={(event) => updateCandidate(index, 'name', event.target.value)}
                      placeholder="Candidate name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Role</span>
                    <input
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                      value={candidate.role}
                      onChange={(event) => updateCandidate(index, 'role', event.target.value)}
                      placeholder="Candidate role"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Experience</span>
                    <input
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                      value={candidate.experience}
                      onChange={(event) => updateCandidate(index, 'experience', event.target.value)}
                      placeholder="Years, role, or expertise"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Votes</span>
                    <input
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                      type="number"
                      min="0"
                      value={candidate.votes}
                      onChange={(event) => updateCandidate(index, 'votes', Number(event.target.value))}
                      placeholder="0"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Candidate statement</span>
                  <textarea
                    className="mt-2 min-h-[100px] w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    value={candidate.statement}
                    onChange={(event) => updateCandidate(index, 'statement', event.target.value)}
                    placeholder="Candidate campaign statement"
                  />
                </label>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900 sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
          <button
            type="button"
            onClick={addCandidate}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add candidate
          </button>
          <div className="space-y-2 rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/50 dark:bg-slate-950 dark:shadow-slate-900/20">
            <p className="text-sm font-semibold text-slate-950 dark:text-white">Candidate details</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Edit your candidate roster and update vote totals in one place. Changes are saved only when you click Save.</p>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Save candidate roster
          </button>
        </div>
      </div>
    </div>
  )
}

export default CandidateEditorModal
