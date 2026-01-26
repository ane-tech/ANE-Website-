import fetch from 'node-fetch';

const token = '8d7a087ec6bb12b398eb24881e902946';
const id = '763622';

async function test() {
    const res = await fetch(`https://api.thingiverse.com/things/${id}/images`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.length > 0) {
        const examples = {};
        data.forEach(img => {
            img.sizes.forEach(s => {
                const key = `${s.type} | ${s.size}`;
                if (!examples[key]) examples[key] = s.url;
            });
        });
        for (const [key, url] of Object.entries(examples)) {
            console.log(`${key} => ${url}`);
        }
    }
}

test();
