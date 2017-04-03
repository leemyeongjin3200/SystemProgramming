var pushpots = pushpots || (function () {
    var user_key;
    var user_domain;
    var domain_key;

    return {
        init: function (args) {
            user_key = args[0];
            user_domain = document.location.host;
            
            $.ajax({
                url : "https://www.pushpots.com/pushpotsdk_auth",
                type: 'GET',
                dataType: 'jsonp',
                jsonp: 'callback',
                data: 'user_key=' + user_key + "&domain=" + user_domain,
                success: function (result) {
                    if (JSON.stringify(result.result) == "1") {
                        var isChrome = !!navigator.userAgent.match('Chrome');
                        var isEdge = !!navigator.userAgent.match('Edge');
                        var isFirefox = !!navigator.userAgent.match('Firefox');
                        var isiPhone = !!navigator.userAgent.match('iPhone');
                        var isiPad = !!navigator.userAgent.match('iPad');
                        var isCriOS = !!navigator.userAgent.match('CriOS');
                        var isMobile = !!navigator.userAgent.match('Mobile');
                        var isAndroid = !!navigator.userAgent.match('Android');
                        var isOpera = !!navigator.userAgent.match('OPR');
                        // 아래 브라우저 검색 시, 순서를 반드시 지켜주세요...
                        if ((isiPhone) || (isiPad)) {
                            alert("아이폰 및 아이패드에서는 웹푸시 지원이 되지 않습니다. 전용 앱을 설치하십시요");
                            return;
                        }
                            // Opera
                        else if ((isOpera) && (isMobile) && (isAndroid)) { // Oepra android mobile 만 우선 지원(windows , macOS 추후 지원)

                            var popupUrl = "https://www.pushpots.com/slogin"
                            var popupOptions = "width=550, height=750, scrollbars=no"
                            window.open(popupUrl, "_blank", popupOptions);
                            window.focus();
                        } else if (isFirefox) {// Firefox 모두 지원 PC 및 Android Mobile

                            var popupUrl = "https://www.pushpots.com/slogin"
                            var popupOptions = "width=550, height=750, scrollbars=no"
                            window.open(popupUrl, "_blank", popupOptions);
                            window.focus();
                        }

                        else if ((((isChrome) && (!isiPhone)) || ((isChrome) && (!isiPad))) && (!isEdge)) { // Chrome Windows, Linux, mac OS X , Android Mobile지원
                            var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                            var verChrome = parseInt(raw[2], 10);

                            if (verChrome > 50) {

                                var popupUrl = "https://www.pushpots.com/slogin"
                                var popupOptions = "width=550, height=750, scrollbars=no"
                                window.open(popupUrl, "_blank", popupOptions);
                                window.focus();
                            } else {
                                alert("브라우저를 최신버전으로 업그레이드 해주세요.");
                                return;
                            }
                        } else {
                            alert("지원하지 않는 브라우저 혹은 OS입니다.")
                            return;
                        }
                    } else {
                        alert("[" + JSON.stringify(result.message) + "] 관리자에게 문의바랍니다.");
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }
            });
            /*
            Notification.requestPermission(function (result) {
                if (result == 'denied') {
                    alert("알림 수신 권한을 '사용'으로 설정 변경하시길 바랍니다.");
                    return;
                } else {
                    
                }
            });
             **/
        },
        get_key: function () {
            return user_key;
        },
        requestPermission: function (){
            
        }
    }
}());