const handleError = (error, req, res, next)=>{
    
    const statusCode = res.statusCode === 200? 500 : res.statusCode

    return  res.status(statusCode).json({"error": error.message})

}

module.exports = handleError