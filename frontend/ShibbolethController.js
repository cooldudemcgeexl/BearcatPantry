async function getShibData(){
    // leaving hardcoded because shibboleth data will not work in development environment.
    let response = await fetch("https://bearcatspantry.uc.edu/web-services/ShibbolethData")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function getUserByMNumber(MNum){
    let response = await fetch(url + "/getUserByMNum/"+ MNum)
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

function initializeShibboleth() {
    getShibData().then(
        shibData => {
            getUserByMNumber(shibData.uceduUCID).then(
                user => { 
                    if (user.permissions == 1 || user.permissions == 2 || user.permissions == 3 || env === "dev") { // if dev mode, load admin side anyway
                        $("#navbar").load("../../../BearcatPantry/frontend/admin/AdminNavBar.html");
                    }
                    else {  
                        $("#navbar").load("../../../BearcatPantry/frontend/student/StudentNavBar.html");
                        var currentPage = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
                        if (currentPage != "student.html" && currentPage != "checkout.html" && currentPage != "about.html") {
                            document.write('<script type="text/undefined">');
                            window.stop();
                            var ua = window.navigator.userAgent;
                            var msie = ua.indexOf("MSIE ");
                            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {document.execCommand("Stop");};    
                            location.replace("../../../BearcatPantry/frontend/student/student.html")
                        }
                    }
                }
            )
        }
    )
}

//Reads the environment and sets the correct API URL
async function loadEnv(){
    fetch("../environment.json").then(response=>response.json())
        .then(json=>{
            env=json.env
            if (env === "dev"){
                url = "http://localhost:8080/"
                posturl = 'http://localhost:8080/'
            }else{
                //https does not work because SSL cert. Changing to http
                url = "https://bearcatspantry.uc.edu/web-services/"
                posturl = 'https://bearcatspantry.uc.edu/web-services/'
            }
            //Crate the components of the admin page here
            initializeShibboleth()

        })
        .catch(err => console.log("Error reading Environment"))
}

loadEnv()