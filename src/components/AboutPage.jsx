import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './Page.css';

export default function AboutPage() {
  return (
    <main id="main" className="page">
      <Helmet>
        <title>About Gavin Purcell | Emmy-Winning Showrunner &amp; Fractional AI Creative Officer</title>
        <meta
          name="description"
          content="Gavin Purcell is an Emmy-winning former showrunner of The Tonight Show Starring Jimmy Fallon who now works as a Fractional AI Creative Officer, advising media and entertainment teams on AI strategy."
        />
        <link rel="canonical" href="https://gavinpurcell.com/about" />
      </Helmet>

      <div className="page-inner">
        <span className="page-eyebrow">About</span>
        <h1 className="page-title">Gavin Purcell</h1>
        <hr className="page-rule" />

        <p className="page-lede">
          Emmy-winning showrunner turned Fractional AI Creative Officer. I help media,
          entertainment, and creative teams actually use AI, not just talk about it.
        </p>

        <div className="page-body">
          <h2>What I do now</h2>
          <p>
            I work as a <strong>Fractional AI Creative Officer</strong>. That means I embed with
            a company for three to six months and build the AI workflows their teams will
            genuinely use, rather than handing over a deck and disappearing. The work usually
            starts with a hands-on workshop, moves into rebuilding one or two real production
            processes, and ends with a team that no longer needs me. I also deliver keynotes on
            where AI is taking media and what creative people should do about it.
          </p>
          <p>
            Alongside the advisory work, I co-host <strong>AI For Humans</strong> with Kevin
            Pereira, a twice-weekly show that breaks down artificial intelligence for a
            mainstream audience and cuts through the hype to focus on what is actually useful.
            I am also Co-Founder of <strong>AndThen</strong>, an AI audio storytelling platform,
            and I build a steady stream of experiments in public, including The Fishbowl, an
            open source AI focus group simulator, and Fig &amp; Moss, an ongoing AI-made
            animated series.
          </p>

          <h2>What I did before</h2>
          <p>
            I spent more than twenty years making things people watch. I was Showrunner for{' '}
            <strong>The Tonight Show Starring Jimmy Fallon</strong>, where I helped define what
            late-night looked like once the internet became the main stage. Before and after
            that I built and led creative teams at <strong>Vox Media</strong> and{' '}
            <strong>G4</strong>, launched shows that turned into cultural touchstones, and
            worked with everyone from major networks to very early stage startups.
          </p>
          <p>
            The work earned multiple <strong>Emmy awards</strong> and reached hundreds of
            millions of viewers. The part I care about more is that a lot of it mattered to
            the people who watched it. That is the same standard I bring to AI work now: the
            question is never whether a tool is impressive, it is whether it makes the thing
            you are making better.
          </p>

          <h2>Why media teams hire me</h2>
          <p>
            Most AI consultants have never had to ship a show on a deadline. I have. I know
            what a production schedule actually looks like, where the real bottlenecks are, and
            which parts of a creative process should never be automated. That combination,
            someone who has run a large creative operation and who also uses these tools every
            single day, is the reason people call.
          </p>

          <p>
            <Link className="page-cta" to="/contact">Get in touch</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
