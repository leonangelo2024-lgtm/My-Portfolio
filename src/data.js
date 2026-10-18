// All the site's content lives here. Edit this file to update the site.
// Entries marked "placeholder" are sample text to replace with your own details.

export const profile = {
  name: 'Leon Angelo Kurumbalapitiya',
  initials: 'LAK',
  tagline: 'Aspiring developer building things for the web with React.',
  // placeholder
  bio: [
    "Hi, I'm Leon Angelo. I'm learning to build modern websites and apps with React, and I enjoy turning ideas into things people can actually click on.",
    "When I'm not coding, you'll find me exploring new tech, picking up new skills, and working on small side projects.",
  ],
}

// placeholder
export const interests = ['Web development', 'Design', 'Technology', 'Learning new things']

// placeholder
export const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'SQL', 'Problem solving', 'Wordpress', 'Joomla']

// placeholder
export const projects = [
  {
    name: 'Personal Website',
    description: 'This site. A static single-page portfolio built with React and Vite.',
    link: '',
  },
  {
    name: 'Quiz App',
    description: 'A small React quiz app with multiple-choice questions and a score at the end.',
    link: '',
  },
]

// Real contact links
export const contacts = [
  { label: 'Email', icon: 'email', url: 'mailto:leonangelo2024@gmail.com' },
  { label: 'Phone', icon: 'phone', url: 'tel:+94762909827' },
  { label: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/share/1DrZjmX5oN/' },
  { label: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/leon_angelo21' },
  { label: 'WhatsApp', icon: 'whatsapp', url: 'https://wa.me/94762909827' },
]

export const socials = [
  ...contacts.filter(
    (c) => c.url && !c.url.startsWith('mailto:') && !c.url.startsWith('tel:')
  ),
  { label: 'GitHub', icon: 'github', url: 'https://github.com/leonangelo2024-lgtm' },
]

