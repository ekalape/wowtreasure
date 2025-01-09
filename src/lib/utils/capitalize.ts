

if (!String.prototype.capitalize) {
    String.prototype.capitalize = function () {
        const str = this;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}