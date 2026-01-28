// Native fetch is available in Node 18+, no import needed
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const THINGIVERSE_API_URL = 'https://api.thingiverse.com';

export const getPopularModels = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const token = process.env.THINGIVERSE_TOKEN;

        if (!token) {
            return res.status(500).json({ message: 'Thingiverse Token is missing' });
        }

        console.log('Fetching from Thingiverse with token starting with:', token.substring(0, 4) + '...');
        const response = await fetch(`${THINGIVERSE_API_URL}/popular?page=${page}&per_page=12`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'ANE-3D-Model-Library/1.0'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ message: 'Failed to fetch from Thingiverse', error: errorText });
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('Thingiverse returned non-array data:', data);
            return res.status(500).json({ message: 'Invalid response from Thingiverse', detail: typeof data });
        }

        const transformedModels = data.map(item => {
            // ... (rest of transformation logic)
            const highResImage = item.thumbnail?.replace('thumb_medium', 'large')
                .replace('thumb_small', 'large') || item.thumbnail;

            const basePrice = (item.id % 20) * 100 + 499;
            const complexityBonus = item.like_count > 500 ? 500 : 0;
            const finalPrice = basePrice + complexityBonus;

            const likesWeight = (item.like_count || 0) * 0.12;
            const makesWeight = (item.make_count || 0) * 2.5;
            const qualityScore = likesWeight + makesWeight;

            const baseRating = 3.4;
            const calculatedBonus = Math.min(1.6, qualityScore / 15000);
            const finalRating = (baseRating + calculatedBonus).toFixed(1);

            return {
                id: item.id,
                name: item.name,
                price: finalPrice,
                image: highResImage || item.thumbnail,
                category: 'Thinkiverse',
                rating: finalRating,
                description: item.description,
                downloads: item.download_count || 0,
                like_count: item.like_count,
                sales: (item.collect_count || 0) + (item.like_count || 0) || Math.floor(Math.random() * 500) + 100
            };
        });

        // Shuffle the results for a dynamic feel on refresh
        const shuffledModels = transformedModels.sort(() => Math.random() - 0.5);

        res.status(200).json(shuffledModels);

    } catch (error) {
        console.error('Thingiverse Fetch Error:', error);
        res.status(500).json({ message: `Server Error: ${error.message}`, stack: error.stack?.split('\n')[0] });
    }
};

export const getModelDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const token = process.env.THINGIVERSE_TOKEN;

        // Fetch details and images in parallel
        const [detailsReq, imagesReq] = await Promise.all([
            fetch(`${THINGIVERSE_API_URL}/things/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'User-Agent': 'ANE-3D-Model-Library/1.0'
                }
            }),
            fetch(`${THINGIVERSE_API_URL}/things/${id}/images`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'User-Agent': 'ANE-3D-Model-Library/1.0'
                }
            })
        ]);

        if (!detailsReq.ok) {
            return res.status(detailsReq.status).json({ message: 'Failed to fetch details' });
        }

        const details = await detailsReq.json();
        const images = imagesReq.ok ? await imagesReq.json() : [];

        // Transform - Prioritize highest quality display sizes
        const gallery = images.map(img => {
            const sizes = img.sizes || [];
            // Consistently prioritize display_large to match popular list
            const highRes = sizes.find(s => s.type === 'display' && s.size === 'large') ||
                sizes.find(s => s.url.includes('display_large')) ||
                sizes.find(s => s.type === 'original' || s.size === 'original') ||
                sizes.find(s => s.url.includes('original')) ||
                sizes.find(s => s.type === 'display') ||
                sizes.find(s => s.size === 'large') ||
                sizes[0];
            return highRes?.url || img.url;
        });

        // Match the pricing/rating logic from the list view
        const basePrice = (details.id % 20) * 100 + 499;
        const complexityBonus = details.like_count > 500 ? 500 : 0;

        // Precision Data-Driven Rating Formula (Match List View)
        const likesWeight = (details.like_count || 0) * 0.12;
        const makesWeight = (details.make_count || 0) * 2.5;

        const qualityScore = likesWeight + makesWeight;
        const baseRating = 3.4;
        const calculatedBonus = Math.min(1.6, qualityScore / 15000);

        const fullModel = {
            id: details.id,
            name: details.name,
            price: basePrice + complexityBonus,
            image: details.thumbnail,
            images: gallery,
            description: details.description,
            category: 'Thinkiverse',
            downloads: details.download_count,
            sales: (details.collect_count || 0) + (details.like_count || 0) || Math.floor(Math.random() * 500) + 100,
            rating: (baseRating + calculatedBonus).toFixed(1),
            creator: details.creator?.name,
            license: details.license
        };

        res.status(200).json(fullModel);

    } catch (error) {
        console.error('Detail Fetch Error:', error);
        res.status(500).json({ message: 'Error fetching model details' });
    }
};

export const generate3DModel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image file provided" });
        }
        const imagePath = req.file.path;

        const form = new FormData();
        form.append("image", fs.createReadStream(imagePath));

        const response = await axios.post(
            "http://127.0.0.1:8001/generate-3d",
            form,
            {
                headers: form.getHeaders(),
                timeout: 0
            }
        );

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || "AI Engine failed to generate model");
        }

        const modelPath = response.data.model_path;

        if (!modelPath) {
            throw new Error("AI Engine did not return a model path");
        }

        res.download(modelPath, "model.obj", (err) => {
            if (err) {
                console.error("Download error:", err);
            }
        });
    } catch (err) {
        console.error("3D Generation Error:", err.message);
        if (err.response) {
            console.error("AI Service Response Data:", err.response.data);
            console.error("AI Service Status Code:", err.response.status);
        }
        res.status(500).json({
            error: "3D generation failed",
            details: err.message,
            ai_status: err.response ? err.response.status : 'Service Offline'
        });
    }
};
