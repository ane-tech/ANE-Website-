import fetch from 'node-fetch';

const token = '8d7a087ec6bb12b398eb24881e902946';

async function test() {
    const res = await fetch(`https://api.thingiverse.com/popular?per_page=1`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const item = data[0];
    console.log('thumbnail:', item.thumbnail);
    console.log('preview:', item.preview_image);
}

test();
