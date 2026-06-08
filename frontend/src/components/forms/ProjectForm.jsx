import { useEffect, useState } from 'react'
import Button from '../common/Button'

const defaultFormData = {
  name: '',
  category: '',
  manager: '',
  stage: 'Planning',
  status: 'Active',
  progress: 0,
  deadline: '',
  description: '',
  members: '',
  files: '',
}

const statusOptions = ['Active', 'Upcoming', 'Completed', 'On hold']
const stageOptions = ['Planning', 'Design', 'Execution', 'Review']

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(defaultFormData)

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        category: project.category || '',
        manager: project.manager || '',
        stage: project.stage || 'Planning',
        status: project.status || 'Active',
        progress: project.progress ?? 0,
        deadline: project.deadline || '',
        description: project.description || '',
        members: project.members ? project.members.map((member) => member.name).join(', ') : '',
        files: project.files ? project.files.map((file) => file.name).join(', ') : '',
      })
    } else {
      setFormData(defaultFormData)
    }
  }, [project])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const preparedProject = {
      ...project,
      ...formData,
      progress: Number(formData.progress),
      members: formData.members
        .split(',')
        .map((name) => name.trim())
        .filter(Boolean)
        .map((name) => ({ name, role: 'Contributor' })),
      files: formData.files
        .split(',')
        .map((name, index) => ({ id: `new-file-${index}-${Date.now()}`, name: name.trim(), type: 'PDF', uploaded: 'Today' }))
        .filter((file) => file.name),
    }

    onSubmit(preparedProject)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Name</span>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Category</span>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Manager</span>
          <input
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Deadline</span>
          <input
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Stage</span>
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            {stageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Progress (%)</span>
          <input
            name="progress"
            type="number"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Team members</span>
          <input
            name="members"
            value={formData.members}
            onChange={handleChange}
            placeholder="Comma-separated names"
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
        <span>Description</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
      </label>

      <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
        <span>Files</span>
        <input
          name="files"
          value={formData.files}
          onChange={handleChange}
          placeholder="Comma-separated file names"
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="w-full sm:w-auto">
          Save project
        </Button>
      </div>
    </form>
  )
}

export default ProjectForm
