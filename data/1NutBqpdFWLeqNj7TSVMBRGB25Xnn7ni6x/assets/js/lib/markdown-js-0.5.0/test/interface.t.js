/**
 * ojraskatzeronet v0.1.0
 * @author Otto J. Rask
 */
function clone_array(t){return JSON.parse(JSON.stringify(t))}var markdown=require("../lib/markdown"),test=require("tap").test;test("arguments untouched",function(t){var e="A [link][id] by id.\n\n[id]: http://google.com",n=markdown.parse(e),r=clone_array(n),i=markdown.toHTML(n);t.equivalent(n,r,"tree isn't modified"),t.equivalent(markdown.toHTML(n),i,"output is consistent"),t.end()});