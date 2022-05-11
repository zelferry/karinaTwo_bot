module.exports = function(){
    var addProperty = function(name, func){
        String.prototype.__defineGetter__(name, func);
    }

    addProperty("code", function(){
        return function(lang){
            return "```"+lang+"\n"+this+"\n```"
        }
    })
}