/**
 * VanillaTools
 *
 * List of convenient function who not necessary jQuery.
 *
 * Thanks to {@link http://youmightnotneedjquery.com}
 *
 * Compatibility IE9+
 * @namespace VanillaTools
 * @author Julien Stalder
 * @version 1.2.1
 */
var VanillaTools = {

    /**
     * Success callback of getJson function
     * @callback VanillaTools~successGetJsonCallback
     * @param {object} data - the json response
     */

    /**
     * Error callback of getJson function
     * @callback VanillaTools~errorGetJsonCallback
     */

    /**
     * get Json content with ajax request
     * @param {string} url - url of the ajax request
     * @param {object} [options] - options for the ajax request
     * @param {null|successGetJsonCallback} [successFunction] - callback function if success
     * @param {null|errorGetJsonCallback} [errorFunction] - callback function if error
     * @return {object}
     * @static
     */
    getJSON : function(url,options,successFunction,errorFunction){

        var parameters=this.cloneObject(this._getJsonDefaultOptions);

        //replace default options by defined options
        if(typeof options === 'object') {
            for (var key in options) {
                if (options.hasOwnProperty(key) && typeof parameters[key] !="undefined"){
                    parameters[key] = options[key];
                }
            }
        }
        parameters.method=parameters.method.toUpperCase();
        options=parameters;

        var data=this._serializeAjaxParameter(options.data);

        if(options.method=="GET" && data){
            if(url.indexOf("?") <0) {
                url+="?"+data;
            }else{
                url+="&"+data;
            }
        }

        var request = new XMLHttpRequest();
        request.open(options.method, url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onreadystatechange  = function () {
            if (this.readyState === 4) {
                if (request.status == 200) {
                    callSuccessFunction(request);
                } else {
                    if (typeof errorFunction != "undefined") {
                        callErrorFunction();
                    }
                }
            }
        };

        function callErrorFunction(){
            if (typeof errorFunction != "undefined") {
                errorFunction();
            }
        }

        function callSuccessFunction(request){
            if (typeof successFunction != "undefined") {
                var data=request.responseText;
                if(request.responseText!=""){
                    data=JSON.parse(request.responseText);
                }
                successFunction(data);
            }
        }

        if(options.method=="POST" && data) {
            request.send(data);
        }else{
            request.send();
        }

    },

    /**
     * Clone an object
     * @param {object} obj
     * @returns {object}
     * @static
     */
    cloneObject : function(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        var temp = obj.constructor(); // give temp the original obj's constructor
        for (var key in obj) {
            if (obj.hasOwnProperty(key)){
                temp[key] = this.cloneObject(obj[key]);
            }
        }

        return temp;
    },


    /**
     * get a GUID
     * @returns {string}
     * @author Slavik Meltser (slavik@meltser.info).
     * @static
     */
    guid : function() {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    },

    /**
     * Callback for forEach function.
     *
     * This callback return only row if only one argument in real callback function, if not the function return key + row.
     * @callback VanillaTools~forEachCallback
     * @param {int} [key] - the index of current row
     * @param {object} row - the current row
     */

    /**
     * For each implementation
     * @param {array|object} subject - the source array|object
     * @param {forEachCallback} fn -The callback that handles the response.
     * @static
     */
    forEach : function(subject, fn) {
        var fnLength = fn.length;
        if(Array.isArray(subject)){
            var i=0;
            var length = subject.length;
            for (; i < length; i++) {
                callFunction(subject[i], i);
            }
        }else if(typeof subject === "object"){
            for(var index in subject) {
                if (subject.hasOwnProperty(index)) {
                    callFunction(subject[index],index)
                }
            }
        }
        function callFunction(row,key){
            if(fnLength==1){
                fn(row);
            }else{
                fn(key,row);
            }
        }
    },

    /**
     * Add a css class to an element
     * @param {object} element - the concerned html element
     * @param {string} className - the class that will be added
     * @static
     */
    addClass: function (element, className) {

        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    },

    /**
     * Remove a css class of an element
     * @param {object} element - the concerned html element
     * @param {null|string} [className] - the class that will be removed
     * @static
     */
    removeClass: function (element, className) {
        if(typeof className =="undefined" || !className){
            element.className="";
        }else {
            if (element.classList) {
                element.classList.remove(className);
            } else {
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }
    },

    /**
     * Toggle a css class of an element
     * @param {object} element - the concerned html element
     * @param {string} className - the class that will be added/removed
     * @static
     */
    toggleClass: function (element, className) {
        if (element.classList) {
            element.classList.toggle(className);
        } else {
            var classes = element.className.split(' ');
            var existingIndex = -1;
            for (var i = classes.length; i--;) {
                if (classes[i] === className) {
                    existingIndex = i;
                }
            }

            if (existingIndex >= 0) {
                classes.splice(existingIndex, 1);
            } else {
                classes.push(className);
            }

            element.className = classes.join(' ');
        }
    },


    /**
     * Get element has css class
     * @param {object} element - the concerned html element
     * @param {string} className - the class that will be tested
     * @return {boolean}
     * @static
     */
    hasClass: function (element, className) {
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    },


    /**
     * Toggle two class on a element
     * @param {object} element - the concerned html element
     * @param {string} className1 - the first class that will be added/removed
     * @param {string} className2 - the second class that will be added/removed
     * @static
     */
    toggleTwoClass: function (element,className1,className2) {

        var removeClass=className1;
        var addClass=className2;
        if(this.hasClass(element,className2)){
            removeClass=className2;
            addClass=className1;
        }

        this.removeClass(element,removeClass);
        this.addClass(element,addClass);
    },

    /**
     * serialize ajax params
     * @param {object} a
     * @return {string}
     * thanks to {@link https://github.com/knowledgecode/jquery-param}
     * @private
     */
    _serializeAjaxParameter : function (a) {
        var s = [], rbracket = /\[\]$/,
            isArray = function (obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }, add = function (k, v) {
                v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
                s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
            }, buildParams = function (prefix, obj) {
                var i, len, key;

                if (prefix) {
                    if (isArray(obj)) {
                        for (i = 0, len = obj.length; i < len; i++) {
                            if (rbracket.test(prefix)) {
                                add(prefix, obj[i]);
                            } else {
                                buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
                            }
                        }
                    } else if (obj && String(obj) === '[object Object]') {
                        for (key in obj) {
                            buildParams(prefix + '[' + key + ']', obj[key]);
                        }
                    } else {
                        add(prefix, obj);
                    }
                } else if (isArray(obj)) {
                    for (i = 0, len = obj.length; i < len; i++) {
                        add(obj[i].name, obj[i].value);
                    }
                } else {
                    for (key in obj) {
                        buildParams(key, obj[key]);
                    }
                }
                return s;
            };

        return buildParams('', a).join('&').replace(/%20/g, '+');
    },

    /**
     * Default option for getJson function
     * @private
     */
    _getJsonDefaultOptions : {
        data :{},
        method: "POST"
    }
};