module.exports = function createErrorhandler() {
// eslint-disable-next-line
    return (err, req, res, next) => {
        
        let code = 500;
        let error = { error: 'Internal Server Error' };

        // this is for errors we send to next, like:
        if(err.code) {
            code = err.code;
            error = err.error;
        }
        // this is for bad mongodb _id's
        else if(err.name === 'CastError') {
            code = 400;
            error = { error: err.message };
        }
       
        else if(err.name === 'ValidationError') {
            code = 400;
            
            error = { 
                
                error: Object.values(err.errors)
                    .map(value => value.message)
            };
        }
        else {
            // if it was a 500, log it on the server so we can
            // see
            console.log(err); // eslint-disable-line
        }

        
        res.status(code).json(error);
    };
};