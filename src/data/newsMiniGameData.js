export const pamBondiHearingGame = {
  id: 'pam-bondi-hearing-v1',
  slug: 'pam-bondi-hearing',
  title: "Pam Bondi’s Hearing",
  subtitle: 'Satire play: Phoenix Wright energy, but with fewer robes and more panic.',
  description:
    'A 30-minute courtroom-adjacent meltdown where every decision moves the story toward glory, chaos, legal drama, or one of several weird endings.',
  startNodeId: 'wake-up-alert',
  timeBudgetSeconds: 1800,
  initialStats: {
    credibility: 50,
    publicTrust: 48,
    chaos: 39,
    control: 56,
    absurdity: 20,
  },
  assetPrompts: [
    'Generate 6 character images for: Pam Bondi, committee chair, reporter, your communications director, and two generic anchors. Include calm, angry, smug, and confused expressions.',
    'Create one hallway/office background with dramatic legal lighting and one crowded hearing room background with TV monitors.',
    'Create reaction assets: "smug grin", "gasp", "double-take", "courtroom gasp", and "victory fist pump".',
    'Generate a satirical courtroom UI card set for headlines, timestamped exhibits, and fact-check popups.',
    'Create a looping hallway ambience with phone buzz, hallway chatter, and camera shutters.',
  ],
  nodes: [
    {
      id: 'wake-up-alert',
      title: '4:05 AM: The Wake-Up Call',
      speaker: 'Ops Dispatcher',
      timeLimitSeconds: 40,
      lines: [
        "You wake up to a red screen on your phone: 'Hearing starts in 90 minutes. Do not say anything definitive.'",
        'Your coffee tastes like a legal memo. The day has already reached critical mass.',
      ],
      choices: [
        {
          id: 'legal-brief',
          label: 'Draft a tight legal brief and walk in with receipts.',
          effects: { credibility: 8, control: 6, publicTrust: 3, chaos: -4, absurdity: -2 },
          nextNodeId: 'prep-room',
          tone: 'clean-cut',
        },
        {
          id: 'meme-official',
          label: 'Publish a funny caption thread before the hearing. "No comment, just vibes."',
          effects: { credibility: -6, chaos: 16, publicTrust: -10, control: -8, absurdity: 18 },
          nextNodeId: 'prep-room',
          tone: 'chaotic',
        },
        {
          id: 'bare-minimum',
          label: 'Go in with one-page talking points and a very stern face.',
          effects: { credibility: 2, control: 1, publicTrust: -2, chaos: 4, absurdity: 3 },
          nextNodeId: 'prep-room',
          tone: 'steady',
        },
      ],
      fallbackChoiceId: 'bare-minimum',
    },
    {
      id: 'prep-room',
      title: 'Prep Room, 20 Minutes Before',
      speaker: 'Research Director',
      timeLimitSeconds: 42,
      lines: [
        "Your comms room smells like burnt toast and panic. Someone is still trying to rename your office conference call 'For Your Eyes and The Network'.",
        'The first exhibit is missing and your lawyer is still on mute.',
      ],
      choices: [
        {
          id: 'request-sequence',
          label: 'Ask for a clean timeline and walk witnesses through it.',
          effects: { credibility: 9, control: 7, publicTrust: 5, chaos: -6, absurdity: -1 },
          nextNodeId: 'evidence-dump',
          tone: 'strategic',
        },
        {
          id: 'question-everything',
          label: 'Demand to know who approved the witness list and why.',
          effects: { credibility: 3, control: 1, publicTrust: -4, chaos: 7, absurdity: 6 },
          nextNodeId: 'evidence-dump',
          tone: 'combative',
        },
        {
          id: 'ai-spin',
          label: 'Tell an AI assistant to draft a "calm but not boring" opening.',
          effects: { credibility: -2, control: -2, publicTrust: -5, chaos: 12, absurdity: 9 },
          nextNodeId: 'evidence-dump',
          tone: 'chaotic',
        },
      ],
      fallbackChoiceId: 'request-sequence',
    },
    {
      id: 'evidence-dump',
      title: 'Evidence Room Jolt',
      speaker: 'Staff Attorney',
      timeLimitSeconds: 45,
      lines: [
        'A USB drive appears. Someone says it contains the only document that lines up with the question.',
        'Three people argue over whether it is “context” or “evidence,” while one person plays a meme in the background at volume 100.',
      ],
      choices: [
        {
          id: 'show-clean-exhibit',
          label: 'Use the clean exhibit and call out the timeline clearly.',
          effects: { credibility: 10, publicTrust: 7, control: 4, chaos: -5, absurdity: -1 },
          nextNodeId: 'opening-floor',
          tone: 'confident',
        },
        {
          id: 'show-unlabeled-exhibit',
          label: 'Use the unlabeled backup and hope nobody notices file dates.',
          effects: { credibility: -4, control: -1, publicTrust: -3, chaos: 6, absurdity: 5 },
          nextNodeId: 'opening-floor',
          tone: 'risky',
        },
        {
          id: 'skip-evidence',
          label: 'Skip the papers and focus on tone, optics, and posture.',
          effects: { credibility: -2, control: 2, publicTrust: 2, chaos: 9, absurdity: 12 },
          nextNodeId: 'opening-floor',
          tone: 'theatrical',
        },
      ],
      fallbackChoiceId: 'show-clean-exhibit',
    },
    {
      id: 'opening-floor',
      title: 'Opening Statement: "Order Please"',
      speaker: 'Committee Chair',
      timeLimitSeconds: 38,
      lines: [
        'The gavel hits like a slow clap from hell. Every camera turns at once.',
        'One channel says this is serious. Another says this is a reality show.',
      ],
      choices: [
        {
          id: 'policy-first',
          label: 'Lead with process, deadlines, and what was already publicly disclosed.',
          effects: { credibility: 9, publicTrust: 6, control: 5, chaos: -4, absurdity: -2 },
          nextNodeId: 'press-surge',
          tone: 'measured',
        },
        {
          id: 'comedic-deflection',
          label: 'Disarm with self-aware satire: "I’m not sure if this is a hearing or improv."',
          effects: { credibility: -1, publicTrust: -6, control: -5, chaos: 11, absurdity: 14 },
          nextNodeId: 'press-surge',
          tone: 'chaotic-comedic',
        },
        {
          id: 'blame-calendar',
          label: 'Blame scheduling and the calendar chaos; ask for a clean lane.',
          effects: { credibility: -4, publicTrust: -5, control: -3, chaos: 10, absurdity: 9 },
          nextNodeId: 'press-surge',
          tone: 'defensive',
        },
      ],
      fallbackChoiceId: 'policy-first',
    },
    {
      id: 'press-surge',
      title: 'Live Feed, Outside the Door',
      speaker: 'Media Monitor',
      timeLimitSeconds: 40,
      lines: [
        'The live clip is spreading before your sentence lands.',
        'Your image is already split into "victim," "liar," and "viral meme candidate" tabs by three different channels.',
      ],
      choices: [
        {
          id: 'release-statement',
          label: 'Release a short clarifying statement: three sentences, no adjectives.',
          effects: { credibility: 7, publicTrust: 8, control: 4, chaos: -5, absurdity: -3 },
          nextNodeId: 'witness-interrupt',
          tone: 'surgical',
        },
        {
          id: 'no-comment',
          label: 'Go fully silent: "No comment, please work through counsel."',
          effects: { credibility: -5, publicTrust: -6, control: 6, chaos: 8, absurdity: 6 },
          nextNodeId: 'witness-interrupt',
          tone: 'opaque',
        },
        {
          id: 'half-confess',
          label: 'Admit one factual misspeak and own it fast.',
          effects: { credibility: 6, publicTrust: 6, control: -3, chaos: 5, absurdity: 3 },
          nextNodeId: 'witness-interrupt',
          tone: 'honest',
        },
      ],
      fallbackChoiceId: 'release-statement',
    },
    {
      id: 'witness-interrupt',
      title: 'Cross-Examination Surprise',
      speaker: 'Opposing Counsel',
      timeLimitSeconds: 36,
      lines: [
        'The board turns. A witness appears to answer for everyone.',
        'The question sounds simple. The answer can only come from your best version of reality management.',
      ],
      choices: [
        {
          id: 'object-and-clarify',
          label: 'Object briefly, then clarify the record with evidence language.',
          effects: { credibility: 8, publicTrust: 5, control: 6, chaos: -3, absurdity: -1 },
          nextNodeId: 'final-sprint',
          tone: 'professional',
        },
        {
          id: 'answer-all-at-once',
          label: 'Answer every accusation in one long, dramatic monologue.',
          effects: { credibility: -8, publicTrust: -9, control: -6, chaos: 14, absurdity: 11 },
          nextNodeId: 'final-sprint',
          tone: 'performative',
        },
        {
          id: 'pivot-to-policy',
          label: 'Ignore the point and launch a broad policy reform proposal.',
          effects: { credibility: 2, publicTrust: -2, control: 2, chaos: 7, absurdity: 9 },
          nextNodeId: 'final-sprint',
          tone: 'strategic-chaos',
        },
      ],
      fallbackChoiceId: 'object-and-clarify',
    },
    {
      id: 'final-sprint',
      title: 'Final Statement Window',
      speaker: 'You',
      timeLimitSeconds: 30,
      lines: [
        'The room expects one clean sentence and hopes it is not a trap.',
        'Your next line sets the ending state for the whole day.',
      ],
      choices: [
        {
          id: 'close-the-loop',
          label: 'Close the loop, accept fault, and move on with concrete action.',
          effects: { credibility: 10, publicTrust: 10, control: 4, chaos: -4, absurdity: -2 },
          tone: 'clean',
        },
        {
          id: 'go-full-drama',
          label: 'Go full drama: "This is a larger movement than this hearing."',
          effects: { credibility: 3, publicTrust: 0, control: -4, chaos: 11, absurdity: 13 },
          tone: 'grandstanding',
        },
        {
          id: 'soft-apology',
          label: 'Offer a sincere apology for timing and communication breakdown.',
          effects: { credibility: 6, publicTrust: 8, control: 2, chaos: 2, absurdity: 1 },
          tone: 'empathetic',
        },
      ],
      fallbackChoiceId: 'close-the-loop',
      isEndingNode: true,
    },
  ],
  endingRules: [
    {
      id: 'spin_city',
      title: 'Spin City',
      summary:
        'You turn a volatile hearing into a surprisingly coherent narrative. The clip goes from chaos to competence, and the room writes you off as "awkward but recoverable."',
      test: (m) => m.credibility >= 72 && m.publicTrust >= 72 && m.control >= 58 && m.chaos <= 42 && m.absurdity <= 35,
    },
    {
      id: 'viral_win',
      title: 'Viral Win',
      summary:
        'You become the most replayed clip of the day for all the wrong reasons... which somehow still count. You are now the center of everyone's group chat.',
      test: (m) => m.publicTrust >= 82 && m.chaos >= 65,
    },
    {
      id: 'public_hero',
      title: 'Public Hero',
      summary:
        'The room catches the original mess before it swallows everyone. You absorb the blow, but you use the moment to redirect attention and look unexpectedly competent.',
      test: (m) => m.credibility >= 70 && m.publicTrust >= 55 && m.control >= 45 && m.chaos >= 48,
    },
    {
      id: 'twist_reveal',
      title: 'Twist Reveal',
      summary:
        'Halfway through what felt like a salvageable pivot, a late reveal reframes the entire hearing. You now own a side plot and everyone wants a sequel.',
      test: (m) => m.absurdity >= 72 && m.control >= 68,
    },
    {
      id: 'legal_trap',
      title: 'Legal Trap',
      summary:
        'The hearing pauses, counsel circles tighten, and someone realizes paperwork in scene three matters. You are now in a very long call with consequences.',
      test: (m) => m.credibility <= 34 && m.control <= 42 && m.chaos >= 58,
    },
    {
      id: 'relationship_with_reality_lost',
      title: 'Relationship with Reality: Severely Compromised',
      summary:
        'The room nods to your confidence, but the facts quietly changed lanes. You are now fully off the map and writing in genre, not in law.',
      test: (m) => m.absurdity >= 65 && m.publicTrust <= 35 && m.credibility >= 45,
    },
    {
      id: 'comedy_tragedy',
      title: 'Comedy Tragedy',
      summary:
        'A joke lands, then another, then everyone loses context. You are trending, but mostly as the cautionary tale in two-minute edits.',
      test: (m) => m.chaos >= 85,
    },
    {
      id: 'silent_burn',
      title: 'Silent Burn',
      summary:
        'Nothing explodes. Nothing lands. Your name appears lower in the ranking of this week’s attention economy.',
      test: (m) => m.publicTrust <= 32 && m.chaos <= 45 && m.credibility <= 58,
    },
  ],
}

export const resolveEnding = (metrics) => {
  const match = pamBondiHearingGame.endingRules.find((rule) => rule.test(metrics))
  return match?.id || 'silent_burn'
}

export const getGameBySlug = (slug) =>
  slug === 'pam-bondi-hearing' ? pamBondiHearingGame : null
