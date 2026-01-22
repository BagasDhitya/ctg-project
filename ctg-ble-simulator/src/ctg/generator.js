let hr = 140;
let uc = 30;

export function generateCTG() {
    hr += Math.floor(Math.random() * 5 - 2);
    uc += Math.floor(Math.random() * 5 - 2);

    hr = Math.max(110, Math.min(160, hr));
    uc = Math.max(0, Math.min(100, uc));

    return `HR:${hr};UC:${uc}`;
}
