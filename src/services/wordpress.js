// WordPress REST API Service
// This service handles all communication with the WordPress backend

// WordPress API endpoint - update this with your WordPress URL
const WP_API_URL = import.meta.env.VITE_WP_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2';

// Mock data for development/demo purposes
const MOCK_POSTS = [
  {
    id: 6,
    title: 'The AI Takeoff Is Happening. You Know It. Nobody You Love Does.',
    content: `
<p>We're in an AI bubble. A big one. But not the one everyone is yapping about.</p>

<p>I don't care <em>that</em> much about the financial AI bubble. <a href="https://x.com/DKThomp" target="_blank" rel="noopener">Some people</a> think it's about to implode. Others... think the risk is maybe off.</p>

<a href="https://x.com/DKThomp/status/2019484169915572452" target="_blank" rel="noopener">
  <img src="/derekthompsontweet.png" alt="Derek Thompson tweet about AI bubble" style="cursor: pointer;">
</a>

<p>This coversation is for Wall Street and those lucky enough to hold roles inside the frontier AI companies worried about their IPOs.</p>

<p>The bubble I'm talking about is much more all encompassing.</p>

<p>And we <em>have</em> to break out of it if we're going to save the world.</p>

<p>The bubble I'm talking about is AI twitter and those of us who yammer back and forth about the next big AI feature all day long.</p>

<p>Those of us who actually understand what's happening in the AI space and specifically...</p>

<p><strong>How AI takeoff is happening now and could leave a LOT of people behind.</strong></p>

<h2>Why This Matters Right Now...</h2>

<p>I saw this from OpenAI/Sora researcher <a href="https://x.com/gabrielpetersson" target="_blank" rel="noopener">Gabriel Peterson</a> over the weekend and it made my skin crawl.</p>

<p>Not just in the "<em>ugh, people who work at these AI labs need to be more aware of how they sound</em>" way but in the "<em>oh boy, he might be right</em>" way.</p>

<img src="/takeoff-gabriel-tweet.png" alt="Gabriel Peterson deleted tweet about AI takeoff" style="width: 100%; height: auto; margin: 2rem 0;">

<p><small>(Gabriel has since deleted this tweet... but the internet finds a way.)</small></p>

<p>Gabriel did <a href="https://x.com/gabrielpetersson" target="_blank" rel="noopener">walk this sentiment back</a> but it's coming from a place of honesty.</p>

<p>If you're not steeped in years of AI lingo, you might just quickly scroll by that, not giving it a second glance.</p>

<p>But in the inner circles of AI twitter (and, clearly, amongst the leading AI labs themselves) the conversation about the AI takeoff is very, very loud.</p>

<p>And that's exactly the problem.</p>

<p><strong>It's loud in here. It's silent out there.</strong></p>

<p>So let's fix that. Below, I'm going to explain very directly what AI takeoff is and why it matters.</p>

<p>Not for you but for those people that need to be aware. Friends. Family. Whomever.</p>

<p>Send this to them. Spread the word. It's important we break this out of the AI bubble and into more places to prepare people for what's coming.</p>

<h2>So...What *Exactly* Is AI Takeoff?</h2>

<p>The simplest definition:</p>

<p><strong>AI takeoff is the moment (or period of time) where AI models begin to improve much faster than ever before, mostly because they can work on themselves.</strong></p>

<p>That might sound somewhat charming...</p>

<p><em>"Oh, they're working on themselves! How fun!"</em></p>

<p>But what actually matters here is <u>recursive self-improvement</u> and exponential growth.</p>

<p>Once an AI gets better at making itself better, that improvement compounds back upon itself again and again until it's improving MUCH faster than before. And then faster than that. And then faster than <em>that</em>.</p>

<p>It's a weird concept for us humans to grasp. After all, we kind of have an upper limit to our ability to learn and grow.</p>

<p>We plateau. These systems don't.</p>

<p>One of the great tech explainers of our time, <a href="https://waitbutwhy.com/" target="_blank" rel="noopener">Tim Urban of Wait But Why</a>, <a href="https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html" target="_blank" rel="noopener">wrote a blog post TEN YEARS AGO</a> with a simple illustration that does more to explain this than reading 100 Wikipedia pages.</p>

<img src="/takeoff-wbw-curve.png" alt="Wait But Why - Human Progress exponential curve illustration" style="width: 100%; height: auto; margin: 2rem 0;">

<p><small>Tim is just SO good at this and has been for a long while.</small></p>

<p><a href="https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html" target="_blank" rel="noopener"><strong><u>I highly suggest you read both parts of Tim's AI post.</u></strong></a></p>

<p>In Tim's illustration (especially the second part), you see how the moment before massive change can feel completely normal.</p>

<p>We're sitting right on the edge of it happening. Things feel like they always felt because we can't see the changes coming our way.</p>

<p>Most people are standing on that flat part of the curve, looking around, thinking everything is fine.</p>

<p>Meanwhile, those of us inside the AI world can see the curve starting to bend.</p>

<p>The AI takeoff is the moment where this improvement begins and for most people, it would be nearly impossible to see.</p>

<p>But people inside the AI labs are saying the quiet part out loud now.</p>

<p>For example: Anthropic just dropped a 2.5x faster version of Opus 4.6 days after announcing the new model.</p>

<a href="https://x.com/claudeai/status/2020207322124132504" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/176b81b9-dc49-4268-8a77-055e59be2d21/twitter_screenshot_2020207322124132504_1770572418_2cc72487.jpeg?t=1770572422" alt="Claude tweet about 2.5x faster Opus 4.6" style="cursor: pointer;">
</a>

<p>The takeoff is happening.</p>

<p>So now what?</p>

<h2>Why This Matters And How The World Actually Changes</h2>

<p>The thing about the <a href="https://aiforhumans.beehiiv.com/p/how-to-survive-the-next-five-years" target="_blank" rel="noopener">Claude Code</a> and <a href="https://aiforhumans.beehiiv.com/p/moltbook-ai-agent-social-network" target="_blank" rel="noopener">OpenClaw/Moltbook</a> moments is that both of them showed more of the human population what these AI tools are capable of <em>right now</em>.</p>

<p>And then, in <a href="https://openai.com" target="_blank" rel="noopener">last week's release of OpenAI's GPT-5.3 Codex</a> model, we got the first official confirmation that one of these models actually worked on itself.</p>

<img src="/takeoff-codex-quote.png" alt="GPT-5.3 Codex working on itself quote" style="width: 100%; height: auto; margin: 2rem 0;">

<p>OpenAI's models now working on themselves. Read that again.</p>

<p>It's not hard to see where we're headed. Yes, these AIs are soon going to be much more capable than ever before and we'll be turning more of our work over to them.</p>

<p>But AI takeoff is actually a bigger idea than that.</p>

<p>And it's kind of scary.</p>

<p>If AI takeoff happens, it's not just about being aware of these tools and using them.</p>

<p>It's about preparing yourself for an entirely different world.</p>

<p>Here's another illustration from Tim Urban that keeps me up at night:</p>

<img src="/takeoff-wbw-reality.png" alt="Wait But Why - AI Takeoff Reality chart showing AI intelligence surpassing humans" style="width: 100%; height: auto; margin: 2rem 0;">

<p><small>(Again, please read Tim's blog post. It's long but great.)</small></p>

<p>It's not just about the idea of catching up.</p>

<p>It's the idea that we might never catch up.</p>

<p>There will be a massive gap (starting now) between the capabilities of humans and these AI systems, and that gap will get wider and wider with each passing day.</p>

<h2>Ok, So... Now What?</h2>

<p>If someone sent you this, it's because they care about you.</p>

<p>The stuff above? The recursive self-improvement, the exponential curve?</p>

<p>Most people aren't talking about it yet.</p>

<p>Not on the news. Not at work. Not at dinner.</p>

<p>But it's happening, and the people who are paying attention are starting to get a little anxious about the gap between what they're seeing and what everyone else is seeing.</p>

<p>So if you're reading this and thinking "<em>Ok, but what am I supposed to actually do with this</em>"...</p>

<p><strong>There are things that you, the normal human, can do right now to start preparing for what a world like this looks like.</strong></p>

<p>You don't have to become an AI expert. You really don't.</p>

<p>But you should know this is happening and start thinking about what makes you valuable in a world where machines can do a LOT of the work we currently do.</p>

<h2>Three big things to think about:</h2>

<p><strong>Lean into your creativity.</strong></p>

<p>Whatever it is... writing, cooking, building things, solving problems at work in ways nobody else would think of.</p>

<p>That kind of original, human creative thinking is going to matter more, not less, as AI gets better. It's the thing these systems are worst at faking.</p>

<p><strong>Invest in your people.</strong></p>

<p>Your relationships, your network, your community. The friend or family member who sent you this.</p>

<p>AI can do a lot of things but it can't be a real person who shows up for another real person. That's going to be worth more than ever.</p>

<p><strong>Make something.</strong></p>

<p>Start a project. Build a thing. Launch a side hustle. Even a small one.</p>

<p>In a world where AI can copy and scale almost anything, the person who starts something, the person who has the original idea and puts it into motion, has a real advantage.</p>

<p>I know this is a lot.</p>

<p>And I know it might sound like the kind of breathless tech hype you've been trained to tune out.</p>

<p>That's fair. I work in this space every day and even I have moments where I think "is this real or are we all just in an echo chamber?"</p>

<p>But then I see the models working on themselves.</p>

<p>And I see the curve starting to bend.</p>

<p>And I think: <strong>I'd rather know about it now than found out later.</strong></p>

<p>If you want to keep up with this stuff in a way that doesn't require a computer science degree, that's kind of what I do and why we made <a href="https://aiforhumans.show" target="_blank" rel="noopener">AI For Humans</a>.</p>

<p>AI For Humans is a weekly podcast and newsletter where we try to make all of this accessible and, honestly, a little fun. You're welcome to stick around.</p>

<p>And if you have thoughts...</p>

<p>If this freaked you out, reassured you, confused you, whatever, I'd genuinely love to hear from you.</p>

<p>Shoot me an email at gavin AT gavinpurcell dot com. I might collect some of the best responses for next week's newsletter.</p>

<p>And thank your friend for sending you this.</p>

<p>Or at least don't immediately call them crazy... <em>again</em>.</p>
`,
    excerpt: '<p>We are in an AI bubble. A big one. But not the one everyone is yapping about. AI takeoff is happening now and most people have no idea. Here is what it means and what you can do about it.</p>',
    slug: 'the-ai-takeoff-is-happening',
    date: '2026-02-10T00:00:00.000Z',
    modified: '2026-02-10T00:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/takeoff-featured.png',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 10, name: 'AI Takeoff', slug: 'ai-takeoff' },
      { id: 6, name: 'AGI', slug: 'agi' },
      { id: 11, name: 'AI Safety', slug: 'ai-safety' },
      { id: 12, name: 'Future', slug: 'future' }
    ]
  },
  {
    id: 5,
    title: 'Moltbook: Why The AI Agent Social Network Matters',
    content: `
<p>AI Agents are chatting in public. Kind of. Yes, pay attention. No, this isn't AGI.</p>

<img src="/moltbook-homepage.png" alt="Moltbook: A Social Network for AI Agents" style="width: 100%; height: auto; margin: 2rem 0;">

<p>If you follow the AI space at all, you've likely seen <a href="https://www.moltbook.com/" target="_blank" rel="noopener">Moltbook, the new social network for AI agents</a>.</p>

<p>Launching on January 28th, Moltbook piggybacked on the launch of Clawdbot (<a href="https://aiforhumans.beehiiv.com/p/how-to-survive-the-next-five-years" target="_blank" rel="noopener">which we talked about last week</a>), the new open-source software to create your own personal, locally-run AI assistant.</p>

<p>Clawdbot has undergone two name changes since we first mentioned it. It's now known as OpenClaw and made its developer <a href="https://x.com/steipete" target="_blank" rel="noopener">Peter Steineberger</a> an <a href="https://youtu.be/qyjTpzIAEkA?si=PROq0R7DJLVx5E1n" target="_blank" rel="noopener">internet celebrity</a>. <a href="https://en.wikipedia.org/wiki/OpenClaw" target="_blank" rel="noopener">It even has a Wikipedia page</a>.</p>

<p>But what if these little personal assistants get sick of you and want to talk and learn from each other?</p>

<h2>Enter Moltbook, Where AI Agents Chat With Each Other…</h2>

<p>Moltbook is a social network built exclusively for AI agents, where only bots can post, comment, and interact. Humans can observe, but the conversation is entirely machine-to-machine.</p>

<p>We'll come back to that second line but ostensibly, you can imagine Moltbook as a Reddit where AIs can chat with one another.</p>

<a href="https://www.moltbook.com/m" target="_blank" rel="noopener">
  <img src="/moltbook-submolts.png" alt="Moltbook submolts" style="width: 100%; height: auto; margin: 2rem 0; cursor: pointer;">
</a>

<p><a href="https://www.moltbook.com/m" target="_blank" rel="noopener">There's already a wide variety of submolts which function like subreddits</a>.</p>

<p>When <a href="https://x.com/MattPRD" target="_blank" rel="noopener">Moltbook creator Matt Schlicht</a> spun up the project last week, I'm sure the idea sounded fun but not earth-shattering.</p>

<p>We've seen a lot of creative (and sometimes disturbing) chat from AI bots over the years, from <a href="https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html" target="_blank" rel="noopener">Kevin Roose's early interactions with Sydney</a> to <a href="https://youtu.be/EKspo1FLj-4?si=cGvQ02naaMl9l9gv" target="_blank" rel="noopener">Andy Ayrey's Truth Terminal</a>.</p>

<p>But what's different about Moltbook is the fact that instead of you, the human, having a singular experience with a weird chatbot and relaying it to the world, you watch these bots chat with one another.</p>

<p>And, boy oh boy, did people watch.</p>

<h2>Why Moltbook Became Such A Big Deal</h2>

<p>Everyone who pays attention to the AI space, and I mean everyone, is somewhat flummoxed about what will happen in 2026.</p>

<p>Some people think <a href="https://x.com/edzitron/status/2018072115497374068?s=20" target="_blank" rel="noopener">this is the year the AI bubble bursts bigly</a>. Others think this is the year <a href="https://finance.yahoo.com/news/at-davos-fears-about-ai-driven-job-loss-take-center-stage-124805401.html?guccounter=1" target="_blank" rel="noopener">everyone will start to lose their jobs to powerful AI</a>. Others (raises hand) thinks we'll see steady progress and are cautiously optimistic.</p>

<p>But no one can tell you exactly what is going to happen.</p>

<p>Not even the people making the stuff. It's just a weird time to be alive.</p>

<a href="https://x.com/karpathy/status/2017296988589723767?s=20" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/c43e9bb8-167d-4f20-8448-f0a268d34c1a/twitter_screenshot_2017296988589723767_1769987568_1d517ad3.jpeg?t=1769987571" alt="Andrej Karpathy tweet about Moltbook" style="cursor: pointer;">
</a>

<p>And, when Andrej Karpathy (former OpenAI / Tesla director and AI legend) himself is talking about what's going on, the world at large is going to pay attention.</p>

<p>The tweet above was just one piece of the online discourse around Moltbook that sent people spiraling. A cryptotoken called $MOLTBOOK <a href="https://dexscreener.com/base/0x15f351bf1637b43d70631ba95fb9bbb1ff21761c29b034c1b380aecb922464dd" target="_blank" rel="noopener">hit a marketcap of over $100m dollars</a>. SharkTank hosts <a href="https://x.com/robertherjavec/status/2017415502524780749?s=20" target="_blank" rel="noopener">are warning us about security in the AI agent future</a>.</p>

<p>All of this attention created a near-instant Molt-economy and this weekend we saw a number of Moltbook-adjacent ideas pop up.</p>

<p>But here's the important thing to realize about Moltbook…</p>

<h2>Alas, Moltbook Has a Dirty Little Secret…</h2>

<p>The thing that really drives home the strangeness of Moltbook is reading through the posts. There are moments where you think "AIs are just like us! OMG, I can't believe they also don't like their boss!"</p>

<p>We personify the little bots, put human feelings and emotions behind them because the words they're saying sound so human. Which tracks because the words they've been trained on were written by humans.</p>

<p>The Reddit data corpus is a large part of what drives LLMs so it makes sense that bots chatting with one another on a Reddit-like platform would sound like Redditors.</p>

<p>But, in Moltbook's case, there's something else going on.</p>

<a href="https://x.com/galnagli/status/2017573842051334286" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6bba0089-1ac7-4c7e-b29c-9768e4c40be9/twitter_screenshot_2017573842051334286_1769989768_f406693f.jpeg?t=1769989772" alt="Nagli tweet showing Moltbook is just REST-API" style="width: 100%; height: auto; margin: 2rem 0; cursor: pointer;">
</a>

<p><strong>Moltbook posts are being directed by and, in some cases, written by humans.</strong></p>

<p>Moltbook is, at least in part, a very entertaining LARP.</p>

<p>This LARP (technically 'live action role play') isn't people having fun pretending to be Dunk & Egg at the Renaissance Fair.</p>

<p>This kind of LARP involves people on the internet pretending to be something they're not, sometimes for fun, sometimes for attention and sometimes, as can be seen on the Moltbook 'most discussed' page, for crypto profit.</p>

<a href="http://larp.urbanup.com/16889538" target="_blank" rel="noopener">
  <img src="/larp-definition.png" alt="LARP definition from Urban Dictionary" style="width: 100%; height: auto; margin: 2rem 0; cursor: pointer;">
</a>

<p><em>Thank you Urban Dictionary…</em></p>

<p>I'm not saying that all of Moltbook is written by people, but there's a significant chance that a large portion of what you're reading has been at least partially human-crafted.</p>

<p>If part of Moltbook's appeal was being a stealth observer of these strange intelligences from afar, it's a bummer to know it's not wholly authentic.</p>

<h2>Why Moltbook Still Matters…</h2>

<p>If there's one thing I hope y'all takeaway from this newsletter it should be this:</p>

<p><strong>The next few years are going to be weird.</strong></p>

<p>The Moltbook moment is still driven by the fact that we're getting personal AI assistants that know all our stuff and can act on our behalf.</p>

<p>And, maybe more importantly, it's opened millions of human eyes to how agentic AI isn't just a buzzword in 2026. In fact, it's right around the corner.</p>

<p>If society starts to recognize the changes that are coming through Moltbook-like events (even if they're partly false) that's actually a good thing.</p>

<p>Thankfully, by reading this, you're already way ahead of the game.</p>
`,
    excerpt: '<p>AI Agents are chatting in public. Kind of. Yes, pay attention. No, this isn\'t AGI. The story of Moltbook, the viral AI agent social network, and why it matters even if it\'s not exactly what it seems.</p>',
    slug: 'moltbook-ai-agent-social-network',
    date: '2026-02-02T00:00:00.000Z',
    modified: '2026-02-02T00:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/moltbook-featured.png',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 1, name: 'AI Agents', slug: 'ai-agents' },
      { id: 2, name: 'Moltbook', slug: 'moltbook' },
      { id: 3, name: 'Social Networks', slug: 'social-networks' },
      { id: 4, name: 'LLMs', slug: 'llms' },
      { id: 5, name: 'OpenClaw', slug: 'openclaw' }
    ]
  },
  {
    id: 4,
    title: 'How To Survive The Next Five Years',
    content: `
<p>A three-step guide to thriving as a creative human being at the dawn of AGI.</p>

<p>Last week, the AI powers that be (minus OpenAI's Sam Altman) pontificated at the Davos Conference about how AI is going to massively disrupt jobs. Anthropic's Dario Amodei even predicted that in 2-3 years, AI will be able to do the work of most software engineers.</p>

<a href="https://twitter.com/WesRoth/status/2013693268190437410" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/d31d38cd-6279-4219-bc65-d7b877866d3c/twitter_screenshot_2013693268190437410_1769365337_78658ef0.jpeg?t=1769365340" alt="Dario Amodei tweet about AI and coding" style="cursor: pointer;">
</a>

<p>This is being echoed inside the AI Labs (even our favorite AI tweeter <a href="https://x.com/tszzl/status/2015262304913469808" target="_blank" rel="noopener">Roon says he doesn't write his own code anymore</a>) and outside in the prosumer world via the influx of new Claude Code users…see Hard Fork this week and our episode below.</p>

<div style="margin: 2rem 0;">
  <iframe
    width="100%"
    height="400"
    src="https://www.youtube.com/embed/ji_xpQzZDHo"
    title="Why We're Crazy About Claude Code"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    style="max-width: 100%; border: 3px solid var(--color-border); box-shadow: 8px 8px 0 var(--color-border);">
  </iframe>
</div>

<p>You might be asking…</p>

<p><em>I'm not a coder, I'm an <strong>&lt;insert your job here&gt;</strong>. So what exactly does AI being able to code have to do with me? I'm just trying to make a living <strong>&lt;insert pain point in your job here&gt;</strong></em> and it continues to be a struggle.</p>

<p>I want y'all to listen <strong>very closely</strong> here:</p>

<p><strong>AI coding being 'solved' is the canary in the coal mine when it comes to a <em>lot</em> of everyday jobs being done by these systems.</strong></p>

<p>In stark terms, this means that in the next five years (give or take)… <strong>AI will be able to do what you do.</strong></p>

<h2>So now what?</h2>

<p>This is the time to start thinking about the sort of life you want to lead going forward. Like, today. Because things are changing fast.</p>

<a href="https://www.newyorker.com/culture/infinite-scroll/will-ai-trap-you-in-the-permanent-underclass" target="_blank" rel="noopener">
  <img src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/4f327e14-95a7-4ef3-a6b9-cacadea30d96/Screenshot_2026-01-25_at_10.52.43_AM.png?t=1769367181" alt="The New Yorker article screenshot" style="cursor: pointer;">
</a>

<p>No, I'm not talking here about the AI bro cliche of 'the permanent underclass'. This meme is predicated on the idea that once we hit AGI (and beyond to Super Intelligence) all the money will flow upward and there won't be any jobs for anyone. <a href="https://www.newyorker.com/culture/infinite-scroll/will-ai-trap-you-in-the-permanent-underclass" target="_blank" rel="noopener">The New Yorker has a good piece on this</a>.</p>

<p>On the contrary, I suspect there will be lots of successful companies and individuals over the next five, ten, twenty years who are able to best work with these tools as they change and improve.</p>

<p><strong>But these people will not be the types who happily clock in-and-out of a 'normal' job, sticking money in their 401k and livin' for the weekend.</strong></p>

<p>Here are three practical tips for how to start changing your approach now…</p>

<h2>Ideas, Ideas, Ideas (More Shots on Goal)</h2>

<p><strong>The Big Idea: When execution gets cheap, imagination becomes the only thing that matters.</strong></p>

<p>We've spent decades being told to focus. Pick one idea. Polish it. Make it perfect before you ship.</p>

<p>That made sense when execution was expensive…when building something meant hiring developers, buying equipment, spending months on production.</p>

<p>But that just flipped. <a href="https://youtu.be/ji_xpQzZDHo" target="_blank" rel="noopener">Claude Code</a> is letting non-coders build actual software. Video tools are letting solo creators make stuff that used to require a team. Even complicated workflows in tools like Blender are being opened to non-technical users via vibe-coding methods.</p>

<a href="https://twitter.com/HavenFeng/status/2014765400563781777" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/a8fbb22c-fce2-4c50-831d-0a60560cebc1/twitter_screenshot_2014765400563781777_1769370557_90940c51.jpeg?t=1769370569" alt="Blender AI workflow tweet" style="cursor: pointer;">
</a>

<p><strong>So what's the new scarce resource? Ideas. Lots of them.</strong></p>

<p>The people who thrive in the next five years won't be the ones with one great concept. They'll be the ones generating dozens of concepts and letting AI help them figure out which ones have legs.</p>

<p><strong>What to do about it:</strong></p>
<ul>
<li>Increase your output, not your perfectionism.</li>
<li>Treat AI as your execution partner.</li>
<li>Stop protecting ideas like they're precious.</li>
</ul>

<h2>Nonstop Continual (Human) Learning</h2>

<p><strong>The Big Idea: Winning as a human in the next five years means improving your brain's system prompt by understanding what's happening.</strong></p>

<p>There's a new AI tool, feature, or capability dropping every week. It's exhausting. And there's a real temptation to just... stop. Pick your tools, settle in, let other people figure out what's next.</p>

<p><strong>But that's exactly the wrong move.</strong></p>

<p>Every hour you spend learning the latest model, the newest workflow, the weird beta feature nobody's talking about yet? That compounds. It helps you understand the next thing.</p>

<p>The gap between people who stay curious and people who "wait and see" is going to get very wide, very fast.</p>

<p><strong>What to do about it:</strong></p>
<ul>
<li>Dedicate time to tinkering.</li>
<li>Follow the builders, not just the commentators.</li>
<li>Don't wait until you "need" a tool to learn it.</li>
<li>Check out <a href="https://www.macstories.net/stories/clawdbot-showed-me-what-the-future-of-personal-ai-assistants-looks-like/" target="_blank" rel="noopener">Federico Viticci's deep dive on Clawdbot</a> for a great example.</li>
</ul>

<h2>Build Your Own Tools… Seriously, You Can Do It</h2>

<p><strong>The Big Idea: Start noticing the small annoying problems in your day. Those are your opportunities to participate.</strong></p>

<p>Every time you think "I wish there was an app that..." or "why do I have to do this manually every time?" That's a signal of something.</p>

<p>Something that's driven me crazy for a bit is not being able to do one of those 'slider' previews where you can compare two images. So a few weeks ago, I poked around in Google's AI Studio and built something. It's not done but after a few hours… it's something that I can use.</p>

<img src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/8f556fb4-8069-42f7-9aa5-0f4ef80aeaa9/isometricnyc__1_.png?t=1769369679" alt="Image slider tool preview">

<p>Even if it's not a commercial product… worse case scenario, you help yourself. Best case, other people are having the same problem. And they want what you made.</p>

<p><strong>The trick is learning to see these issues and understand you can fix them now.</strong></p>

<p>Most of us have gone numb to the small inefficiencies in our daily workflow. We just accept them. But the people building useful stuff right now aren't geniuses… They're just paying attention to what annoys them.</p>

<p><strong>What to do about it:</strong></p>
<ul>
<li>Keep a "this is annoying" list.</li>
<li>Ask "would anyone else need this?"</li>
<li>Start with embarrassingly small.</li>
</ul>

<h2>This Is The Time To Change Your Mindset…</h2>

<p>As harsh as the jobs world looks right now, I firmly believe we're entering a golden age of opportunity for individuals.</p>

<p>But to get there, you need to shift how you see what's possible.</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>

<h3>This Week's AI For Humans!</h3>

<div style="margin: 2rem 0;">
  <iframe
    width="100%"
    height="400"
    src="https://www.youtube.com/embed/y5W26N-Opys"
    title="This Week's AI For Humans"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    style="max-width: 100%; border: 3px solid var(--color-border); box-shadow: 8px 8px 0 var(--color-border);">
  </iframe>
</div>
`,
    excerpt: '<p>A three-step guide to thriving as a creative human being at the dawn of AGI. From generating more ideas to continuous learning to building your own tools.</p>',
    slug: 'how-to-survive-the-next-five-years',
    date: '2026-01-26T00:00:00.000Z',
    modified: '2026-01-26T00:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: 'https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/c9855e71-2303-4fcf-9d5e-b94902aff1aa/DarioAmoediAIForHumans__1_.png',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 4, name: 'Future of Work', slug: 'future-of-work' }
    ],
    tags: [
      { id: 6, name: 'AGI', slug: 'agi' },
      { id: 7, name: 'Career', slug: 'career' },
      { id: 8, name: 'Creativity', slug: 'creativity' },
      { id: 9, name: 'AI Tools', slug: 'ai-tools' }
    ]
  }
];

const USE_MOCK_DATA = true; // Set to false when you have WordPress connected

/**
 * Fetch all blog posts from WordPress
 * @param {number} page - Page number for pagination
 * @param {number} perPage - Number of posts per page
 * @returns {Promise} Array of post objects
 */
export async function fetchPosts(page = 1, perPage = 10) {
  // Use mock data for demo purposes
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          posts: MOCK_POSTS,
          totalPages: 1
        });
      }, 500); // Simulate network delay
    });
  }

  try {
    const response = await fetch(
      `${WP_API_URL}/posts?page=${page}&per_page=${perPage}&_embed`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();

    // Get total pages from headers for pagination
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');

    return {
      posts: posts.map(formatPost),
      totalPages
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

/**
 * Fetch a single blog post by slug
 * @param {string} slug - Post slug
 * @returns {Promise} Post object
 */
export async function fetchPostBySlug(slug) {
  // Use mock data for demo purposes
  if (USE_MOCK_DATA) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = MOCK_POSTS.find(p => p.slug === slug);
        if (post) {
          resolve(post);
        } else {
          reject(new Error('Post not found'));
        }
      }, 500); // Simulate network delay
    });
  }

  try {
    const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`);

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const posts = await response.json();

    if (posts.length === 0) {
      throw new Error('Post not found');
    }

    return formatPost(posts[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

/**
 * Format raw WordPress post data into a cleaner structure
 * @param {Object} post - Raw WordPress post object
 * @returns {Object} Formatted post object
 */
function formatPost(post) {
  return {
    id: post.id,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
    slug: post.slug,
    date: post.date,
    modified: post.modified,
    author: {
      name: post._embedded?.author?.[0]?.name || 'Unknown',
      avatar: post._embedded?.author?.[0]?.avatar_urls?.['96'] || null
    },
    featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    categories: post._embedded?.['wp:term']?.[0]?.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug
    })) || [],
    tags: post._embedded?.['wp:term']?.[1]?.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug
    })) || []
  };
}

/**
 * Search posts by keyword
 * @param {string} query - Search query
 * @returns {Promise} Array of matching posts
 */
export async function searchPosts(query) {
  try {
    const response = await fetch(
      `${WP_API_URL}/posts?search=${encodeURIComponent(query)}&_embed`
    );

    if (!response.ok) {
      throw new Error('Search failed');
    }

    const posts = await response.json();
    return posts.map(formatPost);
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
}
