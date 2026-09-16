// Home-page "which one are you" flow. Each answer casts one vote for a slug;
// the highest tally wins, ties break toward the earliest answer given.
export type Answer = { label: string; slug: string };
export type Question = { prompt: string; answers: Answer[] };

export const questions: Question[] = [
  {
    prompt: 'It’s 11:47pm. What are you actually doing?',
    answers: [
      { label: 'One more reel. Just one.', slug: 'doomscroll-buddy' },
      { label: 'Prod is down. Nobody come.', slug: 'workflow-spinner-2am' },
      { label: 'Still in the cab. Still.', slug: 'traffic-kumar' },
    ],
  },
  {
    prompt: 'You and Bengaluru traffic. Describe the relationship.',
    answers: [
      { label: 'Meter haaki, boss.', slug: 'traffic-kumar' },
      { label: 'Silk Board is a state of mind.', slug: 'silk-board-forever-loop' },
      { label: 'I sprint. Doors close anyway.', slug: 'namma-metro-sprint' },
    ],
  },
  {
    prompt: 'Who do you argue with the most?',
    answers: [
      { label: 'The group chat.', slug: 'doomscroll-buddy' },
      { label: 'An AI that is very confident.', slug: 'copilot-confusion' },
      { label: 'The incident channel.', slug: 'workflow-spinner-2am' },
    ],
  },
];

export const verdicts: Record<string, string> = {
  'traffic-kumar': 'You have said “reaching in 10 minutes” while completely stationary.',
  'doomscroll-buddy': 'Your screen time report is less a report and more a crime scene.',
  'silk-board-forever-loop': 'Time is merely a suggestion to you. So are exits.',
  'workflow-spinner-2am': 'The incident channel is not your job. It is your whole personality.',
  'copilot-confusion': 'Half of it definitely worked in the demo. That is between you and the demo.',
  'namma-metro-sprint': 'Dignity can wait for the next train. The backpack cannot.',
};
