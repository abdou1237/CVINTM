exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated() || !req.isAuthenticated) {  
        if (req.session) {  
            req.session.redirectUrl = req.headers.referer || req.originalUrl || req.url;  
        }  
        next('Not logged in');  
    } else {
        next();  
    }  
};  

