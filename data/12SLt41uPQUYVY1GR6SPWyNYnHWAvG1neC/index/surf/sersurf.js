var links = ["/me.zeronetwork.bit/", "/1E6iPAg5TRRKRKd2sr2fzhuvkH58DXiDeY/", "/1N5h8HMhsXskakdcaaLoPniwqmMsRWMXgV/", "/Mail.ZeroNetwork.bit/", "/big.kopykate.bit", "/1tvshuFLkoockzDmvmgmoDoXYe7G6GWxL", "/ZeroPolls.bit/", "/1NJyPoPpL8At17T6G7A1qHVQdqZDBmXcLT", "/13eFkhbXXQcJqd729zRLL9tMxxhz9d4UA6/", "/zerosearch.bit", "/rvre.bit/", "/zirch.bit", "/13EYKqmPpwzBU4iaQq9Y4vfVMgj8dHeLkc/", "/sites.zeronetwork.bit", "/1LtvsjbtQ2tY7SCtCZzC4KhErqEK3bXD4n", "/1Q8j6Yc82EMHk8kHkv8xyX6h2W1GdRTJGf/", "/1ProxyQi6h6cy2gGybQECs2WgxnoEP4Cvr", "/zeroid.bit", "/1MgHVPCE1ve6QfKrgsqCURzRj72HrRWioz/", "/1BZEKfJNT6NGUnjWJ5ensJvYt11ZxtV1nE", "/1KKzUpPB2D533yKaiWA71GX44DUESsRhxU/", "/1uPLoaDwKzP6MCGoVzw48r4pxawRBdmQc/", "/1CiXRY9ATZSoZqBzwMfXEMsKtPRt2aQoF2/", "/1J8rt5k5QPLmAtRw5QAGmgKxi4qC7Lk166/", "/1A6kYPexXbPRLfDD1DK1oiqsBmWdBwun8f/", "/Me.Mkg20001.bit/", "/1JBFNPrAGp1nQX6RsAN6oRqCfvtoeWoion/", "/15CEFKBRHFfAP9rmL6hhLmHoXrrgmw4B5o/"],
tag;
function surfUp() {
window.setTimeout( changeLink, 0);
return true;
}
function changeLink() {
var url = links[Math.floor(Math.random() * links.length)];
tag.href = url;
tag.innerHTML = url;
}