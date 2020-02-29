$.fn.insertTextNode = function (text) {

    var obj = $(this)[0];
    var range, node;
    if (!obj.hasfocus) {
        obj.focus();
    }

    if (document.selection && document.selection.createRange) {
        this.focus();
        document.selection.createRange().pasteHTML(text);
        this.focus();
    } else if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        console.log(range);
        range.collapse(false);
        node = range.createContextualFragment(text);
        var c = node.lastChild;
        range.insertNode(node);
        if (c) {
            range.setEndAfter(c);
            range.setStartAfter(c)
        }
        var j = window.getSelection();
        j.removeAllRanges();
        j.addRange(range);
        this.focus();
    }
};