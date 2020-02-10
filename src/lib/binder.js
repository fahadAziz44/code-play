
const angular = function () {
    let bindings = {}
    let controllers = {}
    
    const controller = (name, constructor) => {
        if (!controllers[name]) {
            controllers[name] = {
                factory: constructor,
                instances: []
            }
        }

        var element = document.querySelector('[ng-controller=' + name + ']')
        if (!element) {
            return; // No element uses this controller
        }

        var ctrl = new controllers[name].factory
        controllers[name].instances.push(ctrl)

        Array.prototype.slice.call(element.querySelectorAll('[ng-bind]'))
            .map(function (element) {
                var boundValue = element.getAttribute('ng-bind');
                if (!bindings[boundValue]) {
                    bindings[boundValue] = {
                        boundValue: boundValue,
                        elements: []
                    }
                }
                bindings[boundValue].elements.push(element);
            });



        var proxy = new Proxy(ctrl, {
            set: function (target, prop, value) {
                var bind = bindings[prop];
                if (bind) {
                    // Update each DOM element bound to the property  
                    bind.elements.forEach(function (element) {
                        element.value = value;
                        element.setAttribute('value', value);
                    });
                }
                return Reflect.set(target, prop, value);
            }
        })

        Object.keys(bindings).forEach(function (boundValue) {
            var bind = bindings[boundValue];
            
            bind.elements.forEach(function (element) {
                element.addEventListener('input', function (event) {
                    proxy[bind.boundValue] = event.target.value;
                });
            })
        });

    }

    return {
        controller,
    }
}

module.exports = angular();