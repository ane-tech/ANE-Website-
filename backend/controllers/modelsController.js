import fetch from 'node-fetch';

const THINGIVERSE_API_URL = 'https://api.thingiverse.com';

export const getPopularModels = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const token = process.env.THINGIVERSE_TOKEN;

        if (!token) {
            return res.status(500).json({ message: 'Thingiverse Token is missing' });
        }

        const response = await fetch(`${THINGIVERSE_API_URL}/popular?page=${page}&per_page=12`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ message: 'Failed to fetch from Thingiverse', error: errorText });
        }

        const data = await response.json();

        const transformedModels = data.map(item => {
            // Attempt to get a higher quality preview for the list view
            // Most Thingiverse thumbnails can be converted to larger previews by URL pattern
            const highResImage = item.thumbnail?.replace('thumb_medium', 'large')
                .replace('thumb_small', 'large') || item.thumbnail;

            return {
                id: item.id,
                name: item.name,
                price: 0,
                image: highResImage,
                category: 'Thinkiverse',
                rating: item.like_count > 100 ? 5.0 : 4.0,
                description: item.description,
                downloads: item.download_count || 0,
                like_count: item.like_count
            };
        });

        res.status(200).json(transformedModels);

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ message: 'Server Error fetching models' });
    }
};

export const getModelDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const token = process.env.THINGIVERSE_TOKEN;

        // Fetch details and images in parallel
        const [detailsReq, imagesReq] = await Promise.all([
            fetch(`${THINGIVERSE_API_URL}/things/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch(`${THINGIVERSE_API_URL}/things/${id}/images`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (!detailsReq.ok) {
            return res.status(detailsReq.status).json({ message: 'Failed to fetch details' });
        }

        const details = await detailsReq.json();
        const images = imagesReq.ok ? await imagesReq.json() : [];

        // Transform - Prioritize highest quality display sizes
        const gallery = images.map(img => {
            const sizes = img.sizes || [];
            // Preference order: display_large > large > original > medium
            const highRes = sizes.find(s => s.size === 'display_large') ||
                sizes.find(s => s.size === 'large') ||
                sizes.find(s => s.size === 'original') ||
                sizes[0];
            return highRes?.url || img.url;
        });

        const fullModel = {
            id: details.id,
            name: details.name,
            price: 0,
            image: details.thumbnail,
            images: gallery,
            description: details.description,
            category: 'Thinkiverse',
            downloads: details.download_count,
            rating: details.like_count > 50 ? 4.8 : 4.2,
            creator: details.creator?.name,
            license: details.license
        };

        res.status(200).json(fullModel);

    } catch (error) {
        console.error('Detail Fetch Error:', error);
        res.status(500).json({ message: 'Error fetching model details' });
    }
};
