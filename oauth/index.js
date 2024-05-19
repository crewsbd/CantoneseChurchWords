const isAuthenticated = (request, response, next) => {
    if (request.session.user === undefined) {
        return response.status(401).json('You do not have access');
    }
    //console.dir(request.session);
    next();
};

module.exports = { isAuthenticated };
