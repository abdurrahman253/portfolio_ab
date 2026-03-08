import { Github, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function SocialLinks() {
  const links = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  ];

  return (
    <div className="flex justify-center md:justify-start gap-6">
      {links.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl text-gray-400 hover:text-indigo-400 transition-all transform hover:scale-110 hoverable"
          aria-label={label}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}