const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Token manquant ou invalide." });
    }

    const token = authHeader.split(" ")[1]; // Récupère uniquement le token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ✅ Ajoute l'utilisateur dans la requête
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Token invalide." });
    }
};
