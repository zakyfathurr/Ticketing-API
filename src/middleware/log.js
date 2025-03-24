
const logRequest = ((req,res,next) =>{
    const startTime = Date.now();
    res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Request Method : ${req.method}  \Path : ${req.originalUrl} \nDuration : ${duration}ms`);
    });
    next();
})

module.exports = logRequest
