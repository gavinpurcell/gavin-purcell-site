import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getGameBySlug, resolveEnding } from '../data/newsMiniGameData'
import './NewsMiniGame.css'

const STAT_KEY_TO_LABEL = {
  credibility: 'Credibility',
  publicTrust: 'Public Trust',
  chaos: 'Chaos',
  control: 'Control',
  absurdity: 'Absurdity',
}

const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)))

const formatClock = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

const isRunningOut = (value) => value <= 20

const createInitialState = (game) => ({
  currentNodeId: game.startNodeId,
  metrics: {
    ...game.initialStats,
  },
  turns: 0,
  elapsedSeconds: 0,
})

const buildNodeMap = (nodes) =>
  nodes.reduce((acc, node) => {
    acc[node.id] = node
    return acc
  }, {})

const NewsMiniGame = () => {
  const game = getGameBySlug('pam-bondi-hearing')
  const nodesById = useMemo(() => buildNodeMap(game.nodes), [game.nodes])
  const [isRunning, setIsRunning] = useState(false)
  const [state, setState] = useState(() => createInitialState(game))
  const [turnLog, setTurnLog] = useState([])
  const [endingId, setEndingId] = useState(null)
  const [turnSecondsLeft, setTurnSecondsLeft] = useState(game.nodes[0].timeLimitSeconds)

  const currentNode = isRunning ? nodesById[state.currentNodeId] : null
  const resolvedEnding = endingId ? game.endingRules.find((rule) => rule.id === endingId) : null
  const turnSecondsElapsed = currentNode
    ? Math.max(0, currentNode.timeLimitSeconds - turnSecondsLeft)
    : 0
  const elapsedSeconds = state.elapsedSeconds + turnSecondsElapsed
  const remainingSessionSeconds = Math.max(0, game.timeBudgetSeconds - elapsedSeconds)

  useEffect(() => {
    if (!isRunning || !currentNode || endingId) return
    setTurnSecondsLeft(currentNode.timeLimitSeconds)
    const tick = setInterval(() => {
      setTurnSecondsLeft((seconds) => {
        if (seconds <= 1) {
          return 0
        }
        return seconds - 1
      })
    }, 1000)
    return () => clearInterval(tick)
  }, [isRunning, currentNode?.id, endingId])

  useEffect(() => {
    if (!isRunning || endingId || !currentNode || !currentNode.choices.length) return
    if (turnSecondsLeft > 0) return

    const fallbackChoiceId = currentNode.fallbackChoiceId || currentNode.choices[0].id
    selectChoice(fallbackChoiceId, true)
  }, [endingId, isRunning, currentNode, turnSecondsLeft])

  const selectChoice = (choiceId, timedOut = false) => {
    if (!isRunning || endingId || !currentNode) return

    const choice = currentNode.choices.find((option) => option.id === choiceId)
    if (!choice) return

    const nodeTimeLimit = currentNode.timeLimitSeconds || 45
    const secondsSpent = timedOut ? nodeTimeLimit : Math.max(0, nodeTimeLimit - turnSecondsLeft)

    const nextMetrics = { ...state.metrics }
    for (const [metric, delta] of Object.entries(choice.effects || {})) {
      nextMetrics[metric] = clamp((nextMetrics[metric] || 0) + delta)
    }

    const nextState = {
      ...state,
      metrics: nextMetrics,
      turns: state.turns + 1,
      elapsedSeconds: Math.min(game.timeBudgetSeconds, state.elapsedSeconds + secondsSpent),
    }

    const nextNodeId = choice.nextNodeId
    setTurnLog((prev) => [
      ...prev,
      {
        nodeTitle: currentNode.title,
        nodeSpeaker: currentNode.speaker,
        choiceLabel: choice.label,
        timedOut,
      },
    ])

    if (!nextNodeId || currentNode.isEndingNode) {
      setState({
        ...nextState,
        currentNodeId: currentNode.id,
      })
      setEndingId(resolveEnding(nextMetrics))
      return
    }

    setState({
      ...nextState,
      currentNodeId: nextNodeId,
    })
  }

  const startRun = () => {
    setIsRunning(true)
    setState(createInitialState(game))
    setTurnLog([])
    setEndingId(null)
  }

  const resetRun = () => {
    setIsRunning(false)
    setTurnLog([])
    setEndingId(null)
    setState(createInitialState(game))
  }

  const MetricBars = () => {
    return (
      <div className="news-metric-grid">
        {Object.entries(state.metrics).map(([metric, value]) => (
          <div key={metric} className="news-metric">
            <div className="news-metric-label">
              <span>{STAT_KEY_TO_LABEL[metric]}</span>
              <span>{value}</span>
            </div>
            <div className="news-metric-track">
              <div
                className="news-metric-fill"
                style={{ width: `${clamp(value)}%` }}
                aria-label={`${STAT_KEY_TO_LABEL[metric]} value`}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const IntroScreen = () => (
    <section className="news-panel">
      <h1>{game.title}</h1>
      <p className="news-subtitle">{game.subtitle}</p>
      <p className="news-copy">{game.description}</p>
      <p className="news-warning">
        Satire is intentionally adult and uses real public names for narrative flavor. No factual claims are intended here.
      </p>
      <div className="news-asset-box">
        <h2>Tomorrow Morning Nanobanana Prompt List</h2>
        <ul>
          {game.assetPrompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={startRun} className="news-start-btn">
        Launch the Mini-Game
      </button>
      <Link to="/" className="news-back-link">
        ← Back to site homepage
      </Link>
    </section>
  )

  const EndingScreen = () => (
    <section className="news-panel">
      <p className="news-subtitle">Hearing result unlocked</p>
      <h1>{resolvedEnding?.title || 'Silent Burn'}</h1>
      <p className="news-copy">
        {resolvedEnding?.summary || 'This run stayed quiet. The day ends with no one fully sure what happened.'}
      </p>
      <div className="news-timeline">
        <h2>Your choice recap</h2>
        <ol>
          {turnLog.map((entry, index) => (
            <li key={`${entry.nodeTitle}-${index}`}>
              <strong>{entry.nodeSpeaker}:</strong> {entry.choiceLabel}
              {entry.timedOut ? ' (auto-selected under time pressure)' : ''}
            </li>
          ))}
        </ol>
      </div>
      <div className="news-metric-wrap">
        <h2>Final state snapshot</h2>
        <MetricBars />
      </div>
      <div className="news-end-actions">
        <button type="button" onClick={resetRun} className="news-start-btn">
          Replay this mini-game
        </button>
      </div>
    </section>
  )

  const GameplayScreen = () => (
    <section className="news-panel">
      <div className="news-header">
        <p className="news-eyebrow">Daily satirical scenario · Node {state.turns + 1}</p>
        <h1>{game.title}</h1>
        <h2>{currentNode.title}</h2>
      </div>
      <div className="news-status-bar">
        <div>
          <p className="news-small">Scene timer</p>
          <p className={`news-timer ${isRunningOut(turnSecondsLeft) ? 'news-timer-warning' : ''}`}>
            {formatClock(turnSecondsLeft)}
          </p>
        </div>
        <div>
          <p className="news-small">Session clock (30 min cycle)</p>
          <p className="news-clock">{formatClock(remainingSessionSeconds)}</p>
        </div>
      </div>
      <div className="news-message">
        <p className="news-speaker">{currentNode.speaker}</p>
        {currentNode.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="news-metric-wrap">
        <MetricBars />
      </div>
      <div className="news-choices" role="list" aria-label="Scene choices">
        {currentNode.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => selectChoice(choice.id)}
            className="news-choice-btn"
          >
            {choice.label}
          </button>
        ))}
      </div>
    </section>
  )

  return (
    <main className="news-page">
      <div className="news-shell">
        {!isRunning ? <IntroScreen /> : resolvedEnding ? <EndingScreen /> : <GameplayScreen />}
      </div>
    </main>
  )
}

export default NewsMiniGame
