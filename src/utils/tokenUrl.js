/**
 * Build GMGN token K-line page URL.
 * If contract_address is available, link directly to the token page.
 * Otherwise fall back to GMGN search.
 */
export function getTokenUrl(token) {
  const chain = token.chain || 'sol';
  if (token.contract_address) {
    return `https://gmgn.ai/${chain}/token/${token.contract_address}`;
  }
  // Fallback: GMGN search by token name
  return `https://gmgn.ai/${chain}/token/${encodeURIComponent(token.name)}`;
}

export function openToken(token, e) {
  if (e) e.stopPropagation();
  window.open(getTokenUrl(token), '_blank', 'noopener,noreferrer');
}
