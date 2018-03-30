<%@ Page Language="C#" AutoEventWireup="true" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
  <!--<meta http-equiv="expires" content="0"/> -->
    <title>OutageWebMap</title>
    <style type="text/css">
        html, body
        {
            height: 100%;
            overflow: auto;
        }
        body
        {
            padding: 0;
            margin: 0;
        }
        #silverlightControlHost
        {
            height: 100%;
            text-align: center;
        }
    </style>
    <script type="text/javascript">
        var token;

        function validateToken() {


            token = '<%=Request.QueryString["clientKey"] %>';


            if (token != null && token == '<%=ConfigurationManager.AppSettings["TokenString"].ToString() %>') {

                return true;
            }
            else
                return false;



        }



        function RedirectToMobile() {


            var securityEnabled = '<%=ConfigurationManager.AppSettings["EnableSecurity"].ToString() %>';


            if (((securityEnabled.toUpperCase() == "YES") && (validateToken())) || (securityEnabled.toUpperCase() == "NO")) {
                window.sessionStorage.setItem("clientKey", token);

                var useragent = navigator.userAgent;
                useragent = useragent.toLowerCase();

                if (useragent.indexOf('iphone') != -1 || useragent.indexOf('symbianos') != -1 || useragent.indexOf('ipad') != -1 || useragent.indexOf('ipod') != -1 || useragent.indexOf('android') != -1 || useragent.indexOf('blackberry') != -1 || useragent.indexOf('samsung') != -1 || useragent.indexOf('nokia') != -1 || useragent.indexOf('windows ce') != -1 || useragent.indexOf('sonyericsson') != -1 || useragent.indexOf('webos') != -1 || useragent.indexOf('wap') != -1 || useragent.indexOf('motor') != -1 || useragent.indexOf('symbian') != -1) {
                    var locations = getQuerystring('locations');
                    if (locations != null && locations != "")
                        window.location = "./MobileMap/OMSMobileMap.htm?locations=" + locations + "&clientKey=" + token;
                    else
                        window.location = "./MobileMap/OMSMobileMap.htm?clientKey=" + token;
                }
                else
                    window.location = "./OMSWebMap.htm?clientKey=" + token;
                // window.location = "./MobileMap/Default.htm?locations=3318378564";
                // window.location = "./Map/OMSWebMap.htm";
            }
            else {

                window.location = "./Error.htm";
            }


        }



        function getQuerystring(key, default_) {
            if (default_ == null) default_ = "";
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
            var qs = regex.exec(window.location.href);
            if (qs == null)
                return default_;
            else
                return qs[1];
        }
    </script>
</head>
<body onload="RedirectToMobile();">
    <form id="form1" runat="server" style="height: 100%">
    </form>
</body>
</html>
