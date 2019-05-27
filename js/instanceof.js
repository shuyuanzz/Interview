function _instanceof (a,b) {
while(a) {
    if(a._proto_ === b.prototype){
        return true
    }
    a = a._proto_;
}
    return false;
}