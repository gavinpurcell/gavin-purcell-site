import { Helmet } from 'react-helmet-async';
import './Page.css';

export default function PrivacyPage() {
  return (
    <main id="main" className="page">
      <Helmet>
        <title>Privacy Policy | Gavin Purcell</title>
        <meta
          name="description"
          content="Privacy policy for gavinpurcell.com: what the site collects, which third parties process it, how long it is kept, and how to have it deleted. No advertising trackers and no cookies set by this site."
        />
        <link rel="canonical" href="https://gavinpurcell.com/privacy" />
      </Helmet>

      <div className="page-inner">
        <span className="page-eyebrow">Privacy</span>
        <h1 className="page-title">Privacy Policy</h1>
        <hr className="page-rule" />

        <p className="page-lede">
          The short version: this site sets no cookies of its own, runs no advertising
          trackers, and never sells anything about you. The only personal information it
          holds is what you deliberately type into the contact form.
        </p>

        <div className="page-body">
          <h2>What this site collects</h2>

          <h3>If you fill in the contact form</h3>
          <p>
            The intake form asks for your name, email address, company, the kind of work you
            are interested in, a budget range, and your message. That is submitted to{' '}
            <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
              Formspree
            </a>
            , which forwards it to my email inbox and retains a copy in its dashboard. I use
            it for one thing: replying to you and, if we end up working together, running that
            engagement. It does not go onto a mailing list, and it is not shared with, sold to,
            or rented to anyone.
          </p>

          <h3>If you just read the site</h3>
          <p>
            Page views are counted with{' '}
            <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
              Vercel Web Analytics
            </a>
            , which is cookieless and does not build a profile of you or follow you across
            other websites. It records aggregate information such as which pages are popular,
            rough country-level location, and what kind of browser and device are in use. I
            cannot identify an individual visitor from it, and neither can you, which is the
            point.
          </p>
          <p>
            My host, <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel</a>,
            also keeps standard server logs, including IP addresses, for a short period for
            security and operational reasons. That is ordinary web hosting, and it happens
            whether or not you interact with anything on the page.
          </p>

          <h2>Cookies</h2>
          <p>
            This site sets no cookies. It stores nothing in your browser&apos;s local storage.
            There is no consent banner because there is nothing to consent to.
          </p>

          <h2>Embedded video</h2>
          <p>
            Some pages embed videos from YouTube using{' '}
            <code>youtube-nocookie.com</code>, YouTube&apos;s privacy-enhanced mode, which
            means YouTube does not store cookies for you unless you actually press play. If you
            do play a video, YouTube receives that request and its own{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>{' '}
            applies to it.
          </p>

          <h2>Links off this site</h2>
          <p>
            This site links out to places like YouTube, Beehiiv, LinkedIn, and various AI
            tools. Once you follow a link you are on someone else&apos;s property and their
            privacy policy governs what happens there. I have no control over and take no
            responsibility for what those services collect.
          </p>

          <h2>How long anything is kept</h2>
          <p>
            Contact form submissions stay in my email and in Formspree until they are no longer
            useful, which in practice means active or recent conversations. Analytics data is
            aggregate and is retained by Vercel on its own schedule. Server logs are short
            lived.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask me what I hold about you, ask for a copy of it, ask for it to be
            corrected, or ask for it to be deleted, and I will do it. Email{' '}
            <a href="mailto:gavin@gavinpurcell.com">gavin@gavinpurcell.com</a> and say what you
            want. There is no form and no process to fight through. If you are in a place with
            laws such as the GDPR or the CCPA that give you those rights formally, this is how
            you exercise them.
          </p>

          <h2>Children</h2>
          <p>
            This site is aimed at working professionals and is not directed at children under
            13. I do not knowingly collect anything from them.
          </p>

          <h2>Changes</h2>
          <p>
            If this policy changes in a way that matters, the date below changes with it. There
            is no version history to dig through, because the policy is short enough to simply
            reread.
          </p>

          <h2>Who to contact</h2>
          <p>
            This site is operated by Gavin Purcell. For any privacy question, including the
            requests listed above, email{' '}
            <a href="mailto:gavin@gavinpurcell.com">gavin@gavinpurcell.com</a>.
          </p>

          <p className="page-meta">Last updated: August 21, 2026</p>
        </div>
      </div>
    </main>
  );
}
