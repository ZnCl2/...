function setTestResult(testId, text)
{
    document.getElementById(testId + '-result').innerText = text + "\n";
}

function appendTestResult(testId, text)
{
    document.getElementById(testId + '-result').innerText += text + "\n";
}

function setRed(testId)
{
    var el = document.getElementById(testId + '-title');
    el.classList.remove('pass');
    el.classList.add('red');
}

function setPass(testId)
{
    var el = document.getElementById(testId + '-title');
    el.classList.remove('red');
    el.classList.add('pass');
}

testResults = {}

function testPassed(testId)
{
    testResults[testId] = true;
}

function testFailed(testId)
{
    testResults[testId] = false;
}

function makeTimeout(testId, msg=null)
{
    var f = function ()
    {
        if(!testResults.hasOwnProperty(testId))
        {
            appendTestResult(testId, "[Timeout] " + (msg ? msg : "ZeroFrame API hasn't responded."));
            setRed(testId);
        }
    };
    return f;
}

function hasError(result)
{
    if(result == null)
    {
        return "Error: result is null.";
    }
    else if(result["error"])
    {
        return "Error: " + result["error"];
    }
    else
    {
        return false;
    }
}

function printError(result, testId)
{
    var error = hasError(result);
    if(error)
    {
        appendTestResult("user-pk", error);
        setRed("user-pk");
        testFailed("user-pk");

        return true;
    }
    else
    {
        return false;
    }
}


class Tests extends ZeroFrame
{
    onOpenWebsocket ()
    {
        testPassed("ws");
        appendTestResult("ws", "Connected to WebSocket API.");
        this.testServerInfo(this);
    }

    testServerInfo (self)
    {
        setTestResult("zeronet", "Testing...");

        self.cmd("serverInfo", {}, function (info)
        {
            var s = "Platform: " + info["platform"] + ", version " + info["version"];
            appendTestResult("zeronet", s);

            testPassed("zeronet");
            self.testUserPublickey(self);
        });
        setTimeout(makeTimeout("zeronet"), 2000);
    }

    testUserPublickey (self)
    {
        setTestResult("user-pk", "Testing index = 0 ...");
        self.cmd("userPublickey", {"index": 0}, function (val)
        {
            console.log("Public key", val);
            if(!printError(val, "user-pk"))
            {
                appendTestResult("user-pk", "Public key: " + val);
                testPassed("user-pk");
                self.testEciesEncrypt(self);
            }

        });
        setTimeout(makeTimeout("user-pk"), 3000);
    }

    testEciesEncrypt (self)
    {
        setTestResult("ecies-encrypt", "Testing... return_aes_key = true");

        var eciesPlain = "This is a secret message. " + Math.random();
        appendTestResult("ecies-encrypt", "Plain text: " + eciesPlain);
        self.cmd("eciesEncrypt", {"text": eciesPlain, "return_aes_key": true}, function (val)
        {
            console.log("ECIES encrypt result", val);
            if(!printError(val, "ecies-encrypt"))
            {
                var eciesCipher = val[0];
                var eciesAesKey = val[1]
                appendTestResult("ecies-encrypt", "Cipher text: " + eciesCipher);
                appendTestResult("ecies-encrypt", "AES key: " + eciesAesKey);

                testPassed("ecies-encrypt");
                self.testEciesDecrypt(self, eciesCipher, eciesPlain);
            }
        });
        setTimeout(makeTimeout("ecies-encrypt"), 3000);
    }

    testEciesDecrypt (self, eciesCipher, eciesPlain)
    {
        setTestResult("ecies-decrypt", "Testing... using my private key at index 0.");
        appendTestResult("ecies-decrypt", "Cipher text: " + eciesCipher);
        appendTestResult("ecies-decrypt", "Expected plain text: " + eciesPlain);

        self.cmd("eciesDecrypt", eciesCipher, function (val)
        {
            console.log("ECIES decrypt result", val);
            if(!printError(val, "ecies-decrypt"))
            {
                if(val === eciesPlain)
                {
                    appendTestResult("ecies-decrypt", "Test passed. Got plain text: " + val);
                    testPassed("ecies-decrypt");
                    self.testAesEncrypt(self);
                }
                else
                {
                    appendTestResult("ecies-decrypt", "Plain text mismatch: " + val);
                    testFailed("ecies-decrypt");
                    self.testAesEncrypt(self);
                }
            }
        });
        setTimeout(makeTimeout("ecies-decrypt"), 3000);
    }

    testAesEncrypt (self)
    {
        setTestResult("aes-encrypt", "Testing... using new AES key and IV");

        var secret = "This is another secret message. " + Math.random();
        appendTestResult("aes-encrypt", "Plain text: " + secret);
        self.cmd("aesEncrypt", {"text": secret}, function (val)
        {
            console.log("AES encrypt result", val);
            if(!printError(val, "aes-encrypt"))
            {
                var b64key = val[0];
                var b64iv = val[1];
                var b64cipher = val[2];
                appendTestResult("aes-encrypt", "Key (b64): " + b64key + "\nIV (b64): " + b64iv);
                appendTestResult("aes-encrypt", "Cipher text: " + b64cipher);

                testPassed("aes-encrypt");
                self.testAesDecrypt(self, b64key, b64iv, b64cipher, secret);
            }
        });
        setTimeout(makeTimeout("aes-encrypt"), 3000);
    }

    testAesDecrypt (self, key, iv, cipher, plain)
    {
        setTestResult("aes-decrypt", "Testing...");
        appendTestResult("aes-decrypt", "Cipher text: " + cipher);
        appendTestResult("aes-decrypt", "Expected plain text: " + plain);
        self.cmd("aesDecrypt", [iv, cipher, key], function (val)
        {
            console.log("AES decrypt result", val);
            if(!printError(val, "aes-decrypt"))
            {
                if(val === plain)
                {
                    appendTestResult("aes-decrypt", "Test passed. Got plain text: " + val);
                    testPassed("aes-decrypt");
                }
                else
                {
                    appendTestResult("aes-decrypt", "Plain text mismatch: " + val);
                    testFailed("aes-decrypt");
                }
            }
        });
        setTimeout(makeTimeout("aes-decrypt"), 3000);
    }

}

var sandboxed = (top != self);
if(sandboxed)
{
    setTestResult("js", "JavaScript files were loaded.");
    setTestResult("ws", "Testing...");
    page = new Tests();
    setTimeout(makeTimeout("ws", "There was no response."), 3000);
}
else
{
    setTestResult("js", "This page must be opened in ZeroNet.");
    setRed("js");
}
