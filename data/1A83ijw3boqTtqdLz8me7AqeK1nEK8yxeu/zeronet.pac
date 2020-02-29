function FindProxyForURL(url, host) {
 if (shExpMatch(host, "*.bit"))
  return "PROXY localhost:43110";
 if (shExpMatch(host, "*.zeroid"))
  return "PROXY localhost:43110";
 if (shExpMatch(url, "*//zero/*"))
  return "PROXY localhost:43110";

 return "DIRECT";
}