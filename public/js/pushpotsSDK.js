window.onload = function () {
    var popupUrl = "https://www.pushpots.com/login"
    var popupOptions = "width=370, height=360, resizable=no, scrollbars=no"
    window.open(popupUrl, "_blank",  popupOptions);
}

var pushpotsSDK = (function () {
    // 인증
    var isAuthentication = function (authcpid, authusrid) {
        fetch('/loginAuth',
            {
                // http header info
                headers: {
                    'Accept': 'application/json,text/plain, */*',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                method: 'POST',

                //body: JSON.stringify({chrome_tocken: token, ip: userip})
                //사용자 정보(email) 및 IP 주소(내부 네트웍 기준)
                //body: JSON.stringify({ chrome_tocken: token, email: email })
                body: JSON.stringify({ authcpid: authcpid, authusrid: authusrid })

            }
        ).then(
            function (response) {

                console.log("authcpid:::" + authcpid);
                console.log("authusrid:::" + authusrid);

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    throw new Error();
                }
                // Examine the text in the response
                return response.json().then(function (data) {

                    console.log(JSON.stringify(data));

                    // return JSON.stringify(data);

                    //var newDiv = document.createElement("div");
                    //newDiv.innerHTML = JSON.stringify(data);

                    var btn = document.createElement("BUTTON");        // Create a <button> element
                    var t = document.createTextNode('CP인증');       // Create a text node
                    btn.appendChild(t);                                // Append the text to <button>
                    btn.onclick = function() {alert(JSON.stringify(data))}
                    document.body.appendChild(btn);                    // Append <button> to <body>

                    //if (!data.result) {
                    //    return false ;
                    //} else {
                    //    return true ;   
                    //}
                })
            }
            ) // fetch ... then
    }


    // 기명 함수표현식(named function expression)
    var yourDomain = function () {
        return document.URL;
    }; 


    var isIndexedDB = function () {

        //prefixes of window.IDB objects
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
    
        if (!window.indexedDB) {

            return "Your browser doesn't support a stable version of IndexedDB.";

        
        } else {
            return "Your browser  support a stable version of IndexedDB.";
        }
    }


    var BrowserInfo = function BrowserInfo() {
    
    }


    // Public 속성, 메소드
    return {
       
        BrowserInfo: BrowserInfo,
        isIndexedDB: isIndexedDB,
        isAuthentication: isAuthentication
    };

} ());


var clerk = (function () {
    var name = 'Teo';
    var sex = '남자';
    var position = '수석 엔지니어';
    // salary private
    var salary = 2000;
    var taxSalary = 200;
    var totalBonus = 100;
    var taxBonus = 10;

    var payBonus = function () {
        totalBonus = totalBonus - taxBonus;
        return totalBonus;
    };
    var paySalary = function () {
        return salary - taxSalary;
    };

    // Public 속성, 메소드
    return {
        name: name,
        sex: sex,
        position: position,
        paySalary: paySalary,
        payBonus: payBonus
    };
} ());