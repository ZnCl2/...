// Copyright (C) 2008 Chris Double.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// DEVELOPERS AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
load("js8080.js");
load("invaderse.js");
load("invadersf.js");
load("invadersg.js");
load("invadersh.js");

function test() {
  var cpu = new Cpu();
  cpu.load(0x0000, invadersh);
  cpu.load(0x0800, invadersg);
  cpu.load(0x1000, invadersf);
  cpu.load(0x1800, invaderse);
  return cpu;
}

function run(n) {
  var a = test();
  var start = new Date();
  for(var i=0; i < n; ++i)
    a.step();
  var end = new Date();
  print(end-start);
  return 0;
}

function dump(n)
{
  var a = test();
  for(var i=0; i < n; ++i) {
    a.step();
    print(a.pc + "," + a.f + "," + a.a + "," + a.h + "," + a.l)
  }
}

run(1000000);