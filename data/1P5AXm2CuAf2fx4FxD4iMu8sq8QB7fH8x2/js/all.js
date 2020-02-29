

/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/libs/ZeroFrame.js ---- */


// Version 1.0.0 - Initial release
// Version 1.1.0 (2017-08-02) - Added cmdp function that returns promise instead of using callback
// Version 1.2.0 (2017-08-02) - Added Ajax monkey patch to emulate XMLHttpRequest over ZeroFrame API

const CMD_INNER_READY = 'innerReady'
const CMD_RESPONSE = 'response'
const CMD_WRAPPER_READY = 'wrapperReady'
const CMD_PING = 'ping'
const CMD_PONG = 'pong'
const CMD_WRAPPER_OPENED_WEBSOCKET = 'wrapperOpenedWebsocket'
const CMD_WRAPPER_CLOSE_WEBSOCKET = 'wrapperClosedWebsocket'

class ZeroFrame {
    constructor(url) {
        this.url = url
        this.waiting_cb = {}
        this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1")
        this.connect()
        this.next_message_id = 1
        this.init()
    }

    init() {
        return this
    }

    connect() {
        this.target = window.parent
        window.addEventListener('message', e => this.onMessage(e), false)
        this.cmd(CMD_INNER_READY)
    }

    onMessage(e) {
        let message = e.data
        let cmd = message.cmd
        if (cmd === CMD_RESPONSE) {
            if (this.waiting_cb[message.to] !== undefined) {
                this.waiting_cb[message.to](message.result)
            }
            else {
                this.log("Websocket callback not found:", message)
            }
        } else if (cmd === CMD_WRAPPER_READY) {
            this.cmd(CMD_INNER_READY)
        } else if (cmd === CMD_PING) {
            this.response(message.id, CMD_PONG)
        } else if (cmd === CMD_WRAPPER_OPENED_WEBSOCKET) {
            this.onOpenWebsocket()
        } else if (cmd === CMD_WRAPPER_CLOSE_WEBSOCKET) {
            this.onCloseWebsocket()
        } else {
            this.onRequest(cmd, message)
        }
    }

    onRequest(cmd, message) {
        this.log("Unknown request", message)
    }

    response(to, result) {
        this.send({
            cmd: CMD_RESPONSE,
            to: to,
            result: result
        })
    }

    cmd(cmd, params={}, cb=null) {
        this.send({
            cmd: cmd,
            params: params
        }, cb)
    }

    cmdp(cmd, params={}) {
        return new Promise((resolve, reject) => {
            this.cmd(cmd, params, (res) => {
                if (res && res.error) {
                    reject(res.error)
                } else {
                    resolve(res)
                }
            })
        })
    }

    send(message, cb=null) {
        message.wrapper_nonce = this.wrapper_nonce
        message.id = this.next_message_id
        this.next_message_id++
        this.target.postMessage(message, '*')
        if (cb) {
            this.waiting_cb[message.id] = cb
        }
    }

    log(...args) {
        console.log.apply(console, ['[ZeroFrame]'].concat(args))
    }

    onOpenWebsocket() {
        this.log('Websocket open')
    }

    onCloseWebsocket() {
        this.log('Websocket close')
    }

    monkeyPatchAjax() {
        window.XMLHttpRequest = ZeroFakeXMLHttpRequest
        ZeroFakeXMLHttpRequest.zero_frame = this
    }
}

class ZeroFakeXMLHttpRequest {
    open (method, path) {
        this.path = path
        this.zero_frame = ZeroFakeXMLHttpRequest.zero_frame
    }

    onResult (res) {
        this.status = 200
        this.statusText = "200 OK"
        this.readyState = 4 // Done
        this.responseType = "text"
        this.responseText = this.response = res
        if (this.onload) this.onload()
        if (this.onreadystatechange) this.onreadystatechange()
    }

    setRequestHeader (key, val) {
        return
    }

    getAllResponseHeaders () {
        return ""
    }

    getAllResponseHeaders (name) {
        return null
    }

    send () {
        this.zero_frame.cmd("fileGet", this.path, (res) => this.onResult(res))

    }
}


/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/libs/bitcoin.js ---- */


// https://bitcoinjs.org

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bitcoin=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){function BigInteger(a,b,c){if(!(this instanceof BigInteger))return new BigInteger(a,b,c);if(a!=null){if("number"==typeof a)this.fromNumber(a,b,c);else if(b==null&&"string"!=typeof a)this.fromString(a,256);else this.fromString(a,b)}}var proto=BigInteger.prototype;proto.__bigi=require("../package.json").version;BigInteger.isBigInteger=function(obj,check_ver){return obj&&obj.__bigi&&(!check_ver||obj.__bigi===proto.__bigi)};var dbits;function am1(i,x,w,j,c,n){while(--n>=0){var v=x*this[i++]+w[j]+c;c=Math.floor(v/67108864);w[j++]=v&67108863}return c}function am2(i,x,w,j,c,n){var xl=x&32767,xh=x>>15;while(--n>=0){var l=this[i]&32767;var h=this[i++]>>15;var m=xh*l+h*xl;l=xl*l+((m&32767)<<15)+w[j]+(c&1073741823);c=(l>>>30)+(m>>>15)+xh*h+(c>>>30);w[j++]=l&1073741823}return c}function am3(i,x,w,j,c,n){var xl=x&16383,xh=x>>14;while(--n>=0){var l=this[i]&16383;var h=this[i++]>>14;var m=xh*l+h*xl;l=xl*l+((m&16383)<<14)+w[j]+c;c=(l>>28)+(m>>14)+xh*h;w[j++]=l&268435455}return c}BigInteger.prototype.am=am1;dbits=26;BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=(1<<dbits)-1;var DV=BigInteger.prototype.DV=1<<dbits;var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC=new Array;var rr,vv;rr="0".charCodeAt(0);for(vv=0;vv<=9;++vv)BI_RC[rr++]=vv;rr="a".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;rr="A".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;function int2char(n){return BI_RM.charAt(n)}function intAt(s,i){var c=BI_RC[s.charCodeAt(i)];return c==null?-1:c}function bnpCopyTo(r){for(var i=this.t-1;i>=0;--i)r[i]=this[i];r.t=this.t;r.s=this.s}function bnpFromInt(x){this.t=1;this.s=x<0?-1:0;if(x>0)this[0]=x;else if(x<-1)this[0]=x+DV;else this.t=0}function nbv(i){var r=new BigInteger;r.fromInt(i);return r}function bnpFromString(s,b){var self=this;var k;if(b==16)k=4;else if(b==8)k=3;else if(b==256)k=8;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else{self.fromRadix(s,b);return}self.t=0;self.s=0;var i=s.length,mi=false,sh=0;while(--i>=0){var x=k==8?s[i]&255:intAt(s,i);if(x<0){if(s.charAt(i)=="-")mi=true;continue}mi=false;if(sh==0)self[self.t++]=x;else if(sh+k>self.DB){self[self.t-1]|=(x&(1<<self.DB-sh)-1)<<sh;self[self.t++]=x>>self.DB-sh}else self[self.t-1]|=x<<sh;sh+=k;if(sh>=self.DB)sh-=self.DB}if(k==8&&(s[0]&128)!=0){self.s=-1;if(sh>0)self[self.t-1]|=(1<<self.DB-sh)-1<<sh}self.clamp();if(mi)BigInteger.ZERO.subTo(self,self)}function bnpClamp(){var c=this.s&this.DM;while(this.t>0&&this[this.t-1]==c)--this.t}function bnToString(b){var self=this;if(self.s<0)return"-"+self.negate().toString(b);var k;if(b==16)k=4;else if(b==8)k=3;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else return self.toRadix(b);var km=(1<<k)-1,d,m=false,r="",i=self.t;var p=self.DB-i*self.DB%k;if(i-- >0){if(p<self.DB&&(d=self[i]>>p)>0){m=true;r=int2char(d)}while(i>=0){if(p<k){d=(self[i]&(1<<p)-1)<<k-p;d|=self[--i]>>(p+=self.DB-k)}else{d=self[i]>>(p-=k)&km;if(p<=0){p+=self.DB;--i}}if(d>0)m=true;if(m)r+=int2char(d)}}return m?r:"0"}function bnNegate(){var r=new BigInteger;BigInteger.ZERO.subTo(this,r);return r}function bnAbs(){return this.s<0?this.negate():this}function bnCompareTo(a){var r=this.s-a.s;if(r!=0)return r;var i=this.t;r=i-a.t;if(r!=0)return this.s<0?-r:r;while(--i>=0)if((r=this[i]-a[i])!=0)return r;return 0}function nbits(x){var r=1,t;if((t=x>>>16)!=0){x=t;r+=16}if((t=x>>8)!=0){x=t;r+=8}if((t=x>>4)!=0){x=t;r+=4}if((t=x>>2)!=0){x=t;r+=2}if((t=x>>1)!=0){x=t;r+=1}return r}function bnBitLength(){if(this.t<=0)return 0;return this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)}function bnByteLength(){return this.bitLength()>>3}function bnpDLShiftTo(n,r){var i;for(i=this.t-1;i>=0;--i)r[i+n]=this[i];for(i=n-1;i>=0;--i)r[i]=0;r.t=this.t+n;r.s=this.s}function bnpDRShiftTo(n,r){for(var i=n;i<this.t;++i)r[i-n]=this[i];r.t=Math.max(this.t-n,0);r.s=this.s}function bnpLShiftTo(n,r){var self=this;var bs=n%self.DB;var cbs=self.DB-bs;var bm=(1<<cbs)-1;var ds=Math.floor(n/self.DB),c=self.s<<bs&self.DM,i;for(i=self.t-1;i>=0;--i){r[i+ds+1]=self[i]>>cbs|c;c=(self[i]&bm)<<bs}for(i=ds-1;i>=0;--i)r[i]=0;r[ds]=c;r.t=self.t+ds+1;r.s=self.s;r.clamp()}function bnpRShiftTo(n,r){var self=this;r.s=self.s;var ds=Math.floor(n/self.DB);if(ds>=self.t){r.t=0;return}var bs=n%self.DB;var cbs=self.DB-bs;var bm=(1<<bs)-1;r[0]=self[ds]>>bs;for(var i=ds+1;i<self.t;++i){r[i-ds-1]|=(self[i]&bm)<<cbs;r[i-ds]=self[i]>>bs}if(bs>0)r[self.t-ds-1]|=(self.s&bm)<<cbs;r.t=self.t-ds;r.clamp()}function bnpSubTo(a,r){var self=this;var i=0,c=0,m=Math.min(a.t,self.t);while(i<m){c+=self[i]-a[i];r[i++]=c&self.DM;c>>=self.DB}if(a.t<self.t){c-=a.s;while(i<self.t){c+=self[i];r[i++]=c&self.DM;c>>=self.DB}c+=self.s}else{c+=self.s;while(i<a.t){c-=a[i];r[i++]=c&self.DM;c>>=self.DB}c-=a.s}r.s=c<0?-1:0;if(c<-1)r[i++]=self.DV+c;else if(c>0)r[i++]=c;r.t=i;r.clamp()}function bnpMultiplyTo(a,r){var x=this.abs(),y=a.abs();var i=x.t;r.t=i+y.t;while(--i>=0)r[i]=0;for(i=0;i<y.t;++i)r[i+x.t]=x.am(0,y[i],r,i,0,x.t);r.s=0;r.clamp();if(this.s!=a.s)BigInteger.ZERO.subTo(r,r)}function bnpSquareTo(r){var x=this.abs();var i=r.t=2*x.t;while(--i>=0)r[i]=0;for(i=0;i<x.t-1;++i){var c=x.am(i,x[i],r,2*i,0,1);if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.DV){r[i+x.t]-=x.DV;r[i+x.t+1]=1}}if(r.t>0)r[r.t-1]+=x.am(i,x[i],r,2*i,0,1);r.s=0;r.clamp()}function bnpDivRemTo(m,q,r){var self=this;var pm=m.abs();if(pm.t<=0)return;var pt=self.abs();if(pt.t<pm.t){if(q!=null)q.fromInt(0);if(r!=null)self.copyTo(r);return}if(r==null)r=new BigInteger;var y=new BigInteger,ts=self.s,ms=m.s;var nsh=self.DB-nbits(pm[pm.t-1]);if(nsh>0){pm.lShiftTo(nsh,y);pt.lShiftTo(nsh,r)}else{pm.copyTo(y);pt.copyTo(r)}var ys=y.t;var y0=y[ys-1];if(y0==0)return;var yt=y0*(1<<self.F1)+(ys>1?y[ys-2]>>self.F2:0);var d1=self.FV/yt,d2=(1<<self.F1)/yt,e=1<<self.F2;var i=r.t,j=i-ys,t=q==null?new BigInteger:q;y.dlShiftTo(j,t);if(r.compareTo(t)>=0){r[r.t++]=1;r.subTo(t,r)}BigInteger.ONE.dlShiftTo(ys,t);t.subTo(y,y);while(y.t<ys)y[y.t++]=0;while(--j>=0){var qd=r[--i]==y0?self.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);if((r[i]+=y.am(0,qd,r,j,0,ys))<qd){y.dlShiftTo(j,t);r.subTo(t,r);while(r[i]<--qd)r.subTo(t,r)}}if(q!=null){r.drShiftTo(ys,q);if(ts!=ms)BigInteger.ZERO.subTo(q,q)}r.t=ys;r.clamp();if(nsh>0)r.rShiftTo(nsh,r);if(ts<0)BigInteger.ZERO.subTo(r,r)}function bnMod(a){var r=new BigInteger;this.abs().divRemTo(a,null,r);if(this.s<0&&r.compareTo(BigInteger.ZERO)>0)a.subTo(r,r);return r}function Classic(m){this.m=m}function cConvert(x){if(x.s<0||x.compareTo(this.m)>=0)return x.mod(this.m);else return x}function cRevert(x){return x}function cReduce(x){x.divRemTo(this.m,null,x)}function cMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r)}function cSqrTo(x,r){x.squareTo(r);this.reduce(r)}Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;function bnpInvDigit(){if(this.t<1)return 0;var x=this[0];if((x&1)==0)return 0;var y=x&3;y=y*(2-(x&15)*y)&15;y=y*(2-(x&255)*y)&255;y=y*(2-((x&65535)*y&65535))&65535;y=y*(2-x*y%this.DV)%this.DV;return y>0?this.DV-y:-y}function Montgomery(m){this.m=m;this.mp=m.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<m.DB-15)-1;this.mt2=2*m.t}function montConvert(x){var r=new BigInteger;x.abs().dlShiftTo(this.m.t,r);r.divRemTo(this.m,null,r);if(x.s<0&&r.compareTo(BigInteger.ZERO)>0)this.m.subTo(r,r);return r}function montRevert(x){var r=new BigInteger;x.copyTo(r);this.reduce(r);return r}function montReduce(x){while(x.t<=this.mt2)x[x.t++]=0;for(var i=0;i<this.m.t;++i){var j=x[i]&32767;var u0=j*this.mpl+((j*this.mph+(x[i]>>15)*this.mpl&this.um)<<15)&x.DM;j=i+this.m.t;x[j]+=this.m.am(0,u0,x,i,0,this.m.t);while(x[j]>=x.DV){x[j]-=x.DV;x[++j]++}}x.clamp();x.drShiftTo(this.m.t,x);if(x.compareTo(this.m)>=0)x.subTo(this.m,x)}function montSqrTo(x,r){x.squareTo(r);this.reduce(r)}function montMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r)}Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return(this.t>0?this[0]&1:this.s)==0}function bnpExp(e,z){if(e>4294967295||e<1)return BigInteger.ONE;var r=new BigInteger,r2=new BigInteger,g=z.convert(this),i=nbits(e)-1;g.copyTo(r);while(--i>=0){z.sqrTo(r,r2);if((e&1<<i)>0)z.mulTo(r2,g,r);else{var t=r;r=r2;r2=t}}return z.revert(r)}function bnModPowInt(e,m){var z;if(e<256||m.isEven())z=new Classic(m);else z=new Montgomery(m);return this.exp(e,z)}proto.copyTo=bnpCopyTo;proto.fromInt=bnpFromInt;proto.fromString=bnpFromString;proto.clamp=bnpClamp;proto.dlShiftTo=bnpDLShiftTo;proto.drShiftTo=bnpDRShiftTo;proto.lShiftTo=bnpLShiftTo;proto.rShiftTo=bnpRShiftTo;proto.subTo=bnpSubTo;proto.multiplyTo=bnpMultiplyTo;proto.squareTo=bnpSquareTo;proto.divRemTo=bnpDivRemTo;proto.invDigit=bnpInvDigit;proto.isEven=bnpIsEven;proto.exp=bnpExp;proto.toString=bnToString;proto.negate=bnNegate;proto.abs=bnAbs;proto.compareTo=bnCompareTo;proto.bitLength=bnBitLength;proto.byteLength=bnByteLength;proto.mod=bnMod;proto.modPowInt=bnModPowInt;function bnClone(){var r=new BigInteger;this.copyTo(r);return r}function bnIntValue(){if(this.s<0){if(this.t==1)return this[0]-this.DV;else if(this.t==0)return-1}else if(this.t==1)return this[0];else if(this.t==0)return 0;return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]}function bnByteValue(){return this.t==0?this.s:this[0]<<24>>24}function bnShortValue(){return this.t==0?this.s:this[0]<<16>>16}function bnpChunkSize(r){return Math.floor(Math.LN2*this.DB/Math.log(r))}function bnSigNum(){if(this.s<0)return-1;else if(this.t<=0||this.t==1&&this[0]<=0)return 0;else return 1}function bnpToRadix(b){if(b==null)b=10;if(this.signum()==0||b<2||b>36)return"0";var cs=this.chunkSize(b);var a=Math.pow(b,cs);var d=nbv(a),y=new BigInteger,z=new BigInteger,r="";this.divRemTo(d,y,z);while(y.signum()>0){r=(a+z.intValue()).toString(b).substr(1)+r;y.divRemTo(d,y,z)}return z.intValue().toString(b)+r}function bnpFromRadix(s,b){var self=this;self.fromInt(0);if(b==null)b=10;var cs=self.chunkSize(b);var d=Math.pow(b,cs),mi=false,j=0,w=0;for(var i=0;i<s.length;++i){var x=intAt(s,i);if(x<0){if(s.charAt(i)=="-"&&self.signum()==0)mi=true;continue}w=b*w+x;if(++j>=cs){self.dMultiply(d);self.dAddOffset(w,0);j=0;w=0}}if(j>0){self.dMultiply(Math.pow(b,j));self.dAddOffset(w,0)}if(mi)BigInteger.ZERO.subTo(self,self)}function bnpFromNumber(a,b,c){var self=this;if("number"==typeof b){if(a<2)self.fromInt(1);else{self.fromNumber(a,c);if(!self.testBit(a-1))self.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,self);if(self.isEven())self.dAddOffset(1,0);while(!self.isProbablePrime(b)){self.dAddOffset(2,0);if(self.bitLength()>a)self.subTo(BigInteger.ONE.shiftLeft(a-1),self)}}}else{var x=new Array,t=a&7;x.length=(a>>3)+1;b.nextBytes(x);if(t>0)x[0]&=(1<<t)-1;else x[0]=0;self.fromString(x,256)}}function bnToByteArray(){var self=this;var i=self.t,r=new Array;r[0]=self.s;var p=self.DB-i*self.DB%8,d,k=0;if(i-- >0){if(p<self.DB&&(d=self[i]>>p)!=(self.s&self.DM)>>p)r[k++]=d|self.s<<self.DB-p;while(i>=0){if(p<8){d=(self[i]&(1<<p)-1)<<8-p;d|=self[--i]>>(p+=self.DB-8)}else{d=self[i]>>(p-=8)&255;if(p<=0){p+=self.DB;--i}}if((d&128)!=0)d|=-256;if(k===0&&(self.s&128)!=(d&128))++k;if(k>0||d!=self.s)r[k++]=d}}return r}function bnEquals(a){return this.compareTo(a)==0}function bnMin(a){return this.compareTo(a)<0?this:a}function bnMax(a){return this.compareTo(a)>0?this:a}function bnpBitwiseTo(a,op,r){var self=this;var i,f,m=Math.min(a.t,self.t);for(i=0;i<m;++i)r[i]=op(self[i],a[i]);if(a.t<self.t){f=a.s&self.DM;for(i=m;i<self.t;++i)r[i]=op(self[i],f);r.t=self.t}else{f=self.s&self.DM;for(i=m;i<a.t;++i)r[i]=op(f,a[i]);r.t=a.t}r.s=op(self.s,a.s);r.clamp()}function op_and(x,y){return x&y}function bnAnd(a){var r=new BigInteger;this.bitwiseTo(a,op_and,r);return r}function op_or(x,y){return x|y}function bnOr(a){var r=new BigInteger;this.bitwiseTo(a,op_or,r);return r}function op_xor(x,y){return x^y}function bnXor(a){var r=new BigInteger;this.bitwiseTo(a,op_xor,r);return r}function op_andnot(x,y){return x&~y}function bnAndNot(a){var r=new BigInteger;this.bitwiseTo(a,op_andnot,r);return r}function bnNot(){var r=new BigInteger;for(var i=0;i<this.t;++i)r[i]=this.DM&~this[i];r.t=this.t;r.s=~this.s;return r}function bnShiftLeft(n){var r=new BigInteger;if(n<0)this.rShiftTo(-n,r);else this.lShiftTo(n,r);return r}function bnShiftRight(n){var r=new BigInteger;if(n<0)this.lShiftTo(-n,r);else this.rShiftTo(n,r);return r}function lbit(x){if(x==0)return-1;var r=0;if((x&65535)==0){x>>=16;r+=16}if((x&255)==0){x>>=8;r+=8}if((x&15)==0){x>>=4;r+=4}if((x&3)==0){x>>=2;r+=2}if((x&1)==0)++r;return r}function bnGetLowestSetBit(){for(var i=0;i<this.t;++i)if(this[i]!=0)return i*this.DB+lbit(this[i]);if(this.s<0)return this.t*this.DB;return-1}function cbit(x){var r=0;while(x!=0){x&=x-1;++r}return r}function bnBitCount(){var r=0,x=this.s&this.DM;for(var i=0;i<this.t;++i)r+=cbit(this[i]^x);return r}function bnTestBit(n){var j=Math.floor(n/this.DB);if(j>=this.t)return this.s!=0;return(this[j]&1<<n%this.DB)!=0}function bnpChangeBit(n,op){var r=BigInteger.ONE.shiftLeft(n);this.bitwiseTo(r,op,r);return r}function bnSetBit(n){return this.changeBit(n,op_or)}function bnClearBit(n){return this.changeBit(n,op_andnot)}function bnFlipBit(n){return this.changeBit(n,op_xor)}function bnpAddTo(a,r){var self=this;var i=0,c=0,m=Math.min(a.t,self.t);while(i<m){c+=self[i]+a[i];r[i++]=c&self.DM;c>>=self.DB}if(a.t<self.t){c+=a.s;while(i<self.t){c+=self[i];r[i++]=c&self.DM;c>>=self.DB}c+=self.s}else{c+=self.s;while(i<a.t){c+=a[i];r[i++]=c&self.DM;c>>=self.DB}c+=a.s}r.s=c<0?-1:0;if(c>0)r[i++]=c;else if(c<-1)r[i++]=self.DV+c;r.t=i;r.clamp()}function bnAdd(a){var r=new BigInteger;this.addTo(a,r);return r}function bnSubtract(a){var r=new BigInteger;this.subTo(a,r);return r}function bnMultiply(a){var r=new BigInteger;this.multiplyTo(a,r);return r}function bnSquare(){var r=new BigInteger;this.squareTo(r);return r}function bnDivide(a){var r=new BigInteger;this.divRemTo(a,r,null);return r}function bnRemainder(a){var r=new BigInteger;this.divRemTo(a,null,r);return r}function bnDivideAndRemainder(a){var q=new BigInteger,r=new BigInteger;this.divRemTo(a,q,r);return new Array(q,r)}function bnpDMultiply(n){this[this.t]=this.am(0,n-1,this,0,0,this.t);++this.t;this.clamp()}function bnpDAddOffset(n,w){if(n==0)return;while(this.t<=w)this[this.t++]=0;this[w]+=n;while(this[w]>=this.DV){this[w]-=this.DV;if(++w>=this.t)this[this.t++]=0;++this[w]}}function NullExp(){}function nNop(x){return x}function nMulTo(x,y,r){x.multiplyTo(y,r)}function nSqrTo(x,r){x.squareTo(r)}NullExp.prototype.convert=nNop;NullExp.prototype.revert=nNop;NullExp.prototype.mulTo=nMulTo;NullExp.prototype.sqrTo=nSqrTo;function bnPow(e){return this.exp(e,new NullExp)}function bnpMultiplyLowerTo(a,n,r){var i=Math.min(this.t+a.t,n);r.s=0;r.t=i;while(i>0)r[--i]=0;var j;for(j=r.t-this.t;i<j;++i)r[i+this.t]=this.am(0,a[i],r,i,0,this.t);for(j=Math.min(a.t,n);i<j;++i)this.am(0,a[i],r,i,0,n-i);r.clamp()}function bnpMultiplyUpperTo(a,n,r){--n;var i=r.t=this.t+a.t-n;r.s=0;while(--i>=0)r[i]=0;for(i=Math.max(n-this.t,0);i<a.t;++i)r[this.t+i-n]=this.am(n-i,a[i],r,0,0,this.t+i-n);r.clamp();r.drShiftTo(1,r)}function Barrett(m){this.r2=new BigInteger;this.q3=new BigInteger;BigInteger.ONE.dlShiftTo(2*m.t,this.r2);this.mu=this.r2.divide(m);this.m=m}function barrettConvert(x){if(x.s<0||x.t>2*this.m.t)return x.mod(this.m);else if(x.compareTo(this.m)<0)return x;else{var r=new BigInteger;x.copyTo(r);this.reduce(r);return r}}function barrettRevert(x){return x}function barrettReduce(x){var self=this;x.drShiftTo(self.m.t-1,self.r2);if(x.t>self.m.t+1){x.t=self.m.t+1;x.clamp()}self.mu.multiplyUpperTo(self.r2,self.m.t+1,self.q3);self.m.multiplyLowerTo(self.q3,self.m.t+1,self.r2);while(x.compareTo(self.r2)<0)x.dAddOffset(1,self.m.t+1);x.subTo(self.r2,x);while(x.compareTo(self.m)>=0)x.subTo(self.m,x)}function barrettSqrTo(x,r){x.squareTo(r);this.reduce(r)}function barrettMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r)}Barrett.prototype.convert=barrettConvert;Barrett.prototype.revert=barrettRevert;Barrett.prototype.reduce=barrettReduce;Barrett.prototype.mulTo=barrettMulTo;Barrett.prototype.sqrTo=barrettSqrTo;function bnModPow(e,m){var i=e.bitLength(),k,r=nbv(1),z;if(i<=0)return r;else if(i<18)k=1;else if(i<48)k=3;else if(i<144)k=4;else if(i<768)k=5;else k=6;if(i<8)z=new Classic(m);else if(m.isEven())z=new Barrett(m);else z=new Montgomery(m);var g=new Array,n=3,k1=k-1,km=(1<<k)-1;g[1]=z.convert(this);if(k>1){var g2=new BigInteger;z.sqrTo(g[1],g2);while(n<=km){g[n]=new BigInteger;z.mulTo(g2,g[n-2],g[n]);n+=2}}var j=e.t-1,w,is1=true,r2=new BigInteger,t;i=nbits(e[j])-1;while(j>=0){if(i>=k1)w=e[j]>>i-k1&km;else{w=(e[j]&(1<<i+1)-1)<<k1-i;if(j>0)w|=e[j-1]>>this.DB+i-k1}n=k;while((w&1)==0){w>>=1;--n}if((i-=n)<0){i+=this.DB;--j}if(is1){g[w].copyTo(r);is1=false}else{while(n>1){z.sqrTo(r,r2);z.sqrTo(r2,r);n-=2}if(n>0)z.sqrTo(r,r2);else{t=r;r=r2;r2=t}z.mulTo(r2,g[w],r)}while(j>=0&&(e[j]&1<<i)==0){z.sqrTo(r,r2);t=r;r=r2;r2=t;if(--i<0){i=this.DB-1;--j}}}return z.revert(r)}function bnGCD(a){var x=this.s<0?this.negate():this.clone();var y=a.s<0?a.negate():a.clone();if(x.compareTo(y)<0){var t=x;x=y;y=t}var i=x.getLowestSetBit(),g=y.getLowestSetBit();if(g<0)return x;if(i<g)g=i;if(g>0){x.rShiftTo(g,x);y.rShiftTo(g,y)}while(x.signum()>0){if((i=x.getLowestSetBit())>0)x.rShiftTo(i,x);if((i=y.getLowestSetBit())>0)y.rShiftTo(i,y);if(x.compareTo(y)>=0){x.subTo(y,x);x.rShiftTo(1,x)}else{y.subTo(x,y);y.rShiftTo(1,y)}}if(g>0)y.lShiftTo(g,y);return y}function bnpModInt(n){if(n<=0)return 0;var d=this.DV%n,r=this.s<0?n-1:0;if(this.t>0)if(d==0)r=this[0]%n;else for(var i=this.t-1;i>=0;--i)r=(d*r+this[i])%n;return r}function bnModInverse(m){var ac=m.isEven();if(this.signum()===0)throw new Error("division by zero");if(this.isEven()&&ac||m.signum()==0)return BigInteger.ZERO;var u=m.clone(),v=this.clone();var a=nbv(1),b=nbv(0),c=nbv(0),d=nbv(1);while(u.signum()!=0){while(u.isEven()){u.rShiftTo(1,u);if(ac){if(!a.isEven()||!b.isEven()){a.addTo(this,a);b.subTo(m,b)}a.rShiftTo(1,a)}else if(!b.isEven())b.subTo(m,b);b.rShiftTo(1,b)}while(v.isEven()){v.rShiftTo(1,v);if(ac){if(!c.isEven()||!d.isEven()){c.addTo(this,c);d.subTo(m,d)}c.rShiftTo(1,c)}else if(!d.isEven())d.subTo(m,d);d.rShiftTo(1,d)}if(u.compareTo(v)>=0){u.subTo(v,u);if(ac)a.subTo(c,a);b.subTo(d,b)}else{v.subTo(u,v);if(ac)c.subTo(a,c);d.subTo(b,d)}}if(v.compareTo(BigInteger.ONE)!=0)return BigInteger.ZERO;if(d.compareTo(m)>=0)return d.subtract(m);if(d.signum()<0)d.addTo(m,d);else return d;if(d.signum()<0)return d.add(m);else return d}var lowprimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];var lplim=(1<<26)/lowprimes[lowprimes.length-1];function bnIsProbablePrime(t){var i,x=this.abs();if(x.t==1&&x[0]<=lowprimes[lowprimes.length-1]){for(i=0;i<lowprimes.length;++i)if(x[0]==lowprimes[i])return true;return false}if(x.isEven())return false;i=1;while(i<lowprimes.length){var m=lowprimes[i],j=i+1;while(j<lowprimes.length&&m<lplim)m*=lowprimes[j++];m=x.modInt(m);while(i<j)if(m%lowprimes[i++]==0)return false}return x.millerRabin(t)}function bnpMillerRabin(t){var n1=this.subtract(BigInteger.ONE);var k=n1.getLowestSetBit();if(k<=0)return false;var r=n1.shiftRight(k);t=t+1>>1;if(t>lowprimes.length)t=lowprimes.length;var a=new BigInteger(null);var j,bases=[];for(var i=0;i<t;++i){for(;;){j=lowprimes[Math.floor(Math.random()*lowprimes.length)];if(bases.indexOf(j)==-1)break}bases.push(j);a.fromInt(j);var y=a.modPow(r,this);if(y.compareTo(BigInteger.ONE)!=0&&y.compareTo(n1)!=0){var j=1;while(j++<k&&y.compareTo(n1)!=0){y=y.modPowInt(2,this);if(y.compareTo(BigInteger.ONE)==0)return false}if(y.compareTo(n1)!=0)return false}}return true}proto.chunkSize=bnpChunkSize;proto.toRadix=bnpToRadix;proto.fromRadix=bnpFromRadix;proto.fromNumber=bnpFromNumber;proto.bitwiseTo=bnpBitwiseTo;proto.changeBit=bnpChangeBit;proto.addTo=bnpAddTo;proto.dMultiply=bnpDMultiply;proto.dAddOffset=bnpDAddOffset;proto.multiplyLowerTo=bnpMultiplyLowerTo;proto.multiplyUpperTo=bnpMultiplyUpperTo;proto.modInt=bnpModInt;proto.millerRabin=bnpMillerRabin;proto.clone=bnClone;proto.intValue=bnIntValue;proto.byteValue=bnByteValue;proto.shortValue=bnShortValue;proto.signum=bnSigNum;proto.toByteArray=bnToByteArray;proto.equals=bnEquals;proto.min=bnMin;proto.max=bnMax;proto.and=bnAnd;proto.or=bnOr;proto.xor=bnXor;proto.andNot=bnAndNot;proto.not=bnNot;proto.shiftLeft=bnShiftLeft;proto.shiftRight=bnShiftRight;proto.getLowestSetBit=bnGetLowestSetBit;proto.bitCount=bnBitCount;proto.testBit=bnTestBit;proto.setBit=bnSetBit;proto.clearBit=bnClearBit;proto.flipBit=bnFlipBit;proto.add=bnAdd;proto.subtract=bnSubtract;proto.multiply=bnMultiply;proto.divide=bnDivide;proto.remainder=bnRemainder;proto.divideAndRemainder=bnDivideAndRemainder;proto.modPow=bnModPow;proto.modInverse=bnModInverse;proto.pow=bnPow;proto.gcd=bnGCD;proto.isProbablePrime=bnIsProbablePrime;proto.square=bnSquare;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);BigInteger.valueOf=nbv;module.exports=BigInteger},{"../package.json":4}],2:[function(require,module,exports){(function(Buffer){var assert=require("assert");var BigInteger=require("./bigi");BigInteger.fromByteArrayUnsigned=function(byteArray){if(byteArray[0]&128){return new BigInteger([0].concat(byteArray))}return new BigInteger(byteArray)};BigInteger.prototype.toByteArrayUnsigned=function(){var byteArray=this.toByteArray();return byteArray[0]===0?byteArray.slice(1):byteArray};BigInteger.fromDERInteger=function(byteArray){return new BigInteger(byteArray)};BigInteger.prototype.toDERInteger=BigInteger.prototype.toByteArray;BigInteger.fromBuffer=function(buffer){if(buffer[0]&128){var byteArray=Array.prototype.slice.call(buffer);return new BigInteger([0].concat(byteArray))}return new BigInteger(buffer)};BigInteger.fromHex=function(hex){if(hex==="")return BigInteger.ZERO;assert.equal(hex,hex.match(/^[A-Fa-f0-9]+/),"Invalid hex string");assert.equal(hex.length%2,0,"Incomplete hex");return new BigInteger(hex,16)};BigInteger.prototype.toBuffer=function(size){var byteArray=this.toByteArrayUnsigned();var zeros=[];var padding=size-byteArray.length;while(zeros.length<padding)zeros.push(0);return new Buffer(zeros.concat(byteArray))};BigInteger.prototype.toHex=function(size){return this.toBuffer(size).toString("hex")}}).call(this,require("buffer").Buffer)},{"./bigi":1,assert:50,buffer:53}],3:[function(require,module,exports){var BigInteger=require("./bigi");require("./convert");module.exports=BigInteger},{"./bigi":1,"./convert":2}],4:[function(require,module,exports){module.exports={_args:[["bigi@^1.4.0","/usr/lib/node_modules/bitcoinjs-lib"]],_from:"bigi@>=1.4.0 <2.0.0",_id:"bigi@1.4.1",_inCache:true,_installable:true,_location:"/bitcoinjs-lib/bigi",_nodeVersion:"2.1.0",_npmUser:{email:"jprichardson@gmail.com",name:"jprichardson"},_npmVersion:"2.10.1",_phantomChildren:{},_requested:{name:"bigi",raw:"bigi@^1.4.0",rawSpec:"^1.4.0",scope:null,spec:">=1.4.0 <2.0.0",type:"range"},_requiredBy:["/bitcoinjs-lib","/bitcoinjs-lib/ecurve"],_resolved:"https://registry.npmjs.org/bigi/-/bigi-1.4.1.tgz",_shasum:"726e8ab08d1fe1dfb8aa6bb6309bffecf93a21b7",_shrinkwrap:null,_spec:"bigi@^1.4.0",_where:"/usr/lib/node_modules/bitcoinjs-lib",bugs:{url:"https://github.com/cryptocoinjs/bigi/issues"},dependencies:{},description:"Big integers.",devDependencies:{coveralls:"^2.11.2",istanbul:"^0.3.5",jshint:"^2.5.1",mocha:"^2.1.0",mochify:"^2.1.0"},directories:{},dist:{shasum:"726e8ab08d1fe1dfb8aa6bb6309bffecf93a21b7",tarball:"http://registry.npmjs.org/bigi/-/bigi-1.4.1.tgz"},gitHead:"7d034a1b38ca90f68daa9de472dda2fb813836f1",homepage:"https://github.com/cryptocoinjs/bigi#readme",keywords:["cryptography","math","bitcoin","arbitrary","precision","arithmetic","big","integer","int","number","biginteger","bigint","bignumber","decimal","float"],main:"./lib/index.js",maintainers:[{email:"boydb@midnightdesign.ws",name:"midnightlightning"},{email:"sidazhang89@gmail.com",name:"sidazhang"},{email:"npm@shesek.info",name:"nadav"},{email:"jprichardson@gmail.com",name:"jprichardson"}],name:"bigi",optionalDependencies:{},readme:"ERROR: No README data found!",repository:{type:"git",url:"git+https://github.com/cryptocoinjs/bigi.git"},scripts:{"browser-test":"mochify --wd -R spec",coverage:"istanbul cover ./node_modules/.bin/_mocha -- --reporter list test/*.js",coveralls:"npm run-script coverage && node ./node_modules/.bin/coveralls < coverage/lcov.info",jshint:"jshint --config jshint.json lib/*.js ; true",test:"_mocha -- test/*.js",unit:"mocha"},testling:{browsers:["ie/9..latest","firefox/latest","chrome/latest","safari/6.0..latest","iphone/6.0..latest","android-browser/4.2..latest"],files:"test/*.js",harness:"mocha"},version:"1.4.1"}},{}],5:[function(require,module,exports){(function(Buffer){function check(buffer){if(buffer.length<8)return false;if(buffer.length>72)return false;if(buffer[0]!==48)return false;if(buffer[1]!==buffer.length-2)return false;if(buffer[2]!==2)return false;var lenR=buffer[3];if(lenR===0)return false;if(5+lenR>=buffer.length)return false;if(buffer[4+lenR]!==2)return false;var lenS=buffer[5+lenR];if(lenS===0)return false;if(6+lenR+lenS!==buffer.length)return false;if(buffer[4]&128)return false;if(lenR>1&&buffer[4]===0&&!(buffer[5]&128))return false;if(buffer[lenR+6]&128)return false;if(lenS>1&&buffer[lenR+6]===0&&!(buffer[lenR+7]&128))return false;return true}function decode(buffer){if(buffer.length<8)throw new Error("DER sequence length is too short");if(buffer.length>72)throw new Error("DER sequence length is too long");if(buffer[0]!==48)throw new Error("Expected DER sequence");if(buffer[1]!==buffer.length-2)throw new Error("DER sequence length is invalid");if(buffer[2]!==2)throw new Error("Expected DER integer");var lenR=buffer[3];if(lenR===0)throw new Error("R length is zero");if(5+lenR>=buffer.length)throw new Error("R length is too long");if(buffer[4+lenR]!==2)throw new Error("Expected DER integer (2)");var lenS=buffer[5+lenR];if(lenS===0)throw new Error("S length is zero");if(6+lenR+lenS!==buffer.length)throw new Error("S length is invalid");if(buffer[4]&128)throw new Error("R value is negative");if(lenR>1&&buffer[4]===0&&!(buffer[5]&128))throw new Error("R value excessively padded");if(buffer[lenR+6]&128)throw new Error("S value is negative");if(lenS>1&&buffer[lenR+6]===0&&!(buffer[lenR+7]&128))throw new Error("S value excessively padded");return{r:buffer.slice(4,4+lenR),s:buffer.slice(6+lenR)}}function encode(r,s){var lenR=r.length;var lenS=s.length;if(lenR===0)throw new Error("R length is zero");if(lenS===0)throw new Error("S length is zero");if(lenR>33)throw new Error("R length is too long");if(lenS>33)throw new Error("S length is too long");if(r[0]&128)throw new Error("R value is negative");if(s[0]&128)throw new Error("S value is negative");if(lenR>1&&r[0]===0&&!(r[1]&128))throw new Error("R value excessively padded");if(lenS>1&&s[0]===0&&!(s[1]&128))throw new Error("S value excessively padded");var signature=new Buffer(6+lenR+lenS);signature[0]=48;signature[1]=signature.length-2;signature[2]=2;signature[3]=r.length;r.copy(signature,4);signature[4+lenR]=2;signature[5+lenR]=s.length;s.copy(signature,6+lenR);return signature}module.exports={check:check,decode:decode,encode:encode}}).call(this,require("buffer").Buffer)},{buffer:53}],6:[function(require,module,exports){var ALPHABET="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";var ALPHABET_MAP={};for(var i=0;i<ALPHABET.length;i++){ALPHABET_MAP[ALPHABET.charAt(i)]=i}var BASE=58;function encode(buffer){if(buffer.length===0)return"";var i,j,digits=[0];for(i=0;i<buffer.length;i++){for(j=0;j<digits.length;j++)digits[j]<<=8;digits[0]+=buffer[i];var carry=0;for(j=0;j<digits.length;++j){digits[j]+=carry;carry=digits[j]/BASE|0;digits[j]%=BASE}while(carry){digits.push(carry%BASE);carry=carry/BASE|0}}for(i=0;buffer[i]===0&&i<buffer.length-1;i++)digits.push(0);var stringOutput="";for(var i=digits.length-1;i>=0;i--){stringOutput=stringOutput+ALPHABET[digits[i]]}return stringOutput}function decode(string){if(string.length===0)return[];var i,j,bytes=[0];for(i=0;i<string.length;i++){var c=string[i];if(!(c in ALPHABET_MAP))throw new Error("Non-base58 character");for(j=0;j<bytes.length;j++)bytes[j]*=BASE;bytes[0]+=ALPHABET_MAP[c];var carry=0;for(j=0;j<bytes.length;++j){bytes[j]+=carry;carry=bytes[j]>>8;bytes[j]&=255}while(carry){bytes.push(carry&255);carry>>=8}}for(i=0;string[i]==="1"&&i<string.length-1;i++)bytes.push(0);return bytes.reverse()}module.exports={encode:encode,decode:decode}},{}],7:[function(require,module,exports){(function(Buffer){"use strict";var base58=require("bs58");var createHash=require("create-hash");function sha256x2(buffer){var tmp=createHash("sha256").update(buffer).digest();return createHash("sha256").update(tmp).digest()}function encode(payload){var checksum=sha256x2(payload);return base58.encode(Buffer.concat([payload,checksum],payload.length+4))}function decode(string){var buffer=new Buffer(base58.decode(string));var payload=buffer.slice(0,-4);var checksum=buffer.slice(-4);var newChecksum=sha256x2(payload);if(checksum[0]^newChecksum[0]|checksum[1]^newChecksum[1]|checksum[2]^newChecksum[2]|checksum[3]^newChecksum[3])throw new Error("Invalid checksum");return payload}module.exports={encode:encode,decode:decode}}).call(this,require("buffer").Buffer)},{bs58:6,buffer:53,"create-hash":12}],8:[function(require,module,exports){module.exports=function(a,b){if(typeof a.compare==="function")return a.compare(b);if(a===b)return 0;var x=a.length;var y=b.length;var i=0;var len=Math.min(x,y);while(i<len){if(a[i]!==b[i])break;++i}if(i!==len){x=a[i];y=b[i]}if(x<y)return-1;if(y<x)return 1;return 0}},{}],9:[function(require,module,exports){(function(Buffer){"use strict";module.exports=function(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError("Arguments must be Buffers")}if(a===b){return true}if(typeof a.equals==="function"){return a.equals(b)}if(a.length!==b.length){return false}for(var i=0;i<a.length;i++){if(a[i]!==b[i]){return false}}return true}}).call(this,{isBuffer:require("../../../browserify/node_modules/is-buffer/index.js")})},{"../../../browserify/node_modules/is-buffer/index.js":59}],10:[function(require,module,exports){(function(Buffer){module.exports=function reverse(a){var length=a.length;var buffer=new Buffer(length);for(var i=0,j=length-1;i<length;++i,--j){buffer[i]=a[j]}return buffer}}).call(this,require("buffer").Buffer)},{buffer:53
}],11:[function(require,module,exports){(function(Buffer){var Transform=require("stream").Transform;var inherits=require("inherits");var StringDecoder=require("string_decoder").StringDecoder;module.exports=CipherBase;inherits(CipherBase,Transform);function CipherBase(hashMode){Transform.call(this);this.hashMode=typeof hashMode==="string";if(this.hashMode){this[hashMode]=this._finalOrDigest}else{this.final=this._finalOrDigest}this._decoder=null;this._encoding=null}CipherBase.prototype.update=function(data,inputEnc,outputEnc){if(typeof data==="string"){data=new Buffer(data,inputEnc)}var outData=this._update(data);if(this.hashMode){return this}if(outputEnc){outData=this._toString(outData,outputEnc)}return outData};CipherBase.prototype.setAutoPadding=function(){};CipherBase.prototype.getAuthTag=function(){throw new Error("trying to get auth tag in unsupported state")};CipherBase.prototype.setAuthTag=function(){throw new Error("trying to set auth tag in unsupported state")};CipherBase.prototype.setAAD=function(){throw new Error("trying to set aad in unsupported state")};CipherBase.prototype._transform=function(data,_,next){var err;try{if(this.hashMode){this._update(data)}else{this.push(this._update(data))}}catch(e){err=e}finally{next(err)}};CipherBase.prototype._flush=function(done){var err;try{this.push(this._final())}catch(e){err=e}finally{done(err)}};CipherBase.prototype._finalOrDigest=function(outputEnc){var outData=this._final()||new Buffer("");if(outputEnc){outData=this._toString(outData,outputEnc,true)}return outData};CipherBase.prototype._toString=function(value,enc,final){if(!this._decoder){this._decoder=new StringDecoder(enc);this._encoding=enc}if(this._encoding!==enc){throw new Error("can't switch encodings")}var out=this._decoder.write(value);if(final){out+=this._decoder.end()}return out}}).call(this,require("buffer").Buffer)},{buffer:53,inherits:21,stream:73,string_decoder:74}],12:[function(require,module,exports){(function(Buffer){"use strict";var inherits=require("inherits");var md5=require("./md5");var rmd160=require("ripemd160");var sha=require("sha.js");var Base=require("cipher-base");function HashNoConstructor(hash){Base.call(this,"digest");this._hash=hash;this.buffers=[]}inherits(HashNoConstructor,Base);HashNoConstructor.prototype._update=function(data){this.buffers.push(data)};HashNoConstructor.prototype._final=function(){var buf=Buffer.concat(this.buffers);var r=this._hash(buf);this.buffers=null;return r};function Hash(hash){Base.call(this,"digest");this._hash=hash}inherits(Hash,Base);Hash.prototype._update=function(data){this._hash.update(data)};Hash.prototype._final=function(){return this._hash.digest()};module.exports=function createHash(alg){alg=alg.toLowerCase();if("md5"===alg)return new HashNoConstructor(md5);if("rmd160"===alg||"ripemd160"===alg)return new HashNoConstructor(rmd160);return new Hash(sha(alg))}}).call(this,require("buffer").Buffer)},{"./md5":14,buffer:53,"cipher-base":11,inherits:21,ripemd160:23,"sha.js":25}],13:[function(require,module,exports){(function(Buffer){"use strict";var intSize=4;var zeroBuffer=new Buffer(intSize);zeroBuffer.fill(0);var chrsz=8;function toArray(buf,bigEndian){if(buf.length%intSize!==0){var len=buf.length+(intSize-buf.length%intSize);buf=Buffer.concat([buf,zeroBuffer],len)}var arr=[];var fn=bigEndian?buf.readInt32BE:buf.readInt32LE;for(var i=0;i<buf.length;i+=intSize){arr.push(fn.call(buf,i))}return arr}function toBuffer(arr,size,bigEndian){var buf=new Buffer(size);var fn=bigEndian?buf.writeInt32BE:buf.writeInt32LE;for(var i=0;i<arr.length;i++){fn.call(buf,arr[i],i*4,true)}return buf}function hash(buf,fn,hashSize,bigEndian){if(!Buffer.isBuffer(buf))buf=new Buffer(buf);var arr=fn(toArray(buf,bigEndian),buf.length*chrsz);return toBuffer(arr,hashSize,bigEndian)}exports.hash=hash}).call(this,require("buffer").Buffer)},{buffer:53}],14:[function(require,module,exports){"use strict";var helpers=require("./helpers");function core_md5(x,len){x[len>>5]|=128<<len%32;x[(len+64>>>9<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd)}return Array(a,b,c,d)}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b)}function md5_ff(a,b,c,d,x,s,t){return md5_cmn(b&c|~b&d,a,b,x,s,t)}function md5_gg(a,b,c,d,x,s,t){return md5_cmn(b&d|c&~d,a,b,x,s,t)}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t)}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|~d),a,b,x,s,t)}function safe_add(x,y){var lsw=(x&65535)+(y&65535);var msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&65535}function bit_rol(num,cnt){return num<<cnt|num>>>32-cnt}module.exports=function md5(buf){return helpers.hash(buf,core_md5,16)}},{"./helpers":13}],15:[function(require,module,exports){(function(Buffer){"use strict";var createHash=require("create-hash/browser");var inherits=require("inherits");var Transform=require("stream").Transform;var ZEROS=new Buffer(128);ZEROS.fill(0);function Hmac(alg,key){Transform.call(this);alg=alg.toLowerCase();if(typeof key==="string"){key=new Buffer(key)}var blocksize=alg==="sha512"||alg==="sha384"?128:64;this._alg=alg;this._key=key;if(key.length>blocksize){key=createHash(alg).update(key).digest()}else if(key.length<blocksize){key=Buffer.concat([key,ZEROS],blocksize)}var ipad=this._ipad=new Buffer(blocksize);var opad=this._opad=new Buffer(blocksize);for(var i=0;i<blocksize;i++){ipad[i]=key[i]^54;opad[i]=key[i]^92}this._hash=createHash(alg).update(ipad)}inherits(Hmac,Transform);Hmac.prototype.update=function(data,enc){this._hash.update(data,enc);return this};Hmac.prototype._transform=function(data,_,next){this._hash.update(data);next()};Hmac.prototype._flush=function(next){this.push(this.digest());next()};Hmac.prototype.digest=function(enc){var h=this._hash.digest();return createHash(this._alg).update(this._opad).update(h).digest(enc)};module.exports=function createHmac(alg,key){return new Hmac(alg,key)}}).call(this,require("buffer").Buffer)},{buffer:53,"create-hash/browser":12,inherits:21,stream:73}],16:[function(require,module,exports){var assert=require("assert");var BigInteger=require("bigi");var Point=require("./point");function Curve(p,a,b,Gx,Gy,n,h){this.p=p;this.a=a;this.b=b;this.G=Point.fromAffine(this,Gx,Gy);this.n=n;this.h=h;this.infinity=new Point(this,null,null,BigInteger.ZERO);this.pOverFour=p.add(BigInteger.ONE).shiftRight(2)}Curve.prototype.pointFromX=function(isOdd,x){var alpha=x.pow(3).add(this.a.multiply(x)).add(this.b).mod(this.p);var beta=alpha.modPow(this.pOverFour,this.p);var y=beta;if(beta.isEven()^!isOdd){y=this.p.subtract(y)}return Point.fromAffine(this,x,y)};Curve.prototype.isInfinity=function(Q){if(Q===this.infinity)return true;return Q.z.signum()===0&&Q.y.signum()!==0};Curve.prototype.isOnCurve=function(Q){if(this.isInfinity(Q))return true;var x=Q.affineX;var y=Q.affineY;var a=this.a;var b=this.b;var p=this.p;if(x.signum()<0||x.compareTo(p)>=0)return false;if(y.signum()<0||y.compareTo(p)>=0)return false;var lhs=y.square().mod(p);var rhs=x.pow(3).add(a.multiply(x)).add(b).mod(p);return lhs.equals(rhs)};Curve.prototype.validate=function(Q){assert(!this.isInfinity(Q),"Point is at infinity");assert(this.isOnCurve(Q),"Point is not on the curve");var nQ=Q.multiply(this.n);assert(this.isInfinity(nQ),"Point is not a scalar multiple of G");return true};module.exports=Curve},{"./point":20,assert:50,bigi:3}],17:[function(require,module,exports){module.exports={secp128r1:{p:"fffffffdffffffffffffffffffffffff",a:"fffffffdfffffffffffffffffffffffc",b:"e87579c11079f43dd824993c2cee5ed3",n:"fffffffe0000000075a30d1b9038a115",h:"01",Gx:"161ff7528b899b2d0c28607ca52c5b86",Gy:"cf5ac8395bafeb13c02da292dded7a83"},secp160k1:{p:"fffffffffffffffffffffffffffffffeffffac73",a:"00",b:"07",n:"0100000000000000000001b8fa16dfab9aca16b6b3",h:"01",Gx:"3b4c382ce37aa192a4019e763036f4f5dd4d7ebb",Gy:"938cf935318fdced6bc28286531733c3f03c4fee"},secp160r1:{p:"ffffffffffffffffffffffffffffffff7fffffff",a:"ffffffffffffffffffffffffffffffff7ffffffc",b:"1c97befc54bd7a8b65acf89f81d4d4adc565fa45",n:"0100000000000000000001f4c8f927aed3ca752257",h:"01",Gx:"4a96b5688ef573284664698968c38bb913cbfc82",Gy:"23a628553168947d59dcc912042351377ac5fb32"},secp192k1:{p:"fffffffffffffffffffffffffffffffffffffffeffffee37",a:"00",b:"03",n:"fffffffffffffffffffffffe26f2fc170f69466a74defd8d",h:"01",Gx:"db4ff10ec057e9ae26b07d0280b7f4341da5d1b1eae06c7d",Gy:"9b2f2f6d9c5628a7844163d015be86344082aa88d95e2f9d"},secp192r1:{p:"fffffffffffffffffffffffffffffffeffffffffffffffff",a:"fffffffffffffffffffffffffffffffefffffffffffffffc",b:"64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1",n:"ffffffffffffffffffffffff99def836146bc9b1b4d22831",h:"01",Gx:"188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012",Gy:"07192b95ffc8da78631011ed6b24cdd573f977a11e794811"},secp256k1:{p:"fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f",a:"00",b:"07",n:"fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",h:"01",Gx:"79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",Gy:"483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"},secp256r1:{p:"ffffffff00000001000000000000000000000000ffffffffffffffffffffffff",a:"ffffffff00000001000000000000000000000000fffffffffffffffffffffffc",b:"5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b",n:"ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551",h:"01",Gx:"6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296",Gy:"4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"}}},{}],18:[function(require,module,exports){var Point=require("./point");var Curve=require("./curve");var getCurveByName=require("./names");module.exports={Curve:Curve,Point:Point,getCurveByName:getCurveByName}},{"./curve":16,"./names":19,"./point":20}],19:[function(require,module,exports){var BigInteger=require("bigi");var curves=require("./curves");var Curve=require("./curve");function getCurveByName(name){var curve=curves[name];if(!curve)return null;var p=new BigInteger(curve.p,16);var a=new BigInteger(curve.a,16);var b=new BigInteger(curve.b,16);var n=new BigInteger(curve.n,16);var h=new BigInteger(curve.h,16);var Gx=new BigInteger(curve.Gx,16);var Gy=new BigInteger(curve.Gy,16);return new Curve(p,a,b,Gx,Gy,n,h)}module.exports=getCurveByName},{"./curve":16,"./curves":17,bigi:3}],20:[function(require,module,exports){(function(Buffer){var assert=require("assert");var BigInteger=require("bigi");var THREE=BigInteger.valueOf(3);function Point(curve,x,y,z){assert.notStrictEqual(z,undefined,"Missing Z coordinate");this.curve=curve;this.x=x;this.y=y;this.z=z;this._zInv=null;this.compressed=true}Object.defineProperty(Point.prototype,"zInv",{get:function(){if(this._zInv===null){this._zInv=this.z.modInverse(this.curve.p)}return this._zInv}});Object.defineProperty(Point.prototype,"affineX",{get:function(){return this.x.multiply(this.zInv).mod(this.curve.p)}});Object.defineProperty(Point.prototype,"affineY",{get:function(){return this.y.multiply(this.zInv).mod(this.curve.p)}});Point.fromAffine=function(curve,x,y){return new Point(curve,x,y,BigInteger.ONE)};Point.prototype.equals=function(other){if(other===this)return true;if(this.curve.isInfinity(this))return this.curve.isInfinity(other);if(this.curve.isInfinity(other))return this.curve.isInfinity(this);var u=other.y.multiply(this.z).subtract(this.y.multiply(other.z)).mod(this.curve.p);if(u.signum()!==0)return false;var v=other.x.multiply(this.z).subtract(this.x.multiply(other.z)).mod(this.curve.p);return v.signum()===0};Point.prototype.negate=function(){var y=this.curve.p.subtract(this.y);return new Point(this.curve,this.x,y,this.z)};Point.prototype.add=function(b){if(this.curve.isInfinity(this))return b;if(this.curve.isInfinity(b))return this;var x1=this.x;var y1=this.y;var x2=b.x;var y2=b.y;var u=y2.multiply(this.z).subtract(y1.multiply(b.z)).mod(this.curve.p);var v=x2.multiply(this.z).subtract(x1.multiply(b.z)).mod(this.curve.p);if(v.signum()===0){if(u.signum()===0){return this.twice()}return this.curve.infinity}var v2=v.square();var v3=v2.multiply(v);var x1v2=x1.multiply(v2);var zu2=u.square().multiply(this.z);var x3=zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.p);var y3=x1v2.multiply(THREE).multiply(u).subtract(y1.multiply(v3)).subtract(zu2.multiply(u)).multiply(b.z).add(u.multiply(v3)).mod(this.curve.p);var z3=v3.multiply(this.z).multiply(b.z).mod(this.curve.p);return new Point(this.curve,x3,y3,z3)};Point.prototype.twice=function(){if(this.curve.isInfinity(this))return this;if(this.y.signum()===0)return this.curve.infinity;var x1=this.x;var y1=this.y;var y1z1=y1.multiply(this.z);var y1sqz1=y1z1.multiply(y1).mod(this.curve.p);var a=this.curve.a;var w=x1.square().multiply(THREE);if(a.signum()!==0){w=w.add(this.z.square().multiply(a))}w=w.mod(this.curve.p);var x3=w.square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.p);var y3=w.multiply(THREE).multiply(x1).subtract(y1sqz1.shiftLeft(1)).shiftLeft(2).multiply(y1sqz1).subtract(w.pow(3)).mod(this.curve.p);var z3=y1z1.pow(3).shiftLeft(3).mod(this.curve.p);return new Point(this.curve,x3,y3,z3)};Point.prototype.multiply=function(k){if(this.curve.isInfinity(this))return this;if(k.signum()===0)return this.curve.infinity;var e=k;var h=e.multiply(THREE);var neg=this.negate();var R=this;for(var i=h.bitLength()-2;i>0;--i){var hBit=h.testBit(i);var eBit=e.testBit(i);R=R.twice();if(hBit!==eBit){R=R.add(hBit?this:neg)}}return R};Point.prototype.multiplyTwo=function(j,x,k){var i=Math.max(j.bitLength(),k.bitLength())-1;var R=this.curve.infinity;var both=this.add(x);while(i>=0){var jBit=j.testBit(i);var kBit=k.testBit(i);R=R.twice();if(jBit){if(kBit){R=R.add(both)}else{R=R.add(this)}}else if(kBit){R=R.add(x)}--i}return R};Point.prototype.getEncoded=function(compressed){if(compressed==undefined)compressed=this.compressed;if(this.curve.isInfinity(this))return new Buffer("00","hex");var x=this.affineX;var y=this.affineY;var buffer;var byteLength=Math.floor((this.curve.p.bitLength()+7)/8);if(compressed){buffer=new Buffer(1+byteLength);buffer.writeUInt8(y.isEven()?2:3,0)}else{buffer=new Buffer(1+byteLength+byteLength);buffer.writeUInt8(4,0);y.toBuffer(byteLength).copy(buffer,1+byteLength)}x.toBuffer(byteLength).copy(buffer,1);return buffer};Point.decodeFrom=function(curve,buffer){var type=buffer.readUInt8(0);var compressed=type!==4;var byteLength=Math.floor((curve.p.bitLength()+7)/8);var x=BigInteger.fromBuffer(buffer.slice(1,1+byteLength));var Q;if(compressed){assert.equal(buffer.length,byteLength+1,"Invalid sequence length");assert(type===2||type===3,"Invalid sequence tag");var isOdd=type===3;Q=curve.pointFromX(isOdd,x)}else{assert.equal(buffer.length,1+byteLength+byteLength,"Invalid sequence length");var y=BigInteger.fromBuffer(buffer.slice(1+byteLength));Q=Point.fromAffine(curve,x,y)}Q.compressed=compressed;return Q};Point.prototype.toString=function(){if(this.curve.isInfinity(this))return"(INFINITY)";return"("+this.affineX.toString()+","+this.affineY.toString()+")"};module.exports=Point}).call(this,require("buffer").Buffer)},{assert:50,bigi:3,buffer:53}],21:[function(require,module,exports){if(typeof Object.create==="function"){module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:false,writable:true,configurable:true}})}}else{module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor;ctor.prototype.constructor=ctor}}},{}],22:[function(require,module,exports){(function(process,global,Buffer){"use strict";function oldBrowser(){throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")}var crypto=global.crypto||global.msCrypto;if(crypto&&crypto.getRandomValues){module.exports=randomBytes}else{module.exports=oldBrowser}function randomBytes(size,cb){if(size>65536)throw new Error("requested too many random bytes");var rawBytes=new global.Uint8Array(size);if(size>0){crypto.getRandomValues(rawBytes)}var bytes=new Buffer(rawBytes.buffer);if(typeof cb==="function"){return process.nextTick(function(){cb(null,bytes)})}return bytes}}).call(this,require("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("buffer").Buffer)},{_process:62,buffer:53}],23:[function(require,module,exports){(function(Buffer){var zl=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13];var zr=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11];var sl=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6];var sr=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];var hl=[0,1518500249,1859775393,2400959708,2840853838];var hr=[1352829926,1548603684,1836072691,2053994217,0];function bytesToWords(bytes){var words=[];for(var i=0,b=0;i<bytes.length;i++,b+=8){words[b>>>5]|=bytes[i]<<24-b%32}return words}function wordsToBytes(words){var bytes=[];for(var b=0;b<words.length*32;b+=8){bytes.push(words[b>>>5]>>>24-b%32&255)}return bytes}function processBlock(H,M,offset){for(var i=0;i<16;i++){var offset_i=offset+i;var M_offset_i=M[offset_i];M[offset_i]=(M_offset_i<<8|M_offset_i>>>24)&16711935|(M_offset_i<<24|M_offset_i>>>8)&4278255360}var al,bl,cl,dl,el;var ar,br,cr,dr,er;ar=al=H[0];br=bl=H[1];cr=cl=H[2];dr=dl=H[3];er=el=H[4];var t;for(i=0;i<80;i+=1){t=al+M[offset+zl[i]]|0;if(i<16){t+=f1(bl,cl,dl)+hl[0]}else if(i<32){t+=f2(bl,cl,dl)+hl[1]}else if(i<48){t+=f3(bl,cl,dl)+hl[2]}else if(i<64){t+=f4(bl,cl,dl)+hl[3]}else{t+=f5(bl,cl,dl)+hl[4]}t=t|0;t=rotl(t,sl[i]);t=t+el|0;al=el;el=dl;dl=rotl(cl,10);cl=bl;bl=t;t=ar+M[offset+zr[i]]|0;if(i<16){t+=f5(br,cr,dr)+hr[0]}else if(i<32){t+=f4(br,cr,dr)+hr[1]}else if(i<48){t+=f3(br,cr,dr)+hr[2]}else if(i<64){t+=f2(br,cr,dr)+hr[3]}else{t+=f1(br,cr,dr)+hr[4]}t=t|0;t=rotl(t,sr[i]);t=t+er|0;ar=er;er=dr;dr=rotl(cr,10);cr=br;br=t}t=H[1]+cl+dr|0;H[1]=H[2]+dl+er|0;H[2]=H[3]+el+ar|0;H[3]=H[4]+al+br|0;H[4]=H[0]+bl+cr|0;H[0]=t}function f1(x,y,z){return x^y^z}function f2(x,y,z){return x&y|~x&z}function f3(x,y,z){return(x|~y)^z}function f4(x,y,z){return x&z|y&~z}function f5(x,y,z){return x^(y|~z)}function rotl(x,n){return x<<n|x>>>32-n}function ripemd160(message){var H=[1732584193,4023233417,2562383102,271733878,3285377520];if(typeof message==="string"){message=new Buffer(message,"utf8")}var m=bytesToWords(message);var nBitsLeft=message.length*8;var nBitsTotal=message.length*8;m[nBitsLeft>>>5]|=128<<24-nBitsLeft%32;m[(nBitsLeft+64>>>9<<4)+14]=(nBitsTotal<<8|nBitsTotal>>>24)&16711935|(nBitsTotal<<24|nBitsTotal>>>8)&4278255360;for(var i=0;i<m.length;i+=16){processBlock(H,m,i)}for(i=0;i<5;i++){var H_i=H[i];H[i]=(H_i<<8|H_i>>>24)&16711935|(H_i<<24|H_i>>>8)&4278255360}var digestbytes=wordsToBytes(H);return new Buffer(digestbytes)}module.exports=ripemd160}).call(this,require("buffer").Buffer)},{buffer:53}],24:[function(require,module,exports){(function(Buffer){function Hash(blockSize,finalSize){this._block=new Buffer(blockSize);this._finalSize=finalSize;this._blockSize=blockSize;this._len=0;this._s=0}Hash.prototype.update=function(data,enc){if(typeof data==="string"){enc=enc||"utf8";data=new Buffer(data,enc)}var l=this._len+=data.length;var s=this._s||0;var f=0;var buffer=this._block;while(s<l){var t=Math.min(data.length,f+this._blockSize-s%this._blockSize);var ch=t-f;for(var i=0;i<ch;i++){buffer[s%this._blockSize+i]=data[i+f]}s+=ch;f+=ch;if(s%this._blockSize===0){this._update(buffer)}}this._s=s;return this};Hash.prototype.digest=function(enc){var l=this._len*8;this._block[this._len%this._blockSize]=128;this._block.fill(0,this._len%this._blockSize+1);if(l%(this._blockSize*8)>=this._finalSize*8){this._update(this._block);this._block.fill(0)}this._block.writeInt32BE(l,this._blockSize-4);var hash=this._update(this._block)||this._hash();return enc?hash.toString(enc):hash};Hash.prototype._update=function(){throw new Error("_update must be implemented by subclass")};module.exports=Hash}).call(this,require("buffer").Buffer)},{buffer:53}],25:[function(require,module,exports){var exports=module.exports=function SHA(algorithm){algorithm=algorithm.toLowerCase();var Algorithm=exports[algorithm];if(!Algorithm)throw new Error(algorithm+" is not supported (we accept pull requests)");return new Algorithm};exports.sha=require("./sha");exports.sha1=require("./sha1");exports.sha224=require("./sha224");exports.sha256=require("./sha256");exports.sha384=require("./sha384");exports.sha512=require("./sha512")},{"./sha":26,"./sha1":27,"./sha224":28,"./sha256":29,"./sha384":30,"./sha512":31}],26:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var Hash=require("./hash");var K=[1518500249,1859775393,2400959708|0,3395469782|0];var W=new Array(80);function Sha(){this.init();this._w=W;Hash.call(this,64,56)}inherits(Sha,Hash);Sha.prototype.init=function(){this._a=1732584193;this._b=4023233417;this._c=2562383102;this._d=271733878;this._e=3285377520;return this};function rotl5(num){return num<<5|num>>>27}function rotl30(num){return num<<30|num>>>2}function ft(s,b,c,d){if(s===0)return b&c|~b&d;if(s===2)return b&c|b&d|c&d;return b^c^d}Sha.prototype._update=function(M){var W=this._w;var a=this._a|0;var b=this._b|0;var c=this._c|0;var d=this._d|0;var e=this._e|0;for(var i=0;i<16;++i)W[i]=M.readInt32BE(i*4);for(;i<80;++i)W[i]=W[i-3]^W[i-8]^W[i-14]^W[i-16];for(var j=0;j<80;++j){var s=~~(j/20);var t=rotl5(a)+ft(s,b,c,d)+e+W[j]+K[s]|0;e=d;d=c;c=rotl30(b);b=a;a=t}this._a=a+this._a|0;this._b=b+this._b|0;this._c=c+this._c|0;this._d=d+this._d|0;this._e=e+this._e|0};Sha.prototype._hash=function(){var H=new Buffer(20);H.writeInt32BE(this._a|0,0);H.writeInt32BE(this._b|0,4);H.writeInt32BE(this._c|0,8);H.writeInt32BE(this._d|0,12);H.writeInt32BE(this._e|0,16);return H};module.exports=Sha}).call(this,require("buffer").Buffer)},{"./hash":24,buffer:53,inherits:21}],27:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var Hash=require("./hash");var K=[1518500249,1859775393,2400959708|0,3395469782|0];var W=new Array(80);function Sha1(){this.init();this._w=W;Hash.call(this,64,56)}inherits(Sha1,Hash);Sha1.prototype.init=function(){this._a=1732584193;this._b=4023233417;this._c=2562383102;this._d=271733878;this._e=3285377520;return this};function rotl1(num){return num<<1|num>>>31}function rotl5(num){return num<<5|num>>>27}function rotl30(num){return num<<30|num>>>2}function ft(s,b,c,d){if(s===0)return b&c|~b&d;if(s===2)return b&c|b&d|c&d;return b^c^d}Sha1.prototype._update=function(M){var W=this._w;var a=this._a|0;var b=this._b|0;var c=this._c|0;var d=this._d|0;var e=this._e|0;for(var i=0;i<16;++i)W[i]=M.readInt32BE(i*4);for(;i<80;++i)W[i]=rotl1(W[i-3]^W[i-8]^W[i-14]^W[i-16]);for(var j=0;j<80;++j){var s=~~(j/20);var t=rotl5(a)+ft(s,b,c,d)+e+W[j]+K[s]|0;e=d;d=c;c=rotl30(b);b=a;a=t}this._a=a+this._a|0;this._b=b+this._b|0;this._c=c+this._c|0;this._d=d+this._d|0;this._e=e+this._e|0};Sha1.prototype._hash=function(){var H=new Buffer(20);H.writeInt32BE(this._a|0,0);H.writeInt32BE(this._b|0,4);H.writeInt32BE(this._c|0,8);H.writeInt32BE(this._d|0,12);H.writeInt32BE(this._e|0,16);return H};module.exports=Sha1}).call(this,require("buffer").Buffer)},{"./hash":24,buffer:53,inherits:21}],28:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var Sha256=require("./sha256");var Hash=require("./hash");var W=new Array(64);function Sha224(){this.init();this._w=W;Hash.call(this,64,56)}inherits(Sha224,Sha256);Sha224.prototype.init=function(){this._a=3238371032;this._b=914150663;this._c=812702999;this._d=4144912697;this._e=4290775857;this._f=1750603025;this._g=1694076839;this._h=3204075428;return this};Sha224.prototype._hash=function(){var H=new Buffer(28);H.writeInt32BE(this._a,0);H.writeInt32BE(this._b,4);H.writeInt32BE(this._c,8);H.writeInt32BE(this._d,12);H.writeInt32BE(this._e,16);H.writeInt32BE(this._f,20);H.writeInt32BE(this._g,24);return H};module.exports=Sha224}).call(this,require("buffer").Buffer)},{"./hash":24,"./sha256":29,buffer:53,inherits:21}],29:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var Hash=require("./hash");var K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];var W=new Array(64);function Sha256(){this.init();this._w=W;Hash.call(this,64,56)}inherits(Sha256,Hash);Sha256.prototype.init=function(){this._a=1779033703;this._b=3144134277;this._c=1013904242;this._d=2773480762;this._e=1359893119;this._f=2600822924;this._g=528734635;this._h=1541459225;return this};function ch(x,y,z){return z^x&(y^z)}function maj(x,y,z){return x&y|z&(x|y)}function sigma0(x){return(x>>>2|x<<30)^(x>>>13|x<<19)^(x>>>22|x<<10)}function sigma1(x){return(x>>>6|x<<26)^(x>>>11|x<<21)^(x>>>25|x<<7)}function gamma0(x){return(x>>>7|x<<25)^(x>>>18|x<<14)^x>>>3}function gamma1(x){return(x>>>17|x<<15)^(x>>>19|x<<13)^x>>>10}Sha256.prototype._update=function(M){var W=this._w;var a=this._a|0;var b=this._b|0;var c=this._c|0;var d=this._d|0;var e=this._e|0;var f=this._f|0;var g=this._g|0;var h=this._h|0;for(var i=0;i<16;++i)W[i]=M.readInt32BE(i*4);for(;i<64;++i)W[i]=gamma1(W[i-2])+W[i-7]+gamma0(W[i-15])+W[i-16]|0;for(var j=0;j<64;++j){var T1=h+sigma1(e)+ch(e,f,g)+K[j]+W[j]|0;var T2=sigma0(a)+maj(a,b,c)|0;h=g;g=f;f=e;e=d+T1|0;d=c;c=b;b=a;a=T1+T2|0}this._a=a+this._a|0;this._b=b+this._b|0;this._c=c+this._c|0;this._d=d+this._d|0;this._e=e+this._e|0;this._f=f+this._f|0;this._g=g+this._g|0;this._h=h+this._h|0};Sha256.prototype._hash=function(){var H=new Buffer(32);H.writeInt32BE(this._a,0);H.writeInt32BE(this._b,4);H.writeInt32BE(this._c,8);H.writeInt32BE(this._d,12);H.writeInt32BE(this._e,16);H.writeInt32BE(this._f,20);H.writeInt32BE(this._g,24);H.writeInt32BE(this._h,28);return H};module.exports=Sha256}).call(this,require("buffer").Buffer)},{"./hash":24,buffer:53,inherits:21}],30:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var SHA512=require("./sha512");var Hash=require("./hash");var W=new Array(160);function Sha384(){this.init();this._w=W;Hash.call(this,128,112)}inherits(Sha384,SHA512);Sha384.prototype.init=function(){this._ah=3418070365;this._bh=1654270250;this._ch=2438529370;this._dh=355462360;this._eh=1731405415;this._fh=2394180231;this._gh=3675008525;this._hh=1203062813;this._al=3238371032;this._bl=914150663;this._cl=812702999;this._dl=4144912697;this._el=4290775857;this._fl=1750603025;this._gl=1694076839;this._hl=3204075428;return this};Sha384.prototype._hash=function(){var H=new Buffer(48);function writeInt64BE(h,l,offset){H.writeInt32BE(h,offset);H.writeInt32BE(l,offset+4)}writeInt64BE(this._ah,this._al,0);writeInt64BE(this._bh,this._bl,8);writeInt64BE(this._ch,this._cl,16);writeInt64BE(this._dh,this._dl,24);writeInt64BE(this._eh,this._el,32);writeInt64BE(this._fh,this._fl,40);return H};module.exports=Sha384}).call(this,require("buffer").Buffer)},{"./hash":24,"./sha512":31,buffer:53,inherits:21}],31:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var Hash=require("./hash");var K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];
var W=new Array(160);function Sha512(){this.init();this._w=W;Hash.call(this,128,112)}inherits(Sha512,Hash);Sha512.prototype.init=function(){this._ah=1779033703;this._bh=3144134277;this._ch=1013904242;this._dh=2773480762;this._eh=1359893119;this._fh=2600822924;this._gh=528734635;this._hh=1541459225;this._al=4089235720;this._bl=2227873595;this._cl=4271175723;this._dl=1595750129;this._el=2917565137;this._fl=725511199;this._gl=4215389547;this._hl=327033209;return this};function Ch(x,y,z){return z^x&(y^z)}function maj(x,y,z){return x&y|z&(x|y)}function sigma0(x,xl){return(x>>>28|xl<<4)^(xl>>>2|x<<30)^(xl>>>7|x<<25)}function sigma1(x,xl){return(x>>>14|xl<<18)^(x>>>18|xl<<14)^(xl>>>9|x<<23)}function Gamma0(x,xl){return(x>>>1|xl<<31)^(x>>>8|xl<<24)^x>>>7}function Gamma0l(x,xl){return(x>>>1|xl<<31)^(x>>>8|xl<<24)^(x>>>7|xl<<25)}function Gamma1(x,xl){return(x>>>19|xl<<13)^(xl>>>29|x<<3)^x>>>6}function Gamma1l(x,xl){return(x>>>19|xl<<13)^(xl>>>29|x<<3)^(x>>>6|xl<<26)}function getCarry(a,b){return a>>>0<b>>>0?1:0}Sha512.prototype._update=function(M){var W=this._w;var ah=this._ah|0;var bh=this._bh|0;var ch=this._ch|0;var dh=this._dh|0;var eh=this._eh|0;var fh=this._fh|0;var gh=this._gh|0;var hh=this._hh|0;var al=this._al|0;var bl=this._bl|0;var cl=this._cl|0;var dl=this._dl|0;var el=this._el|0;var fl=this._fl|0;var gl=this._gl|0;var hl=this._hl|0;for(var i=0;i<32;i+=2){W[i]=M.readInt32BE(i*4);W[i+1]=M.readInt32BE(i*4+4)}for(;i<160;i+=2){var xh=W[i-15*2];var xl=W[i-15*2+1];var gamma0=Gamma0(xh,xl);var gamma0l=Gamma0l(xl,xh);xh=W[i-2*2];xl=W[i-2*2+1];var gamma1=Gamma1(xh,xl);var gamma1l=Gamma1l(xl,xh);var Wi7h=W[i-7*2];var Wi7l=W[i-7*2+1];var Wi16h=W[i-16*2];var Wi16l=W[i-16*2+1];var Wil=gamma0l+Wi7l|0;var Wih=gamma0+Wi7h+getCarry(Wil,gamma0l)|0;Wil=Wil+gamma1l|0;Wih=Wih+gamma1+getCarry(Wil,gamma1l)|0;Wil=Wil+Wi16l|0;Wih=Wih+Wi16h+getCarry(Wil,Wi16l)|0;W[i]=Wih;W[i+1]=Wil}for(var j=0;j<160;j+=2){Wih=W[j];Wil=W[j+1];var majh=maj(ah,bh,ch);var majl=maj(al,bl,cl);var sigma0h=sigma0(ah,al);var sigma0l=sigma0(al,ah);var sigma1h=sigma1(eh,el);var sigma1l=sigma1(el,eh);var Kih=K[j];var Kil=K[j+1];var chh=Ch(eh,fh,gh);var chl=Ch(el,fl,gl);var t1l=hl+sigma1l|0;var t1h=hh+sigma1h+getCarry(t1l,hl)|0;t1l=t1l+chl|0;t1h=t1h+chh+getCarry(t1l,chl)|0;t1l=t1l+Kil|0;t1h=t1h+Kih+getCarry(t1l,Kil)|0;t1l=t1l+Wil|0;t1h=t1h+Wih+getCarry(t1l,Wil)|0;var t2l=sigma0l+majl|0;var t2h=sigma0h+majh+getCarry(t2l,sigma0l)|0;hh=gh;hl=gl;gh=fh;gl=fl;fh=eh;fl=el;el=dl+t1l|0;eh=dh+t1h+getCarry(el,dl)|0;dh=ch;dl=cl;ch=bh;cl=bl;bh=ah;bl=al;al=t1l+t2l|0;ah=t1h+t2h+getCarry(al,t1l)|0}this._al=this._al+al|0;this._bl=this._bl+bl|0;this._cl=this._cl+cl|0;this._dl=this._dl+dl|0;this._el=this._el+el|0;this._fl=this._fl+fl|0;this._gl=this._gl+gl|0;this._hl=this._hl+hl|0;this._ah=this._ah+ah+getCarry(this._al,al)|0;this._bh=this._bh+bh+getCarry(this._bl,bl)|0;this._ch=this._ch+ch+getCarry(this._cl,cl)|0;this._dh=this._dh+dh+getCarry(this._dl,dl)|0;this._eh=this._eh+eh+getCarry(this._el,el)|0;this._fh=this._fh+fh+getCarry(this._fl,fl)|0;this._gh=this._gh+gh+getCarry(this._gl,gl)|0;this._hh=this._hh+hh+getCarry(this._hl,hl)|0};Sha512.prototype._hash=function(){var H=new Buffer(64);function writeInt64BE(h,l,offset){H.writeInt32BE(h,offset);H.writeInt32BE(l,offset+4)}writeInt64BE(this._ah,this._al,0);writeInt64BE(this._bh,this._bl,8);writeInt64BE(this._ch,this._cl,16);writeInt64BE(this._dh,this._dl,24);writeInt64BE(this._eh,this._el,32);writeInt64BE(this._fh,this._fl,40);writeInt64BE(this._gh,this._gl,48);writeInt64BE(this._hh,this._hl,56);return H};module.exports=Sha512}).call(this,require("buffer").Buffer)},{"./hash":24,buffer:53,inherits:21}],32:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");function TfTypeError(type,value){this.tfError=Error.call(this);if(arguments.length===1&&typeof type==="string"){this.message=type}else{this.tfType=type;this.tfValue=value;var message;Object.defineProperty(this,"message",{get:function(){if(message)return message;message=tfErrorString(type,value);return message}})}}inherits(TfTypeError,Error);Object.defineProperty(TfTypeError,"stack",{get:function(){return this.tfError.stack}});function TfPropertyTypeError(type,property,value,error){this.tfError=error||Error.call(this);this.tfProperty=property;this.tfType=type;this.tfValue=value;var message;Object.defineProperty(this,"message",{get:function(){if(message)return message;if(type){message=tfPropertyErrorString(type,property,value)}else{message='Unexpected property "'+property+'"'}return message}})}inherits(TfPropertyTypeError,Error);Object.defineProperty(TfPropertyTypeError,"stack",{get:function(){return this.tfError.stack}});TfPropertyTypeError.prototype.asChildOf=function(property){return new TfPropertyTypeError(this.tfType,property+"."+this.tfProperty,this.tfValue,this.tfError)};function getFunctionName(fn){return fn.name||fn.toString().match(/function (.*?)\s*\(/)[1]}function getValueTypeName(value){if(nativeTypes.Null(value))return"";return getFunctionName(value.constructor)}function getValue(value){if(nativeTypes.Function(value))return"";if(nativeTypes.String(value))return JSON.stringify(value);if(value&&nativeTypes.Object(value))return"";return value}function tfJSON(type){if(nativeTypes.Function(type))return type.toJSON?type.toJSON():getFunctionName(type);if(nativeTypes.Array(type))return"Array";if(type&&nativeTypes.Object(type))return"Object";return type||""}function stfJSON(type){type=tfJSON(type);return nativeTypes.Object(type)?JSON.stringify(type):type}function tfErrorString(type,value){var valueTypeName=getValueTypeName(value);var valueValue=getValue(value);return"Expected "+stfJSON(type)+", got"+(valueTypeName!==""?" "+valueTypeName:"")+(valueValue!==""?" "+valueValue:"")}function tfPropertyErrorString(type,name,value){return tfErrorString('property "'+stfJSON(name)+'" of type '+stfJSON(type),value)}var nativeTypes={Array:function(value){return value!==null&&value!==undefined&&value.constructor===Array},Boolean:function(value){return typeof value==="boolean"},Buffer:function(value){return Buffer.isBuffer(value)},Function:function(value){return typeof value==="function"},Null:function(value){return value===undefined||value===null},Number:function(value){return typeof value==="number"},Object:function(value){return typeof value==="object"},String:function(value){return typeof value==="string"},"":function(){return true}};var otherTypes={arrayOf:function arrayOf(type){function arrayOf(value,strict){if(!nativeTypes.Array(value))return false;return value.every(function(x){return typeforce(type,x,strict,arrayOf)})}arrayOf.toJSON=function(){return[tfJSON(type)]};return arrayOf},maybe:function maybe(type){function maybe(value,strict){return nativeTypes.Null(value)||typeforce(type,value,strict,maybe)}maybe.toJSON=function(){return"?"+stfJSON(type)};return maybe},object:function object(type){function object(value,strict){if(!nativeTypes.Object(value))return false;if(nativeTypes.Null(value))return false;var propertyName;try{for(propertyName in type){var propertyType=type[propertyName];var propertyValue=value[propertyName];typeforce(propertyType,propertyValue,strict)}}catch(e){if(e instanceof TfPropertyTypeError){throw e.asChildOf(propertyName)}else if(e instanceof TfTypeError){throw new TfPropertyTypeError(e.tfType,propertyName,e.tfValue,e.tfError)}throw e}if(strict){for(propertyName in value){if(type[propertyName])continue;throw new TfPropertyTypeError(undefined,propertyName)}}return true}object.toJSON=function(){return tfJSON(type)};return object},map:function map(propertyType,propertyKeyType){function map(value,strict){typeforce(nativeTypes.Object,value,strict);if(nativeTypes.Null(value))return false;var propertyName;try{for(propertyName in value){if(propertyKeyType){typeforce(propertyKeyType,propertyName,strict)}var propertyValue=value[propertyName];typeforce(propertyType,propertyValue,strict)}}catch(e){if(e instanceof TfPropertyTypeError){throw e.asChildOf(propertyName)}else if(e instanceof TfTypeError){throw new TfPropertyTypeError(e.tfType,propertyKeyType||propertyName,e.tfValue)}throw e}return true}if(propertyKeyType){map.toJSON=function(){return"{"+stfJSON(propertyKeyType)+": "+stfJSON(propertyType)+"}"}}else{map.toJSON=function(){return"{"+stfJSON(propertyType)+"}"}}return map},oneOf:function oneOf(){var types=[].slice.call(arguments);function oneOf(value,strict){return types.some(function(type){try{return typeforce(type,value,strict)}catch(e){if(e instanceof TfTypeError||e instanceof TfPropertyTypeError)return false;throw e}})}oneOf.toJSON=function(){return types.map(stfJSON).join("|")};return oneOf},quacksLike:function quacksLike(type){function quacksLike(value){return type===getValueTypeName(value)}quacksLike.toJSON=function(){return type};return quacksLike},tuple:function tuple(){var types=[].slice.call(arguments);function tuple(value,strict){return types.every(function(type,i){return typeforce(type,value[i],strict)})}tuple.toJSON=function(){return"("+types.map(stfJSON).join(", ")+")"};return tuple},value:function value(expected){function value(actual){return actual===expected}value.toJSON=function(){return expected};return value}};function compile(type){if(nativeTypes.String(type)){if(type[0]==="?")return otherTypes.maybe(compile(type.slice(1)));return nativeTypes[type]||otherTypes.quacksLike(type)}else if(type&&nativeTypes.Object(type)){if(nativeTypes.Array(type))return otherTypes.arrayOf(compile(type[0]));var compiled={};for(var propertyName in type){compiled[propertyName]=compile(type[propertyName])}return otherTypes.object(compiled)}else if(nativeTypes.Function(type)){return type}return otherTypes.value(type)}function typeforce(type,value,strict,surrogate){if(nativeTypes.Function(type)){if(type(value,strict))return true;throw new TfTypeError(surrogate||type,value)}return typeforce(compile(type),value,strict)}var typeName;Object.keys(nativeTypes).forEach(function(typeName){var nativeType=nativeTypes[typeName];nativeType.toJSON=function(){return typeName};typeforce[typeName]=nativeType});for(typeName in otherTypes){typeforce[typeName]=otherTypes[typeName]}module.exports=typeforce;module.exports.compile=compile;module.exports.TfTypeError=TfTypeError;module.exports.TfPropertyTypeError=TfPropertyTypeError}).call(this,{isBuffer:require("../../../browserify/node_modules/is-buffer/index.js")})},{"../../../browserify/node_modules/is-buffer/index.js":59,inherits:21}],33:[function(require,module,exports){(function(Buffer){var bs58check=require("bs58check");function decodeRaw(version,buffer){if(buffer[0]!==version)throw new Error("Invalid network version");if(buffer.length===34){if(buffer[33]!==1)throw new Error("Invalid compression flag");return{version:buffer[0],d:buffer.slice(1,-1),compressed:true}}if(buffer.length!==33)throw new Error("Invalid WIF length");return{version:buffer[0],d:buffer.slice(1),compressed:false}}function decode(version,string){return decodeRaw(version,bs58check.decode(string))}function encodeRaw(version,d,compressed){var buffer=new Buffer(compressed?34:33);buffer.writeUInt8(version,0);d.copy(buffer,1);if(compressed){buffer[33]=1}return buffer}function encode(version,d,compressed){return bs58check.encode(encodeRaw(version,d,compressed))}module.exports={decode:decode,decodeRaw:decodeRaw,encode:encode,encodeRaw:encodeRaw}}).call(this,require("buffer").Buffer)},{bs58check:7,buffer:53}],34:[function(require,module,exports){(function(Buffer){var bs58check=require("bs58check");var bscript=require("./script");var networks=require("./networks");var typeforce=require("typeforce");var types=require("./types");function fromBase58Check(address){var payload=bs58check.decode(address);if(payload.length<21)throw new TypeError(address+" is too short");if(payload.length>21)throw new TypeError(address+" is too long");var version=payload[0];var hash=payload.slice(1);return{hash:hash,version:version}}function fromOutputScript(scriptPubKey,network){network=network||networks.bitcoin;if(bscript.isPubKeyHashOutput(scriptPubKey))return toBase58Check(bscript.compile(scriptPubKey).slice(3,23),network.pubKeyHash);if(bscript.isScriptHashOutput(scriptPubKey))return toBase58Check(bscript.compile(scriptPubKey).slice(2,22),network.scriptHash);throw new Error(bscript.toASM(scriptPubKey)+" has no matching Address")}function toBase58Check(hash,version){typeforce(types.tuple(types.Hash160bit,types.UInt8),arguments);var payload=new Buffer(21);payload.writeUInt8(version,0);hash.copy(payload,1);return bs58check.encode(payload)}function toOutputScript(address,network){network=network||networks.bitcoin;var decode=fromBase58Check(address);if(decode.version===network.pubKeyHash)return bscript.pubKeyHashOutput(decode.hash);if(decode.version===network.scriptHash)return bscript.scriptHashOutput(decode.hash);throw new Error(address+" has no matching Script")}module.exports={fromBase58Check:fromBase58Check,fromOutputScript:fromOutputScript,toBase58Check:toBase58Check,toOutputScript:toOutputScript}}).call(this,require("buffer").Buffer)},{"./networks":43,"./script":45,"./types":49,bs58check:7,buffer:53,typeforce:32}],35:[function(require,module,exports){(function(Buffer){var bufferutils=require("./bufferutils");var bcrypto=require("./crypto");var compare=require("buffer-compare");var Transaction=require("./transaction");function Block(){this.version=1;this.prevHash=null;this.merkleRoot=null;this.timestamp=0;this.bits=0;this.nonce=0}Block.fromBuffer=function(buffer){if(buffer.length<80)throw new Error("Buffer too small (< 80 bytes)");var offset=0;function readSlice(n){offset+=n;return buffer.slice(offset-n,offset)}function readUInt32(){var i=buffer.readUInt32LE(offset);offset+=4;return i}var block=new Block;block.version=readUInt32();block.prevHash=readSlice(32);block.merkleRoot=readSlice(32);block.timestamp=readUInt32();block.bits=readUInt32();block.nonce=readUInt32();if(buffer.length===80)return block;function readVarInt(){var vi=bufferutils.readVarInt(buffer,offset);offset+=vi.size;return vi.number}function readTransaction(){var tx=Transaction.fromBuffer(buffer.slice(offset),true);offset+=tx.byteLength();return tx}var nTransactions=readVarInt();block.transactions=[];for(var i=0;i<nTransactions;++i){var tx=readTransaction();block.transactions.push(tx)}return block};Block.fromHex=function(hex){return Block.fromBuffer(new Buffer(hex,"hex"))};Block.prototype.getHash=function(){return bcrypto.hash256(this.toBuffer(true))};Block.prototype.getId=function(){return[].reverse.call(this.getHash()).toString("hex")};Block.prototype.getUTCDate=function(){var date=new Date(0);date.setUTCSeconds(this.timestamp);return date};Block.prototype.toBuffer=function(headersOnly){var buffer=new Buffer(80);var offset=0;function writeSlice(slice){slice.copy(buffer,offset);offset+=slice.length}function writeUInt32(i){buffer.writeUInt32LE(i,offset);offset+=4}writeUInt32(this.version);writeSlice(this.prevHash);writeSlice(this.merkleRoot);writeUInt32(this.timestamp);writeUInt32(this.bits);writeUInt32(this.nonce);if(headersOnly||!this.transactions)return buffer;var txLenBuffer=bufferutils.varIntBuffer(this.transactions.length);var txBuffers=this.transactions.map(function(tx){return tx.toBuffer()});return Buffer.concat([buffer,txLenBuffer].concat(txBuffers))};Block.prototype.toHex=function(headersOnly){return this.toBuffer(headersOnly).toString("hex")};Block.calculateTarget=function(bits){var exponent=((bits&4278190080)>>24)-3;var mantissa=bits&8388607;var i=31-exponent;var target=new Buffer(32);target.fill(0);target[i]=mantissa&255;target[i-1]=mantissa>>8;target[i-2]=mantissa>>16;target[i-3]=mantissa>>24;return target};Block.prototype.checkProofOfWork=function(){var hash=[].reverse.call(this.getHash());var target=Block.calculateTarget(this.bits);return compare(hash,target)<=0};module.exports=Block}).call(this,require("buffer").Buffer)},{"./bufferutils":36,"./crypto":37,"./transaction":47,buffer:53,"buffer-compare":8}],36:[function(require,module,exports){(function(Buffer){var opcodes=require("./opcodes");function verifuint(value,max){if(typeof value!=="number")throw new Error("cannot write a non-number as a number");if(value<0)throw new Error("specified a negative value for writing an unsigned value");if(value>max)throw new Error("value is larger than maximum value for type");if(Math.floor(value)!==value)throw new Error("value has a fractional component")}function pushDataSize(i){return i<opcodes.OP_PUSHDATA1?1:i<255?2:i<65535?3:5}function readPushDataInt(buffer,offset){var opcode=buffer.readUInt8(offset);var number,size;if(opcode<opcodes.OP_PUSHDATA1){number=opcode;size=1}else if(opcode===opcodes.OP_PUSHDATA1){if(offset+2>buffer.length)return null;number=buffer.readUInt8(offset+1);size=2}else if(opcode===opcodes.OP_PUSHDATA2){if(offset+3>buffer.length)return null;number=buffer.readUInt16LE(offset+1);size=3}else{if(offset+5>buffer.length)return null;if(opcode!==opcodes.OP_PUSHDATA4)throw new Error("Unexpected opcode");number=buffer.readUInt32LE(offset+1);size=5}return{opcode:opcode,number:number,size:size}}function readUInt64LE(buffer,offset){var a=buffer.readUInt32LE(offset);var b=buffer.readUInt32LE(offset+4);b*=4294967296;verifuint(b+a,9007199254740991);return b+a}function readVarInt(buffer,offset){var t=buffer.readUInt8(offset);var number,size;if(t<253){number=t;size=1}else if(t<254){number=buffer.readUInt16LE(offset+1);size=3}else if(t<255){number=buffer.readUInt32LE(offset+1);size=5}else{number=readUInt64LE(buffer,offset+1);size=9}return{number:number,size:size}}function writePushDataInt(buffer,number,offset){var size=pushDataSize(number);if(size===1){buffer.writeUInt8(number,offset)}else if(size===2){buffer.writeUInt8(opcodes.OP_PUSHDATA1,offset);buffer.writeUInt8(number,offset+1)}else if(size===3){buffer.writeUInt8(opcodes.OP_PUSHDATA2,offset);buffer.writeUInt16LE(number,offset+1)}else{buffer.writeUInt8(opcodes.OP_PUSHDATA4,offset);buffer.writeUInt32LE(number,offset+1)}return size}function writeUInt64LE(buffer,value,offset){verifuint(value,9007199254740991);buffer.writeInt32LE(value&-1,offset);buffer.writeUInt32LE(Math.floor(value/4294967296),offset+4)}function varIntSize(i){return i<253?1:i<65536?3:i<4294967296?5:9}function writeVarInt(buffer,number,offset){var size=varIntSize(number);if(size===1){buffer.writeUInt8(number,offset)}else if(size===3){buffer.writeUInt8(253,offset);buffer.writeUInt16LE(number,offset+1)}else if(size===5){buffer.writeUInt8(254,offset);buffer.writeUInt32LE(number,offset+1)}else{buffer.writeUInt8(255,offset);writeUInt64LE(buffer,number,offset+1)}return size}function varIntBuffer(i){var size=varIntSize(i);var buffer=new Buffer(size);writeVarInt(buffer,i,0);return buffer}module.exports={equal:require("buffer-equals"),pushDataSize:pushDataSize,readPushDataInt:readPushDataInt,readUInt64LE:readUInt64LE,readVarInt:readVarInt,reverse:require("buffer-reverse"),varIntBuffer:varIntBuffer,varIntSize:varIntSize,writePushDataInt:writePushDataInt,writeUInt64LE:writeUInt64LE,writeVarInt:writeVarInt}}).call(this,require("buffer").Buffer)},{"./opcodes":44,buffer:53,"buffer-equals":9,"buffer-reverse":10}],37:[function(require,module,exports){var createHash=require("create-hash");function hash160(buffer){return ripemd160(sha256(buffer))}function hash256(buffer){return sha256(sha256(buffer))}function ripemd160(buffer){return createHash("rmd160").update(buffer).digest()}function sha1(buffer){return createHash("sha1").update(buffer).digest()}function sha256(buffer){return createHash("sha256").update(buffer).digest()}module.exports={hash160:hash160,hash256:hash256,ripemd160:ripemd160,sha1:sha1,sha256:sha256}},{"create-hash":12}],38:[function(require,module,exports){(function(Buffer){var createHmac=require("create-hmac");var typeforce=require("typeforce");var types=require("./types");var BigInteger=require("bigi");var ECSignature=require("./ecsignature");var ZERO=new Buffer([0]);var ONE=new Buffer([1]);var ecurve=require("ecurve");var secp256k1=ecurve.getCurveByName("secp256k1");function deterministicGenerateK(hash,x,checkSig){typeforce(types.tuple(types.Hash256bit,types.Buffer256bit,types.Function),arguments);var k=new Buffer(32);var v=new Buffer(32);v.fill(1);k.fill(0);k=createHmac("sha256",k).update(v).update(ZERO).update(x).update(hash).digest();v=createHmac("sha256",k).update(v).digest();k=createHmac("sha256",k).update(v).update(ONE).update(x).update(hash).digest();v=createHmac("sha256",k).update(v).digest();v=createHmac("sha256",k).update(v).digest();var T=BigInteger.fromBuffer(v);while(T.signum()<=0||T.compareTo(secp256k1.n)>=0||!checkSig(T)){k=createHmac("sha256",k).update(v).update(ZERO).digest();v=createHmac("sha256",k).update(v).digest();v=createHmac("sha256",k).update(v).digest();T=BigInteger.fromBuffer(v)}return T}var N_OVER_TWO=secp256k1.n.shiftRight(1);function sign(hash,d){typeforce(types.tuple(types.Hash256bit,types.BigInt),arguments);var x=d.toBuffer(32);var e=BigInteger.fromBuffer(hash);var n=secp256k1.n;var G=secp256k1.G;var r,s;deterministicGenerateK(hash,x,function(k){var Q=G.multiply(k);if(secp256k1.isInfinity(Q))return false;r=Q.affineX.mod(n);if(r.signum()===0)return false;s=k.modInverse(n).multiply(e.add(d.multiply(r))).mod(n);if(s.signum()===0)return false;return true});if(s.compareTo(N_OVER_TWO)>0){s=n.subtract(s)}return new ECSignature(r,s)}function verify(hash,signature,Q){typeforce(types.tuple(types.Hash256bit,types.ECSignature,types.ECPoint),arguments);var n=secp256k1.n;var G=secp256k1.G;var r=signature.r;var s=signature.s;if(r.signum()<=0||r.compareTo(n)>=0)return false;if(s.signum()<=0||s.compareTo(n)>=0)return false;var e=BigInteger.fromBuffer(hash);var sInv=s.modInverse(n);var u1=e.multiply(sInv).mod(n);var u2=r.multiply(sInv).mod(n);var R=G.multiplyTwo(u1,Q,u2);if(secp256k1.isInfinity(R))return false;var xR=R.affineX;var v=xR.mod(n);return v.equals(r)}function recoverPubKey(e,signature,i){typeforce(types.tuple(types.BigInt,types.ECSignature,types.UInt2),arguments);var n=secp256k1.n;var G=secp256k1.G;var r=signature.r;var s=signature.s;if(r.signum()<=0||r.compareTo(n)>=0)throw new Error("Invalid r value");if(s.signum()<=0||s.compareTo(n)>=0)throw new Error("Invalid s value");var isYOdd=i&1;var isSecondKey=i>>1;var x=isSecondKey?r.add(n):r;var R=secp256k1.pointFromX(isYOdd,x);var nR=R.multiply(n);if(!secp256k1.isInfinity(nR))throw new Error("nR is not a valid curve point");var rInv=r.modInverse(n);var eNeg=e.negate().mod(n);var Q=R.multiplyTwo(s,G,eNeg).multiply(rInv);secp256k1.validate(Q);return Q}function calcPubKeyRecoveryParam(e,signature,Q){typeforce(types.tuple(types.BigInt,types.ECSignature,types.ECPoint),arguments);for(var i=0;i<4;i++){var Qprime=recoverPubKey(e,signature,i);if(Qprime.equals(Q)){return i}}throw new Error("Unable to find valid recovery factor")}module.exports={calcPubKeyRecoveryParam:calcPubKeyRecoveryParam,deterministicGenerateK:deterministicGenerateK,recoverPubKey:recoverPubKey,sign:sign,verify:verify,__curve:secp256k1}}).call(this,require("buffer").Buffer)},{"./ecsignature":40,"./types":49,bigi:3,buffer:53,"create-hmac":15,ecurve:18,typeforce:32}],39:[function(require,module,exports){(function(Buffer){var bcrypto=require("./crypto");var bs58check=require("bs58check");var ecdsa=require("./ecdsa");var randomBytes=require("randombytes");var typeforce=require("typeforce");var types=require("./types");var wif=require("wif");var NETWORKS=require("./networks");var BigInteger=require("bigi");var ecurve=require("ecurve");var secp256k1=ecdsa.__curve;function ECPair(d,Q,options){if(options){typeforce({compressed:types.maybe(types.Boolean),network:types.maybe(types.Network)},options)}options=options||{};if(d){if(d.signum()<=0)throw new Error("Private key must be greater than 0");if(d.compareTo(secp256k1.n)>=0)throw new Error("Private key must be less than the curve order");if(Q)throw new TypeError("Unexpected publicKey parameter");this.d=d}else{typeforce(types.ECPoint,Q);this.__Q=Q}this.compressed=options.compressed===undefined?true:options.compressed;this.network=options.network||NETWORKS.bitcoin}Object.defineProperty(ECPair.prototype,"Q",{get:function(){if(!this.__Q&&this.d){this.__Q=secp256k1.G.multiply(this.d)}return this.__Q}});ECPair.fromPublicKeyBuffer=function(buffer,network){var Q=ecurve.Point.decodeFrom(secp256k1,buffer);return new ECPair(null,Q,{compressed:Q.compressed,network:network})};ECPair.fromWIF=function(string,network){network=network||NETWORKS.bitcoin;var buffer=bs58check.decode(string);if(types.Array(network)){var version=buffer[0];network=network.filter(function(network){return version===network.wif}).pop()||{}}var decoded=wif.decodeRaw(network.wif,buffer);var d=BigInteger.fromBuffer(decoded.d);return new ECPair(d,null,{compressed:decoded.compressed,network:network})};ECPair.makeRandom=function(options){options=options||{};var rng=options.rng||randomBytes;var d;do{var buffer=rng(32);typeforce(types.Buffer256bit,buffer);d=BigInteger.fromBuffer(buffer)}while(d.signum()<=0||d.compareTo(secp256k1.n)>=0);return new ECPair(d,null,options)};ECPair.prototype.getAddress=function(){var pubKey=this.getPublicKeyBuffer();var pubKeyHash=bcrypto.hash160(pubKey);var payload=new Buffer(21);payload.writeUInt8(this.network.pubKeyHash,0);pubKeyHash.copy(payload,1);return bs58check.encode(payload)};ECPair.prototype.getNetwork=function(){return this.network};ECPair.prototype.getPublicKeyBuffer=function(){return this.Q.getEncoded(this.compressed)};ECPair.prototype.sign=function(hash){if(!this.d)throw new Error("Missing private key");return ecdsa.sign(hash,this.d)};ECPair.prototype.toWIF=function(){if(!this.d)throw new Error("Missing private key");return wif.encode(this.network.wif,this.d.toBuffer(32),this.compressed)};ECPair.prototype.verify=function(hash,signature){return ecdsa.verify(hash,signature,this.Q)};module.exports=ECPair}).call(this,require("buffer").Buffer)},{"./crypto":37,"./ecdsa":38,"./networks":43,"./types":49,bigi:3,bs58check:7,buffer:53,ecurve:18,randombytes:22,typeforce:32,wif:33}],40:[function(require,module,exports){(function(Buffer){var bip66=require("bip66");var typeforce=require("typeforce");var types=require("./types");var BigInteger=require("bigi");function ECSignature(r,s){typeforce(types.tuple(types.BigInt,types.BigInt),arguments);this.r=r;this.s=s}ECSignature.parseCompact=function(buffer){if(buffer.length!==65)throw new Error("Invalid signature length");var flagByte=buffer.readUInt8(0)-27;if(flagByte!==(flagByte&7))throw new Error("Invalid signature parameter");var compressed=!!(flagByte&4);var recoveryParam=flagByte&3;var r=BigInteger.fromBuffer(buffer.slice(1,33));var s=BigInteger.fromBuffer(buffer.slice(33));return{compressed:compressed,i:recoveryParam,signature:new ECSignature(r,s)}};ECSignature.fromDER=function(buffer){var decode=bip66.decode(buffer);var r=BigInteger.fromDERInteger(decode.r);var s=BigInteger.fromDERInteger(decode.s);return new ECSignature(r,s)};ECSignature.parseScriptSignature=function(buffer){var hashType=buffer.readUInt8(buffer.length-1);var hashTypeMod=hashType&~128;if(hashTypeMod<=0||hashTypeMod>=4)throw new Error("Invalid hashType "+hashType);return{signature:ECSignature.fromDER(buffer.slice(0,-1)),hashType:hashType}};ECSignature.prototype.toCompact=function(i,compressed){if(compressed){i+=4}i+=27;var buffer=new Buffer(65);buffer.writeUInt8(i,0);this.r.toBuffer(32).copy(buffer,1);this.s.toBuffer(32).copy(buffer,33);return buffer};ECSignature.prototype.toDER=function(){var r=new Buffer(this.r.toDERInteger());var s=new Buffer(this.s.toDERInteger());return bip66.encode(r,s)};ECSignature.prototype.toScriptSignature=function(hashType){var hashTypeMod=hashType&~128;if(hashTypeMod<=0||hashTypeMod>=4)throw new Error("Invalid hashType "+hashType);var hashTypeBuffer=new Buffer(1);hashTypeBuffer.writeUInt8(hashType,0);return Buffer.concat([this.toDER(),hashTypeBuffer])};module.exports=ECSignature}).call(this,require("buffer").Buffer)},{"./types":49,bigi:3,bip66:5,buffer:53,typeforce:32}],41:[function(require,module,exports){(function(Buffer){var base58check=require("bs58check");var bcrypto=require("./crypto");var createHmac=require("create-hmac");var typeforce=require("typeforce");var types=require("./types");var NETWORKS=require("./networks");var BigInteger=require("bigi");var ECPair=require("./ecpair");var ecurve=require("ecurve");var curve=ecurve.getCurveByName("secp256k1");function HDNode(keyPair,chainCode){typeforce(types.tuple("ECPair",types.Buffer256bit),arguments);if(!keyPair.compressed)throw new TypeError("BIP32 only allows compressed keyPairs");this.keyPair=keyPair;this.chainCode=chainCode;this.depth=0;this.index=0;this.parentFingerprint=0}HDNode.HIGHEST_BIT=2147483648;HDNode.LENGTH=78;HDNode.MASTER_SECRET=new Buffer("Bitcoin seed");HDNode.fromSeedBuffer=function(seed,network){typeforce(types.tuple(types.Buffer,types.maybe(types.Network)),arguments);if(seed.length<16)throw new TypeError("Seed should be at least 128 bits");if(seed.length>64)throw new TypeError("Seed should be at most 512 bits");var I=createHmac("sha512",HDNode.MASTER_SECRET).update(seed).digest();var IL=I.slice(0,32);var IR=I.slice(32);var pIL=BigInteger.fromBuffer(IL);var keyPair=new ECPair(pIL,null,{network:network});return new HDNode(keyPair,IR)};HDNode.fromSeedHex=function(hex,network){return HDNode.fromSeedBuffer(new Buffer(hex,"hex"),network)};HDNode.fromBase58=function(string,networks){var buffer=base58check.decode(string);if(buffer.length!==78)throw new Error("Invalid buffer length");var version=buffer.readUInt32BE(0);var network;if(Array.isArray(networks)){network=networks.filter(function(network){return version===network.bip32.private||version===network.bip32.public}).pop()||{}}else{network=networks||NETWORKS.bitcoin}if(version!==network.bip32.private&&version!==network.bip32.public)throw new Error("Invalid network");var depth=buffer[4];var parentFingerprint=buffer.readUInt32BE(5);if(depth===0){if(parentFingerprint!==0)throw new Error("Invalid parent fingerprint")}var index=buffer.readUInt32BE(9);if(depth===0&&index!==0)throw new Error("Invalid index");var chainCode=buffer.slice(13,45);var keyPair;if(version===network.bip32.private){if(buffer.readUInt8(45)!==0)throw new Error("Invalid private key");var d=BigInteger.fromBuffer(buffer.slice(46,78));keyPair=new ECPair(d,null,{network:network})}else{var Q=ecurve.Point.decodeFrom(curve,buffer.slice(45,78));if(!Q.compressed)throw new Error("Invalid public key");curve.validate(Q);keyPair=new ECPair(null,Q,{network:network})}var hd=new HDNode(keyPair,chainCode);hd.depth=depth;hd.index=index;hd.parentFingerprint=parentFingerprint;return hd};HDNode.prototype.getAddress=function(){return this.keyPair.getAddress()};HDNode.prototype.getIdentifier=function(){return bcrypto.hash160(this.keyPair.getPublicKeyBuffer())};HDNode.prototype.getFingerprint=function(){return this.getIdentifier().slice(0,4)};HDNode.prototype.getNetwork=function(){return this.keyPair.getNetwork()};HDNode.prototype.getPublicKeyBuffer=function(){return this.keyPair.getPublicKeyBuffer()};HDNode.prototype.neutered=function(){var neuteredKeyPair=new ECPair(null,this.keyPair.Q,{network:this.keyPair.network});var neutered=new HDNode(neuteredKeyPair,this.chainCode);neutered.depth=this.depth;neutered.index=this.index;neutered.parentFingerprint=this.parentFingerprint;return neutered};HDNode.prototype.sign=function(hash){return this.keyPair.sign(hash)};HDNode.prototype.verify=function(hash,signature){return this.keyPair.verify(hash,signature)};HDNode.prototype.toBase58=function(__isPrivate){if(__isPrivate!==undefined)throw new TypeError("Unsupported argument in 2.0.0");var network=this.keyPair.network;var version=this.keyPair.d?network.bip32.private:network.bip32.public;var buffer=new Buffer(78);buffer.writeUInt32BE(version,0);buffer.writeUInt8(this.depth,4);buffer.writeUInt32BE(this.parentFingerprint,5);buffer.writeUInt32BE(this.index,9);this.chainCode.copy(buffer,13);if(this.keyPair.d){buffer.writeUInt8(0,45);this.keyPair.d.toBuffer(32).copy(buffer,46)}else{this.keyPair.getPublicKeyBuffer().copy(buffer,45);
}return base58check.encode(buffer)};HDNode.prototype.derive=function(index){var isHardened=index>=HDNode.HIGHEST_BIT;var data=new Buffer(37);if(isHardened){if(!this.keyPair.d)throw new TypeError("Could not derive hardened child key");data[0]=0;this.keyPair.d.toBuffer(32).copy(data,1);data.writeUInt32BE(index,33)}else{this.keyPair.getPublicKeyBuffer().copy(data,0);data.writeUInt32BE(index,33)}var I=createHmac("sha512",this.chainCode).update(data).digest();var IL=I.slice(0,32);var IR=I.slice(32);var pIL=BigInteger.fromBuffer(IL);if(pIL.compareTo(curve.n)>=0){return this.derive(index+1)}var derivedKeyPair;if(this.keyPair.d){var ki=pIL.add(this.keyPair.d).mod(curve.n);if(ki.signum()===0){return this.derive(index+1)}derivedKeyPair=new ECPair(ki,null,{network:this.keyPair.network})}else{var Ki=curve.G.multiply(pIL).add(this.keyPair.Q);if(curve.isInfinity(Ki)){return this.derive(index+1)}derivedKeyPair=new ECPair(null,Ki,{network:this.keyPair.network})}var hd=new HDNode(derivedKeyPair,IR);hd.depth=this.depth+1;hd.index=index;hd.parentFingerprint=this.getFingerprint().readUInt32BE(0);return hd};HDNode.prototype.deriveHardened=function(index){return this.derive(index+HDNode.HIGHEST_BIT)};HDNode.prototype.toString=HDNode.prototype.toBase58;module.exports=HDNode}).call(this,require("buffer").Buffer)},{"./crypto":37,"./ecpair":39,"./networks":43,"./types":49,bigi:3,bs58check:7,buffer:53,"create-hmac":15,ecurve:18,typeforce:32}],42:[function(require,module,exports){(function(Buffer){var bufferutils=require("./bufferutils");var bcrypto=require("./crypto");var ecdsa=require("./ecdsa");var networks=require("./networks");var BigInteger=require("bigi");var ECPair=require("./ecpair");var ECSignature=require("./ecsignature");function magicHash(message,network){var messagePrefix=new Buffer(network.messagePrefix);var messageBuffer=new Buffer(message);var lengthBuffer=bufferutils.varIntBuffer(messageBuffer.length);var buffer=Buffer.concat([messagePrefix,lengthBuffer,messageBuffer]);return bcrypto.hash256(buffer)}function sign(keyPair,message,network){network=network||networks.bitcoin;var hash=magicHash(message,network);var signature=keyPair.sign(hash);var e=BigInteger.fromBuffer(hash);var i=ecdsa.calcPubKeyRecoveryParam(e,signature,keyPair.Q);return signature.toCompact(i,keyPair.compressed)}function verify(address,signature,message,network){if(!Buffer.isBuffer(signature)){signature=new Buffer(signature,"base64")}network=network||networks.bitcoin;var hash=magicHash(message,network);var parsed=ECSignature.parseCompact(signature);var e=BigInteger.fromBuffer(hash);var Q=ecdsa.recoverPubKey(e,parsed.signature,parsed.i);var keyPair=new ECPair(null,Q,{compressed:parsed.compressed,network:network});return keyPair.getAddress()===address}module.exports={magicHash:magicHash,sign:sign,verify:verify}}).call(this,require("buffer").Buffer)},{"./bufferutils":36,"./crypto":37,"./ecdsa":38,"./ecpair":39,"./ecsignature":40,"./networks":43,bigi:3,buffer:53}],43:[function(require,module,exports){module.exports={bitcoin:{messagePrefix:"Bitcoin Signed Message:\n",bip32:{"public":76067358,"private":76066276},pubKeyHash:0,scriptHash:5,wif:128,dustThreshold:546},testnet:{messagePrefix:"Bitcoin Signed Message:\n",bip32:{"public":70617039,"private":70615956},pubKeyHash:111,scriptHash:196,wif:239,dustThreshold:546},litecoin:{messagePrefix:"Litecoin Signed Message:\n",bip32:{"public":27108450,"private":27106558},pubKeyHash:48,scriptHash:5,wif:176,dustThreshold:0},dogecoin:{messagePrefix:"Dogecoin Signed Message:\n",bip32:{"public":49990397,"private":49988504},pubKeyHash:30,scriptHash:22,wif:158,dustThreshold:0}}},{}],44:[function(require,module,exports){module.exports={OP_FALSE:0,OP_0:0,OP_PUSHDATA1:76,OP_PUSHDATA2:77,OP_PUSHDATA4:78,OP_1NEGATE:79,OP_RESERVED:80,OP_1:81,OP_TRUE:81,OP_2:82,OP_3:83,OP_4:84,OP_5:85,OP_6:86,OP_7:87,OP_8:88,OP_9:89,OP_10:90,OP_11:91,OP_12:92,OP_13:93,OP_14:94,OP_15:95,OP_16:96,OP_NOP:97,OP_VER:98,OP_IF:99,OP_NOTIF:100,OP_VERIF:101,OP_VERNOTIF:102,OP_ELSE:103,OP_ENDIF:104,OP_VERIFY:105,OP_RETURN:106,OP_TOALTSTACK:107,OP_FROMALTSTACK:108,OP_2DROP:109,OP_2DUP:110,OP_3DUP:111,OP_2OVER:112,OP_2ROT:113,OP_2SWAP:114,OP_IFDUP:115,OP_DEPTH:116,OP_DROP:117,OP_DUP:118,OP_NIP:119,OP_OVER:120,OP_PICK:121,OP_ROLL:122,OP_ROT:123,OP_SWAP:124,OP_TUCK:125,OP_CAT:126,OP_SUBSTR:127,OP_LEFT:128,OP_RIGHT:129,OP_SIZE:130,OP_INVERT:131,OP_AND:132,OP_OR:133,OP_XOR:134,OP_EQUAL:135,OP_EQUALVERIFY:136,OP_RESERVED1:137,OP_RESERVED2:138,OP_1ADD:139,OP_1SUB:140,OP_2MUL:141,OP_2DIV:142,OP_NEGATE:143,OP_ABS:144,OP_NOT:145,OP_0NOTEQUAL:146,OP_ADD:147,OP_SUB:148,OP_MUL:149,OP_DIV:150,OP_MOD:151,OP_LSHIFT:152,OP_RSHIFT:153,OP_BOOLAND:154,OP_BOOLOR:155,OP_NUMEQUAL:156,OP_NUMEQUALVERIFY:157,OP_NUMNOTEQUAL:158,OP_LESSTHAN:159,OP_GREATERTHAN:160,OP_LESSTHANOREQUAL:161,OP_GREATERTHANOREQUAL:162,OP_MIN:163,OP_MAX:164,OP_WITHIN:165,OP_RIPEMD160:166,OP_SHA1:167,OP_SHA256:168,OP_HASH160:169,OP_HASH256:170,OP_CODESEPARATOR:171,OP_CHECKSIG:172,OP_CHECKSIGVERIFY:173,OP_CHECKMULTISIG:174,OP_CHECKMULTISIGVERIFY:175,OP_NOP1:176,OP_NOP2:177,OP_CHECKLOCKTIMEVERIFY:177,OP_NOP3:178,OP_NOP4:179,OP_NOP5:180,OP_NOP6:181,OP_NOP7:182,OP_NOP8:183,OP_NOP9:184,OP_NOP10:185,OP_PUBKEYHASH:253,OP_PUBKEY:254,OP_INVALIDOPCODE:255}},{}],45:[function(require,module,exports){(function(Buffer){var bip66=require("bip66");var bufferutils=require("./bufferutils");var typeforce=require("typeforce");var types=require("./types");var OPS=require("./opcodes");var REVERSE_OPS=function(){var result={};for(var op in OPS){var code=OPS[op];result[code]=op}return result}();var OP_INT_BASE=OPS.OP_RESERVED;function toASM(chunks){if(Buffer.isBuffer(chunks)){chunks=decompile(chunks)}return chunks.map(function(chunk){if(Buffer.isBuffer(chunk))return chunk.toString("hex");return REVERSE_OPS[chunk]}).join(" ")}function fromASM(asm){typeforce(types.String,asm);return compile(asm.split(" ").map(function(chunkStr){if(OPS[chunkStr]!==undefined)return OPS[chunkStr];return new Buffer(chunkStr,"hex")}))}function compile(chunks){if(Buffer.isBuffer(chunks))return chunks;typeforce(types.Array,chunks);var bufferSize=chunks.reduce(function(accum,chunk){if(Buffer.isBuffer(chunk)){return accum+bufferutils.pushDataSize(chunk.length)+chunk.length}return accum+1},0);var buffer=new Buffer(bufferSize);var offset=0;chunks.forEach(function(chunk){if(Buffer.isBuffer(chunk)){offset+=bufferutils.writePushDataInt(buffer,chunk.length,offset);chunk.copy(buffer,offset);offset+=chunk.length}else{buffer.writeUInt8(chunk,offset);offset+=1}});if(offset!==buffer.length)throw new Error("Could not decode chunks");return buffer}function decompile(buffer){if(types.Array(buffer))return buffer;typeforce(types.Buffer,buffer);var chunks=[];var i=0;while(i<buffer.length){var opcode=buffer[i];if(opcode>OPS.OP_0&&opcode<=OPS.OP_PUSHDATA4){var d=bufferutils.readPushDataInt(buffer,i);if(d===null)return[];i+=d.size;if(i+d.number>buffer.length)return[];var data=buffer.slice(i,i+d.number);i+=d.number;chunks.push(data)}else{chunks.push(opcode);i+=1}}return chunks}function isCanonicalPubKey(buffer){if(!Buffer.isBuffer(buffer))return false;if(buffer.length<33)return false;switch(buffer[0]){case 2:case 3:return buffer.length===33;case 4:return buffer.length===65}return false}function isCanonicalSignature(buffer){if(!Buffer.isBuffer(buffer))return false;if(!isDefinedHashType(buffer[buffer.length-1]))return false;return bip66.check(buffer.slice(0,-1))}function isDefinedHashType(hashType){var hashTypeMod=hashType&~128;return hashTypeMod>0&&hashTypeMod<4}function isPubKeyHashInput(script){var chunks=decompile(script);return chunks.length===2&&isCanonicalSignature(chunks[0])&&isCanonicalPubKey(chunks[1])}function isPubKeyHashOutput(script){var buffer=compile(script);return buffer.length===25&&buffer[0]===OPS.OP_DUP&&buffer[1]===OPS.OP_HASH160&&buffer[2]===20&&buffer[23]===OPS.OP_EQUALVERIFY&&buffer[24]===OPS.OP_CHECKSIG}function isPubKeyInput(script){var chunks=decompile(script);return chunks.length===1&&isCanonicalSignature(chunks[0])}function isPubKeyOutput(script){var chunks=decompile(script);return chunks.length===2&&isCanonicalPubKey(chunks[0])&&chunks[1]===OPS.OP_CHECKSIG}function isScriptHashInput(script,allowIncomplete){var chunks=decompile(script);if(chunks.length<2)return false;var lastChunk=chunks[chunks.length-1];if(!Buffer.isBuffer(lastChunk))return false;var scriptSigChunks=chunks.slice(0,-1);var redeemScriptChunks=decompile(lastChunk);if(redeemScriptChunks.length===0)return false;return classifyInput(scriptSigChunks,allowIncomplete)===classifyOutput(redeemScriptChunks)}function isScriptHashOutput(script){var buffer=compile(script);return buffer.length===23&&buffer[0]===OPS.OP_HASH160&&buffer[1]===20&&buffer[22]===OPS.OP_EQUAL}function isMultisigInput(script,allowIncomplete){var chunks=decompile(script);if(chunks.length<2)return false;if(chunks[0]!==OPS.OP_0)return false;if(allowIncomplete){return chunks.slice(1).every(function(chunk){return chunk===OPS.OP_0||isCanonicalSignature(chunk)})}return chunks.slice(1).every(isCanonicalSignature)}function isMultisigOutput(script){var chunks=decompile(script);if(chunks.length<4)return false;if(chunks[chunks.length-1]!==OPS.OP_CHECKMULTISIG)return false;var mOp=chunks[0];var nOp=chunks[chunks.length-2];if(!types.Number(mOp))return false;if(!types.Number(nOp))return false;var m=mOp-OP_INT_BASE;var n=nOp-OP_INT_BASE;if(m<=0)return false;if(m>n)return false;if(n>16)return false;if(n!==chunks.length-3)return false;return chunks.slice(1,-2).every(isCanonicalPubKey)}function isNullDataOutput(script){var chunks=decompile(script);return chunks[0]===OPS.OP_RETURN}function classifyOutput(script){var chunks=decompile(script);if(isPubKeyHashOutput(chunks)){return"pubkeyhash"}else if(isScriptHashOutput(chunks)){return"scripthash"}else if(isMultisigOutput(chunks)){return"multisig"}else if(isPubKeyOutput(chunks)){return"pubkey"}else if(isNullDataOutput(chunks)){return"nulldata"}return"nonstandard"}function classifyInput(script,allowIncomplete){var chunks=decompile(script);if(isPubKeyHashInput(chunks)){return"pubkeyhash"}else if(isMultisigInput(chunks,allowIncomplete)){return"multisig"}else if(isScriptHashInput(chunks,allowIncomplete)){return"scripthash"}else if(isPubKeyInput(chunks)){return"pubkey"}return"nonstandard"}function pubKeyOutput(pubKey){return compile([pubKey,OPS.OP_CHECKSIG])}function pubKeyHashOutput(pubKeyHash){typeforce(types.Hash160bit,pubKeyHash);return compile([OPS.OP_DUP,OPS.OP_HASH160,pubKeyHash,OPS.OP_EQUALVERIFY,OPS.OP_CHECKSIG])}function scriptHashOutput(scriptHash){typeforce(types.Hash160bit,scriptHash);return compile([OPS.OP_HASH160,scriptHash,OPS.OP_EQUAL])}function multisigOutput(m,pubKeys){typeforce(types.tuple(types.Number,[types.Buffer]),arguments);var n=pubKeys.length;if(n<m)throw new Error("Not enough pubKeys provided");return compile([].concat(OP_INT_BASE+m,pubKeys,OP_INT_BASE+n,OPS.OP_CHECKMULTISIG))}function pubKeyInput(signature){typeforce(types.Buffer,signature);return compile([signature])}function pubKeyHashInput(signature,pubKey){typeforce(types.tuple(types.Buffer,types.Buffer),arguments);return compile([signature,pubKey])}function scriptHashInput(scriptSig,scriptPubKey){var scriptSigChunks=decompile(scriptSig);var serializedScriptPubKey=compile(scriptPubKey);return compile([].concat(scriptSigChunks,serializedScriptPubKey))}function multisigInput(signatures,scriptPubKey){if(scriptPubKey){var chunks=decompile(scriptPubKey);if(!isMultisigOutput(chunks))throw new Error("Expected multisig scriptPubKey");var mOp=chunks[0];var nOp=chunks[chunks.length-2];var m=mOp-OP_INT_BASE;var n=nOp-OP_INT_BASE;if(signatures.length<m)throw new Error("Not enough signatures provided");if(signatures.length>n)throw new Error("Too many signatures provided")}return compile([].concat(OPS.OP_0,signatures))}function nullDataOutput(data){return compile([OPS.OP_RETURN,data])}module.exports={compile:compile,decompile:decompile,fromASM:fromASM,toASM:toASM,number:require("./script_number"),isCanonicalPubKey:isCanonicalPubKey,isCanonicalSignature:isCanonicalSignature,isDefinedHashType:isDefinedHashType,isPubKeyHashInput:isPubKeyHashInput,isPubKeyHashOutput:isPubKeyHashOutput,isPubKeyInput:isPubKeyInput,isPubKeyOutput:isPubKeyOutput,isScriptHashInput:isScriptHashInput,isScriptHashOutput:isScriptHashOutput,isMultisigInput:isMultisigInput,isMultisigOutput:isMultisigOutput,isNullDataOutput:isNullDataOutput,classifyOutput:classifyOutput,classifyInput:classifyInput,pubKeyOutput:pubKeyOutput,pubKeyHashOutput:pubKeyHashOutput,scriptHashOutput:scriptHashOutput,multisigOutput:multisigOutput,pubKeyInput:pubKeyInput,pubKeyHashInput:pubKeyHashInput,scriptHashInput:scriptHashInput,multisigInput:multisigInput,nullDataOutput:nullDataOutput}}).call(this,require("buffer").Buffer)},{"./bufferutils":36,"./opcodes":44,"./script_number":46,"./types":49,bip66:5,buffer:53,typeforce:32}],46:[function(require,module,exports){(function(Buffer){function decode(buffer,maxLength,minimal){maxLength=maxLength||4;minimal=minimal===undefined?true:minimal;var length=buffer.length;if(length===0)return 0;if(length>maxLength)throw new TypeError("Script number overflow");if(minimal){if((buffer[length-1]&127)===0){if(length<=1||(buffer[length-2]&128)===0)throw new Error("Non-minimally encoded script number")}}if(length===5){var a=buffer.readUInt32LE(0);var b=buffer.readUInt8(4);if(b&128)return-((b&~128)*4294967296+a);return b*4294967296+a}var result=0;for(var i=0;i<length;++i){result|=buffer[i]<<8*i}if(buffer[length-1]&128)return-(result&~(128<<8*(length-1)));return result}function scriptNumSize(i){return i>2147483647?5:i>8388607?4:i>32767?3:i>127?2:i>0?1:0}function encode(number){var value=Math.abs(number);var size=scriptNumSize(value);var buffer=new Buffer(size);var negative=number<0;for(var i=0;i<size;++i){buffer.writeUInt8(value&255,i);value>>=8}if(buffer[size-1]&128){buffer.writeUInt8(negative?128:0,size-1)}else if(negative){buffer[size-1]|=128}return buffer}module.exports={decode:decode,encode:encode}}).call(this,require("buffer").Buffer)},{buffer:53}],47:[function(require,module,exports){(function(Buffer){var bcrypto=require("./crypto");var bscript=require("./script");var bufferutils=require("./bufferutils");var opcodes=require("./opcodes");var typeforce=require("typeforce");var types=require("./types");function Transaction(){this.version=1;this.locktime=0;this.ins=[];this.outs=[]}Transaction.DEFAULT_SEQUENCE=4294967295;Transaction.SIGHASH_ALL=1;Transaction.SIGHASH_NONE=2;Transaction.SIGHASH_SINGLE=3;Transaction.SIGHASH_ANYONECANPAY=128;Transaction.fromBuffer=function(buffer,__noStrict){var offset=0;function readSlice(n){offset+=n;return buffer.slice(offset-n,offset)}function readUInt32(){var i=buffer.readUInt32LE(offset);offset+=4;return i}function readUInt64(){var i=bufferutils.readUInt64LE(buffer,offset);offset+=8;return i}function readVarInt(){var vi=bufferutils.readVarInt(buffer,offset);offset+=vi.size;return vi.number}function readScript(){return readSlice(readVarInt())}var tx=new Transaction;tx.version=readUInt32();var vinLen=readVarInt();for(var i=0;i<vinLen;++i){tx.ins.push({hash:readSlice(32),index:readUInt32(),script:readScript(),sequence:readUInt32()})}var voutLen=readVarInt();for(i=0;i<voutLen;++i){tx.outs.push({value:readUInt64(),script:readScript()})}tx.locktime=readUInt32();if(__noStrict)return tx;if(offset!==buffer.length)throw new Error("Transaction has unexpected data");return tx};Transaction.fromHex=function(hex){return Transaction.fromBuffer(new Buffer(hex,"hex"))};Transaction.isCoinbaseHash=function(buffer){return Array.prototype.every.call(buffer,function(x){return x===0})};var EMPTY_SCRIPT=new Buffer(0);Transaction.prototype.addInput=function(hash,index,sequence,scriptSig){typeforce(types.tuple(types.Hash256bit,types.UInt32,types.maybe(types.UInt32),types.maybe(types.Buffer)),arguments);if(types.Null(sequence)){sequence=Transaction.DEFAULT_SEQUENCE}return this.ins.push({hash:hash,index:index,script:scriptSig||EMPTY_SCRIPT,sequence:sequence})-1};Transaction.prototype.addOutput=function(scriptPubKey,value){typeforce(types.tuple(types.Buffer,types.UInt53),arguments);return this.outs.push({script:scriptPubKey,value:value})-1};Transaction.prototype.byteLength=function(){function scriptSize(someScript){var length=someScript.length;return bufferutils.varIntSize(length)+length}return 8+bufferutils.varIntSize(this.ins.length)+bufferutils.varIntSize(this.outs.length)+this.ins.reduce(function(sum,input){return sum+40+scriptSize(input.script)},0)+this.outs.reduce(function(sum,output){return sum+8+scriptSize(output.script)},0)};Transaction.prototype.clone=function(){var newTx=new Transaction;newTx.version=this.version;newTx.locktime=this.locktime;newTx.ins=this.ins.map(function(txIn){return{hash:txIn.hash,index:txIn.index,script:txIn.script,sequence:txIn.sequence}});newTx.outs=this.outs.map(function(txOut){return{script:txOut.script,value:txOut.value}});return newTx};var ONE=new Buffer("0000000000000000000000000000000000000000000000000000000000000001","hex");var VALUE_UINT64_MAX=new Buffer("ffffffffffffffff","hex");Transaction.prototype.hashForSignature=function(inIndex,prevOutScript,hashType){typeforce(types.tuple(types.UInt32,types.Buffer,types.Number),arguments);if(inIndex>=this.ins.length)return ONE;var txTmp=this.clone();var hashScript=bscript.compile(bscript.decompile(prevOutScript).filter(function(x){return x!==opcodes.OP_CODESEPARATOR}));var i;txTmp.ins.forEach(function(input){input.script=EMPTY_SCRIPT});txTmp.ins[inIndex].script=hashScript;if((hashType&31)===Transaction.SIGHASH_NONE){txTmp.outs=[];txTmp.ins.forEach(function(input,i){if(i!==inIndex){input.sequence=0}})}else if((hashType&31)===Transaction.SIGHASH_SINGLE){var nOut=inIndex;if(nOut>=this.outs.length)return ONE;txTmp.outs=txTmp.outs.slice(0,nOut+1);var stubOut={script:EMPTY_SCRIPT,valueBuffer:VALUE_UINT64_MAX};for(i=0;i<nOut;i++){txTmp.outs[i]=stubOut}txTmp.ins.forEach(function(input,i){if(i!==inIndex){input.sequence=0}})}if(hashType&Transaction.SIGHASH_ANYONECANPAY){txTmp.ins[0]=txTmp.ins[inIndex];txTmp.ins=txTmp.ins.slice(0,1)}var buffer=new Buffer(txTmp.byteLength()+4);buffer.writeInt32LE(hashType,buffer.length-4);txTmp.toBuffer().copy(buffer,0);return bcrypto.hash256(buffer)};Transaction.prototype.getHash=function(){return bcrypto.hash256(this.toBuffer())};Transaction.prototype.getId=function(){return[].reverse.call(this.getHash()).toString("hex")};Transaction.prototype.toBuffer=function(){var buffer=new Buffer(this.byteLength());var offset=0;function writeSlice(slice){slice.copy(buffer,offset);offset+=slice.length}function writeUInt32(i){buffer.writeUInt32LE(i,offset);offset+=4}function writeUInt64(i){bufferutils.writeUInt64LE(buffer,i,offset);offset+=8}function writeVarInt(i){var n=bufferutils.writeVarInt(buffer,i,offset);offset+=n}writeUInt32(this.version);writeVarInt(this.ins.length);this.ins.forEach(function(txIn){writeSlice(txIn.hash);writeUInt32(txIn.index);writeVarInt(txIn.script.length);writeSlice(txIn.script);writeUInt32(txIn.sequence)});writeVarInt(this.outs.length);this.outs.forEach(function(txOut){if(!txOut.valueBuffer){writeUInt64(txOut.value)}else{writeSlice(txOut.valueBuffer)}writeVarInt(txOut.script.length);writeSlice(txOut.script)});writeUInt32(this.locktime);return buffer};Transaction.prototype.toHex=function(){return this.toBuffer().toString("hex")};Transaction.prototype.setInputScript=function(index,scriptSig){typeforce(types.tuple(types.Number,types.Buffer),arguments);this.ins[index].script=scriptSig};module.exports=Transaction}).call(this,require("buffer").Buffer)},{"./bufferutils":36,"./crypto":37,"./opcodes":44,"./script":45,"./types":49,buffer:53,typeforce:32}],48:[function(require,module,exports){(function(Buffer){var baddress=require("./address");var bcrypto=require("./crypto");var bscript=require("./script");var bufferEquals=require("buffer-equals");var networks=require("./networks");var ops=require("./opcodes");var typeforce=require("typeforce");var types=require("./types");var ECPair=require("./ecpair");var ECSignature=require("./ecsignature");var Transaction=require("./transaction");function fixMSSignatures(transaction,vin,pubKeys,signatures,prevOutScript,hashType,skipPubKey){var unmatched=signatures.slice();var cache={};return pubKeys.map(function(pubKey){if(skipPubKey&&bufferEquals(skipPubKey,pubKey))return undefined;var matched;var keyPair2=ECPair.fromPublicKeyBuffer(pubKey);unmatched.some(function(signature,i){if(!signature)return false;var signatureHash=cache[hashType]=cache[hashType]||transaction.hashForSignature(vin,prevOutScript,hashType);if(!keyPair2.verify(signatureHash,signature))return false;unmatched[i]=undefined;matched=signature;return true});return matched||undefined})}function extractInput(transaction,txIn,vin){var redeemScript;var scriptSig=txIn.script;var scriptSigChunks=bscript.decompile(scriptSig);var prevOutScript;var prevOutType=bscript.classifyInput(scriptSig,true);var scriptType;if(prevOutType==="scripthash"){redeemScript=scriptSigChunks.slice(-1)[0];prevOutScript=bscript.scriptHashOutput(bcrypto.hash160(redeemScript));scriptSig=bscript.compile(scriptSigChunks.slice(0,-1));scriptSigChunks=scriptSigChunks.slice(0,-1);scriptType=bscript.classifyInput(scriptSig,true)}else{scriptType=prevOutType}var redeemScriptChunks;if(redeemScript){redeemScriptChunks=bscript.decompile(redeemScript)}var hashType,parsed,pubKeys,signatures;switch(scriptType){case"pubkeyhash":parsed=ECSignature.parseScriptSignature(scriptSigChunks[0]);hashType=parsed.hashType;pubKeys=scriptSigChunks.slice(1);signatures=[parsed.signature];prevOutScript=bscript.pubKeyHashOutput(bcrypto.hash160(pubKeys[0]));break;case"pubkey":parsed=ECSignature.parseScriptSignature(scriptSigChunks[0]);hashType=parsed.hashType;signatures=[parsed.signature];if(redeemScript){pubKeys=redeemScriptChunks.slice(0,1)}break;case"multisig":signatures=scriptSigChunks.slice(1).map(function(chunk){if(chunk===ops.OP_0)return undefined;var parsed=ECSignature.parseScriptSignature(chunk);hashType=parsed.hashType;return parsed.signature});if(redeemScript){pubKeys=redeemScriptChunks.slice(1,-2);if(pubKeys.length!==signatures.length){signatures=fixMSSignatures(transaction,vin,pubKeys,signatures,redeemScript,hashType,redeemScript)}}break}return{hashType:hashType,prevOutScript:prevOutScript,prevOutType:prevOutType,pubKeys:pubKeys,redeemScript:redeemScript,scriptType:scriptType,signatures:signatures}}function TransactionBuilder(network){this.prevTxMap={};this.prevOutScripts={};this.prevOutTypes={};this.network=network||networks.bitcoin;this.inputs=[];this.tx=new Transaction}TransactionBuilder.prototype.setLockTime=function(locktime){typeforce(types.UInt32,locktime);if(this.inputs.some(function(input){if(!input.signatures)return false;return input.signatures.some(function(s){return s})})){throw new Error("No, this would invalidate signatures")}this.tx.locktime=locktime};TransactionBuilder.fromTransaction=function(transaction,network){var txb=new TransactionBuilder(network);txb.tx.version=transaction.version;txb.tx.locktime=transaction.locktime;transaction.ins.forEach(function(txIn){txb.addInput(txIn.hash,txIn.index,txIn.sequence)});transaction.outs.forEach(function(txOut){txb.addOutput(txOut.script,txOut.value)});txb.inputs=transaction.ins.map(function(txIn,vin){if(Transaction.isCoinbaseHash(txIn.hash)){throw new Error("coinbase inputs not supported")}if(txIn.script.length===0)return{};return extractInput(transaction,txIn,vin)});return txb};TransactionBuilder.prototype.addInput=function(txHash,vout,sequence,prevOutScript){if(typeof txHash==="string"){txHash=[].reverse.call(new Buffer(txHash,"hex"))}else if(txHash instanceof Transaction){prevOutScript=txHash.outs[vout].script;txHash=txHash.getHash()}var input={};if(prevOutScript){var prevOutScriptChunks=bscript.decompile(prevOutScript);var prevOutType=bscript.classifyOutput(prevOutScriptChunks);switch(prevOutType){case"multisig":input.pubKeys=prevOutScriptChunks.slice(1,-2);input.signatures=input.pubKeys.map(function(){return undefined});break;case"pubkey":input.pubKeys=prevOutScriptChunks.slice(0,1);input.signatures=[undefined];break}if(prevOutType!=="scripthash"){input.scriptType=prevOutType}input.prevOutScript=prevOutScript;input.prevOutType=prevOutType}if(!this.inputs.every(function(otherInput){if(otherInput.hashType===undefined)return true;return otherInput.hashType&Transaction.SIGHASH_ANYONECANPAY})){throw new Error("No, this would invalidate signatures")}var prevOut=txHash.toString("hex")+":"+vout;if(this.prevTxMap[prevOut])throw new Error("Transaction is already an input");var vin=this.tx.addInput(txHash,vout,sequence);this.inputs[vin]=input;this.prevTxMap[prevOut]=vin;return vin};TransactionBuilder.prototype.addOutput=function(scriptPubKey,value){var nOutputs=this.tx.outs.length;if(!this.inputs.every(function(input,index){if(input.hashType===undefined)return true;var hashTypeMod=input.hashType&31;if(hashTypeMod===Transaction.SIGHASH_NONE)return true;if(hashTypeMod===Transaction.SIGHASH_SINGLE){return index<nOutputs}return false})){throw new Error("No, this would invalidate signatures")}if(typeof scriptPubKey==="string"){scriptPubKey=baddress.toOutputScript(scriptPubKey,this.network)}return this.tx.addOutput(scriptPubKey,value)};TransactionBuilder.prototype.build=function(){return this.__build(false)};TransactionBuilder.prototype.buildIncomplete=function(){return this.__build(true)};var canBuildTypes={multisig:true,pubkey:true,pubkeyhash:true};TransactionBuilder.prototype.__build=function(allowIncomplete){if(!allowIncomplete){if(!this.tx.ins.length)throw new Error("Transaction has no inputs");if(!this.tx.outs.length)throw new Error("Transaction has no outputs")}var tx=this.tx.clone();this.inputs.forEach(function(input,index){var scriptType=input.scriptType;var scriptSig;if(!allowIncomplete){if(!scriptType)throw new Error("Transaction is not complete");if(!canBuildTypes[scriptType])throw new Error(scriptType+" not supported");if(!input.signatures)throw new Error("Transaction is missing signatures")}if(input.signatures){switch(scriptType){case"pubkeyhash":var pkhSignature=input.signatures[0].toScriptSignature(input.hashType);scriptSig=bscript.pubKeyHashInput(pkhSignature,input.pubKeys[0]);break;case"multisig":var msSignatures=input.signatures.map(function(signature){return signature&&signature.toScriptSignature(input.hashType)});if(allowIncomplete){for(var i=0;i<msSignatures.length;++i){msSignatures[i]=msSignatures[i]||ops.OP_0}}else{msSignatures=msSignatures.filter(function(x){return x})}var redeemScript=allowIncomplete?undefined:input.redeemScript;scriptSig=bscript.multisigInput(msSignatures,redeemScript);break;case"pubkey":var pkSignature=input.signatures[0].toScriptSignature(input.hashType);scriptSig=bscript.pubKeyInput(pkSignature);break}}if(scriptSig){if(input.prevOutType==="scripthash"){scriptSig=bscript.scriptHashInput(scriptSig,input.redeemScript)}tx.setInputScript(index,scriptSig)}});return tx};TransactionBuilder.prototype.sign=function(index,keyPair,redeemScript,hashType){if(keyPair.network!==this.network)throw new Error("Inconsistent network");if(!this.inputs[index])throw new Error("No input at index: "+index);hashType=hashType||Transaction.SIGHASH_ALL;var input=this.inputs[index];var canSign=input.hashType&&input.prevOutScript&&input.prevOutType&&input.pubKeys&&input.scriptType&&input.signatures&&input.signatures.length===input.pubKeys.length;var kpPubKey=keyPair.getPublicKeyBuffer();if(canSign){if(redeemScript){if(!bufferEquals(input.redeemScript,redeemScript))throw new Error("Inconsistent redeemScript")}if(input.hashType!==hashType)throw new Error("Inconsistent hashType")}else{if(redeemScript){if(input.prevOutScript){if(input.prevOutType!=="scripthash")throw new Error("PrevOutScript must be P2SH");var scriptHash=bscript.decompile(input.prevOutScript)[1];if(!bufferEquals(scriptHash,bcrypto.hash160(redeemScript)))throw new Error("RedeemScript does not match "+scriptHash.toString("hex"))}var scriptType=bscript.classifyOutput(redeemScript);var redeemScriptChunks=bscript.decompile(redeemScript);var pubKeys;switch(scriptType){case"multisig":pubKeys=redeemScriptChunks.slice(1,-2);break;case"pubkeyhash":var pkh1=redeemScriptChunks[2];var pkh2=bcrypto.hash160(keyPair.getPublicKeyBuffer());if(!bufferEquals(pkh1,pkh2))throw new Error("privateKey cannot sign for this input");pubKeys=[kpPubKey];break;case"pubkey":pubKeys=redeemScriptChunks.slice(0,1);break;default:throw new Error("RedeemScript not supported ("+scriptType+")")}if(!input.prevOutScript){input.prevOutScript=bscript.scriptHashOutput(bcrypto.hash160(redeemScript));input.prevOutType="scripthash"}input.pubKeys=pubKeys;input.redeemScript=redeemScript;input.scriptType=scriptType;input.signatures=pubKeys.map(function(){return undefined})}else{if(input.prevOutType==="scripthash")throw new Error("PrevOutScript is P2SH, missing redeemScript");if(!input.scriptType){input.prevOutScript=bscript.pubKeyHashOutput(bcrypto.hash160(keyPair.getPublicKeyBuffer()));input.prevOutType="pubkeyhash";input.pubKeys=[kpPubKey];input.scriptType=input.prevOutType;input.signatures=[undefined]}else{if(!input.pubKeys||!input.signatures)throw new Error(input.scriptType+" not supported")}}input.hashType=hashType}var signatureScript=input.redeemScript||input.prevOutScript;var signatureHash=this.tx.hashForSignature(index,signatureScript,hashType);var valid=input.pubKeys.some(function(pubKey,i){if(!bufferEquals(kpPubKey,pubKey))return false;if(input.signatures[i])throw new Error("Signature already exists");var signature=keyPair.sign(signatureHash);input.signatures[i]=signature;return true});if(!valid)throw new Error("Key pair cannot sign for this input")};module.exports=TransactionBuilder}).call(this,require("buffer").Buffer)},{"./address":34,"./crypto":37,"./ecpair":39,"./ecsignature":40,"./networks":43,"./opcodes":44,"./script":45,"./transaction":47,"./types":49,buffer:53,"buffer-equals":9,typeforce:32}],49:[function(require,module,exports){var typeforce=require("typeforce");function nBuffer(value,n){typeforce(types.Buffer,value);if(value.length!==n)throw new typeforce.TfTypeError("Expected "+n*8+"-bit Buffer, got "+value.length*8+"-bit Buffer");return true}function Hash160bit(value){return nBuffer(value,20)}function Hash256bit(value){return nBuffer(value,32)}function Buffer256bit(value){return nBuffer(value,32)}var UINT53_MAX=Math.pow(2,53)-1;function UInt2(value){return(value&3)===value}function UInt8(value){return(value&255)===value}function UInt32(value){return value>>>0===value}function UInt53(value){return typeforce.Number(value)&&value>=0&&value<=UINT53_MAX&&Math.floor(value)===value}var BigInt=typeforce.quacksLike("BigInteger");var ECPoint=typeforce.quacksLike("Point");var ECSignature=typeforce.compile({r:BigInt,s:BigInt});var Network=typeforce.compile({messagePrefix:typeforce.oneOf(typeforce.Buffer,typeforce.String),bip32:{"public":UInt32,"private":UInt32},pubKeyHash:UInt8,scriptHash:UInt8,wif:UInt8,dustThreshold:UInt53});var types={BigInt:BigInt,Buffer256bit:Buffer256bit,ECPoint:ECPoint,ECSignature:ECSignature,Hash160bit:Hash160bit,Hash256bit:Hash256bit,Network:Network,UInt2:UInt2,UInt8:UInt8,UInt32:UInt32,UInt53:UInt53};for(var typeName in typeforce){types[typeName]=typeforce[typeName]}module.exports=types},{typeforce:32}],50:[function(require,module,exports){var util=require("util/");var pSlice=Array.prototype.slice;var hasOwn=Object.prototype.hasOwnProperty;var assert=module.exports=ok;assert.AssertionError=function AssertionError(options){this.name="AssertionError";this.actual=options.actual;this.expected=options.expected;this.operator=options.operator;if(options.message){this.message=options.message;this.generatedMessage=false}else{this.message=getMessage(this);this.generatedMessage=true}var stackStartFunction=options.stackStartFunction||fail;if(Error.captureStackTrace){Error.captureStackTrace(this,stackStartFunction)}else{var err=new Error;if(err.stack){var out=err.stack;var fn_name=stackStartFunction.name;
var idx=out.indexOf("\n"+fn_name);if(idx>=0){var next_line=out.indexOf("\n",idx+1);out=out.substring(next_line+1)}this.stack=out}}};util.inherits(assert.AssertionError,Error);function replacer(key,value){if(util.isUndefined(value)){return""+value}if(util.isNumber(value)&&!isFinite(value)){return value.toString()}if(util.isFunction(value)||util.isRegExp(value)){return value.toString()}return value}function truncate(s,n){if(util.isString(s)){return s.length<n?s:s.slice(0,n)}else{return s}}function getMessage(self){return truncate(JSON.stringify(self.actual,replacer),128)+" "+self.operator+" "+truncate(JSON.stringify(self.expected,replacer),128)}function fail(actual,expected,message,operator,stackStartFunction){throw new assert.AssertionError({message:message,actual:actual,expected:expected,operator:operator,stackStartFunction:stackStartFunction})}assert.fail=fail;function ok(value,message){if(!value)fail(value,true,message,"==",assert.ok)}assert.ok=ok;assert.equal=function equal(actual,expected,message){if(actual!=expected)fail(actual,expected,message,"==",assert.equal)};assert.notEqual=function notEqual(actual,expected,message){if(actual==expected){fail(actual,expected,message,"!=",assert.notEqual)}};assert.deepEqual=function deepEqual(actual,expected,message){if(!_deepEqual(actual,expected)){fail(actual,expected,message,"deepEqual",assert.deepEqual)}};function _deepEqual(actual,expected){if(actual===expected){return true}else if(util.isBuffer(actual)&&util.isBuffer(expected)){if(actual.length!=expected.length)return false;for(var i=0;i<actual.length;i++){if(actual[i]!==expected[i])return false}return true}else if(util.isDate(actual)&&util.isDate(expected)){return actual.getTime()===expected.getTime()}else if(util.isRegExp(actual)&&util.isRegExp(expected)){return actual.source===expected.source&&actual.global===expected.global&&actual.multiline===expected.multiline&&actual.lastIndex===expected.lastIndex&&actual.ignoreCase===expected.ignoreCase}else if(!util.isObject(actual)&&!util.isObject(expected)){return actual==expected}else{return objEquiv(actual,expected)}}function isArguments(object){return Object.prototype.toString.call(object)=="[object Arguments]"}function objEquiv(a,b){if(util.isNullOrUndefined(a)||util.isNullOrUndefined(b))return false;if(a.prototype!==b.prototype)return false;if(util.isPrimitive(a)||util.isPrimitive(b)){return a===b}var aIsArgs=isArguments(a),bIsArgs=isArguments(b);if(aIsArgs&&!bIsArgs||!aIsArgs&&bIsArgs)return false;if(aIsArgs){a=pSlice.call(a);b=pSlice.call(b);return _deepEqual(a,b)}var ka=objectKeys(a),kb=objectKeys(b),key,i;if(ka.length!=kb.length)return false;ka.sort();kb.sort();for(i=ka.length-1;i>=0;i--){if(ka[i]!=kb[i])return false}for(i=ka.length-1;i>=0;i--){key=ka[i];if(!_deepEqual(a[key],b[key]))return false}return true}assert.notDeepEqual=function notDeepEqual(actual,expected,message){if(_deepEqual(actual,expected)){fail(actual,expected,message,"notDeepEqual",assert.notDeepEqual)}};assert.strictEqual=function strictEqual(actual,expected,message){if(actual!==expected){fail(actual,expected,message,"===",assert.strictEqual)}};assert.notStrictEqual=function notStrictEqual(actual,expected,message){if(actual===expected){fail(actual,expected,message,"!==",assert.notStrictEqual)}};function expectedException(actual,expected){if(!actual||!expected){return false}if(Object.prototype.toString.call(expected)=="[object RegExp]"){return expected.test(actual)}else if(actual instanceof expected){return true}else if(expected.call({},actual)===true){return true}return false}function _throws(shouldThrow,block,expected,message){var actual;if(util.isString(expected)){message=expected;expected=null}try{block()}catch(e){actual=e}message=(expected&&expected.name?" ("+expected.name+").":".")+(message?" "+message:".");if(shouldThrow&&!actual){fail(actual,expected,"Missing expected exception"+message)}if(!shouldThrow&&expectedException(actual,expected)){fail(actual,expected,"Got unwanted exception"+message)}if(shouldThrow&&actual&&expected&&!expectedException(actual,expected)||!shouldThrow&&actual){throw actual}}assert.throws=function(block,error,message){_throws.apply(this,[true].concat(pSlice.call(arguments)))};assert.doesNotThrow=function(block,message){_throws.apply(this,[false].concat(pSlice.call(arguments)))};assert.ifError=function(err){if(err){throw err}};var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj){if(hasOwn.call(obj,key))keys.push(key)}return keys}},{"util/":77}],51:[function(require,module,exports){"use strict";exports.toByteArray=toByteArray;exports.fromByteArray=fromByteArray;var lookup=[];var revLookup=[];var Arr=typeof Uint8Array!=="undefined"?Uint8Array:Array;function init(){var i;var code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var len=code.length;for(i=0;i<len;i++){lookup[i]=code[i]}for(i=0;i<len;++i){revLookup[code.charCodeAt(i)]=i}revLookup["-".charCodeAt(0)]=62;revLookup["_".charCodeAt(0)]=63}init();function toByteArray(b64){var i,j,l,tmp,placeHolders,arr;var len=b64.length;if(len%4>0){throw new Error("Invalid string. Length must be a multiple of 4")}placeHolders=b64[len-2]==="="?2:b64[len-1]==="="?1:0;arr=new Arr(len*3/4-placeHolders);l=placeHolders>0?len-4:len;var L=0;for(i=0,j=0;i<l;i+=4,j+=3){tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];arr[L++]=(tmp&16711680)>>16;arr[L++]=(tmp&65280)>>8;arr[L++]=tmp&255}if(placeHolders===2){tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;arr[L++]=tmp&255}else if(placeHolders===1){tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;arr[L++]=tmp>>8&255;arr[L++]=tmp&255}return arr}function tripletToBase64(num){return lookup[num>>18&63]+lookup[num>>12&63]+lookup[num>>6&63]+lookup[num&63]}function encodeChunk(uint8,start,end){var tmp;var output=[];for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];output.push(tripletToBase64(tmp))}return output.join("")}function fromByteArray(uint8){var tmp;var len=uint8.length;var extraBytes=len%3;var output="";var parts=[];var maxChunkLength=16383;for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength))}if(extraBytes===1){tmp=uint8[len-1];output+=lookup[tmp>>2];output+=lookup[tmp<<4&63];output+="=="}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+uint8[len-1];output+=lookup[tmp>>10];output+=lookup[tmp>>4&63];output+=lookup[tmp<<2&63];output+="="}parts.push(output);return parts.join("")}},{}],52:[function(require,module,exports){},{}],53:[function(require,module,exports){(function(global){"use strict";var base64=require("base64-js");var ieee754=require("ieee754");var isArray=require("isarray");exports.Buffer=Buffer;exports.SlowBuffer=SlowBuffer;exports.INSPECT_MAX_BYTES=50;Buffer.poolSize=8192;var rootParent={};Buffer.TYPED_ARRAY_SUPPORT=global.TYPED_ARRAY_SUPPORT!==undefined?global.TYPED_ARRAY_SUPPORT:typedArraySupport();function typedArraySupport(){try{var arr=new Uint8Array(1);arr.foo=function(){return 42};return arr.foo()===42&&typeof arr.subarray==="function"&&arr.subarray(1,1).byteLength===0}catch(e){return false}}function kMaxLength(){return Buffer.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function Buffer(arg){if(!(this instanceof Buffer)){if(arguments.length>1)return new Buffer(arg,arguments[1]);return new Buffer(arg)}if(!Buffer.TYPED_ARRAY_SUPPORT){this.length=0;this.parent=undefined}if(typeof arg==="number"){return fromNumber(this,arg)}if(typeof arg==="string"){return fromString(this,arg,arguments.length>1?arguments[1]:"utf8")}return fromObject(this,arg)}Buffer._augment=function(arr){arr.__proto__=Buffer.prototype;return arr};function fromNumber(that,length){that=allocate(that,length<0?0:checked(length)|0);if(!Buffer.TYPED_ARRAY_SUPPORT){for(var i=0;i<length;i++){that[i]=0}}return that}function fromString(that,string,encoding){if(typeof encoding!=="string"||encoding==="")encoding="utf8";var length=byteLength(string,encoding)|0;that=allocate(that,length);that.write(string,encoding);return that}function fromObject(that,object){if(Buffer.isBuffer(object))return fromBuffer(that,object);if(isArray(object))return fromArray(that,object);if(object==null){throw new TypeError("must start with number, buffer, array or string")}if(typeof ArrayBuffer!=="undefined"){if(object.buffer instanceof ArrayBuffer){return fromTypedArray(that,object)}if(object instanceof ArrayBuffer){return fromArrayBuffer(that,object)}}if(object.length)return fromArrayLike(that,object);return fromJsonObject(that,object)}function fromBuffer(that,buffer){var length=checked(buffer.length)|0;that=allocate(that,length);buffer.copy(that,0,0,length);return that}function fromArray(that,array){var length=checked(array.length)|0;that=allocate(that,length);for(var i=0;i<length;i+=1){that[i]=array[i]&255}return that}function fromTypedArray(that,array){var length=checked(array.length)|0;that=allocate(that,length);for(var i=0;i<length;i+=1){that[i]=array[i]&255}return that}function fromArrayBuffer(that,array){array.byteLength;if(Buffer.TYPED_ARRAY_SUPPORT){that=new Uint8Array(array);that.__proto__=Buffer.prototype}else{that=fromTypedArray(that,new Uint8Array(array))}return that}function fromArrayLike(that,array){var length=checked(array.length)|0;that=allocate(that,length);for(var i=0;i<length;i+=1){that[i]=array[i]&255}return that}function fromJsonObject(that,object){var array;var length=0;if(object.type==="Buffer"&&isArray(object.data)){array=object.data;length=checked(array.length)|0}that=allocate(that,length);for(var i=0;i<length;i+=1){that[i]=array[i]&255}return that}if(Buffer.TYPED_ARRAY_SUPPORT){Buffer.prototype.__proto__=Uint8Array.prototype;Buffer.__proto__=Uint8Array;if(typeof Symbol!=="undefined"&&Symbol.species&&Buffer[Symbol.species]===Buffer){Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:true})}}else{Buffer.prototype.length=undefined;Buffer.prototype.parent=undefined}function allocate(that,length){if(Buffer.TYPED_ARRAY_SUPPORT){that=new Uint8Array(length);that.__proto__=Buffer.prototype}else{that.length=length}var fromPool=length!==0&&length<=Buffer.poolSize>>>1;if(fromPool)that.parent=rootParent;return that}function checked(length){if(length>=kMaxLength()){throw new RangeError("Attempt to allocate Buffer larger than maximum "+"size: 0x"+kMaxLength().toString(16)+" bytes")}return length|0}function SlowBuffer(subject,encoding){if(!(this instanceof SlowBuffer))return new SlowBuffer(subject,encoding);var buf=new Buffer(subject,encoding);delete buf.parent;return buf}Buffer.isBuffer=function isBuffer(b){return!!(b!=null&&b._isBuffer)};Buffer.compare=function compare(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError("Arguments must be Buffers")}if(a===b)return 0;var x=a.length;var y=b.length;var i=0;var len=Math.min(x,y);while(i<len){if(a[i]!==b[i])break;++i}if(i!==len){x=a[i];y=b[i]}if(x<y)return-1;if(y<x)return 1;return 0};Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return true;default:return false}};Buffer.concat=function concat(list,length){if(!isArray(list))throw new TypeError("list argument must be an Array of Buffers.");if(list.length===0){return new Buffer(0)}var i;if(length===undefined){length=0;for(i=0;i<list.length;i++){length+=list[i].length}}var buf=new Buffer(length);var pos=0;for(i=0;i<list.length;i++){var item=list[i];item.copy(buf,pos);pos+=item.length}return buf};function byteLength(string,encoding){if(typeof string!=="string")string=""+string;var len=string.length;if(len===0)return 0;var loweredCase=false;for(;;){switch(encoding){case"ascii":case"binary":case"raw":case"raws":return len;case"utf8":case"utf-8":return utf8ToBytes(string).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return len*2;case"hex":return len>>>1;case"base64":return base64ToBytes(string).length;default:if(loweredCase)return utf8ToBytes(string).length;encoding=(""+encoding).toLowerCase();loweredCase=true}}}Buffer.byteLength=byteLength;function slowToString(encoding,start,end){var loweredCase=false;start=start|0;end=end===undefined||end===Infinity?this.length:end|0;if(!encoding)encoding="utf8";if(start<0)start=0;if(end>this.length)end=this.length;if(end<=start)return"";while(true){switch(encoding){case"hex":return hexSlice(this,start,end);case"utf8":case"utf-8":return utf8Slice(this,start,end);case"ascii":return asciiSlice(this,start,end);case"binary":return binarySlice(this,start,end);case"base64":return base64Slice(this,start,end);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(encoding+"").toLowerCase();loweredCase=true}}}Buffer.prototype._isBuffer=true;Buffer.prototype.toString=function toString(){var length=this.length|0;if(length===0)return"";if(arguments.length===0)return utf8Slice(this,0,length);return slowToString.apply(this,arguments)};Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError("Argument must be a Buffer");if(this===b)return true;return Buffer.compare(this,b)===0};Buffer.prototype.inspect=function inspect(){var str="";var max=exports.INSPECT_MAX_BYTES;if(this.length>0){str=this.toString("hex",0,max).match(/.{2}/g).join(" ");if(this.length>max)str+=" ... "}return"<Buffer "+str+">"};Buffer.prototype.compare=function compare(b){if(!Buffer.isBuffer(b))throw new TypeError("Argument must be a Buffer");if(this===b)return 0;return Buffer.compare(this,b)};Buffer.prototype.indexOf=function indexOf(val,byteOffset){if(byteOffset>2147483647)byteOffset=2147483647;else if(byteOffset<-2147483648)byteOffset=-2147483648;byteOffset>>=0;if(this.length===0)return-1;if(byteOffset>=this.length)return-1;if(byteOffset<0)byteOffset=Math.max(this.length+byteOffset,0);if(typeof val==="string"){if(val.length===0)return-1;return String.prototype.indexOf.call(this,val,byteOffset)}if(Buffer.isBuffer(val)){return arrayIndexOf(this,val,byteOffset)}if(typeof val==="number"){if(Buffer.TYPED_ARRAY_SUPPORT&&Uint8Array.prototype.indexOf==="function"){return Uint8Array.prototype.indexOf.call(this,val,byteOffset)}return arrayIndexOf(this,[val],byteOffset)}function arrayIndexOf(arr,val,byteOffset){var foundIndex=-1;for(var i=0;byteOffset+i<arr.length;i++){if(arr[byteOffset+i]===val[foundIndex===-1?0:i-foundIndex]){if(foundIndex===-1)foundIndex=i;if(i-foundIndex+1===val.length)return byteOffset+foundIndex}else{foundIndex=-1}}return-1}throw new TypeError("val must be string, number or Buffer")};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining}else{length=Number(length);if(length>remaining){length=remaining}}var strLen=string.length;if(strLen%2!==0)throw new Error("Invalid hex string");if(length>strLen/2){length=strLen/2}for(var i=0;i<length;i++){var parsed=parseInt(string.substr(i*2,2),16);if(isNaN(parsed))throw new Error("Invalid hex string");buf[offset+i]=parsed}return i}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length)}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length)}function binaryWrite(buf,string,offset,length){return asciiWrite(buf,string,offset,length)}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length)}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length)}Buffer.prototype.write=function write(string,offset,length,encoding){if(offset===undefined){encoding="utf8";length=this.length;offset=0}else if(length===undefined&&typeof offset==="string"){encoding=offset;length=this.length;offset=0}else if(isFinite(offset)){offset=offset|0;if(isFinite(length)){length=length|0;if(encoding===undefined)encoding="utf8"}else{encoding=length;length=undefined}}else{var swap=encoding;encoding=offset;offset=length|0;length=swap}var remaining=this.length-offset;if(length===undefined||length>remaining)length=remaining;if(string.length>0&&(length<0||offset<0)||offset>this.length){throw new RangeError("attempt to write outside buffer bounds")}if(!encoding)encoding="utf8";var loweredCase=false;for(;;){switch(encoding){case"hex":return hexWrite(this,string,offset,length);case"utf8":case"utf-8":return utf8Write(this,string,offset,length);case"ascii":return asciiWrite(this,string,offset,length);case"binary":return binaryWrite(this,string,offset,length);case"base64":return base64Write(this,string,offset,length);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(""+encoding).toLowerCase();loweredCase=true}}};Buffer.prototype.toJSON=function toJSON(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf)}else{return base64.fromByteArray(buf.slice(start,end))}}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);var res=[];var i=start;while(i<end){var firstByte=buf[i];var codePoint=null;var bytesPerSequence=firstByte>239?4:firstByte>223?3:firstByte>191?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:if(firstByte<128){codePoint=firstByte}break;case 2:secondByte=buf[i+1];if((secondByte&192)===128){tempCodePoint=(firstByte&31)<<6|secondByte&63;if(tempCodePoint>127){codePoint=tempCodePoint}}break;case 3:secondByte=buf[i+1];thirdByte=buf[i+2];if((secondByte&192)===128&&(thirdByte&192)===128){tempCodePoint=(firstByte&15)<<12|(secondByte&63)<<6|thirdByte&63;if(tempCodePoint>2047&&(tempCodePoint<55296||tempCodePoint>57343)){codePoint=tempCodePoint}}break;case 4:secondByte=buf[i+1];thirdByte=buf[i+2];fourthByte=buf[i+3];if((secondByte&192)===128&&(thirdByte&192)===128&&(fourthByte&192)===128){tempCodePoint=(firstByte&15)<<18|(secondByte&63)<<12|(thirdByte&63)<<6|fourthByte&63;if(tempCodePoint>65535&&tempCodePoint<1114112){codePoint=tempCodePoint}}}}if(codePoint===null){codePoint=65533;bytesPerSequence=1}else if(codePoint>65535){codePoint-=65536;res.push(codePoint>>>10&1023|55296);codePoint=56320|codePoint&1023}res.push(codePoint);i+=bytesPerSequence}return decodeCodePointsArray(res)}var MAX_ARGUMENTS_LENGTH=4096;function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints)}var res="";var i=0;while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH))}return res}function asciiSlice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;i++){ret+=String.fromCharCode(buf[i]&127)}return ret}function binarySlice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;i++){ret+=String.fromCharCode(buf[i])}return ret}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out="";for(var i=start;i<end;i++){out+=toHex(buf[i])}return out}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res="";for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256)}return res}Buffer.prototype.slice=function slice(start,end){var len=this.length;start=~~start;end=end===undefined?len:~~end;if(start<0){start+=len;if(start<0)start=0}else if(start>len){start=len}if(end<0){end+=len;if(end<0)end=0}else if(end>len){end=len}if(end<start)end=start;var newBuf;if(Buffer.TYPED_ARRAY_SUPPORT){newBuf=this.subarray(start,end);newBuf.__proto__=Buffer.prototype}else{var sliceLen=end-start;newBuf=new Buffer(sliceLen,undefined);for(var i=0;i<sliceLen;i++){newBuf[i]=this[i+start]}}if(newBuf.length)newBuf.parent=this.parent||this;return newBuf};function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError("offset is not uint");if(offset+ext>length)throw new RangeError("Trying to access beyond buffer length")}Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul}return val};Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert){checkOffset(offset,byteLength,this.length)}var val=this[offset+--byteLength];var mul=1;while(byteLength>0&&(mul*=256)){val+=this[offset+--byteLength]*mul}return val};Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){if(!noAssert)checkOffset(offset,1,this.length);return this[offset]};Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);return this[offset]|this[offset+1]<<8};Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);return this[offset]<<8|this[offset+1]};Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+this[offset+3]*16777216};Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]*16777216+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3])};Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var i=byteLength;var mul=1;var val=this[offset+--i];while(i>0&&(mul*=256)){val+=this[offset+--i]*mul}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readInt8=function readInt8(offset,noAssert){if(!noAssert)checkOffset(offset,1,this.length);if(!(this[offset]&128))return this[offset];return(255-this[offset]+1)*-1};Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24};Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3]};Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,true,23,4)};Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,false,23,4)};Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,true,52,8)};Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,false,52,8)};function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError("buffer must be a Buffer instance");if(value>max||value<min)throw new RangeError("value is out of bounds");if(offset+ext>buf.length)throw new RangeError("index out of range")}Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkInt(this,value,offset,byteLength,Math.pow(2,8*byteLength),0);var mul=1;var i=0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){this[offset+i]=value/mul&255}return offset+byteLength};Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkInt(this,value,offset,byteLength,Math.pow(2,8*byteLength),0);var i=byteLength-1;var mul=1;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){this[offset+i]=value/mul&255}return offset+byteLength};Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,1,255,0);if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);this[offset]=value&255;return offset+1};function objectWriteUInt16(buf,value,offset,littleEndian){if(value<0)value=65535+value+1;for(var i=0,j=Math.min(buf.length-offset,2);i<j;i++){buf[offset+i]=(value&255<<8*(littleEndian?i:1-i))>>>(littleEndian?i:1-i)*8}}Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,65535,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&255;this[offset+1]=value>>>8}else{objectWriteUInt16(this,value,offset,true)}return offset+2};Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,65535,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>8;this[offset+1]=value&255}else{objectWriteUInt16(this,value,offset,false)}return offset+2};function objectWriteUInt32(buf,value,offset,littleEndian){if(value<0)value=4294967295+value+1;for(var i=0,j=Math.min(buf.length-offset,4);i<j;i++){buf[offset+i]=value>>>(littleEndian?i:3-i)*8&255}}Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset+3]=value>>>24;this[offset+2]=value>>>16;this[offset+1]=value>>>8;this[offset]=value&255}else{objectWriteUInt32(this,value,offset,true)}return offset+4};Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255}else{objectWriteUInt32(this,value,offset,false)}return offset+4};Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=0;var mul=1;var sub=value<0?1:0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){this[offset+i]=(value/mul>>0)-sub&255}return offset+byteLength};Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=byteLength-1;var mul=1;var sub=value<0?1:0;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){this[offset+i]=(value/mul>>0)-sub&255}return offset+byteLength};Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,1,127,-128);if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);if(value<0)value=255+value+1;this[offset]=value&255;return offset+1};Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&255;this[offset+1]=value>>>8}else{objectWriteUInt16(this,value,offset,true)}return offset+2};Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>8;this[offset+1]=value&255}else{objectWriteUInt16(this,value,offset,false)}return offset+2};Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&255;this[offset+1]=value>>>8;this[offset+2]=value>>>16;this[offset+3]=value>>>24}else{objectWriteUInt32(this,value,offset,true)}return offset+4};Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);if(value<0)value=4294967295+value+1;if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255}else{objectWriteUInt32(this,value,offset,false)}return offset+4};function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError("index out of range");if(offset<0)throw new RangeError("index out of range")}function writeFloat(buf,value,offset,littleEndian,noAssert){if(!noAssert){checkIEEE754(buf,value,offset,4,3.4028234663852886e38,-3.4028234663852886e38)}ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4}Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert)};Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert)};function writeDouble(buf,value,offset,littleEndian,noAssert){if(!noAssert){checkIEEE754(buf,value,offset,8,1.7976931348623157e308,-1.7976931348623157e308)}ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8}Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert)};Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert)};Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!start)start=0;if(!end&&end!==0)end=this.length;if(targetStart>=target.length)targetStart=target.length;if(!targetStart)targetStart=0;if(end>0&&end<start)end=start;if(end===start)return 0;if(target.length===0||this.length===0)return 0;if(targetStart<0){throw new RangeError("targetStart out of bounds")}if(start<0||start>=this.length)throw new RangeError("sourceStart out of bounds");if(end<0)throw new RangeError("sourceEnd out of bounds");if(end>this.length)end=this.length;if(target.length-targetStart<end-start){end=target.length-targetStart+start}var len=end-start;var i;if(this===target&&start<targetStart&&targetStart<end){for(i=len-1;i>=0;i--){target[i+targetStart]=this[i+start]}}else if(len<1e3||!Buffer.TYPED_ARRAY_SUPPORT){for(i=0;i<len;i++){target[i+targetStart]=this[i+start]}}else{Uint8Array.prototype.set.call(target,this.subarray(start,start+len),targetStart)}return len};Buffer.prototype.fill=function fill(value,start,end){if(!value)value=0;if(!start)start=0;if(!end)end=this.length;if(end<start)throw new RangeError("end < start");if(end===start)return;if(this.length===0)return;if(start<0||start>=this.length)throw new RangeError("start out of bounds");if(end<0||end>this.length)throw new RangeError("end out of bounds");var i;if(typeof value==="number"){for(i=start;i<end;i++){this[i]=value}}else{var bytes=utf8ToBytes(value.toString());var len=bytes.length;for(i=start;i<end;i++){this[i]=bytes[i%len];
}}return this};var INVALID_BASE64_RE=/[^+\/0-9A-Za-z-_]/g;function base64clean(str){str=stringtrim(str).replace(INVALID_BASE64_RE,"");if(str.length<2)return"";while(str.length%4!==0){str=str+"="}return str}function stringtrim(str){if(str.trim)return str.trim();return str.replace(/^\s+|\s+$/g,"")}function toHex(n){if(n<16)return"0"+n.toString(16);return n.toString(16)}function utf8ToBytes(string,units){units=units||Infinity;var codePoint;var length=string.length;var leadSurrogate=null;var bytes=[];for(var i=0;i<length;i++){codePoint=string.charCodeAt(i);if(codePoint>55295&&codePoint<57344){if(!leadSurrogate){if(codePoint>56319){if((units-=3)>-1)bytes.push(239,191,189);continue}else if(i+1===length){if((units-=3)>-1)bytes.push(239,191,189);continue}leadSurrogate=codePoint;continue}if(codePoint<56320){if((units-=3)>-1)bytes.push(239,191,189);leadSurrogate=codePoint;continue}codePoint=(leadSurrogate-55296<<10|codePoint-56320)+65536}else if(leadSurrogate){if((units-=3)>-1)bytes.push(239,191,189)}leadSurrogate=null;if(codePoint<128){if((units-=1)<0)break;bytes.push(codePoint)}else if(codePoint<2048){if((units-=2)<0)break;bytes.push(codePoint>>6|192,codePoint&63|128)}else if(codePoint<65536){if((units-=3)<0)break;bytes.push(codePoint>>12|224,codePoint>>6&63|128,codePoint&63|128)}else if(codePoint<1114112){if((units-=4)<0)break;bytes.push(codePoint>>18|240,codePoint>>12&63|128,codePoint>>6&63|128,codePoint&63|128)}else{throw new Error("Invalid code point")}}return bytes}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;i++){byteArray.push(str.charCodeAt(i)&255)}return byteArray}function utf16leToBytes(str,units){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;i++){if((units-=2)<0)break;c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi)}return byteArray}function base64ToBytes(str){return base64.toByteArray(base64clean(str))}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;i++){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i]}return i}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"base64-js":51,ieee754:57,isarray:54}],54:[function(require,module,exports){var toString={}.toString;module.exports=Array.isArray||function(arr){return toString.call(arr)=="[object Array]"}},{}],55:[function(require,module,exports){(function(Buffer){function isArray(arg){if(Array.isArray){return Array.isArray(arg)}return objectToString(arg)==="[object Array]"}exports.isArray=isArray;function isBoolean(arg){return typeof arg==="boolean"}exports.isBoolean=isBoolean;function isNull(arg){return arg===null}exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null}exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==="number"}exports.isNumber=isNumber;function isString(arg){return typeof arg==="string"}exports.isString=isString;function isSymbol(arg){return typeof arg==="symbol"}exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0}exports.isUndefined=isUndefined;function isRegExp(re){return objectToString(re)==="[object RegExp]"}exports.isRegExp=isRegExp;function isObject(arg){return typeof arg==="object"&&arg!==null}exports.isObject=isObject;function isDate(d){return objectToString(d)==="[object Date]"}exports.isDate=isDate;function isError(e){return objectToString(e)==="[object Error]"||e instanceof Error}exports.isError=isError;function isFunction(arg){return typeof arg==="function"}exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==="boolean"||typeof arg==="number"||typeof arg==="string"||typeof arg==="symbol"||typeof arg==="undefined"}exports.isPrimitive=isPrimitive;exports.isBuffer=Buffer.isBuffer;function objectToString(o){return Object.prototype.toString.call(o)}}).call(this,{isBuffer:require("../../is-buffer/index.js")})},{"../../is-buffer/index.js":59}],56:[function(require,module,exports){function EventEmitter(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined}module.exports=EventEmitter;EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._maxListeners=undefined;EventEmitter.defaultMaxListeners=10;EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n))throw TypeError("n must be a positive number");this._maxListeners=n;return this};EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(!this._events)this._events={};if(type==="error"){if(!this._events.error||isObject(this._events.error)&&!this._events.error.length){er=arguments[1];if(er instanceof Error){throw er}throw TypeError('Uncaught, unspecified "error" event.')}}handler=this._events[type];if(isUndefined(handler))return false;if(isFunction(handler)){switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:args=Array.prototype.slice.call(arguments,1);handler.apply(this,args)}}else if(isObject(handler)){args=Array.prototype.slice.call(arguments,1);listeners=handler.slice();len=listeners.length;for(i=0;i<len;i++)listeners[i].apply(this,args)}return true};EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events)this._events={};if(this._events.newListener)this.emit("newListener",type,isFunction(listener.listener)?listener.listener:listener);if(!this._events[type])this._events[type]=listener;else if(isObject(this._events[type]))this._events[type].push(listener);else this._events[type]=[this._events[type],listener];if(isObject(this._events[type])&&!this._events[type].warned){if(!isUndefined(this._maxListeners)){m=this._maxListeners}else{m=EventEmitter.defaultMaxListeners}if(m&&m>0&&this._events[type].length>m){this._events[type].warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",this._events[type].length);if(typeof console.trace==="function"){console.trace()}}}return this};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener))throw TypeError("listener must be a function");var fired=false;function g(){this.removeListener(type,g);if(!fired){fired=true;listener.apply(this,arguments)}}g.listener=listener;this.on(type,g);return this};EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events||!this._events[type])return this;list=this._events[type];length=list.length;position=-1;if(list===listener||isFunction(list.listener)&&list.listener===listener){delete this._events[type];if(this._events.removeListener)this.emit("removeListener",type,listener)}else if(isObject(list)){for(i=length;i-- >0;){if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break}}if(position<0)return this;if(list.length===1){list.length=0;delete this._events[type]}else{list.splice(position,1)}if(this._events.removeListener)this.emit("removeListener",type,listener)}return this};EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;if(!this._events.removeListener){if(arguments.length===0)this._events={};else if(this._events[type])delete this._events[type];return this}if(arguments.length===0){for(key in this._events){if(key==="removeListener")continue;this.removeAllListeners(key)}this.removeAllListeners("removeListener");this._events={};return this}listeners=this._events[type];if(isFunction(listeners)){this.removeListener(type,listeners)}else if(listeners){while(listeners.length)this.removeListener(type,listeners[listeners.length-1])}delete this._events[type];return this};EventEmitter.prototype.listeners=function(type){var ret;if(!this._events||!this._events[type])ret=[];else if(isFunction(this._events[type]))ret=[this._events[type]];else ret=this._events[type].slice();return ret};EventEmitter.prototype.listenerCount=function(type){if(this._events){var evlistener=this._events[type];if(isFunction(evlistener))return 1;else if(evlistener)return evlistener.length}return 0};EventEmitter.listenerCount=function(emitter,type){return emitter.listenerCount(type)};function isFunction(arg){return typeof arg==="function"}function isNumber(arg){return typeof arg==="number"}function isObject(arg){return typeof arg==="object"&&arg!==null}function isUndefined(arg){return arg===void 0}},{}],57:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var nBits=-7;var i=isLE?nBytes-1:0;var d=isLE?-1:1;var s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}if(e===0){e=1-eBias}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity}else{m=m+Math.pow(2,mLen);e=e-eBias}return(s?-1:1)*m*Math.pow(2,e-mLen)};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;var i=isLE?0:nBytes-1;var d=isLE?1:-1;var s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2}if(e+eBias>=1){value+=rt/c}else{value+=rt*Math.pow(2,1-eBias)}if(value*c>=2){e++;c/=2}if(e+eBias>=eMax){m=0;e=eMax}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0}}for(;mLen>=8;buffer[offset+i]=m&255,i+=d,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&255,i+=d,e/=256,eLen-=8){}buffer[offset+i-d]|=s*128}},{}],58:[function(require,module,exports){arguments[4][21][0].apply(exports,arguments)},{dup:21}],59:[function(require,module,exports){module.exports=function(obj){return!!(obj!=null&&(obj._isBuffer||obj.constructor&&typeof obj.constructor.isBuffer==="function"&&obj.constructor.isBuffer(obj)))}},{}],60:[function(require,module,exports){module.exports=Array.isArray||function(arr){return Object.prototype.toString.call(arr)=="[object Array]"}},{}],61:[function(require,module,exports){(function(process){"use strict";if(!process.version||process.version.indexOf("v0.")===0||process.version.indexOf("v1.")===0&&process.version.indexOf("v1.8.")!==0){module.exports=nextTick}else{module.exports=process.nextTick}function nextTick(fn){var args=new Array(arguments.length-1);var i=0;while(i<args.length){args[i++]=arguments[i]}process.nextTick(function afterTick(){fn.apply(null,args)})}}).call(this,require("_process"))},{_process:62}],62:[function(require,module,exports){var process=module.exports={};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){draining=false;if(currentQueue.length){queue=currentQueue.concat(queue)}else{queueIndex=-1}if(queue.length){drainQueue()}}function drainQueue(){if(draining){return}var timeout=setTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run()}}queueIndex=-1;len=queue.length}currentQueue=null;draining=false;clearTimeout(timeout)}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i]}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){setTimeout(drainQueue,0)}};function Item(fun,array){this.fun=fun;this.array=array}Item.prototype.run=function(){this.fun.apply(null,this.array)};process.title="browser";process.browser=true;process.env={};process.argv=[];process.version="";process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")};process.umask=function(){return 0}},{}],63:[function(require,module,exports){module.exports=require("./lib/_stream_duplex.js")},{"./lib/_stream_duplex.js":64}],64:[function(require,module,exports){"use strict";var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj)keys.push(key);return keys};module.exports=Duplex;var processNextTick=require("process-nextick-args");var util=require("core-util-is");util.inherits=require("inherits");var Readable=require("./_stream_readable");var Writable=require("./_stream_writable");util.inherits(Duplex,Readable);var keys=objectKeys(Writable.prototype);for(var v=0;v<keys.length;v++){var method=keys[v];if(!Duplex.prototype[method])Duplex.prototype[method]=Writable.prototype[method]}function Duplex(options){if(!(this instanceof Duplex))return new Duplex(options);Readable.call(this,options);Writable.call(this,options);if(options&&options.readable===false)this.readable=false;if(options&&options.writable===false)this.writable=false;this.allowHalfOpen=true;if(options&&options.allowHalfOpen===false)this.allowHalfOpen=false;this.once("end",onend)}function onend(){if(this.allowHalfOpen||this._writableState.ended)return;processNextTick(onEndNT,this)}function onEndNT(self){self.end()}function forEach(xs,f){for(var i=0,l=xs.length;i<l;i++){f(xs[i],i)}}},{"./_stream_readable":66,"./_stream_writable":68,"core-util-is":55,inherits:58,"process-nextick-args":61}],65:[function(require,module,exports){"use strict";module.exports=PassThrough;var Transform=require("./_stream_transform");var util=require("core-util-is");util.inherits=require("inherits");util.inherits(PassThrough,Transform);function PassThrough(options){if(!(this instanceof PassThrough))return new PassThrough(options);Transform.call(this,options)}PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk)}},{"./_stream_transform":67,"core-util-is":55,inherits:58}],66:[function(require,module,exports){(function(process){"use strict";module.exports=Readable;var processNextTick=require("process-nextick-args");var isArray=require("isarray");var Buffer=require("buffer").Buffer;Readable.ReadableState=ReadableState;var EE=require("events");var EElistenerCount=function(emitter,type){return emitter.listeners(type).length};var Stream;(function(){try{Stream=require("st"+"ream")}catch(_){}finally{if(!Stream)Stream=require("events").EventEmitter}})();var Buffer=require("buffer").Buffer;var util=require("core-util-is");util.inherits=require("inherits");var debugUtil=require("util");var debug;if(debugUtil&&debugUtil.debuglog){debug=debugUtil.debuglog("stream")}else{debug=function(){}}var StringDecoder;util.inherits(Readable,Stream);var Duplex;function ReadableState(options,stream){Duplex=Duplex||require("./_stream_duplex");options=options||{};this.objectMode=!!options.objectMode;if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.readableObjectMode;var hwm=options.highWaterMark;var defaultHwm=this.objectMode?16:16*1024;this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;this.highWaterMark=~~this.highWaterMark;this.buffer=[];this.length=0;this.pipes=null;this.pipesCount=0;this.flowing=null;this.ended=false;this.endEmitted=false;this.reading=false;this.sync=true;this.needReadable=false;this.emittedReadable=false;this.readableListening=false;this.defaultEncoding=options.defaultEncoding||"utf8";this.ranOut=false;this.awaitDrain=0;this.readingMore=false;this.decoder=null;this.encoding=null;if(options.encoding){if(!StringDecoder)StringDecoder=require("string_decoder/").StringDecoder;this.decoder=new StringDecoder(options.encoding);this.encoding=options.encoding}}var Duplex;function Readable(options){Duplex=Duplex||require("./_stream_duplex");if(!(this instanceof Readable))return new Readable(options);this._readableState=new ReadableState(options,this);this.readable=true;if(options&&typeof options.read==="function")this._read=options.read;Stream.call(this)}Readable.prototype.push=function(chunk,encoding){var state=this._readableState;if(!state.objectMode&&typeof chunk==="string"){encoding=encoding||state.defaultEncoding;if(encoding!==state.encoding){chunk=new Buffer(chunk,encoding);encoding=""}}return readableAddChunk(this,state,chunk,encoding,false)};Readable.prototype.unshift=function(chunk){var state=this._readableState;return readableAddChunk(this,state,chunk,"",true)};Readable.prototype.isPaused=function(){return this._readableState.flowing===false};function readableAddChunk(stream,state,chunk,encoding,addToFront){var er=chunkInvalid(state,chunk);if(er){stream.emit("error",er)}else if(chunk===null){state.reading=false;onEofChunk(stream,state)}else if(state.objectMode||chunk&&chunk.length>0){if(state.ended&&!addToFront){var e=new Error("stream.push() after EOF");stream.emit("error",e)}else if(state.endEmitted&&addToFront){var e=new Error("stream.unshift() after end event");stream.emit("error",e)}else{if(state.decoder&&!addToFront&&!encoding)chunk=state.decoder.write(chunk);if(!addToFront)state.reading=false;if(state.flowing&&state.length===0&&!state.sync){stream.emit("data",chunk);stream.read(0)}else{state.length+=state.objectMode?1:chunk.length;if(addToFront)state.buffer.unshift(chunk);else state.buffer.push(chunk);if(state.needReadable)emitReadable(stream)}maybeReadMore(stream,state)}}else if(!addToFront){state.reading=false}return needMoreData(state)}function needMoreData(state){return!state.ended&&(state.needReadable||state.length<state.highWaterMark||state.length===0)}Readable.prototype.setEncoding=function(enc){if(!StringDecoder)StringDecoder=require("string_decoder/").StringDecoder;this._readableState.decoder=new StringDecoder(enc);this._readableState.encoding=enc;return this};var MAX_HWM=8388608;function computeNewHighWaterMark(n){if(n>=MAX_HWM){n=MAX_HWM}else{n--;n|=n>>>1;n|=n>>>2;n|=n>>>4;n|=n>>>8;n|=n>>>16;n++}return n}function howMuchToRead(n,state){if(state.length===0&&state.ended)return 0;if(state.objectMode)return n===0?0:1;if(n===null||isNaN(n)){if(state.flowing&&state.buffer.length)return state.buffer[0].length;else return state.length}if(n<=0)return 0;if(n>state.highWaterMark)state.highWaterMark=computeNewHighWaterMark(n);if(n>state.length){if(!state.ended){state.needReadable=true;return 0}else{return state.length}}return n}Readable.prototype.read=function(n){debug("read",n);var state=this._readableState;var nOrig=n;if(typeof n!=="number"||n>0)state.emittedReadable=false;if(n===0&&state.needReadable&&(state.length>=state.highWaterMark||state.ended)){debug("read: emitReadable",state.length,state.ended);if(state.length===0&&state.ended)endReadable(this);else emitReadable(this);return null}n=howMuchToRead(n,state);if(n===0&&state.ended){if(state.length===0)endReadable(this);return null}var doRead=state.needReadable;debug("need readable",doRead);if(state.length===0||state.length-n<state.highWaterMark){doRead=true;debug("length less than watermark",doRead)}if(state.ended||state.reading){doRead=false;debug("reading or ended",doRead)}if(doRead){debug("do read");state.reading=true;state.sync=true;if(state.length===0)state.needReadable=true;this._read(state.highWaterMark);state.sync=false}if(doRead&&!state.reading)n=howMuchToRead(nOrig,state);var ret;if(n>0)ret=fromList(n,state);else ret=null;if(ret===null){state.needReadable=true;n=0}state.length-=n;if(state.length===0&&!state.ended)state.needReadable=true;if(nOrig!==n&&state.ended&&state.length===0)endReadable(this);if(ret!==null)this.emit("data",ret);return ret};function chunkInvalid(state,chunk){var er=null;if(!Buffer.isBuffer(chunk)&&typeof chunk!=="string"&&chunk!==null&&chunk!==undefined&&!state.objectMode){er=new TypeError("Invalid non-string/buffer chunk")}return er}function onEofChunk(stream,state){if(state.ended)return;if(state.decoder){var chunk=state.decoder.end();if(chunk&&chunk.length){state.buffer.push(chunk);state.length+=state.objectMode?1:chunk.length}}state.ended=true;emitReadable(stream)}function emitReadable(stream){var state=stream._readableState;state.needReadable=false;if(!state.emittedReadable){debug("emitReadable",state.flowing);state.emittedReadable=true;if(state.sync)processNextTick(emitReadable_,stream);else emitReadable_(stream)}}function emitReadable_(stream){debug("emit readable");stream.emit("readable");flow(stream)}function maybeReadMore(stream,state){if(!state.readingMore){state.readingMore=true;processNextTick(maybeReadMore_,stream,state)}}function maybeReadMore_(stream,state){var len=state.length;while(!state.reading&&!state.flowing&&!state.ended&&state.length<state.highWaterMark){debug("maybeReadMore read 0");stream.read(0);if(len===state.length)break;else len=state.length}state.readingMore=false}Readable.prototype._read=function(n){this.emit("error",new Error("not implemented"))};Readable.prototype.pipe=function(dest,pipeOpts){var src=this;var state=this._readableState;switch(state.pipesCount){case 0:state.pipes=dest;break;case 1:state.pipes=[state.pipes,dest];break;default:state.pipes.push(dest);break}state.pipesCount+=1;debug("pipe count=%d opts=%j",state.pipesCount,pipeOpts);var doEnd=(!pipeOpts||pipeOpts.end!==false)&&dest!==process.stdout&&dest!==process.stderr;var endFn=doEnd?onend:cleanup;if(state.endEmitted)processNextTick(endFn);else src.once("end",endFn);dest.on("unpipe",onunpipe);function onunpipe(readable){debug("onunpipe");if(readable===src){cleanup()}}function onend(){debug("onend");dest.end()}var ondrain=pipeOnDrain(src);dest.on("drain",ondrain);var cleanedUp=false;function cleanup(){debug("cleanup");dest.removeListener("close",onclose);dest.removeListener("finish",onfinish);dest.removeListener("drain",ondrain);dest.removeListener("error",onerror);dest.removeListener("unpipe",onunpipe);src.removeListener("end",onend);src.removeListener("end",cleanup);src.removeListener("data",ondata);cleanedUp=true;if(state.awaitDrain&&(!dest._writableState||dest._writableState.needDrain))ondrain()}src.on("data",ondata);function ondata(chunk){debug("ondata");var ret=dest.write(chunk);if(false===ret){if(state.pipesCount===1&&state.pipes[0]===dest&&src.listenerCount("data")===1&&!cleanedUp){debug("false write response, pause",src._readableState.awaitDrain);src._readableState.awaitDrain++}src.pause()}}function onerror(er){debug("onerror",er);unpipe();dest.removeListener("error",onerror);if(EElistenerCount(dest,"error")===0)dest.emit("error",er)}if(!dest._events||!dest._events.error)dest.on("error",onerror);else if(isArray(dest._events.error))dest._events.error.unshift(onerror);else dest._events.error=[onerror,dest._events.error];function onclose(){dest.removeListener("finish",onfinish);unpipe()}dest.once("close",onclose);function onfinish(){debug("onfinish");dest.removeListener("close",onclose);unpipe()}dest.once("finish",onfinish);function unpipe(){debug("unpipe");src.unpipe(dest)}dest.emit("pipe",src);if(!state.flowing){debug("pipe resume");src.resume()}return dest};function pipeOnDrain(src){return function(){var state=src._readableState;debug("pipeOnDrain",state.awaitDrain);if(state.awaitDrain)state.awaitDrain--;if(state.awaitDrain===0&&EElistenerCount(src,"data")){state.flowing=true;flow(src)}}}Readable.prototype.unpipe=function(dest){var state=this._readableState;if(state.pipesCount===0)return this;if(state.pipesCount===1){if(dest&&dest!==state.pipes)return this;if(!dest)dest=state.pipes;state.pipes=null;state.pipesCount=0;state.flowing=false;if(dest)dest.emit("unpipe",this);return this}if(!dest){var dests=state.pipes;var len=state.pipesCount;state.pipes=null;state.pipesCount=0;state.flowing=false;for(var i=0;i<len;i++)dests[i].emit("unpipe",this);return this}var i=indexOf(state.pipes,dest);if(i===-1)return this;state.pipes.splice(i,1);state.pipesCount-=1;if(state.pipesCount===1)state.pipes=state.pipes[0];dest.emit("unpipe",this);return this};Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn);if(ev==="data"&&false!==this._readableState.flowing){this.resume()}if(ev==="readable"&&this.readable){var state=this._readableState;if(!state.readableListening){state.readableListening=true;state.emittedReadable=false;state.needReadable=true;if(!state.reading){processNextTick(nReadingNextTick,this)}else if(state.length){emitReadable(this,state)}}}return res};Readable.prototype.addListener=Readable.prototype.on;function nReadingNextTick(self){debug("readable nexttick read 0");self.read(0)}Readable.prototype.resume=function(){var state=this._readableState;if(!state.flowing){debug("resume");state.flowing=true;resume(this,state)}return this};function resume(stream,state){if(!state.resumeScheduled){state.resumeScheduled=true;processNextTick(resume_,stream,state)}}function resume_(stream,state){if(!state.reading){debug("resume read 0");stream.read(0)}state.resumeScheduled=false;stream.emit("resume");flow(stream);if(state.flowing&&!state.reading)stream.read(0)}Readable.prototype.pause=function(){debug("call pause flowing=%j",this._readableState.flowing);if(false!==this._readableState.flowing){debug("pause");this._readableState.flowing=false;this.emit("pause")}return this};function flow(stream){var state=stream._readableState;debug("flow",state.flowing);if(state.flowing){do{var chunk=stream.read()}while(null!==chunk&&state.flowing)}}Readable.prototype.wrap=function(stream){var state=this._readableState;var paused=false;var self=this;stream.on("end",function(){debug("wrapped end");if(state.decoder&&!state.ended){var chunk=state.decoder.end();if(chunk&&chunk.length)self.push(chunk)}self.push(null)});stream.on("data",function(chunk){debug("wrapped data");if(state.decoder)chunk=state.decoder.write(chunk);if(state.objectMode&&(chunk===null||chunk===undefined))return;else if(!state.objectMode&&(!chunk||!chunk.length))return;var ret=self.push(chunk);if(!ret){paused=true;stream.pause()}});for(var i in stream){if(this[i]===undefined&&typeof stream[i]==="function"){this[i]=function(method){return function(){return stream[method].apply(stream,arguments)}}(i)}}var events=["error","close","destroy","pause","resume"];forEach(events,function(ev){stream.on(ev,self.emit.bind(self,ev))});self._read=function(n){debug("wrapped _read",n);if(paused){paused=false;stream.resume()}};return self};Readable._fromList=fromList;function fromList(n,state){var list=state.buffer;var length=state.length;var stringMode=!!state.decoder;var objectMode=!!state.objectMode;var ret;if(list.length===0)return null;if(length===0)ret=null;else if(objectMode)ret=list.shift();else if(!n||n>=length){if(stringMode)ret=list.join("");else if(list.length===1)ret=list[0];else ret=Buffer.concat(list,length);list.length=0}else{if(n<list[0].length){var buf=list[0];ret=buf.slice(0,n);list[0]=buf.slice(n)}else if(n===list[0].length){ret=list.shift()}else{if(stringMode)ret="";else ret=new Buffer(n);var c=0;for(var i=0,l=list.length;i<l&&c<n;i++){var buf=list[0];var cpy=Math.min(n-c,buf.length);if(stringMode)ret+=buf.slice(0,cpy);else buf.copy(ret,c,0,cpy);if(cpy<buf.length)list[0]=buf.slice(cpy);else list.shift();c+=cpy}}}return ret}function endReadable(stream){var state=stream._readableState;if(state.length>0)throw new Error("endReadable called on non-empty stream");if(!state.endEmitted){state.ended=true;processNextTick(endReadableNT,state,stream)}}function endReadableNT(state,stream){if(!state.endEmitted&&state.length===0){state.endEmitted=true;stream.readable=false;stream.emit("end")}}function forEach(xs,f){for(var i=0,l=xs.length;i<l;i++){f(xs[i],i)}}function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++){if(xs[i]===x)return i}return-1}}).call(this,require("_process"))},{"./_stream_duplex":64,_process:62,buffer:53,"core-util-is":55,events:56,inherits:58,isarray:60,"process-nextick-args":61,"string_decoder/":74,util:52}],67:[function(require,module,exports){"use strict";module.exports=Transform;var Duplex=require("./_stream_duplex");var util=require("core-util-is");util.inherits=require("inherits");util.inherits(Transform,Duplex);function TransformState(stream){this.afterTransform=function(er,data){return afterTransform(stream,er,data)};this.needTransform=false;this.transforming=false;this.writecb=null;this.writechunk=null}function afterTransform(stream,er,data){var ts=stream._transformState;ts.transforming=false;var cb=ts.writecb;if(!cb)return stream.emit("error",new Error("no writecb in Transform class"));ts.writechunk=null;ts.writecb=null;if(data!==null&&data!==undefined)stream.push(data);if(cb)cb(er);var rs=stream._readableState;rs.reading=false;if(rs.needReadable||rs.length<rs.highWaterMark){stream._read(rs.highWaterMark)}}function Transform(options){if(!(this instanceof Transform))return new Transform(options);Duplex.call(this,options);this._transformState=new TransformState(this);var stream=this;this._readableState.needReadable=true;this._readableState.sync=false;if(options){if(typeof options.transform==="function")this._transform=options.transform;if(typeof options.flush==="function")this._flush=options.flush}this.once("prefinish",function(){if(typeof this._flush==="function")this._flush(function(er){done(stream,er)});else done(stream)})}Transform.prototype.push=function(chunk,encoding){this._transformState.needTransform=false;return Duplex.prototype.push.call(this,chunk,encoding)};Transform.prototype._transform=function(chunk,encoding,cb){throw new Error("not implemented")};Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState;ts.writecb=cb;ts.writechunk=chunk;ts.writeencoding=encoding;if(!ts.transforming){var rs=this._readableState;if(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)this._read(rs.highWaterMark)}};Transform.prototype._read=function(n){var ts=this._transformState;if(ts.writechunk!==null&&ts.writecb&&!ts.transforming){ts.transforming=true;this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform)}else{ts.needTransform=true}};function done(stream,er){if(er)return stream.emit("error",er);var ws=stream._writableState;var ts=stream._transformState;if(ws.length)throw new Error("calling transform done when ws.length != 0");if(ts.transforming)throw new Error("calling transform done when still transforming");return stream.push(null)}},{"./_stream_duplex":64,"core-util-is":55,inherits:58}],68:[function(require,module,exports){"use strict";module.exports=Writable;var processNextTick=require("process-nextick-args");var Buffer=require("buffer").Buffer;Writable.WritableState=WritableState;var util=require("core-util-is");util.inherits=require("inherits");var internalUtil={deprecate:require("util-deprecate")};var Stream;(function(){try{Stream=require("st"+"ream")}catch(_){}finally{if(!Stream)Stream=require("events").EventEmitter}})();var Buffer=require("buffer").Buffer;util.inherits(Writable,Stream);function nop(){}function WriteReq(chunk,encoding,cb){this.chunk=chunk;this.encoding=encoding;this.callback=cb;this.next=null}var Duplex;function WritableState(options,stream){Duplex=Duplex||require("./_stream_duplex");options=options||{};this.objectMode=!!options.objectMode;if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.writableObjectMode;var hwm=options.highWaterMark;var defaultHwm=this.objectMode?16:16*1024;this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;this.highWaterMark=~~this.highWaterMark;this.needDrain=false;this.ending=false;this.ended=false;this.finished=false;var noDecode=options.decodeStrings===false;this.decodeStrings=!noDecode;this.defaultEncoding=options.defaultEncoding||"utf8";this.length=0;this.writing=false;this.corked=0;this.sync=true;this.bufferProcessing=false;this.onwrite=function(er){onwrite(stream,er);
};this.writecb=null;this.writelen=0;this.bufferedRequest=null;this.lastBufferedRequest=null;this.pendingcb=0;this.prefinished=false;this.errorEmitted=false}WritableState.prototype.getBuffer=function writableStateGetBuffer(){var current=this.bufferedRequest;var out=[];while(current){out.push(current);current=current.next}return out};(function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:internalUtil.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer "+"instead.")})}catch(_){}})();var Duplex;function Writable(options){Duplex=Duplex||require("./_stream_duplex");if(!(this instanceof Writable)&&!(this instanceof Duplex))return new Writable(options);this._writableState=new WritableState(options,this);this.writable=true;if(options){if(typeof options.write==="function")this._write=options.write;if(typeof options.writev==="function")this._writev=options.writev}Stream.call(this)}Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe. Not readable."))};function writeAfterEnd(stream,cb){var er=new Error("write after end");stream.emit("error",er);processNextTick(cb,er)}function validChunk(stream,state,chunk,cb){var valid=true;if(!Buffer.isBuffer(chunk)&&typeof chunk!=="string"&&chunk!==null&&chunk!==undefined&&!state.objectMode){var er=new TypeError("Invalid non-string/buffer chunk");stream.emit("error",er);processNextTick(cb,er);valid=false}return valid}Writable.prototype.write=function(chunk,encoding,cb){var state=this._writableState;var ret=false;if(typeof encoding==="function"){cb=encoding;encoding=null}if(Buffer.isBuffer(chunk))encoding="buffer";else if(!encoding)encoding=state.defaultEncoding;if(typeof cb!=="function")cb=nop;if(state.ended)writeAfterEnd(this,cb);else if(validChunk(this,state,chunk,cb)){state.pendingcb++;ret=writeOrBuffer(this,state,chunk,encoding,cb)}return ret};Writable.prototype.cork=function(){var state=this._writableState;state.corked++};Writable.prototype.uncork=function(){var state=this._writableState;if(state.corked){state.corked--;if(!state.writing&&!state.corked&&!state.finished&&!state.bufferProcessing&&state.bufferedRequest)clearBuffer(this,state)}};Writable.prototype.setDefaultEncoding=function setDefaultEncoding(encoding){if(typeof encoding==="string")encoding=encoding.toLowerCase();if(!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((encoding+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+encoding);this._writableState.defaultEncoding=encoding};function decodeChunk(state,chunk,encoding){if(!state.objectMode&&state.decodeStrings!==false&&typeof chunk==="string"){chunk=new Buffer(chunk,encoding)}return chunk}function writeOrBuffer(stream,state,chunk,encoding,cb){chunk=decodeChunk(state,chunk,encoding);if(Buffer.isBuffer(chunk))encoding="buffer";var len=state.objectMode?1:chunk.length;state.length+=len;var ret=state.length<state.highWaterMark;if(!ret)state.needDrain=true;if(state.writing||state.corked){var last=state.lastBufferedRequest;state.lastBufferedRequest=new WriteReq(chunk,encoding,cb);if(last){last.next=state.lastBufferedRequest}else{state.bufferedRequest=state.lastBufferedRequest}}else{doWrite(stream,state,false,len,chunk,encoding,cb)}return ret}function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len;state.writecb=cb;state.writing=true;state.sync=true;if(writev)stream._writev(chunk,state.onwrite);else stream._write(chunk,encoding,state.onwrite);state.sync=false}function onwriteError(stream,state,sync,er,cb){--state.pendingcb;if(sync)processNextTick(cb,er);else cb(er);stream._writableState.errorEmitted=true;stream.emit("error",er)}function onwriteStateUpdate(state){state.writing=false;state.writecb=null;state.length-=state.writelen;state.writelen=0}function onwrite(stream,er){var state=stream._writableState;var sync=state.sync;var cb=state.writecb;onwriteStateUpdate(state);if(er)onwriteError(stream,state,sync,er,cb);else{var finished=needFinish(state);if(!finished&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest){clearBuffer(stream,state)}if(sync){processNextTick(afterWrite,stream,state,finished,cb)}else{afterWrite(stream,state,finished,cb)}}}function afterWrite(stream,state,finished,cb){if(!finished)onwriteDrain(stream,state);state.pendingcb--;cb();finishMaybe(stream,state)}function onwriteDrain(stream,state){if(state.length===0&&state.needDrain){state.needDrain=false;stream.emit("drain")}}function clearBuffer(stream,state){state.bufferProcessing=true;var entry=state.bufferedRequest;if(stream._writev&&entry&&entry.next){var buffer=[];var cbs=[];while(entry){cbs.push(entry.callback);buffer.push(entry);entry=entry.next}state.pendingcb++;state.lastBufferedRequest=null;doWrite(stream,state,true,state.length,buffer,"",function(err){for(var i=0;i<cbs.length;i++){state.pendingcb--;cbs[i](err)}})}else{while(entry){var chunk=entry.chunk;var encoding=entry.encoding;var cb=entry.callback;var len=state.objectMode?1:chunk.length;doWrite(stream,state,false,len,chunk,encoding,cb);entry=entry.next;if(state.writing){break}}if(entry===null)state.lastBufferedRequest=null}state.bufferedRequest=entry;state.bufferProcessing=false}Writable.prototype._write=function(chunk,encoding,cb){cb(new Error("not implemented"))};Writable.prototype._writev=null;Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState;if(typeof chunk==="function"){cb=chunk;chunk=null;encoding=null}else if(typeof encoding==="function"){cb=encoding;encoding=null}if(chunk!==null&&chunk!==undefined)this.write(chunk,encoding);if(state.corked){state.corked=1;this.uncork()}if(!state.ending&&!state.finished)endWritable(this,state,cb)};function needFinish(state){return state.ending&&state.length===0&&state.bufferedRequest===null&&!state.finished&&!state.writing}function prefinish(stream,state){if(!state.prefinished){state.prefinished=true;stream.emit("prefinish")}}function finishMaybe(stream,state){var need=needFinish(state);if(need){if(state.pendingcb===0){prefinish(stream,state);state.finished=true;stream.emit("finish")}else{prefinish(stream,state)}}return need}function endWritable(stream,state,cb){state.ending=true;finishMaybe(stream,state);if(cb){if(state.finished)processNextTick(cb);else stream.once("finish",cb)}state.ended=true}},{"./_stream_duplex":64,buffer:53,"core-util-is":55,events:56,inherits:58,"process-nextick-args":61,"util-deprecate":75}],69:[function(require,module,exports){module.exports=require("./lib/_stream_passthrough.js")},{"./lib/_stream_passthrough.js":65}],70:[function(require,module,exports){var Stream=function(){try{return require("st"+"ream")}catch(_){}}();exports=module.exports=require("./lib/_stream_readable.js");exports.Stream=Stream||exports;exports.Readable=exports;exports.Writable=require("./lib/_stream_writable.js");exports.Duplex=require("./lib/_stream_duplex.js");exports.Transform=require("./lib/_stream_transform.js");exports.PassThrough=require("./lib/_stream_passthrough.js")},{"./lib/_stream_duplex.js":64,"./lib/_stream_passthrough.js":65,"./lib/_stream_readable.js":66,"./lib/_stream_transform.js":67,"./lib/_stream_writable.js":68}],71:[function(require,module,exports){module.exports=require("./lib/_stream_transform.js")},{"./lib/_stream_transform.js":67}],72:[function(require,module,exports){module.exports=require("./lib/_stream_writable.js")},{"./lib/_stream_writable.js":68}],73:[function(require,module,exports){module.exports=Stream;var EE=require("events").EventEmitter;var inherits=require("inherits");inherits(Stream,EE);Stream.Readable=require("readable-stream/readable.js");Stream.Writable=require("readable-stream/writable.js");Stream.Duplex=require("readable-stream/duplex.js");Stream.Transform=require("readable-stream/transform.js");Stream.PassThrough=require("readable-stream/passthrough.js");Stream.Stream=Stream;function Stream(){EE.call(this)}Stream.prototype.pipe=function(dest,options){var source=this;function ondata(chunk){if(dest.writable){if(false===dest.write(chunk)&&source.pause){source.pause()}}}source.on("data",ondata);function ondrain(){if(source.readable&&source.resume){source.resume()}}dest.on("drain",ondrain);if(!dest._isStdio&&(!options||options.end!==false)){source.on("end",onend);source.on("close",onclose)}var didOnEnd=false;function onend(){if(didOnEnd)return;didOnEnd=true;dest.end()}function onclose(){if(didOnEnd)return;didOnEnd=true;if(typeof dest.destroy==="function")dest.destroy()}function onerror(er){cleanup();if(EE.listenerCount(this,"error")===0){throw er}}source.on("error",onerror);dest.on("error",onerror);function cleanup(){source.removeListener("data",ondata);dest.removeListener("drain",ondrain);source.removeListener("end",onend);source.removeListener("close",onclose);source.removeListener("error",onerror);dest.removeListener("error",onerror);source.removeListener("end",cleanup);source.removeListener("close",cleanup);dest.removeListener("close",cleanup)}source.on("end",cleanup);source.on("close",cleanup);dest.on("close",cleanup);dest.emit("pipe",source);return dest}},{events:56,inherits:58,"readable-stream/duplex.js":63,"readable-stream/passthrough.js":69,"readable-stream/readable.js":70,"readable-stream/transform.js":71,"readable-stream/writable.js":72}],74:[function(require,module,exports){var Buffer=require("buffer").Buffer;var isBufferEncoding=Buffer.isEncoding||function(encoding){switch(encoding&&encoding.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return true;default:return false}};function assertEncoding(encoding){if(encoding&&!isBufferEncoding(encoding)){throw new Error("Unknown encoding: "+encoding)}}var StringDecoder=exports.StringDecoder=function(encoding){this.encoding=(encoding||"utf8").toLowerCase().replace(/[-_]/,"");assertEncoding(encoding);switch(this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2;this.detectIncompleteChar=utf16DetectIncompleteChar;break;case"base64":this.surrogateSize=3;this.detectIncompleteChar=base64DetectIncompleteChar;break;default:this.write=passThroughWrite;return}this.charBuffer=new Buffer(6);this.charReceived=0;this.charLength=0};StringDecoder.prototype.write=function(buffer){var charStr="";while(this.charLength){var available=buffer.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:buffer.length;buffer.copy(this.charBuffer,this.charReceived,0,available);this.charReceived+=available;if(this.charReceived<this.charLength){return""}buffer=buffer.slice(available,buffer.length);charStr=this.charBuffer.slice(0,this.charLength).toString(this.encoding);var charCode=charStr.charCodeAt(charStr.length-1);if(charCode>=55296&&charCode<=56319){this.charLength+=this.surrogateSize;charStr="";continue}this.charReceived=this.charLength=0;if(buffer.length===0){return charStr}break}this.detectIncompleteChar(buffer);var end=buffer.length;if(this.charLength){buffer.copy(this.charBuffer,0,buffer.length-this.charReceived,end);end-=this.charReceived}charStr+=buffer.toString(this.encoding,0,end);var end=charStr.length-1;var charCode=charStr.charCodeAt(end);if(charCode>=55296&&charCode<=56319){var size=this.surrogateSize;this.charLength+=size;this.charReceived+=size;this.charBuffer.copy(this.charBuffer,size,0,size);buffer.copy(this.charBuffer,0,0,size);return charStr.substring(0,end)}return charStr};StringDecoder.prototype.detectIncompleteChar=function(buffer){var i=buffer.length>=3?3:buffer.length;for(;i>0;i--){var c=buffer[buffer.length-i];if(i==1&&c>>5==6){this.charLength=2;break}if(i<=2&&c>>4==14){this.charLength=3;break}if(i<=3&&c>>3==30){this.charLength=4;break}}this.charReceived=i};StringDecoder.prototype.end=function(buffer){var res="";if(buffer&&buffer.length)res=this.write(buffer);if(this.charReceived){var cr=this.charReceived;var buf=this.charBuffer;var enc=this.encoding;res+=buf.slice(0,cr).toString(enc)}return res};function passThroughWrite(buffer){return buffer.toString(this.encoding)}function utf16DetectIncompleteChar(buffer){this.charReceived=buffer.length%2;this.charLength=this.charReceived?2:0}function base64DetectIncompleteChar(buffer){this.charReceived=buffer.length%3;this.charLength=this.charReceived?3:0}},{buffer:53}],75:[function(require,module,exports){(function(global){module.exports=deprecate;function deprecate(fn,msg){if(config("noDeprecation")){return fn}var warned=false;function deprecated(){if(!warned){if(config("throwDeprecation")){throw new Error(msg)}else if(config("traceDeprecation")){console.trace(msg)}else{console.warn(msg)}warned=true}return fn.apply(this,arguments)}return deprecated}function config(name){try{if(!global.localStorage)return false}catch(_){return false}var val=global.localStorage[name];if(null==val)return false;return String(val).toLowerCase()==="true"}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],76:[function(require,module,exports){module.exports=function isBuffer(arg){return arg&&typeof arg==="object"&&typeof arg.copy==="function"&&typeof arg.fill==="function"&&typeof arg.readUInt8==="function"}},{}],77:[function(require,module,exports){(function(process,global){var formatRegExp=/%[sdj%]/g;exports.format=function(f){if(!isString(f)){var objects=[];for(var i=0;i<arguments.length;i++){objects.push(inspect(arguments[i]))}return objects.join(" ")}var i=1;var args=arguments;var len=args.length;var str=String(f).replace(formatRegExp,function(x){if(x==="%%")return"%";if(i>=len)return x;switch(x){case"%s":return String(args[i++]);case"%d":return Number(args[i++]);case"%j":try{return JSON.stringify(args[i++])}catch(_){return"[Circular]"}default:return x}});for(var x=args[i];i<len;x=args[++i]){if(isNull(x)||!isObject(x)){str+=" "+x}else{str+=" "+inspect(x)}}return str};exports.deprecate=function(fn,msg){if(isUndefined(global.process)){return function(){return exports.deprecate(fn,msg).apply(this,arguments)}}if(process.noDeprecation===true){return fn}var warned=false;function deprecated(){if(!warned){if(process.throwDeprecation){throw new Error(msg)}else if(process.traceDeprecation){console.trace(msg)}else{console.error(msg)}warned=true}return fn.apply(this,arguments)}return deprecated};var debugs={};var debugEnviron;exports.debuglog=function(set){if(isUndefined(debugEnviron))debugEnviron=process.env.NODE_DEBUG||"";set=set.toUpperCase();if(!debugs[set]){if(new RegExp("\\b"+set+"\\b","i").test(debugEnviron)){var pid=process.pid;debugs[set]=function(){var msg=exports.format.apply(exports,arguments);console.error("%s %d: %s",set,pid,msg)}}else{debugs[set]=function(){}}}return debugs[set]};function inspect(obj,opts){var ctx={seen:[],stylize:stylizeNoColor};if(arguments.length>=3)ctx.depth=arguments[2];if(arguments.length>=4)ctx.colors=arguments[3];if(isBoolean(opts)){ctx.showHidden=opts}else if(opts){exports._extend(ctx,opts)}if(isUndefined(ctx.showHidden))ctx.showHidden=false;if(isUndefined(ctx.depth))ctx.depth=2;if(isUndefined(ctx.colors))ctx.colors=false;if(isUndefined(ctx.customInspect))ctx.customInspect=true;if(ctx.colors)ctx.stylize=stylizeWithColor;return formatValue(ctx,obj,ctx.depth)}exports.inspect=inspect;inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]};inspect.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"};function stylizeWithColor(str,styleType){var style=inspect.styles[styleType];if(style){return"["+inspect.colors[style][0]+"m"+str+"["+inspect.colors[style][1]+"m"}else{return str}}function stylizeNoColor(str,styleType){return str}function arrayToHash(array){var hash={};array.forEach(function(val,idx){hash[val]=true});return hash}function formatValue(ctx,value,recurseTimes){if(ctx.customInspect&&value&&isFunction(value.inspect)&&value.inspect!==exports.inspect&&!(value.constructor&&value.constructor.prototype===value)){var ret=value.inspect(recurseTimes,ctx);if(!isString(ret)){ret=formatValue(ctx,ret,recurseTimes)}return ret}var primitive=formatPrimitive(ctx,value);if(primitive){return primitive}var keys=Object.keys(value);var visibleKeys=arrayToHash(keys);if(ctx.showHidden){keys=Object.getOwnPropertyNames(value)}if(isError(value)&&(keys.indexOf("message")>=0||keys.indexOf("description")>=0)){return formatError(value)}if(keys.length===0){if(isFunction(value)){var name=value.name?": "+value.name:"";return ctx.stylize("[Function"+name+"]","special")}if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),"regexp")}if(isDate(value)){return ctx.stylize(Date.prototype.toString.call(value),"date")}if(isError(value)){return formatError(value)}}var base="",array=false,braces=["{","}"];if(isArray(value)){array=true;braces=["[","]"]}if(isFunction(value)){var n=value.name?": "+value.name:"";base=" [Function"+n+"]"}if(isRegExp(value)){base=" "+RegExp.prototype.toString.call(value)}if(isDate(value)){base=" "+Date.prototype.toUTCString.call(value)}if(isError(value)){base=" "+formatError(value)}if(keys.length===0&&(!array||value.length==0)){return braces[0]+base+braces[1]}if(recurseTimes<0){if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),"regexp")}else{return ctx.stylize("[Object]","special")}}ctx.seen.push(value);var output;if(array){output=formatArray(ctx,value,recurseTimes,visibleKeys,keys)}else{output=keys.map(function(key){return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array)})}ctx.seen.pop();return reduceToSingleString(output,base,braces)}function formatPrimitive(ctx,value){if(isUndefined(value))return ctx.stylize("undefined","undefined");if(isString(value)){var simple="'"+JSON.stringify(value).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return ctx.stylize(simple,"string")}if(isNumber(value))return ctx.stylize(""+value,"number");if(isBoolean(value))return ctx.stylize(""+value,"boolean");if(isNull(value))return ctx.stylize("null","null")}function formatError(value){return"["+Error.prototype.toString.call(value)+"]"}function formatArray(ctx,value,recurseTimes,visibleKeys,keys){var output=[];for(var i=0,l=value.length;i<l;++i){if(hasOwnProperty(value,String(i))){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,String(i),true))}else{output.push("")}}keys.forEach(function(key){if(!key.match(/^\d+$/)){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,key,true))}});return output}function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){var name,str,desc;desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]};if(desc.get){if(desc.set){str=ctx.stylize("[Getter/Setter]","special")}else{str=ctx.stylize("[Getter]","special")}}else{if(desc.set){str=ctx.stylize("[Setter]","special")}}if(!hasOwnProperty(visibleKeys,key)){name="["+key+"]"}if(!str){if(ctx.seen.indexOf(desc.value)<0){if(isNull(recurseTimes)){str=formatValue(ctx,desc.value,null)}else{str=formatValue(ctx,desc.value,recurseTimes-1)}if(str.indexOf("\n")>-1){if(array){str=str.split("\n").map(function(line){return"  "+line}).join("\n").substr(2)}else{str="\n"+str.split("\n").map(function(line){return"   "+line}).join("\n")}}}else{str=ctx.stylize("[Circular]","special")}}if(isUndefined(name)){if(array&&key.match(/^\d+$/)){return str}name=JSON.stringify(""+key);if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){name=name.substr(1,name.length-2);name=ctx.stylize(name,"name")}else{name=name.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");name=ctx.stylize(name,"string")}}return name+": "+str}function reduceToSingleString(output,base,braces){var numLinesEst=0;var length=output.reduce(function(prev,cur){numLinesEst++;if(cur.indexOf("\n")>=0)numLinesEst++;return prev+cur.replace(/\u001b\[\d\d?m/g,"").length+1},0);if(length>60){return braces[0]+(base===""?"":base+"\n ")+" "+output.join(",\n  ")+" "+braces[1]}return braces[0]+base+" "+output.join(", ")+" "+braces[1]}function isArray(ar){return Array.isArray(ar)}exports.isArray=isArray;function isBoolean(arg){return typeof arg==="boolean"}exports.isBoolean=isBoolean;function isNull(arg){return arg===null}exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null}exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==="number"}exports.isNumber=isNumber;function isString(arg){return typeof arg==="string"}exports.isString=isString;function isSymbol(arg){return typeof arg==="symbol"}exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0}exports.isUndefined=isUndefined;function isRegExp(re){return isObject(re)&&objectToString(re)==="[object RegExp]"}exports.isRegExp=isRegExp;function isObject(arg){return typeof arg==="object"&&arg!==null}exports.isObject=isObject;function isDate(d){return isObject(d)&&objectToString(d)==="[object Date]"}exports.isDate=isDate;function isError(e){return isObject(e)&&(objectToString(e)==="[object Error]"||e instanceof Error)}exports.isError=isError;function isFunction(arg){return typeof arg==="function"}exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==="boolean"||typeof arg==="number"||typeof arg==="string"||typeof arg==="symbol"||typeof arg==="undefined"}exports.isPrimitive=isPrimitive;exports.isBuffer=require("./support/isBuffer");function objectToString(o){return Object.prototype.toString.call(o)}function pad(n){return n<10?"0"+n.toString(10):n.toString(10)}var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function timestamp(){var d=new Date;var time=[pad(d.getHours()),pad(d.getMinutes()),pad(d.getSeconds())].join(":");return[d.getDate(),months[d.getMonth()],time].join(" ")}exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))};exports.inherits=require("inherits");exports._extend=function(origin,add){if(!add||!isObject(add))return origin;var keys=Object.keys(add);var i=keys.length;while(i--){origin[keys[i]]=add[keys[i]]}return origin};function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}}).call(this,require("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./support/isBuffer":76,_process:62,inherits:58}],"bitcoinjs-lib":[function(require,module,exports){module.exports={Block:require("./block"),ECPair:require("./ecpair"),ECSignature:require("./ecsignature"),HDNode:require("./hdnode"),Transaction:require("./transaction"),TransactionBuilder:require("./transaction_builder"),address:require("./address"),bufferutils:require("./bufferutils"),crypto:require("./crypto"),message:require("./message"),networks:require("./networks"),opcodes:require("./opcodes"),script:require("./script")}},{"./address":34,"./block":35,"./bufferutils":36,"./crypto":37,"./ecpair":39,"./ecsignature":40,"./hdnode":41,"./message":42,"./networks":43,"./opcodes":44,"./script":45,"./transaction":47,"./transaction_builder":48}]},{},[])("bitcoinjs-lib")});



/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/libs/highlight.min.js ---- */


/*! highlight.js v9.12.0 | BSD3 License | git.io/hljslicense */
!function(e){var t="object"==typeof window&&window||"object"==typeof self&&self;"undefined"!=typeof exports?e(exports):t&&(t.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return t.hljs}))}(function(e){function t(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function r(e){return e.nodeName.toLowerCase()}function a(e,t){var r=e&&e.exec(t);return r&&0===r.index}function n(e){return E.test(e)}function i(e){var t,r,a,i,s=e.className+" ";if(s+=e.parentNode?e.parentNode.className:"",r=M.exec(s))return w(r[1])?r[1]:"no-highlight";for(s=s.split(/\s+/),t=0,a=s.length;a>t;t++)if(i=s[t],n(i)||w(i))return i}function s(e){var t,r={},a=Array.prototype.slice.call(arguments,1);for(t in e)r[t]=e[t];return a.forEach(function(e){for(t in e)r[t]=e[t]}),r}function c(e){var t=[];return function a(e,n){for(var i=e.firstChild;i;i=i.nextSibling)3===i.nodeType?n+=i.nodeValue.length:1===i.nodeType&&(t.push({event:"start",offset:n,node:i}),n=a(i,n),r(i).match(/br|hr|img|input/)||t.push({event:"stop",offset:n,node:i}));return n}(e,0),t}function o(e,a,n){function i(){return e.length&&a.length?e[0].offset!==a[0].offset?e[0].offset<a[0].offset?e:a:"start"===a[0].event?e:a:e.length?e:a}function s(e){function a(e){return" "+e.nodeName+'="'+t(e.value).replace('"',"&quot;")+'"'}u+="<"+r(e)+N.map.call(e.attributes,a).join("")+">"}function c(e){u+="</"+r(e)+">"}function o(e){("start"===e.event?s:c)(e.node)}for(var l=0,u="",d=[];e.length||a.length;){var b=i();if(u+=t(n.substring(l,b[0].offset)),l=b[0].offset,b===e){d.reverse().forEach(c);do o(b.splice(0,1)[0]),b=i();while(b===e&&b.length&&b[0].offset===l);d.reverse().forEach(s)}else"start"===b[0].event?d.push(b[0].node):d.pop(),o(b.splice(0,1)[0])}return u+t(n.substr(l))}function l(e){return e.v&&!e.cached_variants&&(e.cached_variants=e.v.map(function(t){return s(e,{v:null},t)})),e.cached_variants||e.eW&&[s(e)]||[e]}function u(e){function t(e){return e&&e.source||e}function r(r,a){return new RegExp(t(r),"m"+(e.cI?"i":"")+(a?"g":""))}function a(n,i){if(!n.compiled){if(n.compiled=!0,n.k=n.k||n.bK,n.k){var s={},c=function(t,r){e.cI&&(r=r.toLowerCase()),r.split(" ").forEach(function(e){var r=e.split("|");s[r[0]]=[t,r[1]?Number(r[1]):1]})};"string"==typeof n.k?c("keyword",n.k):k(n.k).forEach(function(e){c(e,n.k[e])}),n.k=s}n.lR=r(n.l||/\w+/,!0),i&&(n.bK&&(n.b="\\b("+n.bK.split(" ").join("|")+")\\b"),n.b||(n.b=/\B|\b/),n.bR=r(n.b),n.e||n.eW||(n.e=/\B|\b/),n.e&&(n.eR=r(n.e)),n.tE=t(n.e)||"",n.eW&&i.tE&&(n.tE+=(n.e?"|":"")+i.tE)),n.i&&(n.iR=r(n.i)),null==n.r&&(n.r=1),n.c||(n.c=[]),n.c=Array.prototype.concat.apply([],n.c.map(function(e){return l("self"===e?n:e)})),n.c.forEach(function(e){a(e,n)}),n.starts&&a(n.starts,i);var o=n.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([n.tE,n.i]).map(t).filter(Boolean);n.t=o.length?r(o.join("|"),!0):{exec:function(){return null}}}}a(e)}function d(e,r,n,i){function s(e,t){var r,n;for(r=0,n=t.c.length;n>r;r++)if(a(t.c[r].bR,e))return t.c[r]}function c(e,t){if(a(e.eR,t)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?c(e.parent,t):void 0}function o(e,t){return!n&&a(t.iR,e)}function l(e,t){var r=v.cI?t[0].toLowerCase():t[0];return e.k.hasOwnProperty(r)&&e.k[r]}function p(e,t,r,a){var n=a?"":L.classPrefix,i='<span class="'+n,s=r?"":R;return i+=e+'">',i+t+s}function m(){var e,r,a,n;if(!N.k)return t(E);for(n="",r=0,N.lR.lastIndex=0,a=N.lR.exec(E);a;)n+=t(E.substring(r,a.index)),e=l(N,a),e?(M+=e[1],n+=p(e[0],t(a[0]))):n+=t(a[0]),r=N.lR.lastIndex,a=N.lR.exec(E);return n+t(E.substr(r))}function f(){var e="string"==typeof N.sL;if(e&&!x[N.sL])return t(E);var r=e?d(N.sL,E,!0,k[N.sL]):b(E,N.sL.length?N.sL:void 0);return N.r>0&&(M+=r.r),e&&(k[N.sL]=r.top),p(r.language,r.value,!1,!0)}function g(){C+=null!=N.sL?f():m(),E=""}function _(e){C+=e.cN?p(e.cN,"",!0):"",N=Object.create(e,{parent:{value:N}})}function h(e,t){if(E+=e,null==t)return g(),0;var r=s(t,N);if(r)return r.skip?E+=t:(r.eB&&(E+=t),g(),r.rB||r.eB||(E=t)),_(r,t),r.rB?0:t.length;var a=c(N,t);if(a){var n=N;n.skip?E+=t:(n.rE||n.eE||(E+=t),g(),n.eE&&(E=t));do N.cN&&(C+=R),N.skip||(M+=N.r),N=N.parent;while(N!==a.parent);return a.starts&&_(a.starts,""),n.rE?0:t.length}if(o(t,N))throw new Error('Illegal lexeme "'+t+'" for mode "'+(N.cN||"<unnamed>")+'"');return E+=t,t.length||1}var v=w(e);if(!v)throw new Error('Unknown language: "'+e+'"');u(v);var y,N=i||v,k={},C="";for(y=N;y!==v;y=y.parent)y.cN&&(C=p(y.cN,"",!0)+C);var E="",M=0;try{for(var B,S,$=0;;){if(N.t.lastIndex=$,B=N.t.exec(r),!B)break;S=h(r.substring($,B.index),B[0]),$=B.index+S}for(h(r.substr($)),y=N;y.parent;y=y.parent)y.cN&&(C+=R);return{r:M,value:C,language:e,top:N}}catch(A){if(A.message&&-1!==A.message.indexOf("Illegal"))return{r:0,value:t(r)};throw A}}function b(e,r){r=r||L.languages||k(x);var a={r:0,value:t(e)},n=a;return r.filter(w).forEach(function(t){var r=d(t,e,!1);r.language=t,r.r>n.r&&(n=r),r.r>a.r&&(n=a,a=r)}),n.language&&(a.second_best=n),a}function p(e){return L.tabReplace||L.useBR?e.replace(B,function(e,t){return L.useBR&&"\n"===e?"<br>":L.tabReplace?t.replace(/\t/g,L.tabReplace):""}):e}function m(e,t,r){var a=t?C[t]:r,n=[e.trim()];return e.match(/\bhljs\b/)||n.push("hljs"),-1===e.indexOf(a)&&n.push(a),n.join(" ").trim()}function f(e){var t,r,a,s,l,u=i(e);n(u)||(L.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e,l=t.textContent,a=u?d(u,l,!0):b(l),r=c(t),r.length&&(s=document.createElementNS("http://www.w3.org/1999/xhtml","div"),s.innerHTML=a.value,a.value=o(r,c(s),l)),a.value=p(a.value),e.innerHTML=a.value,e.className=m(e.className,u,a.language),e.result={language:a.language,re:a.r},a.second_best&&(e.second_best={language:a.second_best.language,re:a.second_best.r}))}function g(e){L=s(L,e)}function _(){if(!_.called){_.called=!0;var e=document.querySelectorAll("pre code");N.forEach.call(e,f)}}function h(){addEventListener("DOMContentLoaded",_,!1),addEventListener("load",_,!1)}function v(t,r){var a=x[t]=r(e);a.aliases&&a.aliases.forEach(function(e){C[e]=t})}function y(){return k(x)}function w(e){return e=(e||"").toLowerCase(),x[e]||x[C[e]]}var N=[],k=Object.keys,x={},C={},E=/^(no-?highlight|plain|text)$/i,M=/\blang(?:uage)?-([\w-]+)\b/i,B=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,R="</span>",L={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0};return e.highlight=d,e.highlightAuto=b,e.fixMarkup=p,e.highlightBlock=f,e.configure=g,e.initHighlighting=_,e.initHighlightingOnLoad=h,e.registerLanguage=v,e.listLanguages=y,e.getLanguage=w,e.inherit=s,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},e.C=function(t,r,a){var n=e.inherit({cN:"comment",b:t,e:r,c:[]},a||{});return n.c.push(e.PWM),n.c.push({cN:"doctag",b:"(?:TODO|FIXME|NOTE|BUG|XXX):",r:0}),n},e.CLCM=e.C("//","$"),e.CBCM=e.C("/\\*","\\*/"),e.HCM=e.C("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e.METHOD_GUARD={b:"\\.\\s*"+e.UIR,r:0},e.registerLanguage("apache",function(e){var t={cN:"number",b:"[\\$%]\\d+"};return{aliases:["apacheconf"],cI:!0,c:[e.HCM,{cN:"section",b:"</?",e:">"},{cN:"attribute",b:/\w+/,r:0,k:{nomarkup:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{e:/$/,r:0,k:{literal:"on off all"},c:[{cN:"meta",b:"\\s\\[",e:"\\]$"},{cN:"variable",b:"[\\$%]\\{",e:"\\}",c:["self",t]},t,e.QSM]}}],i:/\S/}}),e.registerLanguage("bash",function(e){var t={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)}/}]},r={cN:"string",b:/"/,e:/"/,c:[e.BE,t,{cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/\b-?[a-z\._]+\b/,k:{keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",_:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"meta",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:!0,c:[e.inherit(e.TM,{b:/\w[\w\d_]*/})],r:0},e.HCM,r,a,t]}}),e.registerLanguage("coffeescript",function(e){var t={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super yield import export from as default await then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",built_in:"npm require console print module global window document"},r="[A-Za-z$_][0-9A-Za-z$_]*",a={cN:"subst",b:/#\{/,e:/}/,k:t},n=[e.BNM,e.inherit(e.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[e.BE]},{b:/'/,e:/'/,c:[e.BE]},{b:/"""/,e:/"""/,c:[e.BE,a]},{b:/"/,e:/"/,c:[e.BE,a]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[a,e.HCM]},{b:"//[gim]*",r:0},{b:/\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]},{b:"@"+r},{sL:"javascript",eB:!0,eE:!0,v:[{b:"```",e:"```"},{b:"`",e:"`"}]}];a.c=n;var i=e.inherit(e.TM,{b:r}),s="(\\(.*\\))?\\s*\\B[-=]>",c={cN:"params",b:"\\([^\\(]",rB:!0,c:[{b:/\(/,e:/\)/,k:t,c:["self"].concat(n)}]};return{aliases:["coffee","cson","iced"],k:t,i:/\/\*/,c:n.concat([e.C("###","###"),e.HCM,{cN:"function",b:"^\\s*"+r+"\\s*=\\s*"+s,e:"[-=]>",rB:!0,c:[i,c]},{b:/[:\(,=]\s*/,r:0,c:[{cN:"function",b:s,e:"[-=]>",rB:!0,c:[c]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:!0,i:/[:="\[\]]/,c:[i]},i]},{b:r+":",e:":",rB:!0,rE:!0,r:0}])}}),e.registerLanguage("cpp",function(e){var t={cN:"keyword",b:"\\b[a-z\\d_]*_t\\b"},r={cN:"string",v:[{b:'(u8?|U)?L?"',e:'"',i:"\\n",c:[e.BE]},{b:'(u8?|U)?R"',e:'"',c:[e.BE]},{b:"'\\\\?.",e:"'",i:"."}]},a={cN:"number",v:[{b:"\\b(0b[01']+)"},{b:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{b:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],r:0},n={cN:"meta",b:/#\s*[a-z]+\b/,e:/$/,k:{"meta-keyword":"if else elif endif define undef warning error line pragma ifdef ifndef include"},c:[{b:/\\\n/,r:0},e.inherit(r,{cN:"meta-string"}),{cN:"meta-string",b:/<[^\n>]*>/,e:/$/,i:"\\n"},e.CLCM,e.CBCM]},i=e.IR+"\\s*\\(",s={keyword:"int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and or not",built_in:"std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",literal:"true false nullptr NULL"},c=[t,e.CLCM,e.CBCM,a,r];return{aliases:["c","cc","h","c++","h++","hpp"],k:s,i:"</",c:c.concat([n,{b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:s,c:["self",t]},{b:e.IR+"::",k:s},{v:[{b:/=/,e:/;/},{b:/\(/,e:/\)/},{bK:"new throw return else",e:/;/}],k:s,c:c.concat([{b:/\(/,e:/\)/,k:s,c:c.concat(["self"]),r:0}]),r:0},{cN:"function",b:"("+e.IR+"[\\*&\\s]+)+"+i,rB:!0,e:/[{;=]/,eE:!0,k:s,i:/[^\w\s\*&]/,c:[{b:i,rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:s,r:0,c:[e.CLCM,e.CBCM,r,a,t]},e.CLCM,e.CBCM,n]},{cN:"class",bK:"class struct",e:/[{;:]/,c:[{b:/</,e:/>/,c:["self"]},e.TM]}]),exports:{preprocessor:n,strings:r,k:s}}}),e.registerLanguage("cs",function(e){var t={keyword:"abstract as base bool break byte case catch char checked const continue decimal default delegate do double enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long nameof object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending async await by descending dynamic equals from get global group into join let on orderby partial remove select set value var where yield",literal:"null false true"},r={cN:"string",b:'@"',e:'"',c:[{b:'""'}]},a=e.inherit(r,{i:/\n/}),n={cN:"subst",b:"{",e:"}",k:t},i=e.inherit(n,{i:/\n/}),s={cN:"string",b:/\$"/,e:'"',i:/\n/,c:[{b:"{{"},{b:"}}"},e.BE,i]},c={cN:"string",b:/\$@"/,e:'"',c:[{b:"{{"},{b:"}}"},{b:'""'},n]},o=e.inherit(c,{i:/\n/,c:[{b:"{{"},{b:"}}"},{b:'""'},i]});n.c=[c,s,r,e.ASM,e.QSM,e.CNM,e.CBCM],i.c=[o,s,a,e.ASM,e.QSM,e.CNM,e.inherit(e.CBCM,{i:/\n/})];var l={v:[c,s,r,e.ASM,e.QSM]},u=e.IR+"(<"+e.IR+"(\\s*,\\s*"+e.IR+")*>)?(\\[\\])?";return{aliases:["csharp"],k:t,i:/::/,c:[e.C("///","$",{rB:!0,c:[{cN:"doctag",v:[{b:"///",r:0},{b:"<!--|-->"},{b:"</?",e:">"}]}]}),e.CLCM,e.CBCM,{cN:"meta",b:"#",e:"$",k:{"meta-keyword":"if else elif endif define undef warning error line region endregion pragma checksum"}},l,e.CNM,{bK:"class interface",e:/[{;=]/,i:/[^\s:]/,c:[e.TM,e.CLCM,e.CBCM]},{bK:"namespace",e:/[{;=]/,i:/[^\s:]/,c:[e.inherit(e.TM,{b:"[a-zA-Z](\\.?\\w)*"}),e.CLCM,e.CBCM]},{cN:"meta",b:"^\\s*\\[",eB:!0,e:"\\]",eE:!0,c:[{cN:"meta-string",b:/"/,e:/"/}]},{bK:"new return throw await else",r:0},{cN:"function",b:"("+u+"\\s+)+"+e.IR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:t,c:[{b:e.IR+"\\s*\\(",rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,k:t,r:0,c:[l,e.CNM,e.CBCM]},e.CLCM,e.CBCM]}]}}),e.registerLanguage("css",function(e){var t="[a-zA-Z-][a-zA-Z0-9_-]*",r={b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{eW:!0,eE:!0,c:[{b:/[\w-]+\(/,rB:!0,c:[{cN:"built_in",b:/[\w-]+/},{b:/\(/,e:/\)/,c:[e.ASM,e.QSM]}]},e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"number",b:"#[0-9A-Fa-f]+"},{cN:"meta",b:"!important"}]}}]};return{cI:!0,i:/[=\/|'\$]/,c:[e.CBCM,{cN:"selector-id",b:/#[A-Za-z0-9_-]+/},{cN:"selector-class",b:/\.[A-Za-z0-9_-]+/},{cN:"selector-attr",b:/\[/,e:/\]/,i:"$"},{cN:"selector-pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{b:"@",e:"[{;]",i:/:/,c:[{cN:"keyword",b:/\w+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[e.ASM,e.QSM,e.CSSNM]}]},{cN:"selector-tag",b:t,r:0},{b:"{",e:"}",i:/\S/,c:[e.CBCM,r]}]}}),e.registerLanguage("diff",function(e){return{aliases:["patch"],c:[{cN:"meta",r:10,v:[{b:/^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/},{b:/^\*\*\* +\d+,\d+ +\*\*\*\*$/},{b:/^\-\-\- +\d+,\d+ +\-\-\-\-$/}]},{cN:"comment",v:[{b:/Index: /,e:/$/},{b:/={3,}/,e:/$/},{b:/^\-{3}/,e:/$/},{b:/^\*{3} /,e:/$/},{b:/^\+{3}/,e:/$/},{b:/\*{5}/,e:/\*{5}$/}]},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"addition",b:"^\\!",e:"$"}]}}),e.registerLanguage("http",function(e){var t="HTTP/[0-9\\.]+";return{aliases:["https"],i:"\\S",c:[{b:"^"+t,e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{b:"^[A-Z]+ (.*?) "+t+"$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0},{b:t},{cN:"keyword",b:"[A-Z]+"}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{e:"$",r:0}},{b:"\\n\\n",starts:{sL:[],eW:!0}}]}}),e.registerLanguage("ini",function(e){var t={cN:"string",c:[e.BE],v:[{b:"'''",e:"'''",r:10},{b:'"""',e:'"""',r:10},{b:'"',e:'"'},{b:"'",e:"'"}]};return{aliases:["toml"],cI:!0,i:/\S/,c:[e.C(";","$"),e.HCM,{cN:"section",b:/^\s*\[+/,e:/\]+/},{b:/^[a-z0-9\[\]_-]+\s*=\s*/,e:"$",rB:!0,c:[{cN:"attr",b:/[a-z0-9\[\]_-]+/},{b:/=/,eW:!0,r:0,c:[{cN:"literal",b:/\bon|off|true|false|yes|no\b/},{cN:"variable",v:[{b:/\$[\w\d"][\w\d_]*/},{b:/\$\{(.*?)}/}]},t,{cN:"number",b:/([\+\-]+)?[\d]+_[\d_]+/},e.NM]}]}]}}),e.registerLanguage("java",function(e){var t="[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",r=t+"(<"+t+"(\\s*,\\s*"+t+")*>)?",a="false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",n="\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",i={cN:"number",b:n,r:0};return{aliases:["jsp"],k:a,i:/<\/|#/,c:[e.C("/\\*\\*","\\*/",{r:0,c:[{b:/\w+@/,r:0},{cN:"doctag",b:"@[A-Za-z]+"}]}),e.CLCM,e.CBCM,e.ASM,e.QSM,{cN:"class",bK:"class interface",e:/[{;=]/,eE:!0,k:"class interface",i:/[:"\[\]]/,c:[{bK:"extends implements"},e.UTM]},{bK:"new throw return else",r:0},{cN:"function",b:"("+r+"\\s+)+"+e.UIR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:a,c:[{b:e.UIR+"\\s*\\(",rB:!0,r:0,c:[e.UTM]},{cN:"params",b:/\(/,e:/\)/,k:a,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]},i,{cN:"meta",b:"@[A-Za-z]+"}]}}),e.registerLanguage("javascript",function(e){var t="[A-Za-z$_][0-9A-Za-z$_]*",r={keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},a={cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},n={cN:"subst",b:"\\$\\{",e:"\\}",k:r,c:[]},i={cN:"string",b:"`",e:"`",c:[e.BE,n]};n.c=[e.ASM,e.QSM,i,a,e.RM];var s=n.c.concat([e.CBCM,e.CLCM]);return{aliases:["js","jsx"],k:r,c:[{cN:"meta",r:10,b:/^\s*['"]use (strict|asm)['"]/},{cN:"meta",b:/^#!/,e:/$/},e.ASM,e.QSM,i,e.CLCM,e.CBCM,a,{b:/[{,]\s*/,r:0,c:[{b:t+"\\s*:",rB:!0,r:0,c:[{cN:"attr",b:t,r:0}]}]},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{cN:"function",b:"(\\(.*?\\)|"+t+")\\s*=>",rB:!0,e:"\\s*=>",c:[{cN:"params",v:[{b:t},{b:/\(\s*\)/},{b:/\(/,e:/\)/,eB:!0,eE:!0,k:r,c:s}]}]},{b:/</,e:/(\/\w+|\w+\/)>/,sL:"xml",c:[{b:/<\w+\s*\/>/,skip:!0},{b:/<\w+/,e:/(\/\w+|\w+\/)>/,skip:!0,c:[{b:/<\w+\s*\/>/,skip:!0},"self"]}]}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:t}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,c:s}],i:/\[|%/},{b:/\$[(.]/},e.METHOD_GUARD,{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]},{bK:"constructor",e:/\{/,eE:!0}],i:/#(?!!)/}}),e.registerLanguage("json",function(e){var t={literal:"true false null"},r=[e.QSM,e.CNM],a={e:",",eW:!0,eE:!0,c:r,k:t},n={b:"{",e:"}",c:[{cN:"attr",b:/"/,e:/"/,c:[e.BE],i:"\\n"},e.inherit(a,{b:/:/})],i:"\\S"},i={b:"\\[",e:"\\]",c:[e.inherit(a)],i:"\\S"};return r.splice(r.length,0,n,i),{c:r,k:t,i:"\\S"}}),e.registerLanguage("makefile",function(e){var t={cN:"variable",v:[{b:"\\$\\("+e.UIR+"\\)",c:[e.BE]},{b:/\$[@%<?\^\+\*]/}]},r={cN:"string",b:/"/,e:/"/,c:[e.BE,t]},a={cN:"variable",b:/\$\([\w-]+\s/,e:/\)/,k:{built_in:"subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"},c:[t]},n={b:"^"+e.UIR+"\\s*[:+?]?=",i:"\\n",rB:!0,c:[{b:"^"+e.UIR,e:"[:+?]?=",eE:!0}]},i={cN:"meta",b:/^\.PHONY:/,e:/$/,k:{"meta-keyword":".PHONY"},l:/[\.\w]+/},s={cN:"section",b:/^[^\s]+:/,e:/$/,c:[t]};return{aliases:["mk","mak"],k:"define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath",l:/[\w-]+/,c:[e.HCM,t,r,a,n,i,s]}}),e.registerLanguage("xml",function(e){var t="[A-Za-z0-9\\._:-]+",r={eW:!0,i:/</,r:0,c:[{cN:"attr",b:t,r:0},{b:/=\s*/,r:0,c:[{cN:"string",endsParent:!0,v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s"'=<>`]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist"],cI:!0,c:[{cN:"meta",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},e.C("<!--","-->",{r:10}),{b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{b:/<\?(php)?/,e:/\?>/,sL:"php",c:[{b:"/\\*",e:"\\*/",skip:!0}]},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{name:"style"},c:[r],starts:{e:"</style>",rE:!0,sL:["css","xml"]}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{name:"script"},c:[r],starts:{e:"</script>",rE:!0,sL:["actionscript","javascript","handlebars","xml"]}},{cN:"meta",v:[{b:/<\?xml/,e:/\?>/,r:10},{b:/<\?\w+/,e:/\?>/}]},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"name",b:/[^\/><\s]+/,r:0},r]}]}}),e.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"section",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"quote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"^```w*s*$",e:"^```s*$"},{b:"`.+?`"},{b:"^( {4}|	)",e:"$",r:0}]},{b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"string",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"symbol",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:/^\[[^\n]+\]:/,rB:!0,c:[{cN:"symbol",b:/\[/,e:/\]/,eB:!0,eE:!0},{cN:"link",b:/:\s*/,e:/$/,eB:!0}]}]}}),e.registerLanguage("nginx",function(e){var t={cN:"variable",v:[{b:/\$\d+/},{b:/\$\{/,e:/}/},{b:"[\\$\\@]"+e.UIR}]},r={eW:!0,l:"[a-z/_]+",k:{literal:"on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"},r:0,i:"=>",c:[e.HCM,{cN:"string",c:[e.BE,t],v:[{b:/"/,e:/"/},{b:/'/,e:/'/}]},{b:"([a-z]+):/",e:"\\s",eW:!0,eE:!0,c:[t]},{cN:"regexp",c:[e.BE,t],v:[{b:"\\s\\^",e:"\\s|{|;",rE:!0},{b:"~\\*?\\s+",e:"\\s|{|;",rE:!0},{b:"\\*(\\.[a-z\\-]+)+"},{b:"([a-z\\-]+\\.)+\\*"}]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"},{cN:"number",b:"\\b\\d+[kKmMgGdshdwy]*\\b",r:0},t]};return{aliases:["nginxconf"],c:[e.HCM,{b:e.UIR+"\\s+{",rB:!0,e:"{",c:[{cN:"section",b:e.UIR}],r:0},{b:e.UIR+"\\s",e:";|{",rB:!0,c:[{cN:"attribute",b:e.UIR,starts:r}],r:0}],i:"[^\\s\\}]"}}),e.registerLanguage("objectivec",function(e){var t={cN:"built_in",b:"\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"},r={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"},a=/[a-zA-Z@][a-zA-Z0-9_]*/,n="@interface @class @protocol @implementation";return{aliases:["mm","objc","obj-c"],k:r,l:a,i:"</",c:[t,e.CLCM,e.CBCM,e.CNM,e.QSM,{cN:"string",v:[{b:'@"',e:'"',i:"\\n",c:[e.BE]},{b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"}]},{cN:"meta",b:"#",e:"$",c:[{cN:"meta-string",v:[{b:'"',e:'"'},{b:"<",e:">"}]}]},{cN:"class",b:"("+n.split(" ").join("|")+")\\b",e:"({|$)",eE:!0,k:n,l:a,c:[e.UTM]},{b:"\\."+e.UIR,r:0}]}}),e.registerLanguage("perl",function(e){var t="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",r={cN:"subst",b:"[$@]\\{",e:"\\}",k:t},a={b:"->{",e:"}"},n={v:[{b:/\$\d/},{b:/[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/},{b:/[\$%@][^\s\w{]/,r:0}]},i=[e.BE,r,n],s=[n,e.HCM,e.C("^\\=\\w","\\=cut",{eW:!0}),a,{cN:"string",c:i,v:[{b:"q[qwxr]?\\s*\\(",e:"\\)",r:5},{b:"q[qwxr]?\\s*\\[",e:"\\]",r:5},{b:"q[qwxr]?\\s*\\{",e:"\\}",r:5},{b:"q[qwxr]?\\s*\\|",e:"\\|",r:5},{b:"q[qwxr]?\\s*\\<",e:"\\>",r:5},{b:"qw\\s+q",e:"q",r:5},{b:"'",e:"'",c:[e.BE]},{b:'"',e:'"'},{b:"`",e:"`",c:[e.BE]},{b:"{\\w+}",c:[],r:0},{b:"-?\\w+\\s*\\=\\>",c:[],r:0}]},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\/\\/|"+e.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[e.HCM,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[e.BE],r:0}]},{cN:"function",bK:"sub",e:"(\\s*\\(.*?\\))?[;{]",eE:!0,r:5,c:[e.TM]},{b:"-\\w\\b",r:0},{b:"^__DATA__$",e:"^__END__$",sL:"mojolicious",c:[{b:"^@@.*",e:"$",cN:"comment"}]}];return r.c=s,a.c=s,{aliases:["pl","pm"],l:/[\w\.]+/,k:t,c:s}}),e.registerLanguage("php",function(e){var t={b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},r={cN:"meta",b:/<\?(php)?|\?>/},a={cN:"string",c:[e.BE,r],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},n={v:[e.BNM,e.CNM]};return{aliases:["php3","php4","php5","php6"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.HCM,e.C("//","$",{c:[r]}),e.C("/\\*","\\*/",{c:[{cN:"doctag",b:"@[A-Za-z]+"}]}),e.C("__halt_compiler.+?;",!1,{eW:!0,k:"__halt_compiler",l:e.UIR}),{cN:"string",b:/<<<['"]?\w+['"]?$/,e:/^\w+;?$/,c:[e.BE,{cN:"subst",v:[{b:/\$\w+/},{b:/\{\$/,e:/\}/}]}]},r,{cN:"keyword",b:/\$this\b/},t,{b:/(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",t,e.CBCM,a,n]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},a,n]}}),e.registerLanguage("python",function(e){var t={keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},r={cN:"meta",b:/^(>>>|\.\.\.) /},a={cN:"subst",b:/\{/,e:/\}/,k:t,i:/#/},n={cN:"string",c:[e.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[r],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[r],r:10},{b:/(fr|rf|f)'''/,e:/'''/,c:[r,a]},{b:/(fr|rf|f)"""/,e:/"""/,c:[r,a]},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},{b:/(fr|rf|f)'/,e:/'/,c:[a]},{b:/(fr|rf|f)"/,e:/"/,c:[a]},e.ASM,e.QSM]},i={cN:"number",r:0,v:[{b:e.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:e.CNR+"[lLjJ]?"}]},s={cN:"params",b:/\(/,e:/\)/,c:["self",r,i,n]};return a.c=[n,i,r],{aliases:["py","gyp"],k:t,i:/(<\/|->|\?)|=>/,c:[r,i,n,e.HCM,{v:[{cN:"function",bK:"def"},{cN:"class",bK:"class"}],e:/:/,i:/[${=;\n,]/,c:[e.UTM,s,{b:/->/,eW:!0,k:"None"}]},{cN:"meta",b:/^[\t ]*@/,e:/$/},{b:/\b(print|exec)\(/}]}}),e.registerLanguage("ruby",function(e){
var t="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",r={keyword:"and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",literal:"true false nil"},a={cN:"doctag",b:"@[A-Za-z]+"},n={b:"#<",e:">"},i=[e.C("#","$",{c:[a]}),e.C("^\\=begin","^\\=end",{c:[a],r:10}),e.C("^__END__","\\n$")],s={cN:"subst",b:"#\\{",e:"}",k:r},c={cN:"string",c:[e.BE,s],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/`/,e:/`/},{b:"%[qQwWx]?\\(",e:"\\)"},{b:"%[qQwWx]?\\[",e:"\\]"},{b:"%[qQwWx]?{",e:"}"},{b:"%[qQwWx]?<",e:">"},{b:"%[qQwWx]?/",e:"/"},{b:"%[qQwWx]?%",e:"%"},{b:"%[qQwWx]?-",e:"-"},{b:"%[qQwWx]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/},{b:/<<(-?)\w+$/,e:/^\s*\w+$/}]},o={cN:"params",b:"\\(",e:"\\)",endsParent:!0,k:r},l=[c,n,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[e.inherit(e.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{b:"<\\s*",c:[{b:"("+e.IR+"::)?"+e.IR}]}].concat(i)},{cN:"function",bK:"def",e:"$|;",c:[e.inherit(e.TM,{b:t}),o].concat(i)},{b:e.IR+"::"},{cN:"symbol",b:e.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":(?!\\s)",c:[c,{b:t}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{cN:"params",b:/\|/,e:/\|/,k:r},{b:"("+e.RSR+"|unless)\\s*",k:"unless",c:[n,{cN:"regexp",c:[e.BE,s],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}].concat(i),r:0}].concat(i);s.c=l,o.c=l;var u="[>?]>",d="[\\w#]+\\(\\w+\\):\\d+:\\d+>",b="(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",p=[{b:/^\s*=>/,starts:{e:"$",c:l}},{cN:"meta",b:"^("+u+"|"+d+"|"+b+")",starts:{e:"$",c:l}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:r,i:/\/\*/,c:i.concat(p).concat(l)}}),e.registerLanguage("shell",function(e){return{aliases:["console"],c:[{cN:"meta",b:"^\\s{0,3}[\\w\\d\\[\\]()@-]*[>%$#]",starts:{e:"$",sL:"bash"}}]}}),e.registerLanguage("sql",function(e){var t=e.C("--","$");return{cI:!0,i:/[<>{}*#]/,c:[{bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment",e:/;/,eW:!0,l:/[\w\.]+/,k:{keyword:"abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"},c:[{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[e.BE]},e.CNM,e.CBCM,t]},e.CBCM,t]}}),e});



/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/libs/js-sha1.min.js ---- */


/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.5.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";function t(t){t?(f[0]=f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0,this.blocks=f):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}var h="object"==typeof window?window:{},s=!h.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;s&&(h=global);var i=!h.JS_SHA1_NO_COMMON_JS&&"object"==typeof module&&module.exports,e="function"==typeof define&&define.amd,r="0123456789abcdef".split(""),o=[-2147483648,8388608,32768,128],n=[24,16,8,0],a=["hex","array","digest","arrayBuffer"],f=[],u=function(h){return function(s){return new t(!0).update(s)[h]()}},c=function(){var h=u("hex");s&&(h=p(h)),h.create=function(){return new t},h.update=function(t){return h.create().update(t)};for(var i=0;i<a.length;++i){var e=a[i];h[e]=u(e)}return h},p=function(t){var h=require("crypto"),s=require("buffer").Buffer,i=function(i){if("string"==typeof i)return h.createHash("sha1").update(i,"utf8").digest("hex");if(i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(void 0===i.length)return t(i);return h.createHash("sha1").update(new s(i)).digest("hex")};return i};t.prototype.update=function(t){if(!this.finalized){var s="string"!=typeof t;s&&t.constructor===h.ArrayBuffer&&(t=new Uint8Array(t));for(var i,e,r=0,o=t.length||0,a=this.blocks;o>r;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),s)for(e=this.start;o>r&&64>e;++r)a[e>>2]|=t[r]<<n[3&e++];else for(e=this.start;o>r&&64>e;++r)i=t.charCodeAt(r),128>i?a[e>>2]|=i<<n[3&e++]:2048>i?(a[e>>2]|=(192|i>>6)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):55296>i||i>=57344?(a[e>>2]|=(224|i>>12)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++r)),a[e>>2]|=(240|i>>18)<<n[3&e++],a[e>>2]|=(128|i>>12&63)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=a[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,h=this.lastByteIndex;t[16]=this.block,t[h>>2]|=o[3&h],this.block=t[16],h>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,h,s,i=this.h0,e=this.h1,r=this.h2,o=this.h3,n=this.h4,a=this.blocks;for(h=16;80>h;++h)s=a[h-3]^a[h-8]^a[h-14]^a[h-16],a[h]=s<<1|s>>>31;for(h=0;20>h;h+=5)t=e&r|~e&o,s=i<<5|i>>>27,n=s+t+n+1518500249+a[h]<<0,e=e<<30|e>>>2,t=i&e|~i&r,s=n<<5|n>>>27,o=s+t+o+1518500249+a[h+1]<<0,i=i<<30|i>>>2,t=n&i|~n&e,s=o<<5|o>>>27,r=s+t+r+1518500249+a[h+2]<<0,n=n<<30|n>>>2,t=o&n|~o&i,s=r<<5|r>>>27,e=s+t+e+1518500249+a[h+3]<<0,o=o<<30|o>>>2,t=r&o|~r&n,s=e<<5|e>>>27,i=s+t+i+1518500249+a[h+4]<<0,r=r<<30|r>>>2;for(;40>h;h+=5)t=e^r^o,s=i<<5|i>>>27,n=s+t+n+1859775393+a[h]<<0,e=e<<30|e>>>2,t=i^e^r,s=n<<5|n>>>27,o=s+t+o+1859775393+a[h+1]<<0,i=i<<30|i>>>2,t=n^i^e,s=o<<5|o>>>27,r=s+t+r+1859775393+a[h+2]<<0,n=n<<30|n>>>2,t=o^n^i,s=r<<5|r>>>27,e=s+t+e+1859775393+a[h+3]<<0,o=o<<30|o>>>2,t=r^o^n,s=e<<5|e>>>27,i=s+t+i+1859775393+a[h+4]<<0,r=r<<30|r>>>2;for(;60>h;h+=5)t=e&r|e&o|r&o,s=i<<5|i>>>27,n=s+t+n-1894007588+a[h]<<0,e=e<<30|e>>>2,t=i&e|i&r|e&r,s=n<<5|n>>>27,o=s+t+o-1894007588+a[h+1]<<0,i=i<<30|i>>>2,t=n&i|n&e|i&e,s=o<<5|o>>>27,r=s+t+r-1894007588+a[h+2]<<0,n=n<<30|n>>>2,t=o&n|o&i|n&i,s=r<<5|r>>>27,e=s+t+e-1894007588+a[h+3]<<0,o=o<<30|o>>>2,t=r&o|r&n|o&n,s=e<<5|e>>>27,i=s+t+i-1894007588+a[h+4]<<0,r=r<<30|r>>>2;for(;80>h;h+=5)t=e^r^o,s=i<<5|i>>>27,n=s+t+n-899497514+a[h]<<0,e=e<<30|e>>>2,t=i^e^r,s=n<<5|n>>>27,o=s+t+o-899497514+a[h+1]<<0,i=i<<30|i>>>2,t=n^i^e,s=o<<5|o>>>27,r=s+t+r-899497514+a[h+2]<<0,n=n<<30|n>>>2,t=o^n^i,s=r<<5|r>>>27,e=s+t+e-899497514+a[h+3]<<0,o=o<<30|o>>>2,t=r^o^n,s=e<<5|e>>>27,i=s+t+i-899497514+a[h+4]<<0,r=r<<30|r>>>2;this.h0=this.h0+i<<0,this.h1=this.h1+e<<0,this.h2=this.h2+r<<0,this.h3=this.h3+o<<0,this.h4=this.h4+n<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return r[t>>28&15]+r[t>>24&15]+r[t>>20&15]+r[t>>16&15]+r[t>>12&15]+r[t>>8&15]+r[t>>4&15]+r[15&t]+r[h>>28&15]+r[h>>24&15]+r[h>>20&15]+r[h>>16&15]+r[h>>12&15]+r[h>>8&15]+r[h>>4&15]+r[15&h]+r[s>>28&15]+r[s>>24&15]+r[s>>20&15]+r[s>>16&15]+r[s>>12&15]+r[s>>8&15]+r[s>>4&15]+r[15&s]+r[i>>28&15]+r[i>>24&15]+r[i>>20&15]+r[i>>16&15]+r[i>>12&15]+r[i>>8&15]+r[i>>4&15]+r[15&i]+r[e>>28&15]+r[e>>24&15]+r[e>>20&15]+r[e>>16&15]+r[e>>12&15]+r[e>>8&15]+r[e>>4&15]+r[15&e]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return[t>>24&255,t>>16&255,t>>8&255,255&t,h>>24&255,h>>16&255,h>>8&255,255&h,s>>24&255,s>>16&255,s>>8&255,255&s,i>>24&255,i>>16&255,i>>8&255,255&i,e>>24&255,e>>16&255,e>>8&255,255&e]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(20),h=new DataView(t);return h.setUint32(0,this.h0),h.setUint32(4,this.h1),h.setUint32(8,this.h2),h.setUint32(12,this.h3),h.setUint32(16,this.h4),t};var y=c();i?module.exports=y:(h.sha1=y,e&&define(function(){return y}))}();



/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/libs/pica-4.0.1.min.js ---- */


!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).pica=t()}}(function(){return function t(e,i,r){function n(A,a){if(!i[A]){if(!e[A]){var s="function"==typeof require&&require;if(!a&&s)return s(A,!0);if(o)return o(A,!0);var u=new Error("Cannot find module '"+A+"'");throw u.code="MODULE_NOT_FOUND",u}var h=i[A]={exports:{}};e[A][0].call(h.exports,function(t){var i=e[A][1][t];return n(i||t)},h,h.exports,t,e,i,r)}return i[A].exports}for(var o="function"==typeof require&&require,A=0;A<r.length;A++)n(r[A]);return n}({1:[function(t,e,i){"use strict";function r(t){var e=t||[],i={js:e.indexOf("js")>=0,wasm:e.indexOf("wasm")>=0};o.call(this,i),this.features={js:i.js,wasm:i.wasm&&this.has_wasm},this.use(A),this.use(a)}var n=t("inherits"),o=t("multimath"),A=t("multimath/lib/unsharp_mask"),a=t("./mm_resize");n(r,o),r.prototype.resizeAndUnsharp=function(t,e){var i=this.resize(t,e);return t.unsharpAmount&&this.unsharp_mask(i,t.toWidth,t.toHeight,t.unsharpAmount,t.unsharpRadius,t.unsharpThreshold),i},e.exports=r},{"./mm_resize":4,inherits:14,multimath:15,"multimath/lib/unsharp_mask":18}],2:[function(t,e,i){"use strict";function r(t){return t<0?0:t>255?255:t}e.exports={convolveHorizontally:function(t,e,i,n,o,A){var a,s,u,h,f,g,c,l,d,I,m,p=0,w=0;for(d=0;d<n;d++){for(f=0,I=0;I<o;I++){for(g=A[f++],c=A[f++],l=p+4*g|0,a=s=u=h=0;c>0;c--)h=h+(m=A[f++])*t[l+3]|0,u=u+m*t[l+2]|0,s=s+m*t[l+1]|0,a=a+m*t[l]|0,l=l+4|0;e[w+3]=r(h+8192>>14),e[w+2]=r(u+8192>>14),e[w+1]=r(s+8192>>14),e[w]=r(a+8192>>14),w=w+4*n|0}w=4*(d+1)|0,p=(d+1)*i*4|0}},convolveVertically:function(t,e,i,n,o,A){var a,s,u,h,f,g,c,l,d,I,m,p=0,w=0;for(d=0;d<n;d++){for(f=0,I=0;I<o;I++){for(g=A[f++],c=A[f++],l=p+4*g|0,a=s=u=h=0;c>0;c--)h=h+(m=A[f++])*t[l+3]|0,u=u+m*t[l+2]|0,s=s+m*t[l+1]|0,a=a+m*t[l]|0,l=l+4|0;e[w+3]=r(h+8192>>14),e[w+2]=r(u+8192>>14),e[w+1]=r(s+8192>>14),e[w]=r(a+8192>>14),w=w+4*n|0}w=4*(d+1)|0,p=(d+1)*i*4|0}}}},{}],3:[function(t,e,i){"use strict";e.exports="AGFzbQEAAAABFAJgBn9/f39/fwBgB39/f39/f38AAg8BA2VudgZtZW1vcnkCAAEDAwIAAQQEAXAAAAcZAghjb252b2x2ZQAACmNvbnZvbHZlSFYAAQkBAArmAwLBAwEQfwJAIANFDQAgBEUNACAFQQRqIRVBACEMQQAhDQNAIA0hDkEAIRFBACEHA0AgB0ECaiESAn8gBSAHQQF0IgdqIgZBAmouAQAiEwRAQQAhCEEAIBNrIRQgFSAHaiEPIAAgDCAGLgEAakECdGohEEEAIQlBACEKQQAhCwNAIBAoAgAiB0EYdiAPLgEAIgZsIAtqIQsgB0H/AXEgBmwgCGohCCAHQRB2Qf8BcSAGbCAKaiEKIAdBCHZB/wFxIAZsIAlqIQkgD0ECaiEPIBBBBGohECAUQQFqIhQNAAsgEiATagwBC0EAIQtBACEKQQAhCUEAIQggEgshByABIA5BAnRqIApBgMAAakEOdSIGQf8BIAZB/wFIG0EQdEGAgPwHcUEAIAZBAEobIAtBgMAAakEOdSIGQf8BIAZB/wFIG0EYdEEAIAZBAEobciAJQYDAAGpBDnUiBkH/ASAGQf8BSBtBCHRBgP4DcUEAIAZBAEobciAIQYDAAGpBDnUiBkH/ASAGQf8BSBtB/wFxQQAgBkEAShtyNgIAIA4gA2ohDiARQQFqIhEgBEcNAAsgDCACaiEMIA1BAWoiDSADRw0ACwsLIQACQEEAIAIgAyAEIAUgABAAIAJBACAEIAUgBiABEAALCw=="},{}],4:[function(t,e,i){"use strict";e.exports={name:"resize",fn:t("./resize"),wasm_fn:t("./resize_wasm"),wasm_src:t("./convolve_wasm_base64")}},{"./convolve_wasm_base64":3,"./resize":5,"./resize_wasm":8}],5:[function(t,e,i){"use strict";function r(t,e,i){for(var r=3,n=e*i*4|0;r<n;)t[r]=255,r=r+4|0}var n=t("./resize_filter_gen"),o=t("./convolve").convolveHorizontally,A=t("./convolve").convolveVertically;e.exports=function(t){var e=t.src,i=t.width,a=t.height,s=t.toWidth,u=t.toHeight,h=t.scaleX||t.toWidth/t.width,f=t.scaleY||t.toHeight/t.height,g=t.offsetX||0,c=t.offsetY||0,l=t.dest||new Uint8Array(s*u*4),d=void 0===t.quality?3:t.quality,I=t.alpha||!1,m=n(d,i,s,h,g),p=n(d,a,u,f,c),w=new Uint8Array(s*a*4);return o(e,w,i,a,s,m),A(w,l,a,s,u,p),I||r(l,s,u),l}},{"./convolve":2,"./resize_filter_gen":6}],6:[function(t,e,i){"use strict";function r(t){return Math.round(t*((1<<o)-1))}var n=t("./resize_filter_info"),o=14;e.exports=function(t,e,i,o,A){var a,s,u,h,f,g,c,l,d,I,m,p,w,B,b,E,_,y=n[t].filter,Q=1/o,C=Math.min(1,o),v=n[t].win/C,x=Math.floor(2*(v+1)),D=new Int16Array((x+2)*i),U=0,M=!D.subarray||!D.set;for(a=0;a<i;a++){for(s=(a+.5)*Q+A,u=Math.max(0,Math.floor(s-v)),f=(h=Math.min(e-1,Math.ceil(s+v)))-u+1,g=new Float32Array(f),c=new Int16Array(f),l=0,d=u,I=0;d<=h;d++,I++)l+=m=y((d+.5-s)*C),g[I]=m;for(p=0,I=0;I<g.length;I++)p+=w=g[I]/l,c[I]=r(w);for(c[i>>1]+=r(1-p),B=0;B<c.length&&0===c[B];)B++;if(B<c.length){for(b=c.length-1;b>0&&0===c[b];)b--;if(E=u+B,_=b-B+1,D[U++]=E,D[U++]=_,M)for(I=B;I<=b;I++)D[U++]=c[I];else D.set(c.subarray(B,b+1),U),U+=_}else D[U++]=0,D[U++]=0}return D}},{"./resize_filter_info":7}],7:[function(t,e,i){"use strict";e.exports=[{win:.5,filter:function(t){return t>=-.5&&t<.5?1:0}},{win:1,filter:function(t){if(t<=-1||t>=1)return 0;if(t>-1.1920929e-7&&t<1.1920929e-7)return 1;var e=t*Math.PI;return Math.sin(e)/e*(.54+.46*Math.cos(e/1))}},{win:2,filter:function(t){if(t<=-2||t>=2)return 0;if(t>-1.1920929e-7&&t<1.1920929e-7)return 1;var e=t*Math.PI;return Math.sin(e)/e*Math.sin(e/2)/(e/2)}},{win:3,filter:function(t){if(t<=-3||t>=3)return 0;if(t>-1.1920929e-7&&t<1.1920929e-7)return 1;var e=t*Math.PI;return Math.sin(e)/e*Math.sin(e/3)/(e/3)}}]},{}],8:[function(t,e,i){"use strict";function r(t,e,i){for(var r=3,n=e*i*4|0;r<n;)t[r]=255,r=r+4|0}function n(t){return new Uint8Array(t.buffer,0,t.byteLength)}function o(t,e,i){if(a)e.set(n(t),i);else for(var r=i,o=0;o<t.length;o++){var A=t[o];e[r++]=255&A,e[r++]=A>>8&255}}var A=t("./resize_filter_gen"),a=!0;try{a=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]}catch(t){}e.exports=function(t){var e=t.src,i=t.width,n=t.height,a=t.toWidth,s=t.toHeight,u=t.scaleX||t.toWidth/t.width,h=t.scaleY||t.toHeight/t.height,f=t.offsetX||0,g=t.offsetY||0,c=t.dest||new Uint8Array(a*s*4),l=void 0===t.quality?3:t.quality,d=t.alpha||!1,I=A(l,i,a,u,f),m=A(l,n,s,h,g),p=this.__align(0+Math.max(e.byteLength,c.byteLength),8),w=this.__align(p+n*a*4,8),B=this.__align(w+I.byteLength,8),b=B+m.byteLength,E=this.__instance("resize",b),_=new Uint8Array(this.__memory.buffer),y=new Uint32Array(this.__memory.buffer),Q=new Uint32Array(e.buffer);return y.set(Q),o(I,_,w),o(m,_,B),(E.exports.convolveHV||E.exports._convolveHV)(w,B,p,i,n,a,s),new Uint32Array(c.buffer).set(new Uint32Array(this.__memory.buffer,0,s*a)),d||r(c,a,s),c}},{"./resize_filter_gen":6}],9:[function(t,e,i){"use strict";function r(t,e){this.create=t,this.available=[],this.acquired={},this.lastId=1,this.timeoutId=0,this.idle=e||2e3}r.prototype.acquire=function(){var t=this,e=void 0;return 0!==this.available.length?e=this.available.pop():((e=this.create()).id=this.lastId++,e.release=function(){return t.release(e)}),this.acquired[e.id]=e,e},r.prototype.release=function(t){var e=this;delete this.acquired[t.id],t.lastUsed=Date.now(),this.available.push(t),0===this.timeoutId&&(this.timeoutId=setTimeout(function(){return e.gc()},100))},r.prototype.gc=function(){var t=this,e=Date.now();this.available=this.available.filter(function(i){return!(e-i.lastUsed>t.idle)||(i.destroy(),!1)}),0!==this.available.length?this.timeoutId=setTimeout(function(){return t.gc()},100):this.timeoutId=0},e.exports=r},{}],10:[function(t,e,i){"use strict";function r(t){var e=Math.round(t);return Math.abs(t-e)<o?e:Math.floor(t)}function n(t){var e=Math.round(t);return Math.abs(t-e)<o?e:Math.ceil(t)}var o=1e-5;e.exports=function(t){var e,i,o,A,a,s,u,h=t.toWidth/t.width,f=t.toHeight/t.height,g=r(t.srcTileSize*h)-2*t.destTileBorder,c=r(t.srcTileSize*f)-2*t.destTileBorder,l=[];for(A=0;A<t.toHeight;A+=c)for(o=0;o<t.toWidth;o+=g)(e=o-t.destTileBorder)<0&&(e=0),e+(a=o+g+t.destTileBorder-e)>=t.toWidth&&(a=t.toWidth-e),(i=A-t.destTileBorder)<0&&(i=0),i+(s=A+c+t.destTileBorder-i)>=t.toHeight&&(s=t.toHeight-i),u={toX:e,toY:i,toWidth:a,toHeight:s,toInnerX:o,toInnerY:A,toInnerWidth:g,toInnerHeight:c,offsetX:e/h-r(e/h),offsetY:i/f-r(i/f),scaleX:h,scaleY:f,x:r(e/h),y:r(i/f),width:n(a/h),height:n(s/f)},l.push(u);return l}},{}],11:[function(t,e,i){"use strict";function r(t){return Object.prototype.toString.call(t)}e.exports.isCanvas=function(t){var e=r(t);return"[object HTMLCanvasElement]"===e||"[object Canvas]"===e},e.exports.isImage=function(t){return"[object HTMLImageElement]"===r(t)},e.exports.limiter=function(t){function e(){i<t&&r.length&&(i++,r.shift()())}var i=0,r=[];return function(t){return new Promise(function(n,o){r.push(function(){t().then(function(t){n(t),i--,e()},function(t){o(t),i--,e()})}),e()})}},e.exports.cib_quality_name=function(t){switch(t){case 0:return"pixelated";case 1:return"low";case 2:return"medium"}return"high"},e.exports.cib_support=function(){return Promise.resolve().then(function(){if("undefined"==typeof createImageBitmap||"undefined"==typeof document)return!1;var t=document.createElement("canvas");return t.width=100,t.height=100,createImageBitmap(t,0,0,100,100,{resizeWidth:10,resizeHeight:10,resizeQuality:"high"}).then(function(e){var i=10===e.width;return e.close(),t=null,i})}).catch(function(){return!1})}},{}],12:[function(t,e,i){"use strict";e.exports=function(){var e=t("./mathlib"),i=void 0;onmessage=function(t){var r=t.data.opts;i||(i=new e(t.data.features));var n=i.resizeAndUnsharp(r);postMessage({result:n},[n.buffer])}}},{"./mathlib":1}],13:[function(t,e,i){function r(t){t<.5&&(t=.5);var e=Math.exp(.527076)/t,i=Math.exp(-e),r=Math.exp(-2*e),n=(1-i)*(1-i)/(1+2*e*i-r);return o=n,A=n*(e-1)*i,a=n*(e+1)*i,s=-n*r,u=2*i,h=-r,f=(o+A)/(1-u-h),g=(a+s)/(1-u-h),new Float32Array([o,A,a,s,u,h,f,g])}function n(t,e,i,r,n,o){var A,a,s,u,h,f,g,c,l,d,I,m,p,w;for(l=0;l<o;l++){for(g=l,c=0,u=h=(A=t[f=l*n])*r[6],I=r[0],m=r[1],p=r[4],w=r[5],d=0;d<n;d++)s=(a=t[f])*I+A*m+u*p+h*w,h=u,u=s,A=a,i[c]=u,c++,f++;for(c--,g+=o*(n-1),u=h=(A=t[--f])*r[7],a=A,I=r[2],m=r[3],d=n-1;d>=0;d--)s=a*I+A*m+u*p+h*w,h=u,u=s,A=a,a=t[f],e[g]=i[c]+u,f--,c--,g-=o}}var o,A,a,s,u,h,f,g;e.exports=function(t,e,i,o){if(o){var A=new Uint16Array(t.length),a=new Float32Array(Math.max(e,i)),s=r(o);n(t,A,a,s,e,i,o),n(A,t,a,s,i,e,o)}}},{}],14:[function(t,e,i){"function"==typeof Object.create?e.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(t,e){t.super_=e;var i=function(){};i.prototype=e.prototype,t.prototype=new i,t.prototype.constructor=t}},{}],15:[function(t,e,i){"use strict";function r(t){if(!(this instanceof r))return new r(t);var e=n({},a,t||{});if(this.options=e,this.__cache={},this.has_wasm=A(),this.__init_promise=null,this.__modules=e.modules||{},this.__memory=null,this.__wasm={},this.__isLE=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0],!this.options.js&&!this.options.wasm)throw new Error('mathlib: at least "js" or "wasm" should be enabled')}var n=t("object-assign"),o=t("./lib/base64decode"),A=t("./lib/wa_detect"),a={js:!0,wasm:!0};r.prototype.use=function(t){return this.__modules[t.name]=t,this.has_wasm&&this.options.wasm&&t.wasm_fn?this[t.name]=t.wasm_fn:this[t.name]=t.fn,this},r.prototype.init=function(){if(this.__init_promise)return this.__init_promise;if(!this.options.js&&this.options.wasm&&!this.has_wasm)return Promise.reject(new Error('mathlib: only "wasm" was enabled, but it\'s not supported'));var t=this;return this.__init_promise=Promise.all(Object.keys(t.__modules).map(function(e){var i=t.__modules[e];return t.has_wasm&&t.options.wasm&&i.wasm_fn?t.__wasm[e]?null:WebAssembly.compile(t.__base64decode(i.wasm_src)).then(function(i){t.__wasm[e]=i}):null})).then(function(){return t}),this.__init_promise},r.prototype.__base64decode=o,r.prototype.__reallocate=function(t){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(t/65536)}),this.__memory;var e=this.__memory.buffer.byteLength;return e<t&&this.__memory.grow(Math.ceil((t-e)/65536)),this.__memory},r.prototype.__instance=function(t,e,i){if(e&&this.__reallocate(e),!this.__wasm[t]){var r=this.__modules[t];this.__wasm[t]=new WebAssembly.Module(this.__base64decode(r.wasm_src))}if(!this.__cache[t]){var o={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:"anyfunc"})};this.__cache[t]=new WebAssembly.Instance(this.__wasm[t],{env:n(o,i||{})})}return this.__cache[t]},r.prototype.__align=function(t,e){var i=t%(e=e||8);return t+(i?e-i:0)},e.exports=r},{"./lib/base64decode":16,"./lib/wa_detect":22,"object-assign":23}],16:[function(t,e,i){"use strict";e.exports=function(t){for(var e=t.replace(/[\r\n=]/g,""),i=e.length,r=new Uint8Array(3*i>>2),n=0,o=0,A=0;A<i;A++)A%4==0&&A&&(r[o++]=n>>16&255,r[o++]=n>>8&255,r[o++]=255&n),n=n<<6|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(e.charAt(A));var a=i%4*6;return 0===a?(r[o++]=n>>16&255,r[o++]=n>>8&255,r[o++]=255&n):18===a?(r[o++]=n>>10&255,r[o++]=n>>2&255):12===a&&(r[o++]=n>>4&255),r}},{}],17:[function(t,e,i){"use strict";e.exports=function(t,e,i){for(var r,n,o,A,a,s=e*i,u=new Uint16Array(s),h=0;h<s;h++)r=t[4*h],n=t[4*h+1],o=t[4*h+2],a=r>=n&&r>=o?r:n>=o&&n>=r?n:o,A=r<=n&&r<=o?r:n<=o&&n<=r?n:o,u[h]=257*(a+A)>>1;return u}},{}],18:[function(t,e,i){"use strict";e.exports={name:"unsharp_mask",fn:t("./unsharp_mask"),wasm_fn:t("./unsharp_mask_wasm"),wasm_src:t("./unsharp_mask_wasm_base64")}},{"./unsharp_mask":19,"./unsharp_mask_wasm":20,"./unsharp_mask_wasm_base64":21}],19:[function(t,e,i){"use strict";var r=t("glur/mono16"),n=t("./hsl_l16");e.exports=function(t,e,i,o,A,a){var s,u,h,f,g,c,l,d,I,m,p,w,B;if(!(0===o||A<.5)){A>2&&(A=2);var b=n(t,e,i),E=new Uint16Array(b);r(E,e,i,A);for(var _=o/100*4096+.5|0,y=257*a|0,Q=e*i,C=0;C<Q;C++)w=2*(b[C]-E[C]),Math.abs(w)>=y&&(s=t[B=4*C],u=t[B+1],h=t[B+2],c=257*((d=s>=u&&s>=h?s:u>=s&&u>=h?u:h)+(l=s<=u&&s<=h?s:u<=s&&u<=h?u:h))>>1,l===d?f=g=0:(g=c<=32767?4095*(d-l)/(d+l)|0:4095*(d-l)/(510-d-l)|0,f=s===d?65535*(u-h)/(6*(d-l))|0:u===d?21845+(65535*(h-s)/(6*(d-l))|0):43690+(65535*(s-u)/(6*(d-l))|0)),(c+=_*w+2048>>12)>65535?c=65535:c<0&&(c=0),0===g?s=u=h=c>>8:(I=2*c-(m=c<=32767?c*(4096+g)+2048>>12:c+((65535-c)*g+2048>>12))>>8,m>>=8,s=(p=f+21845&65535)>=43690?I:p>=32767?I+(6*(m-I)*(43690-p)+32768>>16):p>=10922?m:I+(6*(m-I)*p+32768>>16),u=(p=65535&f)>=43690?I:p>=32767?I+(6*(m-I)*(43690-p)+32768>>16):p>=10922?m:I+(6*(m-I)*p+32768>>16),h=(p=f-21845&65535)>=43690?I:p>=32767?I+(6*(m-I)*(43690-p)+32768>>16):p>=10922?m:I+(6*(m-I)*p+32768>>16)),t[B]=s,t[B+1]=u,t[B+2]=h)}}},{"./hsl_l16":17,"glur/mono16":13}],20:[function(t,e,i){"use strict";e.exports=function(t,e,i,r,n,o){if(!(0===r||n<.5)){n>2&&(n=2);var A=e*i,a=4*A,s=2*A,u=2*A,h=4*Math.max(e,i),f=a,g=f+s,c=g+u,l=c+u,d=l+h,I=this.__instance("unsharp_mask",a+s+2*u+h+32,{exp:Math.exp}),m=new Uint32Array(t.buffer);new Uint32Array(this.__memory.buffer).set(m);var p=I.exports.hsl_l16||I.exports._hsl_l16;p(0,f,e,i),(p=I.exports.blurMono16||I.exports._blurMono16)(f,g,c,l,d,e,i,n),(p=I.exports.unsharp||I.exports._unsharp)(0,0,f,g,e,i,r,o),m.set(new Uint32Array(this.__memory.buffer,0,A))}}},{}],21:[function(t,e,i){"use strict";e.exports="AGFzbQEAAAABMQZgAXwBfGACfX8AYAZ/f39/f38AYAh/f39/f39/fQBgBH9/f38AYAh/f39/f39/fwACGQIDZW52A2V4cAAAA2VudgZtZW1vcnkCAAEDBgUBAgMEBQQEAXAAAAdMBRZfX2J1aWxkX2dhdXNzaWFuX2NvZWZzAAEOX19nYXVzczE2X2xpbmUAAgpibHVyTW9ubzE2AAMHaHNsX2wxNgAEB3Vuc2hhcnAABQkBAAqJEAXZAQEGfAJAIAFE24a6Q4Ia+z8gALujIgOaEAAiBCAEoCIGtjgCECABIANEAAAAAAAAAMCiEAAiBbaMOAIUIAFEAAAAAAAA8D8gBKEiAiACoiAEIAMgA6CiRAAAAAAAAPA/oCAFoaMiArY4AgAgASAEIANEAAAAAAAA8L+gIAKioiIHtjgCBCABIAQgA0QAAAAAAADwP6AgAqKiIgO2OAIIIAEgBSACoiIEtow4AgwgASACIAegIAVEAAAAAAAA8D8gBqGgIgKjtjgCGCABIAMgBKEgAqO2OAIcCwu3AwMDfwR9CHwCQCADKgIUIQkgAyoCECEKIAMqAgwhCyADKgIIIQwCQCAEQX9qIgdBAEgiCA0AIAIgAC8BALgiDSADKgIYu6IiDiAJuyIQoiAOIAq7IhGiIA0gAyoCBLsiEqIgAyoCALsiEyANoqCgoCIPtjgCACACQQRqIQIgAEECaiEAIAdFDQAgBCEGA0AgAiAOIBCiIA8iDiARoiANIBKiIBMgAC8BALgiDaKgoKAiD7Y4AgAgAkEEaiECIABBAmohACAGQX9qIgZBAUoNAAsLAkAgCA0AIAEgByAFbEEBdGogAEF+ai8BACIIuCINIAu7IhGiIA0gDLsiEqKgIA0gAyoCHLuiIg4gCrsiE6KgIA4gCbsiFKKgIg8gAkF8aioCALugqzsBACAHRQ0AIAJBeGohAiAAQXxqIQBBACAFQQF0ayEHIAEgBSAEQQF0QXxqbGohBgNAIAghAyAALwEAIQggBiANIBGiIAO4Ig0gEqKgIA8iECAToqAgDiAUoqAiDyACKgIAu6CrOwEAIAYgB2ohBiAAQX5qIQAgAkF8aiECIBAhDiAEQX9qIgRBAUoNAAsLCwvfAgIDfwZ8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIgyaEAAiDSANoCIPtjgCECAEIAxEAAAAAAAAAMCiEAAiDraMOAIUIAREAAAAAAAA8D8gDaEiCyALoiANIAwgDKCiRAAAAAAAAPA/oCAOoaMiC7Y4AgAgBCANIAxEAAAAAAAA8L+gIAuioiIQtjgCBCAEIA0gDEQAAAAAAADwP6AgC6KiIgy2OAIIIAQgDiALoiINtow4AgwgBCALIBCgIA5EAAAAAAAA8D8gD6GgIgujtjgCGCAEIAwgDaEgC6O2OAIcIAYEQCAFQQF0IQogBiEJIAIhCANAIAAgCCADIAQgBSAGEAIgACAKaiEAIAhBAmohCCAJQX9qIgkNAAsLIAVFDQAgBkEBdCEIIAUhAANAIAIgASADIAQgBiAFEAIgAiAIaiECIAFBAmohASAAQX9qIgANAAsLC7wBAQV/IAMgAmwiAwRAQQAgA2shBgNAIAAoAgAiBEEIdiIHQf8BcSECAn8gBEH/AXEiAyAEQRB2IgRB/wFxIgVPBEAgAyIIIAMgAk8NARoLIAQgBCAHIAIgA0kbIAIgBUkbQf8BcQshCAJAIAMgAk0EQCADIAVNDQELIAQgByAEIAMgAk8bIAIgBUsbQf8BcSEDCyAAQQRqIQAgASADIAhqQYECbEEBdjsBACABQQJqIQEgBkEBaiIGDQALCwvTBgEKfwJAIAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6CqIQ0gBSAEbCILBEAgB0GBAmwhDgNAQQAgAi8BACADLwEAayIGQQF0IgdrIAcgBkEASBsgDk8EQCAAQQJqLQAAIQUCfyAALQAAIgYgAEEBai0AACIESSIJRQRAIAYiCCAGIAVPDQEaCyAFIAUgBCAEIAVJGyAGIARLGwshCAJ/IAYgBE0EQCAGIgogBiAFTQ0BGgsgBSAFIAQgBCAFSxsgCRsLIgogCGoiD0GBAmwiEEEBdiERQQAhDAJ/QQAiCSAIIApGDQAaIAggCmsiCUH/H2wgD0H+AyAIayAKayAQQYCABEkbbSEMIAYgCEYEQCAEIAVrQf//A2wgCUEGbG0MAQsgBSAGayAGIARrIAQgCEYiBhtB//8DbCAJQQZsbUHVqgFBqtUCIAYbagshCSARIAcgDWxBgBBqQQx1aiIGQQAgBkEAShsiBkH//wMgBkH//wNIGyEGAkACfwJAIAxB//8DcSIFBEAgBkH//wFKDQEgBUGAIGogBmxBgBBqQQx2DAILIAZBCHYiBiEFIAYhBAwCCyAFIAZB//8Dc2xBgBBqQQx2IAZqCyIFQQh2IQcgBkEBdCAFa0EIdiIGIQQCQCAJQdWqAWpB//8DcSIFQanVAksNACAFQf//AU8EQEGq1QIgBWsgByAGa2xBBmxBgIACakEQdiAGaiEEDAELIAchBCAFQanVAEsNACAFIAcgBmtsQQZsQYCAAmpBEHYgBmohBAsCfyAGIgUgCUH//wNxIghBqdUCSw0AGkGq1QIgCGsgByAGa2xBBmxBgIACakEQdiAGaiAIQf//AU8NABogByIFIAhBqdUASw0AGiAIIAcgBmtsQQZsQYCAAmpBEHYgBmoLIQUgCUGr1QJqQf//A3EiCEGp1QJLDQAgCEH//wFPBEBBqtUCIAhrIAcgBmtsQQZsQYCAAmpBEHYgBmohBgwBCyAIQanVAEsEQCAHIQYMAQsgCCAHIAZrbEEGbEGAgAJqQRB2IAZqIQYLIAEgBDoAACABQQFqIAU6AAAgAUECaiAGOgAACyADQQJqIQMgAkECaiECIABBBGohACABQQRqIQEgC0F/aiILDQALCwsL"},{}],22:[function(t,e,i){"use strict";var r,n=t("./base64decode");e.exports=function(){if(void 0!==r)return r;if(r=!1,"undefined"==typeof WebAssembly)return r;try{var t=new WebAssembly.Module(n("AGFzbQEAAAABBQFgAAF/Ag8BA2VudgZtZW1vcnkCAAEDAgEABAQBcAAABwoBBmRldGVjdAAACQEACgYBBABBAQs=")),e={memoryBase:0,memory:new WebAssembly.Memory({initial:1}),tableBase:0,table:new WebAssembly.Table({initial:0,element:"anyfunc"})};return 1===(0,new WebAssembly.Instance(t,{env:e}).exports.detect)()&&(r=!0),r}catch(t){}return r}},{"./base64decode":16}],23:[function(t,e,i){"use strict";function r(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},i=0;i<10;i++)e["_"+String.fromCharCode(i)]=i;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(t){r[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var i,a,s=r(t),u=1;u<arguments.length;u++){i=Object(arguments[u]);for(var h in i)o.call(i,h)&&(s[h]=i[h]);if(n){a=n(i);for(var f=0;f<a.length;f++)A.call(i,a[f])&&(s[a[f]]=i[a[f]])}}return s}},{}],24:[function(t,e,i){var r=arguments[3],n=arguments[4],o=arguments[5],A=JSON.stringify;e.exports=function(t,e){function i(t){I[t]=!0;for(var e in n[t][1]){var r=n[t][1][e];I[r]||i(r)}}for(var a,s=Object.keys(o),u=0,h=s.length;u<h;u++){var f=s[u],g=o[f].exports;if(g===t||g&&g.default===t){a=f;break}}if(!a){a=Math.floor(Math.pow(16,8)*Math.random()).toString(16);for(var c={},u=0,h=s.length;u<h;u++)c[f=s[u]]=f;n[a]=[Function(["require","module","exports"],"("+t+")(self)"),c]}var l=Math.floor(Math.pow(16,8)*Math.random()).toString(16),d={};d[a]=a,n[l]=[Function(["require"],"var f = require("+A(a)+");(f.default ? f.default : f)(self);"),d];var I={};i(l);var m="("+r+")({"+Object.keys(I).map(function(t){return A(t)+":["+n[t][0]+","+A(n[t][1])+"]"}).join(",")+"},{},["+A(l)+"])",p=window.URL||window.webkitURL||window.mozURL||window.msURL,w=new Blob([m],{type:"text/javascript"});if(e&&e.bare)return w;var B=p.createObjectURL(w),b=new Worker(B);return b.objectURL=B,b}},{}],"/":[function(t,e,i){"use strict";function r(){return{value:A(h),destroy:function(){if(this.value.terminate(),"undefined"!=typeof window){var t=window.URL||window.webkitURL||window.mozURL||window.msURL;t&&t.revokeObjectURL&&this.value.objectURL&&t.revokeObjectURL(this.value.objectURL)}}}}function n(t){if(!(this instanceof n))return new n(t);this.options=o(d,t||{});var e="lk_"+this.options.concurrency;this.__limit=g[e]||u.limiter(this.options.concurrency),g[e]||(g[e]=this.__limit),this.features={js:!1,wasm:!1,cib:!1,ww:!1},this.__workersPool=null,this.__requested_features=[],this.__mathlib=null}var o=t("object-assign"),A=t("webworkify"),a=t("./lib/mathlib"),s=t("./lib/pool"),u=t("./lib/utils"),h=t("./lib/worker"),f=t("./lib/tiler"),g={},c=!1;try{"undefined"!=typeof navigator&&navigator.userAgent&&(c=navigator.userAgent.indexOf("Safari")>=0)}catch(t){}var l=1;"undefined"!=typeof navigator&&(l=Math.min(navigator.hardwareConcurrency||1,4));var d={tile:1024,concurrency:l,features:["js","wasm","ww"],idle:2e3},I={quality:3,alpha:!1,unsharpAmount:0,unsharpRadius:0,unsharpThreshold:0},m=void 0,p=void 0;n.prototype.init=function(){var e=this;if(this.__initPromise)return this.__initPromise;if(!1!==m&&!0!==m&&(m=!1,"undefined"!=typeof ImageData&&"undefined"!=typeof Uint8ClampedArray))try{new ImageData(new Uint8ClampedArray(400),10,10),m=!0}catch(t){}!1!==p&&!0!==p&&(p=!1,"undefined"!=typeof ImageBitmap&&(ImageBitmap.prototype&&ImageBitmap.prototype.close?p=!0:this.debug("ImageBitmap does not support .close(), disabled")));var i=this.options.features.slice();if(i.indexOf("all")>=0&&(i=["cib","wasm","js","ww"]),this.__requested_features=i,this.__mathlib=new a(i),i.indexOf("ww")>=0&&"undefined"!=typeof window&&"Worker"in window)try{t("webworkify")(function(){}).terminate(),this.features.ww=!0;var n="wp_"+JSON.stringify(this.options);g[n]?this.__workersPool=g[n]:(this.__workersPool=new s(r,this.options.idle),g[n]=this.__workersPool)}catch(t){}var A=this.__mathlib.init().then(function(t){o(e.features,t.features)}),h=void 0;return h=p?u.cib_support().then(function(t){e.features.cib&&i.indexOf("cib")<0?e.debug("createImageBitmap() resize supported, but disabled by config"):i.indexOf("cib")>=0&&(e.features.cib=t)}):Promise.resolve(!1),this.__initPromise=Promise.all([A,h]).then(function(){return e}),this.__initPromise},n.prototype.resize=function(t,e,i){var r=this;this.debug("Start resize...");var n=I;isNaN(i)?i&&(n=o(n,i)):n=o(n,{quality:i}),n.toWidth=e.width,n.toHeigth=e.height,n.width=t.naturalWidth||t.width,n.height=t.naturalHeight||t.height;var A=!1,a=null;n.cancelToken&&(a=n.cancelToken.then(function(t){throw A=!0,t},function(t){throw A=!0,t}));var s=e.getContext("2d",{alpha:Boolean(n.alpha)});return this.init().then(function(){if(A)return a;if(r.features.cib)return r.debug("Resize via createImageBitmap()"),createImageBitmap(t,{resizeWidth:n.toWidth,resizeHeight:n.toHeigth,resizeQuality:u.cib_quality_name(n.quality)}).then(function(t){if(A)return a;if(!n.unsharpAmount)return s.drawImage(t,0,0),t.close(),s=null,r.debug("Finished!"),e;r.debug("Unsharp result");var i=document.createElement("canvas");i.width=n.toWidth,i.height=n.toHeigth;var o=i.getContext("2d",{alpha:Boolean(n.alpha)});o.drawImage(t,0,0),t.close();var u=o.getImageData(0,0,n.toWidth,n.toHeigth);return r.__mathlib.unsharp(u.data,n.toWidth,n.toHeigth,n.unsharpAmount,n.unsharpRadius,n.unsharpThreshold),s.putImageData(u,0,0),u=o=i=s=null,r.debug("Finished!"),e});var i=void 0,o=void 0,h={},g=function(t){return Promise.resolve().then(function(){return r.features.ww?new Promise(function(e,i){var n=r.__workersPool.acquire();a&&a.catch(function(t){return i(t)}),n.value.onmessage=function(t){n.release(),t.data.err?i(t.data.err):e(t.data.result)},n.value.postMessage({opts:t,features:r.__requested_features,preload:{wasm_nodule:r.__mathlib.__}},[t.src.buffer])}):r.__mathlib.resizeAndUnsharp(t,h)})},l=function(e){return r.__limit(function(){if(A)return a;var h=void 0;if(u.isCanvas(t))r.debug("Get tile pixel data"),h=i.getImageData(e.x,e.y,e.width,e.height);else{r.debug("Draw tile imageBitmap/image to temporary canvas");var f=document.createElement("canvas");f.width=e.width,f.height=e.height;var l=f.getContext("2d",{alpha:Boolean(n.alpha)});l.globalCompositeOperation="copy",l.drawImage(o||t,e.x,e.y,e.width,e.height,0,0,e.width,e.height),r.debug("Get tile pixel data"),h=l.getImageData(0,0,e.width,e.height),l=f=null}var d={src:h.data,width:e.width,height:e.height,toWidth:e.toWidth,toHeight:e.toHeight,scaleX:e.scaleX,scaleY:e.scaleY,offsetX:e.offsetX,offsetY:e.offsetY,quality:n.quality,alpha:n.alpha,unsharpAmount:n.unsharpAmount,unsharpRadius:n.unsharpRadius,unsharpThreshold:n.unsharpThreshold};return r.debug("Invoke resize math"),Promise.resolve().then(function(){return g(d)}).then(function(t){if(A)return a;h=null;var i=void 0;if(r.debug("Convert raw rgba tile result to ImageData"),m)i=new ImageData(new Uint8ClampedArray(t),e.toWidth,e.toHeight);else if((i=s.createImageData(e.toWidth,e.toHeight)).data.set)i.data.set(t);else for(var n=i.data.length-1;n>=0;n--)i.data[n]=t[n];return r.debug("Draw tile"),c?s.putImageData(i,e.toX,e.toY,e.toInnerX-e.toX,e.toInnerY-e.toY,e.toInnerWidth+1e-5,e.toInnerHeight+1e-5):s.putImageData(i,e.toX,e.toY,e.toInnerX-e.toX,e.toInnerY-e.toY,e.toInnerWidth,e.toInnerHeight),null})})};return Promise.resolve().then(function(){if(u.isCanvas(t))return i=t.getContext("2d",{alpha:Boolean(n.alpha)}),null;if(u.isImage(t))return p?(r.debug("Decode image via createImageBitmap"),createImageBitmap(t).then(function(t){o=t})):null;throw new Error('".from" should be image or canvas')}).then(function(){function t(){o&&(o.close(),o=null)}if(A)return a;r.debug("Calculate tiles");var i=f({width:n.width,height:n.height,srcTileSize:r.options.tile,toWidth:n.toWidth,toHeight:n.toHeigth,destTileBorder:Math.ceil(Math.max(3,2.5*n.unsharpRadius|0))}).map(function(t){return l(t)});return r.debug("Process tiles"),Promise.all(i).then(function(){return r.debug("Finished!"),t(),e},function(e){throw t(),e})})})},n.prototype.resizeBuffer=function(t){var e=this,i=o(I,t);return this.init().then(function(){return e.__mathlib.resizeAndUnsharp(i)})},n.prototype.toBlob=function(t,e,i){return e=e||"image/png",new Promise(function(r){if(t.toBlob)t.toBlob(function(t){return r(t)},e,i);else{for(var n=atob(t.toDataURL(e,i).split(",")[1]),o=n.length,A=new Uint8Array(o),a=0;a<o;a++)A[a]=n.charCodeAt(a);r(new Blob([A],{type:e}))}})},n.prototype.debug=function(){},e.exports=n},{"./lib/mathlib":1,"./lib/pool":9,"./lib/tiler":10,"./lib/utils":11,"./lib/worker":12,"object-assign":23,webworkify:24}]},{},[])("/")});



/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/libs/uuid.js ---- */


!function(n){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.uuidv4=n()}}(function(){return function n(e,r,o){function t(f,u){if(!r[f]){if(!e[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(i)return i(f,!0);var d=new Error("Cannot find module '"+f+"'");throw d.code="MODULE_NOT_FOUND",d}var l=r[f]={exports:{}};e[f][0].call(l.exports,function(n){var r=e[f][1][n];return t(r?r:n)},l,l.exports,n,e,r,o)}return r[f].exports}for(var i="function"==typeof require&&require,f=0;f<o.length;f++)t(o[f]);return t}({1:[function(n,e,r){function o(n,e){var r=e||0,o=t;return o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]}for(var t=[],i=0;i<256;++i)t[i]=(i+256).toString(16).substr(1);e.exports=o},{}],2:[function(n,e,r){(function(n){var r,o=n.crypto||n.msCrypto;if(o&&o.getRandomValues){var t=new Uint8Array(16);r=function(){return o.getRandomValues(t),t}}if(!r){var i=new Array(16);r=function(){for(var n,e=0;e<16;e++)0===(3&e)&&(n=4294967296*Math.random()),i[e]=n>>>((3&e)<<3)&255;return i}}e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(n,e,r){function o(n,e,r){var o=e&&r||0;"string"==typeof n&&(e="binary"==n?new Array(16):null,n=null),n=n||{};var f=n.random||(n.rng||t)();if(f[6]=15&f[6]|64,f[8]=63&f[8]|128,e)for(var u=0;u<16;++u)e[o+u]=f[u];return e||i(f)}var t=n("./lib/rng"),i=n("./lib/bytesToUuid");e.exports=o},{"./lib/bytesToUuid":1,"./lib/rng":2}]},{},[3])(3)});



/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/libs/vue-2.5.13.min.js ---- */


/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Vue=e()}(this,function(){"use strict";function t(t){return void 0===t||null===t}function e(t){return void 0!==t&&null!==t}function n(t){return!0===t}function r(t){return"string"==typeof t||"number"==typeof t||"symbol"==typeof t||"boolean"==typeof t}function i(t){return null!==t&&"object"==typeof t}function o(t){return"[object Object]"===Nn.call(t)}function a(t){var e=parseFloat(String(t));return e>=0&&Math.floor(e)===e&&isFinite(t)}function s(t){return null==t?"":"object"==typeof t?JSON.stringify(t,null,2):String(t)}function c(t){var e=parseFloat(t);return isNaN(e)?t:e}function u(t,e){for(var n=Object.create(null),r=t.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return e?function(t){return n[t.toLowerCase()]}:function(t){return n[t]}}function l(t,e){if(t.length){var n=t.indexOf(e);if(n>-1)return t.splice(n,1)}}function f(t,e){return Mn.call(t,e)}function p(t){var e=Object.create(null);return function(n){return e[n]||(e[n]=t(n))}}function d(t,e){function n(n){var r=arguments.length;return r?r>1?t.apply(e,arguments):t.call(e,n):t.call(e)}return n._length=t.length,n}function v(t,e){e=e||0;for(var n=t.length-e,r=new Array(n);n--;)r[n]=t[n+e];return r}function h(t,e){for(var n in e)t[n]=e[n];return t}function m(t){for(var e={},n=0;n<t.length;n++)t[n]&&h(e,t[n]);return e}function y(t,e,n){}function g(t,e){if(t===e)return!0;var n=i(t),r=i(e);if(!n||!r)return!n&&!r&&String(t)===String(e);try{var o=Array.isArray(t),a=Array.isArray(e);if(o&&a)return t.length===e.length&&t.every(function(t,n){return g(t,e[n])});if(o||a)return!1;var s=Object.keys(t),c=Object.keys(e);return s.length===c.length&&s.every(function(n){return g(t[n],e[n])})}catch(t){return!1}}function _(t,e){for(var n=0;n<t.length;n++)if(g(t[n],e))return n;return-1}function b(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}function $(t){var e=(t+"").charCodeAt(0);return 36===e||95===e}function C(t,e,n,r){Object.defineProperty(t,e,{value:n,enumerable:!!r,writable:!0,configurable:!0})}function w(t){return"function"==typeof t&&/native code/.test(t.toString())}function x(t){return new mr(void 0,void 0,void 0,String(t))}function k(t,e){var n=t.componentOptions,r=new mr(t.tag,t.data,t.children,t.text,t.elm,t.context,n,t.asyncFactory);return r.ns=t.ns,r.isStatic=t.isStatic,r.key=t.key,r.isComment=t.isComment,r.fnContext=t.fnContext,r.fnOptions=t.fnOptions,r.fnScopeId=t.fnScopeId,r.isCloned=!0,e&&(t.children&&(r.children=A(t.children,!0)),n&&n.children&&(n.children=A(n.children,!0))),r}function A(t,e){for(var n=t.length,r=new Array(n),i=0;i<n;i++)r[i]=k(t[i],e);return r}function O(t,e,n){t.__proto__=e}function S(t,e,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];C(t,o,e[o])}}function T(t,e){if(i(t)&&!(t instanceof mr)){var n;return f(t,"__ob__")&&t.__ob__ instanceof wr?n=t.__ob__:Cr.shouldConvert&&!ur()&&(Array.isArray(t)||o(t))&&Object.isExtensible(t)&&!t._isVue&&(n=new wr(t)),e&&n&&n.vmCount++,n}}function E(t,e,n,r,i){var o=new vr,a=Object.getOwnPropertyDescriptor(t,e);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set,u=!i&&T(n);Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var e=s?s.call(t):n;return vr.target&&(o.depend(),u&&(u.dep.depend(),Array.isArray(e)&&I(e))),e},set:function(e){var r=s?s.call(t):n;e===r||e!=e&&r!=r||(c?c.call(t,e):n=e,u=!i&&T(e),o.notify())}})}}function j(t,e,n){if(Array.isArray(t)&&a(e))return t.length=Math.max(t.length,e),t.splice(e,1,n),n;if(e in t&&!(e in Object.prototype))return t[e]=n,n;var r=t.__ob__;return t._isVue||r&&r.vmCount?n:r?(E(r.value,e,n),r.dep.notify(),n):(t[e]=n,n)}function N(t,e){if(Array.isArray(t)&&a(e))t.splice(e,1);else{var n=t.__ob__;t._isVue||n&&n.vmCount||f(t,e)&&(delete t[e],n&&n.dep.notify())}}function I(t){for(var e=void 0,n=0,r=t.length;n<r;n++)(e=t[n])&&e.__ob__&&e.__ob__.dep.depend(),Array.isArray(e)&&I(e)}function L(t,e){if(!e)return t;for(var n,r,i,a=Object.keys(e),s=0;s<a.length;s++)r=t[n=a[s]],i=e[n],f(t,n)?o(r)&&o(i)&&L(r,i):j(t,n,i);return t}function M(t,e,n){return n?function(){var r="function"==typeof e?e.call(n,n):e,i="function"==typeof t?t.call(n,n):t;return r?L(r,i):i}:e?t?function(){return L("function"==typeof e?e.call(this,this):e,"function"==typeof t?t.call(this,this):t)}:e:t}function D(t,e){return e?t?t.concat(e):Array.isArray(e)?e:[e]:t}function P(t,e,n,r){var i=Object.create(t||null);return e?h(i,e):i}function F(t,e,n){function r(r){var i=xr[r]||Or;u[r]=i(t[r],e[r],n,r)}"function"==typeof e&&(e=e.options),function(t,e){var n=t.props;if(n){var r,i,a={};if(Array.isArray(n))for(r=n.length;r--;)"string"==typeof(i=n[r])&&(a[Pn(i)]={type:null});else if(o(n))for(var s in n)i=n[s],a[Pn(s)]=o(i)?i:{type:i};t.props=a}}(e),function(t,e){var n=t.inject;if(n){var r=t.inject={};if(Array.isArray(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(o(n))for(var a in n){var s=n[a];r[a]=o(s)?h({from:a},s):{from:s}}}}(e),function(t){var e=t.directives;if(e)for(var n in e){var r=e[n];"function"==typeof r&&(e[n]={bind:r,update:r})}}(e);var i=e.extends;if(i&&(t=F(t,i,n)),e.mixins)for(var a=0,s=e.mixins.length;a<s;a++)t=F(t,e.mixins[a],n);var c,u={};for(c in t)r(c);for(c in e)f(t,c)||r(c);return u}function R(t,e,n,r){if("string"==typeof n){var i=t[e];if(f(i,n))return i[n];var o=Pn(n);if(f(i,o))return i[o];var a=Fn(o);if(f(i,a))return i[a];return i[n]||i[o]||i[a]}}function H(t,e,n,r){var i=e[t],o=!f(n,t),a=n[t];if(U(Boolean,i.type)&&(o&&!f(i,"default")?a=!1:U(String,i.type)||""!==a&&a!==Hn(t)||(a=!0)),void 0===a){a=function(t,e,n){if(!f(e,"default"))return;var r=e.default;if(t&&t.$options.propsData&&void 0===t.$options.propsData[n]&&void 0!==t._props[n])return t._props[n];return"function"==typeof r&&"Function"!==B(e.type)?r.call(t):r}(r,i,t);var s=Cr.shouldConvert;Cr.shouldConvert=!0,T(a),Cr.shouldConvert=s}return a}function B(t){var e=t&&t.toString().match(/^\s*function (\w+)/);return e?e[1]:""}function U(t,e){if(!Array.isArray(e))return B(e)===B(t);for(var n=0,r=e.length;n<r;n++)if(B(e[n])===B(t))return!0;return!1}function V(t,e,n){if(e)for(var r=e;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{if(!1===i[o].call(r,t,e,n))return}catch(t){z(t,r,"errorCaptured hook")}}z(t,e,n)}function z(t,e,n){if(Jn.errorHandler)try{return Jn.errorHandler.call(null,t,e,n)}catch(t){K(t,null,"config.errorHandler")}K(t,e,n)}function K(t,e,n){if(!Gn&&!Zn||"undefined"==typeof console)throw t;console.error(t)}function J(){Tr=!1;var t=Sr.slice(0);Sr.length=0;for(var e=0;e<t.length;e++)t[e]()}function q(t,e){var n;if(Sr.push(function(){if(t)try{t.call(e)}catch(t){V(t,e,"nextTick")}else n&&n(e)}),Tr||(Tr=!0,Er?Ar():kr()),!t&&"undefined"!=typeof Promise)return new Promise(function(t){n=t})}function W(t){G(t,Mr),Mr.clear()}function G(t,e){var n,r,o=Array.isArray(t);if((o||i(t))&&!Object.isFrozen(t)){if(t.__ob__){var a=t.__ob__.dep.id;if(e.has(a))return;e.add(a)}if(o)for(n=t.length;n--;)G(t[n],e);else for(n=(r=Object.keys(t)).length;n--;)G(t[r[n]],e)}}function Z(t){function e(){var t=arguments,n=e.fns;if(!Array.isArray(n))return n.apply(null,arguments);for(var r=n.slice(),i=0;i<r.length;i++)r[i].apply(null,t)}return e.fns=t,e}function X(e,n,r,i,o){var a,s,c,u;for(a in e)s=e[a],c=n[a],u=Dr(a),t(s)||(t(c)?(t(s.fns)&&(s=e[a]=Z(s)),r(u.name,s,u.once,u.capture,u.passive,u.params)):s!==c&&(c.fns=s,e[a]=c));for(a in n)t(e[a])&&i((u=Dr(a)).name,n[a],u.capture)}function Y(r,i,o){function a(){o.apply(this,arguments),l(s.fns,a)}r instanceof mr&&(r=r.data.hook||(r.data.hook={}));var s,c=r[i];t(c)?s=Z([a]):e(c.fns)&&n(c.merged)?(s=c).fns.push(a):s=Z([c,a]),s.merged=!0,r[i]=s}function Q(t,n,r,i,o){if(e(n)){if(f(n,r))return t[r]=n[r],o||delete n[r],!0;if(f(n,i))return t[r]=n[i],o||delete n[i],!0}return!1}function tt(t){return e(t)&&e(t.text)&&function(t){return!1===t}(t.isComment)}function et(i,o){var a,s,c,u,l=[];for(a=0;a<i.length;a++)t(s=i[a])||"boolean"==typeof s||(u=l[c=l.length-1],Array.isArray(s)?s.length>0&&(tt((s=et(s,(o||"")+"_"+a))[0])&&tt(u)&&(l[c]=x(u.text+s[0].text),s.shift()),l.push.apply(l,s)):r(s)?tt(u)?l[c]=x(u.text+s):""!==s&&l.push(x(s)):tt(s)&&tt(u)?l[c]=x(u.text+s.text):(n(i._isVList)&&e(s.tag)&&t(s.key)&&e(o)&&(s.key="__vlist"+o+"_"+a+"__"),l.push(s)));return l}function nt(t,e){return(t.__esModule||fr&&"Module"===t[Symbol.toStringTag])&&(t=t.default),i(t)?e.extend(t):t}function rt(t){return t.isComment&&t.asyncFactory}function it(t){if(Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];if(e(r)&&(e(r.componentOptions)||rt(r)))return r}}function ot(t,e,n){n?Lr.$once(t,e):Lr.$on(t,e)}function at(t,e){Lr.$off(t,e)}function st(t,e,n){Lr=t,X(e,n||{},ot,at),Lr=void 0}function ct(t,e){var n={};if(!t)return n;for(var r=0,i=t.length;r<i;r++){var o=t[r],a=o.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,o.context!==e&&o.fnContext!==e||!a||null==a.slot)(n.default||(n.default=[])).push(o);else{var s=a.slot,c=n[s]||(n[s]=[]);"template"===o.tag?c.push.apply(c,o.children||[]):c.push(o)}}for(var u in n)n[u].every(ut)&&delete n[u];return n}function ut(t){return t.isComment&&!t.asyncFactory||" "===t.text}function lt(t,e){e=e||{};for(var n=0;n<t.length;n++)Array.isArray(t[n])?lt(t[n],e):e[t[n].key]=t[n].fn;return e}function ft(t){for(;t&&(t=t.$parent);)if(t._inactive)return!0;return!1}function pt(t,e){if(e){if(t._directInactive=!1,ft(t))return}else if(t._directInactive)return;if(t._inactive||null===t._inactive){t._inactive=!1;for(var n=0;n<t.$children.length;n++)pt(t.$children[n]);vt(t,"activated")}}function dt(t,e){if(!(e&&(t._directInactive=!0,ft(t))||t._inactive)){t._inactive=!0;for(var n=0;n<t.$children.length;n++)dt(t.$children[n]);vt(t,"deactivated")}}function vt(t,e){var n=t.$options[e];if(n)for(var r=0,i=n.length;r<i;r++)try{n[r].call(t)}catch(n){V(n,t,e+" hook")}t._hasHookEvent&&t.$emit("hook:"+e)}function ht(){Ur=!0;var t,e;for(Fr.sort(function(t,e){return t.id-e.id}),Vr=0;Vr<Fr.length;Vr++)e=(t=Fr[Vr]).id,Hr[e]=null,t.run();var n=Rr.slice(),r=Fr.slice();Vr=Fr.length=Rr.length=0,Hr={},Br=Ur=!1,function(t){for(var e=0;e<t.length;e++)t[e]._inactive=!0,pt(t[e],!0)}(n),function(t){var e=t.length;for(;e--;){var n=t[e],r=n.vm;r._watcher===n&&r._isMounted&&vt(r,"updated")}}(r),lr&&Jn.devtools&&lr.emit("flush")}function mt(t,e,n){Jr.get=function(){return this[e][n]},Jr.set=function(t){this[e][n]=t},Object.defineProperty(t,n,Jr)}function yt(t){t._watchers=[];var e=t.$options;e.props&&function(t,e){var n=t.$options.propsData||{},r=t._props={},i=t.$options._propKeys=[],o=!t.$parent;Cr.shouldConvert=o;var a=function(o){i.push(o);var a=H(o,e,n,t);E(r,o,a),o in t||mt(t,"_props",o)};for(var s in e)a(s);Cr.shouldConvert=!0}(t,e.props),e.methods&&function(t,e){t.$options.props;for(var n in e)t[n]=null==e[n]?y:d(e[n],t)}(t,e.methods),e.data?function(t){var e=t.$options.data;e=t._data="function"==typeof e?function(t,e){try{return t.call(e,e)}catch(t){return V(t,e,"data()"),{}}}(e,t):e||{},o(e)||(e={});var n=Object.keys(e),r=t.$options.props,i=(t.$options.methods,n.length);for(;i--;){var a=n[i];r&&f(r,a)||$(a)||mt(t,"_data",a)}T(e,!0)}(t):T(t._data={},!0),e.computed&&function(t,e){var n=t._computedWatchers=Object.create(null),r=ur();for(var i in e){var o=e[i],a="function"==typeof o?o:o.get;r||(n[i]=new Kr(t,a||y,y,qr)),i in t||gt(t,i,o)}}(t,e.computed),e.watch&&e.watch!==ir&&function(t,e){for(var n in e){var r=e[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)bt(t,n,r[i]);else bt(t,n,r)}}(t,e.watch)}function gt(t,e,n){var r=!ur();"function"==typeof n?(Jr.get=r?_t(e):n,Jr.set=y):(Jr.get=n.get?r&&!1!==n.cache?_t(e):n.get:y,Jr.set=n.set?n.set:y),Object.defineProperty(t,e,Jr)}function _t(t){return function(){var e=this._computedWatchers&&this._computedWatchers[t];if(e)return e.dirty&&e.evaluate(),vr.target&&e.depend(),e.value}}function bt(t,e,n,r){return o(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=t[n]),t.$watch(e,n,r)}function $t(t,e){if(t){for(var n=Object.create(null),r=fr?Reflect.ownKeys(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}):Object.keys(t),i=0;i<r.length;i++){for(var o=r[i],a=t[o].from,s=e;s;){if(s._provided&&a in s._provided){n[o]=s._provided[a];break}s=s.$parent}if(!s&&"default"in t[o]){var c=t[o].default;n[o]="function"==typeof c?c.call(e):c}}return n}}function Ct(t,n){var r,o,a,s,c;if(Array.isArray(t)||"string"==typeof t)for(r=new Array(t.length),o=0,a=t.length;o<a;o++)r[o]=n(t[o],o);else if("number"==typeof t)for(r=new Array(t),o=0;o<t;o++)r[o]=n(o+1,o);else if(i(t))for(s=Object.keys(t),r=new Array(s.length),o=0,a=s.length;o<a;o++)c=s[o],r[o]=n(t[c],c,o);return e(r)&&(r._isVList=!0),r}function wt(t,e,n,r){var i,o=this.$scopedSlots[t];if(o)n=n||{},r&&(n=h(h({},r),n)),i=o(n)||e;else{var a=this.$slots[t];a&&(a._rendered=!0),i=a||e}var s=n&&n.slot;return s?this.$createElement("template",{slot:s},i):i}function xt(t){return R(this.$options,"filters",t)||Un}function kt(t,e,n,r){var i=Jn.keyCodes[e]||n;return i?Array.isArray(i)?-1===i.indexOf(t):i!==t:r?Hn(r)!==e:void 0}function At(t,e,n,r,o){if(n)if(i(n)){Array.isArray(n)&&(n=m(n));var a,s=function(i){if("class"===i||"style"===i||Ln(i))a=t;else{var s=t.attrs&&t.attrs.type;a=r||Jn.mustUseProp(e,s,i)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}if(!(i in a)&&(a[i]=n[i],o)){(t.on||(t.on={}))["update:"+i]=function(t){n[i]=t}}};for(var c in n)s(c)}else;return t}function Ot(t,e){var n=this._staticTrees||(this._staticTrees=[]),r=n[t];return r&&!e?Array.isArray(r)?A(r):k(r):(r=n[t]=this.$options.staticRenderFns[t].call(this._renderProxy,null,this),Tt(r,"__static__"+t,!1),r)}function St(t,e,n){return Tt(t,"__once__"+e+(n?"_"+n:""),!0),t}function Tt(t,e,n){if(Array.isArray(t))for(var r=0;r<t.length;r++)t[r]&&"string"!=typeof t[r]&&Et(t[r],e+"_"+r,n);else Et(t,e,n)}function Et(t,e,n){t.isStatic=!0,t.key=e,t.isOnce=n}function jt(t,e){if(e)if(o(e)){var n=t.on=t.on?h({},t.on):{};for(var r in e){var i=n[r],a=e[r];n[r]=i?[].concat(i,a):a}}else;return t}function Nt(t){t._o=St,t._n=c,t._s=s,t._l=Ct,t._t=wt,t._q=g,t._i=_,t._m=Ot,t._f=xt,t._k=kt,t._b=At,t._v=x,t._e=gr,t._u=lt,t._g=jt}function It(t,e,r,i,o){var a=o.options;this.data=t,this.props=e,this.children=r,this.parent=i,this.listeners=t.on||jn,this.injections=$t(a.inject,i),this.slots=function(){return ct(r,i)};var s=Object.create(i),c=n(a._compiled),u=!c;c&&(this.$options=a,this.$slots=this.slots(),this.$scopedSlots=t.scopedSlots||jn),a._scopeId?this._c=function(t,e,n,r){var o=Dt(s,t,e,n,r,u);return o&&(o.fnScopeId=a._scopeId,o.fnContext=i),o}:this._c=function(t,e,n,r){return Dt(s,t,e,n,r,u)}}function Lt(t,e){for(var n in e)t[Pn(n)]=e[n]}function Mt(r,o,a,s,c){if(!t(r)){var u=a.$options._base;if(i(r)&&(r=u.extend(r)),"function"==typeof r){var l;if(t(r.cid)&&(l=r,void 0===(r=function(r,o,a){if(n(r.error)&&e(r.errorComp))return r.errorComp;if(e(r.resolved))return r.resolved;if(n(r.loading)&&e(r.loadingComp))return r.loadingComp;if(!e(r.contexts)){var s=r.contexts=[a],c=!0,u=function(){for(var t=0,e=s.length;t<e;t++)s[t].$forceUpdate()},l=b(function(t){r.resolved=nt(t,o),c||u()}),f=b(function(t){e(r.errorComp)&&(r.error=!0,u())}),p=r(l,f);return i(p)&&("function"==typeof p.then?t(r.resolved)&&p.then(l,f):e(p.component)&&"function"==typeof p.component.then&&(p.component.then(l,f),e(p.error)&&(r.errorComp=nt(p.error,o)),e(p.loading)&&(r.loadingComp=nt(p.loading,o),0===p.delay?r.loading=!0:setTimeout(function(){t(r.resolved)&&t(r.error)&&(r.loading=!0,u())},p.delay||200)),e(p.timeout)&&setTimeout(function(){t(r.resolved)&&f(null)},p.timeout))),c=!1,r.loading?r.loadingComp:r.resolved}r.contexts.push(a)}(l,u,a))))return function(t,e,n,r,i){var o=gr();return o.asyncFactory=t,o.asyncMeta={data:e,context:n,children:r,tag:i},o}(l,o,a,s,c);o=o||{},Ft(r),e(o.model)&&function(t,n){var r=t.model&&t.model.prop||"value",i=t.model&&t.model.event||"input";(n.props||(n.props={}))[r]=n.model.value;var o=n.on||(n.on={});e(o[i])?o[i]=[n.model.callback].concat(o[i]):o[i]=n.model.callback}(r.options,o);var f=function(n,r,i){var o=r.options.props;if(!t(o)){var a={},s=n.attrs,c=n.props;if(e(s)||e(c))for(var u in o){var l=Hn(u);Q(a,c,u,l,!0)||Q(a,s,u,l,!1)}return a}}(o,r);if(n(r.options.functional))return function(t,n,r,i,o){var a=t.options,s={},c=a.props;if(e(c))for(var u in c)s[u]=H(u,c,n||jn);else e(r.attrs)&&Lt(s,r.attrs),e(r.props)&&Lt(s,r.props);var l=new It(r,s,o,i,t),f=a.render.call(null,l._c,l);return f instanceof mr&&(f.fnContext=i,f.fnOptions=a,r.slot&&((f.data||(f.data={})).slot=r.slot)),f}(r,f,o,a,s);var p=o.on;if(o.on=o.nativeOn,n(r.options.abstract)){var d=o.slot;o={},d&&(o.slot=d)}!function(t){t.hook||(t.hook={});for(var e=0;e<Gr.length;e++){var n=Gr[e],r=t.hook[n],i=Wr[n];t.hook[n]=r?function(t,e){return function(n,r,i,o){t(n,r,i,o),e(n,r,i,o)}}(i,r):i}}(o);var v=r.options.name||c;return new mr("vue-component-"+r.cid+(v?"-"+v:""),o,void 0,void 0,void 0,a,{Ctor:r,propsData:f,listeners:p,tag:c,children:s},l)}}}function Dt(t,i,o,a,s,c){return(Array.isArray(o)||r(o))&&(s=a,a=o,o=void 0),n(c)&&(s=Xr),function(t,n,i,o,a){if(e(i)&&e(i.__ob__))return gr();e(i)&&e(i.is)&&(n=i.is);if(!n)return gr();Array.isArray(o)&&"function"==typeof o[0]&&((i=i||{}).scopedSlots={default:o[0]},o.length=0);a===Xr?o=function(t){return r(t)?[x(t)]:Array.isArray(t)?et(t):void 0}(o):a===Zr&&(o=function(t){for(var e=0;e<t.length;e++)if(Array.isArray(t[e]))return Array.prototype.concat.apply([],t);return t}(o));var s,c;if("string"==typeof n){var u;c=t.$vnode&&t.$vnode.ns||Jn.getTagNamespace(n),s=Jn.isReservedTag(n)?new mr(Jn.parsePlatformTagName(n),i,o,void 0,void 0,t):e(u=R(t.$options,"components",n))?Mt(u,i,t,o,n):new mr(n,i,o,void 0,void 0,t)}else s=Mt(n,i,t,o);return e(s)?(c&&Pt(s,c),s):gr()}(t,i,o,a,s)}function Pt(r,i,o){if(r.ns=i,"foreignObject"===r.tag&&(i=void 0,o=!0),e(r.children))for(var a=0,s=r.children.length;a<s;a++){var c=r.children[a];e(c.tag)&&(t(c.ns)||n(o))&&Pt(c,i,o)}}function Ft(t){var e=t.options;if(t.super){var n=Ft(t.super);if(n!==t.superOptions){t.superOptions=n;var r=function(t){var e,n=t.options,r=t.extendOptions,i=t.sealedOptions;for(var o in n)n[o]!==i[o]&&(e||(e={}),e[o]=function(t,e,n){{if(Array.isArray(t)){var r=[];n=Array.isArray(n)?n:[n],e=Array.isArray(e)?e:[e];for(var i=0;i<t.length;i++)(e.indexOf(t[i])>=0||n.indexOf(t[i])<0)&&r.push(t[i]);return r}return t}}(n[o],r[o],i[o]));return e}(t);r&&h(t.extendOptions,r),(e=t.options=F(n,t.extendOptions)).name&&(e.components[e.name]=t)}}return e}function Rt(t){this._init(t)}function Ht(t){t.cid=0;var e=1;t.extend=function(t){t=t||{};var n=this,r=n.cid,i=t._Ctor||(t._Ctor={});if(i[r])return i[r];var o=t.name||n.options.name,a=function(t){this._init(t)};return a.prototype=Object.create(n.prototype),a.prototype.constructor=a,a.cid=e++,a.options=F(n.options,t),a.super=n,a.options.props&&function(t){var e=t.options.props;for(var n in e)mt(t.prototype,"_props",n)}(a),a.options.computed&&function(t){var e=t.options.computed;for(var n in e)gt(t.prototype,n,e[n])}(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,zn.forEach(function(t){a[t]=n[t]}),o&&(a.options.components[o]=a),a.superOptions=n.options,a.extendOptions=t,a.sealedOptions=h({},a.options),i[r]=a,a}}function Bt(t){return t&&(t.Ctor.options.name||t.tag)}function Ut(t,e){return Array.isArray(t)?t.indexOf(e)>-1:"string"==typeof t?t.split(",").indexOf(e)>-1:!!function(t){return"[object RegExp]"===Nn.call(t)}(t)&&t.test(e)}function Vt(t,e){var n=t.cache,r=t.keys,i=t._vnode;for(var o in n){var a=n[o];if(a){var s=Bt(a.componentOptions);s&&!e(s)&&zt(n,o,r,i)}}}function zt(t,e,n,r){var i=t[e];!i||r&&i.tag===r.tag||i.componentInstance.$destroy(),t[e]=null,l(n,e)}function Kt(t){for(var n=t.data,r=t,i=t;e(i.componentInstance);)(i=i.componentInstance._vnode)&&i.data&&(n=Jt(i.data,n));for(;e(r=r.parent);)r&&r.data&&(n=Jt(n,r.data));return function(t,n){if(e(t)||e(n))return qt(t,Wt(n));return""}(n.staticClass,n.class)}function Jt(t,n){return{staticClass:qt(t.staticClass,n.staticClass),class:e(t.class)?[t.class,n.class]:n.class}}function qt(t,e){return t?e?t+" "+e:t:e||""}function Wt(t){return Array.isArray(t)?function(t){for(var n,r="",i=0,o=t.length;i<o;i++)e(n=Wt(t[i]))&&""!==n&&(r&&(r+=" "),r+=n);return r}(t):i(t)?function(t){var e="";for(var n in t)t[n]&&(e&&(e+=" "),e+=n);return e}(t):"string"==typeof t?t:""}function Gt(t){return bi(t)?"svg":"math"===t?"math":void 0}function Zt(t){if("string"==typeof t){var e=document.querySelector(t);return e||document.createElement("div")}return t}function Xt(t,e){var n=t.data.ref;if(n){var r=t.context,i=t.componentInstance||t.elm,o=r.$refs;e?Array.isArray(o[n])?l(o[n],i):o[n]===i&&(o[n]=void 0):t.data.refInFor?Array.isArray(o[n])?o[n].indexOf(i)<0&&o[n].push(i):o[n]=[i]:o[n]=i}}function Yt(r,i){return r.key===i.key&&(r.tag===i.tag&&r.isComment===i.isComment&&e(r.data)===e(i.data)&&function(t,n){if("input"!==t.tag)return!0;var r,i=e(r=t.data)&&e(r=r.attrs)&&r.type,o=e(r=n.data)&&e(r=r.attrs)&&r.type;return i===o||wi(i)&&wi(o)}(r,i)||n(r.isAsyncPlaceholder)&&r.asyncFactory===i.asyncFactory&&t(i.asyncFactory.error))}function Qt(t,n,r){var i,o,a={};for(i=n;i<=r;++i)e(o=t[i].key)&&(a[o]=i);return a}function te(t,e){(t.data.directives||e.data.directives)&&function(t,e){var n,r,i,o=t===Ai,a=e===Ai,s=ee(t.data.directives,t.context),c=ee(e.data.directives,e.context),u=[],l=[];for(n in c)r=s[n],i=c[n],r?(i.oldValue=r.value,ne(i,"update",e,t),i.def&&i.def.componentUpdated&&l.push(i)):(ne(i,"bind",e,t),i.def&&i.def.inserted&&u.push(i));if(u.length){var f=function(){for(var n=0;n<u.length;n++)ne(u[n],"inserted",e,t)};o?Y(e,"insert",f):f()}l.length&&Y(e,"postpatch",function(){for(var n=0;n<l.length;n++)ne(l[n],"componentUpdated",e,t)});if(!o)for(n in s)c[n]||ne(s[n],"unbind",t,t,a)}(t,e)}function ee(t,e){var n=Object.create(null);if(!t)return n;var r,i;for(r=0;r<t.length;r++)(i=t[r]).modifiers||(i.modifiers=Ti),n[function(t){return t.rawName||t.name+"."+Object.keys(t.modifiers||{}).join(".")}(i)]=i,i.def=R(e.$options,"directives",i.name);return n}function ne(t,e,n,r,i){var o=t.def&&t.def[e];if(o)try{o(n.elm,t,n,r,i)}catch(r){V(r,n.context,"directive "+t.name+" "+e+" hook")}}function re(n,r){var i=r.componentOptions;if(!(e(i)&&!1===i.Ctor.options.inheritAttrs||t(n.data.attrs)&&t(r.data.attrs))){var o,a,s=r.elm,c=n.data.attrs||{},u=r.data.attrs||{};e(u.__ob__)&&(u=r.data.attrs=h({},u));for(o in u)a=u[o],c[o]!==a&&ie(s,o,a);(Qn||er)&&u.value!==c.value&&ie(s,"value",u.value);for(o in c)t(u[o])&&(hi(o)?s.removeAttributeNS(vi,mi(o)):pi(o)||s.removeAttribute(o))}}function ie(t,e,n){if(di(e))yi(n)?t.removeAttribute(e):(n="allowfullscreen"===e&&"EMBED"===t.tagName?"true":e,t.setAttribute(e,n));else if(pi(e))t.setAttribute(e,yi(n)||"false"===n?"false":"true");else if(hi(e))yi(n)?t.removeAttributeNS(vi,mi(e)):t.setAttributeNS(vi,e,n);else if(yi(n))t.removeAttribute(e);else{if(Qn&&!tr&&"TEXTAREA"===t.tagName&&"placeholder"===e&&!t.__ieph){var r=function(e){e.stopImmediatePropagation(),t.removeEventListener("input",r)};t.addEventListener("input",r),t.__ieph=!0}t.setAttribute(e,n)}}function oe(n,r){var i=r.elm,o=r.data,a=n.data;if(!(t(o.staticClass)&&t(o.class)&&(t(a)||t(a.staticClass)&&t(a.class)))){var s=Kt(r),c=i._transitionClasses;e(c)&&(s=qt(s,Wt(c))),s!==i._prevClass&&(i.setAttribute("class",s),i._prevClass=s)}}function ae(t){function e(){(a||(a=[])).push(t.slice(v,i).trim()),v=i+1}var n,r,i,o,a,s=!1,c=!1,u=!1,l=!1,f=0,p=0,d=0,v=0;for(i=0;i<t.length;i++)if(r=n,n=t.charCodeAt(i),s)39===n&&92!==r&&(s=!1);else if(c)34===n&&92!==r&&(c=!1);else if(u)96===n&&92!==r&&(u=!1);else if(l)47===n&&92!==r&&(l=!1);else if(124!==n||124===t.charCodeAt(i+1)||124===t.charCodeAt(i-1)||f||p||d){switch(n){case 34:c=!0;break;case 39:s=!0;break;case 96:u=!0;break;case 40:d++;break;case 41:d--;break;case 91:p++;break;case 93:p--;break;case 123:f++;break;case 125:f--}if(47===n){for(var h=i-1,m=void 0;h>=0&&" "===(m=t.charAt(h));h--);m&&Ii.test(m)||(l=!0)}}else void 0===o?(v=i+1,o=t.slice(0,i).trim()):e();if(void 0===o?o=t.slice(0,i).trim():0!==v&&e(),a)for(i=0;i<a.length;i++)o=function(t,e){var n=e.indexOf("(");{if(n<0)return'_f("'+e+'")('+t+")";var r=e.slice(0,n),i=e.slice(n+1);return'_f("'+r+'")('+t+","+i}}(o,a[i]);return o}function se(t){console.error("[Vue compiler]: "+t)}function ce(t,e){return t?t.map(function(t){return t[e]}).filter(function(t){return t}):[]}function ue(t,e,n){(t.props||(t.props=[])).push({name:e,value:n}),t.plain=!1}function le(t,e,n){(t.attrs||(t.attrs=[])).push({name:e,value:n}),t.plain=!1}function fe(t,e,n){t.attrsMap[e]=n,t.attrsList.push({name:e,value:n})}function pe(t,e,n,r,i,o){(t.directives||(t.directives=[])).push({name:e,rawName:n,value:r,arg:i,modifiers:o}),t.plain=!1}function de(t,e,n,r,i,o){(r=r||jn).capture&&(delete r.capture,e="!"+e),r.once&&(delete r.once,e="~"+e),r.passive&&(delete r.passive,e="&"+e),"click"===e&&(r.right?(e="contextmenu",delete r.right):r.middle&&(e="mouseup"));var a;r.native?(delete r.native,a=t.nativeEvents||(t.nativeEvents={})):a=t.events||(t.events={});var s={value:n};r!==jn&&(s.modifiers=r);var c=a[e];Array.isArray(c)?i?c.unshift(s):c.push(s):a[e]=c?i?[s,c]:[c,s]:s,t.plain=!1}function ve(t,e,n){var r=he(t,":"+e)||he(t,"v-bind:"+e);if(null!=r)return ae(r);if(!1!==n){var i=he(t,e);if(null!=i)return JSON.stringify(i)}}function he(t,e,n){var r;if(null!=(r=t.attrsMap[e]))for(var i=t.attrsList,o=0,a=i.length;o<a;o++)if(i[o].name===e){i.splice(o,1);break}return n&&delete t.attrsMap[e],r}function me(t,e,n){var r=n||{},i="$$v";r.trim&&(i="(typeof $$v === 'string'? $$v.trim(): $$v)"),r.number&&(i="_n("+i+")");var o=ye(e,i);t.model={value:"("+e+")",expression:'"'+e+'"',callback:"function ($$v) {"+o+"}"}}function ye(t,e){var n=function(t){if(ei=t.length,t.indexOf("[")<0||t.lastIndexOf("]")<ei-1)return(ii=t.lastIndexOf("."))>-1?{exp:t.slice(0,ii),key:'"'+t.slice(ii+1)+'"'}:{exp:t,key:null};ni=t,ii=oi=ai=0;for(;!_e();)be(ri=ge())?$e(ri):91===ri&&function(t){var e=1;oi=ii;for(;!_e();)if(t=ge(),be(t))$e(t);else if(91===t&&e++,93===t&&e--,0===e){ai=ii;break}}(ri);return{exp:t.slice(0,oi),key:t.slice(oi+1,ai)}}(t);return null===n.key?t+"="+e:"$set("+n.exp+", "+n.key+", "+e+")"}function ge(){return ni.charCodeAt(++ii)}function _e(){return ii>=ei}function be(t){return 34===t||39===t}function $e(t){for(var e=t;!_e()&&(t=ge())!==e;);}function Ce(t,e,n,r,i){e=function(t){return t._withTask||(t._withTask=function(){Er=!0;var e=t.apply(null,arguments);return Er=!1,e})}(e),n&&(e=function(t,e,n){var r=si;return function i(){null!==t.apply(null,arguments)&&we(e,i,n,r)}}(e,t,r)),si.addEventListener(t,e,or?{capture:r,passive:i}:r)}function we(t,e,n,r){(r||si).removeEventListener(t,e._withTask||e,n)}function xe(n,r){if(!t(n.data.on)||!t(r.data.on)){var i=r.data.on||{},o=n.data.on||{};si=r.elm,function(t){if(e(t[Li])){var n=Qn?"change":"input";t[n]=[].concat(t[Li],t[n]||[]),delete t[Li]}e(t[Mi])&&(t.change=[].concat(t[Mi],t.change||[]),delete t[Mi])}(i),X(i,o,Ce,we,r.context),si=void 0}}function ke(n,r){if(!t(n.data.domProps)||!t(r.data.domProps)){var i,o,a=r.elm,s=n.data.domProps||{},u=r.data.domProps||{};e(u.__ob__)&&(u=r.data.domProps=h({},u));for(i in s)t(u[i])&&(a[i]="");for(i in u){if(o=u[i],"textContent"===i||"innerHTML"===i){if(r.children&&(r.children.length=0),o===s[i])continue;1===a.childNodes.length&&a.removeChild(a.childNodes[0])}if("value"===i){a._value=o;var l=t(o)?"":String(o);(function(t,n){return!t.composing&&("OPTION"===t.tagName||function(t,e){var n=!0;try{n=document.activeElement!==t}catch(t){}return n&&t.value!==e}(t,n)||function(t,n){var r=t.value,i=t._vModifiers;if(e(i)){if(i.lazy)return!1;if(i.number)return c(r)!==c(n);if(i.trim)return r.trim()!==n.trim()}return r!==n}(t,n))})(a,l)&&(a.value=l)}else a[i]=o}}}function Ae(t){var e=Oe(t.style);return t.staticStyle?h(t.staticStyle,e):e}function Oe(t){return Array.isArray(t)?m(t):"string"==typeof t?Fi(t):t}function Se(n,r){var i=r.data,o=n.data;if(!(t(i.staticStyle)&&t(i.style)&&t(o.staticStyle)&&t(o.style))){var a,s,c=r.elm,u=o.staticStyle,l=o.normalizedStyle||o.style||{},f=u||l,p=Oe(r.data.style)||{};r.data.normalizedStyle=e(p.__ob__)?h({},p):p;var d=function(t,e){var n,r={};if(e)for(var i=t;i.componentInstance;)(i=i.componentInstance._vnode)&&i.data&&(n=Ae(i.data))&&h(r,n);(n=Ae(t.data))&&h(r,n);for(var o=t;o=o.parent;)o.data&&(n=Ae(o.data))&&h(r,n);return r}(r,!0);for(s in f)t(d[s])&&Bi(c,s,"");for(s in d)(a=d[s])!==f[s]&&Bi(c,s,null==a?"":a)}}function Te(t,e){if(e&&(e=e.trim()))if(t.classList)e.indexOf(" ")>-1?e.split(/\s+/).forEach(function(e){return t.classList.add(e)}):t.classList.add(e);else{var n=" "+(t.getAttribute("class")||"")+" ";n.indexOf(" "+e+" ")<0&&t.setAttribute("class",(n+e).trim())}}function Ee(t,e){if(e&&(e=e.trim()))if(t.classList)e.indexOf(" ")>-1?e.split(/\s+/).forEach(function(e){return t.classList.remove(e)}):t.classList.remove(e),t.classList.length||t.removeAttribute("class");else{for(var n=" "+(t.getAttribute("class")||"")+" ",r=" "+e+" ";n.indexOf(r)>=0;)n=n.replace(r," ");(n=n.trim())?t.setAttribute("class",n):t.removeAttribute("class")}}function je(t){if(t){if("object"==typeof t){var e={};return!1!==t.css&&h(e,Ki(t.name||"v")),h(e,t),e}return"string"==typeof t?Ki(t):void 0}}function Ne(t){Qi(function(){Qi(t)})}function Ie(t,e){var n=t._transitionClasses||(t._transitionClasses=[]);n.indexOf(e)<0&&(n.push(e),Te(t,e))}function Le(t,e){t._transitionClasses&&l(t._transitionClasses,e),Ee(t,e)}function Me(t,e,n){var r=De(t,e),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===qi?Zi:Yi,c=0,u=function(){t.removeEventListener(s,l),n()},l=function(e){e.target===t&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),t.addEventListener(s,l)}function De(t,e){var n,r=window.getComputedStyle(t),i=r[Gi+"Delay"].split(", "),o=r[Gi+"Duration"].split(", "),a=Pe(i,o),s=r[Xi+"Delay"].split(", "),c=r[Xi+"Duration"].split(", "),u=Pe(s,c),l=0,f=0;e===qi?a>0&&(n=qi,l=a,f=o.length):e===Wi?u>0&&(n=Wi,l=u,f=c.length):f=(n=(l=Math.max(a,u))>0?a>u?qi:Wi:null)?n===qi?o.length:c.length:0;return{type:n,timeout:l,propCount:f,hasTransform:n===qi&&to.test(r[Gi+"Property"])}}function Pe(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max.apply(null,e.map(function(e,n){return Fe(e)+Fe(t[n])}))}function Fe(t){return 1e3*Number(t.slice(0,-1))}function Re(n,r){var o=n.elm;e(o._leaveCb)&&(o._leaveCb.cancelled=!0,o._leaveCb());var a=je(n.data.transition);if(!t(a)&&!e(o._enterCb)&&1===o.nodeType){for(var s=a.css,u=a.type,l=a.enterClass,f=a.enterToClass,p=a.enterActiveClass,d=a.appearClass,v=a.appearToClass,h=a.appearActiveClass,m=a.beforeEnter,y=a.enter,g=a.afterEnter,_=a.enterCancelled,$=a.beforeAppear,C=a.appear,w=a.afterAppear,x=a.appearCancelled,k=a.duration,A=Pr,O=Pr.$vnode;O&&O.parent;)A=(O=O.parent).context;var S=!A._isMounted||!n.isRootInsert;if(!S||C||""===C){var T=S&&d?d:l,E=S&&h?h:p,j=S&&v?v:f,N=S?$||m:m,I=S&&"function"==typeof C?C:y,L=S?w||g:g,M=S?x||_:_,D=c(i(k)?k.enter:k),P=!1!==s&&!tr,F=Ue(I),R=o._enterCb=b(function(){P&&(Le(o,j),Le(o,E)),R.cancelled?(P&&Le(o,T),M&&M(o)):L&&L(o),o._enterCb=null});n.data.show||Y(n,"insert",function(){var t=o.parentNode,e=t&&t._pending&&t._pending[n.key];e&&e.tag===n.tag&&e.elm._leaveCb&&e.elm._leaveCb(),I&&I(o,R)}),N&&N(o),P&&(Ie(o,T),Ie(o,E),Ne(function(){Ie(o,j),Le(o,T),R.cancelled||F||(Be(D)?setTimeout(R,D):Me(o,u,R))})),n.data.show&&(r&&r(),I&&I(o,R)),P||F||R()}}}function He(n,r){function o(){x.cancelled||(n.data.show||((a.parentNode._pending||(a.parentNode._pending={}))[n.key]=n),v&&v(a),$&&(Ie(a,f),Ie(a,d),Ne(function(){Ie(a,p),Le(a,f),x.cancelled||C||(Be(w)?setTimeout(x,w):Me(a,l,x))})),h&&h(a,x),$||C||x())}var a=n.elm;e(a._enterCb)&&(a._enterCb.cancelled=!0,a._enterCb());var s=je(n.data.transition);if(t(s)||1!==a.nodeType)return r();if(!e(a._leaveCb)){var u=s.css,l=s.type,f=s.leaveClass,p=s.leaveToClass,d=s.leaveActiveClass,v=s.beforeLeave,h=s.leave,m=s.afterLeave,y=s.leaveCancelled,g=s.delayLeave,_=s.duration,$=!1!==u&&!tr,C=Ue(h),w=c(i(_)?_.leave:_),x=a._leaveCb=b(function(){a.parentNode&&a.parentNode._pending&&(a.parentNode._pending[n.key]=null),$&&(Le(a,p),Le(a,d)),x.cancelled?($&&Le(a,f),y&&y(a)):(r(),m&&m(a)),a._leaveCb=null});g?g(o):o()}}function Be(t){return"number"==typeof t&&!isNaN(t)}function Ue(n){if(t(n))return!1;var r=n.fns;return e(r)?Ue(Array.isArray(r)?r[0]:r):(n._length||n.length)>1}function Ve(t,e){!0!==e.data.show&&Re(e)}function ze(t,e,n){Ke(t,e,n),(Qn||er)&&setTimeout(function(){Ke(t,e,n)},0)}function Ke(t,e,n){var r=e.value,i=t.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=t.options.length;s<c;s++)if(a=t.options[s],i)o=_(r,qe(a))>-1,a.selected!==o&&(a.selected=o);else if(g(qe(a),r))return void(t.selectedIndex!==s&&(t.selectedIndex=s));i||(t.selectedIndex=-1)}}function Je(t,e){return e.every(function(e){return!g(e,t)})}function qe(t){return"_value"in t?t._value:t.value}function We(t){t.target.composing=!0}function Ge(t){t.target.composing&&(t.target.composing=!1,Ze(t.target,"input"))}function Ze(t,e){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0),t.dispatchEvent(n)}function Xe(t){return!t.componentInstance||t.data&&t.data.transition?t:Xe(t.componentInstance._vnode)}function Ye(t){var e=t&&t.componentOptions;return e&&e.Ctor.options.abstract?Ye(it(e.children)):t}function Qe(t){var e={},n=t.$options;for(var r in n.propsData)e[r]=t[r];var i=n._parentListeners;for(var o in i)e[Pn(o)]=i[o];return e}function tn(t,e){if(/\d-keep-alive$/.test(e.tag))return t("keep-alive",{props:e.componentOptions.propsData})}function en(t){t.elm._moveCb&&t.elm._moveCb(),t.elm._enterCb&&t.elm._enterCb()}function nn(t){t.data.newPos=t.elm.getBoundingClientRect()}function rn(t){var e=t.data.pos,n=t.data.newPos,r=e.left-n.left,i=e.top-n.top;if(r||i){t.data.moved=!0;var o=t.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}function on(t,e){var n=e?zo:Vo;return t.replace(n,function(t){return Uo[t]})}function an(t,e,n){return{type:1,tag:t,attrsList:e,attrsMap:function(t){for(var e={},n=0,r=t.length;n<r;n++)e[t[n].name]=t[n].value;return e}(e),parent:n,children:[]}}function sn(t,e){function n(t){t.pre&&(s=!1),Lo(t.tag)&&(c=!1);for(var n=0;n<Io.length;n++)Io[n](t,e)}To=e.warn||se,Lo=e.isPreTag||Bn,Mo=e.mustUseProp||Bn,Do=e.getTagNamespace||Bn,jo=ce(e.modules,"transformNode"),No=ce(e.modules,"preTransformNode"),Io=ce(e.modules,"postTransformNode"),Eo=e.delimiters;var r,i,o=[],a=!1!==e.preserveWhitespace,s=!1,c=!1;return function(t,e){function n(e){l+=e,t=t.substring(e)}function r(t,n,r){var i,s;if(null==n&&(n=l),null==r&&(r=l),t&&(s=t.toLowerCase()),t)for(i=a.length-1;i>=0&&a[i].lowerCasedTag!==s;i--);else i=0;if(i>=0){for(var c=a.length-1;c>=i;c--)e.end&&e.end(a[c].tag,n,r);a.length=i,o=i&&a[i-1].tag}else"br"===s?e.start&&e.start(t,[],!0,n,r):"p"===s&&(e.start&&e.start(t,[],!1,n,r),e.end&&e.end(t,n,r))}for(var i,o,a=[],s=e.expectHTML,c=e.isUnaryTag||Bn,u=e.canBeLeftOpenTag||Bn,l=0;t;){if(i=t,o&&Ho(o)){var f=0,p=o.toLowerCase(),d=Bo[p]||(Bo[p]=new RegExp("([\\s\\S]*?)(</"+p+"[^>]*>)","i")),v=t.replace(d,function(t,n,r){return f=r.length,Ho(p)||"noscript"===p||(n=n.replace(/<!--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),Jo(p,n)&&(n=n.slice(1)),e.chars&&e.chars(n),""});l+=t.length-v.length,t=v,r(p,l-f,l)}else{var h=t.indexOf("<");if(0===h){if(Ao.test(t)){var m=t.indexOf("--\x3e");if(m>=0){e.shouldKeepComment&&e.comment(t.substring(4,m)),n(m+3);continue}}if(Oo.test(t)){var y=t.indexOf("]>");if(y>=0){n(y+2);continue}}var g=t.match(ko);if(g){n(g[0].length);continue}var _=t.match(xo);if(_){var b=l;n(_[0].length),r(_[1],b,l);continue}var $=function(){var e=t.match(Co);if(e){var r={tagName:e[1],attrs:[],start:l};n(e[0].length);for(var i,o;!(i=t.match(wo))&&(o=t.match(_o));)n(o[0].length),r.attrs.push(o);if(i)return r.unarySlash=i[1],n(i[0].length),r.end=l,r}}();if($){!function(t){var n=t.tagName,i=t.unarySlash;s&&("p"===o&&go(n)&&r(o),u(n)&&o===n&&r(n));for(var l=c(n)||!!i,f=t.attrs.length,p=new Array(f),d=0;d<f;d++){var v=t.attrs[d];So&&-1===v[0].indexOf('""')&&(""===v[3]&&delete v[3],""===v[4]&&delete v[4],""===v[5]&&delete v[5]);var h=v[3]||v[4]||v[5]||"",m="a"===n&&"href"===v[1]?e.shouldDecodeNewlinesForHref:e.shouldDecodeNewlines;p[d]={name:v[1],value:on(h,m)}}l||(a.push({tag:n,lowerCasedTag:n.toLowerCase(),attrs:p}),o=n),e.start&&e.start(n,p,l,t.start,t.end)}($),Jo(o,t)&&n(1);continue}}var C=void 0,w=void 0,x=void 0;if(h>=0){for(w=t.slice(h);!(xo.test(w)||Co.test(w)||Ao.test(w)||Oo.test(w)||(x=w.indexOf("<",1))<0);)h+=x,w=t.slice(h);C=t.substring(0,h),n(h)}h<0&&(C=t,t=""),e.chars&&C&&e.chars(C)}if(t===i){e.chars&&e.chars(t);break}}r()}(t,{warn:To,expectHTML:e.expectHTML,isUnaryTag:e.isUnaryTag,canBeLeftOpenTag:e.canBeLeftOpenTag,shouldDecodeNewlines:e.shouldDecodeNewlines,shouldDecodeNewlinesForHref:e.shouldDecodeNewlinesForHref,shouldKeepComment:e.comments,start:function(t,a,u){var l=i&&i.ns||Do(t);Qn&&"svg"===l&&(a=function(t){for(var e=[],n=0;n<t.length;n++){var r=t[n];na.test(r.name)||(r.name=r.name.replace(ra,""),e.push(r))}return e}(a));var f=an(t,a,i);l&&(f.ns=l),function(t){return"style"===t.tag||"script"===t.tag&&(!t.attrsMap.type||"text/javascript"===t.attrsMap.type)}(f)&&!ur()&&(f.forbidden=!0);for(var p=0;p<No.length;p++)f=No[p](f,e)||f;if(s||(!function(t){null!=he(t,"v-pre")&&(t.pre=!0)}(f),f.pre&&(s=!0)),Lo(f.tag)&&(c=!0),s?function(t){var e=t.attrsList.length;if(e)for(var n=t.attrs=new Array(e),r=0;r<e;r++)n[r]={name:t.attrsList[r].name,value:JSON.stringify(t.attrsList[r].value)};else t.pre||(t.plain=!0)}(f):f.processed||(un(f),function(t){var e=he(t,"v-if");if(e)t.if=e,ln(t,{exp:e,block:t});else{null!=he(t,"v-else")&&(t.else=!0);var n=he(t,"v-else-if");n&&(t.elseif=n)}}(f),function(t){null!=he(t,"v-once")&&(t.once=!0)}(f),cn(f,e)),r?o.length||r.if&&(f.elseif||f.else)&&ln(r,{exp:f.elseif,block:f}):r=f,i&&!f.forbidden)if(f.elseif||f.else)!function(t,e){var n=function(t){var e=t.length;for(;e--;){if(1===t[e].type)return t[e];t.pop()}}(e.children);n&&n.if&&ln(n,{exp:t.elseif,block:t})}(f,i);else if(f.slotScope){i.plain=!1;var d=f.slotTarget||'"default"';(i.scopedSlots||(i.scopedSlots={}))[d]=f}else i.children.push(f),f.parent=i;u?n(f):(i=f,o.push(f))},end:function(){var t=o[o.length-1],e=t.children[t.children.length-1];e&&3===e.type&&" "===e.text&&!c&&t.children.pop(),o.length-=1,i=o[o.length-1],n(t)},chars:function(t){if(i&&(!Qn||"textarea"!==i.tag||i.attrsMap.placeholder!==t)){var e=i.children;if(t=c||t.trim()?function(t){return"script"===t.tag||"style"===t.tag}(i)?t:ea(t):a&&e.length?" ":""){var n;!s&&" "!==t&&(n=function(t,e){var n=e?fo(e):uo;if(n.test(t)){for(var r,i,o,a=[],s=[],c=n.lastIndex=0;r=n.exec(t);){(i=r.index)>c&&(s.push(o=t.slice(c,i)),a.push(JSON.stringify(o)));var u=ae(r[1].trim());a.push("_s("+u+")"),s.push({"@binding":u}),c=i+r[0].length}return c<t.length&&(s.push(o=t.slice(c)),a.push(JSON.stringify(o))),{expression:a.join("+"),tokens:s}}}(t,Eo))?e.push({type:2,expression:n.expression,tokens:n.tokens,text:t}):" "===t&&e.length&&" "===e[e.length-1].text||e.push({type:3,text:t})}}},comment:function(t){i.children.push({type:3,text:t,isComment:!0})}}),r}function cn(t,e){!function(t){var e=ve(t,"key");e&&(t.key=e)}(t),t.plain=!t.key&&!t.attrsList.length,function(t){var e=ve(t,"ref");e&&(t.ref=e,t.refInFor=function(t){var e=t;for(;e;){if(void 0!==e.for)return!0;e=e.parent}return!1}(t))}(t),function(t){if("slot"===t.tag)t.slotName=ve(t,"name");else{var e;"template"===t.tag?(e=he(t,"scope"),t.slotScope=e||he(t,"slot-scope")):(e=he(t,"slot-scope"))&&(t.slotScope=e);var n=ve(t,"slot");n&&(t.slotTarget='""'===n?'"default"':n,"template"===t.tag||t.slotScope||le(t,"slot",n))}}(t),function(t){var e;(e=ve(t,"is"))&&(t.component=e);null!=he(t,"inline-template")&&(t.inlineTemplate=!0)}(t);for(var n=0;n<jo.length;n++)t=jo[n](t,e)||t;!function(t){var e,n,r,i,o,a,s,c=t.attrsList;for(e=0,n=c.length;e<n;e++)if(r=i=c[e].name,o=c[e].value,Wo.test(r))if(t.hasBindings=!0,(a=function(t){var e=t.match(ta);if(e){var n={};return e.forEach(function(t){n[t.slice(1)]=!0}),n}}(r))&&(r=r.replace(ta,"")),Qo.test(r))r=r.replace(Qo,""),o=ae(o),s=!1,a&&(a.prop&&(s=!0,"innerHtml"===(r=Pn(r))&&(r="innerHTML")),a.camel&&(r=Pn(r)),a.sync&&de(t,"update:"+Pn(r),ye(o,"$event"))),s||!t.component&&Mo(t.tag,t.attrsMap.type,r)?ue(t,r,o):le(t,r,o);else if(qo.test(r))r=r.replace(qo,""),de(t,r,o,a,!1);else{var u=(r=r.replace(Wo,"")).match(Yo),l=u&&u[1];l&&(r=r.slice(0,-(l.length+1))),pe(t,r,i,o,l,a)}else le(t,r,JSON.stringify(o)),!t.component&&"muted"===r&&Mo(t.tag,t.attrsMap.type,r)&&ue(t,r,"true")}(t)}function un(t){var e;if(e=he(t,"v-for")){var n=function(t){var e=t.match(Go);if(!e)return;var n={};n.for=e[2].trim();var r=e[1].trim().replace(Xo,""),i=r.match(Zo);i?(n.alias=r.replace(Zo,""),n.iterator1=i[1].trim(),i[2]&&(n.iterator2=i[2].trim())):n.alias=r;return n}(e);n&&h(t,n)}}function ln(t,e){t.ifConditions||(t.ifConditions=[]),t.ifConditions.push(e)}function fn(t){return an(t.tag,t.attrsList.slice(),t.parent)}function pn(t){if(t.static=function(t){if(2===t.type)return!1;if(3===t.type)return!0;return!(!t.pre&&(t.hasBindings||t.if||t.for||In(t.tag)||!Fo(t.tag)||function(t){for(;t.parent;){if("template"!==(t=t.parent).tag)return!1;if(t.for)return!0}return!1}(t)||!Object.keys(t).every(Po)))}(t),1===t.type){if(!Fo(t.tag)&&"slot"!==t.tag&&null==t.attrsMap["inline-template"])return;for(var e=0,n=t.children.length;e<n;e++){var r=t.children[e];pn(r),r.static||(t.static=!1)}if(t.ifConditions)for(var i=1,o=t.ifConditions.length;i<o;i++){var a=t.ifConditions[i].block;pn(a),a.static||(t.static=!1)}}}function dn(t,e){if(1===t.type){if((t.static||t.once)&&(t.staticInFor=e),t.static&&t.children.length&&(1!==t.children.length||3!==t.children[0].type))return void(t.staticRoot=!0);if(t.staticRoot=!1,t.children)for(var n=0,r=t.children.length;n<r;n++)dn(t.children[n],e||!!t.for);if(t.ifConditions)for(var i=1,o=t.ifConditions.length;i<o;i++)dn(t.ifConditions[i].block,e)}}function vn(t,e,n){var r=e?"nativeOn:{":"on:{";for(var i in t)r+='"'+i+'":'+hn(i,t[i])+",";return r.slice(0,-1)+"}"}function hn(t,e){if(!e)return"function(){}";if(Array.isArray(e))return"["+e.map(function(e){return hn(t,e)}).join(",")+"]";var n=ca.test(e.value),r=sa.test(e.value);if(e.modifiers){var i="",o="",a=[];for(var s in e.modifiers)if(fa[s])o+=fa[s],ua[s]&&a.push(s);else if("exact"===s){var c=e.modifiers;o+=la(["ctrl","shift","alt","meta"].filter(function(t){return!c[t]}).map(function(t){return"$event."+t+"Key"}).join("||"))}else a.push(s);a.length&&(i+=function(t){return"if(!('button' in $event)&&"+t.map(mn).join("&&")+")return null;"}(a)),o&&(i+=o);return"function($event){"+i+(n?e.value+"($event)":r?"("+e.value+")($event)":e.value)+"}"}return n||r?e.value:"function($event){"+e.value+"}"}function mn(t){var e=parseInt(t,10);if(e)return"$event.keyCode!=="+e;var n=ua[t];return"_k($event.keyCode,"+JSON.stringify(t)+","+JSON.stringify(n)+",$event.key)"}function yn(t,e){var n=new da(e);return{render:"with(this){return "+(t?gn(t,n):'_c("div")')+"}",staticRenderFns:n.staticRenderFns}}function gn(t,e){if(t.staticRoot&&!t.staticProcessed)return _n(t,e);if(t.once&&!t.onceProcessed)return bn(t,e);if(t.for&&!t.forProcessed)return function(t,e,n,r){var i=t.for,o=t.alias,a=t.iterator1?","+t.iterator1:"",s=t.iterator2?","+t.iterator2:"";return t.forProcessed=!0,(r||"_l")+"(("+i+"),function("+o+a+s+"){return "+(n||gn)(t,e)+"})"}(t,e);if(t.if&&!t.ifProcessed)return $n(t,e);if("template"!==t.tag||t.slotTarget){if("slot"===t.tag)return function(t,e){var n=t.slotName||'"default"',r=kn(t,e),i="_t("+n+(r?","+r:""),o=t.attrs&&"{"+t.attrs.map(function(t){return Pn(t.name)+":"+t.value}).join(",")+"}",a=t.attrsMap["v-bind"];!o&&!a||r||(i+=",null");o&&(i+=","+o);a&&(i+=(o?"":",null")+","+a);return i+")"}(t,e);var n;if(t.component)n=function(t,e,n){var r=e.inlineTemplate?null:kn(e,n,!0);return"_c("+t+","+wn(e,n)+(r?","+r:"")+")"}(t.component,t,e);else{var r=t.plain?void 0:wn(t,e),i=t.inlineTemplate?null:kn(t,e,!0);n="_c('"+t.tag+"'"+(r?","+r:"")+(i?","+i:"")+")"}for(var o=0;o<e.transforms.length;o++)n=e.transforms[o](t,n);return n}return kn(t,e)||"void 0"}function _n(t,e){return t.staticProcessed=!0,e.staticRenderFns.push("with(this){return "+gn(t,e)+"}"),"_m("+(e.staticRenderFns.length-1)+(t.staticInFor?",true":"")+")"}function bn(t,e){if(t.onceProcessed=!0,t.if&&!t.ifProcessed)return $n(t,e);if(t.staticInFor){for(var n="",r=t.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o("+gn(t,e)+","+e.onceId+++","+n+")":gn(t,e)}return _n(t,e)}function $n(t,e,n,r){return t.ifProcessed=!0,Cn(t.ifConditions.slice(),e,n,r)}function Cn(t,e,n,r){function i(t){return n?n(t,e):t.once?bn(t,e):gn(t,e)}if(!t.length)return r||"_e()";var o=t.shift();return o.exp?"("+o.exp+")?"+i(o.block)+":"+Cn(t,e,n,r):""+i(o.block)}function wn(t,e){var n="{",r=function(t,e){var n=t.directives;if(!n)return;var r,i,o,a,s="directives:[",c=!1;for(r=0,i=n.length;r<i;r++){o=n[r],a=!0;var u=e.directives[o.name];u&&(a=!!u(t,o,e.warn)),a&&(c=!0,s+='{name:"'+o.name+'",rawName:"'+o.rawName+'"'+(o.value?",value:("+o.value+"),expression:"+JSON.stringify(o.value):"")+(o.arg?',arg:"'+o.arg+'"':"")+(o.modifiers?",modifiers:"+JSON.stringify(o.modifiers):"")+"},")}if(c)return s.slice(0,-1)+"]"}(t,e);r&&(n+=r+","),t.key&&(n+="key:"+t.key+","),t.ref&&(n+="ref:"+t.ref+","),t.refInFor&&(n+="refInFor:true,"),t.pre&&(n+="pre:true,"),t.component&&(n+='tag:"'+t.tag+'",');for(var i=0;i<e.dataGenFns.length;i++)n+=e.dataGenFns[i](t);if(t.attrs&&(n+="attrs:{"+On(t.attrs)+"},"),t.props&&(n+="domProps:{"+On(t.props)+"},"),t.events&&(n+=vn(t.events,!1,e.warn)+","),t.nativeEvents&&(n+=vn(t.nativeEvents,!0,e.warn)+","),t.slotTarget&&!t.slotScope&&(n+="slot:"+t.slotTarget+","),t.scopedSlots&&(n+=function(t,e){return"scopedSlots:_u(["+Object.keys(t).map(function(n){return xn(n,t[n],e)}).join(",")+"])"}(t.scopedSlots,e)+","),t.model&&(n+="model:{value:"+t.model.value+",callback:"+t.model.callback+",expression:"+t.model.expression+"},"),t.inlineTemplate){var o=function(t,e){var n=t.children[0];if(1===n.type){var r=yn(n,e.options);return"inlineTemplate:{render:function(){"+r.render+"},staticRenderFns:["+r.staticRenderFns.map(function(t){return"function(){"+t+"}"}).join(",")+"]}"}}(t,e);o&&(n+=o+",")}return n=n.replace(/,$/,"")+"}",t.wrapData&&(n=t.wrapData(n)),t.wrapListeners&&(n=t.wrapListeners(n)),n}function xn(t,e,n){if(e.for&&!e.forProcessed)return function(t,e,n){var r=e.for,i=e.alias,o=e.iterator1?","+e.iterator1:"",a=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,"_l(("+r+"),function("+i+o+a+"){return "+xn(t,e,n)+"})"}(t,e,n);return"{key:"+t+",fn:"+("function("+String(e.slotScope)+"){return "+("template"===e.tag?e.if?e.if+"?"+(kn(e,n)||"undefined")+":undefined":kn(e,n)||"undefined":gn(e,n))+"}")+"}"}function kn(t,e,n,r,i){var o=t.children;if(o.length){var a=o[0];if(1===o.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag)return(r||gn)(a,e);var s=n?function(t,e){for(var n=0,r=0;r<t.length;r++){var i=t[r];if(1===i.type){if(An(i)||i.ifConditions&&i.ifConditions.some(function(t){return An(t.block)})){n=2;break}(e(i)||i.ifConditions&&i.ifConditions.some(function(t){return e(t.block)}))&&(n=1)}}return n}(o,e.maybeComponent):0,c=i||function(t,e){if(1===t.type)return gn(t,e);return 3===t.type&&t.isComment?function(t){return"_e("+JSON.stringify(t.text)+")"}(t):function(t){return"_v("+(2===t.type?t.expression:Sn(JSON.stringify(t.text)))+")"}(t)};return"["+o.map(function(t){return c(t,e)}).join(",")+"]"+(s?","+s:"")}}function An(t){return void 0!==t.for||"template"===t.tag||"slot"===t.tag}function On(t){for(var e="",n=0;n<t.length;n++){var r=t[n];e+='"'+r.name+'":'+Sn(r.value)+","}return e.slice(0,-1)}function Sn(t){return t.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}function Tn(t,e){try{return new Function(t)}catch(n){return e.push({err:n,code:t}),y}}function En(t){return Ro=Ro||document.createElement("div"),Ro.innerHTML=t?'<a href="\n"/>':'<div a="\n"/>',Ro.innerHTML.indexOf("&#10;")>0}var jn=Object.freeze({}),Nn=Object.prototype.toString,In=u("slot,component",!0),Ln=u("key,ref,slot,slot-scope,is"),Mn=Object.prototype.hasOwnProperty,Dn=/-(\w)/g,Pn=p(function(t){return t.replace(Dn,function(t,e){return e?e.toUpperCase():""})}),Fn=p(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),Rn=/\B([A-Z])/g,Hn=p(function(t){return t.replace(Rn,"-$1").toLowerCase()}),Bn=function(t,e,n){return!1},Un=function(t){return t},Vn="data-server-rendered",zn=["component","directive","filter"],Kn=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured"],Jn={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:Bn,isReservedAttr:Bn,isUnknownElement:Bn,getTagNamespace:y,parsePlatformTagName:Un,mustUseProp:Bn,_lifecycleHooks:Kn},qn=/[^\w.$]/,Wn="__proto__"in{},Gn="undefined"!=typeof window,Zn="undefined"!=typeof WXEnvironment&&!!WXEnvironment.platform,Xn=Zn&&WXEnvironment.platform.toLowerCase(),Yn=Gn&&window.navigator.userAgent.toLowerCase(),Qn=Yn&&/msie|trident/.test(Yn),tr=Yn&&Yn.indexOf("msie 9.0")>0,er=Yn&&Yn.indexOf("edge/")>0,nr=Yn&&Yn.indexOf("android")>0||"android"===Xn,rr=Yn&&/iphone|ipad|ipod|ios/.test(Yn)||"ios"===Xn,ir=(Yn&&/chrome\/\d+/.test(Yn),{}.watch),or=!1;if(Gn)try{var ar={};Object.defineProperty(ar,"passive",{get:function(){or=!0}}),window.addEventListener("test-passive",null,ar)}catch(t){}var sr,cr,ur=function(){return void 0===sr&&(sr=!Gn&&"undefined"!=typeof global&&"server"===global.process.env.VUE_ENV),sr},lr=Gn&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,fr="undefined"!=typeof Symbol&&w(Symbol)&&"undefined"!=typeof Reflect&&w(Reflect.ownKeys);cr="undefined"!=typeof Set&&w(Set)?Set:function(){function t(){this.set=Object.create(null)}return t.prototype.has=function(t){return!0===this.set[t]},t.prototype.add=function(t){this.set[t]=!0},t.prototype.clear=function(){this.set=Object.create(null)},t}();var pr=y,dr=0,vr=function(){this.id=dr++,this.subs=[]};vr.prototype.addSub=function(t){this.subs.push(t)},vr.prototype.removeSub=function(t){l(this.subs,t)},vr.prototype.depend=function(){vr.target&&vr.target.addDep(this)},vr.prototype.notify=function(){for(var t=this.subs.slice(),e=0,n=t.length;e<n;e++)t[e].update()},vr.target=null;var hr=[],mr=function(t,e,n,r,i,o,a,s){this.tag=t,this.data=e,this.children=n,this.text=r,this.elm=i,this.ns=void 0,this.context=o,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=e&&e.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},yr={child:{configurable:!0}};yr.child.get=function(){return this.componentInstance},Object.defineProperties(mr.prototype,yr);var gr=function(t){void 0===t&&(t="");var e=new mr;return e.text=t,e.isComment=!0,e},_r=Array.prototype,br=Object.create(_r);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(t){var e=_r[t];C(br,t,function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var i,o=e.apply(this,n),a=this.__ob__;switch(t){case"push":case"unshift":i=n;break;case"splice":i=n.slice(2)}return i&&a.observeArray(i),a.dep.notify(),o})});var $r=Object.getOwnPropertyNames(br),Cr={shouldConvert:!0},wr=function(t){if(this.value=t,this.dep=new vr,this.vmCount=0,C(t,"__ob__",this),Array.isArray(t)){(Wn?O:S)(t,br,$r),this.observeArray(t)}else this.walk(t)};wr.prototype.walk=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)E(t,e[n],t[e[n]])},wr.prototype.observeArray=function(t){for(var e=0,n=t.length;e<n;e++)T(t[e])};var xr=Jn.optionMergeStrategies;xr.data=function(t,e,n){return n?M(t,e,n):e&&"function"!=typeof e?t:M(t,e)},Kn.forEach(function(t){xr[t]=D}),zn.forEach(function(t){xr[t+"s"]=P}),xr.watch=function(t,e,n,r){if(t===ir&&(t=void 0),e===ir&&(e=void 0),!e)return Object.create(t||null);if(!t)return e;var i={};h(i,t);for(var o in e){var a=i[o],s=e[o];a&&!Array.isArray(a)&&(a=[a]),i[o]=a?a.concat(s):Array.isArray(s)?s:[s]}return i},xr.props=xr.methods=xr.inject=xr.computed=function(t,e,n,r){if(!t)return e;var i=Object.create(null);return h(i,t),e&&h(i,e),i},xr.provide=M;var kr,Ar,Or=function(t,e){return void 0===e?t:e},Sr=[],Tr=!1,Er=!1;if("undefined"!=typeof setImmediate&&w(setImmediate))Ar=function(){setImmediate(J)};else if("undefined"==typeof MessageChannel||!w(MessageChannel)&&"[object MessageChannelConstructor]"!==MessageChannel.toString())Ar=function(){setTimeout(J,0)};else{var jr=new MessageChannel,Nr=jr.port2;jr.port1.onmessage=J,Ar=function(){Nr.postMessage(1)}}if("undefined"!=typeof Promise&&w(Promise)){var Ir=Promise.resolve();kr=function(){Ir.then(J),rr&&setTimeout(y)}}else kr=Ar;var Lr,Mr=new cr,Dr=p(function(t){var e="&"===t.charAt(0),n="~"===(t=e?t.slice(1):t).charAt(0),r="!"===(t=n?t.slice(1):t).charAt(0);return t=r?t.slice(1):t,{name:t,once:n,capture:r,passive:e}}),Pr=null,Fr=[],Rr=[],Hr={},Br=!1,Ur=!1,Vr=0,zr=0,Kr=function(t,e,n,r,i){this.vm=t,i&&(t._watcher=this),t._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++zr,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new cr,this.newDepIds=new cr,this.expression="","function"==typeof e?this.getter=e:(this.getter=function(t){if(!qn.test(t)){var e=t.split(".");return function(t){for(var n=0;n<e.length;n++){if(!t)return;t=t[e[n]]}return t}}}(e),this.getter||(this.getter=function(){})),this.value=this.lazy?void 0:this.get()};Kr.prototype.get=function(){!function(t){vr.target&&hr.push(vr.target),vr.target=t}(this);var t,e=this.vm;try{t=this.getter.call(e,e)}catch(t){if(!this.user)throw t;V(t,e,'getter for watcher "'+this.expression+'"')}finally{this.deep&&W(t),vr.target=hr.pop(),this.cleanupDeps()}return t},Kr.prototype.addDep=function(t){var e=t.id;this.newDepIds.has(e)||(this.newDepIds.add(e),this.newDeps.push(t),this.depIds.has(e)||t.addSub(this))},Kr.prototype.cleanupDeps=function(){for(var t=this.deps.length;t--;){var e=this.deps[t];this.newDepIds.has(e.id)||e.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},Kr.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():function(t){var e=t.id;if(null==Hr[e]){if(Hr[e]=!0,Ur){for(var n=Fr.length-1;n>Vr&&Fr[n].id>t.id;)n--;Fr.splice(n+1,0,t)}else Fr.push(t);Br||(Br=!0,q(ht))}}(this)},Kr.prototype.run=function(){if(this.active){var t=this.get();if(t!==this.value||i(t)||this.deep){var e=this.value;if(this.value=t,this.user)try{this.cb.call(this.vm,t,e)}catch(t){V(t,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,t,e)}}},Kr.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Kr.prototype.depend=function(){for(var t=this.deps.length;t--;)this.deps[t].depend()},Kr.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||l(this.vm._watchers,this);for(var t=this.deps.length;t--;)this.deps[t].removeSub(this);this.active=!1}};var Jr={enumerable:!0,configurable:!0,get:y,set:y},qr={lazy:!0};Nt(It.prototype);var Wr={init:function(t,n,r,i){if(!t.componentInstance||t.componentInstance._isDestroyed){(t.componentInstance=function(t,n,r,i){var o={_isComponent:!0,parent:n,_parentVnode:t,_parentElm:r||null,_refElm:i||null},a=t.data.inlineTemplate;return e(a)&&(o.render=a.render,o.staticRenderFns=a.staticRenderFns),new t.componentOptions.Ctor(o)}(t,Pr,r,i)).$mount(n?t.elm:void 0,n)}else if(t.data.keepAlive){var o=t;Wr.prepatch(o,o)}},prepatch:function(t,e){var n=e.componentOptions;!function(t,e,n,r,i){var o=!!(i||t.$options._renderChildren||r.data.scopedSlots||t.$scopedSlots!==jn);if(t.$options._parentVnode=r,t.$vnode=r,t._vnode&&(t._vnode.parent=r),t.$options._renderChildren=i,t.$attrs=r.data&&r.data.attrs||jn,t.$listeners=n||jn,e&&t.$options.props){Cr.shouldConvert=!1;for(var a=t._props,s=t.$options._propKeys||[],c=0;c<s.length;c++){var u=s[c];a[u]=H(u,t.$options.props,e,t)}Cr.shouldConvert=!0,t.$options.propsData=e}if(n){var l=t.$options._parentListeners;t.$options._parentListeners=n,st(t,n,l)}o&&(t.$slots=ct(i,r.context),t.$forceUpdate())}(e.componentInstance=t.componentInstance,n.propsData,n.listeners,e,n.children)},insert:function(t){var e=t.context,n=t.componentInstance;n._isMounted||(n._isMounted=!0,vt(n,"mounted")),t.data.keepAlive&&(e._isMounted?function(t){t._inactive=!1,Rr.push(t)}(n):pt(n,!0))},destroy:function(t){var e=t.componentInstance;e._isDestroyed||(t.data.keepAlive?dt(e,!0):e.$destroy())}},Gr=Object.keys(Wr),Zr=1,Xr=2,Yr=0;!function(t){t.prototype._init=function(t){this._uid=Yr++,this._isVue=!0,t&&t._isComponent?function(t,e){var n=t.$options=Object.create(t.constructor.options),r=e._parentVnode;n.parent=e.parent,n._parentVnode=r,n._parentElm=e._parentElm,n._refElm=e._refElm;var i=r.componentOptions;n.propsData=i.propsData,n._parentListeners=i.listeners,n._renderChildren=i.children,n._componentTag=i.tag,e.render&&(n.render=e.render,n.staticRenderFns=e.staticRenderFns)}(this,t):this.$options=F(Ft(this.constructor),t||{},this),this._renderProxy=this,this._self=this,function(t){var e=t.$options,n=e.parent;if(n&&!e.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(t)}t.$parent=n,t.$root=n?n.$root:t,t.$children=[],t.$refs={},t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}(this),function(t){t._events=Object.create(null),t._hasHookEvent=!1;var e=t.$options._parentListeners;e&&st(t,e)}(this),function(t){t._vnode=null,t._staticTrees=null;var e=t.$options,n=t.$vnode=e._parentVnode,r=n&&n.context;t.$slots=ct(e._renderChildren,r),t.$scopedSlots=jn,t._c=function(e,n,r,i){return Dt(t,e,n,r,i,!1)},t.$createElement=function(e,n,r,i){return Dt(t,e,n,r,i,!0)};var i=n&&n.data;E(t,"$attrs",i&&i.attrs||jn,0,!0),E(t,"$listeners",e._parentListeners||jn,0,!0)}(this),vt(this,"beforeCreate"),function(t){var e=$t(t.$options.inject,t);e&&(Cr.shouldConvert=!1,Object.keys(e).forEach(function(n){E(t,n,e[n])}),Cr.shouldConvert=!0)}(this),yt(this),function(t){var e=t.$options.provide;e&&(t._provided="function"==typeof e?e.call(t):e)}(this),vt(this,"created"),this.$options.el&&this.$mount(this.$options.el)}}(Rt),function(t){var e={};e.get=function(){return this._data};var n={};n.get=function(){return this._props},Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",n),t.prototype.$set=j,t.prototype.$delete=N,t.prototype.$watch=function(t,e,n){if(o(e))return bt(this,t,e,n);(n=n||{}).user=!0;var r=new Kr(this,t,e,n);return n.immediate&&e.call(this,r.value),function(){r.teardown()}}}(Rt),function(t){var e=/^hook:/;t.prototype.$on=function(t,n){if(Array.isArray(t))for(var r=0,i=t.length;r<i;r++)this.$on(t[r],n);else(this._events[t]||(this._events[t]=[])).push(n),e.test(t)&&(this._hasHookEvent=!0);return this},t.prototype.$once=function(t,e){function n(){r.$off(t,n),e.apply(r,arguments)}var r=this;return n.fn=e,r.$on(t,n),r},t.prototype.$off=function(t,e){if(!arguments.length)return this._events=Object.create(null),this;if(Array.isArray(t)){for(var n=0,r=t.length;n<r;n++)this.$off(t[n],e);return this}var i=this._events[t];if(!i)return this;if(!e)return this._events[t]=null,this;if(e)for(var o,a=i.length;a--;)if((o=i[a])===e||o.fn===e){i.splice(a,1);break}return this},t.prototype.$emit=function(t){var e=this,n=e._events[t];if(n){n=n.length>1?v(n):n;for(var r=v(arguments,1),i=0,o=n.length;i<o;i++)try{n[i].apply(e,r)}catch(n){V(n,e,'event handler for "'+t+'"')}}return e}}(Rt),function(t){t.prototype._update=function(t,e){this._isMounted&&vt(this,"beforeUpdate");var n=this.$el,r=this._vnode,i=Pr;Pr=this,this._vnode=t,r?this.$el=this.__patch__(r,t):(this.$el=this.__patch__(this.$el,t,e,!1,this.$options._parentElm,this.$options._refElm),this.$options._parentElm=this.$options._refElm=null),Pr=i,n&&(n.__vue__=null),this.$el&&(this.$el.__vue__=this),this.$vnode&&this.$parent&&this.$vnode===this.$parent._vnode&&(this.$parent.$el=this.$el)},t.prototype.$forceUpdate=function(){this._watcher&&this._watcher.update()},t.prototype.$destroy=function(){if(!this._isBeingDestroyed){vt(this,"beforeDestroy"),this._isBeingDestroyed=!0;var t=this.$parent;!t||t._isBeingDestroyed||this.$options.abstract||l(t.$children,this),this._watcher&&this._watcher.teardown();for(var e=this._watchers.length;e--;)this._watchers[e].teardown();this._data.__ob__&&this._data.__ob__.vmCount--,this._isDestroyed=!0,this.__patch__(this._vnode,null),vt(this,"destroyed"),this.$off(),this.$el&&(this.$el.__vue__=null),this.$vnode&&(this.$vnode.parent=null)}}}(Rt),function(t){Nt(t.prototype),t.prototype.$nextTick=function(t){return q(t,this)},t.prototype._render=function(){var t=this,e=t.$options,n=e.render,r=e._parentVnode;if(t._isMounted)for(var i in t.$slots){var o=t.$slots[i];(o._rendered||o[0]&&o[0].elm)&&(t.$slots[i]=A(o,!0))}t.$scopedSlots=r&&r.data.scopedSlots||jn,t.$vnode=r;var a;try{a=n.call(t._renderProxy,t.$createElement)}catch(e){V(e,t,"render"),a=t._vnode}return a instanceof mr||(a=gr()),a.parent=r,a}}(Rt);var Qr=[String,RegExp,Array],ti={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:Qr,exclude:Qr,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var t in this.cache)zt(this.cache,t,this.keys)},watch:{include:function(t){Vt(this,function(e){return Ut(t,e)})},exclude:function(t){Vt(this,function(e){return!Ut(t,e)})}},render:function(){var t=this.$slots.default,e=it(t),n=e&&e.componentOptions;if(n){var r=Bt(n),i=this.include,o=this.exclude;if(i&&(!r||!Ut(i,r))||o&&r&&Ut(o,r))return e;var a=this.cache,s=this.keys,c=null==e.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):e.key;a[c]?(e.componentInstance=a[c].componentInstance,l(s,c),s.push(c)):(a[c]=e,s.push(c),this.max&&s.length>parseInt(this.max)&&zt(a,s[0],s,this._vnode)),e.data.keepAlive=!0}return e||t&&t[0]}}};!function(t){var e={};e.get=function(){return Jn},Object.defineProperty(t,"config",e),t.util={warn:pr,extend:h,mergeOptions:F,defineReactive:E},t.set=j,t.delete=N,t.nextTick=q,t.options=Object.create(null),zn.forEach(function(e){t.options[e+"s"]=Object.create(null)}),t.options._base=t,h(t.options.components,ti),function(t){t.use=function(t){var e=this._installedPlugins||(this._installedPlugins=[]);if(e.indexOf(t)>-1)return this;var n=v(arguments,1);return n.unshift(this),"function"==typeof t.install?t.install.apply(t,n):"function"==typeof t&&t.apply(null,n),e.push(t),this}}(t),function(t){t.mixin=function(t){return this.options=F(this.options,t),this}}(t),Ht(t),function(t){zn.forEach(function(e){t[e]=function(t,n){return n?("component"===e&&o(n)&&(n.name=n.name||t,n=this.options._base.extend(n)),"directive"===e&&"function"==typeof n&&(n={bind:n,update:n}),this.options[e+"s"][t]=n,n):this.options[e+"s"][t]}})}(t)}(Rt),Object.defineProperty(Rt.prototype,"$isServer",{get:ur}),Object.defineProperty(Rt.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Rt.version="2.5.13";var ei,ni,ri,ii,oi,ai,si,ci,ui=u("style,class"),li=u("input,textarea,option,select,progress"),fi=function(t,e,n){return"value"===n&&li(t)&&"button"!==e||"selected"===n&&"option"===t||"checked"===n&&"input"===t||"muted"===n&&"video"===t},pi=u("contenteditable,draggable,spellcheck"),di=u("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),vi="http://www.w3.org/1999/xlink",hi=function(t){return":"===t.charAt(5)&&"xlink"===t.slice(0,5)},mi=function(t){return hi(t)?t.slice(6,t.length):""},yi=function(t){return null==t||!1===t},gi={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},_i=u("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),bi=u("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),$i=function(t){return _i(t)||bi(t)},Ci=Object.create(null),wi=u("text,number,password,search,email,tel,url"),xi=Object.freeze({createElement:function(t,e){var n=document.createElement(t);return"select"!==t?n:(e.data&&e.data.attrs&&void 0!==e.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)},createElementNS:function(t,e){return document.createElementNS(gi[t],e)},createTextNode:function(t){return document.createTextNode(t)},createComment:function(t){return document.createComment(t)},insertBefore:function(t,e,n){t.insertBefore(e,n)},removeChild:function(t,e){t.removeChild(e)},appendChild:function(t,e){t.appendChild(e)},parentNode:function(t){return t.parentNode},nextSibling:function(t){return t.nextSibling},tagName:function(t){return t.tagName},setTextContent:function(t,e){t.textContent=e},setAttribute:function(t,e,n){t.setAttribute(e,n)}}),ki={create:function(t,e){Xt(e)},update:function(t,e){t.data.ref!==e.data.ref&&(Xt(t,!0),Xt(e))},destroy:function(t){Xt(t,!0)}},Ai=new mr("",{},[]),Oi=["create","activate","update","remove","destroy"],Si={create:te,update:te,destroy:function(t){te(t,Ai)}},Ti=Object.create(null),Ei=[ki,Si],ji={create:re,update:re},Ni={create:oe,update:oe},Ii=/[\w).+\-_$\]]/,Li="__r",Mi="__c",Di={create:xe,update:xe},Pi={create:ke,update:ke},Fi=p(function(t){var e={},n=/:(.+)/;return t.split(/;(?![^(]*\))/g).forEach(function(t){if(t){var r=t.split(n);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}),Ri=/^--/,Hi=/\s*!important$/,Bi=function(t,e,n){if(Ri.test(e))t.style.setProperty(e,n);else if(Hi.test(n))t.style.setProperty(e,n.replace(Hi,""),"important");else{var r=Vi(e);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)t.style[r]=n[i];else t.style[r]=n}},Ui=["Webkit","Moz","ms"],Vi=p(function(t){if(ci=ci||document.createElement("div").style,"filter"!==(t=Pn(t))&&t in ci)return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),n=0;n<Ui.length;n++){var r=Ui[n]+e;if(r in ci)return r}}),zi={create:Se,update:Se},Ki=p(function(t){return{enterClass:t+"-enter",enterToClass:t+"-enter-to",enterActiveClass:t+"-enter-active",leaveClass:t+"-leave",leaveToClass:t+"-leave-to",leaveActiveClass:t+"-leave-active"}}),Ji=Gn&&!tr,qi="transition",Wi="animation",Gi="transition",Zi="transitionend",Xi="animation",Yi="animationend";Ji&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(Gi="WebkitTransition",Zi="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Xi="WebkitAnimation",Yi="webkitAnimationEnd"));var Qi=Gn?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(t){return t()},to=/\b(transform|all)(,|$)/,eo=function(i){function o(t){var n=A.parentNode(t);e(n)&&A.removeChild(n,t)}function a(t,r,i,o,a){if(t.isRootInsert=!a,!function(t,r,i,o){var a=t.data;if(e(a)){var u=e(t.componentInstance)&&a.keepAlive;if(e(a=a.hook)&&e(a=a.init)&&a(t,!1,i,o),e(t.componentInstance))return s(t,r),n(u)&&function(t,n,r,i){for(var o,a=t;a.componentInstance;)if(a=a.componentInstance._vnode,e(o=a.data)&&e(o=o.transition)){for(o=0;o<x.activate.length;++o)x.activate[o](Ai,a);n.push(a);break}c(r,t.elm,i)}(t,r,i,o),!0}}(t,r,i,o)){var u=t.data,f=t.children,v=t.tag;e(v)?(t.elm=t.ns?A.createElementNS(t.ns,v):A.createElement(v,t),d(t),l(t,f,r),e(u)&&p(t,r),c(i,t.elm,o)):n(t.isComment)?(t.elm=A.createComment(t.text),c(i,t.elm,o)):(t.elm=A.createTextNode(t.text),c(i,t.elm,o))}}function s(t,n){e(t.data.pendingInsert)&&(n.push.apply(n,t.data.pendingInsert),t.data.pendingInsert=null),t.elm=t.componentInstance.$el,f(t)?(p(t,n),d(t)):(Xt(t),n.push(t))}function c(t,n,r){e(t)&&(e(r)?r.parentNode===t&&A.insertBefore(t,n,r):A.appendChild(t,n))}function l(t,e,n){if(Array.isArray(e))for(var i=0;i<e.length;++i)a(e[i],n,t.elm,null,!0);else r(t.text)&&A.appendChild(t.elm,A.createTextNode(String(t.text)))}function f(t){for(;t.componentInstance;)t=t.componentInstance._vnode;return e(t.tag)}function p(t,n){for(var r=0;r<x.create.length;++r)x.create[r](Ai,t);e(C=t.data.hook)&&(e(C.create)&&C.create(Ai,t),e(C.insert)&&n.push(t))}function d(t){var n;if(e(n=t.fnScopeId))A.setAttribute(t.elm,n,"");else for(var r=t;r;)e(n=r.context)&&e(n=n.$options._scopeId)&&A.setAttribute(t.elm,n,""),r=r.parent;e(n=Pr)&&n!==t.context&&n!==t.fnContext&&e(n=n.$options._scopeId)&&A.setAttribute(t.elm,n,"")}function v(t,e,n,r,i,o){for(;r<=i;++r)a(n[r],o,t,e)}function h(t){var n,r,i=t.data;if(e(i))for(e(n=i.hook)&&e(n=n.destroy)&&n(t),n=0;n<x.destroy.length;++n)x.destroy[n](t);if(e(n=t.children))for(r=0;r<t.children.length;++r)h(t.children[r])}function m(t,n,r,i){for(;r<=i;++r){var a=n[r];e(a)&&(e(a.tag)?(y(a),h(a)):o(a.elm))}}function y(t,n){if(e(n)||e(t.data)){var r,i=x.remove.length+1;for(e(n)?n.listeners+=i:n=function(t,e){function n(){0==--n.listeners&&o(t)}return n.listeners=e,n}(t.elm,i),e(r=t.componentInstance)&&e(r=r._vnode)&&e(r.data)&&y(r,n),r=0;r<x.remove.length;++r)x.remove[r](t,n);e(r=t.data.hook)&&e(r=r.remove)?r(t,n):n()}else o(t.elm)}function g(n,r,i,o,s){for(var c,u,l,f=0,p=0,d=r.length-1,h=r[0],y=r[d],g=i.length-1,b=i[0],$=i[g],C=!s;f<=d&&p<=g;)t(h)?h=r[++f]:t(y)?y=r[--d]:Yt(h,b)?(_(h,b,o),h=r[++f],b=i[++p]):Yt(y,$)?(_(y,$,o),y=r[--d],$=i[--g]):Yt(h,$)?(_(h,$,o),C&&A.insertBefore(n,h.elm,A.nextSibling(y.elm)),h=r[++f],$=i[--g]):Yt(y,b)?(_(y,b,o),C&&A.insertBefore(n,y.elm,h.elm),y=r[--d],b=i[++p]):(t(c)&&(c=Qt(r,f,d)),t(u=e(b.key)?c[b.key]:function(t,n,r,i){for(var o=r;o<i;o++){var a=n[o];if(e(a)&&Yt(t,a))return o}}(b,r,f,d))?a(b,o,n,h.elm):Yt(l=r[u],b)?(_(l,b,o),r[u]=void 0,C&&A.insertBefore(n,l.elm,h.elm)):a(b,o,n,h.elm),b=i[++p]);f>d?v(n,t(i[g+1])?null:i[g+1].elm,i,p,g,o):p>g&&m(0,r,f,d)}function _(r,i,o,a){if(r!==i){var s=i.elm=r.elm;if(n(r.isAsyncPlaceholder))e(i.asyncFactory.resolved)?$(r.elm,i,o):i.isAsyncPlaceholder=!0;else if(n(i.isStatic)&&n(r.isStatic)&&i.key===r.key&&(n(i.isCloned)||n(i.isOnce)))i.componentInstance=r.componentInstance;else{var c,u=i.data;e(u)&&e(c=u.hook)&&e(c=c.prepatch)&&c(r,i);var l=r.children,p=i.children;if(e(u)&&f(i)){for(c=0;c<x.update.length;++c)x.update[c](r,i);e(c=u.hook)&&e(c=c.update)&&c(r,i)}t(i.text)?e(l)&&e(p)?l!==p&&g(s,l,p,o,a):e(p)?(e(r.text)&&A.setTextContent(s,""),v(s,null,p,0,p.length-1,o)):e(l)?m(0,l,0,l.length-1):e(r.text)&&A.setTextContent(s,""):r.text!==i.text&&A.setTextContent(s,i.text),e(u)&&e(c=u.hook)&&e(c=c.postpatch)&&c(r,i)}}}function b(t,r,i){if(n(i)&&e(t.parent))t.parent.data.pendingInsert=r;else for(var o=0;o<r.length;++o)r[o].data.hook.insert(r[o])}function $(t,r,i,o){var a,c=r.tag,u=r.data,f=r.children;if(o=o||u&&u.pre,r.elm=t,n(r.isComment)&&e(r.asyncFactory))return r.isAsyncPlaceholder=!0,!0;if(e(u)&&(e(a=u.hook)&&e(a=a.init)&&a(r,!0),e(a=r.componentInstance)))return s(r,i),!0;if(e(c)){if(e(f))if(t.hasChildNodes())if(e(a=u)&&e(a=a.domProps)&&e(a=a.innerHTML)){if(a!==t.innerHTML)return!1}else{for(var d=!0,v=t.firstChild,h=0;h<f.length;h++){if(!v||!$(v,f[h],i,o)){d=!1;break}v=v.nextSibling}if(!d||v)return!1}else l(r,f,i);if(e(u)){var m=!1;for(var y in u)if(!O(y)){m=!0,p(r,i);break}!m&&u.class&&W(u.class)}}else t.data!==r.text&&(t.data=r.text);return!0}var C,w,x={},k=i.modules,A=i.nodeOps;for(C=0;C<Oi.length;++C)for(x[Oi[C]]=[],w=0;w<k.length;++w)e(k[w][Oi[C]])&&x[Oi[C]].push(k[w][Oi[C]]);var O=u("attrs,class,staticClass,staticStyle,key");return function(r,i,o,s,c,u){if(!t(i)){var l=!1,p=[];if(t(r))l=!0,a(i,p,c,u);else{var d=e(r.nodeType);if(!d&&Yt(r,i))_(r,i,p,s);else{if(d){if(1===r.nodeType&&r.hasAttribute(Vn)&&(r.removeAttribute(Vn),o=!0),n(o)&&$(r,i,p))return b(i,p,!0),r;r=function(t){return new mr(A.tagName(t).toLowerCase(),{},[],void 0,t)}(r)}var v=r.elm,y=A.parentNode(v);if(a(i,p,v._leaveCb?null:y,A.nextSibling(v)),e(i.parent))for(var g=i.parent,C=f(i);g;){for(var w=0;w<x.destroy.length;++w)x.destroy[w](g);if(g.elm=i.elm,C){for(var k=0;k<x.create.length;++k)x.create[k](Ai,g);var O=g.data.hook.insert;if(O.merged)for(var S=1;S<O.fns.length;S++)O.fns[S]()}else Xt(g);g=g.parent}e(y)?m(0,[r],0,0):e(r.tag)&&h(r)}}return b(i,p,l),i.elm}e(r)&&h(r)}}({nodeOps:xi,modules:[ji,Ni,Di,Pi,zi,Gn?{create:Ve,activate:Ve,remove:function(t,e){!0!==t.data.show?He(t,e):e()}}:{}].concat(Ei)});tr&&document.addEventListener("selectionchange",function(){var t=document.activeElement;t&&t.vmodel&&Ze(t,"input")});var no={inserted:function(t,e,n,r){"select"===n.tag?(r.elm&&!r.elm._vOptions?Y(n,"postpatch",function(){no.componentUpdated(t,e,n)}):ze(t,e,n.context),t._vOptions=[].map.call(t.options,qe)):("textarea"===n.tag||wi(t.type))&&(t._vModifiers=e.modifiers,e.modifiers.lazy||(t.addEventListener("change",Ge),nr||(t.addEventListener("compositionstart",We),t.addEventListener("compositionend",Ge)),tr&&(t.vmodel=!0)))},componentUpdated:function(t,e,n){if("select"===n.tag){ze(t,e,n.context);var r=t._vOptions,i=t._vOptions=[].map.call(t.options,qe);if(i.some(function(t,e){return!g(t,r[e])})){(t.multiple?e.value.some(function(t){return Je(t,i)}):e.value!==e.oldValue&&Je(e.value,i))&&Ze(t,"change")}}}},ro={model:no,show:{bind:function(t,e,n){var r=e.value,i=(n=Xe(n)).data&&n.data.transition,o=t.__vOriginalDisplay="none"===t.style.display?"":t.style.display;r&&i?(n.data.show=!0,Re(n,function(){t.style.display=o})):t.style.display=r?o:"none"},update:function(t,e,n){var r=e.value;if(r!==e.oldValue){(n=Xe(n)).data&&n.data.transition?(n.data.show=!0,r?Re(n,function(){t.style.display=t.__vOriginalDisplay}):He(n,function(){t.style.display="none"})):t.style.display=r?t.__vOriginalDisplay:"none"}},unbind:function(t,e,n,r,i){i||(t.style.display=t.__vOriginalDisplay)}}},io={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]},oo={name:"transition",props:io,abstract:!0,render:function(t){var e=this,n=this.$slots.default;if(n&&(n=n.filter(function(t){return t.tag||rt(t)})).length){var i=this.mode,o=n[0];if(function(t){for(;t=t.parent;)if(t.data.transition)return!0}(this.$vnode))return o;var a=Ye(o);if(!a)return o;if(this._leaving)return tn(t,o);var s="__transition-"+this._uid+"-";a.key=null==a.key?a.isComment?s+"comment":s+a.tag:r(a.key)?0===String(a.key).indexOf(s)?a.key:s+a.key:a.key;var c=(a.data||(a.data={})).transition=Qe(this),u=this._vnode,l=Ye(u);if(a.data.directives&&a.data.directives.some(function(t){return"show"===t.name})&&(a.data.show=!0),l&&l.data&&!function(t,e){return e.key===t.key&&e.tag===t.tag}(a,l)&&!rt(l)&&(!l.componentInstance||!l.componentInstance._vnode.isComment)){var f=l.data.transition=h({},c);if("out-in"===i)return this._leaving=!0,Y(f,"afterLeave",function(){e._leaving=!1,e.$forceUpdate()}),tn(t,o);if("in-out"===i){if(rt(a))return u;var p,d=function(){p()};Y(c,"afterEnter",d),Y(c,"enterCancelled",d),Y(f,"delayLeave",function(t){p=t})}}return o}}},ao=h({tag:String,moveClass:String},io);delete ao.mode;var so={Transition:oo,TransitionGroup:{props:ao,render:function(t){for(var e=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=Qe(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],l=[],f=0;f<r.length;f++){var p=r[f];p.data.transition=a,p.data.pos=p.elm.getBoundingClientRect(),n[p.key]?u.push(p):l.push(p)}this.kept=t(e,null,u),this.removed=l}return t(e,null,o)},beforeUpdate:function(){this.__patch__(this._vnode,this.kept,!1,!0),this._vnode=this.kept},updated:function(){var t=this.prevChildren,e=this.moveClass||(this.name||"v")+"-move";t.length&&this.hasMove(t[0].elm,e)&&(t.forEach(en),t.forEach(nn),t.forEach(rn),this._reflow=document.body.offsetHeight,t.forEach(function(t){if(t.data.moved){var n=t.elm,r=n.style;Ie(n,e),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(Zi,n._moveCb=function t(r){r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(Zi,t),n._moveCb=null,Le(n,e))})}}))},methods:{hasMove:function(t,e){if(!Ji)return!1;if(this._hasMove)return this._hasMove;var n=t.cloneNode();t._transitionClasses&&t._transitionClasses.forEach(function(t){Ee(n,t)}),Te(n,e),n.style.display="none",this.$el.appendChild(n);var r=De(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}}};Rt.config.mustUseProp=fi,Rt.config.isReservedTag=$i,Rt.config.isReservedAttr=ui,Rt.config.getTagNamespace=Gt,Rt.config.isUnknownElement=function(t){if(!Gn)return!0;if($i(t))return!1;if(t=t.toLowerCase(),null!=Ci[t])return Ci[t];var e=document.createElement(t);return t.indexOf("-")>-1?Ci[t]=e.constructor===window.HTMLUnknownElement||e.constructor===window.HTMLElement:Ci[t]=/HTMLUnknownElement/.test(e.toString())},h(Rt.options.directives,ro),h(Rt.options.components,so),Rt.prototype.__patch__=Gn?eo:y,Rt.prototype.$mount=function(t,e){return t=t&&Gn?Zt(t):void 0,function(t,e,n){t.$el=e,t.$options.render||(t.$options.render=gr),vt(t,"beforeMount");var r;return r=function(){t._update(t._render(),n)},new Kr(t,r,y,null,!0),n=!1,null==t.$vnode&&(t._isMounted=!0,vt(t,"mounted")),t}(this,t,e)},Rt.nextTick(function(){Jn.devtools&&lr&&lr.emit("init",Rt)},0);var co,uo=/\{\{((?:.|\n)+?)\}\}/g,lo=/[-.*+?^${}()|[\]\/\\]/g,fo=p(function(t){var e=t[0].replace(lo,"\\$&"),n=t[1].replace(lo,"\\$&");return new RegExp(e+"((?:.|\\n)+?)"+n,"g")}),po={staticKeys:["staticClass"],transformNode:function(t,e){e.warn;var n=he(t,"class");n&&(t.staticClass=JSON.stringify(n));var r=ve(t,"class",!1);r&&(t.classBinding=r)},genData:function(t){var e="";return t.staticClass&&(e+="staticClass:"+t.staticClass+","),t.classBinding&&(e+="class:"+t.classBinding+","),e}},vo={staticKeys:["staticStyle"],transformNode:function(t,e){e.warn;var n=he(t,"style");n&&(t.staticStyle=JSON.stringify(Fi(n)));var r=ve(t,"style",!1);r&&(t.styleBinding=r)},genData:function(t){var e="";return t.staticStyle&&(e+="staticStyle:"+t.staticStyle+","),t.styleBinding&&(e+="style:("+t.styleBinding+"),"),e}},ho=function(t){return co=co||document.createElement("div"),co.innerHTML=t,co.textContent},mo=u("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),yo=u("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),go=u("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),_o=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,bo="[a-zA-Z_][\\w\\-\\.]*",$o="((?:"+bo+"\\:)?"+bo+")",Co=new RegExp("^<"+$o),wo=/^\s*(\/?)>/,xo=new RegExp("^<\\/"+$o+"[^>]*>"),ko=/^<!DOCTYPE [^>]+>/i,Ao=/^<!--/,Oo=/^<!\[/,So=!1;"x".replace(/x(.)?/g,function(t,e){So=""===e});var To,Eo,jo,No,Io,Lo,Mo,Do,Po,Fo,Ro,Ho=u("script,style,textarea",!0),Bo={},Uo={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n","&#9;":"\t"},Vo=/&(?:lt|gt|quot|amp);/g,zo=/&(?:lt|gt|quot|amp|#10|#9);/g,Ko=u("pre,textarea",!0),Jo=function(t,e){return t&&Ko(t)&&"\n"===e[0]},qo=/^@|^v-on:/,Wo=/^v-|^@|^:/,Go=/(.*?)\s+(?:in|of)\s+(.*)/,Zo=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Xo=/^\(|\)$/g,Yo=/:(.*)$/,Qo=/^:|^v-bind:/,ta=/\.[^.]+/g,ea=p(ho),na=/^xmlns:NS\d+/,ra=/^NS\d+:/,ia=[po,vo,{preTransformNode:function(t,e){if("input"===t.tag){var n=t.attrsMap;if(n["v-model"]&&(n["v-bind:type"]||n[":type"])){var r=ve(t,"type"),i=he(t,"v-if",!0),o=i?"&&("+i+")":"",a=null!=he(t,"v-else",!0),s=he(t,"v-else-if",!0),c=fn(t);un(c),fe(c,"type","checkbox"),cn(c,e),c.processed=!0,c.if="("+r+")==='checkbox'"+o,ln(c,{exp:c.if,block:c});var u=fn(t);he(u,"v-for",!0),fe(u,"type","radio"),cn(u,e),ln(c,{exp:"("+r+")==='radio'"+o,block:u});var l=fn(t);return he(l,"v-for",!0),fe(l,":type",r),cn(l,e),ln(c,{exp:i,block:l}),a?c.else=!0:s&&(c.elseif=s),c}}}}],oa={expectHTML:!0,modules:ia,directives:{model:function(t,e,n){var r=e.value,i=e.modifiers,o=t.tag,a=t.attrsMap.type;if(t.component)return me(t,r,i),!1;if("select"===o)!function(t,e,n){var r='var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(n&&n.number?"_n(val)":"val")+"});";r=r+" "+ye(e,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"),de(t,"change",r,null,!0)}(t,r,i);else if("input"===o&&"checkbox"===a)!function(t,e,n){var r=n&&n.number,i=ve(t,"value")||"null",o=ve(t,"true-value")||"true",a=ve(t,"false-value")||"false";ue(t,"checked","Array.isArray("+e+")?_i("+e+","+i+")>-1"+("true"===o?":("+e+")":":_q("+e+","+o+")")),de(t,"change","var $$a="+e+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&("+e+"=$$a.concat([$$v]))}else{$$i>-1&&("+e+"=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{"+ye(e,"$$c")+"}",null,!0)}(t,r,i);else if("input"===o&&"radio"===a)!function(t,e,n){var r=n&&n.number,i=ve(t,"value")||"null";ue(t,"checked","_q("+e+","+(i=r?"_n("+i+")":i)+")"),de(t,"change",ye(e,i),null,!0)}(t,r,i);else if("input"===o||"textarea"===o)!function(t,e,n){var r=t.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=!o&&"range"!==r,u=o?"change":"range"===r?Li:"input",l="$event.target.value";s&&(l="$event.target.value.trim()"),a&&(l="_n("+l+")");var f=ye(e,l);c&&(f="if($event.target.composing)return;"+f),ue(t,"value","("+e+")"),de(t,u,f,null,!0),(s||a)&&de(t,"blur","$forceUpdate()")}(t,r,i);else if(!Jn.isReservedTag(o))return me(t,r,i),!1;return!0},text:function(t,e){e.value&&ue(t,"textContent","_s("+e.value+")")},html:function(t,e){e.value&&ue(t,"innerHTML","_s("+e.value+")")}},isPreTag:function(t){return"pre"===t},isUnaryTag:mo,mustUseProp:fi,canBeLeftOpenTag:yo,isReservedTag:$i,getTagNamespace:Gt,staticKeys:function(t){return t.reduce(function(t,e){return t.concat(e.staticKeys||[])},[]).join(",")}(ia)},aa=p(function(t){return u("type,tag,attrsList,attrsMap,plain,parent,children,attrs"+(t?","+t:""))}),sa=/^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,ca=/^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,ua={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},la=function(t){return"if("+t+")return null;"},fa={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:la("$event.target !== $event.currentTarget"),ctrl:la("!$event.ctrlKey"),shift:la("!$event.shiftKey"),alt:la("!$event.altKey"),meta:la("!$event.metaKey"),left:la("'button' in $event && $event.button !== 0"),middle:la("'button' in $event && $event.button !== 1"),right:la("'button' in $event && $event.button !== 2")},pa={on:function(t,e){t.wrapListeners=function(t){return"_g("+t+","+e.value+")"}},bind:function(t,e){t.wrapData=function(n){return"_b("+n+",'"+t.tag+"',"+e.value+","+(e.modifiers&&e.modifiers.prop?"true":"false")+(e.modifiers&&e.modifiers.sync?",true":"")+")"}},cloak:y},da=function(t){this.options=t,this.warn=t.warn||se,this.transforms=ce(t.modules,"transformCode"),this.dataGenFns=ce(t.modules,"genData"),this.directives=h(h({},pa),t.directives);var e=t.isReservedTag||Bn;this.maybeComponent=function(t){return!e(t.tag)},this.onceId=0,this.staticRenderFns=[]},va=(new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b"),new RegExp("\\b"+"delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b")+"\\s*\\([^\\)]*\\)"),function(t){return function(e){function n(n,r){var i=Object.create(e),o=[],a=[];if(i.warn=function(t,e){(e?a:o).push(t)},r){r.modules&&(i.modules=(e.modules||[]).concat(r.modules)),r.directives&&(i.directives=h(Object.create(e.directives||null),r.directives));for(var s in r)"modules"!==s&&"directives"!==s&&(i[s]=r[s])}var c=t(n,i);return c.errors=o,c.tips=a,c}return{compile:n,compileToFunctions:function(t){var e=Object.create(null);return function(n,r,i){(r=h({},r)).warn,delete r.warn;var o=r.delimiters?String(r.delimiters)+n:n;if(e[o])return e[o];var a=t(n,r),s={},c=[];return s.render=Tn(a.render,c),s.staticRenderFns=a.staticRenderFns.map(function(t){return Tn(t,c)}),e[o]=s}}(n)}}}(function(t,e){var n=sn(t.trim(),e);!1!==e.optimize&&function(t,e){t&&(Po=aa(e.staticKeys||""),Fo=e.isReservedTag||Bn,pn(t),dn(t,!1))}(n,e);var r=yn(n,e);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}})(oa).compileToFunctions),ha=!!Gn&&En(!1),ma=!!Gn&&En(!0),ya=p(function(t){var e=Zt(t);return e&&e.innerHTML}),ga=Rt.prototype.$mount;return Rt.prototype.$mount=function(t,e){if((t=t&&Zt(t))===document.body||t===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=ya(r));else{if(!r.nodeType)return this;r=r.innerHTML}else t&&(r=function(t){if(t.outerHTML)return t.outerHTML;var e=document.createElement("div");return e.appendChild(t.cloneNode(!0)),e.innerHTML}(t));if(r){var i=va(r,{shouldDecodeNewlines:ha,shouldDecodeNewlinesForHref:ma,delimiters:n.delimiters,comments:n.comments},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return ga.call(this,t,e)},Rt.compile=va,Rt});



/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/libs/vue-lazyload-1.1.4.js ---- */


/*!
 * Vue-Lazyload.js v1.1.4
 * (c) 2017 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.VueLazyload=t()}(this,function(){"use strict";function e(e,t){if(e.length){var n=e.indexOf(t);return n>-1?e.splice(n,1):void 0}}function t(e,t){if(!e||!t)return e||{};if(e instanceof Object)for(var n in t)e[n]=t[n];return e}function n(e,t){for(var n=!1,r=0,i=e.length;r<i;r++)if(t(e[r])){n=!0;break}return n}function r(e,t){if("IMG"===e.tagName&&e.getAttribute("data-srcset")){var n=e.getAttribute("data-srcset"),r=[],i=e.parentNode,o=i.offsetWidth*t,s=void 0,a=void 0,u=void 0;n=n.trim().split(","),n.map(function(e){e=e.trim(),s=e.lastIndexOf(" "),-1===s?(a=e,u=999998):(a=e.substr(0,s),u=parseInt(e.substr(s+1,e.length-s-2),10)),r.push([u,a])}),r.sort(function(e,t){if(e[0]<t[0])return-1;if(e[0]>t[0])return 1;if(e[0]===t[0]){if(-1!==t[1].indexOf(".webp",t[1].length-5))return 1;if(-1!==e[1].indexOf(".webp",e[1].length-5))return-1}return 0});for(var l="",d=void 0,c=r.length,h=0;h<c;h++)if(d=r[h],d[0]>=o){l=d[1];break}return l}}function i(e,t){for(var n=void 0,r=0,i=e.length;r<i;r++)if(t(e[r])){n=e[r];break}return n}function o(){if(!h)return!1;var e=!0,t=document;try{var n=t.createElement("object");n.type="image/webp",n.style.visibility="hidden",n.innerHTML="!",t.body.appendChild(n),e=!n.offsetWidth,t.body.removeChild(n)}catch(t){e=!1}return e}function s(e,t){var n=null,r=0;return function(){if(!n){var i=Date.now()-r,o=this,s=arguments,a=function(){r=Date.now(),n=!1,e.apply(o,s)};i>=t?a():n=setTimeout(a,t)}}}function a(e){return null!==e&&"object"===(void 0===e?"undefined":c(e))}function u(e){if(!(e instanceof Object))return[];if(Object.keys)return Object.keys(e);var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h="undefined"!=typeof window,f=h&&"IntersectionObserver"in window,v={event:"event",observer:"observer"},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return h&&window.devicePixelRatio||e},g=function(){if(h){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("test",null,t)}catch(e){}return e}}(),y={on:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];g?e.addEventListener(t,n,{capture:r,passive:!0}):e.addEventListener(t,n,r)},off:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];e.removeEventListener(t,n,r)}},b=function(e,t,n){var r=new Image;r.src=e.src,r.onload=function(){t({naturalHeight:r.naturalHeight,naturalWidth:r.naturalWidth,src:r.src})},r.onerror=function(e){n(e)}},m=function(e,t){return"undefined"!=typeof getComputedStyle?getComputedStyle(e,null).getPropertyValue(t):e.style[t]},L=function(e){return m(e,"overflow")+m(e,"overflow-y")+m(e,"overflow-x")},w=function(e){if(h){if(!(e instanceof HTMLElement))return window;for(var t=e;t&&t!==document.body&&t!==document.documentElement&&t.parentNode;){if(/(scroll|auto)/.test(L(t)))return t;t=t.parentNode}return window}},_=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),k={},E=function(){function e(t){var n=t.el,r=t.src,i=t.error,o=t.loading,s=t.bindType,a=t.$parent,u=t.options,d=t.elRenderer;l(this,e),this.el=n,this.src=r,this.error=i,this.loading=o,this.bindType=s,this.attempt=0,this.naturalHeight=0,this.naturalWidth=0,this.options=u,this.filter(),this.initState(),this.performanceData={init:Date.now(),loadStart:null,loadEnd:null},this.rect=n.getBoundingClientRect(),this.$parent=a,this.elRenderer=d,this.render("loading",!1)}return _(e,[{key:"initState",value:function(){this.state={error:!1,loaded:!1,rendered:!1}}},{key:"record",value:function(e){this.performanceData[e]=Date.now()}},{key:"update",value:function(e){var t=e.src,n=e.loading,r=e.error,i=this.src;this.src=t,this.loading=n,this.error=r,this.filter(),i!==this.src&&(this.attempt=0,this.initState())}},{key:"getRect",value:function(){this.rect=this.el.getBoundingClientRect()}},{key:"checkInView",value:function(){return this.getRect(),this.rect.top<window.innerHeight*this.options.preLoad&&this.rect.bottom>this.options.preLoadTop&&this.rect.left<window.innerWidth*this.options.preLoad&&this.rect.right>0}},{key:"filter",value:function(){var e=this;u(this.options.filter).map(function(t){e.options.filter[t](e,e.options)})}},{key:"renderLoading",value:function(e){var t=this;b({src:this.loading},function(n){t.render("loading",!1),e()},function(n){e(),t.options.silent||console.warn("VueLazyload log: load failed with loading image("+t.loading+")")})}},{key:"load",value:function(){var e=this;return this.attempt>this.options.attempt-1&&this.state.error?void(this.options.silent||console.log("VueLazyload log: "+this.src+" tried too more than "+this.options.attempt+" times")):this.state.loaded||k[this.src]?this.render("loaded",!0):void this.renderLoading(function(){e.attempt++,e.record("loadStart"),b({src:e.src},function(t){e.naturalHeight=t.naturalHeight,e.naturalWidth=t.naturalWidth,e.state.loaded=!0,e.state.error=!1,e.record("loadEnd"),e.render("loaded",!1),k[e.src]=1},function(t){e.state.error=!0,e.state.loaded=!1,e.render("error",!1)})})}},{key:"render",value:function(e,t){this.elRenderer(this,e,t)}},{key:"performance",value:function(){var e="loading",t=0;return this.state.loaded&&(e="loaded",t=(this.performanceData.loadEnd-this.performanceData.loadStart)/1e3),this.state.error&&(e="error"),{src:this.src,state:e,time:t}}},{key:"destroy",value:function(){this.el=null,this.src=null,this.error=null,this.loading=null,this.bindType=null,this.attempt=0}}]),e}(),T=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),A="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",$=["scroll","wheel","mousewheel","resize","animationend","transitionend","touchmove"],z={rootMargin:"0px",threshold:0},H=function(u){return function(){function l(e){var t=e.preLoad,n=e.error,r=e.throttleWait,i=e.preLoadTop,a=e.dispatchEvent,u=e.loading,c=e.attempt,h=e.silent,f=e.scale,g=e.listenEvents,y=(e.hasbind,e.filter),b=e.adapter,m=e.observer,L=e.observerOptions;d(this,l),this.version="1.1.4",this.mode=v.event,this.ListenerQueue=[],this.TargetIndex=0,this.TargetQueue=[],this.options={silent:h||!0,dispatchEvent:!!a,throttleWait:r||200,preLoad:t||1.3,preLoadTop:i||0,error:n||A,loading:u||A,attempt:c||3,scale:f||p(f),ListenEvents:g||$,hasbind:!1,supportWebp:o(),filter:y||{},adapter:b||{},observer:!!m,observerOptions:L||z},this._initEvent(),this.lazyLoadHandler=s(this._lazyLoadHandler.bind(this),this.options.throttleWait),this.setMode(this.options.observer?v.observer:v.event)}return T(l,[{key:"config",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this.options,e)}},{key:"performance",value:function(){var e=[];return this.ListenerQueue.map(function(t){e.push(t.performance())}),e}},{key:"addLazyBox",value:function(e){this.ListenerQueue.push(e),h&&(this._addListenerTarget(window),this._observer&&this._observer.observe(e.el),e.$el&&e.$el.parentNode&&this._addListenerTarget(e.$el.parentNode))}},{key:"add",value:function(e,t,i){var o=this;if(n(this.ListenerQueue,function(t){return t.el===e}))return this.update(e,t),u.nextTick(this.lazyLoadHandler);var s=this._valueFormatter(t.value),a=s.src,l=s.loading,d=s.error;u.nextTick(function(){a=r(e,o.options.scale)||a,o._observer&&o._observer.observe(e);var n=Object.keys(t.modifiers)[0],s=void 0;n&&(s=i.context.$refs[n],s=s?s.$el||s:document.getElementById(n)),s||(s=w(e));var c=new E({bindType:t.arg,$parent:s,el:e,loading:l,error:d,src:a,elRenderer:o._elRenderer.bind(o),options:o.options});o.ListenerQueue.push(c),h&&(o._addListenerTarget(window),o._addListenerTarget(s)),o.lazyLoadHandler(),u.nextTick(function(){return o.lazyLoadHandler()})})}},{key:"update",value:function(e,t){var n=this,o=this._valueFormatter(t.value),s=o.src,a=o.loading,l=o.error;s=r(e,this.options.scale)||s;var d=i(this.ListenerQueue,function(t){return t.el===e});d&&d.update({src:s,loading:a,error:l}),this._observer&&this._observer.observe(e),this.lazyLoadHandler(),u.nextTick(function(){return n.lazyLoadHandler()})}},{key:"remove",value:function(t){if(t){this._observer&&this._observer.unobserve(t);var n=i(this.ListenerQueue,function(e){return e.el===t});n&&(this._removeListenerTarget(n.$parent),this._removeListenerTarget(window),e(this.ListenerQueue,n)&&n.destroy())}}},{key:"removeComponent",value:function(t){t&&(e(this.ListenerQueue,t),this._observer&&this._observer.unobserve(t.el),t.$parent&&t.$el.parentNode&&this._removeListenerTarget(t.$el.parentNode),this._removeListenerTarget(window))}},{key:"setMode",value:function(e){var t=this;f||e!==v.observer||(e=v.event),this.mode=e,e===v.event?(this._observer&&(this.ListenerQueue.forEach(function(e){t._observer.unobserve(e.el)}),this._observer=null),this.TargetQueue.forEach(function(e){t._initListen(e.el,!0)})):(this.TargetQueue.forEach(function(e){t._initListen(e.el,!1)}),this._initIntersectionObserver())}},{key:"_addListenerTarget",value:function(e){if(e){var t=i(this.TargetQueue,function(t){return t.el===e});return t?t.childrenCount++:(t={el:e,id:++this.TargetIndex,childrenCount:1,listened:!0},this.mode===v.event&&this._initListen(t.el,!0),this.TargetQueue.push(t)),this.TargetIndex}}},{key:"_removeListenerTarget",value:function(e){var t=this;this.TargetQueue.forEach(function(n,r){n.el===e&&(--n.childrenCount||(t._initListen(n.el,!1),t.TargetQueue.splice(r,1),n=null))})}},{key:"_initListen",value:function(e,t){var n=this;this.options.ListenEvents.forEach(function(r){return y[t?"on":"off"](e,r,n.lazyLoadHandler)})}},{key:"_initEvent",value:function(){var t=this;this.Event={listeners:{loading:[],loaded:[],error:[]}},this.$on=function(e,n){t.Event.listeners[e].push(n)},this.$once=function(e,n){function r(){i.$off(e,r),n.apply(i,arguments)}var i=t;t.$on(e,r)},this.$off=function(n,r){if(!r)return void(t.Event.listeners[n]=[]);e(t.Event.listeners[n],r)},this.$emit=function(e,n,r){t.Event.listeners[e].forEach(function(e){return e(n,r)})}}},{key:"_lazyLoadHandler",value:function(){var e=!1;this.ListenerQueue.forEach(function(t){t.state.loaded||(e=t.checkInView())&&t.load()})}},{key:"_initIntersectionObserver",value:function(){var e=this;f&&(this._observer=new IntersectionObserver(this._observerHandler.bind(this),this.options.observerOptions),this.ListenerQueue.length&&this.ListenerQueue.forEach(function(t){e._observer.observe(t.el)}))}},{key:"_observerHandler",value:function(e,t){var n=this;e.forEach(function(e){e.isIntersecting&&n.ListenerQueue.forEach(function(t){if(t.el===e.target){if(t.state.loaded)return n._observer.unobserve(t.el);t.load()}})})}},{key:"_elRenderer",value:function(e,t,n){if(e.el){var r=e.el,i=e.bindType,o=void 0;switch(t){case"loading":o=e.loading;break;case"error":o=e.error;break;default:o=e.src}if(i?r.style[i]="url("+o+")":r.getAttribute("src")!==o&&r.setAttribute("src",o),r.setAttribute("lazy",t),this.$emit(t,e,n),this.options.adapter[t]&&this.options.adapter[t](e,this.options),this.options.dispatchEvent){var s=new CustomEvent(t,{detail:e});r.dispatchEvent(s)}}}},{key:"_valueFormatter",value:function(e){var t=e,n=this.options.loading,r=this.options.error;return a(e)&&(e.src||this.options.silent||console.error("Vue Lazyload warning: miss src with "+e),t=e.src,n=e.loading||this.options.loading,r=e.error||this.options.error),{src:t,loading:n,error:r}}}]),l}()},O=function(e){return{props:{tag:{type:String,default:"div"}},render:function(e){return!1===this.show?e(this.tag):e(this.tag,null,this.$slots.default)},data:function(){return{el:null,state:{loaded:!1},rect:{},show:!1}},mounted:function(){this.el=this.$el,e.addLazyBox(this),e.lazyLoadHandler()},beforeDestroy:function(){e.removeComponent(this)},methods:{getRect:function(){this.rect=this.$el.getBoundingClientRect()},checkInView:function(){return this.getRect(),h&&this.rect.top<window.innerHeight*e.options.preLoad&&this.rect.bottom>0&&this.rect.left<window.innerWidth*e.options.preLoad&&this.rect.right>0},load:function(){this.show=!0,this.state.loaded=!0,this.$emit("show",this)}}}};return{install:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=H(e),i=new r(n),o="2"===e.version.split(".")[0];e.prototype.$Lazyload=i,n.lazyComponent&&e.component("lazy-component",O(i)),o?e.directive("lazy",{bind:i.add.bind(i),update:i.update.bind(i),componentUpdated:i.lazyLoadHandler.bind(i),unbind:i.remove.bind(i)}):e.directive("lazy",{bind:i.lazyLoadHandler.bind(i),update:function(e,n){t(this.vm.$refs,this.vm.$els),i.add(this.el,{modifiers:this.modifiers||{},arg:this.arg,value:e,oldValue:n},{context:this.vm})},unbind:function(){i.remove(this.el)}})}}});



/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/millchan/00_config.coffee ---- */


(function() {
  var Config;

  Config = class Config {
    constructor() {
      this.update = this.update.bind(this);
      this.userConfig = this.userConfig.bind(this);
      this.anonWIF = 'KxqUqNiJtKkvz5Vz4T92uZyw7n67Vvzm6Wq9nKr4RCbdDKAtrqzk';
      this.address = window.location.pathname.replace(/\//g, '');
      this.domain = "Millchan";
      this.debug = false;
      this.notification_time = 6000;
      this.noroute_redirect = true;
      this.show_edit = true;
      this.show_mention = true;
      this.embed_videos = false;
      this.animate_gifs = false;
      this.user_data_regex = /^data\/(users\/\w{32,34})\/data.json$/;
      this.default_404_image = "static/media.png";
      this.default_video_image = "static/video.png";
      this.default_error_image = "static/error.png";
      this.default_doc_image = "static/doc.png";
      this.default_audio_image = "static/audio.png";
      this.default_spoiler_image = "static/spoiler.png";
      this.logo = "static/logo.png";
      this.pica = {
        alpha: true
      };
      //Routes
      this.home_regex = /^$/;
      this.board_regex = /^\?:(users\/\w{32,34}):(\w+)$/;
      this.thread_regex = /^\?:(users\/\w{32,34}):(\w+):(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/;
      this.page_regex = /^\?:(users\/\w{32,34}):(\w+):(\d+)$/;
      this.catalog_regex = /^\?:(users\/\w{32,34}):(\w+):catalog$/;
      this.edit_regex = /^\?:(users\/\w{32,34}):(\w+):edit$/;
      //Viewer
      this.max_recent_posts = 50;
      this.recent_posts = 5;
      this.max_popular_boards = 100;
      this.popular_boards = 20;
      this.threads_per_page = 15;
      this.max_pages = 15;
      this.posts_preview = 3;
      this.max_blacklist_users = 20;
      this.max_blacklist_posts = 50;
      //Mimetype
      this.mime2ext = {
        'image/gif': ".gif",
        'image/png': ".png",
        'image/jpeg': ".jpg",
        'video/webm': ".webm",
        'video/mp4': ".mp4",
        'audio/ogg': '.ogg',
        'audio/mpeg': '.mp3',
        'application/pdf': '.pdf',
        'application/epub+zip': '.epub'
      };
      this.allowed_image_mimetype = ['image/gif', 'image/png', 'image/jpeg'];
      this.allowed_video_mimetype = ['video/webm', 'video/mp4'];
      this.allowed_audio_mimetype = ['audio/ogg', 'audio/mpeg'];
      this.allowed_doc_mimetype = ['application/pdf', 'application/epub+zip'];
      this.allowed_mimetype = this.allowed_image_mimetype.concat(this.allowed_video_mimetype).concat(this.allowed_audio_mimetype).concat(this.allowed_doc_mimetype);
      //Post-validation
      this.image_src_regex = /^data\/users\/\w{32,34}\/[a-z0-9]{40}-thumb\.(png|jpeg|jpg|gif)$/;
      this.media_source_regex = /^data\/users\/\w{32,34}\/src\/[a-z0-9]{40}\.(png|jpeg|jpg|gif|webm|mp4|ogg|mp3|pdf|epub)$/;
      this.postid_regex = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/;
      this.media_max_width = 200;
      this.media_max_height = 200;
      this.images_preview = 5;
      this.max_body_length = 5000;
      this.max_subject_length = 100;
      this.board_uri_regex = /^[\w]{1,30}$/;

      //Text format
      this.formats = [
        function(str) {
          return str.replace(/'''(.+?)'''/g,
        "<strong>$1</strong>"); //Bold
        },
        function(str) {
          return str.replace(/''(.+?)''/g,
        "<i>$1</i>"); //Italic
        },
        function(str) {
          return str.replace(/__(.+?)__/g,
        "<u>$1</u>"); //Underline
        },
        function(str) {
          return str.replace(/\*\*(.+?)\*\*/g,
        "<span class='spoiler'>$1</span>"); //Spoiler
        },
        function(str) {
          return str.replace(/~~(.+?)~~/g,
        "<span class='strike'>$1</span>"); //Strikethrough
        },
        function(str) {
          return str.replace(/==(.+?)==/g,
        "<span class='heading'>$1</span>"); //Rextext
        },
        function(str) {
          return str.replace(/^(&gt;.+)/gm,
        "<span class='implying'>$1</span>"); //Quote
        },
        function(str) {
          return str.replace(/(?:^- ?.+\s?)+/gm,
        (list) => { //List
            return `<ul>${list.replace(/^- ?(.+\s?)/gm,
        "<li> $1</li>")}</ul>`;
          });
        },
        function(str) {
          return str.replace(/^\[code\]((.|\n)*?)\[\/code\]/gm,
        (match,
        code) => {
            return "<pre>" + code.trim() + "</pre>";
          });
        },
        (str) => {
          return str.replace(new RegExp(`http:\\/\\/127\\.0\\.0\\.1:43110\\/${this.address}\\/\\?:users\\/\\w{32,34}:([\\w]{1,30}):(\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12})(?:#(\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}))?`,
        "g"),
        (match,
        uri,
        thread,
        post) => {
            return `<a href='${match}'>>>>/${uri}/${(post ? post.split('-')[4] : thread.split('-')[4])}</a>`;
          });
        }
      ];
      //Mod actions
      this.action = {
        BL_POST: 0, //Blacklist post
        BL_USER: 1, //Blacklist user
        UNDO_BL_POST: 3, //Remove post from blacklist
        UNDO_BL_USER: 4, //Remove user from blacklist
        STICK: 5, //Stick thread
        UNDO_STICK: 6 //Unstick thread
      };

      //Styles
      this.styles = ["yotsubab.css", "nullchan.css"];
      this.default_theme = "nullchan.css";
      this.enabled_themes = ["style.css", "highlight.css"];
    }

    update(config) {
      var key, results, val;
      results = [];
      for (key in config) {
        val = config[key];
        results.push(this[key] = val);
      }
      return results;
    }

    userConfig(local_config) {
      var defaults, i, key, keys, len;
      keys = ["recent_posts", "popular_boards", "threads_per_page", "posts_preview", "images_preview", "embed_videos", "animate_gifs", "debug"];
      defaults = {};
      for (i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        defaults[key] = local_config[key] || Object(this)[key];
      }
      return defaults;
    }

  };

  window.config = new Config();

}).call(this);


/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/millchan/00_util.coffee ---- */


(function() {
  var Util;

  Util = class Util {
    constructor() {
      this.fileInArray = this.fileInArray.bind(this);
    }

    parseDataUri(string) {
      var error, match, regex;
      try {
        regex = /^data:(image\/png|image\/jpeg|image\/jpg);base64,([\w\/=\+]+)$/;
        match = string.match(regex);
        if (match) {
          match.shift();
          return match;
        }
      } catch (error1) {
        error = error1;
        log(`Error in parseDataUri: ${error}`);
      }
      return [null, null];
    }

    escape(input) {
      return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    validate(posts) {
      var now;
      if (posts) {
        now = new Date();
        return posts.filter(function(post) {
          return post.time < now;
        });
      }
    }

    invert(obj) {
      var key, new_obj, val;
      new_obj = {};
      for (key in obj) {
        val = obj[key];
        new_obj[val] = key;
      }
      return new_obj;
    }

    filter(array) {
      var key, new_array, value;
      new_array = {};
      for (key in array) {
        value = array[key];
        if (value) {
          new_array[key] = value;
        }
      }
      return new_array;
    }

    zip(arr1, arr2) {
      var i, j, new_arr, ref;
      new_arr = [];
//assert arr1.length is arr2.length
      for (i = j = 0, ref = arr1.length; undefined !== 0 && (0 <= ref ? 0 <= j && j < ref : 0 >= j && j > ref); i = 0 <= ref ? ++j : --j) {
        new_arr.push([arr1[i], arr2[i]]);
      }
      return new_arr;
    }

    encode(data) {
      return btoa(unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t'))));
    }

    bytes2Size(bytes) {
      var result;
      if (bytes) {
        result = (function() {
          switch (true) {
            case bytes < 1024:
              return `${Math.floor(bytes)} bytes`;
            case bytes < Math.pow(1024, 2):
              return `${(bytes / 1024).toFixed(2)} KiB`;
            case bytes < Math.pow(1024, 3):
              return `${(bytes / (Math.pow(1024, 2))).toFixed(2)} MiB`;
            default:
              return `${(bytes / (Math.pow(1024, 3))).toFixed(2)} GiB`;
          }
        })();
        return result;
      }
      return null;
    }

    createTime(time) {
      var diff, result, split;
      diff = (new Date() - new Date(time)) / 1000;
      result = (function() {
        switch (true) {
          case diff < 60:
            return `${Math.floor(diff)} second`;
          case diff < 3600:
            return `${Math.floor(diff / 60)} minute`;
          case diff < 86400:
            return `${Math.floor(diff / 3600)} hour`;
          default:
            return `${Math.floor(diff / 86400)} day`;
        }
      })();
      split = result.split(' ');
      if (split[0] === '1') {
        return `${result} ago`;
      } else {
        return `${result}s ago`;
      }
    }

    isSameFile(file1, file2) {
      return file1.name === file2.name && file1.lastModified === file2.lastModified && file1.size === file2.size && file1.type === file2.type;
    }

    fileInArray(new_file, array) {
      var file, j, len;
      for (j = 0, len = array.length; j < len; j++) {
        file = array[j];
        if (this.isSameFile(file, new_file)) {
          return true;
        }
      }
      return false;
    }

    isOnScreen(element) {
      var coors;
      coors = element.getBoundingClientRect();
      return coors.top >= 0 && coors.top + element.clientHeight <= document.documentElement.clientHeight;
    }

    unFormat(html) {
      return html.replace(/<br>/g, '\n').replace(/<u>(.+?)<\/u>/g, "__$1__").replace(/<span class="spoiler">(.+?)<\/span>/g, "**$1**").replace(/<span class="heading">(.+?)<\/span>/g, "==$1==");
    }

  };

  window.util = new Util();

  window.log = function(...args) {
    if (config.debug) {
      return console.log.apply(console, [`[${config.domain}]`].concat(args));
    }
  };

}).call(this);


/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/millchan/00_vue.coffee ---- */


(function() {
  var blMixin, fileMixin, filterMixin, postMixin,
    indexOf = [].indexOf;

  Vue.use(VueLazyload, {
    attempt: 1
  });

  Vue.filter('format', function(body) {
    var escaped, format, i, len, ref;
    if (body) {
      escaped = util.escape(body);
      ref = config.formats;
      for (i = 0, len = ref.length; i < len; i++) {
        format = ref[i];
        escaped = format(escaped);
      }
      escaped = escaped.replace(/\n/g, "<br>");
      return escaped.slice(0, config.max_body_length);
    }
    return null;
  });

  Vue.filter('trim', function(text, length) {
    if (text) {
      if (text.length > length) {
        return text.slice(0, length) + '...';
      }
      return text.slice(0, length);
    }
    return '';
  });

  Vue.filter('unixTodate', function(time) {
    var date;
    date = new Date(time);
    if (date) {
      return `${date.toLocaleDateString()}  ${(date.toGMTString().split(' ')[4])}`;
    } else {
      log(`Invalid date: '${time}'`);
    }
    return null;
  });

  Vue.filter('boardLink', function(board) {
    if (config.board_uri_regex.test(board.uri)) {
      return `?:${board.directory}:${board.uri}:0`;
    }
  });

  postMixin = {
    props: ["blacklist_active"],
    data: function() {
      var data;
      data = {
        max_width: config.media_max_width,
        max_height: config.media_max_height
      };
      return data;
    },
    methods: {
      validateImageSrc: function(dir, src) {
        var source;
        source = `data/users/${dir}/${src}`;
        if (config.image_src_regex.test(source)) {
          return source;
        } else {
          log(`Src '${source}' doesn't match whitelisted src regex`);
          return config.default_error_image;
        }
      },
      validateSource: function(dir, anchor) {
        var source;
        source = `data/users/${dir}/src/${anchor}`;
        if (config.media_source_regex.test(source)) {
          return source;
        } else {
          log(`Anchor '${source}' doesn't match whitelisted anchor regex`);
          return null;
        }
      },
      noImage: function() {
        return config.default_404_image;
      },
      spoilerImage: function() {
        return config.default_spoiler_image;
      },
      videoImage: function() {
        return config.default_video_image;
      },
      docImage: function() {
        return config.default_doc_image;
      },
      audioImage: function() {
        return config.default_audio_image;
      },
      trimSubject: function(subject) {
        if (subject) {
          return subject.slice(0, config.max_subject_length);
        } else {
          return null;
        }
      },
      ID2cite: function(post, body, raw = false) {
        var id_regex;
        if (raw) {
          id_regex = />>(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/g;
        } else {
          id_regex = /&gt;&gt;(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/g;
        }
        if (body) {
          body = body.replace(id_regex, (match, cite) => {
            var href, mention, target;
            if (this.$root._data.post_no && Number.isInteger(this.$root._data.post_no[cite])) {
              href = "#";
              target = this.$root._data.board_posts[cite];
              if (target) {
                href = `/${config.address}/?:${target.directory}:${target.uri}:${(target.thread ? target.thread : target.id)}#${cite}`;
                href = util.escape(href);
              }
              viewer.addReply(post.id, cite);
              if (raw) {
                return `>>${this.$root._data.post_no[cite]}`;
              }
              mention = `<a class='cite' onmouseover='viewer.previewPost(event,"${cite}")' onmouseout='viewer.delPreviewPost("${cite}")' href="${href}">>>${this.$root._data.post_no[cite]}`;
              if (config.show_mention && ((cite in this.$root._data.posts_by_id && this.$root._data.posts_by_id[cite].json_id === this.$root._data.user_json_id) || (cite in this.$root._data.threads_by_id && this.$root._data.threads_by_id[cite].json_id === this.$root._data.user_json_id))) {
                mention += ' (You)';
              }
              mention += '</a>';
              return mention;
            }
            return `>>${(cite.split('-')[4])}`;
          });
        }
        return body;
      },
      isImage: function(mimetype) {
        return indexOf.call(config.allowed_image_mimetype, mimetype) >= 0;
      },
      isVideo: function(mimetype) {
        return indexOf.call(config.allowed_video_mimetype, mimetype) >= 0;
      },
      isAudio: function(mimetype) {
        return indexOf.call(config.allowed_audio_mimetype, mimetype) >= 0;
      },
      isDoc: function(mimetype) {
        return indexOf.call(config.allowed_doc_mimetype, mimetype) >= 0;
      }
    }
  };

  fileMixin = {
    data: function() {
      var data;
      data = {
        loading: true,
        error: false
      };
      return data;
    },
    methods: {
      getInfo: function(file) {
        return `Filename: ${file.name}\nSize: ${util.bytes2Size(file.size)}\nType: ${file.type}`;
      }
    }
  };

  blMixin = {
    props: ["bl_users", "bl_posts"],
    methods: {
      blacklistPost: function(post) {
        return Millchan.modAction(config.action.BL_POST, post.uri, post.id);
      },
      blacklistUser: function(post) {
        return Millchan.modAction(config.action.BL_USER, post.uri, this.$root._data.user_dirs[post.json_id]);
      },
      undoBlacklistPost: function(uri, post_id) {
        return Millchan.modAction(config.action.UNDO_BL_POST, uri, post_id);
      },
      undoBlacklistUser: function(uri, directory) {
        return Millchan.modAction(config.action.UNDO_BL_USER, uri, directory);
      },
      isInUserBlacklist: function(post) {
        return this.$root.isInUserBlacklist(post);
      },
      isInPostBlacklist: function(post) {
        return this.$root.isInPostBlacklist(post);
      },
      isBlackListed: function(post) {
        return this.$root.isBlackListed(post);
      }
    }
  };

  filterMixin = {
    methods: {
      isBlacklisted: function(directory, uri) {
        var blacklisted_board, i, len, ref;
        if (this.$root._data.local_blacklist.boards) {
          ref = this.$root._data.local_blacklist.boards;
          for (i = 0, len = ref.length; i < len; i++) {
            blacklisted_board = ref[i];
            if (`${directory}:${uri}` === blacklisted_board) {
              return true;
            }
          }
        }
        return false;
      },
      filter: function(boards) {
        return boards.filter((board) => {
          return !this.isBlacklisted(board.directory, board.uri);
        });
      }
    }
  };

  Vue.component("logo", {
    template: "<div align='center' class='logo'><a :href='main'><img id='logo' width='140px' height='auto' :src='getLogo()'></a></div>",
    data: function() {
      var data;
      data = {
        main: window.location.pathname,
        domain: window.config.domain
      };
      return data;
    },
    methods: {
      getLogo: function() {
        return config.logo;
      }
    }
  });

  Vue.component("mclink", {
    template: "<footer> <a href='https://gitgud.io/mcdev/Millchan'>Millchan engine</a> </footer>"
  });

  Vue.component("user-cert", {
    props: ["userid"],
    template: "<span v-if='userid'> <a class='selectedUser' @click='Millchan.selectUser()' href='javascript:void(0)'>{{userid}}</a> </span>"
  });

  Vue.component("create-form", {
    props: ["userid"],
    template: "<form @submit.prevent='createBoard'> <table> <tr> <td>URI</td> <td>/<input id='board_uri'>/</td> </tr> <tr> <td>Title</td> <td><input id='board_title'></td> </tr> <tr> <td align='center' colspan='2'><user-cert :userid='userid'></user-cert></td> </tr> <tr> <td align='center' colspan='2'><input class='create' type='submit' value='Create!'></td> </tr> </table> </form>",
    methods: {
      createBoard: function() {
        return Millchan.createBoard();
      }
    }
  });

  Vue.component("reply-form", {
    props: ['userid', 'directory', 'uri', 'thread', 'post_no', 'addclose', 'submit'],
    mixins: [postMixin],
    data: function() {
      var data;
      data = {
        moving: false,
        left: 0,
        top: 0,
        files: [],
        maxlength: config.max_body_length,
        body: '',
        preview: false
      };
      return data;
    },
    template: "<form :style='{right: left ? null : 0, bottom: top ? null : 0, left: left ? left + \"px\" : null,top:top ? top + \"px\" : null}'  @mousedown='enableMove' @submit.prevent='submitPost'> <table> <input type='hidden' id='post_dir' v-bind:value='directory'> <input type='hidden' id='post_uri' v-bind:value='uri'> <input type='hidden' id='post_threadid' v-bind:value='thread'> <input type='hidden' id='post_no' v-bind:value='JSON.stringify(post_no)'> <tr v-if='body.length'> <td v-if='!preview' class='draggable' align='center' colspan='2'><button style='color:#9B9BBD' @click='preview = !preview' type='button' class='action'>[Preview]</button></td> <td v-else class='draggable' align='center' colspan='2'><button @click='preview = !preview' style='color:#9B9BBD' type='button' class='action'>[-Preview]</button></td> </tr> <tr v-if='$root.is_user_board'> <td class='draggable'>Capcode</td> <td><input type='checkbox' id='post_capcode'></td> </tr> <tr> <td class='draggable'>Subject</td> <td><input type='text' id='post_subject'><input v-if='addclose' class='close' type='button' @click='close'></td> </tr> <tr> <td class='draggable'>Body</td> <td v-if='!preview'><textarea v-model='body' :maxlength='maxlength' id='post_body'></textarea></td> <td v-if='preview'><blockquote v-model='body' class='preview' v-html='ID2cite(null,$options.filters.format(body),false)'></blockquote></td> </tr> <tr> <td class='draggable' align='center' colspan='2' style='font-size:11px;'> {{body.length}}/{{maxlength}} </td> </tr> <tr> <td class='draggable'>Files</td> <td align='center'><input @change='updateFilelist' ref='images' type='file' id='post_files' :accept='allowed_mimetype()' multiple></td> </tr> <tr v-if='files.length'> <td align='center' colspan='2'><div id='files-container'><div class='selected_file' v-for='file in files'><input v-if='isImage(file.type)' @change='file.spoiler = $event.target.checked' type='checkbox' :checked='file.spoiler' title='Spoiler?'><button class='action' title='Remove file' href='javascript:void(0)' @click.prevent='removeFile(file)'>[X]</button> <img class='thumb_preview' v-if='isImage(file.type)' :src='makeBlob(file)'><span :title='file.name'>{{file.name|trim(20)}}</span></div></div></td> </tr> <tr> <td class='draggable' align='center' colspan='2'><user-cert :userid='userid'></user-cert></td> </tr> <tr> <td class='draggable' align='center' colspan='2'><input class='create' type='submit' :value='submit'></td> </tr> </table> </form>",
    methods: {
      makeBlob: function(image) {
        return URL.createObjectURL(image);
      },
      updateFilelist: function(event) {
        var canvas, data, file, i, len, ref;
        //Popup canvas fingerprint prompt on Tor
        canvas = document.createElement("canvas");
        data = canvas.toDataURL();
        if (event.target.files) {
          ref = event.target.files;
          for (i = 0, len = ref.length; i < len; i++) {
            file = ref[i];
            if (!util.fileInArray(file, this._data.files)) {
              this._data.files.push(file);
            }
          }
          return this.$refs.images.value = '';
        }
      },
      removeFile: function(file) {
        return this._data.files.splice(this._data.files.indexOf(file), 1);
      },
      submitPost: function() {
        viewer.setPosting(true);
        Millchan.makePost(this._data.files, this._data.body);
        return this._data.files = [];
      },
      allowed_mimetype: function() {
        return config.allowed_mimetype.join(',');
      },
      selectUser: function() {
        return Millchan.selectUser();
      },
      close: function() {
        return this.$root._data.show_quick_reply = false;
      },
      enableMove: function(event) {
        if (event.target.tagName === "TD" && indexOf.call(event.target.classList, "draggable") >= 0 && this._props.addclose) {
          event.preventDefault();
          return this._data.moving = true;
        }
      }
    },
    mounted: function() {
      //Quote post used to open box
      if (this.$root._data.selected_post) {
        this._data.body = `>>${this.$root._data.selected_post}\n`;
        if (this.$root._data.selected_post_quote) {
          return this._data.body += `>${this.$root._data.selected_post_quote}\n`;
        }
      }
    }
  });

  Vue.component("div-thread", {
    mixins: [postMixin, blMixin],
    props: ["thread", "post_no", "is_user_board", "blacklist_active"],
    data: function() {
      var data;
      data = {
        display: [],
        hidden: false,
        filtered: []
      };
      return data;
    },
    template: "<div> <div-post :blacklist_active='blacklist_active' :bl_users='bl_users' :bl_posts='bl_posts' :is_user_board='is_user_board' :post='thread' :key='thread.id' :post_no='post_no[thread.id]'></div-post> <div v-if='hidden'> <a class='toggle-replies' href='javascript:void(0)' @click='changeDisplay()'> {{ omittedMessage() }} </a> </div> <div-post :blacklist_active='blacklist_active' :bl_users='bl_users' :bl_posts='bl_posts' :is_user_board='is_user_board' v-for='reply in display' :key='reply.id' :post='reply' :post_no='post_no[reply.id]' :ref='reply.id'></div-post> <hr class='thread-separator'> </div>",
    mounted: function() {
      if (this._props.thread.replies) {
        this._data.filtered = this._props.thread.replies.filter((reply) => {
          return !this.isBlackListed(reply);
        });
      }
      this.setDisplay();
      return this.setHidden();
    },
    watch: {
      blacklist_active: function(active) {
        this.setDisplay();
        return this.setHidden();
      },
      thread: function(updated_thread) {
        if (updated_thread.replies) {
          this._data.filtered = updated_thread.replies.filter((reply) => {
            return !this.isBlackListed(reply);
          });
        }
        this.setDisplay();
        return this.setHidden();
      }
    },
    methods: {
      setDisplay: function() {
        if (this._props.thread.replies) {
          if (this._props.blacklist_active) {
            return this._data.display = this._data.filtered.slice(-config.posts_preview);
          } else {
            return this._data.display = this._props.thread.replies.slice(-config.posts_preview);
          }
        }
      },
      setHidden: function() {
        var replies;
        replies = [];
        if (this._props.thread.replies) {
          if (this._props.blacklist_active) {
            replies = this._data.filtered;
          } else {
            replies = this._props.thread.replies;
          }
        }
        if (replies.length && replies.length > config.posts_preview && this._data.display.length) {
          return this._data.hidden = replies.length - config.posts_preview;
        } else {
          return this._data.hidden = 0;
        }
      },
      omittedMessage: function() {
        if (this._data.display.length !== this._props.thread.replies.length) {
          return `${this._data.hidden} omitted posts. Click to expand`;
        } else {
          return "Hide expanded replies";
        }
      },
      changeDisplay: function() {
        if (this._props.thread.replies) {
          if (this._props.blacklist_active) {
            if (this._data.display.length === this._props.thread.replies.length) {
              return this._data.display = this._data.filtered.slice(-config.posts_preview);
            } else {
              return this._data.display = this._data.filtered;
            }
          } else {
            if (this._data.display.length === this._props.thread.replies.length) {
              return this._data.display = this._props.thread.replies.slice(-config.posts_preview);
            } else {
              return this._data.display = this._props.thread.replies;
            }
          }
        }
      }
    }
  });

  Vue.component("div-post", {
    mixins: [postMixin, blMixin],
    props: ["post", "post_no", "inthread", "is_user_board"],
    data: function() {
      var data;
      data = {
        hidden_files: 0,
        show_all_files: false,
        replies: [],
        editing: false,
        time: null,
        viewer: window.viewer
      };
      return data;
    },
    template: "<div v-if='!blacklist_active || !isBlackListed(post,bl_users,bl_posts)' class='reply' :class='{op : post.thread ? false : true, inthread : inthread ? true : false, blacklisted: isBlackListed(post)}'> <div class='post-info'> <span class='post-subject'>{{trimSubject(post.subject)}}</span> <span v-if='post.capcode && $root.dir == $root._data.user_dirs[post.json_id]' class='post-capcode'>## Board Owner</span> <span v-else class='post-name'>Anonymous</span> <span class='post-date'>{{post.time|unixTodate}}</span> <button v-if='inthread' @click='activateQuickReply(post_no)' class='action'> <span v-if='inthread' class='post-id' :id='post.id'>{{postID(post_no)}}</span> </button> <a v-else :href='createlink(post)' class='post-link'> <span class='post-id' :id='post.id'>{{postID(post_no)}}</span> </a> <span class='mod_tools'> <span v-if='post.sticky' class='sticky'>sticky</span> <button title='Mute user and delete content' @click='muteUser(post)' class='action'>[M]</button> <button v-if='is_user_board && !post.thread && !post.sticky' title='Stick thread' @click='stickThread(post)' class='action'>[S]</button> <button v-if='is_user_board && !post.thread && post.sticky' title='Unstick thread' @click='unstickThread(post)' class='action'>[-S]</button> <button v-if='is_user_board && isInPostBlacklist(post)' title='Undo post blacklist' @click='undoBlacklistPost(post.uri,post.id)' class='action'>[-D]</button> <button v-else-if='is_user_board' title='Blacklist post' @click='blacklistPost(post)' class='action'>[D]</button> <button v-if='is_user_board && isInUserBlacklist(post)' title='Undo user blacklist' @click='undoBlacklistUser(post.uri,$root._data.user_dirs[post.json_id])' class='action'>[-B]</button> <button v-else-if='is_user_board' title='Blacklist user' @click='blacklistUser(post)' class='action'>[B]</button> <button v-if='isUserPost(post.json_id) && !editing' title='Edit post' @click='editing = !editing' class='action'>[E]</button> <button v-if='isUserPost(post.json_id) && editing' title='Edit post' @click='editing = !editing' class='action'>[-E]</button> </span> <a v-if='!post.thread && !inthread' class='reply-link' :href='createlink(post)'>[Reply]</a> </div> <div class='post-files'> <template v-if='!show_all_files' v-for='file in getFilesPreview(post.files)''> <div-file :file='file' :key='fileKey(file)'></div-file> </template> <template v-if='show_all_files' v-for='file in getAllFiles(post.files)'> <div-file :file='file' :key='fileKey(file)'></div-file> </template> </div> <div> <a class='file-expand' @click='show_all_files = !show_all_files' href='javascript:void(0)' v-if='hidden_files && show_all_files'>Hide expanded files</a> <a class='file-expand' @click='show_all_files = !show_all_files' href='javascript:void(0)' v-if='hidden_files && !show_all_files'>{{hidden_files}} hidden files. Click to expand</a> </div> <div class='post-body'> <textarea v-if='editing' ref='new_body' class='edit-body'>{{ID2cite(post,post.body,true)}}</textarea > <blockquote ref='post_body' v-else class='post-message' v-html='ID2cite(post,$options.filters.format(post.body))'> </blockquote> </div> <input v-if='editing' type='button' value='Edit' @click='editPost(post.id)'> <div v-if='$root.replies[post.id] && (post.thread || inthread)' class='post-replies'> Replies: <span v-for='reply_id in $root.replies[post.id]'><a class='cite' :href='linkReply(post,reply_id)' @mouseover='viewer.previewPost($event,reply_id)' @mouseout='viewer.delPreviewPost(reply_id)'>>>{{$root._data.post_no[reply_id]}}</a></span> </div> <div v-if='post.last_edited && time' class='edited' :title='post.last_edited|unixTodate'>Last edited: {{time}}</div> </div>",
    mounted: function() {
      var codeblock, i, len, ref, results;
      this.$forceUpdate();
      if (this._props.post.last_edited) {
        this.createTimeWatcher();
      }
      ref = this.$refs.post_body.getElementsByTagName("pre");
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        codeblock = ref[i];
        codeblock.innerHTML = util.unFormat(codeblock.innerHTML);
        results.push(hljs.highlightBlock(codeblock));
      }
      return results;
    },
    updated: function() {
      var codeblock, i, len, ref, results;
      if (this._props.post.last_edited && !this._data.time) {
        this.createTimeWatcher();
      }
      if (this.$refs.post_body) {
        ref = this.$refs.post_body.getElementsByTagName("pre");
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          codeblock = ref[i];
          codeblock.innerHTML = util.unFormat(codeblock.innerHTML);
          results.push(hljs.highlightBlock(codeblock));
        }
        return results;
      }
    },
    methods: {
      muteUser: function(post) {
        var auth_address, cert, user_dir;
        user_dir = this.$root._data.user_dirs[post.json_id];
        auth_address = user_dir.split('/')[1];
        cert = `${auth_address.slice(0, 15)}@${config.domain.toLowerCase()}`;
        return Millchan.killUser(auth_address, cert, user_dir);
      },
      createTimeWatcher: function() {
        this._data.time = util.createTime(this._props.post.last_edited);
        return setInterval((() => {
          return this._data.time = util.createTime(this._props.post.last_edited);
        }), 10000);
      },
      editPost: function(post_id) {
        this._data.editing = false;
        return Millchan.editPost(post_id, this.$refs.new_body.value, this.$root.post_no);
      },
      isUserPost: function(json_id) {
        return config.show_edit && this.$root._data.user_json_id === json_id;
      },
      fileKey: function(file) {
        return `${file.thumb}-${file.original}`;
      },
      linkReply: function(post, post_id) {
        return `?:${post.directory}:${post.uri}:${(post.thread ? post.thread : post.id)}#${post_id}`;
      },
      getFilesPreview: function(files) {
        var parsed;
        parsed = JSON.parse(files);
        this._data.hidden_files = Math.max(0, parsed.length - config.images_preview);
        return parsed.slice(0, config.images_preview);
      },
      getAllFiles: function(files) {
        var parsed;
        parsed = JSON.parse(files);
        return parsed;
      },
      stickThread: function(post) {
        return Millchan.modAction(config.action.STICK, post.uri, post.id);
      },
      unstickThread: function(post) {
        return Millchan.modAction(config.action.UNDO_STICK, post.uri, post.id);
      },
      activateQuickReply: function(post_no) {
        this.$root._data.show_quick_reply = true;
        if (this.$root.$refs.quickreply === void 0) {
          this.$root._data.selected_post = post_no;
          return this.$root._data.selected_post_quote = window.getSelection().toString();
        } else {
          return this.$root.$refs.quickreply._data.body += `>>${post_no}\n`;
        }
      },
      postID: function(post_no) {
        if (post_no) {
          return `No. ${post_no}`;
        }
      },
      getThumbs: function(post) {
        var files, i, image, len, ref;
        if (post.files) {
          files = [];
          ref = post.files.split(',');
          for (i = 0, len = ref.length; i < len; i++) {
            image = ref[i];
            files.push(image.split(':'));
          }
          return files.slice(0, config.images_preview);
        }
        return [];
      },
      createlink: function(post) {
        if (post.thread) {
          return `?:${post.directory}:${post.uri}:${post.thread}#${post.id}`;
        } else {
          return `?:${post.directory}:${post.uri}:${post.id}`;
        }
      }
    }
  });

  Vue.component("file-info", {
    mixins: [postMixin],
    props: ["file", "dim"],
    data: function() {
      var data;
      data = {
        bytes2Size: util.bytes2Size
      };
      return data;
    },
    template: "<div class='file-info'><a :title='getTitle(file.name)' :href='validateSource(file.directory,file.original)' @click.prevent='downloadAsOriginal(file)'>{{file.name|trim(100)}}</a> ({{bytes2Size(file.size)}}{{dim}})</div>",
    methods: {
      downloadAsOriginal: function(file) {
        return Millchan.cmd("fileGet", {
          "inner_path": this.validateSource(file.directory, file.original),
          "required": false,
          "format": "base64"
        }, (b64data) => {
          var anchor, data;
          if (b64data.length) {
            data = `data:${file.type};base64,${b64data}`;
            anchor = document.createElement("a");
            anchor.download = file.name;
            anchor.href = data;
            document.body.appendChild(anchor);
            anchor.click();
            return document.body.removeChild(anchor);
          }
        });
      },
      getTitle: function(filename) {
        return `Download with original filename (${filename})`;
      }
    }
  });

  Vue.component("div-file", {
    mixins: [postMixin, fileMixin],
    props: ["file"],
    data: function() {
      var data;
      data = {
        full_image: false,
        image_dim: '',
        image_source: this._props.file.spoiler ? this.spoilerImage() : this._props.file.type === "image/gif" && config.animate_gifs ? this.validateSource(this._props.file.directory, this._props.file.original) : this.validateImageSrc(this._props.file.directory, this._props.file.thumb),
        embed_video: config.embed_videos
      };
      return data;
    },
    template: "<span> <template v-if='isImage(file.type)'> <file-info :file=file :dim='image_dim'></file-info> <a @click.prevent='expandImage()' :href='validateSource(file.directory,file.original)'> <img v-if='file.spoiler' @load='setDimentions()' :style='{width: !full_image ? 150 + \"px\" : null, height: !full_image ? 150 + \"px\" : null}' ref='image' :class='{full_image: full_image, static: !full_image}' v-lazy='image_source'> <img v-else-if='file.thumb' @load='setDimentions()' ref='image' :class='{full_image: full_image}' v-lazy='image_source'> <img v-else @load='updateHeight()' v-lazy='noImage()'> </a> </template> <template v-else-if='isVideo(file.type)'> <file-info :file=file></file-info> <video v-if='embed_video' :height='max_height' controls loop> <source :src='validateSource(file.directory,file.original)' :type='file.type'> Your browser does not support the video tag </video> <a v-else target='_blank' @click.prevent='embed_video = true' :href='validateSource(file.directory,file.original)'> <img width='150px' class='static' @load='updateHeight()' v-lazy='videoImage()'> </a> </template> <template v-else-if='isAudio(file.type)'> <file-info :file=file></file-info> <div style='display: grid'> <img style='margin: 0 auto; padding: 12px;' width='150px' class='static' @load='updateHeight()' v-lazy='audioImage()'> <audio controls> <source :src='validateSource(file.directory,file.original)' :type='file.type'> Your browser does not support the audio tag </audio> </div> </template> <template v-else-if='isDoc(file.type)'> <file-info :file=file></file-info> <a target='_blank' :href='validateSource(file.directory,file.original)'> <img width='150px' class='static' @load='updateHeight()' v-lazy='docImage()'> </a> </template> </span>",
    methods: {
      expandImage: function() {
        if (this._data.full_image) {
          if (this._props.file.spoiler) {
            this._data.image_source = this.spoilerImage();
            this.$refs.image.src = this.spoilerImage();
          } else {
            if (this._props.file.type === "image/gif" && config.animate_gifs) {
              this._data.image_source = this.validateSource(this._props.file.directory, this._props.file.original);
              this.$refs.image.src = this.validateSource(this._props.file.directory, this._props.file.original);
            } else {
              this._data.image_source = this.validateImageSrc(this._props.file.directory, this._props.file.thumb);
              this.$refs.image.src = this.validateImageSrc(this._props.file.directory, this._props.file.thumb);
            }
          }
        } else {
          this._data.image_source = this.validateSource(this._props.file.directory, this._props.file.original);
        }
        return this._data.full_image = !this._data.full_image;
      },
      updateHeight: function() {
        var error;
        try {
          if (this.$parent.$parent.clientHeight !== this.$parent.$parent.$refs.post_preview.$el.clientHeight) {
            return this.$parent.$parent.clientHeight = this.$parent.$parent.$refs.post_preview.$el.clientHeight;
          }
        } catch (error1) {
          error = error1;
          return {};
        }
      },
      setDimentions: function() {
        this.updateHeight();
        return this._data.image_dim = this.$refs.image && this._data.full_image && this.$refs.image.naturalWidth * this.$refs.image.naturalHeight > 1 ? ` ${this.$refs.image.naturalWidth}x${this.$refs.image.naturalHeight}` : "";
      }
    }
  });

  Vue.component("recent-posts", {
    props: ["posts", "post_no"],
    mixins: [filterMixin],
    data: function() {
      var data;
      data = {
        start_len: config.recent_posts,
        display_len: config.recent_posts,
        display: []
      };
      return data;
    },
    template: "<div> <span class='home-info'>Recent posts</span> <recent-post v-for='post in display' :key='post.id' :post='post' :post_no='post_no[post.id]'></recent-post> <button class='recent-button' v-if='hasMore()' @click='display_len += start_len'>Load more</button><br> <button class='recent-button' v-if='display_len > start_len' @click='display_len = start_len'>Hide expanded</button> </div>",
    mounted: function() {
      return this._data.display = this.filter(this._props.posts).slice(0, this._data.display_len);
    },
    watch: {
      display_len: function(new_value) {
        return this._data.display = this.filter(this._props.posts).slice(0, new_value);
      },
      posts: function() {
        return this._data.display = this.filter(this._props.posts).slice(0, this._data.display_len);
      }
    },
    methods: {
      hasMore: function() {
        return this._data.display.length < this.filter(this._props.posts).length;
      }
    }
  });

  Vue.component("recent-post", {
    props: ["post", "post_no"],
    data: function() {
      var data;
      data = {
        show_preview: false,
        post_x: null,
        post_y: null,
        time: null
      };
      return data;
    },
    template: "<div class='recent-post'> <span @mouseover='showPreview' @mouseout ='show_preview = false' class='recent-link'><a :href='postLink(post)'>{{postDisplay(post,post_no)}}</a><post-preview v-if='show_preview' :preview_post='post' :post_no='post_no'></post-preview></span> <span :title='getLocale(post)' class='recent-time'>{{time}}</span> </div>",
    mounted: function() {
      this._data.time = util.createTime(this._props.post.time);
      return setInterval((() => {
        return this._data.time = util.createTime(this._props.post.time);
      }), 5000);
    },
    methods: {
      showPreview: function(event) {
        this._props.post.X = event.clientX;
        this._props.post.Y = event.clientY;
        return this.show_preview = true;
      },
      postLink: function(post) {
        return `?:${post.directory}:${post.uri}:${(post.thread ? post.thread : post.id)}#${post.id}`;
      },
      postDisplay: function(post, post_no) {
        return `>>>/${post.uri}/${post_no}`;
      },
      getLocale: function(post) {
        var time;
        time = new Date(post.time);
        return time.toLocaleString();
      }
    }
  });

  Vue.component("popular-boards", {
    props: ["boards"],
    mixins: [filterMixin],
    data: function() {
      var data;
      data = {
        display: [],
        display_len: config.popular_boards
      };
      return data;
    },
    template: "<table> <tr> <!--<th class='home-userID' title='Owner ID'>ID</th>--> <th>URI</th> <th>Title</th> <th>Total posts</th> </tr> <tr v-for='board in display' v-if='board.directory'> <!--<td class='home-userID'><button title='Mute user and delete content' @click='muteUser(board)' class='action blacklist'>{{getUID(board.directory)}}</button></td>--> <td><a :href='board|boardLink'>{{boardTarget(board)}}</a></td> <td v-if='board.title && board.title.length'>{{board.title|trim(100)}}<!--<button title='Blacklist board' class='action blacklist' @click='Millchan.blacklistBoard(board.directory,board.uri)'>{{board.title|trim(100)}}</button>--></td> <td v-else><button title='Blacklist board' class='action blacklist' @click='Millchan.blacklistBoard(board.directory,board.uri)'>???</button></td> <td>{{board.total_posts}}</td> </tr> <tr v-if='boards.length > display.length && filter(boards).length > display.length'> <td align='center' colspan='4'> <a href='javascript:void(0)' @click.prevent='display = filter(boards)'>{{filter(boards).length-display.length}} omitted board{{boards.length-display.length > 1 ? 's' : ''}}. Click to expand</a> </td> </tr> <tr v-else> <td align='center' colspan='4'> <a href='javascript:void(0)' @click.prevent='display = filter(boards).slice(0,display_len)'>Hide expanded boards</a> </td> </tr> </table>",
    methods: {
      getUID: function(dir) {
        return dir.split('/')[1];
      },
      boardTarget: function(board) {
        if (config.board_uri_regex.test(board.uri)) {
          return `/${board.uri}/`;
        }
      },
      muteUser: function(board) {
        var auth_address, cert;
        auth_address = board.directory.split('/')[1];
        cert = `${auth_address.slice(0, 15)}@${config.domain.toLowerCase()}`;
        return Millchan.killUser(auth_address, cert, board.directory);
      }
    },
    mounted: function() {
      return this._data.display = this.filter(this._props.boards).slice(0, this._data.display_len);
    },
    watch: {
      boards: function(updated_boards) {
        updated_boards = this.filter(updated_boards);
        if (this._data.display.length === this._data.display_len) {
          return this._data.display = updated_boards.slice(0, this._data.display_len);
        } else {
          return this._data.display = updated_boards;
        }
      }
    }
  });

  Vue.component("posts-wrapper", {
    //Workaround to make url hash redirection work
    props: ["posts", "post_no", "is_user_board", "bl_users", "bl_posts", "blacklist_active"],
    template: "<div> <div-post v-for='post in posts' :ref='post.id' :blacklist_active='blacklist_active' :bl_users='bl_users' :bl_posts='bl_posts' :is_user_board='is_user_board' :inthread='true' :key='post.id' :post_no='post_no[post.id]' :post='post'>{{loaded}}</div-post> </div>",
    computed: {
      loaded: function() {
        setTimeout((function() {
          return Millchan.cmd("wrapperInnerLoaded");
        }), 500);
        return null;
      }
    }
  });

  Vue.component("catalog-thread", {
    mixins: [postMixin, fileMixin, blMixin],
    data: function() {
      var data;
      data = {
        file: {}
      };
      return data;
    },
    props: ["thread"],
    template: "<div class='catalog-thread'> <a :href='treadlink(thread)' class='thread-link'> <div class='post-files'> <img v-if='isImage(file.type) && file.spoiler' width='160px' class='static' v-lazy='spoilerImage()' title='Spoiler'> <img v-else-if='isImage(file.type)' v-lazy='validateImageSrc(file.directory,file.thumb)' :title='getInfo(file)'> <img v-else-if='isVideo(file.type)' :title='getInfo(file)' width='160px' class='static' v-lazy='videoImage()'> <img v-else-if='isAudio(file.type)' :title='getInfo(file)' width='160px' class='static' v-lazy='audioImage()'> <img v-else-if='isDoc(file.type)' :title='getInfo(file)' width='160px' class='static' v-lazy='docImage()'> <img v-else :width='max_width' v-lazy='noImage()'> </div> </a> <div class='thread-stats'> <span title='Number of replies'>R: {{thread.replies ? thread.replies.length : 0}}</span> / <span title='Current page'>P: {{calcPage(thread.thread_no)}}</span> <span v-if='thread.sticky'>/ sticky</span> </div> <div class='post-info'> <span class='post-subject'>{{trimSubject(thread.subject)}}</span> </div> <div class='post-body'> <blockquote ref='post_body' class='post-message' v-html='ID2cite(thread,$options.filters.format(thread.body))'> </blockquote> </div> </div>",
    mounted: function() {
      var codeblock, i, len, ref, results;
      ref = this.$refs.post_body.getElementsByTagName("pre");
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        codeblock = ref[i];
        codeblock.innerHTML = util.unFormat(codeblock.innerHTML);
        results.push(hljs.highlightBlock(codeblock));
      }
      return results;
    },
    created: function() {
      var parsedFiles;
      parsedFiles = JSON.parse(this.thread.files);
      if (parsedFiles.length) {
        this._data.file = parsedFiles[0];
        return log(this._data.file.directory, this._data.file.thumb);
      }
    },
    methods: {
      treadlink: function(thread) {
        return `?:${thread.directory}:${thread.uri}:${thread.id}`;
      },
      calcPage: function(thread_no) {
        return Math.floor(thread_no / config.threads_per_page) + 1;
      }
    }
  });

  Vue.component("bl-users", {
    props: ["bl_users"],
    mixins: [blMixin],
    template: "<table> <tr> <th>User dir</th> <th>Board</th> <th>Date</th> </tr> <tr v-for='bl_user in getblacklistedUsers(bl_users)'> <td><a title='Remove from blacklist' href='javascript:void(0)' @click='undoBlacklistUser(bl_user.uri,bl_user.info)'>{{bl_user.info}}</a></td> <td><a :href='bl_user|boardLink'>/{{bl_user.uri}}/</a></td> <td>{{bl_user.time|unixTodate}}</td> </tr> </table>",
    methods: {
      getblacklistedUsers: function(bl_users) {
        return bl_users.slice(0, config.max_blacklist_users);
      }
    }
  });

  Vue.component("bl-posts", {
    props: ["bl_posts"],
    mixins: [blMixin],
    template: "<table> <tr> <th>Post ID</th> <th>Board</th> <th>Date</th> </tr> <tr v-for='bl_post in getblacklistedPosts(bl_posts)'> <td><a title='Remove from blacklist' href='javascript:void(0)' @click='undoBlacklistPost(bl_post.uri,bl_post.info)'>{{bl_post.info}}</a></td> <td><a :href='bl_post|boardLink'>/{{bl_post.uri}}/</a></td> <td>{{bl_post.time|unixTodate}}</td> </tr> </table>",
    methods: {
      getblacklistedPosts: function(bl_posts) {
        return bl_posts.slice(0, config.max_blacklist_posts);
      }
    }
  });

  Vue.component("options", {
    props: ['dir', 'uri', 'blacklist_active'],
    template: "<span> <input ref='check' @change='updateLocalStorage(dir,uri)' type='checkbox' :checked='blacklist_active'> <label class='blacklist-toggle'>Enable blacklist</label> </span>",
    methods: {
      updateLocalStorage: function(dir, uri) {
        return Millchan.cmd("wrapperGetLocalStorage", [], (local_storage) => {
          if (local_storage == null) {
            local_storage = {};
          }
          local_storage[`blacklist:${dir}:${uri}`] = this.$refs.check.checked;
          Millchan.cmd("wrapperSetLocalStorage", local_storage);
          return Millchan.urlRoute();
        });
      }
    }
  });

  Vue.component("styles", {
    data: function() {
      var data;
      data = {
        styles: [],
        selected: null
      };
      return data;
    },
    template: "<span> <select style='float:right' id='styles' @change='changeStyle($event.target.value)'> <option v-for='style in styles' :selected='selected === style'>{{style}}</option> </select> </span>",
    mounted: function() {
      var css, i, len, ref;
      ref = config.styles;
      for (i = 0, len = ref.length; i < len; i++) {
        css = ref[i];
        this._data.styles.push(css);
      }
      return this._data.selected = Millchan.style;
    },
    methods: {
      changeStyle: (css) => {
        var i, len, ref, ref1, style;
        ref = window.document.styleSheets;
        for (i = 0, len = ref.length; i < len; i++) {
          style = ref[i];
          if (indexOf.call(style.href.split('/'), css) >= 0) {
            style.disabled = false;
          } else if (ref1 = style.href.split('/')[5], indexOf.call(config.enabled_themes, ref1) < 0) {
            style.disabled = true;
          }
        }
        return Millchan.cmd("wrapperGetLocalStorage", [], function(local_storage) {
          if (local_storage == null) {
            local_storage = {};
          }
          local_storage["style"] = css;
          return Millchan.cmd("wrapperSetLocalStorage", local_storage);
        });
      }
    }
  });

  Vue.component("post-preview", {
    props: ["preview_post", "post_no"],
    data: function() {
      var data;
      data = {
        post_x: 0,
        post_y: 0,
        clientHeight: 0
      };
      return data;
    },
    template: "<div-post class='post_preview' ref='post_preview' :style='{left: post_x + \"px\", top: post_y + \"px\"}' :post='preview_post' :post_no='post_no'></div-post>",
    mounted: function() {
      return this._data.clientHeight = this.$el.clientHeight;
    },
    watch: {
      clientHeight: function(new_height) {
        if (this._props.preview_post.Y - new_height < 0) {
          this._data.post_y = 0;
        } else if (this._props.preview_post.Y + new_height > window.document.body.clientHeight - 100) {
          this._data.post_y = window.document.body.clientHeight - new_height - 100;
        } else {
          this._data.post_y = this._props.preview_post.Y;
        }
        return this._data.post_x = this._props.preview_post.X;
      }
    }
  });

  Vue.component("overlay", {
    template: "<div class='overlay-mask'> <div class='overlay-content'>Processing post...<br/>Please wait.</div> </div>"
  });

  Vue.component("user-menu", {
    template: "<div class='overlay-mask'> <div class='overlay-content'> <div id='menu-content'> <form @submit.prevent='save'> <fieldset> <legend>Options</legend> <div style='font-size:11px;color:black;' v-for='value,key in $root._data.local_storage.config'> {{prettify(key)}}:<input v-if='Number.isInteger($root._data.local_storage.config[key])' type='number' :value='value' @change='$root._data.local_storage.config[key] = parseInt($event.target.value)'> <input v-else type='checkbox' :value='value' :checked='$root._data.local_storage.config[key]' @change='$root._data.local_storage.config[key] = $event.target.checked'> </div> </fieldset> <fieldset v-if='$root._data.local_blacklist.boards && $root._data.local_blacklist.boards.length'> <legend>Blacklist</legend> <div style='font-size:11px;color:black' v-for='board in $root._data.local_blacklist.boards'> <button class='action blacklist' @click.prevent='removeBlacklisted(board)'>{{board}}</button> </div> </fieldset> <input type='button' value='Close' @click='$root.show_user_menu=false'> <input type='submit' value='OK'> </form> </div> </div> </div>",
    methods: {
      prettify: function(value) {
        return value.replace(/_/g, ' ');
      },
      removeBlacklisted: function(board) {
        return Millchan.cmd("wrapperConfirm", [`Remove <b>${(board.split(':')[1])}</b> from blacklist?`], (confirmed) => {
          var index;
          if (confirmed) {
            index = this.$root._data.local_blacklist.boards.indexOf(board);
            if (board !== -1) {
              this.$root._data.local_blacklist.boards.splice(index, 1);
              return Millchan.cmd("fileWrite", [Millchan.blacklist_path, util.encode(this.$root._data.local_blacklist)], (res) => {
                if (res !== "ok") {
                  return this.error(res.error);
                }
              });
            }
          }
        });
      },
      save: function() {
        Millchan.cmd("wrapperSetLocalStorage", this.$root._data.local_storage);
        this.$root.show_user_menu = false;
        return Millchan.urlRoute();
      }
    }
  });

  Vue.component("board-edit", {
    props: ["board"],
    template: "<form @submit.prevent='editBoard(board)'> <table class='board-edit'> <td>Title:</td> <td><input ref='title' :value='board.title'></td> </tr> <tr> <td align='center' colspan='2'><input class='create' type='submit' value='Edit board'></td> </tr> </table> </form>",
    methods: {
      editBoard: function(board) {
        var settings;
        settings = {};
        settings.uri = board.uri;
        settings.config = board.config;
        settings.title = this.$refs.title.value;
        return Millchan.editBoard(settings);
      }
    }
  });

  Vue.component("disclaimer", {
    template: "<div> <h5>This site contains child pornography if you are not a pedophile<br> we recommend that you refrain from entering the site,<br> delete it from your panel if it is not to your liking.</h5> </div>"
  });

  Vue.component("faq", {
    template: "<div class='overlay-mask' @click='$root._data.show_faq = false'> <div class='overlay-content'> <div id='menu-content'> <h4 class='faq-question'>Why am I getting a white images when I try to post?</h4> <span class='faq-answer'>Thumbnails are generated by the browser.<br> You need to permit access to the canvas element for their generation.</span> <hr/> <h4 class='faq-question'>I'm always getting a notification saying 'Generating anonymous certificate' when I try to post</h4> <span class='faq-answer'>Delete the 'millchan' certificate in /ZeroNet/data/users.json, save and restart ZeroNet.</span> <hr/> <h4 class='faq-question'>Someone posted something that I do not like!<br>Can you delete it?</h4> <span class='faq-answer'>I can't. Only you can control the content that you're seeing.<br> There are tools for filtering content that you do not want to see/seed.<br>Use them. </span> </div> </div> </div>"
  });

}).call(this);


/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/millchan/_parser.coffee ---- */


(function() {
  var DataParser,
    indexOf = [].indexOf;

  DataParser = class DataParser {
    constructor(data) {
      this.encodedData = this.encodedData.bind(this);
      this.newBoard = this.newBoard.bind(this);
      this.newPost = this.newPost.bind(this);
      this.editPost = this.editPost.bind(this);
      this.editBoard = this.editBoard.bind(this);
      if (data) {
        this.data = JSON.parse(data);
      } else {
        this.data = {
          posts: [],
          boards: [],
          modlogs: []
        };
      }
    }

    encodedData() {
      return util.encode(this.data);
    }

    newBoard(uri, title) {
      var board, new_board;
      if (indexOf.call((function() {
        var i, len, ref, results;
        ref = this.data.boards;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          board = ref[i];
          results.push(board.uri);
        }
        return results;
      }).call(this), uri) >= 0) {
        throw "Board already exists";
      }
      if (!config.board_uri_regex.test(uri)) {
        throw "Board name should be less than 30 characters and contain only alphanumeric characters";
      }
      new_board = {
        uri: uri,
        title: title,
        config: false
      };
      this.data.boards.push(new_board);
      return this.encodedData();
    }

    cite2ID(post) {
      var body, cite_regex;
      cite_regex = />>(\d+)/g;
      body = post.body.replace(cite_regex, function(match, cite) {
        if (post.post_no[parseInt(cite)]) {
          return `>>${post.post_no[parseInt(cite)]}`;
        }
        return `>>${cite}`;
      });
      return body;
    }

    getFileInfo(files) {
      var file, i, len, new_file, new_files;
      new_files = [];
      for (i = 0, len = files.length; i < len; i++) {
        file = files[i];
        new_file = {};
        new_file['name'] = file.name;
        new_file['thumb'] = file.thumb;
        new_file['size'] = file.size;
        new_file['type'] = file.type;
        new_file['original'] = file.original;
        new_file['directory'] = file.directory;
        new_file['spoiler'] = file.spoiler;
        new_files.push(new_file);
      }
      return new_files;
    }

    newPost(post) {
      var new_post;
      new_post = {
        id: uuidv4(),
        directory: post.dir,
        uri: post.uri,
        thread: post.threadid,
        subject: post.subject,
        capcode: post.capcode,
        body: this.cite2ID(post),
        time: Date.now(),
        files: JSON.stringify(this.getFileInfo(post.files))
      };
      new_post = util.filter(new_post);
      this.data.posts.push(new_post);
      return [this.encodedData(), new_post];
    }

    editPost(post) {
      var i, len, old_post, ref;
      ref = this.data.posts;
      for (i = 0, len = ref.length; i < len; i++) {
        old_post = ref[i];
        if (old_post.id === post.id) {
          old_post.body = this.cite2ID(post);
          old_post.last_edited = Date.now();
          return this.encodedData();
        }
      }
      return null;
    }

    editBoard(board) {
      var i, len, old_board, ref;
      ref = this.data.boards;
      for (i = 0, len = ref.length; i < len; i++) {
        old_board = ref[i];
        if (old_board.uri === board.uri) {
          old_board.title = board.title;
          old_board.config = board.config;
          return this.encodedData();
        }
      }
      return null;
    }

    newAction(action) {
      var new_data;
      new_data = {
        uri: action.uri,
        action: action.action,
        info: action.info,
        time: Date.now()
      };
      this.data.modlogs.push(new_data);
      return this.encodedData();
    }

    delAction(action) {
      var i, len, modlog, new_modlog, ref;
      new_modlog = [];
      ref = this.data.modlogs;
      for (i = 0, len = ref.length; i < len; i++) {
        modlog = ref[i];
        if (modlog.info === action.info && modlog.uri === action.uri && modlog.action === action.action) {
          continue;
        } else {
          new_modlog.push(modlog);
        }
      }
      this.data.modlogs = new_modlog;
      return this.encodedData();
    }

  };

  window.DataParser = DataParser;

}).call(this);


/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/millchan/base.coffee ---- */


(function() {
  var Database,
    indexOf = [].indexOf;

  Database = class Database {
    constructor() {
      this.getThread = this.getThread.bind(this);
      this.getPage = this.getPage.bind(this);
    }

    getRecentPosts() {
      return Millchan.cmd("dbQuery", [`SELECT * FROM posts ORDER BY time DESC LIMIT ${config.max_recent_posts}`], (posts) => {
        var board, board_dir, board_dirs, dir, j, k, len, len1, post, query, ref;
        posts = util.validate(posts);
        if (posts.length) {
          board_dirs = [];
          for (j = 0, len = posts.length; j < len; j++) {
            post = posts[j];
            if (ref = `${post.uri}:${post.directory}`, indexOf.call(board_dirs, ref) < 0) {
              board_dirs.push(`${post.uri}:${post.directory}`);
            }
          }
          query = "SELECT * FROM posts WHERE ";
          for (k = 0, len1 = board_dirs.length; k < len1; k++) {
            board_dir = board_dirs[k];
            [board, dir] = board_dir.split(':');
            query += `(uri = '${board}' AND directory = '${dir}') OR`;
          }
          query = query.slice(0, -2);
          query += "ORDER BY time";
          return Millchan.cmd("dbQuery", [query], (all_posts) => {
            var board_count, boards, l, len2, numbers;
            all_posts = util.validate(all_posts);
            if (all_posts) {
              numbers = {};
              board_count = {};
              boards = [];
              for (l = 0, len2 = all_posts.length; l < len2; l++) {
                post = all_posts[l];
                board_dir = `${post.uri}:${post.directory}`;
                if (indexOf.call(boards, board_dir) < 0) {
                  boards.push(board_dir);
                  board_count[board_dir] = 1;
                }
                numbers[post.id] = board_count[board_dir];
                board_count[board_dir]++;
              }
              viewer.setPostNumbers(numbers);
              return viewer.setPosts(posts);
            } else if (all_posts.error) {
              log("Error fetching recent posts from database");
              return log(all_posts.error);
            }
          });
        } else if (posts.error) {
          log("Error fetching recent posts from database");
          return log(posts.error);
        }
      });
    }

    getThread(dir, uri, thread_id) {
      this.getBoardInfo(dir, uri);
      this.getPostNumber(dir, uri);
      this.getBlacklist(dir, uri);
      this.getAllBoardPosts(dir, uri);
      return Millchan.cmd("dbQuery", [`SELECT * FROM posts WHERE id = '${thread_id}'`], (thread) => {
        thread = util.validate(thread);
        if (thread.length === 1) {
          return Millchan.cmd("dbQuery", [`SELECT * FROM posts WHERE thread = '${thread_id}' ORDER BY time`], (replies) => {
            replies = util.validate(replies);
            return viewer.setPosts(thread.concat(replies));
          });
        } else if (thread.error) {
          log(`Error while fetching thread ${thread_id} from the database`);
          return log(thread.error);
        }
      });
    }

    getUserBoards(address) {
      var directory;
      directory = `users/${address}`;
      return Millchan.cmd("dbQuery", [`SELECT DISTINCT uri,directory,title FROM boards JOIN json ON boards.json_id = json.json_id WHERE directory = '${directory}'`], (boards) => {
        if (boards.length) {
          return viewer.setUserBoards(boards);
        } else if (boards.error) {
          return log(boards.error);
        }
      });
    }

    getPopularBoards() {
      return Millchan.cmd("dbQuery", ["SELECT * FROM (SELECT b.uri,b.directory,b.title,COUNT(p.id) as total_posts,b.json_id FROM (SELECT * FROM boards JOIN json USING(json_id)) as b LEFT JOIN posts as p ON b.uri = p.uri AND p.directory = b.directory GROUP BY b.uri,b.json_id) UNION SELECT uri,directory,null,COUNT(*) as total_posts,null FROM posts WHERE uri NOT IN (SELECT uri FROM boards) GROUP BY directory,uri ORDER BY total_posts DESC"], (boards) => {
        if (boards.length) {
          return viewer.setPopularBoards(boards);
        } else if (boards.error) {
          return log("Error fetching popular boards:", boards.error);
        }
      });
    }

    getPage(dir, uri, page) {
      var query;
      this.getUserDirs();
      this.getBoardInfo(dir, uri);
      this.getPostNumber(dir, uri);
      this.getBlacklist(dir, uri);
      this.getAllBoardPosts(dir, uri);
      //Long query to keep bump order
      query = `SELECT *,time as last_time FROM posts WHERE thread is NULL AND directory = '${dir}' AND uri = '${uri}'  AND id NOT IN (SELECT thread.id FROM posts as thread JOIN posts as reply ON thread.id = reply.thread) UNION SELECT thread.*,MAX(reply.time) as last_time FROM posts as thread JOIN posts as reply ON thread.id = reply.thread WHERE thread.directory = '${dir}' AND reply.directory = '${dir}' AND thread.directory = '${dir}' AND reply.uri = '${uri}' GROUP BY thread.id ORDER BY last_time DESC`;
      return Millchan.cmd("dbQuery", [query], (threads) => {
        threads = util.validate(threads);
        if (threads.length) {
          return Millchan.cmd("dbQuery", [`SELECT info FROM modlogs WHERE action = ${config.action.STICK}`], (stickies) => {
            var j, len, normal_threads, offset, ref, stick_ids, stick_threads, thread, thread_ids;
            if (stickies.error) {
              log("Error while fetching stickies from database", stickies.error);
            } else if (stickies.length) {
              stick_ids = stickies.map((e) => {
                return e.info;
              });
              stick_threads = [];
              normal_threads = [];
              for (j = 0, len = threads.length; j < len; j++) {
                thread = threads[j];
                if (ref = thread.id, indexOf.call(stick_ids, ref) >= 0) {
                  thread.sticky = true;
                  stick_threads.push(thread);
                } else {
                  normal_threads.push(thread);
                }
              }
              threads = stick_threads.concat(normal_threads);
            }
            if (page === null) {
              //Catalog: "all" threads
              threads = threads.slice(0, config.max_pages * config.threads_per_page);
            } else {
              offset = page * config.threads_per_page;
              threads = threads.slice(offset, offset + config.threads_per_page);
            }
            thread_ids = threads.map((e) => {
              return `'${e.id}'`;
            }).join(',');
            return Millchan.cmd("dbQuery", [`SELECT * FROM posts WHERE thread IN (${thread_ids}) AND directory = '${dir}' AND uri = '${uri}' ORDER BY time`], (replies) => {
              var k, l, len1, len2, reply;
              replies = util.validate(replies);
              if (replies.length) {
                for (k = 0, len1 = replies.length; k < len1; k++) {
                  reply = replies[k];
                  for (l = 0, len2 = threads.length; l < len2; l++) {
                    thread = threads[l];
                    if (reply.thread === thread.id) {
                      if (thread.replies == null) {
                        thread.replies = [];
                      }
                      thread.replies.push(reply);
                      break;
                    }
                  }
                }
              } else if (replies.error) {
                log('Error while fetching thread replies:', replies.error);
                return;
              }
              return viewer.setThreads(threads);
            });
          });
        } else if (threads.error) {
          return log("No threads returned from database query:", threads.error);
        }
      });
    }

    getBoardInfo(dir, uri) {
      return Millchan.cmd("dbQuery", [`SELECT * FROM boards JOIN json ON boards.json_id = json.json_id WHERE directory = '${dir}' AND uri = '${uri}' AND file_name = 'data.json'`], (boardinfo) => {
        if (boardinfo.length === 1) {
          return viewer.setBoardInfo(boardinfo[0]);
        } else if (boardinfo.error) {
          log("Error while fetching board info from database", boardinfo.error);
          return log(boardinfo);
        }
      });
    }

    getNav(dir, uri) {
      return Millchan.cmd("dbQuery", [`SELECT COUNT(*) as threads FROM posts WHERE thread IS NULL and directory = '${dir}' AND uri = '${uri}'`], (count) => {
        var upper;
        if (count.length) {
          upper = Math.min(config.max_pages, Math.ceil(count[0]['threads'] / config.threads_per_page) + 1);
          return viewer.setNav((function() {
            var results = [];
            for (var j = 1; 1 <= upper ? j < upper : j > upper; 1 <= upper ? j++ : j--){ results.push(j); }
            return results;
          }).apply(this));
        } else if (count.error) {
          return log(count.error);
        }
      });
    }

    getPostNumber(dir, uri) {
      return Millchan.cmd("dbQuery", [`SELECT * FROM posts WHERE directory = '${dir}' AND uri = '${uri}' ORDER BY time`], (posts) => {
        var i, j, len, numbers, post;
        posts = util.validate(posts);
        if (posts.length) {
          numbers = {};
          i = 1;
          for (j = 0, len = posts.length; j < len; j++) {
            post = posts[j];
            numbers[post.id] = i++;
          }
          return viewer.setPostNumbers(numbers);
        } else if (posts.error) {
          return log(posts.error);
        }
      });
    }

    getBlacklist(dir, uri) {
      Millchan.cmd("dbQuery", [`SELECT * FROM json JOIN (SELECT uri,time,info FROM modlogs JOIN json ON modlogs.json_id = json.json_id WHERE directory='${dir}' AND action=${config.action.BL_USER}) as aux ON json.directory = aux.info ORDER BY time DESC`], (bl_users) => {
        if (bl_users.length) {
          return viewer.setBlacklisterUsers(bl_users);
        } else if (bl_users.error) {
          return log(bl_users.error);
        }
      });
      return Millchan.cmd("dbQuery", [`SELECT * FROM modlogs JOIN json ON modlogs.json_id = json.json_id WHERE directory='${dir}' AND uri='${uri}' AND action=${config.action.BL_POST} ORDER BY time DESC`], (bl_posts) => {
        if (bl_posts.length) {
          return viewer.setBlacklistedPosts(bl_posts);
        } else if (bl_posts.error) {
          return log(bl_posts.error);
        }
      });
    }

    getJsonID(address) {
      var directory;
      directory = `users/${address}`;
      return Millchan.cmd("dbQuery", [`SELECT json_id FROM json WHERE directory = '${directory}' LIMIT 1`], (json_id) => {
        if (json_id.length) {
          return viewer.setUserJsonID(json_id[0].json_id);
        } else if (json_id.error) {
          return log(json_id.error);
        }
      });
    }

    getUserDirs() {
      return Millchan.cmd("dbQuery", ["SELECT directory,json_id FROM json"], (data) => {
        var dir, j, len, user_dirs;
        if (data.length) {
          user_dirs = {};
          for (j = 0, len = data.length; j < len; j++) {
            dir = data[j];
            user_dirs[dir.json_id] = dir.directory;
          }
          return viewer.setUserDirs(user_dirs);
        } else if (data.error) {
          return log("Error while fetching directories from database");
        }
      });
    }

    getAllBoardPosts(dir, uri) {
      return Millchan.cmd("dbQuery", [`SELECT * FROM posts WHERE directory = '${dir}' AND uri='${uri}'`], (posts) => {
        posts = util.validate(posts);
        if (posts.length) {
          return viewer.setBoardPosts(posts);
        } else if (posts.error) {
          return log(`Error while fetching posts from database: ${posts.error}`);
        }
      });
    }

  };

  window.Database = Database;

}).call(this);



/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/millchan/files.coffee ---- */


(function() {
  var Files,
    indexOf = [].indexOf;

  Files = class Files {
    constructor(files, callback) {
      this.addProcessedFile = this.addProcessedFile.bind(this);
      this.process = this.process.bind(this);
      log("Init file processing");
      this.files = files;
      this.processed = [];
      this.thumbs = [];
      this.callback = callback;
    }

    addProcessedFile(file) {
      this.processed.push(file);
      log("Updated processed:", this.processed.length, this.files.length);
      Millchan.cmd("wrapperNotification", ["info", `Processed ${this.processed.length}/${this.files.length}`, config.notification_time]);
      if (file.thumb) {
        this.thumbs.push(file.thumb);
      }
      if (this.processed.length === this.files.length) {
        return this.callback();
      }
    }

    process() {
      var file, i, len, ref, ref1, ref2, results;
      if (this.processed.length === this.files.length) {
        this.callback();
        return;
      }
      log("Processing files", this.files, this.processed);
      Millchan.cmd("wrapperNotification", ["info", "Processing files...", config.notification_time]);
      this.resizeFiles(this.files);
      ref = this.files;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        file = ref[i];
        if (ref1 = file.type, indexOf.call(config.allowed_image_mimetype, ref1) >= 0) {
          results.push(log(file.type));
        } else if (ref2 = file.type, indexOf.call(config.allowed_mimetype, ref2) >= 0) {
          file.original = `${sha1(`${file.name}${file.size}`)}${config.mime2ext[file.type]}`;
          results.push(this.addProcessedFile(file));
        } else {
          this.addProcessedFile(null);
          results.push(log(`Ignoring file ${file.name}. Mimetype (${file.type}) not allowed`));
        }
      }
      return results;
    }

    resizeFiles(files) {
      var file, img, ref;
      if (files.length) {
        file = files[0];
        if (ref = file.type, indexOf.call(config.allowed_image_mimetype, ref) < 0) {
          this.resizeFiles(Array.prototype.slice.call(files, 1));
          return;
        }
        img = new Image();
        img.onload = function() {
          var canvas, new_height, new_width, p, scale;
          canvas = document.createElement("canvas");
          if (img.width <= config.media_max_width && img.height <= config.media_max_height) {
            new_width = img.width;
            new_height = img.height;
          } else {
            scale = Math.min(config.media_max_width / img.width, config.media_max_height / img.height);
            new_width = img.width * scale;
            new_height = img.height * scale;
          }
          canvas.width = new_width;
          canvas.height = new_height;
          p = new pica();
          return p.resize(img, canvas, config.pica).then((result) => {
            var data, reader;
            data = result.toDataURL(img.file.type);
            img.file.thumb = `${sha1(data)}-thumb${config.mime2ext[img.file.type]}`;
            img.file.data = data;
            reader = new FileReader();
            reader.readAsDataURL(img.file);
            reader.onload = function() {
              reader.file.original = `${sha1(reader.result)}${config.mime2ext[reader.file.type]}`;
              this.addProcessedFile(reader.file);
              return reader.resizeFiles(Array.prototype.slice.call(files, 1));
            };
            reader.file = img.file;
            reader.addProcessedFile = this.addProcessedFile;
            reader.resizeFiles = img.resizeFiles;
            return reader.readAsDataURL(img.file);
          }).catch((error) => {
            return log('error', error);
          });
        };
        img.addEventListener("progress", log);
        img.addProcessedFile = this.addProcessedFile;
        img.resizeFiles = this.resizeFiles;
        img.file = file;
        return img.src = window.URL.createObjectURL(file);
      }
    }

  };

  window.Files = Files;

}).call(this);


/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/millchan/thumbs.coffee ---- */


(function() {
  var Thumbnails;

  Thumbnails = class Thumbnails {
    constructor(files, auth_address, callback) {
      var file;
      this.addProcessedFile = this.addProcessedFile.bind(this);
      this.process = this.process.bind(this);
      log("Init thumbs processing");
      this.thumbs_data = util.zip((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = files.length; i < len; i++) {
          file = files[i];
          results.push(file.thumb);
        }
        return results;
      })(), (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = files.length; i < len; i++) {
          file = files[i];
          results.push(file.data);
        }
        return results;
      })());
      this.processed = [];
      this.callback = callback;
      this.auth_address = auth_address;
    }

    addProcessedFile(file) {
      this.processed.push(file);
      log("Updated processed thumbs:", this.processed.length, this.thumbs_data.length);
      if (this.processed.length === this.thumbs_data.length) {
        return this.callback();
      }
    }

    process() {
      var data, filepath, i, len, ref, results, thumb, thumb_data;
      log("Init processing");
      if (this.processed.length === this.thumbs_data.length) {
        this.callback();
        return;
      }
      ref = this.thumbs_data;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        thumb_data = ref[i];
        [thumb, data] = thumb_data;
        filepath = `data/users/${this.auth_address}/${thumb}`;
        log(thumb, data);
        let [mimetype,b64data] = util.parseDataUri(data);
        if (b64data) {
          log(thumb, b64data.length);
          log(filepath, b64data);
          results.push(Millchan.cmd("fileWrite", [filepath, b64data], (res) => {
            this.addProcessedFile(thumb);
            if (res !== "ok") {
              return Millchan.error(res.error);
            }
          }));
        } else {
          log(`Error processing thumbs for ${thumb}`);
          results.push(this.addProcessedFile(null));
        }
      }
      return results;
    }

  };

  window.Thumbnails = Thumbnails;

}).call(this);


/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/millchan/viewer.coffee ---- */


(function() {
  var Viewer,
    indexOf = [].indexOf;

  Viewer = class Viewer {
    constructor() {
      this.setUserID = this.setUserID.bind(this);
      this.setUserAuthAddress = this.setUserAuthAddress.bind(this);
      this.setUserJsonID = this.setUserJsonID.bind(this);
      this.setPosts = this.setPosts.bind(this);
      this.setBoardPosts = this.setBoardPosts.bind(this);
      this.setPopularBoards = this.setPopularBoards.bind(this);
      this.setUserBoards = this.setUserBoards.bind(this);
      this.setThreads = this.setThreads.bind(this);
      this.setNav = this.setNav.bind(this);
      this.setBoardInfo = this.setBoardInfo.bind(this);
      this.setIsUserBoard = this.setIsUserBoard.bind(this);
      this.setBlacklisterUsers = this.setBlacklisterUsers.bind(this);
      this.setBlacklistedPosts = this.setBlacklistedPosts.bind(this);
      this.setBlacklistActive = this.setBlacklistActive.bind(this);
      this.setUserDirs = this.setUserDirs.bind(this);
      this.setPosting = this.setPosting.bind(this);
      this.setLocalStorage = this.setLocalStorage.bind(this);
      this.setLocalBlacklist = this.setLocalBlacklist.bind(this);
      this.clearForm = this.clearForm.bind(this);
      this.previewPost = this.previewPost.bind(this);
      this.delPreviewPost = this.delPreviewPost.bind(this);
      this.addReply = this.addReply.bind(this);
      this.renderHome = this.renderHome.bind(this);
      this.renderThread = this.renderThread.bind(this);
      this.renderPage = this.renderPage.bind(this);
      this.renderCatalog = this.renderCatalog.bind(this);
      this.renderEdit = this.renderEdit.bind(this);
      this.vm = new Vue({
        el: '#root',
        data: {
          dir: null,
          uri: null,
          boardinfo: null,
          thread: null,
          page: null,
          nav: null,
          active_page: null,
          show_create_board: null,
          show_create_reply: null,
          posts: [],
          board_posts: {},
          posts_by_id: {},
          threads: [],
          threads_by_id: {},
          popular_boards: [],
          user_boards: [],
          location: window.location,
          userid: null,
          user_json_id: null,
          post_no: null,
          page_title: config.domain,
          show_quick_reply: false,
          selected_post: null,
          is_user_board: false,
          bl_posts: [],
          bl_posts_map: {},
          bl_users: [],
          bl_users_map: {},
          blacklist_active: false,
          preview_post: null,
          posting: false,
          user_dirs: [],
          replies: {},
          show_user_menu: false,
          show_faq: false,
          local_storage: [],
          local_blacklist: []
        },
        mounted: function() {
          document.getElementById("root").focus();
          window.addEventListener('keyup', (e) => {
            if (this._data.active_page === "thread" && e.target['id'] !== "post_body" && e['keyCode'] === 81) { //'q' letter
              return this._data.show_quick_reply = true;
            }
          });
          window.addEventListener('mouseup', () => {
            if (this._data.active_page === "thread" && this.$refs.quickreply && this.$refs.quickreply.moving) {
              return this.$refs.quickreply.moving = false;
            }
          });
          return window.addEventListener('mousemove', (e) => {
            if (this._data.active_page === "thread" && this.$refs.quickreply && this.$refs.quickreply.moving) {
              this.$refs.quickreply._data.top = e.clientY - 50;
              return this.$refs.quickreply._data.left = e.clientX - 50;
            }
          });
        },
        methods: {
          postLink: function(post) {
            return `?:${post.directory}:${post.uri}:${(post.thread ? post.thread : post.id)}`;
          },
          postTarget: function(post) {
            return `>>>/${post.uri}/${(post.id.split('-')[4])}`;
          },
          boardTarget: function(board) {
            if (config.board_uri_regex.test(board.uri)) {
              return `/${board.uri}/ - ${board.title}`;
            }
          },
          editBoardLink: function(board) {
            if (config.board_uri_regex.test(board.uri)) {
              return `?:${board.directory}:${board.uri}:edit`;
            }
          },
          moveToPage: function(page) {
            return this.location.href = `${this.location.pathname}?:${this.dir}:${this.uri}:${page - 1}`;
          },
          isInUserBlacklist: (post) => {
            return post.json_id in this.vm.bl_users_map;
          },
          isInPostBlacklist: (post) => {
            return `${post.id}:${post.uri}` in this.vm.bl_posts_map;
          },
          isBlackListed: function(post) {
            return this.isInUserBlacklist(post) || this.isInPostBlacklist(post);
          },
          getAllThreads: function() {
            var all_threads, i, len, thread, thread_no, threads;
            threads = [];
            thread_no = 0;
            all_threads = !this._data.blacklist_active ? this.threads : this.threads.filter((thread) => {
              return !this.isBlackListed(thread);
            });
            for (i = 0, len = all_threads.length; i < len; i++) {
              thread = all_threads[i];
              thread.thread_no = thread_no++;
              threads.push(thread);
              if (thread_no >= config.max_pages * config.threads_per_page) {
                break;
              }
            }
            return threads;
          },
          getThreads: function() {
            var threads;
            threads = [];
            if (this._data.blacklist_active) {
              threads = this.threads.filter((thread) => {
                return !this.isBlackListed(thread);
              });
            } else {
              threads = this.threads;
            }
            return threads.slice(0, config.threads_per_page);
          }
        },
        computed: {
          boardURI: () => {
            return `${location.pathname}?:${this.vm.dir}:${this.vm.uri}:0`;
          },
          catalogURL: () => {
            return `${location.pathname}?:${this.vm.dir}:${this.vm.uri}:catalog`;
          }
        },
        watch: {
          posts: () => {
            var i, len, post, ref, results;
            this.vm.posts_by_id = {};
            ref = this.vm.posts;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              post = ref[i];
              results.push(this.vm.posts_by_id[post.id] = post);
            }
            return results;
          },
          threads: () => {
            var i, len, ref, reply, results, thread;
            this.vm.threads_by_id = {};
            ref = this.vm.threads;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              thread = ref[i];
              this.vm.threads_by_id[thread.id] = thread;
              if (thread.replies) {
                results.push((function() {
                  var j, len1, ref1, results1;
                  ref1 = thread.replies;
                  results1 = [];
                  for (j = 0, len1 = ref1.length; j < len1; j++) {
                    reply = ref1[j];
                    results1.push(this.vm.threads_by_id[reply.id] = reply);
                  }
                  return results1;
                }).call(this));
              } else {
                results.push(void 0);
              }
            }
            return results;
          },
          bl_posts: () => {
            var bl_post, i, len, ref, results;
            this.vm.bl_posts_map = {};
            if (this.vm.bl_posts) {
              ref = this.vm.bl_posts;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                bl_post = ref[i];
                results.push(this.vm.bl_posts_map[`${bl_post.info}:${bl_post.uri}`] = true);
              }
              return results;
            }
          },
          bl_boards: () => {
            var bl_user, i, len, ref, results;
            this.vm.bl_users_map = {};
            if (this.vm.bl_users) {
              ref = this.vm.bl_users;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                bl_user = ref[i];
                results.push(this.vm.bl_users_map[bl_user.json_id] = true);
              }
              return results;
            }
          }
        }
      });
    }

    setUserID(userid) {
      return this.vm.userid = userid;
    }

    setUserAuthAddress(auth_address) {
      return this.vm.auth_address = auth_address;
    }

    setUserJsonID(json_id) {
      return this.vm.user_json_id = json_id;
    }

    setPosts(new_posts) {
      return this.vm.posts = new_posts;
    }

    setBoardPosts(new_posts) {
      var i, len, post, posts;
      posts = {};
      for (i = 0, len = new_posts.length; i < len; i++) {
        post = new_posts[i];
        posts[post.id] = post;
      }
      return this.vm.board_posts = posts;
    }

    setPopularBoards(boards) {
      return this.vm.popular_boards = boards;
    }

    setUserBoards(boards) {
      return this.vm.user_boards = boards;
    }

    setThreads(new_threads) {
      return this.vm.threads = new_threads;
    }

    setNav(count) {
      return this.vm.nav = count;
    }

    setBoardInfo(boardinfo) {
      return this.vm.boardinfo = boardinfo;
    }

    setIsUserBoard(dir, auth_address) {
      return this.vm.is_user_board = dir.split('/')[1] === auth_address;
    }

    setBlacklisterUsers(bl_users) {
      return this.vm.bl_users = bl_users;
    }

    setBlacklistedPosts(bl_posts) {
      return this.vm.bl_posts = bl_posts;
    }

    setBlacklistActive(isActive) {
      if (isActive == null) {
        isActive = true;
      }
      return this.vm.blacklist_active = isActive;
    }

    setUserDirs(user_dirs) {
      return this.vm.user_dirs = user_dirs;
    }

    setPosting(is_posting) {
      return this.vm.posting = is_posting;
    }

    setLocalStorage(local_storage) {
      return this.vm.local_storage = local_storage;
    }

    setLocalBlacklist(local_blacklist) {
      return this.vm.local_blacklist = local_blacklist;
    }

    clearForm() {
      this.vm.show_quick_reply = false;
      return this.vm.show_create_reply = false;
    }

    setPostNumbers(numbers) {
      return this.vm.post_no = numbers;
    }

    previewPost(event, post_id) {
      var error, post, reply_div;
      try {
        reply_div = document.getElementById(post_id).parentNode.parentNode.parentNode;
        if (util.isOnScreen(reply_div)) {
          reply_div.classList.add("preview_hover");
          return;
        }
      } catch (error1) {
        error = error1;
        ({});
      }
      switch (this.vm.active_page) {
        case 'thread':
        case 'page':
          if (post_id in this.vm.board_posts) {
            post = this.vm.board_posts[post_id];
            post.X = event.clientX;
            post.Y = event.clientY;
            this.vm.preview_post = post;
          }
      }
    }

    delPreviewPost(post_id) {
      var error, reply_div;
      this.vm.preview_post = null;
      try {
        reply_div = document.getElementById(post_id).parentNode.parentNode.parentNode;
        return reply_div.classList.remove("preview_hover");
      } catch (error1) {
        error = error1;
        return {};
      }
    }

    addReply(reply_id, op_id) {
      if (!(op_id in this.vm.replies)) {
        this.vm.replies[op_id] = [];
      }
      if (indexOf.call(this.vm.replies[op_id], reply_id) < 0) {
        return this.vm.replies[op_id].push(reply_id);
      }
    }

    renderHome() {
      this.vm.dir = null;
      this.vm.uri = null;
      this.vm.page = null;
      this.vm.thread = null;
      this.vm.active_page = 'home';
      return this.vm.active_page;
    }

    renderThread(dir, uri, thread) {
      this.vm.dir = dir;
      this.vm.uri = uri;
      this.vm.page = null;
      this.vm.thread = thread;
      this.vm.active_page = 'thread';
      return this.vm.active_page;
    }

    renderPage(dir, uri, page) {
      this.vm.dir = dir;
      this.vm.uri = uri;
      this.vm.page = page;
      this.vm.thread = null;
      this.vm.active_page = 'page';
      return this.vm.active_page;
    }

    renderCatalog(dir, uri) {
      this.vm.dir = dir;
      this.vm.uri = uri;
      this.vm.page = null;
      this.vm.thread = null;
      this.vm.active_page = 'catalog';
      return this.vm.active_page;
    }

    renderEdit(dir, uri) {
      this.vm.dir = dir;
      this.vm.uri = uri;
      this.vm.page = null;
      this.vm.thread = null;
      this.vm.active_page = 'edit';
      return this.vm.active_page;
    }

  };

  window.viewer = new Viewer();

}).call(this);


/* ---- /1ADQAHsqsie5PBeQhQgjcKmUu3qdPFg6aA/js/millchan/zz_millchan.coffee ---- */


(function() {
  var Millchan,
    boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } },
    indexOf = [].indexOf;

  Millchan = class Millchan extends ZeroFrame {
    constructor() {
      super(...arguments);
      this.error = this.error.bind(this);
      this.start = this.start.bind(this);
      this.onOpenWebsocket = this.onOpenWebsocket.bind(this);
      this.onRequest = this.onRequest.bind(this);
      this.killUser = this.killUser.bind(this);
      this.urlRoute = this.urlRoute.bind(this);
      this.getLocalStorage = this.getLocalStorage.bind(this);
      this.getLocalBlacklist = this.getLocalBlacklist.bind(this);
      this.blacklistBoard = this.blacklistBoard.bind(this);
      this.checkCert = this.checkCert.bind(this);
      this.checkContentJSON = this.checkContentJSON.bind(this);
      this.selectUser = this.selectUser.bind(this);
      this.createCert = this.createCert.bind(this);
      this.createBoard = this.createBoard.bind(this);
      this.editBoard = this.editBoard.bind(this);
      this.editPost = this.editPost.bind(this);
      this.makePost = this.makePost.bind(this);
      this.modAction = this.modAction.bind(this);
      this.writeThumbnails = this.writeThumbnails.bind(this);
    }

    error(message) {
      boundMethodCheck(this, Millchan);
      return this.cmd("wrapperNotification", ["error", message, config.notification_time]);
    }

    start() {
      boundMethodCheck(this, Millchan);
      return this.database = new Database();
    }

    onOpenWebsocket() {
      boundMethodCheck(this, Millchan);
      log("Websocket opened");
      return this.cmd("siteInfo", {}, (siteInfo) => {
        this.siteInfo = siteInfo;
        this.inner_path = `data/users/${siteInfo.auth_address}/data.json`;
        this.blacklist_path = `data/users/${siteInfo.auth_address}/blacklist.json`;
        this.checkCert(false);
        return this.urlRoute();
      });
    }

    onRequest(cmd, message) {
      var err, match;
      boundMethodCheck(this, Millchan);
      log("New request", cmd, message);
      if (cmd === "setSiteInfo") {
        if (message.params.event && (message.params.event[0] = "file_done")) {
          try {
            match = typeof message.params.event[1] === "string" ? message.params.event[1].match(config.user_data_regex) : null;
            if (match || this.active_page === 'home') {
              log("Reloading route...");
              return this.urlRoute();
            }
          } catch (error1) {
            err = error1;
            return log(err);
          }
        }
      }
    }

    killUser(auth_address, cert, user_dir) {
      boundMethodCheck(this, Millchan);
      this.cmd("wrapperNotification", ["warning", "This will delete <b>all</b> content that was downloaded from this user!", config.notification_time]);
      return this.cmd("muteAdd", [auth_address, cert, "Bad User"], (confirmed) => {
        if (confirmed === "ok") {
          return this.cmd("fileList", `/data/${user_dir}`, (filelist) => {
            var file, i, len, results;
            results = [];
            for (i = 0, len = filelist.length; i < len; i++) {
              file = filelist[i];
              if (file !== "content.json") {
                results.push(this.cmd("fileDelete", `/data/${user_dir}/${file}`));
              } else {
                results.push(void 0);
              }
            }
            return results;
          });
        }
      });
    }

    urlRoute() {
      boundMethodCheck(this, Millchan);
      return this.getLocalStorage().then((local_storage) => {
        return this.getLocalBlacklist().then((local_blacklist) => {
          var match, url;
          viewer.setLocalStorage(local_storage);
          viewer.setLocalBlacklist(local_blacklist);
          config.update(local_storage.config);
          url = window.location.search.replace(/[&?]wrapper_nonce=[A-Za-z0-9]+/, "");
          if (config.home_regex.test(url)) {
            this.database.getRecentPosts();
            this.database.getPopularBoards();
            this.database.getUserBoards(this.siteInfo.auth_address);
            return this.active_page = viewer.renderHome();
          } else if (match = url.match(config.board_regex)) {
            match.shift();
            [this.dir, this.uri] = match;
            return window.location.href = `${window.location.pathname}/?:${this.dir}:${this.uri}:0`;
          } else if (match = url.match(config.thread_regex)) {
            match.shift();
            [this.dir, this.uri, this.thread] = match;
            this.database.getThread(this.dir, this.uri, this.thread);
            this.database.getJsonID(this.siteInfo.auth_address);
            this.database.getUserDirs();
            viewer.setIsUserBoard(this.dir, this.siteInfo.auth_address);
            viewer.setBlacklistActive(local_storage[`blacklist:${this.dir}:${this.uri}`]);
            return this.active_page = viewer.renderThread(this.dir, this.uri, this.thread);
          } else if (match = url.match(config.page_regex)) {
            match.shift();
            [this.dir, this.uri, this.page] = match;
            this.database.getPage(this.dir, this.uri, this.page);
            this.database.getNav(this.dir, this.uri);
            this.database.getJsonID(this.siteInfo.auth_address);
            this.database.getUserDirs();
            viewer.setIsUserBoard(this.dir, this.siteInfo.auth_address);
            viewer.setBlacklistActive(local_storage[`blacklist:${this.dir}:${this.uri}`]);
            return this.active_page = viewer.renderPage(this.dir, this.uri, this.page);
          } else if (match = url.match(config.catalog_regex)) {
            match.shift();
            [this.dir, this.uri] = match;
            this.database.getPage(this.dir, this.uri, null);
            viewer.setBlacklistActive(local_storage[`blacklist:${this.dir}:${this.uri}`]);
            return this.active_page = viewer.renderCatalog(this.dir, this.uri);
          } else if (match = url.match(config.edit_regex)) {
            match.shift();
            [this.dir, this.uri] = match;
            this.database.getUserDirs();
            this.database.getBoardInfo(this.dir, this.uri);
            this.database.getBlacklist(this.dir, this.uri);
            return this.active_page = viewer.renderEdit(this.dir, this.uri);
          } else {
            if (config.noroute_redirect) {
              window.location.href = window.location.pathname;
            } else {
              this.error(`Error: Unknown route ${url}`);
            }
            return log(url);
          }
        });
      });
    }

    getLocalStorage() {
      boundMethodCheck(this, Millchan);
      return new Promise((resolve) => {
        return this.cmd("wrapperGetLocalStorage", [], (local_storage) => {
          var default_config, i, j, len, len1, ref, ref1, ref2, ref3, ref4, ref5, ref6, style;
          if (local_storage == null) {
            local_storage = {};
          }
          //CSS
          if ('style' in local_storage && (ref = local_storage.style, indexOf.call(config.styles, ref) >= 0)) {
            ref1 = window.document.styleSheets;
            for (i = 0, len = ref1.length; i < len; i++) {
              style = ref1[i];
              if (ref2 = local_storage.style, indexOf.call(style.href.split('/'), ref2) >= 0) {
                style.disabled = false;
              } else if (ref3 = style.href.split('/')[5], indexOf.call(config.enabled_themes, ref3) < 0) {
                style.disabled = true;
              }
            }
          } else {
            ref4 = window.document.styleSheets;
            for (j = 0, len1 = ref4.length; j < len1; j++) {
              style = ref4[j];
              if ((ref5 = style.href.split('/')[5], indexOf.call(config.enabled_themes, ref5) >= 0) || (ref6 = config.default_theme, indexOf.call(style.href.split('/'), ref6) >= 0)) {
                style.disabled = false;
              } else {
                style.disabled = true;
              }
            }
            local_storage['style'] = config.default_theme;
            this.cmd("wrapperSetLocalStorage", local_storage);
          }
          this.style = local_storage['style'];
          //Config
          if (!('config' in local_storage)) {
            local_storage['config'] = {};
          }
          default_config = config.userConfig(local_storage['config']);
          if (Object.keys(local_storage.config).length !== Object.keys(default_config).length) {
            local_storage['config'] = default_config;
            this.cmd("wrapperSetLocalStorage", local_storage);
          }
          return resolve(local_storage);
        });
      });
    }

    getLocalBlacklist() {
      boundMethodCheck(this, Millchan);
      return new Promise((resolve) => {
        return this.cmd("fileGet", {
          "inner_path": this.blacklist_path,
          "required": false
        }, (data) => {
          if (data) {
            resolve(JSON.parse(data));
          }
          return resolve([]);
        });
      });
    }

    blacklistBoard(dir, uri) {
      boundMethodCheck(this, Millchan);
      this.cmd("wrapperNotification", ["warning", "This will delete <b>all</b> files that were downloaded from this board!", config.notification_time]);
      return this.cmd("wrapperConfirm", [`Are you sure you want to blacklist /${uri}/?`], (confirmed) => {
        if (confirmed) {
          this.cmd("fileGet", {
            "inner_path": this.blacklist_path,
            "required": false
          }, (data) => {
            var local_blacklist;
            if (data) {
              local_blacklist = JSON.parse(data);
            } else {
              local_blacklist = {
                boards: [],
                users: []
              };
            }
            local_blacklist.boards.push(`${dir}:${uri}`);
            return this.cmd("fileWrite", [this.blacklist_path, util.encode(local_blacklist)], (res) => {
              if (res === "ok") {
                this.cmd("wrapperNotification", ["done", "Board blacklisted!", config.notification_time]);
                return this.urlRoute();
              } else {
                return this.error(res.error);
              }
            });
          });
          return this.cmd("dbQuery", [`SELECT p.files,j.directory FROM posts p JOIN json j USING(json_id) WHERE p.directory='${dir}' AND p.uri='${uri}'`], (data) => {
            if (data.length) {
              return this.cmd("fileList", "/data/users/", (filelist) => {
                var file, i, len, post, results, userid;
                results = [];
                for (i = 0, len = data.length; i < len; i++) {
                  post = data[i];
                  results.push((function() {
                    var j, len1, ref, ref1, ref2, results1;
                    ref = JSON.parse(post.files);
                    results1 = [];
                    for (j = 0, len1 = ref.length; j < len1; j++) {
                      file = ref[j];
                      userid = post.directory.split('/')[1];
                      if (ref1 = `${userid}/src/${file.original}`, indexOf.call(filelist, ref1) >= 0) {
                        log('deleting', `/data/users/${userid}/src/${file.original}`);
                        this.cmd("fileDelete", `/data/users/${userid}/src/${file.original}`);
                      }
                      if (file.thumb && (ref2 = `${userid}/${file.thumb}`, indexOf.call(filelist, ref2) >= 0)) {
                        log('deleting', `/data/users/${userid}/${file.thumb}`);
                        results1.push(this.cmd("fileDelete", `/data/users/${userid}/${file.thumb}`));
                      } else {
                        results1.push(void 0);
                      }
                    }
                    return results1;
                  }).call(this));
                }
                return results;
              });
            } else if (data.error) {
              return log('Error while fetching files from database:', data.error);
            }
          });
        }
      });
    }

    checkCert(generate = true) {
      boundMethodCheck(this, Millchan);
      if (generate && !this.siteInfo.cert_user_id) {
        this.createCert();
      }
      viewer.setUserID(this.siteInfo.cert_user_id);
      return viewer.setUserAuthAddress(this.siteInfo.auth_address);
    }

    checkContentJSON() {
      var content_path;
      boundMethodCheck(this, Millchan);
      content_path = `data/users/${this.siteInfo.auth_address}/content.json`;
      return this.cmd("fileGet", {
        "inner_path": content_path,
        "required": false
      }, (data) => {
        if (data) {
          data = JSON.parse(data);
          if (data.optional === "(?!data.json)" && data.ignore === "blacklist.json(-old)?") {
            return;
          }
        } else {
          data = {};
        }
        data.optional = "(?!data.json)";
        data.ignore = "blacklist.json(-old)?";
        return this.cmd("fileWrite", [content_path, util.encode(data)], (res) => {
          if (res !== "ok") {
            return this.error(res.error);
          }
        });
      });
    }

    selectUser() {
      boundMethodCheck(this, Millchan);
      this.cmd("certSelect", {
        accepted_domains: [config.domain]
      });
      return false;
    }

    createCert() {
      var addr, anonKey, auth_user_name, cert;
      boundMethodCheck(this, Millchan);
      log("Creating new certificate");
      this.cmd("wrapperNotification", ["info", "Generating anonymous certificate", config.notification_time]);
      addr = this.siteInfo.auth_address;
      anonKey = bitcoin.ECPair.fromWIF(config.anonWIF);
      auth_user_name = addr.slice(0, 15);
      cert = bitcoin.message.sign(anonKey, `${addr}#web/${auth_user_name}`).toString("base64");
      return this.cmd("certAdd", [config.domain.toLowerCase(), "web", auth_user_name, cert], (res) => {
        if (res === "ok") {
          this.cmd("wrapperNotification", ["done", "Anonymous certificate generated.", config.notification_time]);
          return viewer.setUserID(`${auth_user_name}@${config.domain.toLowerCase()}`);
        } else if (res !== "Not changed") {
          return this.error(res.error);
        }
      });
    }

   createBoard() {
      var board_title, board_uri;
      boundMethodCheck(this, Millchan);
      this.checkCert();
      log("Creating new board");
      board_uri = document.getElementById('board_uri').value;
      board_title = document.getElementById('board_title').value;
      if (board_uri && board_title) {
        return this.cmd("fileGet", {
          "inner_path": this.inner_path,
          "required": false
        }, (data) => {
          var error, new_data, parser;
          parser = new DataParser(data);
          try {
            new_data = parser.newBoard(board_uri, board_title);
          } catch (error1) {
            error = error1;
            this.error(error);
            return;
          }
          if (new_data) {
            log("Writing data to file");
            return this.cmd("fileWrite", [this.inner_path, new_data], (res) => {
              if (res === "ok") {
                this.cmd("wrapperNotification", ["done", `Board /${board_uri}/ created!`, config.notification_time]);
                log("Publishing update");
                this.cmd("sitePublish", {
                  "inner_path": this.inner_path
                });
                return this.urlRoute();
              } else {
                return this.error(`File write error: ${res.error}`);
              }
            });
          } else {
            return this.error("There was a problem with parsing the board data", data);
          }
        });
      } else {
        if (!board_uri) {
          this.error("Missing uri");
        }
        if (!board_title) {
          return this.error("Missing title");
        }
      }
    }

    editBoard(settings) {
      boundMethodCheck(this, Millchan);
      this.checkCert();
      this.checkContentJSON();
      log("Editing board");
      return this.cmd("fileGet", {
        "inner_path": this.inner_path,
        "required": false
      }, (data) => {
        var new_data, parser;
        parser = new DataParser(data);
        new_data = parser.editBoard(settings);
        return this.cmd("fileWrite", [this.inner_path, new_data], (res) => {
          if (res === "ok") {
            this.cmd("wrapperNotification", ["done", "Board edited!", config.notification_time]);
            log("Publishing update");
            this.cmd("sitePublish", {
              "inner_path": this.inner_path
            });
            return this.urlRoute();
          } else {
            return this.error(`File write error: ${res.error}`);
          }
        });
      });
    }

    editPost(post_id, new_body, post_no) {
      var post;
      boundMethodCheck(this, Millchan);
      this.checkCert();
      this.checkContentJSON();
      log("Editing post");
      post = {
        id: post_id,
        body: new_body,
        post_no: util.invert(post_no)
      };
      return this.cmd("fileGet", {
        "inner_path": this.inner_path,
        "required": false
      }, (data) => {
        var new_data, parser;
        parser = new DataParser(data);
        new_data = parser.editPost(post);
        return this.cmd("fileWrite", [this.inner_path, new_data], (res) => {
          if (res === "ok") {
            this.cmd("wrapperNotification", ["done", "Post edited!", config.notification_time]);
            log("Publishing update");
            this.cmd("sitePublish", {
              "inner_path": this.inner_path
            });
            return this.urlRoute();
          } else {
            return this.error(`File write error: ${res.error}`);
          }
        });
      });
    }

    makePost(fileList, post_body) {
      var files;
      boundMethodCheck(this, Millchan);
      this.checkCert();
      this.checkContentJSON();
      log("Creating new post");
      files = new Files(fileList, (() => {
        var file, i, j, len, len1, post, ref, ref1;
        post = {
          dir: document.getElementById('post_dir').value,
          uri: document.getElementById('post_uri').value,
          threadid: document.getElementById('post_threadid').value,
          subject: document.getElementById('post_subject').value,
          body: post_body,
          capcode: document.getElementById('post_capcode') ? document.getElementById('post_capcode').checked : false,
          post_no: util.invert(JSON.parse(document.getElementById("post_no").value)),
          files: files.processed
        };
        ref = post.files;
        for (i = 0, len = ref.length; i < len; i++) {
          file = ref[i];
          file.directory = this.siteInfo.auth_address;
        }
        if (post.body || files.processed.length) {
          log("Post", post);
          if (files.processed.length) {
            ref1 = files.processed;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              file = ref1[j];
              let local_file = file;
              if (local_file.original) {
                this.cmd("bigfileUploadInit", [`data/users/${this.siteInfo.auth_address}/src/${local_file.original}`, local_file.size], (init_res) => {
                  var formdata, req;
                  formdata = new FormData();
                  formdata.append(local_file.name, local_file);
                  req = new XMLHttpRequest();
                  req.upload.addEventListener("progress", log);
                  req.withCredentials = true;
                  req.open("POST", init_res.url);
                  return req.send(formdata);
                });
              }
            }
          }
          return this.writeThumbnails(files.processed, (() => {
            return this.cmd("dbQuery", [`SELECT * FROM json JOIN boards WHERE directory = '${post.dir}' and uri = '${post.uri}'`], (res) => {
              log("RES", res);
              if (res.length) {
                return this.cmd("fileGet", {
                  "inner_path": this.inner_path,
                  "required": false
                }, (data) => {
                  var new_data, new_post, parser;
                  parser = new DataParser(data);
                  [new_data, new_post] = parser.newPost(post);
                  log("Writing data to file");
                  return this.cmd("fileWrite", [this.inner_path, new_data], (res) => {
                    if (res === "ok") {
                      this.cmd("wrapperNotification", ["done", "New post created!", config.notification_time]);
                      log("Publishing update");
                      this.cmd("sitePublish", {
                        "inner_path": this.inner_path
                      });
                      viewer.clearForm();
                      this.urlRoute();
                    } else {
                      this.error(`File write error: ${res.error}`);
                    }
                    return viewer.setPosting(false);
                  });
                });
              } else if (res.error) {
                return this.error(`Database error: ${res.error}`);
              }
            });
          }));
        } else {
          return this.error("Empty post");
        }
      }));
      return files.process();
    }

    modAction(action, uri, info) {
      var confirm_msg, done_msg, undo_action;
      boundMethodCheck(this, Millchan);
      switch (action) {
        case config.action.STICK:
        case config.action.BL_POST:
        case config.action.BL_USER:
          switch (action) {
            case config.action.STICK:
              confirm_msg = `Are you sure you want to stick thread <b>${info}</b>?`;
              done_msg = "Thread sticked";
              break;
            case config.action.BL_POST:
              confirm_msg = `Are you sure you want to blacklist post <b>${info}</b>?`;
              done_msg = "Post blacklisted";
              break;
            case config.action.BL_USER:
              confirm_msg = `Are you sure you want to blacklist user <b>${info}</b>?`;
              done_msg = "User blacklisted";
          }
          return this.cmd("wrapperConfirm", [confirm_msg], (confirmed) => {
            if (confirmed) {
              return this.cmd("fileGet", {
                "inner_path": this.inner_path,
                "required": false
              }, (data) => {
                var action_data, new_data, parser;
                action_data = {};
                action_data.uri = uri;
                action_data.action = action;
                action_data.info = info;
                parser = new DataParser(data);
                new_data = parser.newAction(action_data);
                return this.cmd("fileWrite", [this.inner_path, new_data], (res) => {
                  if (res === "ok") {
                    this.cmd("wrapperNotification", ["done", done_msg, config.notification_time]);
                    log("Publishing update");
                    this.cmd("sitePublish", {
                      "inner_path": this.inner_path
                    });
                    return this.urlRoute();
                  } else {
                    return this.error(`File write error: ${res.error}`);
                  }
                });
              });
            }
          });
        case config.action.UNDO_STICK:
        case config.action.UNDO_BL_POST:
        case config.action.UNDO_BL_USER:
          switch (action) {
            case config.action.UNDO_STICK:
              undo_action = config.action.STICK;
              confirm_msg = `Are you sure you want to <b>unstick</b> thread <b>${info}</b>?`;
              done_msg = "Post stick undone";
              break;
            case config.action.UNDO_BL_POST:
              undo_action = config.action.BL_POST;
              confirm_msg = `Are you sure you want to <b>undo</b> the blacklist of post <b>${info}</b>?`;
              done_msg = "Post blacklist undone";
              break;
            case config.action.UNDO_BL_USER:
              undo_action = config.action.BL_USER;
              confirm_msg = `Are you sure you want to <b>undo</b> the blacklist of <b>${info}</b>?`;
              done_msg = "User blacklist undone";
          }
          return this.cmd("wrapperConfirm", [confirm_msg], (confirmed) => {
            if (confirmed) {
              return this.cmd("fileGet", {
                "inner_path": this.inner_path,
                "required": false
              }, (data) => {
                var action_data, new_data, parser;
                action_data = {};
                action_data.uri = uri;
                action_data.action = undo_action;
                action_data.info = info;
                parser = new DataParser(data);
                new_data = parser.delAction(action_data);
                return this.cmd("fileWrite", [this.inner_path, new_data], (res) => {
                  if (res === "ok") {
                    this.cmd("wrapperNotification", ["done", done_msg, config.notification_time]);
                    log("Publishing update");
                    this.cmd("sitePublish", {
                      "inner_path": this.inner_path
                    });
                    return this.urlRoute();
                  } else {
                    return this.error(`File write error: ${res.error}`);
                  }
                });
              });
            }
          });
        default:
          return log(`Invalid mod action: ${action}`);
      }
    }

    writeThumbnails(files, cb) {
      var thumbnails;
      boundMethodCheck(this, Millchan);
      if (files.length) {
        log("Writing thumbnails to disk");
        thumbnails = new Thumbnails(files, this.siteInfo.auth_address, cb);
        return thumbnails.process();
      } else {
        return cb();
      }
    }

  };

  window.Millchan = new Millchan();

  window.Millchan.start();

}).call(this);
