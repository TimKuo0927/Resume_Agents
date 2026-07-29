import 'dotenv/config';
import { GeminiClient } from "./ai/GeminiClient.js";
import { JobAnalyzerAgent } from "./agents/JobAnalyzerAgent.js";


async function main() {
    const ai = new GeminiClient();
    const jobAnalyzer = new JobAnalyzerAgent(ai);

    const jobDescription = `
    About Us We're a founding team building the next generation of AI-powered voice agents in the healthcare space. We're at the earliest stages, moving fast, and looking for engineers who want to build the foundational infrastructure and team that will scale with us.

The Role As a Founding Software Engineer, you'll build and own the core systems that power our voice agent platform. You'll work directly with the founding team to architect reliable, low-latency infrastructure that handles real-time voice interactions at scale.

What You'll Do

Design and implement core platform services (API gateways, voice processing pipelines, LLM orchestration, context engineering frameworks).
Build infrastructure for real-time audio streaming and processing with <100ms latency requirements.
Create robust integration layers with LLM providers (OpenAI, Anthropic, Google, etc.) and speech services.
Develop monitoring, observability, and debugging tools for voice conversations.
Optimize for cost and performance as we scale to thousands of clinics.
Own production deployments and rotating on-call responsibilities.
Make architectural decisions that will shape our technical foundation.
Be an engineering thought leader within the company in relevant fields.
What We're Looking For

Deep experience with Linux-like systems, and managing bare-metal servers.
Strong fundamentals in distributed systems and APIs.
Understanding of real-time systems or streaming data.
Excited to learn about LLMs and voice technology.
1+ years of experience in backend or platform software engineering (co-op experience counts). We’re hiring multiple people across a range of experiences, so please apply if you have 10+ years of experience or co-op experience.
Previous experience building 0 to 1 systems that scaled.
Deep experience with distributed systems, micro-services architecture.
Comfortable making technical decisions with limited information.
Bonus:

Previous work with ML infrastructure or LLM applications is a bonus.
Experience with real-time systems (WebRTC, WebSockets) is a major plus.
Previous contributions to open-source projects (link them!) is a bonus.
Experience with Docker and Kubernetes deployments in production.
Experience building scaled production Node.js systems is a bonus.
You'll love it here if you…

Want high ownership and impact from day one.
Enjoy the ambiguity and pace of early-stage startups.
Care deeply about reliability and user experience.
Can balance "move fast" with "build it right".
Want to learn about cutting-edge LLM-based voice platforms.
Are looking for future leadership opportunities within a nascent emerging technology and product domain.
Tech Stack

We work primarily in the (w/ TypeScript) and Python ecosystems.
Salary Range

85k-140k CAD
0.25-1% equity
Work Model

Hybrid - we believe in some facetime (~2-days a week in-office, remote otherwise)
We’re looking for folks from the GTA area
Office accessible by both Car & TTC (subway)
Job Type: Full-time

Pay: $85,000.00-$140,000.00 per year

Benefits:

Stock options
Application question(s):

We're operating in a hybrid environment, being present at the office ~2 days a week. Does this work for you? Our office location is TBD but will likely be located near a subway station closer to the west end (think, Kipling, Islington station).
Experience:

Software Engineering: 1 year (required)
Work Location: Hybrid remote in Toronto, ON M9B 0A2
    `;

    const analysis = await jobAnalyzer.run(jobDescription);

    console.log("Job Analysis:", analysis);
}

main();