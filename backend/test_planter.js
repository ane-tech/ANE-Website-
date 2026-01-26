import fetch from 'node-fetch';

const token = '8d7a087ec6bb12b398eb24881e902946';
const id = '903411';

async function test() {
    const res = await fetch(`https://api.thingiverse.com/things/${id}/images`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.length > 0) {
        data[0].sizes.forEach(s => console.log(JSON.stringify(s)));
    }
}

test();
