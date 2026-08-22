import { Helmet } from 'react-helmet-async';
import './Page.css';

export default function ContactPage() {
  return (
    <main id="main" className="page">
      <Helmet>
        <title>Contact Gavin Purcell | AI Consulting, Workshops &amp; Keynotes</title>
        <meta
          name="description"
          content="Contact Gavin Purcell about AI strategy consulting, hands-on AI workshops, fractional AI Creative Officer engagements, and keynote speaking for media and entertainment teams."
        />
        <link rel="canonical" href="https://gavinpurcell.com/contact" />
      </Helmet>

      <div className="page-inner">
        <span className="page-eyebrow">Contact</span>
        <h1 className="page-title">Get in touch</h1>
        <hr className="page-rule" />

        <p className="page-lede">
          The fastest way to reach me about work is the intake form. It goes straight to my
          inbox and tells me enough to give you a useful answer instead of a scheduling email.
        </p>

        <div className="page-body">
          <div className="page-card">
            <h2>Start a project</h2>
            <p>
              The intake form on the homepage covers what I need to know: what you are trying
              to do, what your team looks like, and your rough budget range. It is the right
              path for consulting, workshops, fractional engagements, and keynote inquiries.
            </p>
            <p>
              <a className="page-cta" href="/#contact">Open the intake form</a>
            </p>
          </div>

          <h2>Email</h2>
          <p>
            For anything that does not fit a form, including press, podcast bookings, and
            questions about something I have written, email{' '}
            <a href="mailto:gavin@gavinpurcell.com">gavin@gavinpurcell.com</a>. I read
            everything, and I answer most things, though it can take a few days when a project
            is in production.
          </p>

          <h2>What I take on</h2>
          <ul>
            <li>
              <strong>AI strategy advisory.</strong> Three to six month fractional engagements
              with media, entertainment, and creative organizations.
            </li>
            <li>
              <strong>Hands-on workshops.</strong> A working session that gets a real team using
              real tools on their own real projects, not a lecture.
            </li>
            <li>
              <strong>Keynotes and panels.</strong> Talks on where AI is taking media and what
              creative people should do about it.
            </li>
            <li>
              <strong>Press and interviews.</strong> Commentary on AI, media, and the creative
              industries.
            </li>
          </ul>

          <h2>What I am not the right call for</h2>
          <p>
            I am not a fit for pure engineering staffing, for building a model from scratch, or
            for AI work with no creative or editorial component. If that is what you need, say
            so in the form and I will point you somewhere better rather than waste your time.
          </p>

          <h2>Elsewhere</h2>
          <ul>
            <li>
              <strong>AI For Humans:</strong>{' '}
              <a href="https://www.youtube.com/@AIForHumansShow" target="_blank" rel="noopener noreferrer">
                youtube.com/@AIForHumansShow
              </a>
            </li>
            <li>
              <strong>Newsletter:</strong>{' '}
              <a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener noreferrer">
                aiforhumans.beehiiv.com
              </a>
            </li>
            <li>
              <strong>Writing:</strong> <a href="/blog">gavinpurcell.com/blog</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
