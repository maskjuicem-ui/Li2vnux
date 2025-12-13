export function generateSignature(name: string): string {
  return name;
}

export function generateSignatureStyle(seed: string): React.CSSProperties {
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rotation = (hash % 5) - 2;
  const skew = (hash % 3) - 1;

  return {
    fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
    fontSize: '28px',
    fontWeight: 400,
    transform: `rotate(${rotation}deg) skewX(${skew}deg)`,
    display: 'inline-block',
    color: '#1a1a1a',
    letterSpacing: '1px'
  };
}
