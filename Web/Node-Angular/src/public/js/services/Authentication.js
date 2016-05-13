/**
 * Authentication.js
 *
 * Factory used to store user and role related information
 */

angular.module('app').factory("AuthenticationService", function(
    $window
) {
    var isLoggedIn = false; // whether or not a user is logged into the system

    // our user related information
    var loggedUser = {
        name: null,
        email: null,
        avatar: null,
        roles: []
    };

    /**
     * getter for whether or not the user is logged on
     */
    var isLogged = function() {
        return isLoggedIn;
    };

    /**
     * setter for whether or not a user is logged in. Useful if the user refreshed and we need to reset the values
     * @param logged
     */
    var setLogged = function(logged) {
        isLoggedIn = logged;
    };

    /**
     * Getter for the user object
     * @returns the user with the currently set values
     */
    var getUser = function() {
        return loggedUser;
    };

    /**
     * Sets the user
     * @param user the user object pulled from the rest api
     */
    var setUser = function(user) {
        console.log(user);
        loggedUser.name = user.name;
        loggedUser.email = user.email;
        loggedUser.avatar = user.img;
        // loggedUser.roles = user.roles;
    };

    /**
     * Logs the user in
     * @param token the token to be set in the window session
     * @param user the user to be set in the authentication service
     */
    var login = function(user) { /*token,*/ 
                console.log(user);

        // $window.sessionStorage.token = token;
        loggedUser.name = user.name;
        loggedUser.email = user.email;
        loggedUser.avatar = user.img;
        // loggedUser.roles = user.roles;
    };

    /**
     * Logs the user out
     */
    var logout = function() {
        // delete $window.sessionStorage.token;
        loggedUser.name = null;
        loggedUser.email = null;
        loggedUser.avatar = null;
        loggedUser.roles = null;
    };

    /**
     * Returns whether or not a logged in user has the provided role
     * @param role the int id for the role to check
     * @returns {boolean} whether or not the user has the id
     */
    var hasRole = function(role) {
        for (var i = 0; i < loggedUser.roles.length; i++) {
            if (loggedUser.roles[i].int_role_id === role) {
                return true;
            }
        }
        return false;
    };

    var refresh = function() {
        if ($window.sessionStorage.token) {
            // get our token parts
            //var parts = $window.sessionStorage.token.split('.');
            // convert our token back from base64 encoding
            var str = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            switch (str.length % 4) {
                case 0:
                {
                    break;
                }
                case 2:
                {
                    str += '==';
                    break;
                }
                case 3:
                {
                    str += '=';
                    break;
                }
                default:
                {
                }
            }

            var user = JSON.parse((atob(str)));

            setLogged(true);
            setUser(user);
        }
    };

    // our outward interface
    return {
        isLogged: isLogged,
        setLogged: setLogged,
        login: login,
        logout: logout,
        getUser: getUser,
        setUser: setUser,
        hasRole: hasRole,
        refresh: refresh
    };
});
