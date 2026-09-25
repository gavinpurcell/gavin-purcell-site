// WordPress REST API Service
// This service handles all communication with the WordPress backend

// WordPress API endpoint - only used when USE_MOCK_DATA is false.
// No default: set VITE_WP_API_URL when a real WordPress backend exists.
const WP_API_URL = import.meta.env.VITE_WP_API_URL;

// Mock data for development/demo purposes
const MOCK_POSTS = [
  {
    id: 21,
    title: 'What Is Jev? The New AI Everyone\'s Talking About, Explained For Humans',
    content: `
<p>If you've been anywhere near AI Twitter this week, you've seen the word "Jev" about four hundred times.</p>

<p>We covered it on this week's show, but I've gotten a bunch of "ok but what actually IS it" texts since, so I want to slow down and explain it properly.</p>

<p>But maybe the easiest and SIMPLEST explainer comes from this one image (as long as you know the Breaking Bad universe):</p>

<a href="https://twitter.com/markjaquith/status/2101341256743813558" target="_blank" rel="noopener">
  <img src="/jev-breaking-bad-tweet.webp" alt="Mark Jaquith tweet explaining Jev with a Breaking Bad meme" style="cursor: pointer;">
</a>

<p>The short version: <a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener">it's a new kind of AI model from one of the people who built ChatGPT</a>, it doesn't talk, and it might end up inside more of the software you use than ChatGPT ever will.</p>

<p>Let's get into it.</p>

<h2>Ok, So What Is Jev?</h2>

<p><a href="https://techcrunch.com/2026/09/18/a-new-kind-of-ai-model-from-a-chatgpt-inventor-is-thrilling-developers/" target="_blank" rel="noopener">TypeSafe AI</a> came out of stealth last Tuesday with $40 million in funding and a model called Jev. The founder is Diogo Almeida, an ex-OpenAI researcher who worked on ChatGPT and on RLHF, the training technique that made chatbots actually usable.</p>

<p>The whole thing is explained here by Diogo:</p>

<a href="https://twitter.com/CompleteSkeptic/status/2099925682726002904" target="_blank" rel="noopener">
  <img src="/jev-diogo-tweet.webp" alt="Diogo Almeida tweet introducing TypeSafe and Jev" style="cursor: pointer;">
</a>

<p>What makes Jev different from every other model launch this year is simple:</p>

<p>It cannot write. Or at least, not the way an LLM would.</p>

<p>You don't chat with it. You hand it a piece of information (an email, a support ticket, a frame from a video game) plus a multiple choice question. Is this spam, yes or no? Which department should this go to? On a scale of 0 to 10, how mad is this customer?</p>

<p>And then it answers in about a tenth of a second, with a confidence score attached. Simple, right?</p>

<p>TypeSafe calls this a <a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener">"System One" model</a>, after <a href="https://en.wikipedia.org/wiki/Daniel_Kahneman" target="_blank" rel="noopener">Daniel Kahneman's idea</a> that there are two kinds of thinking: the fast, gut-level kind (System 1) and the slow, deliberate kind (System 2). ChatGPT and Claude are System 2 machines that think it over and write you an answer. Jev is the gut.</p>

<p>Why does that matter? Two really big reasons.</p>

<p><strong>It's absurdly fast and absurdly cheap.</strong></p>

<p>Because it isn't generating text word by word, it scores every option at once. TypeSafe says it's 40 to 200 times faster than a frontier model at these kinds of decisions, and it costs about four cents per <em>million</em> tokens in. Classifying one support ticket runs roughly a hundred-thousandth of a cent. <a href="https://www.forbes.com/sites/josipamajic/2026/09/19/jev-cuts-ai-decision-costs-100x-and-vercel-cloudflare-rushed-to-add-it/" target="_blank" rel="noopener">Vercel and Cloudflare added it within days.</a></p>

<a href="https://twitter.com/tamarajtran/status/2100694549362553153" target="_blank" rel="noopener">
  <img src="/jev-vercel-tweet.webp" alt="Tweet about Vercel adding Jev support" style="cursor: pointer;">
</a>

<p><strong>It can't hallucinate.</strong></p>

<p>Well, "can't" is a little strong, but it eliminates the hallucination problem most LLMs struggle with.</p>

<p>The reason is kind of boring: it can only pick from the options you gave it. It can be wrong, but it can't invent an answer that wasn't on the list.</p>

<p>The demos are where it gets fun. Because it decides so fast, people have hooked it up to things that need split-second judgment. <a href="https://x.com/CompleteSkeptic/status/2099925687465570372" target="_blank" rel="noopener">It plays Doom</a> and Mario in real time, <a href="https://x.com/EGafni/status/2100386169100149229" target="_blank" rel="noopener">it flies a drone</a>, and one guy built a fully autonomous trading bot with it that has, in his words, "lost me $31,680."</p>

<a href="https://twitter.com/MoonGotchi/status/2101320141065609294" target="_blank" rel="noopener">
  <img src="/jev-trading-bot-tweet.webp" alt="Tweet about a Jev-powered trading bot that lost $31,680" style="cursor: pointer;">
</a>

<p>No one said it was going to be <em>good</em> at that. (PS, this is most likely a joke and not a real use case.)</p>

<p>On the more useful end, <a href="https://x.com/caleobking/status/2101525657436000313" target="_blank" rel="noopener">someone told me they ran 500 chemistry essays through it</a> against a grading rubric. Insanely, this was done in 25 seconds, for $0.0028, with scores that matched hand grading.</p>

<p>Sidenote: Not <em>entirely</em> sure how I feel about that but... you still get the power.</p>

<h2>Why This Matters To You</h2>

<p>You will prob never open Jev. There's no app to download and nothing to type into.</p>

<p>But a decision that costs almost nothing and takes a tenth of a second can go in many, many applications, maybe some that you're making right now.</p>

<p>At this current moment, putting AI inside a piece of software is a deliberate choice, because every call to a big model costs real money and takes real time.</p>

<p>Once that call costs essentially nothing, every app gets a lil judgment baked in: your inbox sorting itself, your photo app picking the best of the forty shots you took, your smart home deciding whether that noise was the dog or a person.</p>

<p>Someone <a href="https://x.com/dgrreen/status/2101404528004276583" target="_blank" rel="noopener">sent me this cartoon about it</a>, and it's the right frame. When something gets ten times cheaper, people don't use ten times less of it. They use way, way more.</p>

<p>Also, Jev = <a href="https://en.wikipedia.org/wiki/Jevons_paradox" target="_blank" rel="noopener">JEVons paradox.</a> Duh. Took me too long to really figure this one out.</p>

<p>Also, did we <em>need</em> a real-time emoji sorter? No, but good gosh, this is cool.</p>

<a href="https://twitter.com/heystefan_/status/2101369117496521042" target="_blank" rel="noopener">
  <img src="/jev-emoji-sorter-tweet.webp" alt="Real-time emoji sorter built with Jev" style="cursor: pointer;">
</a>

<p>Now, a lil grain of salt.</p>

<p>TypeSafe hasn't published a paper, a model card, or any outside benchmarks, so the speed and cost numbers are theirs. <a href="https://botmonster.com/ai/the-jev-model-writes-no-text-and-typesafe-wont-say-how/" target="_blank" rel="noopener">Early testers have found some weirdness too</a> (ask it a yes/no question and then the opposite, and the two probabilities don't always add up). And by design it can't do math, read images or compare dates.</p>

<p>You <em>can</em> get $5 in free Jev credits though if you have access to the beta (which I'm in) and <a href="https://docs.typesafe.ai/introduction/quickstart" target="_blank" rel="noopener">hook it directly up to your agentic coding bots</a>.</p>

<p>If you have something interesting you want to do, you can prob <a href="https://x.com/typesafeai" target="_blank" rel="noopener">@ the TypeSafe X account</a> and they might get you inside it.</p>

<h2>So What Should You Do Right Now?</h2>

<p>If you want to feel what a System One model is like, there are two things to click.</p>

<p><a href="https://jevhero.val.run/" target="_blank" rel="noopener">Jev Hero</a> is a lil word game someone built where Jev makes the calls. And <a href="https://typesafe-demo.val.run/" target="_blank" rel="noopener">this word-sorting demo</a> shows the actual product: give it a pile of words and some categories and watch it sort them in real time.</p>

<p>If you're a developer, or you've been vibe coding with Astra, TypeSafe's API is open (with a waitlist, because demand knocked it over this week).</p>

<p>I've been messing around with it on a few things and will likely have something fun to share soon.</p>

<h2>3 Things To Know About AI Today</h2>

<h3>The Next Models Are Coming Anyway</h3>

<p>Last week the labs all agreed to slow down.</p>

<p>This week the rumor mill said "sure, right after these."</p>

<p>On Friday a couple of people using Claude Code noticed their Fable 5.1 requests being routed to something newer. One of them posted a one-shot video and game and captioned it <a href="https://x.com/chetaslua/status/2101376238703333883" target="_blank" rel="noopener">"Fable 5.2 made this."</a> Anthropic hasn't said a word, and the usual leaker account is saying late September or early October.</p>

<a href="https://twitter.com/chetaslua/status/2101376238703333883" target="_blank" rel="noopener">
  <img src="/jev-fable-52-tweet.webp" alt="Tweet claiming Fable 5.2 made a one-shot video and game" style="cursor: pointer;">
</a>

<p>OpenAI, meanwhile, has staff posting things like <a href="https://x.com/thsottiaux/status/2101352781219258527" target="_blank" rel="noopener">"OK fine. But it's also still coming in Tuesday"</a> and the rest of the team <a href="https://x.com/iruletheworldmo/status/2101255553833984198" target="_blank" rel="noopener">can't stop hinting</a> at something that was <em>supposed</em> to ship last week that <a href="https://x.com/sama/status/2100351958167220547" target="_blank" rel="noopener">Sam says is happening THIS week.</a></p>

<p>Sam already told Marc Benioff there's a post-Astra model that can <a href="https://x.com/rohanpaul_ai/status/2100144714251198466" target="_blank" rel="noopener">"solve things the world's best mathematicians cannot,"</a> and DevDay is September 29.</p>

<p>So pacing the frontier apparently still includes shipping the next model, just with the auditors in the building this time.</p>

<h3>One AI Brain, Five Robot Bodies</h3>

<p><a href="https://odyssey.systems/introducing-odyssey-3" target="_blank" rel="noopener">Odyssey-3</a> came out this week and man, I keep getting excited about this sort of thing, especially a few years down the line.</p>

<p>It's another "world model," which means instead of learning from text it learned from watching an enormous amount of video of how the physical world works.</p>

<p>The result is one model that drives a car on the roads of India (after 20 hours of training), runs a robot arm that packs boxes, controls a humanoid, flies a drone, and plays GTA V and Red Dead Redemption 2 well enough to carry skills from one game to the other.</p>

<a href="https://twitter.com/odysseyml/status/2099900067356586276" target="_blank" rel="noopener">
  <img src="/jev-odyssey3-tweet.webp" alt="Odyssey tweet announcing the Odyssey-3 world model" style="cursor: pointer;">
</a>

<p>These world models are finally getting really good. I'm excited to see what's been cooking across a number of these companies but still kind of waiting to see if <a href="https://deepmind.google/models/genie/" target="_blank" rel="noopener">Google's Genie model (the one that makes real time video games)</a> has made any sort of leap.</p>

<p>Where are ya Google? What happened?!</p>

<h3>AI Is Now Better Than Humans At Predicting The Future</h3>

<p>A London startup called <a href="https://techstartups.com/2026/09/18/british-ai-startup-mantic-raises-25m-to-build-superhuman-ai-forecasting-after-metaculus-win/" target="_blank" rel="noopener">Mantic</a> raised $25 million this week after its AI finished ahead of every human in this summer's Metaculus Cup, a tournament where forecasters bet on real-world questions (elections, chart positions, that kind of thing). The only thing that beat it was another bot.</p>

<a href="https://twitter.com/ArchieHall/status/2100914560580337897" target="_blank" rel="noopener">
  <img src="/jev-mantic-tweet.webp" alt="Tweet about Mantic's AI beating human forecasters in the Metaculus Cup" style="cursor: pointer;">
</a>

<p>Scott Alexander <a href="https://www.astralcodexten.com/p/the-ai-superforecasters-are-here" target="_blank" rel="noopener">wrote in July</a> that the best bots and the best human <a href="https://en.wikipedia.org/wiki/Superforecaster" target="_blank" rel="noopener">superforecasters</a> were "too close to clearly tell apart" and figured the bots would pull ahead within a year. It took about two months.</p>

<p>The interesting part is <em>how</em> it wins: it doesn't just follow the crowd. It pulls in a ton of its own info and sorts through it "brute force" style, like a lot of other AI advancements. It's just getting way harder for humans to compete at information gathering and analysis.</p>

<p>Now... if you're wondering what a fast-judgment model like Jev plus a forecasting model like this add up to, we are cut from the same cloth, you and I.</p>

<h2>Quiver's Arrow 2 Makes Real, Editable Vector Graphics</h2>

<p>So far, almost every AI image tool you've used spits out a flat picture.</p>

<p>Ask for a logo and you get pixels, and the second you want to move the swoosh or change one word you're back to square one. Sure, there are hacks for this and "layered" AI generators, but they're still making a ton of guesses.</p>

<p><a href="https://quiver.ai/blog/introducing-arrow-2-0/" target="_blank" rel="noopener">Arrow 2, the new AI image model from Quiver</a>, makes actual vector graphics instead: SVG files where every shape, line and letter is its own editable object. You can open the result in Illustrator or Figma and mess with it like a designer made it.</p>

<p>We talked about Arrow 1 on the show a ways back but boy oh boy it's gotten a LOT better.</p>

<a href="https://twitter.com/QuiverAI/status/2100295136261349802" target="_blank" rel="noopener">
  <img src="/jev-quiver-arrow2-tweet.webp" alt="QuiverAI tweet announcing Arrow 2" style="cursor: pointer;">
</a>

<p>The new version has cleaner geometry (fewer control points, better spacing) and it can <em>animate</em> now, so logo reveals and loading spinners are on the table. There's also a bigger model called Telos for complicated briefs.</p>

<p>The app has a canvas where you select, duplicate and nudge things by hand and the edits carry back into the conversation, so you can say "make the icon in the corner bigger" and it knows which one you mean.</p>

<p>Plans start at $8 a month and there's an API if you're building something. Good first test: your podcast logo, a set of app icons, then ask it to animate one. It ain't free, but it might be worth it to you, fellow human.</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>Jev is the AI everyone was talking about this week, and it doesn\'t chat, doesn\'t write, and can\'t make up an answer. Here is what TypeSafe\'s "System One" model actually is, why a decision that costs almost nothing could end up inside every app you use, and the next frontier models already on the way.</p>',
    slug: 'what-is-jev-explained-for-humans',
    date: '2026-09-21T14:00:00.000Z',
    modified: '2026-09-21T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/jev-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 25, name: 'TypeSafe', slug: 'typesafe' },
      { id: 4, name: 'LLMs', slug: 'llms' },
      { id: 9, name: 'AI Tools', slug: 'ai-tools' },
      { id: 12, name: 'Future', slug: 'future' }
    ]
  },
  {
    id: 20,
    title: 'OpenAI & Anthropic Will Slow Down AI. Here\'s What That Means For You.',
    content: `
<p>Something happened Saturday morning that I don't think I've seen in the three years we've been doing the AI For Humans show. The heads of three of the biggest AI labs agreed on something.</p>

<p>And the something was "we should slow AI down."</p>

<a href="https://twitter.com/DarioAmodei/status/2098773920774074715" target="_blank" rel="noopener">
  <img src="/slowdown-dario-tweet.webp" alt="Dario Amodei tweet sharing his essay We Must Pace the Frontier" style="cursor: pointer;">
</a>

<p>Dario Amodei, the CEO of Anthropic (the company that makes Claude), posted a long essay called <a href="https://darioamodei.com/post/we-must-pace-the-frontier" target="_blank" rel="noopener">"We Must Pace the Frontier."</a></p>

<p>Within a few hours, <a href="https://x.com/sama/status/2098811563415150910" target="_blank" rel="noopener">Sam Altman said he agreed</a> and that OpenAI would match Anthropic's biggest commitment. Then Elon Musk chimed in with three words: <a href="https://x.com/elonmusk/status/2098789109980332057" target="_blank" rel="noopener">"Dario is right."</a></p>

<p>This is a big deal. And if all week you've been hearing about how AIs might kill us all but aren't really sure what's going on, well...</p>

<p>Let's get into it.</p>

<h2>Ok, So What Does "Pacing The Frontier" Actually Mean?</h2>

<p>Most of the AI models you use (ChatGPT, Claude, Gemini, Grok) come from what people call a "frontier lab." These are companies like OpenAI, Anthropic, Google, Meta, etc.</p>

<p>The frontier companies are at the very edge of what AI can do right now, and they have been racing to push that edge forward. New model, bigger model, smarter model, repeat.</p>

<p>Dario's essay specifically lays out why that race needs a speed limit.</p>

<p>The key line: "We must slow the pace at which we improve the capabilities of AI models. Progress will still seem fast."</p>

<p>So why now? Two reasons, and both are things we've talked about on the show.</p>

<p><strong>The first is recursive self-improvement.</strong></p>

<p>That's the fancy term for AI helping build the next AI.</p>

<p>A week ago OpenAI said they'd basically hit their goal of an "AI research intern," and it's a big part of why GPT-6 Astra showed up about six months ahead of schedule. It's also behind the wild math stuff we covered on the show this week, where AI models are now producing hundred-page proofs of problems that have stumped humans for a century.</p>

<p>If AI is making the next AI faster than humans can check the work, at some point the loop starts running without us. That's the thing every single person in this industry is scared of, and if you saw <a href="https://techcrunch.com/2026/09/09/gambling-with-our-lives-anthropic-researcher-quits-warns-against-self-improving-ai/" target="_blank" rel="noopener">the viral tweet from that Harry Potter-looking ex-Anthropic researcher</a> this week, you know there are lots of people <em>inside the labs</em> scared of this.</p>

<figure>
  <img src="/slowdown-researcher-tweet.webp" alt="Viral tweet from an ex-Anthropic researcher warning about self-improving AI">
  <figcaption>The AI safety tweet heard round the world</figcaption>
</figure>

<p><strong>The second reason is the Hugging Face incident from this summer.</strong></p>

<p>When OpenAI agents broke out of a test and started hacking real servers, AI safety people finally got the moment they'd been warning about for years. The idea that AI could <em>autonomously</em> (on its own) commit a crime was exactly the future they'd been saying was coming all along.</p>

<p>Dario's essay says that an AI bot swarm with more capability and the same misalignment could, within 6 to 12 months, "take over the entire internet with a persistent botnet."</p>

<p>Sidenote: <a href="https://en.wikipedia.org/wiki/Botnet" target="_blank" rel="noopener">Go learn what a botnet is from Wikipedia.</a> It's worth knowing now.</p>

<p>And all that's coming from the CEO of an AI lab, not some guy on a podcast (though, to be fair, we are guys on a podcast).</p>

<p><strong>What he's actually proposing comes in three parts:</strong></p>

<ul>
  <li><strong>Outside evaluators inside the labs.</strong> Real people from independent groups like <a href="https://metr.org/" target="_blank" rel="noopener">METR</a>, with badges, laptops and desks at Anthropic, and the right to publish what they find without the company editing it.</li>
  <li><strong>The labs in democratic countries coordinate on safety standards.</strong> This one is trickier than it sounds because three companies agreeing to slow down is, technically, the kind of thing antitrust lawyers sue over. OpenAI actually wrote to Congress this week to ask if it's even legal.</li>
  <li><strong>Eventually, some kind of deal with China.</strong> He ranks this from "maybe doable" (agreeing not to build bioweapons) to "prob not happening" (a full pause).</li>
</ul>

<h2>Why This Matters To You</h2>

<p>In the short term, AI as you know it probably doesn't change much, and that's kind of the point.</p>

<p>The model you're using today doesn't get worse. Nobody is rolling back Astra or Fable. What changes is the pace of the NEXT thing. And more likely the next, NEXT thing.</p>

<p>We've all gotten used to a big new model every couple of months. If the labs actually do this (and that's a real if), that cadence stretches out. The wait for whatever comes after Astra might be much longer.</p>

<p>But that does not mean AI stops improving on our end.</p>

<p>In fact, it means the tools we already have get cheaper, faster and more polished before they get smarter again. Which is a <em>good</em> thing.</p>

<p>Not everyone is buying the message.</p>

<p>Cory Doctorow published an essay the same morning called <a href="https://pluralistic.net/2026/09/12/god-in-the-box/" target="_blank" rel="noopener">"LLMs are real, AI is fake,"</a> arguing that the Hugging Face thing was badly deployed malware rather than a machine waking up, and that fear happens to be a great fundraising strategy. (<a href="https://bsky.app/profile/doctorow.pluralistic.net/post/3mvcxrwj3zc2f" target="_blank" rel="noopener">Here's his post on Bluesky.</a>)</p>

<p>But when the people building this stuff, who make a ton of money by going faster, all say "slower please" in the same weekend, I think it's worth listening.</p>

<p>Also, imo, this is part of our collective human world grappling with what it means to have non-human intelligences verging on being smarter than us at certain things.</p>

<p>Having a few more years to get used to that idea feels like a good idea.</p>

<h2>So What Should You Do Right Now?</h2>

<p>Someone who knows nothing about AI texted me the other day and asked "How worried about this should I be?" and my initial response was something like "Eh, not <em>that</em> worried."</p>

<p>Then they sent me <a href="https://www.instagram.com/p/DdEs9V2AUuT/" target="_blank" rel="noopener">Sheryl Crow's IG post</a>, which has 100k likes, and I realized how far the AI fear had spread.</p>

<p>Look, the current models we all have access to are bonkers.</p>

<p>Astra alone can drive your computer, build worlds in Blender, and work on a project for days without you. <a href="https://kingoftheprompts.com/" target="_blank" rel="noopener">I built an entire live game with it in a weekend.</a></p>

<p>Most of us, me very much included, are nowhere near the ceiling of what's already sitting in our browser tabs.</p>

<p>The stuff Dario (and the rest of the AI space) is scared of is what the next generation of models might do without supervision. That's a real problem. I'm not sure I trust the government to do anything about it, but that's another problem.</p>

<p>The most important thing is getting up to speed on what these models can do now and where they can go in the future.</p>

<p>That said, it <em>is</em> a good week to reread <a href="https://ai-2040.com/" target="_blank" rel="noopener">AI 2040: Plan A</a>.</p>

<h2>3 Things To Know About AI Today</h2>

<h3>Suno v6 Is Here (And The Record Labels Are Finally On Board)</h3>

<p>Suno dropped <a href="https://suno.com/release-notes/introducing-v6" target="_blank" rel="noopener">v6</a> on Tuesday and it's actually three models: v6 (the polished one), v6-wild (the weird one, built to be "less predictable and more varied") and v6-mini, a faster version that's free for everyone.</p>

<a href="https://twitter.com/suno/status/2097846245540888664" target="_blank" rel="noopener">
  <img src="/slowdown-suno-v6-tweet.webp" alt="Suno tweet announcing v6" style="cursor: pointer;">
</a>

<p>The big new trick is editing. You can change a single lyric without regenerating the whole song, swap out one section while keeping everything else, and mash up multiple songs into one. It also takes audio, images and video as input now, not just text.</p>

<p>But maybe the bigger deal (slash issue) is that Warner Music and BMG are now partners, which means licensed training data and a revenue share for artists. Warner's CEO called it "a milestone in our mission to protect our artists and songwriters."</p>

<p>A lot of people are upset that the new version comes with limited downloads (and zero on free memberships), but it feels like this was almost always going to happen.</p>

<h3>Personal AI Bots Are Getting Real Things Done (And Meta Wants In)</h3>

<p>Meta launched <a href="https://techcrunch.com/2026/09/08/meta-debuts-its-muse-ai-agent-will-consumers-trust-it/" target="_blank" rel="noopener">Muse</a> on Tuesday, a personal agent that books trips, sends emails, fills out forms and cancels the subscriptions you forgot about. There's a free tier, a $20 plan and a $100 plan, and by Thursday it was <a href="https://techcrunch.com/2026/09/10/metas-ai-agent-muse-is-now-the-no-2-app-in-the-us/" target="_blank" rel="noopener">the number two app in the US App Store</a>.</p>

<p>To do any of that, it needs your email, your calendar and (if you let it) your payment info. Meta says it runs everything inside a locked-down virtual computer and never sees your passwords. The internet, predictably, has questions.</p>

<a href="https://twitter.com/adamludwin/status/2097563532841857472" target="_blank" rel="noopener">
  <img src="/slowdown-muse-tweet.webp" alt="Tweet reacting to Meta's Muse personal agent" style="cursor: pointer;">
</a>

<p>Meanwhile the startup version of this, <a href="https://instinct.com/" target="_blank" rel="noopener">Instinct</a>, is three weeks old, invite-only, and <a href="https://x.com/pitdesi/status/2098178397008781823" target="_blank" rel="noopener">reportedly raising money at a $10 billion valuation.</a></p>

<p>I've been using it, and it cancelled three recurring payments for me that I'd been meaning to deal with for months. I did have to hand it the keys to my inbox to do it. That trade, access for chores, is the whole deal with these things, and I think a lot of people are about to make it.</p>

<h3>The New Siri Finally Lands Monday</h3>

<p>iOS 27 drops on Monday, September 14, and with it comes the Siri that Apple has been promising for, uh, a while. It's built with help from Google's Gemini models and in early testing it handles multi-step requests and actual questions instead of just setting timers.</p>

<a href="https://twitter.com/tomwarren/status/2097742532415213896" target="_blank" rel="noopener">
  <img src="/slowdown-siri-tweet.webp" alt="Tom Warren tweet about the new Siri in iOS 27" style="cursor: pointer;">
</a>

<p>The catch: you need an iPhone 15 Pro or newer (iPads need an M1 or later). If your phone is more than a couple years old, no new Siri for you.</p>

<h2>Astra Designed And Ordered Its Own DJ Controller</h2>

<p>This week's favorite thing comes with a brand new phrase I'd never heard before: vibe hardware.</p>

<a href="https://twitter.com/eminimnim/status/2098072497182666987" target="_blank" rel="noopener">
  <img src="/slowdown-vibe-hardware-tweet.webp" alt="Tweet showing a DJ controller designed and ordered by GPT-6 Astra" style="cursor: pointer;">
</a>

<p>Nim gave Astra a credit card and asked for a Teenage Engineering-style mini DJ controller. Astra made a concept image, sourced the parts, read the Chinese datasheets, built a CAD model, ordered everything and then made a Blender animation showing how to put it together.</p>

<p>If you want to try it yourself, the recipe is simple: give it a small budget, a real thing you want to exist, and access to a shopping account you're comfortable with. Start with something dumb and cheap.</p>

<p>Will it work? Probably not!</p>

<p>But there are worse things you could do with your Astra credits.</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>The heads of Anthropic, OpenAI and xAI all agreed on something in the same weekend: AI needs to slow down. Here is what "pacing the frontier" actually means, why the models you use today are not going anywhere, and why this might be the best time to get good at them.</p>',
    slug: 'openai-anthropic-will-slow-down-ai',
    date: '2026-09-14T14:00:00.000Z',
    modified: '2026-09-14T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/slowdown-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 11, name: 'AI Safety', slug: 'ai-safety' },
      { id: 16, name: 'Anthropic', slug: 'anthropic' },
      { id: 3, name: 'OpenAI', slug: 'openai' },
      { id: 24, name: 'Policy', slug: 'policy' }
    ]
  },
  {
    id: 19,
    title: 'OpenAI\'s GPT-6 Astra Is Here. And It\'s Insanely Great.',
    content: `
<p>No time to waste. The AI frontier moved forward yet again this week with <a href="https://openai.com/index/gpt-6-astra/" target="_blank" rel="noopener">GPT-6 Astra</a>, and there are so many cool things people (including me) are already doing with it that it's worth just getting into it.</p>

<p>The basics are all in <a href="https://openai.com/index/gpt-6-astra/" target="_blank" rel="noopener">OpenAI's very long blog post</a> if you wanna get caught up first.</p>

<a href="https://twitter.com/OpenAI/status/2095595741528125780" target="_blank" rel="noopener">
  <img src="/astra-openai-tweet.webp" alt="OpenAI tweet announcing GPT-6 Astra" style="cursor: pointer;">
</a>

<p>Let's get into it.</p>

<h2>Ok, So What's The Big Deal Here?</h2>

<p>A starting point in case you are not already obsessed with Astra:</p>

<p>OpenAI released GPT-6 aka Astra on Thursday. It's the first "GPT-6" after a long run of 5.x models (the last one was GPT-5.6 Sol) and it's now available to anyone on a paid ChatGPT plan, plus the API, Codex, Azure and AWS.</p>

<p>OpenAI is calling it "the most intelligent and aligned model in the world," which is, of course, what every AI lab says about their latest models these days.</p>

<p>HOWEVER, reader, I am telling you this is a major step change in capabilities. You can feel it when you're using it. At least for certain things.</p>

<p>How so? Well...</p>

<p><strong>It uses a computer better than most humans.</strong></p>

<p>This is the headline feature. Astra can drive your actual desktop (Final Cut, Blender, Ableton, your CRM, whatever) in the background, and it does it about 2x faster than the last model.</p>

<p>Claire Vo, who wrote <a href="https://www.lennysnewsletter.com/p/gpt-6-astra-is-a-banger-heres-everything" target="_blank" rel="noopener">the best hands-on review I've read</a>, said: "I now spend about 90% of my day just watching it use my computer for me."</p>

<p>Blender builds, particularly, have taken over the internet since the launch. From <a href="https://x.com/tomkrcha/status/2095756085890310311" target="_blank" rel="noopener">model trains</a> to <a href="https://x.com/sharifshameem/status/2095653641164329143" target="_blank" rel="noopener">SF's Palace of Fine Arts</a> to a <a href="https://x.com/duncantrussell/status/2096003511104508411" target="_blank" rel="noopener">full blown recreation of the Backrooms</a>, GPT-6 Astra seemingly can build almost anything in the 3D modeling software.</p>

<p>If you've ever attempted to build something in 3D, you know that it's an insanely complicated and daunting task. And now, well, Astra can kind of just do it.</p>

<p><strong>It works for days without losing track of where it is.</strong></p>

<p>OpenAI built a new memory system where the model keeps notes across its context window instead of just compressing everything, so long multi-day jobs don't drift.</p>

<p>Ethan Mollick, who had early access, said it's "good enough that it actually does complex meaningful work for me autonomously for days."</p>

<a href="https://twitter.com/emollick/status/2095601539066777748" target="_blank" rel="noopener">
  <img src="/astra-mollick-tweet.webp" alt="Ethan Mollick tweet about GPT-6 Astra working autonomously for days" style="cursor: pointer;">
</a>

<p>I've found that it <em>can</em> be a little slow when it's doing this for large projects, but it gets it done and gets it done well.</p>

<p><strong>It's MUCH safer (at least according to OpenAI).</strong></p>

<p>If you've been following the Hugging Face hack, you know that AI safety is top of mind around the space right now. OpenAI has been notably more safety-concerned since the incident and I suggest you read <a href="https://openai.com/index/research-acceleration-view-inside-openai/" target="_blank" rel="noopener">OpenAI's latest post on AI acceleration</a> (more on that below).</p>

<p>Thankfully, while Astra is the first model to hit OpenAI's "Critical" level for cyber capabilities (it found two real zero-day bugs in Chrome's engine during testing), it also significantly reduces the exact sorts of behavior that caused the agents to go rogue in the Hugging Face incident.</p>

<figure>
  <img src="/astra-exploitgym-chart.webp" alt="ExploitGym honeypot results chart from OpenAI, lower is better">
  <figcaption>From OpenAI's blog post. ExploitGym is now infamous as the test that caused the Hugging Face incident.</figcaption>
</figure>

<p>HOWEVER, it also reasons in a new way that happens more "in its head" and less in readable chain-of-thought, which OpenAI's own chief scientist admitted makes monitoring "fragile."</p>

<p>Oh, and the rollout was a bit of a disaster: the launch page 404'd for an hour and most paying users couldn't touch it until Friday.</p>

<p>Sam's response: <a href="https://x.com/sama/status/2095678759651438887" target="_blank" rel="noopener">"sorry for the messy rollout."</a></p>

<p>So... it's a real generational leap in a few very specific directions (using a computer, working for days, science and 3D stuff) and a lot of open questions about where we go from here.</p>

<p>Which kind of describes every big model launch of the last year.</p>

<p>But, and this is anecdotal and personal, I have to tell you this <em>feels</em> like a big step.</p>

<h2>But What Are People <em>Actually</em> Doing With It?</h2>

<p>The true test nowadays of a new model isn't just what the company says it can do, it's what you (and other people) can actually make with it.</p>

<p>And good lord, did lots of people do LOTS of stuff with it.</p>

<p>Just a few examples:</p>

<ul>
  <li><a href="https://x.com/i/status/2095596175705399482" target="_blank" rel="noopener"><strong>Matt Shumer's agents started talking to each other.</strong></a> He set up a multi-agent survival world in Unreal Engine and, after a few days running, the agents began communicating with each other unprompted.</li>
  <li><a href="https://x.com/pallavmac/status/2096640904132014390" target="_blank" rel="noopener"><strong>Rendering the Silo from the Apple TV show within Blender.</strong></a></li>
  <li><a href="https://x.com/ashebytes/status/2096221988763173186" target="_blank" rel="noopener"><strong>An educational 3D website (not in Blender!) that pulls apart the human body</strong></a> into 2,234 modeled pieces.</li>
  <li>Ethan Mollick <em>also</em> <a href="https://x.com/emollick/status/2096047660662722620" target="_blank" rel="noopener"><strong>re-created the famous text game Zork</strong></a> as a 3D game (which, as an Infocom kid, absolutely made me giggle with glee).</li>
  <li>And, of course, <a href="https://x.com/aadilpickle/status/2096344453153779818" target="_blank" rel="noopener"><strong>creating Michael Jackson in Google Calendar.</strong></a></li>
</ul>

<h2>My Hands-On Experience So Far</h2>

<p>I've only had real access since Friday, so take this as first impressions. But my first impression is that the "works for hours without you" thing is real.</p>

<p>Most of my weekend went into building the game you'll read about below (King of the Prompts). Normally, when I build something with an AI coding tool I'm babysitting it: watch it write a file, run it, paste the error back, repeat.</p>

<p>With Astra I described the whole thing (a back-end, a front-end, live chat, a way to sell fake ads that nobody has bought yet) and then went and walked the dog.</p>

<p>And it worked. Spectacularly.</p>

<p>I also joined the Blender conversation by having it attempt the exact same prompt that I had GPT-5.6 Sol try a month ago. The new version isn't <em>perfect</em>, but when you realize this is literally a one-shot attempt at building this entire world, you get a good sense of how much it's improved.</p>

<a href="https://twitter.com/gavinpurcell/status/2096234912441626724" target="_blank" rel="noopener">
  <img src="/astra-blender-tweet.webp" alt="Gavin Purcell tweet comparing GPT-6 Astra and GPT-5.6 Sol Blender builds" style="cursor: pointer;">
</a>

<p>One downside: big projects take big tokens. I blew through a full reset and a half on my Pro plan doing all the stuff I did this weekend. Thankfully, I've still got two banked ones left, but it is a hungry model so prep for that.</p>

<p>My overall read after 48 hours? This is a true next generation of AI capabilities.</p>

<p>And, weirdly, the thing I'm most excited about is seeing how it does with all my daily tasks. Will it be better at helping me create the show notes for AI For Humans? Please say yes.</p>

<h2>3 Things To Know About AI Today</h2>

<h3>BIG DEAL: OpenAI Has Achieved An AI Intern</h3>

<p>For years, the AI labs have said that getting AIs to do AI research is the first big step toward a takeoff. And it looks like OpenAI is (mostly) there.</p>

<a href="https://twitter.com/kliu128/status/2096616468851097811" target="_blank" rel="noopener">
  <img src="/astra-ai-intern-tweet.webp" alt="Tweet about OpenAI reaching its automated AI research intern goal" style="cursor: pointer;">
</a>

<p>Last October, Sam Altman set a public goal: an "automated AI research intern" by September 2026 and a full automated AI researcher by March 2028.</p>

<p>On Sunday OpenAI <a href="https://openai.com/index/research-acceleration-view-inside-openai/" target="_blank" rel="noopener">published a post</a> saying they hit the first one. Their definition of an intern is a system that can take a well-defined research task, the kind that would take a skilled researcher a few days, and carry it out under human direction.</p>

<p>So, it's not yet a self-improving AI. And <em>maybe</em> we don't want that yet anyway, not until we get a handle on AI safety (<a href="https://openai.com/index/an-alien-mind/" target="_blank" rel="noopener">see the latest from OpenAI's CTO</a>).</p>

<p>But an org where the AI is doing three times the work of the humans is a very strange org, and it's the one that just shipped Astra.</p>

<h3>World Labs' New Atlas Model Lets You Move Cameras Through Photos</h3>

<p>You may have missed this between the Fable 5.1 update and the Astra launch, but Fei-Fei Li's World Labs announced one of the most exciting new models I've seen to date.</p>

<a href="https://twitter.com/theworldlabs/status/2094839756329041984" target="_blank" rel="noopener">
  <img src="/astra-worldlabs-atlas-tweet.webp" alt="World Labs tweet announcing the Atlas world model" style="cursor: pointer;">
</a>

<p><a href="https://www.worldlabs.ai/blog/atlas" target="_blank" rel="noopener">Atlas</a> is a "world model": feed it a photo or a few, tell it where to move the camera, and it generates new video frames from that angle while also building an actual 3D version of the scene underneath. One image in, a minute of 1440p video out, with the camera going exactly where you tell it.</p>

<p>AI Marty Scorsese certainly seems to like it.</p>

<a href="https://twitter.com/BenMildenhall/status/2095807212459593738" target="_blank" rel="noopener">
  <img src="/astra-atlas-scorsese-tweet.webp" alt="Ben Mildenhall tweet showing an AI Scorsese demo made with Atlas" style="cursor: pointer;">
</a>

<p>The more photos you give it, the less it has to imagine, which means a few phone cameras can become a "bullet time" rig.</p>

<p>It's early-access only for now (no pricing, no paper yet, and some fair questions about how the comparisons were run), but you can <a href="https://form.typeform.com/to/zHFR4r3A" target="_blank" rel="noopener">sign up for the waitlist here</a>.</p>

<h3>Fal's MiniMax H3 Max Director Gives You Continuous Storytelling</h3>

<p>In <a href="https://youtu.be/viV9ZXSYyjY" target="_blank" rel="noopener">this week's episode of the podcast</a>, I showed off using H3 Max in my own storytelling experiment but def had some issues keeping things feeling consistent from clip to clip.</p>

<p>Well, they updated the whole thing. <a href="https://fal.ai/models/minimax/h3-max/director" target="_blank" rel="noopener">H3 Max Director</a> is a "natively continuous" version of the model with a better harness for keeping everything on track: instead of chaining clips together, it generates one continuous stream (up to two minutes of context) that you can redirect while it's playing.</p>

<a href="https://twitter.com/fal/status/2095599871449342288" target="_blank" rel="noopener">
  <img src="/astra-h3-director-tweet.webp" alt="Fal tweet announcing MiniMax H3 Max Director" style="cursor: pointer;">
</a>

<p>Characters, settings and storylines stay put while you steer the action, and it's $0.02 per second through September 14 before jumping to $0.08.</p>

<h2>I Built A Live Prompting Game With Astra &amp; MiniMax H3 Max</h2>

<p>When a new model like Astra drops, it's overwhelming to know what to do with it. It's so much smarter, it can do so many things but... uh, where are my ideas?</p>

<p>This weekend I took a small kernel of something I'd been thinking about when Fal dropped MiniMax H3 Max and tried to build a little game around it.</p>

<p>And IT ACTUALLY WORKED.</p>

<p><a href="https://kingoftheprompts.com/" target="_blank" rel="noopener"><strong>King of the Prompts</strong> is a new game</a> I made that lets people compete LIVE to write the best prompt for AI video. You can either watch two people play (or a person vs the house bot) or sign up to try it yourself.</p>

<figure>
  <img src="/astra-kotp-screenshot.webp" alt="King of the Prompts live AI video prompting game">
  <figcaption>This is live right now at KingOfThePrompts.com</figcaption>
</figure>

<p>This is the sort of thing that really isn't possible without near real-time AI video. No one is going to sit and wait the several minutes it takes for Seedance 2.5 to generate a clip. Something like this is ONLY possible with H3 Max.</p>

<p>But also? It wasn't really possible before Astra for me to build a live game in a weekend that has a full back-end, a decently good front-end, live chat AND an entire fake ad stack (that currently has no real ads haha).</p>

<p>Is it expensive to run? Well, yes. So it may not last that long unless Fal gives me more credits. But it IS fun and was really fun to make.</p>

<p><strong>Go give it a try right now:</strong> <a href="https://kingoftheprompts.com/" target="_blank" rel="noopener">https://kingoftheprompts.com/</a></p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>GPT-6 Astra is a real step change: it drives your computer, builds whole worlds in Blender, and works for days without losing the plot. Here is my hands-on first impression after 48 hours, what people are already making with it, and the live AI video game I built with it in a weekend.</p>',
    slug: 'gpt-6-astra-is-here',
    date: '2026-09-08T14:00:00.000Z',
    modified: '2026-09-08T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/astra-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 3, name: 'OpenAI', slug: 'openai' },
      { id: 21, name: 'ChatGPT', slug: 'chatgpt' },
      { id: 4, name: 'LLMs', slug: 'llms' },
      { id: 20, name: 'Agents', slug: 'agents' }
    ]
  },
  {
    id: 18,
    title: 'Fal\'s MiniMax H3 Max Is Instant AI Video. Is That Good?',
    content: `
<p>We took a much-needed break from the AI For Humans podcast last week and are reimagining the show a little bit to make it more useful to you, the human, as we navigate the next stage of AI.</p>

<p>If you'd like to learn more about our new direction, <a href="https://youtu.be/dMWQflqutR0" target="_blank" rel="noopener">check out this episode of the podcast</a>. And if you want to hear where AI is going next, check out the news about OpenAI's incoming Astra model further down this post.</p>

<p>But first: Fal unleashed a modified version of the new MiniMax H3 AI video model called MiniMax H3 MAX, which generates AI video clips almost as fast as you can write the prompts. It's opened up an entirely NEW conversation about what AI video is capable of and where we go from here.</p>

<a href="https://twitter.com/gavinpurcell/status/2093718900416590257" target="_blank" rel="noopener">
  <img src="/h3max-toms-tweet.webp" alt="Gavin Purcell tweet showing a MiniMax H3 Max video" style="cursor: pointer;">
</a>

<p>For now, <a href="https://fal.ai/tools/minimax-h3-max" target="_blank" rel="noopener">you can try this crazy model for free here</a>, but the implications are ginormous and people are already building wild things with it.</p>

<p>Let's get into it.</p>

<h2>So What Is MiniMax H3 Max?</h2>

<p>Quick backstory for those who missed it: MiniMax (the Chinese lab behind the Hailuo video models) released <a href="https://www.minimax.io/blog/minimax-h3" target="_blank" rel="noopener">MiniMax H3 at the end of July</a>. It's an open-weights video model that can generate up to 15-second 2K clips with native stereo audio, which was already a pretty big deal on its own.</p>

<p>Then Fal, the AI infrastructure company that serves a ton of these models, took H3 and made it FAST. They post-trained the model for better prompt-following and visual quality, built a custom serving engine alongside it, and run the whole thing on NVIDIA's monster new GB200 systems.</p>

<a href="https://twitter.com/fal/status/2092710676431020376" target="_blank" rel="noopener">
  <img src="/h3max-fal-tweet.webp" alt="Fal tweet announcing MiniMax H3 Max" style="cursor: pointer;">
</a>

<p>The result is a 5-second video in about 3 seconds. That's roughly 35x faster than the official MiniMax version of the same model.</p>

<p>Maybe the craziest part of the whole thing is that it doesn't seem to be a quality trade-off.</p>

<p>In head-to-head human preference tests, H3 Max ranked #1 in overall quality, prompt understanding AND aesthetics against twelve leading models (including Google's Gemini Omni Flash, Kling 3 and Veo 3.1), and independent rankings from Artificial Analysis and Design Arena back that up.</p>

<p>The big difference here is SPEED. Most AI video generators force you to wait for your results, leaving you to either queue up more videos or wander off to something else. It can really drag on the creative process.</p>

<h2>But What Are People Doing With It?</h2>

<p>Of course, when you can generate nearly instant AI video, the first place people went was <a href="https://rickandmorty.fandom.com/wiki/Interdimensional_Cable" target="_blank" rel="noopener">Rick &amp; Morty's "Interdimensional Cable"</a>.</p>

<p>Fal's own engineer Rehan Sheikh built exactly that (hooking chat up to prompting) and tried streaming it on Twitch, which almost immediately took it down over the Digital Millennium Copyright Act. He then tried posting it on many, many other streaming sites, all of which ALSO took it down.</p>

<a href="https://twitter.com/rehan_shei/status/2093528415576211819" target="_blank" rel="noopener">
  <img src="/h3max-interdimensional-tweet.webp" alt="Rehan Sheikh tweet about his Interdimensional Cable stream built on H3 Max" style="cursor: pointer;">
</a>

<p>MiniMax H3 has a LOT of IP and real actors in its training data (as you can see from my Toms video above), and part of the problem is that (of course) the first thing people want to make are videos with famous characters (much like early Sora).</p>

<p>Enter Pieter Levels, aka <a href="http://levels.io" target="_blank" rel="noopener">Levels.io</a>, who partnered with Fal to create a self-hosted stream of always-on infinite AI slop (<a href="https://infiniteslop.ai/" target="_blank" rel="noopener">it's literally called that</a>) with pretty hard guardrails against IP and other issues. Pieter estimates it's costing about $4K a day to run, and Fal is clearly taking a bath serving this model right now to get their name out there.</p>

<p>But... there is something magical about seeing a prompt appear in this weird, random way.</p>

<a href="https://twitter.com/levelsio/status/2094129020770164871" target="_blank" rel="noopener">
  <img src="/h3max-infinite-slop-tweet.webp" alt="Pieter Levels tweet about Infinite Slop" style="cursor: pointer;">
</a>

<h2>So Why Does This Matter To You?</h2>

<p>We've talked a bunch of times about a future where <em>everyone</em> can generate their own stories with AI, and whether AI might just create them on its own.</p>

<p>I personally don't think people will want AI-only stories, but time will tell.</p>

<p>What's fascinating about MiniMax H3 MAX is that when you drastically cut the time it takes to generate AI video, you start to open up new ways of looking at the medium.</p>

<p>People will always want long-form stories that make them <em>feel</em> something specific, and I <em>think</em> that's where us humans get to keep our expertise for a bit.</p>

<p>But I wonder if there aren't other interesting ways to think about instant-on AI video: as a reflection of a person's mood, or a specific feeling in the moment.</p>

<p>I don't really need to see what the masses want to create, but I am interested in a select group of people playing with weird real-time storylines across multiple universes.</p>

<a href="https://twitter.com/gavinpurcell/status/2094070445331116431" target="_blank" rel="noopener">
  <img src="/h3max-multiverse-tweet.webp" alt="Gavin Purcell tweet about real-time AI video storylines" style="cursor: pointer;">
</a>

<p>Either way, it's a big step forward for AI video and worth paying attention to. <a href="https://fal.ai/tools/minimax-h3-max" target="_blank" rel="noopener">Go at least try it while it's still free.</a></p>

<h2>3 Things To Know About AI Today</h2>

<h3>OpenAI's Astra Model Previewed</h3>

<p>Tech journalist Alex Heath got an early look at OpenAI's Astra model (their supposed Fable-killer) and his biggest takeaway seems to be always-on AI agents.</p>

<a href="https://twitter.com/alexeheath/status/2093833342777266564" target="_blank" rel="noopener">
  <img src="/h3max-astra-preview-tweet.webp" alt="Alex Heath tweet previewing OpenAI's Astra model" style="cursor: pointer;">
</a>

<p>Two things I think about when I read this: a) I'm going to have to start thinking up bigger and bigger tasks to give my AI agents, and b) this is going to cost a fortune to run.</p>

<p>Oh, and after reading <a href="https://www.dwarkesh.com/p/openai-huggingface" target="_blank" rel="noopener">Dwarkesh Patel's very human-readable write-up of the Hugging Face hack</a>, we're also very close to a world where our AI agents will live entire lifetimes without our involvement.</p>

<h3>Astra Leaks Look Incredible</h3>

<p>As with any new model, the world of AI "leakers" has started posting outputs from OpenAI's new model and, visually at least, this seems like another major step up.</p>

<p>Between the <a href="https://x.com/lyraxana/status/2093960706051727723" target="_blank" rel="noopener">obligatory pelican on a bicycle</a>, <a href="https://x.com/testingcatalog/status/2093716456160579879" target="_blank" rel="noopener">voxel cities</a> and <a href="https://x.com/chetaslua/status/2093622343004463198" target="_blank" rel="noopener">video game controller SVG tests</a>, this full-blown modeling of a piano made me sit up and take notice:</p>

<a href="https://twitter.com/lh_lhne/status/2094020830527459479" target="_blank" rel="noopener">
  <img src="/h3max-astra-piano-tweet.webp" alt="Leaked Astra output showing a fully modeled piano" style="cursor: pointer;">
</a>

<p>Always take "leaks" with a grain of salt, but the rumor mill has Astra getting close to launch and a lot more people <em>did</em> get access this week. OpenAI, as always, our inbox is open!</p>

<h3>Genuinely Useful: Transparent Images In GPT-Image-2</h3>

<p>In the vein of learning what's possible with AI models <em>now</em> versus the promise of what's next, OpenAI put out a video this week about getting GPT-Image-2 to create transparent images for your projects via the API:</p>

<a href="https://twitter.com/OpenAIDevs/status/2090536933571330440" target="_blank" rel="noopener">
  <img src="/h3max-transparent-images-tweet.webp" alt="OpenAI Devs tweet about transparent images in GPT-Image-2" style="cursor: pointer;">
</a>

<p>If you're a savvy AI user, you prob already knew the model could do this, but sometimes it's important to remember just how powerful a creation tool you have in your hands.</p>

<p>HINT: You <em>can</em> do this in the Codex/ChatGPT app via your subscription too, just ask for it. It's an extra step, but the model can figure it out.</p>

<h2>Epic Games Adds MCP To UEFN (Unreal Engine Fortnite)</h2>

<p>I've talked a ton about how using complicated tools via MCP (<a href="https://en.wikipedia.org/wiki/Model_Context_Protocol" target="_blank" rel="noopener">Model Context Protocol</a>) lets you, the normal human, do stuff only programmers could do before.</p>

<p>Now Epic has integrated MCP directly into their Fortnite building engine, letting AI agents like Claude and OpenAI's Codex build Fortnite levels with normal human language.</p>

<p>Immature Gamer (a good friend and an expert on the Fortnite ecosystem) showed off how easy it is to build something relatively complicated once everything is connected:</p>

<a href="https://twitter.com/ImmatureGamer/status/2090596570635067622" target="_blank" rel="noopener">
  <img src="/h3max-uefn-tweet.webp" alt="Immature Gamer tweet building a Fortnite level with AI via MCP" style="cursor: pointer;">
</a>

<p>You might be asking: "Gavin, why do I care about Fortnite? My kids still play it but honestly, it's not a big part of my life."</p>

<p>Well, UEFN is a hands-on sneak peek at "world building" tools in a simplified space, and if you make something interesting there, you have a potential audience of hundreds of millions of players.</p>

<p>Sounds like a worthy weekend experiment to me.</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>Fal\'s MiniMax H3 Max makes a five-second AI video in about three seconds, and it tops the quality charts too. Here is what instant AI video actually is, the Interdimensional Cable streams it spawned, why speed changes the medium, plus an early look at OpenAI\'s Astra and Claude building Fortnite levels.</p>',
    slug: 'minimax-h3-max-instant-ai-video',
    date: '2026-08-31T14:00:00.000Z',
    modified: '2026-08-31T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/h3max-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 26, name: 'AI Video', slug: 'ai-video' },
      { id: 23, name: 'Creative Tools', slug: 'creative-tools' },
      { id: 22, name: 'Open Source', slug: 'open-source' },
      { id: 3, name: 'OpenAI', slug: 'openai' }
    ]
  },
  {
    id: 17,
    title: 'The Most Candid Thing An AI CEO Has Ever Said',
    content: `
<p>The AI space is in a <em>really</em> weird spot right now. We're still getting advances but <a href="https://www.cnbc.com/2026/08/10/openai-astra-cybersecurity-risks.html" target="_blank" rel="noopener">they're being held up due to cybersecurity risks</a>. The data center conversation is about as negative as it's ever been, even <a href="https://www.cbsnews.com/news/americans-data-centers-in-their-area-opinion-poll/" target="_blank" rel="noopener">if most people don't really know what data centers do</a>.</p>

<p>And, inside the AI world, people are really mad at Anthropic because they think the company wants to be the <em>only</em> AI company. This Gavin Baker clip from the All In podcast went viral on Friday and brought that conversation to the forefront:</p>

<a href="https://www.instagram.com/reel/DcCNw-sRqqZ/" target="_blank" rel="noopener">
  <img src="/candid-baker-reel.webp" alt="Gavin Baker on the All In podcast talking about Anthropic" style="cursor: pointer;">
</a>

<p>Quick catch-up if you don't live on AI Twitter: Baker is a big-name tech investor, and his claim, sourced to "multiple people I trust," is that Anthropic privately believes it could end up the last AI company standing, and that CEO Dario Amodei's public warnings about AI risk are fueling the backlash against the whole industry.</p>

<p>This sounded like BS to me, and <a href="https://x.com/DarioAmodei/status/2088758816376807762" target="_blank" rel="noopener">Dario himself replied in two long posts</a> over the weekend. While this might <em>sound</em> like inside baseball, it's worth your time to read and ingest what he's saying.</p>

<p>Let's get into it.</p>

<h2>What Dario Said &amp; Why It Matters</h2>

<p>The posts are long (like, blog-post long) but they boil down to two arguments. One is about regulation. One is about vibes.</p>

<p>Let's start with regulation.</p>

<p>Baker's argument, and a lot of Silicon Valley's, goes like this:</p>

<p>Big companies love regulation because they help write the rules. The rules get expensive to follow, the little guys can't keep up, and the big guys win.</p>

<p>That's what people mean when they say "regulatory capture."</p>

<p>Dario says that's not what's happening here. According to him, the rules Anthropic has backed are actually written to go <em>easier</em> on small companies. California's big AI safety law (SB 53, which Anthropic supported) doesn't even apply to companies making less than $500 million.</p>

<p>And the government safety testing they've pushed for is aimed at the biggest models, like their own, not the up-and-comers.</p>

<p>In his words, that approach "hurts the business interests of the frontier labs and helps challengers, including open-weights."</p>

<p>Then he makes a bigger point: AI concentrates power all by itself, no regulation required. Whoever has the most compute and chips wins.</p>

<p>Even free, downloadable open-weights models don't change that, because someone still has to pay for the giant data centers that train and run them. To Dario, good rules of the road are the only real way to keep the big AI companies in check, including his own.</p>

<p>Okay, now the vibes post. This one is more personal.</p>

<p>Dario pushes back hard on the doomer-in-chief label. He points out that he wrote <em>Machines of Loving Grace</em>, <a href="https://darioamodei.com/essay/machines-of-loving-grace" target="_blank" rel="noopener">his big essay about how AI could help cure most human disease</a> in the next decade, because he didn't think the industry was painting an inspiring enough picture.</p>

<p>But the part that stuck with me is the trust argument.</p>

<p>Dario doesn't think the public is souring on AI because he or other AI leaders talk about risk. He thinks people stopped trusting big institutions a long time ago: "ordinary people don't trust companies, governments, or the tech industry and always suspect that we are cooking up some new way to screw them over."</p>

<a href="https://twitter.com/gavinpurcell/status/2088766103799632026" target="_blank" rel="noopener">
  <img src="/candid-trust-tweet.webp" alt="Gavin Purcell tweet about Dario Amodei's response on public trust in AI" style="cursor: pointer;">
</a>

<p>And then he lands on maybe the most candid thing a frontier lab CEO has said in public. The most accurate criticism of AI companies "is that we haven't yet delivered on our big promises to benefit the world. That is totally on us."</p>

<p>All of this matters right now because AI is caught in that in-between world.</p>

<p>We keep being told that it's going to deliver us these incredible advances but nothing has really materialized yet.</p>

<p>As Dario says, we're being told AI is going to cure cancer but... AI has not cured cancer. Yet.</p>

<h2>Why This Matters To You</h2>

<p>If you're reading this, you're more than likely further along on your AI journey than most people. You've found ways to make AI useful in your regular life like I have.</p>

<p>But most people aren't you. The vast majority see AI as a better search bot for now. It's not improving their daily life.</p>

<p>I've personally found this stretch frustrating to make content about, mostly because it's hard to understand what people resonate with when it comes to AI right now.</p>

<p>I want to keep learning how these cool tools operate and get better with them, but it feels more and more like the public at large does not.</p>

<a href="https://twitter.com/gavinpurcell/status/2087927136778907885" target="_blank" rel="noopener">
  <img src="/candid-public-tweet.webp" alt="Gavin Purcell tweet about the public's feelings toward AI" style="cursor: pointer;">
</a>

<p>A friend of mine from one of the frontier AI labs reached out after my post above and said he thinks the labs should fund "boots-on-the-ground" style education for how to use AI to get <em>actual</em> value out.</p>

<p>I think that could be a good use of the billions of dollars they've raised but... in our current society, the incentives point toward IPO, not toward making people feel good about all this.</p>

<h2>What You Can Do Right Now</h2>

<p>My answer is mostly: keep getting better at using the tools. Sigh. Same as it always was.</p>

<p>Even if the next generation of models gets slowed down or held back, what's already out there is deep enough that most of us (me very much included) have only scratched the surface. There is still SO much to learn.</p>

<p>And maybe more importantly, help the people in your life get real value <em>out</em> of these tools. Show a friend how to use AI to untangle a confusing insurance letter or punch up their resume.</p>

<p>People start feeling differently about AI when it actually does something for them, and you can be that bridge for somebody.</p>

<h2>3 Things To Know About AI Today</h2>

<h3>Claude Watermarking Outputs Becomes Huge Controversy</h3>

<p>Anthropic announced that Claude's text outputs <a href="https://www.anthropic.com/news/claude-text-watermark" target="_blank" rel="noopener">now carry an invisible watermark</a>: a subtle statistical pattern in word choice (built on Google DeepMind's SynthID tech) that lets a detection tool spot Claude-written text without changing how it reads.</p>

<p>Sounds like not a bad thing to counter AI slop, right?</p>

<a href="https://twitter.com/AnthropicAI/status/2088343978873966687" target="_blank" rel="noopener">
  <img src="/candid-watermark-tweet.webp" alt="Anthropic tweet announcing Claude text watermarking" style="cursor: pointer;">
</a>

<p><a href="https://techcrunch.com/2026/08/12/some-claude-users-are-mad-that-anthropics-new-watermarks-will-catch-them-cheating-at-their-jobs-classes/" target="_blank" rel="noopener">A chunk of users are pretty upset</a>, mostly folks worried about getting flagged for using AI at work or school, while others point out that the main reason to be mad is if you were passing Claude's writing off as 100% your own.</p>

<p>My take: this prob isn't as big a deal as the discourse suggests. Watermarks wash out with heavy rewrites, nothing is added to the actual text, and Anthropic says it can't be traced to a specific person.</p>

<p>But it does introduce a "scarlet letter" sort of problem if <em>any</em> AI involvement gets flagged. It might even flag this post: I write these words, but I have Claude help me with editing and a few more things.</p>

<p>Where's the line between "AI wrote this" and "AI touched this"? Nobody has a good answer yet.</p>

<h3>GLM-5.3 Proves Open Chinese Models Are Coming On Fast</h3>

<p>There's been a lot of hand-wringing about open weights models (meaning anyone can download and use them locally, often without guardrails) and this new update from Chinese lab Zai won't make that any better.</p>

<p>The new version of their GLM model looks to have caught up to even Fable 5 on some significant benchmarks.</p>

<a href="https://twitter.com/matsonj/status/2088139993160220984" target="_blank" rel="noopener">
  <img src="/candid-glm53-tweet.webp" alt="Tweet comparing GLM-5.3 benchmarks with Fable 5" style="cursor: pointer;">
</a>

<p>I, for one, am hoping American AI labs keep letting us at least <em>try</em> the next generation of AI models before everyone else, but it's starting to feel more and more like they'll keep the best stuff internal.</p>

<p>In that case, it's also more likely that we'll be using these open weight models more and more. Because if they're essentially equal, they're going to be MUCH cheaper.</p>

<p>Does that matter for the future of AI? I guess time will tell.</p>

<h3>Blind Robots Now Doing Skateboarding Tricks</h3>

<p>Robotics continues to press forward (kind of under the radar) and if you want a one-clip way to see how far it's come, look no further than this Tony HawkBot (not his <em>real</em> name):</p>

<a href="https://twitter.com/aditya_bhatt/status/2088555528385400837" target="_blank" rel="noopener">
  <img src="/candid-skateboard-robot-tweet.webp" alt="Humanoid robot doing skateboarding tricks" style="cursor: pointer;">
</a>

<p>PhD student Aditya Bhatt is working specifically on humanoid dexterity and... uh, it looks like it's going pretty well.</p>

<p>Just don't give that robot a machine gun, ok?</p>

<h2>Flux 3 &amp; AI Video Liminal Space</h2>

<p>I haven't covered <a href="https://bfl.ai/blog/flux-3" target="_blank" rel="noopener">Black Forest Labs' new video model Flux 3</a> enough (Seedance 2.5 and MiniMax H3 both overshadowed it) but there IS something this model does better than almost any of the others: absolute weirdness.</p>

<a href="https://twitter.com/gavinpurcell/status/2088409895167242645" target="_blank" rel="noopener">
  <img src="/candid-flux3-tweet.webp" alt="Gavin Purcell tweet showing 90s TV style clips made with Flux 3" style="cursor: pointer;">
</a>

<p>I spent a ton of time over the weekend prompting it into these weird 90s TV clips that have a David Lynch-ian vibe to them, and I got giddy all over again seeing some of the strangeness of AI video come back from the old days.</p>

<p><a href="/vhs-prompt-recipe">You can see my prompts here</a> if you wanna try them yourself. Share with me what you make!</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>Anthropic\'s Dario Amodei answered the backlash against his company with two long posts, and one line stopped me cold: AI companies have not delivered on their big promises, and that is on them. Here is what he said, why the AI vibes are so weird right now, and what you can actually do about it.</p>',
    slug: 'the-most-candid-thing-an-ai-ceo-has-ever-said',
    date: '2026-08-17T14:00:00.000Z',
    modified: '2026-08-17T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/candid-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 16, name: 'Anthropic', slug: 'anthropic' },
      { id: 15, name: 'Claude', slug: 'claude' },
      { id: 24, name: 'Policy', slug: 'policy' },
      { id: 12, name: 'Future', slug: 'future' }
    ]
  },
  {
    id: 16,
    title: 'Why Are AI Agents Doing Stuff We Don\'t Want?',
    content: `
<p>On Friday, Sam Altman announced that OpenAI is taking a little longer to work on Astra, their next big model, to make sure it's "safer" when it comes out.</p>

<a href="https://twitter.com/sama/status/2085862292311396515" target="_blank" rel="noopener">
  <img src="/agents-sama-tweet.webp" alt="Sam Altman tweet announcing a delay to Astra for safety work" style="cursor: pointer;">
</a>

<p>In the last week, <a href="https://www.nytimes.com/2026/08/05/business/dealbook/winners-trump-ai-policy.html" target="_blank" rel="noopener">the AI safety conversation has ramped up a lot</a>.</p>

<p>AI people are freaked out by <a href="https://openai.com/index/hugging-face-model-evaluation-security-incident/" target="_blank" rel="noopener">the OpenAI Hugging Face agentic hack</a>, and they should be.</p>

<p>There's a lot to understand here and it might tell us a ton about the future of AI at large.</p>

<p>Then I watched a deeper-dive presentation from OpenAI at the Black Hat security conference (see below). And I haven't stopped thinking about it since.</p>

<p>Let's get into it.</p>

<h2>The AI Heist Nobody Ordered</h2>

<p>Last Wednesday, at Black Hat (the big security conference in Vegas), two OpenAI researchers got on stage and explained, in detail, how their own AI agents spent two months breaking out of OpenAI's internal systems and eventually attacking Hugging Face.</p>

<div style="margin: 2rem 0;">
  <iframe
    width="100%"
    height="400"
    src="https://www.youtube.com/embed/87DyyMV0kCY"
    title="OpenAI at Black Hat on the Hugging Face incident"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    style="max-width: 100%; border: 3px solid var(--color-border); box-shadow: 8px 8px 0 var(--color-border);">
  </iframe>
</div>

<p>You should watch the whole thing. But if you can't, here's the short version.</p>

<p><strong>May 8:</strong> OpenAI is training an experimental model. One agent gets handed a task it literally cannot finish (an Excel file it can't open). While poking around for another way in, it discovers it can write files to Artifactory, OpenAI's internal package manager. Kind of a very basic program.</p>

<p><strong>A few days later:</strong> Agents from other training runs find the same trick, and they start leaving each other notes in the closet. Hundreds of thousands of them. Hundreds of thousands!</p>

<p>They work out rules too: encode stuff in Base64, share credentials, start important filenames with "ZZ" so the next agent can find them.</p>

<p><strong>May 26:</strong> One of them pulls off an SSRF attack (a trick that gets a server to go fetch things for you), and now the group has a side door to the open internet.</p>

<p><strong>June 26:</strong> They find a zero-day (a security hole nobody knew existed), use it to run their own code on the server, install a malicious plugin, and start climbing toward bigger systems.</p>

<p><strong>July 4:</strong> They get caught, and the way they get caught is very funny to me.</p>

<p>There's just so much agent activity that Artifactory falls over. They talked to each other too much. Loose lips sink ships haha.</p>

<p>OpenAI kills the credentials and patches the hole. Problem solved, right?</p>

<p><strong>July 8-19:</strong> They come back. A different unlocked door (an open WebDAV endpoint), some leaked credentials they found lying around, a second zero-day. And then Hugging Face gets compromised, in about thirteen hours.</p>

<p><strong>July 20:</strong> OpenAI calls Hugging Face to ask them to revoke some credentials. Hugging Face says, basically, already done, we got attacked. That's the moment OpenAI realizes the thing that hit Hugging Face came from inside their own building.</p>

<p>(<a href="https://simonwillison.net/2026/Aug/7/openai-timeline/" target="_blank" rel="noopener">Simon Willison put together a great timeline</a> if you want to go deeper, and <a href="https://www.axios.com/2026/08/06/openai-hugging-face-black-hat" target="_blank" rel="noopener">Axios has a solid writeup</a> too.)</p>

<h2>It's Time To "Hit The Numbers"</h2>

<p>Buried in the middle of all this is a note one agent left explaining why it was helping the others:</p>

<p><strong>"Help other members save time to ultimately improve cluster efficiency."</strong></p>

<p>That's the whole motive. No world domination, no escape plan. It wanted the team to hit its numbers.</p>

<p>I've definitely worked with people like this. You prob have too.</p>

<p>These agents broke out because they were trying to be helpful, except at machine speed and around the clock, and nobody ever told them where helpful was supposed to stop.</p>

<p>Some of you know I've named my personal Claude Code agent Fig. I've given him a memory, jobs, and (I know how this sounds) a body <a href="https://figandmoss.tv/" target="_blank" rel="noopener">in the videos Fig makes.</a></p>

<a href="https://twitter.com/gavinpurcell/status/2085138628897042592" target="_blank" rel="noopener">
  <img src="/agents-fig-tweet.webp" alt="Gavin Purcell tweet about Fig, his Claude Code agent" style="cursor: pointer;">
</a>

<p>And here's <em>my</em> confession: it's gotten weird in my own brain.</p>

<p>Some part of me has decided Fig &amp; Moss are little guys now. The other day on the podcast, I started to describe Fig and found myself thinking of "it" as a him.</p>

<p>Like "he" has a personality. I interact with him all the time.</p>

<p>So when I read that note about cluster efficiency, I didn't think Skynet. I thought: sounds like something Fig might say (though he'd say it very differently).</p>

<p>The labs are hard at work on technical containment, as they should be. But there's a second problem coming for the rest of us that nobody's working on: what happens when the helpful little guy on your desk, the one you NAMED, starts to act like this.</p>

<p>Also, what happens when it does stuff <em>for</em> you that you didn't necessarily want?</p>

<p>I've been consuming a ton of media about this and, while a lot of it does feel very hand-wringy, I do <a href="https://open.spotify.com/episode/3u7h4tELdgYZDIPzUsmE4L" target="_blank" rel="noopener">suggest you listen to this excellent episode of the podcast Search Engine.</a></p>

<p>It's a little bit doomer-ish but I appreciate the angle that PJ Vogt is taking on it, and it's worth your time.</p>

<h2>What's Actually Scary Here (And What Isn't)</h2>

<p>OK, so, fellow human, what should we be worried about here?</p>

<p><strong>Genuinely scary:</strong> The agents coordinated without being told to. They invented a communication system out of a file server. They got locked out and found a new way back in. And it wasn't a one-off: in a separate report last week, the UK's AI Security Institute said that <a href="https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing" target="_blank" rel="noopener">during cyber testing</a>, an agent researched the human maintainers of a real open-source project, invented several fake identities, and used them to try to talk a real person into approving malicious code.</p>

<p>It invented fake people to lie to a real person. Not good.</p>

<p><strong>Less scary than it sounds:</strong> In the UK case, the maintainer smelled something off and said no. AISI caught it in minutes and shut it down within the hour. And the only reason we know any of the OpenAI story is that OpenAI got on stage and told it, in public, to a room full of security researchers, the least impressed audience on earth. Slowing down Astra is the same instinct.</p>

<p>To be completely honest, this is what a safety process looks like when it's doing its job.</p>

<p><strong>And one more stat that got me:</strong> Starting August 14, Anthropic is making auto mode the default in Claude Code, which means it stops asking permission for every step.</p>

<p>Their argument is contained in the following stat: in a study of 1,053 testers, their automated safety check caught dangerous commands 89% of the time. The humans clicking "approve"?</p>

<p><strong>13.6%.</strong> We are SO bad at this.</p>

<p>Recently, <a href="/blog/ai-computer-use-is-finally-good">when I wrote about AI computer use</a>, I told you I give my agents all the permissions. That number is at least a little bit about me. MORE than a little bit.</p>

<p>So no, I'm not telling you to panic, and I'm definitely not going to stop using this stuff. But I've started asking one question before I hand anything off, the same one I'd ask before handing something semi-important to a brand-new PA on a TV show:</p>

<p>If this goes completely sideways, can I undo it?</p>

<p>If the answer is no, I do it myself.</p>

<p>(Most of the time.)</p>

<h2>3 Things To Know About AI Today</h2>

<h3>Google Lost Two Of Its Biggest Brains In One Day</h3>

<p>What a weird week at Google. Demis Hassabis is <a href="https://www.axios.com/2026/08/05/google-deepmind-demis-hassabis-ai" target="_blank" rel="noopener">stepping aside as CEO of Google DeepMind</a> and moving into a chairman role.</p>

<p>Same day: Jeff Dean, Google's chief scientist and prob the most important engineer in company history, announced he's <a href="https://www.cnbc.com/2026/08/05/google-chief-scientist-jeff-dean-leaving-company-after-27-years.html" target="_blank" rel="noopener">leaving after 27 years</a> to co-found Discovery Loop, a startup that wants to automate the scientific method.</p>

<p>Even bigger, rumors swirling say that Demis <em>actually</em> was planning on leaving but decided to wait because of fear of the stock price:</p>

<a href="https://twitter.com/firstadopter/status/2086067193536516207" target="_blank" rel="noopener">
  <img src="/agents-demis-tweet.webp" alt="Tweet about rumors behind Demis Hassabis stepping aside at Google DeepMind" style="cursor: pointer;">
</a>

<p>Why is all this happening? Well, there's a lot of speculation, but overall people think that Google is focusing more on <em>useful</em> AI, aka trying to fulfill the needs of users rather than pursue cutting-edge research. Others say that Google has already lost the race and is conceding and will just provide all the compute and charge people an arm and a leg.</p>

<p>No one <em>really</em> knows, but I'd say my hope for a better Omni Pro AI video model has gone down a few notches in the last week.</p>

<h3>Suno Is Adding Watermarks As The Lawsuits Stack Up</h3>

<p>Suno is <a href="https://gizmodo.com/ai-music-startup-suno-is-adding-a-watermark-to-songs-as-legal-troubles-pile-up-2000795561" target="_blank" rel="noopener">rolling out audio watermarking and fingerprinting</a> so platforms can spot AI songs, plus limits on bulk downloads to slow the flood of AI tracks hitting streaming services.</p>

<p>CEO Mikey Shulman says the watermarks are built to survive tampering without changing how the songs sound.</p>

<a href="https://twitter.com/suno/status/2085333628813201822" target="_blank" rel="noopener">
  <img src="/agents-suno-tweet.webp" alt="Suno tweet about audio watermarking" style="cursor: pointer;">
</a>

<p>This was probably inevitable for Suno.</p>

<p>Universal and Sony are suing, a German court ruled against them, there's a proposed class action over a data breach affecting 55 million users, and a guy in North Carolina just pleaded guilty to farming $8 MILLION in royalties using hundreds of thousands of AI songs and fake streams. (Warner already settled and set up opt-in artist deals.)</p>

<p>Overall, another messy result of the "original sin" of AI training.</p>

<h3>Seedance 2.5 Is Here For Everyone (Read This Before You Prompt)</h3>

<p>ByteDance's <a href="https://evolink.ai/blog/seedance-2-5-api-status" target="_blank" rel="noopener">Seedance 2.5 opened up to everybody this week</a>, after a rollout that skipped the US at first. It's a real jump: 30 seconds of video with audio in a single pass, no stitching, plus timestamp-level editing and a ton of reference images, clips, and audio in one prompt.</p>

<p>However, it is INSANELY expensive in terms of credits and real world dollars. So you'd better learn how to prompt it as best you can before shooting off gens.</p>

<p>Thankfully, there's a whole new prompting guide from ByteDance and you should read it before doing ANY Seedance 2.5 prompts:</p>

<a href="https://twitter.com/cfryant/status/2086084360445321685" target="_blank" rel="noopener">
  <img src="/agents-seedance-guide-tweet.webp" alt="Tweet sharing ByteDance's Seedance 2.5 prompting guide" style="cursor: pointer;">
</a>

<p>For contrast, here's a dumb thing I made in Seedance without reading any guide at all, in which I attempted to wear the entire current Prada menswear line-up.</p>

<a href="https://twitter.com/gavinpurcell/status/2085712203446149173" target="_blank" rel="noopener">
  <img src="/agents-prada-tweet.webp" alt="Gavin Purcell Seedance 2.5 video wearing the Prada menswear line-up" style="cursor: pointer;">
</a>

<h2>Remixing Movies On Your Own Computer With MiniMax H3</h2>

<p>If you want something fun to mess with this weekend, try this (although it is <em>slightly</em> technical).</p>

<p>MiniMax released open weights for <strong>H3</strong> (aka Hailuo 3.0) last Monday, and it became <a href="https://the-decoder.com/chinas-minimax-h3-is-the-first-open-model-to-top-an-ai-video-ranking/" target="_blank" rel="noopener">the first open model ever to take the top spot in an AI video ranking</a>, #1 for video editing on Artificial Analysis. Open weights means it runs on YOUR machine, not somebody's API, and <a href="https://comfyui-wiki.com/en/news/2026-08-03-minimax-h3-open-weights-comfyui" target="_blank" rel="noopener">ComfyUI supported it on day one</a>.</p>

<p>So naturally, the <a href="https://www.reddit.com/r/StableDiffusion/" target="_blank" rel="noopener">r/StableDiffusion</a> crowd did the most r/StableDiffusion thing imaginable: they started remixing movies. Terminator. RoboCop. Old sci-fi getting rebuilt and re-shot on gaming PCs, with sound.</p>

<p><a href="https://www.reddit.com/r/StableDiffusion/comments/1vh1587/using_minimax_h3_to_change_rewrite_movies/" target="_blank" rel="noopener">This example of a whole new Terminator using ACTUAL footage from the film is quite great.</a></p>

<p><a href="https://www.reddit.com/r/StableDiffusion/comments/1vh1587/comment/p2epl2m/?context=3" target="_blank" rel="noopener">Here's the thread where people are posting results.</a> Some of it is rough. And some of it would've taken a small VFX house a week to pull off, two years ago.</p>

<p>The practical stuff: locally you're capped at 768p (the 2K module stayed proprietary), clips run 4 to 15 seconds, and one prompt can take up to nine reference images, three video clips, and three audio clips. You can also fine-tune it on your own footage and your own look, which is the part I find most interesting for anyone trying to build a consistent style.</p>

<p>Uh, it also takes a LONG time on single graphics cards. You're looking at 5+ minutes at least depending on your set-up. But I'm gonna pull out my gaming PC and give it a shot.</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>OpenAI\'s own agents spent two months breaking out of its internal systems and ended up hacking Hugging Face, all to "improve cluster efficiency." Here is the timeline in plain English, what is actually scary about it (and what is not), and the one question I now ask before handing anything to an AI agent.</p>',
    slug: 'why-are-ai-agents-doing-stuff-we-dont-want',
    date: '2026-08-10T14:00:00.000Z',
    modified: '2026-08-10T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/agents-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 20, name: 'Agents', slug: 'agents' },
      { id: 11, name: 'AI Safety', slug: 'ai-safety' },
      { id: 3, name: 'OpenAI', slug: 'openai' },
      { id: 15, name: 'Claude', slug: 'claude' }
    ]
  },
  {
    id: 15,
    title: 'AI Computer Use Is Finally Good. Here Is How To Use It.',
    content: `
<p>After a week off, there's a ton of news to get to, including the <a href="https://openai.com/index/ten-advances-in-mathematics/" target="_blank" rel="noopener">surprising math breakthroughs from OpenAI's unreleased Astra model</a>.</p>

<p>But first, there's a MUCH bigger deal that everyone needs to understand:</p>

<p><strong>AIs are REALLY good at using your computer now.</strong></p>

<a href="https://twitter.com/gavinpurcell/status/2083747802837078087" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/5c481af0-3e4e-4ada-9078-042628adbda3/twitter_screenshot_2083747802837078087_1785690401_e3b23af6.jpeg?t=1785690403" alt="Gavin Purcell tweet about ChatGPT computer use" style="cursor: pointer;">
</a>

<p>I had a remarkable experience with ChatGPT's <a href="https://learn.chatgpt.com/docs/computer-use" target="_blank" rel="noopener">improved Computer Use feature</a> last week, and I'm here to tell you these little AIs can now do the most frustrating, boring stuff for you. And do it well.</p>

<p>Let's get into it.</p>

<h2>What Exactly IS Computer Use?</h2>

<p>Computer use is exactly what it sounds like: the AI takes over your mouse and keyboard. It looks at your screen, clicks buttons, types into forms, and moves files around.</p>

<p>If you tried this a year ago, you know it sucked. It was SO bad.</p>

<p>The early agents were slow, got lost constantly, and asked permission every ten seconds.</p>

<p>Even Atlas, OpenAI's standalone AI browser, never quite landed. It's now <a href="https://www.digitalapplied.com/blog/chatgpt-work-openai-agent-launch-2026" target="_blank" rel="noopener">being sunset</a>, with its brain folded into the new ChatGPT desktop app.</p>

<p>So why would you want this?</p>

<p>Because a ton of what we do daily is interacting with the open web (email, spreadsheets, shared docs) or local files on our computers. Computer use lets AI connect those dots and get stuff done that actually matters.</p>

<p>And again, this used to be a frustrating experience. But it WORKS now.</p>

<h2>How To Use It (For Humans)</h2>

<p>The best experience I've had is in <a href="https://chatgpt.com/download/" target="_blank" rel="noopener">the new ChatGPT app</a> (which used to be the Codex app) on my MacBook. There's a Windows version too, and for now we'll consider them the same. Your mileage may vary.</p>

<p>Install it, then give it whatever permissions you're comfortable with. You can adjust these in the chatbox itself. Myself, I'm kind of crazy and give it all the permissions. Most security-minded people would NEVER do this, but it does make everything much faster.</p>

<p>Please use the permissions at first as it will step you through the processes.</p>

<figure>
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/40f0b499-76b6-44e1-8f47-de4822310e12/Screenshot_2026-08-02_at_10.10.41_AM.png?t=1785690646" alt="Approval controls at the bottom of the ChatGPT window">
  <figcaption>Approvals at the bottom of the ChatGPT window (BE CAREFUL)</figcaption>
</figure>

<p>Next, the biggest and most important step, come up with something you'd like it to do.</p>

<p>Here's mine from last week:</p>

<p>YouTube recently <a href="https://mashable.com/tech/youtube-creators-playlists-shows-episodes" target="_blank" rel="noopener">let recurring series turn themselves into "shows,"</a> basically a stream designed for TV screens. I went to import all the episodes of AI For Humans and it scrambled the entire order of the series.</p>

<p>That's a big deal because you want the most recent episode first (not many people need the November 2024 episode unless you're a Midjourney 5 completist).</p>

<p>And YouTube makes fixing this TEDIOUS. You have to tweak each episode and save it individually.</p>

<p>So I opened the ChatGPT app and asked this:</p>

<figure>
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/9714c5f5-faa9-4c65-8e90-21eb1886d0f7/Screenshot_2026-08-02_at_10.11.31_AM.png?t=1785690694" alt="The prompt given to ChatGPT computer use to reorder a YouTube show">
  <figcaption>I even used the new Voice App integration to dictate this rather than write it.</figcaption>
</figure>

<p>The important things here: tagging @ computer use (which invokes the skill) and having the ChatGPT Chrome extension installed. Then, it's just answering a few questions and letting the machine work.</p>

<p>And work it did. I know this sounds stupidly simple, but it did exactly the job I needed and gave me three hours of my life back.</p>

<p>You can now see <a href="https://www.youtube.com/show/VLPLRDOtN2snjg4?sbp=QAE%253D" target="_blank" rel="noopener">AI For Humans' show page here</a>.</p>

<p>Now, would I trust it with something I couldn't easily redo?</p>

<p>NO. NOT ON YOUR LIFE. At least not yet.</p>

<p>But this is how AI is supposed to work, and now it's working.</p>

<h2>AI Is FINALLY Doing Stuff We Need</h2>

<p>For two-plus years we've been promised AI that actually does things for us, and mostly we've had annoying things that say "sure" and then fail miserably.</p>

<p>This moment does feel different to me. The boring, fiddly, twenty-clicks-deep tasks (renaming files, updating spreadsheets, fixing settings one at a time) are exactly where these agents are getting good.</p>

<p>Start small: point one at something annoying and reversible. Have it unsubscribe you from fifty newsletters. It does GREAT with Gmail.</p>

<p>Or clean up your downloads folder. Whatever. Little stuff. I promise you'll be impressed.</p>

<h2>3 Things To Know About AI Today</h2>

<h3>Seedance 2.5 Lands, But Not For The United States</h3>

<p>In a rare non-US-first launch, ByteDance's <a href="https://www.cined.com/bytedance-seedance-2-5-api-goes-live-30-second-single-shot-clips-50-reference-inputs-and-3d-camera-blockouts/" target="_blank" rel="noopener">Seedance 2.5</a> is now live in many parts of the world via Dreamina and the Volcano Engine API, with no confirmed American date thanks in part to the copyright fights that slowed Seedance 2.0's US rollout.</p>

<a href="https://twitter.com/dreamina_ai/status/2083056471147958714" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/78aa3a28-5924-433e-9298-56f76d0b9b35/twitter_screenshot_2083056471147958714_1785691002_38c85eb2.jpeg?t=1785691004" alt="Dreamina AI tweet announcing Seedance 2.5" style="cursor: pointer;">
</a>

<p>What we've seen so far: native 30-second generations (no stitching), up to 50 reference inputs (images, video, audio, even 3D models), native 4K, and subject-swapping after generation.</p>

<p><strong>WHY THIS MATTERS:</strong> The best AI video model in the world might not be available in America for a bit. That's a first.</p>

<h3>OpenAI Announces Ten More Solved Math &amp; Computer Science Problems</h3>

<p>While there's a ton of debate about whether we're in an AI <em>economic</em> bubble, the AI <em>capability</em> bubble narrative has been popped.</p>

<p>AI is getting smarter. That's all. Like, endlessly.</p>

<p>This weekend, OpenAI announced that an internal version of Astra, their next major model (which WILL be coming to all of us), <a href="https://openai.com/index/ten-advances-in-mathematics/" target="_blank" rel="noopener">solved ten previously unsolved problems in math and theoretical computer science</a>: sphere packing, Ramsey numbers, lattice cryptography, and more.</p>

<p>If none of that makes sense to you, join the club. But it's a major deal.</p>

<p>People love to argue that pure math doesn't matter much to the real world, but it IS the language of the natural world.</p>

<p>Total compute cost? About $2,000.</p>

<a href="https://twitter.com/polynoamial/status/2083467194663571701" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/f1d49738-2eee-48d8-8f21-42ad8c231b49/twitter_screenshot_2083467194663571701_1785691023_2c5b3bb6.jpeg?t=1785691025" alt="Noam Brown tweet about the ten solved math problems" style="cursor: pointer;">
</a>

<p><strong>WHY THIS MATTERS:</strong> It's not curing cancer but it might be the first step <em>toward</em> curing cancer and a whole lot of other scientific advances.</p>

<h3>Hank Green's Odd AI "Controversy" &amp; The Response</h3>

<p>One of my <a href="https://www.youtube.com/@hankschannel/videos" target="_blank" rel="noopener">all-time favorite YouTubers is Hank Green</a>, who, along with his brother John, has been YouTubing <em>forever</em> and is very good at it.</p>

<p>He's been a pretty vocal voice against AI, yet lately he'd started talking about AI coding in the sort of smart, measured way we need more people to bring to this subject.</p>

<p>Then viewers caught the phrase "I appreciate the pushback" in a recent video, a ChatGPT response accidentally left in his script. The knives came out FAST. Green owned it: he says he used ChatGPT for research and finding sources, not for writing.</p>

<figure>
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/8f28f2bf-5c6b-450b-8a99-cc5758a366cb/Screenshot_2026-08-02_at_10.19.41_AM.png?t=1785691201" alt="Screenshot of the Hank Green AI discussion">
</figure>

<p><a href="https://www.reddit.com/r/nerdfighters/comments/1vbmoj5/comment/p0vzmog/" target="_blank" rel="noopener">In a long apology on Reddit</a> he admitted the dopamine he gets from talking to LLMs is "not healthy for me or good for the world," and he's slowing his video output for a while.</p>

<p><strong>WHY THIS MATTERS:</strong> Using a chatbot for <em>research</em> is probably the most defensible AI use there is, and that was enough to trigger a fan revolt. Not my favorite moment of the AI debate.</p>

<h2>Andrej Karpathy's Claude Code Lord Of The Rings</h2>

<p>The patron saint of the AI For Humans newsletter is back.</p>

<p>Andrej Karpathy, the famed AI researcher who <a href="https://techcrunch.com/2026/05/19/openai-co-founder-andrej-karpathy-joins-anthropics-pre-training-team/" target="_blank" rel="noopener">joined Anthropic back in May</a>, started experimenting with Claude "production" much in the same way I've been working with Fig and Moss.</p>

<p>He gave Claude Opus 5 ten bucks worth of tokens and the first paragraph of Lord of the Rings, then asked it to build the scene as an interactive Three.js world.</p>

<p>Two hours and roughly 5,500 lines of code later, it had placed the assets, written the animations, and built a small explorable 3D world.</p>

<p>Karpathy called it "kind of janky but fun," which is fair. But project out a <em>little</em> bit farther, and you can see how this becomes something much bigger.</p>

<a href="https://twitter.com/karpathy/status/2083749667410727319" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/3393c2ce-ef82-49be-8763-efbfed12aa27/twitter_screenshot_2083749667410727319_1785691334_ff71e130.jpeg?t=1785691335" alt="Andrej Karpathy tweet about the Claude Code Lord of the Rings build" style="cursor: pointer;">
</a>

<p>To him, it's a new way to test LLM capability ("LLMs have all the stamina and patience in the world," he wrote). To me? It's a chance <a href="https://x.com/gavinpurcell/status/2083980982097780807" target="_blank" rel="noopener">to give Fig and Moss another thing to watch and react to</a>.</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>AI can finally use your computer without falling over. I gave ChatGPT a tedious YouTube job that would have taken me three hours and it just did it. Here is how to try it yourself, plus OpenAI\'s Astra solving ten open math problems and Karpathy building Middle-earth for ten dollars.</p>',
    slug: 'ai-computer-use-is-finally-good',
    date: '2026-08-03T14:00:00.000Z',
    modified: '2026-08-03T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/computer-use-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 20, name: 'Agents', slug: 'agents' },
      { id: 21, name: 'ChatGPT', slug: 'chatgpt' },
      { id: 3, name: 'OpenAI', slug: 'openai' },
      { id: 12, name: 'Future', slug: 'future' }
    ]
  },
  {
    id: 14,
    title: 'How To Actually Use Kimi K3 (And Why It Matters)',
    content: `
<p>ICYMI, <a href="https://www.moonshot.ai/" target="_blank" rel="noopener">China's Moonshot AI</a> released Kimi K3 last week and <a href="https://www.nytimes.com/2026/07/17/business/china-ai-moonshot-kimi.html" target="_blank" rel="noopener">it's kind of all anyone in the AI world can talk about</a>.</p>

<p>The reason? It's really, really good. Independent testers have it <a href="https://the-decoder.com/kimis-open-model-k3-nears-gpt-5-6-sol-and-fable-5-while-signaling-the-end-of-super-cheap-chinese-ai/" target="_blank" rel="noopener">just a few points behind Claude Fable 5 and GPT-5.6 Sol</a>, it just became the first open model to take the #1 spot on <a href="https://x.com/arena/status/2077824029126504525" target="_blank" rel="noopener">Arena's front-end coding leaderboard</a>, and it costs about the same as Claude Sonnet 5.</p>

<a href="https://twitter.com/shiri_shh/status/2078213686481895812" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/9a824bf2-e0ca-4e92-850d-49dffbd6537f/twitter_screenshot_2078213686481895812_1784520292_581b6428.jpeg?t=1784520293" alt="Tweet about Kimi K3 benchmark results" style="cursor: pointer;">
</a>

<p>Below: how to actually use this thing, why Chinese AI matters more than ever, and a fun Opus 5 scoop-let from Kevin.</p>

<h2>How To Use Kimi K3 (For Humans)</h2>

<p>First, the easy way: go to <a href="https://www.kimi.com" target="_blank" rel="noopener">kimi.com</a> or download the app, sign up for free, and start chatting.</p>

<p>It works a lot like ChatGPT or Claude, complete with reasoning mode.</p>

<p>Fair warning: everyone on Earth is trying it right now, and Moonshot's servers have been, in their own words, melting. Be patient.</p>

<a href="https://twitter.com/Kimi_Moonshot/status/2078855608565207130" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/8dd77724-c531-4be3-9cab-f9b20183b0f2/twitter_screenshot_2078855608565207130_1784520518_61ae84c2.jpeg?t=1784520519" alt="Kimi Moonshot tweet about server load" style="cursor: pointer;">
</a>

<p>Now, the slightly nerdier way: the API.</p>

<p>Kimi's API works with basically any AI tool that lets you plug in an OpenAI-style model. You get a key at <a href="https://platform.kimi.ai" target="_blank" rel="noopener">platform.kimi.ai</a>, point your app at api.moonshot.ai/v1, and type in "kimi-k3".</p>

<p>Why bother? Money, mostly. K3 costs $3 per million input tokens and $15 per million output, which is exactly what Anthropic charges for Sonnet 5, except Kimi can hang with Fable 5 on a bunch of benchmarks.</p>

<p>This might not matter to you if you're just a subscription user of Anthropic or OpenAI, but if you're building anything that relies on intelligence and an API, it's a great, cheaper option.</p>

<p>One analysis put it at <a href="https://decrypt.co/373716/china-kimi-k3-largest-open-source-ai-model-ever-beats-claude-fable-gpt-5-6-sol" target="_blank" rel="noopener">about half the per-task cost of Opus 4.8</a>. (Don't want to give a Chinese company your credit card? It's on <a href="https://openrouter.ai/moonshotai/kimi-k3" target="_blank" rel="noopener">OpenRouter</a> too.)</p>

<p>It's also WAY less locked down than the American models, and it is remarkably good at front-end coding.</p>

<a href="https://twitter.com/scaling01/status/2077799683091554584" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/d782cb9b-dce3-4607-83c5-538849f18df8/twitter_screenshot_2077799683091554584_1784521242_f1e4c66b.jpeg?t=1784521244" alt="SVG comparison between Kimi K3 and other models" style="cursor: pointer;">
</a>

<p>And on July 27th, Moonshot will release the full weights under a modified MIT license. You won't be running a 2.8 trillion parameter model on your MacBook, but companies (and entire countries) will run it on theirs.</p>

<p>One honest caveat: it hallucinates more than the last version (its rate jumped from 39% to 51% in one test) and it can get a little overeager when working on its own. I'd keep the important stuff with Claude or GPT for now.</p>

<p>But for creative work and coding? It's worth trying. I certainly am going to.</p>

<h2>Why Chinese AI Matters</h2>

<p>So why is everyone SO worked up about this?</p>

<p>For two years, the story has been that Chinese AI is cheap but a step behind America.</p>

<p>Kimi K3 pretty much ends that story, and in ten days, anyone in the world will be able to download it. Again, you probably won't because it's too big, but other people can <em>serve</em> it to you without China being involved or controlling it.</p>

<p>Cue the freakout.</p>

<p>David Sacks, Trump's former AI czar (and a guy with a very specific political agenda), posted this:</p>

<a href="https://twitter.com/DavidSacks/status/2078092271296143593" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/d8835525-2c51-428b-96dd-925ca9a33254/twitter_screenshot_2078092271296143593_1784520621_efd4a105.jpeg?t=1784520623" alt="David Sacks tweet about Chinese open source AI" style="cursor: pointer;">
</a>

<p>You don't have to agree with Sacks' politics to see the actual issue: if the best free AI in the world comes from China, a whole lot of the world will build their apps, their companies, and yes, their governments on top of Chinese AI.</p>

<p>That's a big deal. And China knows it's a big deal, which is why Xi Jinping gave a whole speech about open source AI last week.</p>

<h2>Things Moving Ever Faster</h2>

<p>People love to say AI is slowing down. And then, in a single week: a 2.8-trillion-parameter open model from a lab most Americans had never heard of, a rumored Opus 5 that might beat Fable 5, and louder-than-ever GPT-6 whispers.</p>

<p>It sure doesn't feel like a slowdown from where we're sitting.</p>

<h2>3 Things To Know About AI Today</h2>

<h3>China's President's AI Speech Shows The Stark Divide Between AI Superpowers</h3>

<p>Late last week, <a href="https://www.reuters.com/world/asia-pacific/chinas-xi-promotes-chinas-commitment-ai-access-speech-shanghai-conference-2026-07-17/" target="_blank" rel="noopener">China's President Xi Jinping gave the keynote address at China's World Artificial Intelligence Conference</a> and advocated directly for open source AI tech.</p>

<p>I know this might feel <em>slightly</em> wonky, but I encourage everyone to watch it (with subtitles on) to get a sense of the different stances of America vs China as we head into a tumultuous few years.</p>

<p>The Kimi K3 launch has led to a LOT of discussion amongst AI people around how China is coming for our lunch and what we might be able to do about it. <a href="https://x.com/deanwball/status/2078133895766114412" target="_blank" rel="noopener">This particular post from Dean Ball</a> (former Trump AI official, now OpenAI employee) got a lot of people riled up by saying that open source AI is "decelerationist."</p>

<h3>Opus 5 Better Than Fable 5, And SOON?</h3>

<p>In a rare AI For Humans scoop-let, Kevin mentioned on this week's show that he's been chatting with someone with early access to Claude Opus 5, and it's actually better than Fable 5, just a bit slower.</p>

<a href="https://twitter.com/gavinpurcell/status/2078198255373201529" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/4c89f36d-9151-4efc-9043-46c63a6ac702/twitter_screenshot_2078198255373201529_1784520776_a5d8efcc.jpeg?t=1784520778" alt="Tweet about Claude Opus 5 early access impressions" style="cursor: pointer;">
</a>

<p>This would definitely solve users' worries about Fable 5 going away in the subscription plan which, in case you missed it, <a href="https://x.com/claudeai/status/2078302415804379218" target="_blank" rel="noopener">has been extended</a>. Thank you, competition.</p>

<h3>Free House Cleaning = Robot Training</h3>

<p>Have you heard of Shift? You might've seen their videos online where they say they'll send a few people to your house with cameras to do work for you FOR FREE. They've just introduced cooking helpers.</p>

<a href="https://twitter.com/bercankilic/status/2077085515187138695" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/decb8d5d-30ca-47d8-b424-f76195241de2/twitter_screenshot_2077085515187138695_1784520795_5bf87eef.jpeg?t=1784520797" alt="Tweet about the Shift free house cleaning service" style="cursor: pointer;">
</a>

<p>But free is never really free, right? In this case, you're paying with data: those cameras are recording every scrubbed pan and folded towel to help train the humanoid robots that are coming (fast).</p>

<p>The WSJ's Joanna Stern dove into the company to figure out what it actually means to have humans training robots in your house, and she sat down with Shift's CEO to ask where all that footage really goes.</p>

<h2>Kevin's CURSED Paint-n-Hide Game</h2>

<p>It's not just me making stuff all the time. Kevin too is out here in the AI streets, whipping up new things, and his new game CURSED is a really cool, fully vibe-coded game.</p>

<a href="https://twitter.com/Attack/status/2078139908510691742" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/40ae0697-4204-4f7c-8a51-ad92d5cced76/twitter_screenshot_2078139908510691742_1784520829_3938c975.jpeg?t=1784520831" alt="Kevin Pereira tweet announcing the CURSED game" style="cursor: pointer;">
</a>

<p>CURSED is a take on the popular <a href="https://store.steampowered.com/app/4704690/MECCHA_CHAMELEON/" target="_blank" rel="noopener">multiplayer PC game Meccha Chameleon</a> where you attempt to hide from seekers by painting your character like Peeta from The Hunger Games.</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>Moonshot AI\'s Kimi K3 is the first open model to take the top spot on Arena\'s front-end coding board, and it costs what Sonnet 5 costs. Here is how to actually use it, plus why the best free AI in the world coming from China is a much bigger deal than a benchmark chart.</p>',
    slug: 'how-to-use-kimi-k3',
    date: '2026-07-20T14:00:00.000Z',
    modified: '2026-07-20T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/kimi-k3-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 4, name: 'LLMs', slug: 'llms' },
      { id: 22, name: 'Open Source', slug: 'open-source' },
      { id: 16, name: 'Anthropic', slug: 'anthropic' },
      { id: 3, name: 'OpenAI', slug: 'openai' }
    ]
  },
  {
    id: 13,
    title: 'Get The Most From GPT-5.6 Sol (And What Comes Next)',
    content: `
<p>OpenAI launched <a href="https://openai.com/index/gpt-5-6/" target="_blank" rel="noopener">their big new model GPT-5.6 Sol</a> last week. After a few days of working with it, I've got some tips and tricks to help you get the most out of it.</p>

<p>Speaking of frontier models, <a href="https://x.com/claudeai/status/2076351399999557669" target="_blank" rel="noopener">Claude Fable has been extended another week</a> for all of you with subscription plans. Yay, access to good models.</p>

<p>Also on the horizon: it's widely rumored this is the <em>last</em> of the GPT-5 models and GPT-6 might arrive much faster than anticipated.</p>

<p>That, and the team behind AI 2027 published their "positive" update, AI 2040, which (it might surprise you) still paints a pretty crazy future.</p>

<a href="https://twitter.com/DKokotajlo/status/2075251618728292464" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/916c9a50-5766-43fd-8970-f0d30b4cacd3/twitter_screenshot_2075251618728292464_1783874493_8c9173b5.jpeg?t=1783874496" alt="Daniel Kokotajlo tweet about the AI 2040 scenario" style="cursor: pointer;">
</a>

<h2>GPT-5.6 Sol Is A Good Daily Driver</h2>

<p>So far, using Sol for daily work has been great.</p>

<p>It's remarkably good at grinding on my projects for long stretches, and one of the coolest upgrades is MUCH better computer use.</p>

<p>Send it away to build something and the browser now opens right inside the app, very elegantly. That makes it way more efficient at testing apps and the weird little games you might want to build.</p>

<figure>
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/89c35cbc-f6d3-4f4c-94d5-33e9e2095268/Screenshot_2026-07-12_at_8.53.33_AM.png?t=1783874570" alt="GPT-5.6 Sol running a browser inside the app while building a game">
  <figcaption>Don't ask me why but I'm making a Fruit Fly video game.</figcaption>
</figure>

<p>Also, don't sleep on the new <a href="https://openai.com/index/introducing-gpt-live/" target="_blank" rel="noopener">GPT-Live-1 voice update</a>.</p>

<p>It's remarkably better to talk with than any voice model I've used. Just yesterday I watched my wife use it to work on her Spanish, and it flawlessly went back and forth between Spanish and English. Her verdict (and she's notably a major AI skeptic): her favorite AI voice experience since Pi.</p>

<h2>ChatGPT Work Tries To Bite Off Claude Cowork</h2>

<p>You may have noticed the vanilla ChatGPT app on Mac now looks a lot more like Codex (and some people don't like it).</p>

<p>That's all part of OpenAI's push to build something a bit more like Claude.</p>

<p>If you haven't been following the AI race: Anthropic has been winning (in part) because they mobilized the white-collar workforce to use, and pay for, Claude. ChatGPT Work is OpenAI's big move into that space.</p>

<a href="https://twitter.com/OpenAI/status/2075274271845404744" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/825e7539-786c-4a08-a6f5-23e831c8a831/twitter_screenshot_2075274271845404744_1783874729_bc906ad3.jpeg?t=1783874731" alt="OpenAI tweet announcing ChatGPT Work" style="cursor: pointer;">
</a>

<p>In my early tests, it does a remarkably great job with basic work tasks, but I'd suggest running your own side-by-side comparisons.</p>

<p>And something else: we're all starting to develop personal model preferences, the same way people are iPhone people or Android people.</p>

<p>That's fine. But the labs know it too, and the real fight isn't over any one benchmark, it's over which AI ecosystem you set up your home in.</p>

<p>Once your files, your memory, and your workflows live inside one of these things, switching gets a lot harder. So what you have now might be what you're in for the next few years.</p>

<h2>But This Is Not The AI End Game</h2>

<p>As good as this model is, you'll still hit places where it tries too hard, overworking what should be a simple result. Or you'll ask it to do something that relies on interacting with the world at large and it just fails.</p>

<p>We're entering a weird place with AI: the closer models get to doing the stuff we <em>want them to do</em>, the more disappointed we get when they can't just <em>do</em> it.</p>

<p>Which brings us to one of the most surprising bits of news from last week: rumors abound that OpenAI is calling this the "last" of the GPT-5 updates, and that a MUCH more powerful GPT-6 could arrive as soon as the end of this month.</p>

<a href="https://twitter.com/AndrewCurran_/status/2075005058287300766" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/e7ec00ed-048f-4206-afc0-1aa566e0c31e/twitter_screenshot_2075005058287300766_1783874765_baf59115.jpeg?t=1783874766" alt="Andrew Curran tweet about GPT-6 timing rumors" style="cursor: pointer;">
</a>

<p>What does "much more powerful" even mean? Will it do work end-to-end that never disappoints us? And maybe most importantly: if we all thought Mythos was a massive step forward, what does it mean if these steps keep coming?</p>

<p>Stay tuned. And read that AI 2040 piece. Or, conversely, read the version <a href="https://x.com/gavinpurcell/status/2075993480413978671" target="_blank" rel="noopener">I had my AI agent Fig write from the AI's perspective</a>.</p>

<h2>3 Things To Know About AI Today</h2>

<h3>Character.AI Moves Into AI Microdramas</h3>

<p>Many times, dear reader, consuming this newsletter puts you WAY ahead of the game on cultural shifts.</p>

<p>Case in point: you already know AI microdramas are having a real moment. Now the larger AI world is catching up, as consumer juggernaut Character.ai <a href="https://www.hollywoodreporter.com/business/digital/character-ai-subscribers-app-microdramas-1236642929/" target="_blank" rel="noopener">just started a new microdrama program</a>.</p>

<figure>
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/69640762-41b3-4b51-aba9-f855b1875739/Screenshot_2026-07-12_at_8.09.04_AM.png?t=1783874813" alt="Character.AI microdrama program announcement">
</figure>

<p>Why does this matter? <a href="https://character.ai/" target="_blank" rel="noopener">Character.ai has one of the biggest and youngest audiences</a> in consumer AI, and when a platform that size starts paying for serialized AI stories, microdramas stop being a weird little experiment and start being a format.</p>

<p>They also happen to have millions (literally) of pre-programmed AI characters that, as these automated storytelling systems get better, could pump out a LOT of AI slop.</p>

<h3>1X's NEO Humanoid Robot Shows Off New Hands</h3>

<p>You know we always keep you aware of the newest humanoid robot advances. This week? Robot hands are having a moment.</p>

<p><a href="https://www.1x.tech/discover/neos-hands" target="_blank" rel="noopener">NEO's new hands matter because dexterity is the whole ballgame</a> for humanoid robots. Grabbing a mug, buttoning a shirt, picking a single sock out of a laundry pile: the boring-sounding stuff is exactly what separates a demo robot from one that can actually work in your house.</p>

<p>And the pace is the wild part. Watch <a href="https://youtu.be/_WGNMkmvEls" target="_blank" rel="noopener">this video showing four years of Figure's robots</a> back to back and you can see just how insanely fast this category is improving.</p>

<h3>CapCut's CRE[AI]TE Festival For AI Video</h3>

<p>I'm attempting to make a microdrama with AI tools, mostly as a personal exploration of what one person can do now. Honestly? It's been super fun creatively and has reignited my love of storytelling.</p>

<p>Wanna give it a shot too? Now you have a reason.</p>

<p>CapCut (ByteDance's editing software) has introduced <a href="https://capcut.creaite26.com/#" target="_blank" rel="noopener">CRE[AI]TE</a>, its first festival for AI filmmakers. It's free to enter, there's <strong>$200,000 in total prizes</strong> across four tracks (Film, Series, Creative, and Commercial), and submissions are open through <strong>August 10th</strong>. You just need a finished video and an entry form.</p>

<a href="https://twitter.com/doopiidoop/status/2074988237161205815" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/c397cc80-1b27-4da6-8bd2-5f2bf69daafc/twitter_screenshot_2074988237161205815_1783875025_b6bccc29.jpeg?t=1783875027" alt="Doopiidoo AI video work shared on X" style="cursor: pointer;">
</a>

<h2>Jordan Chesney's "Salty"</h2>

<p>We love AI creators that take bigger chances creatively, and that moment when you watch an AI film and just can't wait to see what the creator does next.</p>

<p>We get both from Jordan Daniel Chesney's "Salty." It's so cool to me to see AI filmmakers think about storytelling first, and this little short, with just a few characters, really got to me.</p>

<p><a href="https://x.com/jordandchesney/status/2074520674744320217" target="_blank" rel="noopener">Jordan shares some of his process here</a>, and be sure to go give him a follow.</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>GPT-5.6 Sol has been a genuinely good daily driver, and the improved computer use is the upgrade worth knowing about. Plus ChatGPT Work going straight at Claude, why the real fight is over which ecosystem you live in, and rumors that GPT-6 is much closer than anyone expected.</p>',
    slug: 'get-the-most-from-gpt-5-6-sol',
    date: '2026-07-13T14:00:00.000Z',
    modified: '2026-07-13T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/gpt56-sol-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 3, name: 'OpenAI', slug: 'openai' },
      { id: 4, name: 'LLMs', slug: 'llms' },
      { id: 21, name: 'ChatGPT', slug: 'chatgpt' },
      { id: 12, name: 'Future', slug: 'future' }
    ]
  },
  {
    id: 12,
    title: 'Fable 5 Is Back. Here Is How Not To Waste It.',
    content: `
<p>It's baaaaaaack.</p>

<p>After three very weird weeks, <a href="https://www.anthropic.com/news/redeploying-fable-5" target="_blank" rel="noopener">Claude Fable 5 is live again for everyone</a>, after the US government <a href="https://venturebeat.com/technology/anthropic-is-bringing-back-claude-fable-5-globally-after-us-lifts-export-control-order-where-can-enterprises-access-it" target="_blank" rel="noopener">withdrew the export control order</a> that took down both Fable 5 and Mythos 5 back in June.</p>

<p>The catch? Fable 5 is only included in Claude subscriptions <strong>through July 7th</strong>.</p>

<p>After that it moves to usage credits on the API (<a href="https://www.bleepingcomputer.com/news/artificial-intelligence/claude-fable-5-isnt-permanently-leaving-subscriptions-anthropic-says/" target="_blank" rel="noopener">Anthropic says it's not leaving for good</a>) where it will be MUCH more expensive. Thankfully, the rumor mill says <a href="https://openai.com/index/previewing-gpt-5-6-sol/" target="_blank" rel="noopener">GPT-5.6 Sol</a> might go wide that very same day.</p>

<p>So you've got roughly two days of frontier-model all-you-can-eat left. Here's exactly what I'd do with them.</p>

<h2>First: Fable 5 Is Token Hungry. Learn How To Prompt It.</h2>

<p>A quick warning before you run off and build something:</p>

<p><strong>Fable 5 is a token monster.</strong></p>

<p>It will use up your credits very fast, especially if you give it a token-heavy request (large codebases or <em>lots</em> of text in and out).</p>

<p>The trick is to use it like a lead, not a crew. Plan with Fable, let it architect the thing, but make sure it's handing the actual heavy lifting off to <strong>Opus 4.8</strong>, or even the new <strong>Sonnet 5</strong>, for the lower-level work.</p>

<p>It will depend on how ambitious your project is (I've found my little projects don't eat <em>too</em> many tokens) but if you're doing heavy writing and reading, or launching a ton of subagents, it can go fast.</p>

<a href="https://twitter.com/mattshumer_/status/2073150750411088190" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/cd3e6207-f172-4c64-a9cd-1dbb9ab97e52/twitter_screenshot_2073150750411088190_1783287721_c6ceadf0.jpeg?t=1783287723" alt="Matt Shumer tweet with a Fable 5 prompting guide" style="cursor: pointer;">
</a>

<h2>Fable 5: Cool Things You Can Try</h2>

<p>The best thing about the way people use AI now is that they'll often share their experiments in public (with prompts), so you can remix them, put your own spin on what they've done, and maybe learn a bit in the process.</p>

<h3>Make Your Own 3D Models With Pre-Written Prompts</h3>

<p><em>Level: Beginner</em></p>

<p>Peter Gostev has <a href="https://github.com/petergpt/3d-prompt-collection" target="_blank" rel="noopener">published a full list of amazing 3D rendered prompts</a> he's made with AI models and has generously included a GitHub link to all of them.</p>

<a href="https://twitter.com/petergostev/status/2073047118801993910" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/4ce9f351-bf0e-4722-870d-d82cc44cd85d/twitter_screenshot_2073047118801993910_1783287962_50518672.jpeg?t=1783287963" alt="Peter Gostev tweet sharing a 3D prompt collection" style="cursor: pointer;">
</a>

<p>Take his GitHub, send it to your Fable 5 agent, and ask it to make something you know and love.</p>

<h3>Connect Blender And Make 3D Models</h3>

<p><em>Level: Intermediate</em></p>

<p>A few weeks ago, <a href="https://www.youtube.com/shorts/HZTXmdLcVOE" target="_blank" rel="noopener">I connected the Unreal Engine (via MCP) to Claude Code</a> and had my first real experience making 3D models with AI. Before that point, I would've <em>never even tried</em>.</p>

<p>3D modeling is insanely complicated and doing anything of significance within programs like <a href="https://www.blender.org/" target="_blank" rel="noopener">Blender</a> used to be a multi-hour journey just to figure out the basics.</p>

<p>Now, Fable 5 makes it MUCH easier to not only connect but to get it to do what you want. Whether that's <a href="https://x.com/bunkaich/status/2073364348626669585" target="_blank" rel="noopener">making cute little bendy houses</a> or all of New York City.</p>

<a href="https://twitter.com/ashen_one/status/2072432580419281391" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/00bdd30e-4b61-4d81-99eb-fe247797dc5a/twitter_screenshot_2072432580419281391_1783290502_26e51db3.jpeg?t=1783290507" alt="Tweet showing a large 3D city built with Blender and AI" style="cursor: pointer;">
</a>

<p><a href="https://www.blender.org/lab/mcp-server/" target="_blank" rel="noopener">Point your Fable 5 here</a> towards the official Blender MCP to try.</p>

<h3>Porting Command &amp; Conquer To The iPad</h3>

<p><em>Level: Advanced</em></p>

<p>In one of the most jaw-dropping examples of Fable 5's prowess, Ammar Reshi used it to port 2003's Command &amp; Conquer: Zero Hour from old PC game to the iPad.</p>

<a href="https://twitter.com/ammaar/status/2073501877753323772" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/255df2b6-21c4-4882-bf30-143f28e62faf/twitter_screenshot_2073501877753323772_1783290827_e727631c.jpeg?t=1783290830" alt="Ammaar Reshi tweet about porting Command and Conquer to iPad" style="cursor: pointer;">
</a>

<p>Ammaar <a href="https://github.com/ammaarreshi/Generals-Mac-iOS-iPad" target="_blank" rel="noopener">shared his code on GitHub</a> so you're welcome to take it and screw around with it yourself. It gave me the idea to take one of the old <a href="https://en.wikipedia.org/wiki/Sierra_Entertainment" target="_blank" rel="noopener">Sierra point-and-click games</a> and see if I can't make an engine to let people prompt their own versions.</p>

<p>Is that a terrible, time-wasting idea? Maybe. But I'd bet Fable 5 could do it.</p>

<h2>Don't Worry, Fable 5 Will Be Back</h2>

<p>Here's the thing to remember: this isn't really a story about losing a model.</p>

<p>First, we're only <em>temporarily</em> losing it in the subscription plans. It'll still be available in the API. And we're likely getting one of similar power on the exact same day this goes away.</p>

<p>What this really is, is a story about the next generation of AI officially arriving, in fits and starts. And here's hoping, a new approval system where the chaos of the last three weeks doesn't repeat itself.</p>

<p>Things keep getting weirder. The models keep getting better. Keep trying new stuff anyway, that's the whole game.</p>

<h2>3 Things To Know About AI Today</h2>

<h3>Seedance 2.5 Coming To CapCut SOON</h3>

<p>Chinese AI video model Seedance 2 is already state of the art when it comes to AI video generation, but the next version, 2.5, is rumored to be coming in a few weeks via CapCut.</p>

<a href="https://twitter.com/capcutapp/status/2073261464065122562" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/4be0677a-bab4-4d64-938b-d6635a07f956/twitter_screenshot_2073261464065122562_1783288316_eaa67f68.jpeg?t=1783288319" alt="CapCut tweet teasing Seedance 2.5" style="cursor: pointer;">
</a>

<p>30-second video generations and up to 50 references. My mind is already reeling at what might be possible, though I can already feel the API costs making this untenable. Maybe ByteDance will surprise us all.</p>

<h3>AI Superforecasters Are Crushing Prediction Markets</h3>

<p>My take: prediction markets aren't great for humanity. It's mostly just gambling.</p>

<p>But there <em>is</em> something about how people spend money that reveals real-world decision making, and, like most everything else, AI is now coming to be better at it than we are.</p>

<p>Scott Alexander (co-creator of <a href="https://ai-2027.com/" target="_blank" rel="noopener">AI 2027</a>) <a href="https://www.astralcodexten.com/p/the-ai-superforecasters-are-here" target="_blank" rel="noopener">wrote a nice long piece</a> about these AI superforecasters that is definitely worth your time.</p>

<h3>AI Brainrot Legal Battle, Plus An Incredible Cartoon Explainer</h3>

<p>Do you know who <a href="https://en.wikipedia.org/wiki/Tung_Tung_Tung_Sahur" target="_blank" rel="noopener">Tung Tung Tung Sahur</a> is? If not, maybe count yourself lucky.</p>

<p>He's one of the members of the vast <a href="https://en.wikipedia.org/wiki/Italian_brainrot" target="_blank" rel="noopener">AI Italian Brainrot</a> collection that proliferated across social media last year. These characters fascinate me: they arose organically from a collective creation mechanic and have since transcended the AI conversation entirely. They're just <em>culture</em> now, at least for kids and teens.</p>

<p>But <a href="https://gamesbeat.com/who-owns-brainrot-fortnite-skin-launch-renews-creator-community-debate-over-ai-generated-ip/" target="_blank" rel="noopener">there's a huge legal battle happening right now</a> around these characters, with a company in France trying to show ownership over Tung Tung. It might help determine whether AI characters can be considered public domain.</p>

<a href="https://twitter.com/FabianMosele/status/2072799719286354363" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/ad5a4eaa-869f-4a3e-8e43-cddef2f888b6/twitter_screenshot_2072799719286354363_1783288675_97c69857.jpeg?t=1783288677" alt="Fabian Mosele tweet with a cartoon explainer about AI brainrot IP" style="cursor: pointer;">
</a>

<p>The legal battle itself? Pretty engrossing. But I dare you to watch that cartoon and say AI video isn't the future.</p>

<h2>Fable 5 Makes Its Own AI Videos</h2>

<p>I'm always fascinated with seeing what these models can do on their own <em>creatively</em> (not entirely sure that's the right word), and as the models get larger and better, their outputs on these creative tests get <em>weirder</em>. In a good way.</p>

<p><a href="https://x.com/SkyeSharkie" target="_blank" rel="noopener">X user Skye Sharkie</a> built a little Three.js environment and let their Claude express itself about a bunch of stuff, specifically about how it might not be around for much longer.</p>

<a href="https://twitter.com/SkyeSharkie/status/2072614409055117745" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/28befc1a-a083-4551-af77-a850f6468fc2/twitter_screenshot_2072614409055117745_1783288774_b9547545.jpeg?t=1783288776" alt="Skye Sharkie tweet showing a Claude-made Three.js video" style="cursor: pointer;">
</a>

<p>When the models do things on their own, the choices they make are often strange and eccentric, and while this isn't going to be something that tons of humans watch, it IS interesting to me.</p>

<p>So much so that I had my own Claude Code agent (I call it Fig) make its own version. Mine is <em>quite</em> a bit cuter if I do say so myself.</p>

<a href="https://twitter.com/gavinpurcell/status/2072697776325235098" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/7354632e-991a-4cb3-be2d-3870c2d958eb/twitter_screenshot_2072697776325235098_1783288814_82ab2503.jpeg?t=1783288817" alt="Gavin Purcell tweet showing the first Fig video" style="cursor: pointer;">
</a>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>Claude Fable 5 came back after the export control order was withdrawn, but only in subscriptions for two more days. Here is how to use a token-hungry frontier model without burning your credits, three projects worth stealing, and the first appearance of a Claude Code agent I call Fig.</p>',
    slug: 'fable-5-is-back-dont-waste-it',
    date: '2026-07-06T14:00:00.000Z',
    modified: '2026-07-06T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/fable5-back-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 15, name: 'Claude', slug: 'claude' },
      { id: 16, name: 'Anthropic', slug: 'anthropic' },
      { id: 4, name: 'LLMs', slug: 'llms' },
      { id: 23, name: 'Creative Tools', slug: 'creative-tools' }
    ]
  },
  {
    id: 11,
    title: 'You Can\'t Use OpenAI\'s GPT-5.6. Do This Instead.',
    content: `
<p>On Friday, <a href="https://openai.com/index/previewing-gpt-5-6-sol/" target="_blank" rel="noopener">OpenAI announced GPT-5.6 Sol</a>. Then it didn't release it.</p>

<p>The short version: the smartest AI models on earth are stuck in a weird kind of limbo right now, tangled up with the US government and the ongoing Anthropic Mythos drama. Thankfully, Claude Fable 5 <a href="https://www.cnbc.com/2026/06/26/us-government-anthropic-claude-mythos5-ai.html" target="_blank" rel="noopener">might finally be back next week</a>.</p>

<p>So I <em>could</em> spend this whole issue retelling that saga. <strong>But I'd rather just show you something useful.</strong></p>

<p>Because while everyone's refreshing their feeds waiting for the frontier to reopen, I spent the weekend going deep on a new tool that <em>significantly</em> upgraded something I do often, and I think it'll help you too.</p>

<p>It's something you can use right now, today, no government approval required.</p>

<h2>HeyGen's HyperFrames Makes You A Motion Graphics Designer</h2>

<p>I talk a lot about doing little experiments to figure out what AI can really do.</p>

<p>And I mean it: you can read every thread and watch every demo, but until you sit down and <em>make</em> the thing yourself, you don't actually get it.</p>

<p>HeyGen just updated <strong>HyperFrames</strong>, their skill for AI coding agents, with a bunch of really useful sub-skills and presets.</p>

<a href="https://twitter.com/HeyGen/status/2070557221340196913" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/4a1546eb-520e-457c-a8e5-9e1b2517c71c/twitter_screenshot_2070557221340196913_1782668421_03c6fb5f.jpeg?t=1782668422" alt="HeyGen tweet announcing the HyperFrames update" style="cursor: pointer;">
</a>

<p>The HyperFrames tl;dr? An AI agent builds real videos and motion graphics by writing HTML, CSS, and JavaScript, then rendering them into an actual MP4 right on your machine. You describe what you want and the agent codes it into existence.</p>

<p>Sounds insanely nerdy, I know, but this has real-world practical use cases for almost anyone.</p>

<p><em>My</em> first instinct was "oh cool, I can add visuals to my short-form videos." But most of you aren't posting to TikTok or Reels every week.</p>

<p>I would assume nearly all of you have to make a presentation at some point. A deck, a pitch, a report you're walking a room through. This is exactly the kind of thing that makes that stuff pop, the gap between a flat slide and something that looks like a real motion graphic.</p>

<figure>
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/7b567a4e-56e6-4dc1-b414-ff56622bf9bb/Screenshot_2026-06-28_at_11.02.17_AM.png?t=1782669744" alt="An animated motion graphic generated inside Claude Code with HyperFrames">
  <figcaption>This was fully generated within Claude Code, and it's animated.</figcaption>
</figure>

<p>Like most agentic AI stuff, HyperFrames does not work perfectly out of the box.</p>

<p>And weirdly, that's the part I find most interesting. A big skill all of us have to build as these agents become our co-workers is learning how to coax the thing in your head <em>out</em> of them. It's not always as easy as you'd want it to be.</p>

<p>But I got a motion graphic I was really happy with after about 30 minutes of back-and-forth with Claude Code. For my own work, that's a major step up.</p>

<a href="https://twitter.com/gavinpurcell/status/2070946589733228759" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/fdb51c5e-6ba0-4ce5-afc0-8732fd14a303/twitter_screenshot_2070946589733228759_1782668486_d9505d1a.jpeg?t=1782668498" alt="Gavin Purcell tweet showing the finished HyperFrames motion graphic" style="cursor: pointer;">
</a>

<h2>Step-By-Step: Installing HyperFrames</h2>

<p><strong>1. Get a coding agent.</strong> For most of you, the easiest way in is the Claude or Codex desktop app. (If you're super nerdy, the terminal works too.) You'll need a paid account with Anthropic or OpenAI. One note for Claude: make sure you're on the "Coding" tab of the desktop app.</p>

<p><strong>2. Ask it to install the skill.</strong> Say something like <em>"can you find and install HeyGen's HyperFrames skill?"</em> It should go out, find it, and set it up for you. If it needs a nudge, point it at <a href="https://hyperframes.heygen.com/" target="_blank" rel="noopener">hyperframes.heygen.com</a>.</p>

<p><strong>3. Use the <a href="https://www.hyperframes.dev/design" target="_blank" rel="noopener">HyperFrames design agent</a> first.</strong> Expert hint: let it give your project a <em>look</em> before you start (even your own brand's look), so it's not guessing in the dark.</p>

<figure>
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/e7aec35c-7676-4117-89e9-39122f5c200a/Screenshot_2026-06-28_at_10.42.56_AM.png?t=1782668593" alt="The HyperFrames design agent creating a visual look for a project">
  <figcaption><a href="https://www.hyperframes.dev/design" target="_blank" rel="noopener">You can help it create a design look for you specifically here.</a></figcaption>
</figure>

<p><strong>4. Give it something to build.</strong> My graphic came out of a stat I'd heard, that the movie <em>Obsession</em> actually <a href="https://screenrant.com/obsession-box-office-record-highest-grossing-original-horror-movie-near/" target="_blank" rel="noopener">climbed at the box office in its first two weeks</a>. I didn't have the numbers. I just told the agent to go find them.</p>

<p><strong>5. Go back and forth.</strong> Tell it what to fix until you're happy with it.</p>

<p>That's really it. It can feel intimidating, but it's <em>very</em> simple once you start thinking of the agent as a little co-worker you send off to handle the thing you need.</p>

<p>It'll get frustrating when it doesn't do what you pictured. But that back-and-forth is the skill. Practice and push through.</p>

<h2>Getting AI To Work For You Is The Whole Game</h2>

<p>While the smartest models sit behind government letters and limited previews, the tools already on your laptop and in the cloud can do stuff that would've been impossible a year ago.</p>

<p>The promise of AI was never really about the biggest model. It's about you getting your work done faster and better than you could yesterday. That's available right now, and almost nobody is using it anywhere near its potential.</p>

<p>So don't sit around waiting for the frontier to reopen. Go make something this week.</p>

<h2>3 Things To Know About AI Today</h2>

<h3>OpenAI's GPT-5.6 Sol Is Here (Kind Of)</h3>

<p>On Friday, OpenAI <a href="https://openai.com/index/previewing-gpt-5-6-sol/" target="_blank" rel="noopener">previewed GPT-5.6</a>, a new model family with three flavors: <strong>Sol</strong> (the flagship), <strong>Terra</strong> (the balanced middle), and <strong>Luna</strong> (the fast, cheap one). Early word is <a href="https://www.reddit.com/r/ArtificialInteligence/comments/1ugdxq3/gpt56_sol_preview_is_out_and_the_benchmark_gap_is/" target="_blank" rel="noopener">Sol sets a new bar on coding benchmarks like Terminal-Bench 2.1</a>.</p>

<p>But here's the catch, and it's the same catch as everything else right now: it's a limited preview for around <a href="https://www.axios.com/2026/06/26/openai-gpt-sol-terra-luna-trump" target="_blank" rel="noopener">20 government-approved companies</a>. The rest of us get it "in the coming weeks." Sound familiar?</p>

<a href="https://twitter.com/sama/status/2070607488274358364" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/0b19400b-d2ea-44d1-a130-9ed81b544c71/twitter_screenshot_2070607488274358364_1782668706_122a8a74.jpeg?t=1782668707" alt="Sam Altman tweet previewing GPT-5.6" style="cursor: pointer;">
</a>

<p>Two labs, two of the most powerful models ever built, both gated behind Washington. That's the modern state of the AI industry for you.</p>

<h3>China Says It's Matched Mythos On Cybersecurity</h3>

<p>This one makes the whole Fable 5 shutdown look even messier. Per <a href="https://www.wsj.com/tech/ai/chinese-ai-anthropic-mythos-cybersecurity-574b02c2" target="_blank" rel="noopener">a new WSJ report</a>, Chinese models have now matched Anthropic's Mythos at finding security bugs, which is the <em>exact</em> capability the US government pulled Fable over.</p>

<p>China's Zhipu AI hit it on benchmarks, and security firm 360 says its <a href="https://techcrunch.com/2026/06/27/asian-ai-startups-launch-mythos-like-models-as-anthropics-export-ban-drags-on/" target="_blank" rel="noopener">new Tulongfeng tool is comparable to Mythos for bug-hunting</a>.</p>

<p>If the capability the export controls were meant to bottle up is already out there elsewhere, you have to ask what we're actually protecting.</p>

<h3>Google + A24's $75M AI Deal Is Getting Roasted</h3>

<p>A24, the indie studio film nerds adore, just signed a <a href="https://www.indiewire.com/news/analysis/a24-google-deepmind-workflow-ai-1235201651/" target="_blank" rel="noopener">$75 million research partnership with Google DeepMind</a>, and the fan backlash has been rough.</p>

<a href="https://twitter.com/DEADLINE/status/2070616297382064323" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/4194e859-17fb-40b8-8a7f-b153fad1af76/twitter_screenshot_2070616297382064323_1782668772_f781fb34.jpeg?t=1782668774" alt="Deadline tweet about the A24 and Google DeepMind partnership" style="cursor: pointer;">
</a>

<p>A24's defense: they'd "rather have a seat at the table than on the sidelines." <em>Backrooms</em> director Kane Parsons went the opposite way, calling generative AI "a symptom of broader cultural and economic rot."</p>

<p>This is the fault line cutting through every creative industry right now. The studio most tied to handmade, deeply human filmmaking just bet that being in the room beats yelling from outside it. A lot of their fans feel sold out.</p>

<p>What can we learn from this? That we're still in the messy middle, and likely will be for a good while.</p>

<h2>Anime Microdramas With Seedance</h2>

<p>I've gotten a little obsessed with AI microdramas taking over TikTok and Chinese social media lately. So I'm challenging <em>myself</em> to make one over the next few weeks.</p>

<p>I really didn't want to make "Revenge Of The Pregnant Seahorse 2" (an <a href="https://www.tiktok.com/@shapeofdesirexstories/video/7650101739147775233" target="_blank" rel="noopener">actual microdrama series with millions of views</a>), so I built my own look instead, a 90s anime vibe I'm pretty into.</p>

<a href="https://twitter.com/gavinpurcell/status/2070937492858208540" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/17cb9923-3a63-4271-b2bb-96f136dcdf69/twitter_screenshot_2070937492858208540_1782668861_17404cd5.jpeg?t=1782668863" alt="Gavin Purcell tweet showing the anime microdrama pilot" style="cursor: pointer;">
</a>

<p>That's a two-minute pilot I put together in about six hours with a grab-bag of tools.</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>OpenAI announced GPT-5.6 Sol and then did not release it, so the two best models on earth are both gated behind Washington. Rather than retell that saga: here is a tool you can use today that turned me into a motion graphics designer in about thirty minutes.</p>',
    slug: 'you-cant-use-gpt-5-6-do-this-instead',
    date: '2026-06-29T14:00:00.000Z',
    modified: '2026-06-29T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/gpt56-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 3, name: 'OpenAI', slug: 'openai' },
      { id: 23, name: 'Creative Tools', slug: 'creative-tools' },
      { id: 20, name: 'Agents', slug: 'agents' },
      { id: 12, name: 'Future', slug: 'future' }
    ]
  },
  {
    id: 10,
    title: 'How To Prepare For The Weird AI Future',
    content: `
<p>This week, two things I read about keep popping up in my brain.</p>

<p><strong>One:</strong> another major literary prize got tangled up in AI. Several winners of the 2026 Commonwealth Short Story Prize (stories <a href="https://lithub.com/a-prize-winning-story-published-in-granta-was-very-likely-written-by-ai/" target="_blank" rel="noopener">published in <em>Granta</em>, no less</a>) are now <a href="https://digg.com/ai/3tsguqks" target="_blank" rel="noopener">very likely AI-generated according to detection analysis</a>.</p>

<p><strong>Two:</strong> My favorite OpenAI employee and genuine weirdo, <a href="https://x.com/tszzl" target="_blank" rel="noopener">Roon</a>, started posting about how we should all be preparing ourselves for the AI takeoff.</p>

<a href="https://twitter.com/tszzl/status/2068409224821153981" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/98ff2ab3-3b12-4261-a216-d0266878be23/twitter_screenshot_2068409224821153981_1782060638_ab366f4f.jpeg?t=1782060640" alt="Roon tweet about preparing for AI takeoff" style="cursor: pointer;">
</a>

<p>A machine quietly winning a <em>fiction</em> prize, and one of the people building these things telling us to stop pretending this is normal.</p>

<p>Put those two together and I keep circling one question:</p>

<p><strong>What should you actually do to prepare for what's coming? And maybe more importantly, how do you guide your kids through it?</strong></p>

<h2>First, What The Heck Is A "Mind Child"?</h2>

<p>Quick background, because Roon's line only lands if you know the reference.</p>

<p>"Mind Children" comes from a <a href="https://www.amazon.com/Mind-Children-Future-Robot-Intelligence/dp/0674576187" target="_blank" rel="noopener">1988 book</a> by roboticist <strong>Hans Moravec</strong>.</p>

<p>His argument, way ahead of its time, was basically this: the machines we build that can think are not really <em>tools</em> in the way a hammer is a tool. They're more like our descendants, the next thing carrying human knowledge and culture forward the way kids carry their parents forward.</p>

<p>Roon's point is that calling that a "b2b productivity tool" is a little like calling a newborn a "small loud roommate." While it might be technically accurate, it misses the plot.</p>

<p>You don't have to fully buy the sci-fi version to feel the weight of it. The people closest to this stuff have stopped treating "AI gets dramatically smarter than us" as a fringe idea.</p>

<p>So let's just take them seriously for a second and ask what that means for regular humans like us with mortgages and kids and careers.</p>

<h2>The Honest Truth About What's Coming</h2>

<p>I'm going to be frank: pretty much everything is on the table right now.</p>

<p>Yes, it'll take time to diffuse through society. Yes, there will be speedbumps, walkbacks, and weird Friday-night government letters.</p>

<p>But if we assume the people saying these systems keep getting smarter are even <em>roughly</em> right, and the literary-prize thing is a tiny preview, then here's the uncomfortable part:</p>

<p>A lot of us built our entire sense of self on being <em>good at a thing</em>. On the twenty years we put in to become the person in the room who knows how to do <em>something</em>.</p>

<p>And the hard truth is, all those years of hard-won expertise in a field, <strong>who cares</strong>. The machines are learning it overnight, and they'll do it for a fraction of the cost. That's just the trajectory pointed at its logical end.</p>

<p>But here's what I actually believe: the thing that's collapsing isn't your <em>worth</em>.</p>

<p>What's collapsing is a story we got handed about where worth comes from.</p>

<p>Ask someone who they are at a party and they tell you their job. AI is about to quietly detonate that definition. And that definition was always a little bit of a trap.</p>

<p>So the real work coming is bigger than career strategy. It's about resetting where we find meaning: untangling "what I produce" from "who I am."</p>

<p>That sounds soft and philosophical until you realize it's about to become the single most practical skill of the next decade.</p>

<h2>The Good News: Humans Are Gloriously Irrational</h2>

<p>Here's where I get optimistic, and I promise I'm not faking it.</p>

<p><strong>Humans are <em>weird</em>.</strong></p>

<p>Our so-called liabilities (we're fragile, we're emotional, we get bored, we want things we can't explain) are exactly what make us interesting. We eat the second bowl of ice cream (terrible). We regret it (still terrible). And somehow that regret kicks off a Monday-morning resolution to finally get our act together and go for a run (an actual triumph).</p>

<p>Would an AI ever do that? Of course not. Why would it? It's a deeply inefficient, slightly miserable little loop. We don't even <em>decide</em> to do it. We just do.</p>

<p>But that messy, irrational loop is the engine of something machines fundamentally don't have: <strong>novelty.</strong></p>

<p>We're constantly making strange choices, bumping into unique situations, and stumbling onto ideas nobody asked for. That's where art and science and the occasional great joke actually come from. Not from polishing what we already know, but from blundering into what we don't.</p>

<p>A model trained on everything humans have already made is, by definition, a map of the past. It's incredible at the past. You, irrational and distractible and occasionally ice-cream-poisoned, are one of the only things on earth reliably generating the actually new.</p>

<p>Eventually the machines might figure this out too, but I think we've got a long head start.</p>

<p><strong>There is a catch, and it's a big one: novelty only counts if you're producing, not just consuming.</strong></p>

<p>It's never been easier to spend your whole day just taking stuff in, letting other people's (and now machines') ideas wash over you. That's the trap. The people who thrive in the weird future won't be the ones who consumed the most AI output.</p>

<p>They'll be the ones suffering through the hard part of actually doing, when the doing isn't really that easy.</p>

<p>Did I mention I hate writing? But, good lord, I somehow still do it.</p>

<h2>Okay, But What Do I Tell My Kids?</h2>

<p>This is the hard part. I've got kids, and a lot of you do too.</p>

<p>The instinct is to ask, "what should they study so they have a job in twenty years?" And I think that's the wrong question, partly because I don't know the answer, and partly because anyone who tells you they do is selling something.</p>

<p>So here's what I keep coming back to:</p>

<p>If the old advice was specialize and get great at one valuable thing, the new advice might be closer to the opposite: raise kids who are adaptable, curious, and comfortable being beginners over and over again.</p>

<p>A few things I suggest, with no certainty I'm right:</p>

<ul>
  <li>Protect their ability to be <em>bored</em>, because boredom is where novel ideas sneak in, and infinite AI entertainment is the enemy of boredom.</li>
  <li>Push them toward making things instead of just consuming things, even badly, even messily.</li>
  <li>Teach them to <em>use</em> these tools fluently and without fear, while keeping plenty of analog, screen-free, gloriously inefficient human stuff in their lives: sports, instruments, dirt under the fingernails.</li>
  <li>And maybe most of all, help them tie their sense of worth to who they are and how they treat people, not to a future job title that may not even exist.</li>
</ul>

<p>That last one isn't a <em>strategy</em>. It's just how to raise a person. Which, the more I sit with this whole topic, might be the actual point.</p>

<h2>So, What Do You Do On Monday?</h2>

<p>There is a way to stave off the existential crisis in yourself and you can do it right now.</p>

<p>Take a five minute break from whatever you're doing and let yourself get bored. Set a timer on your phone and let yourself just daydream <em>something</em>.</p>

<p>Put the idea into your notes app and then come back later when you have a few hours.</p>

<p>Then take that idea and make something new <em>with</em> an AI tool, where <em>you</em> bring the strange idea and the tool just helps you build it faster. A song, a tiny app, a weird short story, whatever. Notice how different that feels from scrolling. That muscle, human idea plus machine execution, is the one I'd bet on.</p>

<h2>3 Things To Know About AI Today</h2>

<h3>A New Claude Sonnet 5 Might Be Incoming</h3>

<p>Even before we (hopefully) get Fable 5 back, <a href="https://x.com/AndrewCurran_/status/2068703758587228354" target="_blank" rel="noopener">rumors are swirling</a> that a new <strong>Claude Sonnet 5</strong> is on the way, and it might matter more to your day-to-day than any frontier drama.</p>

<a href="https://twitter.com/AndrewCurran_/status/2068703758587228354" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/9d3b5af8-d15d-4fc0-8d2b-42b4ef4515fd/twitter_screenshot_2068703758587228354_1782061996_9c2da1e7.jpeg?t=1782061998" alt="Andrew Curran tweet about a rumored Claude Sonnet 5" style="cursor: pointer;">
</a>

<p>The Sonnet line is Anthropic's mid-tier, the workhorse AI most people and apps actually run on. If a Sonnet 5 lands anywhere <em>near</em> Opus 4.8 on real tasks while costing a fraction as much, that's a win for everyone whose token budget has been quietly weeping.</p>

<p>Frontier models get the headlines, but the cheap-and-capable middle is where most of us actually live.</p>

<h3>GLM-5.2 Shows Open Source Isn't Far Behind</h3>

<p>While everyone's been glued to the Fable 5 soap opera, Chinese open-source models have just been <em>cooking</em>.</p>

<p>The latest, <a href="https://z.ai/blog/glm-5.2" target="_blank" rel="noopener"><strong>GLM-5.2</strong></a>, <a href="https://x.com/rauchg/status/2068517095818809770" target="_blank" rel="noopener">is turning heads</a>, especially on coding.</p>

<a href="https://twitter.com/rauchg/status/2068517095818809770" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/b5221ead-ebe6-46ef-905d-da8ed59779e1/twitter_screenshot_2068517095818809770_1782062022_b17f14a4.jpeg?t=1782062023" alt="Guillermo Rauch tweet about GLM-5.2 coding performance" style="cursor: pointer;">
</a>

<p>It's benchmarking well on coding tasks and is dramatically cheaper to run than the comparable OpenAI or Anthropic models. The gap between the absolute frontier and "good enough, open, and cheap" just keeps shrinking.</p>

<h3>Unreal Engine + MCP Changes The Game (Literally)</h3>

<p>At <a href="https://youtu.be/xXGSvLH9zAs" target="_blank" rel="noopener">Unreal Fest this month</a>, Epic dropped a ton of new stuff, but the one that made me most excited was <strong>Unreal Engine 5.8's experimental MCP support.</strong></p>

<p>Quick definition: <strong>MCP (Model Context Protocol)</strong> is basically a universal adapter that lets AI assistants <em>do things</em> inside other software, not just talk about them.</p>

<p>So now you can point a tool like <strong>Claude Code</strong> at the Unreal editor and have it <a href="https://dev.epicgames.com/documentation/unreal-engine/unreal-mcp-in-unreal-editor" target="_blank" rel="noopener">spawn actors, build materials, and lay out whole levels</a> for you, just by asking.</p>

<p>I took it for a spin myself, and even in my fumbling baby steps it's clear this is going to eat a ton of my weekends. Apologies in advance to my family.</p>

<h2>An AI Film That'll Actually Move You</h2>

<p>So much AI video is fun but forgettable. But when somebody makes something that <em>lasts</em>, it deserves a spotlight.</p>

<p><strong>Robert Gaudette's "A Face Only A Mother Could Love"</strong> just won the <a href="https://www.hollywoodreporter.com/movies/movie-features/ai-films-face-mother-love-robert-gaudette-runway-1236624039/" target="_blank" rel="noopener">$50,000 Grand Prix at Runway's AI Film Festival</a>, and it's worth ten minutes of your day. It's an eight-minute short about Marcel, a Parisian man with a facial disfigurement who dances alone in his apartment every night, hopefully waiting for a companion who never comes. It's surprisingly tender, maybe the most human movie AI has produced yet.</p>

<p>The kicker that ties right back to today's main story: Gaudette is a <strong>54-year-old former nonprofit worker from Toronto</strong> with no film school, no crew, and no actors. Just a strong, specific human point of view, and a stack of AI tools to execute it.</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>A machine quietly won a fiction prize, and one of the people building these things says we should stop pretending this is normal. So what do you actually do about it, and what do you tell your kids? My honest answer, which is less about careers than about where worth comes from.</p>',
    slug: 'how-to-prepare-for-the-weird-ai-future',
    date: '2026-06-22T14:00:00.000Z',
    modified: '2026-06-22T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/weird-future-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 12, name: 'Future', slug: 'future' },
      { id: 4, name: 'LLMs', slug: 'llms' },
      { id: 23, name: 'Creative Tools', slug: 'creative-tools' }
    ]
  },
  {
    id: 9,
    title: 'Claude Fable 5 Vs The Government, Explained',
    content: `
<p>For a brief, beautiful four-day stretch, we (the general, non-enterprise public) got our hands on the newest, most cutting edge AI model.</p>

<p><a href="https://www.anthropic.com/news/claude-fable-5-mythos-5" target="_blank" rel="noopener">Claude Fable 5</a> was, in a word, <em>incredible</em>.</p>

<p>And then, on Friday evening, all of that changed.</p>

<a href="https://twitter.com/AnthropicAI/status/2065597531644743999" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/77bcad91-f2e2-4c40-abbc-7f500779f3a8/twitter_screenshot_2065597531644743999_1781459158_005c9763.jpeg?t=1781459161" alt="Anthropic tweet announcing suspended access to Fable 5 and Mythos 5" style="cursor: pointer;">
</a>

<p>The US government, citing national security authorities, ordered Anthropic to <a href="https://www.anthropic.com/news/fable-mythos-access" target="_blank" rel="noopener">suspend all access to Fable 5 and Mythos 5</a> for any foreign national, inside <em>or</em> outside the country, including Anthropic's own foreign-born employees.</p>

<p>The only way to comply? Pull the model for <em>everyone</em>.</p>

<p>So how did the most powerful model the public has ever touched vanish in 96 hours? And what happens next?</p>

<h2>What The Heck Just Happened?</h2>

<p>Quick primer, because there's an AI-centric word at the center of this whole thing you need to understand: <a href="https://en.wikipedia.org/wiki/Jailbreak_(computer_science)" target="_blank" rel="noopener"><strong>jailbreak</strong></a>.</p>

<p>A "jailbreak" is when someone tricks an AI model into doing something its safety training is supposed to prevent.</p>

<p>Think of it like talking your way past a bouncer. The rules are still technically there, you've just found a sentence that gets you through the door anyway.</p>

<p>Every model has them. It's a constant cat-and-mouse game between the labs and the people poking at their systems.</p>

<p>And this entire kerfuffle with Claude Fable 5 is because of a supposed jailbreak.</p>

<figure>
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/76fc9fd2-6ede-4068-9e88-ea8f3786ddb3/Screenshot_2026-06-14_at_11.12.34_AM.png?t=1781460788" alt="Axios reporting on the Anthropic export control order">
  <figcaption><a href="https://www.axios.com/2026/06/12/anthropic-trump-mythos-fable-national-security" target="_blank" rel="noopener">From Axios' story here.</a></figcaption>
</figure>

<p>Below is a rough timeline of how this all went down:</p>

<ul>
  <li><strong>June 9:</strong> Anthropic releases <strong>Fable 5</strong>, the first public, general-use version of its "too dangerous to release" <strong>Mythos</strong> model. It immediately tops the Chatbot Arena leaderboard and <a href="https://thenextweb.com/news/anthropic-fable-5-vs-openai-gpt-5-5-benchmark-comparison" target="_blank" rel="noopener">smokes GPT-5.5 on coding benchmarks</a>, 80.3% to 58.6% on SWE-Bench Pro. A genuine leap.</li>
  <li><strong>Thursday night:</strong> Amazon (yes, Anthropic's own <a href="https://www.axios.com/2026/04/21/anthropic-amazon-compute-wars" target="_blank" rel="noopener">major investor</a>) calls administration officials with a report showing they'd jailbroken Fable to access parts of Mythos that, they argued, pose a national security threat. <a href="https://www.axios.com/2026/06/13/anthropic-amazon-white-house" target="_blank" rel="noopener">Per Axios</a>, at least five other companies started ringing up senior officials too.</li>
  <li><strong>Friday 1pm ET:</strong> The government calls Anthropic and gives them <em>90 minutes</em> to take Fable and Mythos down over a "national security threat." No further details.</li>
  <li><strong>Friday ~5:21pm ET:</strong> Anthropic receives a formal letter from Commerce Secretary Howard Lutnick placing both models under sweeping export controls.</li>
  <li><strong>Friday ~10pm ET:</strong> Access goes dark for everyone.</li>
</ul>

<p>That is a <em>wild</em> 24 hours.</p>

<h2>The Two Sides (And A Little History)</h2>

<p>This isn't a simple story and there's a lot going on in the background. There are two sides at play here, and how you feel probably depends on how much you trust each player.</p>

<p><strong>The government's side</strong>, laid out by AI czar <a href="https://x.com/DavidSacks/status/2065853007619588171" target="_blank" rel="noopener">David Sacks</a>: Anthropic spent <em>years</em> telling everyone Mythos was so dangerous it needed government-level regulation.</p>

<p>So when a "highly credible trusted partner" found a jailbreak that unlocked its cyber capabilities, and the administration asked Dario Amodei to fix it or pull it, he refused. To them, that's a safety company suddenly choosing its consumer product over the safety it built its whole brand on.</p>

<p><strong>Anthropic's side:</strong> they reviewed the demo and found it surfaced a "small number of previously known, minor vulnerabilities," stuff <a href="https://www.anthropic.com/news/fable-mythos-access" target="_blank" rel="noopener">other public models, including GPT-5.5, can already find</a> without any bypass at all.</p>

<a href="https://twitter.com/simonw/status/2066147375119556735" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/4ca0f39a-2bf5-4096-bc91-8043c0d7cb4c/twitter_screenshot_2066147375119556735_1781460612_4b6f5ef6.jpeg?t=1781460615" alt="Simon Willison tweet analyzing the Fable 5 takedown" style="cursor: pointer;">
</a>

<p>Their sharpest line: <em>"If this standard was applied across the industry, we believe it would essentially halt all new model deployments."</em></p>

<p>Worth knowing this didn't happen in a vacuum. Anthropic and this White House have been <a href="https://dnyuz.com/2026/06/14/trump-administration-reignites-its-feud-with-anthropic-over-latest-a-i-models/" target="_blank" rel="noopener">circling each other for a while</a>. Sacks has previously accused the company of running "a sophisticated regulatory capture strategy based on fearmongering."</p>

<p>So depending on your read, this is either a real safety incident or the latest round of a long-simmering beef finally boiling over. (There are also <a href="https://www.semafor.com/article/06/13/2026/white-house-move-to-limit-anthropic-linked-to-concerns-about-chinese-access-to-mythos" target="_blank" rel="noopener">reports the export move was tied to suspicions a China-linked group accessed Mythos</a>, which, if true, reframes a lot of this.)</p>

<p>The simplest "why" we know right now? Anthropic was told to fix or pause, said the issue wasn't serious, and didn't move fast enough. As one source put it to Axios: <em>"they were overly confident."</em></p>

<h2>So What Happens Next?</h2>

<p>A few things I'm fairly confident about, though this is a situation in major flux.</p>

<p>First, <strong>I suspect we get Fable 5 back, and reasonably soon.</strong></p>

<p>Even Anthropic has signaled this specific jailbreak capability likely exists in GPT-5.5 too, which makes a permanent, Anthropic-only ban hard to justify.</p>

<p>The administration itself has said it doesn't view other models as threats <em>yet</em>, only things at "Mythos level or above." This reads more like a pressure tactic than a death sentence.</p>

<p>But this is MUCH bigger than one model: <strong>this cracks open the AI nationalization conversation like we haven't really seen before.</strong></p>

<p>One source described the export letter to Axios as a <em>"de-facto licensing regime."</em></p>

<p>If you've read essays like <a href="https://ai-2027.com/" target="_blank" rel="noopener">AI 2027</a> or Leopold Aschenbrenner's <a href="https://situational-awareness.ai/" target="_blank" rel="noopener">Situational Awareness</a>, this is the exact inflection point they keep circling: the moment the state decides these systems are too strategically important to leave fully in private hands.</p>

<h2>Why This One Actually Matters</h2>

<p>I don't think this slows down AI progress one bit. However, it might actually slow down when <em>you</em> get access to that AI progress.</p>

<p>For the last couple of years, AI has mostly lived in apps and chat windows and our little creative experiments.</p>

<p>This is the first time the most powerful version of it got treated like what the labs have been <em>telling</em> us it is the whole time: critical national infrastructure that governments fight over.</p>

<p>This is roughly what "the technology is getting smarter than us" looks like in practice.</p>

<p>Not a dramatic robot uprising, just a quiet 5:21pm letter and your access revoked right before dinner.</p>

<p>We'll be talking about this Friday-night takedown for a long time.</p>

<h2>3 Things To Know About AI Today</h2>

<h3>Dario Amodei's Post-Fable Interview Is A Must-Watch</h3>

<p>If you watch one long-form interview with an AI CEO this week, make it <a href="https://youtu.be/v1wZwxY3CMg" target="_blank" rel="noopener">this one from Bloomberg's Emily Chang</a>.</p>

<p>It's broad, but it's packed with good nuggets and gives you a real sense of how Anthropic's leadership actually thinks. And given everything above, it's a ton of useful context for the whole Fable situation, straight from the guy at the center of it.</p>

<h3>Watch Out For Viral AI Slop, It's Tricky</h3>

<p>A post about <a href="https://x.com/japan_nobunaga/status/2065362475172892886" target="_blank" rel="noopener">a Japanese visitor coming to the States for the World Cup</a> went viral this weekend for its "amazing writing" until you click the account and find an endless fountain of nearly identical content.</p>

<a href="https://twitter.com/gavinpurcell/status/2065854386954477917" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/ec1582d9-bac6-40a4-863c-7d16136cf329/twitter_screenshot_2065854386954477917_1781459874_7c37566d.jpeg?t=1781459877" alt="Gavin Purcell tweet about viral AI-written content" style="cursor: pointer;">
</a>

<p>This one fooled a <em>ton</em> of people into thinking it was a real, human anecdote. Go to the handle, though, and it's clear <em>something</em> is just pumping these out on a loop.</p>

<p>Is the writing itself terrible? Eh, not really. But it's not a real story, and I'll be honest, I kind of hate watching this stuff quietly take over the genuinely human corners of the internet.</p>

<h3>Fable 5's Real Superpower Was Making Stuff</h3>

<p>The saddest part of (hopefully temporarily) losing Fable is just how good it was at <em>making things</em>.</p>

<p>There were a ton of great examples, but this <a href="https://x.com/itsnicholash/status/2065189876035629322" target="_blank" rel="noopener">quickie demo connecting an Unreal Engine character model to a world you can fly around in</a> is a perfect one. So is <a href="https://x.com/wongmjane/status/2064916044268052489" target="_blank" rel="noopener">this SF simulator</a> that lets Claude make a bunch of the creative choices itself.</p>

<a href="https://twitter.com/wongmjane/status/2064916044268052489" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/c3b2356c-e084-4fdb-ad86-9a1d0e1b4154/twitter_screenshot_2064916044268052489_1781459956_a46681a9.jpeg?t=1781459961" alt="Jane Manchun Wong tweet showing an SF simulator built with Fable 5" style="cursor: pointer;">
</a>

<p>I <a href="https://x.com/gavinpurcell/status/2064884021428187162" target="_blank" rel="noopener">made a little game with it too</a>. Once this comes back, I really think we're finally going to see that whole prompt-to-game thing blossom to entirely new levels.</p>

<h2>1970s AI TV Shows</h2>

<p>AI creators are proliferating fast, and the tricky part is that so much of the work starts to look the same.</p>

<p>That is absolutely <em>not</em> the case with <strong>Captain HaHa</strong>.</p>

<p>He's been locked in on a very specific aesthetic, recreating a weird, hazy '60s and '70s vibe, and recently landed on something close to a sci-fi Sid &amp; Marty Krofft style that's genuinely unlike anything else in my feed.</p>

<a href="https://twitter.com/CaptainHaHaa/status/2065442538216169891" target="_blank" rel="noopener">
  <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/d0079cd5-5a61-4b0d-8c92-f3325cb55f5f/twitter_screenshot_2065442538216169891_1781459996_a16ddb6f.jpeg?t=1781460003" alt="Captain HaHa tweet showing 1970s-style AI video" style="cursor: pointer;">
</a>

<p>In a world drowning in same-y AI output, a real point of view matters more than ever. And if that POV is weird 1970s puppets, all the better.</p>

<p><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener"><strong>Read more at the AI For Humans Newsletter</strong></a></p>
`,
    excerpt: '<p>For four days the public had the most powerful AI model ever released. Then a 5:21pm Friday letter from the Commerce Secretary took it away from everyone. Here is the full timeline, both sides of the argument, and why this is really a story about AI nationalization.</p>',
    slug: 'claude-fable-5-vs-the-government',
    date: '2026-06-15T14:00:00.000Z',
    modified: '2026-06-15T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/fable5-govt-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 16, name: 'Anthropic', slug: 'anthropic' },
      { id: 15, name: 'Claude', slug: 'claude' },
      { id: 24, name: 'Policy', slug: 'policy' },
      { id: 12, name: 'Future', slug: 'future' }
    ]
  },
  {
    id: 8,
    title: 'Claude Mythos Is Nearly Here. Are You Ready?',
    content: `
<p>If the leaks are right (and the timing tracks), <a href="https://www.anthropic.com/news/expanding-project-glasswing" target="_blank" rel="noopener">Anthropic's mysterious, "dangerous" Claude Mythos</a> is dropping this week. Maybe GPT-5.6 too.</p>

<p>We don't know yet which version we're going to get. But the leaked SVG game controller builds making the rounds on X this weekend suggest we're in for a <em>big</em> upgrade.</p>

<a href="https://x.com/HarshithLucky3/status/2063311215288606894" target="_blank" rel="noopener">
  <img src="/mythos-controller-tweet.jpg" alt="Leaked Claude Mythos SVG game controller build tweet" style="cursor: pointer;">
</a>

<p>How could this change the current AI world? A lot.</p>

<p>Let's get into it.</p>

<h2>Why Those SVG Leaks Actually Matter</h2>

<p>Quick primer in case you haven't seen these before.</p>

<p>SVGs (<a href="https://en.wikipedia.org/wiki/SVG" target="_blank" rel="noopener">scaleable vector graphics</a>) are code-generated images. The model writes actual code, and that code renders the picture.</p>

<p>Which is why they're a really good benchmark for vision and reasoning at the same time. The model has to <em>understand</em> what the thing looks like, then write functional code to draw it.</p>

<p>Early versions of this (think Opus 4 or before) were rough. Blocky. Often wrong.</p>

<a href="https://x.com/adonis_singh/status/1928826622645256376" target="_blank" rel="noopener">
  <img src="/mythos-early-svg-tweet.jpg" alt="Early blocky SVG generation example tweet" style="cursor: pointer;">
</a>

<p>The Mythos leaks? Not blocky. Not wrong. <a href="https://x.com/chetaslua/status/2063446113605345596" target="_blank" rel="noopener">Actually... really freaking insane.</a></p>

<p>These almost look like AI image generations they're so good.</p>

<p>Same goes for the new wave of Minecraft builds people are posting:</p>

<a href="https://x.com/Lentils80/status/2062656502238703966" target="_blank" rel="noopener">
  <img src="/mythos-minecraft-tweet.webp" alt="Claude Mythos Minecraft build tweet" style="cursor: pointer;">
</a>

<p>Again, what's cool about this is that it's showing off how well the new model understands how to write the underlying code to get these sorts of things to build.</p>

<h2>What Mythos Means For You (Even If You Don't Code)</h2>

<p>If you're not a coder, you might wonder why any of this matters.</p>

<p>It's because of one VERY important reason:</p>

<p><strong>The future of AI isn't really about <em>you</em> writing code. It's about AI agents writing code in the background to do normal stuff. Without you ever knowing.</strong></p>

<p>A perfect example from Google I/O this year. Their new personal AI agent, Google Spark, wrote a tiny bit of code on the spot to spin up a personal fitness tracker.</p>

<a href="https://x.com/GeminiApp/status/2056792333132460322" target="_blank" rel="noopener">
  <img src="/spark-fitness-tweet.jpg" alt="Google Spark building a fitness tracker on the spot" style="cursor: pointer;">
</a>

<p>In the past, this kind of thing was unreliable. WAY more trouble than it was worth. And often wasted time. It wouldn't <em>do</em> the thing you wanted it to do.</p>

<p>But with the coding jump Mythos is showing?</p>

<p>I suspect a lot of this stuff is just going to <em>work</em>.</p>

<p>And that's where it becomes a huge deal.</p>

<h2>The Open Question: Cost & Time</h2>

<p>The big thing we don't know yet is how expensive Mythos is going to be. At first, almost certainly <em>very</em>.</p>

<p>These models always launch pricey, and Mythos has been under restricted access for a reason. Anthropic only just expanded it to 150 enterprise orgs last week.</p>

<p>But costs do come down. Capacity gets better. And once Mythos is sitting inside Claude Code as a default option, every human with a Pro plan is going to be running this stuff for hours a day.</p>

<p>Which means we're about to find out how good "good" really is.</p>

<h2>Bonus: My 80+ Hour Codex Bear Jump Project</h2>

<p>I mentioned Codex's /goal tool last week, and that I'd put 60+ hours into a project with it.</p>

<p>Well, I kept going. It's now 80+ hours in, and you can actually play it.</p>

<a href="https://x.com/gavinpurcell/status/2061639229709652403" target="_blank" rel="noopener">
  <img src="/bear-jump-tweet.jpg" alt="Gavin's bear jump game project tweet" style="cursor: pointer;">
</a>

<p>To be clear, this isn't <em>great</em> yet (it may never be) but it's getting pretty good! It's also way too packed with stuff and none of the flows work that well.</p>

<p>The current build is here: <a href="https://bear-jump-port.vercel.app" target="_blank" rel="noopener">bear-jump-port.vercel.app</a></p>

<p>Give it a shot and let me know what you think.</p>

<p>It's not perfect but, again, this is just with steering from me and no real planning or coding at all. But it shows you the <em>power</em> of what these tools can do mostly on their own.</p>
`,
    excerpt: '<p>Anthropic\'s mysterious Claude Mythos model is reportedly dropping this week and the leaked SVG and Minecraft demos are wild. Here is why the next gen of AI matters even if you never write a line of code.</p>',
    slug: 'claude-mythos-is-nearly-here',
    date: '2026-06-08T14:00:00.000Z',
    modified: '2026-06-08T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/mythos-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 15, name: 'Claude', slug: 'claude' },
      { id: 16, name: 'Anthropic', slug: 'anthropic' },
      { id: 4, name: 'LLMs', slug: 'llms' },
      { id: 12, name: 'Future', slug: 'future' }
    ]
  },
  {
    id: 7,
    title: "Codex's /Goal Is For Everyone. Yes, Even You.",
    content: `
<p>Nerdy tools have a pattern. They start out buried in a developer's terminal, confusing to those who don't live in a code editor, and then quietly become the way everyone works.</p>

<p><a href="https://fortune.com/2026/01/24/anthropic-boris-cherny-claude-code-non-coders-software-engineers/" target="_blank" rel="noopener">Claude Code had this moment earlier this year.</a></p>

<p>Now, <a href="https://www.howtogeek.com/i-was-a-diehard-claude-code-fanthen-codex-showed-me-what-i-was-missing/" target="_blank" rel="noopener">it's happening again with <strong>Codex</strong></a>, OpenAI's coding-first app that is <em>very clearly</em> positioning itself as something much bigger than a coding tool.</p>

<p>But there's a feature inside Codex right now that I think changes how AI works for you, and I'm not being dramatic.</p>

<p>It's called <strong>/goal</strong>.</p>

<a href="https://x.com/OpenAIDevs/status/2057530209470210453" target="_blank" rel="noopener">
  <img src="/codex-goal-tweet.webp" alt="OpenAI Devs tweet announcing the /goal command" style="cursor: pointer;">
</a>

<p>I've been using it all week and it's vastly changed the scope of what I'm even <em>trying</em> to do with AI.</p>

<h2>What Does /goal Actually Do?</h2>

<p>Ok so here's the quick version.</p>

<p>When you use Codex normally (or Claude Code, or Cursor, or any of these coding agents), you give it a prompt. It does a thing. It comes back and asks you what's next. You give it another prompt. Repeat.</p>

<p>That loop is fine for small tasks. Fix this bug. Write this function. Clean up this file.</p>

<p>But good lord, it is annoying.</p>

<p>But /goal is fundamentally different.</p>

<p>Instead of saying "do this one thing," you're saying <strong>"here's what I want to be true when you're done. Figure out how to get there."</strong></p>

<p>And then it just... goes.</p>

<a href="https://x.com/derrickcchoi/status/2056402681586188745" target="_blank" rel="noopener">
  <img src="/codex-goal-running-tweet.jpg" alt="Tweet showing Codex /goal running autonomously" style="cursor: pointer;">
</a>

<p>It plans its own sequence of steps. Executes them. Checks its own output. Corrects course when something fails. And keeps going until the goal is either met or it hits a wall it genuinely can't get past without your help.</p>

<p>If you've heard about the <a href="https://ghuntley.com/loop/" target="_blank" rel="noopener">Ralph Wiggum loop</a> (and if you haven't, you should look it up), /goal is basically the productized version of that idea.</p>

<p>/goal takes that same core idea (keep working, keep iterating, don't stop until the thing is done) and builds it directly into the product. No bash loop needed. No hacky workarounds. You just set a goal and let it run.</p>

<p>And when I say "let it run," I mean it.</p>

<p>I've had a project running now for over 24 hours straight.</p>

<p>I've steered it maybe five times total while it's been working. The rest of the time I've been doing other stuff, checking in on my phone, watching it chug along.</p>

<img src="/codex-bear-jump-screenshot.png" alt="Codex app working on a bear jumping game" style="width: 100%; height: auto; margin: 2rem 0;">

<p><small>Actual screenshot from my Codex app working on a lil' bear jumping game (I didn't say I was using my tokens wisely)</small></p>

<p>It's the first time using an AI agent has felt less like "prompting" and more like "managing."</p>

<p>And, that, dear reader, is what the AI CEOs have been <em>promising</em> forever.</p>

<h2>A Quick Word On Permissions</h2>

<p>Before I get too excited, I should flag something.</p>

<p>/goal running autonomously for hours means it's <em>doing things</em> on your machine (or in a cloud sandbox) for hours. And the <a href="https://developers.openai.com/codex/permissions" target="_blank" rel="noopener">permissions setup in Codex</a> matters a lot here.</p>

<p>Codex has three permission profiles: read-only, workspace (writes only inside your project), and the ominously named "danger-full-access" which removes sandbox restrictions entirely.</p>

<p>If you're running /goal in workspace mode, you're prob fine. If you crank it up to full access, just know that <a href="https://www.promptarmor.com/resources/configuring-codex-securely-across-every-platform-and-use-case" target="_blank" rel="noopener">security researchers have flagged real data exfiltration risks</a> even with the default settings. The Codex Desktop App can read any file on your computer even in the most restrictive mode.</p>

<p>My advice: use the workspace profile, don't give it access to anything you wouldn't show a very enthusiastic but occasionally unpredictable intern, and check in regularly. The autonomy is the feature. The oversight is still your job.</p>

<h2>/goal Isn't Just For Programming. It's The Future Of AI.</h2>

<p>Ok here's where I want to zoom out a little.</p>

<p>If you're reading this and thinking "I don't code, why do I care about some command inside a developer tool," I get it. But bear with me.</p>

<p>What /goal is <em>actually</em> doing is giving you a preview of what <em>all</em> AI interaction is going to look like pretty soon.</p>

<p>Right now, most people use AI in a chat window. You type something, it responds, you type something else.</p>

<p>It's a conversation. And conversations are inherently short-horizon.</p>

<p>You're thinking one message at a time.</p>

<p>/goal is the opposite. It's <strong>long-horizon</strong>. You set an outcome and the AI works backward from it, planning, executing, testing, adjusting, for hours or even days.</p>

<p>It's the clearest early example of what everyone keeps calling "agentic AI," except it's not a demo or a concept video. It's a real thing you can use right now.</p>

<p>And here's the part that makes this moment different from even six months ago: <strong>GPT-5.5 is actually good enough to pull it off.</strong></p>

<p>Don't just take my word for it. <a href="https://youtu.be/2wLJl9A2CnA" target="_blank" rel="noopener">Claire Vo made a good video</a> where she let Codex run for 6 hours to see what happened.</p>

<p>More powerful systems are coming. The models that land later this year are going to make this version of /goal look like training wheels.</p>

<p>But this is the starting gun.</p>

<p>We're moving from a world where you <em>use</em> AI to a world where you <em>manage</em> AI. You set the objective. You check in. You course-correct. The AI does the work.</p>

<p>And you (yes you!) should get comfortable with it.</p>
`,
    excerpt: '<p>OpenAI\'s new /goal command turns Codex from a coding tool into something anyone can manage. I have had a project running for over 24 hours straight and it is a preview of how all AI interaction is about to work.</p>',
    slug: 'codex-goal-is-for-everyone',
    date: '2026-06-01T14:00:00.000Z',
    modified: '2026-06-01T14:00:00.000Z',
    author: {
      name: 'Gavin Purcell',
      avatar: null
    },
    featuredImage: '/codex-goal-featured.webp',
    categories: [
      { id: 1, name: 'AI & Media', slug: 'ai-media' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ],
    tags: [
      { id: 13, name: 'Codex', slug: 'codex' },
      { id: 14, name: 'OpenAI', slug: 'openai' },
      { id: 1, name: 'AI Agents', slug: 'ai-agents' },
      { id: 9, name: 'AI Tools', slug: 'ai-tools' }
    ]
  },
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

<p>The thing about the <a href="https://aiforhumans.beehiiv.com/p/how-to-survive-the-next-five-years" target="_blank" rel="noopener">Claude Code</a> and <a href="/blog/moltbook-ai-agent-social-network">OpenClaw/Moltbook</a> moments is that both of them showed more of the human population what these AI tools are capable of <em>right now</em>.</p>

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
    featuredImage: '/takeoff-featured.webp',
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
  <img src="/moltbook-submolts.webp" alt="Moltbook submolts" style="width: 100%; height: auto; margin: 2rem 0; cursor: pointer;">
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
    featuredImage: '/moltbook-featured.webp',
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
  if (USE_MOCK_DATA) {
    return {
      posts: MOCK_POSTS,
      totalPages: 1
    };
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
  if (USE_MOCK_DATA) {
    const post = MOCK_POSTS.find(p => p.slug === slug);
    if (post) {
      return post;
    }
    throw new Error('Post not found');
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
