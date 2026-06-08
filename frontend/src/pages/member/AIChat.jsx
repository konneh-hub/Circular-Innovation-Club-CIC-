import { useEffect, useMemo, useRef, useState } from 'react'
import { FiSend, FiZap } from 'react-icons/fi'
import Button from '../../components/common/Button'
import PageHeader from '../../components/common/PageHeader'

const suggestedQuestions = [
  'How do I download my membership card?',
  'What is the next event I can join?',
  'How do I check in with QR attendance?',
  'How can I access project resources?',
  'Where do I view my certificates?',
]

const mockResponses = [
  {
    keywords: ['membership', 'card', 'download'],
    response:
      'Your membership card is available under the Membership Card section. Open that page, preview your digital card, and use the download button to save it as an image.',
  },
  {
    keywords: ['attendance', 'qr', 'check in', 'check-in'],
    response:
      'For attendance, open the Attendance page and use the QR scanner or paste the event token. Your check-ins will appear in your attendance history immediately.',
  },
  {
    keywords: ['events', 'join', 'upcoming'],
    response:
      'You can view upcoming events under the Events page. Each event card shows the date, location, and registration details so you can join the ones that match your interests.',
  },
  {
    keywords: ['projects', 'resources', 'collaborate'],
    response:
      'Project resources, team status, and collaboration updates are available in the Projects section. Check your assigned projects to see the latest work and contribution opportunities.',
  },
  {
    keywords: ['certificates', 'certificate', 'award'],
    response:
      'Completed events and achievements appear under Certificates. This section helps you track all earned certificates and access them on demand.',
  },
]

const getMockResponse = (message) => {
  const normalized = message.toLowerCase()
  const match = mockResponses.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)))
  return match
    ? match.response
    : 'I’m here to help. Try asking about membership benefits, attendance, upcoming events, or how to use the CIC platform.'
}

const createMessageId = (role) => `${role}-${Math.random().toString(36).slice(2, 10)}`

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 'assistant-1',
      role: 'assistant',
      text: 'Hello! I’m the CIC Assistant. Ask me anything about membership, attendance, events, and your member dashboard.',
    },
  ])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState('')
  const messagesEndRef = useRef(null)

  const formattedMessageCount = useMemo(() => messages.length, [messages])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, typing])

  const sendMessage = (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: createMessageId('user'),
      role: 'user',
      text,
    }

    setMessages((current) => [...current, userMessage])
    setDraft('')
    setTyping(true)
    setActiveSuggestion('')

    setTimeout(() => {
      const assistantMessage = {
        id: createMessageId('assistant'),
        role: 'assistant',
        text: getMockResponse(text),
      }
      setMessages((current) => [...current, assistantMessage])
      setTyping(false)
    }, 900)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(draft)
  }

  const handleSuggestionClick = (question) => {
    setActiveSuggestion(question)
    setDraft(question)
    sendMessage(question)
  }

  return (
    <section className="space-y-8">
      <PageHeader
        title="AI Chat Assistant"
        subtitle="Get answers fast with a friendly CIC assistant built for members."
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <FiZap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Assistant</p>
              <h2 className="text-xl font-semibold">Need help?</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <p>Ask the assistant anything about:</p>
            <ul className="mt-3 space-y-2">
              <li>• Membership card download</li>
              <li>• Event attendance and QR check-in</li>
              <li>• Project collaboration</li>
              <li>• Certificates and rewards</li>
            </ul>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Suggested questions</p>
            <div className="mt-4 grid gap-3">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleSuggestionClick(question)}
                  className={`w-full rounded-3xl border px-4 py-3 text-left text-sm transition ${
                    activeSuggestion === question
                      ? 'border-primary bg-primary/10 text-slate-900 dark:text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Chat stats</p>
            <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <p>{formattedMessageCount} messages exchanged</p>
              <p>{typing ? 'Assistant is typing…' : 'Response time < 1s'}</p>
            </div>
          </div>
        </aside>

        <div className="flex min-h-[70vh] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Conversation</p>
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">CIC AI Assistant</h2>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              Member only support
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-3xl border px-5 py-4 text-sm leading-6 shadow-sm transition ${
                      message.role === 'user'
                        ? 'rounded-br-none border-primary bg-primary text-white shadow-primary/10'
                        : 'rounded-bl-none border-slate-200 bg-slate-100 text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}

              {typing ? (
                <div className="flex justify-start">
                  <div className="max-w-[70%] rounded-3xl border border-slate-200 bg-slate-100 px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-700 dark:bg-slate-200" />
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-700 dark:bg-slate-200" />
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-700 dark:bg-slate-200" />
                    </div>
                  </div>
                </div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 px-6 py-5 dark:border-slate-800">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <textarea
                rows={2}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask the assistant a question..."
                className="min-h-[96px] w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <Button type="submit" className="h-full w-full whitespace-nowrap rounded-full px-6 py-4 sm:w-auto">
                <span className="flex items-center gap-2">
                  <FiSend className="h-4 w-4" />
                  Send
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AIChat
