const { User, WewardChapter, UserWewardChapter } = require("../../models");

module.exports = {
    // Récupérer les chapitres d’un utilisateur donné (pas besoin d’auth)
    getUserChapters: async (req, res) => {
        const { userId } = req.params;

        const userChapters = await UserWewardChapter.findAll({
            where: { idUser: userId },
            include: [
                {
                    model: WewardChapter,
                    as: "WewardChapter",
                    attributes: ["id", "en", "fr", "isVintage", "isEphemeral"]
                }
            ]
        });

        if (!userChapters || userChapters.length === 0) {
            return res.status(404).json({ message: "No chapters found for this user" });
        }

        res.json({ success: true, data: userChapters });
    },

    // Mise à jour d’un chapitre de l’utilisateur connecté
    updateUserChapter: async (req, res) => {
        const userId = req.user.id;
        const { idWewardChapter, cards } = req.body;

        const userChapter = await UserWewardChapter.findOne({
            where: { idUser: userId, idWewardChapter }
        });

        if (!userChapter) {
            return res.status(404).json({ message: "Chapter not found for this user" });
        }

        await userChapter.update(cards);
        res.json({ success: true, data: userChapter });
    },

    // Ajouter un nouveau chapitre (admin only)
    addWewardChapter: async (req, res) => {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const { en, fr, isVintage = false, isEphemeral = false } = req.body;

        const chapter = await WewardChapter.create({ en, fr, isVintage, isEphemeral });

        const users = await User.findAll();
        const userChaptersData = users.map(u => ({
            idUser: u.id,
            idWewardChapter: chapter.id,
            card1: 0, card2: 0, card3: 0, card4: 0, card5: 0,
            card6: 0, card7: 0, card8: 0, card9: 0
        }));

        await UserWewardChapter.bulkCreate(userChaptersData);

        res.status(201).json({ success: true, data: chapter });
    },

    // Mettre à jour un chapitre (admin only)
    updateWewardChapter: async (req, res) => {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const { id } = req.params;
        const { en, fr } = req.body;

        const chapter = await WewardChapter.findByPk(id);
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        await chapter.update({ en, fr });
        res.json({ success: true, data: chapter });
    }
};
