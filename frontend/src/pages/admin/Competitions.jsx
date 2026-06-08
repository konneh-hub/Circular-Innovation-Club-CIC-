import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import CompetitionCard from '../../components/cards/CompetitionCard'
import CompetitionForm from '../../components/forms/CompetitionForm'
import CompetitionTable from '../../components/tables/CompetitionTable'
import { fetchAdminCompetitions } from '../../data/adminData'

const statusStyles = {
  Open: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Review: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Closed: 'bg-slate-100 text-slate-600 dark:bg-slate-800/40 dark:text-slate-300',
}

const Competitions = () => {
  const [competitions, setCompetitions] = useState(null)
  const [selectedCompetition, setSelectedCompetition] = useState(null)
  const [formMode, setFormMode] = useState(null)
  const [editingCompetition, setEditingCompetition] = useState(null)

  useEffect(() => {
    fetchAdminCompetitions().then((data) => {
      setCompetitions(data)
      setSelectedCompetition(data[0] ?? null)
    })
  }, [])

  const openCreateForm = () => {
    setEditingCompetition(null)
    setFormMode('create')
  }

  const openEditForm = (competition) => {
    setEditingCompetition(competition)
    setFormMode('edit')
  }

  const closeForm = () => {
    setFormMode(null)
    setEditingCompetition(null)
  }

  const handleCompetitionSubmit = (competition) => {
    setCompetitions((current) => {
      if (!current) return [competition]
      if (formMode === 'edit') {
        return current.map((item) => (item.id === competition.id ? competition : item))
      }
      return [{ ...competition, id: `competition-${Date.now()}` }, ...current]
    })
    setSelectedCompetition((current) => (current?.id === competition.id ? competition : current))
    closeForm()
  }

  const handleCompetitionDelete = (competitionId) => {
    if (!window.confirm('Delete this competition? This action cannot be undone.')) return
    setCompetitions((current) => current.filter((item) => item.id !== competitionId))
    if (selectedCompetition?.id === competitionId) {
      setSelectedCompetition(null)
    }
  }

  const updateSelectedCompetition = (updater) => {
    setCompetitions((current) => current.map((item) => (item.id === selectedCompetition.id ? updater(item) : item)))
    setSelectedCompetition((current) => (current ? updater(current) : null))
  }

  const handleRegisterTeam = () => {
    if (!selectedCompetition) return
    const nextTeam = {
      id: `team-${Date.now()}`,
      teamName: `Team ${selectedCompetition.registrationTeams.length + 1}`,
      lead: `Lead ${selectedCompetition.registrationTeams.length + 1}`,
      status: 'Registered',
      registeredAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    updateSelectedCompetition((competition) => ({
      ...competition,
      registrationTeams: [...competition.registrationTeams, nextTeam],
    }))
  }

  const handleUploadSubmission = () => {
    if (!selectedCompetition) return
    const nextSubmission = {
      id: `submission-${Date.now()}`,
      title: `Prototype package ${selectedCompetition.submissions.length + 1}`,
      team: selectedCompetition.registrationTeams.length > 0 ? selectedCompetition.registrationTeams[selectedCompetition.registrationTeams.length - 1].teamName : 'New Team',
      fileName: `submission-${selectedCompetition.submissions.length + 1}.pdf`,
      uploaded: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Received',
    }
    updateSelectedCompetition((competition) => ({
      ...competition,
      submissions: [...competition.submissions, nextSubmission],
    }))
  }

  const handleAssignJudge = () => {
    if (!selectedCompetition) return
    updateSelectedCompetition((competition) => {
      const nextJudge = competition.judges.find((judge) => !judge.assigned)
      if (!nextJudge) return competition
      return {
        ...competition,
        judges: competition.judges.map((judge) =>
          judge.id === nextJudge.id ? { ...judge, assigned: true } : judge
        ),
      }
    })
  }

  const handleScoreTeam = () => {
    if (!selectedCompetition) return
    const judge = selectedCompetition.judges.find((judge) => judge.assigned)
    const team = selectedCompetition.registrationTeams[0]
    if (!judge || !team) return
    const nextScore = {
      id: `score-${Date.now()}`,
      teamName: team.teamName,
      judgeName: judge.name,
      score: Math.floor(70 + Math.random() * 30),
      notes: 'Judging round score',
    }
    updateSelectedCompetition((competition) => ({
      ...competition,
      scores: [...competition.scores, nextScore],
    }))
  }

  const handlePickWinner = () => {
    if (!selectedCompetition) return
    const scoreMap = selectedCompetition.scores.reduce((acc, score) => {
      acc[score.teamName] = acc[score.teamName] || []
      acc[score.teamName].push(score.score)
      return acc
    }, {})
    const winnerTeam = Object.entries(scoreMap).reduce((best, [teamName, scoreList]) => {
      const average = scoreList.reduce((sum, value) => sum + value, 0) / scoreList.length
      if (!best || average > best.average) return { teamName, average }
      return best
    }, null)
    if (!winnerTeam) return
    updateSelectedCompetition((competition) => ({
      ...competition,
      winner: {
        teamName: winnerTeam.teamName,
        averageScore: Math.round(winnerTeam.average),
        awardedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      },
    }))
  }

  if (!competitions) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading competition management...
      </div>
    )
  }

  const totalTeams = competitions.reduce((sum, competition) => sum + competition.registrationTeams.length, 0)
  const totalSubmissions = competitions.reduce((sum, competition) => sum + competition.submissions.length, 0)
  const totalJudges = competitions.reduce((sum, competition) => sum + competition.judges.filter((judge) => judge.assigned).length, 0)
  const totalScores = competitions.reduce((sum, competition) => sum + competition.scores.length, 0)

  const averageScore = selectedCompetition
    ? selectedCompetition.scores.length
      ? Math.round(selectedCompetition.scores.reduce((sum, score) => sum + score.score, 0) / selectedCompetition.scores.length)
      : 0
    : 0

  return (
    <section className="space-y-8">
      <PageHeader
        title="Innovation Competitions"
        subtitle="Create, manage, and score CIC innovation challenges from one admin dashboard."
        actions={
          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            New Competition
          </button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="border-b border-slate-200 p-6 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Competition list</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Track competition rounds, entries, judges, and winner selection.</p>
            </div>
            <div className="p-6">
              <CompetitionTable competitions={competitions} onView={setSelectedCompetition} onEdit={openEditForm} onDelete={handleCompetitionDelete} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {competitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                title={competition.title}
                category={competition.category}
                prize={competition.prize}
                deadline={competition.deadline}
                status={competition.status}
                registrationCount={competition.registrationTeams.length}
                judgeCount={competition.judges.filter((judge) => judge.assigned).length}
                submissionCount={competition.submissions.length}
                averageScore={competition.scores.length ? Math.round(competition.scores.reduce((sum, score) => sum + score.score, 0) / competition.scores.length) : 0}
                onSelect={() => setSelectedCompetition(competition)}
              />
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          {selectedCompetition ? (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{selectedCompetition.title}</h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{selectedCompetition.description}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[selectedCompetition.status]}`}>
                  {selectedCompetition.status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Prize pool</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{selectedCompetition.prize}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Deadline</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{selectedCompetition.deadline}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Registered teams</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{selectedCompetition.registrationTeams.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Assigned judges</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{selectedCompetition.judges.filter((judge) => judge.assigned).length}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={handleRegisterTeam}
                    className="rounded-3xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  >
                    Register team
                  </button>
                  <button
                    type="button"
                    onClick={handleUploadSubmission}
                    className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Upload submission
                  </button>
                  <button
                    type="button"
                    onClick={handleAssignJudge}
                    className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    Assign judge
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={handleScoreTeam}
                    className="rounded-3xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300"
                  >
                    Add score
                  </button>
                  <button
                    type="button"
                    onClick={handlePickWinner}
                    className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Pick winner
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditForm(selectedCompetition)}
                    className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Edit competition
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Latest registrations</h3>
                  <div className="mt-4 space-y-3">
                    {selectedCompetition.registrationTeams.slice(-3).map((team) => (
                      <div key={team.id} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40 dark:bg-slate-950 dark:text-slate-200 dark:shadow-slate-900/20">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-medium text-slate-950 dark:text-white">{team.teamName}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Lead: {team.lead}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{team.status}</span>
                        </div>
                      </div>
                    ))}
                    {selectedCompetition.registrationTeams.length === 0 && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">No teams registered yet.</p>
                    )}
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Submission queue</h3>
                  <div className="mt-4 space-y-3">
                    {selectedCompetition.submissions.slice(-3).map((submission) => (
                      <div key={submission.id} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40 dark:bg-slate-950 dark:text-slate-200 dark:shadow-slate-900/20">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-medium text-slate-950 dark:text-white">{submission.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{submission.team} • {submission.fileName}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{submission.status}</span>
                        </div>
                      </div>
                    ))}
                    {selectedCompetition.submissions.length === 0 && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">No submissions uploaded yet.</p>
                    )}
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Judges and scoring</h3>
                  <div className="mt-4 space-y-3">
                    {selectedCompetition.judges.map((judge) => (
                      <div key={judge.id} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40 dark:bg-slate-950 dark:text-slate-200 dark:shadow-slate-900/20">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-medium text-slate-950 dark:text-white">{judge.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Expertise: {judge.expertise}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{judge.assigned ? 'Assigned' : 'Pending'}</span>
                        </div>
                      </div>
                    ))}
                    {selectedCompetition.judges.length === 0 && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">No judges available yet.</p>
                    )}
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Winner dashboard</h3>
                  {selectedCompetition.winner ? (
                    <div className="mt-4 space-y-3 rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40 dark:bg-slate-950 dark:text-slate-200 dark:shadow-slate-900/20">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Winner</p>
                      <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{selectedCompetition.winner.teamName}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Average score: {selectedCompetition.winner.averageScore}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Awarded on {selectedCompetition.winner.awardedOn}</p>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">No winner selected yet.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Competition details</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Select a competition from the list to view team registrations, submissions, judges, and scoring.</p>
            </div>
          )}

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Summary</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total competitions</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{competitions.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total registered teams</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{totalTeams}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total submissions</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{totalSubmissions}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total assigned judges</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{totalJudges}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total score entries</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{totalScores}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {formMode && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl shadow-slate-900/10 dark:bg-slate-950 dark:text-white">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{formMode === 'edit' ? 'Edit competition' : 'Create competition'}</p>
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{formMode === 'edit' ? 'Update competition details' : 'Add a new competition'}</h2>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
            <CompetitionForm competition={editingCompetition} onSubmit={handleCompetitionSubmit} onCancel={closeForm} />
          </div>
        </div>
      )}
    </section>
  )
}

export default Competitions
