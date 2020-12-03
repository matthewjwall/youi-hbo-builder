
$(document).ready(function () {
    $("#sendGreen").on("click", function (e) {
        e.preventDefault();
        var csInterface = new CSInterface();
        csInterface.evalScript('$._ext.makeButton([0.55,0.75,0.25])'); //, myTextHandlerFunction
    });
    $("#sendBlue").on("click", function (e) {
        e.preventDefault();
        var csInterface = new CSInterface();
        csInterface.evalScript('$._ext.makeButton([1.15,0.40,1.85])'); //, myTextHandlerFunction 65,105,225
    });
});
