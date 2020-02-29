tor是一个

我的配置文件

Tor\torrc：

```
#使用本地代理连接tor，可以使用ss或者ssr
#Socks5Proxy 127.0.0.1:1080

#设置控制端口，提供给如zeronet程序
ControlPort 9051

#tor节点数据保存目录
DataDirectory ./Data

DirPort 9030
DirReqStatistics 0

#出口策略，拒绝任何出口数据
ExitPolicy reject *:*

#ip位置库
GeoIPFile .\geoip\geoip
GeoIPv6File .\geoip\geoip6

HiddenServiceStatistics 0

#日志输出
Log notice stdout

#监听本地的代理请求
SocksListenAddress 127.0.0.1

#浏览器使用tor代理的时候使用的端口
SocksPort 9050

#####以下内容是tor中继节点需要的，如果不是中继，请不要开启####
#####如果你有自己的服务器，推荐开启tor中继#####
#如果你开启中继服务的时候
Nickname chenjia404

#需要设置端口映射，如果没有设置就不要开。
ORPort 20175

#tor中继平均使用流量速度
RelayBandwidthBurst 10485760 KBytes

#允许突发速度
RelayBandwidthRate 5242880 KBytes

#每一个周期tor中继可用流量
AccountingMax 83 GBytes

#每个周期开始时间，我写的是每天凌晨
AccountingStart day 00:00

#也可以是每个月一次
#AccountingStart month 1 00:00
```

start.bat

```
​​​​​​​@echo off
.\tor\tor.exe -f .\tor\torrc
```

打开start.bat，系统会提示是否允许联网，当然是同意，当进度走到100%就启动成功了。

```
Jul 28 22:49:07.858 [notice] Opening Socks listener on 0.0.0.0:9050
Jul 28 22:49:07.858 [notice] Opening Control listener on 127.0.0.1:9051
Jul 28 22:49:07.859 [notice] Opening Directory listener on 0.0.0.0:9030
Jul 28 22:49:07.000 [notice] Bootstrapped 0%: Starting
Jul 28 22:49:08.000 [notice] Bootstrapped 5%: Connecting to directory server
Jul 28 22:49:08.000 [notice] Bootstrapped 10%: Finishing handshake with directory server
Jul 28 22:49:09.000 [notice] Bootstrapped 15%: Establishing an encrypted directory connection
Jul 28 22:49:09.000 [notice] Bootstrapped 20%: Asking for networkstatus consensus
Jul 28 22:49:10.000 [notice] Bootstrapped 50%: Loading relay descriptors
Jul 28 22:49:53.000 [notice] I learned some more directory information, but not enough to build a circuit: We need more microdescriptors: we have 0/6891, and can only build 45% of likely paths. (We have 79% of guards bw, 78% of midpoint bw, and 73% of exit bw = 45% of path bw.)
Jul 28 22:49:55.000 [notice] Bootstrapped 80%: Connecting to the Tor network
Jul 28 22:49:55.000 [notice] Bootstrapped 85%: Finishing handshake with first hop
Jul 28 22:49:56.000 [notice] Bootstrapped 90%: Establishing a Tor circuit
Jul 28 22:49:58.000 [notice] Tor has successfully opened a circuit. Looks like client functionality is working.
Jul 28 22:49:58.000 [notice] Bootstrapped 100%: Done
```
然后来配置浏览器，浏览器我使用的是SwitchyOmegac插件管理代理，添加一个tor模式，代理协议:SOCKS5 代理服务器:127.0.0.1 代理端口:9050

最后打开https://check.torproject.org/?lang=zh_CN
![](data/img/31/tor.png)