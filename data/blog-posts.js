export const blogPosts = [
  {
    slug: 'why-i-chose-cybersecurity',
    title: 'Why I Chose Cybersecurity',
    excerpt: 'The story of how a curious mind fell in love with the art of ethical hacking and digital defense.',
    date: '2026-05-01',
    readTime: '5 min read',
    tags: ['Cybersecurity', 'Personal', 'Journey'],
    color: '#22d3ee',
    icon: '🛡️',
    content: `
# Why I Chose Cybersecurity

Every story has a beginning. Mine started with curiosity.

I was around 14 when I first heard the word "hacker" — not in a negative sense, but in the sense of someone who could bend systems to their will, who understood the invisible architecture of the digital world. That fascinated me deeply.

## The Turning Point

It wasn't a movie or a TV show that drew me in. It was the simple realization that **everything around us runs on code** — our phones, our banks, our hospitals, our governments. And if code can be written, it can be broken. And if it can be broken, someone needs to protect it.

That someone, I decided, would be me.

## What Cybersecurity Means to Me

Cybersecurity isn't just about tools and techniques. It's about **responsibility**. When you understand how systems can be exploited, you carry the weight of that knowledge — and the ethical obligation to use it for good.

## Where I Am Now

I'm currently a science student at Civil Aviation School & College in Dhaka. I'm actively learning ethical hacking, exploring Linux security (SELinux, LUKS2), and building Project Cypher — my own AI-powered secure OS.

The journey has just begun. But I'm already certain: this is exactly where I'm meant to be.

*— S.M. Taseen Kabir*
    `,
  },
  {
    slug: 'building-project-cypher',
    title: 'Building Project Cypher',
    excerpt: 'How I am building a portable, AI-powered secure OS from scratch — and what I have learned so far.',
    date: '2026-05-10',
    readTime: '8 min read',
    tags: ['Project', 'Linux', 'AI', 'Security'],
    color: '#a78bfa',
    icon: '🔐',
    content: `
# Building Project Cypher

Project Cypher is my most ambitious project yet — a portable, AI-powered secure operating system designed for privacy-first computing.

## The Vision

The idea is simple: what if you could carry an entire secure computing environment in your pocket? An OS that encrypts everything, runs AI locally (no cloud), and gives you complete control over your digital life.

## The Stack

- **Base OS**: Fedora Silverblue (immutable, atomic updates)
- **Security**: SELinux enforcing mode, LUKS2 full-disk encryption
- **Virtualization**: KVM/QEMU, Podman containers, Firecracker microVMs
- **AI Layer**: llama.cpp for local LLM inference, whisper.cpp for voice
- **Languages**: Rust (core), Python (automation & AI scripts)

## What I've Learned

Building this has taught me more than any textbook ever could. Understanding how the Linux kernel handles security contexts, how encryption actually works at the block device level, how to run LLMs efficiently on limited hardware — these are lessons you only learn by doing.

## Current Status

The MVP is running. I can boot into a fully encrypted environment, run local AI models, and spin up isolated containers for different tasks. There is still a long way to go — but every day brings new progress.

*— S.M. Taseen Kabir*
    `,
  },
  {
    slug: 'the-art-of-working-in-silence',
    title: 'The Art of Working in Silence',
    excerpt: 'Why I believe the most powerful work happens quietly — away from the noise of social validation.',
    date: '2026-05-18',
    readTime: '4 min read',
    tags: ['Philosophy', 'Mindset', 'Personal'],
    color: '#f472b6',
    icon: '✍️',
    content: `
# The Art of Working in Silence

"Work in silence. Let your success make the noise."

This is not just a quote I put on my website. It is a philosophy I try to live by every single day.

## The Problem with Noise

We live in an age of constant performance. People announce their goals before achieving them, share their "journey" before the destination is clear, seek validation before the work is even done.

I understand the appeal. Attention feels good. Likes feel like progress. But they are not the same thing.

## What Silence Gives You

When you work quietly — without broadcasting every step — something interesting happens. You stop optimizing for the approval of others and start optimizing for the **quality of the work itself**.

Your focus sharpens. Your decisions become more honest. You ask yourself: "Is this actually good?" instead of "Will people think this is good?"

## My Practice

I do not post about every project I start. I do not announce every book I read or every skill I am learning. I simply work — consistently, quietly, and with full attention.

The website you are reading right now is a result of that quiet work. Built alone, at odd hours, with no audience watching.

## The Paradox

Here is the beautiful paradox: the less you seek attention, the more worthy of it your work becomes.

Silence is not absence. It is **concentration**.

*— S.M. Taseen Kabir*
    `,
  },
];