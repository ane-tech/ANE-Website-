import fetch from 'node-fetch';
const token = '8d7a087ec6bb12b398eb24881e902946';

async function test() {
    const res = await fetch(`https://api.thingiverse.com/popular?per_page=15`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();

    console.log('--- Wide Variety Strategy (3.0 to 5.0) ---');
    data.forEach(item => {
        // High weights to capture the full spectrum
        const likesWeight = (item.like_count || 0) * 0.5;
        const makesWeight = (item.make_count || 0) * 20.0;
        const qualityScore = likesWeight + makesWeight;

        const baseRating = 3.1;
        // Divisor tuned to spread 0 - 50k scores across 1.9 points
        const calculatedBonus = Math.min(1.9, qualityScore / 18000);
        const finalRating = (baseRating + calculatedBonus).toFixed(1);

        console.log(`${item.name.slice(0, 25).padEnd(25)} | Rating: ${finalRating} | Score: ${Math.round(qualityScore)}`);
    });
}
test();
