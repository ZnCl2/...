   function parseHexString(str) { 
    var result = [];
    while (str.length >= 2) { 
        result.push(parseInt(str.substring(0, 2), 16));

        str = str.substring(2, str.length);
    }

    return result;
}

 function createHexString(arr) {
    var result = "";
    var z;

    for (var i = 0; i < arr.length; i++) {
        var str = arr[i].toString(16);

        z = 2 - str.length + 1;
        str = Array(z).join("0") + str;

        result += str;
    }

    return result;
}
  
  function stringToUTF8Array(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6), 
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
        else {
            i++;
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff))
            utf8.push(0xf0 | (charcode >>18), 
                      0x80 | ((charcode>>12) & 0x3f), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}

  function stringFromUTF8Array(data) {
    var str = '',
        i;

    for (i = 0; i < data.length; i++) {
        var value = data[i];

        if (value < 0x80) {
            str += String.fromCharCode(value);
        } else if (value > 0xBF && value < 0xE0) {
            str += String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F);
            i += 1;
        } else if (value > 0xDF && value < 0xF0) {
            str += String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F);
            i += 2;
        } else {
            var charCode = ((value & 0x07) << 18 | (data[i + 1] & 0x3F) << 12 | (data[i + 2] & 0x3F) << 6 | data[i + 3] & 0x3F) - 0x010000;

            str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00); 
            i += 3;
        }
    }

    return str;
}

  function bitLength(n)
  {
    var res = 0
    while (n.notEquals(0))
    {
      res++
      n = n.shiftRight(1)
    }
    return res
  }
  
  function bitCount(n)
  {
    var res = 0
    while (n.notEquals(0))
    {
      if (n.isOdd())
        res++
      n = n.shiftRight(1)
    }
    return res
  }
  
  function genKeyStream(key, iv, length)
  {
    var res = []
    var state_len = bitLength(key)
    var state = iv.mod(bigInt(1).shiftLeft(state_len))
    for (var i = 0; i < length; i++)
    {
      var next_byte = 0
      for (var j = 0; j < 8; j++)
      {
        var next_bit = bitCount(state.and(key)) % 2
        next_byte = (next_byte >>> 1) | (next_bit << 7)
        state = state.shiftRight(1).or(bigInt(next_bit).shiftLeft(state_len - 1))
      }
      res.push(next_byte)
    }
    return res.reverse()
  }
  
  function encrypt(data, key, iv)
  {
    data = this.parseHexString(data)
    key = bigInt(key, 16)
    iv = bigInt(iv, 16)
    var keystream = this.genKeyStream(key, iv, data.length)
    for (var i = 0; i < data.length; i++)
      data[i] = data[i] ^ keystream[i]
    return this.createHexString(data)
  }
  
  function decrypt(data, key, iv)
  {
    return encrypt(data, key, iv)
  }
  
  function doEncrypt()
  {
    var key = document.getElementById("key").value
    var iv = document.getElementById("iv").value
    var data = document.getElementById("data").value
    document.getElementById("data").value = this.encrypt(data, key, iv)
  }
  
  function doDecrypt()
  {
    var key = document.getElementById("key").value
    var iv = document.getElementById("iv").value
    var data = document.getElementById("data").value
    document.getElementById("data").value = this.decrypt(data, key, iv)
  }
  
  function toString()
  {
    var data = document.getElementById("data").value
    document.getElementById("data").value = this.stringFromUTF8Array(this.parseHexString(data))
  }
  
  function toHex()
  {
    var data = document.getElementById("data").value
    document.getElementById("data").value = this.createHexString(this.stringToUTF8Array(data))
  }