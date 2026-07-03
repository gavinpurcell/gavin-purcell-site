import { useState } from 'react';
import './IntakeForm.css';

// PLACEHOLDER: create a form at formspree.io and replace this ID before deploying
const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_ME';

const INTERESTS = [
  'AI Jumpstart workshop',
  'Fractional AI Creative Officer (ongoing advisory)',
  'Keynote or speaking',
  'Something else',
];

const BUDGETS = ['Under $10k', '$10k to $25k', '$25k to $50k', '$50k+', 'Not sure yet'];

export default function IntakeForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="intake-sent">
        <h4>Got it.</h4>
        <p>I read every one of these myself and reply within a couple of days. Talk soon.</p>
      </div>
    );
  }

  return (
    <form className="intake-form" onSubmit={handleSubmit}>
      <div className="intake-row">
        <label className="intake-field">
          <span>Name</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label className="intake-field">
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="intake-row">
        <label className="intake-field">
          <span>Company</span>
          <input name="company" type="text" autoComplete="organization" />
        </label>
        <label className="intake-field">
          <span>What do you need?</span>
          <select name="interest" required defaultValue="">
            <option value="" disabled>Pick one</option>
            {INTERESTS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="intake-field">
        <span>Budget range</span>
        <select name="budget" required defaultValue="">
          <option value="" disabled>Pick one</option>
          {BUDGETS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="intake-field">
        <span>What are you trying to do?</span>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="A couple of sentences is plenty."
        />
      </label>
      {status === 'error' && (
        <p className="intake-error">
          That didn't send. Try again, or email{' '}
          <a href="mailto:gavin@gavinpurcell.com">gavin@gavinpurcell.com</a> directly.
        </p>
      )}
      <button type="submit" className="btn btn-large intake-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Start the Conversation'}
      </button>
      <p className="intake-alt">
        I read every inquiry myself and reply within two business days. Prefer email?{' '}
        <a href="mailto:gavin@gavinpurcell.com">gavin@gavinpurcell.com</a>
      </p>
    </form>
  );
}
