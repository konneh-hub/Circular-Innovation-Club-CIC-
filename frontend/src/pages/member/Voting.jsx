import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import CandidateCard from '../../components/cards/CandidateCard'
import ResultChart from '../../components/common/ResultChart'
import { fetchVotingItems } from '../../data/memberData'

const stageProgress = {
  Nomination: 28,
  Voting: 68,
  Results: 100,
  Closed: 100,
}

const Voting = () => {
  const [elections, setElections] = useState(null)
  const [activeElectionId, setActiveElectionId] = useState(null)
  const [selectedVotes, setSelectedVotes] = useState({})
  const [completedVotes, setCompletedVotes] = useState({})
  const [activeTab, setActiveTab] = useState('vote')
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    fetchVotingItems().then((data) => {
      setElections(data)
      setActiveElectionId(data[0]?.id)
    })
  }, [])

  const activeElection = useMemo(
    () => elections?.find((item) => item.id === activeElectionId),
    [elections, activeElectionId]
  )

  const selectedCandidateId = selectedVotes[activeElectionId]
  const votedCandidateId = completedVotes[activeElectionId]
  const hasVoted = Boolean(votedCandidateId)

  const totalElections = elections?.length ?? 0
  const totalCandidates = elections?.reduce((sum, item) => sum + item.candidates.length, 0) ?? 0
  const totalVotes = elections?.reduce((sum, item) => sum + item.totalVotes, 0) ?? 0
  const activeElections = elections?.filter((item) => item.stage === 'Voting').length ?? 0

  const handleSelectCandidate = (candidateId) => {
    if (!activeElection || hasVoted || activeElection.stage !== 'Voting') return
    setSelectedVotes((prev) => ({ ...prev, [activeElectionId]: candidateId }))
  }

  const handleSubmitVote = () => {
    if (!activeElection || hasVoted || !selectedCandidateId) return
    const candidate = activeElection.candidates.find((item) => item.id === selectedCandidateId)
    if (!candidate) return

    setElections((current) =>
      current.map((item) =>
        item.id === activeElectionId
          ? {
              ...item,
              totalVotes: item.totalVotes + 1,
              candidates: item.candidates.map((option) =>
                option.id === selectedCandidateId ? { ...option, votes: option.votes + 1 } : option
              ),
            }
          : item
      )
    )
    setCompletedVotes((prev) => ({ ...prev, [activeElectionId]: selectedCandidateId }))
    setConfirmation({ election: activeElection.title, candidate: candidate.name })
  }

  const closeConfirmation = () => setConfirmation(null)

  if (!elections) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading the online voting system...
      </div>
    )
  }

  return (
    <section className="space-y-8">
      <PageHeader
        title="Online Voting"
        subtitle="Browse elections, pick a candidate, and check live result trends for CIC governance."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant={activeTab === 'vote' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('vote')}
            >
              Vote
            </Button>
            <Button
              type="button"
              variant={activeTab === 'results' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('results')}
            >
              Results
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Elections</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{totalElections}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Open to vote</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{activeElections}</p>
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

          {activeElection ? (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{activeElection.type}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{activeElection.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{activeElection.description}</p>
                </div>
                <div className="space-y-2 text-right">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {activeElection.stage}
                  </span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Deadline: {activeElection.deadline}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Election progress</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{stageProgress[activeElection.stage]}% complete</p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{activeElection.totalVotes} votes</p>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div style={{ width: `${stageProgress[activeElection.stage]}%` }} className="h-full rounded-full bg-primary transition-all duration-300" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Candidates</p>
                    <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{activeElection.candidates.length}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total turnout</p>
                    <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{activeElection.totalVotes}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Participation status</p>
                    <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{hasVoted ? 'Your vote counted' : 'Ready to vote'}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
              <p className="text-sm">No election is selected. Choose one from the right panel to continue.</p>
            </div>
          )}

          {activeElection && activeTab === 'vote' && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Candidate shortlist</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose one candidate to represent CIC in this election.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {activeElection.candidates.length} candidates
                  </div>
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-2">
                  {activeElection.candidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      selected={selectedCandidateId === candidate.id}
                      onSelect={() => handleSelectCandidate(candidate.id)}
                      disabled={hasVoted || activeElection.stage !== 'Voting'}
                      voted={hasVoted}
                    />
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {hasVoted
                        ? 'Your vote has been recorded for this election. Results are available in the Results tab.'
                        : 'Select a candidate card and submit to confirm your vote.'}
                    </p>
                  </div>
                  <Button
                    type="button"
                    disabled={hasVoted || !selectedCandidateId || activeElection.stage !== 'Voting'}
                    onClick={handleSubmitVote}
                  >
                    {hasVoted ? 'Vote confirmed' : 'Confirm vote'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeElection && activeTab === 'results' && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Election results</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Live vote distribution across candidate rankings.</p>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {activeElection.stage}
                  </div>
                </div>
                <div className="mt-6">
                  <ResultChart candidates={activeElection.candidates} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Detailed vote breakdown</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {activeElection.candidates.map((candidate) => (
                    <div key={candidate.id} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{candidate.name}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{candidate.role}</p>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{candidate.statement}</p>
                      <p className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">{candidate.votes} votes</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">All elections</h2>
            <div className="mt-5 space-y-3">
              {elections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveElectionId(item.id)}
                  className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                    activeElectionId === item.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">{item.title}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">{item.stage}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Help & confirmation</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Click a candidate card to pick your preferred representative.</p>
              <p>Confirm once. Your vote is recorded instantly and reflected in the results.</p>
              <p>Use the Results tab to review vote share and candidate rankings.</p>
            </div>
          </div>
        </aside>
      </div>

      {confirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl shadow-slate-900/20 dark:bg-slate-950 dark:text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary">Vote confirmed</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Thanks for voting</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  You have successfully cast your vote for <span className="font-semibold text-slate-900 dark:text-white">{confirmation.candidate}</span> in the <span className="font-semibold text-slate-900 dark:text-white">{confirmation.election}</span>.
                </p>
              </div>
              <button
                type="button"
                onClick={closeConfirmation}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Voting
