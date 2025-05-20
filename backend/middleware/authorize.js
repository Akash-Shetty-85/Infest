const authorize = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ message: 'User not authenticated' });
        }

        if (role === 'admin' && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        next();
    };
};

module.exports = authorize;
