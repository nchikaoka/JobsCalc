const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res){
        const profile = await Profile.get();
        const jobs =  await Job.get();

        let statusCounter = {
            progress: 0,
            done: 0,
            total: jobs.length
        };

        // inicialização de soma horas diárias de jobs em progresso
        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) => {
            //ajustes no jobs
            const daysLeft = JobUtils.remainingDays(job);
            const status = daysLeft <= 0 ? 'done' : 'progress';

            statusCounter[status] += 1;

            jobTotalHours = status == 'progress' ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours; 
            
            return {
                ...job,
                daysLeft,
                status,
                budget: JobUtils.budgetCalculation(job, profile['hourly-rate'])
            }
        });

        // qtd de horas que quero trabalhar menos a qtd de horas/dia em cada job in progress
        
        const freeHours = profile["hours-per-day"] - jobTotalHours;
            
        return res.render("index", { jobs: updatedJobs, profile: profile, statusCounter: statusCounter, freeHours: freeHours})
    }
}


