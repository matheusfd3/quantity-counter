const maxSequence = 90;

function getSequenceColor(sequence) {
    const hue = Math.max(0, 240 - (sequence / maxSequence) * 240);
    return `hsl(${hue}, 60%, 50%)`;
}