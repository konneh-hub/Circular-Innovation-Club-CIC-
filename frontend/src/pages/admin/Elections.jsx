import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import ElectionForm from '../../components/forms/ElectionForm'
import CandidateEditorModal from '../../components/forms/CandidateEditorModal'
import ElectionTable from '../../components/tables/ElectionTable'
import { fetchAdminElections } from '../../data/adminData'

const stageProgress = {
  Nomination: 28,
  Voting: 68,
  Results: 100,
  Closed: 100,
}

const Elections = () => {
  const [elections, setElections] = useState(null)
  const [selectedElectionId, setSelectedElectionId] = useState(null)
  const [formMode, setFormMode] = useState(null)
  const [editingElection, setEditingElection] = useState(null)
  const [candidateModalOpen, setCandidateModalOpen] = useState(false)
  const [candidateElection, setCandidateElection] = useState(null)
  const [candidateQuery, setCandidateQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchAdminElections().then((data) => {
      setElections(data)
      setSelectedElectionId(data[0]?.id)
    })
  }, [])

  const selectedElection = useMemo(
    () => elections?.find((item) => item.id === selectedElectionId),
    [elections, selectedElectionId]
  )

  const filteredCandidates = useMemo(() => {
    if (!selectedElection) return []
    const query = candidateQuery.trim().toLowerCase()
    if (!query) return selectedElection.candidates

    return selectedElection.candidates.filter((candidate) =>
      [candidate.name, candidate.role, candidate.experience, candidate.statement]
        .join(' ')
        .toLowerCase()
        .includes(query)
    )
  }, [selectedElection, candidateQuery])

  const openCreateForm = () => {
    setEditingElection(null)
    setFormMode('create')
  }

  const openEditForm = (election) => {
    setEditingElection(election)
    setFormMode('edit')
  }

  const closeForm = () => {
    setFormMode(null)
    setEditingElection(null)
  }

  const handleSubmit = (election) => {
    setElections((current) => {
      if (!current) return [election]
      if (formMode === 'edit') {
        return current.map((item) => (item.id === election.id ? election : item))
      }
      return [election, ...current]
    })
    setSelectedElectionId(election.id)
    closeForm()
  }

  const handleDelete = (electionId) => {
    if (!window.confirm('Remove this election from the system?')) return
    setElections((current) => current.filter((item) => item.id !== electionId))
    if (selectedElectionId === electionId) {
      setSelectedElectionId(null)
    }
  }

  const handleViewResults = () => {
    navigate('/admin/elections/results')
  }

  const openCandidateEditor = (election) => {
    setCandidateElection(election)
    setCandidateModalOpen(true)
  }

  const closeCandidateEditor = () => {
    setCandidateModalOpen(false)
    setCandidateElection(null)
  }

  const handleSaveCandidates = (updatedCandidates) => {
    setElections((current) =>
      current.map((item) =>
        item.id === candidateElection.id
          ? {
              ...item,
              candidates: updatedCandidates,
              totalVotes: updatedCandidates.reduce((sum, candidate) => sum + Number(candidate.votes || 0), 0),
            }
          : item
      )
    )
    if (selectedElectionId === candidateElection.id) {
      setSelectedElectionId(candidateElection.id)
    }
    closeCandidateEditor()
  }

  if (!elections) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading election management tools...
      </div>
    )
  }

  const totalVotes = elections.reduce((sum, election) => sum + election.totalVotes, 0)
  const totalElections = elections.length
  const totalCandidates = elections.reduce((sum, election) => sum + election.candidates.length, 0)
  const activeElectionCount = elections.filter((election) => election.stage === 'Voting').length

  return (
    <section className="space-y-8">
      <PageHeader
        title="Election Management"
        subtitle="Create elections, review vote tallies, and manage candidate rounds from a dedicated admin console."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openCreateForm}
              className="rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              New election
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/elections/results')}
              className="rounded-3xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Results page
            </button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.75fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Elections</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{totalElections}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Open voting</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{activeElectionCount}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Candidates</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{totalCandidates}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Votes cast</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{totalVotes}</p>
              </div>
            </div>
          </div>

          <ElectionTable
            elections={elections}
            onView={(election) => {
              setSelectedElectionId(election.id)
              setCandidateQuery('')
            }}
            onEdit={openEditForm}
            onDelete={handleDelete}
            onResults={handleViewResults}
          />
        </div>

        <aside className="space-y-6">
          {selectedElection ? (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{selectedElection.title}</h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{selectedElection.description}</p>
                </div>
                <div className="space-y-2 text-right">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {selectedElection.stage}
                  </span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Deadline: {selectedElection.deadline}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Candidate count</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{selectedElection.candidates.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Total votes</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{selectedElection.totalVotes}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.95fr]">
                <div className="space-y-4">
                  <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Election progress</p>
                        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                          <div
                            style={{ width: `${stageProgress[selectedElection.stage]}%` }}
                            className="h-full rounded-full bg-primary transition-all duration-300"
                          />
                        </div>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{stageProgress[selectedElection.stage]}% complete</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openCandidateEditor(selectedElection)}
                        className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Manage candidates
                      </button>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Election details</h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40 dark:bg-slate-950 dark:shadow-slate-900/20">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Candidate count</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{selectedElection.candidates.length}</p>
                      </div>
                      <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40 dark:bg-slate-950 dark:shadow-slate-900/20">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Total votes</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{selectedElection.totalVotes}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Candidate roster</h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Search or filter names, roles, and statements.</p>
                    </div>
                    <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      {filteredCandidates.length}/{selectedElection.candidates.length}
                    </span>
                  </div>

                  <label className="mt-4 block">
                    <span className="sr-only">Search candidates</span>
                    <input
                      type="search"
                      value={candidateQuery}
                      onChange={(event) => setCandidateQuery(event.target.value)}
                      placeholder="Search candidates"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </label>

                  <div className="mt-5 space-y-3">
                    {filteredCandidates.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                        No candidates match the current filter.
                      </div>
                    ) : (
                      filteredCandidates.map((candidate) => (
                        <div key={candidate.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-slate-900/20">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="font-semibold text-slate-950 dark:text-white">{candidate.name}</p>
                              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{candidate.role}</p>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">{candidate.votes} votes</span>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{candidate.statement || 'No statement provided.'}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
              <p className="text-sm">Select an election entry from the table to review details and results.</p>
            </div>
          )}

          {formMode && (
            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
              <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl shadow-slate-900/10 dark:bg-slate-950 dark:text-white">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{formMode === 'edit' ? 'Edit election' : 'Create election'}</p>
                    <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                      {formMode === 'edit' ? 'Update election details' : 'Add a new election'}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>
                <ElectionForm election={editingElection} onSubmit={handleSubmit} onCancel={closeForm} />
              </div>
            </div>
          )}

          <CandidateEditorModal
            election={candidateElection}
            open={candidateModalOpen}
            onClose={closeCandidateEditor}
            onSave={handleSaveCandidates}
          />
        </aside>
      </div>
    </section>
  )
}

export default Elections
