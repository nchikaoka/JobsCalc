module.exports = {
    remainingDays(job) {
        // cálculo de duração em dias
        const totalDays = (job["total-hours"]/job["daily-hours"]).toFixed();
        
        return Math.ceil((totalDays - ((Date.now() - job.createdAt)/(24 * 60 * 60 * 1000))))
    },
    
    budgetCalculation(job, hourlyRate) {
        
        return job["total-hours"] * hourlyRate
    }
}