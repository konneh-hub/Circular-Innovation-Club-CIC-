import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import ProjectCard from '../../components/cards/ProjectCard'
import ProjectForm from '../../components/forms/ProjectForm'
import ProjectTable from '../../components/tables/ProjectTable'
import { fetchAdminProjects } from '../../data/adminData'

const Projects = () => {
  const [projects, setProjects] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [formMode, setFormMode] = useState(null)
  const [editingProject, setEditingProject] = useState(null)

  useEffect(() => {
    fetchAdminProjects().then(setProjects)
  }, [])

  const openCreateForm = () => {
    setEditingProject(null)
    setFormMode('create')
  }

  const openEditForm = (project) => {
    setEditingProject(project)
    setFormMode('edit')
  }

  const closeForm = () => {
    setFormMode(null)
    setEditingProject(null)
  }

  const handleProjectSubmit = (project) => {
    if (formMode === 'edit') {
      setProjects((current) => current.map((item) => (item.id === project.id ? project : item)))
      setSelectedProject((current) => (current?.id === project.id ? project : current))
    } else {
      setProjects((current) => [{ ...project, id: `project-${Date.now()}` }, ...(current ?? [])])
    }
    closeForm()
  }

  const handleProjectDelete = (projectId) => {
    if (!window.confirm('Delete this project? This action cannot be undone.')) return
    setProjects((current) => current.filter((item) => item.id !== projectId))
    if (selectedProject?.id === projectId) {
      setSelectedProject(null)
    }
  }

  if (!projects) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading project management...
      </div>
    )
  }

  return (
    <section className="space-y-8">
      <PageHeader
        title="Project Management"
        subtitle="Manage CIC projects, teams, files, and progress tracking."
        actions={
          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            New Project
          </button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="border-b border-slate-200 p-6 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Project list</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Browse and manage active CIC projects.</p>
            </div>
            <div className="p-6">
              <ProjectTable projects={projects} onView={setSelectedProject} onEdit={openEditForm} onDelete={handleProjectDelete} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.name}
                category={project.category}
                description={project.description}
                manager={project.manager}
                progress={project.progress}
                status={project.status}
                tags={[project.stage, project.deadline]}
              />
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          {selectedProject ? (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{selectedProject.name}</h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{selectedProject.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(selectedProject)}
                    className="rounded-3xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProjectDelete(selectedProject.id)}
                    className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/60"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manager</p>
                    <p className="mt-2 font-semibold text-slate-950 dark:text-white">{selectedProject.manager}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Deadline</p>
                    <p className="mt-2 font-semibold text-slate-950 dark:text-white">{selectedProject.deadline}</p>
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Progress tracking</p>
                  <div className="mt-4 rounded-full bg-slate-200 p-1 dark:bg-slate-800">
                    <div className="h-3 rounded-full bg-primary" style={{ width: `${selectedProject.progress}%` }} />
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{selectedProject.progress}% complete</p>
                </div>

                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Team members</p>
                  <ul className="mt-4 space-y-3">
                    {selectedProject.members.map((member) => (
                      <li key={member.name} className="rounded-3xl bg-white p-3 text-sm text-slate-700 shadow-sm shadow-slate-200/40 dark:bg-slate-950 dark:text-slate-200 dark:shadow-slate-900/20">
                        <div className="flex items-center justify-between gap-4">
                          <span>{member.name}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{member.role}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Files</p>
                  <div className="mt-4 space-y-3">
                    {selectedProject.files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm shadow-slate-200/40 dark:bg-slate-950 dark:text-slate-200 dark:shadow-slate-900/20">
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{file.type} • {file.uploaded}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">Download</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Milestones</p>
                  <div className="mt-4 space-y-3">
                    {selectedProject.milestones.map((milestone) => (
                      <div key={milestone.title} className="rounded-3xl bg-white p-4 dark:bg-slate-950">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-medium text-slate-950 dark:text-white">{milestone.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{milestone.status}</p>
                          </div>
                          <span className="text-sm text-slate-600 dark:text-slate-400">{milestone.progress}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Project details</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Select a project from the list to see members, files, milestone tracking, and quick actions.</p>
          </div>
        )}

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Summary</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total projects</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{projects.length}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Average progress</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
                {Math.round(projects.reduce((sum, item) => sum + item.progress, 0) / Math.max(projects.length, 1))}%
              </p>
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
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{formMode === 'edit' ? 'Edit project' : 'Create project'}</p>
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{formMode === 'edit' ? 'Update project details' : 'Add a new project'}</h2>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
            <ProjectForm project={editingProject} onSubmit={handleProjectSubmit} onCancel={closeForm} />
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
