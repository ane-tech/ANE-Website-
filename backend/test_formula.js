import fetch from 'node-fetch';
const token = '8d7a087ec6bb12b398eb24881e902946';

async function test() {
    const res = await fetch(`https://api.thingiverse.com/popular?per_page=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();

    console.log('--- Proposed Formula Spread ---');
    data.forEach(item => {
        const likesWeight = (item.like_count || 0) * 0.1;
        const collectWeight = (item.collect_count || 0) * 0.05;
        const makesWeight = (item.make_count || 0) * 10.0;
        const qualityScore = likesWeight + collectWeight + makesWeight;

        // TARGET: 3.9 to 4.9 range
        const baseRating = 3.9;
        const divisor = 80000;
        const calculatedBonus = Math.min(1.0, qualityScore / divisor);
        const finalRating = (baseRating + calculatedBonus).toFixed(1);

        console.log(`${item.name.slice(0, 25).padEnd(25)} | Rating: ${finalRating} | Score: ${Math.round(qualityScore)}`);
    });
}
test();
