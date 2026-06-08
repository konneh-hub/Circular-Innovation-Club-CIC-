import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import ResultChart from '../../components/common/ResultChart'
import { fetchAdminElections } from '../../data/adminData'

const ElectionResults = () => {
  const [elections, setElections] = useState(null)
  const [selectedElectionId, setSelectedElectionId] = useState(null)
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

  if (!elections) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading election results...
      </div>
    )
  }

  return (
    <section className="space-y-8">
      <PageHeader
        title="Election Results"
        subtitle="Review vote distribution, leading candidates, and final tallies for CIC elections."
        actions={
          <button
            type="button"
            onClick={() => navigate('/admin/elections')}
            className="rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Manage elections
          </button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Select election</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {elections.map((election) => (
                <button
                  key={election.id}
                  type="button"
                  onClick={() => setSelectedElectionId(election.id)}
                  className={`rounded-3xl border px-4 py-4 text-left transition ${
                    selectedElectionId === election.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900'
                  }`}
                >
                  <h3 className="font-semibold">{election.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{election.type}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{election.stage}</p>
                </button>
              ))}
            </div>
          </div>

          {selectedElection ? (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{selectedElection.type}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{selectedElection.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{selectedElection.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Deadline</p>
                  <p className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{selectedElection.deadline}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Total votes</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{selectedElection.totalVotes}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Candidates</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{selectedElection.candidates.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Status</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{selectedElection.stage}</p>
                </div>
              </div>

              <div className="mt-6">
                <ResultChart candidates={selectedElection.candidates} />
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
              <p className="text-sm">Select an election to see vote share and candidate rankings.</p>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Election leaderboard</h2>
            <div className="mt-4 space-y-3">
              {selectedElection?.candidates
                .slice()
                .sort((a, b) => b.votes - a.votes)
                .map((candidate) => (
                  <div key={candidate.id} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <p className="font-semibold text-slate-950 dark:text-white">{candidate.name}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{candidate.role}</p>
                    <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{candidate.votes} votes</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Usage notes</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              This page displays final tallies, candidate vote share, and the winning candidate by election round. Use the manage elections page for editing election metadata and candidate lists.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default ElectionResults
