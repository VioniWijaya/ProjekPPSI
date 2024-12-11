const jwt = require('jsonwebtoken');

// Middleware untuk memeriksa token dan role
const verifyTokenAndRole = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token tidak ditemukan, silakan login terlebih dahulu.',
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

            req.user = decoded; // Menyimpan informasi user ke dalam request object

            if (!allowedRoles.includes(decoded.role)) {
                console.log("role anda", decoded.role);
                
                return res.status(403).json({
                    success: false,
                    message: 'Anda tidak memiliki akses ke halaman ini.',
                });
            }

            next(); // Lanjut ke middleware atau handler berikutnya
        } catch (err) {
            console.error("Token verification error: ", err);
            return res.status(403).json({
                success: false,
                message: 'Token tidak valid atau telah kedaluwarsa.',
            });
        }
    };
};

module.exports = {
    verifyTokenAndRole,
};
