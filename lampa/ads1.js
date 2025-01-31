VideoBlock.prototype.create = function () {
    console.log("Ad creation blocked!");
    this.listener.send('ended');
};
