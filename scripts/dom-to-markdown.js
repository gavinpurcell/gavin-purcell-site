// Serialized into the prerender browser context by scripts/prerender.mjs.
//
// Converting the *rendered DOM* rather than the source JSX means the markdown
// can never drift from the page: whatever a reader sees is what an agent gets.
// It has to be entirely self-contained, since puppeteer stringifies it and runs
// it inside the page with no access to this module's scope.
export function domToMarkdownSource() {
  return function domToMarkdown(canonical) {
    const BLOCK_SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'NAV', 'FOOTER', 'SVG', 'IFRAME', 'BUTTON', 'FORM']);

    const inline = (node) => {
      let out = '';
      node.childNodes.forEach((c) => {
        if (c.nodeType === 3) {
          out += c.textContent.replace(/\s+/g, ' ');
          return;
        }
        if (c.nodeType !== 1 || BLOCK_SKIP.has(c.tagName)) return;
        const text = inline(c);
        switch (c.tagName) {
          case 'A': {
            const href = c.getAttribute('href') || '';
            if (!text.trim()) break;
            out += href ? `[${text.trim()}](${new URL(href, canonical).href})` : text;
            break;
          }
          case 'STRONG':
          case 'B':
            if (text.trim()) out += `**${text.trim()}**`;
            break;
          case 'EM':
          case 'I':
            if (text.trim()) out += `*${text.trim()}*`;
            break;
          case 'CODE':
            if (text.trim()) out += `\`${text.trim()}\``;
            break;
          case 'BR':
            out += '\n';
            break;
          case 'IMG': {
            const src = c.getAttribute('src') || '';
            if (src) out += `![${c.getAttribute('alt') || ''}](${new URL(src, canonical).href})`;
            break;
          }
          default:
            out += text;
        }
      });
      return out;
    };

    const blocks = [];
    const walk = (node) => {
      node.childNodes.forEach((el) => {
        if (el.nodeType !== 1 || BLOCK_SKIP.has(el.tagName)) return;
        if (el.hasAttribute && el.hasAttribute('data-md-skip')) return;
        const tag = el.tagName;
        if (/^H[1-6]$/.test(tag)) {
          const text = inline(el).trim();
          if (text) blocks.push('#'.repeat(Number(tag[1])) + ' ' + text);
          return;
        }
        if (tag === 'P') {
          const text = inline(el).trim();
          if (text) blocks.push(text);
          return;
        }
        if (tag === 'BLOCKQUOTE') {
          const text = inline(el).trim();
          if (text) blocks.push(text.split('\n').map((l) => '> ' + l).join('\n'));
          return;
        }
        if (tag === 'UL' || tag === 'OL') {
          const items = [...el.children]
            .filter((li) => li.tagName === 'LI')
            .map((li, i) => (tag === 'OL' ? `${i + 1}. ` : '- ') + inline(li).trim())
            .filter((l) => l.length > 2);
          if (items.length) blocks.push(items.join('\n'));
          return;
        }
        if (tag === 'PRE') {
          const text = el.textContent.trim();
          if (text) blocks.push('```\n' + text + '\n```');
          return;
        }
        if (tag === 'HR') {
          blocks.push('---');
          return;
        }
        if (tag === 'IMG') {
          const src = el.getAttribute('src') || '';
          if (src) blocks.push(`![${el.getAttribute('alt') || ''}](${new URL(src, canonical).href})`);
          return;
        }
        walk(el);
      });
    };

    const root = document.querySelector('main#main') || document.querySelector('main') || document.body;

    // The page's own <h1> becomes the markdown title, so it is not repeated as a
    // second heading in the body. Falls back to <title> with the site suffix
    // trimmed off ("... | Gavin Purcell" and "... - Gavin Purcell").
    const h1 = root.querySelector('h1');
    const h1Text = h1 ? inline(h1).trim() : '';
    if (h1) h1.setAttribute('data-md-skip', '');

    walk(root);

    const title =
      h1Text ||
      (document.title || '').replace(/\s*[|-]\s*Gavin Purcell.*$/, '').trim() ||
      'Gavin Purcell';
    const description = (document.querySelector('meta[name="description"]') || {}).content || '';

    const head = [`# ${title}`];
    if (description) head.push(`> ${description.trim()}`);
    head.push(`Source: ${canonical}`);

    // A decorative rule straight under the title carries no meaning in markdown.
    while (blocks[0] === '---') blocks.shift();

    // Collapse the runs of blank lines the walker can leave behind.
    return (head.join('\n\n') + '\n\n' + blocks.join('\n\n'))
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+\n/g, '\n')
      .trim() + '\n';
  };
}
