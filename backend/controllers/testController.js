export const getTestMessage = (req, res) => {
    res.status(200).json({ message: 'Backend is connected and working!' });
};
