(function ($) {
    var self;
    var options;
    var $qrImage;
    var $checkPaymentButton;
    var $updateLabel;
    var timeToNextUpdate;
    var isMonitoringPayments;
    var checkPaymentInterval;
    var autoUpdaterInterval;
    var updateIntervalInMinutes = 5;
    var paymentRequestId;

    function checkPayment() {
        $.post(options.getPaymentStatusUrl,
            {
                paymentRequestId: paymentRequestId
            })
        .done(function (r) {
            var result = JSON.parse(r);
            if (result.paymentSuccessful) {
                console.log("Payment received")
                stopMonitoringPayments();
                stopAutoUpdater();

                $updateLabel.text("Payment Succeeded!");
                $checkPaymentButton.attr("disabled", "disabled")

                $.post(options.postPaymentUrl, {
                    paymentRequestId: paymentRequestId
                })
                .done(function () {
                    if (options.postPaymentCallback) {
                        options.postPaymentCallback(result);
                    }
                });
            }
        }).fail(function () {
            console.error("Service " + options.getPaymentStatusUrl + " is not accessible.");
        });
    }

    function checkForUpdate() {
        var minimumNotificationTime = 60000;
        var currentTime = Date.now();
        if (!timeToNextUpdate || timeToNextUpdate.getTime() < currentTime) {
            timeToNextUpdate = new Date(currentTime + updateIntervalInMinutes * 60000)
            $qrImage.empty();
            $.post(options.getNewLinkUrl)
            .done(function (r) {
                var result = JSON.parse(r);
                console.log("Received link: " + result.link);
                paymentRequestId = result.paymentRequestId;
                $qrImage.empty();
                $qrImage.qrcode({
                    text: result.link,
                    width: $qrImage.width(),
                    height: $qrImage.height()
                });
                $updateLabel.text("Pay QR in your wallet");
            })
            .fail(function () {
                console.error("Service " + options.getNewLinkUrl + " is not accessible.");
            });
        }
        else if (timeToNextUpdate.getTime() - currentTime <= minimumNotificationTime) {
            $updateLabel.text("Time before update: " + fmtMMSS(timeToNextUpdate.getTime() - currentTime));
        }
    }

    function stopMonitoringPayments() {
        isMonitoringPayments = false;
        clearInterval(checkPaymentInterval);
    }

    function startMonitoringPayments() {
        isMonitoringPayments = true;
        var monitoringInterval = 5000; /* 5 seconds */
        checkPaymentInterval = setInterval(checkPayment, monitoringInterval);
    }

    function startAutoUpdater() {
        var monitoringInterval = 1000; /* 1 second */
        autoUpdaterInterval = setInterval(checkForUpdate, monitoringInterval);
    }

    function stopAutoUpdater() {
        clearInterval(autoUpdaterInterval);
    }

    function init($container) {
        $qrImage = $container.find("[data-role='qr-image']");
        $checkPaymentButton = $container.find("[data-role='check-payment-button']");
        $updateLabel = $container.find("[data-role='update-label']");

        $checkPaymentButton.text("Check Payment");
        $updateLabel.text("Pay QR in your wallet");

        $checkPaymentButton.click(function () {
            if (isMonitoringPayments) {
                $updateLabel.text("Pay QR in your wallet");
                $checkPaymentButton.text("Check Payment");
                stopMonitoringPayments();
                startAutoUpdater();
            }
            else {
                startMonitoringPayments();
                stopAutoUpdater();
                $checkPaymentButton.text("Cancel");
                $updateLabel.text("Checking payment...");
            }
        })

        startAutoUpdater();
    }

    function fmtMMSS(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    $.fn.bitcoinpayment = function (o) {
        options = o;
        var container = $(this);
        init(container);
        return this;
    };
}(jQuery));