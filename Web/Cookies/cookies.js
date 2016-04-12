jQuery(document).ready(function($){    

    checkCookie();

    /**
     * Set a cookie
     */

    function setCookie(name, value, days){
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + "; " + expires;
    }

    /**
     * Get a cookie
     */

    function getCookie(name){
        var name = name + "=";
        var ca = document.cookie.split(';');

        for (var i=0; i<ca.length; i++)
        {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }

        return '';
    }

    /**
     *Checks for a specified cookie to make sure user is new/old
     */

    function checkCookie(){
        if(getCookie('private') == '-1' ){
         return; 
        }   
        else if(getCookie('private') < 3 && (getCookie('private') != "")){
            var temp = parseInt(getCookie('private'));
            temp++;
            forgetCookie('private')
            setCookie('private', temp, 31);
        }
        else if((getCookie('private') >= 3)){
            if(getCookie('hasSeen') == ''){
                setCookie('hasSeen', 'july', 365); 
            }
            return; 
        }  
        else{
            forgetCookie('private');
            setCookie('private', 1, 31);
            } 
    }

    /**
     * Forget a cookie
     */

    function forgetCookie(name){
        var date = new Date();
        var expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + "; " + expires;
    }
}