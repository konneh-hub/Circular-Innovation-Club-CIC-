import Button from '../common/Button'

const statusStyles = {
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Upcoming: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Completed: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  'On hold': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
}

const ProjectTable = ({ projects, onView, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-700 dark:text-slate-300">
      <thead>
        <tr className="bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-200">
          <th className="px-5 py-4">Project</th>
          <th className="px-5 py-4">Manager</th>
          <th className="px-5 py-4">Stage</th>
          <th className="px-5 py-4">Progress</th>
          <th className="px-5 py-4">Status</th>
          <th className="px-5 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id} className="border-t border-slate-200 dark:border-slate-800">
            <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">{project.name}</td>
            <td className="px-5 py-4">{project.manager}</td>
            <td className="px-5 py-4">{project.stage}</td>
            <td className="px-5 py-4">
              <div className="rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
              </div>
              <span className="mt-2 block text-xs text-slate-500 dark:text-slate-400">{project.progress}%</span>
            </td>
            <td className="px-5 py-4">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[project.status]}`}>
                {project.status}
              </span>
            </td>
            <td className="px-5 py-4 text-right">
              <div className="inline-flex flex-wrap gap-2 justify-end">
                <Button variant="secondary" className="px-3 py-2 text-xs" onClick={() => onView(project)}>
                  View
                </Button>
                <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onEdit(project)}>
                  Edit
                </Button>
                <Button variant="ghost" className="px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/50" onClick={() => onDelete(project.id)}>
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default ProjectTable
