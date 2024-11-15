import jwt from 'jsonwebtoken';

// for admin authentication and authorization
export const adminAuthMiddleware = (req, res, next) => {
    const adminToken = req.cookies.adminToken; // since I'm using cookies
    if (!adminToken) return res.status(401).json({ message: 'Access denied. No admin token provided.' });
    try {
        const adminTokenDecoded = jwt.verify(adminToken, process.env.JWT_SECRET);
        req.admin = adminTokenDecoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// for client authentication and authorization
export const clientAuthMiddleware = (req, res, next) => {
    const clientToken = req.cookies.clientToken;
    if (!clientToken) return res.status(401).json({ message: 'Access denied. No client token provided.' });

    try {
        const clientTokenDecoded = jwt.verify(clientToken, process.env.JWT_SECRET);
        req.client = clientTokenDecoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
