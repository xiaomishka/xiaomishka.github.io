(function () {
VideoBlock.prototype.start = function () { console.log("Ad skipped!"); };
VideoBlock.prototype.create = function () {};
VideoBlock.prototype.load = function (data) { this.destroy(); };
})();
