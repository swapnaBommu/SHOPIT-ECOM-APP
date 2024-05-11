//Create token and save in the cookie

export default (user, statusCode, res) =>{
    //create jwt token
    const token = user.getJwtToken()

    //Options for cookie
    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        //if we set httpOnly as true it will be accessed only in backend
        httpOnly:true
    };

    //"token"-->name of the cookie
    //token -->value of the cookie
    //options --> options of the cookie
    res.status(statusCode).cookie("token", token, options).json({
        token
    });
};