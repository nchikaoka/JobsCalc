const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        const profile = await Profile.get();
        return res.render("profile", { profile: profile })
    },

    async update(req, res) {
        const data = req.body;
        const workingWeeks = 52 - data["vacation-per-year"];
        const weeklyRate = data["monthly-budget"] * 12 / workingWeeks;
        const dailyRate = weeklyRate/data["days-per-week"];
        const hourlyRate =  dailyRate/data["hours-per-day"];

        const profile = await Profile.get()
        await Profile.update({
            ...profile,
            ...req.body,
            "hourly-rate": hourlyRate
        });

        return res.redirect('/profile')
    },
}